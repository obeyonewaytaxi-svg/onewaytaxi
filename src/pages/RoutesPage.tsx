import { Seo } from '../lib/seo';
import { breadcrumbSchema, routeSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/ui/Section';
import { CtaBanner } from '../components/shared/CtaBanner';
import { RouteGrid } from '../components/shared/RouteGrid';
import { routes, popularRoutes } from '../data/siteData';

const RoutesPage = () => {
  const allRoutes = routes.filter((route) => !route.popular);

  return (
    <>
      <Seo
        title="One Way Taxi Routes & Fares"
        description="Browse one way drop cab and drop taxi routes across Tamil Nadu and South India with distances, durations and transparent per-km fares."
        path="/routes"
        keywords={[
          'drop taxi',
          'one way taxi',
          'one way drop cab',
          'outstation cab service',
          'cheap one way cab',
          'no return fare taxi',
          'one way car rental',
          'Madurai to Chennai one way cab',
          'Chennai drop taxi',
        ]}
        jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Routes', path: '/routes' }]), ...popularRoutes.map(routeSchema)]}
      />

      <PageHeader
        eyebrow="Popular Routes"
        title="Most booked city transfers in South India"
        description="Trusted routes with transparent pricing, luxury vehicles and fast WhatsApp confirmations. Every route page shows distance, duration and per-km fare."
        breadcrumbs={[{ name: 'Routes', path: '#' }]}
      />

      <Section eyebrow="Top routes" title="Most booked one-way transfers" id="popular" className="scroll-mt-24">
        <RouteGrid routes={popularRoutes} />
      </Section>

      <Section eyebrow="More routes" title="Explore all city pairs" className="pt-0">
        <RouteGrid routes={allRoutes} />
      </Section>

      <CtaBanner />
    </>
  );
};

export default RoutesPage;
