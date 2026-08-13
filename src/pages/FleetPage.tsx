import { Link } from 'react-router-dom';
import { Users, Luggage, CheckCircle2, ArrowRight } from 'lucide-react';
import { Seo } from '../lib/seo';
import { carSchema, breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { CtaBanner } from '../components/shared/CtaBanner';
import { CarImage } from '../components/shared/CarImage';
import { cabs } from '../data/siteData';

const FleetPage = () => (
  <>
    <Seo
      title="Taxi Fleet: Sedan, SUV & Innova"
      description="Explore our premium taxi fleet — Sedan, SUV, Innova and Crysta for one way taxi and outstation cab service with verified drivers."
      path="/fleet"
      keywords={['one way car rental', 'one way taxi', 'outstation cab service', 'drop taxi', '24/7 outstation taxi', 'premium taxi fleet']}
      jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Fleet', path: '/fleet' }]), ...cabs.map(carSchema)]}
    />

    <PageHeader
      eyebrow="Our Fleet"
      title="Choose the car that fits your journey"
      description="Luxury seating, spacious interiors and reliable vehicles for every South India transfer. Every car is sanitized and driven by a verified chauffeur."
      breadcrumbs={[{ name: 'Fleet', path: '#' }]}
    />

    <Container className="py-12">
      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" />
          Rated 4.9★ by 1,820+ travellers
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cabs.map((cab) => (
          <article
            key={cab.slug}
            id={cab.slug}
            className="group scroll-mt-24 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-4">
              <CarImage
                src={cab.image}
                alt={`${cab.title} taxi - ${cab.model}`}
                className="h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                width={320}
                height={160}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute left-4 top-4 rounded-lg bg-brand-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900">
                ₹{cab.rate}/km
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-slate-900">{cab.title}</h2>
              <p className="mt-0.5 text-xs text-slate-500">{cab.model}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{cab.description}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-brand-secondary" />
                  {cab.capacity}
                </span>
                <span className="flex items-center gap-1">
                  <Luggage className="h-3.5 w-3.5 text-brand-secondary" />
                  {cab.luggage}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-500">
                {cab.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary" />
                    {detail}
                  </li>
                ))}
              </ul>
              <Link
                to="/fare-calculator"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-800"
              >
                Book {cab.title}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Container>

    <CtaBanner />
  </>
);

export default FleetPage;
