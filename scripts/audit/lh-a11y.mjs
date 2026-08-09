import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'scripts', 'audit', 'output');

const seen = new Set();
for (const name of ['home', 'fleet', 'routes', 'contact', 'fare-calculator']) {
  const r = JSON.parse(fs.readFileSync(path.join(dir, `lh-${name}.json`), 'utf8'));
  const cc = r.audits['color-contrast'];
  if (cc?.details?.items) {
    for (const i of cc.details.items) {
      const sel = i.node?.selector ?? '';
      if (seen.has(sel)) continue;
      seen.add(sel);
      const colors = i.node?.explanation || i.explanation || '';
      console.log(`[${name}] ${sel}`);
      console.log(`    ${i.node?.snippet?.replace(/\s+/g, ' ').slice(0, 140)}`);
      if (i.node?.styles) {
        console.log(`    fg=${i.node.styles.fgColor ?? '?'} bg=${i.node.styles.bgColor ?? '?'}`);
      }
    }
  }
  const ho = r.audits['heading-order'];
  if (ho?.details?.items?.length) {
    console.log(`\nheading-order on ${name}:`);
    for (const i of ho.details.items) console.log(`    ${i.node?.selector} :: ${i.node?.snippet?.replace(/\s+/g, ' ').slice(0, 100)}`);
  }
  const lm = r.audits['label-content-name-mismatch'];
  if (lm?.details?.items?.length) {
    console.log(`\nlabel-content-name-mismatch on ${name}:`);
    for (const i of lm.details.items) console.log(`    ${i.node?.selector} :: ${i.node?.snippet?.replace(/\s+/g, ' ').slice(0, 120)}`);
  }
  const ts = r.audits['target-size'];
  if (ts?.details?.items?.length) {
    console.log(`\ntarget-size on ${name}:`);
    for (const i of ts.details.items) console.log(`    ${i.node?.selector}`);
  }
}
