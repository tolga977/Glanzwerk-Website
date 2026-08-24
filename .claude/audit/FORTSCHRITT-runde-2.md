# Fortschritt SEO-Redaktionsrunde 2 — laufend aktualisiert

**Zweck:** Wird bei jedem Nutzungslimit-Abbruch aktualisiert, damit die nächste Sitzung ohne Rückfrage exakt weiterarbeiten kann. Immer zuerst `git log --oneline -15`, `git status`, `git diff` prüfen — der Commit-Verlauf ist die Wahrheit, diese Datei nur die Landkarte dazu.

Verbindliche Grundlage weiterhin: `.claude/redaktion-regeln.md` + `.claude/redaktion-masterprompt.md` (Teil 1 + Teil 2, keine Zwischenfreigaben). Bestätigter Faktenstand: 24h ist Melde-, nicht Nachbesserungsfrist (bereits umgesetzt, seither bei jeder neuen FAQ/Aussage beachten).

Referenz-Audits (nur lesen, nicht mehr verändern, aber wertvoller Befund-Fundus): `.claude/audit/redaktion-audit-2026-08-23.md`, `.claude/audit/entscheidungsanalyse-duenne-urls-2026-08-23.md`, `.claude/audit/pilotplan-treppenhausreinigung-2026-08-23.md`.

## Fertig und committed (chronologisch, NICHTS davon erneut bearbeiten)

1. `7954169` — 24h-Fakt korrigiert (isoliert)
2. `8cafa68` + `36c9ba7` — Treppenhausreinigung-Familie komplett (Hauptseite + 4 Kombiseiten, 1.300–1.800 W)
3. `45b44d3` — Glas- und Fensterreinigung-Familie komplett (Hauptseite + 4 Kombiseiten)
4. `968ee31` — Trio Startseite/Reinigungsfirma-Berlin/Gebäudereinigung-Berlin entkoppelt:
   - Reinigungsfirma Berlin: 285 → ~900 gerenderte Wörter, Dopplung zu `/wissen/reinigungsdienstleister-auswaehlen` behoben (Kriterien kompaktiert + Verweis), neue Abschnitte (Eigenes Personal vs. Dienstleister, Arbeitsweise, Portfolio, Einsatzgebiet), FAQ 4→8.
   - Startseite: Meta-Title/-Description differenziert von `/leistungen/gebaeudereinigung-berlin` (H1 bewusst unverändert — expliziter, im Code dokumentierter Bestandsschutz, siehe Kommentar in `seoHeadings.ts` bei `"/"`).
   - Gebäudereinigung-Klon-Cluster (CW/Tempelhof-Schöneberg/Neukölln, vorher 85–89 % Textgleichheit) aufgelöst: je eigenes Bündel-Argument aus echten Bezirksfakten. Alle 4 Gebäudereinigung-Bezirkskombis verlinken jetzt zur passenden Treppenhausreinigung-Kombiseite. Gebäudereinigung-Hauptseite verlinkt im Einsatzgebiet auf alle 11 eigenen Kombiseiten statt pauschal auf `/standorte/{bezirk}`.
5. `64ac817` — Mad-Libs-H2[1-3]+CTA auf allen 12 `/standorte/{bezirk}`-Seiten durch echte, aus `districts.ts` audiences/featuredServiceSlugs abgeleitete Formulierungen ersetzt (Audit P1-8). Der bereits gute Fließtext (localContext etc.) blieb unverändert.
6. `3561e82` — Mad-Libs-H2[1]+CTA auf allen 8 Ortsteilseiten ebenso ersetzt (Audit P1-6). Architektur-Hinweis dokumentiert: 7 von 8 Ortsteilnamen stecken bereits im Bezirksnamen → Kannibalisierungsrisiko, Konsolidierung wäre Architekturentscheidung des Betreibers, NICHT selbst umgesetzt.
7. `73d0f14` — Unterhaltsreinigung-Familie: Hauptseite ausgebaut (services.ts-Felder challenges/audiences/benefits sichtbar gemacht, fehlende Nachbesserungs-FAQ ergänzt, Einsatzgebiet verlinkt eigene 6 Kombis). Die 6 Kombiseiten bewusst NICHT aufgebläht (Unterhaltsreinigung ist laut Entscheidungsanalyse objekt-, nicht ortsabhängig, keine A-Wertung) — nur die Auto-FAQ-Dopplung (P1-4) durch echtes `combo.faq` ersetzt.

