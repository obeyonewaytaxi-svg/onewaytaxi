import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scripts', 'audit', 'output', 'crawl-report.json'), 'utf8'),
);
const { results } = report;

console.log('===== meta description lengths =====');
let count = 0;
for (const [route, d] of Object.entries(results)) {
  const len = d.description?.length ?? 0;
  if (len < 70 || len > 165) {
    console.log(`${route} :: len=${len} :: ${d.description?.slice(0, 80)}`);
    count++;
  }
}
console.log(count ? `${count} descriptions out of range` : 'all in range 70-165');

console.log('\n===== title lengths =====');
for (const [route, d] of Object.entries(results)) {
  const len = d.title?.length ?? 0;
  if (len > 62) console.log(`${route} :: len=${len} :: ${d.title}`);
}

console.log('\n===== JSON-LD sanity =====');
for (const [route, d] of Object.entries(results)) {
  if (d.jsonLdBlocks < 2) console.log(`${route} :: only ${d.jsonLdBlocks}`);
}
