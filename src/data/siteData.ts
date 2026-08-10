import { makeSlug } from '../lib/utils';
import type { Cab, Route, Service, FaqItem, Review, BlogPost } from '../types';

export const cabs: Cab[] = [
  {
    title: 'SEDAN',
    slug: 'sedan',
    rate: 15,
    roundTripRate: 14,
    image: 'https://images.ctfassets.net/0l86vrfc07lo/4LilTPxA25q4NamTiknCde/113a88e5c38642a5520be1a36d73ff66/swift.png',
    capacity: '4 Passengers',
    luggage: '2 bags',
    model: 'Swift Dzire, Xcent or similar',
    description: 'Compact comfort for personal and family travel at the best per-km value.',
    details: ['Compact comfort', 'Ideal for 2-3 passengers', 'Budget-friendly', 'AC & Music System', 'Driver charge: ₹400/day'],
  },
  {
    title: 'SUV',
    slug: 'suv',
    rate: 20,
    roundTripRate: 19,
    image: 'https://images.ctfassets.net/0l86vrfc07lo/2DgumUfYMyyTXynwnEvicL/8e6499b6fc40c20a93c76bbbf74ee558/xylo.png',
    capacity: '6 Passengers',
    luggage: '3 bags',
    model: 'Xylo, Tavera, Lodgy or similar',
    description: 'Spacious SUV for larger groups and extra luggage on long highway routes.',
    details: ['More luggage room', 'Comfort for 4-6 passengers', 'Premium interiors', 'Driver charge: ₹400/day'],
  },
  {
    title: 'INNOVA',
    slug: 'innova',
    rate: 20,
    roundTripRate: 19,
    image: 'https://images.ctfassets.net/rr5qju42sruw/3szuZdWluw7DnMma4BybLz/4d7b3f64d0e10355461f38ed42ce3ac4/364-3644176_toyoto-innova-innova-car-2-5-g.png',
    capacity: '6-7 Passengers',
    luggage: '3 bags',
    model: 'Toyota Innova',
    description: 'Premium MPV built for families, business travel and airport transfers.',
    details: ['Ample legroom', 'Business friendly', 'Reliable long-distance ride', 'Driver charge: ₹400/day'],
  },
  {
    title: 'CRYSTA',
    slug: 'crysta',
    rate: 24,
    roundTripRate: 24,
    image: 'https://images.ctfassets.net/509kpi6dw56l/4NoDjjaAsRnvYsF8jruFtE/6512b6391b82f038d78e4f3717ae43f0/innova-crysta.webp',
    capacity: '6-7 Passengers',
    luggage: '4 bags',
    model: 'Innova Crysta',
    description: 'Luxury MPV with executive seating and the most premium ride experience.',
    details: ['Executive travel', 'Extra comfort', 'Premium service experience', 'Driver charge: ₹400/day'],
  },
];

export function findCabByTitle(title: string): Cab | undefined {
  return cabs.find((cab) => cab.title === title || cab.slug === title);
}

