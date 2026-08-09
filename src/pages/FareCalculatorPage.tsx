import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container, Section } from '../components/ui/Section';
import { FareCalculatorWidget } from '../components/booking/FareCalculatorWidget';
import { BookingCard } from '../components/booking/BookingCard';
import { CtaBanner } from '../components/shared/CtaBanner';
import { routeSchema } from '../lib/schema';
import { routes } from '../data/siteData';
import { RouteGrid } from '../components/shared/RouteGrid';

const FareCalculatorPage = () => (
  <>
    <Seo
      title="One Way Taxi Fare Calculator"
      description="Calculate one way taxi and outstation cab fares between Chennai, Coimbatore, Bangalore and Madurai. Transparent per-km pricing with no hidden charges."
      path="/fare-calculator"
      keywords={['one way taxi fare calculator', 'transparent fare outstation cab', 'cheap one way cab', 'drop taxi', 'one way car rental']}
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Fare Calculator', path: '/fare-calculator' }])}
    />

    <PageHeader
      eyebrow="Fare Calculator"
      title="Estimate your taxi fare in seconds"
      description="Pick your route, cab and trip type for an instant transparent quote. Final fare may vary slightly with traffic and route optimization."
      breadcrumbs={[{ name: 'Fare Calculator', path: '#' }]}
    />

    <Container className="py-10">
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-card md:p-8">
        <FareCalculatorWidget onBook={() => document.getElementById('direct-booking')?.scrollIntoView({ behavior: 'smooth' })} />
      </div>
    </Container>

    <Section
      eyebrow="Popular routes"
      title="Check fares for the most booked routes"
      description="Live distance and per-km pricing for South India's most travelled city pairs."
    >
      <RouteGrid routes={routes.filter((r) => r.popular)} />
    </Section>

    <Container className="pb-12">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Direct booking</p>
            <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Book your ride directly</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-muted">
              Prefer to book directly? Fill in your details and send the request to WhatsApp for instant confirmation.
            </p>
          </div>
        </div>
        <div id="direct-booking" className="mt-6 grid gap-6 lg:grid-cols-2">
          <BookingCard compact />
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Why our fares are fair</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                  Tolls and parking included on most routes
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                  No return fare on one-way drops
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                  Transparent per-km rates for every cab
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                  Driver night charges clearly communicated
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>

    <CtaBanner
      title="Get your exact route fare now"
      description="Chat with our dispatch team on WhatsApp for a precise quote tailored to your date, route and cab."
    />
  </>
);

export default FareCalculatorPage;
