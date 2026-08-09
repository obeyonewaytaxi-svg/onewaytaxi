import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scripts', 'audit', 'output', 'crawl-report.json'), 'utf8'),
);
const { results } = report;

console.log('===== canonical / og:url / robots =====');
let badCanonical = 0;
for (const [route, d] of Object.entries(results)) {
  if (d.error) continue;
  const expected = `https://obeyonewaytaxi.com${route === '/' ? '/' : route}`;
  const canonOk = d.canonical === expected;
  const ogOk = d.ogUrl === expected;
  if (!canonOk || !ogOk) {
    badCanonical++;
    console.log(`${route}\n  canonical=${d.canonical} (expect ${expected}) ${canonOk ? 'OK' : 'MISMATCH'}\n  og:url=${d.ogUrl} ${ogOk ? 'OK' : 'MISMATCH'}`);
  }
}
console.log(badCanonical ? `\n${badCanonical} pages with canonical/og mismatch` : '\nAll canonical + og:url match');

console.log('\n===== robots meta (noindex pages) =====');
for (const [route, d] of Object.entries(results)) {
  if (d.robots) console.log(`${route} :: ${d.robots}`);
}

console.log('\n===== ogImage / twitter =====');
let noOgImage = 0;
for (const [route, d] of Object.entries(results)) {
  if (!d.ogImage) { noOgImage++; console.log(`${route} :: NO og:image`); }
  if (!d.twitterCard) console.log(`${route} :: NO twitter card`);
}
console.log(noOgImage ? `${noOgImage} pages missing og:image` : 'All pages have og:image');
