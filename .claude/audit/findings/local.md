# Local SEO Audit — Glanzwerk Reinigungsservice Berlin

Target: `http://localhost:3000/` (local dev server, not yet deployed — no live GBP profile exists to cross-check externally)
Business model: B2B-only Gebäudereinigung, no Privatkunden, Einsatzgebiet = alle 12 Berliner Bezirke
Date: 2026-08-01

## Local SEO Score: 78 / 100

| Dimension | Weight | Score (0–100) | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 55 | 13.75 |
| Reviews & Reputation | 20% | 90 | 18.0 |
| Local On-Page SEO | 20% | 85 | 17.0 |
| NAP Consistency & Citations | 15% | 90 | 13.5 |
| Local Schema Markup | 10% | 65 | 6.5 |
| Local Link & Authority Signals | 10% | 40 | 4.0 (unassessable live, scored on code-visible prep only) |
| **Total** | | | **~78** |

This score reflects code-visible preparation only. GBP Signals and Local Link/Authority cannot be verified live since the site isn't deployed — see Limitations.

---

## Business Type Detected: Hybrid (leaning SAB), correctly modeled

- No "come visit us" storefront framing anywhere in copy — service is explicitly service-area (`areaServed: Berlin` / per-Bezirk in schema, hero copy "Gebäudereinigung … in ganz Berlin").
- A real registered business address exists (`Joachim-Gottschalk-Weg 12, 12353 Berlin`) and is disclosed for legal reasons on Impressum, Footer, and Kontakt page — required by German TMG (Impressumspflicht), not presented as a customer-facing location. No "Anfahrt"/directions link, no Maps embed pointing at it.
- This is the correct posture for a B2B cleaning company: address must be legally disclosed but should not be marketed as a physical destination. Code respects that distinction. No conflicting signals found (e.g., no "besuchen Sie uns" copy anywhere).

## Industry Vertical Detected: Home/Building Services (B2B Gebäudereinigung)

Signals found: service area language across 12 Bezirke + 8 Ortsteile, "Angebot anfragen" CTAs, `ProfessionalService`/`Service` schema types (not `LocalBusiness` generic), Betriebshaftpflichtversicherung (liability insurance) called out explicitly, flexible/off-hours scheduling language, B2B audience targeting (Büros, Praxen, Kanzleien, Kitas, Autohäuser, Fitnessstudios, Gastronomie) — appropriately treated as a commercial/facility-services vertical rather than "home services" consumer cleaning. No consumer-facing signals (no residential pricing, no "same day" emergency framing) — consistent with the stated B2B-only positioning.

---

## NAP Consistency Audit

| Source | Name | Address | Phone |
|---|---|---|---|
| `src/data/site.ts` (`siteConfig`) — single source of truth | Glanzwerk Reinigungsservice Berlin | Joachim-Gottschalk-Weg 12, 12353 Berlin | 030 837 56816 / `tel:+493083756816` |
| Footer (all pages) | via `siteConfig` | via `siteConfig` | via `siteConfig` |
| `/kontakt` | via `siteConfig` | via `siteConfig` | via `siteConfig` |
| `/impressum` | via `siteConfig` | via `siteConfig` | via `siteConfig` |
| `Organization` JSON-LD (sitewide, `layout.tsx`) | via `siteConfig` | `PostalAddress` via `siteConfig` | via `siteConfig` |
| `ProfessionalService` JSON-LD (home, über-uns) | via `siteConfig` | via `siteConfig` | via `siteConfig` |

**Result: No discrepancies found.** Every NAP-bearing surface (visible HTML, footer, Impressum, Kontakt, and both JSON-LD blocks) reads from the single `siteConfig` object rather than being hand-copied per page. This is structurally the strongest possible guarantee against NAP drift — a common citation-audit failure mode is eliminated by construction, not by manual proofreading.

One thing to verify before launch: `siteConfig.address.street/zip/city` must exactly match whatever address is entered in the future Google Business Profile listing (including abbreviation style, e.g. "Str." vs "Straße" if that ever changes) — Google's own NAP matching is stricter about exact-string address formatting than schema.org consumers are.

---

## Local Schema Markup Validation

