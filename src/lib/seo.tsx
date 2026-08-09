import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site';
import { webPageSchema } from './schema';
import type { SeoProps } from '../types';

const defaultImage = `${siteConfig.domain}/branding-image.png`;

export function Seo({
  title,
  description = siteConfig.description,
  keywords,
  path = '/',
  type = 'website',
  image = defaultImage,
  jsonLd,
  noindex = false,
}: SeoProps) {
  const brand = siteConfig.name;
  const titleSuffix = ` | ${brand}`;
  const fullTitle = title
    ? title.includes(brand)
      ? title
      : `${title}${titleSuffix}`
    : `${brand} | Premium One Way Taxi Service`;
  const url = `${siteConfig.domain}${path}`;
  const metaKeywords = keywords?.length ? keywords.join(', ') : siteConfig.keywords;
  const pageTitle = title ?? brand;
  const schema: object[] = noindex
    ? []
    : [
        webPageSchema(path, pageTitle, description),
        ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
      ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
