import { motion } from 'framer-motion';
import { ShieldCheck, Star, Globe2, Clock, Headphones, Car, BadgeCheck } from 'lucide-react';

const features = [
  { label: 'No Return Fare', icon: Globe2, description: 'Pay only for a one-way trip — no return fare charged.' },
  { label: 'Transparent Pricing', icon: ShieldCheck, description: 'Clear per-km rates with no hidden surcharges.' },
  { label: 'Verified Drivers', icon: BadgeCheck, description: 'Background-checked, professional and courteous drivers.' },
  { label: 'Airport Pickup', icon: Clock, description: 'On-time airport pickups with flight tracking support.' },
  { label: 'Doorstep Pickup', icon: Headphones, description: 'Convenient pickup from your exact location.' },
  { label: 'Luxury Cars', icon: Car, description: 'Well-maintained sedans and SUVs for every trip.' },
  { label: '24×7 Support', icon: Star, description: 'Round-the-clock assistance via call and WhatsApp.' },
];

const FeatureGrid = () => (
  <section id="services" className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Why choose Obey Taxi</p>
          <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Premium service built for trusted one-way travel.</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
          The Obey experience combines comfortable vehicles, verified drivers, and fast confirmation for every South India route.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ label, icon: Icon, description }, index) => (
          <motion.article
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.45 }}
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:border-brand-secondary/20"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10 transition group-hover:bg-brand-secondary/20">
              <Icon className="h-5 w-5 text-brand-secondary" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">{label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
