# SEO Off-site Checklist — Obey One Way Taxi

Purpose: build the off-site signals (citations, reviews, backlinks) that move rankings
for `obeyonewaytaxi.com` on competitive one-way / drop-taxi keywords. Work through top
to bottom. Cross off in the tracking tables as you go.

Canonical NAP (use these exact strings EVERYWHERE — consistency is the #1 local ranking factor):

- Business name: **Obey One Way Taxi**
- Phone: **+91 86672 19259**
- WhatsApp: **918667219259**
- Email: **bookings@obeyonewaytaxi.com**
- Website: **https://obeyonewaytaxi.com**
- Category: **Taxi Service**
- City / Region: **Chennai, Tamil Nadu**
- Country: **India**
- Service areas: **Chennai, Coimbatore, Madurai, Trichy, Salem, Erode, Vellore, Pondicherry, Bangalore**
- Hours: **Open 24/7, all days**

Do not invent street addresses. If a listing requires one and you are home-based, enter the
city-level address as your public address or use "Chennai, Tamil Nadu" where allowed; keep it
identical on every platform. Never use a PO box.

---

## 1. Google Business Profile

Target: get into the Google local "Taxi service near Chennai" map pack.

- [ ] Create/claim GBP at business.google.com (name exactly "Obey One Way Taxi")
- [ ] Verify the listing (postcard / phone — allow 1–2 weeks)
- [ ] Category: Taxi Service (+ secondary: Car Rental)
- [ ] Enter NAP exactly as above; set website + `tel:+918667219259`
- [ ] Hours: Open 24 hours, 7 days
- [ ] Service areas: add the 9 cities above
- [ ] Photos: 5+ fleet photos, 2+ driver/booking photos, 1 cover image — real photos, no watermarks
- [ ] Write description using natural phrases: "one way taxi", "drop taxi", "no return fare",
      "Chennai to Bangalore", "outstation cab Tamil Nadu"
- [ ] Request 5 reviews from recent customers (share the GBP review link directly)
- [ ] After 1 month, add post "Seasonal offers / new routes" (reviews + posts = freshness signal)
- [ ] **Action**: copy the GBP review-share URL into `src/config/site.ts` -> `googleReviewUrl`
      (currently empty) so the website's Reviews section links to the real review form

Review tracking (target: 25 reviews in 90 days):

| Customer | Date | Platform | Link added to site? |
| --- | --- | --- | --- |

### GBP Quick-Start Kit (copy-paste ready)

**Business description** (paste into the "Description" field — under the 750-char limit):

```
Obey One Way Taxi is a premium one-way and drop taxi service in Chennai serving Tamil
Nadu and South India. We specialise in no-return-fare outstation cab travel — book a
sedan, SUV, Innova or Innova Crysta for one-way journeys from Chennai to Bangalore,
Coimbatore, Madurai, Trichy, Salem, Vellore, Ooty and Pondicherry. Transparent per-km
pricing with no hidden charges, verified drivers, 24/7 support and instant booking on
WhatsApp. Whether you need an airport drop, a hill-station weekend or a business
transfer, you pay only for the distance you travel. Call or WhatsApp +91 86672 19259
for an instant fare estimate.
```

**Service areas** (add all): Chennai, Bangalore, Coimbatore, Madurai, Trichy, Salem, Erode,
Vellore, Pondicherry.

**Photo checklist** (upload in this order): 1 cover image (front of a clean car), 3–5 fleet
photos (sedan / SUV / Innova / Crysta), 1 driver-with-car photo, 1 booking/office photo.
Real photos only — no watermarks or stock.

**Review-request message** (send on WhatsApp to your last 10 customers):

```
Hi {name}! Thank you for riding with Obey One Way Taxi. Your feedback helps other
travellers pick a trusted one-way taxi service. Please take 30 seconds to review us
on Google: {paste your GBP review link here}. It means a lot to our team.
— Obey One Way Taxi
```

Tip: send within 24h of a completed trip while the ride is fresh. Follow up once by
voice call 2 days later if no reply. After your first 5 Google reviews, send me the GBP
review-share URL and I will wire it into `src/config/site.ts` -> `googleReviewUrl` so the
website's Reviews section links straight to it.

---

## 2. Directory listings (citations)

Same NAP on every row. Priority order — do them top-down. Mark status.

| # | Platform | URL | Notes | Status |
| --- | --- | --- | --- | --- |
| 1 | Google Business Profile | business.google.com | See section 1 | |
| 2 | Bing Places | bingplaces.com | Free; often overlooked; duplicates GMB | |
| 3 | Justdial | justdial.com | High-traffic Indian directory | |
| 4 | IndiaMART | indiamart.com | Strong for B2B/intercity | |
| 5 | Sulekha | sulekha.com | Strong Tamil Nadu reach | |
| 6 | UrbanPro | urbanpro.com | Taxi category exists | |
| 7 | IndiaBizList | indiabizlist.com | Easy submit | |
| 8 | Yelp | yelp.com | US-focused but adds authority | |
| 9 | MapQuest | mapquest.com | Free listing | |
| 10 | Facebook Business | facebook.com | Post routes weekly; pin NAP | |
| 11 | Instagram | instagram.com | Bio = website + WhatsApp; post fleet | |

Rules for every listing:
- Business name identical (no "Chennai branch" suffixes)
- Phone identical, formatted `+91 86672 19259`
- Description: 2 sentences, natural, includes brand + "one way taxi" once — no keyword stuffing
- Website URL: always `https://obeyonewaytaxi.com` (no tracking params)
- Never pay for "premium placement" upsells; free tiers are enough

---

## 3. Authority backlinks

A few genuine local links beat hundreds of weak ones. Priority order:

**3a. Guest posts (3) — highest value**
Pitch 2–3 Tamil Nadu / South India travel blogs with a ready draft. Topic must match an
existing route page so the link points to the right URL:

| Blog topic (draft title) | Links to | Target blog |
| --- | --- | --- |
| Chennai to Coimbatore by road: fare, time, stops | /routes/chennai-to-coimbatore | travel blog 1 |
| Ooty via Coimbatore — best route + driver tips | /routes/coimbatore-to-ooty | travel blog 2 |
| One-way vs round-trip taxi: when each wins | /one-way-taxi | travel blog 3 |

Rules: link anchor = natural phrase ("one way taxi Chennai to Coimbatore", "Coimbatore to Ooty
taxi guide"), never exact-match brand spam, add 2–3 outbound links in the article to other
sites so it looks organic.

**3b. Q&A platforms (4–6 answers)**
- Quora: search "one way taxi Chennai", "drop taxi Tamil Nadu", "no return fare taxi" —
  answer genuinely, link the relevant route page in the answer
- Answers must be helpful first, link second (lowest spam risk, still builds trust links)

**3c. Community**
- Reddit r/Chennai, r/Coimbatore, r/india_tourism: respond to "best way from Chennai to X"
  threads with a real answer + link only when it fits naturally
- Facebook travel groups for Tamil Nadu road trips

**3d. Local news / feature pitch (1)**
- Local blogs/newsletters ("things to do in Chennai" style) — pitch a short reader story:
  "How a Chennai startup cut one-way taxi fares with a no-return-fare model"
- Expect low success rate; one hit is a big win

---

## 4. Link hygiene (do NOT)

- No paid links, link farms, PBNs, or directory-burst services
- No exact-match anchors repeated across sites ("one way taxi" x50)
- No cloaking or doorway pages (they actively hurt the domain)
- No "free backlink" packages on Fiverr

---

## 5. Tracking

Backlink log:

| Date | Source (platform/domain) | Page URL on your site | Anchor text | Status (pitched/live) |
| --- | --- | --- | --- | --- |

Monthly cadence (first week of month):
- [ ] GSC Performance: note top queries + avg position (baseline now)
- [ ] Check GBP: reviews this month, new queries, photo views
- [ ] Re-run the URL Inspection list after any site deploy
- [ ] Log new backlinks in the table above; disavow nothing unless spam spikes
