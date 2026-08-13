import { Link } from 'react-router-dom';
import { CheckCircle2, Info, IndianRupee, Users, Briefcase } from 'lucide-react';
import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container, Section } from '../components/ui/Section';
import { CtaBanner } from '../components/shared/CtaBanner';
import { cabs, popularRoutes } from '../data/siteData';
import { calculateFare, BASE_FARE } from '../lib/booking';
import type { TripType } from '../types';

const sampleRoutes = popularRoutes.slice(0, 5);

const fareFor = (origin: string, destination: string, cabTitle: string, tripType: TripType) => {
  const result = calculateFare({ pickup: origin, drop: destination, cabTitle, tripType });
  return result.found ? result.fare : null;
};

const formatFare = (value: number | null) => (value === null ? '—' : `₹${value.toLocaleString('en-IN')}`);

const inclusions = [
  'No return fare on one-way drops (pay only for one direction)',
  'Transparent per-km base rates for every cab',
  'Professional, GPS-enabled verified drivers',
  'Air-conditioned (AC) ride with comfortable seating',
  'Doorstep pickup and drop-off',
];

const exclusions = [
  'Tolls, state permits, and parking charges (payable at actuals)',
  'Driver night beta allowance (₹400 extra, 11 PM – 6 AM)',
  'Hill-station/ghat road charges (₹300 extra)',
  'GST (5% extra if official invoice is required)',
];

import PricingSection from '../components/PricingSection';

// ... other imports stay the same

const TariffPage = () => (
  <>
    <Seo
      title="Outstation Cab Fares & Price Chart"
      description="One way taxi tariff chart — per-km rates for Sedan, SUV, Innova and Crysta with transparent outstation cab fares and no hidden charges."
      path="/tariff"
      keywords={['one way taxi fare', 'transparent fare outstation cab', 'cheap one way cab', 'no return fare taxi', '24/7 outstation taxi', 'one way car rental']}
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Tariff', path: '/tariff' }])}
    />

    <PageHeader
      eyebrow="Tariff & Fares"
      title="Transparent taxi rates for every cab"
      description="One Way and Round Trip per-km rates for every vehicle in our fleet. The final fare is calculated from a fixed base fare plus distance — no hidden charges."
      breadcrumbs={[{ name: 'Tariff', path: '#' }]}
    />

    {/* New visual Pricing Section replacing the table */}
    <PricingSection />

    <Section
      eyebrow="Sample estimates"
      title="One Way fares on popular routes"
      description="Estimated fares for our most booked city pairs, based on the standard per-km rates above."
    >
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Cab</th>
                {sampleRoutes.map((route) => (
                  <th key={route.slug} className="px-4 py-4 text-right font-semibold">
                    {route.origin} → {route.destination}
                    <span className="block text-[10px] font-medium normal-case text-slate-500">{route.distanceKm} km</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cabs.map((cab) => (
                <tr key={cab.slug} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-brand-secondary/5">
                  <td className="px-6 py-4 font-heading font-bold text-slate-900">{cab.title}</td>
                  {sampleRoutes.map((route) => {
                    const fare = fareFor(route.origin, route.destination, cab.title, 'One Way');
                    return (
                      <td key={route.slug} className="px-4 py-4 text-right">
                        <span className={fare === null ? 'text-slate-500' : 'font-numbers font-bold text-slate-900'}>{formatFare(fare)}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs text-brand-muted">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
        Estimates are indicative. Final fares are confirmed on booking and may vary slightly with traffic, tolls and route optimization.
      </p>
    </Section>

    <Section
      eyebrow="What's included"
      title="Know your fare breakdown"
      description="Everything you need to understand before you book."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
          <h3 className="font-heading text-lg font-bold text-slate-900">Included in the fare</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
          <h3 className="font-heading text-lg font-bold text-slate-900">Additional charges</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {exclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-brand-secondary/10 px-4 py-3 text-xs text-slate-700">
            These are always communicated before confirmation — you will never face an unexpected charge.
          </p>
        </div>
      </div>
    </Section>

    <CtaBanner
      title="Lock in your fare today"
      description="Get an instant quote for your route, date and cab on WhatsApp — confirmed within minutes."
    />
  </>
);

export default TariffPage;
