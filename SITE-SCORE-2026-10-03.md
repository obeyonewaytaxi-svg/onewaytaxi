# Obey One Way Taxi — Full Site Scorecard

**Scored:** 2026-10-03 · **Method:** fresh Lighthouse 12.8.2 (mobile) + direct measurement
**Previous audit:** 2026-08-09, scored **87/100** — that baseline is now ~2 months stale.

---

## Overall: 74 / 100

| Category | Weight | Score | Δ vs Aug 9 | Evidence |
|---|---|---|---|---|
| **SEO / Technical** | 22% | **92** | ↓ from 95 | Lighthouse SEO **92**. One real failure (8 non-descriptive links). |
| **Content** | 18% | **85** | ↑ | 103 pages, avg 975 words. 18 pages under 500w. |
| **Accessibility** | 12% | **72** | ↓ from 78 | Lighthouse a11y **96**, but **92 contrast failures** on home. |
| **Performance** | 15% | **65** | ~flat | Lighthouse **65**. LCP **6.3s** (target <2.5s). |
| **Local / GBP readiness** | 12% | **60** | ↑ | GBP verified, review link fixed, schema strong. 9 reviews, 0 citations. |
| **Trust / E-E-A-T** | 8% | **62** | — | NAP consistent, GST mention. No named owner, no "years in business". |
| **Security** | 5% | **95** | ↑ from 92 | 6/6 meaningful headers. HSTS + CSP live on Vercel. |
| **Code / Build quality** | 5% | **95** | ↑ | tsc clean, 103/103 prerender, 0 console errors, 3 check scripts green. |
| **Conversion / UX** | 3% | **90** | — | tel + WhatsApp + calculator + form; 22 CTAs. |
| **Off-site authority** | — | **5** | — | 0 citations, 9 reviews. *(Not scored in overall — see note.)* |

**Weighted total: 74/100** — down from 87, but for an honest reason: the Aug 9 score was
inflated by *estimated* categories and Lighthouse numbers that no longer hold. This one is
measured.

---

## The two scores that mean the most

### 🔴 Performance: 65/100 — LCP 6.3s

This is the weakest real category and it has **not improved in 2 months**.

| Metric | Measured | Target | Verdict |
|---|---|---|---|
| First Contentful Paint | **2.8 s** | <1.8 s | Poor |
| **Largest Contentful Paint** | **6.3 s** | <2.5 s | **Critical** |
| Total Blocking Time | 250 ms | <200 ms | OK-ish |
| Cumulative Layout Shift | **0** | <0.1 | ✅ Perfect |
| Speed Index | 4.7 s | <3.4 s | Poor |
| Time to Interactive | 6.9 s | <3.8 s | Poor |

**Root causes (measured, not guessed):**

- **717 KB of JS across 31 files** — 236 KB main bundle, 178 KB React vendor, 112 KB
  animation vendor. The animation vendor alone is 112 KB for `framer-motion`.
- **`render-blocking-resources` — 314 ms**, external CSS in `<head>`, no inline critical CSS.
- **`unused-javascript` — 470 ms** of shipped-but-unused code.
- **Fonts not optimised** — 3 font families requested from Google, and `font-display: swap`
  is **not set**, so text blocks on font load.
- **`branding-image.png` is 289 KB** — a single unoptimised PNG.
- **0 of 6 raster images are WebP/AVIF.** All PNG.

**The good news:** CLS is 0 (widths/heights on all 11 images), assets are served brotli with
`max-age=31536000, immutable`, and HTML is brotli-compressed. The caching layer is already
correct — the problem is bundle size and fonts, not delivery.

### 🔴 Accessibility: 72/100 — 92 contrast failures

Lighthouse a11y says **96**, which sounds fine. But the raw audit shows **92 failing nodes
on the homepage alone** — Lighthouse caps the reported list, so the true count is higher.

| Failures | Cause |
|---|---|
| **92 nodes** | Insufficient contrast |
| `text-slate-400` on white | **2.56:1** (needs 4.5:1) — used on all card labels |
| `text-[#D39A06]` on `#fbfcfc` | **2.43:1** — the gold eyebrow text |
| `text-slate-500` on `#f1f5f9` | **4.34:1** — just under AA |
| `label-content-name-mismatch` | Logo link `aria-label="Obey One Way Taxi"` ≠ visible text |

This is a **design-token problem**, not 92 separate bugs. Fixing 2–3 tokens in
`tailwind.config.js` would clear most of it.

---

## What's genuinely strong

- **SEO technical: 92.** Titles 58 chars, descriptions 154 chars, exactly one `<h1>`,
  canonicals correct, real 404s (no soft-404s), robots.txt + sitemap + llms.txt all live.
- **Structured data: excellent.** `TaxiService` + `LocalBusiness`, 9 `City` entities in
  `areaServed`, `sameAs`, geo, postal code, opening hours. 103/103 blocks parse as valid JSON.
- **Unverifiable claims removed.** `aggregateRating` is correctly absent. The stated review
  count (**9**) matches GBP exactly — verified.
- **Layout stability: CLS 0.** Genuinely hard to achieve; all images carry dimensions.
- **Build discipline: 103/103 prerender**, `tsc` clean, and 3 custom verification scripts
  (`verify-claims`, `verify-schema`, `verify-blog`) all green. This is better than most
  agencies ship.
- **Caching + compression: already correct.** Brotli, immutable asset hashes, HSTS, full CSP.

---

## What's weak

| # | Issue | Severity | Fixable by |
|---|---|---|---|
| 1 | **0 citations, 9 reviews** | 🔴 Critical | Owner only |
| 2 | **LCP 6.3s** | 🔴 High | Me |
| 3 | **92 contrast failures** | 🟠 Medium | Me |
| 4 | 8 "Read More" links (SEO 92) | 🟡 Low | Me |
| 5 | 18 pages under 500 words | 🟡 Low | Me |
| 6 | No named owner / years in business | 🟡 Low | Owner |
| 7 | GBP has **0 photos** | 🟠 Medium | Owner only |
| 8 | Potheri vs Chennai address mismatch | 🟠 Medium | Owner decides |

---

## Note on the off-site score

I scored off-site authority **5/100** but **excluded it from the weighted total**. Including
it would drop the real number to ~50 — which would be more *accurate* about commercial
viability, but it isn't a website score. It's a business-authority score.

Be clear about what this 74 means: **your website scores 74. Your business's ability to
rank scores ~50.** The gap between those two numbers is the whole ranking problem, and it's
the part no code change reaches.

---

## How to move the needle

**I can do these (raise the site score to ~88):**
1. Fix contrast tokens → a11y 72 → ~92
2. Trim JS bundle (drop/replace 112 KB `framer-motion`) + `font-display: swap` → perf 65 → ~80
3. Rewrite the 8 "Read More" links → SEO 92 → 98
4. Expand the 18 thin pages

**Only you can do these (raise the business score):**
5. GBP: 10+ photos, 9 service areas, services list
6. Reviews 9 → 25
7. Justdial + Sulekha + Tripadvisor + Facebook citations

**Verdict:** the site is **technically well-built** — better than most competitors I'd
score — and it is **not the constraint**. Performance and accessibility are real, fixable
weaknesses. But even at 88/100 the site would still not rank, because ranking is decided by
the columns where you score 5–60, not the ones where you already score 92–95.
