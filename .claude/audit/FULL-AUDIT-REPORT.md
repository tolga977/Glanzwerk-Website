# SEO-Gesamtaudit — Glanzwerk Reinigungsservice Berlin

**Geprüfte Instanz:** `http://localhost:3000/` — lokaler Next.js-16-Dev-Server (Branch `design-skills-test`, Commit `309f02b`), **noch nicht live deployt**
**Projekt:** `C:\Users\tolga\Desktop\glanzwerk-berlin-website-original`
**Datum:** 01.–02.08.2026
**Methodik:** 9 spezialisierte SEO-Teilaudits (technical, content, schema, sitemap, performance, geo, visual, local, sxo), ausschließlich auf Basis lokal verifizierbarer Signale. Keine erfundenen Live-Daten (Ahrefs/GSC/CrUX/echte Rich-Result-Validierung) — diese setzen eine öffentlich erreichbare, indexierte URL voraus und wurden bewusst nicht simuliert.

> **Transparenzhinweis zur Entstehung dieses Berichts:** Der erste Durchlauf aller 9 Teilaudits wurde durch eine Kontext-Kompaktierung dieser Session unterbrochen — 8 von 9 Agenten brachen mitten in der Analyse ab, ohne einen Bericht zu schreiben. Diese Zwischenstände waren nicht rekonstruierbar und wurden **nicht** nachträglich erfunden. Alle 9 Teilaudits wurden stattdessen sauber neu durchgeführt; die hier zusammengefassten Ergebnisse stammen vollständig aus diesem zweiten, vollständigen Durchlauf.

---

## Executive Summary

### SEO Health Score: **74 / 100**

| Kategorie | Gewicht | Score | Gewichtet | Quelle |
|---|---|---|---|---|
| Technical SEO | 22% | 88 | 19.4 | `findings/technical.md` (inkl. `sitemap.md`, keine kritischen Zusatzfunde) |
| Content Quality | 23% | 66 | 15.2 | `findings/content.md` |
| On-Page SEO | 20% | 75 | 15.0 | *synthetisiert* — siehe Abschnitt unten |
| Schema / Structured Data | 10% | 78 | 7.8 | `findings/schema.md` |
| Performance (CWV) | 10% | 65 | 6.5 | `findings/performance.md` — **konservativ, siehe Caveat** |
| AI Search Readiness (GEO) | 10% | 58 | 5.8 | `findings/geo.md` |
| Images | 5% | 80 | 4.0 | *synthetisiert* aus technical/performance/visual |
| **Gesamt** | 100% | | **73,6 ≈ 74** | |

**Wichtiger Vorbehalt zum Performance-Score:** Gemessen wurde ausschließlich der lokale `npm run dev`-Server (Turbopack), nicht ein Production-Build. Die rohen Lighthouse-Zahlen (LCP ~10s) sind dev-mode-Artefakte und wurden **nicht** 1:1 in den Score übernommen — stattdessen ein konservativer Score auf Basis der strukturellen Signale (CLS=0, durchdachte Video-Architektur, aber ungeprüfter echter Payload). Vor Go-Live: Production-Build erneut messen, dann diesen Teilscore ersetzen.

**On-Page SEO und Images haben keinen eigenen Spezialagenten** (das Skill-Scoring-Schema sieht sie als Kategorien vor, es gibt aber keine `seo-onpage`/`seo-images`-Subagenten in diesem Setup). Beide Scores sind aus den Querschnittsbefunden von technical/content/performance/visual synthetisiert — im Detail unten ausgewiesen.

---

### Top 5 kritische Probleme

1. **GBP-Primärkategorie ist nirgends dokumentiert** (Local, Critical) — vor Google-Business-Profil-Anlage entscheiden; laut Whitespark der stärkste positive *und* negative Rankingfaktor für lokale Sichtbarkeit.
2. **HSTS-Header (`Strict-Transport-Security`) fehlt komplett** (Technical, High) — muss vor dem ersten Live-Request gesetzt sein, lässt sich nicht nachträglich "reparieren".
3. **Seitentyp-Mismatch bei „Gebäudereinigung Preis"** (SXO, Critical) — diese SERP wird von Preis-Ratgebern/Rechnern dominiert; die Startseite ist strukturell eine Verkaufsseite. On-Page-Politur allein löst das nicht.
4. **Uneinheitliche Tiefe der Leistung×Bezirk-Kombiseiten** (Content, High — Pankow hat 3 von 6 H2-Sektionen der Mitte-Seite; korrespondiert mit dem unabhängig gefundenen Ortsteil-Dünn-Content-Muster im Local-Audit) — bei 47 Kombiseiten ein Skalierungsrisiko für Konsistenzeindruck.
5. **Kontakt-Seite: auf Mobile weder CTA noch Telefonnummer im Fold sichtbar** (Visual) — ausgerechnet auf der Conversion-Zielseite fehlt der schnelle Kontaktweg für eilige Nutzer.

