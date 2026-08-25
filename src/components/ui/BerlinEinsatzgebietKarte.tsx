import Link from "next/link";
import { districts } from "@/data/districts";

/**
 * Eigenständige Berlin-/Einsatzgebietskarte – bewusst KEIN Google-Maps-Embed
 * (siehe `EinsatzgebietKarte.tsx` für die Google-Komponente, die einen
 * anderen Zweck hat: den Firmensitz zeigen, nicht das Einsatzgebiet).
 *
 * Schematische Übersicht statt kartografisch exakter Umrisse: reines CSS-Grid
 * mit den 12 Berliner Bezirken in ihrer ungefähren Himmelsrichtung
 * zueinander (Mitte im Zentrum, Reinickendorf/Pankow im Norden, Spandau im
 * Westen, Marzahn-Hellersdorf im Osten, Steglitz-Zehlendorf im Südwesten
 * usw.). Kein Anspruch auf exakte Grenzverläufe – das wäre bei einer
 * handgezeichneten Form ohnehin fehleranfällig. Jede Kachel verlinkt auf die
 * echte, bereits bestehende Bezirksseite.
 *
 * Keine Marker für Niederlassungen oder Einzelstandorte: Glanzwerk hat einen
 * Firmensitz, keine Filialen je Bezirk – die Karte zeigt ausschließlich das
 * bestätigte Einsatzgebiet (alle 12 Bezirke), keine erfundenen Adressen.
 *
 * Reines HTML/CSS, keine Bilder, kein Skript, keine Netzwerkanfrage – lädt
 * augenblicklich und beeinträchtigt keinen Core-Web-Vitals-Wert.
 */
const layout: Array<{ slug: string; col: number; row: number }> = [
  { slug: "reinickendorf", col: 3, row: 1 },
  { slug: "spandau", col: 1, row: 2 },
  { slug: "pankow", col: 3, row: 2 },
  { slug: "lichtenberg", col: 4, row: 2 },
  { slug: "charlottenburg-wilmersdorf", col: 2, row: 3 },
  { slug: "mitte", col: 3, row: 3 },
  { slug: "friedrichshain-kreuzberg", col: 4, row: 3 },
  { slug: "marzahn-hellersdorf", col: 5, row: 3 },
  { slug: "steglitz-zehlendorf", col: 2, row: 4 },
  { slug: "tempelhof-schoeneberg", col: 3, row: 4 },
  { slug: "neukoelln", col: 4, row: 4 },
  { slug: "treptow-koepenick", col: 5, row: 4 },
];

export default function BerlinEinsatzgebietKarte() {
  const bySlug = new Map(districts.map((d) => [d.slug, d]));

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-raise sm:p-7">
      <div
        className="grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
        role="list"
        aria-label="Berliner Bezirke im Einsatzgebiet von Glanzwerk"
      >
        {layout.map(({ slug, col, row }) => {
          const district = bySlug.get(slug);
          if (!district) return null;
          return (
            <Link
              key={slug}
              href={`/standorte/${slug}`}
              role="listitem"
              style={{ gridColumnStart: col, gridRowStart: row }}
              className="flex min-h-14 items-center justify-center rounded-control border border-line bg-brand-50/60 px-1.5 py-2 text-center text-[11px] font-medium leading-tight text-brand-900 transition-colors duration-200 ease-out hover:border-brand-500 hover:bg-brand-50 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:min-h-16 sm:text-xs"
            >
              {district.name}
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-soft sm:text-sm">
        Schematische Übersicht der 12 Berliner Bezirke, kein exakter Grenzverlauf. Jede Kachel führt
        zur jeweiligen Bezirksseite.
      </p>
    </div>
  );
}
