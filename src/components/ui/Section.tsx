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
  /**
   * Schriftgrad der Überschrift.
   *
   * "default"   — 24/30 px. Der Bestand auf allen Unterseiten.
   * "editorial" — 30/36/48 px. Nur auf der Startseite.
   *
   * Warum es zwei Stufen gibt: die Startseite ist die einzige Fläche, auf
   * der jemand ankommt, ohne zu wissen, wo er ist. Dort ist die Überschrift
   * ein Auftritt, auf einer Leistungsseite ist sie eine Wegmarke. 30 px sind
   * für einen Auftritt zu wenig — bei diesem Grad liest sich eine Zeile als
   * Beschriftung, nicht als Aussage.
   *
   * Der Sprung nach 48 px passiert erst ab 1024 px. Darunter würde eine
   * dreizeilige Überschrift entstehen, und drei Zeilen sind kein Auftritt
   * mehr, sondern ein Absatz.
   */
  scale?: "default" | "editorial";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
  light = false,
  scale = "default",
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
          {/*
            Markenzeichen als Satzzeichen: zwei kurze Striche im 53-Grad-
            Winkel des Glanzwerk-Zeichens statt einer waagerechten Haarlinie.
            Siehe `.brand-tick` in globals.css.
          */}
          <span
            aria-hidden="true"
            className={`brand-tick ${light ? "text-brand-300" : "text-brand-400"}`}
          />
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-display display-lg text-pretty font-medium ${light ? "text-white" : "text-brand-900"} ${
          Heading === "h1"
            ? "text-3xl sm:text-4xl"
            : scale === "editorial"
              ? "text-[1.875rem] sm:text-4xl lg:text-5xl"
              : "text-2xl sm:text-3xl"
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
   * Wirksam auf `navy`, `brand` — und auf `tint`.
   *
   * Die ursprüngliche Regel lautete „nur auf dunklen Flächen": ein
   * ausgebleichtes Foto hinter dunklem Text auf hellem Grund ist genau das,
   * was billig aussieht. Das gilt weiterhin für ein Foto, das flächig unter
   * dem gesamten Inhalt liegt.
   *
   * Die helle Fassung macht deshalb etwas anderes. Das Motiv wird entsättigt,
   * im Kontrast genommen und über eine Maske nach links ausgeblendet — es
   * steht also nur in der rechten Hälfte, wo im Bezirksregister keine
   * Überschrift liegt, und läuft zur Textspalte hin auf null. Darüber liegt
   * unverändert die Tonebene der Fläche. Was übrig bleibt, ist Architektur
   * als Textur, kein erkennbares Foto.
   *
   * Auf dem Telefon ist das Motiv zusätzlich zurückgenommen: dort steht das
   * Register einspaltig über die volle Breite, es gibt keine freie Hälfte
   * mehr.
   */
  backdrop?: {
    src: string;
    objectPosition?: string;
    /**
     * Klassen für die Bildebene — für einen Ausschnitt, der sich je Breite
     * unterscheiden muss. Wird sie gesetzt, entfällt `objectPosition`: eine
     * Inline-Angabe würde jede Regel aus der Klasse schlagen.
     */
    imageClassName?: string;
    /**
     * Wie stark die Marke über dem Motiv liegt.
     *
     * "tint" (Vorgabe) — die Tonebene deckt zu rund 90 %. Das Foto ist
     *   Textur unter der Markenfarbe; der Kontrast des Textes hängt an der
     *   Tonebene, nicht am Motiv. Das ist der richtige Weg für Aufnahmen,
     *   die hell sind oder deren Helligkeit man nicht kennt.
     *
     * "carry" — das Motiv trägt die Fläche selbst und behält seine Tiefe.
     *   Darüber liegt nur noch ein sehr schwacher Verlauf, der die Kanten
     *   an die Nachbarflächen anschließt.
     *
     *   Bedingung: die Textzone der Aufnahme muss von sich aus dunkel genug
     *   sein. Das ist zu messen, nicht zu schätzen — bei einem zu hellen
     *   Motiv fällt der Kontrast ohne Vorwarnung unter AA.
     */
    tone?: "tint" | "carry";
  };
  /**
   * Ecke des Wasserzeichens auf dunklen Flächen. Vorgabe "top-right" — der
   * unveränderte, überall sonst verwendete Wert.
   *
   * Grund für den Prop: auf der Startseite folgen drei dunkle Flächen im
   * selben Scroll aufeinander, alle mit dem Zeichen in derselben Ecke,
   * derselben Größe, derselben Deckung. Das ist keine Markensignatur mehr,
   * sobald man es dreimal hintereinander sieht — es ist ein Aufkleber, der
   * immer an derselben Stelle klebt. Die Regel selbst (groß, leise, nie
   * verkleinert) bleibt; nur die Position darf variieren.
   */
  markCorner?: "top-right" | "bottom-left";
  /**
   * Wie die Fläche ihre dekorativen Überstände kappt (Wasserzeichen-Ecke,
   * Backdrop-Bild, Glanzstreifen). Vorgabe "overflow" — unverändertes
   * `overflow-hidden`, der Bestand auf allen ~30 bestehenden Einsatzstellen.
   *
   * "clip-path" clippt optisch identisch (`clip-path: inset(0)` schneidet
   * an derselben Kante wie `overflow-hidden`), eröffnet dabei aber — anders
   * als `overflow` — keinen neuen Scroll-Container. Das ist kein
   * Stilunterschied, sondern ein Verhaltensunterschied: `overflow: hidden`
   * auf einem Vorfahren setzt `position: sticky` in jedem Nachfahren
   * dauerhaft außer Kraft, weil der Klebe-Bezug dann an dieser (nicht
   * selbst scrollenden) Fläche hängt statt am Ausschnittsfenster —
   * empirisch geprüft, kein Fall aus der Spezifikation zitiert.
   *
   * Nur dort verwenden, wo eine Fläche eine angeheftete Kindkomponente
   * trägt (aktuell ausschließlich der Ablauf-Abschnitt der Startseite mit
   * `ProcessTimeline`). Für jede andere Fläche bleibt "overflow" richtig.
   */
  clip?: "overflow" | "clip-path";
}

