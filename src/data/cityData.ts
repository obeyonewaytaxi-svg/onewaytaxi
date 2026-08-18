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
  longDescription?: string[];
  areas: string[];
  localities?: { name: string; description: string }[];
  landmarks: string[];
  airport: string;
  pricePerKm?: string;
  cabTypes?: string[];
  testimonials?: { name: string; route: string; quote: string; rating: number }[];
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
    longDescription: [
      `Chennai is the gateway to South India, and Obey One Way Taxi is the most trusted drop taxi service for intercity travel from Chennai. Our one way cab service covers every major corridor — Chennai to Coimbatore (505 km), Chennai to Madurai (435 km), Chennai to Bangalore (350 km), Chennai to Trichy (330 km), Chennai to Pondicherry (165 km), Chennai to Salem (340 km), Chennai to Vellore (140 km), Chennai to Erode (400 km), and Chennai to Ooty (570 km). Each journey uses a transparent per-km fare with no return fare, no empty-leg charges, and no hidden costs.`,
      `We operate sedan, SUV, Innova, and Crysta vehicles from all major Chennai neighbourhoods including T Nagar, Adyar, Anna Nagar, Velachery, OMR, Tambaram, Guindy, and Egmore. Airport transfers from Chennai International Airport (MAA) are available with flight tracking. Every driver is background-checked, every car is sanitized, and our dispatch team is available 24/7 on WhatsApp for instant booking confirmation.`,
      `Chennai's road network connects to South India via well-maintained national highways — NH-45 to Madurai and Trichy, NH-48 to Bangalore, NH-45A to Pondicherry, and NH-544 to Coimbatore via Salem. Our drivers know every highway rest stop, fuel station, and toll plaza on these corridors, ensuring a smooth and safe journey whether you are travelling for business, pilgrimage, or leisure.`,
    ],
    areas: ['T Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'OMR', 'Tambaram', 'Guindy', 'Egmore'],
    localities: [
      { name: 'T Nagar', description: 'Heart of Chennai\'s shopping district. Pickup from Pondy Bazaar, Usman Road, and residential streets around Star Bazaar. Popular for airport transfers and Coimbatore/Ooty drops.' },
      { name: 'Adyar', description: 'South Chennai\'s green corridor near the Adyar River. Pickup from LB Road, Thiruvanmiyur, and Besant Nagar. Quick access to ECR coastal route for Pondicherry trips.' },
      { name: 'Anna Nagar', description: 'Planned residential hub in north Chennai. Pickup from Anna Nagar West, Shanthi Colony, and 2nd Avenue. Direct highway access to Bangalore via Vellore.' },
      { name: 'Velachery', description: 'Fast-growing residential and IT suburb. Pickup from Velachery Main Road, Velachery-Tambaram link road, and Phoenix Mall area. Ideal for OMR and Ooty corridors.' },
      { name: 'OMR (Old Mahabalipuram Road)', description: 'Chennai\'s IT corridor from Sholinganallur to Mahabalipuram. Pickup from Thoraipakkam, Perungudi, and Sholinganallur. Direct access to ECR and Pondicherry.' },
      { name: 'Tambaram', description: 'South Chennai gateway with railway connectivity. Pickup from Tambaram East, Chromepet, and Pallavaram. Quick access to Vellore and Bangalore routes via GST Road.' },
      { name: 'Guindy', description: 'Central south Chennai near the national park. Pickup from Guindy Industrial Estate, Guindy Park area, and Alandur. Close to airport for early morning transfers.' },
      { name: 'Egmore', description: 'Heritage neighbourhood with railway station access. Pickup from Egmore Station, Powers Road, and Chetpet. Central location for all Chennai routes.' },
    ],
    landmarks: ['Chennai Airport', 'Chennai Central', 'Egmore Station', 'Marina Beach', 'IT Corridor OMR'],
    airport: 'Chennai International Airport (MAA)',
    pricePerKm: 'Sedan from ₹15/km • SUV from ₹20/km • Innova from ₹20/km • Crysta from ₹24/km',
    cabTypes: ['Sedan (Etios/Dzire)', 'SUV (Ertiga)', 'Innova', 'Innova Crysta'],
    testimonials: [
      { name: 'Arvind S.', route: 'Chennai → Bangalore', quote: 'Impeccable service, transparent pricing, and a driver who arrived on time. The Chennai to Bangalore run was smooth even with late-night traffic near Vellore.', rating: 5 },
      { name: 'Priya K.', route: 'Chennai → Madurai', quote: 'Booked a sedan for my family trip to Madurai. The driver was courteous, car was clean, and the fare matched the quote exactly. No return fare — huge savings.', rating: 5 },
      { name: 'Karthik M.', route: 'Chennai → Pondicherry', quote: 'Weekend getaway to Pondicherry was seamless. Pickup from OMR was on time, and we reached in under 3 hours. Will book again for sure.', rating: 5 },
      { name: 'Divya P.', route: 'Chennai → Coimbatore', quote: 'Long 500 km drive made comfortable with an Innova. Driver knew the Salem highway well, took proper rest stops. Very professional service.', rating: 5 },
      { name: 'Rahul V.', route: 'Chennai → Trichy', quote: 'Airport pickup at 4 AM and straight to Trichy. WhatsApp booking took 2 minutes, confirmation was instant. Best one-way cab experience in Chennai.', rating: 5 },
      { name: 'Meera R.', route: 'Chennai → Ooty', quote: 'Took the family to Ooty via Coimbatore. SUV handled the hill roads perfectly. Transparent pricing, no surprises at the end. Highly recommend.', rating: 5 },
    ],
    faqs: [
      { q: 'How much is a Chennai to Coimbatore one way cab?', a: 'A Chennai to Coimbatore one way cab starts from ₹7,425 for a sedan (495 km × ₹15/km). SUV starts from ₹9,900, Innova from ₹9,900, and Crysta from ₹11,880. Tolls are additional at actuals.' },
      { q: 'How much is a Chennai to Madurai one way cab?', a: 'A Chennai to Madurai one way cab starts from ₹6,525 for a sedan (435 km × ₹15/km). SUV starts from ₹8,700, Innova from ₹8,700, and Crysta from ₹10,440. Tolls are additional at actuals.' },
      { q: 'How much is a Chennai to Bangalore one way cab?', a: 'A Chennai to Bangalore one way cab starts from ₹5,250 for a sedan (350 km × ₹15/km). SUV starts from ₹7,000, Innova from ₹7,000, and Crysta from ₹8,400. Tolls are additional at actuals.' },
      { q: 'How much is a Chennai to Pondicherry one way cab?', a: 'A Chennai to Pondicherry one way cab starts from ₹2,475 for a sedan (165 km × ₹15/km). SUV starts from ₹3,300, Innova from ₹3,300, and Crysta from ₹3,960. This is one of our shortest and most popular routes.' },
      { q: 'How much is a Chennai to Trichy one way cab?', a: 'A Chennai to Trichy one way cab starts from ₹4,950 for a sedan (330 km × ₹15/km). SUV starts from ₹6,600, Innova from ₹6,600, and Crysta from ₹7,920. Tolls are additional at actuals.' },
      { q: 'How do I book a Chennai drop taxi on WhatsApp?', a: 'Select your route and cab type on the route page, enter your pickup date and time, then tap "Send on WhatsApp". Our dispatch team confirms within minutes. You can also call us directly.' },
      { q: 'Do you pick up from Chennai Airport?', a: 'Yes. We offer airport pickup and drop taxi service from Chennai International Airport with flight tracking on request. Our driver will meet you at the arrivals area with a placard.' },
      { q: 'What is the cheapest drop taxi from Chennai?', a: 'Our sedan (Etios/Dzire) at ₹15/km is the most affordable option for Chennai one way cabs. It covers up to 4 passengers with 2 bags. For hill stations, we recommend an SUV at ₹20/km.' },
      { q: 'Are tolls and parking charges included for Chennai drop taxis?', a: 'No, tolls, state permits, and parking charges are excluded from the per-km rate and are payable at actuals. We provide a transparent estimate of these costs before your trip is confirmed on WhatsApp.' },
      { q: 'Can I book a Chennai drop taxi at night?', a: 'Yes, our outstation cab service operates 24/7 including nights and public holidays. A driver night allowance of ₹400 applies for journeys between 11 PM and 6 AM.' },
      { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and cash for all Chennai bookings. GST invoices at 5% are available on request.' },
      { q: 'Can I change my booking after confirmation?', a: 'Yes, booking modifications are possible depending on vehicle availability. Contact our support team via WhatsApp for changes to pickup time, route, or cab type.' },
      { q: 'Is the driver verified?', a: 'Every driver is verified, background-checked, and trained for highway travel. Our dispatch team monitors every trip and customer support is available 24/7.' },
      { q: 'What is the minimum billing for Chennai drop taxis?', a: 'One-way bookings have a minimum billing of 130 km. If your actual distance is below 130 km, the minimum distance is charged. Round-trip minimums are 250 km.' },
      { q: 'Do you offer GST invoices for Chennai bookings?', a: 'Yes, GST invoices at 5% are available on request for all Chennai taxi bookings. Contact our support team after your trip to receive an official invoice for expense claims.' },
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
    longDescription: [
      `Madurai is the temple city of Tamil Nadu and one of the oldest continuously inhabited cities in India. Obey One Way Taxi provides drop taxi and one way cab service from Madurai to Chennai (435 km), Trichy (135 km), Coimbatore (220 km), Salem (170 km), and Bangalore (460 km). Our Madurai to Chennai corridor is the most popular, with sedan fares starting at ₹6,525 and no return fare.`,
      `We pick up from Anna Nagar, KK Nagar, Simmakkal, Goripalayam, Mattuthavani, and all major Madurai neighbourhoods. Airport transfers from Madurai International Airport (IXM) are available. Every vehicle is sanitized, every driver is background-checked, and our dispatch team is available 24/7 on WhatsApp for instant booking confirmation.`,
    ],
    areas: ['Anna Nagar', 'KK Nagar', 'Simmakkal', 'Goripalayam', 'Mattuthavani', 'Arappalayam'],
    landmarks: ['Madurai Meenakshi Temple', 'Madurai Junction', 'Vaigai Dam', 'Thirumalai Nayakkar Palace'],
    airport: 'Madurai International Airport (IXM)',
    pricePerKm: 'Sedan from ₹15/km • SUV from ₹20/km • Innova from ₹20/km • Crysta from ₹24/km',
    cabTypes: ['Sedan (Etios/Dzire)', 'SUV (Ertiga)', 'Innova', 'Innova Crysta'],
    faqs: [
      { q: 'How do I book a Madurai to Chennai one way cab?', a: 'Choose the Madurai to Chennai route page, select your cab and send the booking via WhatsApp. You pay only for the one-way drop.' },
      { q: 'Are there cheap one way cab options from Madurai?', a: 'Yes. Our sedan one way cab is the most affordable option, with transparent per-km pricing and no return fare.' },
      { q: 'Do you serve Madurai Meenakshi Temple pickups?', a: 'Yes, we offer doorstep pickup from anywhere in Madurai, including temples, hotels and the railway junction.' },
      { q: 'What is the Madurai to Chennai one way cab fare?', a: 'The Madurai to Chennai route is 435 km. A sedan costs from ₹6,525, SUV from ₹8,700, Innova from ₹8,700, and Crysta from ₹10,440. Tolls are additional at actuals.' },
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
    longDescription: [
      `Coimbatore is the textile capital of Tamil Nadu and a major gateway to the Nilgiris. Obey One Way Taxi provides drop taxi and one way cab service from Coimbatore to Chennai (505 km), Bangalore (365 km), Ooty (170 km), Madurai (220 km), Salem (165 km), and Trichy (215 km). Every route features transparent per-km pricing with no return fare — you pay only for the distance you travel.`,
      `Our Coimbatore fleet includes sedans, SUVs, Innovas, and Crystas for both short Ooty hill runs and long highway journeys to Chennai and Bangalore. We pick up from RS Puram, Gandhipuram, Saibaba Colony, Peelamedu, and all major neighbourhoods. Airport transfers from Coimbatore International Airport (CJB) are available with flight tracking. Every driver is background-checked and our dispatch team operates 24/7.`,
    ],
    areas: ['RS Puram', 'Gandhipuram', 'Saibaba Colony', 'Peelamedu', 'Kuniyamuthur', 'Race Course'],
    landmarks: ['Coimbatore Airport', 'Codissia Trade Fair', 'Marudamalai Temple', 'Siruvani Dam'],
    airport: 'Coimbatore International Airport (CJB)',
    pricePerKm: 'Sedan from ₹15/km • SUV from ₹20/km • Innova from ₹20/km • Crysta from ₹24/km',
    cabTypes: ['Sedan (Etios/Dzire)', 'SUV (Ertiga)', 'Innova', 'Innova Crysta'],
    faqs: [
      { q: 'How much does a Coimbatore drop taxi cost?', a: 'Fares follow transparent per-km pricing by cab type. The Coimbatore to Chennai one way cab is one of our most booked long routes.' },
      { q: 'Can I book a Coimbatore to Ooty taxi?', a: 'Yes. The Coimbatore to Ooty drive (170 km) is a favourite — book an SUV or Innova for comfort on the hill climb.' },
      { q: 'Do you offer Coimbatore airport transfers?', a: 'Yes, we provide airport pickup and drop from Coimbatore International Airport with flight tracking available.' },
      { q: 'What is the cheapest drop taxi from Coimbatore?', a: 'Our sedan (Etios/Dzire) at ₹15/km is the most affordable option. For Ooty hill routes, we recommend an SUV at ₹20/km for better comfort on steep roads.' },
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
    longDescription: [
      `Trichy (Tiruchirappalli) is a major junction city in central Tamil Nadu, connecting pilgrims, business travellers, and weekend explorers across the state. Obey One Way Taxi provides drop taxi and one way cab service from Trichy to Chennai (330 km), Madurai (135 km), Salem (140 km), Coimbatore (215 km), and Pondicherry (215 km). Every route features transparent per-km pricing with no return fare.`,
      `We pick up from Srirangam, Woraiyur, Thillai Nagar, KK Nagar, and all major Trichy neighbourhoods. Airport transfers from Tiruchirappalli International Airport (TRZ) are available. Our fleet includes sedans, SUVs, Innovas, and Crystas — choose based on your comfort and luggage needs. Every driver is background-checked and our dispatch team is available 24/7 on WhatsApp.`,
    ],
    areas: ['Srirangam', 'Woraiyur', 'Thillai Nagar', 'KK Nagar', 'Ponmalaipatti', 'Uyyakondan Thirumalai'],
    landmarks: ['Rockfort Temple', 'Sri Ranganathaswamy Temple', 'Trichy Junction', 'Jambukeswarar Temple'],
    airport: 'Tiruchirappalli International Airport (TRZ)',
    pricePerKm: 'Sedan from ₹15/km • SUV from ₹20/km • Innova from ₹20/km • Crysta from ₹24/km',
    cabTypes: ['Sedan (Etios/Dzire)', 'SUV (Ertiga)', 'Innova', 'Innova Crysta'],
    faqs: [
      { q: 'What routes do Trichy drop taxis cover?', a: 'We cover Chennai, Madurai, Salem, Coimbatore and Pondicherry with one way and round trip options.' },
      { q: 'Is a Trichy to Chennai taxi available at night?', a: 'Yes. We operate 24/7 including nights and public holidays across Tamil Nadu.' },
      { q: 'Are tolls and parking charges included in Trichy cab fares?', a: 'No, tolls and parking charges are excluded from the base per-km rate and are payable at actuals. Our dispatch team will share an estimate of these fees during booking confirmation.' },
      { q: 'How much is a Trichy to Chennai one way cab?', a: 'The Trichy to Chennai route is 330 km. A sedan costs from ₹4,950, SUV from ₹6,600, Innova from ₹6,600, and Crysta from ₹7,920. Tolls are additional at actuals.' },
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