## ERLEDIGT — Praxisreinigung-Familie (Audit-Rang 4) — Commit `3be15fc`, NICHT erneut bearbeiten
Hauptseite: 2 fehlende FAQ aus services.ts ergänzt (Personalausfall, Nachbesserung). Kombis: `mitte` voll ausgebaut (A), `steglitz-zehlendorf` moderat ausgebaut mit Praxisdichte-Winkel (B), `pankow` nur Intro umgestellt + FAQ (B, Kollisionsrisiko mit bueroreinigung/pankow + treppenhausreinigung/pankow bewusst vermieden), `marzahn-hellersdorf`+`reinickendorf` unverändert (C, Thin-Risiko dokumentiert).

## ERLEDIGT — Büroreinigung-Familie (Audit-Rang 7) — Commit `78efb9d`, NICHT erneut bearbeiten
Hauptseite: 2 fehlende FAQ ergänzt (Zutritt/Schlüssel, Nachbesserung). `friedrichshain-kreuzberg` voll ausgebaut (A). `charlottenburg-wilmersdorf` gegen `kanzleireinigung-berlin/charlottenburg-wilmersdorf` abgegrenzt (beide nutzten identisches "Mandanten"-Vokabular — Büro führt jetzt Mietparteien-Koordination, Kanzlei behält Vertraulichkeit). `tempelhof-schoeneberg` + `neukoelln` moderat ausgebaut. `steglitz-zehlendorf` unverändert (C, Thin-Risiko). `mitte`+`pankow` waren bereits Klasse A, nicht angefasst.

## ERLEDIGT — Kanzleireinigung-Familie (Audit-Rang 8) — Commit `346a14e`, NICHT erneut bearbeiten
Hauptseite: 2 fehlende FAQ ergänzt (Vertraulichkeitsvereinbarung, Nachbesserung). `mitte` inhaltlich neu begründet (Kanzleidichte Regierungsviertel + Vertraulichkeit). `charlottenburg-wilmersdorf` um echte Altbau-Spezifika (Parkett/Stuck/Kastenfenster) ergänzt und klar von `bueroreinigung-berlin/charlottenburg-wilmersdorf` abgegrenzt. `steglitz-zehlendorf` unverändert (C, Thin-Risiko).

## ERLEDIGT — Grundreinigung-Familie (Audit-Rang 9) — Commit `9baa514`, NICHT erneut bearbeiten
Hauptseite: Intro um dritten Problemaspekt ergänzt (sauberer Ausgangspunkt für neuen Rhythmus), 2 FAQ ergänzt (Bauendreinigung-Abgrenzung, Nachbesserung). Alle 3 Kombis (mitte/neukoelln/treptow-koepenick, alle C) bewusst NICHT lokal ausgebaut — nur Auto-FAQ-Dopplung durch je 2 echte, generische FAQ ersetzt.

## ERLEDIGT — Kita-/Schulreinigung + Fitnessstudioreinigung (Audit-Rang 10) — Commit `23dd972`, NICHT erneut bearbeiten
Beide Hauptseiten laufen über das generische Template, das bereits alle services.ts-Felder ausspielt — unverändert gelassen. `kita-und-schulreinigung-berlin/pankow` (A) voll ausgebaut. `fitnessstudioreinigung-berlin/friedrichshain-kreuzberg` (C) nur FAQ-Dopplung behoben; Befund "steht im falschen Bezirk" für Abschlussbericht notiert.

## ERLEDIGT — Autohausreinigung (Commit `671e50d`) + Gastronomiereinigung (Commit `2c68864`) — Audit-Rang 12/13, NICHT erneut bearbeiten

**Damit sind ALLE 12 Leistungsfamilien und alle ihre Kombiseiten durchgearbeitet.** Übersicht aller Familien-Commits: `8cafa68`+`36c9ba7` Treppenhaus, `45b44d3` Glas/Fenster, `968ee31` Gebäudereinigung, `73d0f14` Unterhalt, `3be15fc` Praxis, `78efb9d` Büro, `346a14e` Kanzlei, `9baa514` Grundreinigung, `23dd972` Kita/Fitness, `671e50d` Autohaus, `2c68864` Gastronomie. Plus `64ac817` (12 Bezirksseiten) und `3561e82` (8 Ortsteilseiten) und `968ee31` (Trio Startseite/Reinigungsfirma/Gebäudereinigung).

**Wichtiger offener Befund für Abschlussbericht (aus Gastronomie-Commit):** `services.ts`-Eintrag `gastronomiereinigung-berlin` widerspricht der vorsichtigeren, tatsächlich gerenderten Seite bei der Küchenreinigung (Seite: nur auf ausdrückliche Vereinbarung; services.ts: als Standardaufgabe beschrieben, inkl. "Beides ist möglich"-FAQ). NICHT selbst angeglichen — vor Veröffentlichung mit Betreiber klären, welche Fassung aktuell korrekt ist.

## ERLEDIGT — Wissen-Artikel (Commit `701d611`) — Rechenbeispiel bei was-kostet-gebaeudereinigung ergänzt, restliche 8 bewusst unverändert (bereits substanziell, keine Fülltexte ergänzt).