export const routes: Route[] = ([
  { name: 'Chennai → Coimbatore', origin: 'Chennai', destination: 'Coimbatore', distanceKm: 495, durationHours: '8h 30m', via: 'Salem', popular: true },
  { name: 'Chennai → Madurai', origin: 'Chennai', destination: 'Madurai', distanceKm: 435, durationHours: '7h 30m', via: 'Trichy', popular: true },
  { name: 'Chennai → Trichy', origin: 'Chennai', destination: 'Trichy', distanceKm: 330, durationHours: '5h 30m', via: 'Villupuram', popular: true },
  { name: 'Chennai → Salem', origin: 'Chennai', destination: 'Salem', distanceKm: 340, durationHours: '5h 45m', via: 'Ulundurpettai', popular: true },
  { name: 'Bangalore → Chennai', origin: 'Bangalore', destination: 'Chennai', distanceKm: 350, durationHours: '6h 15m', via: 'Vellore', popular: true },
  { name: 'Bangalore → Coimbatore', origin: 'Bangalore', destination: 'Coimbatore', distanceKm: 510, durationHours: '8h 45m', via: 'Salem', popular: true },
  { name: 'Coimbatore → Ooty', origin: 'Coimbatore', destination: 'Ooty', distanceKm: 170, durationHours: '3h 45m', via: 'Mettupalayam', popular: true },
  { name: 'Madurai → Chennai', origin: 'Madurai', destination: 'Chennai', distanceKm: 435, durationHours: '7h 30m', via: 'Trichy', popular: true },
  { name: 'Trichy → Chennai', origin: 'Trichy', destination: 'Chennai', distanceKm: 330, durationHours: '5h 30m', via: 'Villupuram', popular: true },
  { name: 'Pondicherry → Chennai', origin: 'Pondicherry', destination: 'Chennai', distanceKm: 165, durationHours: '3h 15m', via: 'Tindivanam', popular: true },
  { name: 'Vellore → Bangalore', origin: 'Vellore', destination: 'Bangalore', distanceKm: 210, durationHours: '4h 15m', via: 'Chittoor', popular: true },
  { name: 'Erode → Chennai', origin: 'Erode', destination: 'Chennai', distanceKm: 400, durationHours: '6h 45m', via: 'Salem', popular: true },
  { name: 'Bangalore → Madurai', origin: 'Bangalore', destination: 'Madurai', distanceKm: 435, durationHours: '8h', via: 'Dindigul', popular: false },
  { name: 'Chennai → Pondicherry', origin: 'Chennai', destination: 'Pondicherry', distanceKm: 165, durationHours: '3h 15m', via: 'Tindivanam', popular: false },
  { name: 'Coimbatore → Salem', origin: 'Coimbatore', destination: 'Salem', distanceKm: 130, durationHours: '2h 45m', via: 'Avinashi', popular: false },
  { name: 'Madurai → Trichy', origin: 'Madurai', destination: 'Trichy', distanceKm: 135, durationHours: '2h 30m', via: 'Manapparai', popular: false },
  { name: 'Chennai → Vellore', origin: 'Chennai', destination: 'Vellore', distanceKm: 140, durationHours: '2h 45m', via: 'Kancheepuram', popular: false },
  { name: 'Chennai → Erode', origin: 'Chennai', destination: 'Erode', distanceKm: 400, durationHours: '6h 45m', via: 'Salem', popular: false },
  { name: 'Chennai → Bangalore', origin: 'Chennai', destination: 'Bangalore', distanceKm: 350, durationHours: '6h 15m', via: 'Vellore', popular: false },
  { name: 'Chennai → Ooty', origin: 'Chennai', destination: 'Ooty', distanceKm: 570, durationHours: '10h 45m', via: 'Salem & Coimbatore', popular: false },
  { name: 'Coimbatore → Chennai', origin: 'Coimbatore', destination: 'Chennai', distanceKm: 495, durationHours: '8h 30m', via: 'Salem', popular: false },
  { name: 'Coimbatore → Bangalore', origin: 'Coimbatore', destination: 'Bangalore', distanceKm: 510, durationHours: '8h 45m', via: 'Salem', popular: false },
  { name: 'Coimbatore → Madurai', origin: 'Coimbatore', destination: 'Madurai', distanceKm: 310, durationHours: '5h 45m', via: 'Palani', popular: false },
  { name: 'Coimbatore → Trichy', origin: 'Coimbatore', destination: 'Trichy', distanceKm: 250, durationHours: '4h 45m', via: 'Karur', popular: false },
  { name: 'Madurai → Coimbatore', origin: 'Madurai', destination: 'Coimbatore', distanceKm: 310, durationHours: '5h 45m', via: 'Palani', popular: false },
  { name: 'Madurai → Salem', origin: 'Madurai', destination: 'Salem', distanceKm: 170, durationHours: '3h', via: 'Karur', popular: false },
  { name: 'Madurai → Bangalore', origin: 'Madurai', destination: 'Bangalore', distanceKm: 435, durationHours: '8h', via: 'Dindigul', popular: false },
  { name: 'Trichy → Salem', origin: 'Trichy', destination: 'Salem', distanceKm: 140, durationHours: '2h 45m', via: 'Ulundurpettai', popular: false },
  { name: 'Trichy → Madurai', origin: 'Trichy', destination: 'Madurai', distanceKm: 135, durationHours: '2h 30m', via: 'Manapparai', popular: false },
  { name: 'Trichy → Pondicherry', origin: 'Trichy', destination: 'Pondicherry', distanceKm: 200, durationHours: '3h 45m', via: 'Chidambaram', popular: false },
  { name: 'Salem → Chennai', origin: 'Salem', destination: 'Chennai', distanceKm: 340, durationHours: '5h 45m', via: 'Ulundurpettai', popular: false },
  { name: 'Salem → Coimbatore', origin: 'Salem', destination: 'Coimbatore', distanceKm: 130, durationHours: '2h 45m', via: 'Avinashi', popular: false },
  { name: 'Salem → Bangalore', origin: 'Salem', destination: 'Bangalore', distanceKm: 220, durationHours: '4h', via: 'Hosur', popular: false },
  { name: 'Salem → Erode', origin: 'Salem', destination: 'Erode', distanceKm: 60, durationHours: '1h 15m', via: 'NH-544', popular: false },
  { name: 'Bangalore → Vellore', origin: 'Bangalore', destination: 'Vellore', distanceKm: 210, durationHours: '4h 15m', via: 'Chittoor', popular: false },
  { name: 'Bangalore → Salem', origin: 'Bangalore', destination: 'Salem', distanceKm: 220, durationHours: '4h', via: 'Hosur', popular: false },
  { name: 'Vellore → Chennai', origin: 'Vellore', destination: 'Chennai', distanceKm: 140, durationHours: '2h 45m', via: 'Kancheepuram', popular: false },
  { name: 'Pondicherry → Trichy', origin: 'Pondicherry', destination: 'Trichy', distanceKm: 200, durationHours: '3h 45m', via: 'Chidambaram', popular: false },
  { name: 'Erode → Salem', origin: 'Erode', destination: 'Salem', distanceKm: 60, durationHours: '1h 15m', via: 'NH-544', popular: false },
  { name: 'Ooty → Coimbatore', origin: 'Ooty', destination: 'Coimbatore', distanceKm: 170, durationHours: '3h 45m', via: 'Mettupalayam', popular: false },
] as const).map((route) => ({
  ...route,
  slug: `${makeSlug(route.origin)}-to-${makeSlug(route.destination)}`,
}));

