import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Container } from '../ui/Section';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: { name: string; path: string }[];
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#112340]">
      {/* Subtle background accent */}
      <div className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-slate-800/20 blur-3xl" />
      
      <Container className="relative py-14 md:py-24">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] font-medium text-slate-400">
            <Link to="/" className="transition hover:text-white">Home</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.path} className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                {crumb.path === '#' ? (
                  <span className="text-[#F5C518]">{crumb.name}</span>
                ) : (
                  <Link to={crumb.path} className="transition hover:text-white">{crumb.name}</Link>
                )}
              </span>
            ))}
          </nav>
        )}
        
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F5C518]">{eyebrow}</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
