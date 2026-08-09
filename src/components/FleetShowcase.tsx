import { motion } from 'framer-motion';
import { Users, Luggage } from 'lucide-react';
import { CarImage } from './shared/CarImage';
import { cabs } from '../data/siteData';

const FleetShowcase = () => (
  <section id="fleet" className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Fleet</p>
        <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Choose the car that fits your journey</h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
        Luxury seating, spacious interiors and reliable vehicles for every South India transfer.
      </p>
    </div>

    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cabs.slice(0, 5).map((car, index) => (
        <motion.article
          key={car.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 * index, duration: 0.45 }}
          className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <CarImage
              src={car.image}
              alt={car.title}
              className="h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <h3 className="font-heading text-lg font-bold text-slate-900">{car.title}</h3>
            <p className="mt-0.5 text-xs text-brand-muted">{car.model}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-brand-muted">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-brand-secondary" />
                {car.capacity}
              </span>
              <span className="flex items-center gap-1">
                <Luggage className="h-3.5 w-3.5 text-brand-secondary" />
                {car.luggage}
              </span>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default FleetShowcase;
