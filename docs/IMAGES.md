# Bilder-Konzept

## Aktueller Stand

Die Website nutzt vier Bildquellen:

1. **Markenbezogene Grafiken**: Das echte Original-Logo (`public/brand/`,
   direkt von der bestehenden Live-Website heruntergeladen, 3830×1948px,
   nicht zugeschnitten oder nachgebaut), Service-Icons
   (`src/components/ui/ServiceIcon.tsx`), Signature-Element „Glanzstreifen"
   (`src/components/ui/GlanzMark.tsx`).
2. **Vom Betreiber geliefertes Bilderpaket** (`public/images/leistungen/`,
   Juli 2026, korrigierte Fassung vom 20.07.) – 20 lokale PNGs (zwei je
   Leistungsseite: `hero.png` **ersetzt das bisherige Hero-Motiv** der
   Leistungsseite, `cta-unten.png` als Hintergrund des Abschluss-CTA),
   zugeordnet über `src/data/serviceContentPhotos.ts`. Die erste Paketfassung
   hatte dieselben Bilder fälschlich als "Mittelbereich"-Bild neben dem
   Hero eingesetzt; das wurde korrigiert – Mittelbereich zeigt jetzt
   ausschließlich Text, keine Bildwiederholung. Anders als die
   Unsplash/Pexels-Fotos werden diese lokal über `next/image` ausgeliefert
   (automatische WebP/AVIF-Optimierung, responsive Größen, individuelles
   `object-position` je Bild), ohne `remotePatterns`-Eintrag nötig. Siehe
   Abschnitt „Stufe 5b" weiter unten für die vollständige Zuordnung.
3. **Vom Betreiber geliefertes Bilderpaket „Glanzwerk Wissen"** (`public/images/wissen/`,
   Juli 2026) – 9 lokale, im Illustrationsstil gehaltene Grafiken (eine je
   Wissen-Artikel), zugeordnet über das `image`-Feld in `src/data/articles.ts`
   (`ArticleImage`-Typ: `{src, alt}`, lokal statt Unsplash/Pexels-URL).
   Ersetzen vollständig die vorher dort verwendeten Stock-Fotos – keines der
   alten Bilder erscheint in „Glanzwerk Wissen" noch weiter. Das dadurch
   verwaiste `facadeCleaning`-Foto wurde aus `src/data/photos.ts` entfernt,
   da es nirgendwo sonst mehr referenziert wurde (alle anderen bisher für
   Wissen-Artikel genutzten Fotos bleiben in Verwendung, siehe Tabelle):

   | Artikel-Slug | Bilddatei | Vorheriges Foto (weiterhin anderswo verwendet) |
   |---|---|---|
   | was-kostet-gebaeudereinigung | `was-kostet-gebaeudereinigung.png` | buildingFacade (Standorte-Hero, Homepage) |
   | wie-oft-buero-reinigen | `wie-oft-buero-reinigen.png` | officeCleaningTeam (**seit 21.07. entfernt** – falsches Motiv mit Personen in roter/orangefarbener Arbeitskleidung, siehe Korrektur-Abschnitt unten) |
   | unterhaltsreinigung-oder-grundreinigung | `unterhaltsreinigung-oder-grundreinigung.png` | moppingFloor (**seit 21.07. entfernt**, siehe Korrektur-Abschnitt unten) |
   | reinigung-arztpraxen | `reinigung-arztpraxen.png` | medicalPracticeInterior (serviceMidPhotos Praxisreinigung) |
   | glasreinigung-tipps | `glasreinigung-tipps.png` | facadeCleaning (**entfernt, war verwaist**) |
   | buerohygiene-massnahmen | `buerohygiene-massnahmen.png` | routineCleaningTeam (serviceMidPhotos Unterhaltsreinigung) |
   | nachhaltige-gebaeudereinigung | `nachhaltige-gebaeudereinigung.png` | dosingLiquid (**seit 21.07. entfernt**, siehe Korrektur-Abschnitt unten) |
   | reinigungsdienstleister-auswaehlen | `reinigungsdienstleister-auswaehlen.png` | businessHandshake (3-Monate-Seite, Kontakt) |
   | objektbesichtigung-vorbereiten | `objektbesichtigung-vorbereiten.png` | brightStaircase (serviceMidPhotos Treppenhausreinigung) |

