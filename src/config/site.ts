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
  // The previous value (https://g.page/r/2sI1MGqBqn0/review) redirected to the Google
  // homepage instead of a review form, so every customer sent there collected nothing.
  //
  // This is Google's own review-form endpoint for the verified place ID
  // (ChIJcxbGsRr3UjoRfaqBajA1wto = the "Obey One Way Taxi" listing). It drops the customer
  // straight into the rate-and-review flow; a signed-out visitor is sent to sign in and
  // then returned to the form, which the old short link did not do.
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJcxbGsRr3UjoRfaqBajA1wto',
  // Public off-site profiles. These become the `sameAs` array in the LocalBusiness/TaxiService
  // schema, which tells Google these profiles describe the SAME business. Only add a URL here
  // once the listing is live and its name/phone exactly match the NAP above.
  profiles: {
    // Google Business Profile listing (CID derived from the place ID above).
    google: 'https://www.google.com/maps?cid=15763220127811742333',
    justdial: '',
    sulekha: '',
    facebook: '',
    instagram: '',
  },
  address: {
    // Locality/city/region/PIN copied from the Google Business Profile listing
    // ("01, Abdulkalam St, Potheri, bhuvaneswari Amman Nagar, Thailavaram, Kattankulathur,
    // Thailavaram, Tamil Nadu 603203"). Kept consistent with GBP intentionally — Google
    // cross-references this address with the profile.
    locality: 'Potheri',
    region: 'Tamil Nadu',
    country: 'IN',
    postalCode: '603203',
    streetAddress: '01, Abdulkalam St, Potheri',
  },
  geo: {
    latitude: 12.8352401,
    longitude: 80.0419478,
  },
  rating: {
    value: '4.9',
    sources: 'across Google, Justdial and WhatsApp',
  },
  gbp: {
    // Verified from the public listing on 2026-10-03. Used to keep the site's claims
    // consistent with what a visitor actually sees on the profile.
    placeId: 'ChIJcxbGsRr3UjoRfaqBajA1wto',
    cid: '15763220127811742333',
    reviewCount: 9,
    listingUrl: 'https://www.google.com/maps?cid=15763220127811742333',
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
