# Maßnahmenplan — Glanzwerk Reinigungsservice Berlin SEO-Audit

Basierend auf `FULL-AUDIT-REPORT.md` (Stand 01.–02.08.2026, lokaler Dev-Server, noch nicht live). Priorität nach Rankingblockade/Impact, nicht nach Umsetzungsreihenfolge — technische Abhängigkeiten (z. B. Production-Build vor Performance-Neubewertung) sind vermerkt.

---

## Phase 1: Kritisch (vor Launch)

| # | Maßnahme | Kategorie | Aufwand | Quelle |
|---|---|---|---|---|
| 1 | GBP-Primärkategorie entscheiden und dokumentieren (Empfehlung: „Building & office cleaning service") — vor Google-Business-Profil-Anlage | Local | Niedrig (Entscheidung) | local.md |
| 2 | `Strict-Transport-Security`-Header in `next.config.ts` → `baseSecurityHeaders` ergänzen | Technical | Niedrig | technical.md |
| 3 | Exakte Adressformatierung (`Joachim-Gottschalk-Weg 12, 12353 Berlin`) für GBP-Eintrag festlegen — Google prüft NAP strenger als Schema.org | Local | Niedrig | local.md |
| 4 | Vor jeder verbindlichen Performance-Bewertung: `next build && next start` messen statt Dev-Server | Performance | Niedrig (kein Code) | performance.md |

## Phase 2: Hoch (innerhalb 1 Woche nach Launch-Vorbereitung)

| # | Maßnahme | Kategorie | Aufwand | Quelle |
|---|---|---|---|---|
| 5 | Kombiseite Pankow (und Stichprobe weiterer Kombiseiten) auf Mitte-Sektionstiefe bringen: „Leistungsumfang", „So starten Sie", „Passende Objekte" ergänzen oder bewusst als schlankeren Typ dokumentieren | Content | Mittel | content.md |
| 6 | Ortsteilseiten (8) mit 1–2 genuin unterscheidenden lokalen Sätzen anreichern (analog `localContext` auf Bezirksseiten) oder in die Bezirksseite integrieren statt eigenständiger dünner URL | Content, Local | Mittel | local.md, content.md |
| 7 | Preisrechner bzw. mindestens eine Preisspanne auf den Leistung×Bezirk-Kombiseiten reproduzieren (aktuell nur auf der Startseite) | SXO | Mittel | sxo.md |
| 8 | Google-Bewertungssignal auch auf Kombiseiten sichtbar platzieren (aktuell nur auf der Startseite) | SXO | Niedrig–Mittel | sxo.md |
| 9 | Kontakt-Seite (Mobile): klickbaren Telefonlink/CTA oberhalb des Formulars ergänzen | Visual | Niedrig | visual.md |
| 10 | `aggregateRating` an `professionalServiceSchema()` + `/bewertungen` anbinden, gespeist aus `getGoogleRating()` — mit Hinweis, dass der Nutzen in AI/GEO-Sichtbarkeit liegt, nicht SERP-Sternen | Schema | Niedrig (Code-Vorschlag liegt vor) | schema.md |
| 11 | Review-Generierungs-Workflow einrichten (Post-Service-Link/QR/E-Mail) — 7 Bewertungen ohne sichtbaren Akquisemechanismus riskieren Velocity-Einbruch nach Launch | Local | Mittel (Prozess, kein Code) | local.md |
| 12 | Logo-`<Image>`-Komponenten auf tatsächliche Rendergröße setzen oder als SVG ausliefern (aktuell `w=3840` für ~100–150px) | Technical, Performance | Niedrig | technical.md, performance.md |

## Phase 3: Mittel (Monat 1–2)

| # | Maßnahme | Kategorie | Aufwand | Quelle |
|---|---|---|---|---|
| 13 | `llms.txt` unter `public/llms.txt` anlegen | GEO | Niedrig (~30 Min) | geo.md |
| 14 | `Organization.logo`, `Article.image`, `Article.publisher.logo` verdrahten (Daten existieren bereits) | Schema | Niedrig (~1 Std.) | schema.md |
| 15 | `datePublished`-Feld im Article-Datenmodell (`articles.ts`) ergänzen, sobald echte Daten bekannt sind — dann erst ins Schema | Schema, Content | Niedrig–Mittel | schema.md |
| 16 | Wissen-Artikel-Kernabsätze auf 134–167 Wörter mit direkter Antwort in den ersten 40–60 Wörtern erweitern | GEO, Content | Mittel (pro Artikel ~30–45 Min) | geo.md, content.md |
| 17 | H2/H3 in Wissen-Artikeln auf Frage-Form umstellen (z. B. „Fläche und Bodenart" → „Wie stark beeinflusst die Fläche den Preis?") | GEO | Mittel (~20 Min/Artikel) | geo.md |
| 18 | `Person`-Schema für den Inhaber ergänzen (verknüpft via `founder`), `sameAs` mit LinkedIn/GBP sobald verfügbar | Schema, GEO | Niedrig–Mittel (~1 Std.) | geo.md |
| 19 | CTA-Wording zwischen Startseite und Leistungsseiten vereinheitlichen | Visual | Niedrig | visual.md |
| 20 | Fallback-Kombiseiten-FAQ de-templatisieren (aktuell zwei auto-generierte Q&A-Paare bei ~40 Kombiseiten) | Content, Local | Mittel–Hoch (Rollout bereits geplant lt. Projektregel) | local.md |
| 21 | Interne Links von Ortsteilseiten zu Geschwister-Ortsteilen und relevanten Kombiseiten ergänzen | On-Page, Local | Niedrig | local.md |
| 22 | Trailing-Slash-Inkonsistenz Startseite (Sitemap vs. Canonical) vereinheitlichen | Technical | Niedrig | technical.md |
| 23 | Hero-Video komprimieren/kürzen und WebM-Variante ergänzen (Prop bereits vorbereitet) | Performance | Mittel | performance.md |
| 24 | Font-Payload prüfen (~312 KB über 3 WOFF2) — ungenutzte Weights/Styles identifizieren | Performance | Niedrig | performance.md |

## Phase 4: Niedrig / Laufend

| # | Maßnahme | Kategorie | Aufwand | Quelle |
|---|---|---|---|---|
| 25 | `X-Powered-By`-Header deaktivieren (`poweredByHeader: false`) | Technical | Trivial | technical.md |
| 26 | IndexNow-Protokoll implementieren (Bing/Yandex/Naver) | Technical | Niedrig | technical.md |
| 27 | `lastModified` in `sitemap.ts` mit echten Content-Änderungsdaten befüllen | Technical | Niedrig–Mittel | sitemap.md |
| 28 | `@id`-Verbund zwischen Organization/ProfessionalService/WebSite/Article.publisher | Schema | Niedrig | schema.md |
| 29 | `areaServed."@type"` von `City` auf `AdministrativeArea` (Bezirk) / `Place` (Ortsteil) präzisieren | Schema | Niedrig | schema.md |
| 30 | Echtes Geocoding für `geo`/`GeoCoordinates` der registrierten Adresse (kein Erfinden — echter Lookup) | Schema, Local | Niedrig | schema.md, local.md |
| 31 | NAP-Zitationen bei Google Business Profile + deutschen B2B-Verzeichnissen (Das Örtliche, 11880, Gelbe Seiten, Wer-liefert-was) einreichen — nach Launch | Local | Mittel (Prozess) | local.md |
| 32 | `Review`-Schema-Nodes ergänzen, sobald mehr echte Bewertungen über die Places API vorliegen | Schema | Niedrig | schema.md, local.md |

---

## Bewusst nicht empfohlen (zur Vermeidung von Über-Optimierung)

- Kein eigenständiges `LocalBusiness`-Schema — `ProfessionalService` ist bereits ein `LocalBusiness`-Subtyp.
- Keine erfundenen Öffnungszeiten, Zertifikate, Preisspannen oder Kundenzahlen in Schema oder Content — an mehreren Stellen im Audit explizit als bereits eingehaltene Regel bestätigt.
- Keine `hreflang`-Implementierung — Seite ist korrekt einsprachig auf den Berliner Markt fokussiert.
