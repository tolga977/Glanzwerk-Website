import Image from "next/image";
import { photos } from "@/data/photos";
import HeroVideo from "@/components/home/HeroVideo";

/**
 * Medien- und Overlay-Ebene der Hero-Markenbühne.
 *
 * ── Warum das Overlay neu aufgebaut ist ─────────────────────────────────
 * Der vorherige Aufbau arbeitete mit drei Ebenen in Marken-Navy:
 *   1. Lesekante   from-brand-950/92 via-brand-950/70 to-brand-950/15
 *   2. Kopfzone    h-32, from-brand-950/55 to-transparent
 *   3. Fußzone     h-2/5, from-brand-900 (100 %) via-brand-900/50
 *
 * brand-950 ist #030d1e, brand-900 ist #071a3a — beide mit einem
 * Blau-zu-Rot-Verhältnis um 8:1 bis 10:1. Bei 92 % Deckung links und 100 %
 * an der Unterkante blieb vom Videomaterial an diesen Stellen fast nichts
 * übrig, und was übrig blieb, war eingefärbt: weiße Wände, Glas, Böden und
 * Metallflächen lasen sich blau. Der Hero wirkte dadurch wie eine
 * CSS-Farbfläche mit Bewegung darin, nicht wie ein Film.
 *
 * Der neue Aufbau trennt die beiden Aufgaben, die vorher vermischt waren:
 * Lesbarkeit und Markenwirkung. Die Lesbarkeit übernimmt jetzt ein
 * neutrales Graphit (#12161d, Blau-zu-Rot 1,6:1), die Markenwirkung tragen
 * Logo, Überschriften-Akzent und die primäre Schaltfläche. Damit bleibt das
 * Blau als Akzent erkennbar, ohne den gesamten Film zu überziehen.
 *
 * Alle Werte liegen in globals.css unter .hero-scrim, .hero-veil und
 * .hero-foot — benannte Rollen statt Einzelwerte im JSX.
 *
 * ── Was unverändert bleibt ──────────────────────────────────────────────
 * Das Standbild ist weiterhin IMMER gerendert und liegt unter dem Video:
 *   - LCP-Element (mit `priority` vorgeladen, kein Wartezustand),
 *   - Poster — über next/image optimiert statt als rohes poster-Attribut,
 *     dadurch kein schwarzer Startframe,
 *   - Rückfall, wenn das Video nicht lädt,
 *   - Darstellung unter prefers-reduced-motion (siehe .hero-video).
 *
 * Diese Ebene bleibt eine Server Component. Nur das <video> selbst liegt in
 * HeroVideo — einer schmalen Client-Komponente, weil sich der Download auf
 * Telefonen und unter prefers-reduced-motion nur durch eine Prüfung vor dem
 * Einhängen verhindern lässt, nicht durch CSS.
 */
const heroVideo: { mp4: string; webm?: string } | null = { mp4: "/video/hero.mp4" };

export default function HeroMedia() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/*
        Kein hero-drift mehr. Der Klassenname stand hier für einen
        einmaligen Zoom von 1,07 auf 1,0 über 18 Sekunden — also einen
        Ken-Burns-Effekt auf dem Standbild. Über einem laufenden Film ist
        das eine zweite, konkurrierende Bewegung; die Vorlage nennt das
        ausdrücklich als unerwünscht. Die CSS-Regel bleibt bestehen, sie
        wird nur nicht mehr angewendet.
      */}
      <Image
        src={photos.heroCleaningTeam.src}
        alt={photos.heroCleaningTeam.alt}
        fill
        priority
        sizes="100vw"
        className="hero-focal object-cover"
      />

      {heroVideo && <HeroVideo mp4={heroVideo.mp4} webm={heroVideo.webm} />}

      {/*
        Ebene 1 — Kontrastführung. Trägt den Textblock links und läuft nach
        rechts vollständig aus, damit dort echtes Bildmaterial steht.
      */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0" />

      {/*
        Ebene 2 — globale Kühlung. Verbindet die Szenen minimal, ohne Weiß
        einzufärben. Liegt über der Kontrastführung, damit auch die offene
        rechte Fläche mitgenommen wird.
      */}
      <div aria-hidden="true" className="hero-veil absolute inset-0" />

      {/*
        Ebene 2b — Lichtquelle oben rechts.

        Alle bisherigen Ebenen nehmen Licht weg. Diese gibt welches zurück,
        und zwar gerichtet: dort, wo die Kontrastführung ausläuft und das
        Videobild offen liegt. Erst dadurch bekommt der Hero eine
        Lichtrichtung statt einer gleichmäßigen Dämpfung — der Unterschied
        zwischen einer abgedunkelten Fläche und einem Raum.
      */}
      <div aria-hidden="true" className="hero-light absolute inset-0" />

      {/*
        Ebene 3 — Fußzone. Nur so viel, wie die beiden Zeilen unter den
        Schaltflächen brauchen.

        Die frühere Kopfzone ist ersatzlos entfallen: sie sollte die
        mitlaufende Navigation lesbar halten, doch die Kopfzeile ist eine
        eigene, deckende Fläche über dem Hero. Der dunkle Streifen darunter
        hatte damit keine Aufgabe mehr und erzeugte genau die blaue Kante
        zwischen weißem Header und Film, die vermieden werden sollte.
      */}
      <div aria-hidden="true" className="hero-foot absolute inset-x-0 bottom-0 h-1/4" />
    </div>
  );
}
