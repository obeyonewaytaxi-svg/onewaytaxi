import { Link, useParams } from 'react-router-dom';
import { MapPin, Phone, ArrowRight, CheckCircle2, Plane } from 'lucide-react';
import { Seo } from '../lib/seo';
import { breadcrumbSchema, routeSchema, faqSchema } from '../lib/schema';
import { siteConfig, waLink } from '../config/site';
import { PageHeader } from '../components/layout/PageHeader';
import { Section, Container } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { RouteGrid } from '../components/shared/RouteGrid';
import { CtaBanner } from '../components/shared/CtaBanner';
import { Accordion } from '../components/ui/Accordion';
import { getCityContent, getCityRoutes, getRelatedCities } from '../data/cityData';

const CityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const city = slug ? getCityContent(slug.toLowerCase()) : undefined;

  if (!city) {
    return (
      <>
        <Seo title="City Not Found" path="/" noindex />
        <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-5 pb-24 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">City unavailable</p>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">No taxi service found for this city yet</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            Explore our other service cities and popular routes across South India.
          </p>
          <Link
            to="/cities"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-md transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5"
          >
            <ArrowRight className="h-4 w-4" />
            View service cities
          </Link>
        </section>
      </>
    );
  }

  const cityRoutes = getCityRoutes(city.slug);
  const relatedCities = getRelatedCities(city.slug);
  const cityPath = `/cities/${city.slug}`;

  return (
    <>
      <Seo
        title={city.metaTitle}
        description={city.metaDescription}
        path={cityPath}
        keywords={[
          `${city.name} drop taxi`,
          `${city.name} one way cab`,
          `${city.name} taxi service`,
          'one way taxi',
          'drop taxi near me',
          'outstation cab service',
          'no return fare taxi',
        ]}
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Service Cities', path: '/cities' },
            { name: city.name, path: cityPath },
          ]),
          ...cityRoutes.map(routeSchema),
          faqSchema(city.faqs.map((item) => ({ question: item.q, answer: item.a }))),
        ]}
      />

      <PageHeader
        eyebrow={`${city.name} Taxi Service`}
        title={city.tagline}
        description={`Doorstep drop taxi and one way cab service in ${city.name} — verified drivers, transparent fares, no return fare taxi and 24/7 support.`}
        breadcrumbs={[
          { name: 'Service Cities', path: '/cities' },
          { name: city.name, path: '#' },
        ]}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waLink(`Hello Obey One Way Taxi, I would like to book a taxi from ${city.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#F5C518] px-6 text-sm font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-[#e0b212]"
          >
            Book Now
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-600 bg-transparent px-6 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </PageHeader>

      <Container className="py-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {city.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-slate-600">{paragraph}</p>
            ))}

            <Card>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand-secondary" />
                <p className="text-sm font-bold text-slate-900">Areas we serve in {city.name}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {city.areas.map((area) => (
                  <span key={area} className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                    {area}
                  </span>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2.5">
                <Plane className="h-4 w-4 text-brand-secondary" />
                <p className="text-sm font-bold text-slate-900">Airport & key landmarks</p>
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                  {city.airport}
                </p>
                {city.landmarks.map((landmark) => (
                  <p key={landmark} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                    {landmark}
                  </p>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-secondary/20 bg-brand-secondary/5 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">Why book in {city.name}</p>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-brand-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" /> Pay once — no return fare taxi
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" /> Transparent per-km fares, no hidden charges
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" /> Verified, sanitized cars with professional chauffeurs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" /> 24/7 airport pickup and outstation drops
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {cityRoutes.length > 0 && (
        <Section eyebrow="Popular routes" title={`One way taxi routes from ${city.name}`} className="pt-0">
          <RouteGrid routes={cityRoutes.slice(0, 8)} />
        </Section>
      )}

      <Section eyebrow="Nearby cities" title={`Other taxi service cities`} className="pt-0">
        <div className="flex flex-wrap gap-3">
          {relatedCities.map((related) => (
            <Link
              key={related.slug}
              to={`/cities/${related.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-brand-secondary hover:text-brand-secondary-text"
            >
              <MapPin className="h-3.5 w-3.5" />
              {related.name} drop taxi
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title={`Frequently asked questions about ${city.name} taxi`} className="pt-0">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
          <Accordion items={city.faqs.map((item) => ({ question: item.q, answer: item.a }))} />
        </div>
      </Section>

      <CtaBanner
        title={`Book your ${city.name} taxi today`}
        description={`Get a transparent fare quote and instant WhatsApp confirmation. Our ${city.name} dispatch team is available 24/7.`}
      />
    </>
  );
};

export default CityPage;