export const popularRoutes = routes.filter((route) => route.popular);

export function findRouteBySlug(slug: string): Route | undefined {
  return routes.find((route) => route.slug === slug);
}

export function getRouteDistance(origin: string, destination: string): number | null {
  const o = origin.trim().toLowerCase();
  const d = destination.trim().toLowerCase();
  if (o === d) return null;
  const direct = routes.find(
    (route) =>
      (route.origin.toLowerCase() === o && route.destination.toLowerCase() === d) ||
      (route.origin.toLowerCase() === d && route.destination.toLowerCase() === o),
  );
  return direct?.distanceKm ?? null;
}

export const cityRoutes: Record<string, string[]> = {
  chennai: ['Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Bangalore', 'Pondicherry', 'Ooty', 'Vellore', 'Erode'],
  coimbatore: ['Chennai', 'Bangalore', 'Ooty', 'Madurai', 'Salem', 'Trichy'],
  madurai: ['Chennai', 'Trichy', 'Coimbatore', 'Salem', 'Bangalore'],
  trichy: ['Chennai', 'Madurai', 'Salem', 'Pondicherry'],
  salem: ['Chennai', 'Coimbatore', 'Bangalore', 'Erode'],
  bangalore: ['Chennai', 'Coimbatore', 'Madurai', 'Vellore', 'Salem'],
  erode: ['Chennai', 'Salem'],
  vellore: ['Bangalore', 'Chennai'],
  pondicherry: ['Chennai', 'Trichy'],
};

