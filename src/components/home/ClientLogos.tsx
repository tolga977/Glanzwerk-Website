import Image from "next/image";
import { clientLogos } from "@/data/clientLogos";

/**
 * Zeile mit Logos freigegebener Auftraggeber.
 *
 * ── Verhalten ohne Daten ────────────────────────────────────────────────
 * Rendert `null`, solange `clientLogos` leer ist. Kein Rahmen, keine
 * Überschrift, keine graue Fläche mit „Referenzen folgen" — der Abschnitt
 * existiert für den Besucher schlicht nicht. Genau deshalb entsteht auch
 * keine sichtbare Lücke: es gibt nichts, was auf etwas Fehlendes hinweist.
 *
 * ── Warum einfarbig ─────────────────────────────────────────────────────
 * Fremde Markenlogos bringen ihre eigenen Farben mit. Nebeneinandergestellt
 * ergibt das eine bunte Reihe, die lauter ist als alles andere auf der
 * Seite, und lenkt vom eigenen Auftritt ab. Alle Logos laufen deshalb in
 * einem Ton — sie belegen eine Zusammenarbeit, sie werben nicht.
 *
 * Beim Überfahren geht die Deckkraft leicht hoch. Das ist kein Effekt,
 * sondern eine Lesehilfe: wer ein bestimmtes Logo sucht, bekommt es einen
 * Moment deutlicher.
 */
export default function ClientLogos() {
  if (clientLogos.length === 0) return null;

  return (
    <div className="border-t border-line pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
        Objekte, die wir betreuen
      </p>
      <ul className="mt-7 flex flex-wrap items-center gap-x-12 gap-y-8">
        {clientLogos.map((logo) => (
          <li key={logo.name}>
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              /*
                Feste optische Höhe, Breite folgt dem Seitenverhältnis.
                `opacity` und `filter` sind die einzigen beiden Angaben —
                keine Bewegung, kein Anheben: eine Logozeile ist kein
                Bedienelement.
              */
              className="h-7 w-auto opacity-55 grayscale transition-opacity duration-300 ease-out hover:opacity-90 sm:h-8"
              style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
