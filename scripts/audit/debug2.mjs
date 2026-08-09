import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:4173';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await wait(1500);

// Test 1: clearAndType via el.select() + Backspace
await page.focus('#booking-drop');
await page.evaluate(() => { const el = document.getElementById('booking-drop'); el.select(); });
await page.keyboard.press('Backspace');
await wait(150);
await page.type('#booking-drop', 'Chennai');
await wait(600);
let st = await page.evaluate(() => ({
  drop: document.getElementById('booking-drop').value,
  firstSugg: document.getElementById('booking-drop-listbox')?.querySelector('li button')?.textContent ?? null,
}));
console.log('T1 clear+type Chennai:', JSON.stringify(st));

// Test 2: native setter trick on drop
await page.evaluate(() => {
  const el = document.getElementById('booking-drop');
  const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set;
  setter.call(el, 'Xyzville');
  el.dispatchEvent(new Event('input', { bubbles: true }));
});
await wait(400);
st = await page.evaluate(() => ({
  drop: document.getElementById('booking-drop').value,
  noMatch: document.getElementById('booking-drop-listbox')?.innerText.includes('No matching cities found') ?? null,
}));
console.log('T2 setter Xyzville:', JSON.stringify(st));

await browser.close();
