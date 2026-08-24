# Pilotplan Treppenhausreinigung

**Datum:** 23.08.2026 · **Branch:** `seo-redaktion-runde-2` · **Regelwerk:** `.claude/redaktion-regeln.md`
**Grundlage:** `redaktion-audit-2026-08-23.md`, `entscheidungsanalyse-duenne-urls-2026-08-23.md`
**Status:** Planung. Keine Datei mit Website-Content geändert. Kein Text geschrieben oder umgeschrieben.

**Bestätigter Faktenstand (neu, ab jetzt verbindlich):**
> Beanstandungen müssen **innerhalb von 24 Stunden gemeldet** werden. Eine Zusage, dass Glanzwerk innerhalb von 24 Stunden nachbessert, ist **nicht korrekt**.

**Umfang der Familie:** 1 Hauptseite + 4 Kombiseiten + 4 berührte Bezirksseiten.

---

## Zwei Befunde, die den Plan verändern

Beide sind beim Lesen der Hauptseite aufgefallen, betreffen sitewide alle 10 eigenständigen Leistungsseiten, und beide sind für diese Familie unmittelbar relevant.

### Befund 1 — Vorhandener, geprüfter Content wird nicht ausgespielt

`TreppenhausreinigungBerlinContent.tsx` verwendet aus `services.ts` **nur** `slug`, `shortTitle` und `metaDescription`. Die redaktionellen Felder werden nicht angefasst — die Komponente definiert eigene Arrays. Dasselbe gilt für alle 10 eigenständigen Leistungsseiten (geprüft).

Für die Treppenhausreinigung heißt das konkret: Folgendes steht geschrieben und geprüft im Repository, ist aber **auf keiner Seite sichtbar**:

| Quelle | Inhalt | Wert |
|---|---|---|
| `services.ts:335` FAQ | „Kann die Reinigung über die Nebenkostenabrechnung laufen?" — Abrechnung über Verwaltung/WEG, Umlage entscheidet die Verwaltung | **Die entscheidungsrelevanteste Frage einer Hausverwaltung überhaupt** |
| `services.ts:340` FAQ | „Ist Winterdienst in der Treppenhausreinigung enthalten?" — **Nein**, keine Standardleistung | Erwartungsabgrenzung. Fehlt heute, obwohl der Abschnitt „Saisonale Einflüsse" Schnee und Streusalz nennt |
| `services.ts:345` FAQ | „Wird der Preis pro Treppenhaus oder pro Objekt berechnet?" — bei mehreren Aufgängen sinkt der Preis je Treppenhaus | Konkretes Preisargument |
| `services.ts:314` description | „Bei Objekten mit mehreren Treppenhäusern lässt sich der Aufwand pro Treppenhaus reduzieren … Das machen wir bereits bei der Angebotserstellung transparent." | Dasselbe als Fließtext |
| `services.ts:323–327` audiences | Hausverwaltungen und WEG · Gewerbeimmobilien mit mehreren Mietparteien · Gemischt genutzte Wohn- und Geschäftshäuser | **Die Zielgruppe der Leistung kommt auf der Seite nicht vor** |
| `services.ts:328–332` benefits | Abstimmung direkt mit der Hausverwaltung · reduzierter Aufwand bei mehreren Aufgängen · feste Reinigungstage | Verkaufsargumente |
| `services.ts:302–306` challenges | Unklare Zuständigkeiten zwischen mehreren Parteien · übersehene Handläufe/Briefkästen/Fensterbänke | Problemaufriss |

**Konsequenz für den Plan:** Der größte Teil dessen, was der Hauptseite fehlt, muss nicht geschrieben werden — er muss sichtbar gemacht werden. Das ist Content-Quelle **A** (vorhanden, nur neu geordnet) und deckt sich exakt mit dem Leitsatz „Bewahre gute Inhalte".

### Befund 2 — Die Hauptseite verlinkt keine einzige ihrer Kombiseiten

Der Abschnitt „Unser Einsatzgebiet" (`TreppenhausreinigungBerlinContent.tsx:433`) verlinkt alle 12 Bezirke auf `/standorte/{bezirk}` — also auf die Bezirks-Hubs, nicht auf die vier Treppenhaus-Kombiseiten. Geprüft: **alle 10 eigenständigen Leistungsseiten verlinken 0 ihrer eigenen Kombiseiten.** Das generische Template (`[slug]/page.tsx:434`) macht es richtig; beim Umbau auf eigene Komponenten ging es verloren.

Die vier Kombiseiten verlinken nach oben zur Hauptseite. Die Verlinkung ist also einseitig: Kinder → Eltern, aber nicht Eltern → Kinder.

**Konsequenz:** Die stärkste einzelne Maßnahme dieser Familie ist eine Linkzeile, kein Text.

### Korrektur meiner eigenen früheren Einschätzung

