import { siteConfig } from '../config/site';
import type { Route } from '../types';
import { routes } from './siteData';

export type CityContent = {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  areas: string[];
  landmarks: string[];
  airport: string;
  faqs: { q: string; a: string }[];
};

const c = siteConfig.phoneDisplay;
const wa = `WhatsApp ${siteConfig.phoneDisplay}`;

export const cityContent: Record<string, CityContent> = {
  chennai: {
    slug: 'chennai',
    name: 'Chennai',
    tagline: 'Drop taxi from Chennai',
    metaTitle: 'Chennai Drop Taxi & One Way Cab',
    metaDescription:
      'Book a Chennai drop taxi or one way cab to Coimbatore, Madurai, Trichy and Bangalore. Transparent fares, no return fare taxi and 24/7 outstation cab service.',
    intro: [
      `Obey One Way Taxi runs premium drop taxi and one way cab services from Chennai to every major city in Tamil Nadu and South India. Whether you are heading to Coimbatore, Madurai, Trichy, Salem, Bangalore or Pondicherry, you pay only for one direction — no return fare taxi charges.`,
      `Every Chennai cab is a verified, sanitized vehicle with a professional chauffeur. You get an instant transparent fare on the route page and same-day WhatsApp confirmation. Book your Chennai drop taxi today at ${c}.`,
    ],
    areas: ['T Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'OMR', 'Tambaram', 'Guindy', 'Egmore'],
    landmarks: ['Chennai Airport', 'Chennai Central', 'Egmore Station', 'Marina Beach', 'IT Corridor OMR'],
    airport: 'Chennai International Airport (MAA)',
    faqs: [
      { q: 'How much is a Chennai drop taxi?', a: 'Fares are transparent per-km based on cab type and destination. Check the route page for an instant estimate — you pay only for the one-way drop, with no return fare.' },
      { q: 'Does the Chennai taxi include tolls?', a: 'Tolls and parking are included in the final fare for most routes, and we confirm a transparent estimate before you book.' },
      { q: 'Do you pick up from Chennai Airport?', a: 'Yes. We offer airport pickup and drop taxi service from Chennai International Airport with flight tracking on request.' },
    ],
  },
  madurai: {
    slug: 'madurai',
    name: 'Madurai',
    tagline: 'Drop taxi from Madurai',
    metaTitle: 'Madurai to Chennai One Way Cab',
    metaDescription:
      'Book a Madurai to Chennai one way cab or drop taxi to Trichy, Coimbatore and Bangalore. Cheap one way cab with transparent fares and verified drivers.',
    intro: [
      `Travel from Madurai with Obey One Way Taxi and enjoy genuine one-way pricing. Our Madurai drop taxi service covers Chennai, Trichy, Coimbatore, Salem and Bangalore with comfortable sedans, SUVs and Innova cars.`,
      `The Madurai to Chennai one way cab is our most booked route — a 435 km journey with no return fare taxi charges. Get an instant quote, verified driver and door-to-door pickup at ${c}.`,
    ],
    areas: ['Anna Nagar', 'KK Nagar', 'Simmakkal', 'Goripalayam', 'Mattuthavani', 'Arappalayam'],
    landmarks: ['Madurai Meenakshi Temple', 'Madurai Junction', 'Vaigai Dam', 'Thirumalai Nayakkar Palace'],
    airport: 'Madurai International Airport (IXM)',
    faqs: [
      { q: 'How do I book a Madurai to Chennai one way cab?', a: 'Choose the Madurai to Chennai route page, select your cab and send the booking via WhatsApp. You pay only for the one-way drop.' },
      { q: 'Are there cheap one way cab options from Madurai?', a: 'Yes. Our sedan one way cab is the most affordable option, with transparent per-km pricing and no return fare.' },
      { q: 'Do you serve Madurai Meenakshi Temple pickups?', a: 'Yes, we offer doorstep pickup from anywhere in Madurai, including temples, hotels and the railway junction.' },
    ],
  },
  coimbatore: {
    slug: 'coimbatore',
    name: 'Coimbatore',
    tagline: 'Drop taxi from Coimbatore',
    metaTitle: 'Coimbatore Drop Taxi & One Way Cab',
    metaDescription:
      'Book a Coimbatore drop taxi or one way cab to Chennai, Bangalore, Ooty and Madurai. Transparent outstation cab fares, no return fare taxi and 24/7 support.',
    intro: [
      `Obey One Way Taxi connects Coimbatore with Chennai, Bangalore, Ooty, Madurai, Salem and Trichy through premium drop taxi and one way cab service. Perfect for the scenic Coimbatore to Ooty hill run or long intercity journeys.`,
      `Enjoy transparent outstation cab fares, verified drivers and instant WhatsApp confirmation. Call or message ${c} to book your Coimbatore one way cab today.`,
    ],
    areas: ['RS Puram', 'Gandhipuram', 'Saibaba Colony', 'Peelamedu', 'Kuniyamuthur', 'Race Course'],
    landmarks: ['Coimbatore Airport', 'Codissia Trade Fair', 'Marudamalai Temple', 'Siruvani Dam'],
    airport: 'Coimbatore International Airport (CJB)',
    faqs: [
      { q: 'How much does a Coimbatore drop taxi cost?', a: 'Fares follow transparent per-km pricing by cab type. The Coimbatore to Chennai one way cab is one of our most booked long routes.' },
      { q: 'Can I book a Coimbatore to Ooty taxi?', a: 'Yes. The Coimbatore to Ooty drive (170 km) is a favourite — book an SUV or Innova for comfort on the hill climb.' },
      { q: 'Do you offer Coimbatore airport transfers?', a: 'Yes, we provide airport pickup and drop from Coimbatore International Airport with flight tracking available.' },
    ],
  },
  trichy: {
    slug: 'trichy',
    name: 'Trichy',
    tagline: 'Drop taxi from Trichy',
    metaTitle: 'Trichy Drop Taxi & One Way Cab',
    metaDescription:
      'Book a Trichy drop taxi service or one way cab to Chennai, Madurai, Salem and Pondicherry. Verified drivers, transparent fares and 24/7 availability.',
    intro: [
      `Trichy travellers trust Obey One Way Taxi for reliable drop taxi and one way cab service to Chennai, Madurai, Salem, Coimbatore and Pondicherry. Ideal for pilgrimage, business and weekend trips across Tamil Nadu.`,
      `Our Trichy taxi service offers transparent per-km fares with no return fare taxi charges, verified drivers and round-the-clock support at ${c}.`,
    ],
    areas: ['Srirangam', 'Woraiyur', 'Thillai Nagar', 'KK Nagar', 'Ponmalaipatti', 'Uyyakondan Thirumalai'],
    landmarks: ['Rockfort Temple', 'Sri Ranganathaswamy Temple', 'Trichy Junction', 'Jambukeswarar Temple'],
    airport: 'Tiruchirappalli International Airport (TRZ)',
    faqs: [
      { q: 'What routes do Trichy drop taxis cover?', a: 'We cover Chennai, Madurai, Salem, Coimbatore and Pondicherry with one way and round trip options.' },
      { q: 'Is a Trichy to Chennai taxi available at night?', a: 'Yes. We operate 24/7 including nights and public holidays across Tamil Nadu.' },
      { q: 'Are tolls included in Trichy cab fares?', a: 'Tolls and parking are included in the final fare for most routes, confirmed before booking.' },
    ],
  },
  salem: {
    slug: 'salem',
    name: 'Salem',
    tagline: 'Drop taxi from Salem',
    metaTitle: 'Salem Drop Taxi & One Way Cab',
    metaDescription:
      'Book a Salem drop taxi or one way cab to Chennai, Coimbatore, Bangalore and Erode. Transparent fares, verified drivers, no return fare taxi and doorstep pickup.',
    intro: [
      `Obey One Way Taxi provides comfortable drop taxi and one way cab service from Salem to Chennai, Coimbatore, Bangalore and Erode. Salem's central location makes it a key hub for South India travel.`,
      `Every Salem taxi comes with transparent pricing, a verified chauffeur and instant WhatsApp confirmation. Call ${c} to book your ride.`,
    ],
    areas: ['Ammapet', 'Swarnapuri', 'Kitchipalayam', 'Meyyanur', 'Fairlands', 'Gugai'],
    landmarks: ['Salem Junction', 'Yercaud Hill Station', 'Thirumanimutharu Dam', 'ISKCON Temple'],
    airport: 'Salem Airport (SXV) — limited service; nearest major airport: Coimbatore',
    faqs: [
      { q: 'How do I book a Salem drop taxi?', a: 'Select your route, cab and travel date on the route page, then send the booking via WhatsApp for instant confirmation.' },
      { q: 'Do you cover Yercaud from Salem?', a: 'Yes. We offer one way cab service from Salem to Yercaud and other nearby hill stations.' },
      { q: 'Are there cheap one way cabs from Salem?', a: 'Our sedan one way cab offers the best value with transparent per-km pricing and no return fare.' },
    ],
  },
  erode: {
    slug: 'erode',
    name: 'Erode',
    tagline: 'Drop taxi from Erode',
    metaTitle: 'Erode Drop Taxi & One Way Cab',
    metaDescription:
      'Book an Erode drop taxi or one way cab to Chennai, Coimbatore, Salem and Bangalore. Transparent fares, verified drivers, no return fare taxi and 24/7 service.',
    intro: [
      `Obey One Way Taxi connects Erode with Chennai, Coimbatore, Salem and Bangalore through reliable drop taxi and one way cab service. Long journeys become simple with door-to-door pickup and fixed transparent fares.`,
      `Pay only for the drop — no return fare taxi charges. Book your Erode one way cab at ${c} and get instant WhatsApp confirmation.`,
    ],
    areas: ['Erode Junction', 'Perundurai', 'Brough Road', 'Sathy Road', 'Chithode', 'Nasiyanur'],
    landmarks: ['Erode Railway Junction', 'Kongu Nadu', 'Bhavani River', 'VE Commercial Corridor'],
    airport: 'Nearest airports: Coimbatore International Airport (CJB)',
    faqs: [
      { q: 'What is the Erode to Chennai taxi fare?', a: 'The Erode to Chennai route is about 400 km. Get an instant transparent quote on the route page by cab type.' },
      { q: 'Do you provide Erode to Coimbatore drop taxis?', a: 'Yes, we cover short and long routes from Erode with sedans, SUVs and Innova vehicles.' },
      { q: 'Is the Erode cab service available 24/7?', a: 'Yes, our outstation taxi service operates 24/7 including public holidays.' },
    ],
  },
  vellore: {
    slug: 'vellore',
    name: 'Vellore',
    tagline: 'Drop taxi from Vellore',
    metaTitle: 'Vellore Drop Taxi & One Way Cab',
    metaDescription:
      'Book a Vellore drop taxi or one way cab to Bangalore, Chennai and beyond. Transparent fares, verified drivers and no return fare taxi.',
    intro: [
      `Obey One Way Taxi offers drop taxi and one way cab service from Vellore to Bangalore, Chennai and other South India destinations. Perfect for hospital visits, business travel and weekend getaways.`,
      `Enjoy transparent one-way pricing with no return fare, a verified chauffeur and instant booking. Call ${c} to book your Vellore taxi.`,
    ],
    areas: ['Vellore Fort', 'Katpadi', 'Sathuvachari', 'Viruthampet', 'Bagayam', 'Gandhi Nagar'],
    landmarks: ['Vellore Fort', 'CMC Hospital', 'Katpadi Junction', 'Jalakandeswarar Temple'],
    airport: 'Nearest airports: Chennai International Airport (MAA), Bangalore (BLR)',
    faqs: [
      { q: 'Do you provide Vellore to Bangalore drop taxis?', a: 'Yes, the Vellore to Bangalore route (about 210 km) is well served with one way cab and round trip options.' },
      { q: 'Is a Vellore cab available for CMC Hospital?', a: 'Yes, we offer doorstep pickup anywhere in Vellore including hospitals, hotels and the railway station.' },
      { q: 'Are fares transparent on Vellore routes?', a: 'Yes, every route shows a clear per-km fare estimate with no hidden charges.' },
    ],
  },
  pondicherry: {
    slug: 'pondicherry',
    name: 'Pondicherry',
    tagline: 'Drop taxi from Pondicherry',
    metaTitle: 'Pondicherry Drop Taxi & One Way Cab',
    metaDescription:
      'Book a Pondicherry drop taxi or one way cab to Chennai, Trichy and beyond. Transparent fares, verified drivers, no return fare taxi and 24/7 outstation service.',
    intro: [
      `Obey One Way Taxi runs premium drop taxi and one way cab service from Pondicherry to Chennai, Trichy and other South India cities. The scenic coastal run to Chennai (165 km) is one of our most popular trips.`,
      `Book with transparent fares, no return fare taxi charges and instant WhatsApp confirmation. Contact ${c} to reserve your Pondicherry taxi.`,
    ],
    areas: ['White Town', 'Kamaraj Nagar', 'Mudaliarpet', 'Lawspet', 'Oulgaret', 'Villianur'],
    landmarks: ['Auroville', 'Promenade Beach', 'Sri Aurobindo Ashram', 'Paradise Beach'],
    airport: 'Nearest airport: Chennai International Airport (MAA) — Pondicherry Airport has limited service',
    faqs: [
      { q: 'How much is a Pondicherry to Chennai drop taxi?', a: 'The route is about 165 km. Get an instant transparent quote by cab type on the route page.' },
      { q: 'Do you offer Pondicherry airport transfers?', a: 'We arrange pickups to and from Chennai Airport for Pondicherry travellers.' },
      { q: 'Are one way fares available from Pondicherry?', a: 'Yes, all our cabs from Pondicherry are available as one way drops with no return fare.' },
    ],
  },
  bangalore: {
    slug: 'bangalore',
    name: 'Bangalore',
    tagline: 'Drop taxi from Bangalore',
    metaTitle: 'Bangalore to Chennai One Way Cab',
    metaDescription:
      'Book a drop taxi from Bangalore to Chennai, Coimbatore and Madurai. Cheap one way cab with transparent fares, no return fare taxi and verified drivers.',
    intro: [
      `Obey One Way Taxi serves the Bangalore corridor with premium drop taxi and one way cab service to Chennai, Coimbatore, Madurai, Vellore and Salem. The Bangalore to Chennai route (350 km) is among South India's busiest intercity connections.`,
      `Every Bangalore cab features transparent outstation fares, verified drivers and no return fare taxi charges. Book instantly at ${c} or via ${wa}.`,
    ],
    areas: ['MG Road', 'Indiranagar', 'Koramangala', 'Whitefield', 'Electronic City', 'HSR Layout'],
    landmarks: ['Kempegowda Airport', 'Majestic Station', 'Tech Parks', 'Marathahalli'],
    airport: 'Kempegowda International Airport (BLR)',
    faqs: [
      { q: 'Do you offer Bangalore to Chennai one way cabs?', a: 'Yes, the Bangalore to Chennai route (about 350 km) is one of our most booked one way drops.' },
      { q: 'Can I book a drop taxi from Bangalore airport?', a: 'Yes, we offer pickup and drop taxi service from Kempegowda International Airport with flight tracking.' },
      { q: 'Are there cheap one way cabs from Bangalore?', a: 'Our sedan one way cab is the most affordable with transparent per-km pricing and no return fare.' },
    ],
  },
};

export function getCityContent(slug: string): CityContent | undefined {
  return cityContent[slug];
}

export function getCityRoutes(citySlug: string): Route[] {
  const name = cityContent[citySlug]?.name;
  if (!name) return [];
  return routes.filter((r) => r.origin.toLowerCase() === citySlug);
}

export function getRelatedCities(citySlug: string): CityContent[] {
  const relatedSlugs: Record<string, string[]> = {
    chennai: ['coimbatore', 'madurai', 'trichy', 'salem', 'pondicherry', 'bangalore'],
    madurai: ['chennai', 'trichy', 'coimbatore', 'salem'],
    coimbatore: ['chennai', 'bangalore', 'madurai', 'salem'],
    trichy: ['chennai', 'madurai', 'salem', 'pondicherry'],
    salem: ['chennai', 'coimbatore', 'erode'],
    erode: ['chennai', 'coimbatore', 'salem'],
    vellore: ['chennai', 'bangalore'],
    pondicherry: ['chennai', 'trichy'],
    bangalore: ['chennai', 'coimbatore', 'madurai', 'vellore', 'salem'],
  };
  return (relatedSlugs[citySlug] ?? []).map((s) => cityContent[s]).filter(Boolean);
}
