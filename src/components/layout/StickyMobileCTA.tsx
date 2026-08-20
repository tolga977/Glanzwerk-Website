"use client";

import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

/*
 * Fester Kontaktweg am unteren Bildschirmrand — ausschließlich unter 1024 px.
 *
 * Auf dem Telefon hat die Kopfzeile keinen sichtbaren "Preis schätzen"-Knopf
 * (nur Anruf- und Menüsymbol, siehe Header.tsx), und die eigentlichen
 * Handlungswege stehen sonst nur innerhalb der einzelnen Abschnitte. Beim
 * Scrollen durch eine lange Seite ist damit oft kein Weg zum Kontakt sichtbar.
 * Diese Leiste bleibt immer erreichbar, unabhängig von der Scrollposition.
 *
 * `lg:hidden` statt `xl:hidden`: die Kopfzeile zeigt ihre volle Navigation
 * erst ab `xl`, aber ihr "Preis schätzen"-Knopf bereits ab `xl` ebenfalls —
 * zwischen 1024 und 1279 px hat die Kopfzeile also schon keinen Textknopf
 * mehr. Die Leiste hier schließt trotzdem erst bei `lg` (1024 px), weil die
 * Seite ab dort grundsätzlich auf Desktop-Layout wechselt (siehe HeroStage,
 * Vertrauensbereich u.a.) und ein Tablet im Querformat bereits genug Platz
 * für die regulären Schaltflächen im Inhalt hat.
 *
 * Auf `/kontakt`, `/impressum` und `/datenschutz` blendet sie sich aus: die
 * Kontaktseite hat ihr eigenes Formular, ein zweiter Kontaktweg darüber würde
 * nur das Absenden verdecken; die beiden rechtlichen Seiten brauchen keinen
 * Verkaufsimpuls.
 */
const HIDDEN_PATH_PREFIXES = ["/kontakt", "/impressum", "/datenschutz"];

export default function StickyMobileCTA() {
  const pathname = usePathname();

  if (HIDDEN_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-float backdrop-blur-md lg:hidden"
    >
      <div className="container-page flex items-center gap-3">
        <a
          href={siteConfig.phoneHref}
          aria-label={`Anrufen: ${siteConfig.phone}`}
          className="press flex h-12 w-12 shrink-0 items-center justify-center rounded-control border-2 border-brand-900 text-brand-900 transition-colors duration-200 ease-out hover:bg-brand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <Button href="/preisrechner" size="lg" className="min-h-12 flex-1">
          Kostenlos Preis erhalten
        </Button>
      </div>
    </div>
  );
}
