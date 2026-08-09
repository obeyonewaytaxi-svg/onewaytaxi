import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:4173';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await wait(1500);

// B1
await page.focus('#booking-pickup');
await page.evaluate(() => { const el = document.getElementById('booking-pickup'); el.select(); });
await page.keyboard.press('Backspace');
await wait(120);
await page.type('#booking-pickup', 'Banga');
await wait(550);
await page.evaluate(() => document.querySelector('#booking-pickup-listbox li button')?.click());
await wait(300);
console.log('pickup after B2:', await page.$eval('#booking-pickup', (e) => e.value));

// B3
await page.focus('#booking-drop');
await page.evaluate(() => { const el = document.getElementById('booking-drop'); el.select(); });
await page.keyboard.press('Backspace');
await wait(120);
await page.type('#booking-drop', 'Xyzville');
await wait(550);
console.log('drop after typing:', await page.$eval('#booking-drop', (e) => e.value));
console.log('listbox text:', await page.evaluate(() => document.getElementById('booking-drop-listbox')?.innerText ?? 'none'));
await page.click('button[type="submit"]');
await wait(500);
const after = await page.evaluate(() => ({
  drop: document.getElementById('booking-drop').value,
  redErrors: [...document.querySelectorAll('p.text-red-600, p.text-xs.font-medium.text-red-600')].map((e) => e.textContent.trim()),
  listboxGone: !document.getElementById('booking-drop-listbox'),
}));
console.log('after submit:', JSON.stringify(after, null, 2));
await browser.close();