In der Entscheidungsanalyse habe ich `treppenhausreinigung/neukoelln` auf **B** herabgestuft mit der Begründung, das Preisdegressions-Argument sei „bereits auf der Hauptleistungsseite". Das war **falsch** — es steht in `services.ts`, wird aber auf der gerenderten Hauptseite nicht ausgegeben (Befund 1).

Die Einstufung bleibt trotzdem **B**, aber aus einem anderen Grund: Das Preisprinzip *gehört* auf die Hauptseite und soll dort hin. Danach hat Neukölln dieses Argument nicht mehr exklusiv und braucht einen eigenen Winkel — siehe Abschnitt B.

---

## A. Gesamtbewertung der Familie

**Die Familie ist tragfähig — sie ist die einzige, für die ich das mit Belegen sagen kann.**

Drei Merkmale, die keine andere Leistungsfamilie so hat:

1. **Auftraggeber ≠ Nutzer.** Hausverwaltung, WEG oder Eigentümer beauftragen; Bewohner, Mieter und Besucher nutzen. Daraus folgen Fragen, die es sonst nirgends auf der Website gibt: Wer beauftragt? Ist die Leistung umlagefähig? Wer gibt Zutritt? Wer meldet Mängel? Das erzwingt eine eigene redaktionelle Logik (Regel §14) und verhindert, dass wir das Büroreinigungs-Gerüst kopieren.
2. **Der Gebäudetyp bestimmt die Leistung real.** Reines Gewerbeobjekt, Altbau mit Kanzleien, gemischt genutztes Wohnhaus, Mehraufgangobjekt — das sind vier verschiedene Reinigungssituationen, nicht vier Ortsnamen. Deshalb 3 A von 4 in der Entscheidungsanalyse.
3. **Ein saisonaler Aspekt, den sonst keine Leistung hat.** Laub, Nässe, Streusalz und Splitt werden von außen hereingetragen. Der Abschnitt „Saisonale Einflüsse" auf der Hauptseite ist der inhaltlich eigenständigste Abschnitt der gesamten Leistungsfamilie.

