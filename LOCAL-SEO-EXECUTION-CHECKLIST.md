# Local SEO Execution Checklist

Companion to the code changes already deployed. Items 1–4 are **manual tasks on Google Business Profile** (you are the only one who can do them). Items 5–8 are the site-side checks (already implemented — verify after deploy).

## 1. Rename the Google Business Profile (manual — blocked on you)

- Name is currently **"Obey Oneway Taxi"**. Rename to **"Obey One Way Taxi"** to match the website, NAP and schema.
- Google support hotline for name change issues: +91 1800 419 0157 (Google India Business Support).

## 2. GBP details to confirm once renamed

- **Primary category:** Taxi service
- **Phone:** +91 86672 19259
- **Website:** https://obeyonewaytaxi.com
- **Address:** No street address — use **Chennai, Tamil Nadu** as the service-area only business (matches the site's schema `geo` at `12.8352401, 80.0419478`).
- **Description (≤750 chars):** use the copy below; it does not mention Red Taxi or any competitor and leads with the long-tail service keywords.
- **Hours:** Open 24 hours, 7 days (matches `openingHoursSpecification`).

## 3. Ready-to-paste GBP description

```
Obey One Way Taxi is a one-way drop taxi and outstation cab service across Tamil Nadu and South India. Book a one-way drop cab with no return fare — you pay only for the distance you travel. Transparent per-km rates: Sedan ₹15/km, SUV ₹20/km, Innova ₹20/km, Innova Crysta ₹24/km. Door-to-door pickup, verified and background-checked drivers, 24/7 WhatsApp booking with instant confirmation. Airport drop taxi and pickup available from Chennai, Bangalore, Coimbatore, Madurai and Trichy airports. Routes include Chennai to Bangalore, Chennai to Coimbatore, Chennai to Madurai, Coimbatore to Ooty, and all major Tamil Nadu city pairs. Request a GST invoice at booking for official travel. Call or WhatsApp +91 86672 19259 for an instant fare quote.
```

## 4. Weekly GBP activity (set a recurring calendar reminder)

- Post 1 photo per week (clean cab, driver, highway shots).
- Reply to every new review (30% reply rate minimum).
- Add one Q&A entry per month using existing /faq content.

## 5. Site-side local checks (implemented in code — verify after deploy)

- [ ] `src/lib/schema.ts` — `localBusinessSchema` includes `geo` (Latitude/Longitude from config). Verify `geo` renders in the JSON-LD on every page in the source.
- [ ] `src/config/site.ts` — NAP: name "Obey One Way Taxi", phone +91 86672 19259, email bookings@obeyonewaytaxi.com, locality Chennai / region Tamil Nadu / country IN. Geo coordinates set. No street address anywhere.
- [ ] `googleReviewUrl` set to `https://g.page/r/2sI1MGqBqn0/review`. The "Review on Google" button now appears on the homepage reviews CTA (previously it silently fell back to WhatsApp because the URL was empty).
- [ ] No `aggregateRating` / `reviewCount` in any JSON-LD (removed — review counts stay on-page only, sourced as "across Google, Justdial and WhatsApp").

## 6. Citation directory submissions (manual — 10 min each)

Submit NAP — **Obey One Way Taxi, +91 86672 19259, bookings@obeyonewaytaxi.com, Chennai, Tamil Nadu** — to:

1. Justdial (claim existing listing if present)
2. Sulekha
3. IndiaMART
4. taxi.in (transporter listing)
5. Apple Maps (already claimed when business created)
6. Bing Places (verify entry)
7. Google Maps (edit/confirm the renamed profile)

Keep the name, phone and city string **identical** everywhere.

## 7. Post-deploy site verification

- [ ] `npx tsc --noEmit` passes (done at each wave).
- [ ] `npm run build` succeeds.
- [ ] Render source of `/`, `/tariff`, `/drop-taxi-chennai`, a route page, and a blog post; confirm `geo`, `OpeningHoursSpecification`, `Trip` schema present and `aggregateRating` absent.
- [ ] Prerender check via Vercel (or `public/index.html` spot check) — confirm new routes like `/routes/chennai-to-thanjavur` render server-side (no 404).

## 8. Image asset

- `public/branding-image.png` and `logo-square.png` referenced in schema — confirm they exist (or drop replacements into `public/`).