import { getRouteDistance, findCabByTitle } from '../data/siteData';
import type { TripType } from '../types';

export const tripTypeOptions: TripType[] = ['One Way', 'Round Trip'];

export const BASE_FARE = 400;

const HILL_STATIONS = ['ooty', 'kodaikanal', 'munnar', 'yercaud', 'coonoor', 'valparai', 'yelagiri', 'kolli hills'];

export const NIGHT_TIMES = [
  '11:00 PM', '11:30 PM',
  '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
  '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM'
];

export function calculateFare(options: {
  pickup: string;
  drop: string;
  cabTitle: string;
  tripType: TripType;
  time?: string;
}): {
  fare: number;
  distanceKm: number;
  billedDistance: number;
  minimumApplied: boolean;
  rate: number;
  baseFare: number;
  hillCharge: number;
  nightCharge: number;
  distanceFare: number;
  gst: number;
  estimatedTotal: number;
  tripType: TripType;
  found: boolean;
} {
  const { pickup, drop, cabTitle, tripType, time = '' } = options;
  const cab = findCabByTitle(cabTitle);
  const rate = cab?.rate ?? 15;
  const roundTripRate = cab?.roundTripRate ?? rate;

  const distance = getRouteDistance(pickup, drop);

  if (distance === null) {
    return {
      fare: 0,
      distanceKm: 0,
      billedDistance: 0,
      minimumApplied: false,
      rate: 0,
      baseFare: 0,
      hillCharge: 0,
      nightCharge: 0,
      distanceFare: 0,
      gst: 0,
      estimatedTotal: 0,
      tripType,
      found: false
    };
  }

  const baseFare = BASE_FARE;
  const isHillStation = HILL_STATIONS.some(hs =>
    pickup.toLowerCase().includes(hs) || drop.toLowerCase().includes(hs)
  );
  const hillCharge = isHillStation ? 300 : 0;
  const nightCharge = NIGHT_TIMES.includes(time) ? 400 : 0;

  let billedDistance = distance;
  let minimumApplied = false;

  if (tripType === 'Round Trip') {
    // Round trip minimum 250km total
    const totalDistance = distance * 2;
    if (totalDistance < 250) {
      billedDistance = 250;
      minimumApplied = true;
    } else {
      billedDistance = totalDistance;
    }
  } else {
    // One way minimum 130km
    if (distance < 130) {
      billedDistance = 130;
      minimumApplied = true;
    } else {
      billedDistance = distance;
    }
  }

  const actualRate = tripType === 'Round Trip' ? roundTripRate : rate;
  const distanceFare = billedDistance * actualRate;
  const estimatedTotal = baseFare + distanceFare + hillCharge + nightCharge;
  const gst = Math.round(estimatedTotal * 0.05);
  const fare = estimatedTotal; // Billed standard total (excluding GST/tolls which are actuals or optional invoice add-ons)

  return {
    fare: Math.round(fare),
    distanceKm: distance,
    billedDistance,
    minimumApplied,
    rate: actualRate,
    baseFare,
    hillCharge,
    nightCharge,
    distanceFare,
    gst,
    estimatedTotal,
    tripType,
    found: true,
  };
}

export const timeOptions = [
  '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
  '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
];

export function buildWhatsAppMessage(details: {
  pickup: string;
  drop: string;
  date: string;
  time: string;
  tripType: TripType;
  cabTitle: string;
  returnDate?: string;
  name?: string;
  phone?: string;
}) {
  const lines = [
    'Hello Obey One Way Taxi,',
    '',
    'I would like to book a taxi.',
    `Pickup: ${details.pickup}`,
    `Drop: ${details.drop}`,
    `Date: ${details.date}`,
    `Time: ${details.time}`,
    `Trip Type: ${details.tripType}`,
    `Cab: ${details.cabTitle}`,
  ];
  if (details.returnDate) lines.push(`Return Date: ${details.returnDate}`);
  if (details.name) lines.push(`Name: ${details.name}`);
  if (details.phone) lines.push(`Phone: ${details.phone}`);

  return lines.join('\n');
}
