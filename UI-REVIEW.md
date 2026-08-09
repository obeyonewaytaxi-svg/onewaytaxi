# UI REVIEW — Obey One Way Taxi (entire site)

Audit type: Retroactive 6-pillar visual audit (code-based, no UI-SPEC baseline)
Scope: All pages + all 21 components (white/yellow/black theme)
Date: 2026-08-03

## Overall Score: 19/24

| Pillar | Score | Verdict |
|--------|-------|---------|
| Copywriting | 3/4 | Strong, benefit-led, consistent tone |
| Visuals | 3/4 | Clean cards, good imagery; hero visual weak |
| Color | 4/4 | Disciplined white/black/yellow system |
| Typography | 3/4 | Clear hierarchy; over-used tracking |
| Spacing | 3/4 | Consistent rhythm; some cramped mobile gaps |
| Experience Design | 3/4 | Solid flows; minor a11y + consistency gaps |

---

## 1. Copywriting — 3/4

**Strengths**
- Benefit-led headlines ("Travel smarter with premium one-way taxi service.") — clear value prop.
- Consistent voice across sections (premium, transparent, verified).
- Microcopy on CTAs is action-oriented ("Get Instant Fare", "Book via WhatsApp").

**Findings**
- F1 (medium): Repetitive "premium/luxury" adjectives across Hero, Pricing, Fleet, Service pages dilute impact. Pick one primary claim per section.
- F2 (low): Eyebrow labels ("Trusted by 50,000+ travellers") are strong — reuse this proof pattern in Pricing and Fleet for consistency.
- F3 (low): Footer tagline "Luxury travel, simplified." is good; consider aligning Hero H1 to the same "simplified" promise for narrative cohesion.

## 2. Visuals — 3/4

**Strengths**
- Consistent card language: rounded-[28px]/[32px], border-slate-200, white surfaces.
- Real vehicle imagery in BookingCard + Pricing grounds the product.

**Findings**
- F4 (high): Hero right side is the BookingCard form — no aspirational visual (car/city/route imagery). The "premium" promise is told, not shown. Add a hero image or branded illustration behind/around the form.
- F5 (medium): `index.css` body still renders a radial-gradient background while Hero forces `bg-slate-50` overlay — the global gradient is invisible on the most important section. Either remove the body gradient or let it show.
- F6 (low): Car images are hotlinked from multiple CDNs (ctflassets) with no fallback — broken image risk. Add `onError` fallback or self-host.

## 3. Color — 4/4

**Strengths**
- Disciplined execution of the directive: white backgrounds, black/slate-900 text, yellow (#F5C518) reserved for CTAs and accents.
- Yellow used consistently for primary actions; slate-900 for text; slate-200 borders. No stray hues.
- Selection color and focus accents match brand yellow.

**Findings**
- F7 (low): `tailwind.config.js` still defines legacy tokens (`brand.gold`, `brand.dark`, `brand.glass`, `shadow-premium`). Unused now — remove to prevent regression.
- F8 (low): Footer is dark (slate-900) — an intentional inversion that works, but it's the only dark section. Acceptable as a "bookend"; keep as-is.

## 4. Typography — 3/4

**Strengths**
- Clear scale: 5xl–7xl H1, 4xl–5xl H2, consistent font-semibold headings.
- Good line-height on body copy (leading-7/8).

**Findings**
- F9 (medium): Over-use of `uppercase tracking-[0.3em+]` eyebrow labels (used in nearly every section + footer columns). At 0.35em tracking, legibility drops. Reduce to 0.2em or reserve for section headers only.
- F10 (low): Font stack lists Inter + Plus Jakarta Sans but neither is loaded via `<link>`/fontsource — falling back to system fonts. Add the webfont or drop from stack.

## 5. Spacing — 3/4

**Strengths**
- Consistent section padding (py-24), container max-w-7xl, card padding p-6/p-8/p-10.
- Predictable gap scales (gap-4/6/10/12).

**Findings**
- F11 (medium): Hero uses `min-h-screen` + `py-24` — on mobile the booking form pushes far down; consider `min-h-[80vh]` and tighter mobile padding.
- F12 (low): Mixed radius scale (24/28/32px + rounded-full) is mostly consistent but audit for one-off values.

## 6. Experience Design — 3/4

**Strengths**
- Clear primary journey: Hero → Booking form → Fare estimator → Routes → Pricing → FAQ → Contact.
- Sticky header with scroll state; mobile menu present; floating actions available.
- Multiple contact channels (call, WhatsApp) reduce friction.

**Findings**
- F13 (high): Accessibility — yellow (#F5C518) text on white (used in some eyebrow/label contexts) fails WCAG AA contrast (~1.9:1). Use yellow only for fills/icons with dark text, never as small text on white.
- F14 (medium): Two nav items ("Airport Transfer", "Outstation") both link to `#services` — ambiguous anchors. Point to distinct sections or dedupe.
- F15 (medium): Form validation/error states in BookingCard not visually verified — ensure error text uses a non-yellow, high-contrast color (e.g., red-600) and inputs have visible focus rings.
- F16 (low): No `aria-current`/active state on nav; mobile menu lacks focus trap.

---

## Top Fixes (priority order)

1. **F13** — Fix yellow-on-white text contrast (WCAG AA failure). Use yellow for fills/icons only; small labels should be slate-500/700.
2. **F4** — Add a real hero visual (car/route imagery) so "premium" is shown, not just stated.
3. **F14** — Disambiguate duplicate `#services` nav anchors.
4. **F5** — Resolve body gradient vs. hero overlay conflict (pick one background strategy).
5. **F10** — Load Inter/Plus Jakarta Sans or remove from font stack.
6. **F7** — Delete legacy tokens (`brand.gold`, `brand.dark`, `brand.glass`, `shadow-premium`) from tailwind.config.js.

## needs_human_review
- Brand feel of the single dark footer against an all-light site (subjective).
- Whether "premium/luxury" copy density matches target audience tone.
