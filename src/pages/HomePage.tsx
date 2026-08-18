import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../lib/seo';
import { localBusinessSchema, webSiteSchema, organizationSchema } from '../lib/schema';
import { Hero } from '../components/shared/Hero';
import { StatsBar } from '../components/shared/StatsBar';
import { RouteGrid } from '../components/shared/RouteGrid';
import { ReviewGrid, RatingSummary } from '../components/shared/ReviewGrid';
import { CtaBanner } from '../components/shared/CtaBanner';
import { Accordion } from '../components/ui/Accordion';
import CoverageMapSection from '../components/CoverageMapSection';
import PricingSection from '../components/PricingSection';
import { popularRoutes, reviews, faqs, blogPosts } from '../data/siteData';
import PopularCities from '../components/PopularCities';

const homeFaqs = faqs.slice(0, 5);

const HomePage = () => (
  <>
    <Seo
      title="Drop Taxi & One Way Cab Tamil Nadu"
      description="Book a drop taxi or one way taxi across Tamil Nadu & South India. Transparent fares, no return fare, verified drivers and 24/7 outstation cab service."
      keywords={[
        'drop taxi',
        'droptaxi',
        'one way taxi',
        'oneway taxi',
        'one way drop cab',
        'outstation cab service',
        'drop taxi near me',
        'drop taxi booking',
        'red taxi alternative',
        'one way car rental',
        'cheap one way cab',
        'no return fare taxi',
        '24/7 outstation taxi',
      ]}
      jsonLd={[
        localBusinessSchema(),
        webSiteSchema(),
        organizationSchema()
      ]}
    />
    <Hero />
    <PricingSection />


    <section id="popular-routes" className="mx-auto max-w-7xl px-5 py-section md:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Popular Routes</p>
          <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Most booked city transfers</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
          Trusted routes in South India with transparent pricing, comfortable vehicles, and fast confirmations.
        </p>
      </div>
      <RouteGrid routes={popularRoutes} className="mt-8" />
      <div className="mt-6 flex justify-center">
        <Link
          to="/routes"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-700 transition-all hover:border-brand-secondary hover:text-brand-secondary-text hover:shadow-md"
        >
          View all routes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
    
    <StatsBar />

    <PopularCities />

    <section id="reviews" className="mx-auto max-w-7xl px-5 py-section md:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Customer reviews</p>
          <h2 className="mt-4 font-heading text-display-xs md:text-display-sm text-slate-900">Rated 5-stars by trusted travelers.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted">
            Passengers trust Obey Taxi for airport transfers and outstation trips because we combine comfortable vehicles, clear rates, and attentive support.
          </p>
        </div>
        <RatingSummary />
      </div>
      <ReviewGrid reviews={reviews} className="mt-8" />
    </section>

    <CoverageMapSection />

    <section className="mx-auto max-w-7xl px-5 py-section md:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Blog</p>
          <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Latest from our blog</h2>
        </div>
        <Link to="/blog" className="text-sm font-bold text-brand-secondary-text transition hover:text-slate-900">
          View all posts →
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-secondary/30 hover:shadow-card-hover"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">{post.category}</p>
            <h3 className="mt-2 text-sm font-bold text-slate-900 group-hover:text-brand-secondary-text">{post.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-brand-muted line-clamp-2">{post.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-secondary-text">
              {post.readTime} <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>

    <section id="faq" className="mx-auto max-w-7xl px-5 py-section md:px-8">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">FAQ</p>
            <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Frequently asked questions</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
            Clear answers for bookings, payments and ride expectations.
          </p>
        </div>
        <Accordion items={homeFaqs} className="mt-8" />
        <div className="mt-6 flex justify-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-700 transition-all hover:border-brand-secondary hover:text-brand-secondary-text hover:shadow-md"
          >
            View all FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    <CtaBanner />
  </>
);

export default HomePage;
