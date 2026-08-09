import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'scripts', 'audit', 'output');

const opps = {};
const a11y = {};
for (const name of ['home', 'fleet', 'routes', 'contact', 'fare-calculator']) {
  const r = JSON.parse(fs.readFileSync(path.join(dir, `lh-${name}.json`), 'utf8'));
  for (const a of Object.values(r.audits)) {
    if (a.details?.type === 'opportunity' && a.score !== null && a.score < 1) {
      const savings = a.details.overallSavingsMs ?? 0;
      (opps[name] ||= []).push({ id: a.id, title: a.title, score: Math.round(a.score * 100), savings: Math.round(savings), overallSavingsBytes: a.details.overallSavingsBytes ?? 0 });
    }
  }
  for (const a of Object.values(r.audits)) {
    if (a.score !== null && a.score < 1 && (a.scoreDisplayMode === 'binary')) {
      (a11y[name] ||= []).push({ id: a.id, title: a.title, desc: (a.description || '').slice(0, 200) });
    }
  }
}

console.log('===== PERFORMANCE OPPORTUNITIES (savings) =====');
for (const [page, list] of Object.entries(opps)) {
  console.log(`\n[${page}]`);
  list.sort((a, b) => b.savings - a.savings);
  for (const o of list) {
    console.log(`  ${o.id}: ${o.title} (score ${o.score}, save ~${o.savings}ms, ${(o.overallSavingsBytes / 1024).toFixed(0)}kB)`);
  }
}

console.log('\n===== FAILING BINARY AUDITS (a11y etc) =====');
for (const [page, list] of Object.entries(a11y)) {
  console.log(`\n[${page}]`);
  for (const a of list) console.log(`  ${a.id} :: ${a.desc}`);
}

const r = JSON.parse(fs.readFileSync(path.join(dir, 'lh-home.json'), 'utf8'));
console.log('\n===== HOME color-contrast DETAILS =====');
const cc = r.audits['color-contrast'];
if (cc?.details?.items) {
  cc.details.items.slice(0, 15).forEach((i) => console.log(`  ${i.node?.selector} :: fg=${i.node?.snippet?.slice(0,80)}`));
}
console.log('\n===== HOME heading-order DETAILS =====');
const ho = r.audits['heading-order'];
if (ho?.details?.items) {
  ho.details.items.slice(0, 15).forEach((i) => console.log(`  ${i.node?.selector}`));
}
console.log('\n===== HOME label-content-name-mismatch DETAILS =====');
const lc = r.audits['label-content-name-mismatch'];
if (lc?.details?.items) {
  lc.details.items.slice(0, 15).forEach((i) => console.log(`  ${i.node?.selector} :: ${i.node?.snippet?.slice(0, 120)}`));
}
console.log('\n===== HOME target-size DETAILS =====');
const ts = r.audits['target-size'];
if (ts?.details?.items) {
  ts.details.items.slice(0, 15).forEach((i) => console.log(`  ${i.node?.selector}`));
}
console.log('\n===== fare-calculator select-name DETAILS =====');
const fc = JSON.parse(fs.readFileSync(path.join(dir, 'lh-fare-calculator.json'), 'utf8'));
const sn = fc.audits['select-name'];
if (sn?.details?.items) sn.details.items.forEach((i) => console.log(`  ${i.node?.selector}`));