4. **Kuratierte, lizenzfreie Fotos von Unsplash und Pexels**
   (`src/data/photos.ts`) – jede URL wurde vor Einbindung per
   HTTP-Statuscheck verifiziert und zeigt, wo immer verfügbar, eine
   Person bei der eigentlichen Reinigungstätigkeit statt eines leeren
   Raumfotos (z. B. „Reinigungskraft putzt ein Fenster in einem
   Klassenzimmer" statt eines bloßen Klassenzimmerfotos). Alle 12
   Leistungsseiten haben ein eigenes, passendes Foto, das zusätzlich auf
   den Leistungs-Karten (Startseite, Leistungsübersicht, verwandte
   Leistungen) wiederverwendet wird.

## Bildstimmung: 80 % warm/persönlich, ~20 % premium/editorial

Bewusste Mischung zweier Stimmungen (Entscheidung vom 2026-07-19), statt
eines einheitlichen Stils:

- **Warm & persönlich** (Regelfall, ~80 %): echte Personen bei der
  Reinigungstätigkeit, freundlich und nahbar – stützt die Kernaussage
  „persönlicher Ansprechpartner statt anonymer Callcenter". Gilt für alle
  Leistungsseiten außer den drei unten genannten.
- **Premium/editorial** (bewusste Ausnahme, ~20–30 %): ruhige, hochwertige
  Architektur-/Interieuraufnahmen ohne Personen, zurückhaltende Farben.
  Eingesetzt bei:
  - Startseiten-Hero (`heroCleaningTeam`) – erster Eindruck der Seite
  - Gebäudereinigung (`buildingFacade`) – Flaggschiff-Leistung
  - Praxisreinigung (`medicalPracticeInterior`) – Behandlungsraum ohne
    Personen wirkt bei einer Arztpraxis unaufdringlicher als eine
    Reinigungsszene
  - Kanzleireinigung (`lawOfficeReception`) – passt zum diskreten,
    vertraulichen Ton, den der Seitentext für Kanzleien setzt
  - Treppenhausreinigung (`brightStaircase`) – helles, gepflegtes
    Treppenhaus statt eines dunklen Wagens vor fremder Beschriftung
  - Kita- & Schulreinigung (`kitaInterior`) – helles, buntes Gruppenzimmer
    statt eines dunklen, unklaren Motivs; zeigt bewusst keine Kinder

**Wichtig bei Interieur-Fotos ohne Personen:** immer auf sichtbare fremde
Marken/Logos/Beschriftungen im Bild prüfen (z. B. Praxis-Namen auf
Empfangstresen, Ladenschilder oder Sicherheitshinweise in fremder Sprache
im Hintergrund). Bereits zwei Kandidaten wurden deshalb verworfen: ein
Praxis-Foto mit deutlich lesbarem Namen und Logo einer echten russischen
Klinik, und ein Über-uns-Foto mit lesbarer Mieterbeschriftung eines realen
US-Bürogebäudes ("Digital Realty", "LAX10", "600 W 7th Street").
Namensschilder an Uniformen sind ein verwandtes Risiko – ein
Unterhaltsreinigung-Kandidat trug ein Namensschild ("Jennifer Winter") mit
Hausmarken-Logo einer fremden (vermutlich US-amerikanischen)
Reinigungsfirma und wurde ebenfalls verworfen.

Verwendete Unsplash-Fotos (Unsplash-Lizenz, kostenlose kommerzielle Nutzung,
keine Zuschreibung verpflichtend):

| Verwendung | Foto-ID |
|---|---|
| Hero (Startseite, Vollflächen-Hintergrund) | `photo-1696592877184-ae59bf25fdd4` |
| Gebäudereinigung | `photo-1540762693098-50320eb8a752` |
| Fensterreinigung | `photo-1746905205773-3ea50c8cd808` |
| Glasreinigung (Fassade) | `photo-1776617130431-de13d5b4cbfe` |
| Fitnessstudioreinigung | `photo-1761971974992-6df33df97c3a` |
| Autohausreinigung | `photo-1777175013302-eaf4b3ef785a` |

Verwendete Pexels-Fotos (Pexels-Lizenz, kostenlose kommerzielle Nutzung,
keine Zuschreibung verpflichtend) – ersetzen seit Juli 2026 mehrere zu
generische Unsplash-Raumfotos durch Fotos mit Personen bei der
Reinigungsarbeit. Stand 2026-07-19, nach einer zweiten, gründlicheren
Prüfrunde (Referenz: glanzwerkberlin.de und weitere Berliner Anbieter),
in der insgesamt sieben Fotos wegen s/w-Bild, sichtbarer Fremdmarken/
Beschriftung oder unpassendem Ton/Kontext ausgetauscht wurden:

| Verwendung | Foto-ID |
|---|---|
| Praxisreinigung | `6812461` (Behandlungsraum, premium/editorial, keine Personen) |
| Unterhaltsreinigung | `9462109` |
| Treppenhausreinigung | `6345073` (helles Treppenhaus, premium/editorial, keine Personen) |
| Grundreinigung | (**seit 21.07. entfernt und ersetzt**, siehe Korrektur-Abschnitt unten) |
| Kita- & Schulreinigung | `8535620` (Gruppenzimmer, premium/editorial, keine Personen) |
| Kanzleireinigung | `36631639` (Empfang, premium/editorial, keine Personen) |
| Über uns (Equipment, mit Logo-Badge) | `34516664` |

Die bisherigen Büroreinigungs- und Über-uns/Team-Fotos wurden am 21.07.2026
vollständig entfernt – siehe Korrektur-Abschnitt unten.

Das Equipment-Foto auf der Über-uns-Seite trägt ein kleines, klar als
UI-Element erkennbares Logo-Badge (weiße Karte, Schatten, wie das
Marken-Badge auf dem Hero-Foto) – bewusst **kein** in das Bild
hineinretuschiertes Logo auf Fahrzeug/Kleidung, um keine unrealistische
Fotomontage zu erzeugen.

## Neue Fotos aus dem verbindlichen Arbeitsauftrag (Stufe 1–4, Juli 2026)

Für die neuen Seiten „Umwelt & Verantwortung" und „3 Monate flexibel
testen" sowie den ausgebauten Wissen-Hub wurden zwei zusätzliche
Pexels-Fotos aufgenommen (gleicher Verifikationsprozess: HTTP-Check,
Download, visuelle Prüfung auf Fremd-Branding vor Einbindung):

| Verwendung | Foto-ID | Hinweis |
|---|---|---|
| Umwelt & Verantwortung (Hero) | `dosingLiquid` | **Seit 21.07. entfernt und ersetzt**, siehe Korrektur-Abschnitt unten |
| 3 Monate flexibel testen (Hero) | `6918529` (`businessHandshake`) | Handschlag zweier Geschäftspartner – passt zum Thema „Zusammenarbeit testen", keine erkennbaren Fremdmarken |

`professionalCleaner` wurde ursprünglich sowohl auf Über-uns als auch als
Hero-Bild von `/wissen` wiederverwendet – seit 21.07.2026 vollständig
entfernt, siehe Korrektur-Abschnitt unten.

## Stufe 5b: Bilderpaket Leistungsseiten (Juli 2026, vom Betreiber geliefert, korrigiert am 20.07.)

Herkunft: vom Betreiber als `Glanzwerk_Bilderpaket_fuer_Claude.zip` bereitgestellt,
Lizenz-/Nutzungsrecht liegt beim Betreiber (nicht recherchiert, sondern
direkt übergeben). Alle 20 Bilder vor Einbau visuell auf Fremd-Branding,
Text-in-Bild und Logos geprüft – unauffällig.

**Korrektur 20.07.2026:** Die erste Fassung hatte die `01-*`-Bilder als
zusätzliches Mittelbereich-Bild neben dem bestehenden Hero eingesetzt.
Auf ausdrückliche Anweisung des Betreibers wurde das korrigiert: Die
Dateien (identisch zur ersten Fassung, nur umbenannt von
`mittelbereich.png` zu `hero.png`) **ersetzen jetzt das bisherige
Hero-Motiv** jeder Leistungsseite; der Mittelbereich zeigt nur noch Text
(kein Bildduplikat). Vollständige Zuordnung:

| Leistungsseite | Hero-Datei (ersetzt bisheriges Hero-Foto) | CTA-unten-Datei | object-position |
|---|---|---|---|
| Büroreinigung | `bueroreinigung-berlin/hero.png` | `.../cta-unten.png` | 30% 45% |
| Praxisreinigung | `praxisreinigung-berlin/hero.png` | `.../cta-unten.png` | 30% 55% |
| Kita- & Schulreinigung | `kita-und-schulreinigung-berlin/hero.png` | `.../cta-unten.png` | 65% 60% |
| Gastronomiereinigung (neu) | `gastronomiereinigung-berlin/hero-kitchen.png` (**vom Betreiber am 20.07. ersetzt** – identisch zum bisherigen CTA-unten-Bild, jetzt zusätzlich als Hero; eigener Dateiname statt `hero.png` wegen `immutable`-Cache-Headern von `next/image` – gleicher Dateiname hätte alte Browser-Caches nicht invalidiert) | `.../cta-unten.png` (unverändert, zeigt jetzt dasselbe Motiv wie der Hero) | 80% 55% |
| Treppenhausreinigung | `treppenhausreinigung-berlin/hero.png` | `.../cta-unten.png` | 20% 55% |
| Glas- und Fensterreinigung (fusioniert) | `glas-und-fensterreinigung-berlin/hero.png` | `.../cta-unten.png` | 70% 40% |
| Grundreinigung | `grundreinigung-berlin/hero.png` | `.../cta-unten.png` | 55% 55% |
| Autohausreinigung | `autohausreinigung-berlin/hero.webp` (**vom Betreiber am 20.07. manuell ersetzt** – Mitarbeiter mit Wischmopp im Autohaus-Showroom, CTA-unten unverändert aus dem Paket) | `.../cta-unten.png` | 78% 55% |
| Unterhaltsreinigung | `unterhaltsreinigung-berlin/hero.png` | `.../cta-unten.png` | 45% 50% |
| Gebäudereinigung | `gebaeudereinigung-berlin/hero.png` | `.../cta-unten.png` | 65% 50% |

Kanzleireinigung und Fitnessstudioreinigung waren nicht Teil des Pakets –
ihr bisheriges Hero-Foto (Unsplash/Pexels) bleibt unverändert, der übrige
Seitenaufbau (Vorteile, Problem, Ablauf, Vertrauen) ist identisch.

## Stufe 5: verbleibende Hauptseiten bebildert

Die vier bis dahin komplett bildfreien Hauptseiten haben jetzt denselben
zweispaltigen Hero (Text links, Foto rechts, `priority`) wie die übrigen
neuen Seiten – ausschließlich Wiederverwendung bereits geprüfter Fotos:

| Seite | Foto |
|---|---|
| `/standorte` | `buildingFacade` |
| `/kontakt` | `businessHandshake` |
| `/bewertungen` | `cleaningEquipment` |
| `/reinigungsfirma-berlin` | `windowCleaning` |

Die 9 Wissen-Artikel (`src/data/articles.ts`) hatten in Stufe 4 zunächst
ein `image`-Feld mit Wiederverwendung vorhandener `photos.ts`-Fotos;
seit der vollständigen Bilderneuerung „Glanzwerk Wissen" (siehe Bullet 3
oben) zeigen alle 9 Artikel eigene, lokale Illustrationen statt
Stock-Fotos.

