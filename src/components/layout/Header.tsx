"use client";

import { useState, type FocusEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import MobileNav from "@/components/layout/MobileNav";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { mainNav } from "@/data/navigation";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

const chevron = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function handleBlur(event: FocusEvent<HTMLLIElement>, label: string) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenDropdown((prev) => (prev === label ? null : prev));
    }
  }

  /*
   * Materialebene statt Farbfläche (apple-design §12): eine größere Fläche
   * soll dicker wirken als ein kleiner Chip. Deckung leicht zurückgenommen,
   * dafür stärkerer Blur und eine Sättigungsanhebung — dadurch bleibt der
   * Untergrund als Material spürbar, statt von einer fast weißen Platte
   * abgedeckt zu werden. Die Haarlinie unten bleibt: ohne sie verschwimmt
   * der Kopf auf den weißen Unterseiten mit dem Inhalt.
   */
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-xl backdrop-saturate-150">
      {/*
        Kopfhöhe und Logogröße gestaffelt — gemessen, nicht geschätzt.

          < 1536 px   88 px hoch  = 1,57×
          ≥ 1536 px   96 px hoch  = 1,71×   (Zielgröße aus dem Auftrag)

        Warum die volle Navigation erst ab 1280 px erscheint (vorher 1024):
        Bei 1024 px stellt die Zeile nur 945 px Inhaltsbreite bereit,
        Navigation, Telefonnummer und Schaltfläche brauchen zusammen 1095 px.
        Das ging bisher nur auf, weil längere Einträge wie damals "Umwelt &
        Verantwortung" und "Glanzwerk Wissen" dort still zweizeilig umbrachen — ein
        Bestandsfehler, der beim Vermessen sichtbar wurde. Zwischen 1024 und
        1279 px zeigt der Kopf jetzt dieselbe kompakte Form wie auf dem
        Telefon; über das Menü bleiben alle Einträge vollständig erreichbar.
        Eine umbrechende Navigation wäre die schlechtere Antwort.

        Die Kopfhöhe folgt dem Logo mit gleichem Abstand oben und unten. Ein
        Logo, das den Rand berührt, wirkt nicht groß, sondern gedrängt.

        Gesamte Kopfzone vorher (mit Hinweisleiste): 121 / 137 / 137 px.
        Jetzt: 112 / 112 / 128 px — auf jedem Breakpoint weniger, obwohl das
        Logo überall deutlich größer ist.

        `mr-auto` am Logo statt `justify-between` am Container: der freie Raum
        sammelt sich hinter dem Logo, statt sich gleichmäßig auf beide Lücken
        zu verteilen. Genau diese Gleichverteilung ließ die Navigation mittig
        und damit beliebig wirken.
      */}
      <div className="container-page flex h-28 items-center gap-6 2xl:h-32">
        <Logo
          heightClassName="h-[5.5rem] 2xl:h-24"
          className="mr-auto shrink-0"
        />

        <nav aria-label="Hauptnavigation" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const isMega = item.label === "Leistungen";
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => item.children && setOpenDropdown(null)}
                  onBlur={(event) => item.children && handleBlur(event, item.label)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-expanded={item.children ? openDropdown === item.label : undefined}
                    onFocus={() => item.children && setOpenDropdown(item.label)}
                    /* px-3 statt px-4: die 40 px, die das Innenpolster über
                       fünf Einträge freigibt, gehen direkt an das größere
                       Logo. Trefferfläche bleibt über min-h-11 bei 44 px.

                       whitespace-nowrap ist hier kein Detail, sondern der
                       Unterschied zwischen Kopfzeile und Textblock: ohne die
                       Angabe brachen "Umwelt & Verantwortung" und "Glanzwerk
                       Wissen" bei 1440 px zweizeilig um, sobald das Logo
                       wuchs. Eine zweizeilige Navigation liest sich nicht als
                       Menü, sondern als Absatz. */
                    className={`flex min-h-11 items-center gap-1 whitespace-nowrap rounded-control px-3 py-3 text-sm font-medium transition-colors duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                      isActive(item.href) ? "bg-brand-50 text-brand-500" : "text-brand-900"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <span
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      >
                        {chevron}
                      </span>
                    )}
                  </Link>

                  {item.children && (
                    <div
                      inert={openDropdown !== item.label}
                      /*
                       * Bleibt permanent im DOM statt nur bei offenem Zustand
                       * zu mounten, und wird über `opacity`/`scale`/
                       * `translate-y` weich ein-/ausgeblendet statt abrupt zu
                       * erscheinen/verschwinden. `inert` nimmt das
                       * geschlossene Dropdown aus Tab-Reihenfolge und
                       * Screenreader-Baum heraus — sonst blieben seine Links
                       * bei unsichtbarem Panel per Tab erreichbar.
                       * `motion-reduce:transition-none` lässt den Zustand
                       * unverändert, nur der Übergang entfällt.
                       */
                      className={`absolute left-1/2 top-full z-10 -translate-x-1/2 rounded-card border border-line bg-white p-5 shadow-float transition-all duration-200 ease-out motion-reduce:transition-none ${
                        isMega ? "w-[560px]" : "w-64"
                      } ${
                        openDropdown === item.label
                          ? "visible translate-y-0 scale-100 opacity-100"
                          : "invisible translate-y-1 scale-[0.98] opacity-0"
                      }`}
                    >
                      {item.label === "Leistungen" && (
                        <div className="grid grid-cols-[1fr_auto] gap-5">
                          <ul className="grid grid-cols-2 gap-1">
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/leistungen/${service.slug}`}
                                  className="flex items-center gap-2.5 rounded-control px-3 py-2 text-sm text-ink-soft transition-colors duration-200 ease-out hover:bg-brand-50 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-500">
                                    <ServiceIcon slug={service.slug} className="h-4 w-4" />
                                  </span>
                                  {service.shortTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/preisrechner"
                            className="lift flex w-40 flex-col justify-between rounded-control bg-gradient-to-br from-brand-900 to-brand-800 p-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                          >
                            <span className="text-sm font-semibold">
                              Nicht sicher, was Sie brauchen?
                            </span>
                            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-200">
                              Preis berechnen {chevron}
                            </span>
                          </Link>
                        </div>
                      )}

                      {!isMega && (
                        <ul className="grid gap-0.5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-control px-3 py-2 text-sm text-ink-soft transition-colors duration-200 ease-out hover:bg-brand-50 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/*
          Navigieren und Handeln sind zwei verschiedene Absichten und werden
          deshalb sichtbar getrennt (apple-design §16, Grouping & Mapping):
          links die Orientierung, rechts hinter einer Haarlinie die beiden
          Handlungen. Vorher liefen Menü, Telefonnummer und Schaltfläche als
          eine durchgehende Reihe — das ist der Grund, warum die Kopfzeile
          beliebig wirkte, nicht die Position der Navigation.

          Die Linie ist 28 px hoch, also kürzer als die Kopfzeile: sie
          trennt, ohne die Zeile zu zerschneiden.
        */}
        <div className="hidden items-center gap-5 xl:flex">
          {/*
            Trennung zwischen Navigation und Kontaktweg.

            Hier stand ein senkrechter Strich — die Voreinstellung, die in
            jeder Kopfzeile steht. Es ist derselbe Strich geblieben, nur im
            53-Grad-Winkel des Markenzeichens. Damit trägt die Kopfzeile
            neben der Logodatei ein zweites, eigenes Merkmal, und der
            Besucher begegnet dem Winkel schon vor dem ersten Scrollen.

            Kein zusätzliches Element, keine Dekoration: ein vorhandener
            Strich, richtig geneigt.
          */}
          <span
            aria-hidden="true"
            className="h-7 w-px shrink-0 rotate-[36.87deg] rounded-full bg-line-strong"
          />
          <a
            href={siteConfig.phoneHref}
            className="flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-control px-1 text-sm font-medium text-ink-soft transition-colors duration-200 ease-out hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {siteConfig.phone}
          </a>
          <Link
            href="/preisrechner"
            /* Die einzige primäre Handlung der Kopfzeile — und in einer jetzt
               höheren Zeile darf sie mitwachsen, sonst wirkt sie verloren.
               Ruheschatten wie bei allen Primärschaltflächen der Seite. */
            className="shine-sweep lift press inline-flex min-h-12 items-center justify-center rounded-control bg-brand-500 px-6 text-sm font-semibold text-white shadow-float hover:bg-brand-600 hover:shadow-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900"
          >
            Preis berechnen
          </Link>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Anrufen: ${siteConfig.phone}`}
            className="press flex h-12 w-12 items-center justify-center rounded-control text-brand-900 transition-colors duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
            className="press flex h-12 w-12 items-center justify-center rounded-control text-brand-900 transition-colors duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
