# Sitemap Audit — Glanzwerk Reinigungsservice Berlin

Source checked: `http://localhost:3000/sitemap.xml` (dev server, 200 OK)
Generator: `src/app/sitemap.ts` (Next.js `MetadataRoute.Sitemap`)
Robots reference: `http://localhost:3000/robots.txt` (dev server, 200 OK)

## Summary

| Check | Result |
|---|---|
| XML well-formed | ✅ Pass |
| URL count | 99 (not ~98, see breakdown) |
| Duplicate `<loc>` entries | ✅ None (0 of 99) |
| 50,000 URL limit | ✅ Pass (99 ≪ 50,000, no index/split needed) |
| `robots.txt` → sitemap reference | ✅ Present, correct |
| `lastmod` usage | 🔴 Missing entirely (0 of 99 URLs) |
| `priority` / `changefreq` usage | ℹ️ Present on all 99 URLs (Google ignores both) |
| Non-200 sitemap URLs (spot-check) | ✅ None found |
| Noindexed URLs inside sitemap | ✅ None (correctly excluded) |
| Pages missing from sitemap (Karteileichen) | ✅ None unexpected (2 intentional exclusions, see below) |
| Combo (Leistung×Bezirk) page coverage | ✅ All 47 combos present, 1:1 match |
| Location-page quality gate | ⚠️ WARNING tier (47 combo pages ≥ 30, below 50 hard-stop) |

## 1. XML Validity

Well-formed: correct `<?xml version="1.0" encoding="UTF-8"?>` declaration, single `urlset` root with the standard `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` namespace, and 99 balanced `<url>` blocks. No parse errors, no stray/unescaped characters, no duplicate `<loc>` values.

## 2. URL Count Breakdown (actual, from generated XML)

| Segment | Count | Source |
|---|---|---|
| Static pages | 11 | `/`, `/leistungen`, `/standorte`, `/preisrechner`, `/kontakt`, `/ueber-uns`, `/umwelt-verantwortung`, `/3-monate-testen`, `/bewertungen`, `/wissen`, `/reinigungsfirma-berlin` |
| Leistungsseiten (services) | 12 | matches `src/data/services.ts` (12 entries) |
| Bezirksseiten (districts) | 12 | matches `src/data/districts.ts` (12 entries) |
| Ortsteilseiten | 8 | matches nested `ortsteile[]` across districts (Charlottenburg-Wilmersdorf ×2, Steglitz-Zehlendorf ×2, Tempelhof-Schöneberg ×2, Neukölln ×1 [Rudow], Treptow-Köpenick ×1 [Köpenick]) |
| Leistung×Bezirk Kombi-Seiten | **47** | see note below — brief assumed "ca. 50", actual is 47 |
| Wissen-Artikel | 9 | matches `src/data/articles.ts` (9 entries) |
| **Total** | **99** | |

**Note on combo count:** The task brief mentioned "ca. 50" combo pages; the actual, verified figure is **47**, and this is intentional, not a bug. `src/data/combos.ts` contains an explicit code comment: *"Bewusst keine vollständige 12x12-Matrix (144 Seiten) – nur Kombinationen mit echtem eigenem Inhalt und Suchintention"* (deliberately not a full 12×12 matrix — only combinations with real dedicated content and search intent). Cross-referenced every `serviceSlug`/`districtSlug` pair in `combos.ts` against the sitemap output: **all 47 combos are present, 0 missing, 0 orphaned/unexpected, 0 duplicate pairs.** This is good practice — it avoids generating thin/low-intent combination pages purely for sitemap volume.

## 3. Completeness — Routing vs. Sitemap (Karteileichen check)

Compared every `page.tsx` route in `src/app/` against `sitemap.ts`:

- All static, service, district, ortsteil, combo, and article routes that exist in the App Router are present in the sitemap — no missing routes.
- Two routes exist but are **intentionally excluded** from the sitemap: `/impressum` and `/datenschutz`. Verified both carry `noIndex: true` in their page metadata (`buildMetadata({ ..., noIndex: true })`) and both return HTTP 200 live. This is correct, standard practice for legal boilerplate pages — no action needed.
- No noindexed page is present in the sitemap, and no sitemap URL was found to carry conflicting noindex metadata.
- Spot-checked live HTTP status for a representative sample across every URL category (static, service, combo, district, ortsteil, article) — all returned `200`, no redirects, no 404s.

Conclusion: **no orphaned/missing pages, no dead sitemap entries.**

## 4. lastmod / priority / changefreq

