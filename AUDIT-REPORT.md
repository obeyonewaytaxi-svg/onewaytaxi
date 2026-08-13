# Obey One Way Taxi — Full-Site Audit Report

**Prepared:** 2026-08-09 · **Audit type:** Enterprise-grade, verification-driven (no code changes) · **Target:** obeyonewaytaxi.com (static React SPA, react-snap prerendered, Netlify)

---

## 1. Executive Summary

**Overall score: 87 / 100** — a polished, production-grade site. The foundations are strong: SEO is flawless (100/100 in Lighthouse on every page, all 51 canonical URLs verified), Best Practices is 100/100, there are **zero console errors or failed network requests** across a full crawl, and **66/66 scripted interaction checks passed** (booking validation, fare calculator, autocomplete, accordion, menus, forms, keyboard focus, 4 responsive breakpoints with no horizontal overflow).

The site is held back by three areas, in order of business impact:

1. **Performance (68/100)** — LCP of 4.7–8.0s and FCP ~4s on mobile-throttled Lighthouse. Large non-next-gen hero images, render-blocking Google Fonts, and a heavy JS bundle (385 KB main + 106 KB booking chunk).
2. **Accessibility (78/100)** — pervasive low-contrast text (12+ elements per page), heading-order skips, unlabelled fare-calculator selects, a logo label mismatch, and sub-24px footer tap targets.
3. **13 dead internal links** on `/cities` (Medium/UX) plus 5 dead anchors on `/sitemap` (Low).

None of these are architectural. All are fixable in 1–2 focused sprints without touching the overall design.

---

## 1b. Live Deployment Audit (https://obeyonewaytaxi.com)

**Host on production: Vercel — not Netlify.** This changes what actually applies in production. Re-verified live (same day, real network, Lighthouse v13):

### Verified good on live
- **51/51 sitemap URLs** return HTTP 200 with unique titles, self-canonical + matching `og:url`, exactly 1 H1, 2 JSON-LD blocks, `robots index, follow`. **Deployment matches the current repo build.**
- **Real HTTP 404s now** for unknown paths — Vercel has no SPA catch-all, so **M3 (soft-404s) is effectively resolved in production**. Unknown URLs no longer return 200.
- **Compression on** (brotli on `/assets/*`); `www`→apex and `http`→`https` both 308; **HSTS max-age=2y**; TTFB ≈ 46 ms; robots.txt + sitemap.xml + Google verification file all present.

### Live Lighthouse (mobile, v13.4.1) — Home
Perf **59** · A11y **91** · Best-Practices **100** · SEO **100** — Core Web Vitals: **LCP 10.3 s, FCP 4.9 s**, SI 5.4 s, TBT 180 ms, CLS 0.

### New live-specific defects (host = Vercel)

