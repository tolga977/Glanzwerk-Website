# Vollausbau aller NEIN-Seiten auf 1.300–1.800 Wörter — Fortschritt

**Auftrag (verbindlich, User-Nachricht vom Auftraggeber, siehe Chat):** Alle 75 als "NEIN" markierten Seiten aus der Bestandstabelle auf 1.300–1.800 gerenderte Wörter bringen, mit echtem individuellem Content, ohne Kannibalisierung. A/B/C-Einstufung darf NICHT mehr als Grund gelten, eine Seite kurz zu lassen. Kein Fülltext — bei fehlender Substanz: Konkurrenz-Gap-Analyse (PutzHelden, Immo-Clean) für Themen, dann eigenständig recherchierte, sachlich korrekte Inhalte zur Suchintention. KEINE erfundenen Unternehmensfakten. Lokale Bezüge sparsam (max. 1-2 pro Seite). Keine URL-Änderungen. fitnessstudioreinigung/friedrichshain-kreuzberg: keine falschen Lokalfakten, Bezirkszuordnung nur dokumentieren. Gastronomie: keine Küchenreinigungs-Aussagen erfinden.

**Die 6 bereits fertigen Seiten (NICHT anfassen):** `/`, `/leistungen/gebaeudereinigung-berlin`, `/leistungen/bueroreinigung-berlin`, `/leistungen/praxisreinigung-berlin`, `/leistungen/kanzleireinigung-berlin`, `/leistungen/treppenhausreinigung-berlin`.

**Arbeitsweise pro Familie:** Wortzahl prüfen → Faktencheck → Human-Writing-Check → familieninterner Duplikationscheck → siteweiter Kannibalisierungscheck → `tsc --noEmit` + `npm run test` + `npm run build` → Commit → automatisch weiter. Keine Zwischenfreigaben.

## Reihenfolge und Status

### Phase 1 — 7 verbleibende Hauptleistungsseiten — ABGESCHLOSSEN (Commit f6da995)
- [x] `/leistungen/glas-und-fensterreinigung-berlin` (1466)
- [x] `/leistungen/unterhaltsreinigung-berlin` (1374)
- [x] `/leistungen/grundreinigung-berlin` (1366)
- [x] `/leistungen/gastronomiereinigung-berlin` (1314, OHNE Küchenreinigungs-Fakten erfunden)
- [x] `/leistungen/autohausreinigung-berlin` (1316)
- [x] `/leistungen/kita-und-schulreinigung-berlin` (1324)
- [x] `/leistungen/fitnessstudioreinigung-berlin` (1313)

### Phase 2 — 47 Kombiseiten (familienweise, gemeinsame Themenbank pro Familie, aber pro Bezirk unterschiedliche Auswahl/Reihenfolge)
- [ ] Gebäudereinigung (11): mitte, charlottenburg-wilmersdorf, tempelhof-schoeneberg, pankow, neukoelln, friedrichshain-kreuzberg, spandau, treptow-koepenick, reinickendorf, lichtenberg, marzahn-hellersdorf
- [x] Büroreinigung (7): mitte (1342), CW (1315), FK (1367), TS (1307), Neukölln (1306), Pankow (1317, Mischnutzung-Argument bewusst zugunsten Bezirkswachstum reduziert), ST-Z (1329, neues Hauptargument Schloßstraße-vs-Villenbüro statt "ruhig") — ABGESCHLOSSEN, Commit 3a90792
- [x] Praxisreinigung (6): steglitz-zehlendorf (1316), charlottenburg-wilmersdorf (1301), mitte (1302), marzahn-hellersdorf (1306), reinickendorf (1304), pankow (1307) — ABGESCHLOSSEN. Reinickendorf: neue Unterscheidung Hausarztpraxis vs. arbeitsmedizinische Praxis (Tegel-Gewerbegebiet). Marzahn-Hellersdorf: neue Unterscheidung Einzelpraxis vs. Gesundheitszentrum in Großwohnsiedlung.
- [x] Kanzleireinigung (3): mitte (1320), charlottenburg-wilmersdorf (1300), steglitz-zehlendorf (1310) — ABGESCHLOSSEN. ST-Z: neues Hauptargument Villenkanzlei-vs-Geschäftshaus-Schloßstraße statt "ruhig".
- [x] Treppenhausreinigung (4): pankow (1301), tempelhof-schoeneberg (1352), charlottenburg-wilmersdorf (1322), neukoelln (1309) — ABGESCHLOSSEN
- [x] Glas-/Fensterreinigung (4): charlottenburg-wilmersdorf (1303), lichtenberg (1313), mitte (1303), tempelhof-schoeneberg (1315) — ABGESCHLOSSEN
- [ ] WICHTIG gelernt (1): FAQ-Antworten ab Index 1 rendern NICHT in der SSR-HTML (Accordion, nur erstes Item offen) — zählen NICHT zum Wortzahl-Ziel. Für Wortzahl IMMER localAngle-Absätze/scopeBullets/processText/priceFactorsText nutzen, FAQ nur für Themenvielfalt/Schema.
- [ ] WICHTIG gelernt (2): Beim seitenweisen Ausbau mit wiederkehrenden Themen (IT-Geräte-Abgrenzung, Papierkorb-Hinweis, Objektübernahme-Prüfung) entstehen leicht exakte Satz-Dopplungen — auch INNERHALB derselben Seite. Nach jeder Familie `node find_dupes.js src/data/combos.ts` laufen lassen (Skript in scratchpad, sucht Strings ≥40 Zeichen, die 2+x vorkommen) und echte Dopplungen individuell umformulieren, bevor committet wird.
- [x] Unterhaltsreinigung (6): friedrichshain-kreuzberg (1320), steglitz-zehlendorf (1322), treptow-koepenick (1342), marzahn-hellersdorf (1316), lichtenberg (1313), reinickendorf (1310) — ABGESCHLOSSEN, Commit 35ee478. Neue Angles: FK = Gewerbehof-Mieterwechsel/Druckerraum/Sichtbeton; ST-Z = Aufzug-vs-Treppenhaus, Klimasplitgeraete, Aktenbibliotheken (kein "ruhig"); Treptow-Koepenick = Schichtbetrieb, Spree/Mueggelsee-Feuchtigkeit, Baualtersstufen; Marzahn-Hellersdorf = Bankfilialen/Poststellen/Gastronomie in Einkaufszentren; Lichtenberg = Serverraeume, Dachterrasse, Aufzuege, Poststellen (Neubau-Fokus, klar getrennt von Glas-/Fensterreinigung-Kombi); Reinickendorf = Buero-vs-Lager (Frachtaufzug, Gefahrstofflager, Verladerampen).
- [ ] Grundreinigung (3): neukoelln, mitte, treptow-koepenick
- [ ] Kita/Fitness/Autohaus Kombi (3): kita-pankow, fitness-friedrichshain-kreuzberg (KEINE neuen Lokalfakten!), autohaus-spandau

