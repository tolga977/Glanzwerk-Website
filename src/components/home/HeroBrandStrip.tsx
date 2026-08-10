import Image from "next/image";
import { heroBrandLogos } from "@/data/heroBrandLogos";

/**
 * Markenleiste unmittelbar unter der Hero-Bühne.
 *
 * ── Bauform ─────────────────────────────────────────────────────────────
 * Eine Überschrift, darunter eine Reihe. Keine Karten, keine Plättchen,
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
 * nicht umgefärbt, nicht verzerrt. Die Höhen sind je Logo einzeln gesetzt,
 * weil eine einheitliche Höhe bei diesen Seitenverhältnissen gerade NICHT
 * gleichwertig aussieht (Begründung an `heroBrandLogos`).
 *
 * `grayscale` oder Deckkraft unter 100 % wäre hier eine Veränderung des
 * Logos und ist deshalb ausgeschlossen — auch als Ruhezustand.
 *
 * ── Reihenfolge und Umbruch ─────────────────────────────────────────────
 * Ab Tablet eine waagerechte Reihe mit großzügigem Abstand. Auf dem Telefon
 * bricht sie in zwei Zeilen um (`flex-wrap`) statt drei Logos auf 358 px zu
 * quetschen; die Höhen skalieren dort gemeinsam auf etwa drei Viertel.
 */
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

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:mt-10 sm:gap-x-16 lg:gap-x-24">
          {heroBrandLogos.map((logo) => (
            <li key={logo.name} className="flex items-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                /*
                  `sizes` ist knapp gehalten: die Logos werden nie breiter als
                  rund 200 px dargestellt. Ohne die Angabe würde next/image
                  eine Vollbreiten-Variante vorladen.
                */
                sizes="200px"
                /*
                  Die Höhe kommt als CSS-Variable und nicht als Inline-Wert:
                  ein Inline-`height` wäre auf jeder Breite derselbe, und die
                  Reihe braucht auf dem Telefon rund drei Viertel der
                  Desktop-Höhe. Über die Variable greift die Breakpoint-Regel,
                  und das Verhältnis der drei Logos untereinander bleibt in
                  beiden Fällen erhalten.
                */
                style={{ "--logo-h": `${logo.hoehe}px` } as React.CSSProperties}
                className="h-[calc(var(--logo-h)*0.75)] w-auto sm:h-[var(--logo-h)]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
