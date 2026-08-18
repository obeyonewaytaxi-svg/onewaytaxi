import fs from 'node:fs';
import path from 'node:path';

const DOMAIN = 'https://obeyonewaytaxi.com';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function makeSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract routes from siteData.ts
const siteDataContent = fs.readFileSync(path.join(process.cwd(), 'src/data/siteData.ts'), 'utf8');
const routeMatches = [...siteDataContent.matchAll(/origin:\s*'([^']+)',\s*destination:\s*'([^']+)'/g)];

const routes = routeMatches.map((m) => {
  const origin = m[1];
  const destination = m[2];
  const slug = `${makeSlug(origin)}-to-${makeSlug(destination)}`;
  const popular = siteDataContent.slice(siteDataContent.indexOf(m[0]), siteDataContent.indexOf(m[0]) + 150).includes('popular: true');
  return { origin, destination, slug, popular };
});

// Extract blog posts from siteData.ts
const blogMatches = [...siteDataContent.matchAll(/slug:\s*'([^']+)',\s*title:/g)];
const blogSlugs = blogMatches.map((m) => m[1]);

// Extract cities from cityData.ts
const cityDataContent = fs.readFileSync(path.join(process.cwd(), 'src/data/cityData.ts'), 'utf8');
const cityMatches = [...cityDataContent.matchAll(/([a-z]+):\s*\{\s*slug:\s*'([^']+)'/g)];
const citySlugs = cityMatches.map((m) => m[2]);

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/routes', priority: '0.9', changefreq: 'weekly' },
  { path: '/cities', priority: '0.9', changefreq: 'weekly' },
  { path: '/tariff', priority: '0.9', changefreq: 'weekly' },
  { path: '/fare-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet', priority: '0.8', changefreq: 'weekly' },
  { path: '/one-way-taxi', priority: '0.9', changefreq: 'weekly' },
  { path: '/round-trip', priority: '0.8', changefreq: 'weekly' },
  { path: '/airport-transfer', priority: '0.8', changefreq: 'weekly' },
  { path: '/outstation', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/reviews', priority: '0.7', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/cancellation-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/refund-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/sitemap', priority: '0.4', changefreq: 'monthly' },
];

const blogPages = blogSlugs.map((slug) => ({
  path: `/blog/${slug}`,
  priority: '0.6',
  changefreq: 'monthly',
}));

const cityPages = citySlugs.map((slug) => ({
  path: `/cities/${slug}`,
  priority: '0.8',
  changefreq: 'weekly',
}));

const routePages = routes.map((r) => ({
  path: `/routes/${r.slug}`,
  priority: r.popular ? '0.8' : '0.7',
  changefreq: 'weekly',
}));

const aliasPages = [
  { path: '/drop-taxi-chennai', priority: '0.7', changefreq: 'weekly' },
  { path: '/drop-taxi-coimbatore', priority: '0.7', changefreq: 'weekly' },
  { path: '/drop-taxi-madurai', priority: '0.7', changefreq: 'weekly' },
  { path: '/drop-taxi-trichy', priority: '0.7', changefreq: 'weekly' },
  { path: '/drop-taxi-salem', priority: '0.7', changefreq: 'weekly' },
  { path: '/drop-taxi-vellore', priority: '0.7', changefreq: 'weekly' },
  { path: '/drop-taxi-bangalore', priority: '0.7', changefreq: 'weekly' },
  { path: '/drop-taxi-pondicherry', priority: '0.7', changefreq: 'weekly' },
];

const allPages = [...staticPages, ...blogPages, ...cityPages, ...aliasPages, ...routePages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${DOMAIN}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap.xml with ${allPages.length} URLs (routes: ${routes.length}, cities: ${citySlugs.length}, blog: ${blogSlugs.length}).`);
