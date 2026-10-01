export const siteConfig = {
  name: 'Obey One Way Taxi',
  shortName: 'Obey Taxi',
  domain: 'https://obeyonewaytaxi.com',
  tagline: 'Luxury travel, simplified.',
  description:
    'Premium one-way taxi service across Tamil Nadu and South India, with verified drivers, transparent per-km pricing, instant WhatsApp booking, and 24/7 support.',
  phone: '+918667219259',
  phoneDisplay: '+91 86672 19259',
  whatsapp: '918667219259',
  email: 'bookings@obeyonewaytaxi.com',
  googleReviewUrl: 'https://g.page/r/2sI1MGqBqn0/review', // Google Business Profile review link (Google Maps > Your Business > Share review form)
  // Public off-site profiles. These become the `sameAs` array in the LocalBusiness/TaxiService
  // schema, which tells Google these profiles describe the SAME business. Only add a URL here
  // once the listing is live and its name/phone exactly match the NAP above.
  profiles: {
    google: '', // Google Business Profile / Google Maps listing URL
    justdial: '',
    sulekha: '',
    facebook: '',
    instagram: '',
  },
  address: {
    locality: 'Chennai',
    region: 'Tamil Nadu',
    country: 'IN',
  },
  geo: {
    latitude: 12.8352401,
    longitude: 80.0419478,
  },
  rating: {
    value: '4.9',
    sources: 'across Google, Justdial and WhatsApp',
  },
  // Named cities we actually serve. Used for schema `areaServed` so the local signal is
  // specific instead of the vague "South India".
  serviceCities: [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Erode',
    'Vellore',
    'Puducherry',
    'Bengaluru',
  ],
  areaServed: 'South India',
  openingHours: 'Mo-Su 00:00-23:59',
  keywords:
    'drop taxi, one way taxi, one way drop cab, outstation cab service, drop taxi near me, one way car rental, cheap one way cab, no return fare taxi, 24/7 outstation taxi, airport drop taxi booking, transparent fare outstation cab, Chennai drop taxi, Coimbatore drop taxi, Madurai to Chennai one way cab, Trichy drop taxi service, drop taxi from Bangalore, cheap outstation drop taxi Tamil Nadu',
  analytics: {
    ga4Id: 'G-X6ZJXK09T1', // Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)
    clarityId: 'y1nadvf2c3', // Microsoft Clarity Project ID (e.g. xxxxxxxx)
  },
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
