# Bilder-Konzept

## Aktueller Stand

Die Website nutzt zwei Bildquellen:

1. **Markenbezogene Grafiken**: Das echte Original-Logo (`public/brand/`,
   direkt von der bestehenden Live-Website heruntergeladen, 3830×1948px,
   nicht zugeschnitten oder nachgebaut), Service-Icons
   (`src/components/ui/ServiceIcon.tsx`), Signature-Element „Glanzstreifen"
   (`src/components/ui/GlanzMark.tsx`).
2. **Kuratierte, lizenzfreie Unsplash-Fotos** (`src/data/photos.ts`) – jede
   URL wurde vor Einbindung per HTTP-Statuscheck verifiziert und zeigt einen
   tatsächlich passenden Bildinhalt (z. B. „Fensterreiniger an einer
   modernen Glasfassade" für die Glas-/Fensterreinigung). Alle 12
   Leistungsseiten haben inzwischen ein eigenes, passendes Foto.

Verwendete Unsplash-Fotos (Unsplash-Lizenz, kostenlose kommerzielle Nutzung,
keine Zuschreibung verpflichtend):

| Verwendung | Foto-ID |
|---|---|
| Hero (Startseite) | `photo-1763116146508-5a052fce3461` |
| Gebäudereinigung | `photo-1540762693098-50320eb8a752` |
| Büroreinigung | `photo-1781637590564-01c65dbf2039` |
| Praxisreinigung | `photo-1762625570087-6d98fca29531` |
| Unterhaltsreinigung | `photo-1774494168068-0f716c3aafcf` |
| Treppenhausreinigung | `photo-1563201189-8a32607c079b` |
| Fenster-/Glasreinigung | `photo-1782864840610-51d4c135a405` |
| Grundreinigung | `photo-1542081403278-ba5973c25c7a` |
| Kita- & Schulreinigung | `photo-1751704623306-fefadee241a9` |
| Kanzleireinigung | `photo-1638786246810-39870f0e77d9` |
| Fitnessstudioreinigung | `photo-1761971974992-6df33df97c3a` |
| Autohausreinigung | `photo-1777175013302-eaf4b3ef785a` |
| Über uns (Team/Reinigung) | `photo-1740657254989-42fe9c3b8cce` |
| Über uns (Equipment, mit Logo-Badge) | `photo-1779345169505-be7319f62b97` |

Das Equipment-Foto auf der Über-uns-Seite trägt ein kleines, klar als
UI-Element erkennbares Logo-Badge (weiße Karte, Schatten, wie das
Marken-Badge auf dem Hero-Foto) – bewusst **kein** in das Bild
hineinretuschiertes Logo auf Fahrzeug/Kleidung, um keine unrealistische
Fotomontage zu erzeugen.

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
