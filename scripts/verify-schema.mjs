import fs from 'node:fs';

const html = fs.readFileSync('dist/fleet/index.html', 'utf8');
const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim() || 'NONE';
console.log('title:', title);
console.log('root has children:', /<div id="root">\s*<div/.test(html));
console.log('html len:', html.length);
const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => {
  try {
    return JSON.parse(m[1]);
  } catch {
    return { parseError: m[1].slice(0, 80) };
  }
});
console.log('JSON-LD blocks:', blocks.length);
console.log('types:', blocks.map((b) => (b['@graph'] ? 'graph(' + b['@graph'].length + ')' : Array.isArray(b) ? 'array(' + b.length + ')' : b['@type'])));
const all = blocks.flatMap((b) => (b['@graph'] ? b['@graph'] : Array.isArray(b) ? b : [b]));
const prods = all.filter((b) => b['@type'] === 'Product');
console.log('Product blocks:', prods.length);
if (prods.length) {
  console.log('has availability:', prods.every((p) => p.offers?.availability === 'https://schema.org/InStock'));
  console.log('has priceValidUntil:', prods.every((p) => /^\d{4}-\d{2}-\d{2}$/.test(p.offers?.priceValidUntil ?? '')));
  console.log('has image:', prods.every((p) => p.image));
  console.log('sample:', JSON.stringify(prods[0].offers));
}
