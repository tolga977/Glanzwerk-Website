# Performance Audit — Glanzwerk Reinigungsservice Berlin

**Datum:** 2026-08-02
**Tool:** Lighthouse 13.4.1 CLI (headless Chrome, `--only-categories=performance`), Standard-Mobile-Emulation/-Throttling (Lighthouse-Default)
**PageSpeed Insights API:** nicht nutzbar — misst nur öffentlich erreichbare URLs, `localhost:3000` ist nicht extern auffindbar. Kein CrUX-Feld-Datensatz verfügbar (keine Live-Traffic-Daten für diese lokale Umgebung).

## ⚠️ KRITISCHER KONTEXT: Dev-Server, kein Production-Build

Alle Messungen unten stammen von `npm run dev` (Next.js 16, **Turbopack Dev-Modus**), nicht von `next build && next start`. Das bedeutet systematisch:

- **TTFB ist massiv aufgebläht** (Server-Response-Zeit Startseite: **4.060 ms**), weil der Dev-Server Routen/Komponenten bei jedem Request live kompiliert (kein statisches/optimiertes Output, kein Caching-Layer, keine minifizierten Chunks).
- **Zusätzliche Dev-only-Assets** werden geladen, die in Production nicht existieren (z. B. `next-devtools` Bundle, 213 KB) — verzerrt Byte-Gewicht und Main-Thread-Zeit nach oben.
- **On-the-fly Bildoptimierung** über `/_next/image` läuft im Dev-Modus unkomprimiert/uncached pro Request statt aus Build-Cache — das erklärt einen Großteil der brutalen LCP-Ladezeit unten.
- Next.js React-Dev-Bundle (unminified, mit Warnungen/Instrumentierung) statt Production-React → höhere Main-Thread-Kosten.

**Die absoluten Zahlen (LCP ~10s) sind NICHT repräsentativ für die Live-Site.** Sie dienen hier ausschließlich dazu, (a) die *relative* Verteilung der Zeit zu verstehen (wo genau die Zeit verloren geht) und (b) das Hero-Video-Risiko zu verifizieren. Für eine belastbare CWV-Bewertung muss ein Production-Build (`next build && next start`) oder — besser — die Live-URL nach Deployment gemessen werden (PageSpeed Insights API / CrUX).

---

## 1. Ergebnisse Startseite (`/`)

| Metrik | Wert (Lab, Dev-Server) | Einordnung |
|---|---|---|
| Performance Score | 39/100 | dev-mode-verzerrt, siehe oben |
| LCP | **10,6 s** | weit über "Poor" (>4s) — dev-mode-Artefakt, siehe Breakdown unten |
| CLS | **0** | ausgezeichnet — "Good" |
| TBT (Lab-Proxy für INP) | 1.400 ms | schlecht, aber dev-mode-Overhead (unminified React, HMR-Instrumentierung) |
| FCP | 1,9 s | ok für Dev-Modus |
| Speed Index | 17,2 s | dev-mode-verzerrt |
| Server-Response-Zeit (TTFB) | **4.060 ms** | Haupttreiber des schlechten LCP — Dev-Compile-Zeit, kein Production-Indikator |
| Total Byte Weight | 1.403 KB | moderat |

### LCP-Breakdown (Startseite)

| Subpart | Dauer |
|---|---|
| Time to First Byte | 4.077 ms |
| Resource Load Delay | 70 ms |
| Resource Load Duration | **10.811 ms** |
| Element Render Delay | 315 ms |

**LCP-Element:** `<img class="hero-focal object-cover">` — das statische Hero-Standbild (`main#main-content > section > div > img`), **nicht das Video**. Die extreme "Resource Load Duration" von ~10,8s ist die On-the-fly-Bildoptimierung von `/_next/image` im ungecachten Dev-Modus (Next.js optimiert/re-encodiert das Bild bei jedem kalten Request neu, ohne Build-Cache) — in Production entfällt dieser Schritt fast vollständig, da Bilder beim Build vorgerechnet/gecacht werden.

## 2. Ergebnisse Unterseite (`/leistungen/bueroreinigung-berlin`)

