# Audit Glanzwerk Reinigungsservice Berlin

Stand: 2026-07-18. Dieses Dokument fasst den technischen, SEO- und
Design-Zustand des Projekts zusammen — sowohl bereits in früheren
Arbeitsphasen behobene Punkte als auch neu in diesem Durchgang gefundene
Probleme. Priorisierung: **P1 = kritisch, P2 = wichtig, P3 = Verbesserung**.

Wichtiger Hinweis zur Einordnung: Ein großer Teil der in der Vorgabe
genannten Punkte (Header/Navigation, Hero, Standortseiten-Individualisierung,
Kombi-Seiten, Trust-Elemente, Preisrechner-Grundlogik, strukturierte Daten,
interne Verlinkung) wurde bereits in vorangegangenen Arbeitsphasen dieses
Projekts umgesetzt. Dieses Audit prüft diese Punkte nach, statt sie neu zu
bauen, und dokumentiert nur, was tatsächlich noch fehlt oder neu gefunden
wurde.

---

## P1 — Kritisch

### P1-1: `vitest` war nicht installiert
- **Datei(en):** `package.json`, `node_modules/`
- **Befund:** `vitest` stand als devDependency in `package.json`, war aber
  nie tatsächlich in `node_modules/.bin` installiert. `npm test` schlug
  fehl ("vitest ist entweder falsch geschrieben oder konnte nicht gefunden
  werden").
- **SEO-Effekt:** keiner direkt, aber ohne funktionierende Tests bleiben
  Regressionen im Preisrechner (dem wichtigsten Conversion-Element)
  unbemerkt.
- **Conversion-Effekt:** hoch — ein unbemerkter Rechenfehler im Preisrechner
  kann falsche Preise anzeigen und Vertrauen kosten.
- **Status:** ✅ behoben — `npm install` nachgeholt, alle 18 Tests laufen
  jetzt grün (13 bestehende + 5 neu ergänzte, siehe P2-1).

### P1-2: Build/Typecheck/Lint-Sauberkeit bestätigt
- **Befund:** `npx tsc --noEmit`, `npx next build` und `npm run lint`
  liefen alle ohne Fehler oder Warnungen.
- **Status:** ✅ verifiziert, keine Änderung nötig.

---

## P2 — Wichtig

### P2-1: Fehlende benannte Testfälle im Preisrechner
- **Datei:** `src/lib/pricing/calculate.test.ts`
- **Befund:** Die in der Vorgabe genannten konkreten Testszenarien (Praxis
  300 m²/5×Woche, Büro 300 m²/1×Woche, Büro 600 m²/5×Woche, "keine Küche"
  isoliert, "viele Toiletten" isoliert) waren nicht als eigene Testfälle
  vorhanden, nur indirekt über andere Tests abgedeckt.
- **Status:** ✅ behoben — 5 neue Tests ergänzt, alle grün.

### P2-2: Objektart beeinflusst die Reinigungsgeschwindigkeit nicht
- **Datei:** `src/lib/pricing/config.ts`, `src/lib/pricing/calculate.ts`
- **Befund:** Die Vorgabe verlangt "höheren Aufwand für Praxen, Kitas und
  Sanitärbereiche". Der aktuelle Rechner nutzt für alle flächenbasierten
  Objektarten (Büro, Arztpraxis, Kanzlei, Fitnessstudio, Autohaus, Kita,
  sonstige) denselben Wert (155 m²/h) und unterscheidet nur nach Fläche,
  Küchen, Toiletten und Häufigkeit — nicht nach Objektart selbst.
- **Warum nicht automatisch geändert:** Das ist eine echte
  Preislogik-Änderung mit finanzieller Wirkung für Glanzwerk. Der bestehende
  Rechner ist in sich konsistent, monoton und liefert plausible Werte — eine
  Änderung sollte nicht ungefragt am Kern der Preisformel vorgenommen
  werden.
- **Empfehlung:** Optionalen Objektart-Faktor einführen (z. B. Praxis/Kita
  ×1,1–1,15 auf die Reinigungszeit), aber erst nach Rücksprache, da dies
  reale Endpreise verändert.
- **Status:** offen, bewusst nicht umgesetzt — Rückfrage nötig.

### P2-3: `LoadingSkeleton.tsx` ist tote Code
- **Datei:** `src/components/ui/LoadingSkeleton.tsx`
- **Befund:** Komponente existiert, wird aber nirgends im Projekt
  importiert oder gerendert. Da die Seite vollständig statisch generiert
  wird (SSG), gibt es aktuell keinen client-seitigen Ladezustand, der sie
  bräuchte.
- **SEO-/Conversion-Effekt:** keiner (nicht gerendert), aber unnötiger
  Code, der Wartungsaufwand ohne Nutzen erzeugt.
- **Empfehlung:** entweder entfernen oder für den Preisrechner-Zwischenschritt
  einsetzen. Bewusst nicht automatisch gelöscht, um keine möglicherweise
  gewollte Vorarbeit zu zerstören.
- **Status:** offen, geringe Priorität.

### P2-4: Schema-Erzeugung nicht vollständig zentralisiert
- **Dateien:** `src/lib/schema.ts`, `src/components/ui/Breadcrumb.tsx`,
  `src/components/ui/FAQ.tsx`
- **Befund:** Organization/WebSite/Service/Article/WebPage-Schema liegen
  zentral in `schema.ts`. BreadcrumbList- und FAQPage-Schema werden dagegen
  direkt in den jeweiligen Komponenten erzeugt. Funktioniert korrekt, ist
  aber ein Stilbruch gegenüber dem sonst zentralisierten Ansatz.
- **Status:** offen, rein stilistisch — kein SEO-Fehler, da beide Schemas
  korrekt und valide sind.

---

## P3 — Verbesserung / dokumentiert, nicht kritisch

### P3-1: Transitive npm-Sicherheitswarnung (PostCSS in Next.js)
- **Befund:** `npm audit` meldet 2 moderate Schwachstellen in einer
  verschachtelten PostCSS-Version, die intern von Next.js 16 mitgeliefert
  wird. Der vorgeschlagene Fix (`npm audit fix --force`) würde Next.js auf
  Version 9.3.3 zurückstufen — ein massiver, nicht sinnvoller Rückschritt.
- **Empfehlung:** nicht erzwingen, stattdessen auf ein reguläres
  Next.js-Patch-Release warten, das die interne PostCSS-Version aktualisiert.
- **Status:** dokumentiert, bewusst nicht "gefixt".

### P3-2: Bereits in früheren Phasen behoben (zur Nachvollziehbarkeit)
Diese Punkte aus der Vorgabe wurden bereits in vorherigen Arbeitsschritten
dieses Projekts umgesetzt und in diesem Audit nur gegengeprüft:
- Header/Navigation reduziert (Leistungen, Standorte, Wissen, Über uns,
  Kontakt, Mehr + Preisrechner als primärer CTA)
- Vollständiges, nicht zugeschnittenes Logo in Header/Footer/Mobile-Nav
- Alle 12 Bezirke besitzen individuellen Text, FAQ und Ortsteile
- 48 individuelle Leistung×Bezirk-Kombinationsseiten (keine
  Doorway-Page-Duplikate, jede mit eigenem Text)
- Zentrale Metadaten-Helper (`buildMetadata`) mit Title/Description/
  Canonical/OG/Twitter pro Seite
- `noindex` korrekt für Impressum/Datenschutz gesetzt
- Sitemap/robots.txt konsistent, keine Widersprüche
- Barrierefreiheit: Skip-Link, Formular-Labels, Fokuszustände, Kontrast
  (Markenfarbe auf ~4,9:1 statt ~3,85:1 korrigiert)
- Keine erfundenen Bewertungen/Zertifikate/Kundenzahlen im gesamten Projekt

---

## Testergebnisse

```
Tests:      18 passed (18)
Typecheck:  0 Fehler
Build:      erfolgreich, alle Routen generiert
Lint:       0 Fehler, 0 Warnungen
```

## Risiken
- P2-2 (Objektart-Preisfaktor) verändert bei Umsetzung reale Endpreise —
  nur nach ausdrücklicher Freigabe umsetzen.
- Transitive PostCSS-Schwachstelle (P3-1) bleibt bestehen, bis Next.js ein
  Patch-Release liefert; kein unmittelbares Risiko für diese Website.

## Empfehlung für den nächsten Durchgang
1. Rückmeldung zu P2-2 (Objektart-Preisfaktor) einholen.
2. Entscheidung zu P2-3 (LoadingSkeleton behalten/entfernen).
3. Google-Search-Console-Daten einbinden, sobald die Seite live ist (echte
   Klick-/Impressionsdaten schlagen jede Annahme).