## Korrektur falscher Stockfotos (21.07.2026)

Vier vom Betreiber als fachlich/inhaltlich falsch identifizierte Stockfotos
wurden vollständig ersetzt und aus dem Repository entfernt (Registry-Einträge
in `photos.ts` gelöscht, keine der alten Pexels-IDs kommt danach noch
irgendwo im Repository vor). Drei Ersatzbilder wurden von Pexels
heruntergeladen und lokal zugeschnitten, eines wurde vom Betreiber direkt
als Datei geliefert; alle vier liegen als WebP unter `public/images/` (kein
Hotlinking mehr für diese vier Motive):

| Bisher | Ersetzt durch | Neuer Pfad | Einsatzort(e) |
|---|---|---|---|
| `officeCleaningTeam` (Personen in roter/oranger Arbeitskleidung – falsches Motiv) | Pexels [1170412](https://www.pexels.com/photo/modern-office-space-with-desktops-1170412/), zugeschnitten auf 16:10 | `public/images/leistungen/bueroreinigung-berlin/mittelbereich.webp` | Mittelbereich „So läuft die Büroreinigung ab“ |
| `professionalCleaner` (Frau mit Staubwedel/Sprühflasche – falsches Motiv) | Pexels [10567236](https://www.pexels.com/photo/rag-and-cleaner-on-desk-10567236/), zugeschnitten auf 4:3 | `public/images/wissen/hero-wissen.webp` | Hero-Bild `/wissen` |
| `dosingLiquid` (Abfüllbild) | Pexels [5217779](https://www.pexels.com/photo/green-detergent-bottle-with-sprayer-and-sponge-with-plate-5217779/), zugeschnitten auf 4:3 | `public/images/umwelt-verantwortung/dosierung.webp` | Startseite „Bewusster Ressourceneinsatz statt Chemie-Maximum“, Hero `/umwelt-verantwortung` |
| `moppingFloor` (Mann mit normalem Wischmopp – falsches Motiv) | vom Betreiber geliefertes Foto einer Einscheibenmaschine in Nahaufnahme (keine Person im Bild, vom Betreiber ausdrücklich bestätigt), zugeschnitten auf 16:10 mit Erhalt des vollständigen Maschinen-Ausschnitts | `public/images/leistungen/grundreinigung-berlin/grundreinigung-einscheibenmaschine.webp` | Mittelbereich „So läuft die Grundreinigung ab“ |

Die vier bisherigen Pexels-Bild-IDs kommen nach dieser Korrektur an keiner
Stelle im Repository mehr vor (Registry-Einträge in `photos.ts` gelöscht,
projektweite Suche bestätigt).

Alt-Texte: „Helles, modernes Büro mit gepflegten Arbeitsplätzen“ /
„Reinigungsmittel und Reinigungstuch an einem gepflegten Arbeitsplatz“ /
„Wiederverwendbare Reinigungsutensilien für einen bewussten
Ressourceneinsatz“ / „Professionelle Grundreinigung eines Bodens mit einer
Einscheibenmaschine“.

**Ungeplante Zusatzänderung – Über-uns-Hero:** `professionalCleaner` wurde
zusätzlich (ohne dass es Teil des Auftrags war) als Hero-Bild von
`/ueber-uns` verwendet. Da die alte Foto-ID vollständig verschwinden musste,
war an dieser Stelle zwangsläufig ein Ersatz nötig. Der naheliegende
Rückgriff auf `routineCleaningTeam` (bereits im Projekt vorhanden) wurde
geprüft und verworfen: Ein direkter Bildvergleich zeigt nachweislich
dieselbe Person/denselben Fotoshoot wie das zu entfernende Bild (beide aus
derselben Pexels-Foto-Serie desselben Fotografen). Stattdessen wird auf
`/ueber-uns` jetzt
`buildingFacade` verwendet (bereits an anderer Stelle im Projekt geprüft und
im Einsatz). Rückmeldung dazu ausdrücklich erwünscht, falls ein anderes
Motiv gewünscht ist.

Das Grundreinigung-Ersatzfoto zeigt bewusst nur die Maschine ohne Person
im Bild (vom Betreiber nach Rückfrage ausdrücklich bestätigt) – der
vorgesehene Alt-Text „Professionelle Grundreinigung eines Bodens mit einer
Einscheibenmaschine“ beschreibt entsprechend nur die Maschine, keine Person.

## Konzept für zukünftige echte Projektfotos

Sobald eigene Fotos vom Team oder von Objekten vorliegen, ersetzen diese die
Unsplash-Platzhalter nach folgendem Schema:

### Dateinamen
Sprechend, kleingeschrieben, mit Bindestrichen:
- `bueroreinigung-berlin.webp`
- `praxisreinigung-berlin.webp`
- `gebaeudereinigung-berlin-mitte.webp`
- `team-glanzwerk-berlin.webp`

### Formate
- Primärformat: **WebP**, mit **AVIF** als zusätzliche Variante
  (`next.config.ts` liefert bereits `formats: ["image/avif", "image/webp"]`
  aus)
- Weiterhin `next/image` verwenden – liefert automatisch responsive
  Varianten und die konfigurierten Formate aus

### Größen
- Hero-/LCP-Bild: ausreichend groß für Retina-Displays, aber nicht größer
  als nötig (aktuell `sizes="(min-width: 1024px) 560px, 100vw"`), mit
  `priority` gesetzt und **ohne** Lazy Loading
- Karten-/Vorschaubilder: deutlich kleiner
- Immer `fill` mit definiertem `aspect-*`-Container, um Layout-Shift zu
  vermeiden (bereits durchgängig so umgesetzt)

### Lazy Loading
- Alles unterhalb des ersten sichtbaren Bereichs: Standardverhalten von
  `next/image` (automatisches Lazy Loading außer bei `priority`)
- Hero- und Leistungsseiten-Bilder oberhalb des Falls: `priority` gesetzt

### Alt-Texte
- Beschreiben den tatsächlichen Bildinhalt, keine Keyword-Aufzählung
  (siehe Tabelle oben – z. B. „Modernes, helles Wartezimmer einer Praxis“)
- Rein dekorative Grafiken (Signature-Element, Icons): `aria-hidden="true"`
- Für zukünftige eigene Fotos: Alt-Text erst schreiben, wenn der tatsächliche
  Bildinhalt bekannt ist – keine Alt-Texte auf Verdacht erfinden

## Neues Startseiten-Foto (02.08.2026, vom Betreiber geliefert)

Der Vertrauensabschnitt der Startseite („Eine Gebäudereinigung muss vor allem
zuverlässig funktionieren") zeigt nicht mehr das Pexels-Foto einer einzelnen
Reinigungskraft am Regal, sondern ein vom Betreiber geliefertes, lizenziertes
Adobe-Stock-Foto (`AdobeStock_2051616478`).

| Registry-Eintrag | Datei | Format | Einsatzort |
|---|---|---|---|
| `teamBriefing` | `public/images/startseite/reinigungsteam-abstimmung.webp` | 2400 × 1351 px, WebP q82, 136 KB (Quelle 5456 × 3072 JPEG) | Startseite, Vertrauensabschnitt |

Zwei Entscheidungen dazu, damit sie nachvollziehbar bleiben:

1. **Neuer Registry-Eintrag statt Überschreiben von `routineCleaningTeam`.**
   Jener Eintrag hängt zusätzlich am Mittelteil der Unterhaltsreinigungs-Seite
   (`serviceMidPhotos.ts`). Ein direktes Überschreiben hätte dieses Bild dort
   stillschweigend mitgetauscht, was nicht beauftragt war. Der alte Eintrag
   bleibt deshalb unverändert bestehen und wird weiterhin dort verwendet.

2. **`objectPosition: 84% 45%`.** Die Bildspalte ist ab Desktop hochformatig
   (3:4), die Aufnahme ist Querformat (16:9) — es sind also nur rund 42 % der
   Bildbreite sichtbar. Bei mittiger Ausrichtung wurde die rechte der beiden
   Personen angeschnitten; 84 % rückt den Ausschnitt so weit nach rechts, dass
   beide Personen, das Tablet und der Reinigungswagen vollständig im Bild
   stehen. Auf dem Telefon (4:3) ist der Ausschnitt breiter und zeigt
   zusätzlich die Flurtiefe.

## Umwelt & Verantwortung — Redesign nach Designreferenz (15.08.2026)

Die Illustrationen `umwelt-hippie-peace.webp` (Hero) und `umwelt-hippie-baum.webp`
(Bild-Text-Abschnitt) sind durch sechs kuratierte Unsplash-Fotos ersetzt
(Unsplash-Lizenz, kostenlose kommerzielle Nutzung, keine Zuschreibung
verpflichtend). Direktlinks vor Einbindung per HTTP-Statuscheck verifiziert.
Beide Dateien bleiben unverändert im Projekt liegen, werden aber auf dieser
Seite nicht mehr referenziert.

| Registry-Eintrag (`photos.ts`) | Foto-ID | Einsatzort |
|---|---|---|
| `ecoOfficeGreenery` | `photo-1765371513276-a74f1ecbcf7d` | Hero |
| `ecoForestLight` | `photo-1605467518368-b959213686dd` | Signature-Banner „Wir können auch grün." |
| `ecoWaterDroplet` | `photo-1450696714834-bb5b4aee70d3` | Praxis-Karte „Wasser bewusst einsetzen" |
| `ecoRecyclingBins` | `photo-1532996122724-e3c354a0b15b` | Praxis-Karte „Mülltrennung gehört zum Arbeitsalltag" |
| `ecoCleaningSpray` | `photo-1550963295-019d8a8a61c5` | Praxis-Karte „Desinfektion dort, wo sie sinnvoll ist" |
| `ecoForestCanopy` | `photo-1701157121748-aa59ab87f983` | Praxis-Karte „Verantwortung endet nicht beim Reinigungsmittel", Untergrund Abschluss-CTA (jetzt `tone="eco"`, siehe unten) |

**Korrektur 15.08.2026 (nach erster Durchsicht durch den Betreiber):** Zwei
der sechs Erstauswahlen wurden ausgetauscht.

- `ecoOfficeGreenery` zeigte zunächst `photo-1765371514743` — einen engen,
  unruhigen Ausschnitt einer Besprechungsecke mit einem Blatt, das den
  halben Vordergrund verdeckte. Ausgetauscht gegen `photo-1765371513276`
  (heller Schreibtisch, grosse frei stehende Pflanze, Vorhang mit
  Lichteinfall) — deutlich stärkere „Atmosphäre". Zusätzlich läuft das
  Hero-Foto jetzt im Seitenverhältnis 3:4 statt 4:3 (`BrandPhoto
  aspect="aspect-[3/4]"`), weil die Aufnahme selbst hochformatig ist
  (~0,7:1) und bei 4:3 oben/unten zu viel weggeschnitten worden wäre.
- `ecoRecyclingBins` zeigte zunächst `photo-1611284446314` — australische
  Compost/Waste/Recycle-Tonnen mit vollflächig bedrucktem Etikett
  (englischer Fließtext, darauf erkennbare Fast-Food-Verpackungslogos in
  der Foto-Collage). Verstößt gegen die oben dokumentierte Regel zu
  Fremdmarken/Beschriftung im Bild. Ausgetauscht gegen
  `photo-1532996122724` (vier einfarbige Mülltonnen ohne jede Beschriftung
  vor einer schlichten Wand).

**Abschluss-CTA jetzt in Grün statt Blau:** `CTASection` hat einen neuen,
rein additiven Prop `tone?: "brand" | "eco"` (Vorgabe weiterhin `"brand"` —
alle 30 übrigen Einsatzstellen der Komponente sind dadurch unverändert).
Bei `tone="eco"` läuft die Grundfläche in `eco-800 → eco-600` statt
`brand-900 → brand-800`, und die Bildabdunkelung ist deutlich schwächer
(55–78 % statt 85–92 % Deckung) — das Foto soll hier sichtbar Grün tragen,
nicht unter der Farbe verschwinden. Nur `/umwelt-verantwortung` setzt
diesen Prop.

Zusätzlich neu auf dieser Seite: die vom Betreiber bereitgestellten,
freigegebenen Original-Logodateien `public/images/marken/dr-schnell.webp`
und `public/images/marken/deiss.webp` (beide lagen bereits unverändert im
Projekt, waren aber in `src/data/productLogos.ts` noch nicht freigeschaltet
— siehe dortigen Freigabe-Kommentar). Keine Zertifikats-/Eco-Label-Grafiken
verwendet; nur diese zwei Marken, unverändert, ohne Partnerschafts-Aussage.

## Hero-Neufassung (15.08.2026, vom Betreiber geliefertes Foto)

Ausschließlich der Hero von `/umwelt-verantwortung` ist erneut überarbeitet
worden — Aufbau/Größe/Typografie/Conversion-Struktur orientiert sich jetzt
am Hero der Startseite (`HeroStage`-Prinzip: derselbe DOM auf jeder Breite,
< 1024 px randloses Bildband im Fluss, ≥ 1024 px absolut positionierte
Bühne mit weißem Tageslichtverlauf hinter der Textspalte). `BrandPhoto`
(gerahmtes 3:4-Kartenfoto) ist dort nicht mehr im Einsatz.

| Registry-Eintrag | Datei | Einsatzort |
|---|---|---|
| `ecoHeroLeafSkyline` | `public/images/umwelt-verantwortung/hero-naturnah-berlin.webp` (1536×1024, WebP q85, vom Betreiber als PNG geliefert und lokal re-encodiert) | Hero `/umwelt-verantwortung` |

`ecoOfficeGreenery` bleibt unverändert in der Registry bestehen (bisheriges
Hero-Foto), wird aber seit dieser Fassung nirgends mehr referenziert —
derselbe Umgang mit abgelösten Fotos wie bei `umwelt-hippie-*.webp` weiter
oben in diesem Dokument.

**Neue Button-Variante `eco`** (`src/components/ui/Button.tsx`): einzige
grüne Primärfarbe der Website, ausschließlich für den Hero-CTA dieser
Seite. `bg-eco-600` / Hover `eco-800`, additiv — alle bestehenden
Varianten und Einsatzstellen unverändert.

## Bildaustausch "Unsere Verantwortung in der Praxis" + Anfrage-Moment (15.08.2026)

Drei der vier Praxis-Karten zeigen jetzt vom Betreiber gelieferte Fotos statt
der bisherigen Unsplash-Aufnahmen. Die vierte Karte (`ecoForestCanopy`,
"Verantwortung endet nicht beim Reinigungsmittel") ist unverändert — dafür
lag kein Ersatzfoto vor.

| Registry-Eintrag | Datei | Karte |
|---|---|---|
| `ecoWaterCareCard` | `public/images/umwelt-verantwortung/praxis-wasser-bewusst.webp` | "Wasser bewusst einsetzen" |
| `ecoWasteSeparationCard` | `public/images/umwelt-verantwortung/praxis-muelltrennung.webp` | "Mülltrennung gehört zum Arbeitsalltag" |
| `ecoNeutralProductsCard` | `public/images/umwelt-verantwortung/praxis-neutrale-reinigungsmittel.webp` | "Desinfektion dort, wo sie sinnvoll ist" |

`ecoWaterDroplet`, `ecoRecyclingBins` und `ecoCleaningSpray` bleiben
unverändert in der Registry bestehen, werden aber seither nirgends mehr
referenziert (derselbe Umgang wie bei `ecoOfficeGreenery`, siehe oben).

Zusätzlich neu: ein Anfrage-Moment zwischen dem Produkte-Abschnitt und
"Unsere Verantwortung in der Praxis", der `HeroQuoteWizard`
(unverändert, dieselbe Komponente wie im Startseiten-Hero) auf einem
sanften `eco-50`-Verlauf zeigt. Keine neue Formular-Variante — nur Felder,
Validierung und Versandlogik der Startseite, wiederverwendet.
