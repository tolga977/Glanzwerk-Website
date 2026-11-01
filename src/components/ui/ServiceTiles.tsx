import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceIllustration from "@/components/ui/ServiceIllustration";

/*
 * Leistungsübersicht als Kachelraster: hellgraue Rechtecke mit Titel oben
 * links, rundem Pfeilknopf unten links und einer Zeichnung unten rechts, die
 * über den Kachelrand hinausläuft. Die ganze Kachel ist ein einziger Link —
 * der Pfeil ist Teil davon und braucht kein eigenes Ziel.
 *
 * Auf dem Telefon zwei Spalten, damit zwölf Leistungen nicht zu zwölf
 * Bildschirmhöhen werden; ab 768 px drei, ab 1280 px vier.
 */
/*
 * Weiche Trennstelle vor „reinigung“. Auf 170-px-Kacheln passt kein Wort wie
 * „Fitnessstudioreinigung“ in eine Zeile; `hyphens: auto` hängt vom
 * Wörterbuch des jeweiligen Browsers ab und griff nicht verlässlich — ohne
 * Trennstelle bricht `break-words` mitten im Wort („Gebäudereinigu-ng“).
 * Auf breiten Kacheln bleibt die Trennstelle unsichtbar.
 */
const hyphenate = (title: string) => title.replace(/(\p{L})(reinigung)/gu, "$1­$2");

export default function ServiceTiles({ services }: { services: readonly Service[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-4">
      {services.map((service) => (
        <li key={service.slug} className="flex">
          <Link
            href={`/leistungen/${service.slug}`}
            className="press group relative flex aspect-[1/1.02] w-full flex-col justify-between overflow-hidden rounded-card bg-[#eef1f6] p-4 transition-colors duration-300 ease-out hover:bg-[#e4e9f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:aspect-[3/2] sm:p-6"
          >
            <h3 className="relative z-[1] max-w-[88%] hyphens-manual break-words font-display text-[0.9375rem] font-semibold leading-snug text-brand-950 sm:text-lg xl:text-[1.1875rem]">
              {hyphenate(service.shortTitle)}
            </h3>

            <ServiceIllustration
              slug={service.slug}
              className="pointer-events-none absolute bottom-0 right-0 h-[54%] w-auto max-w-[92%] origin-bottom-right transition-transform duration-500 ease-out group-hover:scale-[1.05] sm:h-[64%]"
            />

            <span
              aria-hidden="true"
              className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-950 shadow-raise transition-colors duration-300 ease-out group-hover:bg-brand-500 group-hover:text-white sm:h-12 sm:w-12"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
