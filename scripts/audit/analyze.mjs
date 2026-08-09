import fs from 'node:fs';
import path from 'node:path';

const report = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scripts', 'audit', 'output', 'crawl-report.json'), 'utf8'),
);

const { results, consoleErrors, failedRequests, extraStatus, anchorCheck, extraPaths } = report;

console.log('===== SEO ISSUES =====');
const issues = [];
for (const [route, d] of Object.entries(results)) {
  if (d.error) { issues.push({ route, type: 'CRAWL_ERROR', detail: d.error }); continue; }
  if (!d.title) issues.push({ route, type: 'MISSING_TITLE' });
  if (!d.description) issues.push({ route, type: 'MISSING_DESCRIPTION' });
  if (!d.canonical) issues.push({ route, type: 'MISSING_CANONICAL' });
  if (d.canonical && !d.canonical.startsWith('https://obeyonewaytaxi.com')) issues.push({ route, type: 'BAD_CANONICAL', detail: d.canonical });
  if (d.h1s.length !== 1) issues.push({ route, type: 'H1_COUNT', detail: JSON.stringify(d.h1s) });
  if (d.robots?.includes('noindex') && !route.includes('not-found')) issues.push({ route, type: 'NOINDEX_ON_SITEMAP', detail: d.robots });
  if (!d.lang || d.lang !== 'en') issues.push({ route, type: 'LANG', detail: d.lang });
  if (d.brokenImages?.length) issues.push({ route, type: 'BROKEN_IMAGES', detail: JSON.stringify(d.brokenImages.map(i => i.src)) });
  if (d.imagesMissingAlt?.length) issues.push({ route, type: 'MISSING_ALT', detail: JSON.stringify(d.imagesMissingAlt.map(i => i.src)) });
  if (!d.ogImage) issues.push({ route, type: 'MISSING_OG_IMAGE' });
  if (!d.twitterCard) issues.push({ route, type: 'MISSING_TWITTER' });
}
for (const i of issues) console.log(`[${i.type}] ${i.route} :: ${i.detail ?? ''}`);

console.log('\n===== CONSOLE / NETWORK ERRORS =====');
for (const [route, errs] of Object.entries(consoleErrors)) {
  console.log(`CONSOLE ${route}:`);
  errs.forEach((e) => console.log(`   ${e.slice(0, 220)}`));
}
for (const [route, fails] of Object.entries(failedRequests)) {
  console.log(`NETFAIL ${route}:`);
  fails.forEach((f) => console.log(`   ${f.url.slice(0, 160)} :: ${f.error}`));
}

console.log('\n===== EXTRA (non-sitemap) INTERNAL PATHS =====');
for (const p of extraPaths) {
  const st = extraStatus[p];
  if (!st) { console.log(`${p} :: no-status`); continue; }
  if (st.error) console.log(`${p} :: ERROR ${st.error}`);
  else console.log(`${p} :: h1="${st.h1}" :: title="${st.title}"`);
}

console.log('\n===== ANCHOR LINKS (#hash) =====');
for (const [key, val] of Object.entries(anchorCheck)) {
  console.log(`${key} :: ${val.error ? 'ERROR ' + val.error : (val.idExists ? `OK (${val.targetTag})` : `MISSING ID`) }`);
}

console.log('\n===== TITLE DUPLICATES =====');
const titles = {};
for (const [route, d] of Object.entries(results)) {
  if (d.title) (titles[d.title] ||= []).push(route);
}
for (const [t, routes] of Object.entries(titles)) {
  if (routes.length > 1) console.log(`"${t}" (${routes.length}): ${routes.join(', ')}`);
}

console.log('\n===== H1 SNIPPETS (first 20) =====');
Object.entries(results).slice(0, 20).forEach(([route, d]) => {
  console.log(`${route} :: ${d.h1s?.[0] ?? '(none)'}`);
});