| Metrik | Wert (Lab, Dev-Server) |
|---|---|
| Performance Score | 53/100 |
| LCP | 9,0 s (ebenfalls dev-mode-TTFB/Bildoptimierungs-Artefakt) |
| CLS | 0 |
| TBT | 1.030 ms |
| FCP | 1,2 s |
| Speed Index | **2,2 s** (deutlich besser als Startseite — kein Hero-Video/keine so große Hero-Grafik) |
| Server-Response-Zeit (TTFB) | 500 ms (Route bereits warm/kompiliert zum Testzeitpunkt) |
| Total Byte Weight | 1.357 KB |
| Main-Thread-Arbeit | 4,2 s |

Die Unterseite zeigt niedrigeren TTFB (Route war schon kompiliert), was den dev-mode-Kompilier-Effekt auf der Startseite zusätzlich bestätigt.

## 3. Hero-Video (`public/video/hero.mp4`, ~139 MB) — Einfluss auf LCP/Ladezeit

**Ergebnis: Das Video wurde im Lighthouse-Run NICHT geladen und beeinflusst LCP nicht.** Geprüft über die vollständige Netzwerk-Request-Liste des Laufs (33 Requests insgesamt) — keine Anfrage an `hero.mp4` oder `hero-original-nofaststart.mp4` enthalten.

Code-Review (`src/components/home/HeroVideo.tsx`, `HeroMedia.tsx`) bestätigt eine bereits sehr durchdachte Umsetzung:

- **Client-seitiges Gating vor dem Mount:** Das `<video>`-Element wird nur gerendert, wenn (a) Viewport ≥ 640px UND (b) `prefers-reduced-motion` NICHT aktiv ist. Unterhalb 640px (Mobile) wird gar kein `<video>` erzeugt — kommentiert im Code als bewusste Entscheidung, weil CSS-`hidden`-Klassen den Download nicht verhindern würden (Autoplay überstimmt `preload="none"`).
- **`preload="metadata"` statt `"auto"`:** Verhindert vollständigen Download beim Seitenaufbau; im Kommentar dokumentiert, dass `"auto"` bei dieser 145-MB-Datei den Renderer im lokalen Test "minutenlang" blockiert hat.
- **Kein `poster`-Attribut:** Das optimierte Standbild darunter ist bereits das LCP-Element und bleibt es — das Video ist rein additiv/dekorativ und rendert transparent bis zum ersten Frame.
- **Bestätigt durch LCP-Breakdown:** LCP-Element ist nachweislich das `<img class="hero-focal">`, nicht das Video.

**Fazit Video:** Aktuell kein CWV-Risiko durch die Architektur. Das eigentliche Risiko ist die **Dateigröße selbst (~139 MB) für tatsächliche Nutzer**, die es sehen: Bei `preload="metadata"` + `autoplay` beginnt der Browser nach dem Metadata-Fetch mit dem Streaming/Puffern des Videos, was auf mobilen/langsamen Verbindungen erheblichen Datenverbrauch verursacht und INP/Main-Thread-Belastung durch Decoding erhöhen kann, auch wenn LCP nicht betroffen ist. Zusätzlich fehlt eine `<source type="video/webm">`-Variante im produktiven Fall (das `webm`-Prop ist optional und aktuell nicht befüllt) — ein modernes, kleineres Format würde die tatsächliche Downloadlast erheblich senken.

## 4. Ressourcen-Optimierung

### Bilder
- Next/Image (`/_next/image`) wird korrekt für Hero- und Logo-Bilder genutzt (automatisches Format-Negotiation, im Log sichtbar: `mimeType: image/avif` für das Standorte-Hero-Bild) — gute Grundlage.
- Auffällig: **Logo wird zweimal mit `w=3840` anfordert** (`glanzwerk-logo.png` 59 KB, `glanzwerk-logo-dark-bg.png` 57 KB) — eine Breite von 3840px für ein Logo ist deutlich überdimensioniert; das erzeugte `sizes`-Attribut sollte geprüft werden, damit Next/Image nicht das größte verfügbare Breakpoint-Bucket für ein kleines UI-Element lädt.

