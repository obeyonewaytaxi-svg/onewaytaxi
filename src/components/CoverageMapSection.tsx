const CoverageMapSection = () => (
  <section className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Coverage map</p>
        <h2 className="mt-4 font-heading text-display-xs md:text-display-sm text-slate-900">South India premium coverage.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted">
          Obey Taxi serves key city routes, airports, hill stations and high-demand pick-up locations across Chennai, Bangalore, Coimbatore and beyond.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">Cities</p>
            <p className="mt-1.5 text-base font-bold text-slate-900">20+ routes</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">Airports</p>
            <p className="mt-1.5 text-base font-bold text-slate-900">Chennai, Bangalore, Coimbatore, Madurai</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80"
          srcSet="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=640&q=80 640w, https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80 1200w"
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt="South India map coverage"
          loading="lazy"
          width={1200}
          height={576}
          className="h-72 w-full object-cover sm:h-80 lg:h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/30" />
        <div className="absolute left-4 bottom-4 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary-text">Premium route coverage</p>
          <p className="mt-1 max-w-xs text-xs leading-relaxed">Chennai, Bangalore, Coimbatore, Madurai, Ooty, Pondicherry, Salem, Trichy and more.</p>
        </div>
      </div>
    </div>
  </section>
);

export default CoverageMapSection;
