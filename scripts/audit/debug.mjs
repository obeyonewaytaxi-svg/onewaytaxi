import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const BASE = 'http://localhost:4173';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await wait(1500);
await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(String(u)); return null; }; });

const dump = async (label) => {
  const st = await page.evaluate(() => {
    const drop = document.getElementById('booking-drop');
    const p = document.getElementById('booking-pickup');
    const listbox = document.getElementById('booking-drop-listbox');
    return {
      pickup: p?.value, drop: drop?.value,
      dropExpanded: drop?.getAttribute('aria-expanded'),
      listboxCount: listbox ? listbox.querySelectorAll('li').length : -1,
      firstSugg: listbox?.querySelector('li button')?.textContent ?? null,
      hasErr: [...document.querySelectorAll('p.text-red-600, p.text-xs.font-medium.text-red-600')].map((e) => e.textContent.trim()),
      opened: window.__opened,
    };
  });
  console.log(`[${label}]`, JSON.stringify(st));
};

await dump('initial');
// type 'Chennai' into drop
await page.click('#booking-drop', { clickCount: 3 });
await page.keyboard.press('Backspace');
await page.type('#booking-drop', 'Chennai');
await wait(600);
await dump('after typing Chennai');
const liExists = await page.evaluate(() => !!document.querySelector('#booking-drop-listbox li button'));
console.log('li exists?', liExists);
if (liExists) {
  await page.evaluate(() => document.querySelector('#booking-drop-listbox li button')?.click());
  await wait(300);
  await dump('after clicking suggestion');
}
await page.click('button[type="submit"]');
await wait(400);
await dump('after submit');
await browser.close();
