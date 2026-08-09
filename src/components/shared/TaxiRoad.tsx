const TaxiRoad = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden">
    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]" />
    <div className="animate-road-stripes absolute inset-x-0 bottom-[1.65rem] h-[3px]" />
    <div className="animate-taxi-drive absolute bottom-4 left-0">
      <div className="relative">
        <div className="animate-taxi-bob relative">
          {/* headlight beam */}
          <svg
            width="90"
            height="20"
            viewBox="0 0 90 20"
            className="animate-headlight absolute bottom-[7px] left-[58px]"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="taxi-beam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F5C518" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F5C518" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M2 10 L90 3.5 L90 16.5 Z" fill="url(#taxi-beam)" />
          </svg>

          {/* car body */}
          <svg width="72" height="36" viewBox="0 0 72 36" className="drop-shadow-[0_6px_12px_rgba(245,197,24,0.35)]">
            <defs>
              <linearGradient id="taxi-glass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#23475f" />
                <stop offset="100%" stopColor="#0f2233" />
              </linearGradient>
            </defs>

            {/* body */}
            <path
              d="M8 21 L12 12.5 Q13 10 15.5 10 L21 10 L24.5 5 Q25.5 3.5 27.5 3.5 L44.5 3.5 Q46.5 3.5 47.5 5 L51 10 L56.5 10 Q59 10 60 12.5 L64 21 Q65 22.5 63.5 23.5 L61.5 24.5 L10.5 24.5 L8.5 23.5 Q7 22.5 8 21 Z"
              fill="#F5C518"
            />

            {/* side skirt shading */}
            <path d="M10.2 22 L61.6 22 L61.6 24.5 L10.6 24.5 Z" fill="#111827" opacity="0.12" />

            {/* windows */}
            <path d="M23.2 10.2 L26.2 5.8 L35.8 5.8 L35.8 10.2 Z" fill="url(#taxi-glass)" />
            <path d="M36.6 10.2 L36.6 5.8 L44.6 5.8 L47.6 10.2 Z" fill="url(#taxi-glass)" />
            <rect x="36.2" y="5.6" width="0.9" height="4.8" fill="#111827" opacity="0.7" />
            <path d="M25.6 7.6 L26.9 6.1 L32.8 6.1 L31.4 7.6 Z" fill="#ffffff" opacity="0.18" />

            {/* roof taxi sign */}
            <rect x="31.6" y="0.8" width="8.8" height="3.2" rx="1" fill="#111827" />
            <rect x="33.4" y="1.9" width="5.2" height="1" rx="0.5" fill="#F5C518" />

            {/* headlight */}
            <ellipse cx="63.2" cy="20.6" rx="2.6" ry="1.8" fill="#F5C518" opacity="0.35" />
            <ellipse cx="63.2" cy="20.6" rx="1.6" ry="1.1" fill="#fffdf2" />

            {/* taillight */}
            <ellipse cx="8.8" cy="21.4" rx="1.3" ry="0.9" fill="#ef4444" opacity="0.9" />

            {/* door line + handle */}
            <path d="M35.5 10.4 L35.5 23" stroke="#111827" strokeWidth="0.5" opacity="0.25" />
            <rect x="34" y="13" width="2.6" height="0.8" rx="0.4" fill="#111827" opacity="0.35" />

            {/* front bumper */}
            <path d="M61.5 22 L63.6 22 Q64.5 22 64.5 23 L64.5 24.5 L61.5 24.5 Z" fill="#e8b012" />

            {/* wheels */}
            <circle cx="17" cy="26.6" r="5.2" fill="#0b0f14" />
            <circle cx="17" cy="26.6" r="2.6" fill="#3f4a56" />
            <circle cx="17" cy="26.6" r="0.9" fill="#F5C518" />
            <circle cx="54" cy="26.6" r="5.2" fill="#0b0f14" />
            <circle cx="54" cy="26.6" r="2.6" fill="#3f4a56" />
            <circle cx="54" cy="26.6" r="0.9" fill="#F5C518" />
          </svg>

          {/* ground shadow */}
          <div className="animate-taxi-shadow absolute -bottom-[2px] left-1/2 h-[6px] w-[64px] rounded-full bg-black/40 blur-[2px]" />
        </div>
      </div>
    </div>
  </div>
);

export default TaxiRoad;
