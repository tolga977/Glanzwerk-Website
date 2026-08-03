# Content-Qualitäts-Audit — Glanzwerk Berlin (localhost:3000)

**Datum:** 2026-08-02
**Methode:** Budgetierte Stichprobe (curl + grep, kein Playwright-Rendering). Geprüfte Seiten:
- `/` (Homepage)
- `/leistungen/bueroreinigung-berlin` (Leistungsseite)
- `/leistungen/bueroreinigung-berlin/mitte` vs. `/leistungen/bueroreinigung-berlin/pankow` (Kombi-Seiten, Duplicate-Content-Vergleich)
- `/wissen/nachhaltige-gebaeudereinigung` (Wissen-Artikel)
- `/standorte/neukoelln/rudow` (Ortsteilseite)

> **Hinweis zur Methodik:** Wortzahlen basieren auf grob HTML-gestripptem Volltext (inkl. Nav/Footer-Boilerplate, exkl. `<script>`/JSON-LD). Reine Body-Content-Wortzahlen liegen real **niedriger** als die genannten Werte — die Thin-Content-Befunde unten sind also eher konservativ.

---

## Content Quality Score: **66/100**

Solide technische Basis (Structured Data, saubere Trust-Signale, keine erfundenen Fakten), aber uneinheitliche Content-Tiefe zwischen Kombinationsseiten und mehrere Seitentypen unter den QRG-Mindestwortzahlen.

---

## E-E-A-T Breakdown

| Faktor | Gewicht | Score | Begründung |
|---|---|---|---|
| **Experience** | 20% | 13/20 (65%) | Bezirksspezifische Formulierungen vorhanden (z.B. "Was Büroreinigung in Mitte besonders macht", "gemischt genutzte Gebäude" in Pankow), aber kein sichtbares Vor-Ort-Beweismaterial (Fotos vom eigenen Team, Fallstudien-Details) auf den Stichprobenseiten. |
| **Expertise** | 25% | 15/25 (60%) | FAQ-Blöcke mit fachlich plausiblen Antworten, technische Leistungsbeschreibungen vorhanden. Auf den geprüften Seiten kein Autoren-Byline/Credential für Wissen-Artikel gefunden — konnte in diesem Durchlauf nicht abschließend verifiziert werden (Empfehlung unten). |
| **Authoritativeness** | 25% | 14/25 (56%) | Echte Google-Bewertung (5,0/5, 7 Bewertungen) korrekt eingebunden — gut, aber kleine Fallzahl bietet wenig Autoritätssignal. Keine externen Zitate/Presseerwähnungen/Backlinks im Scan sichtbar. |
| **Trustworthiness** | 30% | 24/30 (80%) | Impressum und Datenschutz auf Homepage verlinkt, `Organization`/`PostalAddress`/`ProfessionalService` Schema korrekt gesetzt, **keine fabrizierten Zertifikate/Kundenzahlen/Testimonials gefunden** (Anti-Fabrikations-Regel wird eingehalten — Stichprobe über 6 Seiten negativ auf TÜV/ISO/"X zufriedene Kunden"/"X Jahre Erfahrung"-Muster geprüft). |

**Gewichtete Summe: 66/100**

---

## Wortzahlen vs. QRG-Mindestwerte

| Seite | Typ | Mindestwert (QRG) | Gemessen (inkl. Nav/Footer) | Bewertung |
|---|---|---|---|---|
| `/` | Homepage | 500 | ~1.627 | ✅ deutlich über Minimum |
| `/leistungen/bueroreinigung-berlin` | Leistungsseite | 800 | ~1.454 | ✅ über Minimum |
| `/leistungen/bueroreinigung-berlin/mitte` | Kombi/Location | 500–600 | ~525 | ⚠️ knapp am Minimum (real vermutlich darunter, da Nav/Footer mitgezählt) |
| `/leistungen/bueroreinigung-berlin/pankow` | Kombi/Location | 500–600 | **~280** | 🔴 **klar unter Minimum**, deutlich dünner als Mitte |
| `/wissen/nachhaltige-gebaeudereinigung` | Blog/Wissen | 1.500 | ~495 | 🔴 **weit unter Minimum** für den Blog-Typ |
| `/standorte/neukoelln/rudow` | Ortsteilseite | 500–600 | **~186** | 🔴 **deutlich unter Minimum** |

**Wichtig gegenüber QRG:** Wortzahl ist kein direkter Rankingfaktor — das eigentliche Problem ist nicht die Zahl selbst, sondern die **inhaltliche Themenabdeckung**, die bei Pankow, Rudow und dem Wissen-Artikel sichtbar lückenhaft ist (siehe unten).

---

## Duplicate-/Thin-Content-Befund: Mitte vs. Pankow

Direkter Strukturvergleich der H1/H2-Hierarchie zeigt eine **inkonsistente Sektionstiefe** zwischen den beiden Kombi-Seiten desselben Leistungstyps:

**Mitte (vollständig, 6 H2-Sektionen):**
1. Was Büroreinigung in Mitte besonders macht
2. Leistungsumfang auf einen Blick
3. So starten Sie in Mitte
4. Passende Objekte in Mitte
5. Fragen zur Büroreinigung in Berlin-Mitte
6. Büroreinigung auch in der Nähe

