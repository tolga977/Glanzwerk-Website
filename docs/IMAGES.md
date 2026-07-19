# Bilder-Konzept

## Aktueller Stand

Die Website nutzt zwei Bildquellen:

1. **Markenbezogene Grafiken**: Das echte Original-Logo (`public/brand/`,
   direkt von der bestehenden Live-Website heruntergeladen, 3830×1948px,
   nicht zugeschnitten oder nachgebaut), Service-Icons
   (`src/components/ui/ServiceIcon.tsx`), Signature-Element „Glanzstreifen"
   (`src/components/ui/GlanzMark.tsx`).
2. **Kuratierte, lizenzfreie Fotos von Unsplash und Pexels**
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
| Büroreinigung | `6196684` |
| Praxisreinigung | `6812461` (Behandlungsraum, premium/editorial, keine Personen) |
| Unterhaltsreinigung | `9462109` |
| Treppenhausreinigung | `6345073` (helles Treppenhaus, premium/editorial, keine Personen) |
| Grundreinigung | `3769711` |
| Kita- & Schulreinigung | `8535620` (Gruppenzimmer, premium/editorial, keine Personen) |
| Kanzleireinigung | `36631639` (Empfang, premium/editorial, keine Personen) |
| Über uns (Team/Reinigung) | `9462192` |
| Über uns (Equipment, mit Logo-Badge) | `34516664` |

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
| Umwelt & Verantwortung (Hero) | `7262739` (`dosingLiquid`) | Hand dosiert Flüssigkeit – belegt „bedarfsgerechte Dosierung" bildlich, keine Personen/Logos im Bild |
| 3 Monate flexibel testen (Hero) | `6918529` (`businessHandshake`) | Handschlag zweier Geschäftspartner – passt zum Thema „Zusammenarbeit testen", keine erkennbaren Fremdmarken |

Zusätzlich wurde `professionalCleaner` (`9462192`, bisher nur auf
Über-uns) als Hero-Bild für den neuen, zweispaltigen Einleitungsbereich
der Wissen-Hub-Seite (`/wissen`) wiederverwendet – Mehrfachverwendung
bestehender, bereits geprüfter Fotos statt Beschaffung eines neuen Fotos
pro einzelner Seite, wie auch an anderen Stellen der Seite üblich.

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

Die 9 Wissen-Artikel (`src/data/articles.ts`) haben seit Stufe 4 jeweils
ein eigenes `image`-Feld für die Artikelkarten (`ArticleCard.tsx`) –
ausschließlich Wiederverwendung bereits vorhandener, geprüfter Fotos aus
`photos.ts` (u. a. `buildingFacade`, `officeCleaningTeam`, `moppingFloor`,
`medicalPracticeInterior`, `facadeCleaning`, `routineCleaningTeam`,
`dosingLiquid`, `businessHandshake`, `brightStaircase`), passend zum
jeweiligen Artikelthema zugeordnet.

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
