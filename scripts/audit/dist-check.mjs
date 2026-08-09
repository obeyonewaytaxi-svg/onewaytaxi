import fs from 'node:fs';
import path from 'node:path';

const DIST = path.join(process.cwd(), 'dist');
const SUFFIX = ' | Obey One Way Taxi';

const pages = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html') pages.push(full);
  }
};
walk(DIST);

const pathFromPage = (p) => {
  const rel = path.relative(DIST, p).replace(/\\/g, '/');
  return rel === 'index.html' ? '/' : '/' + rel.replace(/\/index\.html$/, '');
};

const titleIssues = [];
const descIssues = [];
const linkIssues = [];
const h1Issues = [];
let checkedLinks = 0;

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const url = pathFromPage(page);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  if (title.length > 60) titleIssues.push(`${url}: title ${title.length} chars — "${title}"`);

  const descEl = html.match(/name="description" content="([\s\S]*?)"/);
  if (descEl) {
    const d = descEl[1];
    if (d.length < 120 || d.length > 160) descIssues.push(`${url}: desc ${d.length} chars — "${d.slice(0, 80)}…"`);
  } else {
    descIssues.push(`${url}: NO meta description`);
  }

  const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
  if (h1Count !== 1) h1Issues.push(`${url}: ${h1Count} H1s`);

  const links = [...html.matchAll(/href="([^"#]+)(#[^"]*)?"/g)]
    .map((m) => m[1])
    .filter((h) => h.startsWith('/'))
    .filter((h) => !h.startsWith('/assets/'))
    .filter((h) => !/\.(png|ico|svg|webp|jpg|jpeg|css|js|xml|txt|html)$/i.test(h));
  for (const href of links) {
    checkedLinks++;
    const target = path.join(DIST, href === '/' ? 'index.html' : href.replace(/^\/+/, '') + '/index.html');
    if (!fs.existsSync(target)) {
      linkIssues.push(`${url} -> MISSING ${href}`);
    }
  }
}

console.log(`pages checked: ${pages.length}`);
console.log(`internal links checked: ${checkedLinks}`);
console.log(`\n--- TITLES >60 (${titleIssues.length}) ---`);
console.log(titleIssues.length ? titleIssues.join('\n') : 'none');
console.log(`\n--- DESCRIPTIONS outside 120-160 (${descIssues.length}) ---`);
console.log(descIssues.length ? descIssues.join('\n') : 'none');
console.log(`\n--- H1 count issues (${h1Issues.length}) ---`);
console.log(h1Issues.length ? h1Issues.join('\n') : 'none');
console.log(`\n--- BROKEN INTERNAL LINKS (${linkIssues.length}) ---`);
console.log(linkIssues.length ? linkIssues.join('\n') : 'none');
