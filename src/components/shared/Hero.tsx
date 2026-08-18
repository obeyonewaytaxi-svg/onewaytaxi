import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Tag, Phone } from 'lucide-react';
import { siteConfig, waLink } from '../../config/site';
import { cabs } from '../../data/siteData';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import TaxiRoad from './TaxiRoad';
import { CarImage } from './CarImage';
import { BookingCard } from '../booking/BookingCard';

const heroFeatures = [
  { icon: ShieldCheck, title: 'Verified fleet', desc: 'Clean, comfortable cars with modern interiors.' },
  { icon: Zap, title: 'Fast booking', desc: 'Instant quotes and WhatsApp confirmation.' },
  { icon: Tag, title: 'Transparent pricing', desc: 'No hidden costs, clear route fares.' },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#112340] text-white">
      <TaxiRoad />

      {/* Very subtle background accent to break the solid color without looking flashy */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-slate-800/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/2 rounded-full bg-slate-800/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col-reverse items-center gap-12 px-5 pb-24 pt-20 md:flex-row md:items-center md:gap-16 md:px-8 lg:gap-24">
        
        {/* LEFT CONTENT */}
        <div className="w-full max-w-2xl md:w-1/2">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: 'easeOut' }}>
            
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1a2d4a] border border-[#233859] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F5C518]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F5C518]" />
              Rated 4.9★ by 1,820+ travellers
            </div>

            <h1 className="mt-8 max-w-3xl font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              One Way Drop Taxi <br className="hidden sm:block" />
              <span className="text-[#F5C518]">Across Tamil Nadu &amp; South India</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Comfortable intercity taxi bookings across South India. Enjoy transparent pricing, verified professional drivers, and instant confirmations.
            </p>

            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded border border-[#F5C518]/30 bg-[#F5C518]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F5C518]">
                <Tag className="h-3.5 w-3.5" />
                Min. Billing: 130 km (One Way) • 250 km (Round Trip)
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={waLink('Hello Obey One Way Taxi, I would like to book a taxi.')}
                target="_blank"
                rel="noreferrer"
                data-flow="hero"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-lg bg-[#F5C518] px-8 text-sm font-bold uppercase tracking-wider text-[#112340] transition-colors hover:bg-[#e0b212]"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#112340]" />
                Book via WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-lg border border-slate-600 bg-transparent px-8 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-3 border-t border-slate-700/50 pt-10">
              {heroFeatures.map(({ icon: Icon, title, desc }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#1a2d4a]">
                    <Icon className="h-5 w-5 text-[#F5C518]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">{title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* RIGHT CONTENT (Booking Card) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative w-full max-w-xl md:w-1/2"
        >
          {/* Clean, professional container for the booking card */}
          <div className="rounded-2xl bg-white p-2 shadow-2xl">
            <BookingCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
