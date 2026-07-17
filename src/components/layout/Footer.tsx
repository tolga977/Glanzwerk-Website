import Link from "next/link";
import Logo from "@/components/layout/Logo";
import GlanzMark from "@/components/ui/GlanzMark";
import { footerServiceLinks, footerLegalLinks } from "@/data/navigation";
import { districts } from "@/data/districts";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-900 text-brand-100">
      <div className="glanz-divider absolute inset-x-0 top-0" />
      <GlanzMark className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-[0.07]" />
      <div className="container-page relative grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo variant="light" height={52} />
          <p className="font-display mt-5 max-w-xs text-base italic leading-relaxed text-brand-100">
            Professionelle Gebäudereinigung für Unternehmen in Berlin –
            Büros, Praxen, Kanzleien und Gewerbeobjekte.
          </p>
          <ul className="mt-5 space-y-1.5 text-sm text-brand-100">
            <li>{siteConfig.address.street}</li>
            <li>
              {siteConfig.address.zip} {siteConfig.address.city}
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                Telefon: {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                E-Mail: {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Leistungen
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-brand-200 hover:text-white">
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
                  className="text-brand-200 hover:text-white"
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
              <Link href="/ueber-uns" className="text-brand-200 hover:text-white">
                Über uns
              </Link>
            </li>
            <li>
              <Link href="/reinigungsfirma-berlin" className="text-brand-200 hover:text-white">
                Reinigungsfirma Berlin
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="text-brand-200 hover:text-white">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/preisrechner" className="text-brand-200 hover:text-white">
                Preisrechner
              </Link>
            </li>
            <li>
              <Link href="/wissen" className="text-brand-200 hover:text-white">
                Glanzwerk Wissen
              </Link>
            </li>
            <li>
              <Link href="/bewertungen" className="text-brand-200 hover:text-white">
                Bewertungen
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <ul className="flex gap-5">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
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
