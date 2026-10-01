# Claim corrections — applied

**Status:** applied to the working tree and verified. Not yet committed or deployed.

All values were derived mechanically from the fare engine in `src/lib/booking.ts`,
which is what the site actually renders:

```
fare = ₹400 base + (billed km × per-km rate)
billed km = actual km, but never less than 130 km one way
rates: Sedan ₹15 · SUV ₹20 · Innova ₹20 · Crysta ₹24
```

## The root cause (one defect, 53 symptoms)

`src/lib/booking.ts` **does** apply the ₹400 base and the 130 km minimum. A subset of the
prose was hand-written without either, so the route card (computed) and the FAQ text
(hard-coded) quoted different prices for the same trip on the same page.

Before, on `/drop-taxi-chennai` alone:

| | Said |
|---|---|
| Chennai → Coimbatore route card (computed) | ₹7,825 |
| Chennai → Coimbatore FAQ (hard-coded) | ₹7,425 |

---

## What changed

### Distances — route table corrected to source-backed values

Public sources were consistent in every case where the table and prose disagreed.

| Route | Was | Now | Basis |
|---|---|---|---|
| Coimbatore ↔ Bangalore | 510 km / 8h 45m | **365 km / 6h 30m** | sources 360–365 |
| Coimbatore ↔ Madurai | 310 km / 5h 45m | **220 km / 4h 15m** | sources 204–269 (most ~206–212) |
| Coimbatore → Trichy | 250 km / 4h 45m | **215 km / 4h** | sources 208–217 |
| Coimbatore ↔ Salem | 130 km / 2h 45m | **165 km / 3h 15m** | sources 166–172 |
| Chennai ↔ Coimbatore (prose only) | 505 km | **495 km** | matches table |
| Trichy ↔ Pondicherry (prose only) | 215 km | **200 km** | sources 200–204 |
| Madurai → Bangalore (prose only) | 460 km | **435 km** | sources 436–439 |

The Coimbatore↔Bangalore fix removes a **~₹2,175 overstatement** on two live route pages.

### Fares — 48 figures brought onto the engine

- **20 city-FAQ figures** (Chennai ×5 routes, Coimbatore→Chennai, Coimbatore→Bangalore)
  now include the ₹400 base and cite the correct km.
- **10 route-description figures** corrected, including **Salem↔Erode** where the page's own
  meta description already said ₹2,350 while the body said ₹1,300 (130 km minimum ignored).
- **11 blog figures** corrected (Chennai→Bangalore, Chennai→Madurai, Vellore→Bangalore,
  Salem→Bangalore, Chennai→Pondicherry, Coimbatore→Bangalore blog).

### Rule statements

- **Night allowance** — the engine charges ₹400 for 11:00 PM–5:30 AM pickups, so
  "11 PM – 6 AM" is accurate. Prose had three different windows; all now say
  **11 PM – 6 AM** (10 occurrences), and `TariffPage` / `llms.txt` were aligned.
- **Minimum billing** — the FAQ that claimed *"There is no strict minimum"* now states the
  actual rule: 130 km one way, 250 km round trip.

### Not touched

`public/llms.txt` fares were already correct (all 7 verified); only its self-contradicting
night-allowance bullet was fixed.

---

## Verification

New guard: `scripts/verify-claims.mjs` — validates every distance and fare claim against the
engine's own rules, and exits non-zero on drift.

```
=== 1. Distance claims inside each city block vs route table ===
  (checked 25 in-block distance claims, 0 disagree)
=== 2. City FAQ fare figures vs engine ===
  (checked 36 FAQ fare figures)
=== 3. Route-description fares vs engine ===
  (checked 25 route-description fares)
=== 3b. Blog per-car fare lines vs engine ===
  (checked 4 blog fare lines)
=== 4. Night-allowance window ===   prose: 11 PM to 6 AM (10x)
=== 5. Minimum-billing distance ===  consistent
=== 6. public/llms.txt ===           (checked 7 example fares)

RESULT: every claim matches the fare engine.
```

Also confirmed:

- `npx tsc --noEmit` → clean
- `npm run build` → **prerender 102/102** (was 91 before the Erode fix)
- `node scripts/verify-schema.mjs` → pass · `node scripts/verify-blog.mjs` → 10/10
- Rendered pages spot-checked: `/drop-taxi-chennai` now shows ₹7,825 in **both** the card and
  the FAQ; `/routes/salem-to-erode` shows ₹2,350 with no ₹1,300 left;
  `/routes/coimbatore-to-bangalore` shows ₹5,875 / 365 km / 6h 30m.

---

## Still open — not mine to decide

1. **Rounding.** The engine uses `BASE + billed × rate` exactly (495 km → ₹7,825). Some
   competitor-style prices round to ₹7,850/₹7,900. Left as-is; say the word to change it.
2. **Round-trip blog arithmetic.** The `₹14/km` round-trip figure for 700 km is computed as
   `14 × 700 = ₹9,800` with no base fare and no 250 km-minimum logic, but the engine applies
   base + minimum to round trips too. Flagged, left unchanged.
3. **`Google Business Profile` rename.** `LOCAL-SEO-EXECUTION-CHECKLIST.md` (written by another
   process) says the profile exists and needs renaming from "Obey Oneway Taxi" — this is a
   manual task on your side, not a code change.
