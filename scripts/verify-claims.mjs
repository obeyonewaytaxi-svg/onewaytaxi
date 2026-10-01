// scripts/verify-claims.mjs
//
// Validates every distance and fare claim in the content corpus against the
// canonical route table and the fare engine's own rules (BASE_FARE + per-km rate,
// with the one-way minimum-billing distance applied).
//
// Why this exists: the site renders prices from src/lib/booking.ts, so any prose
// figure that does not match the engine shows the visitor two different prices for
// the same trip on the same page. Run:  node scripts/verify-claims.mjs

import fs from 'node:fs';

const read = (p) => fs.readFileSync(p, 'utf8');
const siteData = read('src/data/siteData.ts');
const cityData = read('src/data/cityData.ts');
const booking = read('src/lib/booking.ts');

const BASE = Number(booking.match(/export const BASE_FARE = (\d+)/)?.[1]);
const ONE_WAY_MIN = Number(booking.match(/if \(distance < (\d+)\)/)?.[1]);
const RATE = { sedan: 15, suv: 20, innova: 20, crysta: 24 };

// ---------------------------------------------------------------- route table
const table = new Map();
for (const m of siteData.matchAll(
  /origin:\s*'([^']+)',\s*destination:\s*'([^']+)',\s*distanceKm:\s*(\d+)/g,
)) {
  table.set(`${m[1].toLowerCase()}|${m[2].toLowerCase()}`, +m[3]);
}

// the engine, replicated from src/lib/booking.ts
function engine(pickup, drop, rate) {
  const km = table.get(`${pickup.toLowerCase()}|${drop.toLowerCase()}`);
  if (km === undefined) return null;
  const billed = km < ONE_WAY_MIN ? ONE_WAY_MIN : km;
  return { km, billed, minimumApplied: km < ONE_WAY_MIN, fare: BASE + billed * rate };
}

const n = (s) => Number(String(s).replace(/[₹,\s]/g, ''));
const problems = [];
const fail = (msg) => {
  problems.push(msg);
  console.log('  FAIL  ' + msg);
};

