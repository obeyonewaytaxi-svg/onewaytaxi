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

export const routes: Route[] = [
  { name: 'Chennai → Coimbatore', origin: 'Chennai', destination: 'Coimbatore', distanceKm: 495, durationHours: '8h 30m', via: 'Salem', popular: true },
  { name: 'Chennai → Madurai', origin: 'Chennai', destination: 'Madurai', distanceKm: 435, durationHours: '7h 30m', via: 'Trichy', popular: true, description: 'The Chennai to Madurai corridor is one of Tamil Nadu\'s busiest intercity routes, covering 435 km via Trichy on well-maintained NH-45. The journey takes about 7 hours 30 minutes in a comfortable sedan. Madurai, the temple city, attracts pilgrims, business travellers, and weekend visitors alike. Our one-way drop taxi eliminates the return-fare burden — you pay only for the 435 km drop. Sedan fares start at ₹6,925 with transparent per-km pricing and no hidden charges.' },
  { name: 'Chennai → Trichy', origin: 'Chennai', destination: 'Trichy', distanceKm: 330, durationHours: '5h 30m', via: 'Villupuram', popular: true, description: 'The Chennai to Trichy route covers 330 km via Villupuram on NH-45, taking approximately 5 hours 30 minutes. Trichy is a major junction city connecting pilgrims to Srirangam and Rockfort, and business travellers to central Tamil Nadu. Our one-way drop taxi service offers sedan fares from ₹5,350 with no return fare. Doorstep pickup from any Chennai neighbourhood and drop at your exact Trichy destination.', directionNotes: { title: 'Chennai to Trichy route notes', paragraphs: ['Leave Chennai before 7 AM to clear Tambaram and the highway toll plaza before the morning rush builds. The NH-45 stretch through Villupuram is smooth four-lane tarmac, and a breakfast stop near Tindivanam or Villupuram keeps you comfortable for the second half.', 'The final approach into Trichy passes the airport before the Rockfort view on the right; if you are heading to Srirangam or Thillai Nagar, tell the driver so he takes the bypass instead of cutting through the old town.'] } },
  { name: 'Trichy → Chennai', origin: 'Trichy', destination: 'Chennai', distanceKm: 330, durationHours: '5h 30m', via: 'Villupuram', popular: true, description: 'The Trichy to Chennai return corridor covers 330 km via Villupuram, taking about 5 hours 30 minutes. Whether you are heading to Chennai for a flight, business meeting, or medical visit, our one-way drop taxi ensures a comfortable ride with transparent pricing. Sedan fares start at ₹5,350 with no return fare — pay only for the drop. Doorstep pickup from Srirangam, Woraiyur, Thillai Nagar, and all Trichy neighbourhoods.', directionNotes: { title: 'Trichy to Chennai route notes', paragraphs: ['Start from Trichy before 6:30 AM to reach Chennai before lunch and beat the inbound city traffic at Kanchipuram and Tambaram. The morning run is generally lighter than the evening counter-flow, which makes the 5h 30m schedule realistic.', 'If you are catching a flight from Chennai airport, mention your flight time when booking so the team plans the arrival buffer; the airport sits off the highway before the city centre, so an airport drop needs no extra city detour.'] } },
  { name: 'Vellore → Chennai', origin: 'Vellore', destination: 'Chennai', distanceKm: 140, durationHours: '2h 45m', via: 'Kancheepuram', popular: false, description: 'The Vellore to Chennai route is a quick 140 km drive via Kancheepuram, taking about 2 hours 45 minutes. This corridor is popular for hospital visits (CMC Vellore), business travel, and airport connections. Our one-way drop taxi offers sedan fares from ₹2,500 with no return fare. Doorstep pickup from Vellore Fort, Katpadi, Sathuvachari, and all major neighbourhoods.', directionNotes: { title: 'Vellore to Chennai route notes', paragraphs: ['Vellore to Chennai is a short, routine drop with frequent departures. The stretch via Kancheepuram meets NH-48 around Vandalur, and the last 20 km through Chennai suburbs can add time, so schedule at least 2h 45m even though the highway itself is quick.', 'Most Vellore departures are early — hospital rounds at CMC Vellore and airport pickup times. If you are heading to Chennai airport for a flight, departing Vellore before 5 AM is the reliable choice on weekdays.'] } },
  { name: 'Chennai → Salem', origin: 'Chennai', destination: 'Salem', distanceKm: 340, durationHours: '5h 45m', via: 'Ulundurpettai', popular: true },
  { name: 'Bangalore → Chennai', origin: 'Bangalore', destination: 'Chennai', distanceKm: 350, durationHours: '6h 15m', via: 'Vellore', popular: true },
  { name: 'Bangalore → Coimbatore', origin: 'Bangalore', destination: 'Coimbatore', distanceKm: 365, durationHours: '6h 30m', via: 'Salem', popular: true },
  { name: 'Coimbatore → Ooty', origin: 'Coimbatore', destination: 'Ooty', distanceKm: 170, durationHours: '3h 45m', via: 'Mettupalayam', popular: true },
  { name: 'Madurai → Chennai', origin: 'Madurai', destination: 'Chennai', distanceKm: 435, durationHours: '7h 30m', via: 'Trichy', popular: true },
  { name: 'Pondicherry → Chennai', origin: 'Pondicherry', destination: 'Chennai', distanceKm: 165, durationHours: '3h 15m', via: 'Tindivanam', popular: true },
  { name: 'Vellore → Bangalore', origin: 'Vellore', destination: 'Bangalore', distanceKm: 210, durationHours: '4h 15m', via: 'Chittoor', popular: true },
  { name: 'Erode → Chennai', origin: 'Erode', destination: 'Chennai', distanceKm: 400, durationHours: '6h 45m', via: 'Salem', popular: true },
  { name: 'Bangalore → Madurai', origin: 'Bangalore', destination: 'Madurai', distanceKm: 435, durationHours: '8h', via: 'Dindigul', popular: false },
  { name: 'Chennai → Pondicherry', origin: 'Chennai', destination: 'Pondicherry', distanceKm: 165, durationHours: '3h 15m', via: 'Tindivanam', popular: false },
  { name: 'Coimbatore → Salem', origin: 'Coimbatore', destination: 'Salem', distanceKm: 165, durationHours: '3h 15m', via: 'Avinashi', popular: false, description: 'The Coimbatore to Salem route covers 165 km via Avinashi on NH-544, taking about 3 hours 15 minutes. This corridor connects the textile hub of Coimbatore with the industry town of Salem and is popular with business travellers and families. Our one-way drop taxi offers sedan fares from ₹2,875 with no return fare.', directionNotes: { title: 'Coimbatore to Salem route notes', paragraphs: ['NH-544 from Coimbatore via Avinashi is one of Tamil Nadu\'s faster divided highways, and under 3 hours is realistic outside peak hours. The Avinashi–Karur–Salem link carries heavy container traffic, so a weekday morning start keeps you ahead of it.', 'If you are dropping someone at Salem for a train connection, confirm the station name in the booking — Salem Junction and Salem Town station add different route legs.'] } },
  { name: 'Madurai → Trichy', origin: 'Madurai', destination: 'Trichy', distanceKm: 135, durationHours: '2h 30m', via: 'Manapparai', popular: false, description: 'The Madurai to Trichy route is a quick 135 km drive via Manapparai, taking about 2 hours 30 minutes. This corridor links two of Tamil Nadu\'s oldest temple cities and is popular with pilgrims travelling between Madurai Meenakshi and Srirangam. Our one-way drop taxi offers sedan fares from ₹2,425 with no return fare.', directionNotes: { title: 'Madurai to Trichy route notes', paragraphs: ['The Madurai–Trichy corridor via Manapparai is a busy two-lane trunk road with steady truck movement, so expect 2h 30m and avoid midday starts. Departing before 8 AM gives you a quieter first hour out of Madurai\'s outskirts.', 'Srirangam-bound travellers should plan for the temple traffic on the final approach; Rockfort and the Chinnakarai route bypass the crowded Melur stretch. Weekend pilgrim traffic peaks around festival dates, so book ahead.'] } },
  { name: 'Chennai → Vellore', origin: 'Chennai', destination: 'Vellore', distanceKm: 140, durationHours: '2h 45m', via: 'Kancheepuram', popular: false },
  { name: 'Chennai → Erode', origin: 'Chennai', destination: 'Erode', distanceKm: 400, durationHours: '6h 45m', via: 'Salem', popular: false },
  { name: 'Chennai → Bangalore', origin: 'Chennai', destination: 'Bangalore', distanceKm: 350, durationHours: '6h 15m', via: 'Vellore', popular: false },
  { name: 'Chennai → Ooty', origin: 'Chennai', destination: 'Ooty', distanceKm: 570, durationHours: '10h 45m', via: 'Salem & Coimbatore', popular: false },
  { name: 'Coimbatore → Chennai', origin: 'Coimbatore', destination: 'Chennai', distanceKm: 495, durationHours: '8h 30m', via: 'Salem', popular: false },
  { name: 'Coimbatore → Bangalore', origin: 'Coimbatore', destination: 'Bangalore', distanceKm: 365, durationHours: '6h 30m', via: 'Salem', popular: false },
  { name: 'Coimbatore → Madurai', origin: 'Coimbatore', destination: 'Madurai', distanceKm: 220, durationHours: '4h 15m', via: 'Palani', popular: false },
  { name: 'Coimbatore → Trichy', origin: 'Coimbatore', destination: 'Trichy', distanceKm: 215, durationHours: '4h', via: 'Karur', popular: false },
  { name: 'Madurai → Coimbatore', origin: 'Madurai', destination: 'Coimbatore', distanceKm: 220, durationHours: '4h 15m', via: 'Palani', popular: false },
  { name: 'Madurai → Salem', origin: 'Madurai', destination: 'Salem', distanceKm: 170, durationHours: '3h', via: 'Karur', popular: false },
  { name: 'Madurai → Bangalore', origin: 'Madurai', destination: 'Bangalore', distanceKm: 435, durationHours: '8h', via: 'Dindigul', popular: false },
  { name: 'Trichy → Salem', origin: 'Trichy', destination: 'Salem', distanceKm: 140, durationHours: '2h 45m', via: 'Ulundurpettai', popular: false, description: 'The Trichy to Salem route covers 140 km via Ulundurpettai on NH-79/68, taking about 2 hours 45 minutes. This corridor links central Tamil Nadu with the Salem industrial belt and is popular with business and family travel. Our one-way drop taxi offers sedan fares from ₹2,500 with no return fare.', directionNotes: { title: 'Trichy to Salem route notes', paragraphs: ['Trichy to Salem crosses through Ulundurpettai on NH-68, a steadily improving corridor with light toll traffic compared with Chennai-bound routes. Early-morning departures trim the journey below 2h 45m.', 'Salem ring-road access is flexible — drivers can drop you at any point in the city, whether you are bound for the steel plant area, the new bus stand, or a stay near the Yercaud ghat road.'] } },
  { name: 'Trichy → Madurai', origin: 'Trichy', destination: 'Madurai', distanceKm: 135, durationHours: '2h 30m', via: 'Manapparai', popular: false },
  { name: 'Trichy → Pondicherry', origin: 'Trichy', destination: 'Pondicherry', distanceKm: 200, durationHours: '3h 45m', via: 'Chidambaram', popular: false, description: 'The Trichy to Pondicherry route covers 200 km via Chidambaram, taking about 3 hours 45 minutes. This coastal corridor is popular with pilgrims heading to Velankanni and travellers bound for the Pondicherry beach towns. Our one-way drop taxi offers sedan fares from ₹3,400 with no return fare.', directionNotes: { title: 'Trichy to Pondicherry route notes', paragraphs: ['The Trichy–Pondicherry run via Chidambaram follows the Cauvery delta, so sections near the river towns are busier in the mornings. Plan to leave before 7 AM for an early-ish coastal arrival.', 'For Velankanni-bound pilgrims, the drop can be extended past Pondicherry with a short stop at the shrine; mention this route variation when booking so the fare stays transparent.'] } },
  { name: 'Salem → Chennai', origin: 'Salem', destination: 'Chennai', distanceKm: 340, durationHours: '5h 45m', via: 'Ulundurpettai', popular: false },
  { name: 'Salem → Coimbatore', origin: 'Salem', destination: 'Coimbatore', distanceKm: 165, durationHours: '3h 15m', via: 'Avinashi', popular: false },
  { name: 'Salem → Bangalore', origin: 'Salem', destination: 'Bangalore', distanceKm: 220, durationHours: '4h', via: 'Hosur', popular: false },
  { name: 'Salem → Erode', origin: 'Salem', destination: 'Erode', distanceKm: 60, durationHours: '1h 15m', via: 'NH-544', popular: false, description: 'The Salem to Erode route is a fast 60 km hop on NH-544 taking about 1 hour 15 minutes. This corridor serves the growing industrial traffic between Salem and Erode and is popular for same-day business and family drops. Our one-way drop taxi offers sedan fares starting at ₹2,350 with no return fare.', directionNotes: { title: 'Salem to Erode route notes', paragraphs: ['At 60 km, Salem–Erode often falls below the 130 km one-way minimum, so the quoted fare reflects the minimum distance billing rather than just the highway kilometres — the booking team confirms the exact number before you confirm.', 'NH-544 is fast, so the total trip is often under an hour in light traffic. Departures timed before 8 AM avoid the school and market traffic in both city cores.'] } },
  { name: 'Bangalore → Vellore', origin: 'Bangalore', destination: 'Vellore', distanceKm: 210, durationHours: '4h 15m', via: 'Chittoor', popular: false },
  { name: 'Bangalore → Salem', origin: 'Bangalore', destination: 'Salem', distanceKm: 220, durationHours: '4h', via: 'Hosur', popular: false },
  { name: 'Pondicherry → Trichy', origin: 'Pondicherry', destination: 'Trichy', distanceKm: 200, durationHours: '3h 45m', via: 'Chidambaram', popular: false, description: 'The Pondicherry to Trichy route covers 200 km via Chidambaram, taking about 3 hours 45 minutes. This coastal corridor carries beach-town return traffic and pilgrims travelling between Pondicherry and the central Tamil Nadu temple belt. Our one-way drop taxi offers sedan fares from ₹3,400 with no return fare.', directionNotes: { title: 'Pondicherry to Trichy route notes', paragraphs: ['Departing Pondicherry before the late-morning crush keeps the coastal stretch smooth; from Villupuram the road cuts inland through Cuddalore district toward Chidambaram before joining the Trichy trunk.', 'Pilgrims travelling after Velankanni or Chidambaram worship can combine the route in one sitting with a short temple stop — tell the driver and he adjusts the schedule without affecting the fare.'] } },
  { name: 'Erode → Salem', origin: 'Erode', destination: 'Salem', distanceKm: 60, durationHours: '1h 15m', via: 'NH-544', popular: false, description: 'The Erode to Salem route is a fast 60 km hop on NH-544 taking about 1 hour 15 minutes. This corridor carries daily industrial and family travel between the two cities, with textile traders and commuters the main users. Our one-way drop taxi offers sedan fares starting at ₹2,350 with no return fare.', directionNotes: { title: 'Erode to Salem route notes', paragraphs: ['Erode–Salem is a short corridor where the 130 km one-way minimum normally applies, so the fare reflects minimum-distance billing — the WhatsApp quote states it clearly before confirmation.', 'The highway is quick, but Erode city traffic on Brough Road and the Salem market entry can add 20 minutes at peak hours; an early morning start avoids both.'] } },
  { name: 'Ooty → Coimbatore', origin: 'Ooty', destination: 'Coimbatore', distanceKm: 170, durationHours: '3h 45m', via: 'Mettupalayam', popular: false, description: 'The Ooty to Coimbatore route descends 170 km through the Nilgiri ghats via Mettupalayam, taking about 3 hours 45 minutes. This corridor serves hill-station return travel and airport connections for Ooty visitors. Our one-way drop taxi offers sedan fares from ₹2,950 with no return fare and a ₹300 hill allowance.', directionNotes: { title: 'Ooty to Coimbatore route notes', paragraphs: ['The descent through the 36 hairpin bends between Ketti and Mettupalayam is the signature leg of this route — beginning before 8 AM clears the mist and tourist convoys, and gives you a daylight finish at Coimbatore for onward flight or train connections.', 'A hill station allowance of ₹300 applies on top of the per-km rate for ghat driving. For airport-bound travellers, Coimbatore airport sits on the eastern edge of the city, so the descent timeline matters more than the final city traffic.'] } },
  { name: 'Vellore → Chennai Airport', origin: 'Vellore', destination: 'Chennai Airport', distanceKm: 130, durationHours: '2h 45m', via: 'Kancheepuram, NH-48', popular: false, description: 'Get a Vellore to Chennai Airport taxi for a flight connection with door-to-door pickup. The 130 km drive via Kancheepuram takes about 2 hours 45 minutes. Flight is tracked and pickup timing adjusts to your schedule — sedan fares from ₹2,350 with no return fare.' },
  { name: 'Chennai Airport → Pondicherry', origin: 'Chennai Airport', destination: 'Pondicherry', distanceKm: 170, durationHours: '3h 30m', via: 'Tindivanam', popular: false, description: 'Travel directly from Chennai Airport to Pondicherry in one booking, with the driver waiting at arrivals. The 170 km drive via Tindivanam takes around 3 hours 30 minutes. Flight-tracked pickup and door-to-door drop — sedan fares from ₹2,950 with no return fare.' },
  { name: 'Coimbatore Airport → Ooty', origin: 'Coimbatore Airport', destination: 'Ooty', distanceKm: 175, durationHours: '4h 30m', via: 'Mettupalayam ghat', popular: false, description: 'A direct taxi from Coimbatore Airport to Ooty covering 175 km through the Nilgiri ghats and 36 hairpin bends, taking about 4 hours 30 minutes. Baggage-friendly SUVs and Innovas recommended for the climb — sedan fares from ₹3,025 with no return fare.' },
  { name: 'Madurai Airport → Rameswaram', origin: 'Madurai Airport', destination: 'Rameswaram', distanceKm: 180, durationHours: '3h 45m', via: 'Ramanathapuram', popular: false, description: 'Catch a taxi right outside Madurai Airport to Rameswaram, a 180 km drive via Ramanathapuram taking about 3 hours 45 minutes. Door-to-door drop at any hotel or temple street — sedan fares from ₹3,100 with no return fare.' },
  { name: 'Trichy Airport → Thanjavur', origin: 'Trichy Airport', destination: 'Thanjavur', distanceKm: 65, durationHours: '1h 30m', via: 'NH-83', popular: false, description: 'Travel from Trichy airport to Thanjavur in about 1 hour 30 minutes over a 65 km drive on NH-83. Door-to-door drop at Thanjavur hotels or near the Big Temple — sedan fare of ₹2,350 (130 km minimum applies) with no return fare.' },
  { name: 'Bangalore Airport → Chennai', origin: 'Bangalore Airport', destination: 'Chennai', distanceKm: 360, durationHours: '6h 30m', via: 'Vellore, NH-48', popular: false, description: 'A direct airport-to-city taxi from Bangalore Airport to Chennai covering 360 km via Vellore and taking about 6 hours 30 minutes. Flight-tracked pickup, door-to-door Chennai drop — sedan fares from ₹5,800 with no return fare.' },
  { name: 'Chennai Airport → Tirupati', origin: 'Chennai Airport', destination: 'Tirupati', distanceKm: 150, durationHours: '3h 30m', via: 'Nagari, NH-48', popular: false, description: 'Travel from Chennai Airport to Tirupati in a private drop taxi, a 150 km drive via Nagari taking about 3 hours 30 minutes. Door-to-door drop at your Tirupati hotel or near the temple ghats — sedan fares from ₹2,650 with no return fare.' },
  { name: 'Coimbatore Airport → Coonoor', origin: 'Coimbatore Airport', destination: 'Coonoor', distanceKm: 155, durationHours: '4h 15m', via: 'Mettupalayam ghat', popular: false, description: 'A direct Coimbatore Airport to Coonoor taxi covering 155 km through the Nilgiri ghats, taking about 4 hours 15 minutes. Jeep-style and SUV options available for the climb — sedan fares from ₹2,725 with no return fare and a ₹300 hill allowance.' },
  { name: 'Chennai → VIT Vellore', origin: 'Chennai', destination: 'VIT Vellore', distanceKm: 145, durationHours: '3h 15m', via: 'Kancheepuram, NH-48', popular: false, description: 'Book a Chennai to VIT Vellore taxi for campus travel, a 145 km drive via Kancheepuram taking about 3 hours 15 minutes. Direct drop at the VIT main gate on Katpadi Road — sedan fares from ₹2,575 with no return fare.' },
  { name: 'Vellore → VIT Vellore', origin: 'Vellore', destination: 'VIT Vellore', distanceKm: 8, durationHours: '25m', via: 'Katpadi Road', popular: false, description: 'A short Vellore to VIT Vellore drop covering 8 km and taking about 25 minutes. Ideal for hostel transfers and campus pickups — sedan fares from ₹2,350 (130 km minimum applies) with no return fare.' },
  { name: 'Chennai → Srirangam', origin: 'Chennai', destination: 'Srirangam', distanceKm: 335, durationHours: '5h 45m', via: 'Trichy, NH-45', popular: false, description: 'Travel from Chennai to Srirangam for temple visits, a 335 km drive via Trichy taking about 5 hours 45 minutes. Direct drop near the Srirangam temple or your hotel on the island — sedan fares from ₹5,425 with no return fare.' },
  { name: 'Trichy → Srirangam', origin: 'Trichy', destination: 'Srirangam', distanceKm: 8, durationHours: '25m', via: 'City roads', popular: false, description: 'A short drop from Trichy to Srirangam temple covering 8 km and taking about 25 minutes. One-way taxi with no return fare — sedan fare of ₹2,350 (130 km minimum applies) for a door-to-door temple drop.' },
  { name: 'Chennai → Velankanni', origin: 'Chennai', destination: 'Velankanni', distanceKm: 330, durationHours: '6h 45m', via: 'Chidambaram, Nagapattinam', popular: false, description: 'A pilgrimage taxi from Chennai to Velankanni covering 330 km via Chidambaram and Nagapattinam, taking about 6 hours 45 minutes. Direct drop near the Basilica or your lodge — sedan fares from ₹5,350 with no return fare.' },
  { name: 'Madurai → Velankanni', origin: 'Madurai', destination: 'Velankanni', distanceKm: 210, durationHours: '4h 30m', via: 'Ramanathapuram, Rameswaram Road', popular: false, description: 'A direct taxi from Madurai to Velankanni covering 210 km and taking about 4 hours 30 minutes. Comfortable sedan or Innova for the pilgrimage — sedan fares from ₹3,550 with no return fare.' },
  { name: 'Chennai → Thanjavur', origin: 'Chennai', destination: 'Thanjavur', distanceKm: 340, durationHours: '6h', via: 'Villupuram, NH-45', popular: false, description: 'Book a Chennai to Thanjavur taxi covering 340 km via Villupuram in about 6 hours, passing the temple belt of central Tamil Nadu. Direct drop at your Thanjavur stay or near the Big Temple — sedan fares from ₹5,500 with no return fare.' },
  { name: 'Trichy → Thanjavur', origin: 'Trichy', destination: 'Thanjavur', distanceKm: 65, durationHours: '1h 30m', via: 'NH-83', popular: false, description: 'A short 65 km Trichy to Thanjavur taxi taking about 1 hour 30 minutes on NH-83. Door-to-door drop near the Big Temple or Navaratri mandapams — sedan fare of ₹2,350 (130 km minimum applies) with no return fare.' },
  { name: 'Chennai → Tirupati', origin: 'Chennai', destination: 'Tirupati', distanceKm: 150, durationHours: '3h 30m', via: 'Nagari, NH-48', popular: false, description: 'A pilgrimage taxi from Chennai to Tirupati covering 150 km via Nagari in about 3 hours 30 minutes. Direct drop at your Tirupati hotel, near Alipiri footsteps or the TTD ghats — sedan fares from ₹2,650 with no return fare.' },
  { name: 'Bangalore → Tirupati', origin: 'Bangalore', destination: 'Tirupati', distanceKm: 250, durationHours: '5h 15m', via: 'Chittoor, NH-69', popular: false, description: 'A direct Bangalore to Tirupati taxi covering 250 km via Chittoor in about 5 hours 15 minutes. Door-to-door drop at Tirupati hotels or the TTD bus stand — sedan fares from ₹4,150 with no return fare.' },
].map((route) => ({
  ...route,
  slug: `${makeSlug(route.origin)}-to-${makeSlug(route.destination)}`,
  ...(route.directionNotes
    ? { directionNotes: { title: route.directionNotes.title, paragraphs: [...route.directionNotes.paragraphs] } }
    : {}),
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
      'Book an affordable one-way drop taxi across Tamil Nadu & South India. Pay only for the distance you travel with transparent per-km rates.',
    longDescription:
      'Book a one-way drop taxi and pay only for the drop direction of your journey. Our one-way taxi service removes the traditional return-fare burden, making intercity travel across Tamil Nadu and South India genuinely affordable. Whether you are heading from Chennai to Coimbatore, Madurai to Bangalore, Trichy to Pondicherry, or any intercity route, you get a transparent per-km quote with no hidden charges. Every booking includes a verified, background-checked driver, a sanitized vehicle, and doorstep pickup and drop at your exact location. We operate 24/7 with sedan, SUV, Innova, and Crysta options to match your comfort and budget. Pay only for the distance you travel — no return fare, no empty-leg charges, no surprises.',
    features: [
      'No return fare — pay only for your drop',
      'Transparent per-km pricing with instant quotes',
      'Doorstep pickup and drop at any location',
      'Verified, background-checked drivers',
      'Sedan, SUV, Innova, and Crysta options',
      'GST-transparent invoicing on request',
      '24/7 WhatsApp booking with instant confirmation',
    ],
    faqs: [
      { question: 'What is a one-way drop taxi?', answer: 'A one-way drop taxi is an intercity cab service where you pay only for the distance from your pickup to your destination. Unlike traditional round-trip taxis, there is no return fare or empty-leg charge — you pay for exactly what you use.' },
      { question: 'How much does a one-way taxi cost?', answer: 'Fares follow transparent per-km pricing: Sedan from ₹15/km, SUV from ₹20/km, Innova from ₹20/km, and Crysta from ₹24/km. A ₹400 base fare applies. For example, Chennai to Coimbatore (495 km) starts from ₹7,825 in a sedan.' },
      { question: 'Do I pay for the return trip?', answer: 'No. With a one-way drop taxi, you pay only for the drop direction. There is no return fare, no empty-leg charge, and no hidden costs. This is what makes one-way taxis significantly cheaper than round-trip bookings for single-direction travel.' },
      { question: 'How do I book a one-way taxi on WhatsApp?', answer: 'Select your route and cab type on the route page, enter your pickup date and time, then tap "Send on WhatsApp". Our dispatch team confirms your booking within minutes with driver details and a transparent fare quote.' },
      { question: 'Are tolls included in the fare?', answer: 'No, tolls, state permits, and parking charges are excluded from the per-km rate and are payable at actuals. We provide an estimate of these costs before your trip is confirmed on WhatsApp so there are no surprises.' },
      { question: 'What cab options are available for one-way trips?', answer: 'We offer Sedan (Etios/Dzire) for up to 4 passengers with 2 bags, SUV (Ertiga) for up to 6 passengers with 3 bags, Innova for up to 7 passengers with 4 bags, and Innova Crysta for premium comfort with up to 7 passengers.' },
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
    faqs: [
      { question: 'What is included in a round-trip booking?', answer: 'A round-trip booking includes the same cab and driver for both legs of your journey. You get door-to-door pickup and drop, transparent per-km pricing, and multi-day availability with driver accommodation if needed.' },
      { question: 'How is round-trip pricing different from one-way?', answer: 'Round-trip pricing uses a slightly lower per-km rate since the driver gets a return fare. For example, sedan is ₹14/km on round trips vs ₹15/km on one-way. You pay for the total distance of both legs combined.' },
      { question: 'Can I extend my round-trip duration?', answer: 'Yes, you can extend your trip by contacting our support team. Additional day charges apply based on your cab type. Driver night bata of ₹400 applies for journeys between 11 PM and 6 AM.' },
      { question: 'Is driver night bata included in the round-trip fare?', answer: 'A base driver allowance is included. An additional ₹400 night bata applies for travel between 11 PM and 6 AM. For hill station trips, a ₹300 driver allowance applies additionally.' },
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
    faqs: [
      { question: 'Do you track flights for airport pickups?', answer: 'Yes, we monitor your flight in real time and automatically adjust your pickup time if there are delays. Our driver will be at the airport when you land, not when the flight was scheduled.' },
      { question: 'Which airports do you serve?', answer: 'We provide airport transfers to and from Chennai (MAA), Bangalore (BLR), Coimbatore (CJB), Madurai (IXM), and Trichy (TRZ) airports. We also cover secondary airports on request.' },
      { question: 'How early should I book my airport transfer?', answer: 'We recommend booking at least 4 hours in advance for domestic flights and 12 hours for international flights. However, we accept last-minute bookings subject to driver availability.' },
      { question: 'What if my flight is delayed?', answer: 'We track all flight delays in real time and reschedule your pickup automatically. There is no extra charge for delay-adjusted pickups. Your driver will wait at the airport until you arrive.' },
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
    faqs: [
      { question: 'What is the minimum distance for an outstation booking?', answer: 'One-way bookings are billed at a minimum of 130 km, and round trips at a minimum of 250 km total. If your actual journey is shorter than the minimum, the minimum distance is charged.' },
      { question: 'Can I book a multi-city outstation trip?', answer: 'Yes, you can plan a multi-city itinerary. Contact our support team with your route plan and we will provide a custom quote covering all stops and waiting time.' },
      { question: 'Are hill station routes available?', answer: 'Yes, we cover popular hill stations including Ooty, Kodaikanal, Munnar, Coorg, and Yercaud. A ₹300 hill station driver allowance applies in addition to the per-km fare.' },
      { question: 'What if I need to stop en route?', answer: 'Short rest stops are included at no extra charge. For extended stops (sightseeing, meals over 30 minutes), a waiting charge of ₹200/hour applies. Discuss your itinerary with the driver beforehand.' },
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
      'A driver allowance (bata) of ₹400 is already factored in as the base fare. An additional driver night allowance of ₹400 applies if the journey occurs between 11 PM and 6 AM. For hill station trips, a ₹300 driver allowance applies. GST (5%) is extra if an official invoice is required.',
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
      'A drop taxi (or one-way cab) allows you to pay only for your single-direction trip without paying for the driver\'s return journey. Obey One Way Taxi provides flat per-km pricing, doorstep pickup, and guaranteed clean cars across all major Tamil Nadu cities.',
  },
  {
    question: 'What is the minimum billing distance for a one-way taxi?',
    answer:
      'One-way bookings have a minimum billing of 130 km. For round-trip bookings the minimum is 250 km. If your actual distance is below the minimum, the minimum distance is charged.',
  },
  {
    question: 'Why is a one-way taxi fare higher per km than a round trip?',
    answer:
      'One-way per-km rates are set higher because the driver must return from your drop city empty. In a round trip you hire the same cab for both legs, so the driver never travels empty and the per-km rate is discounted. For single-direction travel, one-way still works out cheaper overall because you never pay for the return leg.',
  },
  {
    question: 'Does "drop taxi" mean the same across Tamil Nadu?',
    answer:
      'Yes — in Tamil Nadu "drop taxi", "one way taxi" and "one way drop cab" are used interchangeably. They all describe an intercity cab where you pay only for the distance from your pickup to your destination, with no return fare or empty-leg charge.',
  },
  {
    question: 'Which car types are available for one-way drop?',
    answer:
      'We offer Sedan (Etios/Dzire), SUV (Ertiga), Innova, and Innova Crysta for one-way drops. Sedans start at ₹15/km, SUVs and Innovas at ₹20/km, and Crystas at ₹24/km. Choose based on your comfort and luggage needs.',
  },
  {
    question: 'Can I get a GST invoice for my one-way taxi booking?',
    answer:
      'Yes, GST invoices at 5% are available on request for all one-way taxi bookings. Contact our support team after your trip to receive an official invoice for expense claims.',
  },
  {
    question: 'How far in advance should I book a one-way taxi?',
    answer:
      'We recommend booking at least 4 hours in advance for same-day travel. For early morning or late-night departures, booking the previous evening ensures better vehicle availability. Peak season and festival dates should be booked 2-3 days ahead.',
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
      'Intercity travel in South India often comes down to one decision: book a one-way drop or keep a cab for a round trip. Each option fits a different travel pattern, and the right choice saves anywhere from a few hundred to a few thousand rupees. Here is how to decide.',
      '## The core difference: whose return do you pay for?',
      'In the old two-way billing model, a one-way request was priced as if the cab had to come back empty — effectively charging you for a return trip you never take. A one-way drop taxi does the opposite: you pay a flat per-km rate for a single direction only, and the driver\u2019s empty return is absorbed into that rate rather than being billed to you as a second fare.',
      'A round trip, by contrast, keeps the same cab and driver for both legs. Because the driver never travels empty in either direction, you qualify for a discounted per-km rate on the entire booking — which is why round trips are cheaper per kilometre even though the total is based on the distance in both directions.',
      '## How the maths works on a real route',
      'Take [Chennai to Bangalore](/routes/chennai-to-bangalore), roughly 350 km one way. A one-way sedan drop at [₹15/km](/tariff) comes to about ₹5,650 before tolls. Book the same trip as a round trip at the discounted ₹14/km and the base comes to about ₹10,200 (700 km total) — before tolls on both legs and two nights of driver allowance if it stretches past a day.',
      'So the pattern is simple: if you are returning to the pickup city, a round trip is almost always cheaper overall because you get the discounted rate on every kilometre. If you are not returning — moving, visiting family, attending a function, catching a flight — a one-way drop means you never pay for a return leg at all.',
      '## When a one-way taxi is the right call',
      'Choose a one-way drop when you do not plan to come back to the pickup city within a day or two: relocating for work, dropping someone at the airport, attending a wedding, or visiting family in another city while the driver returns home the same way. You travel light, you pay once, and the cab does not sit idle while you are away.',
      '## When a round trip saves more',
      'Choose a round trip for weekend getaways and family visits where you need the same car for the return leg. [Chennai to Pondicherry](/routes/chennai-to-pondicherry) and [Coimbatore to Ooty](/routes/coimbatore-to-ooty) are classic round-trip routes: you keep one driver who knows the roads, you pay a discounted per-km rate, and there is no second booking to coordinate.',
      '## Minimum distances and allowances',
      'Two rules keep the maths fair. One-way bookings carry a minimum billing of 130 km, and round trips a minimum of 250 km total — below that the minimum is charged. A driver night allowance of ₹400 applies between 11 PM and 6 AM, and hill routes like Ooty add a ₹300 hill allowance because ghat driving is slower and tougher on the car.',
      '## What to confirm before you book',
      'Whichever you choose, always confirm the per-km rate, the toll policy, and any driver or night charges before you confirm. At [Obey One Way Taxi](/tariff), tolls, parking and state permit charges are payable at actuals and are never hidden inside the per-km rate; GST of 5% applies only when you need an invoice.',
      'Get an instant comparison for your exact route in the [fare calculator](/fare-calculator), or send your trip details on [WhatsApp](/contact) and get a written estimate in minutes.',
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
      'The Chennai to Coimbatore drive is one of the longest and most travelled intercity routes in Tamil Nadu, and one-way taxis on this corridor are booked constantly by business travellers, students and families. Here is everything you need to plan the trip with a transparent fare.',
      '## Distance, route and driving time',
      'The Chennai to Coimbatore drive covers roughly 495 km via Salem on NH-44 and takes about 8 hours 30 minutes by car, including short breaks. The route is largely four-lane and well-maintained: you leave Chennai past Kanchipuram, join the highway at Kadalur, and roll through Salem before the climb past Avinashi into Coimbatore.',
      '## What a one-way sedan costs',
      'At [₹15/km](/tariff), a one-way sedan drop for the 495 km journey comes to about ₹7,825 before tolls. An SUV or Innova at ₹20/km is around ₹9,900, and an Innova Crysta at ₹24/km around ₹11,880. Since this is a one-way drop taxi, you pay no return fare — the empty return is not billed as a second journey.',
      '## Toll and extra-charge transparency',
      'Tolls, state permit charges and parking are payable at actuals and are not bundled into the per-km rate. Your booking team shares a written estimate of these before the trip is confirmed, so the final figure never surprises you. A driver night allowance of ₹400 applies for pickups between 11 PM and 6 AM, and GST of 5% is added only if you need an invoice.',
      '## Best time to travel',
      'The corridor sees heavy weekend demand in both directions as Coimbatore\u2019s IT and engineering workforce travels to Chennai. Leave before 6 AM on a Saturday to beat city traffic on both ends, and book 2\u20133 days ahead during festival weeks and exam season.',
      '## Choosing the right car',
      'A sedan is comfortable for a solo traveller or a couple and is the best value at ₹15/km. Families of four to six with luggage should take an Innova or SUV — the extra legroom and cargo space make an eight-and-a-half-hour drive noticeably more pleasant. For group travel and airport connections, an Innova Crysta at ₹24/km is the premium pick.',
      '## The return-leg question',
      'If you plan to come back within a couple of days, a [round trip](/blog/one-way-taxi-vs-round-trip) at the discounted ₹14/km (sedan) and ₹19/km (SUV) may work out cheaper than two separate one-way drops. If you are not returning, the one-way drop is unequivocally the better deal.',
      'Check the [Chennai to Coimbatore route page](/routes/chennai-to-coimbatore) for exact distance and timing, get an instant estimate in the [fare calculator](/fare-calculator), and confirm your one-way taxi 24/7 on [WhatsApp](/contact).',
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
    seoTitle: 'Chennai to Bangalore One Way Taxi Cost',
    excerpt: 'How much does a one-way taxi from Chennai to Bangalore really cost? Distance, travel time, per-km fares, tolls and hidden charges explained.',
    date: 'August 2026',
    datePublished: '2026-08-05',
    readTime: '6 min read',
    category: 'Route Guide',
    content: [
      'The Chennai to Bangalore drive is one of the busiest intercity routes in South India. Whether you are travelling for business, a flight connection or a family visit, the first question is almost always the same — how much does a one-way taxi from Chennai to Bangalore cost? The honest answer: it depends on the car, the actual distance and the extras — and a written quote should break all three down for you.',
      '## How far is Chennai to Bangalore by road?',
      'The road distance between Chennai and Bangalore is about 350 km via NH-44 through Vellore, and the drive usually takes around 6 hours 15 minutes depending on traffic and breaks. The route is four-lane for most of the way, with clean highway stops near Vellore and the Tamil Nadu–Karnataka border.',
      '## One-way taxi fares by car type: the numbers',
      'Obey One Way Taxi charges a flat per-km rate with no return fare, so you pay only for the distance you actually travel. On a 350 km trip, here is the base fare before tolls for each car type:',
      '- **Sedan at ₹15/km** — about ₹5,650. The budget pick for solo travellers and couples.',
      '- **SUV at ₹20/km** — about ₹7,400. Extra space for groups up to six with luggage.',
      '- **Innova at ₹20/km** — about ₹7,400. The most booked family car on this route.',
      '- **Innova Crysta at ₹24/km** — about ₹8,800. Premium comfort for larger groups.',
      'These are the numbers for a one-way drop. Because there is no return fare charged on top, the sedan trip beats a two-day round trip by a wide margin when you are not returning.',
      '## What else goes into the final fare',
      'A few basics that keep the quote honest: tolls, parking and state permit charges are payable at actuals and are not hidden inside the per-km rate. Your booking team will share a clear estimate of these before you confirm. If your pickup is between 11 PM and 6 AM, a driver allowance of ₹400 is added. GST of 5% applies only when you need an invoice.',
      '## Route details and timing',
      'The NH-44 corridor from Chennai passes through Sriperumbudur and Vellore before the border at Krishnagiri, then descends into Bangalore. Traffic in Bangalore is heaviest between 5 PM and 8 PM, so timing your arrival matters as much as the departure. The total cash outlay for a sedan one-way typically lands between ₹6,000 and ₹7,500 once tolls and any night allowance are included.',
      '## Why a one-way drop beats a round trip on this route',
      'Many travellers assume they must pay a return fare when they book a cab out of state. With a one-way drop taxi you pay only the single direction. For a Chennai to Bangalore trip that typically saves 40–60% compared with keeping the cab for a full round trip — the difference of paying only for 350 km instead of 700 km with a driver who waits two days.',
      '## When to book and how to keep the fare low',
      'Fares on the Chennai–Bangalore corridor are demand-driven on weekends, so book 1–2 days ahead for the best availability and to lock the rate. Early morning departures before 6 AM usually mean lighter traffic and a more relaxed drive. Returning within 48 hours? Compare with a [round trip](/blog/one-way-taxi-vs-round-trip) — the discounted ₹14/km rate can beat two separate one-way fares.',
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
      'At [₹15/km](/tariff) for a sedan, a one-way Vellore to Bangalore trip works out to about ₹3,550 before tolls. An Innova at ₹20/km is around ₹4,600 and is the comfortable pick for a family trip or when you are carrying medical reports, luggage and a small group.',
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
      'At [₹15/km](/tariff) for a sedan, the one-way fare is roughly ₹3,700 before tolls. An SUV at ₹20/km comes to about ₹4,800 and is the better pick for groups, wedding guests or families travelling with extra luggage.',
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
      '## Chennai to Madurai one-way fare by car type',
      'A sedan at [₹15/km](/tariff) works out to roughly ₹6,925 for the 435 km one-way trip, before tolls. An SUV at ₹20/km comes to about ₹9,100 and is the comfortable choice for families — the extra legroom matters on a seven-and-a-half-hour drive. An Innova at ₹20/km is the same ₹9,100 base with more luggage room, and an Innova Crysta at ₹24/km is about ₹10,840 for a premium ride.',
      'This is a one-way drop taxi: you pay for the single direction only, with no return fare, so the cost stays predictable even before discounts are applied.',
      '## What is included and what is not',
      'Your quote covers the per-km rate and the driver. Tolls, parking and permit charges are payable at actuals, and your booking team confirms an estimate before you commit. A ₹400 driver allowance applies for pickups between 11 PM and 6 AM, and GST of 5% is added only if you require an invoice.',
      '## Driving the route',
      'The NH-32 corridor via Villupuram and Trichy is four-lane for most of the stretch. A breakfast stop near Villupuram and a short break at Trichy keeps the journey comfortable. Start early if you are travelling in summer to avoid the midday heat on the road. After Trichy the highway turns west through Dindigul before entering Madurai, and the final stretch is fast, divided carriageway all the way to the city limits.',
      '## Timing for temple visits and functions',
      'Meenakshi temple visits usually start at dawn, so many travellers prefer a previous-night arrival with a hotel stay and a next-morning darshan. Function-bound travellers should leave Chennai before midday to arrive in Madurai with a buffer before evening events. Festival weeks around Chithirai and Avani Moolam see a surge in bookings, so reserve 3–5 days ahead.',
      '## Returning to Chennai?',
      'If your Madurai trip is a two-way journey, compare a [round trip](/blog/one-way-taxi-vs-round-trip) at the discounted sedan rate of ₹14/km — it can beat two separate one-way drops when you use the same cab for both legs.',
      '## Best time to book',
      'Madurai trips peak around festival season and Tamil New Year, so book a few days ahead during those windows. For an instant estimate use the [fare calculator](/fare-calculator), check the [Chennai to Madurai route page](/routes/chennai-to-madurai), and confirm your one-way drop taxi 24/7 on [WhatsApp](/contact).',
    ],
  },
  {
    slug: 'chennai-to-pondicherry-weekend-guide',
    title: 'Chennai to Pondicherry Weekend Taxi Guide',
    seoTitle: 'Chennai to Pondicherry Weekend Taxi',
    excerpt: 'A relaxed Chennai to Pondicherry weekend getaway — 165 km drive time, one-way taxi fares, and what to pack for the beach town.',
    date: 'September 2026',
    datePublished: '2026-09-22',
    readTime: '5 min read',
    category: 'Route Guide',
    content: [
      'Pondicherry is the classic weekend escape from Chennai — close enough for a morning departure and far enough to feel like a proper break. The 165 km drive via Tindivanam takes around 3 hours 15 minutes.',
      '## Chennai to Pondicherry one-way taxi fare',
      'At [₹15/km](/tariff) for a sedan, a one-way drop to Pondicherry is about ₹2,875 before tolls — one of the best-value routes we run. An SUV at ₹20/km is around ₹3,700 and suits small groups or families heading to the beach with chairs, coolers and luggage.',
      '## Getting there without the stress',
      'Leave by 7 AM on a Saturday to beat the ECR weekend traffic and reach the beach town before lunch. The NH-32 corridor is smooth, and the ECR option is scenic but slower. For a first-day beach walk and a Sunday afternoon return, book the return trip in advance with the same team so the cab is waiting when you are ready.',
      '## What to remember',
      'Weekend availability fills up fast in the November–January season, so lock your cab a few days early. Get an instant quote in the [fare calculator](/fare-calculator), see the [Chennai to Pondicherry route page](/routes/chennai-to-pondicherry), and book your weekend one-way taxi on [WhatsApp](/contact) any time.',
    ],
  },
  {
    slug: 'coimbatore-to-bangalore-taxi-guide',
    title: 'Coimbatore to Bangalore One Way Taxi Guide',
    seoTitle: 'Coimbatore to Bangalore Taxi Guide',
    excerpt: 'Coimbatore to Bangalore one-way taxi guide — the 365 km Salem route, fares, and when to travel for a smoother drive.',
    date: 'October 2026',
    datePublished: '2026-10-06',
    readTime: '6 min read',
    category: 'Route Guide',
    content: [
      'Coimbatore and Bangalore are two of South India\'s busiest business cities, and the road between them is travelled constantly. The journey covers about 365 km via Salem on NH-44 and takes around 6 hours 30 minutes with breaks.',
      '## Coimbatore to Bangalore one-way fare by car type',
      'A sedan at [₹15/km](/tariff) works out to about ₹5,875 for the 365 km one-way trip before tolls. An Innova at ₹20/km is around ₹7,700 — the practical choice for a business team or a family moving between the two cities. An SUV at ₹20/km is the same ₹7,700 with a higher seating capacity, and an Innova Crysta at ₹24/km is about ₹9,160 for groups that want the premium cabin.',
      'As a one-way drop taxi, you pay only for the distance from Coimbatore to Bangalore. The driver\'s return to the pickup city is not billed as a second fare, which keeps the number far lower than a traditional two-way quote.',
      '## What is included in the fare',
      'The per-km rate covers the car and driver. Tolls, state permit charges and parking are payable at actuals, and a clear estimate is shared before you confirm. A ₹400 driver allowance applies for pickups between 11 PM and 6 AM, and GST of 5% is added only when you need an official invoice.',
      '## Route and timing notes',
      'The drive passes Salem at roughly the halfway point, where the Avinashi–Salem stretch is fast and the NH-44 from Salem to Krishnagiri is wide. A midday start can mean Bangalore-bound traffic later in the afternoon, so an early morning departure makes for a calmer trip. The climb past the Karnataka border near Krishnagiri sees occasional truck traffic, so plan a short break there to keep the driver fresh.',
      '## Planning for business travellers',
      'If you are catching an evening meeting in Bangalore, aim to leave Coimbatore by 6 AM. For airport-bound travellers, the timing depends heavily on which terminal and how much buffer you want — your booking team will help you plan backwards from the flight time.',
      '## Weekend and return planning',
      'This corridor fills up on Sunday evenings as Bangalore-returning travellers head east, so book 1–2 days ahead whenever possible. If you intend to return to Coimbatore within 48 hours, compare a [round trip](/blog/one-way-taxi-vs-round-trip) at the discounted sedan rate of ₹14/km — for a trip this long, a single round-trip booking often beats two one-way drops.',
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
      'A sedan at [₹15/km](/tariff) is about ₹6,925 for the one-way trip before tolls. An SUV at ₹20/km comes to around ₹9,100 and suits families travelling together, which is common on this route.',
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
      'The core of your fare is the per-km rate for the car you choose. At Obey One Way Taxi, a sedan is [₹15/km](/tariff), an SUV and Innova are ₹20/km, and the Innova Crysta is ₹24/km. Multiply the rate by the distance of your trip and you have the base fare. For a [Chennai to Bangalore](/routes/chennai-to-bangalore) trip of 350 km, a sedan base fare is about ₹5,650.',
      '## Minimum distance and empty-run protection',
      'Short trips still need to cover the driver\'s return. Depending on the route, a minimum billed distance of 130 km or 250 km applies. This matters most on nearby routes like [Salem to Erode](/routes/salem-to-erode) — the minimum keeps the fare fair for the driver while the per-km rate stays low on longer trips.',
      '## Driver allowance and night charges',
      'A night driver allowance of ₹400 applies for pickups between 11 PM and 6 AM. On hill routes like [Coimbatore to Ooty](/routes/coimbatore-to-ooty), a hill allowance of ₹300 is added because ghat driving is slower and tougher on the car.',
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
    seoTitle: 'Book an Outstation Taxi in Tamil Nadu',
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
      'A driver allowance of ₹400 applies for pickups between 11 PM and 6 AM, and it should appear in your written quote before you accept the booking. Knowing the final figure upfront removes the most common night-travel complaint.',
      '## Keep the driver rested',
      'On journeys over 6 hours, plan a short break at a busy highway stop. A rested driver is a safer driver, and a 15-minute break barely changes your arrival time.',
      '## Use support that never sleeps',
      'Book with a company that actually answers at 3 AM. Our [booking line](/contact) is staffed 24/7, and the [outstation service page](/outstation) explains how night bookings work. Check the [tariff](/tariff) so the night allowance and tolls never surprise you.',
    ],
  },
  {
    slug: 'obey-taxi-vs-red-taxi',
    title: 'Obey One Way Taxi vs Red Taxi: Which To Pick?',
    seoTitle: 'Obey One Way Taxi vs Red Taxi',
    excerpt: 'Obey One Way Taxi vs Red Taxi for intercity one-way drops in Tamil Nadu — flat per-km fares, no return fare, and dedicated highway drivers compared.',
    date: 'November 2026',
    datePublished: '2026-11-22',
    readTime: '6 min read',
    category: 'Booking Guide',
    content: [
      'If you book a one-way taxi in Tamil Nadu, you have likely seen both Obey One Way Taxi and Red Taxi in your search results. They serve different kinds of rides, though, and choosing the right one depends entirely on what kind of trip you are making.',
      '## The short answer',
      'Red Taxi is best known for local, within-city cab rides in the metro cities it operates in. Obey One Way Taxi specialises in long-distance intercity drops and outstation rides across Tamil Nadu and South India. If your trip is a one-way journey between cities — Chennai to Bangalore, Coimbatore to Madurai, Trichy to Pondicherry — an intercity specialist with flat per-km pricing is usually the better fit.',
      '## How the two services are structured',
      'Red Taxi operates a city-focused network where you book a cab for local point-to-point trips. On intercity work, the availability, pricing and driver continuity can vary by city operator. Obey One Way Taxi is built around the outstation model: a single flat per-km rate, a confirmed car and driver for the whole journey, and a 24/7 booking team covering Tamil Nadu, Karnataka, Andhra Pradesh and Kerala.',
      '## Fare comparison for an intercity drop',
      'For a one-way intercity drop, what matters is the per-km rate and whether the return leg is billed. Obey One Way Taxi charges a transparent [₹15/km for a sedan](/tariff), ₹20/km for an SUV or Innova, and ₹24/km for an Innova Crysta — with no return fare on one-way bookings. On a [Chennai to Bangalore](/routes/chennai-to-bangalore) trip of 350 km, that puts a sedan at about ₹5,650 before tolls.',
      'The pricing is flat and written down before the trip. Tolls, parking and state permits are payable at actuals and are confirmed as an estimate upfront, so there are no surprise line items at the end of the ride.',
      '## Where Obey One Way Taxi fits best',
      'Choose Obey when your trip is an intercity one-way drop: airport transfers between cities, family functions, temple visits, relocations, or business travel where you are not returning the same day. You get a background-checked highway driver, a clean car chosen for long distances, and a booking team that answers at 3 AM if your flight or plan changes.',
      '## Where a local city service fits better',
      'If you need a short hop inside one city — a 5 km commute, an airport run within the city or a same-city errand — a local city cab service with point-to-point charging is often the more economical choice. Simple-to-city rides are exactly the niche Obey is built for; for everything else, compare locally.',
      '## No return fare is the difference that matters',
      'The biggest cost trap in intercity cab booking is the return fare. In the old model, a one-way ride was priced as if the driver had to drive back empty, and you paid for that phantom journey. Obey One Way Taxi prices one-way drops as single-direction trips: you pay for the kilometres you travel, and the driver\'s empty return is handled inside the per-km rate rather than billed to you as a second fare.',
      '## What to check on any taxi booking page',
      'Whichever service you compare, verify three things before booking: the per-km rate by car type, the toll and allowance policy, and whether GST applies only with an invoice. If a quote bundles tolls, night charges and permits without a breakdown, it becomes impossible to compare fairly.',
      'Discuss your exact route with a human being — our [booking team](/contact) replies on WhatsApp within minutes with a written estimate, and you can cross-check the numbers yourself in the [fare calculator](/fare-calculator) or on the [tariff chart](/tariff).',
    ],
  },
];

export function findBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
