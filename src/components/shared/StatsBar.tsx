import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Headphones, Star, Route, ThumbsUp } from 'lucide-react';

const stats = [
  { value: 24, suffix: '/7', label: 'Support', icon: Headphones },
  { value: 4.9, suffix: '★', label: 'Google rating', icon: Star },
  { value: 40, suffix: '+', label: 'Routes covered', icon: Route },
  { value: 1820, suffix: '+', label: 'Verified reviews', icon: ThumbsUp },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = target * (1 - Math.pow(1 - progress, 3));
      const display = Number.isInteger(target)
        ? Math.round(current).toLocaleString('en-IN')
        : current.toFixed(1);
      setValue(display);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-section md:px-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="group rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-card transition-all duration-200 hover:shadow-card-hover hover-lift"
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10 transition group-hover:bg-brand-secondary/20">
              <stat.icon className="h-5 w-5 text-brand-secondary" />
            </div>
            <p className="font-heading text-display-xs text-slate-900">
              <Counter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-brand-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
