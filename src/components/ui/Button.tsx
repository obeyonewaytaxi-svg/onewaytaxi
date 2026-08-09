import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-brand-secondary text-slate-900 shadow-md shadow-brand-secondary/20 hover:bg-brand-secondary-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border-2 border-slate-200 bg-white text-slate-700 hover:border-brand-secondary hover:text-brand-secondary hover:shadow-sm',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  dark:
    'bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-xs min-h-[36px]',
  md: 'px-5 py-3 text-sm min-h-[44px]',
  lg: 'px-7 py-3.5 text-sm min-h-[48px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold uppercase tracking-wider transition-all duration-200',
        'disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
