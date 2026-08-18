import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, MapPin, Star, Users, Luggage } from 'lucide-react';
import { Seo } from '../lib/seo';
import { routeSchema, breadcrumbSchema, faqSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container, Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { CtaBanner } from '../components/shared/CtaBanner';
import { BookingCard } from '../components/booking/BookingCard';
import { findRouteBySlug, cabs, routes } from '../data/siteData';
import { RouteGrid } from '../components/shared/RouteGrid';
import { calculateFare } from '../lib/booking';
import { formatINR } from '../lib/utils';
import { getCityContent } from '../data/cityData';
import { Accordion } from '../components/ui/Accordion';

const RouteDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const route = slug ? findRouteBySlug(slug) : null;

  if (!route) {
    return (
      <>
        <Seo title="Route Not Found" noindex />
        <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-5 pb-24 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Route not found</p>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">We couldn't find that route</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            It looks like the route you requested is not currently available. Explore our most popular city transfers and book your journey today.
          </p>
          <Link
            to="/routes"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-md shadow-brand-secondary/20 transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5"
          >
            <ArrowRight className="h-4 w-4" />
            Explore all routes
          </Link>
        </section>
      </>
    );
  }

  const { origin, destination, distanceKm, durationHours, via } = route;
  const sedanFare = calculateFare({ pickup: origin, drop: destination, cabTitle: 'SEDAN', tripType: 'One Way' });

  const relatedCities = [getCityContent(origin), getCityContent(destination)].filter(
    (city): city is NonNullable<typeof city> => Boolean(city),
  );

  const routeFaqs = [
    {
      question: `How much is a ${origin} to ${destination} one way cab?`,
      answer: `A ${origin} to ${destination} one way cab costs from ${formatINR(sedanFare.fare)} for a sedan. The fare covers the entire ${distanceKm} km journey with no return fare — you only pay one way.`,
    },
    {
      question: `How long does it take to travel from ${origin} to ${destination}?`,
      answer: `The ${distanceKm} km journey from ${origin} to ${destination} takes about ${durationHours} via ${via}. Actual travel time depends on traffic and rest breaks.`,
    },
    {
      question: 'Do you provide a no return fare taxi for this route?',
      answer: 'Yes. Every outstation one way drop cab from Obey One Way Taxi is a no return fare taxi — you pay only for the drop, not the empty return trip. This makes one way cab rental cheaper than a round trip.',
    },
    {
      question: `Can I book a ${origin} to ${destination} drop taxi at night?`,
      answer: 'Absolutely. Our outstation cab service operates 24/7, including airport pickups and late-night drops between cities. Call or WhatsApp us anytime and we will dispatch a verified driver.',
    },
    {
      question: 'What car types are available for this route?',
      answer: `We offer Sedan (Etios/Dzire from ₹15/km), SUV (Ertiga from ₹20/km), Innova (₹20/km), and Innova Crysta (₹24/km) for the ${origin} to ${destination} route. Choose based on your luggage and comfort needs.`,
    },
    {
      question: 'Are tolls and parking included in the fare?',
      answer: 'Tolls, state permits, and parking charges are excluded from the per-km base rate and are payable at actuals during the journey. We provide a transparent estimate of these costs before your trip is confirmed.',
    },
  ];

  return (
    <>
      <Seo
        title={`${origin} to ${destination} One Way Cab`}
        description={`Book a ${origin} to ${destination} one way drop cab with transparent fares from ${formatINR(sedanFare.fare)}. ${distanceKm} km journey, ${durationHours} travel time, no return fare taxi.`}
        path={`/routes/${route.slug}`}
        keywords={[
          `${origin} to ${destination} taxi`,
          `${origin} to ${destination} one way cab`,
          'one way drop cab',
          'drop taxi',
          'outstation cab service',
          'cheap one way cab',
          'no return fare taxi',
          'transparent fare outstation cab',
        ]}
        jsonLd={[
          routeSchema(route),
          faqSchema(routeFaqs.map((item) => ({ question: item.question, answer: item.answer }))),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Routes', path: '/routes' },
            { name: `${origin} to ${destination}`, path: `/routes/${route.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Route spotlight"
        title={`${origin} to ${destination} Taxi Service`}
        description={`Book a premium one-way or round-trip ride from ${origin} to ${destination}. A ${distanceKm} km journey taking about ${durationHours} via ${via}.`}
        breadcrumbs={[
          { name: 'Routes', path: '/routes' },
          { name: `${origin} to ${destination}`, path: '#' },
        ]}
      >
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Distance</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">{distanceKm} km</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Duration</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">{durationHours}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Via</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">{via}</p>
          </div>
          <div className="rounded-xl border border-brand-secondary/30 bg-brand-secondary/5 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">Sedan from</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">
              {formatINR(sedanFare.fare)}
            </p>
          </div>
        </div>
      </PageHeader>

      <Container className="py-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Route overview</p>
              <h2 className="mt-3 font-heading text-lg font-bold text-slate-900">What makes this route premium?</h2>
              <div className="mt-4 space-y-3">
                {[
                  `Luxury vehicles with door-to-door pickup between ${origin} and ${destination}`,
                  'Transparent pricing with instant fare estimate and no surprises',
                  'Verified drivers, airport support, and flight tracking',
                ].map((bullet) => (
                  <div key={bullet} className="flex gap-3 rounded-xl border border-slate-50 bg-slate-50 p-4">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                    <p className="text-sm leading-relaxed text-slate-600">{bullet}</p>
                  </div>
                ))}
              </div>
              {route.description && (
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{route.description}</p>
              )}
            </Card>

            <Card>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Cab options</p>
              <h2 className="mt-3 font-heading text-lg font-bold text-slate-900">Choose your ride</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {cabs.slice(0, 4).map((cab) => {
                  const fare = calculateFare({ pickup: origin, drop: destination, cabTitle: cab.title, tripType: 'One Way' });
                  return (
                    <Link key={cab.slug} to="/fare-calculator" className="group rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-brand-secondary/30 hover:shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-900">{cab.title}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Users className="h-3 w-3 text-brand-secondary" /> {cab.capacity}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Luggage className="h-3 w-3 text-brand-secondary" /> {cab.luggage}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-bold text-slate-900">{fare.found ? formatINR(fare.fare) : '—'}</p>
                          <p className="text-[10px] text-slate-500">₹{cab.rate}/km</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <BookingCard compact />
            <div className="rounded-2xl border border-brand-secondary/20 bg-brand-secondary/5 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">Express route benefits</p>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-brand-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
                  Fully sanitized premium cars
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
                  Live pickup updates and driver details
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
                  Transparent fuel and toll rates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
                  Flexible one-way or return trip options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Section eyebrow="Explore more" title="Other popular routes" className="pt-0">
        <RouteGrid routes={[...routes].filter((r) => r.slug !== route.slug).slice(0, 8)} />
      </Section>

      <Section eyebrow="FAQ" title={`${origin} to ${destination} taxi — FAQs`} className="pt-0">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
          <Accordion items={routeFaqs} />
        </div>
      </Section>

      {relatedCities.length > 0 && (
        <Section eyebrow="Nearby cities" title={`Taxi service in ${origin} and ${destination}`} className="pt-0">
          <div className="flex flex-wrap gap-3">
            {relatedCities.map((city) => (
              <Link
                key={city.slug}
                to={`/cities/${city.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-brand-secondary hover:text-brand-secondary-text"
              >
                <MapPin className="h-3.5 w-3.5" />
                {city.name} drop taxi
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBanner
        title={`Book your ${origin} to ${destination} taxi`}
        description={`Get a transparent ${distanceKm} km fare quote and instant WhatsApp confirmation from our dispatch team.`}
      />
    </>
  );
};

export default RouteDetails;
