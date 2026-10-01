# Why you aren't ranking yet — and what actually fixes it

**Date:** 2026-10-01 · **Domain age:** ~8 weeks (first commit 2026-08-09, first deploy 2026-08-10)

---

## Short answer

Your website is not the problem. Your **absence from the rest of the web** is.

Google ranks a taxi business on two things: a crawlable site, and evidence the business is
real and trusted. You have the first. You have almost none of the second.

Evidence — I searched for you three different ways:

| Search | Result |
|---|---|
| `"Obey One Way Taxi"` | No result |
| `"obeyonewaytaxi.com"` | No result |
| `"+91 86672 19259"` (your phone) | **No match anywhere on the web** |

In this industry your phone number is your identity — every directory, review site and
citation republishes it. It appearing **nowhere** is the clearest possible signal that no
citations exist yet.

**A caveat I owe you:** my search tool queries a different index than Google, and Google
blocked my automated query with a captcha. So this is strong evidence, not proof. Your
Search Console is the only authoritative source.

---

## What is already fixed (not the cause)

I verified every technical gate that normally causes invisibility:

| Signal | Status |
|---|---|
| `robots.txt` | `Allow: /` — fine |
| `noindex` tags | none on any page |
| Canonical tags | correct, self-referential |
| Real 404s | nonsense URLs correctly return 404 (no soft-404s) |
| Prerendered HTML | 1,862–3,384 words per page — real content, not an empty shell |
| `robots` meta | `index, follow` |
| TTFB / caching | 190–454 ms, all `X-Vercel-Cache: HIT` |
| Sitemap | 102 URLs, 13 distinct real dates, 0 future dates |
| Structured data | 102/102 blocks valid JSON |

This is why "fix the SEO" wasn't the answer — **the SEO was already clean.**

---

## What I changed today (supports the real work)

| Change | Why it matters |
|---|---|
| Schema type → `["LocalBusiness","TaxiService"]` | `TaxiService` is the precise type for "a vehicle for hire with a driver for local travel". States your category explicitly. |
| `areaServed` → 9 named `City` entities | Replaced the vague string "South India" with Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Erode, Vellore, Puducherry, Bengaluru. |
| `sameAs` scaffolding added | Ready to link your Justdial / GBP / Facebook profiles. **Deliberately omitted from output while empty** — the site won't claim an identity that doesn't exist yet. |
| Sitemap `lastmod` → real per-page git dates | All 102 URLs previously claimed "modified today" on *every* build. Crawlers learn to ignore an always-fresh lastmod. Now 13 honest dates, and 6 future-dated blog dates clamped (a future `lastmod` is invalid and ignored). |

These are real improvements, but be clear-eyed: **they will not move your rankings on their own.**

---

## THE ACTUAL FIX — in priority order

### 1. Google Business Profile (already verified — do this first)

You confirmed it exists and is verified. So your immediate jobs:

- **Rename it to exactly `Obey One Way Taxi`.** Your own checklist says it's currently
  "Obey Oneway Taxi". Name must match your site and NAP character-for-character.
- **Primary category: `Taxi service`.** This is the single strongest ranking input for
  "taxi near me".
- **Add all 9 service cities.**
- **Phone must be `+91 86672 19259`**, website `https://obeyonewaytaxi.com`.
- **Upload 10+ real photos** (fleet, drivers, highway shots). No stock, no watermarks.

⚠️ **I could not find your GBP in search.** That is odd for a verified listing and worth
checking yourself — if it isn't surfacing, the profile may be suspended, hidden, or
service-area-only in a way that suppresses it.

### 2. Reviews — your biggest measurable gap

| Business | Reviews |
|---|---|
| Your site claims | "4.9 across Google, Justdial, WhatsApp" (no count) |
| Competitors found | ssdroptaxi: 28 · Justdial one-way cabs: 1,698 aggregate |

You have a working review link. **Use it:**

- Message your last 20 customers on WhatsApp within 24h of their trip
- Template: *"Hi {name}! Thanks for riding with Obey One Way Taxi. Please take 30 seconds
  to review us on Google: {link}. It means a lot to our team."*
- **Target: 10 reviews in the next 30 days.** This is the highest-leverage action available
  to you, and it's the thing competitors have that you don't.

### 3. Citations — one afternoon's work, permanent payoff

Identical name / phone / website on each. Free tiers only, never pay for placement.

- [ ] **Justdial** — justdial.com (highest traffic Indian directory)
- [ ] **Sulekha** — sulekha.com (strong Tamil Nadu reach)
- [ ] **Bing Places** — bingplaces.com
- [ ] **Tripadvisor** — ssdroptaxi has one; it's a public trust signal
- [ ] **IndiaMART** · **UrbanPro** · **IndiaBizList**
- [ ] **Facebook Page** + **Instagram** (link in bio, pin NAP)

Once live, paste each URL into `src/config/site.ts` → `profiles` and I'll wire them into
`sameAs` in one commit.

### 4. Then chase the long-tails

Only after 1–3. The earlier report's long-tail strategy is sound — `chennai airport to
pondicherry taxi`, `trichy airport to thanjavur taxi`, `VIT Vellore to Chennai airport` —
but content won't rank while the business has no external footprint. The proof: your
site already has a `/routes/vellore-to-chennai` page and still loses that query to
ssdroptaxi, which has Justdial + MouthShut + Tripadvisor behind it.

---

## Realistic timeline

| Timeframe | What to expect |
|---|---|
| Now | Nothing visible. Normal. |
| 1–4 weeks | Pages indexed; GSC shows impressions for brand + very long tail |
| 1–3 months after GBP + citations live | Map-pack appearances for city queries |
| 3–6 months | Competition for mid-tail route queries |
| 6–12 months | Only then do competitive head terms become realistic |

**Domain age is a real factor and cannot be shortcut.** Anyone promising page-one for
`drop taxi chennai` on an 8-week-old domain with no citations is selling you something
that doesn't work.

---

## What to check in Search Console (5 minutes, answers everything)

1. **Indexing → Pages** — how many of the 102 URLs are indexed? A small fraction means
   you have a crawl problem, not a ranking problem.
2. **Performance → Queries** — filter by `obey`. Do you appear for your own name?
3. **Performance → Queries** — any impressions for route terms? Impressions with no clicks
   mean you're ranking deep, not absent.

Paste those three screens back to me and I'll tell you exactly what's happening.

---

## Honest summary

I fixed the things code can fix: the Erode 404, the unverifiable review count, 53 fare
contradictions, and now schema precision and sitemap honesty. Your site is technically
better than most competitors'.

But **the reason you're not ranking is that you have no off-site footprint and an
8-week-old domain.** No amount of code changes fixes that. Items 1–3 above are the fix,
and they all require you rather than me.
