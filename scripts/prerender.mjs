import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer-core';

const IS_VERCEL = process.env.VERCEL === '1';
const DIST = path.join(process.cwd(), 'dist');
const PORT = 45999;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
};

const withTimeout = (promise, ms, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
    ),
  ]);

async function resolveVercelChrome() {
  const chromium = (await import('@sparticuz/chromium')).default;
  return {
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: true,
  };
}

async function resolveLocalChrome() {
  let bundledChrome = null;
  try {
    bundledChrome = await puppeteer.executablePath();
  } catch {}
  const chromeCandidates = [
    bundledChrome,
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
  ];
  const chromePath = chromeCandidates.find((p) => p && fs.existsSync(p));
  return {
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    headless: true,
  };
}

async function main() {
  const launchConfig = IS_VERCEL
    ? await resolveVercelChrome()
    : await resolveLocalChrome();

  const sitemapPath = path.join(DIST, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.log('prerender: sitemap.xml not found in dist, skipping');
    return;
  }
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .map((u) => {
      try {
        return new URL(u).pathname;
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((p) => p !== '/sitemap.xml');

  if (urls.length === 0) {
    console.log('prerender: no urls found in sitemap, skipping');
    return;
  }

  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(DIST, urlPath);
    if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');
    if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(DIST, 'index.html'), (err2, home) => {
          if (err2) {
            res.writeHead(500);
            res.end('err');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(home);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const activePort = server.address().port;

  let browser;
  try {
    browser = await puppeteer.launch(launchConfig);
  } catch (e) {
    server.close();
    console.error(`prerender failed: no Chrome/Chromium available (${e.message})`);
    console.error('Install Chrome, set CHROME_PATH, or ensure a Chromium binary is available.');
    process.exit(1);
  }

  const base = `http://localhost:${activePort}`;
  let done = 0;

  const renderPage = async (routePath) => {
    let lastError = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      let page;
      try {
        page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          const type = req.resourceType();
          if (['image', 'font', 'media'].includes(type)) req.abort();
          else req.continue();
        });
        await page.setViewport({ width: 1366, height: 900 });
        await withTimeout(
          page.goto(`${base}${routePath}`, { waitUntil: 'domcontentloaded', timeout: 30000 }),
          35000,
          'goto',
        );
        await new Promise((r) => setTimeout(r, 3000));
        const html = await withTimeout(page.content(), 20000, 'content');
        const outPath =
          routePath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, routePath, 'index.html');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);
        return null;
      } catch (e) {
        lastError = e;
        await new Promise((r) => setTimeout(r, 1000));
      } finally {
        if (page) {
          try {
            await withTimeout(page.close(), 10000, 'close');
          } catch {}
        }
      }
    }
    return lastError;
  };

  const failed = [];
  for (const routePath of urls) {
    const err = await renderPage(routePath);
    if (err) {
      console.error(`prerender failed for ${routePath}: ${err.message}`);
      failed.push(routePath);
    }
    done++;
    if (done % 10 === 0 || done === urls.length) {
      console.log(`prerendered ${done}/${urls.length}`);
    }
  }

  if (failed.length > 0) {
    console.error(`prerender failed for ${failed.length}/${urls.length} routes — aborting build so the incomplete site is not deployed`);
    failed.forEach((r) => console.error(`  failed: ${r}`));
    server.close();
    process.exit(1);
  }

  try {
    await withTimeout(browser.close(), 15000, 'browser close');
  } catch {}
  server.close();

  const hostConfig = path.join(DIST, '..', 'vercel.json');
  if (fs.existsSync(hostConfig)) {
    fs.copyFileSync(hostConfig, path.join(DIST, 'vercel.json'));
    console.log('copied vercel.json into dist for host config');
  }

  console.log('prerender complete');
  process.exit(0);
}

main().catch((e) => {
  console.log(`prerender skipped (${e.message})`);
  process.exit(1);
});
