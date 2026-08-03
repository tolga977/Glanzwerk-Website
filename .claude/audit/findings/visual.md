# Visuelle SEO-Analyse — glanzwerk-berlin-website-original (localhost:3000)

**Datum:** 2026-08-01
**Basis:** Screenshots aus `.claude/audit/screenshots/` (erstellt 01.08.2026, 23:37–23:39 Uhr), entstanden **nach** dem letzten Commit `309f02b` (23:12 Uhr) — Screenshots sind aktuell zum jetzigen Code-Stand und wurden **wiederverwendet**, keine Neuaufnahme nötig.

Geprüfte Seiten: Startseite (home / home-novideo), Büroreinigung (Leistungsseite), Kontakt, Standort Mitte — jeweils Desktop (1920×1080, Fold + Full) und Mobile (375×812, Fold + Full).

Hinweis zur Testumgebung: In allen Mobile-Fold-Screenshots erscheint unten links ein schwarzer Kreis mit "N" (Next.js Dev-Tools-Indikator) sowie bei einem Screenshot ein "Compiling…"-Badge. Das ist ein reines Next.js-Dev-Mode-Artefakt und existiert in Production nicht — hier ignoriert, aber zur Vorsicht notiert, falls es mit einem echten UI-Element (z. B. Chat-Widget) an derselben Stelle kollidieren würde.

---

## 1. Startseite (/)

### Above the Fold — Desktop
- H1 "Gebäudereinigung Berlin" sofort lesbar, großzügige Typografie, guter Kontrast auf dunklem Hero-Bild.
- Sub-Headline benennt Zielgruppe und Leistung explizit: "Unterhaltsreinigung für Büros, Praxen, Kanzleien, Autohäuser und weitere Gewerbeobjekte — in ganz Berlin." → Angebot und Zielgruppe sind **sofort und eindeutig klar** (B2B, Berlin, Unterhaltsreinigung).
- Zwei CTAs klar hierarchisiert: "Preis schätzen" (gefüllt, primäre Farbe) vs. "Angebot anfragen" (Outline, sekundär) — gute visuelle Priorisierung.
- Google-Bewertungs-Badge (5,0 ★, 7 Rezensionen) direkt unter den CTAs schafft Trust ohne Ablenkung vom CTA.
- Trust-Leiste am unteren Fold-Rand (3 Monate ohne automatische Verlängerung / 5 Mio. € Betriebshaftpflicht / Antwort innerhalb von 2 Stunden) — starke B2B-Vertrauenssignale, alle drei ohne Scroll sichtbar.
- Vergleich home vs. home-novideo: identisches Layout, nur unterschiedliches Hero-Bild/Frame (Video-Hintergrund vs. statisches erstes Frame). Keine Positionsverschiebung von H1/CTA zwischen den Varianten erkennbar → geringes Risiko für Layout-Shift beim Video-Start.

### Above the Fold — Mobile
- H1 und Sub-Headline vollständig lesbar ohne Scrollen, Schriftgröße wirkt ≥16px für Fließtext.
- Beide CTA-Buttons sind komplett sichtbar und full-width, Tap-Ziel-Höhe wirkt komfortabel (≥48px).
- Google-Badge ebenfalls im Fold sichtbar.
- Trust-Leiste unten wird nur zur Hälfte angeschnitten (erster Punkt teilweise verdeckt durch Dev-Overlay) — in Production vermutlich per Scroll erreichbar, kein Blocker.
- Mobile-Header ist schlank (Logo + Telefon-Icon + Hamburger) — Tap-to-Call ist ohne Menü-Öffnung erreichbar, gut für Conversion.

**Bewertung Startseite:** Sehr klare Above-the-Fold-Kommunikation, starke CTA-Hierarchie, gutes Vertrauenssignal-Placement. Keine Layout-Probleme erkennbar.

---

## 2. Büroreinigung (Leistungsseite)