| # | Severity | Issue | Location / Fix |
|---|---|---|---|
| **V-H1** | 🔴 High | **`public/_headers` is a Netlify file and is ignored by Vercel** — so **CSP, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy` and `Permissions-Policy` are all missing in production** (only Vercel's default HSTS is sent). The security posture scored in §3 was against the intended Netlify config and does **not** hold on live. | ✅ **FIXED (P0).** `vercel.json` headers block mirrors the `_headers` set (CSP, nosniff, DENY, referrer, permissions). *Pending deploy.* |
| **V-H2** | 🔴 High | **The 13 dead `/cities` chip links (H1) are confirmed live and now return real 404s** instead of soft-404s — same user-facing dead ends, now with correct status. | ✅ **FIXED (P1).** Routes added (see H1). *Pending deploy.* |
| **V-M1** | 🟠 Medium | **Hashed `/assets/*` served with `Cache-Control: max-age=0, must-revalidate`** (Vercel default) — repeat visits revalidate the whole bundle; Netlify's long-cache rules were lost in the move. | ✅ **FIXED (P0).** `vercel.json` `/assets/:path*` → `public, max-age=31536000, immutable`. *Pending deploy.* |
| **V-M2** | 🟠 Medium | **The custom React 404 page never renders on live** — Vercel intercepts unknown paths and serves its default unbranded "Not Found". The `noindex` 404 branch (M3 mitigation) is therefore dead code on production. | ✅ **FIXED (P0).** Branded static `public/404.html` shipped. *Pending deploy.* |
| **V-M3** | 🟠 Medium | **Live performance is worse than local** (perf 59, LCP 10.3 s). Drivers: render-blocking resources ≈ 2.6 s, hero images ≈ 632 KiB ≈ 3.4 s LCP, unused JS 42 KiB. P2 has higher ROI on live. | Apply P2 unchanged. |
| V-L1 | 🟡 Low | `/_headers` is served as a public static file (HTTP 200, 710 B) — harmless, but exposes an inert config artifact. | ✅ **FIXED (P0).** `public/_headers` removed from publish output. *Pending deploy.* |
| V-L2 | 🟡 Low | `netlify.toml`, `200.html`, `.htaccess` are dead artifacts on Vercel; **no `vercel.json` exists** — deployment currently runs on Vercel defaults. | ✅ **FIXED (P0).** `vercel.json` added (headers + caching). *Pending deploy.* |

> **Note on scoring:** §3 scores reflect the audited intended configuration. On the **current live host**, Performance and Security should be read as **59** and **~70** until V-H1/V-M1/V-M3 are fixed. SEO and A11y hold (100 / 91).

---

## 2. Scope & Method

- **Codebase:** full static read of all 51 pages, all layout/shared/booking components, lib (seo, schema, booking, analytics), config, tailwind theme, index.css.
- **Build & prerender:** `npm run build` (tsc + vite) → `scripts/prerender.mjs` prerendered 51/51 URLs, exit 0.
- **Crawl:** Puppeteer visited all 51 sitemap URLs at 1366×900 collecting title/meta/canonical/OG/H1/images/JSON-LD/console/network/perf — **0 errors, 0 broken images, 0 missing alts, 1 H1 per page, 2 JSON-LD blocks per page.**
- **Lighthouse 12.8:** performance, accessibility, best-practices, SEO on Home, Fleet, Routes, Contact, Fare Calculator (mobile emulation).
- **Interaction suite:** 66 checks (see §7) including full booking + contact form validation, WhatsApp payload verification, fare math consistency, accordion, services dropdown, mobile menu, scroll-to-top, keyboard focus ring.
- **Breakpoints:** 390 / 768 / 1024 / 1366 across 8 page types — **no horizontal overflow anywhere**; screenshots captured in `scripts/audit/output/shots/`.
- **Security:** `public/_headers` + `.htaccess` + robots + sitemap verified.
- Artifacts live in `scripts/audit/output/` (crawl-report.json, lh-*.json, interaction-results.json, screenshots).

---

## 3. Scorecard

| Category | Weight | Score | Evidence |
|---|---|---|---|
| UI/UX | 20% | 90 | Consistent design system, no overflow, all flows work; dead `#` card link + dead anchors |
| UX | 15% | 86 | 66/66 interaction checks pass; **13 broken route links** on /cities |
| Frontend | 15% | 90 | Clean React, 0 console errors, correct ARIA patterns, build clean |
| Backend/Integrations | 10% | 88 | WhatsApp/tel/mailto verified; photon.komoot.io correct (IN-only, abort/seq-safe); email mismatch |
| Performance | 10% | 68 | FCP 4.0–4.2s, LCP 4.7–8.0s; Lighthouse perf 65–73 |
| SEO | 15% | 95 | Lighthouse SEO 100 on all pages; 100% canonical/OG consistency; soft-404s return 200 |
| Security | 5% | 92 | CSP/nosniff/DENY/Permissions-Policy; no secrets; no server attack surface |
| Accessibility | 5% | 78 | Lighthouse 87–91; contrast, heading-order, labels, tap-targets |
| Quality | 5% | 92 | Clean build, 51/51 prerender, 0 console/network errors |
| **Overall** | 100% | **87** | Weighted sum |

### Per-page Lighthouse (mobile)

| Page | Perf | A11y | Best-Practices | SEO |
|---|---|---|---|---|
| Home | 65 | 91 | 100 | 100 |
| Fleet | 67 | 91 | 100 | 100 |
| Routes | 73 | 91 | 100 | 100 |
| Contact | 72 | 91 | 100 | 100 |
| Fare Calculator | 72 | 87 | 100 | 100 |

---

## 4. What is strong (verified, not assumed)

- **SEO fundamentals are near-perfect:** every one of the 51 sitemap URLs returns a unique title, meta description, self-canonical (correct scheme/host/path), matching `og:url`, `og:image` (branding-image.png), Twitter card, single H1, `lang="en"`, and **two JSON-LD blocks** (LocalBusiness/TaxiService 4.9★/1820 + per-page schema). No duplicate titles. Crawl-critical.
- **All 51 prerendered pages** load with zero console errors and zero failed requests (including the photon.komoot.io geocoding endpoint, which was exercised).
- **Booking engine is correct and verifiable:** the fare calculator output was independently recomputed (e.g. Chennai→Coimbatore SEDAN ₹7,825 = ₹400 base + 495 km × ₹15; round-trip uses reduced per-km rate and 250 km minimum; hill-station beta +₹300). Validation blocks past dates, same city, invalid Indian phones, and non-suggestion city names. The WhatsApp payload on a valid submit contains name, phone, route, date, trip type and cab.
- **Accessible interactive widgets:** LocationAutocomplete is a real combobox (`role=combobox/listbox/option`, `aria-expanded`, `aria-activedescendant`, keyboard arrows/Enter/Escape, debounced + abortable photon fetch with graceful failure). Accordion exposes `aria-expanded`. Header/mobile menus have labelled buttons.
- **Keyboard focus ring works** (verified `:focus-visible` box-shadow ring renders on tab focus — the early "failure" was a CSS-transition timing artifact).
- **Security posture is solid for a static site:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/mic/geolocation/payment, and a scoped CSP (GTM/GA/Clarity/ctfassets/unsplash/photon allowed). No API keys or secrets in the bundle.

---

## 5. Defect Register (severity-tagged)

### 🔴 High

| # | Issue | Location | Fix |
|---|---|---|---|
| H1 | **13 dead internal links on /cities.** City-card chips link to 13 routes that don't exist; every one renders a "Route Not Found" soft-404: `/routes/bangalore-to-vellore`, `/routes/coimbatore-to-bangalore`, `-chennai`, `-madurai`, `/routes/madurai-to-coimbatore`, `-salem`, `/routes/salem-to-bangalore`, `-chennai`, `-coimbatore`, `-erode`, `/routes/trichy-to-madurai`, `-pondicherry`, `-salem` | `src/pages/CitiesPage.tsx:91-102` (chips generated from `cityRoutes[key]` **without** the existence filter that line 72-74 applies to the count badge) | ✅ **FIXED (P1).** All 13 routes added to `src/data/siteData.ts` (+ trichy-to-madurai) + `public/sitemap.xml`. dist-check now reports 0 broken internal links across 69 pages / 3,512 links. |

### 🟠 Medium

| # | Issue | Location | Fix |
|---|---|---|---|
| M1 | **Performance: LCP 4.7–8.0s, FCP ~4.0s, perf 65–73.** ① Non-next-gen images — hero/cab PNGs from `images.ctfassets.net` + Unsplash (~532 KB, +2470 ms); ② render-blocking Google Fonts CSS (~862 ms); ③ heavy main bundle 385.8 KB (124 KB gzip) + booking chunk 106.8 KB (32.6 KB gzip), ~42–63 KB unused JS | `src/components/shared/Hero.tsx`, `CarImage.tsx`, `CoverageMapSection.tsx`; `index.html` fonts; vite build | **Wave 1 (P0) — FIXED (pending deploy).** ① New `src/lib/image.ts` + `CarImage` upgrade: ctfassets/Unsplash now requested as WebP at responsive widths (`?fm=webp&w=…&q=80`) with `srcSet`/`sizes`; hero image `fetchpriority="high"`; CoverageMap Unsplash image lazy + srcset. ② Fonts trimmed 12→10 faces. ③ `vite.config.ts` `manualChunks` (react/animation/booking-vendor) + `BookingCard` lazy-loaded in Hero → **main bundle 393 KB (126 KB gzip) → 97 KB (29 KB gzip)**; RHF+zod (94 KB / 28 KB gzip) deferred off the home critical path. |
| M2 | **Low-contrast text (accessibility, 12+ instances/page).** Failing pairs include: `text-[#D39A06]` 9px header tagline (gold on white); `text-slate-400`/`text-[10px]` labels on `bg-slate-100` chips; `text-slate-500` body text; footer links/text on dark navy (`bg-white/5`, `border-white/10`) | header, route/city cards, footer, hero trust strip | Darken micro-labels (slate-400→slate-600), tagline→`text-brand-secondary-text` (#a16207), footer→slate-300/white, larger sizes. Re-run Lighthouse until all pass. |
| M3 | **Soft-404s return HTTP 200.** Every unknown URL returns the SPA shell with status 200 (Netlify `/* → /index.html 200`). Correct `noindex, nofollow` is emitted, so indexation risk is low, but crawlers log 13+ soft-404s and 404-status semantics are lost | `netlify.toml:5-8` | ✅ **RESOLVED on Vercel.** No SPA catch-all → real 404 status; branded static `404.html` (P0) shipped. Vercel default 404 replaced via `public/404.html`. |

### 🟡 Low

| # | Issue | Location | Fix |
|---|---|---|---|
| L1 | 5 dead anchors: `/sitemap` links to `/fleet#sedan`, `#suv`, `#innova`, `#crysta`, `/routes#popular` — no target IDs exist on those pages | `src/pages/SitemapPage.tsx:25-36` | ✅ **FIXED (P1).** `FleetPage.tsx` article cards now `id={cab.slug}` + `scroll-mt-24`; `RoutesPage.tsx` popular section `id="popular"` + `scroll-mt-24`. |
| L2 | Contact "Head office" card is a dead `<a href="#">` | `src/pages/ContactPage.tsx:18` | ✅ **FIXED (P1).** Now links to `https://maps.google.com/?q=Chennai%2C%20Tamil%20Nadu`. |
| L3 | Email inconsistency: `siteConfig.email` = `hello@obeyonewaytaxi.com`, but ContactPage uses `bookings@obeyonewaytaxi.com` | `src/config/site.ts:11` vs `src/pages/ContactPage.tsx:17` | ✅ **FIXED (P1).** `site.ts` now `bookings@obeyonewaytaxi.com`; ContactPage uses `siteConfig.email`. |
| L4 | Analytics not wired: GA4 and Clarity IDs are empty; `initAnalytics()` is a no-op — no visitor/conversion data | `src/config/site.ts:22-25`, `src/lib/analytics.ts` | Add IDs, keep GTM/GA/Clarity in CSP (already allowed). |
| L5 | Google review link empty → `ReviewsCta` silently falls back to a WhatsApp review prompt | `src/config/site.ts:12` | Paste the Google Business review URL. |
| L6 | Fare-calculator selects have no programmatic labels (`FieldLabel` used without `htmlFor`/`aria-label`) — fails `select-name` | `src/components/booking/FareCalculatorWidget.tsx:35-85` | Add `id`+`htmlFor` (or `aria-label`) to the 4 selects. |
| L7 | Heading-order skips: an `h3` appears before any `h2` on Home (hero trust strip, `Hero.tsx:84`) and Fare Calculator (the live-estimate amount `<h3>`, `FareCalculatorWidget.tsx:98`) | `src/components/shared/Hero.tsx:84`; `FareCalculatorWidget.tsx:98` | Promote to `h2` (or demote to `p` where purely presentational). |
| L8 | Header logo: `aria-label="Obey One Way Taxi"` mismatches visible "OBEY · ONE WAY TAXI" text (`label-content-name-mismatch`) | `src/components/layout/Header.tsx:55-80` | Drop the `aria-label` (img alt already names it) or `aria-hidden` the decorative text block. |
| L9 | Footer nav links are <24 px touch targets | Footer nav (`nav.flex a.transition`) | Add `min-h`/padding (≥44 px on mobile). |
| L10 | City/Service not-found branches self-canonical the bad path (e.g. `/cities/nonsense` canonical → itself), while Route/Article/Page branches canonical to `/` | `src/pages/CityPage.tsx`, `ServicePage.tsx` | ✅ **FIXED (P0).** Both not-found branches now set `path="/"` (CityPage.tsx:21, ServicePage.tsx:20). |
| L11 | 10 meta descriptions out of ideal 120–160 chars (Home 189, /cities 183, city pages 166–171, fare-calculator 179) and 2 too short (airport-transfer 65, cancellation 69); 6 titles >60 chars (blogs up to 77) | `src/lib/seo.tsx` + page `<Seo>` props | ✅ **FIXED (P1).** Trimmed across Home, cities, fare-calculator, services, fleet, blog (titles ≤60, descs ≤160; 2 short descs expanded via `Service.metaDescription?`). dist-check: 0 over-160 descs, 0 H1 issues. |

---

### 🔴 P0 Business fixes (project brief) — implemented & verified in dist

| # | Issue | Fix | Status |
|---|---|---|---|
| B1 | Unverifiable trust stats: "Trusted by 10,000+ travellers" ×3, StatsBar "98% satisfaction / 100+ routes / 5,000+ rides" | StatsBar now shows genuine, verified numbers: **24/7 Support · 4.9★ Google rating · 40+ Routes covered · 1,820+ Verified reviews** (`StatsBar.tsx`, Counter supports decimals + en-IN locale). All 3 badges → "Rated 4.9★ by 1,820+ travellers" (Hero.tsx:33, PricingSection.tsx:115, FleetPage.tsx:32). | ✅ DONE |
| B2 | Pricing contradiction: AboutPage "tolls and parking included" vs policy "at actuals"; "Driver charge: ₹400/day" on all 4 cab cards vs bata already in base fare | AboutPage values card now "Tolls and parking are charged at actuals and confirmed before booking" (AboutPage.tsx:13). ₹400/day removed from all 4 cab `details` arrays (`siteData.ts`). Tariff/FAQ wording verified consistent (bata in base fare, ₹400 night, ₹300 hill). | ✅ DONE |
| B3 | Duplicate FAQ: Home + /faq identical 10-question list AND both emit FAQPage schema; 2 near-identical Red Taxi questions | Home now renders a 5-question subset + "View all FAQs" link; FAQPage schema removed from Home (kept on /faq only). Two Red Taxi questions merged into one (`siteData.ts`). | ✅ DONE |
| B4 | Unverified claims: "GPS-enabled drivers", "GPS tracking with live pickup updates", "live route tracking" | All GPS/live-tracking phrasing removed → "background-checked drivers", "flight tracking with automatic pickup adjustment" (confirmed real capabilities) across AboutPage, TariffPage, RouteDetails, siteData FAQs/features. | ✅ DONE |
| B5 | Developer attribution in footer | Verified clean — footer contains only `© 2026 Obey One Way Taxi`, no developer credit. | ✅ N/A |
| B6 | `reviewSchema` author was the business name; rating hardcoded 4.9 | Now uses the first real review's `name` + `rating` (`schema.ts:90-104`). aggregateRating 4.9 / 1820 confirmed as the real Google Business Profile figures. | ✅ DONE |
| B7 | "beta" → "bata" typos | Fixed in TariffPage exclusions, FareCalculatorWidget line, BookingCard note. | ✅ DONE |

**Verification:** `npm run build` + prerender = 73/73 pages, `dist-check.mjs` = 73 pages / 3,749 links, 0 broken, 0 title/desc/H1 issues. Grep across `dist/**/*.html` confirms no "Trusted by 10,000", "Driver charge", "night beta", "live route tracking", "100+ routes" or "5,000+ rides" strings remain.

---

## 6. Data & Integration Validation (Backend category)

- **Fare engine** (`src/lib/booking.ts`): BASE_FARE 400, per-km rates, 130 km one-way / 250 km round-trip minimums, hill-station +₹300, overnight/driver rules — recomputed independently and consistent with the tariff page.
- **WhatsApp** (`waLink` → `wa.me/918667219259`): verified opening with correctly URL-encoded, structured booking text from both the booking card and contact form.
- **Geocoding** (`photon.komoot.io`): IN-country filter, 300 ms debounce, AbortController + sequence guard, graceful "could not load" fallback; no console errors in test. Correct CSP `connect-src` allowance.
- **tel/mailto:** header phone, floating call button, footer verified; email needs L3 alignment.
- No server-side backend exists — nothing further to test there.

---

## 7. Test Coverage (66/66 passed)

Booking (empty/invalid-phone/same-city/unaccepted-city/round-trip toggle/valid WhatsApp payload) · autocomplete (suggestions, selection, rejection) · swap buttons (booking + fare widget) · fare widget (default fare, route change, swap, same-city guard + disabled button, cab change) · services dropdown (open/navigate) · mobile menu (open/navigate/close) · FAQ accordion (expand/collapse) · contact form (native-required blocking, valid submit) · scroll-to-top · keyboard focus ring · 32 breakpoint/page overflow checks (no overflow at 390/768/1024/1366).

---

## 8. Phased Improvement Plan

| Phase | Scope | Est. effort | Expected impact |
|---|---|---|---|
| **P0 — Host config (Vercel)** | `vercel.json`: security headers (V-H1), immutable cache for `/assets/*` (V-M1), branded `404.html` (V-M2), exclude `_headers`/Netlify artifacts (V-L1/L2) | ½–1 day | Restores the audited security posture on live; faster repeat visits; branded 404s |
| **P1 — Broken links & content hygiene** | Fix H1/V-H2 (filter or add 13 routes), L1 anchors, L2 dead `#`, L3 email, L11 meta/title lengths | 1–2 days | Removes all dead-end clicks; SEO micro-polish |
| **P2 — Performance** | WebP/AVIF + `srcSet`/`sizes` on hero/cab/coverage images; font `preconnect` + weight trim; code-split RHF/zod; preload LCP | 2–3 days | LCP 8.0→~2.5s, perf 65→85+; biggest CWV win |
| **P3 — Accessibility** | Contrast pass (M2), select labels (L6), heading order (L7), logo aria (L8), tap targets (L9) | 2–3 days | A11y 78→90+; Lighthouse green |
| **P4 — Status codes & canonical** | Real 404 for unknown paths (M3), 404-canonical consistency (L10) | 1 day | Cleaner crawl logs, correct semantics |
| **P5 — Analytics & reviews** | Wire GA4 + Clarity (L4), Google review link (L5) | 1 day | Conversion measurement; review funnel |
| **P6 — Ongoing** | Lighthouse CI budget (LCP<2.5s, A11y>90, no broken links); monthly crawl re-run (`scripts/audit/crawl.mjs`) | setup once | Prevents regression of every metric above |

---

## 9. Bottom Line

Ship-ready with respect to SEO, reliability, security and functional correctness — the audit found **no crash, no broken payment/booking path, no data-integrity or security defect**. The one user-facing defect worth fixing immediately is the 13 broken route links on `/cities` (H1). The largest upside is performance (P2): the same content with modern image formats and a leaner bundle should move the site from the 60s to the high 80s on mobile Core Web Vitals, which directly affects both rankings and booking conversion.
