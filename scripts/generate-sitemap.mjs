import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

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

/**
 * Real last-modified date for the source file that feeds a page, taken from git.
 *
 * Why not "today": stamping every URL with the build date tells Google all 102 pages
 * changed on every single deploy. Crawlers learn to ignore a lastmod that is always
 * fresh, and it also implies churn that isn't real.
 *
 * Why git and not file mtime: CI checkouts (Vercel does a shallow clone) reset mtime to
 * checkout time, which reproduces the same false signal.
 *
 * Returns null when git can't answer, in which case the tag is omitted entirely — an
 * absent lastmod is valid and honest, a wrong one is neither.
 */
function gitLastModified(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
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

// Extract blog posts from siteData.ts, keeping each post's own publication date so it can
// be used as a genuine lastmod for that URL.
const blogMatches = [...siteDataContent.matchAll(/slug:\s*'([^']+)',\s*title:[\s\S]{0,400}?datePublished:\s*'([^']+)'/g)];
const blogPosts = blogMatches.map((m) => ({ slug: m[1], datePublished: m[2] }));
const blogSlugs = blogPosts.map((b) => b.slug);
const blogDateBySlug = new Map(blogPosts.map((b) => [b.slug, b.datePublished]));

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
  // A blog post's own publish date is the most accurate lastmod we can claim.
  lastmod: blogDateBySlug.get(slug) ?? gitLastModified('src/data/siteData.ts'),
}));

// City pages are all rendered from cityData.ts, so one honest date covers them.
const cityLastmod = gitLastModified('src/data/cityData.ts');
const cityPages = citySlugs.map((slug) => ({
  path: `/drop-taxi-${slug}`,
  priority: '0.8',
  changefreq: 'weekly',
  lastmod: cityLastmod,
}));

// Route pages (and their shared fare engine) are driven by siteData.ts + booking.ts.
const routeLastmod = gitLastModified('src/data/siteData.ts');
const routeBookingLastmod = gitLastModified('src/lib/booking.ts');
const effectiveRouteLastmod =
  routeLastmod && routeBookingLastmod
    ? routeLastmod > routeBookingLastmod
      ? routeLastmod
      : routeBookingLastmod
    : routeLastmod ?? routeBookingLastmod;
const routePages = routes.map((r) => ({
  path: `/routes/${r.slug}`,
  priority: r.popular ? '0.8' : '0.7',
  changefreq: 'weekly',
  lastmod: effectiveRouteLastmod,
}));

// Static pages: resolve each to the page component that renders it, falling back to the
// shared layout/data files that any page-level edit would also touch.
const STATIC_SOURCE_HINTS = {
  '/': ['src/pages/HomePage.tsx'],
  '/routes': ['src/pages/RoutesPage.tsx'],
  '/cities': ['src/pages/CitiesPage.tsx'],
  '/tariff': ['src/pages/TariffPage.tsx'],
  '/fare-calculator': ['src/pages/FareCalculatorPage.tsx'],
  '/fleet': ['src/pages/FleetPage.tsx'],
  '/one-way-taxi': ['src/pages/ServicePage.tsx'],
  '/round-trip': ['src/pages/ServicePage.tsx'],
  '/airport-transfer': ['src/pages/ServicePage.tsx'],
  '/outstation': ['src/pages/ServicePage.tsx'],
  '/blog': ['src/pages/BlogPage.tsx'],
  '/reviews': ['src/pages/ReviewsPage.tsx'],
  '/about': ['src/pages/AboutPage.tsx'],
  '/faq': ['src/pages/FaqPage.tsx'],
  '/contact': ['src/pages/ContactPage.tsx'],
  '/privacy-policy': ['src/pages/PrivacyPolicyPage.tsx'],
  '/terms': ['src/pages/TermsPage.tsx'],
  '/cancellation-policy': ['src/pages/CancellationPolicyPage.tsx'],
  '/refund-policy': ['src/pages/RefundPolicyPage.tsx'],
  '/sitemap': ['src/pages/SitemapPage.tsx'],
};
const staticLastmodCache = new Map();
for (const page of staticPages) {
  const sources = STATIC_SOURCE_HINTS[page.path] ?? [];
  let newest = null;
  for (const src of sources) {
    if (!staticLastmodCache.has(src)) staticLastmodCache.set(src, gitLastModified(src));
    const d = staticLastmodCache.get(src);
    if (d && (!newest || d > newest)) newest = d;
  }
  page.lastmod = newest;
}

const allPages = [...staticPages, ...blogPages, ...cityPages, ...routePages];

/**
 * A lastmod in the future is invalid — Google ignores it and it makes the sitemap look
 * machine-generated. Blog posts are dated ahead of time in siteData.ts, so clamp anything
 * beyond today back to today.
 */
const TODAY = new Date().toISOString().split('T')[0];
const clampToToday = (d) => (d && d > TODAY ? TODAY : d);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) =>
      `  <url>\n    <loc>${DOMAIN}${page.path}</loc>\n` +
      (page.lastmod ? `    <lastmod>${clampToToday(page.lastmod)}</lastmod>\n` : '') +
      `    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
const dated = allPages.filter((p) => p.lastmod).length;
const distinct = new Set(allPages.map((p) => clampToToday(p.lastmod)).filter(Boolean)).size;
const futureClamped = allPages.filter((p) => p.lastmod && p.lastmod > TODAY).length;
console.log(
  `Generated sitemap.xml with ${allPages.length} URLs (routes: ${routes.length}, cities: ${citySlugs.length}, blog: ${blogSlugs.length}).`,
);
console.log(`  lastmod: ${dated}/${allPages.length} dated, ${distinct} distinct date(s).`);
if (futureClamped > 0) {
  console.log(`  note: clamped ${futureClamped} future-dated post date(s) back to today.`);
}
