# Umsetzungsbericht — SEO-Audit Phase 1 & 2

**Datum:** 02.08.2026 · **Branch:** `design-skills-test` · **Status:** verifiziert (tsc, 697 Tests, Lint, Production-Build 109/109 Seiten grün), noch nicht committed

## Phase 1 — Kritisch

| Maßnahme | Datei(en) |
|---|---|
| HSTS-Header ergänzt | `next.config.ts` |
| GBP-Kategorie & Adressformat als Entscheidungsgrundlage dokumentiert | `docs/GBP-LAUNCH-CHECKLIST.md` (neu) |

## Phase 2 — Hoch

| Maßnahme | Wirkung | Datei(en) |
|---|---|---|
| Logo-Preload korrigiert | Lädt jetzt passende Größe statt voller 3840px-Auflösung | `src/components/layout/Logo.tsx` |
| Kontakt-Mobile-CTA | Telefonlink jetzt im ersten Bildschirm sichtbar | `src/app/kontakt/page.tsx` |
| `aggregateRating` im Schema | Startseite, Über-uns, Bewertungen (letztere hatte vorher gar kein Page-Schema) | `src/lib/schema.ts`, `page.tsx`, `ueber-uns/page.tsx`, `bewertungen/page.tsx` |
| Kombiseite Pankow vertieft | 3 → 6 Sektionen, auf Mitte-Niveau | `src/data/combos.ts`, `src/data/seoHeadings.ts` |
| Google-Bewertung auf Kombiseiten-Template | Wirkt auf ~46 generische Kombiseiten inkl. der ursprünglich bemängelten Mitte-Seite | `src/components/ui/GoogleRating.tsx` (neue Variante `inline`), `leistungen/[slug]/[bezirk]/page.tsx` |
| 8 Ortsteilseiten angereichert | Echte lokale Unterscheidung + differenzierte Leistungskarten statt identischer Geschwisterseiten | `src/data/districts.ts`, `standorte/[bezirk]/[ortsteil]/page.tsx`, `seoHeadings.ts` |

**Nicht umsetzbar (kein Code):** Review-Generierungs-Workflow (Post-Service-E-Mail/QR-Link) — bleibt als Prozessempfehlung im Maßnahmenplan stehen.

## Nächster Schritt

Phase 3 (`llms.txt`, Logo/Artikelbild-Schema-Verdrahtung, CTA-Wording, interne Ortsteil-Links, u. a.) startet jetzt.
