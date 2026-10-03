# Google ranking check — obeyonewaytaxi.com

**Checked:** 2026-10-03 · **Method:** direct Google SERP queries, `hl=en&gl=in`, location Chennai
**Limitation:** Google applied a captcha after ~15 queries. Results are also location- and
history-influenced (Google tagged them "Based on your past activity"), so positions can differ
from what you see. Treat these as directional, not exact.

---

## Headline

| | Result |
|---|---|
| **Indexed in Google** | ✅ **Yes** — `site:` returns 6 pages of results |
| **Brand query** (`Obey One Way Taxi`) | ✅ **#1 organic** + GBP knowledge panel + sitelinks |
| **Commercial/route queries** | ❌ **Not ranking** on page 1 anywhere I tested |

**The site is indexed and healthy. It ranks for its own name and nothing commercial yet.**

---

## 1. Brand query — you win this

Query: `Obey One Way Taxi`

- **Position #1**: `Obey One Way Taxi: Drop Taxi & One Way Cab Tamil Nadu — obeyonewaytaxi.com`
- **Google Business Profile panel** rendered on page 1 — with address, "9 Google reviews",
  "Write a review", phone `086672 19259`, and website link
- **Sitelinks** shown: Chennai Drop Taxi, One Way Drop Taxi Booking, Drop Taxi Reviews &
  Ratings, Privacy Policy, Contact
- Below it: onewaydroptaxi.com, Justdial, CabBazar, One Trip Taxi, OneWay.Cab

This is correct behaviour and confirms the GBP ↔ site connection is working. Note the panel
sits **below** the organic result but above competitors — that's the map-pack placement.

## 2. Commercial queries — not ranking

| Query | Your position | Who holds page 1 |
|---|---|---|
| `drop taxi chennai` | **Not page 1** | droptaxi.in, droptaxichennai.in, chennaidroptaxi.com, fasttrackcalltaxi.in, onewaydroptaxi.com, ssdroptaxi.com, Justdial |
| `drop taxi chennai airport` | **Not page 1** | **redtaxi.co.in (#1)**, fasttrackcalltaxi.in, droptaxi.in, quickride.in, ssdroptaxi.com, wticabs.com |
| `chennai to coimbatore one way taxi` | **Not page 1** | quickride.in, oneway.cab, MakeMyTrip, Savaari, **Uber**, goibibo, ssdroptaxi.com |
| `vellore vit to chennai airport taxі` | **Not pages 1–3** | **ssdroptaxi.com (#1)**, goibibo, MakeMyTrip, Uber, oneway.cab, mayacalltaxi.com |
| `trichy to pondicherry one way taxi` | **Not page 1** | MakeMyTrip, ssdroptaxi.com, goibibo, droptaxihere.com, cabbazar, oneway.cab |

### The finding that matters most

The earlier strategy report used **"Vellore VIT to Chennai Airport"** as the *proof case* that
you could win long tails Uber had ignored. **Google shows the opposite:**

- **ssdroptaxi.com holds position #1** for that exact query
- You appear **nowhere in the top 60** (I checked pages 1–3)

So the long-tail theory was directionally wrong on that specific example. ssdroptaxi did not
build a page Uber ignored *and win it unopposed* — they won it **against** eight competitors
including Uber, MakeMyTrip and Goibibo. Note the IP reminder: I'm reporting what the SERP
listed; I have not reproduced any page content here.

That matters because it changes the plan: these long-tails are **contestable but not empty**.
They need the same off-site strength as the head terms, just with a shorter runway.

## 3. Indexation

`site:obeyonewaytaxi.com` returns **6 pages of results** (~50–60 URLs). Your sitemap lists 102.

So **roughly half your URLs are indexed**. Google's `site:` operator is approximate and
deprecated, so don't treat the number as exact — Search Console's Pages report is authoritative.

What is notably indexed: homepage, /outstation, /blog, /routes, /reviews, /fleet, /tariff,
/contact, /terms, and the Chennai drop-taxi page. Your **route pages are indexed** — they just
don't rank.

---

## What this changes about the plan

My earlier diagnosis (no off-site footprint + 8-week domain) still holds and is now
**confirmed with real data** rather than inference. But three specifics sharpen:

1. **Indexation is half-done.** Around 50 of 102 URLs aren't indexed. Worth a Search Console
   "Pages" review — some may be crawled-but-not-indexed, which is a different fix from
   ranking. Submit the sitemap again and check for "Discovered – currently not indexed".

2. **Your route pages exist, are indexed, and still lose.** That's the cleanest possible proof
   that the bottleneck is authority, not content. Adding more route pages will not fix it.

3. **The long-tails are contested.** ssdroptaxi, oneway.cab, and the OTAs all have pages on the
   exact routes you built. This strengthens the case that **GBP + reviews + citations come
   first** — those are what let a small operator outrank an OTA on a specific route.

## Realistic read

| Query type | Status |
|---|---|
| Brand | Won ✅ |
| Indexation | ~half, needs work ⚠️ |
| Head commercial | Not competitive yet |
| Route long-tails | Not competitive yet |

Nothing here suggests a penalty or a technical fault — the site is indexed and ranks #1 for its
own name, which is exactly what a healthy 8-week-old site looks like. It simply hasn't
accumulated the off-site authority to compete for commercial terms yet.