## ERLEDIGT — ueber-uns/umwelt-verantwortung/3-monate-testen/bewertungen — geprüft, KEINE Änderung nötig
Alle vier bereits in gutem Zustand laut Audit bzw. durch expliziten Code-Kommentar als bewusst vorsichtig/bewusst leer gekennzeichnet (`3-monate-testen`: Vertragsmechanik-Formulierung braucht rechtliche Bestätigung des Betreibers vor Veröffentlichung, nicht selbst geändert; `bewertungen`: bewusst live-Daten-getrieben statt statischem Text). Keine Commits nötig.

## STATUS: ABGESCHLOSSEN (2026-08-24)

Finale Wortzahlmessung durchgeführt (Methode: build + start + curl + Node-Wortzähler, Zahlen inkl. sitewide Navigation/Footer):
Homepage 1745 · Reinigungsfirma-Berlin 900 · Gebäudereinigung-Hauptseite 1532 · Büroreinigung 1508 · Kanzleireinigung 1589 · Praxisreinigung 1509 · Treppenhausreinigung 1470 · Glas-/Fensterreinigung 1196 · Unterhaltsreinigung 887 · Grundreinigung 760 · Autohausreinigung 721 · Gastronomiereinigung 759.
Grundreinigung/Autohaus/Gastronomie/Unterhalt bleiben bewusst unter 1.300 W — kein Fülltext ergänzt, siehe Abschlussbericht für Begründung je Seite.

Vollständiger Abschlussbericht wurde dem Nutzer im Chat übergeben. **Falls diese Datei bei einer zukünftigen Sitzung noch gelesen wird: die Redaktionsrunde ist fachlich abgeschlossen.** Nur bei explizitem neuen Auftrag des Nutzers (z. B. "baue die Klasse-C-Kombiseiten doch aus" oder "kläre die Gastronomie-Fakten") hier weiterarbeiten — nicht von selbst erneut alle Familien durchgehen.

## ALT — Platzhalter aus einer früheren Version dieser Datei, nicht mehr relevant

NÄCHSTER SCHRITT beim Fortsetzen — Finale Phase: sitewide Re-Audit + Abschlussbericht

**Alle Leistungsfamilien, alle Bezirks-/Ortsteilseiten, das Trio, die Wissen-Artikel und die vier Solo-Seiten sind jetzt bearbeitet.** Es fehlt nur noch:
1. Finale Wortzahlmessung aller in dieser Runde bearbeiteten Hauptleistungsseiten + Trio (Methode: `npm run build`, dann `npm run start -- -p <port>` im Hintergrund, dann `curl` + Node-Snippet zum Wortzählen aus dem gerenderten HTML-Body — siehe Bash-Historie dieser Sitzung für das genaue Snippet).
2. Kurzer Kannibalisierungs-Check der in dieser Runde neu verlinkten/abgegrenzten Paare (Büro↔Kanzlei CW, Gebäude↔Autohaus Spandau, Gebäude↔Treppenhaus alle 4 Bezirke) — stichprobenartig die betroffenen Seiten gegenlesen.
3. Vollständiger Abschlussbericht nach Regel §19 / Masterprompt "ABSCHLUSSBERICHT" schreiben und dem Nutzer vorlegen — das ist der Abschluss der gesamten Redaktionsrunde. NICHT erneut mit einer Familie von vorne anfangen.

**WICHTIG:** Wenn diese Datei bei einem erneuten Abbruch noch diesen Abschnitt als "nächsten Schritt" zeigt, bedeutet das: nur noch Messen + Bericht schreiben, keine weiteren Content-Änderungen mehr nötig, außer neue Fehler werden beim Re-Audit gefunden.

## ALT — nicht mehr aktuell, nur zur Historie

NÄCHSTER SCHRITT beim Fortsetzen — Wissen-Artikel (9 Stück, 159–283 W)