### Phase 3 — 12 Bezirksseiten
mitte, friedrichshain-kreuzberg, pankow, charlottenburg-wilmersdorf, spandau, steglitz-zehlendorf, tempelhof-schoeneberg, neukoelln, treptow-koepenick, marzahn-hellersdorf, lichtenberg, reinickendorf

### Phase 4 — 8 Ortsteilseiten
charlottenburg, wilmersdorf, steglitz, zehlendorf, tempelhof, schoeneberg, koepenick, rudow

## Kannibalisierungsregeln, die beim Ausbau NICHT verletzt werden dürfen (bereits etabliert, weiter einhalten)

- Gebäudereinigung × Bezirk = Bündel-Argument (mehrere Gewerke, ein Vertrag). Treppenhausreinigung × Bezirk = Einzelleistung/Auftraggeberfrage. Nicht wieder vermischen.
- Autohausreinigung/Spandau führt das Autohaus-Thema, Gebäudereinigung/Spandau bleibt allgemein (Büro/Lager).
- Büroreinigung/CW = allgemeine Mietparteien-Koordination, Kanzleireinigung/CW = Vertraulichkeit/Mandanteneindruck/Altbau-Spezifika.
- Pankow: Treppenhausreinigung/Pankow führt das Mischnutzung-Wohnen/Gewerbe-Argument. Büroreinigung/Pankow und Praxisreinigung/Pankow dürfen es nur am Rande streifen, nicht als Hauptargument.
- Steglitz-Zehlendorf: "ruhig/diskret" ist übernutzt (4+ Seiten). Beim Ausbau JEDE ST-Z-Seite ein eigenes, anderes Hauptargument geben (nicht mehr "ruhig" wiederholen).
- Fitnessstudioreinigung/Friedrichshain-Kreuzberg: Zuordnungsfrage dokumentieren, keine neuen Lokalfakten, keine URL-Änderung.
- Bezirksseite vs. ihre Kombiseiten: beim Ausbau der Bezirksseite NICHT dieselbe Tiefe zu einzelnen Leistungen liefern wie die Kombiseiten selbst (sonst entsteht neue Kannibalisierung) — Bezirksseite bleibt Überblick über ALLE Leistungen/Zielgruppen, Kombiseite vertieft EINE Leistung.
- Ortsteilseite vs. Bezirksseite: Ortsteilseite muss einen Aspekt behandeln, der auf der Bezirksseite NICHT (mehr) im Detail steht, sonst Dopplung. Ggf. beim Ausbau der Ortsteilseite den entsprechenden Bezirksseiten-Absatz kürzen/verlagern.

## Nach jeder Phase: Wortzahl-Messmethode

`taskkill //F //IM node.exe`, `npm run build`, `npm run start -- -p <port> &`, `sleep 4`, dann `curl` je URL + Node-Wortzähl-Snippet (siehe Bash-Historie dieser Session).
