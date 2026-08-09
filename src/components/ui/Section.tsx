import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function Container({ className, children, as: Tag = 'div' }: { className?: string; children: ReactNode; as?: 'div' | 'main' | 'article' }) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-5 md:px-8 xl:px-0', className)}>{children}</Tag>;
}

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
};

export function Section({ id, eyebrow, title, description, children, className, align = 'left' }: SectionProps) {
  return (
    <section id={id} className={cn('py-section md:py-section-lg', className)}>
      <Container>
        <div className={cn('flex flex-col gap-3', align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between')}>
          <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">{eyebrow}</p>
            )}
            <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">{title}</h2>
            {description && <p className="mt-3 section-subtitle">{description}</p>}
          </div>
        </div>
        <div className={cn('mt-8 md:mt-10', align === 'center' && 'mx-auto max-w-5xl')}>{children}</div>
      </Container>
    </section>
  );
}
