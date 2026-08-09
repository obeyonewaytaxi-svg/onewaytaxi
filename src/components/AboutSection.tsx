import { ShieldCheck, MapPin, Clock, Star } from 'lucide-react';

const benefits = [
  { label: 'Verified drivers', icon: ShieldCheck, description: 'Professional drivers with verified profiles and on-time arrival.' },
  { label: 'Fixed per-km pricing', icon: MapPin, description: 'Transparent fare structure with no hidden surcharges.' },
  { label: 'Premium comfort', icon: Star, description: 'Modern cars with clean interiors and smooth journeys.' },
  { label: '24/7 support', icon: Clock, description: 'Always-on assistance for airport transfers and outstation bookings.' },
];

const AboutSection = () => (
  <section id="about" className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Quick benefits</p>
          <h2 className="mt-4 font-heading text-display-xs md:text-display-sm text-slate-900">A smarter way to book one-way taxi drops.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-brand-muted">
            Enjoy clear pricing, verified drivers, and fast WhatsApp confirmation for airport and outstation transfers across South India.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map(({ label, icon: Icon, description }) => (
              <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover-lift">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-secondary/10">
                  <Icon className="h-4 w-4 text-brand-secondary" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">{label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-white p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">What makes us premium</p>
          <h3 className="mt-4 font-heading text-display-xs text-slate-900">Trusted airport and outstation taxi service.</h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            We combine premium cars, verified drivers, and instant fare estimates to make every journey easy and transparent.
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-brand-muted">
            <div className="rounded-xl border border-slate-100 bg-white p-3.5">No hidden fees — only clear per-km fare estimates.</div>
            <div className="rounded-xl border border-slate-100 bg-white p-3.5">Modern vehicles with sanitized cabins and spacious seating.</div>
            <div className="rounded-xl border border-slate-100 bg-white p-3.5">24/7 support and WhatsApp booking help for fast confirmations.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