// ------------------------------------------------------- parse city blocks once
// cityData is keyed by slug; each block runs from "\n  <slug>: {" to the next such key.
const blockStarts = [...cityData.matchAll(/^  ([a-z]+): \{\n    slug: '([^']+)',\n    name: '([^']+)'/gm)].map(
  (m) => ({ key: m[1], slug: m[2], name: m[3], index: m.index }),
);
const blocks = blockStarts.map((b, i) => ({
  ...b,
  body: cityData.slice(b.index, i + 1 < blockStarts.length ? blockStarts[i + 1].index : cityData.length),
}));

// ------------------------------------------------------------------ 1. distances
console.log('\n=== 1. Distance claims inside each city block vs route table ===');
let distChecked = 0;
let distFixed = 0;
for (const b of blocks) {
  const tokens = [...b.body.matchAll(/([A-Z][a-z]+(?: [A-Z][a-z]+)*) \(([\d,]+) km\)/g)];
  const seen = new Set();
  for (const t of tokens) {
    const dest = t[1];
    const prose = n(t[2]);
    const key = `${b.name.toLowerCase()}|${dest.toLowerCase()}`;
    if (!table.has(key)) continue; // not a route we publish
    if (b.name.toLowerCase() === dest.toLowerCase()) continue; // self-reference
    const sig = `${dest}|${prose}`;
    if (seen.has(sig)) continue;
    seen.add(sig);
    const tbl = table.get(key);
    distChecked++;
    if (prose !== tbl) {
      distFixed++;
      fail(`distance: ${b.name} -> ${dest}: block says ${prose} km, route table says ${tbl} km`);
    }
  }
}
console.log(`  (checked ${distChecked} in-block distance claims, ${distFixed} disagree)`);

// ------------------------------------------------- 2. city FAQ fare blocks
console.log('\n=== 2. City FAQ fare figures vs engine ===');
const faqRe =
  /([A-Z][a-z]+) to ([A-Z][a-z]+) one way cab[^']*?₹([\d,]+) for a sedan \(([^)]*?)\)\.\s*SUV starts from ₹([\d,]+), Innova from ₹([\d,]+), and Crysta from ₹([\d,]+)/g;
let faqChecked = 0;
for (const m of cityData.matchAll(faqRe)) {
  const o = m[1];
  const d = m[2];
  const quoted = { sedan: n(m[3]), suv: n(m[5]), innova: n(m[6]), crysta: n(m[7]) };
  for (const [cab, amount] of Object.entries(quoted)) {
    const exp = engine(o, d, RATE[cab]);
    if (!exp) continue;
    faqChecked++;
    if (amount !== exp.fare) {
      fail(
        `fare: ${o} -> ${d} (${cab}) says ₹${amount}, engine charges ₹${exp.fare} ` +
          `[${exp.km} km${exp.minimumApplied ? `, billed at ${exp.billed} km min` : ''} + ₹${BASE}]`,
      );
    }
  }
}
console.log(`  (checked ${faqChecked} FAQ fare figures)`);

// ---------------------------------- 3. route-object descriptions in siteData
// Each route object is delimited; take the slice from its origin/destination pair
// to the start of the next route object so descriptions can never bleed across.
console.log('\n=== 3. Route-description fares ("sedan fares from ₹N") vs engine ===');
const routeObjs = [...siteData.matchAll(/origin:\s*'([^']+)',\s*destination:\s*'([^']+)',\s*distanceKm:\s*(\d+)/g)];
let rdChecked = 0;
for (let i = 0; i < routeObjs.length; i++) {
  const o = routeObjs[i];
  const start = o.index;
  const end = i + 1 < routeObjs.length ? routeObjs[i + 1].index : siteData.length;
  const slice = siteData.slice(start, end);
  const fareMatch = slice.match(/sedan fares? (?:starting at|from) ₹([\d,]+)/);
  if (!fareMatch) continue;
  const exp = engine(o[1], o[2], RATE.sedan);
  if (!exp) continue;
  rdChecked++;
  const quoted = n(fareMatch[1]);
  if (quoted !== exp.fare) {
    fail(
      `route prose: ${o[1]} -> ${o[2]} says sedan ₹${quoted}, engine charges ₹${exp.fare} ` +
        `[${exp.km} km${exp.minimumApplied ? `, billed at ${exp.billed} km min` : ''}]`,
    );
  }
}
console.log(`  (checked ${rdChecked} route-description fares)`);

// ------------------------------------ 3b. blog per-car fare lines
// Blog bodies quote "Sedan at ₹15/km — about ₹N". Validate each against the engine.
console.log('\n=== 3b. Blog per-car fare lines ("<Cab> at ₹R/km — about ₹N") vs engine ===');
let blogChecked = 0;
const blogLineRe = /(Sedan|SUV|Innova|Crysta)\s+at\s+₹(\d+)\/km\*{0,2}\s*[—-]\s*about ₹([\d,]+)/g;
for (const m of siteData.matchAll(blogLineRe)) {
  const cab = m[1].toLowerCase();
  const rate = +m[2];
  const quoted = n(m[3]);
  // find the route whose distance reproduces this exact figure at this rate
  const hit = [...table.entries()].find(([, km]) => {
    const billed = km < ONE_WAY_MIN ? ONE_WAY_MIN : km;
    return billed * rate + BASE === quoted;
  });
  blogChecked++;
  if (!hit) {
    fail(`blog fare: "${m[1]} at ₹${rate}/km — about ₹${quoted}" matches no route at that rate + ₹${BASE}`);
  }
}
console.log(`  (checked ${blogChecked} blog fare lines)`);

// ------------------------------------------------- 4. night-allowance window
console.log('\n=== 4. Night-allowance window consistency ===');
const nightBlock = booking.match(/NIGHT_TIMES = \[([\s\S]*?)\];/)?.[1] ?? '';
const slots = [...nightBlock.matchAll(/'([^']+)'/g)].map((m) => m[1]);
console.log(`  engine charges: ${slots[0]} .. ${slots[slots.length - 1]} (${slots.length} slots)`);
const windows = new Map();
for (const src of [cityData, siteData]) {
  for (const sent of src.split(/(?<=[.\n])\s*/)) {
    if (!/night (?:allowance|bata)|driver night allowance/i.test(sent)) continue;
    for (const m of sent.matchAll(/between (\d{1,2}(?::\d{2})? ?[AP]M) and (\d{1,2}(?::\d{2})? ?[AP]M)/g)) {
      const k = `${m[1]} to ${m[2]}`;
      windows.set(k, (windows.get(k) ?? 0) + 1);
    }
  }
}
for (const [k, v] of [...windows].sort((a, b) => b[1] - a[1])) console.log(`  prose says: ${k} (${v}x)`);
if (windows.size > 1) fail(`night window stated ${windows.size} ways: ${[...windows.keys()].join(' / ')}`);

// ------------------------------------------------- 5. minimum-distance coherence
console.log('\n=== 5. Minimum-billing distance consistency ===');
const noMin = /no strict minimum/i.test(siteData) || /no strict minimum/i.test(cityData);
const hardMin = new RegExp(`minimum billing of ${ONE_WAY_MIN} km`).test(siteData + cityData);
console.log(`  engine bills a ${ONE_WAY_MIN} km one-way minimum`);
console.log(`  prose also claims "no strict minimum": ${noMin}`);
if (noMin && hardMin) fail('minimum distance contradicts itself ("no strict minimum" vs a hard 130 km minimum)');

// --------------------------------------------------------------- 6. llms.txt
if (fs.existsSync('public/llms.txt')) {
  console.log('\n=== 6. public/llms.txt vs the same rules ===');
  const llms = read('public/llms.txt');
  let lc = 0;
  for (const m of llms.matchAll(/- ([A-Za-z ]+) \((\d+) km\): [^\d]*(\d[\d,]*)/g)) {
    const km = +m[2];
    const quoted = n(m[3]);
    const isHill = /ooty|kodaikanal|coonoor|munnar|yercaud/i.test(m[1]);
    const billed = km < ONE_WAY_MIN ? ONE_WAY_MIN : km;
    const exp = BASE + billed * RATE.sedan + (isHill ? 300 : 0);
    lc++;
    if (quoted !== exp) fail(`llms.txt: "${m[1]}" (${km} km) says ₹${quoted}, formula gives ₹${exp}`);
  }
  const bullet = llms.match(/^.*night allowance.*$/im)?.[0] ?? '';
  const w = [...bullet.matchAll(/(\d{1,2}(?::\d{2})? ?[AP]M)[^\n]*?(\d{1,2}(?::\d{2})? ?[AP]M)/g)].map(
    (m) => `${m[1]}-${m[2]}`,
  );
  if (new Set(w).size > 1) fail(`llms.txt states the night window two ways in one bullet: ${[...new Set(w)].join(' vs ')}`);
  console.log(`  (checked ${lc} llms.txt example fares)`);
} else {
  console.log('\n=== 6. llms.txt: not present, skipped ===');
}

console.log('\n' + '='.repeat(64));
if (problems.length === 0) {
  console.log('RESULT: every claim matches the fare engine.');
  process.exit(0);
}
console.log(`RESULT: ${problems.length} claim(s) disagree with the fare engine.`);
process.exit(1);