export const services: Service[] = [
  {
    title: 'One Way Taxi',
    slug: 'one-way-taxi',
    icon: 'MapPin',
    description: 'Smooth one-way taxi service for affordable intercity journeys — pay only for one direction.',
    metaDescription:
      'Book an affordable one-way taxi across Tamil Nadu & South India. Pay only for the distance you travel with transparent per-km rates and zero return fare.',
    longDescription:
      'Book a one-way taxi and pay only for the distance you travel. Our one-way drop service removes the traditional return-fare burden, making intercity travel across Tamil Nadu and South India genuinely affordable.',
    features: [
      'No return fare — pay only for your journey',
      'Transparent per-km pricing with instant quotes',
      'Doorstep pickup and drop at any location',
      'Verified drivers with live route tracking',
    ],
  },
  {
    title: 'Round Trip',
    slug: 'round-trip',
    icon: 'RotateCcw',
    description: 'Flexible round trip rides with transparent pricing and verified drivers.',
    metaDescription:
      'Flexible round trip cab bookings across South India. Enjoy transparent per-km pricing, multi-day driver support, and the same verified car for both legs.',
    longDescription:
      'Keep the same cab for both legs of your journey with a flexible round trip booking. Ideal for family visits, business trips and weekend getaways where you need the cab for multiple days.',
    features: [
      'One cab for the entire journey',
      'Multi-day availability with driver accommodation',
      'Transparent daily and per-km pricing',
      'Same verified driver for both directions',
    ],
  },
  {
    title: 'Airport Transfer',
    slug: 'airport-transfer',
    icon: 'Plane',
    description: 'Fast airport transfers with flight tracking and premium vehicles.',
    metaDescription:
      'Book airport drop taxi transfers with flight tracking, premium vehicles and 24/7 availability across Chennai, Bangalore, Coimbatore and Madurai airports.',
    longDescription:
      'Reach Chennai, Bangalore, Coimbatore and Madurai airports on time with our flight-tracked airport transfer service. We monitor arrival delays and adjust pickup times automatically.',
    features: [
      'Flight tracking with automatic pickup adjustment',
      'On-time airport pickup with meet-and-greet',
      'Premium vehicles for luggage-friendly travel',
      '24/7 availability for early morning and late night flights',
    ],
  },
  {
    title: 'Outstation Taxi',
    slug: 'outstation',
    icon: 'Truck',
    description: 'Reliable outstation taxi bookings with door-to-door service across South India.',
    metaDescription:
      'Reliable outstation taxi service for intercity and hill-station travel across South India. Doorstep pickup, transparent fares, and verified chauffeurs 24/7.',
    longDescription:
      'Long-distance outstation journeys handled with care. From hill stations to coastal towns, our outstation taxi service covers every corner of South India with comfortable vehicles and experienced drivers.',
    features: [
      'Door-to-door service across South India',
      'Hill-station and coastal route expertise',
      'Fixed per-km pricing with toll transparency',
      'Comfortable vehicles for long highway travel',
    ],
  },
];

export function findServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const faqs: FaqItem[] = [
  {
    question: 'How do I book a one-way taxi?',
    answer:
      'Choose your pickup and drop locations, select a cab type, set your date and time, then send the booking request via WhatsApp for instant confirmation.',
  },
  {
    question: 'Are tolls and parking charges included?',
    answer:
      'Tolls and parking are included in the final fare for most routes, and we provide a transparent estimate before you confirm your booking.',
  },
  {
    question: 'Can I change my booking after confirmation?',
    answer:
      'Yes, booking modifications are possible depending on availability. Contact our support team for changes and route updates.',
  },
  {
    question: 'Is the driver verified?',
    answer:
      'Every driver is verified and GPS-enabled for your safety, with regular background checks and customer support available 24×7.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI, credit/debit cards, net banking and cash for all bookings.',
  },
  {
    question: 'Do you operate at night and on holidays?',
    answer:
      'Yes, we operate 24×7 including public holidays. Airport pickups and night drives are handled by dedicated night-shift drivers.',
  },
  {
    question: 'How does Obey One Way Taxi compare with other drop taxi services like Red Taxi?',
    answer:
      'Obey One Way Taxi specializes in intercity drop taxi and outstation rides across Tamil Nadu and South India with transparent per-km rates (Sedan ₹15/km, SUV ₹20/km), zero return fare, verified chauffeurs, and 24/7 instant WhatsApp booking.',
  },
  {
    question: 'What is a drop taxi and why choose Obey One Way Taxi?',
    answer:
      'A drop taxi (or one-way cab) allows you to pay only for your single-direction trip without paying for the driver’s return journey. Obey One Way Taxi provides flat per-km pricing, doorstep pickup, and guaranteed clean cars across all major Tamil Nadu cities.',
  },
];

