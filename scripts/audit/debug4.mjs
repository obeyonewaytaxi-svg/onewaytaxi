import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:4173';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await wait(1500);

await page.focus('#booking-drop');
await page.evaluate(() => { const el = document.getElementById('booking-drop'); el.select(); });
await page.keyboard.press('Backspace');
await wait(120);
await page.type('#booking-drop', 'Xyzville');
await wait(550);

const geo = await page.evaluate(() => {
  const drop = document.getElementById('booking-drop');
  const listbox = document.getElementById('booking-drop-listbox');
  const submit = [...document.querySelectorAll('button[type="submit"]')][0];
  const r = (el) => { const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right) }; };
  return {
    listboxOpen: !!listbox,
    listbox: listbox ? r(listbox) : null,
    submit: submit ? r(submit) : null,
    drop: r(drop),
    innerHeight: window.innerHeight,
  };
});
console.log(JSON.stringify(geo, null, 2));
await browser.close();
