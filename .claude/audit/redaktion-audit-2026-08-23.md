# Globaler redaktioneller SEO-Audit — Glanzwerk

**Datum:** 23.08.2026 · **Branch:** `seo-redaktion-runde-2` · **Regelwerk:** `.claude/redaktion-regeln.md`
**Methodik:** Vollständige Lektüre der fünf Content-Datenquellen (`services.ts`, `districts.ts`, `combos.ts`, `articles.ts`, `seoHeadings.ts`), aller 16 eigenständigen Content-Komponenten und aller Templates. Quantitative Auswertung per Skript (Klon-Ähnlichkeit, Ausbaustufen, Phrasenhäufigkeit, Linklücken). **Keine Änderung an Website-Inhalten.**

> Alle Wortzahlen sind konservative Untergrenzen aus einer Quelltext-Extraktion (mehrzeilige JSX-Absätze werden teilweise untererfasst, real ca. 15–25 % höher). Für den Vergleich *zwischen* Seiten gleicher Bauart sind sie belastbar; exakte Rendering-Wortzahlen werden pro Familie zum Bearbeitungszeitpunkt gemessen (Regel §19 H).

---

## 1. Gesamturteil

Die Website zerfällt redaktionell in **zwei sehr unterschiedliche Hälften**.

**Die obere Hälfte ist gut.** Vier Leistungsseiten (Gebäude-, Büro-, Praxis-, Kanzleireinigung) sind mit ~1.100–1.200 Wörtern eigenständig geschrieben, fachlich sauber abgegrenzt, mit echten FAQ und einer eigenen Argumentationslogik pro Objekttyp. Die 47 Kombi-Intros haben durchweg unterschiedliche Satzeinstiege. Die `localContext`-Absätze der Bezirksseiten sind sachlich, belegbar und tatsächlich pro Bezirk verschieden. Die von dir befürchteten KI-Floskeln aus dem Regelkatalog sind **fast nicht vorhanden** — „Das schafft Klarheit", „Der konkrete Bedarf entscheidet", „wird konkret vereinbart", „Damit bleibt der Leistungsumfang nachvollziehbar" kommen sitewide **null Mal** vor. Diese Baustelle ist bereits geschlossen.

**Die untere Hälfte ist das eigentliche Problem — und es ist ein Strukturproblem, kein Sprachproblem.** 38 der 47 Leistung×Bezirk-Seiten (81 %) bestehen aus **genau einem eigenen Satz** von durchschnittlich 27 Wörtern. Alles Übrige der Seite wird aus der Leistungs- und der Bezirksdatenquelle geerbt, und der eine eigene Satz wird auf derselben Seite in der automatisch erzeugten FAQ-Antwort **wörtlich ein zweites Mal** ausgegeben. Dazu kommen 8 Ortsteilseiten mit je einem einzigen eigenen Satz. Das sind **46 von ~104 URLs**, bei denen die Frage „Was erfährt der Nutzer hier, was er auf der Nachbar-URL nicht erfährt?" (Regel §9) keine Antwort hat.

