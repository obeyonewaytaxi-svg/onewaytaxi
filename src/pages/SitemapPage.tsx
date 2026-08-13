import { Link } from 'react-router-dom';
import { Home, Car, Map, Star, HelpCircle, Newspaper, Mail } from 'lucide-react';
import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { services } from '../data/siteData';

const groups = [
  {
    icon: Home,
    title: 'Main pages',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Tariff & Fares', to: '/tariff' },
      { label: 'Service Cities', to: '/cities' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    icon: Car,
    title: 'Our fleet',
    links: [
      { label: 'Sedan', to: '/fleet#sedan' },
      { label: 'SUV', to: '/fleet#suv' },
      { label: 'Innova', to: '/fleet#innova' },
      { label: 'Innova Crysta', to: '/fleet#crysta' },
    ],
  },
  {
    icon: Map,
    title: 'Routes',
    links: [
      { label: 'All Routes', to: '/routes' },
      { label: 'Popular Routes', to: '/routes#popular' },
      { label: 'Fare Calculator', to: '/fare-calculator' },
    ],
  },
  {
    icon: Star,
    title: 'More',
    links: [
      { label: 'Reviews', to: '/reviews' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    icon: Newspaper,
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Cancellation Policy', to: '/cancellation-policy' },
      { label: 'Refund Policy', to: '/refund-policy' },
    ],
  },
];

const SitemapPage = () => (
  <>
    <Seo
      title="Sitemap | Obey One Way Taxi"
      description="Complete HTML sitemap for Obey One Way Taxi. Easily navigate to every service page, fleet option, tariff calculator, city landing page, and intercity route."
      path="/sitemap"
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Sitemap', path: '/sitemap' }])}
    />

    <PageHeader
      eyebrow="Sitemap"
      title="Explore the site"
      description="A complete index of every page on obeyonewaytaxi.com."
      breadcrumbs={[{ name: 'Sitemap', path: '#' }]}
    />

    <Container className="py-12">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ icon: Icon, title, links }) => (
          <div key={title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-secondary/10">
                <Icon className="h-4.5 w-4.5 text-brand-secondary" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">{title}</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="text-sm text-brand-muted transition hover:text-brand-secondary-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-2xl border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-white p-5 shadow-card">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-secondary/10">
              <Mail className="h-4.5 w-4.5 text-brand-secondary" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">Services</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/${service.slug}`} className="text-sm text-brand-muted transition hover:text-brand-secondary-text">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  </>
);

export default SitemapPage;
