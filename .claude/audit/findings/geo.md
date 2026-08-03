# GEO-Audit: Glanzwerk Reinigungsservice Berlin (localhost:3000)

**Wichtiger Hinweis zum Kontext:** Die Seite ist nur lokal erreichbar und noch nicht live indexiert. Es gibt daher noch keine tatsächliche AI-Overview-/ChatGPT-/Perplexity-Präsenz zu messen. Diese Bewertung prüft ausschließlich die **code-seitige Vorbereitung** (technische Zugänglichkeit, Markup, Content-Struktur) — nicht reale Sichtbarkeit. Alle "Platform-Scores" unten sind daher Bereitschafts-Scores (Readiness), keine gemessenen Sichtbarkeits-Scores.

Geprüft: `src/app/robots.ts`, `src/lib/schema.ts`, `src/lib/metadata.ts`, `src/data/site.ts`, `src/data/owner.ts`, `src/data/articles.ts`, `src/components/ui/FAQ.tsx`, `src/app/wissen/[slug]/page.tsx`, Live-Fetch von `http://localhost:3000/` und `/robots.txt`, `/llms.txt`.

---

## GEO Readiness Score: 58 / 100

| Dimension | Gewicht | Score | Begründung |
|---|---|---|---|
| Citability | 25% | 55/100 | FAQPage-Schema sauber implementiert und SSR-gerendert (24 Seiten), aber Wissen-Artikel-Absätze sind mit ~30–55 Wörtern deutlich unter dem optimalen 134–167-Wort-Fenster für KI-Zitate |
| Structural Readability | 20% | 65/100 | Gute H2-Struktur in Artikeln, aber Überschriften sind meist Nominalphrasen statt Fragen (schwächer für Featured-Snippet/AIO-Extraktion) |
| Multi-Modal Content | 15% | 40/100 | Bilder vorhanden mit Alt-Texten, aber keine Video-, Tabellen- oder strukturierten Datenformate (z. B. Preisvergleichstabellen) erkennbar |
| Authority & Brand Signals | 20% | 55/100 | Namentlicher Inhaber mit Ich-Perspektive (starkes E-E-A-T-Signal), aber kein Person-Schema, kein `sameAs`, keine `datePublished`/`dateModified` in Article-Schema, keine externen Entity-Signale (da vorlaunch) |
| Technical Accessibility | 20% | 80/100 | Voll serverseitig gerendert (SSR bestätigt: Markenname 20x im rohen, ungerenderten HTML sichtbar), `robots.txt` erlaubt pauschal alle Bots — aber `llms.txt` fehlt komplett |

---

## AI-Crawler-Zugänglichkeit (robots.txt)

`src/app/robots.ts` erzeugt:
```
User-Agent: *
Allow: /
Sitemap: https://www.glanzwerkberlin.de/sitemap.xml
```

| Crawler | Status |
|---|---|
| GPTBot | ✅ erlaubt (via Wildcard `*`) |
| OAI-SearchBot | ✅ erlaubt |
| ClaudeBot | ✅ erlaubt |
| PerplexityBot | ✅ erlaubt |
| Google-Extended | ✅ erlaubt |
| CCBot / anthropic-ai / cohere-ai (Training-Bots) | ✅ ebenfalls erlaubt (kein selektiver Block) |

**Bewertung:** Keine Blockaden — gut für Sichtbarkeit. Da die Regel pauschal via `User-Agent: *` läuft, gibt es aktuell keine Möglichkeit, gezielt zwischen "AI-Search-Bots erlauben" und "reine Trainings-Crawler optional blocken" zu unterscheiden (z. B. falls man CCBot/anthropic-ai später vom Training ausschließen möchte, ohne PerplexityBot/GPTBot-Suche zu beeinträchtigen). Das ist aktuell kein Fehler, nur eine ungenutzte Feinsteuerungs-Option.

## llms.txt

**Status: Fehlt (404).** Weder `/llms.txt` noch RSL-1.0-Lizenzierung vorhanden. Da die Seite ohnehin vor dem Launch steht, ist dies der ideale Zeitpunkt, eine `llms.txt` als statische Datei unter `public/llms.txt` anzulegen (Next.js liefert alles in `public/` unverändert unter Root aus).

## Technische Zugänglichkeit (SSR vs. CSR)

