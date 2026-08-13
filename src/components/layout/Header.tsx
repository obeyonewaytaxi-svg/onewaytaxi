import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { siteConfig, waLink } from '../../config/site';
import { services } from '../../data/siteData';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import logo from '/logo.png';

const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Tariff', to: '/tariff' },
  { label: 'Contact Us', to: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useClickOutside(servicesRef, useCallback(() => setServicesOpen(false), []));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDesktop) setIsOpen(false);
  }, [isDesktop]);

  const isServicePage = location.pathname.startsWith('/services');

  return (
    <header
      className={cn(
        'sticky inset-x-0 top-0 z-50 glass-strong border-b transition-shadow duration-300',
        scrolled ? 'border-slate-200/60 shadow-premium' : 'border-white/40',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label={siteConfig.name}>
          {/* <img src={logo} alt={siteConfig.name} className="h-30 w-30 object-contain sm:h-15" /> */}
        <div className="flex items-center gap-0.1">
  {/* Logo Icon */}
  <img
    src={logo}
    alt={siteConfig.name}
    className="h-18 w-28 sm:h-20 sm:w-28 object-contain shrink-0 mix-blend-multiply"
    width={112}
    height={72}
    fetchPriority="high"
  />

  {/* Brand Text */}
  <div className="flex flex-col items-start leading-none ml-1">
    <p className="text-base sm:text-xl font-black tracking-[0.10em] text-[#071529]">
      OBEY
    </p>

    <div className="mt-0.5 flex items-center">
      <p className="text-[9px] sm:text-sm font-medium tracking-[0.15em] uppercase text-[#D39A06] whitespace-nowrap">
        ONE WAY TAXI
      </p>
    </div>
  </div>
</div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200',
                  isActive ? 'text-brand-secondary-text bg-brand-secondary/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div ref={servicesRef} className="relative">
            <button
              type="button"
              className={cn(
                'flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200',
                isServicePage ? 'text-brand-secondary-text bg-brand-secondary/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
              )}
              onClick={() => setServicesOpen((value) => !value)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-current={isServicePage ? 'page' : undefined}
            >
              Services
              <ChevronDown className={cn('h-3 w-3 transition-transform duration-200', servicesOpen && 'rotate-180')} />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-2 shadow-premium-lg">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-600 transition-colors duration-150 hover:bg-brand-secondary/10 hover:text-slate-900"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 shadow-sm backdrop-blur sm:inline-flex">
            <a
              href={waLink('Hello Obey One Way Taxi, I would like to book a taxi.')}
              target="_blank"
              rel="noreferrer"
              data-flow="header"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#25D366] transition-colors duration-150 hover:bg-[#25D366]/10"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <span className="h-4 w-px bg-slate-200" />
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-slate-800 transition-colors duration-150 hover:text-brand-secondary-text"
              title={`Call ${siteConfig.phoneDisplay}`}
            >
              <Phone className="h-3.5 w-3.5 text-brand-secondary" />
              <span className="hidden md:inline">{siteConfig.phoneDisplay}</span>
              <span className="md:hidden">Call</span>
            </a>
          </div>

          <Link
            to="/fare-calculator"
            className="hidden h-9 items-center gap-2 rounded-full bg-brand-secondary px-5 text-[13px] font-bold uppercase tracking-wider text-slate-900 shadow-md shadow-brand-secondary/20 transition-all duration-200 hover:bg-brand-secondary-dark hover:-translate-y-0.5 hover:shadow-lg lg:inline-flex"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-secondary hover:text-brand-secondary lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white/95 backdrop-blur-lg shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  cn('rounded-xl px-4 py-3 text-sm font-medium', isActive ? 'text-brand-secondary-text' : 'text-slate-700')
                }
              >
                Home
              </NavLink>
              <div className="flex flex-col gap-1 border-l-2 border-brand-secondary/20 ml-3 pl-3">
                {services.map((service) => (
                  <NavLink
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className={({ isActive }) =>
                      cn('rounded-xl px-4 py-2.5 text-sm font-medium', isActive ? 'text-brand-secondary-text' : 'text-slate-600')
                    }
                  >
                    {service.title}
                  </NavLink>
                ))}
              </div>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  cn('rounded-xl px-4 py-3 text-sm font-medium', isActive ? 'text-brand-secondary-text' : 'text-slate-700')
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/tariff"
                className={({ isActive }) =>
                  cn('rounded-xl px-4 py-3 text-sm font-medium', isActive ? 'text-brand-secondary-text' : 'text-slate-700')
                }
              >
                Tariff
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  cn('rounded-xl px-4 py-3 text-sm font-medium', isActive ? 'text-brand-secondary-text' : 'text-slate-700')
                }
              >
                Contact Us
              </NavLink>
            </nav>
            <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-4">
              <a
                href={waLink('Hello Obey One Way Taxi, I would like to book a taxi.')}
                target="_blank"
                rel="noreferrer"
                data-flow="header-mobile"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 text-sm font-medium text-[#128C7E] transition-colors duration-150 hover:bg-[#25D366]/20"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
              <Link
                to="/fare-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 transition-colors duration-150 hover:bg-brand-secondary-dark"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
