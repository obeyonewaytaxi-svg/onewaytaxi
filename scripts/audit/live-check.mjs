const BASE = 'https://obeyonewaytaxi.com';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url, redirect = 'manual') {
  const res = await fetch(url, { redirect, headers: { 'user-agent': 'Mozilla/5.0 (live-audit)' } });
  let body = '';
  try { body = await res.text(); } catch {}
  return { status: res.status, location: res.headers.get('location'), url: res.url, body };
}

const sitemapRes = await fetch(`${BASE}/sitemap.xml`);
const sitemap = await sitemapRes.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));

const titles = new Set();
const problems = [];
const per = [];

for (let i = 0; i < urls.length; i++) {
  const u = urls[i];
  await sleep(250);
  const { status, body } = await fetchText(u);
  const path = u.replace(BASE, '');
  const title = (body.match(/<title>(.*?)<\/title>/) || [])[1] || '(none)';
  const h1Open = (body.match(/<h1[^>]*>/gi) || []).length;
  const h1 = h1Open ? 'present' : '(none)';
  const canonical = (body.match(/<link rel="canonical" href="(.*?)"/) || [])[1] || '(none)';
  const robots = (body.match(/name="robots" content="(.*?)"/) || [])[1] || '(default)';
  const ogUrl = (body.match(/property="og:url" content="(.*?)"/) || [])[1] || '(none)';
  const ldJson = (body.match(/application\/ld\+json/g) || []).length;

  if (status !== 200) problems.push(`HTTP ${status} -> ${u}`);
  if (canonical !== u) problems.push(`canonical mismatch: ${canonical} vs ${u}`);
  if (ogUrl !== u) problems.push(`og:url mismatch: ${ogUrl} vs ${u}`);
  if (robots !== '(default)' && robots !== 'index, follow') problems.push(`robots ${robots} on ${u}`);
  if (!h1 || h1 === '(none)') problems.push(`no H1 on ${u}`);
  if (h1Open > 1) problems.push(`${h1Open} H1s on ${u}`);
  if (title === '(none)') problems.push(`no <title> on ${u}`);

  per.push({ path, status, title, h1count: h1 === '(none)' ? 0 : 1, ld: ldJson });
  titles.add(title);
}

const dupTitles = [...titles].filter((t) => [...per].filter((p) => p.title === t).length > 1);

console.log(`URLs from sitemap: ${urls.length}`);
console.log(`Fetched: ${per.length} | HTTP != 200: ${per.filter((p) => p.status !== 200).length}`);
console.log(`Unique titles: ${titles.size} | duplicates: ${dupTitles.length}`);
const noLd = per.filter((p) => p.ld === 0).length;
console.log(`Pages with 0 JSON-LD: ${noLd}`);
console.log('\n--- PROBLEMS ---');
console.log(problems.length ? problems.join('\n') : 'none');

const cities = await fetchText(`${BASE}/cities`);
const chips = [...cities.body.matchAll(/href="(\/routes\/[^"]+)"/g)].map((m) => m[1]);
const uniqChips = [...new Set(chips)];
console.log(`\n--- /cities route-chip links: ${uniqChips.length} unique ---`);
let dead = 0;
for (const c of uniqChips) {
  await sleep(200);
  const { status } = await fetchText(`${BASE}${c}`);
  if (status !== 200) { dead++; console.log(`DEAD ${c} -> HTTP ${status}`); }
}
console.log(`dead chips: ${dead}/${uniqChips.length}`);
