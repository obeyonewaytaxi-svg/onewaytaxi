import { siteConfig } from '../config/site';
import type { Route, Service, Review, FaqItem, Cab } from '../types';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': `${siteConfig.domain}/#localbusiness`,
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    areaServed: siteConfig.areaServed,
    url: siteConfig.domain,
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1820',
    },
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.path}`,
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: `${service.title} | ${siteConfig.name}`,
    description: service.description,
    provider: { '@id': `${siteConfig.domain}/#localbusiness` },
    areaServed: siteConfig.areaServed,
  };
}

export function routeSchema(route: Route) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    name: `${route.origin} to ${route.destination} Taxi Service`,
    description: `Book a premium one-way taxi from ${route.origin} to ${route.destination}, a ${route.distanceKm} km journey.`,
    distance: `${route.distanceKm} km`,
    provider: { '@id': `${siteConfig.domain}/#localbusiness` },
    itinerary: [
      { '@type': 'ListItem', position: 1, name: route.origin },
      { '@type': 'ListItem', position: 2, name: route.destination },
    ],
  };
}

export function reviewSchema(reviews: Review[]) {
  const review = reviews[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': `${siteConfig.domain}/#localbusiness` },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(review?.rating ?? 5),
      bestRating: '5',
    },
    author: { '@type': 'Person', name: review?.name ?? 'Verified Traveller' },
    reviewBody: review?.quote ?? '',
  };
}

export function carSchema(cab: Cab) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${cab.title} Taxi | ${siteConfig.name}`,
    description: cab.description,
    image: cab.image,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: cab.rate,
      availability: 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear()}-12-31`,
      url: `${siteConfig.domain}/fleet`,
    },
    brand: { '@type': 'Brand', name: cab.model },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/logo-square.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      availableLanguage: ['en', 'ta'],
    },
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.domain}/#organization` },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.domain}/fare-calculator?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageSchema(path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${siteConfig.domain}${path}`,
    isPartOf: { '@id': `${siteConfig.domain}/#website` },
    about: { '@id': `${siteConfig.domain}/#organization` },
    inLanguage: 'en',
  };
}

export function blogPostingSchema(post: { slug: string; title: string; excerpt: string; date: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `${siteConfig.domain}/blog/${post.slug}`,
    mainEntityOfPage: `${siteConfig.domain}/blog/${post.slug}`,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.domain },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.domain}/logo-square.png` },
    },
  };
}

export function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Obey One Way Taxi',
    url: `${siteConfig.domain}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: 'bookings@obeyonewaytaxi.com',
      areaServed: 'South India',
      openingHours: 'Mo-Su 00:00-24:00',
    },
  };
}
