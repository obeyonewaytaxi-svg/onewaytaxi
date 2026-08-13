import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Container } from '../ui/Section';
import { siteConfig, waLink } from '../../config/site';
import WhatsAppIcon from '../icons/WhatsAppIcon';

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({
  title = 'Ready to book your premium taxi?',
  description = 'Get an instant fare quote and WhatsApp confirmation within minutes. Our team is available 24×7.',
}: CtaBannerProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-section md:px-8">
      <Container className="!px-0">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-12 text-center shadow-premium sm:px-10">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-secondary/15 blur-3xl" />
          <div className="relative">
            <h2 className="font-heading text-display-xs md:text-display-sm text-white">{title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300/80">{description}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/fare-calculator"
                className="inline-flex w-full items-center justify-center rounded-xl bg-brand-secondary px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-lg shadow-brand-secondary/25 transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5 sm:w-auto"
              >
                Get Instant Fare
              </Link>
              <a
                href={waLink('Hello Obey One Way Taxi, I would like to book a taxi.')}
                target="_blank"
                rel="noreferrer"
                data-flow="cta-banner"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-brand-secondary sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Book via WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                data-flow="cta-banner"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:text-white sm:w-auto"
              >
                <Phone className="h-4 w-4 text-brand-secondary" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
