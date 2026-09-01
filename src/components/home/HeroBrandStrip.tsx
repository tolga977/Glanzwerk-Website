import Image from "next/image";
import { heroBrandLogos } from "@/data/heroBrandLogos";

/**
 * Markenleiste unmittelbar unter der Hero-Bühne.
 *
 * ── Bauform ─────────────────────────────────────────────────────────────
 * Eine Überschrift, darunter ein Laufband. Keine Karten, keine Plättchen,
 * keine Rahmen um die Logos — jede Umrandung würde aus einer Sachangabe ein
 * Siegel machen, und drei Siegel nebeneinander lesen sich als Zertifizierung.
 *
 * Der Grund ist rein weiß, nicht Off-White — und das ist keine Geschmacksfrage,
 * sondern von den Dateien erzwungen: `dr-schnell.webp` hat keinen Alphakanal,
 * ihr Bildgrund ist deckendes Weiß (255/255/255). Auf `surface-warm`
 * (250/249/247) hätte sich daraus ein 196 × 28 px großes helleres Rechteck
 * abgezeichnet — also genau die Karte, die hier nicht entstehen soll.
 *
 * Der Ausweg wäre gewesen, das Weiß aus der Datei freizustellen. Das ist eine
 * Veränderung der gelieferten Vorlage und deshalb ausgeschlossen. Der Grund
 * richtet sich stattdessen nach dem Logo.
 *
 * Damit die Leiste trotzdem ein eigener Abschnitt bleibt und nicht als
 * zufällige Zeile zwischen zwei weißen Blöcken liest, tragen die beiden
 * Haarlinien die Abgrenzung: oben zum Vertrauensstreifen des Heros, unten zum
 * Folgeabschnitt.
 *
 * ── Die Logos ───────────────────────────────────────────────────────────
 * Unveränderte Originaldateien in Originalfarben — nicht nachgezeichnet,
 * nicht umgefärbt, nicht verzerrt. Jedes Logo bekommt hier bewusst dieselbe
 * Anzeigehöhe (unabhängig vom individuellen `hoehe`-Wert in
 * `heroBrandLogos.ts`, der für eine frühere, ruhende Reihen-Darstellung
 * gedacht war) — im Laufband soll jede Marke optisch gleich viel Gewicht
 * bekommen, statt nach Wortmarken-Anteil der Datei zu variieren.
 *
 * `grayscale` oder Deckkraft unter 100 % wäre hier eine Veränderung des
 * Logos und ist deshalb ausgeschlossen — auch als Ruhezustand.
 *
 * ── Laufband ────────────────────────────────────────────────────────────
 * Dieselbe `.marquee`/`.marquee-track`-Mechanik wie bei `ReviewMarquee`
 * (globals.css): die Spur enthält die Logoliste zweimal und verschiebt sich
 * um genau die Hälfte, die zweite Hälfte ist `aria-hidden`+`inert`. Bewegung
 * nur auf Zeigergeräten und pausiert bei Hover/Fokus; auf Touch und bei
 * reduzierter Bewegung steht die Reihe still und lässt sich mit dem Finger
 * schieben — exakt dieselbe, bereits geprüfte Zugänglichkeitslösung.
 */
const LOGO_HEIGHT = 40;

function LogoItem({ logo }: { logo: (typeof heroBrandLogos)[number] }) {
  return (
    <div className="flex shrink-0 items-center px-8 sm:px-10 lg:px-12">
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        sizes="160px"
        className="w-auto object-contain"
        style={{ height: `${LOGO_HEIGHT * 0.8}px` }}
      />
    </div>
  );
}

export default function HeroBrandStrip() {
  return (
    <section
      aria-labelledby="marken-titel"
      className="border-y border-line bg-white py-12 sm:py-14"
    >
      <div className="container-page">
        <h2
          id="marken-titel"
          /*
            Eine gesetzte Überschrift, kein Versalien-Kleinlabel. Der Satz ist
            ein Satz — in 12 px Versalien mit weitem Sperrsatz über die volle
            Spaltenbreite hätte er wie Kleingedrucktes gewirkt. Die
            Display-Serife bindet ihn an H1 und Formular-Schritte der Bühne.
          */
          className="text-center font-display text-lg font-normal text-brand-900 sm:text-xl"
        >
          Qualität, auf die wir bei der Reinigung setzen
        </h2>

        <div
          className="marquee marquee-fade mt-9 sm:mt-10"
          style={{ "--marquee-duration": "32s" } as React.CSSProperties}
        >
          <div className="marquee-track items-center">
            {/* Original — dies ist die Fassung, die vorgelesen wird. */}
            <div className="flex shrink-0 items-center">
              {heroBrandLogos.map((logo) => (
                <LogoItem key={logo.name} logo={logo} />
              ))}
            </div>
            {/* Technische Kopie für den nahtlosen Umlauf, siehe ReviewMarquee.tsx. */}
            <div className="flex shrink-0 items-center" aria-hidden="true" inert>
              {heroBrandLogos.map((logo) => (
                <LogoItem key={`${logo.name}-copy`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
