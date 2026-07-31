import Image from "next/image";
import type { ReactNode } from "react";
import GlanzMark from "@/components/ui/GlanzMark";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Plain string, or JSX with a highlighted word/phrase (e.g. <span className="text-brand-400">...</span>). */
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Render the title as an h1 for pages where this is the primary heading. */
  as?: "h1" | "h2";
  /** Use light text colors when placed on a dark ("navy" or "brand") Section background. */
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
  light = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] ${
            light ? "text-brand-200" : "text-brand-500"
          } ${centered ? "justify-center" : ""}`}
        >
          {/*
            Haarlinie statt Markenzeichen. Das Zeichen stand hier auf 16 px —
            ein geschrumpftes Logo, das als Aufzaehlungspunkt gelesen wird und
            gerade dadurch seinen Signaturwert verliert. Die Linie gehoert
            dagegen in die durchgehende Sprache der Website: Spaltenlinien im
            Bezirksregister, Abschnittsfuesse, Grundlinie im Prozess,
            Trennlinien in der Vertrauensmatrix. Struktur aus Linien statt aus
            Kaesten ist das Kompositionsprinzip — der Eyebrow folgt ihm jetzt.
          */}
          <span
            aria-hidden="true"
            className={`h-px w-7 shrink-0 ${light ? "bg-brand-300/70" : "bg-brand-400"}`}
          />
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-display display-lg font-medium ${light ? "text-white" : "text-brand-900"} ${
          Heading === "h1" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={`measure mt-4 text-base leading-relaxed ${
            light ? "text-brand-100" : "text-ink-soft"
          } ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  /**
   * white/muted/warm: existing light surfaces.
   * tint: soft light-blue gradient wash, for rhythm between white sections.
   * brand: bold mid-blue gradient block, white text.
   * navy: darkest brand block, white text.
   */
  background?: "white" | "muted" | "tint" | "brand" | "warm" | "navy";
  id?: string;
  /**
   * Zurückhaltende Tiefenebene: eine feine Lichtkante an der Oberkante und
   * ein sehr schwacher diagonaler Glanzstreifen. Bewusst KEINE großflächigen
   * weichgezeichneten Kreise mehr — die lasen sich als generische
   * KI-/SaaS-Dekoration und haben auf jeder Section gleich ausgesehen.
   */
  decor?: boolean;
  /** Vertikaler Rhythmus: compact (dichter), normal (Standard), roomy (Atempause). */
  spacing?: "compact" | "normal" | "roomy";
  /**
   * false: Die Kinder werden NICHT in den zentrierten Inhaltscontainer
   * gelegt. Fuer randlose Bildbaender, die ueber die volle Fensterbreite
   * laufen sollen. Der Abschnitt setzt dann selbst dort `container-page`,
   * wo Text wieder im Raster stehen muss.
   */
  contained?: boolean;
  /**
   * Raumbildende Tonflaeche gegen leer wirkenden Weissraum.
   *
   * Anders als `decor` (feine Kante plus schwacher Streifen) legt `surface`
   * eine grosse, an einer Kante verankerte Ebene an. Sie ist bewusst KEIN
   * schwebender weichgezeichneter Kreis: eine Flaeche, die an der Kante
   * beginnt, liest sich als Raum hinter dem Inhalt, ein Kreis in der Mitte
   * liest sich als Dekoration.
   *
   * Der Verlauf hat eine definierte Uebergangszone statt eines langen
   * Ausblendens: eine erkennbare Kante liest sich als Flaeche, ein weiches
   * Ausfransen liest sich als Nebel.
   *
   * "right"  — Ebene von der rechten Kante; gibt textlastigen Abschnitten
   *            ein Gegengewicht zur leeren rechten Haelfte.
   * "left"   — spiegelbildlich; fuer Abschnitte, deren Inhalt rechts sitzt.
   * "bottom" — Ebene von der Unterkante; leitet zum naechsten Abschnitt ueber.
   */
  surface?: "right" | "left" | "bottom";
  /**
   * Fotoebene unter einer dunklen Grundfläche.
   *
   * Rhythmusmittel, kein Dekor: dunkle Abschnitte waren bisher reine
   * Farbflächen. Auf einer Seite, die über weite Strecken ohne Bild
   * auskommt, ist eine dunkle Fläche mit Motiv darunter der billigste Weg
   * zu einem Bildmoment — sie kostet keinen zusätzlichen Scrollweg und
   * bringt trotzdem Textur an eine Stelle, die sonst flach bliebe.
   *
   * Das Foto liegt über der Grundfläche, darüber eine Tonebene in der
   * Markenfarbe. Deckung 88 % ist gegen den schlimmsten Fall gerechnet
   * (vollständig weißes Motiv): Weiß auf Navy ergibt dort noch 12,2:1, auf
   * dem Mittelblau 6,4:1 — beides deutlich über AA.
   *
   * Nur auf `navy` und `brand` wirksam. Auf hellen Flächen wäre ein
   * ausgebleichtes Foto hinter Text genau das, was billig aussieht.
   */
  backdrop?: { src: string; objectPosition?: string };
}