### Above the Fold — Desktop
- Breadcrumb (Startseite / Leistungen / Büroreinigung) vorhanden — gut für Orientierung/SEO.
- Kicker-Badge "Büroreinigung für Unternehmen in ganz Berlin" + H1 "Büroreinigung Berlin mit festen Abläufen und abgestimmten Reinigungszeiten" → Thema und Ort sofort klar, Value Proposition (feste Abläufe, abgestimmte Zeiten) kommuniziert Zuverlässigkeit.
- Fließtext ist mit 5 Zeilen etwas lang für den Hero-Bereich, bleibt aber vollständig im Fold sichtbar.
- Zwei CTAs vorhanden ("Unverbindliches Angebot anfragen" / "Preis kostenlos berechnen"), aber Reihenfolge/Wortlaut weicht von der Startseite ab (dort "Preis schätzen" / "Angebot anfragen" in umgekehrter Priorität). Keine Fehlfunktion, aber leichte Inkonsistenz im CTA-Wording zwischen Seiten — evtl. für Wiedererkennbarkeit vereinheitlichen.
- Trust-Icon-Reihe (Flexible Reinigungszeiten / Fester Ansprechpartner / Einsatz in allen zwölf Berliner Bezirken) wird am unteren Fold-Rand angeschnitten — natürlicher Scroll-Hinweis, kein Problem.

### Above the Fold — Mobile
- Breadcrumb, Badge, H1, Text und der erste CTA-Button ("Unverbindliches Angebot anfragen") sind im Fold sichtbar, der zweite Button liegt knapp unterhalb.
- H1 bricht auf 4 Zeilen um — noch gut lesbar, aber der Hero nimmt viel vertikalen Platz ein, bevor der zweite CTA sichtbar wird. Nutzer mit kleinerem Viewport (z.B. iPhone SE) könnten hier nur einen CTA sehen müssen scrollen für den zweiten.

**Bewertung Büroreinigung:** Above-the-Fold klar und lokal relevant (Berlin + Leistungsart im H1). Leichtes Verbesserungspotenzial: CTA-Wording-Konsistenz zur Startseite, mobiler Hero etwas textlastig.

---

## 3. Kontakt

### Above the Fold — Desktop
- H1 "Glanzwerk Reinigungsservice Berlin kontaktieren" plus erklärender Text klar formuliert.
- Formular (Name, Unternehmen, E-Mail, Telefon, Art des Objekts, Anliegen) beginnt direkt im Fold, wirkt vertrauenswürdig durch klare Feldbeschriftung und Pflichtfeld-Markierung (*).
- Rechts: Handshake-Bild (professionell, passend zum B2B-Kontext) + dunkler Kasten "Direkt erreichbar" mit Telefon, E-Mail, Adresse — gute Alternative für Nutzer, die nicht das Formular nutzen wollen.
- **Kein sichtbarer Submit-Button im Fold** — der Formular-Button liegt unterhalb des sichtbaren Bereichs. Das ist bei einem mehrfeldrigen Formular normal, aber es gibt oberhalb des Folds keinen sekundären "Jetzt anrufen"-CTA-Button (nur reine Textangabe der Telefonnummer im Sidebar-Kasten) — ein klickbarer `tel:`-Button direkt im Sichtbereich könnte die Conversion für eilige Besucher verbessern.

### Above the Fold — Mobile
- H1, Intro-Text und die ersten zwei Formularfelder (Name, Unternehmen) sind sichtbar.
- Kein CTA-Button und keine Kontaktdaten (Telefon/E-Mail) im mobilen Fold sichtbar — Nutzer muss erst scrollen, um zu sehen, dass es alternative Kontaktwege gibt. Das Telefon-Icon im Header ist die einzige sofort erreichbare Tap-to-Call-Option, das ist aber unauffällig (kleines Icon oben rechts).
- Das lange Formular bedeutet auf Mobile viel Scroll-Aufwand, bevor Sidebar-Kontaktkarte oder Submit-Button erreicht werden.

**Bewertung Kontakt:** Above-the-Fold-Klarheit gut (Zweck der Seite ist sofort erkennbar), aber die Conversion-Unterstützung im ersten Sichtbereich ist auf Mobile schwächer als auf anderen Seiten — kein direkter CTA/Telefonlink sofort sichtbar, nur Formularanfang.

