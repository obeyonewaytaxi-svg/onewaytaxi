import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { CtaBanner } from '../components/shared/CtaBanner';
import { routes, cityRoutes } from '../data/siteData';

const cityMeta: Record<string, { name: string; tagline: string; description: string }> = {
  chennai: {
    name: 'Chennai',
    tagline: 'Drop taxi from Chennai',
    description: 'Rapid one-way drop taxi service from Chennai for reliable travel across Tamil Nadu and South India.',
  },
  coimbatore: {
    name: 'Coimbatore',
    tagline: 'Drop taxi from Coimbatore',
    description: 'Comfortable one-way taxi travel from Coimbatore with premium vehicles and verified drivers.',
  },
  madurai: {
    name: 'Madurai',
    tagline: 'Drop taxi from Madurai',
    description: 'Safe and fast one-way taxi service from Madurai to major nearby cities and hill stations.',
  },
  trichy: {
    name: 'Trichy',
    tagline: 'Drop taxi from Trichy',
    description: 'Trusted Trichy taxi service for pilgrimage, business and weekend trips across South India.',
  },
  salem: {
    name: 'Salem',
    tagline: 'Drop taxi from Salem',
    description: 'Doorstep one-way drop taxi from Salem with transparent pricing and round-the-clock driver support.',
  },
  erode: {
    name: 'Erode',
    tagline: 'Drop taxi from Erode',
    description: 'Reliable one-way cab service connecting Erode with Chennai, Salem and major textile hubs.',
  },
  vellore: {
    name: 'Vellore',
    tagline: 'Drop taxi from Vellore',
    description: 'Convenient one-way drops from Vellore to Bangalore and Chennai with transparent per-km rates.',
  },
  pondicherry: {
    name: 'Pondicherry',
    tagline: 'Drop taxi from Pondicherry',
    description: 'Scenic coastal and outstation one-way cab service from Pondicherry to Chennai and Trichy.',
  },
  bangalore: {
    name: 'Bangalore',
    tagline: 'Drop taxi from Bangalore',
    description: 'Premium one-way taxi from Bangalore to Chennai, Coimbatore and other South India destinations.',
  },
};

const CitiesPage = () => (
  <>
    <Seo
      title="Drop Taxi Service Cities in South India"
      description="Book a drop taxi near you from Chennai, Coimbatore, Madurai, Trichy, Salem, Erode, Vellore, Pondicherry and Bangalore. One way taxi and outstation cab service."
      path="/cities"
      keywords={[
        'drop taxi near me',
        'Chennai drop taxi',
        'Coimbatore drop taxi',
        'Trichy drop taxi service',
        'drop taxi from Bangalore',
        'Madurai to Chennai one way cab',
        'one way taxi',
        'outstation cab service',
        'Erode drop taxi',
        'Vellore drop taxi',
        'Pondicherry drop taxi',
      ]}
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Cities', path: '/cities' }])}
    />

    <PageHeader
      eyebrow="Service Cities"
      title="One-way taxi service from South India's key cities"
      description="Choose your pickup city to see available routes, distances and transparent fares for one-way drops across Tamil Nadu, Karnataka and beyond."
      breadcrumbs={[{ name: 'Service Cities', path: '#' }]}
    />

    <Container className="py-12">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(cityMeta).map(([key, city]) => {
          const connectedRoutes = (cityRoutes[key] ?? [])
            .map((destination) => routes.find((r) => r.origin.toLowerCase() === key && r.destination.toLowerCase() === destination.toLowerCase()))
            .filter((r): r is NonNullable<typeof r> => Boolean(r));

          return (
            <article key={key} className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-secondary/30 hover:shadow-card-hover">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10">
                  <MapPin className="h-5 w-5 text-brand-secondary" />
                </div>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                  {connectedRoutes.length}+ routes
                </span>
              </div>
              <Link to={`/cities/${key}`} className="mt-4 block text-base font-bold text-slate-900 transition-colors hover:text-brand-secondary-text">
                {city.tagline}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{city.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {connectedRoutes.slice(0, 4).map((route) => (
                  <Link
                    key={route.slug}
                    to={`/routes/${route.slug}`}
                    className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-secondary/40 hover:text-brand-secondary-text"
                  >
                    → {route.destination}
                  </Link>
                ))}
              </div>
              <Link to={`/cities/${key}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary-text transition-all duration-200 group-hover:gap-2.5">
                View {city.name} routes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          );
        })}
      </div>
    </Container>

    <CtaBanner />
  </>
);

export default CitiesPage;
