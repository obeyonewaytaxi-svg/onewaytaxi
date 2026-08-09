import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { Seo } from '../lib/seo';
import { serviceSchema, breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { CtaBanner } from '../components/shared/CtaBanner';
import { BookingCard } from '../components/booking/BookingCard';
import { services, findServiceBySlug, popularRoutes } from '../data/siteData';
import { RouteGrid } from '../components/shared/RouteGrid';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? findServiceBySlug(slug) : null;

  if (!service) {
    return (
      <>
        <Seo title="Service Not Found" path={`/services/${slug ?? ''}`} noindex />
        <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-5 pb-24 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Service unavailable</p>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">This service is not available yet</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            Explore our other premium ride options and book the service that best fits your travel plans.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-md shadow-brand-secondary/20 transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5"
          >
            <ArrowRight className="h-4 w-4" />
            Back to home
          </Link>
        </section>
      </>
    );
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${service.title} Booking`}
        description={service.metaDescription ?? service.description}
        path={`/services/${service.slug}`}
        keywords={[
          service.description.toLowerCase().includes('airport')
            ? 'airport drop taxi booking'
            : 'one way taxi booking',
          'drop taxi',
          'one way taxi',
          'one way drop cab',
          'outstation cab service',
          '24/7 outstation taxi',
        ]}
        jsonLd={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow={service.title}
        title={`Premium ${service.title} bookings`}
        description={service.longDescription}
        breadcrumbs={[{ name: service.title, path: '#' }]}
      />

      <Container className="py-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-2.5 rounded-xl bg-brand-secondary/10 p-4">
                <Sparkles className="h-4 w-4 text-brand-secondary" />
                <p className="text-sm font-bold text-slate-900">Luxury travel made effortless</p>
              </div>
              <div className="mt-4 space-y-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex gap-3 rounded-xl border border-slate-50 bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                    <p className="text-sm leading-relaxed text-slate-600">{feature}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">How it works</p>
              <h2 className="mt-3 font-heading text-lg font-bold text-slate-900">Book your {service.title.toLowerCase()} in minutes</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {['Enter pickup & drop', 'Choose your cab', 'Confirm on WhatsApp'].map((step, index) => (
                  <div key={step} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-secondary text-xs font-bold text-slate-900">
                      {index + 1}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <BookingCard compact />
            <div className="rounded-2xl border border-brand-secondary/20 bg-brand-secondary/5 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">Why choose {service.title}?</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {service.longDescription} Our team ensures each booking is handled with care so you travel in comfort and style.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Popular routes</p>
            <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Most booked transfers</h2>
          </div>
          <Link to="/routes" className="text-sm font-bold text-brand-secondary-text transition hover:text-slate-900">
            View all routes →
          </Link>
        </div>
        <RouteGrid routes={popularRoutes} className="mt-6" />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Related services</p>
            <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Explore more travel options</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {relatedServices.map((item) => (
            <Link
              key={item.slug}
              to={`/services/${item.slug}`}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-secondary/30 hover:shadow-card-hover"
            >
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-secondary-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary-text">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner
        title={`Book your ${service.title.toLowerCase()} today`}
        description="Get a transparent fare quote and instant confirmation. Our dispatch team is available round the clock."
      />
    </>
  );
};

export default ServicePage;