/*
 * Materialsystem der Flaechen — vier Papiere, nicht vier Weisstoene.
 *
 * ── Was gemessen wurde (August 2026) ────────────────────────────────────
 * Ein Ganzseiten-Screenshot der Startseite wurde in 60-px-Streifen zerlegt
 * und je Streifen die mediane Helligkeit bestimmt. Ergebnis fuer die vier
 * hellen Flaechen im tatsaechlichen Einsatz:
 *
 *     white  ~250     tint  ~245     warm  ~248     muted  ~251
 *
 * Alle vier lagen innerhalb von acht Helligkeitspunkten. Theoretisch vier
 * Varianten, praktisch eine einzige Flaeche. Auf der Startseite fuehrte das
 * zu einer durchgehenden hellen Strecke von 3.660 px ueber vier Abschnitte
 * hinweg — ein Viertel der Seite ohne einen einzigen Tonwechsel.
 *
 * Ursache: die Tokens wurden mit stark reduzierter Deckung eingesetzt
 * (`brand-100/70`, `brand-50/40`, `graphite-100/70`). Jede Reduktion zieht
 * den Ton Richtung Weiss — vier verschieden gedachte Flaechen landeten
 * dadurch alle bei annaehernd 250.
 *
 * ── Was jetzt gilt ──────────────────────────────────────────────────────
 * Die Tokens laufen in voller Staerke. Die Palette bleibt unveraendert
 * (Weiss, brand-50, brand-100, graphite-50, graphite-100) — es wird nur
 * nicht mehr weggeblendet, was sie unterscheidet:
 *
 *     white  reines Weiss, leicht angetont auslaufend — der Neutralwert
 *     muted  kuehl, Markenblau-Familie      (brand-50 -> brand-100)
 *     tint   kuehlste Flaeche               (brand-100 durchgehend)
 *     warm   warmes Graphit, einzige nicht-blaue helle Flaeche
 *
 * Damit trennen sich die Flaechen um rund 15 statt 8 Punkte, und die
 * Naht zwischen zwei Abschnitten wird wieder als Kapitelgrenze gelesen.
 *
 * Der flache Verlauf innerhalb jeder Flaeche bleibt erhalten: ein Vollton
 * ueber 1500 px Hoehe hat keine Oberflaeche, Papier nimmt Licht an, ein
 * Bildschirmweiss nicht.
 *
 * Kontrast unveraendert unkritisch: die dunkelste helle Flaeche liegt bei
 * rund 240, dunkler Text darauf bleibt weit ueber AA.
 */
const backgroundClasses: Record<NonNullable<SectionProps["background"]>, string> = {
  white: "bg-gradient-to-b from-white via-white to-graphite-50",
  muted: "bg-gradient-to-b from-brand-50 via-brand-50 to-brand-100/70",
  tint: "bg-gradient-to-b from-brand-100 via-brand-100 to-brand-50",
  brand: "bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white",
  warm: "bg-gradient-to-b from-graphite-100 via-graphite-100 to-graphite-50",
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
  markCorner = "top-right",
  clip = "overflow",
}: SectionProps) {
  const dark = background === "navy" || background === "brand";
  const showBackdrop = Boolean(backdrop) && (dark || background === "tint");
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 ${clip === "clip-path" ? "[clip-path:inset(0)]" : "overflow-hidden"} ${backgroundClasses[background]} ${spacingClasses[spacing]}`}
    >
      {showBackdrop && backdrop && (
        <>
          <Image
            src={backdrop.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className={
              dark
                ? `object-cover ${backdrop.imageClassName ?? ""}`
                : `object-cover opacity-[0.22] saturate-[0.6] contrast-[0.85] sm:opacity-[0.4] lg:opacity-[0.54] ${backdrop.imageClassName ?? ""}`
            }
            style={{
              ...(backdrop.objectPosition && !backdrop.imageClassName
                ? { objectPosition: backdrop.objectPosition }
                : null),
              ...(dark
                ? null
                : {
                    // Nach links auf null — die Textspalte bekommt kein Motiv.
                    maskImage:
                      "linear-gradient(100deg, transparent 26%, rgba(0,0,0,0.45) 52%, #000 78%)",
                    WebkitMaskImage:
                      "linear-gradient(100deg, transparent 26%, rgba(0,0,0,0.45) 52%, #000 78%)",
                  }),
            }}
          />
          {/*
            Tonebene in der Grundfarbe — hält den Markenton und die
            Lesbarkeit. Bei `tone: "carry"` entfällt sie: dort ist das Motiv
            selbst die Fläche, und eine Deckung von 90 % würde genau die
            Tiefe wegnehmen, derentwegen es ausgewählt wurde. Es bleibt ein
            schwacher Verlauf, der die Ränder an die Nachbarflächen
            anschließt.
          */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${
              backdrop.tone === "carry"
                ? "backdrop-carry"
                : background === "navy"
                  ? "bg-gradient-to-br from-brand-900/92 via-brand-900/88 to-brand-950/94"
                  : background === "tint"
                    ? "bg-gradient-to-r from-brand-100 via-brand-100/88 to-brand-50/70"
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
        <GlanzMark
          className={`pointer-events-none absolute h-64 w-64 opacity-[0.10] ${
            markCorner === "bottom-left" ? "-bottom-12 -left-12" : "-right-12 -top-12"
          }`}
        />
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