### Fonts
- `next/font/google` wird für Inter und Fraunces genutzt, jeweils mit **`display: "swap"`** konfiguriert (`src/app/layout.tsx`) — verhindert FOIT, ist die empfohlene Best Practice. Self-hosting über `next/font` vermeidet zusätzlich einen externen Google-Fonts-Request.
- Drei WOFF2-Dateien im Ladepfad der Startseite (146 KB, 118 KB, 48 KB = ~312 KB Fonts gesamt) — das ist relativ viel für zwei Font-Familien. Zu prüfen: werden alle geladenen Gewichte/Stile (z. B. Fraunces in mehreren Schnitten) tatsächlich above-the-fold benötigt, oder lassen sich Subsets/weniger Weights einsparen?

### Third-Party-Skripte
- Im gemessenen Lauf **keine externen Third-Party-Skripte** identifiziert (`third-party-summary`-Audit lieferte keine Treffer). Die größten JS-Chunks sind alle Next.js-interne Bundles, inkl. `next-devtools` (213 KB) — dieser Chunk existiert **nur im Dev-Modus** und entfällt in Production vollständig.
- Sofern Analytics/Tracking/Cookie-Consent-Skripte später ergänzt werden, unbedingt `async`/`defer` bzw. Next.js `<Script strategy="afterInteractive"|"lazyOnload">` verwenden, um TBT/INP nicht zu belasten.

### CLS
- CLS = 0 auf beiden gemessenen Seiten — sehr gut, keine Handlungsempfehlung nötig. Layout-Reservierung für Bilder/Video scheint korrekt zu funktionieren (Next/Image mit `fill` + definiertem Container, Video ohne Poster wie oben beschrieben).

---

## Priorisierte Empfehlungen

1. **Vor jeder CWV-Bewertung: Production-Build messen, nicht Dev-Server.** (`next build && next start`, dann erneut Lighthouse/PSI). Die aktuellen LCP-Werte (~9–10s) sind Dev-Server-Artefakte und kein Hinweis auf ein reales Problem — aber ohne Production-Messung bleibt der tatsächliche Zustand unbekannt. **Höchste Priorität, kein Aufwand.**
2. **Nach Live-Deployment: PageSpeed Insights API / CrUX-Felddaten einholen**, sobald genug Traffic vorliegt — Lab-Daten (Lighthouse) sind nur ein Proxy, das 75.-Perzentil entscheidet.
3. **Logo-Bildgrößen prüfen** (`w=3840` für ein Logo wirkt überdimensioniert) — `sizes`-Attribut/Breakpoints der Next/Image-Nutzung kontrollieren, spart Bandbreite auf allen Seiten (Logo lädt vermutlich global im Header).
4. **Hero-Video-Dateigröße (139 MB Quelldatei) für echte Nutzer reduzieren:** stärkere Kompression/kürzere Loop-Länge/niedrigere Auflösung prüfen, plus optional eine `webm`-Variante (`HeroVideo`-Komponente unterstützt das Prop bereits, ist aber ungenutzt) für kleinere Downloadlast bei Nutzern, die den Viewport-Schwellenwert erfüllen. LCP ist zwar nicht betroffen, aber Datenverbrauch/Decoding-Last auf Mid-Range-Geräten schon.
5. **Font-Payload prüfen** (~312 KB über 3 WOFF2-Dateien) — unnötige Weights/Styles von Inter/Fraunces identifizieren und entfernen, falls vorhanden.
6. Sobald Analytics/Third-Party-Skripte hinzukommen: konsequent `next/script` mit `lazyOnload`/`afterInteractive` einsetzen, um INP nicht zu gefährden — aktuell kein Problem, da keine vorhanden.

---

## Nicht messbare Punkte (Tool-Limitierungen, keine Schätzung)

- **INP** wurde nicht direkt gemessen (INP erfordert reale Nutzerinteraktion/Feldddaten oder eine Interaction-Simulation via `web-vitals`-Library im Browser; Lighthouse liefert nur TBT als Lab-Proxy). Für echtes INP: CrUX-Felddaten nach Launch oder manuelles Testen mit Chrome DevTools Performance-Panel + realen Klicks.
- **CrUX-Felddaten**: nicht verfügbar, da `localhost` nicht in CrUX erfasst wird.
- **PageSpeed Insights API**: nicht nutzbar für lokale URLs.
