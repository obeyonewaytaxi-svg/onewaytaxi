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
    details: ['Compact comfort', 'Ideal for 2-3 passengers', 'Budget-friendly', 'AC & Music System'],
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
    details: ['More luggage room', 'Comfort for 4-6 passengers', 'Premium interiors'],
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
    details: ['Ample legroom', 'Business friendly', 'Reliable long-distance ride'],
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
    details: ['Executive travel', 'Extra comfort', 'Premium service experience'],
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
    seoTitle: 'One Way Drop Taxi',
    icon: 'MapPin',
    description: 'Smooth one-way taxi service for affordable intercity journeys — pay only for one direction.',
    metaDescription:
      'Book an affordable one-way drop taxi across Tamil Nadu & South India. Pay only for the distance you travel with transparent per-km rates and zero return fare.',
    longDescription:
      'Book a one-way drop taxi and pay only for the drop direction of your journey. Our one-way taxi service removes the traditional return-fare burden, making intercity travel across Tamil Nadu and South India genuinely affordable.',
    features: [
      'No return fare — pay only for your drop',
      'Transparent per-km pricing with instant quotes',
      'Doorstep pickup and drop at any location',
      'Verified, background-checked drivers',
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
    question: 'Are tolls, state permits, and parking charges included?',
    answer:
      'No, tolls, state permits, and parking charges are excluded from the per-km base rate and are payable at actuals during the journey. However, we provide a transparent estimate of these costs before your trip is confirmed on WhatsApp.',
  },
  {
    question: 'Are there any extra charges like driver allowances or night charges?',
    answer:
      'A driver allowance (bata) of ₹400 is already factored in as the base fare. An additional driver night allowance of ₹400 applies if the journey occurs between 11:00 PM and 6:00 AM. For hill station trips, a ₹300 driver allowance applies. GST (5%) is extra if an official invoice is required.',
  },
  {
    question: 'Can I change my booking after confirmation?',
    answer:
      'Yes, booking modifications are possible depending on availability. Contact our support team for changes and route updates.',
  },
  {
    question: 'Is the driver verified?',
    answer:
      'Every driver is verified and background-checked for your safety, with customer support available 24×7.',
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
    question: 'How does Obey One Way Taxi compare with Red Taxi for intercity drops?',
    answer:
      'Obey One Way Taxi specializes in long-distance intercity drop taxi and outstation rides across Tamil Nadu and South India. We offer flat per-km pricing (Sedan ₹15/km, SUV ₹20/km), zero return fare, background-checked highway drivers, and 24/7 instant WhatsApp booking — ideal when you need a one-way drop rather than a local city ride.',
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
    datePublished: '2026-07-15',
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
    datePublished: '2026-06-20',
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
    datePublished: '2026-05-18',
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
    datePublished: '2026-04-22',
    readTime: '4 min read',
    category: 'Travel Tips',
    content: [
      'A smooth airport transfer starts with accurate flight details. Share your flight number so the driver can track delays automatically.',
      'Keep your driver updated on baggage collection — meeting points and pickup lanes change based on your arrival terminal.',
      'Book airport transfers at least 6 hours in advance for international arrivals, and 3 hours for domestic flights.',
      'Carry small change for the airport access fee, and always confirm the vehicle registration number shared with you before the ride.',
    ],
  },
  {
    slug: 'chennai-to-bangalore-taxi-cost',
    title: 'Chennai to Bangalore One Way Taxi Cost Guide',
    excerpt: 'How much does a one-way taxi from Chennai to Bangalore really cost? Distance, travel time, per-km fares, tolls and hidden charges explained.',
    date: 'August 2026',
    datePublished: '2026-08-05',
    readTime: '6 min read',
    category: 'Route Guide',
    content: [
      'The Chennai to Bangalore drive is one of the busiest intercity routes in South India. Whether you are travelling for business, a flight connection or a family visit, the first question is almost always the same — how much does a one-way taxi from Chennai to Bangalore cost?',
      '## How far is Chennai to Bangalore by road?',
      'The road distance between Chennai and Bangalore is about 350 km via NH-44 through Vellore, and the drive usually takes around 6 hours 15 minutes depending on traffic and breaks. The route is four-lane for most of the way, with clean highway stops near Vellore and the Tamil Nadu–Karnataka border.',
      '## What is the one-way taxi fare?',
      'Obey One Way Taxi charges a flat per-km rate with no return fare, so you only pay for the distance you actually travel. For a sedan at [₹15/km](/tariff), a one-way Chennai to Bangalore trip of roughly 350 km works out to about ₹5,250 before tolls. An SUV or Innova costs more per km but gives you far more space for families or groups with luggage.',
      'A few basics that keep the quote honest: tolls, parking and state permit charges are payable at actuals and are not hidden inside the per-km rate. Your booking team will share a clear estimate of these before you confirm. If your pickup is between 10 PM and 5 AM, a driver allowance of ₹400 is added. GST of 5% applies only when you need an invoice.',
      '## Why a one-way drop beats a round trip on this route',
      'Many travellers assume they must pay a return fare when they book a cab out of state. With a one-way drop taxi you pay only the single direction. For a Chennai to Bangalore trip that typically saves 40–60% compared with keeping the cab for a full round trip.',
      '## When to book and how to keep the fare low',
      'Fares on the Chennai–Bangalore corridor are demand-driven on weekends, so book 1–2 days ahead for the best availability and to lock the rate. Early morning departures before 6 AM usually mean lighter traffic and a more relaxed drive.',
      'Check the [full tariff chart](/tariff), or get an instant estimate in the [fare calculator](/fare-calculator). You can also see the [Chennai to Bangalore route page](/routes/chennai-to-bangalore) for distance and timing details before you book.',
      'Ready to book? Call or WhatsApp [our booking line](/contact) 24/7 and confirm your fare before the cab arrives.',
    ],
  },
  {
    slug: 'vellore-to-bangalore-taxi-guide',
    title: 'Vellore to Bangalore One Way Taxi Guide',
    excerpt: 'Plan a Vellore to Bangalore one-way taxi with clear fares, travel time via Chittoor, and booking tips for hospital visits and business travel.',
    date: 'August 2026',
    datePublished: '2026-08-12',
    readTime: '5 min read',
    category: 'Route Guide',
    content: [
      'Vellore to Bangalore is a short but steady route used by hospital visitors, students and business travellers. The 210 km drive via Chittoor takes around 4 hours 15 minutes in normal traffic.',
      '## Vellore to Bangalore taxi fare',
      'At [₹15/km](/tariff) for a sedan, a one-way Vellore to Bangalore trip works out to about ₹3,150 before tolls. An Innova at ₹20/km is around ₹4,200 and is the comfortable pick for a family trip or when you are carrying medical reports, luggage and a small group.',
      'Because this is a one-way drop taxi, you pay no return fare — a real saving compared with the old two-way billing model.',
      '## Best time to travel',
      'The route crosses the border at Chittoor, and border-town traffic can build up on weekday mornings. Leaving before 8 AM gets you to Bangalore in good time. For hospital appointments in Vellore or Bangalore, always book the return leg separately with the same 24/7 team so both sides of the journey are confirmed.',
      '## Booking in a hurry',
      'Many Vellore–Bangalore trips are planned in hours, not days. Our booking line answers round the clock, and WhatsApp booking takes under five minutes. See the [Vellore to Bangalore route page](/routes/vellore-to-bangalore) or the [reverse Bangalore to Vellore route](/routes/bangalore-to-vellore) for exact distances, then confirm your fare on [WhatsApp](/contact).',
    ],
  },
  {
    slug: 'salem-to-bangalore-taxi-guide',
    title: 'Salem to Bangalore One Way Taxi Guide',
    excerpt: 'Salem to Bangalore one-way taxi guide with fares, the NH-44 route via Hosur, and tips for a smooth journey with no return fare.',
    date: 'September 2026',
    datePublished: '2026-09-03',
    readTime: '5 min read',
    category: 'Route Guide',
    content: [
      'Salem sits at the junction of several highway corridors, and Bangalore is one of the most frequent destinations for one-way taxis from the city. The 220 km journey via Hosur on NH-44 takes about 4 hours.',
      '## What does a Salem to Bangalore taxi cost?',
      'At [₹15/km](/tariff) for a sedan, the one-way fare is roughly ₹3,300 before tolls. An SUV at ₹20/km comes to about ₹4,400 and is the better pick for groups, wedding guests or families travelling with extra luggage.',
      'As always with a drop taxi, you pay only for the one-way trip — no return fare, no waiting charges while the cab stays in Bangalore.',
      '## Route notes',
      'The NH-44 stretch from Salem to Hosur is a wide, well-maintained highway. The climb past the Krishnagiri border has occasional truck traffic, so plan a short break at one of the highway dhabas near Krishnagiri to keep the driver fresh.',
      '## Booking tips',
      'Weekend demand on this corridor is high, so confirm your cab 1–2 days in advance. Early-morning starts avoid the Salem city traffic. Get an exact quote from the [fare calculator](/fare-calculator), check the [Salem to Bangalore route page](/routes/salem-to-bangalore), and book 24/7 on [WhatsApp](/contact).',
    ],
  },
  {
    slug: 'chennai-to-madurai-taxi-guide',
    title: 'Chennai to Madurai One Way Taxi Guide',
    excerpt: 'Chennai to Madurai one-way taxi guide — 435 km via Trichy, sedan and SUV fares, and tips for temple town and family travel.',
    date: 'September 2026',
    datePublished: '2026-09-10',
    readTime: '6 min read',
    category: 'Route Guide',
    content: [
      'Madurai is one of the most popular one-way taxi destinations from Chennai, whether the trip is for the Meenakshi temple, a family function or a business visit. The drive covers about 435 km via Trichy and takes around 7 hours 30 minutes.',
      '## Chennai to Madurai one-way fare',
      'A sedan at [₹15/km](/tariff) works out to roughly ₹6,525 for the 435 km one-way trip, before tolls. An SUV at ₹20/km comes to about ₹8,700 and is the comfortable choice for families — the extra legroom matters on a seven-and-a-half-hour drive.',
      '## What is included and what is not',
      'Your quote covers the per-km rate and the driver. Tolls, parking and permit charges are payable at actuals, and your booking team confirms an estimate before you commit. A ₹400 driver allowance applies for pickups between 10 PM and 5 AM. GST of 5% is added only if you require an invoice.',
      '## Driving the route',
      'The NH-32 corridor via Villupuram and Trichy is four-lane for most of the stretch. A breakfast stop near Villupuram and a short break at Trichy keeps the journey comfortable. Start early if you are travelling in summer to avoid the midday heat on the road.',
      '## Best time to book',
      'Madurai trips peak around festival season and Tamil New Year, so book a few days ahead during those windows. For an instant estimate use the [fare calculator](/fare-calculator), check the [Chennai to Madurai route page](/routes/chennai-to-madurai), and confirm your one-way drop taxi 24/7 on [WhatsApp](/contact).',
    ],
  },
  {
    slug: 'chennai-to-pondicherry-weekend-guide',
    title: 'Chennai to Pondicherry Weekend Taxi Guide',
    excerpt: 'A relaxed Chennai to Pondicherry weekend getaway — 165 km drive time, one-way taxi fares, and what to pack for the beach town.',
    date: 'September 2026',
    datePublished: '2026-09-22',
    readTime: '5 min read',
    category: 'Route Guide',
    content: [
      'Pondicherry is the classic weekend escape from Chennai — close enough for a morning departure and far enough to feel like a proper break. The 165 km drive via Tindivanam takes around 3 hours 15 minutes.',
      '## Chennai to Pondicherry one-way taxi fare',
      'At [₹15/km](/tariff) for a sedan, a one-way drop to Pondicherry is about ₹2,475 before tolls — one of the best-value routes we run. An SUV at ₹20/km is around ₹3,300 and suits small groups or families heading to the beach with chairs, coolers and luggage.',
      '## Getting there without the stress',
      'Leave by 7 AM on a Saturday to beat the ECR weekend traffic and reach the beach town before lunch. The NH-32 corridor is smooth, and the ECR option is scenic but slower. For a first-day beach walk and a Sunday afternoon return, book the return trip in advance with the same team so the cab is waiting when you are ready.',
      '## What to remember',
      'Weekend availability fills up fast in the November–January season, so lock your cab a few days early. Get an instant quote in the [fare calculator](/fare-calculator), see the [Chennai to Pondicherry route page](/routes/chennai-to-pondicherry), and book your weekend one-way taxi on [WhatsApp](/contact) any time.',
    ],
  },
  {
    slug: 'coimbatore-to-bangalore-taxi-guide',
    title: 'Coimbatore to Bangalore One Way Taxi Guide',
    excerpt: 'Coimbatore to Bangalore one-way taxi guide — the 510 km Salem route, fares, and when to travel for a smoother drive.',
    date: 'October 2026',
    datePublished: '2026-10-06',
    readTime: '6 min read',
    category: 'Route Guide',
    content: [
      'Coimbatore and Bangalore are two of South India\'s busiest business cities, and the road between them is travelled constantly. The journey covers about 510 km via Salem on NH-44 and takes around 8 hours 45 minutes with breaks.',
      '## Coimbatore to Bangalore one-way fare',
      'A sedan at [₹15/km](/tariff) works out to about ₹7,650 for the 510 km one-way trip before tolls. An Innova at ₹20/km is around ₹10,200 — the practical choice for a business team or a family moving between the two cities.',
      '## Route and timing notes',
      'The drive passes Salem at roughly the halfway point, where the Avinashi–Salem stretch is fast and the NH-44 from Salem to Krishnagiri is wide. A midday start can mean Bangalore-bound traffic later in the afternoon, so an early morning departure makes for a calmer trip.',
      '## Planning for business travellers',
      'If you are catching an evening meeting in Bangalore, aim to leave Coimbatore by 6 AM. For airport-bound travellers, the timing depends heavily on which terminal and how much buffer you want — your booking team will help you plan backwards from the flight time.',
      'Check the [Coimbatore to Bangalore route page](/routes/coimbatore-to-bangalore) for exact distance and timing, get an estimate in the [fare calculator](/fare-calculator), and book your one-way drop taxi 24/7 on [WhatsApp](/contact).',
    ],
  },
  {
    slug: 'madurai-to-bangalore-taxi-guide',
    title: 'Madurai to Bangalore One Way Taxi Guide',
    excerpt: 'Madurai to Bangalore one-way taxi guide with the Dindigul–Salem corridor, fares, and travel tips for the 435 km journey.',
    date: 'October 2026',
    datePublished: '2026-10-15',
    readTime: '6 min read',
    category: 'Route Guide',
    content: [
      'The Madurai to Bangalore route connects a temple city to a metro, and a growing number of travellers book it as a one-way drop taxi. The journey covers roughly 435 km via Dindigul and Salem and takes about 8 hours.',
      '## Madurai to Bangalore one-way fare',
      'A sedan at [₹15/km](/tariff) is about ₹6,525 for the one-way trip before tolls. An SUV at ₹20/km comes to around ₹8,700 and suits families travelling together, which is common on this route.',
      '## What to expect on the road',
      'The route leaves Madurai via NH-44 through Dindigul, joins the Salem stretch, and crosses into Karnataka near Krishnagiri. Expect rolling highway sections rather than dense traffic outside the towns. A breakfast stop near Dindigul and a break before Salem keeps the driver rested for the border climb.',
      '## Booking ahead',
      'This route sees steady demand from hospital visits and family functions, so book 1–2 days ahead when you can. Use the [fare calculator](/fare-calculator) for an instant estimate, check the [Madurai to Bangalore route page](/routes/madurai-to-bangalore), and confirm your no-return-fare taxi 24/7 on [WhatsApp](/contact).',
    ],
  },
  {
    slug: 'one-way-taxi-fare-breakdown',
    title: 'One Way Taxi Fares Explained',
    excerpt: 'How one-way taxi fares are built — per-km rates, minimum distance, driver allowance, tolls and GST. Know exactly what you are paying.',
    date: 'October 2026',
    datePublished: '2026-10-26',
    readTime: '7 min read',
    category: 'Fares & Pricing',
    content: [
      'One-way taxi pricing looks simple — a rate per km — but the final fare has a few moving parts. This guide breaks down exactly how a drop taxi fare is built so there are no surprises at the end of the trip.',
      '## The per-km rate',
      'The core of your fare is the per-km rate for the car you choose. At Obey One Way Taxi, a sedan is [₹15/km](/tariff), an SUV and Innova are ₹20/km, and the Innova Crysta is ₹24/km. Multiply the rate by the distance of your trip and you have the base fare. For a [Chennai to Bangalore](/routes/chennai-to-bangalore) trip of 350 km, a sedan base fare is about ₹5,250.',
      '## Minimum distance and empty-run protection',
      'Short trips still need to cover the driver\'s return. Depending on the route, a minimum billed distance of 130 km or 250 km applies. This matters most on nearby routes like [Salem to Erode](/routes/salem-to-erode) — the minimum keeps the fare fair for the driver while the per-km rate stays low on longer trips.',
      '## Driver allowance and night charges',
      'A night driver allowance of ₹400 applies for pickups between 10 PM and 5 AM. On hill routes like [Coimbatore to Ooty](/routes/coimbatore-to-ooty), a hill allowance of ₹300 is added because ghat driving is slower and tougher on the car.',
      '## Tolls, parking and permits',
      'Tolls, parking and state permit charges are payable at actuals and are never hidden inside the per-km rate. Your booking team shares a transparent estimate before you confirm. This is the biggest difference between a trustworthy quote and a vague one.',
      '## GST',
      'GST of 5% is added only when you need a GST invoice. Cash and UPI customers are not charged GST on top of the quoted fare.',
      '## The no-return-fare promise',
      'Everything above still beats a two-way billing model. You pay for the distance you travel, not the distance the cab has to come back. Compare live numbers in the [fare calculator](/fare-calculator), read the [full tariff chart](/tariff), and get a written quote before you book on [WhatsApp](/contact).',
    ],
  },
  {
    slug: 'how-to-book-outstation-taxi-tamil-nadu',
    title: 'How to Book an Outstation Taxi in Tamil Nadu',
    excerpt: 'A step-by-step guide to booking an outstation taxi in Tamil Nadu — what to share, what to confirm, and how to avoid hidden charges.',
    date: 'November 2026',
    datePublished: '2026-11-04',
    readTime: '5 min read',
    category: 'Booking Guide',
    content: [
      'Booking an outstation taxi in Tamil Nadu is simpler than most people expect — if you know what information to share and what to confirm before you commit. Here is the exact process.',
      '## Step 1: Share your trip details',
      'Send your pickup location, drop location, date and time. Include the number of passengers and how much luggage you carry so the right car is suggested. A sedan fits 4 people with 2 bags; an SUV or Innova fits up to 6–7 people with more luggage.',
      '## Step 2: Get a written fare breakdown',
      'A reliable quote separates the per-km rate from extras. You should see the base fare, the estimated tolls, and any driver or hill allowance listed separately — exactly how our [tariff chart](/tariff) works. Confirm whether GST applies only with an invoice.',
      '## Step 3: Confirm car, driver and pickup',
      'Before the trip you should receive the car details and the driver\'s contact. We share the vehicle registration number and the driver\'s name so there is no confusion at pickup.',
      '## Step 4: What to carry',
      'Cash or UPI for tolls and parking, plus the booking reference. On [night trips](/blog/night-outstation-taxi-safety-tips), share your live location with family for peace of mind.',
      '## Booking channels',
      'Our [outstation service page](/outstation) explains everything, and you can book instantly through [WhatsApp or a call](/contact) — we answer 24/7. For longer corporate or regular bookings, request a GST invoice at the time of booking.',
      'Booking an outstation cab does not have to be a gamble. Confirm the breakdown, lock the car, and travel with the same transparency every time.',
    ],
  },
  {
    slug: 'night-outstation-taxi-safety-tips',
    title: 'Night Outstation Taxi Safety Tips',
    excerpt: 'Practical safety tips for night outstation taxi travel — verified drivers, sharing your location, night allowances and 24/7 support.',
    date: 'November 2026',
    datePublished: '2026-11-14',
    readTime: '5 min read',
    category: 'Travel Tips',
    content: [
      'Night travel between cities is sometimes unavoidable — an early flight, a late hospital discharge, or a function that ends past midnight. With a few simple habits, night outstation trips are just as safe as daytime ones.',
      '## Start with a verified driver',
      'Every driver we send is verified and police background-checked, and you receive the vehicle registration number and driver\'s name before pickup. Match both at the pickup point before you board.',
      '## Share your journey',
      'Share your live location with a family member or friend for the first hour, especially on routes like [Chennai to Madurai](/routes/chennai-to-madurai) or [Chennai to Bangalore](/routes/chennai-to-bangalore) that cross long rural stretches.',
      '## Know the night allowance in advance',
      'A driver allowance of ₹400 applies for pickups between 10 PM and 5 AM, and it should appear in your written quote before you accept the booking. Knowing the final figure upfront removes the most common night-travel complaint.',
      '## Keep the driver rested',
      'On journeys over 6 hours, plan a short break at a busy highway stop. A rested driver is a safer driver, and a 15-minute break barely changes your arrival time.',
      '## Use support that never sleeps',
      'Book with a company that actually answers at 3 AM. Our [booking line](/contact) is staffed 24/7, and the [outstation service page](/outstation) explains how night bookings work. Check the [tariff](/tariff) so the night allowance and tolls never surprise you.',
    ],
  },
];

export function findBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