**Pankow (nur 3 H2-Sektionen — 3 fehlen komplett):**
1. Büroreinigung in gemischt genutzten Gebäuden *(anderer Sektionstyp als Mitte)*
2. Fragen zur Büroreinigung in Berlin-Pankow
3. Büroreinigung auch in der Nähe

Fehlend gegenüber Mitte: **"Leistungsumfang auf einen Blick"**, **"So starten Sie in [Ort]"**, **"Passende Objekte in [Ort]"**. Das ist kein reines Duplicate-Content-Risiko (die Seiten sind nicht textidentisch — Pankow hat eigenständige Formulierungen), sondern ein **Konsistenz-/Vollständigkeitsproblem**: Wenn Google/Nutzer feststellen, dass programmatisch generierte Kombi-Seiten je nach Ort unterschiedlich vollständig sind, wirkt das wie unfertiges oder maschinell inkonsistent befülltes Templating — ein klassischer Marker für schwache programmatische SEO-Qualität (siehe `seo-programmatic`-Skill für vertiefte Bewertung). Empfehlung: alle Kombi-Seiten auf denselben Sektions-Baukasten prüfen und fehlende Blöcke ergänzen oder bewusst (und einheitlich) weglassen.

---

## AI Citation Readiness Score: **72/100**

**Stärken:**
- Sauberes strukturiertes Daten-Set: `Organization`, `ProfessionalService`, `FAQPage`/`Question`/`Answer`, `Article`, `BreadcrumbList`, `WebSite`, `City`, `PostalAddress` — über Homepage, Leistungsseite und Wissen-Artikel konsistent vorhanden.
- FAQ-Blöcke mit Frage/Antwort-Paaren sind gut geeignet für direkte KI-Zitation (Answer-Engine-Extraktion).
- Klare H1→H2-Hierarchie auf den meisten Seitentypen (außer den lückenhaften Kombi-Seiten wie Pankow).

**Schwächen:**
- Dünne Seiten (Pankow, Rudow, Wissen-Artikel) liefern zu wenig extrahierbare Fakten/Zahlen für zuverlässige KI-Zitate — Answer Engines brauchen konkrete, eigenständige Aussagen pro Seite, nicht nur generische Templates.
- Keine sichtbaren Autoren-Signale (Byline, Credentials) auf dem Wissen-Artikel im Scan — reduziert Vertrauenswürdigkeit für KI-Systeme, die Autorität einbeziehen.

---

## Anti-Fabrikations-Check: ✅ bestanden

Stichprobe über alle 6 Seiten auf Muster wie "TÜV", "ISO [Nummer]", "zertifiziert nach", "X+ zufriedene Kunden", "X Jahre Erfahrung" ergab **keine Treffer** — keine erfundenen Zertifikate, Kundenzahlen oder Testimonials gefunden. Die reale Google-Bewertung (5,0/5 aus 7 Bewertungen) ist korrekt und ohne Übertreibung eingebunden. Die Projektregel wird eingehalten.

---

## Priorisierte Empfehlungen

1. **[Hoch] Pankow-Kombiseite auf Mitte-Niveau bringen** — die 3 fehlenden Sektionen ("Leistungsumfang", "So starten Sie", "Passende Objekte") ergänzen oder als bewussten schlankeren Seitentyp dokumentieren, damit die Inkonsistenz nicht wie unfertiges Templating wirkt. Stichprobe auf weitere Kombi-Seiten ausweiten (nicht nur Mitte/Pankow) — vermutlich betrifft das Muster mehr Bezirke.
2. **[Hoch] Ortsteilseiten (z.B. Rudow, ~186 Wörter) inhaltlich ausbauen** — aktuell weit unter dem 500–600-Wort-Referenzwert und vermutlich zu dünn für eigenständige thematische Abdeckung.
3. **[Mittel] Wissen-Artikel prüfen** — ~495 Wörter liegt weit unter dem Blog-Referenzwert von 1.500. Entweder Artikeltiefe erhöhen (mehr Fachdetail, konkrete Beispiele) oder Content-Typ intern als "Kurzartikel" neu einstufen statt als vollwertigen Blogpost zu behandeln.
4. **[Mittel] Autoren-/Expertise-Signale auf Wissen-Artikeln ergänzen** — sichtbare Byline mit Rolle/Erfahrung würde Expertise- und Authoritativeness-Score spürbar heben. In diesem Durchlauf nicht abschließend geprüft (Budgetgrenze) — gezielte Nachprüfung empfohlen.
5. **[Niedrig] Externe Autoritätssignale ausbauen** — z. B. Verweise auf Branchenverbände, Presseerwähnungen oder Fallstudien mit Kundennamen (sofern zulässig/freigegeben), um die Authoritativeness-Lücke (56%) zu schließen, ohne gegen die Anti-Fabrikations-Regel zu verstoßen.

---

## Limitationen dieses Audits

Aufgrund der strikten Budgetvorgabe (max. 10 Tool-Aufrufe) wurden nur 6 Einzelseiten per curl/grep geprüft, kein vollständiges Rendering (JS-Hydration, Lazy-Content) und keine flächendeckende Prüfung aller Kombinations-/Ortsteilseiten. Die Duplicate-Content- und Thin-Content-Befunde sind daher als **Stichprobenindikatoren** zu verstehen — eine vollständige Prüfung aller Leistungs-×Bezirk-Kombinationen (potenziell hunderte URLs) wird empfohlen, idealerweise über den `seo-programmatic`-Sub-Skill.
