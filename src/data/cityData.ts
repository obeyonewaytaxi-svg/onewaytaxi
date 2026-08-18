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
      `Madurai's central location makes it an ideal starting point for pilgrimages to Trichy Srirangam (135 km), business trips to Chennai (435 km via NH-45), and holiday drives to Coimbatore and the Nilgiri hills (220 km). Our drivers know every highway rest stop on the NH-45 Chennai corridor and the NH-49 Coimbatore route, ensuring a smooth and safe journey for every passenger.`,
      `The Madurai to Bangalore route (460 km via Dindigul and Salem) takes about 7-8 hours in a sedan. For shorter trips, Madurai to Trichy (135 km) is just a 2-hour drive, making it perfect for same-day business or temple visits. Every booking comes with transparent pricing, a confirmed driver, and WhatsApp support throughout your journey.`,
    ],
    areas: ['Anna Nagar', 'KK Nagar', 'Simmakkal', 'Goripalayam', 'Mattuthavani', 'Arappalayam'],
    localities: [
      { name: 'Anna Nagar', description: 'Planned residential area in east Madurai. Pickup from Anna Nagar Main Road, Vivekananda College area. Quick access to NH-45 for Chennai and Trichy routes.' },
      { name: 'KK Nagar', description: 'Well-connected residential hub with bus terminus. Pickup from KK Nagar Bus Stand, Madakulam road. Direct highway access to Coimbatore and Salem.' },
      { name: 'Simmakkal', description: 'Historic commercial centre near Meenakshi Temple. Pickup from Simmakkal market, Netaji Road. Popular for temple visits and airport transfers.' },
      { name: 'Goripalayam', description: 'Central Madurai neighbourhood near the Madurai Junction railway station. Pickup from Goripalayam bus stand, Byepass road. Gateway to all major highway routes.' },
      { name: 'Mattuthavani', description: 'Bus terminus area with intercity connections. Pickup from Mattuthavani bus stand, Alagar Kovil road. Quick access to Chennai via NH-45.' },
      { name: 'Arappalayam', description: 'Western Madurai suburb with railway station. Pickup from Arappalayam junction, Pasumalai area. Gateway to Coimbatore and Ooty routes via NH-49.' },
      { name: 'Thirunagar', description: 'Residential area in south Madurai. Pickup from Thirunagar 4th layout, TVS Nagar. Close to Madurai airport for early morning transfers.' },
      { name: 'Vilakkudi', description: 'Growing suburb near the Madurai bypass. Pickup from Vilakkudi junction, main road. Quick access to Salem and Bangalore routes.' },
    ],
    landmarks: ['Madurai Meenakshi Temple', 'Madurai Junction', 'Vaigai Dam', 'Thirumalai Nayakkar Palace'],
    airport: 'Madurai International Airport (IXM)',
    pricePerKm: 'Sedan from ₹15/km • SUV from ₹20/km • Innova from ₹20/km • Crysta from ₹24/km',
    cabTypes: ['Sedan (Etios/Dzire)', 'SUV (Ertiga)', 'Innova', 'Innova Crysta'],
    testimonials: [
      { name: 'Priya K.', route: 'Madurai → Chennai', quote: 'Booked a sedan for my family trip to Chennai. The driver was courteous, car was clean, and the fare matched the quote exactly. No return fare — huge savings.', rating: 5 },
      { name: 'Divya P.', route: 'Madurai → Chennai', quote: 'On-time pickup, clean car and a very courteous driver. The airport transfer was seamless.', rating: 5 },
      { name: 'Karthik M.', route: 'Madurai → Coimbatore', quote: 'Innova for the Coimbatore run was perfect. Driver knew the highway well, took proper rest stops. Very professional service.', rating: 5 },
      { name: 'Suresh V.', route: 'Madurai → Trichy', quote: 'Quick 2-hour trip to Srirangam. On-time pickup, smooth drive, and fare matched the quote exactly. Great value for a temple visit.', rating: 5 },
      { name: 'Lakshmi R.', route: 'Madurai → Bangalore', quote: 'Family trip to Bangalore. SUV was spacious, driver was helpful, and the WhatsApp booking was super convenient. Highly recommend.', rating: 5 },
      { name: 'Rahul V.', route: 'Madurai → Salem', quote: 'Business trip to Salem. Sedan was comfortable, driver was professional, and the transparent pricing was a refreshing change. Will book again.', rating: 5 },
    ],
    faqs: [
      { q: 'How much is a Madurai to Chennai one way cab?', a: 'The Madurai to Chennai route is 435 km. A sedan costs from ₹6,925 (435 × ₹15 + ₹400 base), SUV from ₹9,100, Innova from ₹9,100, and Crysta from ₹10,840. Tolls are additional at actuals.' },
      { q: 'How much is a Madurai to Trichy one way cab?', a: 'The Madurai to Trichy route is 135 km. A sedan costs from ₹2,425 (135 × ₹15 + ₹400 base), SUV from ₹3,100, Innova from ₹3,100, and Crysta from ₹3,640. Tolls are additional at actuals.' },
      { q: 'How much is a Madurai to Coimbatore one way cab?', a: 'The Madurai to Coimbatore route is 220 km. A sedan costs from ₹3,700 (220 × ₹15 + ₹400 base), SUV from ₹4,800, Innova from ₹4,800, and Crysta from ₹5,680. Tolls are additional at actuals.' },
      { q: 'How much is a Madurai to Bangalore one way cab?', a: 'The Madurai to Bangalore route is 460 km. A sedan costs from ₹7,300 (460 × ₹15 + ₹400 base), SUV from ₹9,600, Innova from ₹9,600, and Crysta from ₹11,440. Tolls are additional at actuals.' },
      { q: 'How do I book a Madurai to Chennai one way cab?', a: 'Choose the Madurai to Chennai route page, select your cab and send the booking via WhatsApp. You pay only for the one-way drop.' },
      { q: 'Are there cheap one way cab options from Madurai?', a: 'Yes. Our sedan one way cab is the most affordable option, with transparent per-km pricing and no return fare. Sedan at ₹15/km covers up to 4 passengers.' },
      { q: 'Do you serve Madurai Meenakshi Temple pickups?', a: 'Yes, we offer doorstep pickup from anywhere in Madurai, including temples, hotels and the railway junction. Simmakkal and Goripalayam are popular pickup points.' },
      { q: 'Do you offer Madurai airport transfers?', a: 'Yes, we provide airport pickup and drop from Madurai International Airport (IXM) with flight tracking on request.' },
      { q: 'Are tolls and parking charges included for Madurai drop taxis?', a: 'No, tolls and parking charges are excluded from the per-km rate and are payable at actuals. We provide an estimate of these costs before your trip is confirmed on WhatsApp.' },
      { q: 'Can I book a Madurai drop taxi at night?', a: 'Yes, our outstation cab service operates 24/7 including nights and public holidays. A driver night allowance of ₹400 applies for journeys between 11 PM and 6 AM.' },
      { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and cash for all Madurai bookings. GST invoices at 5% are available on request.' },
      { q: 'Is the driver verified?', a: 'Every driver is verified, background-checked, and trained for highway travel. Our dispatch team monitors every trip and customer support is available 24/7.' },
      { q: 'What is the minimum billing for Madurai drop taxis?', a: 'One-way bookings have a minimum billing of 130 km. If your actual distance is below 130 km, the minimum distance is charged. Round-trip minimums are 250 km.' },
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
      `The Coimbatore to Ooty drive is one of the most scenic routes in South India — 170 km through the Nilgiri hills via Mettupalayam or the Aliyar route. Our SUVs and Crystas handle the hairpin bends with ease, and drivers are trained for hill-station navigation. For longer routes, the Coimbatore to Chennai corridor (505 km via Salem) takes about 8 hours in a sedan, while the Coimbatore to Bangalore route (365 km via Erode and Salem) takes about 6 hours.`,
      `Coimbatore is also a key business hub with the Codissia Trade Fair complex, PSG Techno Park, and hundreds of textile mills. Our outstation cab service caters to business travellers heading to Chennai, Bangalore, and other industrial centres across Tamil Nadu. Book your Coimbatore drop taxi at ${c}.`,
    ],
    areas: ['RS Puram', 'Gandhipuram', 'Saibaba Colony', 'Peelamedu', 'Kuniyamuthur', 'Race Course'],
    localities: [
      { name: 'RS Puram', description: 'Coimbatore\'s premier residential and commercial area. Pickup from DB Road, Cross Cut Road, and Race Course Road. Quick access to Sathyamangalam highway for Ooty trips.' },
      { name: 'Gandhipuram', description: 'Central business district with heavy footfall. Pickup from Town Hall, Hope College, and nehru nagar. Direct highway access to Pollachi and Madurai via NH-544.' },
      { name: 'Saibaba Colony', description: 'Upscale residential neighbourhood near Race Course. Pickup from Saibaba Colony Main Road, Thadagam Road. Popular for airport transfers and Ooty hill runs.' },
      { name: 'Peelamedu', description: 'IT and industrial corridor with PSG Tech, GRD College, and multiple tech parks. Pickup from Peelamedu SB Road, Civil Aerodrome. Direct access to airport and Erode highway.' },
      { name: 'Kuniyamuthur', description: 'Western Coimbatore suburb with growing residential developments. Pickup from Kuniyamuthur bypass, Mettupalayam road. Gateway to Ooty via the scenic Nilgiri route.' },
      { name: 'Race Course', description: 'Premium neighbourhood with Coimbatore Race Club, luxury hotels, and upscale residences. Quick access to Avinashi Road and airport transfers.' },
      { name: 'Avinashi Road', description: 'Major arterial road connecting Peelamedu to Singanallur. Pickup from CODISSIA, Nava India, and新加坡市场. Gateway to Trichy and Erode routes.' },
      { name: 'Podanur', description: 'Railway junction area in southern Coimbatore. Pickup from Podanur junction, Chettipalayam road. Gateway to Pollachi and Valparai hill routes.' },
    ],
    landmarks: ['Coimbatore Airport', 'Codissia Trade Fair', 'Marudamalai Temple', 'Siruvani Dam'],
    airport: 'Coimbatore International Airport (CJB)',
    pricePerKm: 'Sedan from ₹15/km • SUV from ₹20/km • Innova from ₹20/km • Crysta from ₹24/km',
    cabTypes: ['Sedan (Etios/Dzire)', 'SUV (Ertiga)', 'Innova', 'Innova Crysta'],
    testimonials: [
      { name: 'Sathish K.', route: 'Coimbatore → Chennai', quote: 'Fast response, no hidden fees, and a polished ride. The app experience felt premium and effortless.', rating: 5 },
      { name: 'Priya M.', route: 'Coimbatore → Ooty', quote: 'Smooth booking, premium car, and the ride was comfortable from start to finish. Highly recommend Obey Taxi for Ooty trips.', rating: 5 },
      { name: 'Arun T.', route: 'Coimbatore → Bangalore', quote: 'Innova Crysta for the Bangalore run was perfect. Driver knew the Erode-Salem highway well, took proper rest stops. Very professional.', rating: 5 },
      { name: 'Lakshmi R.', route: 'Coimbatore → Madurai', quote: 'Booked a sedan for a temple visit. Transparent pricing, clean car, and the driver was very courteous. Will book again.', rating: 5 },
      { name: 'Vikram P.', route: 'Coimbatore → Salem', quote: 'Quick 165 km run to Salem. On-time pickup, smooth drive, and fare matched the quote exactly. Great value.', rating: 5 },
      { name: 'Deepa S.', route: 'Coimbatore → Trichy', quote: 'Family trip to Srirangam from Coimbatore. SUV was spacious, driver was helpful, and the WhatsApp booking was super convenient.', rating: 5 },
    ],
    faqs: [
      { q: 'How much does a Coimbatore to Chennai one way cab cost?', a: 'A Coimbatore to Chennai one way cab starts from ₹7,825 for a sedan (505 km × ₹15/km + ₹400 base). SUV starts from ₹10,400, Innova from ₹10,400, and Crysta from ₹12,420. Tolls are additional at actuals.' },
      { q: 'How much does a Coimbatore to Bangalore one way cab cost?', a: 'A Coimbatore to Bangalore one way cab starts from ₹5,775 for a sedan (365 km × ₹15/km + ₹400 base). SUV starts from ₹7,700, Innova from ₹7,700, and Crysta from ₹9,160. Tolls are additional at actuals.' },
      { q: 'How much does a Coimbatore to Ooty one way cab cost?', a: 'A Coimbatore to Ooty one way cab starts from ₹2,950 for a sedan (170 km × ₹15/km + ₹400 base). SUV starts from ₹3,800, Innova from ₹3,800, and Crysta from ₹4,480. Hill charge of ₹300 applies for Ooty.' },
      { q: 'How much does a Coimbatore to Madurai one way cab cost?', a: 'A Coimbatore to Madurai one way cab starts from ₹3,700 for a sedan (220 km × ₹15/km + ₹400 base). SUV starts from ₹4,800, Innova from ₹4,800, and Crysta from ₹5,680. Tolls are additional at actuals.' },
      { q: 'Can I book a Coimbatore to Ooty taxi?', a: 'Yes. The Coimbatore to Ooty drive (170 km) is a favourite — book an SUV or Innova for comfort on the hill climb. Drivers are trained for Nilgiri hairpin bends and hill-station navigation.' },
      { q: 'Do you offer Coimbatore airport transfers?', a: 'Yes, we provide airport pickup and drop from Coimbatore International Airport (CJB) with flight tracking available.' },
      { q: 'What is the cheapest drop taxi from Coimbatore?', a: 'Our sedan (Etios/Dzire) at ₹15/km is the most affordable option. For Ooty hill routes, we recommend an SUV at ₹20/km for better comfort on steep roads.' },
      { q: 'How do I book a Coimbatore drop taxi on WhatsApp?', a: 'Select your route and cab type on the route page, enter your pickup date and time, then tap "Send on WhatsApp". Our dispatch team confirms within minutes.' },
      { q: 'Are tolls and parking charges included for Coimbatore drop taxis?', a: 'No, tolls and parking charges are excluded from the per-km rate and are payable at actuals. We provide an estimate of these costs before your trip is confirmed on WhatsApp.' },
      { q: 'Can I book a Coimbatore drop taxi at night?', a: 'Yes, our outstation cab service operates 24/7 including nights and public holidays. A driver night allowance of ₹400 applies for journeys between 11 PM and 6 AM.' },
      { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and cash for all Coimbatore bookings. GST invoices at 5% are available on request.' },
      { q: 'Is the driver verified?', a: 'Every driver is verified, background-checked, and trained for highway travel. Our dispatch team monitors every trip and customer support is available 24/7.' },
      { q: 'What is the minimum billing for Coimbatore drop taxis?', a: 'One-way bookings have a minimum billing of 130 km. If your actual distance is below 130 km, the minimum distance is charged. Round-trip minimums are 250 km.' },
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
      `Trichy's strategic central location makes it a natural hub for Tamil Nadu travel. The Trichy to Chennai corridor (330 km via Villupuram on NH-45) takes about 5-6 hours in a sedan. For pilgrims, the Trichy to Madurai route (135 km) is just a 2-hour drive, while the Trichy to Coimbatore route (215 km via Salem) connects to the Nilgiri hill stations. The Trichy to Pondicherry route (215 km via Thanjavur) is popular for weekend beach getaways.`,
      `Trichy is also home to the Sri Ranganathaswamy Temple in Srirangam, one of the largest functioning temples in the world, and the Rockfort Temple that dominates the city skyline. Our drivers are familiar with all temple timings and parking areas, making us the preferred choice for pilgrimage travel from Trichy to Madurai, Chennai, and beyond.`,
    ],
    areas: ['Srirangam', 'Woraiyur', 'Thillai Nagar', 'KK Nagar', 'Ponmalaipatti', 'Uyyakondan Thirumalai'],
    localities: [
      { name: 'Srirangam', description: 'Island town housing the Sri Ranganathaswamy Temple. Pickup from Srirangam bus stand, temple gopuram area. Popular for Chennai and Madurai pilgrimage drops.' },
      { name: 'Woraiyur', description: 'Historic area with ancient temples and residential colonies. Pickup from Woraiyur bus stand, Papanasam road. Quick access to Thanjavur and Pondicherry routes.' },
      { name: 'Thillai Nagar', description: 'Commercial hub with shopping centres and offices. Pickup from Thillai Nagar main road, collectorate area. Gateway to Chennai via NH-45.' },
      { name: 'KK Nagar', description: 'Planned residential colony with good connectivity. Pickup from KK Nagar bus stand, Shastri Nagar. Direct highway access to Madurai and Salem routes.' },
      { name: 'Ponmalaipatti', description: 'Suburb near the Trichy airport. Pickup from Ponmalaipatti junction, airport road. Ideal for early morning airport transfers and Chennai drops.' },
      { name: 'Uyyakondan Thirumalai', description: 'Residential area on the western side of Trichy. Pickup from Uyyakondan Thirumalai temple area, Bharathiar road. Gateway to Coimbatore and Salem routes.' },
      { name: 'Cantonment', description: 'Military and civil station area near Trichy Junction. Pickup from Cantonment bus stand, railway station road. Central location for all Trichy routes.' },
      { name: 'Thuraiyur', description: 'Town 30 km north of Trichy with growing industrial area. Pickup from Thuraiyur bus stand, main road. Gateway to Chennai via NH-45.' },
    ],
    landmarks: ['Rockfort Temple', 'Sri Ranganathaswamy Temple', 'Trichy Junction', 'Jambukeswarar Temple'],
    airport: 'Tiruchirappalli International Airport (TRZ)',
    pricePerKm: 'Sedan from ₹15/km • SUV from ₹20/km • Innova from ₹20/km • Crysta from ₹24/km',
    cabTypes: ['Sedan (Etios/Dzire)', 'SUV (Ertiga)', 'Innova', 'Innova Crysta'],
    testimonials: [
      { name: 'Rahul V.', route: 'Trichy → Chennai', quote: 'Great value for a one-way drop. Booking through WhatsApp took under two minutes. Driver arrived on time and the sedan was clean.', rating: 5 },
      { name: 'Arun T.', route: 'Trichy → Madurai', quote: 'Quick 2-hour trip to Madurai temple. On-time pickup, smooth drive, and fare matched the quote exactly. Will book again for sure.', rating: 5 },
      { name: 'Deepa S.', route: 'Trichy → Coimbatore', quote: 'Family trip to Coimbatore. SUV was spacious, driver was helpful, and the WhatsApp booking was super convenient. Highly recommend.', rating: 5 },
      { name: 'Lakshmi R.', route: 'Trichy → Pondicherry', quote: 'Weekend getaway to Pondicherry was seamless. Pickup from Srirangam was on time, and we reached in under 3 hours. Great value.', rating: 5 },
      { name: 'Vikram P.', route: 'Trichy → Salem', quote: 'Business trip to Salem. Sedan was comfortable, driver was professional, and the transparent pricing was a refreshing change. Will book again.', rating: 5 },
      { name: 'Suresh V.', route: 'Trichy → Chennai', quote: 'Airport pickup at 4 AM and straight to Chennai. WhatsApp booking took 2 minutes, confirmation was instant. Best one-way cab experience in Trichy.', rating: 5 },
    ],
    faqs: [
      { q: 'How much is a Trichy to Chennai one way cab?', a: 'The Trichy to Chennai route is 330 km. A sedan costs from ₹5,350 (330 × ₹15 + ₹400 base), SUV from ₹7,000, Innova from ₹7,000, and Crysta from ₹8,320. Tolls are additional at actuals.' },
      { q: 'How much is a Trichy to Madurai one way cab?', a: 'The Trichy to Madurai route is 135 km. A sedan costs from ₹2,425 (135 × ₹15 + ₹400 base), SUV from ₹3,100, Innova from ₹3,100, and Crysta from ₹3,640. Tolls are additional at actuals.' },
      { q: 'How much is a Trichy to Pondicherry one way cab?', a: 'The Trichy to Pondicherry route is 215 km. A sedan costs from ₹3,625 (215 × ₹15 + ₹400 base), SUV from ₹4,700, Innova from ₹4,700, and Crysta from ₹5,560. Tolls are additional at actuals.' },
      { q: 'How much is a Trichy to Coimbatore one way cab?', a: 'The Trichy to Coimbatore route is 215 km. A sedan costs from ₹3,625 (215 × ₹15 + ₹400 base), SUV from ₹4,700, Innova from ₹4,700, and Crysta from ₹5,560. Tolls are additional at actuals.' },
      { q: 'What routes do Trichy drop taxis cover?', a: 'We cover Chennai (330 km), Madurai (135 km), Salem (140 km), Coimbatore (215 km) and Pondicherry (215 km) with one way and round trip options. All routes feature transparent per-km pricing with no return fare.' },
      { q: 'Is a Trichy to Chennai taxi available at night?', a: 'Yes. We operate 24/7 including nights and public holidays across Tamil Nadu. A driver night allowance of ₹400 applies for journeys between 11 PM and 6 AM.' },
      { q: 'How do I book a Trichy drop taxi on WhatsApp?', a: 'Select your route and cab type on the route page, enter your pickup date and time, then tap "Send on WhatsApp". Our dispatch team confirms within minutes.' },
      { q: 'Do you pick up from Trichy Airport?', a: 'Yes, we provide airport pickup and drop from Tiruchirappalli International Airport (TRZ) with flight tracking on request. Our driver will meet you at the arrivals area.' },
      { q: 'What is the cheapest drop taxi from Trichy?', a: 'Our sedan (Etios/Dzire) at ₹15/km is the most affordable option. For hill stations, we recommend an SUV at ₹20/km for better comfort.' },
      { q: 'Are tolls and parking charges included for Trichy drop taxis?', a: 'No, tolls and parking charges are excluded from the per-km rate and are payable at actuals. We provide an estimate of these costs before your trip is confirmed on WhatsApp.' },
      { q: 'Can I book a Trichy drop taxi at night?', a: 'Yes, our outstation cab service operates 24/7 including nights and public holidays. A driver night allowance of ₹400 applies for journeys between 11 PM and 6 AM.' },
      { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and cash for all Trichy bookings. GST invoices at 5% are available on request.' },
      { q: 'Is the driver verified?', a: 'Every driver is verified, background-checked, and trained for highway travel. Our dispatch team monitors every trip and customer support is available 24/7.' },
      { q: 'What is the minimum billing for Trichy drop taxis?', a: 'One-way bookings have a minimum billing of 130 km. If your actual distance is below 130 km, the minimum distance is charged. Round-trip minimums are 250 km.' },
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
