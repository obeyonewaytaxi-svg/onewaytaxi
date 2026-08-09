import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { Review } from '../../types';
import { cn } from '../../lib/utils';

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <article
      className={cn(
        'relative flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-200 hover:shadow-card-hover hover-lift',
        className,
      )}
    >
      <Quote className="absolute right-5 top-5 h-6 w-6 text-brand-secondary/20" />
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary text-sm font-bold text-slate-900">
          {review.name[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{review.name}</p>
          <p className="text-xs text-brand-muted">
            {review.location} · {review.route}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn('h-3.5 w-3.5', i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200')}
          />
        ))}
        <span className="ml-2 text-xs text-slate-500">{review.date}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">"{review.quote}"</p>
    </article>
  );
}

export function ReviewGrid({ reviews, className }: { reviews: Review[]; className?: string }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {reviews.map((review, index) => (
        <motion.div
          key={review.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.45 }}
        >
          <ReviewCard review={review} />
        </motion.div>
      ))}
    </div>
  );
}

export function RatingSummary({ rating = '4.9', count = '1,820+', className }: { rating?: string; count?: string; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-slate-100 bg-white p-5 shadow-card', className)}>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Verified reviews</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{rating} / 5</p>
      <div className="mt-2 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-2 text-xs text-brand-muted">{count} happy travelers</p>
    </div>
  );
}