**Die Hauptseite ist gut und wird nicht neu geschrieben.** Sie hat 9 H2 (im Zielkorridor), einen leistungsspezifischen Leistungsumfang mit 8 konkreten Flächenarten (Aufzugbereiche, Briefkastenanlagen, Spinnweben — nicht generisch), konkrete Intervalle, 8 FAQ und einen bereits regelkonformen Abschluss-CTA („Nennen Sie uns Standort, Anzahl der Etagen und den gewünschten Reinigungsrhythmus"). Ihr fehlt die Zielgruppe und die Abgrenzung — beides liegt fertig im Repository.

**Struktureller Vorbehalt:** Alle vier Treppenhaus-Bezirke haben **zusätzlich** eine Gebäudereinigungs-Kombiseite, und drei davon (Tempelhof-Schöneberg, Neukölln, Charlottenburg-Wilmersdorf) sind der Klon-Cluster aus dem Hauptaudit. Für zwei Paare ist die jeweils andere Seite sogar als `mostSimilarUrl` hinterlegt. Wir setzen mit dieser Familie also die Grenze, die die Gebäudereinigungs-Familie später einhalten muss — siehe Abschnitt H.

---

## B. Übersichtstabelle

| URL | A/B/C | Grad | Individueller Schwerpunkt | Wichtigste Änderung |
|---|---|---|---|---|
| `/leistungen/treppenhausreinigung-berlin` | — | **2** | **Die Leistung selbst: Umfang, Rhythmus, Saison, Material, Kosten, Grenzen** | Zielgruppe + Abgrenzung aus `services.ts` sichtbar machen; Links zu den 4 Kombis ergänzen |
| `…/tempelhof-schoeneberg` | A | **3** | **Die Hausverwaltung als Auftraggeber im Gewerbeobjekt** — Beauftragung, Zutritt, Zuständigkeit bei mehreren Mietparteien | Von 24 W auf eine eigenständige Seite ausbauen |
| `…/charlottenburg-wilmersdorf` | A | **3** | **Das Treppenhaus als Weg zur Kanzlei- und Praxistür** — Altbau-Oberflächen, Besucherverkehr, Repräsentanz | Von 27 W auf eine eigenständige Seite ausbauen |
| `…/pankow` | A | **3** | **Das geteilte Treppenhaus** — Wohnen und Gewerbe im selben Aufgang, Interessenausgleich | Von 25 W auf eine eigenständige Seite ausbauen |
| `…/neukoelln` | B | **2** | **Mehrere Aufgänge unter einer Adresse** — Objektorganisation statt Einzelaufgang | Bewusst schlanker ausbauen; schwächste Differenzierung der vier |

**Grad-Legende:** 0 = nicht ändern · 1 = kleine Anpassung · 2 = gezielter Ausbau einzelner Abschnitte · 3 = deutlicher Ausbau

**Zur Hauptseite:** Grad 2 bedeutet hier **Ergänzung ohne Umschreiben**. Kein vorhandener Absatz wird ersetzt, umformuliert oder gekürzt.

---

## C. Was ausdrücklich unverändert bleibt

**Auf der Hauptseite — nicht anfassen:**

| Element | Warum |
|---|---|
| Hero-Intro („Glanzwerk übernimmt die regelmäßige Reinigung von Treppenhäusern…") | Klar, konkret, ohne Floskel |
| Abschnitt „Ein gepflegtes Treppenhaus beginnt mit einem passenden Reinigungsplan" (2 Absätze) | Guter Problemaufriss: Straßenschmutz, Staub, Feuchtigkeit, Personenverkehr |
| Alle 8 `scopeCards` | Leistungsspezifisch statt generisch — Aufzugbereiche, Briefkastenanlagen, Spinnweben, Fensterbänke |
| Alle 4 `frequencyCards` | Konkrete Intervalle mit Begründung |
| Abschnitt „Jahreszeit und Gebäudenutzung beeinflussen den Aufwand" | **Der stärkste Abschnitt der Familie.** Laub, Nässe, Streusalz, Splitt — einzigartig auf der Website |
| Abschnitt „Bodenbeläge und Oberflächen passend behandeln" inkl. Kiehl / Dr. Schnell / Buzil | Fachlich richtig; Produktnamen sind Bestand (Regel §1) |
| Alle 4 `supplementaryCards` mit Links | Saubere Querverlinkung zu Glas, Grund, Gebäude, Unterhalt |
| `processSteps` (4 Schritte) | Kurz und konkret. **Enthält keine 24-Stunden-Aussage** — die Familie ist von dem Widerspruch nicht betroffen |
| `costFactors` (8 Punkte) | Etagenzahl und Aufzüge sind echte Treppenhaus-Faktoren |
| Alle 8 bestehenden FAQ | Werden nur ergänzt, nicht verändert |
| Abschluss-CTA-Untertitel | Bereits regelkonform nach §10 |
| H1 und alle 9 bestehenden H2 | Eindeutig, im Zielkorridor, testgeschützt |

**Auf den Kombiseiten — nicht anfassen:**
Alle vier `intro`-Absätze in `combos.ts`. Sie sind sprachlich unterschiedlich, sachlich korrekt und tragen bereits den jeweiligen Schwerpunkt im Kern. Sie werden **Ausgangspunkt** des Ausbaus, nicht sein Gegenstand.

**Auf den Bezirksseiten — keine Änderung geplant:**
`/standorte/tempelhof-schoeneberg`, `/standorte/pankow`, `/standorte/charlottenburg-wilmersdorf`, `/standorte/neukoelln` bleiben in dieser Familie unberührt. Sie kommen erst in der Bezirks-Familie an die Reihe. **Wichtig für den Ausbau:** Tempelhof-Schöneberg und Pankow nennen den jeweiligen Schwerpunkt bereits in einem Satz — die Kombiseite muss über diesen Satz *hinausgehen*, nicht ihn wiederholen.

---

## D. Geplante H2-Struktur

### D1 · Hauptseite — 9 → 11 H2 (zwei Ergänzungen, Reihenfolge bleibt)

| # | H2 | Status | Quelle |
|---|---|---|---|
| 1 | Ein gepflegtes Treppenhaus beginnt mit einem passenden Reinigungsplan | unverändert | — |
| 2 | Welche Arbeiten zur Treppenhausreinigung gehören können | unverändert | — |
| 3 | **NEU — Wer beauftragt, wer nutzt: warum das den Ablauf bestimmt** | **neu** | **A** — `services.ts` audiences + benefits + challenges |
| 4 | Wie häufig sollte ein Treppenhaus gereinigt werden? | unverändert | — |
| 5 | Jahreszeit und Gebäudenutzung beeinflussen den Aufwand | unverändert | — |
| 6 | **NEU — Wo die Treppenhausreinigung endet** | **neu** | **A** — `services.ts` FAQ Winterdienst + bestehende Verweise |
| 7 | Bodenbeläge und Oberflächen passend behandeln | unverändert | — |
| 8 | Treppenhausreinigung sinnvoll ergänzen | unverändert | — |
| 9 | So wird die Treppenhausreinigung geplant | unverändert | — |
| 10 | Wovon die Kosten der Treppenhausreinigung abhängen | **ergänzt** um Mehraufgang-Degression | **A** — `services.ts:314` + FAQ |
| 11 | Treppenhausreinigung in allen zwölf Berliner Bezirken | **ergänzt** um Links zu den 4 Kombiseiten | **A** — Links, kein Text |

**FAQ: 8 → 11.** Drei Einträge aus `services.ts` übernehmen (Nebenkostenabrechnung, Winterdienst, Preis pro Treppenhaus vs. Objekt). Die bestehenden 8 bleiben unverändert.

**Warum H2 Nr. 6 („Wo die Treppenhausreinigung endet") wichtig ist:** Der bestehende Abschnitt „Saisonale Einflüsse" spricht von Schnee, Streusalz und Splitt. Ohne die Winterdienst-Abgrenzung kann ein Leser annehmen, Winterdienst sei enthalten. `services.ts:340` sagt ausdrücklich: ist er nicht. Das ist eine Erwartungsklärung mit Vertragsrelevanz, keine Textergänzung.

### D2 · Tempelhof-Schöneberg — Schwerpunkt: Hausverwaltung als Auftraggeber

| # | H2 | Quelle |
|---|---|---|
| 1 | Im Gewerbeobjekt sind Auftraggeber und Nutzer selten dieselben | B |
| 2 | Was bei mehreren Mietparteien vorab geklärt sein sollte | B |
| 3 | Zutritt und Reinigungstage im laufenden Gebäudebetrieb | B / **C** (siehe G) |
| 4 | Welche Flächen im Gewerbeobjekt zum Treppenhaus zählen | A (Verweis auf Hauptseite, gekürzt) |
| 5 | Von der Anfrage der Verwaltung bis zum ersten Reinigungstag | B |
| 6 | Was den Aufwand in mehrstöckigen Gewerbegebäuden bestimmt | B |
| CTA | Treppenhausreinigung in Tempelhof-Schöneberg anfragen | — |

**6 substanzielle H2 + FAQ + CTA.** Bewusst nicht 8–14: Der Korridor gilt laut Regel §4/§11 für umfangreiche Landingpages. Eine lokale Kombiseite erfüllt ihre Suchintention mit 5–7 substanziellen Abschnitten vollständig; mehr wäre Auffüllen.

### D3 · Charlottenburg-Wilmersdorf — Schwerpunkt: Weg zur Kanzlei- und Praxistür

| # | H2 | Quelle |
|---|---|---|
| 1 | Der Weg zur Kanzleitür beginnt im Treppenhaus | B |
| 2 | Naturstein, Holzhandläufe und historische Fliesen im Altbau | A/B — Materialliste steht auf der Hauptseite, hier angewandt |
| 3 | Was Mandanten- und Patientenverkehr für den Rhythmus bedeutet | B |
| 4 | Eingangsbereich und Briefkastenanlage als erste Wahrnehmung | A — beide sind bereits `scopeCards` |
| 5 | Wovon der Aufwand im Altbau abhängt | B |
| CTA | Treppenhausreinigung in Charlottenburg-Wilmersdorf anfragen | — |

**Abgrenzungsregel für diese Seite:** Sie führt **nicht** das Thema Mischnutzung (gehört Pankow) und **nicht** das Thema Hausverwaltung als Auftraggeber (gehört Tempelhof-Schöneberg). Ihr Thema ist die Optik gegenüber Besuchern, die keine Bewohner sind.

### D4 · Pankow — Schwerpunkt: das geteilte Treppenhaus

| # | H2 | Quelle |
|---|---|---|
| 1 | Ein Treppenhaus, zwei Nutzungsarten | A/B — `districts.ts` localContext |
| 2 | Wer beauftragt: Eigentümergemeinschaft, Verwaltung oder Gewerbemieter | A/B — `services.ts` audiences (WEG) |
| 3 | Reinigungszeiten, die zum Wohnhaus und zum Betrieb passen | B |
| 4 | Rücksicht im laufenden Betrieb: Lautstärke, Laufwege, nasse Böden | B / **C** (siehe G) |
| 5 | Wenn nicht alle Etagen gleich genutzt werden | B |
| CTA | Treppenhausreinigung in Berlin-Pankow anfragen | — |

**Abgrenzung zu Tempelhof-Schöneberg:** Dort ist die Verwaltung ein professioneller Auftraggeber im reinen Gewerbeobjekt. Hier gibt es einen echten Interessenkonflikt zwischen Wohn- und Gewerbeparteien im selben Aufgang. Das ist nicht dieselbe Frage mit anderem Ortsnamen.

### D5 · Neukölln — Schwerpunkt: mehrere Aufgänge unter einer Adresse (bewusst schlank)

| # | H2 | Quelle |
|---|---|---|
| 1 | Mehrere Aufgänge, ein Objekt: wie ein gemeinsames Angebot zugeschnitten wird | A/B |
| 2 | Ein Reinigungstag für alle Aufgänge statt mehrerer Einzeltermine | B |
| 3 | Ein Ansprechpartner für das gesamte Objekt | A — `services.ts` benefits |
| 4 | Wo Treppenhausreinigung im Bezirk das Thema ist — und wo nicht | A/B — Kern/Rudow-Kontrast aus `districts.ts` |
| CTA | Treppenhausreinigung in Berlin-Neukölln anfragen | — |

**Offen gesagt:** Das ist die schwächste Differenzierung der vier. Sobald das Preisprinzip auf der Hauptseite steht (wo es hingehört), bleibt Neukölln die *Organisationslogik* bei mehreren Aufgängen — Taktung, ein Schlüsselsatz, ein Ansprechpartner. Das trägt eine schlanke Seite, aber keine im Umfang der anderen drei. Diese Seite soll bewusst kürzer bleiben. Wenn du sie nach dem Ausbau immer noch für zu schwach hältst, ist das ein legitimes Ergebnis des Piloten.

---

## E. Keyword- und Suchintentionsplan

| URL | Primäres Keyword | Natürliche Nebenbegriffe | Intention | Conversionziel |
|---|---|---|---|---|
| `/leistungen/treppenhausreinigung-berlin` | Treppenhausreinigung Berlin | Treppenhausreinigung Kosten · Hausverwaltung · Eigentümergemeinschaft · Eingangsbereich · Reinigungsintervall | Commercial → Transactional | Angebotsanfrage / Preisrechner |
| `…/tempelhof-schoeneberg` | Treppenhausreinigung Tempelhof-Schöneberg | Gewerbeobjekt · mehrere Mietparteien · Hausverwaltung · Zutritt | Transactional | Angebotsanfrage durch die Verwaltung |
| `…/charlottenburg-wilmersdorf` | Treppenhausreinigung Charlottenburg-Wilmersdorf | Altbau · Wohn-Geschäftshaus · Naturstein · Eingangsbereich | Transactional | Angebotsanfrage |
| `…/pankow` | Treppenhausreinigung Pankow | gemischt genutztes Gebäude · Eigentümergemeinschaft · Reinigungszeiten | Transactional | Angebotsanfrage |
| `…/neukoelln` | Treppenhausreinigung Neukölln | mehrere Aufgänge · Objektbetreuung · Reinigungstag | Transactional | Angebotsanfrage |

Keine Dichtevorgabe. Keine Ortsnamenketten. Der Bezirksname erscheint in H1, im Intro und im CTA — nicht in jeder H2.

---

## F. Interne Linkempfehlungen

**Priorität 1 — die wichtigste Einzelmaßnahme der Familie:**
Hauptseite → die 4 Kombiseiten. Heute null Links (Befund 2). Umsetzung im Abschnitt „Unser Einsatzgebiet": die vier Bezirke mit eigener Treppenhausseite auf die Kombi-URL führen, die übrigen acht weiter auf `/standorte/{bezirk}`. Das ist eine Linkzeile, kein Text.

**Priorität 2 — Abgrenzung sichtbar machen:**
Jede Kombiseite → die Gebäudereinigungs-Kombiseite desselben Bezirks, mit einem Linktext, der die Grenze benennt (sinngemäß: „Wenn neben dem Treppenhaus weitere Flächen im Objekt gereinigt werden sollen"). Existiert für alle vier Bezirke. Nutzt der Suchintention und macht die Abgrenzung aus Abschnitt H für Google wie für Nutzer lesbar.

**Priorität 3 — bestehende Sackgasse:**
`…/pankow` bekommt über die `neighborCombos`-Logik **null** Nachbar-Chips: Pankows Nachbarn (Mitte, Reinickendorf, Lichtenberg, Friedrichshain-Kreuzberg) haben alle keine Treppenhaus-Kombiseite. Die Seite ist unter ihren Geschwistern eine Sackgasse. Ohne neue URL nicht lösbar — siehe Abschnitt H, offene Entscheidung 2.

**Bereits vorhanden und ausreichend:** Kombi → Hauptseite · Kombi → Bezirksseite · Hauptseite → Glas / Grund / Gebäude / Unterhalt · Hauptseite → `/umwelt-verantwortung`.

**Optional prüfen:** Hauptseite → `/wissen/objektbesichtigung-vorbereiten` (passt zu „Anzahl der Etagen, Zugänglichkeit"). Kein Muss.

---

## G. Wofür zusätzliche Informationen nötig wären (Quelle C)

**Hier wird kein Text geschrieben.** Nur benannt, was fehlen würde.

| Thema | Betroffene Seite | Fehlende Information | Ohne neue Unternehmensbehauptung möglich? |
|---|---|---|---|
| Zutritt und Schlüssel bei Hausverwaltungen | TS (H2 3) | Wie läuft die Schlüsselübergabe mit einer Verwaltung konkret ab? Schlüsselkasten, Übergabeprotokoll, Zugangscode? | **Nein.** Ohne Bestätigung nur allgemein formulierbar („wird vorab festgelegt") — das wäre eine Floskel. **Frage an dich.** |
| Feste Reinigungstage | TS (H2 5), Neukölln (H2 2) | Werden Reinigungstage tatsächlich fest terminiert (z. B. „immer dienstags")? `services.ts` benefits sagt „Feste Reinigungstage" — ist das belastbar? | Teilweise. Der Beleg im Repo existiert, sollte aber bestätigt werden. |
| Ruhezeiten in Wohnhäusern | Pankow (H2 4) | Gibt es eine tatsächliche Praxis (keine Arbeiten vor X Uhr)? | **Nein.** Ohne Bestätigung nicht konkretisierbar. **Frage an dich.** |
| Mehrere Aufgänge: Organisation | Neukölln (H2 1–3) | Wird bei mehreren Aufgängen tatsächlich ein Team/ein Tag/ein Ansprechpartner eingesetzt? | Teilweise — `services.ts:314` belegt die gemeinsame Anfahrt und Grundorganisation. Die Taktung selbst nicht. |
| Altbau-Oberflächen | CW (H2 2) | Naturstein, Fliesen, Holz stehen bereits auf der Hauptseite. Gibt es bei historischen Belägen ein abweichendes Vorgehen? | **Ja, ohne Rückfrage lösbar** — bei den bestehenden, allgemein gehaltenen Materialaussagen bleiben, keine Spezialverfahren behaupten. |
| Umlagefähigkeit | Hauptseite (FAQ) | — | **Ja** — `services.ts:335` ist bereits vorsichtig und korrekt formuliert („entscheidet die jeweilige Verwaltung"). Wird unverändert übernommen. |

**Wenn du die drei mit „Nein" markierten Punkte nicht beantworten möchtest:** Die betroffenen H2 entfallen ersatzlos. Die Seiten werden dadurch kürzer, aber nicht schwächer — Regel §9 dieses Auftrags stellt Faktentreue ausdrücklich über Wortzahl.

---

## H. Kannibalisierungsrisiken und die Abgrenzungsregel

### Was sich notwendigerweise wiederholen darf (Regel §3 A)

- **Was zum Treppenhaus gehört** — jeder lokale Sucher will es wissen. Auf den Kombiseiten aber gekürzt und mit Verweis auf die Hauptseite, nicht als Volltext.
- **Preisfaktoren** — in objektbezogener Zuspitzung je Seite (Gewerbeobjekt / Altbau / Mischnutzung / Mehraufgang), nicht als wiederholte Liste.
- **Kontaktweg und CTA-Funktion** — die Funktion wiederholt sich, der Wortlaut nicht.

### Was auf genau einer Seite stehen darf

| Thema | Gehört ausschließlich zu |
|---|---|
| Rhythmus-Systematik (täglich/wöchentlich/14-tägig) | Hauptseite |
| Saisonale Einflüsse (Laub, Streusalz, Splitt) | Hauptseite |
| Materialliste inkl. Kiehl / Dr. Schnell / Buzil | Hauptseite |
| Winterdienst-Abgrenzung | Hauptseite |
| Umlagefähigkeit / Nebenkostenabrechnung | Hauptseite |
| Preisdegression bei mehreren Aufgängen (**Preisprinzip**) | Hauptseite |
| Hausverwaltung als Auftraggeber im Gewerbeobjekt | Tempelhof-Schöneberg |
| Repräsentanz gegenüber Mandanten und Patienten | Charlottenburg-Wilmersdorf |
| Altbau-Oberflächen im Treppenhaus | Charlottenburg-Wilmersdorf |
| Interessenausgleich Wohnen ↔ Gewerbe | Pankow |
| Objektorganisation bei mehreren Aufgängen (**Ablauflogik**) | Neukölln |

Die Trennung *Preisprinzip (Hauptseite) ↔ Ablauflogik (Neukölln)* ist die heikelste der Familie. Sie ist tragfähig, aber sie muss beim Schreiben diszipliniert eingehalten werden — sonst entsteht genau die Dublette, die ich in der Entscheidungsanalyse zunächst vermutet hatte.

### Die Abgrenzungsregel gegenüber der Gebäudereinigung

Alle vier Treppenhaus-Bezirke haben zusätzlich eine Gebäudereinigungs-Kombiseite. Bei zwei Paaren ist die jeweils andere Seite als `mostSimilarUrl` hinterlegt:

| Treppenhaus-Kombi | Gebäudereinigungs-Kombi im selben Bezirk | Beziehung |
|---|---|---|
| `…/tempelhof-schoeneberg` | `gebaeudereinigung/tempelhof-schoeneberg` | **wechselseitig `mostSimilarUrl`** · Gebäude-Seite ist Klon |
| `…/neukoelln` | `gebaeudereinigung/neukoelln` | Gebäude-Seite verweist hierher · Klon |
| `…/charlottenburg-wilmersdorf` | `gebaeudereinigung/charlottenburg-wilmersdorf` | Klon |
| `…/pankow` | `gebaeudereinigung/pankow` | gut ausgebaut, keine akute Kollision |

**Vorgeschlagene Regel, die ab jetzt für beide Familien gilt:**

> **Gebäudereinigung × Bezirk** erklärt das **Bündel**: mehrere Gewerke, ein Vertrag, ein Ansprechpartner. Das Treppenhaus kommt darin als Bestandteil vor, wird aber nicht erklärt.
> **Treppenhausreinigung × Bezirk** erklärt die **Einzelleistung** für Auftraggeber, die nur das Treppenhaus vergeben — Beauftragung, Umlage, Zutritt, Turnus.

Weil wir mit Treppenhaus zuerst arbeiten, definieren wir die schmale Spur zuerst. Die Gebäudereinigungs-Klone müssen sich später an dieser Grenze ausrichten — was ihre Entkopplung eher erleichtert.

### Restrisiko

- **Tempelhof-Schöneberg:** Die Bezirksseite sagt in einem Satz bereits, was der Schwerpunkt der Kombiseite wird („Bei mehrstöckigen Objekten … spielt die Treppenhausreinigung … eine wichtige Rolle, die wir häufig gemeinsam mit Hausverwaltungen abstimmen"). Die Kombiseite muss über diesen Satz hinausgehen, nicht ihn ausschmücken.
- **Pankow:** Dieselbe Konstellation — die Bezirks-FAQ fragt bereits „Wird bei der Reinigung Rücksicht auf Anwohner genommen?". Zusätzlich tragen `bueroreinigung/pankow` und `praxisreinigung/pankow` dasselbe Anwohner-Motiv. Für Pankow ist der Treppenhaus-Winkel der **sachlich stärkste** der drei, weil das Treppenhaus die tatsächlich geteilte Fläche ist. Das ist beim späteren Pankow-Durchgang der anderen Familien zu berücksichtigen.

---

## I. Notwendige Korrekturen der 24-Stunden-Aussage

**Die Treppenhaus-Familie ist nicht betroffen.** Geprüft: `TreppenhausreinigungBerlinContent.tsx` nutzt einen eigenen 4-Schritt-`processSteps` ohne 24-Stunden-Aussage, und keine der vier Kombiseiten enthält eine.

**Zu korrigieren ist genau eine Stelle:**

| Datei | Zeile | Wortlaut heute | Bewertung |
|---|---|---|---|
| `src/app/leistungen/[slug]/page.tsx` | 61 | „Mängel melden Sie uns direkt – **wir bessern in der Regel innerhalb von 24 Stunden nach**." | ❌ **Falsch** nach deinem bestätigten Faktenstand — sagt eine Nachbesserung binnen 24 h zu |

**Korrekt und unverändert zu lassen:**

| Datei | Zeile | Wortlaut | Bewertung |
|---|---|---|---|
| `src/app/ueber-uns/page.tsx` | 411 | „Melden Sie einen konkreten Mangel innerhalb von 24 Stunden nach dem Termin, beheben wir ihn in der Regel kostenlos nach." | ✅ korrekt — 24 h ist die Meldefrist |
| `src/data/expectations.tsx` | 57 | „Melden Sie einen konkreten Mangel innerhalb von 24 Stunden, beheben wir ihn in der Regel kostenlos nach." | ✅ korrekt |

**Reichweite der Korrektur:** `glanzwerkPrinciple` in `[slug]/page.tsx` wird nur vom generischen Template gerendert — also ausschließlich von `/leistungen/kita-und-schulreinigung-berlin` und `/leistungen/fitnessstudioreinigung-berlin`. Auf diesen beiden Seiten stehen heute beide Fassungen untereinander (Zeile 392 `ProcessSteps` und Zeile 403 `ExpectationCards`).

**Empfehlung:** Als **eigener, isolierter Commit vor** dem Treppenhaus-Ausbau. Es ist eine Faktenkorrektur, kein Redaktionsschritt, sie betrifft eine andere Familie, und sie sollte im Diff nicht mit redaktionellen Änderungen vermischt sein. Ich mache sie erst auf deine ausdrückliche Freigabe.

---

## J. Bearbeitungsreihenfolge nach Freigabe

| Schritt | Was | Warum in dieser Reihenfolge | Commit |
|---|---|---|---|
| **0** | 24-Stunden-Korrektur in `[slug]/page.tsx:61` | Faktenkorrektur, familienfremd, muss isoliert im Diff stehen | eigener Commit |
| **1** | Hauptseite: `services.ts`-Inhalte sichtbar machen (H2 3, H2 6, FAQ ×3, Kosten-Ergänzung) | **Muss vor den Kombis stehen.** Erst wenn Umlage, Winterdienst und Preisdegression auf der Hauptseite sind, weiß jede Kombiseite, was sie *nicht* mehr sagen darf | Commit „Hauptseite" |
| **2** | Hauptseite: Links zu den 4 Kombiseiten | Höchster Wirkungsgrad, kein Textrisiko. Bewusst getrennt, damit der Effekt isoliert prüfbar bleibt | derselbe oder eigener Commit |
| **3** | `…/tempelhof-schoeneberg` | **Referenzseite.** Stärkstes Argument, von der Bezirksseite gestützt, Treppenhaus ist dort Schwerpunkt Nr. 1. An dieser Seite legen wir Ton und Tiefe fest | Commit je Seite |
| **4** | `…/pankow` | Bewusst als **zweite**, nicht dritte: Ihr Schwerpunkt ist am weitesten von Schritt 3 entfernt (Mischnutzung ↔ reines Gewerbeobjekt). Wenn direkt danach ein Klon entsteht, sehen wir es sofort — der Härtetest gegen Regel §17 | Commit je Seite |
| **5** | `…/charlottenburg-wilmersdorf` | Dritter, deutlich anderer Winkel (Repräsentanz/Altbau). Prüfung gegen die zwei fertigen Seiten | Commit je Seite |
| **6** | `…/neukoelln` | **Zuletzt und bewusst schlank.** Erst wenn die anderen drei stehen, ist beurteilbar, was für Neukölln übrig bleibt | Commit je Seite |
| **7** | Querlesen aller 5 Seiten gegeneinander + `npm run test` + `npm run build` | Regel §17 Schritt 7–10 | — |
| **8** | Abschlussbericht nach Regel §19 (A–J) inkl. Wortzahlen vorher/nachher | — | — |

**Nach jedem Schritt:** Git-Diff zur Sichtung, kein Weitergehen ohne deine Bestätigung.

---

## K. Abschließende Einschätzung

**Ja — diese Familie kann als eigenständige, nutzerorientierte lokale Seitenstruktur bestehen.** Von allen zehn Familien ist sie die einzige, für die ich das mit Belegen statt mit Absicht sagen kann.

**Wodurch sie trägt:**
- Die vier Bezirke stehen für vier **verschiedene Reinigungssituationen** (reines Gewerbeobjekt · Altbau mit Publikumsverkehr · gemischt genutztes Wohnhaus · Mehraufgangobjekt), nicht für vier Ortsnamen. Diese Situationen unterscheiden sich in **Auftraggeber, Zutritt, Abrechnung und Rhythmus** — vier harte, prüfbare Dimensionen.
- Die Zielgruppe Hausverwaltung/WEG existiert sonst nirgends auf der Website und erzwingt eine eigene redaktionelle Logik. Das schützt vor dem Kopieren des Büroreinigungs-Gerüsts (Regel §14).
- Der Ausbau stützt sich in großen Teilen auf **bereits vorhandenen, geprüften Content** (Quelle A) statt auf Neuerfindung. Für die Hauptseite gilt das vollständig.

**Wo sie nicht trägt — offen gesagt:**
- **Neukölln** ist grenzwertig. Nach dem Umzug des Preisprinzips auf die Hauptseite bleibt eine Organisationslogik, die eine schlanke Seite rechtfertigt, aber keine gleichwertige. Wenn du nach Schritt 6 zu dem Schluss kommst, dass es nicht reicht, ist das ein gültiges Ergebnis — dann steht der Pilot mit 3 statt 4 Kombiseiten, und wir haben genau das gelernt, wofür ein Pilot da ist.
- **Drei H2 hängen an Informationen, die ich nicht habe** (Schlüsselübergabe, Ruhezeiten, feste Reinigungstage). Ohne deine Bestätigung entfallen sie. Die Seiten werden dann kürzer — nach Regel §9 dieses Auftrags ist das der richtige Ausgang, nicht ein Mangel.
- **Die Familie hat eine strukturelle Lücke, die ich nicht schließen kann:** `/standorte/friedrichshain-kreuzberg` bewirbt Treppenhausreinigung als Schwerpunkt, aber es gibt keine Kombiseite. Friedrichshain-Kreuzberg ist zugleich Nachbar von Pankow und Neukölln — eine solche Seite würde auch Pankows Verlinkungs-Sackgasse schließen. Das wäre eine **neue URL** und damit nach Regel §16 ausdrücklich freigabepflichtig.

---

## Offene Entscheidungen vor dem Start

1. **Freigabe des Plans** insgesamt.
2. **24-Stunden-Korrektur** als Schritt 0 — ja oder separat später?
3. **Neue URL `…/friedrichshain-kreuzberg`** anlegen, oder die Linklücke bestehen lassen und später über die Bezirksseite lösen?
4. **Die drei Faktenfragen aus Abschnitt G** (Schlüsselübergabe bei Verwaltungen · feste Reinigungstage · Ruhezeiten in Wohnhäusern) — beantworten, oder die betroffenen Abschnitte ersatzlos streichen?

---

**Bestätigung:** Es wurden keine Website-Inhalte, Überschriften, Metadaten, URLs oder internen Links verändert. Kein Text geschrieben oder umgeschrieben. Keine Unternehmensfakten korrigiert, ergänzt oder erfunden. Wo Informationen fehlen, ist das in Abschnitt G benannt statt überbrückt.
