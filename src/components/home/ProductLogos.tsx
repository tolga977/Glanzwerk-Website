import Image from "next/image";
import { productLogos } from "@/data/productLogos";

/**
 * Zeile mit Logos der eingesetzten Produkthersteller.
 *
 * ── Verhalten ohne Daten ────────────────────────────────────────────────
 * Rendert `null`, solange `productLogos` leer ist. Keine graue Fläche, kein
 * „Logos folgen" — der Abschnitt existiert für den Besucher schlicht nicht.
 *
 * ── Warum einfarbig ─────────────────────────────────────────────────────
 * Fremde Markenlogos bringen ihre eigenen Farben mit. Nebeneinandergestellt
 * ergibt das eine Reihe, die lauter ist als der eigene Auftritt. Alle Logos
 * laufen deshalb in einem Ton — sie belegen die Ausstattung, sie werben
 * nicht für den Hersteller.
 *
 * Gleiche Bauform wie `ClientLogos`, bewusst als eigene Komponente: die
 * beiden Reihen tragen unterschiedliche Aussagen und sollen sich nicht
 * gegenseitig verändern, wenn eine davon später angepasst wird.
 */
export default function ProductLogos() {
  if (productLogos.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
        Produkte, die wir einsetzen
      </p>
      <ul className="mt-7 flex flex-wrap items-center gap-x-12 gap-y-8">
        {productLogos.map((logo) => (
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
