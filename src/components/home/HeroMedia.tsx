import Image from "next/image";
import { photos } from "@/data/photos";

/**
 * Hintergrundebene der Hero-Markenbühne.
 *
 * ── Vorbereitung auf das Cinematic-Video ────────────────────────────────
 * Die Ebene ist medienunabhängig aufgebaut. Sobald ein eigenes Hero-Video
 * vorliegt, genügt es, `heroVideo` unten zu füllen — Layout, Höhe, Overlays
 * und Textposition bleiben unverändert, weil Bild und Video exakt dieselbe
 * Fläche mit `object-cover` füllen. Keine weitere Layoutänderung nötig.
 *
 * Das Standbild bleibt dabei bewusst IMMER gerendert und liegt unter dem
 * Video. Es ist damit gleichzeitig:
 *   - das LCP-Element (mit `priority` vorgeladen, kein Wartezustand),
 *   - das Poster — über next/image optimiert statt als rohes poster-Attribut,
 *   - der Rückfall, wenn das Video nicht lädt oder kein Format passt,
 *   - die Darstellung unter prefers-reduced-motion (siehe .hero-video).
 *
 * Deshalb braucht die Ebene kein JavaScript und bleibt eine Server
 * Component: die Reduced-Motion-Behandlung läuft rein über CSS.
 *
 * Empfehlung für die spätere Datei: H.264/MP4 plus WebM, ohne Tonspur,
 * unter 6 MB, 1920 breit, ruhige Kameraführung. Kein Schnitt im
 * Sekundentakt — die Fläche trägt Text.
 */
const heroVideo: { mp4: string; webm?: string } | null = null;

export default function HeroMedia() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={photos.heroCleaningTeam.src}
        alt={photos.heroCleaningTeam.alt}
        fill
        priority
        sizes="100vw"
        className="hero-drift object-cover"
        style={{ objectPosition: "center 62%" }}
      />

      {heroVideo && (
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          {heroVideo.webm && <source src={heroVideo.webm} type="video/webm" />}
          <source src={heroVideo.mp4} type="video/mp4" />
        </video>
      )}

      {/*
        Overlay-System in drei benannten Ebenen. Alle drei arbeiten mit dem
        Marken-Navy statt mit Schwarz: Schwarz über einem Farbbild ergibt
        einen grauen Schleier, der Markenton lässt die Fläche kühl und
        zugehörig wirken.
        Die Werte sind gegen den schlimmsten Fall gerechnet: ein vollstaendig
        weisses Videobild an der rechten Textkante. Dort ergibt die Lesekante
        mit 70 % Deckung und Text in Weiss 90 % noch 6,37:1 — die Lesbarkeit
        haengt damit nicht davon ab, welches Einzelbild gerade laeuft.
      */}

      {/* 1. Lesekante — trägt den Textblock links, gibt die rechte Bildhälfte frei. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-950/70 to-brand-950/15"
      />

      {/* 2. Kopfzone — hält die mitlaufende Navigation lesbar, falls das Bild oben hell wird. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-950/55 to-transparent"
      />

      {/*
        3. Fußzone — löst exakt in die Farbe des folgenden Vertrauensbands
        (brand-900) auf. Dadurch entsteht keine harte Kante: der Hero endet
        nicht, er geht in den nächsten Abschnitt über.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-900 via-brand-900/50 to-transparent"
      />
    </div>
  );
}
