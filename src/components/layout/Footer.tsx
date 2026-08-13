import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { siteConfig, waLink } from '../../config/site';
import { services, popularRoutes } from '../../data/siteData';
import { cityContent } from '../../data/cityData';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import logo from '/logo.png';

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const quickLinks = [
  { label: 'Tariff & Fares', to: '/tariff' },
  { label: 'Fare Calculator', to: '/fare-calculator' },
  { label: 'Popular Routes', to: '/routes' },
  { label: 'Service Cities', to: '/cities' },
  { label: 'Sitemap', to: '/sitemap' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Cancellation Policy', to: '/cancellation-policy' },
  { label: 'Refund Policy', to: '/refund-policy' },
];

const Footer = () => (
  <footer id="contact" className="bg-slate-900 text-slate-100">
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="grid gap-10 lg:grid-cols-7">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2">
           <img
  src={logo}
  alt={siteConfig.name}
  loading="lazy"
  className="h-24 w-auto shrink-0 object-contain [filter:drop-shadow(0_0_1px_white)_drop-shadow(0_0_1px_white)]"
  width={120}
  height={96}
/>
            {/* <img src={logo} alt={siteConfig.name} className="h-14 w-auto object-contain bg-white px-2 py-2 rounded-2xl shrink-0" loading="lazy" /> */}
            <div className="flex flex-col items-start leading-none">
              <p className="text-xl font-black tracking-[0.10em] text-white">
                OBEY
              </p>
              <div className="mt-1">
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#F5C518] whitespace-nowrap">
                  ONE WAY TAXI
                </p>
              </div>
            </div>
          </div>
          <p className="text-xl font-heading font-bold text-white">{siteConfig.tagline}</p>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-white">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="transition hover:text-white">{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-white">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Service Cities</p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
            {Object.values(cityContent).slice(0, 9).map((city) => (
              <li key={city.slug}>
                <Link to={`/cities/${city.slug}`} className="transition hover:text-white">{city.name} Drop Taxi</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Popular Routes</p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
            {popularRoutes.slice(0, 4).map((route) => (
              <li key={route.slug}>
                <Link to={`/routes/${route.slug}`} className="transition hover:text-white">
                  {route.origin} → {route.destination}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
        <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-500 transition hover:border-brand-secondary hover:text-white min-h-[48px]">
          <Phone className="h-4 w-4 text-brand-secondary" />
          {siteConfig.phoneDisplay}
        </a>
        <a href={waLink('Hello Obey One Way Taxi, I would like to book a taxi.')} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-xl border border-brand-secondary/30 bg-brand-secondary/10 px-4 py-3 text-sm text-brand-secondary transition hover:bg-brand-secondary hover:text-slate-900 min-h-[48px]">
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          WhatsApp support
        </a>
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-500 min-h-[48px]">
          <MapPin className="h-4 w-4 text-brand-secondary" />
          South India coverage
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Legal">
          {legalLinks.map((link) => (
            <Link key={link.to} to={link.to} className="inline-flex min-h-[44px] items-center py-2 text-slate-400 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
