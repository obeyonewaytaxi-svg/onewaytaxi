import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scripts', 'audit', 'output', 'crawl-report.json'), 'utf8'),
);
const { results, extraPaths, extraStatus, anchorCheck } = report;

const broken = extraPaths.filter((p) => {
  const st = extraStatus[p];
  return st && (st.title?.includes('Not Found') || st.h1?.toLowerCase().includes("couldn't find"));
});

console.log('BROKEN PATHS:', broken.length);
broken.forEach((p) => console.log(`  ${p}`));

console.log('\n===== WHICH PAGES LINK TO BROKEN PATHS =====');
for (const [route, d] of Object.entries(results)) {
  if (!d.links) continue;
  const hits = [...new Set(d.links.filter((l) => l && broken.includes(l.split('#')[0])))];
  if (hits.length) console.log(`${route} (${hits.length}): ${hits.join(', ')}`);
}

console.log('\n===== HASH LINKS SOURCES =====');
for (const [route, d] of Object.entries(results)) {
  if (!d.links) continue;
  const hashes = [...new Set(d.links.filter((l) => l && l.includes('#')))];
  if (hashes.length) console.log(`${route}: ${hashes.join(', ')}`);
}

console.log('\n===== EXTRA PATH STATUS DETAIL =====');
broken.forEach((p) => {
  console.log(`${p} :: ${JSON.stringify(extraStatus[p])}`);
});
