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
 * nicht umgefärbt, nicht verzerrt.
 *
 * Skaliert wird NICHT nach `logo.hoehe` aus `heroBrandLogos.ts` (jene Datei
 * ist bewusst unangetastet zu lassen — separates Projekt), sondern nach
 * `TEXT_HEIGHT_OVERRIDE` unten. Grund: `hoehe` zielt auf die Dateihöhe der
 * Wortmarke, ist aber nicht pixelgenau auf die tatsächliche Tinten-Höhe des
 * Schriftzugs abgestimmt. Per Zeilen-Analyse der fünf Dateien gemessen (Anteil
 * der reinen Wortmarke — ohne Icon/Unterzeile — an der Dateihöhe):
 *
 *   Dr. Schnell  82,1 %   DEISS  51,8 %   Numatic  86,5 %
 *   Vileda "vileda" (ohne Blatt/PROFESSIONAL)  48,2 %
 *   VERMOP "VERMOP" (ohne Oval-Icon)           28,3 %
 *
 * Mit den bisherigen `hoehe`-Werten hätte Vileda dadurch rund 50 % größer
 * gerendert als Dr. Schnell (35 px vs. 23 px Tinten-Höhe) — sichtbar
 * unterschiedlich, trotz behaupteter Gleichgröße. `TEXT_HEIGHT_OVERRIDE`
 * kehrt die Rechnung um: Zielhöhe (26 px) geteilt durch den gemessenen
 * Anteil ergibt die Boxhöhe, bei der der sichtbare Schriftzug bei allen
 * fünf gleich groß wirkt.
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
/** Boxhöhe (px, Desktop) je Logo, aus gemessenem Wortmarken-Anteil an der Dateihöhe errechnet (Zielhöhe 26 px sichtbarer Schriftzug). */
const TEXT_HEIGHT_OVERRIDE: Record<string, number> = {
  "Dr. Schnell": 32,
  DEISS: 50,
  Numatic: 30,
  "Vileda Professional": 54,
  VERMOP: 92,
};

function LogoItem({ logo }: { logo: (typeof heroBrandLogos)[number] }) {
  const boxHeight = TEXT_HEIGHT_OVERRIDE[logo.name] ?? logo.hoehe;
  return (
    <div className="flex shrink-0 items-center px-8 sm:px-10 lg:px-12">
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        sizes="160px"
        style={{ "--logo-h": `${boxHeight}px` } as React.CSSProperties}
        className="h-[calc(var(--logo-h)*0.75)] w-auto sm:h-[var(--logo-h)]"
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
