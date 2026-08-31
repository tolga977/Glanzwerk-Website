import Link from "next/link";
import { districts } from "@/data/districts";

/**
 * Eigenständige Berlin-/Einsatzgebietskarte – bewusst KEIN Google-Maps-Embed
 * (siehe `EinsatzgebietKarte.tsx` für die Google-Komponente, die einen
 * anderen Zweck hat: den Firmensitz zeigen, nicht das Einsatzgebiet).
 *
 * Honeycomb-Kartogramm statt kartografisch exakter Grenzen: Sechseck-Kacheln
 * berühren sich lückenlos an den Kanten, dadurch wirkt die Fläche wie eine
 * zusammenhängende Karte statt wie lose Kästchen. Die Positionen folgen der
 * ungefähren echten Himmelsrichtung jedes Bezirks zu Mitte (Pankow im
 * Norden, Spandau im Westen, Marzahn-Hellersdorf im Osten usw.) – kein
 * Anspruch auf exakte Grenzverläufe oder Nachbarschaften, das wäre bei
 * handgezeichneten Formen ohnehin fehleranfällig. Jede Kachel verlinkt auf
 * die echte, bereits bestehende Bezirksseite.
 *
 * Keine Marker für Niederlassungen oder Einzelstandorte: Glanzwerk hat einen
 * Firmensitz, keine Filialen je Bezirk – die Karte zeigt ausschließlich das
 * bestätigte Einsatzgebiet (alle 12 Bezirke), keine erfundenen Adressen.
 *
 * Reines inline SVG, keine Bilder, kein Skript, keine Netzwerkanfrage –
 * lädt augenblicklich und beeinträchtigt keinen Core-Web-Vitals-Wert.
 */

// Achsiale Hex-Koordinaten (flat-top), ungefähre Himmelsrichtung zu Mitte.
const layout: Array<{ slug: string; q: number; r: number }> = [
  { slug: "mitte", q: 0, r: 0 },
  { slug: "pankow", q: 0, r: -1 },
  { slug: "lichtenberg", q: 1, r: -1 },
  { slug: "friedrichshain-kreuzberg", q: 1, r: 0 },
  { slug: "neukoelln", q: 0, r: 1 },
  { slug: "tempelhof-schoeneberg", q: -1, r: 1 },
  { slug: "charlottenburg-wilmersdorf", q: -1, r: 0 },
  { slug: "reinickendorf", q: 0, r: -2 },
  { slug: "marzahn-hellersdorf", q: 2, r: -1 },
  { slug: "treptow-koepenick", q: 2, r: 0 },
  { slug: "steglitz-zehlendorf", q: -1, r: 2 },
  { slug: "spandau", q: -2, r: 0 },
];

const HEX_SIZE = 44;
const GAP = 3;

function hexCenter(q: number, r: number) {
  const x = HEX_SIZE * 1.5 * q;
  const y = HEX_SIZE * (Math.sqrt(3) * 0.5 * q + Math.sqrt(3) * r);
  return { x, y };
}

function hexPoints(cx: number, cy: number, size: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i);
    return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
  }).join(" ");
}

export default function BerlinEinsatzgebietKarte() {
  const bySlug = new Map(districts.map((d) => [d.slug, d]));

  const centers = layout.map((entry) => ({ ...entry, ...hexCenter(entry.q, entry.r) }));
  const xs = centers.map((c) => c.x);
  const ys = centers.map((c) => c.y);
  const pad = HEX_SIZE + 6;
  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-raise sm:p-7">
      <svg
        viewBox={`${minX} ${minY} ${width} ${height}`}
        role="img"
        aria-label="Berliner Bezirke im Einsatzgebiet von Glanzwerk, schematisch als Honeycomb-Karte dargestellt"
        className="mx-auto w-full max-w-md"
      >
        {centers.map(({ slug, x, y }) => {
          const district = bySlug.get(slug);
          if (!district) return null;
          const nameParts = district.name.split("-");
          return (
            <Link key={slug} href={`/standorte/${slug}`}>
              <polygon
                points={hexPoints(x, y, HEX_SIZE - GAP)}
                className="fill-brand-50 stroke-line transition-colors duration-200 ease-out hover:fill-brand-100 hover:stroke-brand-500"
                strokeWidth={1.5}
              />
              {nameParts.length > 1 ? (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className="select-none fill-brand-900 text-[9.5px] font-medium"
                >
                  <tspan x={x} dy="-0.35em">
                    {nameParts[0]}-
                  </tspan>
                  <tspan x={x} dy="1.15em">
                    {nameParts[1]}
                  </tspan>
                </text>
              ) : (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="select-none fill-brand-900 text-[11px] font-medium"
                >
                  {district.name}
                </text>
              )}
            </Link>
          );
        })}
      </svg>
      <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft sm:text-sm">
        Schematische Übersicht der 12 Berliner Bezirke, kein exakter Grenzverlauf. Jede Kachel führt
        zur jeweiligen Bezirksseite.
      </p>
    </div>
  );
}
