import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:4173';
const ROOT = process.cwd();
const OUT = path.join(ROOT, 'scripts', 'audit', 'output');

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
];
const chromePath = chromeCandidates.find((p) => p && fs.existsSync(p));

function readSitemapPaths() {
  const xml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .filter((p) => p !== '/sitemap.xml');
}

const paths = readSitemapPaths();

const withTimeout = (promise, ms, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out`)), ms)),
  ]);

async function inspectPage(page) {
  return page.evaluate(() => {
    const text = (s) => (s ? s.trim() : null);
    const meta = (n) => text(document.querySelector(`meta[name="${n}"]`)?.getAttribute('content'));
    const og = (p) => text(document.querySelector(`meta[property="${p}"]`)?.getAttribute('content'));

    const imgs = [...document.querySelectorAll('img')].map((img) => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      hasWidth: !!img.getAttribute('width'),
      hasHeight: !!img.getAttribute('height'),
      loading: img.getAttribute('loading') ?? null,
      broken: img.complete && img.naturalWidth === 0,
    }));

    const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));

    const notFoundByType = {
      generic: !!document.querySelector('h1')?.textContent.trim().toLowerCase().includes('page not found'),
      route: !!document.querySelector('h1')?.textContent.trim().toLowerCase().includes("couldn't find that route"),
      city: !!document.querySelector('h1')?.textContent.trim().toLowerCase().includes('no taxi service found'),
      service: !!document.querySelector('h1')?.textContent.trim().toLowerCase().includes('not available yet'),
      article: !!document.querySelector('h1')?.textContent.trim().toLowerCase().includes('no longer available'),
    };

    const perf = window.performance;
    const nav = perf.getEntriesByType('navigation')[0];
    const paint = Object.fromEntries(
      perf.getEntriesByType('paint').map((e) => [e.name, Math.round(e.startTime)]),
    );
    const resources = perf.getEntriesByType('resource');
    const totalTransfer = Math.round(resources.reduce((a, r) => a + (r.transferSize || 0), 0));
    const imageTransfer = Math.round(
      resources.filter((r) => r.initiatorType === 'img').reduce((a, r) => a + (r.transferSize || 0), 0),
    );
    const requestCount = resources.length + 1;

    return {
      title: document.title,
      description: meta('description'),
      keywords: meta('keywords'),
      canonical: text(document.querySelector('link[rel="canonical"]')?.getAttribute('href')),
      robots: meta('robots'),
      ogTitle: og('og:title'),
      ogDescription: og('og:description'),
      ogUrl: og('og:url'),
      ogImage: og('og:image'),
      twitterCard: meta('twitter:card'),
      lang: document.documentElement.lang,
      h1s: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()),
      h2Count: document.querySelectorAll('h2').length,
      imgs,
      brokenImages: imgs.filter((i) => i.broken),
      imagesMissingAlt: imgs.filter((i) => i.alt === null || i.alt.trim() === ''),
      links,
      jsonLdBlocks: document.querySelectorAll('script[type="application/ld+json"]').length,
      notFoundByType,
      isNotFound: Object.values(notFoundByType).some(Boolean),
      bodyTextLength: document.body.innerText.length,
      navTiming: nav
        ? { domContentLoaded: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd) }
        : null,
      paint,
      totalTransfer,
      imageTransfer,
      requestCount,
    };
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const results = {};
  const consoleErrors = {};
  const failedRequests = {};
  const allLinks = new Set();

  for (let i = 0; i < paths.length; i++) {
    const route = paths[i];
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });
    const errors = [];
    const failed = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page.on('requestfailed', (req) => {
      failed.push({ url: req.url(), error: req.failure()?.errorText ?? 'failed' });
    });
    page.on('response', (res) => {
      if (res.status() >= 400) failed.push({ url: res.url(), error: `HTTP ${res.status()}` });
    });

    try {
      await withTimeout(page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 }), 40000, 'goto');
      await new Promise((r) => setTimeout(r, 1500));
      const data = await inspectPage(page);
      results[route] = data;
      data.links.forEach((l) => allLinks.add(l));
      if (errors.length) consoleErrors[route] = errors;
      if (failed.length) failedRequests[route] = failed;
    } catch (e) {
      results[route] = { error: e.message };
    } finally {
      await page.close().catch(() => {});
    }
    if ((i + 1) % 10 === 0 || i + 1 === paths.length) {
      console.log(`crawled ${i + 1}/${paths.length}`);
    }
  }

  const internalLinks = new Set();
  const hashLinks = new Set();
  for (const href of allLinks) {
    if (!href || /^(https?:|mailto:|tel:|wa\.me|#|javascript:)/i.test(href)) continue;
    if (href.startsWith('//')) continue;
    const [p, hash] = href.split('#');
    const clean = p.startsWith('/') ? p : `/${p}`;
    internalLinks.add(clean);
    if (hash) hashLinks.add({ path: clean || '/', hash });
  }

  const sitemapSet = new Set(paths);
  const extraPaths = [...internalLinks].filter((p) => !sitemapSet.has(p) && p !== '/sitemap.xml');

  const extraStatus = {};
  for (const p of extraPaths) {
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}${p}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise((r) => setTimeout(r, 900));
      extraStatus[p] = await page.evaluate(() => {
        const h1 = document.querySelector('h1')?.textContent.trim() ?? '';
        return {
          title: document.title,
          h1,
          isNotFound: document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex') && h1.toLowerCase().includes('not'),
        };
      });
    } catch (e) {
      extraStatus[p] = { error: e.message };
    } finally {
      await page.close().catch(() => {});
    }
  }

  const anchorCheck = {};
  for (const { path: p, hash } of hashLinks) {
    const key = `${p}#${hash}`;
    if (anchorCheck[key]) continue;
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}${p}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise((r) => setTimeout(r, 900));
      anchorCheck[key] = await page.evaluate((h) => {
        const target = document.getElementById(h);
        const listboxOrSection = document.querySelector(`[id="${h}"]`);
        return { idExists: !!listboxOrSection, targetTag: listboxOrSection?.tagName ?? null };
      }, hash);
    } catch (e) {
      anchorCheck[key] = { error: e.message };
    } finally {
      await page.close().catch(() => {});
    }
  }

  await browser.close();

  const report = {
    generatedAt: new Date().toISOString(),
    urlCount: paths.length,
    paths,
    results,
    consoleErrors,
    failedRequests,
    internalLinks: [...internalLinks].sort(),
    extraPaths: extraPaths.sort(),
    extraStatus,
    anchorCheck,
  };
  fs.writeFileSync(path.join(OUT, 'crawl-report.json'), JSON.stringify(report, null, 2));
  console.log('report written to scripts/audit/output/crawl-report.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
