import { ShieldCheck, MapPin, Clock, Star, BadgeCheck, Car } from 'lucide-react';
import { Seo } from '../lib/seo';
import { localBusinessSchema, organizationSchema, breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container, Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { StatsBar } from '../components/shared/StatsBar';
import { CtaBanner } from '../components/shared/CtaBanner';
import ServiceHighlights from '../components/ServiceHighlights';

const values = [
  { icon: ShieldCheck, title: 'Verified drivers', description: 'Professional drivers with verified profiles, background checks and on-time arrival.' },
  { icon: MapPin, title: 'Fixed per-km pricing', description: 'Transparent per-km fare structure with no hidden surcharges. Tolls and parking are charged at actuals and confirmed before booking.' },
  { icon: Star, title: 'Premium comfort', description: 'Modern cars with clean interiors, sanitized cabins and smooth highway journeys.' },
  { icon: Clock, title: '24/7 support', description: 'Always-on assistance for airport transfers and outstation bookings, every day of the year.' },
];

const AboutPage = () => (
  <>
    <Seo
      title="About One Way Taxi Service"
      description="Obey One Way Taxi delivers drop taxi and one way cab service across South India with verified drivers, transparent pricing and 24/7 support."
      keywords={['one way taxi', 'drop taxi', 'one way drop cab', 'outstation cab service', 'transparent fare outstation cab']}
      path="/about"
      jsonLd={[localBusinessSchema(), organizationSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]}
    />

    <PageHeader
      eyebrow="About Obey Taxi"
      title="A smarter way to book one-way taxi drops"
      description="We combine premium cars, verified drivers, and instant fare estimates to make every journey easy, transparent and comfortable."
      breadcrumbs={[{ name: 'About', path: '#' }]}
    />

    <StatsBar />

    <ServiceHighlights />

    <Section eyebrow="Our values" title="Why travellers choose Obey Taxi">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10 transition group-hover:bg-brand-secondary/20">
              <Icon className="h-5 w-5 text-brand-secondary" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{description}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section eyebrow="Our coverage" title="South India, one route at a time">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-brand-secondary" />
          <p className="text-2xl font-bold text-brand-secondary-text">40+</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            High-intent intercity routes between Chennai, Coimbatore, Madurai, Trichy, Salem, Erode, Vellore, Pondicherry, Bangalore and Ooty — each with transparent one-way fares.
          </p>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-brand-secondary" />
          <p className="text-2xl font-bold text-brand-secondary-text">4.9★</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Average Google rating from 1,820+ verified reviews — earned trip by trip through clean cars, clear pricing and on-time pickups.
          </p>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-brand-secondary" />
          <p className="text-2xl font-bold text-brand-secondary-text">24/7</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Airport transfers and outstation drops around the clock, with flight tracking and background-checked drivers on every journey.
          </p>
        </Card>
      </div>
    </Section>

    <Container className="py-section">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-white">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-brand-secondary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">What makes us premium</p>
          </div>
          <h2 className="mt-3 font-heading text-lg font-bold text-slate-900">Trusted airport and outstation taxi service.</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            We combine premium cars, verified drivers, and instant fare estimates to make every journey easy and transparent.
          </p>
          <div className="mt-6 space-y-2.5">
            {[
              'No hidden fees — only clear per-km fare estimates',
              'Modern vehicles with sanitized cabins and spacious seating',
              '24/7 support and WhatsApp booking help for fast confirmations',
              'Flight-tracked airport transfers with automatic pickup adjustment',
            ].map((point) => (
              <div key={point} className="rounded-xl border border-slate-100 bg-white p-3.5 text-sm text-slate-600">
                {point}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-brand-secondary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Our promise</p>
          </div>
          <h2 className="mt-3 font-heading text-lg font-bold text-slate-900">Every ride, every route, held to one standard.</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            Whether it is a 30-minute airport transfer or an 8-hour outstation drive, every Obey Taxi journey is held to the same standard of comfort, safety and transparency.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {[
              'Sanitized vehicles before every pickup',
              'Driver and vehicle details shared before pickup',
              'Transparent fuel and toll billing',
              'Trained, courteous and verified chauffeurs',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                {point}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Container>

    <CtaBanner
      title="Experience the Obey difference"
      description="Book your next journey with a team that treats every ride like a premium experience."
    />
  </>
);

export default AboutPage;
