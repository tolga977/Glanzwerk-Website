import Image from "next/image";
import { photos } from "@/data/photos";
import HeroSequence from "@/components/home/HeroSequence";

/**
 * Medien- und Overlay-Ebene der Hero-Markenbühne.
 *
 * ── Die Reihenfolge der Ebenen ──────────────────────────────────────────
 *   1. Standbild        immer gerendert, LCP-Element, Rückfall
 *   2. Bildfolge        zwei Einstellungen, die sich auflösen
 *   3. hero-grade       Farbeinbindung über die ganze Fläche
 *   4. hero-scrim       Kontrastführung hinter der Textspalte
 *   5. hero-light       hellblaue Lichtquelle oben rechts
 *   6. hero-crown       Kopfzone, trägt die transparente Kopfzeile
 *   7. hero-foot        Fußzone, trägt die Vertrauenszeile
 *
 * Alle Werte liegen in globals.css unter den gleichnamigen Rollen — benannte
 * Aufgaben statt Einzelwerte im JSX.
 *
 * ── Warum das Standbild immer steht ─────────────────────────────────────
 * Es ist nicht der Notfall, es ist die Grundlage:
 *   - LCP-Element (mit `priority` vorgeladen, kein Wartezustand),
 *   - Poster — über next/image optimiert statt als rohes poster-Attribut,
 *     dadurch kein schwarzer Startframe,
 *   - Rückfall, wenn kein Video lädt,
 *   - die Darstellung auf Telefonen und unter prefers-reduced-motion.
 *
 * Der Hero ist damit nie davon abhängig, dass ein Video ankommt. Das Motiv
 * — Fassadenreinigung an Glas — liegt bewusst nah an der eröffnenden
 * Einstellung der Bildfolge: der Übergang vom Standbild zum ersten Frame
 * ist dadurch ein Wechsel innerhalb derselben Szene, kein Themenwechsel.
 *
 * Diese Ebene bleibt eine Server Component. Nur die Bildfolge selbst liegt
 * in `HeroSequence`, weil sich der Download auf Telefonen und unter
 * prefers-reduced-motion nur durch eine Prüfung vor dem Einhängen
 * verhindern lässt, nicht durch CSS.
 */
export default function HeroMedia() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/*
        Kein hero-drift. Der Klassenname stand für einen einmaligen Zoom von
        1,07 auf 1,0 über 18 Sekunden — ein Ken-Burns-Effekt auf dem
        Standbild. Über einer laufenden Bildfolge ist das eine zweite,
        konkurrierende Bewegung auf einer Vollbildfläche und damit genau die
        langsame Dauerschleife, die als unerwünscht dokumentiert ist.
      */}
      <Image
        src={photos.heroCleaningTeam.src}
        alt={photos.heroCleaningTeam.alt}
        fill
        priority
        sizes="100vw"
        className="hero-focal object-cover"
      />

      <HeroSequence />

      {/*
        Ab hier nur noch Farbe und Licht. Die Ebenen liegen in dieser
        Reihenfolge übereinander, weil jede die vorherige voraussetzt: die
        Kontrastführung rechnet mit der Farbeinbindung darunter, die
        Kopf- und Fußzone rechnen mit beidem.

        `z-10` hebt sie über die Videoebenen, die untereinander mit z-Index
        1 und 2 arbeiten.
      */}
      <div aria-hidden="true" className="hero-grade absolute inset-0 z-10" />
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-10" />
      <div aria-hidden="true" className="hero-light absolute inset-0 z-10" />

      {/*
        Kopfzone. Die Höhe ist an die Kopfzeile gekoppelt und nicht gegriffen:
        genau doppelt so hoch wie diese.

        Vorher stand hier `h-64` — 256 px, unabhängig von der Kopfhöhe. Der
        Verlauf darin war bei 20 % ausgelaufen, also nach 51 px, während die
        Kopfzeile 113 px hoch ist. Die Navigation lag damit bereits außerhalb
        der Zone, die sie tragen soll: gemessen 2,84:1 statt der geforderten
        4,5:1.

        Über `--header-height` bleiben Zone und Kopfzeile jetzt zwangsläufig
        gekoppelt — auch beim Breakpoint-Wechsel auf 128 px ab 1536 px. Die
        Stützstellen des Verlaufs sind in globals.css auf dieses Verhältnis
        gerechnet.
      */}
      <div
        aria-hidden="true"
        className="hero-crown absolute inset-x-0 top-0 z-10 h-[calc(var(--header-height)*2)]"
      />

      <div aria-hidden="true" className="hero-foot absolute inset-x-0 bottom-0 z-10 h-1/4" />
    </div>
  );
}
