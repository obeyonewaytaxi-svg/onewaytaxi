import { Link } from 'react-router-dom';
import { ArrowRight, Truck, MapPin, Plane, RotateCcw } from 'lucide-react';
import { services } from '../data/siteData';

const icons = {
  'One Way Taxi': MapPin,
  'Round Trip': RotateCcw,
  'Airport Transfer': Plane,
  'Outstation Taxi': Truck,
};

const ServiceHighlights = () => (
  <section id="service-highlights" className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Our Services</p>
        <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Taxi options built for comfort and clarity.</h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
        Choose the right ride for your route: one-way drops, airport transfers, round trips, and longer outstation journeys.
      </p>
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => {
        const Icon = icons[service.title as keyof typeof icons] ?? Truck;
        return (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-secondary/30 hover:shadow-card-hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-secondary/10 transition group-hover:bg-brand-secondary/20">
              <Icon className="h-5 w-5 text-brand-secondary" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{service.description}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 transition group-hover:text-brand-secondary-text">
              Read more
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);

export default ServiceHighlights;
