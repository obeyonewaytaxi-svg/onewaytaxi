import { motion } from 'framer-motion';
import { MapPin, Car } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const steps = [
  {
    icon: MapPin,
    title: 'Choose route',
    description: 'Enter your pickup and drop locations for airport or outstation travel.',
  },
  {
    icon: Car,
    title: 'Select cab',
    description: 'Pick Sedan, SUV, Innova or Crysta with transparent per-km pricing.',
  },
  {
    icon: WhatsAppIcon,
    title: 'Confirm by WhatsApp',
    description: 'Send the booking request and get fast driver confirmation over WhatsApp.',
  },
];

const HowItWorks = () => (
  <section id="how-booking-works" className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">How it works</p>
          <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Premium booking in three easy steps</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
          Book your one-way taxi with a simple flow built for fast airport transfers and outstation rides.
        </p>
      </div>

      <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
        <div className="absolute top-10 left-[16%] right-[16%] hidden h-0.5 bg-gradient-to-r from-brand-secondary/20 via-brand-secondary/40 to-brand-secondary/20 sm:block" />

        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            className="relative rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-card transition-all duration-200 hover:shadow-card-hover hover-lift"
          >
            <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary text-slate-900 shadow-md shadow-brand-secondary/20">
              <step.icon className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                {index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-base font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