- **`lastmod`: 0 of 99 URLs have a `<lastmod>` tag at all** (not just identical dates — the field is fully absent). Root cause: `sitemap.ts` never sets the `lastModified` property on any of the returned sitemap entries (confirmed against the local Next.js docs bundled in `node_modules/next/dist/docs/.../sitemap.md` — the correct field name is `lastModified`, not `lastmod`). This is spec-valid (lastmod is optional) but is a missed opportunity: Google can use `lastmod` (when accurate) as a freshness/recrawl signal. **Recommendation (Low severity):** add real `lastModified` values, e.g. a static "content last touched" date per service/article, or a shared site-wide last-deploy date for pages without individual tracking — do not fake per-page dates that don't reflect actual edits.
- **`priority` and `changefreq`: present on all 99 entries**, with a deliberate hierarchy (Home 1.0 → static hub pages 0.9 → services 0.8 → combos/districts 0.7 → ortsteile 0.6 → articles 0.5 → legal-adjacent 0.4–0.6). Both fields are **ignored by Google** (and have been for years) — Info-level only. They're harmless to keep (Bing/other engines may still read them) but can be removed to slim the file if desired. No action required.

## 5. robots.txt

```
User-Agent: *
Allow: /

Sitemap: https://www.glanzwerkberlin.de/sitemap.xml
```

Generated from `src/app/robots.ts`. Correctly references the sitemap. Note: on the local dev server the `Sitemap:` line points to the **production** domain (`https://www.glanzwerkberlin.de/sitemap.xml`), because `siteConfig.url` in `src/data/site.ts` is hardcoded to production rather than derived from an environment variable — this is expected/correct behavior for local testing (there's no reason a local sitemap should reference `localhost`), but confirm `siteConfig.url` is definitely correct and unchanged before every production deploy.

## 6. Quality Gate — Location/Combo Pages

- Combo (Leistung×Bezirk) page count: **47** → crosses the **30+ WARNING threshold**, does **not** cross the **50+ HARD STOP**.
- Spot-checked several combo entries in `combos.ts` (e.g. `bueroreinigung-berlin/mitte`): each has a per-combo `intro`, and many have additional bespoke fields (`introSecondParagraph`, `localAngle`, `scopeBullets`, `processText`, `faq`) — i.e. real district-specific detail (references to Regierungsviertel/Alexanderplatz, Kanzleietagen im Altbau, etc.), not a simple city-name swap template. This aligns with the project's known content-style rulebook (dedupe FAQ/intro templates, no template-copy for local SEO combo pages).
- Not all 47 combos appear to have every optional field filled in (`metaDescription`, `localAngle`, `scopeBullets`, etc. are marked optional in the `Combo` interface, with a comment stating unfilled combos "render exactly as before — generic FAQ, standard CTA text"). **Recommendation:** confirm during editorial QA that combos with only the base `intro` field still clear the 60%+ unique-content bar per the WARNING-tier requirement; this sitemap audit only verifies coverage/URL correctness, not per-page word-level content uniqueness (out of scope for XML-level audit — would need per-page content diffing).
- No hard-stop justification needed at 47 pages, but worth flagging: any future service or district additions would push the combo count past 50 quickly (each new district × 12 services, or new service × 12 districts, adds up fast) — the moment that happens, explicit user sign-off is required per the hard-stop rule.

## Findings Table (for audit-data.json)

| ID | Check | Severity | Status | Detail |
|---|---|---|---|---|
| SITEMAP-01 | XML validity | Critical | Pass | Well-formed, correct namespace, 99 balanced `<url>` entries |
| SITEMAP-02 | 50k URL limit | Critical | Pass | 99 URLs, no split/index needed |
| SITEMAP-03 | Non-200 URLs | High | Pass | Spot-check across all URL categories returned 200 |
| SITEMAP-04 | Noindexed URLs in sitemap | High | Pass | None; noindex pages (`/impressum`, `/datenschutz`) correctly excluded |
| SITEMAP-05 | Missing routes (Karteileichen) | High | Pass | All routable pages accounted for; only intentional noindex exclusions absent |
| SITEMAP-06 | Combo page coverage | Medium | Pass | All 47 `combos.ts` entries present 1:1, 0 orphans/duplicates |
| SITEMAP-07 | `lastmod` usage | Low | Fail | 0 of 99 URLs carry `<lastmod>`; field never set in `sitemap.ts` |
| SITEMAP-08 | `priority`/`changefreq` | Info | Note | Present on all 99 URLs; ignored by Google, safe to keep or remove |
| SITEMAP-09 | Location-page quality gate | Warning | Warning | 47 combo pages ≥ 30-page threshold; content spot-checked as differentiated, not template-swapped; recommend editorial confirmation of 60%+ uniqueness across all 47 |

## Files Referenced

- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\app\sitemap.ts`
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\app\robots.ts`
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\data\site.ts`
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\data\services.ts` (12 services)
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\data\districts.ts` (12 districts, 8 ortsteile)
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\data\combos.ts` (47 combo pages)
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\data\articles.ts` (9 articles)
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\app\impressum\page.tsx` (noIndex: true, correctly excluded)
- `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original\src\app\datenschutz\page.tsx` (noIndex: true, correctly excluded)