### Top 5 Quick Wins

1. **`llms.txt` unter `public/llms.txt` anlegen** (GEO, ~30 Min, vor Launch der ideale Zeitpunkt).
2. **Bereits vorhandene Daten ins Schema verdrahten**: `Organization.logo`, `Article.image`, `Article.publisher.logo` — Dateien/Felder existieren bereits, nur nicht angebunden (Schema, ~1 Std. gesamt).
3. **Logo-Preload-Größe korrigieren** — unabhängig von Technical- *und* Performance-Audit gefunden: Logo wird mit `w=3840` angefordert statt der tatsächlichen ~100–150px Anzeigegröße, konkurriert unnötig mit der echten LCP-Ressource.
4. **HSTS-Header ergänzen** — eine Zeile in `next.config.ts` → `baseSecurityHeaders`.
5. **Kontakt-Seite: klickbaren Telefonlink/CTA oberhalb des Formulars auf Mobile ergänzen** (Visual, kleine Komponentenänderung, direkter Conversion-Hebel).

---

## 1. Technical SEO — 88/100

Solides, SSR-lastiges Next.js-16-Setup. Robots.txt korrekt permissiv, 99-URL-Sitemap valide und vollständig (kein Karteileichen-Problem, alle 47 Kombiseiten 1:1 abgebildet), Redirects sauber (308, single-hop), echte 404s, selbstreferenzierende Canonicals über 5 geprüfte Templates, vollständiges JSON-LD, Gzip aktiv, minimaler CSR-Fußabdruck (10 Client-Komponenten).

**Findings:**
- **High** — `Strict-Transport-Security` (HSTS) fehlt komplett in `next.config.ts`.
- **Medium** — Logo-Preload lädt volle 3840px-Auflösung (~300 KB PNG) statt Zielgröße; konkurriert mit der echten LCP-Ressource. *(Unabhängig auch im Performance-Audit gefunden.)*
- **Medium** — Trailing-Slash-Inkonsistenz zwischen Sitemap-Startseiten-URL (mit `/`) und Canonical-Tag (ohne `/`).
- **Low** — `X-Powered-By: Next.js` verrät unnötig den Stack (`poweredByHeader: false`).
- **Low** — Kein IndexNow-Protokoll implementiert (optionaler Quick-Win für schnellere Bing/Yandex-Reindexierung).
- **Sitemap-Detail:** `lastmod` fehlt auf allen 99 URLs (spec-valide, aber ungenutztes Freshness-Signal). Kombiseiten-Anzahl bewusst 47 statt einer vollen 12×12-Matrix (144) — dokumentierte, gute Entscheidung gegen Thin-Content.

Vollständiger Bericht: `findings/technical.md`, `findings/sitemap.md`

---

## 2. Content Quality — 66/100

| E-E-A-T-Faktor | Gewicht | Score |
|---|---|---|
| Experience | 20% | 65% |
| Expertise | 25% | 60% |
| Authoritativeness | 25% | 56% |
| Trustworthiness | 30% | 80% |

**Stärkste Säule:** Trustworthiness (80%) — Impressum/Datenschutz korrekt, sauberes Schema, **keine erfundenen Zertifikate/Kundenzahlen/Testimonials gefunden** (Anti-Fabrikations-Regel eingehalten, über 6 Stichprobenseiten geprüft). Echte Google-Bewertung (5,0/5, 7 Bewertungen) korrekt und unaufgeregt eingebunden.

**Schwächste Säule:** Authoritativeness (56%) — kaum externe Autoritätssignale, kleine Bewertungs-Fallzahl.

