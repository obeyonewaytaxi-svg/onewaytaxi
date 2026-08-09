import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:4173';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await wait(1500);

await page.keyboard.press('Tab');
await wait(200);
let probe = await page.evaluate(() => {
  const el = document.activeElement;
  const fv = el ? el.matches(':focus-visible') : false;
  const cs = el ? getComputedStyle(el) : null;
  return { tag: el?.tagName, cls: String(el?.className).slice(0, 60), matchesFocusVisible: fv, boxShadow: cs?.boxShadow, outlineStyle: cs?.outlineStyle };
});
console.log('tab1:', JSON.stringify(probe));

await page.keyboard.press('Tab');
await wait(200);
probe = await page.evaluate(() => {
  const el = document.activeElement;
  const fv = el ? el.matches(':focus-visible') : false;
  const cs = el ? getComputedStyle(el) : null;
  return { tag: el?.tagName, cls: String(el?.className).slice(0, 60), matchesFocusVisible: fv, boxShadow: cs?.boxShadow, outlineStyle: cs?.outlineStyle };
});
console.log('tab2:', JSON.stringify(probe));

await browser.close();