export const reviews: Review[] = [
  {
    name: 'Arvind S.',
    location: 'Chennai',
    route: 'Chennai → Bangalore',
    rating: 5,
    quote: 'Impeccable service, transparent pricing, and a driver who arrived on time. This feels like a luxury ride every time.',
    date: 'July 2026',
  },
  {
    name: 'Meera R.',
    location: 'Bangalore',
    route: 'Bangalore → Ooty',
    rating: 5,
    quote: 'Smooth booking, premium car, and the ride was comfortable from start to finish. Highly recommend Obey Taxi.',
    date: 'June 2026',
  },
  {
    name: 'Sathish K.',
    location: 'Coimbatore',
    route: 'Coimbatore → Chennai',
    rating: 5,
    quote: 'Fast response, no hidden fees, and a polished ride. The app experience felt premium and effortless.',
    date: 'May 2026',
  },
  {
    name: 'Divya P.',
    location: 'Madurai',
    route: 'Madurai → Chennai',
    rating: 5,
    quote: 'On-time pickup, clean car and a very courteous driver. The airport transfer was seamless.',
    date: 'April 2026',
  },
  {
    name: 'Rahul V.',
    location: 'Trichy',
    route: 'Trichy → Chennai',
    rating: 4,
    quote: 'Great value for a one-way drop. Booking through WhatsApp took under two minutes.',
    date: 'March 2026',
  },
  {
    name: 'Priya M.',
    location: 'Salem',
    route: 'Salem → Coimbatore',
    rating: 5,
    quote: 'The round trip booking was handled beautifully. Same driver, same car, zero stress.',
    date: 'March 2026',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'one-way-taxi-vs-round-trip',
    title: 'One Way Taxi vs Round Trip Guide',
    excerpt: 'Compare the cost, convenience and flexibility of one-way drop taxis against round trip cab bookings for intercity travel across South India.',
    date: 'July 2026',
    readTime: '5 min read',
    category: 'Booking Guide',
    content: [
      'Intercity travel in South India often comes down to one decision: book a one-way drop or keep a cab for a round trip. Each option fits a different travel pattern.',
      'One-way taxis shine when you do not plan to return to your pickup city. You pay a flat per-km rate for a single direction, which usually works out far cheaper than renting a cab for two days.',
      'Round trips make sense for weekend getaways and family visits where you need the same cab for the return leg. You keep one driver and one car, and pay a transparent daily rate plus per-km charges.',
      'Whichever you choose, always confirm the per-km rate, toll inclusion and driver night charges before you confirm the booking.',
    ],
  },
  {
    slug: 'best-route-chennai-to-coimbatore',
    title: 'Chennai to Coimbatore Taxi Guide',
    excerpt: 'Everything you need to know about booking a taxi from Chennai to Coimbatore — highway distance, travel duration, toll transparency, and fares.',
    date: 'June 2026',
    readTime: '6 min read',
    category: 'Route Guide',
    content: [
      'The Chennai to Coimbatore drive covers roughly 495 km via Salem on NH-44, and takes about 8 hours 30 minutes by car.',
      'The route is largely four-lane and well-maintained. Breakfast stops near Salem and refreshment breaks at modern highway dhabas are part of the journey.',
      'For a sedan you can expect a fare of about ₹7,825 for a one-way drop. An Innova or Crysta will cost more per km but delivers far more comfort for families.',
      'Book in advance during festival season — this route sees heavy weekend demand from Chennai and Coimbatore residents.',
    ],
  },
  {
    slug: 'coimbatore-to-ooty-taxi-guide',
    title: 'Coimbatore to Ooty Taxi Guide',
    excerpt: 'Plan a smooth Coimbatore to Ooty taxi trip with practical advice on Nilgiri hairpin bends, hill station weather, and ideal departure times.',
    date: 'May 2026',
    readTime: '5 min read',
    category: 'Route Guide',
    content: [
      'The drive from Coimbatore to Ooty covers 170 km and climbs into the Nilgiri hills through 36 famous hairpin bends from Mettupalayam.',
      'Start early — before 8 AM is ideal — to avoid hill traffic and reach Ooty by midday with plenty of daylight.',
      'Choose an Innova or SUV for the climb. The extra space and suspension comfort matter on the ghat sections.',
      'Check weather forecasts before travelling between October and December, when heavy rains occasionally close sections of the ghat road.',
    ],
  },
  {
    slug: 'airport-transfer-tips-chennai',
    title: 'Chennai Airport Transfer Tips',
    excerpt: 'Ensure a seamless Chennai airport transfer with essential guidance on flight tracking, meeting locations, pickup timing, and luggage space.',
    date: 'April 2026',
    readTime: '4 min read',
    category: 'Travel Tips',
    content: [
      'A smooth airport transfer starts with accurate flight details. Share your flight number so the driver can track delays automatically.',
      'Keep your driver updated on baggage collection — meeting points and pickup lanes change based on your arrival terminal.',
      'Book airport transfers at least 6 hours in advance for international arrivals, and 3 hours for domestic flights.',
      'Carry small change for the airport access fee, and always confirm the vehicle registration number shared with you before the ride.',
    ],
  },
];

export function findBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