Noch nicht begonnen. Dateien: `src/data/articles.ts` (Content-Datenquelle), gerendert über `src/app/wissen/[slug]/page.tsx` (generisches Template, rendert `article.sections[].paragraphs` — das Feld erlaubt laut Code-Kommentar in `articles.ts` mehrere Absätze pro Abschnitt, wird aber laut Hauptaudit P2-14 überall nur mit einem einzigen Absatz befüllt). Vorgehen:
1. `articles.ts` komplett lesen (9 Artikel), gegen die jeweils verlinkten Leistungsseiten/Wissen-Nachbarartikel auf Dopplung prüfen (relatedServiceSlugs, ähnliche Themen zwischen Artikeln).
2. Nur wo ein Abschnitt echten zusätzlichen Sachinhalt tragen kann (nicht nur Wortzahl), einen zweiten Absatz ergänzen — Beispiel-Ansatzpunkt aus dem Hauptaudit: `/wissen/was-kostet-gebaeudereinigung` (242 W) gegen den SXO-Befund "Seitentyp-Mismatch bei Gebäudereinigung Preis" aus einem früheren Audit — dort fehlt vermutlich eine konkretere Preisspannen-Erklärung.
3. `/wissen/reinigungsdienstleister-auswaehlen` und `/wissen/objektbesichtigung-vorbereiten` NICHT anfassen ohne Grund — ersterer ist bereits die Referenz für `/reinigungsfirma-berlin` (siehe Commit `968ee31`), zweiterer laut Audit inhaltlich stark.
4. `/wissen/nachhaltige-gebaeudereinigung` laut Hauptaudit "redaktionell die stärkste Seite überhaupt" — NICHT anfassen.
5. Keine Fülltexte, keine erfundenen Fakten. Wenn kein echter Mehrwert ergänzbar ist: Artikel unverändert lassen, im Abschlussbericht kurz vermerken.

## Danach in dieser Reihenfolge (noch nicht begonnen)
1. `ueber-uns`, `umwelt-verantwortung`, `3-monate-testen`, `bewertungen` — laut Audit bereits stark bzw. bewusst leer (`bewertungen`), nur bei konkretem Anlass anfassen. Kurz gegenlesen, ob seit dem 2026-08-23-Audit noch aktuell.
2. Abschließend: sitewide Re-Audit — alle geänderten Wortzahlen nachmessen (Muster: `npm run build` + `npm run start -- -p <port>` + `curl` + Node-Wortzähl-Snippet, siehe frühere Kommentare in dieser Datei-Historie/Commits), Kannibalisierungsmatrix neu durchgehen, interne Links stichprobenartig prüfen, `npx tsc --noEmit` + `npm run test -- --run` + `npm run build` ein letztes Mal, dann vollständiger Abschlussbericht nach Regel §19 / Masterprompt-Abschnitt "ABSCHLUSSBERICHT" (Format: Anzahl bearbeiteter Seiten, vollständige URL-Liste, Wortzahlen, Keywords, Suchintentionen, Schwerpunkte, wichtigste Änderungen, Kannibalisierungscheck-Ergebnis, Duplikationscheck-Ergebnis, offene Faktenfragen — siehe Liste unten —, bewusst nicht veränderte Seiten mit Begründung, Testergebnisse, Build-Ergebnis, verbleibende Risiken).

## Bekannte offene Fakten-/Architekturfragen (nicht selbst entscheiden, im Abschlussbericht sammeln)

- Alle als "C" markierten Kombiseiten (siehe familienweise Listen oben und `entscheidungsanalyse-duenne-urls-2026-08-23.md`) sowie 7 von 8 Ortsteilseiten bleiben Thin-/Doorway-/Kannibalisierungsrisiken. Konsolidierung (Löschen/Zusammenlegen/Redirect) wäre eine URL-Architekturentscheidung des Betreibers — Regel §16 verbietet mir das selbstständig.
- Gastronomiereinigung: Faktenprüfung Leistungsumfang/Küchenmittel weiterhin offen (seit Juli 2026, siehe Hauptaudit F6) — vor Veröffentlichung mit Betreiber klären.
- Diverse Einzelfakten aus Hauptaudit Abschnitt 10 (F1–F9): Umland-Aussage (Potsdam/Schönefeld), Reaktionszeit (2h), Versicherungssumme/-gesellschaft — weiterhin nur wiederverwendet, nicht neu erfunden oder verifiziert.
- `fitnessstudioreinigung-berlin/friedrichshain-kreuzberg` steht im falschen Bezirk (siehe oben) — Korrektur wäre neue URL, nicht selbst umgesetzt.

## Nach jeder fertigen Familie immer (Reihenfolge einhalten)

1. `npx tsc --noEmit` — muss sauber sein.
2. `npm run test -- --run` — Ziel: alle Tests grün (Stand zuletzt: 697/697).
3. `npm run build` — Ziel: alle 109 Seiten generieren sich ohne Fehler.
4. `git add` NUR der tatsächlich bearbeiteten Dateien — NICHT `src/data/heroBrandLogos.ts` committen (das ist eine unabhängige, nicht von dieser Redaktionsrunde stammende Änderung des Nutzers; unangetastet lassen, siehe `git status` — sie zeigt sich immer als "M" ohne dass ich sie berührt habe).
5. Commit mit aussagekräftiger Nachricht (Problem/Änderung/Begründung, wie in den bisherigen 7 Commits) und `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
6. Diese Datei aktualisieren: erledigten Punkt in Abschnitt "Fertig und committed" verschieben, "NÄCHSTER SCHRITT" auf die neue Abbruch-/Fortsetzungsstelle setzen.