Der zweite gravierende Befund betrifft die einzige Familie, die *versucht* wurde auszubauen: Drei der sechs eigenständigen Gebäudereinigungs-Kombiseiten sind **Synonym-Klone** voneinander — Satz für Satz dieselbe Aussage mit ausgetauschtem Verb. Genau das, was Regel §3 („Nicht einfach Synonyme einsetzen") verbietet, ist in der vorigen Runde geschehen.

**Kurzformel:** Sprache und Faktentreue sind in Ordnung. Substanz und Eigenständigkeit auf Bezirksebene sind es nicht. Die Runde sollte deshalb **nicht** mit Umformulieren beginnen, sondern mit einer Architekturentscheidung über die 38 dünnen Kombiseiten.

---

## 2. Wichtigste sitewide Probleme nach Priorität

### P0 — kritisch

**P0-1 · 38 von 47 Kombiseiten sind Thin-/Doorway-Kandidaten**
Ausbaustufen der 47 Kombiseiten:

| Stufe | Anzahl | Was vorhanden ist | Eigener Text |
|---|---|---|---|
| A — eigene Content-Komponente | 6 | vollständige Fließtextseite | ~530–685 W |
| B — `combos.ts` voll ausgebaut | 3 | localAngle, scopeBullets, processText, eigene FAQ, eigener CTA | ~450–550 W |
| C — Intro + eigene Meta | 0 | — | — |
| **D — nur `intro`, sonst 100 % Template** | **38** | ein Absatz | **≈ 55 W** |

Eine Klasse-D-Seite rendert ≈ 230–260 Wörter sichtbaren Text. Davon existieren nur H1, Intro, eine H2, die FAQ-H2 und die CTA-H2 ausschließlich auf dieser URL — zusammen ≈ 55 Wörter. Der Rest: `service.benefits[0]`, `service.tasks[0]`, `district.audiences[0]`, `service.summary`, `district.summary`, generische FAQ, generischer CTA.
**Betrifft:** siehe Anhang A. **Regelbezug:** §6, §9, §11, §16.
→ **Nicht durch Redaktion allein lösbar.** Entscheidung erforderlich (siehe Abschnitt 12).

**P0-2 · Klon-Cluster in der Gebäudereinigungs-Familie**
Paarweise Quelltext-Ähnlichkeit der sechs eigenständigen Gebäudereinigungs-Kombiseiten nach Normalisierung der Bezirksnamen:

| Paar | Ähnlichkeit |
|---|---|
| Neukölln ↔ Tempelhof-Schöneberg | **89 %** |
| Charlottenburg-Wilmersdorf ↔ Tempelhof-Schöneberg | **85 %** |
| Charlottenburg-Wilmersdorf ↔ Neukölln | **85 %** |
| alle übrigen Paare (Mitte, Pankow, Friedrichshain-Kreuzberg) | 69–74 % |

69–74 % ist der reine JSX-Gerüst-Sockel. Die drei genannten Seiten liegen 15 Punkte darüber. Ihre `eyebrow`-Sequenz ist über alle zehn Abschnitte **byte-identisch**, vier von acht H2 sind wörtlich gleich. Der Fließtext ist Satz für Satz synonymgetauscht:

> „Pflege von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitäranlagen." (CW)
> „Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitärbereichen." (TS)

> „Pflege von Eingängen, **Stufen**, Podesten, Fluren und Handläufen." (CW)
> „Pflege von Eingängen, **Treppen**, Podesten, Fluren und Handläufen." (TS)

> „Teilen Sie **uns** Standort, Objektart, Fläche und gewünschten **Rhythmus** mit." (CW)
> „Teilen Sie Standort, Objektart, Fläche und gewünschten **Reinigungs**rhythmus mit." (TS)

**Regelbezug:** §3 (explizit), §6, §16. **Erforderlich:** Argumentationsstruktur der schwächeren zwei Seiten ändern, nicht die Wörter.

**P0-3 · Keyword-Kannibalisierung auf dem Hauptbegriff**
`/` und `/leistungen/gebaeudereinigung-berlin` konkurrieren um „Gebäudereinigung Berlin":

|  | H1 | Meta-Title |
|---|---|---|
| `/` | Gebäudereinigung Berlin | Gebäudereinigung Berlin für **Unternehmen** \| Glanzwerk |
| `/leistungen/gebaeudereinigung-berlin` | Gebäudereinigung Berlin mit klar abgestimmten Leistungen | Gebäudereinigung Berlin für **Gewerbe** \| Glanzwerk |

„Unternehmen" vs. „Gewerbe" ist keine Intentionstrennung. Die hinterlegte `differentiation` („Startseite bündelt auf Überblicksebene") beschreibt eine Absicht, die sich im Keyword-Targeting nicht abbildet. **Regelbezug:** §2D, §9, §15.

### P1 — hoch

**P1-4 · Auto-FAQ dupliziert das Intro auf 38 Seiten**
`[bezirk]/page.tsx:103–113`: Fehlt `combo.faq`, wird erzeugt:
- Frage 1: `Bietet Glanzwerk {shortTitle} auch in {name} an?` — Muster ×38
- Antwort 1: `Ja, {shortTitle} gehört in {name} zu unserem Einsatzgebiet. {combo.intro}` — **der einzige eigene Absatz der Seite, wörtlich wiederholt**
- Frage 2 + Antwort 2: auf allen 38 Seiten **identisch**

Das verdoppelt den einzigen Unique-Content-Block und liefert gleichzeitig einen sitewide identischen FAQ-Eintrag. **Regelbezug:** §12.

**P1-5 · `/reinigungsfirma-berlin` verfehlt seine Rolle als Hub und dupliziert einen Wissen-Artikel**
Mit ≈ 285 Wörtern die **dünnste kommerzielle Seite** der Website — für den Kopf-Begriff „Reinigungsfirma Berlin". Regel §15 fordert: Leistungsportfolio erklären, Auswahlkriterien liefern, Prozess bis zum Angebot erklären, Einsatzgebiet darstellen. Vorhanden sind sechs Kriterienkarten, zwei Link-Kacheln und vier FAQ. Portfolio und Prozess fehlen vollständig; das Einsatzgebiet ist ein Halbsatz.

Zusätzlich überschneidet sich die Seite fast vollständig mit `/wissen/reinigungsdienstleister-auswaehlen`:

| `/reinigungsfirma-berlin` | `/wissen/reinigungsdienstleister-auswaehlen` |
|---|---|
| Fester Ansprechpartner statt Callcenter | Fester Ansprechpartner statt wechselndem Personal |
| Transparentes Angebot | Nachvollziehbarkeit des Angebots |
| Erfahrung mit vergleichbaren Objekten | Erfahrung mit vergleichbaren Objekten *(identisch)* |
| Klare Vertragslaufzeiten | Vertragslaufzeiten und Kündigungsfristen |
| Versicherungsschutz | Versicherungsschutz als Mindeststandard |

Fünf von sechs Kriterien deckungsgleich, gleiche Suchintention (Commercial Investigation). Die hinterlegte `differentiation` — „die Reinigungsfirma-Seite fasst die Kriterien kompakter zusammen" — ist ein Eingeständnis, keine Abgrenzung.

**P1-6 · 8 Ortsteilseiten mit je einem eigenen Satz**
Gerendert: H1 + ein Template-Satz (`Reinigungsservice für Büros, Praxen und Gewerbeobjekte in {Ortsteil} ({Bezirk}).`) + **ein** `localContext`-Absatz + geerbte Leistungskarten + Link-Chips + CTA. ≈ 150 Wörter, davon ≈ 50 eigen. Die zweite H2 ist auf allen acht `Gefragte Reinigungsleistungen in {Ortsteil}`. Die `differentiation`-Einträge („vorheriges 'kritisch'-Verdikt behoben") sind **verfrüht** — der eine ergänzte Satz hebt die Dünne nicht auf.

**P1-7 · Faktenwiderspruch bei der 24-Stunden-Regel**

| Quelle | Aussage |
|---|---|
| `ueber-uns/page.tsx:411`, `expectations.tsx:57` | Kunde meldet **innerhalb von 24 h nach dem Termin** → Glanzwerk bessert nach |
| `leistungen/[slug]/page.tsx:61` | „Mängel melden Sie uns direkt – **wir bessern in der Regel innerhalb von 24 Stunden nach**." |

Die zweite Variante verspricht eine 24-Stunden-**Reaktionszusage von Glanzwerk**, die auf der maßgeblichen Über-uns-Seite nicht existiert. Sichtbar auf den Kita/Schul- und Fitnessstudio-Seiten. **Nicht selbst korrigiert** (Regel §1, §9 Bestandsschutz) — Entscheidung liegt beim Betreiber.

**P1-8 · Bezirksseiten: 3 von 4 H2 sind Mad-Libs**
Auf allen 12 Bezirksseiten identisches Muster, nur Ortsname getauscht:
`Typische Kunden in {Bezirk}` · `Gefragte Reinigungsleistungen in {Bezirk}` · `Leistungen mit direktem Bezug zu {Bezirk}` · FAQ-H2 `Häufige Fragen zu {Bezirk}` · CTA-H2 `Angebot für Ihr Objekt in {Bezirk}` · fest verdrahtet `Auch in angrenzenden Bezirken im Einsatz`.
Nur die **erste** H2 ist pro Bezirk eigenständig formuliert. **Regelbezug:** §3, §4, §6.

**P1-9 · Interne Linklücken: Bezirksseite bewirbt Leistung ohne zugehörige Kombiseite**

| Seite | Beworbene Leistung ohne Kombi-URL |
|---|---|
| `/standorte/charlottenburg-wilmersdorf` | Autohausreinigung *(dort Schwerpunkt Nr. 1)* |
| `/standorte/neukoelln` | Fitnessstudioreinigung *(Schwerpunkt Nr. 1)*, Unterhaltsreinigung |
| `/standorte/steglitz-zehlendorf` | Kita- und Schulreinigung |
| `/standorte/friedrichshain-kreuzberg` | Treppenhausreinigung |
| `/standorte/pankow` | Unterhaltsreinigung |
| `/standorte/spandau` | Unterhaltsreinigung |

Dazu 6 Ortsteilseiten mit demselben Muster (Anhang B). **Gastronomiereinigung hat null Kombiseiten** — der Abschnitt „Standorte" rendert auf dieser Leistungsseite gar nicht, und keine Bezirksseite verlinkt sie.

### P2 — mittel

**P2-10 · Serien-Skelett über alle 10 eigenständigen Leistungsseiten**
Identische Abschnittsfolge, Häufigkeit über 10 Seiten:

| Baustein | Vorkommen |
|---|---|
| „Möglicher Leistungsumfang" | 10/10 |
| „Von der Anfrage bis zum Reinigungsstart" (± „…zur Durchführung") | 10/10 |
| „Preis der {Leistung}" | 10/10 |
| „Unser Einsatzgebiet" | 10/10 |
| „Häufige Fragen" | 10/10 |
| „Sorgfältiger Umgang mit Oberflächen" / „Schutz von …" | 9/10 |
| „Flexible Einsatzplanung" | 7/10 |

Ein Teil davon ist **notwendige fachliche Wiederholung** (Preis, Ablauf, FAQ gehören auf jede Leistungsseite — Regel §3 A). Unnötig ist die **identische Reihenfolge und identische Benennung**. Regel §14 fordert eine eigene redaktionelle Logik pro Familie; aktuell tragen alle zehn dasselbe Gerüst.

**P2-11 · Kita/Schule ↔ Fitnessstudio: strukturelle Zwillinge**
Die einzigen beiden Leistungsseiten ohne eigene Komponente. Ihre H2-Folge ist Position für Position dasselbe Schema:

| # | Kita & Schule | Fitnessstudio |
|---|---|---|
| 1 | Worauf es bei der Reinigung von Kitas und Schulen ankommt | Warum Fitnessstudios eine hohe Reinigungsfrequenz brauchen |
| 2 | Typische Herausforderungen im Betreuungsalltag | Typische Herausforderungen bei starker Frequentierung |
| 3 | So läuft die Kita- und Schulreinigung ab | So läuft die Fitnessstudioreinigung ab |
| 4 | Reinigungsaufgaben in Gruppen- und Klassenräumen | Reinigungsaufgaben an Geräten und in Umkleiden |
| 5 | Für welche Einrichtungen sich die Leistung eignet | Für welche Studios sich die Leistung eignet |
| 6 | Das Glanzwerk-Prinzip bei der Kita- und Schulreinigung | Das Glanzwerk-Prinzip bei der Fitnessstudioreinigung |
| 7 | Das dürfen Sie von Glanzwerk erwarten | Das dürfen Sie von Glanzwerk erwarten *(identisch)* |
| 8 | … in ausgewählten Berliner Bezirken | … in ausgewählten Berliner Bezirken *(identisch)* |

Beide ≈ 350–450 Wörter — die dünnsten Leistungsseiten.

**P2-12 · CTA-Monokultur**
20 × `Angebot für Ihr Objekt in {ORT}`. 46 der 47 Kombi-CTAs folgen dem Muster `{Leistung} in {ORT} (unverbindlich) anfragen` — die einzige „Variation" ist das eingeschobene Wort „unverbindlich". Regel §10 verlangt ausdrücklich das Gegenteil. Die drei Klasse-B-Kombis haben mit `ctaSubtitle` bereits eigene, konkrete Zweitzeilen — das ist das Muster, das übertragen gehört.

**P2-13 · Sechs Leistungsseiten deutlich unter Zielumfang**
Treppenhaus ~640 · Unterhalt ~520 · Grundreinigung ~510 · Gastronomie ~485 · Glas/Fenster ~475 · Autohaus ~470 (Untergrenzen). Zielkorridor laut §11: 1.300–1.800. Die vier großen Leistungsseiten liegen bei ~1.135–1.205 und damit im Rahmen. **Kein Auffüllen** (§11) — aber diese sechs haben echte inhaltliche Lücken, keine Fülllücken.

**P2-14 · Wissen-Artikel: starres Raster, durchweg dünn**
Alle 9 Artikel: 159–283 Wörter, und **jeder Abschnitt besteht aus exakt einem Absatz** (4–6 Abschnitte). Das `paragraphs: string[]`-Feld erlaubt mehr, wird aber nirgends genutzt. Für `/wissen/was-kostet-gebaeudereinigung` (242 W) ist das gegenüber Preis-Ratgebern nicht wettbewerbsfähig — der SXO-Befund aus dem Vor-Audit („Seitentyp-Mismatch bei Gebäudereinigung Preis") hängt direkt daran.

**P2-15 · Das `differentiation`-Feld behauptet Tiefe, die nicht existiert**
Häufigste Begründungen: 7 × „Zeigt alle Leistungen des Bezirks im Überblick statt einer einzelnen vertieften Leistung." · 5 × „Vertieft die gebündelte Gebäudereinigung statt aller Bezirksleistungen." · 4 × „Vertieft ausschließlich Praxisreinigung statt aller Bezirksleistungen." · je 3 × zwei weitere.
Für Klasse-D-Seiten ist „vertieft ausschließlich X" **sachlich falsch** — diese Seiten vertiefen nichts, sie erben. Das Feld dokumentiert eine Absicht, keinen Zustand. Es ist trotzdem wertvoll: als Soll-Vorgabe für die Bearbeitung.

**P2-16 · 38 Kombiseiten ohne eigene Meta-Description**
`generateMetadata` erzeugt einen Fallback aus den ersten 130 Zeichen des Intros mit angehängtem „…". Abgeschnittene Snippets mit Auslassungspunkten auf 38 URLs.

### P3 — gering

- **P3-17** Ortsnamenketten: die Klasse-A-Kombiseiten listen Ortsteil-Arrays (z. B. Charlottenburg, Wilmersdorf, Schmargendorf, Grunewald, Westend, Charlottenburg-Nord, Halensee). Faktisch korrekt, aber grenzwertig zu §8 („Keine Ortsnamenketten im Fließtext").
- **P3-18** Umland-Aussage („Potsdam, Schönefeld … nach Absprache") steht auf 10 Leistungsseiten, der Startseite, Über-uns und einer Kombiseite — nicht auf Bezirks- und übrigen Kombiseiten, die durchgängig „alle zwölf Berliner Bezirke" sagen. Kein Widerspruch, aber uneinheitlich.
- **P3-19** „Deshalb" 4 ×, „Entscheidend" 1 × in den Content-Datenquellen. Unauffällig. Kein Handlungsbedarf.

---

## 3. Kannibalisierungsmatrix

| # | URL-Paar | Bewertung | Begründung |
|---|---|---|---|
| K1 | `/` ↔ `/leistungen/gebaeudereinigung-berlin` | 🔴 **ROT** | Identisches Primärkeyword, Meta-Titel trennen nur „Unternehmen"/„Gewerbe" |
| K2 | `/reinigungsfirma-berlin` ↔ `/wissen/reinigungsdienstleister-auswaehlen` | 🔴 **ROT** | 5 von 6 Auswahlkriterien deckungsgleich, gleiche Intention |
| K3 | Gebäudereinigung CW ↔ Tempelhof-Sch. ↔ Neukölln | 🔴 **ROT** | 85–89 % Textgleichheit, Synonymtausch |
| K4 | 38 Klasse-D-Kombis ↔ jeweilige Bezirksseite | 🔴 **ROT** | Kombi hat ≈ 55 W eigen; Bezirksseite deckt dieselbe Frage vollständiger ab |
| K5 | 8 Ortsteilseiten ↔ jeweilige Bezirksseite | 🔴 **ROT** | Ortsteil hat ≈ 50 W eigen, erbt Leistungskarten vom Bezirk |
| K6 | `/reinigungsfirma-berlin` ↔ `/ueber-uns` | 🟡 GELB | Über-uns ist mit ~895 W die stärkere Seite; Hub-Rolle unbesetzt |
| K7 | `/leistungen/unterhaltsreinigung-berlin` ↔ `/leistungen/gebaeudereinigung-berlin` | 🟡 GELB | Abgrenzung „Bündel vs. Einzelleistung" ist inhaltlich korrekt, aber nur auf der Gebäude-Seite ausgeführt |
| K8 | `/leistungen/bueroreinigung-berlin` ↔ `/leistungen/kanzleireinigung-berlin` | 🟢 GRÜN | Vertraulichkeit/Aktenumgang tragen die Kanzleiseite eigenständig |
| K9 | `/leistungen/kita-und-schulreinigung-berlin` ↔ `/leistungen/fitnessstudioreinigung-berlin` | 🟡 GELB | Themen klar getrennt, **Struktur** identisch |
| K10 | `/leistungen` ↔ `/standorte` ↔ `/` | 🟢 GRÜN | Saubere navigatorische Trennung |
| K11 | `/preisrechner` ↔ `/wissen/was-kostet-gebaeudereinigung` | 🟢 GRÜN | Rechner vs. Preislogik — saubere Trennung |
| K12 | `/leistungen/grundreinigung-berlin` ↔ `/leistungen/unterhaltsreinigung-berlin` | 🟢 GRÜN | Einmalig vs. wiederkehrend, beidseitig konsequent ausgeführt |

---

## 4. Leistungsfamilien-Ranking nach Überarbeitungsbedarf

| Rang | Familie | Kombis | Bedarf | Kernproblem |
|---|---|---|---|---|
| 1 | **Gebäudereinigung** | 11 | 🔴 sehr hoch | Klon-Cluster (P0-2) + Keyword-Kannibalisierung (P0-3) + 5 Klasse-D-Seiten. Größte Familie, wichtigstes Keyword. |
| 2 | **Bezirks-Hubs + Ortsteile** | 12 + 8 | 🔴 sehr hoch | Mad-Libs-H2 auf allen 12; 8 Ortsteilseiten bei ≈ 150 W |
| 3 | **Unterhaltsreinigung** | 6 | 🔴 hoch | Alle 6 Klasse D; Leistungsseite ~520 W; höchste Kannibalisierungs-Zentralität (5 × als `mostSimilarUrl` referenziert) |
| 4 | **Praxisreinigung** | 6 | 🟠 hoch | 1 × Klasse B (gut), 5 × Klasse D. Leistungsseite stark. |
| 5 | **Treppenhausreinigung** | 4 | 🟠 mittel-hoch | Alle 4 Klasse D; Leistungsseite ~640 W |
| 6 | **Glas- und Fensterreinigung** | 4 | 🟠 mittel-hoch | Alle 4 Klasse D; Leistungsseite ~475 W |
| 7 | **Büroreinigung** | 7 | 🟡 mittel | 2 × Klasse B — die **besten** Kombiseiten der Website; Leistungsseite stark. 5 × Klasse D. |
| 8 | **Kanzleireinigung** | 3 | 🟡 mittel | Alle 3 Klasse D; Leistungsseite die stärkste der Website (~1.205 W) |
| 9 | **Grundreinigung** | 3 | 🟡 mittel | Alle 3 Klasse D; Leistungsseite ~510 W |
| 10 | **Kita/Schule + Fitnessstudio** | 1 + 1 | 🟡 mittel | Strukturzwillinge auf dem Generik-Template, dünnste Leistungsseiten |
| 11 | **Wissen (9 Artikel)** | — | 🟡 mittel | 159–283 W, starres 1-Absatz-Raster |
| 12 | **Autohausreinigung** | 1 | 🟢 gering | Leistungsseite ~470 W, sauber abgegrenzt (Werkstatt ausgenommen) |
| 13 | **Gastronomiereinigung** | 0 | 🟢 gering | Kein Kombi-Problem. Offene Faktenprüfung (siehe Abschnitt 10) |

---

## 5. Bezirksseiten mit höchstem Template-/Doorway-Risiko

**🔴 ROT — stark templateartig**

*Kombiseiten (Klasse D, 38 Stück):* durchgängig, siehe Anhang A. Innerhalb dieser Gruppe am kritischsten, weil die Bezirksseite dieselbe Frage besser beantwortet:
`grundreinigung-berlin/mitte` (21 W) · `kanzleireinigung-berlin/mitte` (22 W) · `autohausreinigung-berlin/spandau` (19 W) · `unterhaltsreinigung-berlin/friedrichshain-kreuzberg` (20 W) · `fitnessstudioreinigung-berlin/friedrichshain-kreuzberg` (20 W)

*Gebäudereinigungs-Klone:* `gebaeudereinigung-berlin/tempelhof-schoeneberg` · `gebaeudereinigung-berlin/neukoelln` · `gebaeudereinigung-berlin/charlottenburg-wilmersdorf`

*Ortsteilseiten (alle 8):* charlottenburg · wilmersdorf · steglitz · zehlendorf · tempelhof · schoeneberg · rudow · koepenick

**🟡 GELB — teilweise austauschbar**
Alle 12 `/standorte/{bezirk}`-Seiten. Der `localContext` ist echt und pro Bezirk verschieden — die Überschriftenebene und die Abschnittsfolge sind es nicht.

**🟢 GRÜN — klar eigenständig**
`gebaeudereinigung-berlin/mitte` (eigene Preisfaktoren-Sektion, Mehrmietparteien-Logik) · `gebaeudereinigung-berlin/pankow` (Wohn-/Gewerbe-Mischnutzung durchgehend als Argument) · `gebaeudereinigung-berlin/friedrichshain-kreuzberg` (unregelmäßige Grundrisse) · `bueroreinigung-berlin/mitte` · `bueroreinigung-berlin/pankow` · `praxisreinigung-berlin/charlottenburg-wilmersdorf`

---

## 6. Häufigste KI-/Sprachmuster mit Häufigkeit

**Aus deiner Verdachtsliste — sitewide nachgezählt:**

| Formulierung | Treffer | Bewertung |
|---|---|---|
| „Das schafft Klarheit" | **0** | ✅ nicht vorhanden |
| „Der konkrete Bedarf entscheidet." | **0** | ✅ |
| „wird konkret vereinbart" | **0** | ✅ |
| „wird separat betrachtet" | **0** | ✅ |
| „Damit bleibt der Leistungsumfang nachvollziehbar." | **0** | ✅ |
| „wird nicht pauschal" | **0** | ✅ |
| „Material, Zustand und Verschmutzung bestimmen …" | 1 | ✅ unkritisch |
| „gehört nicht automatisch" | 1 | ✅ unkritisch |
| „Entscheidend ist …" | 2 | ✅ unkritisch |
| „Deshalb …" *(nur Content-Dateien)* | 4 | ✅ unkritisch |

**Die AI-Slop-Bereinigung aus Commit `1f9aa1e` hat gewirkt. Regel §5 (defensive Sprache) hat kaum noch Angriffsfläche.**

**Was stattdessen sitewide wiederkehrt** — kein Floskel-, sondern ein Vokabular-Problem in den Content-Datenquellen:

| Begriff | Treffer in `services/districts/combos/articles` |
|---|---|
| „Rhythmus" | 45 |
| „abgestimmt/Abstimmung" | 35 |
| „Zeitfenster" | 28 |
| „gemeinsam" | 26 |
| „gepflegt" | 25 |
| „außerhalb der (Geschäfts-/Sprech-/Betreuungs-)zeiten" | 23 |
| „individuell" | 20 |
| „zuverlässig" | 20 |
| „vorab" | 18 |
| „besonders" | 16 |
| „in der Regel" | 9 |

„Rhythmus" 45 × und „abgestimmt" 35 × bei 47 Kombis + 12 Leistungen heißt: fast jede Seite benutzt dieselben zwei Trägerbegriffe für ihr Kernargument. Das ist der eigentliche Serieneindruck. **Nicht durch Synonyme ersetzen** (§3) — sondern dort, wo eine Seite nichts Eigenes zu sagen hat, ein eigenes Argument geben.

**Positiv:** Die 47 Kombi-Intros haben **47 verschiedene Satzeinstiege** (`In …`, `Entlang …`, `Rund um …`, `Nach Neubezug …`, `Abseits …`, `Für …`, `Kleinere …`, `Mit der wachsenden Zahl …`). Hier wurde bereits sauber gearbeitet — **nicht anfassen**.

---

## 7. Strukturelle Wiederholungen

1. **Leistungsseiten-Skelett** (P2-10): 5 Bausteine auf 10/10 Seiten in identischer Reihenfolge und Benennung.
2. **Bezirksseiten-Skelett** (P1-8): 3 von 4 H2 + FAQ-H2 + CTA-H2 als Ortsnamen-Platzhalter über alle 12.
3. **Ortsteilseiten-Skelett**: 2 H2, davon die zweite auf allen 8 `Gefragte Reinigungsleistungen in {Ortsteil}`.
4. **Gebäudereinigungs-Kombi-Skelett**: 10 identische `eyebrow` über CW/TS/Neukölln.
5. **Auto-FAQ** (P1-4): dasselbe Frage-Antwort-Paar auf 38 URLs, Antwort 1 dupliziert das Intro.
6. **CTA-Muster** (P2-12): 20 × dieselbe Überschrift; 46/47 Kombi-CTAs nach einer Schablone.
7. **Wissen-Raster** (P2-14): 9 Artikel × „Intro + N Abschnitte à exakt 1 Absatz".
8. **`differentiation`-Textbausteine** (P2-15): 7 ×/5 ×/4 ×/3 ×/3 × dieselbe Begründung.
9. **„Das dürfen Sie von Glanzwerk erwarten"** — dieselben 4 Vertrauenskarten auf Startseite + allen Leistungsseiten. *Bewertung: notwendige fachliche Wiederholung (§3 A) — behalten.*

---

## 8. SEO-Probleme

- **Keyword-Konflikt** auf „Gebäudereinigung Berlin" (P0-3).
- **Suchintention nicht belegbar** bei 38 Kombis + 8 Ortsteilen: Regel-§9-Frage unbeantwortet (P0-1, P1-6).
- **Meta-Descriptions**: 38 Kombiseiten mit auto-gekürztem Fallback inkl. „…" (P2-16).
- **Title/H1**: keine Konflikte. Die Vollständigkeits- und Unikatstests in `seoHeadings.test.ts` erzwingen sitewide eindeutige H1 — **das funktioniert und ist ein echtes Asset**.
- **Kein Keyword-Stuffing** feststellbar. Keine Keywordlisten im Fließtext. Ortsnamenketten nur in den `ortsteile`-Arrays der Klasse-A-Kombis (P3-17).
- **Interne Konkurrenz**: `/leistungen/unterhaltsreinigung-berlin` ist 5 × als `mostSimilarUrl` hinterlegt — der stärkste Kannibalisierungs-Knoten der Seitenarchitektur.
- **Linklücken**: 6 Bezirks- + 6 Ortsteilseiten bewerben Leistungen ohne Ziel-URL; Gastronomiereinigung ohne jede Kombiseite (P1-9).
- **Wortumfang**: **keine** Seite erreicht durchgängig den §11-Korridor 1.300–1.800. Vier Leistungsseiten liegen knapp darunter, alles andere deutlich.

---

## 9. Conversion-Probleme

- **CTA-Monokultur** (P2-12) — der größte Conversion-Hebel. Regel §10 nennt genau die Richtung, die die drei Klasse-B-Kombis bereits gehen (`ctaSubtitle`: „Beschreiben Sie kurz Ihr Büro in Pankow – wir melden uns mit einem individuellen Angebot."). 44 Seiten haben stattdessen den generischen Default „Beschreiben Sie kurz Ihr Objekt …".
- **`/reinigungsfirma-berlin`**: die Seite mit der stärksten kommerziellen Intention hat den schwächsten Übergang von Information zur Anfrage — kein Prozess, kein Portfolio, keine Preisorientierung (P1-5).
- **Preisrechner-Anbindung ungleich**: Kombiseiten haben den Preisrechner-Button im Kopf; die 8 Ortsteilseiten ebenfalls; die 12 Bezirksseiten ebenfalls. ✅ Der Vor-Audit-Befund „Preisrechner nur auf der Startseite" ist behoben.
- **Google-Bewertungssignal**: auf Kombiseiten vorhanden (`GoogleRating`), auf Bezirks- und Ortsteilseiten **nicht**. Ungleichbehandlung bei gleicher Einstiegsfunktion.
- **Keine verbotene Werbesprache** gefunden: „Jetzt profitieren", „Entdecken Sie", „maßgeschneiderte Lösung" kommen null Mal vor. ✅

---

## 10. Fakten, die geprüft werden müssen

**Nicht korrigiert, nicht ergänzt** (Regel §9, §16).

| # | Aussage | Fundort | Zu klären |
|---|---|---|---|
| F1 | „wir bessern in der Regel **innerhalb von 24 Stunden** nach" | `leistungen/[slug]/page.tsx:61` | **Widerspruch** zu Über-uns (dort ist 24 h die Melde-, nicht die Behebungsfrist). Welche Zusage gilt? |
| F2 | „Nach Absprache prüfen wir außerdem Aufträge in **Potsdam, Schönefeld** und weiteren Orten im Berliner Umland" | 10 Leistungsseiten, `/`, `/ueber-uns`, Kombi Mitte | Trifft weiterhin zu? Warum nur dort und nicht auf Bezirks-/Kombiseiten? |
| F3 | „Antwort **innerhalb von 2 Stunden** während der Geschäftszeiten" | `owner.ts:46`, Startseite, `heroTrust` | Haltbar? |
| F4 | „bei der **Allianz** betriebshaftpflichtversichert (Deckungssumme **5 Mio. €**)" | `ueber-uns/page.tsx:391`, `heroTrust.tsx:114` | Police aktuell? Nennung des Versicherers gewollt? |
| F5 | Produktnamen **Kiehl, Dr. Schnell, Buzil** | `BueroreinigungBerlinContent.tsx:516` u. a. | Bereits vorhanden — bleiben unverändert (§1). Nur bestätigen, dass die Angabe stimmt. |
| F6 | Gastronomiereinigung: Leistungsumfang, Küchenmittel, Fettabscheider/Dunstabzug | `services.ts:755–761` — **die Datei fordert diese Prüfung selbst ein** | Seit Juli 2026 offen. Vor Veröffentlichung klären. |
| F7 | „Glanzwerk arbeitet in **allen zwölf** Berliner Bezirken" | sitewide | Konsistent zu F2? |
| F8 | Google-Bewertungen (7 Stück laut Vor-Audit) | `googleBusiness.ts` | Aktueller Stand — `/bewertungen` ist bewusst leer und soll es bleiben, bis echte Rückmeldungen vorliegen |
| F9 | Ortsteil-Listen in den Klasse-A-Kombiseiten | z. B. `GebaeudereinigungCharlottenburgWilmersdorfContent.tsx:87` | Amtliche Ortsteile — faktisch korrekt, aber: sollen alle genannt werden? |

---

## 11. Seiten, die bereits gut genug sind — NICHT unnötig ändern

**Regel „Bewahre gute Inhalte" gilt hier ausdrücklich.**

| Seite | Warum unangetastet lassen |
|---|---|
| `/leistungen/kanzleireinigung-berlin` | ~1.205 W, Vertraulichkeit als durchgehendes eigenes Argument, 10 eigene FAQ |
| `/leistungen/gebaeudereinigung-berlin` | ~1.175 W, Bündel-Logik sauber gegen Einzelleistungen abgegrenzt |
| `/leistungen/bueroreinigung-berlin` | ~1.135 W, konkrete Intervall-Karten, echte Kostenfaktoren-Liste |
| `/leistungen/praxisreinigung-berlin` | ~1.134 W, saubere Abgrenzung zur medizinischen Instrumentenaufbereitung |
| `/ueber-uns` | ~895 W, eigene Stimme, belegte Fakten, Inhaber mit Namen |
| `/umwelt-verantwortung` | ~492 W, konkret statt Siegel-Marketing |
| `/leistungen/gebaeudereinigung-berlin/mitte` | beste Kombiseite: eigene Preisfaktoren, Mehrmietparteien-Logik |
| `/leistungen/bueroreinigung-berlin/pankow` | Wohn-/Gewerbemischung als durchgehendes Argument, eigene FAQ, eigener CTA |
| `/leistungen/bueroreinigung-berlin/mitte` | enge Zeitfenster als tragendes Argument, eigene FAQ |
| `/leistungen/praxisreinigung-berlin/charlottenburg-wilmersdorf` | eigene FAQ mit echter Desinfektions-Abgrenzung |
| `/wissen/nachhaltige-gebaeudereinigung` | redaktionell die stärkste Seite überhaupt — konkret, prüfbar, anti-Marketing |
| `/wissen/reinigungsdienstleister-auswaehlen` | inhaltlich stark *(nur die Dopplung zu `/reinigungsfirma-berlin` ist zu lösen — und zwar auf der anderen Seite)* |
| **Alle 47 Kombi-Intros** | 47 verschiedene Satzeinstiege, faktisch sauber. Ergänzen ja, umschreiben nein. |
| **Alle `localContext` in `districts.ts`** | belegbar, pro Bezirk verschieden, ohne erfundene Lokalfakten |
| **`seoHeadings.test.ts`** | erzwingt eindeutige H1 sitewide — schützt die Runde. Nicht abschwächen. |

---

## 12. Empfehlung: womit anfangen

### Vorab — eine Entscheidung, die keine Redaktionsentscheidung ist

Die 38 Klasse-D-Kombiseiten lassen sich **nicht wegredigieren**. Regel §2D verbietet mir, Seiten eigenmächtig zusammenzulegen, zu löschen oder auf noindex zu setzen. Es gibt drei Wege, und du musst wählen — sonst arbeiten wir 38 Mal an einem Symptom:

**A · Ausbauen** — jede der 38 Seiten auf Klasse-B-Niveau bringen (localAngle, scopeBullets, processText, eigene FAQ, eigener CTA — das Muster von `bueroreinigung-berlin/pankow`). Realistisch ~450–550 W eigener Text pro Seite. *Voraussetzung: für jeden Bezirk existiert ein echtes, belegbares Argument für diese Leistung.* Wo nicht → Weg B oder C.

**B · Konsolidieren** — Kombiseiten ohne eigenes Argument entfernen und ihre Substanz in die Bezirksseite bzw. Hauptleistungsseite hochziehen. Reduziert das Inventar, konzentriert die Signale. Erfordert Redirects — deshalb ausdrücklich deine Freigabe (§16).

**C · Selektiv** — die wirtschaftlich relevanten ausbauen (Weg A), den Rest konsolidieren (Weg B). Der Kommentar in `combos.ts:30–34` beschreibt genau diese Absicht („nur Kombinationen mit echtem eigenem Inhalt und Suchintention") — sie ist nur bei 9 von 47 tatsächlich eingelöst.

**Meine Empfehlung: C.** Kriterium für „ausbauen" sollte nicht Bauchgefühl sein, sondern: *Gibt es für diesen Bezirk ein Argument zu dieser Leistung, das für die anderen 11 Bezirke nicht genauso gilt?* Bei `autohausreinigung/spandau` (Gewerbegebiete, Werkstätten) — ja. Bei `grundreinigung/mitte` (21 Wörter über Bauarbeiten und Neubezug, gilt überall) — vermutlich nein.

### Erste Leistungsfamilie: Gebäudereinigung

Begründung:
1. **Wichtigstes Keyword.** Die Kannibalisierung `/` ↔ `/leistungen/gebaeudereinigung-berlin` (P0-3) blockiert den Kopf-Begriff der gesamten Website. Solange die nicht entschieden ist, arbeiten alle anderen Familien unter einem ungeklärten Hub.
2. **Größte Familie.** 11 von 47 Kombis — fast ein Viertel des Problems in einem Durchgang.
3. **Enthält den schlimmsten Befund.** Das 85–89-%-Klon-Cluster (P0-2) ist der einzige Fall, in dem die vorige Runde aktiv Schaden angelegt hat statt nur Lücken zu lassen.
4. **Enthält alle Ausbaustufen.** 6 × Klasse A, 5 × Klasse D. Die hier getroffenen Entscheidungen — wie tief muss eine Kombiseite sein, wie individualisiert man eine Bezirks-Argumentation ohne Lokalfakten zu erfinden — sind die Vorlage für alle folgenden Familien.
5. **Klarer Referenzmaßstab vorhanden.** `gebaeudereinigung-berlin/mitte` zeigt bereits, wie eine gute Kombiseite dieser Familie aussieht. Wir kopieren nicht ihre Struktur (§17), aber ihr Anspruchsniveau.

**Danach in dieser Reihenfolge:** Bezirks-Hubs + Ortsteile (Rang 2) → Unterhaltsreinigung (Rang 3, weil höchste Kannibalisierungs-Zentralität) → Praxis → Treppenhaus/Glas → Rest.

**`/reinigungsfirma-berlin`** (P1-5) ist ein Sonderfall: keine Familie, aber laut §15 die zentrale kommerzielle Hub-Seite. Ich würde sie **direkt nach Gebäudereinigung** angehen, weil die Entscheidung „was ist Hub, was ist Leistung" in beiden Fällen dieselbe ist.

---

## Anhang A — Die 38 Klasse-D-Kombiseiten

Format: `URL` — Wörter im Intro (= praktisch der gesamte eigene Text der Seite)

**Büroreinigung (5):** charlottenburg-wilmersdorf 31 · friedrichshain-kreuzberg 28 · tempelhof-schoeneberg 25 · neukoelln 28 · steglitz-zehlendorf 24
**Gebäudereinigung (5):** treptow-koepenick 31 · marzahn-hellersdorf 27 · lichtenberg 27 · reinickendorf 27 · spandau 24
**Praxisreinigung (5):** steglitz-zehlendorf 25 · mitte 27 · marzahn-hellersdorf 28 · reinickendorf 28 · pankow 29
**Unterhaltsreinigung (6):** friedrichshain-kreuzberg 20 · steglitz-zehlendorf 25 · treptow-koepenick 30 · marzahn-hellersdorf 28 · lichtenberg 29 · reinickendorf 29
**Treppenhausreinigung (4):** tempelhof-schoeneberg 24 · neukoelln 28 · pankow 25 · charlottenburg-wilmersdorf 27
**Glas- und Fensterreinigung (4):** lichtenberg 32 · charlottenburg-wilmersdorf 37 · mitte 35 · tempelhof-schoeneberg 31
**Grundreinigung (3):** neukoelln 27 · mitte 21 · treptow-koepenick 24
**Kanzleireinigung (3):** mitte 22 · charlottenburg-wilmersdorf 28 · steglitz-zehlendorf 30
**Einzelne (3):** kita-und-schulreinigung/pankow 32 · fitnessstudioreinigung/friedrichshain-kreuzberg 20 · autohausreinigung/spandau 19

## Anhang B — Linklücken auf Ortsteilseiten

| Ortsteilseite | bewirbt Leistung ohne Kombi-URL im Bezirk |
|---|---|
| `/standorte/charlottenburg-wilmersdorf/charlottenburg` | autohausreinigung |
| `/standorte/charlottenburg-wilmersdorf/wilmersdorf` | unterhaltsreinigung |
| `/standorte/steglitz-zehlendorf/zehlendorf` | kita-und-schulreinigung |
| `/standorte/tempelhof-schoeneberg/schoeneberg` | kanzleireinigung, unterhaltsreinigung |
| `/standorte/neukoelln/rudow` | unterhaltsreinigung |
| `/standorte/treptow-koepenick/koepenick` | praxisreinigung, glas-und-fensterreinigung |

---

**Bestätigung zu diesem Audit:** Es wurden keine Website-Inhalte, Überschriften, Metadaten, URLs oder internen Links verändert. Keine Unternehmensfakten wurden korrigiert, ergänzt oder erfunden. Alle Zahlenangaben stammen aus messbarer Auswertung des Repositorys.