Bestätigt per rohem `curl`-Fetch (ohne JS-Ausführung) gegen `http://localhost:3000/`: Der volle Markenname "Glanzwerk Reinigungsservice Berlin" erscheint bereits 20× im ungerenderten HTML. Die App ist voll serverseitig gerendert (Next.js App Router SSR) — kein SPA-Shell-Problem, KI-Crawler ohne JS-Rendering (GPTBot, ClaudeBot, PerplexityBot renderen typischerweise kein JS) sehen den vollständigen Content. Das ist eine der stärksten Grundlagen, die die Seite bereits hat.

Der `FAQ`-Client-Component (`"use client"`) rendert sein `FAQPage`-JSON-LD dennoch serverseitig mit, da Next.js Client-Components beim initialen Request SSR-t — bestätigt korrekt für Crawler-Zugriff ohne JS.

## Passage-Level-Zitierfähigkeit (Wissen-Artikel & FAQ)

- **FAQPage-Schema:** sauber implementiert in `src/components/ui/FAQ.tsx` (valides `mainEntity`/`Question`/`acceptedAnswer`-Markup), auf 24 Seiten eingesetzt (Startseite, alle Leistungsseiten, alle Bezirks-Kombinationsseiten, Wissen, Über uns etc.). Das ist eine der stärksten Grundlagen für Zero-Click-Zitate.
- **Wissen-Artikel-Absätze:** In `src/data/articles.ts` bestehen die meisten Abschnitte aus **einem einzigen Absatz mit ~30–55 Wörtern** (z. B. Artikel "Was kostet eine Gebäudereinigung in Berlin?"). Das liegt deutlich unter dem für KI-Zitate optimalen Fenster von 134–167 Wörtern. Kurze Absätze werden von LLMs zwar leicht extrahiert, liefern aber oft zu wenig eigenständigen Kontext, um als vollständige, self-contained Antwort zitiert zu werden — die Passage referenziert oft implizit den vorherigen Satz.
- **Überschriften:** Artikel-H2 sind primär Nominalphrasen ("Fläche und Bodenart", "Reinigungshäufigkeit") statt Frage-Form. Fragebasierte H2/H3 ("Wie stark beeinflusst die Fläche den Preis?") korrelieren stärker mit AIO-/Featured-Snippet-Extraktion.
- **Intro-Absätze:** Die `intro`-Felder sind gut geschrieben, beantworten die implizite Frage aber tendenziell zu allgemein/einleitend statt in den ersten 40–60 Wörtern eine direkte, zahlengestützte Antwort zu liefern.

## Autoritäts- & Markensignale

- **Markenname:** `siteConfig.name = "Glanzwerk Reinigungsservice Berlin"` ist zentral in `src/data/site.ts` definiert und wird konsistent über `buildMetadata()`, `organizationSchema()`, `professionalServiceSchema()`, `websiteSchema()`, `articleSchema()` und `serviceSchema()` referenziert — keine abweichenden Schreibweisen im Code gefunden. Das ist ein starkes Konsistenzsignal für Entity-Erkennung.
- **E-E-A-T (Named Author):** `src/data/owner.ts` enthält einen namentlichen Inhaber (Tolga Doguc) mit Ich-Perspektive-Zitat — ungewöhnlich gut für eine lokale Dienstleisterseite und ein starkes Vertrauenssignal. Wird aber **nicht** in strukturierten Daten abgebildet: kein `Person`-Schema, kein `author`-Feld mit Personenbezug in `articleSchema()` (aktuell nur `Organization` als `author`).
- **Fehlend in `articleSchema()`:** kein `datePublished`, kein `dateModified`. Freshness ist ein Signal, das AI Overviews und Perplexity für Aktualitätsbewertung nutzen — aktuell nicht vorhanden.
- **`sameAs`/externe Entity-Links:** Kein `sameAs`-Array in `organizationSchema()` (z. B. Google Business Profile, LinkedIn, Instagram). `src/lib/googleRating.ts` und `src/data/googleBusiness.ts` existieren, werden aber nicht ins Schema eingebunden.
- **Brand-Mention-Korrelation (YouTube/Reddit/Wikipedia/LinkedIn):** Nicht bewertbar/nicht anwendbar vor Launch — es gibt noch keine externen Erwähnungen, da die Seite nicht live ist. Sobald live: LinkedIn-Unternehmensprofil und Google Business Profile sollten zuerst verknüpft werden (höchste Realisierbarkeit für ein B2B-Lokalunternehmen), YouTube/Reddit sind für dieses Segment nachrangig.
- **Bewusster Schema-Verzicht:** Kommentar in `schema.ts` zeigt, dass `LocalBusiness`/`AggregateRating` absichtlich weggelassen wurden, "keine echten Reviews bisher" — sauberer, spam-freier Ansatz, sollte aber nachgezogen werden, sobald echte Bewertungen vorliegen (dann `AggregateRating` + `Review` ergänzen, nicht vorher fabrizieren).

