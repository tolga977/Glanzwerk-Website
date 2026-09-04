"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import GlanzMark from "@/components/ui/GlanzMark";
import { footerServiceLinks, footerLegalLinks } from "@/data/navigation";
import { districts } from "@/data/districts";
import { siteConfig } from "@/data/site";

/*
 * Seiteneigene Farbrolle des Fußes — analog zur Kopfzeile (siehe dortiger
 * Kommentar in Header.tsx) und zu `CTASection`s additivem `tone`-Prop.
 * "brand" ist und bleibt die Vorgabe für die gesamte Website; "eco" gilt
 * ausschließlich, solange der aktuelle Pfad mit "/umwelt-verantwortung"
 * beginnt, und hängt an nichts als dem Pfad — kein gespeicherter Zustand,
 * kein Aufblitzen beim Seitenwechsel.
 *
 * Nur vier Rollen genügen, weil der Fuß nur vier unterschiedliche
 * Textgewichte kennt: Fläche, Überschrift (bleibt in beiden Fällen Weiß),
 * Standardlink und die leiseste Stufe (Copyright/Rechtliches). Die
 * Grünpalette hat bewusst nur vier Stufen (siehe Farbrollen-Kommentar in
 * globals.css) — für die leiseste Stufe steht deshalb `eco-100/70` statt
 * einer eigens dafür erfundenen fünften Stufe.
 */
const footerTone = {
  brand: {
    surface: "bg-brand-900 text-brand-100",
    link: "text-brand-200 hover:text-white focus-visible:outline-brand-300",
    quiet: "text-brand-300 hover:text-white focus-visible:outline-brand-300",
    quietStatic: "text-brand-300",
  },
  eco: {
    surface: "bg-eco-800 text-eco-100",
    link: "text-eco-100 hover:text-white focus-visible:outline-eco-100",
    quiet: "text-eco-100/70 hover:text-white focus-visible:outline-eco-100",
    quietStatic: "text-eco-100/70",
  },
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const tone = pathname.startsWith("/umwelt-verantwortung") ? footerTone.eco : footerTone.brand;

  return (
    <footer className={`relative overflow-hidden ${tone.surface}`}>
      <div className="glanz-divider absolute inset-x-0 top-0" />
      <GlanzMark className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-[0.12]" />
      <div className="container-page relative grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo variant="light" height={52} />
          <p className="font-display mt-5 max-w-xs text-base italic leading-relaxed">
            Professionelle Gebäudereinigung für Unternehmen in Berlin –
            Büros, Praxen, Kanzleien und Gewerbeobjekte.
          </p>
          <ul className="mt-5 space-y-1.5 text-sm">
            <li>{siteConfig.address.street}</li>
            <li>
              {siteConfig.address.zip} {siteConfig.address.city}
            </li>
            <li>
              <a href={siteConfig.phoneHref} className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.quiet}`}>
                Telefon: {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.quiet}`}>
                E-Mail: {siteConfig.email}
              </a>
            </li>
            {/*
              Erreichbarkeit Mo–Sa 08:00–18:00 — vom Betreiber bestätigt
              (Phase 7B). Steht hier als schlichte Textzeile, nicht im Hero
              und nicht als eigene Karte: dieselbe Zeitangabe trägt bereits
              `openingHoursSpecification` in professionalServiceSchema()
              (src/lib/schema.ts) — Structured Data und sichtbarer Inhalt
              sollen übereinstimmen, mehr Gewicht braucht die Angabe nicht.
            */}
            <li>Mo–Sa: 08:00–18:00 Uhr</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Leistungen
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Standorte
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {districts.map((district) => (
              <li key={district.slug}>
                <Link
                  href={`/standorte/${district.slug}`}
                  className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}
                >
                  {district.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Unternehmen
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/ueber-uns" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                Über uns
              </Link>
            </li>
            <li>
              <Link href="/reinigungsfirma-berlin" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                Reinigungsfirma Berlin
              </Link>
            </li>
            <li>
              <Link href="/umwelt-verantwortung" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                Umwelt &amp; Verantwortung
              </Link>
            </li>
            <li>
              <Link href="/3-monate-testen" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                3 Monate flexibel testen
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/preisrechner" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                Preisrechner
              </Link>
            </li>
            <li>
              <Link href="/wissen" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                Glanzwerk Wissen
              </Link>
            </li>
            <li>
              <Link href="/bewertungen" className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.link}`}>
                Bewertungen
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        {/*
          pb-24 statt py-6 unten: die fixierte Kontaktleiste (StickyMobileCTA,
          nur unter 1024 px sichtbar) legt sich sonst über diese letzte Zeile.
          Ab lg entfällt die Leiste, deshalb dort wieder das reguläre Maß.
        */}
        <div className="container-page flex flex-col gap-3 pb-24 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p className={tone.quietStatic}>
            © {year} {siteConfig.name}
          </p>
          <ul className="flex gap-5">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone.quiet}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
