import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, message: error instanceof Error ? error.message : 'Unexpected error' };
  }

  private handleRetry = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center md:px-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-secondary/10">
            <span className="text-3xl font-bold text-brand-secondary-text">!</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Something went wrong</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            An unexpected error occurred while loading this page. You can retry, or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-md shadow-brand-secondary/20 transition-all hover:bg-brand-secondary-dark hover:-translate-y-0.5"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-700 transition-all hover:border-brand-secondary"
            >
              Go home
            </a>
          </div>
          {this.state.message && (
            <p className="mt-6 max-w-lg text-xs text-slate-400">{this.state.message}</p>
          )}
        </section>
      );
    }
    return this.props.children;
  }
}