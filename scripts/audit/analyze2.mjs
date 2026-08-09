import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scripts', 'audit', 'output', 'crawl-report.json'), 'utf8'),
);
const { results, extraPaths, extraStatus } = report;

const broken = extraPaths.filter((p) => extraStatus[p]?.isNotFound);

console.log('===== WHICH PAGES LINK TO BROKEN PATHS =====');
for (const [route, d] of Object.entries(results)) {
  if (!d.links) continue;
  const hits = [...new Set(d.links.filter((l) => l && broken.includes(l.split('#')[0])))];
  if (hits.length) console.log(`${route} (${hits.length}): ${hits.join(', ')}`);
}

console.log('\n===== JSON-LD BLOCKS PER PAGE =====');
Object.entries(results).forEach(([route, d]) => {
  if (d.jsonLdBlocks) console.log(`${route} :: ${d.jsonLdBlocks}`);
});

console.log('\n===== PERF / WEIGHT (sorted by transfer) =====');
const perf = Object.entries(results)
  .filter(([, d]) => d.totalTransfer)
  .sort((a, b) => b[1].totalTransfer - a[1].totalTransfer);
perf.forEach(([route, d]) => {
  console.log(
    `${route} :: transfer=${(d.totalTransfer / 1024).toFixed(0)}kB imgs=${(d.imageTransfer / 1024).toFixed(0)}kB reqs=${d.requestCount} dcl=${d.navTiming?.domContentLoaded}ms fcp=${d.paint?.['first-contentful-paint']}ms body=${(d.bodyTextLength/1000).toFixed(1)}k`,
  );
});

console.log('\n===== H1 COUNT CHECK (all) =====');
Object.entries(results).forEach(([route, d]) => {
  if (d.h1s && d.h1s.length !== 1) console.log(`${route} :: ${JSON.stringify(d.h1s)}`);
});
console.log('(none printed = all pages have exactly one h1)');