---

## Top 5 höchste-Wirkung-Änderungen

1. **`llms.txt` unter `public/llms.txt` anlegen** (Aufwand: niedrig, ~30 Min) — Kurzbeschreibung des Unternehmens, Leistungsübersicht, Links zu Kernseiten (Leistungen, Wissen, Standorte). Da die Seite noch nicht live ist, jetzt der ideale Zeitpunkt.
2. **Artikel-Absätze in `src/data/articles.ts` auf 134–167 Wörter je Kernabsatz erweitern**, mit direkter Antwort in den ersten 40–60 Wörtern (Aufwand: mittel, pro Artikel ~30–45 Min) — erhöht Zitierwahrscheinlichkeit für AIO/ChatGPT/Perplexity signifikant, da aktuelle Absätze mit 30–55 Wörtern zu fragmentarisch sind.
3. **`datePublished`/`dateModified` zu `articleSchema()` in `src/lib/schema.ts` ergänzen** (Aufwand: niedrig, ~20 Min inkl. Datenfeld in `articles.ts`) — Freshness-Signal für AI Overviews/Perplexity.
4. **`Person`-Schema für Tolga Doguc ergänzen** (verknüpft mit `Organization` via `founder`/`employee`) und `sameAs` mit LinkedIn/Google-Business-Profil-URL in `organizationSchema()` (Aufwand: niedrig-mittel, ~1 Std., abhängig von Verfügbarkeit der Profile) — nutzt das bereits vorhandene starke E-E-A-T-Content-Signal (`owner.ts`) auch strukturiert.
5. **H2/H3-Überschriften in Wissen-Artikeln auf Frage-Form umstellen** (z. B. "Fläche und Bodenart" → "Wie stark beeinflusst die Fläche den Preis?"), (Aufwand: mittel, pro Artikel ~20 Min) — erhöht Trefferquote bei Frage-basierten AIO-/ChatGPT-Prompts, die die häufigste Abfrageform sind.

---

## Platform-spezifische Readiness-Scores (Bereitschaft, nicht gemessene Sichtbarkeit)

| Plattform | Readiness-Score | Begründung |
|---|---|---|
| Google AI Overviews | 60/100 | FAQPage-Schema + SSR sind stark; fehlende Frage-Überschriften und kurze Absätze bremsen Extraktion |
| ChatGPT / OAI-SearchBot | 55/100 | robots.txt offen, aber `llms.txt` fehlt und Passagen sind zu kurz für saubere Zitate |
| Perplexity | 55/100 | Gleiche Faktoren wie ChatGPT; Perplexity gewichtet Freshness stark — fehlende `dateModified` ist hier besonders relevant |
| Bing Copilot | 55/100 | Profitiert von sauberem Organization-Schema und SSR, aber fehlenden Autoritätssignalen (sameAs, Reviews) |

*Hinweis: Da die Seite nicht live/indexiert ist, sind dies reine Code-Readiness-Einschätzungen, keine Messwerte aus tatsächlichem AI-Traffic oder Citation-Tracking.*

---

## Positiv hervorzuheben (bereits gut vorbereitet)

- Vollständiges SSR ohne CSR-Abhängigkeit — beste technische Grundlage, die eine Seite für KI-Crawler haben kann.
- `robots.txt` blockiert keinen relevanten AI-Search-Crawler.
- FAQPage-JSON-LD korrekt implementiert und breit ausgerollt (24 Seiten).
- Zentrale, konsistente Markennamens-Quelle (`siteConfig.name`) ohne Abweichungen im Code.
- Ungewöhnlich starkes namentliches E-E-A-T-Signal (Inhaber mit Foto-Vorbereitung und Ich-Zitat) für eine lokale B2B-Dienstleisterseite — muss nur noch strukturiert (Schema) nachgezogen werden.
- Bewusster Verzicht auf fabrizierte Bewertungen/LocalBusiness-Schema, bis echte Daten vorliegen — vermeidet Spam-Signale.
