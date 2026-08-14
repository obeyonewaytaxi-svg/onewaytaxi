import fs from 'node:fs';

const slugs = [
  'chennai-to-bangalore-taxi-cost',
  'vellore-to-bangalore-taxi-guide',
  'salem-to-bangalore-taxi-guide',
  'chennai-to-madurai-taxi-guide',
  'chennai-to-pondicherry-weekend-guide',
  'coimbatore-to-bangalore-taxi-guide',
  'madurai-to-bangalore-taxi-guide',
  'one-way-taxi-fare-breakdown',
  'how-to-book-outstation-taxi-tamil-nadu',
  'night-outstation-taxi-safety-tips',
];

let ok = 0;
for (const slug of slugs) {
  const html = fs.readFileSync(`dist/blog/${slug}/index.html`, 'utf8');
  const hasBlogPosting = html.includes('"BlogPosting"');
  const hasHeading = html.includes('<h2');
  const hasLink = html.includes('class="font-semibold text-brand-secondary-text underline');
  const hasTitle = html.includes(slug.replace(/-/g, ' '));
  const verdict = hasBlogPosting && hasHeading && hasLink ? 'OK' : 'FAIL';
  if (verdict === 'OK') ok++;
  console.log(`${verdict.padEnd(4)} ${slug.padEnd(44)} posting=${hasBlogPosting} h2=${hasHeading} links=${hasLink}`);
}
console.log(`\n${ok}/${slugs.length} posts verified`);
