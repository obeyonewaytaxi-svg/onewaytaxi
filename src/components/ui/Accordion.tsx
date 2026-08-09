import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { FaqItem } from '../../types';

type AccordionProps = {
  items: FaqItem[];
  className?: string;
  showPreview?: boolean;
  defaultOpen?: number | null;
};

export function Accordion({ items, className, showPreview = true, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={cn(
              'group overflow-hidden rounded-2xl border transition-all duration-200',
              isOpen
                ? 'border-brand-secondary/30 shadow-sm bg-white'
                : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-card',
            )}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{item.question}</p>
                {showPreview && !isOpen && (
                  <p className="mt-1 text-xs text-brand-muted line-clamp-1">{item.answer}</p>
                )}
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform duration-200',
                  isOpen ? 'rotate-180 text-brand-secondary' : 'text-slate-300',
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
              )}
            >
              <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-brand-muted">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