/*
 * Materialsystem der Flaechen.
 *
 * Die drei hellen Flaechen waren vorher flache Volltoene bzw. liefen in
 * reines Weiss aus. Zwei Folgen daraus:
 *
 * 1. `tint` endete auf rgb(255,255,255) — exakt die Farbe von `white`.
 *    Wo ein tint-Abschnitt an einen weissen grenzte, war die Naht damit
 *    unsichtbar; zwei Abschnitte lasen sich als eine Flaeche.
 * 2. Ein Vollton ueber 1500 px Hoehe hat keine Oberflaeche. Papier nimmt
 *    Licht an, ein Bildschirmweiss nicht.
 *
 * Alle Flaechen bekommen deshalb einen sehr flachen vertikalen Verlauf:
 * oben heller, unten minimal angetont. Die Spanne liegt bei rund 2 % —
 * unterhalb der Schwelle, ab der ein Verlauf als Verlauf auffaellt, aber
 * ausreichend, damit die Flaeche eine Richtung hat und Kanten sichtbar
 * bleiben. Keine neuen Farben: ausschliesslich vorhandene Tokens.
 */
const backgroundClasses: Record<NonNullable<SectionProps["background"]>, string> = {
  white: "bg-gradient-to-b from-white via-white to-graphite-50/60",
  muted: "bg-gradient-to-b from-brand-50/70 to-brand-50/40",
  tint: "bg-gradient-to-b from-brand-100/70 via-brand-50/50 to-brand-50/25",
  brand: "bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white",
  warm: "bg-gradient-to-b from-graphite-50 via-graphite-50 to-graphite-100/70",
  navy: "bg-gradient-to-br from-brand-900 via-brand-900 to-brand-950 text-white",
};

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  compact: "py-14 sm:py-16",
  normal: "py-20 sm:py-24",
  roomy: "py-24 sm:py-32",
};

export default function Section({
  children,
  className = "",
  background = "white",
  id,
  decor = false,
  spacing = "normal",
  contained = true,
  surface,
  backdrop,
}: SectionProps) {
  const dark = background === "navy" || background === "brand";
  const showBackdrop = Boolean(backdrop) && dark;
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden ${backgroundClasses[background]} ${spacingClasses[spacing]}`}
    >
      {showBackdrop && backdrop && (
        <>
          <Image
            src={backdrop.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
            style={backdrop.objectPosition ? { objectPosition: backdrop.objectPosition } : undefined}
          />
          {/* Tonebene in der Grundfarbe — hält den Markenton und die Lesbarkeit. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${
              background === "navy"
                ? "bg-gradient-to-br from-brand-900/92 via-brand-900/88 to-brand-950/94"
                : "bg-gradient-to-br from-brand-600/90 via-brand-700/88 to-brand-800/92"
            }`}
          />
        </>
      )}
      {/*
        Wasserzeichen: das Markenzeichen erscheint gross und sehr leise auf
        den dunklen Flaechen der Marke — und nur dort. Es war bisher ein
        Einzelfall in Footer und CTASection; als Regel markiert es jede
        eigene dunkle Grundflaeche als Glanzwerk-Flaeche.

        Die Gegenregel dazu: das Zeichen wird nie verkleinert. Entweder es
        traegt eine Flaeche, oder es erscheint nicht.
      */}
      {dark && (
        <GlanzMark className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 opacity-[0.10]" />
      )}

      {surface && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: (() => {
              const tone = dark ? "rgb(255 255 255 / 0.06)" : "rgb(224 243 249 / 0.9)";
              if (surface === "right") {
                return `linear-gradient(127deg, transparent 44%, ${tone} 58%, ${tone} 100%)`;
              }
              if (surface === "left") {
                return `linear-gradient(233deg, transparent 44%, ${tone} 58%, ${tone} 100%)`;
              }
              return `linear-gradient(180deg, transparent 46%, ${tone} 64%, ${tone} 100%)`;
            })(),
          }}
        />
      )}
      {decor && (
        <>
          {/* Lichtkante: markiert den Beginn der Fläche, ohne Nebel zu erzeugen. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: dark
                ? "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.22), transparent)"
                : "linear-gradient(90deg, transparent, rgb(47 166 206 / 0.35), transparent)",
            }}
          />
          {/* Glanzstreifen: ein einzelner, sehr schwacher diagonaler Lichtverlauf. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: dark
                ? "linear-gradient(127deg, transparent 38%, rgb(255 255 255 / 0.045) 50%, transparent 62%)"
                : "linear-gradient(127deg, transparent 38%, rgb(47 166 206 / 0.06) 50%, transparent 62%)",
            }}
          />
        </>
      )}
      <div className={`relative z-[1] ${contained ? "container-page" : ""} ${className}`}>
        {children}
      </div>
    </section>
  );
}
