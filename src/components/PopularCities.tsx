import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const cities = [
  {
    slug: 'chennai',
    name: 'Chennai Drop Taxi',
    description: 'Rapid city drop taxi service from Chennai for reliable south India travel.',
    routes: '15+ routes',
  },
  {
    slug: 'coimbatore',
    name: 'Coimbatore Drop Taxi',
    description: 'Comfortable city travel from Coimbatore with premium vehicles and verified drivers.',
    routes: '10+ routes',
  },
  {
    slug: 'madurai',
    name: 'Madurai Drop Taxi',
    description: 'Safe and fast one-way taxi service from Madurai to major nearby cities.',
    routes: '8+ routes',
  },
  {
    slug: 'trichy',
    name: 'Trichy Drop Taxi',
    description: 'Trusted Trichy taxi service for pilgrimage, business and weekend trips.',
    routes: '7+ routes',
  },
  {
    slug: 'salem',
    name: 'Salem Drop Taxi',
    description: 'Doorstep drop taxi from Salem with transparent pricing and driver support.',
    routes: '6+ routes',
  },
  {
    slug: 'vellore',
    name: 'Vellore Drop Taxi',
    description: 'Reliable one-way taxi from Vellore to Chennai, Bangalore and beyond.',
    routes: '5+ routes',
  },
  {
    slug: 'bangalore',
    name: 'Bangalore Drop Taxi',
    description: 'Cross-state drop taxi from Bangalore to Tamil Nadu cities with verified drivers.',
    routes: '6+ routes',
  },
  {
    slug: 'pondicherry',
    name: 'Pondicherry Drop Taxi',
    description: 'Scenic one-way taxi from Pondicherry to Chennai, Madurai and Trichy.',
    routes: '4+ routes',
  },
];

const PopularCities = () => (
  <section id="destinations" className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Popular Cities</p>
          <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Top destinations for drop taxi bookings</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
          Choose from the most popular pickup and drop cities with tailored one-way taxi service and full route support.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cities.map((city) => (
          <article key={city.name} className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-brand-secondary/20">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10">
                <MapPin className="h-5 w-5 text-brand-secondary" />
              </div>
              <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-brand-muted">{city.routes}</span>
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">{city.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{city.description}</p>
            <Link to={`/cities/${city.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary-text transition-all duration-200 group-hover:gap-2.5">
              Read More
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PopularCities;