---

## 4. Standort Mitte (Local-SEO-Seite)

### Above the Fold — Desktop
- Breadcrumb (Startseite / Standorte / Mitte) korrekt.
- H1 "Reinigungsservice für Unternehmen in Berlin-Mitte" mit farblich hervorgehobenem "Berlin-Mitte" — gutes Local-SEO-Signal, sofort erkennbar für wen/wo.
- Hero-Bild zeigt das Brandenburger Tor — thematisch stimmig und lokal eindeutig zuordenbar (kein generisches Stockfoto).
- Beschreibungstext liefert lokalen Kontext (Bürodichte, Kanzleien, Verwaltungen in Mitte) — stärkt lokale Relevanz für SEO und Nutzer gleichermaßen.
- CTAs "Preis berechnen" / "Angebot anfragen" beide vollständig im Fold sichtbar, konsistent mit Startseiten-Wording.

### Above the Fold — Mobile
- H1, Beschreibungstext und beide CTA-Buttons sind vollständig innerhalb des Folds sichtbar — best-in-class im Vergleich zu den anderen geprüften Seiten.
- Hero-Bild bleibt erkennbar (Brandenburger Tor im Hintergrund), keine Textüberlappung mit Bilddetails.

**Bewertung Standort Mitte:** Stärkste Above-the-Fold-Performance aller getesteten Seiten — lokale Relevanz, klare CTAs, beide CTA-Buttons ohne Scroll erreichbar auf Mobile und Desktop.

---

## Layout-Shifts / abgeschnittene Inhalte

- Keine überlappenden Elemente oder abgeschnittenen Texte in den geprüften Screenshots festgestellt.
- Home vs. Home-novideo zeigt keinen erkennbaren Versatz von Text/CTA-Positionen trotz unterschiedlichem Hero-Hintergrund (Video-Frame vs. Standbild) — spricht für stabile Hero-Höhe unabhängig vom Medieninhalt.
- Trust-/Feature-Leisten werden auf mehreren Seiten am unteren Fold-Rand naturgemäß angeschnitten (kein Bug, normales Scroll-Verhalten).

## Mobile Usability — Zusammenfassung

| Seite | CTA im Fold sichtbar | Formular/Inhalt im Fold | Tap-to-Call erreichbar |
|---|---|---|---|
| Startseite | Ja, beide Buttons | — | Ja (Header-Icon) |
| Büroreinigung | Teilweise (1 von 2 Buttons) | — | Ja (Header-Icon) |
| Kontakt | Nein (kein Button im Fold) | Nur erste 2 Felder | Nur über Header-Icon |
| Standort Mitte | Ja, beide Buttons | — | Ja (Header-Icon) |

## Priorisierte Empfehlungen

1. **Kontakt (Mobile):** Direkten, klickbaren "Jetzt anrufen"-Button oder sichtbaren Telefonlink oberhalb des Formulars ergänzen, damit eilige Nutzer nicht erst durch das gesamte Formular scrollen müssen.
2. **Büroreinigung:** CTA-Wording zwischen Startseite ("Preis schätzen" / "Angebot anfragen") und Leistungsseite ("Unverbindliches Angebot anfragen" / "Preis kostenlos berechnen") vereinheitlichen für konsistentere Nutzerführung.
3. **Büroreinigung (Mobile):** Prüfen, ob der Hero-Text gekürzt werden kann, damit auch der zweite CTA-Button ohne Scrollen sichtbar wird.
4. Kein dringender Handlungsbedarf bei Startseite und Standort-Mitte — beide Above-the-Fold-Bereiche sind bereits stark (klare Zielgruppenansprache, sichtbare CTAs, gute Trust-Signale).

---
*Screenshots wiederverwendet aus vorherigem Lauf (aktuell zum Code-Stand vom 01.08.2026, Commit 309f02b). Analyse-Text neu erstellt, da beim letzten Lauf nur Bilder ohne schriftliche Auswertung erzeugt wurden.*
