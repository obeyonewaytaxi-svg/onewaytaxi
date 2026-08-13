import { Container } from '../ui/Section';
import { siteConfig, waLink } from '../../config/site';
import { Star } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';

export function ReviewsCta() {
  const whatsappReview = waLink(
    `Hello Obey One Way Taxi, I would like to share my review of my recent taxi booking with you.`,
  );

  return (
    <section className="mx-auto max-w-7xl px-5 pb-section md:px-8">
      <Container className="!px-0">
        <div className="relative overflow-hidden rounded-3xl border border-brand-secondary/20 bg-white px-6 py-10 text-center shadow-premium sm:px-10">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-secondary/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-secondary text-brand-secondary" />
              ))}
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold text-slate-900">Ride with us recently? Leave a review</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              Your feedback helps us improve and helps other travellers choose a trusted one way taxi service in South India.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {siteConfig.googleReviewUrl ? (
                <a
                  href={siteConfig.googleReviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-flow="reviews-cta"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-lg shadow-brand-secondary/25 transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5 sm:w-auto"
                >
                  <Star className="h-4 w-4" />
                  Review on Google
                </a>
              ) : (
                <a
                  href={whatsappReview}
                  target="_blank"
                  rel="noreferrer"
                  data-flow="reviews-cta"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-lg shadow-brand-secondary/25 transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5 sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4 text-slate-900" />
                  Share your review
                </a>
              )}
              <a
                href={`tel:${siteConfig.phone}`}
                data-flow="reviews-cta"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-700 transition-all hover:border-brand-secondary sm:w-auto"
              >
                Call support
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
