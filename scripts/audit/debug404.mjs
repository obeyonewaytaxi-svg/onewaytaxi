import puppeteer from 'puppeteer-core';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
for (const url of ['/nonexistent-page-xyz', '/routes/gibberish', '/cities/nonsense', '/services/fake', '/blog/fake-article']) {
  const res = await page.goto(`http://localhost:4173${url}`, { waitUntil: 'domcontentloaded' });
  await wait(600);
  const info = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent.trim(),
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    linkCount: document.querySelectorAll('a[href]').length,
  }));
  console.log(`${url} HTTP ${res.status()} :: ${JSON.stringify(info)}`);
}
await browser.close();