**Zentraler Einzelbefund:** `/leistungen/bueroreinigung-berlin/pankow` hat nur 3 von 6 H2-Sektionen der `mitte`-Seite (fehlend: „Leistungsumfang", „So starten Sie", „Passende Objekte") — kein Textklon, aber ein Konsistenzproblem, das bei 47 Kombiseiten wie unfertiges Templating wirken kann.

**Thin-Content-Funde** (unter QRG-Richtwerten, konservativ gemessen inkl. Nav/Footer):
- `/standorte/neukoelln/rudow` — ~186 Wörter (Richtwert 500–600)
- `/wissen/nachhaltige-gebaeudereinigung` — ~495 Wörter (Richtwert 1.500 für Blog-Typ)
- `/leistungen/bueroreinigung-berlin/pankow` — ~280 Wörter

AI Citation Readiness: 72/100 (gutes Structured-Data-Set, aber dünne Seiten liefern zu wenig zitierfähige Fakten).

**Limitation:** Budgetiert auf 6 Stichprobenseiten (curl/grep, kein Rendering) — Befunde sind Indikatoren, keine flächendeckende Prüfung aller 47 Kombi- und 8 Ortsteilseiten.

Vollständiger Bericht: `findings/content.md`

---

## 3. On-Page SEO — 75/100 *(synthetisiert, kein eigener Agent)*

Zusammengeführt aus technical/content/sxo, da On-Page SEO als Kategorie im Scoring-Schema keinen eigenen Subagenten hat:

- Title-Tags und Meta-Descriptions: vorhanden, unique, keine Duplikate auf allen Stichproben (Technical, PASS).
- Heading-Struktur: durchgängig genau ein `<h1>` pro Seite, aber H2-Vollständigkeit variiert stark zwischen Kombiseiten (Content-Finding, s. o.) — zieht den Score deutlich nach unten.
- Meta-Description der Kombiseite Mitte enthält keine Preisangabe, während mehrere Wettbewerber Preise direkt im SERP-Snippet zeigen (SXO-Finding) — CTR-relevant.
- Interne Verlinkung: Bezirksseiten verlinken solide zu Nachbarbezirken/Kombiseiten; Ortsteilseiten verlinken **nicht** zurück zu Geschwister-Ortsteilen oder relevanten Kombiseiten (aus dem Local-Audit übernommen, gehört inhaltlich zu On-Page).

---

## 4. Schema / Structured Data — 78/100

Formatbasis durchgehend korrekt: valides JSON-LD, `https://schema.org` (https), absolute URLs, keine Platzhalter, keine erfundenen Werte. Gute Abdeckung über alle Seitentypen (Organization/WebSite sitewide, ProfessionalService, Service mit granularem `areaServed`, Article, WebPage-Familie, BreadcrumbList).

**Größte Lücke — mit Fachvorbehalt:** `aggregateRating` fehlt trotz echter, verifizierter Google-Daten (5,0★/7). Google verbietet aber **selbstreferenzielle** Review-Rich-Results auf der eigenen Unternehmensseite — der Nutzen liegt in AI/GEO-Sichtbarkeit (Entity-Grounding), nicht in SERP-Sternen. Konkreter, datengetriebener Code-Vorschlag liegt in `findings/schema.md` vor.

**Kostenlose Gewinne (Daten existieren bereits, nur nicht verdrahtet):** `Organization.logo`, `Article.image`, `Article.publisher.logo`.

**Echte Datenlücke (nicht nur Wiring):** `Article.datePublished`/`dateModified` — es gibt schlicht kein Datumsfeld im Datenmodell; bewusst nicht erfunden, sondern als „erst Datenfeld ergänzen" dokumentiert.

**Weitere Funde:** `/bewertungen` hat kein eigenes Page-Schema; `areaServed."@type"` ist immer `"City"`, auch für Bezirke/Ortsteile (technisch ungenau, nicht fehlerhaft); kein `@id`-Verbund zwischen den Schema-Blöcken.

Vollständiger Bericht (inkl. Code-Beispiele): `findings/schema.md`

---

## 5. Performance (Core Web Vitals) — 65/100 *(konservativ geschätzt)*

**Kritischer Kontext:** Gemessen mit Lighthouse 13.4.1 gegen den **Dev-Server** (Turbopack), nicht gegen einen Production-Build. TTFB von 4.060 ms und LCP ~10s sind dev-mode-Artefakte (Live-Kompilierung, ungecachte Bildoptimierung, unminifiziertes React) und **nicht repräsentativ** für die Live-Site.

**Was verlässlich ist:**
- **CLS = 0** auf beiden gemessenen Seiten — sehr gut.
- **Hero-Video ist kein LCP-Risiko** — bestätigt per vollständigem Netzwerk-Log (kein `hero.mp4`-Request im Lighthouse-Lauf) und Code-Review: Client-seitiges Gating (≥640px, kein `prefers-reduced-motion`), `preload="metadata"`, kein `poster`. LCP-Element ist nachweislich das statische Hero-Bild.
- Fonts korrekt mit `display: "swap"` via `next/font` (kein externer Google-Fonts-Request), aber ~312 KB über 3 WOFF2-Dateien — Weight-Reduktion prüfen.
- Keine Third-Party-Skripte im gemessenen Lauf.

**Restrisiko Hero-Video:** Die 139-MB-Rohdatei selbst belastet Datenverbrauch/Decoding für Nutzer, die den Viewport-Schwellenwert erfüllen; keine WebM-Variante trotz vorbereitetem Prop.

**Logo-Oversizing** (auch im Technical-Audit gefunden): `w=3840` für ein ~100–150px-Logo.

**Nicht messbar (Tool-Limitierung, nicht geschätzt):** INP (erfordert reale Interaktion/Felddaten), CrUX (localhost nicht erfasst), PageSpeed Insights API (nur öffentliche URLs).

**Empfehlung mit höchster Priorität, kein Aufwand:** Vor jeder verbindlichen CWV-Bewertung `next build && next start` messen.

Vollständiger Bericht: `findings/performance.md`

---

## 6. AI Search Readiness (GEO) — 58/100

| Dimension | Gewicht | Score |
|---|---|---|
| Citability | 25% | 55/100 |
| Structural Readability | 20% | 65/100 |
| Multi-Modal Content | 15% | 40/100 |
| Authority & Brand Signals | 20% | 55/100 |
| Technical Accessibility | 20% | 80/100 |

**Stärkste Grundlage:** Vollständiges SSR (Markenname 20× im rohen HTML bestätigt), offene `robots.txt` (kein AI-Crawler blockiert: GPTBot, ClaudeBot, PerplexityBot, Google-Extended alle erlaubt), sauberes FAQPage-Schema auf 24 Seiten.

**Größte Lücken:** `llms.txt` fehlt komplett; Wissen-Artikel-Absätze sind mit ~30–55 Wörtern deutlich unter dem für KI-Zitate optimalen 134–167-Wort-Fenster; kein `Person`-Schema für den namentlichen Inhaber trotz starkem Ich-Perspektive-Signal in den Daten; H2-Überschriften sind meist Nominalphrasen statt Fragen.

Plattform-Readiness (Vorlaunch-Einschätzung, keine gemessene Sichtbarkeit): Google AI Overviews 60/100, ChatGPT 55/100, Perplexity 55/100, Bing Copilot 55/100.

Vollständiger Bericht: `findings/geo.md`

---

## 7. Images — 80/100 *(synthetisiert, kein eigener Agent)*

- Alle 22 Bilder der Startseite haben `alt`-Attribute (Technical, PASS).
- `next/image` korrekt für Hero-/Content-Bilder genutzt, moderne Formate (AVIF beobachtet), responsiver `srcset` für das Hero-Bild, korrektes `priority`/`loading="lazy"`-Splitting (19 von 22 Bildern lazy).
- **Abzug:** Logo-Preload überdimensioniert (s. o., zweifach unabhängig bestätigt) — der einzige konkrete Ineffizienz-Fund in dieser Kategorie.
- Keine dedizierte Bild-SEO-Prüfung (Dateinamen, EXIF, OG-Preview-Bilder) durchgeführt — `seo-image-gen` wurde in diesem Lauf nicht gesondert beauftragt.

---

## Zusatzbewertungen außerhalb des Standard-Scoring-Schemas

Diese zwei Dimensionen sind für ein B2B-Lokalunternehmen hochrelevant, haben aber keine Gewichtung im generischen 7-Kategorien-Schema des Skills — hier als eigene Abschnitte, nicht in den Health Score eingerechnet.

### Local SEO — 78/100

| Dimension | Gewicht | Score |
|---|---|---|
| GBP Signals | 25% | 55/100 |
| Reviews & Reputation | 20% | 90/100 |
| Local On-Page SEO | 20% | 85/100 |
| NAP Consistency & Citations | 15% | 90/100 |
| Local Schema Markup | 10% | 65/100 |
| Local Link & Authority Signals | 10% | 40/100 (unassessable live) |

**NAP-Konsistenz: keine Abweichungen gefunden** — jede NAP-tragende Fläche (Footer, Kontakt, Impressum, beide JSON-LD-Blöcke) liest aus derselben `siteConfig`-Quelle, keine Hand-Kopien.

**Bezirksseiten (12):** genuin differenziert, bestehen den Doorway-Page-Swap-Test. **Ortsteilseiten (8): thin, template-getrieben** — kein `localContext`-Äquivalent, generische Ein-Satz-Beschreibung, identische Featured-Services zwischen Geschwister-Ortsteilen, keine FAQ. Deckt sich mit dem unabhängig im Content-Audit gefundenen Konsistenzmuster bei Kombiseiten.

**Kritischster Einzelfund:** GBP-Primärkategorie ist an keiner Stelle im Projekt dokumentiert — sollte vor Profilanlage entschieden werden.

Vollständiger Bericht: `findings/local.md`

### Search Experience (SXO)

Kein numerischer Score (kompakter Modus), aber zwei klar unterscheidbare Befunde:

- **„Büroreinigung Berlin Mitte"** — Seitentyp stimmt (Kombiseite passt zur SERP-Realität), aber Wettbewerber zeigen Preise im Snippet, Glanzwerk nicht — CTR-Lücke, kein Ranking-Mismatch.
- **„Gebäudereinigung Preis"** — kritischer Seitentyp-Mismatch: SERP wird von Preis-Ratgebern/Rechner-Artikeln dominiert, die Startseite ist strukturell eine Verkaufsseite.
- Above-the-Fold-Byte-Offset-Analyse zeigt: Die Kombiseite Mitte (die tatsächliche organische Landingpage) hat **weder Preisrechner noch sichtbares Google-Bewertungs-Signal** — beides ist nur auf der Startseite vorhanden.

Vollständiger Bericht: `findings/sxo.md`

---

## Visuelle Analyse (Screenshots, Above-the-Fold)

Geprüft: Startseite (Video + Standbild-Variante), Büroreinigung, Kontakt, Standort Mitte — je Desktop/Mobile.

- **Startseite und Standort Mitte:** sehr starke Above-the-Fold-Klarheit, beide CTAs auf Mobile im Fold sichtbar, gute Trust-Signal-Platzierung.
- **Büroreinigung:** leichte CTA-Wording-Inkonsistenz zur Startseite; auf Mobile nur 1 von 2 CTA-Buttons im Fold.
- **Kontakt (schwächster Punkt):** auf Mobile im Fold weder CTA-Button noch Telefonnummer sichtbar, nur Formularanfang.
- Keine echten Layout-Shifts, Überlappungen oder abgeschnittenen Inhalte gefunden.

Vollständiger Bericht: `findings/visual.md` · Screenshots: `screenshots/`

---

## Limitationen dieses Gesamtaudits

- Alle Befunde stammen von einem **lokalen, nicht deployten Dev-Server** — echte CrUX-Felddaten, GSC-Indexierungsstatus, reale Backlink-Profile, echte GBP-Signale und tatsächliche AI-Overview-Präsenz sind grundsätzlich nicht prüfbar und wurden nicht simuliert.
- Mehrere Teilaudits (content, sxo) liefen aus Zeit-/Budgetgründen mit reduziertem Stichprobenumfang (curl/grep statt vollständigem Rendering, 6 bzw. 2 Seiten statt aller ~100 URLs) — Befunde sind Indikatoren, keine flächendeckende Prüfung.
- Performance-Zahlen stammen vom Dev-Server und sind bewusst konservativ in den Score eingegangen, nicht direkt übernommen.
- On-Page- und Images-Scores sind synthetisiert (kein dedizierter Subagent in diesem Lauf), nicht direkt gemessen.