Builders live in `src/lib/schema.ts`, injected sitewide via `layout.tsx` (`Organization`, `WebSite`) plus per-page `ProfessionalService`, `Service`, `WebPage`/`ContactPage`, `Article`.

**Deliberate design decision (documented in code comment):** no `LocalBusiness` and no `aggregateRating` schema anywhere. Rationale in `schema.ts`: "no walk-in storefront, no real reviews yet [at authoring time]." This is a defensible anti-fabrication stance, but it's now slightly stale relative to the data that exists:

| Check | Status | Note |
|---|---|---|
| Correct industry subtype | ⚠️ Partial | `ProfessionalService` is acceptable for a B2B cleaning service (no better-fitting schema.org type exists — `HousePainter`/`Electrician`-style trade types don't cover Gebäudereinigung). Using generic `Organization` + `ProfessionalService` instead of bare `LocalBusiness` is correct. |
| `name`, `address` (required) | ✅ Present | Consistently, via `siteConfig`. |
| `telephone` | ✅ Present | On `Organization` and `ProfessionalService`. |
| `url` | ✅ Present | |
| `geo` (5-decimal precision) | ❌ Missing | No `geo`/`GeoCoordinates` anywhere in any schema. Even for a SAB, adding verified lat/long for the registered address strengthens local relevance signals and costs nothing once coordinates are confirmed. |
| `openingHoursSpecification` | ❌ Missing (justified) | No fixed public hours exist to encode — the business explicitly offers off-hours/flexible scheduling rather than fixed storefront hours. Adding fabricated hours would violate the project's own no-invented-data rule. Correctly omitted, not a defect. |
| `areaServed` | ✅ Present, well-modeled | `ProfessionalService` uses `City: Berlin`; every district/Ortsteil/combo page overrides `areaServed` to the specific Bezirk/Ortsteil name via `serviceSchema()`. This is good practice — search engines get granular area signals per URL instead of one blanket "Berlin" everywhere. |
| `aggregateRating` | ❌ Missing, but now inconsistent with own policy | The code comment says "no real reviews yet," but `googleBusiness.fallback` **is** a hand-verified real value (5.0★ / 7 reviews, checked 2026-07-29, explicitly documented as not estimated/rounded). This is exactly the kind of verified data the project's own content-integrity rule allows to be used. Recommend adding `aggregateRating` (`ratingValue`, `reviewCount`) to the `ProfessionalService` schema, sourced from the same `getGoogleRating()` call already used on-page — schema and visible content would then read from one function, guaranteeing they can never diverge. Currently this is the single biggest "free" schema win being left on the table. |
| `Review` schema for individual reviews | ❌ Missing | Correctly not fabricated (matches the project's explicit "no invented review text" rule — see `googleRating.ts` comments). Once live reviews come back from the Places API, individual `Review` nodes could be added the same way, still fully verified/live-sourced. |

**Recommendation:** Update `professionalServiceSchema()` to accept the already-fetched `GoogleRatingData` and emit `aggregateRating` when `live || fallback` data exists — this closes the gap between "what the page visibly says" (5.0★, 7 reviews) and "what the schema says" (nothing), without inventing anything new.

---

## GBP Optimization Readiness (code-visible only — no live profile to audit)

Since the site is not deployed, no live Google Business Profile signals (primary category, posts, Q&A, photos-on-profile, live review responses) can be assessed. What can be assessed is how well the site is *prepared* to support a GBP once created:

| Signal | Status |
|---|---|
| Consistent NAP to copy into GBP verbatim | ✅ Single source, ready |
| Google review integration on-site | ✅ Live Places API wiring exists (`googleRating.ts`), gracefully degrades to a verified fallback, never fabricates text |
| Link to GBP profile from site | ✅ `googleBusiness.profileUrl` (Maps search-by-name link) used consistently in `GoogleRating`, `ReviewMarquee`, `/bewertungen` |
| Maps embed on-site | ❌ None found anywhere in the codebase |
| `geo` coordinates prepared for schema/embed | ❌ None found |
| Photo evidence of real operations (not stock) | ⚠️ Partial — `owner.photo` and `serviceVehiclePhoto` are explicitly wired but currently `null` (both fall back cleanly, no broken image). Per project memory, these and other real photos are a known open item. |
| Primary GBP category decision documented anywhere | ❌ Not found in code or docs | This should be decided before profile creation — for B2B Gebäudereinigung, "Building & office cleaning service" is the closest-fitting primary GBP category; a wrong category is Whitespark's #1 negative ranking factor. Recommend documenting the intended category now so it's not an afterthought at launch. |
| GBP "Service area business" setting consideration | ✅ Implicitly correct | Site framing (12-Bezirke service area, no walk-in language) matches how the GBP profile should itself be configured as a Service Area Business with the address hidden from public view but used for verification. |

Because none of this can be checked against a real, indexed Google listing yet, **GBP Signals scored conservatively (55/100)** — reflecting good technical readiness but zero live signal.

---

## Review Health Snapshot

- Rating: 5,0 / 5 (fallback value, hand-verified 2026-07-29, not estimated or rounded per code comments)
- Count: 7 reviews
- Live wiring: `getGoogleRating()` calls Places API (New) server-side when `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` env vars are set; falls back silently and identically-styled to the verified static value otherwise — confirmed no visible difference between live and fallback states, so nothing looks broken pre-launch.
- Displayed identically on homepage hero badge and `/bewertungen` (verified by rendering both — both show "5,0 von 5 Sternen aus 7 Google-Bewertungen"). **No contradiction found between the two pages** — this was an explicit prior concern per the code's own changelog comment in `/bewertungen/page.tsx` ("vorher stand hier eine leere Liste... während die Startseite gleichzeitig 5,0 aus 7 Bewertungen zeigte" — that bug is documented as already fixed) — confirmed fixed and consistent.
- Review text: none hardcoded anywhere; `ReviewMarquee` renders only real API-sourced review text and returns `null` (renders nothing) when none are available — correctly avoids placeholder/"typical customer" text.
- **Review velocity risk (18-day rule):** With only 7 reviews and no visible review-generation workflow in the codebase (no post-service review-request email/SMS trigger, no QR code/review-link asset referenced), there's a real risk of review velocity gaps once live. This is an operational gap, not a code gap, but worth flagging given Whitespark's finding that ranking can fall off a cliff after ~3 weeks without new reviews.
- Response pattern: unassessable — Places API "New" field mask requested (`rating,userRatingCount,reviews`) does not include owner-response data, and no review-response UI/data exists in the codebase.

## Citation Presence (Tier 1 Directories)

Cannot be assessed — site is not live, so there is nothing yet to search for on Yelp, BBB, or comparable German directories (e.g., Gelbe Seiten, 11880, Das Örtliche, Cylex, Firmenverzeichnis — more relevant Tier-1 equivalents for a German B2B service than the US-centric Yelp/BBB). No code-level signals either way (e.g., no citation-tracking data file). **Recommendation for launch:** once live, prioritize consistent NAP submission to Google Business Profile, Gelbe Seiten, Das Örtliche, 11880, and a facility-management/B2B-relevant directory (e.g., Wer-liefert-was) over US-centric Yelp/BBB, which have low relevance for German B2B cleaning search intent.

## Location Page Quality (multi-location: 12 Bezirke + 8 Ortsteile + 50 combo pages)

**Bezirk pages (12) — genuinely differentiated, not name-swapped doorway pages.**
Reviewed all 12 entries in `src/data/districts.ts`: each has distinct `localContext` paragraphs referencing real, verifiable local characteristics (e.g., Mitte: Regierungsviertel/Alexanderplatz office density and tight access windows; Charlottenburg-Wilmersdorf: Kurfürstendamm showrooms/Autohäuser; Steglitz-Zehlendorf: villa-style residential-adjacent practices requiring discretion; Lichtenberg: newer office parks with more glass surfaces). Each also has distinct `audiences`, `featuredServiceSlugs`, and 2 unique FAQ pairs. This passes a doorway-page swap test — swapping two Bezirk pages would change substantive content, not just the place name.

**Ortsteil pages (8) — thin, template-driven, doorway-page risk. High priority.**
Reviewed `src/app/standorte/[bezirk]/[ortsteil]/page.tsx` and fetched two live examples (`/standorte/charlottenburg-wilmersdorf/charlottenburg` vs `.../wilmersdorf`). Findings:
- No `localContext`-equivalent unique paragraphs exist for Ortsteile at all — the `Ortsteil` type (`src/data/districts.ts`) only carries `slug` and `name`.
- Body copy is a single generic sentence with name substitution: *"Reinigungsservice für Büros, Praxen und Gewerbeobjekte in {Ortsteil} ({Bezirk})."*
- Featured services shown are pulled from the **parent district's** `featuredServiceSlugs`, so two Ortsteile under the same Bezirk (e.g., Charlottenburg and Wilmersdorf) render **identical** service cards.
- No FAQ section at all on Ortsteil pages (Bezirk pages have 2 FAQ items each; Ortsteil pages have none).
- This directly matches the "doorway page swap test" failure pattern: swapping the Ortsteil name between Charlottenburg and Wilmersdorf changes almost nothing else on the page. 8 pages, low but non-zero duplicate-content/thin-content risk.
- **Recommendation:** either (a) enrich each Ortsteil with 1–2 genuinely distinguishing sentences the way Bezirke have (even a single locally-specific detail per Ortsteil would clear the bar), or (b) fold Ortsteile into their parent Bezirk page as anchored sections/links instead of standalone indexable URLs, removing the thin pages from the sitemap. Given there are only 8, option (a) is a small, contained fix.

**Combo pages (leistung × Bezirk, 50 total) — mixed depth, largely acceptable but with a real gap.**
- Verified count: of 50 combo entries in `src/data/combos.ts`, only 8 have a custom `metaDescription`, only 2 have deep `localAngle` paragraphs, and only 3 have custom `faq`.
- The remaining ~40+ combos render with only a short, individually-written `intro` paragraph (confirmed these do contain genuine, non-templated local detail — e.g., distinct Kurfürstendamm vs. Gewerbehof vs. mehrstöckige-Gewerbegebäude framing per district) — this is real content, not name-swapping, so it's meaningfully above pure doorway-page quality.
- However, the **FAQ section on these fallback combos is templated** (`src/app/leistungen/[slug]/[bezirk]/page.tsx` lines ~100–110): two auto-generated Q&A pairs built from `service.shortTitle` + `district.name` string interpolation, near-identical in structure across all ~40 fallback combo pages. This is a moderate duplicate-content risk concentrated in the FAQ block specifically, not the full page.
- 6 combo pages (`gebaeudereinigung-berlin` × Mitte/Friedrichshain-Kreuzberg/Pankow/Charlottenburg-Wilmersdorf/Tempelhof-Schöneberg/Neukölln) have fully custom, bespoke React components — the highest-quality tier.
- **Recommendation:** Per the project's own stated rule ("never template-copy combo pages; individual research + pre-brief/approval gate before writing any batch" — see memory `glanzwerk_local_seo_combo_pages.md`), this is presumably a known, intentional work-in-progress state (only the highest-priority combos got full treatment first) rather than an oversight. Flagging here so it's visible in the audit, but treat as lower urgency than the Ortsteil gap given the explicit incremental rollout plan already in place.

**Internal linking:** Bezirk pages link to neighbor Bezirke, to combo pages, and to featured services. Combo pages link back to the parent service, parent Bezirk, and neighbor-Bezirk combos. Ortsteil pages link only to featured services and the CTA — no link back up to sibling Ortsteile or to relevant combo pages, which is a missed internal-linking opportunity given how thin standalone Ortsteil pages otherwise are.

---

## B2B Gebäudereinigung-Specific Checks

- **Einzugsgebiet-Klarheit:** Strong. The 12-Bezirk area is stated identically and unambiguously across hero, FAQ, footer nav, sitemap structure, and schema `areaServed` at three levels of granularity (city → Bezirk → Ortsteil). Umland (Potsdam, Schönefeld) is explicitly framed as "auf Anfrage," not oversold — an honest scope statement, not a duplicate coverage claim.
- **Referenzen/Zertifikate — content rule compliance: PASS.** Actively searched for fabricated certifications, client counts, "Marktführer"-style claims, and years-in-business claims. Found none. Explicit code comments confirm the opposite discipline: `services.ts` comment explicitly says HACCP/other certifications are "nicht bestätigte" and therefore not claimed for Gastronomiereinigung; `articles.ts` content actively coaches the *reader* to ask cleaning vendors for concrete answers "statt nach Siegeln oder Zertifikaten." `ClientLogos` component renders nothing until real, approved logos exist (no placeholder/greyed "Referenzen folgen" state). Insurance claim (5 Mio. € Betriebshaftpflicht, Allianz) is stated consistently across 4 locations and is the one credential claim made — it reads as a genuine, checkable fact rather than a marketing number.
- **B2B trust signals appropriate to the vertical:** fixed Ansprechpartner (named owner, not just a claim), explicit non-automatic-renewal 3-month trial, response-time SLA scoped honestly to business hours — all reasonable substitutes for the "reviews + photos + certifications" trust stack that consumer-facing local businesses lean on, which matters because B2B decision-makers weight different signals than consumer searchers.

---

## Top 10 Prioritized Actions

**Critical**
1. Decide and document the intended primary Google Business Profile category *before* profile creation (e.g., "Building & office cleaning service," not generic "Cleaning service" or a residential-leaning category) — Whitespark's #1 ranking factor and #1 negative factor both hinge on this single field, and it's currently undocumented anywhere in the repo.

**High**
2. Enrich the 8 Ortsteil pages with at least 1–2 genuinely distinguishing local sentences each (mirroring the `localContext` pattern already proven on Bezirk pages), or fold them into their parent Bezirk page instead of keeping them as standalone thin indexable URLs — current state fails a doorway-page swap test.
3. Add `aggregateRating` to `professionalServiceSchema()` sourced from the already-fetched, hand-verified `getGoogleRating()` data (5.0★/7 reviews) — closes the visible-content-vs-schema gap without inventing anything, and is explicitly permitted by the project's own "verified data only" rule.
4. Add verified `geo` (`GeoCoordinates`, lat/long to 5-decimal precision) for the registered address to `organizationSchema()`/`professionalServiceSchema()` — a zero-risk addition (it's public, verifiable, non-fabricated data) that's currently entirely absent.
5. Establish a review-generation workflow (post-service request link/QR/email trigger) before launch — 7 reviews with no visible acquisition mechanism risks falling behind the 18-day review-velocity threshold once live and competing.

**Medium**
6. De-templatize the fallback-combo FAQ block (`src/app/leistungen/[slug]/[bezirk]/page.tsx`) — even 1–2 additional custom FAQ entries per remaining combo, prioritized by the existing "individual research" rollout plan, would remove the one clearly duplicated content pattern across the ~40 non-custom combo pages.
7. Add internal links from Ortsteil pages back to sibling Ortsteile within the same Bezirk and to relevant combo pages — currently a linking dead end.
8. Once live, prioritize NAP submission to Google Business Profile plus Germany-relevant B2B directories (Das Örtliche, 11880, Gelbe Seiten, Wer-liefert-was) over US-centric Yelp/BBB, which have negligible relevance for German B2B cleaning search intent.
9. Confirm the exact address string format (`Joachim-Gottschalk-Weg 12, 12353 Berlin`) matches what will be entered in Google Business Profile character-for-character before profile creation, since Google's NAP matching is stricter than schema.org's.

**Low**
10. Consider adding `Review` schema nodes (sourced live from the Places API, same discipline as the existing review-text handling) once real reviews are flowing, to strengthen rich-result eligibility further — not urgent pre-launch.

---

## Limitations Disclaimer

This audit was performed against a local, non-deployed dev server (`localhost:3000`). The following could **not** be assessed and require a live, indexed deployment plus paid tooling to verify:
- Actual Google Business Profile state (category, posts, Q&A, photos, live review responses, business description) — no profile exists yet.
- Live local pack / map pack ranking positions for any keyword.
- Real citation presence/accuracy on Tier 1 directories (nothing to search for pre-launch).
- Proximity-based ranking variance (per Search Atlas ML research, ~55.2% of local ranking variance) — entirely outside the website's or this audit's control regardless of deployment status.
- Backlink profile / local link authority — scored conservatively at 40/100 by default since no live domain exists to check; this is not a code defect, simply unassessable pre-launch.
- Actual review velocity and response-rate behavior over time — only a single verified snapshot (7 reviews, 2026-07-29) exists.
- DataForSEO / live SERP tools were not available in this environment; all findings are based on static/rendered code and content inspection only.
