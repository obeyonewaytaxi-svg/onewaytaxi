import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'scripts', 'audit', 'output');
const files = ['lh-home.json', 'lh-fleet.json', 'lh-routes.json', 'lh-contact.json', 'lh-fare-calculator.json'];

for (const f of files) {
  const fp = path.join(dir, f);
  if (!fs.existsSync(fp)) { console.log(`${f}: MISSING`); continue; }
  const r = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const cats = r.categories;
  const score = (c) => (c ? Math.round(c.score * 100) : 'n/a');
  console.log(`=== ${f.replace('lh-', '').replace('.json', '')} ===`);
  console.log(`  performance=${score(cats.performance)} accessibility=${score(cats.accessibility)} best-practices=${score(cats['best-practices'])} seo=${score(cats.seo)}`);
  const audits = r.audits;
  const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive', 'server-response-time'];
  for (const m of metrics) {
    if (audits[m]) console.log(`  ${m}: ${audits[m].displayValue ?? audits[m].numericValue}`);
  }
  const failed = Object.values(audits).filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary' || (a.scoreDisplayMode === 'numeric' && a.score !== null && a.score < 0.9));
  console.log('  noteworthy audits:');
  for (const a of failed) {
    if (a.score !== null && (a.score < 0.9)) console.log(`    [${Math.round(a.score * 100)}] ${a.id} :: ${(a.title || '').slice(0, 90)}`);
  }
}
