import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../lib/seo';

const NotFoundPage = () => (
  <>
    <Seo title="Page Not Found" noindex />
    <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center md:px-8">
    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-secondary/10">
      <span className="text-4xl font-bold text-brand-secondary-text">404</span>
    </div>
    <h1 className="mt-6 text-3xl font-bold text-slate-900">Page not found</h1>
    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
      The page you're looking for does not exist. Return to the homepage to browse routes, services and booking options.
    </p>
    <Link
      to="/"
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-md shadow-brand-secondary/20 transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5"
    >
      <ArrowRight className="h-4 w-4" />
      Go home
    </Link>
  </section>
  </>
);

export default NotFoundPage;
