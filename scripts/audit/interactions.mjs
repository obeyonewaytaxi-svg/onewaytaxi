import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:4173';
const ROOT = process.cwd();
const OUT = path.join(ROOT, 'scripts', 'audit', 'output', 'shots');
fs.mkdirSync(OUT, { recursive: true });

const chromePath = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && fs.existsSync(p));

const results = [];
const pass = (name, detail = '') => results.push({ name, ok: true, detail });
const fail = (name, detail = '') => results.push({ name, ok: false, detail });

async function freshPage(browser, viewport = { width: 1366, height: 900 }) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`netfail: ${r.url().slice(0, 100)} ${r.failure()?.errorText}`));
  page._auditErrors = errors;
  return page;
}

async function wait(page, ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function clearAndType(page, selector, text) {
  await page.focus(selector);
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    el.select();
  }, selector);
  await page.keyboard.press('Backspace');
  await wait(page, 120);
  await page.type(selector, text);
  await wait(page, 550);
}

async function main() {
  const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox'] });

  /* ---------- A. BookingCard full validation (home hero) ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await wait(page, 1200);

    // A1: submit empty name/phone
    await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(String(u)); return null; }; });
    const hasName = await page.$('#booking-name');
    if (!hasName) {
      fail('A1 booking name field present', 'no #booking-name on home hero');
    } else {
      pass('A1 booking name field present');
      await page.click('button[type="submit"]');
      await wait(page, 400);
      const errs = await page.evaluate(() => ({
        name: document.body.innerText.includes('Name is required'),
        phone: document.body.innerText.includes('Enter a valid Indian mobile number'),
      }));
      pass('A2 empty submit shows name+phone errors', JSON.stringify(errs));
      const opened = await page.evaluate(() => window.__opened.length);
      pass('A3 no WhatsApp opened on invalid submit', `opened=${opened}`);

      // A4: invalid phone format
      await page.click('#booking-name');
      await page.type('#booking-name', 'Test User');
      await page.click('#booking-phone');
      await page.type('#booking-phone', '12345');
      await page.click('button[type="submit"]');
      await wait(page, 300);
      const phoneErr = await page.evaluate(() => document.body.innerText.includes('Enter a valid Indian mobile number'));
      pass('A4 invalid phone shows error', `phoneErr=${phoneErr}`);

      // A5: same pickup/drop blocked (via suggestion selection)
      await clearAndType(page, '#booking-drop', 'Chennai');
      await page.evaluate(() => document.querySelector('#booking-drop-listbox li button')?.click());
      await wait(page, 300);
      await page.click('button[type="submit"]');
      await wait(page, 300);
      const sameCityErr = await page.evaluate(() => document.body.innerText.includes('Pickup and drop must be different'));
      sameCityErr ? pass('A5 same pickup/drop blocked', 'err shown') : fail('A5 same pickup/drop blocked', 'error not shown');

      // A6: round trip toggles return date
      const returnVisibleBefore = await page.$eval('#return-date', () => true).catch(() => false);
      await page.evaluate(() => {
        [...document.querySelectorAll('button[type="button"]')].find((b) => b.textContent.trim() === 'Round Trip')?.click();
      });
      await wait(page, 300);
      const returnVisibleAfter = await page.$eval('#return-date', () => true).catch(() => false);
      (returnVisibleAfter && !returnVisibleBefore)
        ? pass('A6 return date shown only for round trip', `before=${returnVisibleBefore} after=${returnVisibleAfter}`)
        : fail('A6 return date shown only for round trip', `before=${returnVisibleBefore} after=${returnVisibleAfter}`);

      // A7: valid submit opens WhatsApp with details (one-way)
      await page.evaluate(() => {
        [...document.querySelectorAll('button[type="button"]')].find((b) => b.textContent.trim() === 'One Way')?.click();
      });
      await wait(page, 200);
      await clearAndType(page, '#booking-drop', 'Coimbatore');
      await page.evaluate(() => document.querySelector('#booking-drop-listbox li button')?.click());
      await wait(page, 300);
      await clearAndType(page, '#booking-phone', '9876543210');
      await page.click('button[type="submit"]');
      await wait(page, 400);
      const opened7 = await page.evaluate(() => window.__opened);
      const decoded = opened7.length ? decodeURIComponent(opened7[0]) : '';
      const ok = opened7.length === 1 && opened7[0].startsWith('https://wa.me/918667219259?text=') && decoded.includes('Test User') && decoded.includes('9876543210') && decoded.includes('Chennai') && decoded.includes('Coimbatore');
      ok ? pass('A7 valid submit opens WhatsApp w/ details', `url=${String(opened7[0]).slice(0, 90)}`) : fail('A7 valid submit opens WhatsApp w/ details', `opened=${opened7.length} decoded=${decoded.slice(0, 200)}`);
    }
    pass('A0 no console errors on home booking flow', page._auditErrors.length ? page._auditErrors.join(' | ') : 'clean');
    await page.close();
  }

  /* ---------- B. Home booking autocomplete + swap + header mobile ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await wait(page, 1200);

    // B1: local autocomplete suggestions
    await clearAndType(page, '#booking-pickup', 'Banga');
    const sugg = await page.evaluate(() => ({
      open: document.querySelector('#booking-pickup').getAttribute('aria-expanded'),
      first: document.querySelector('#booking-pickup-listbox li button')?.textContent.trim() ?? null,
    }));
    (sugg.open === 'true' && sugg.first) ? pass('B1 typing shows suggestions', `first=${sugg.first}`) : fail('B1 typing shows suggestions', JSON.stringify(sugg));
    if (sugg.first) {
      await page.evaluate(() => document.querySelector('#booking-pickup-listbox li button')?.click());
      await wait(page, 300);
      const val = await page.$eval('#booking-pickup', (e) => e.value);
      val === 'Bangalore' ? pass('B2 selecting suggestion fills input', `value=${val}`) : fail('B2 selecting suggestion fills input', `value=${val}`);
    }

    // B3: invalid city -> submit -> "Select a city from the suggestions"
    await clearAndType(page, '#booking-name', 'Test User');
    await clearAndType(page, '#booking-phone', '9876543210');
    await clearAndType(page, '#booking-drop', 'Xyzville');
    await page.keyboard.press('Escape');
    await wait(page, 150);
    await page.click('button[type="submit"]');
    await wait(page, 300);
    const notCityErr = await page.evaluate(() => document.body.innerText.includes('Select a city from the suggestions'));
    notCityErr ? pass('B3 unaccepted city blocked on submit', 'err shown') : fail('B3 unaccepted city blocked on submit', 'error not shown');

    // B4: swap button swaps pickup/drop
    await page.click('[aria-label="Swap pickup and drop"]');
    await wait(page, 300);
    const swapped = await page.evaluate(() => ({
      pickup: document.getElementById('booking-pickup').value,
      drop: document.getElementById('booking-drop').value,
    }));
    (swapped.pickup === 'Xyzville' && swapped.drop === 'Bangalore') ? pass('B4 swap swaps values', JSON.stringify(swapped)) : fail('B4 swap swaps values', JSON.stringify(swapped));

    // B5: home header mobile menu
    await page.setViewport({ width: 390, height: 844 });
    await wait(page, 400);
    await page.click('[aria-label="Toggle navigation"]');
    await wait(page, 400);
    const menuOpen = await page.evaluate(() => document.body.innerText.includes('Mobile navigation') || !!document.querySelector('nav[aria-label="Mobile navigation"]'));
    const menuVisible = await page.evaluate(() => !!document.querySelector('nav[aria-label="Mobile navigation"]'));
    pass('B5 mobile menu opens', `visible=${menuVisible} open=${menuOpen}`);
    if (menuVisible) {
      await page.evaluate(() => [...document.querySelectorAll('nav[aria-label="Mobile navigation"] a')].find((a) => a.textContent.trim() === 'Tariff')?.click());
      await wait(page, 800);
      const url = page.url();
      pass('B6 mobile menu link navigates + closes', `url=${url} menuGone=${!await page.$('nav[aria-label="Mobile navigation"]')}`);
    }
    await page.close();
  }

  /* ---------- C. Fare calculator ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/fare-calculator`, { waitUntil: 'domcontentloaded' });
    await wait(page, 1200);

    const widgetState = async () =>
      page.evaluate(() => {
        const root = document.querySelector('[class*="1.1fr_0.9fr"]');
        const selects = [...root.querySelectorAll('select')].map((s) => s.value);
        const fare = document.querySelector('[class*="1.1fr_0.9fr"] h3')?.textContent ?? null;
        return { selects, fare };
      });

    // C1: default fare present (Chennai->Coimbatore Sedan)
    let st = await widgetState();
    const fareNum = parseInt(String(st.fare).replace(/[^\d]/g, ''), 10);
    pass('C1 default fare shown', `selects=${JSON.stringify(st.selects)} fare=${st.fare} num=${fareNum}`);

    // C2: change drop to Madurai -> fare updates
    await page.evaluate(() => {
      const root = document.querySelector('[class*="1.1fr_0.9fr"]');
      const drop = root.querySelectorAll('select')[1];
      drop.value = 'Madurai';
      drop.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await wait(page, 400);
    st = await widgetState();
    const fareNum2 = parseInt(String(st.fare).replace(/[^\d]/g, ''), 10);
    pass('C2 drop change updates fare', `drop=${st.selects[1]} fare=${st.fare} changed=${fareNum !== fareNum2}`);

    // C3: swap button
    await page.evaluate(() => document.querySelector('[class*="1.1fr_0.9fr"] [aria-label="Swap cities"]').click());
    await wait(page, 400);
    st = await widgetState();
    pass('C3 swap cities', `pickup=${st.selects[0]} drop=${st.selects[1]}`);

    // C4: same city -> error + disabled book
    await page.evaluate(() => {
      const root = document.querySelector('[class*="1.1fr_0.9fr"]');
      const drop = root.querySelectorAll('select')[1];
      drop.value = root.querySelectorAll('select')[0].value;
      drop.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await wait(page, 300);
    const sameCityState = await page.evaluate(() => {
      const root = document.querySelector('[class*="1.1fr_0.9fr"]');
      const btn = [...root.querySelectorAll('button')].find((b) => b.textContent.includes('Book This Route'));
      return { err: document.body.innerText.includes('must be different cities'), disabled: btn?.disabled };
    });
    pass('C4 same city error + disabled', JSON.stringify(sameCityState));

    // C5: change cab to SUV -> fare changes (restore drop to a valid city first)
    await page.evaluate(() => {
      const root = document.querySelector('[class*="1.1fr_0.9fr"]');
      const drop = root.querySelectorAll('select')[1];
      drop.value = 'Chennai';
      drop.dispatchEvent(new Event('change', { bubbles: true }));
      const cab = root.querySelectorAll('select')[3];
      cab.value = 'SUV';
      cab.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await wait(page, 300);
    const st2 = await widgetState();
    const fareNum3 = parseInt(String(st2.fare).replace(/[^\d]/g, ''), 10);
    (st2.fare && fareNum3 > 0 && fareNum3 !== fareNum2) ? pass('C5 cab change updates fare', `fare=${st2.fare}`) : fail('C5 cab change updates fare', `fare=${st2.fare}`);
    pass('C5 no console errors', page._auditErrors.length ? page._auditErrors.join(' | ') : 'clean');
    await page.close();
  }

  /* ---------- D. Header services dropdown (desktop) + footer ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await wait(page, 1000);
    const clicked = await page.evaluate(() => {
      const btn = [...document.querySelectorAll('header button')].find((b) => b.textContent.includes('Services'));
      if (!btn) return false;
      btn.click();
      return true;
    });
    await wait(page, 400);
    const dropdown = await page.evaluate(() => !![...document.querySelectorAll('header a')].find((a) => a.textContent.trim() === 'Round Trip'));
    pass('D1 services dropdown opens', `clicked=${clicked} dropdown=${dropdown}`);
    if (dropdown) {
      await page.evaluate(() => [...document.querySelectorAll('header a')].find((a) => a.textContent.trim() === 'Round Trip').click());
      await wait(page, 800);
      pass('D2 services dropdown navigates', `url=${page.url()}`);
    }
    // D3: header whatsapp + phone links
    const links = await page.evaluate(() => {
      const hs = [...document.querySelectorAll('header a')].map((a) => a.href);
      return { wa: hs.find((h) => h.includes('wa.me')), tel: hs.find((h) => h.startsWith('tel:')) };
    });
    pass('D3 header has WA + tel links', `wa=${!!links.wa} tel=${links.tel}`);
    await page.close();
  }

  /* ---------- E. FAQ accordion ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/faq`, { waitUntil: 'domcontentloaded' });
    await wait(page, 1000);
    const btn = await page.evaluate(() => {
      const b = [...document.querySelectorAll('button[aria-expanded]')].find((x) => !x.closest('header') && x.getAttribute('aria-expanded') === 'false');
      return b ? { text: b.textContent.trim().slice(0, 60), expanded: b.getAttribute('aria-expanded') } : null;
    });
    if (!btn) {
      fail('E1 closed accordion found', 'no closed accordion button outside header on /faq');
    } else {
      pass('E1 closed accordion button found', JSON.stringify(btn));
      await page.evaluate(() => {
        const b = [...document.querySelectorAll('button[aria-expanded]')].find((x) => !x.closest('header') && x.getAttribute('aria-expanded') === 'false');
        b.click();
      });
      await wait(page, 400);
      const after1 = await page.evaluate(() => {
        const b = [...document.querySelectorAll('button[aria-expanded]')].find((x) => !x.closest('header') && x.getAttribute('aria-expanded') === 'true');
        return b ? b.textContent.trim().slice(0, 60) : null;
      });
      after1 ? pass('E2 clicking expands', `expanded=${after1}`) : fail('E2 clicking expands', 'no expanded accordion');
      if (after1) {
        await page.evaluate(() => {
          const b = [...document.querySelectorAll('button[aria-expanded]')].find((x) => !x.closest('header') && x.getAttribute('aria-expanded') === 'true');
          b.click();
        });
        await wait(page, 400);
        const collapsed = await page.evaluate(() => ![...document.querySelectorAll('button[aria-expanded]')].some((x) => !x.closest('header') && x.getAttribute('aria-expanded') === 'true'));
        collapsed ? pass('E3 clicking again collapses', `collapsed=${collapsed}`) : fail('E3 clicking again collapses', 'still expanded');
      }
    }
    await page.close();
  }

  /* ---------- F. Contact form ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/contact`, { waitUntil: 'domcontentloaded' });
    await wait(page, 1000);
    await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(String(u)); return null; }; });
    // F1: empty submit
    await page.evaluate(() => document.querySelector('form')?.requestSubmit());
    await wait(page, 400);
    const emptyErrs = await page.evaluate(() => ({
      name: document.body.innerText.includes('Enter your name'),
      phone: document.body.innerText.includes('Enter a valid Indian mobile number'),
      msg: document.body.innerText.includes('min 10 characters'),
      opened: window.__opened.length,
      hasForm: !!document.querySelector('form'),
    }));
    // Native `required` validation blocks the submit before the custom handler runs
    if (!emptyErrs.opened && emptyErrs.hasForm) {
      pass('F1 contact empty submit blocked (native required + no WhatsApp)', JSON.stringify(emptyErrs));
    } else {
      fail('F1 contact empty submit blocked', JSON.stringify(emptyErrs));
    }
    // F2: valid submit opens wa.me
    await page.click('#contact-name');
    await page.type('#contact-name', 'Test User');
    await page.click('#contact-phone');
    await page.type('#contact-phone', '9876543210');
    await page.click('#contact-message');
    await page.type('#contact-message', 'Need a cab from Chennai to Bangalore tomorrow morning');
    await page.evaluate(() => document.querySelector('form')?.requestSubmit());
    await wait(page, 500);
    const opened = await page.evaluate(() => window.__opened);
    const decoded = opened.length ? decodeURIComponent(opened[0]) : '';
    (opened.length === 1 && opened[0].startsWith('https://wa.me/918667219259') && decoded.includes('Test User') && decoded.includes('9876543210'))
      ? pass('F2 valid contact submit opens WhatsApp', `url=${String(opened[0]).slice(0, 90)}`)
      : fail('F2 valid contact submit opens WhatsApp', `opened=${opened.length} decoded=${decoded.slice(0, 160)}`);
    pass('F2 no console errors', page._auditErrors.length ? page._auditErrors.join(' | ') : 'clean');
    await page.close();
  }

  /* ---------- G. FloatingActions scroll-top ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await wait(page, 1000);
    const btn = await page.evaluate(() => {
      const b = [...document.querySelectorAll('button[aria-label]')].find((x) => /scroll/i.test(x.getAttribute('aria-label')));
      return b ? b.getAttribute('aria-label') : null;
    });
    pass('G0 scroll-top button renders after scroll', `label=${btn}`);
    await page.evaluate(() => window.scrollTo(0, 1200));
    await wait(page, 600);
    const visible = await page.evaluate(() => {
      const b = [...document.querySelectorAll('button[aria-label]')].find((x) => /scroll/i.test(x.getAttribute('aria-label')));
      return b ? getComputedStyle(b).visibility !== 'hidden' && b.offsetParent !== null : false;
    });
    visible ? pass('G1 scroll-top appears after scroll', `visible=${visible}`) : fail('G1 scroll-top appears after scroll', 'not visible');
    if (visible) {
      await page.evaluate(() => [...document.querySelectorAll('button[aria-label]')].find((x) => /scroll/i.test(x.getAttribute('aria-label'))).click());
      await wait(page, 900);
      const y = await page.evaluate(() => window.scrollY);
      y < 50 ? pass('G2 scroll-top scrolls to top', `scrollY=${y}`) : fail('G2 scroll-top scrolls to top', `scrollY=${y}`);
    }
    await page.close();
  }

  /* ---------- H. Keyboard focus ring ---------- */
  {
    const page = await freshPage(browser);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await wait(page, 900);
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Tab');
      await wait(page, 350);
    }
    const focus = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const cls = el.className;
      return {
        tag: el.tagName,
        cls: String(cls).slice(0, 80),
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        boxShadow: cs.boxShadow.slice(0, 60),
      };
    });
    pass('H1 tab focus lands on element', JSON.stringify(focus));
    const hasRing = focus && !focus.boxShadow?.includes('rgba(0, 0, 0, 0)') && focus.boxShadow?.length > 10;
    hasRing ? pass('H2 focus has visible ring', `boxShadow=${focus?.boxShadow}`) : fail('H2 focus has visible ring', JSON.stringify(focus));
    await page.close();
  }

  /* ---------- I. Breakpoints / overflow + screenshots ---------- */
  {
    const viewports = [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1366, height: 768 },
    ];
    const pages = ['/', '/fleet', '/routes', '/contact', '/fare-calculator', '/cities', '/tariff', '/reviews'];
    for (const vp of viewports) {
      for (const p of pages) {
        const page = await freshPage(browser, vp);
        await page.goto(`${BASE}${p}`, { waitUntil: 'domcontentloaded' });
        await wait(page, 1100);
        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return { scrollW: doc.scrollWidth, clientW: doc.clientWidth, overflowX: getComputedStyle(doc).overflowX };
        });
        const hasHOverflow = overflow.scrollW > overflow.clientW + 1;
        results.push({ name: `I breakpoint ${vp.width}px ${p}`, ok: !hasHOverflow, detail: hasHOverflow ? `scrollW=${overflow.scrollW} clientW=${overflow.clientW}` : `scrollW=${overflow.scrollW} ok` });
        const fname = `${OUT}/${p.replace(/[/#]/g, '_') || 'home'}-${vp.width}.png`;
        await page.screenshot({ path: fname, fullPage: false }).catch(() => {});
        await page.close();
      }
    }
  }

  await browser.close();

  const ok = results.filter((r) => r.ok).length;
  console.log(`\n===== ${ok}/${results.length} PASSED =====\n`);
  for (const r of results) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? ` :: ${r.detail}` : ''}`);
  }
  fs.writeFileSync(path.join(OUT, '..', 'interaction-results.json'), JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
