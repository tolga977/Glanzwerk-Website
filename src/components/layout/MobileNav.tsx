"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const phoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  /*
   * Solange das Menü offen ist, scrollt der Seiteninhalt dahinter nicht mit,
   * und Escape schließt es. Beides gehört zu einem Menü, das den ganzen
   * Bildschirm einnimmt — ohne Sperre „rutscht" die Seite unter dem Finger
   * weg, sobald man in der Liste am Anschlag ist.
   */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  /*
   * Der Breakpoint muss derselbe sein wie bei der Menü-Schaltfläche im
   * Header (xl). Stünde hier weiterhin lg:hidden, wäre die Schublade
   * zwischen 1024 und 1279 px unsichtbar — die Schaltfläche wäre da, das Menü
   * ließe sich aber nicht öffnen.
   *
   * Bleibt permanent im DOM und wird rein über CSS (`opacity`/`translate-x`)
   * ein-/ausgeblendet — echte Slide-/Fade-Transition ohne Mount-Timing-State.
   * `inert` nimmt das geschlossene Panel aus Tab-Reihenfolge und
   * Screenreader-Baum heraus. `motion-reduce:transition-none` lässt den
   * Zustand unverändert, nur der Übergang entfällt.
   */
  return (
    <div
      /*
       * overflow-hidden ist hier kein Stil, sondern Voraussetzung: Das Panel
       * bleibt geschlossen per `translate-x-full` geometrisch rechts neben
       * dem Container stehen. Ohne Clipping an dieser (exakt
       * viewport-großen, weil `inset-0`) Fläche würde das off-canvas
       * geschobene Panel document.documentElement.scrollWidth erweitern.
       */
      className={`fixed inset-0 z-50 overflow-hidden xl:hidden ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        aria-label="Menü schließen"
        onClick={onClose}
        className={`absolute inset-0 bg-brand-950/50 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav
        id="mobile-navigation"
        aria-label="Mobile Navigation"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-float transition-transform duration-200 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[4.75rem] shrink-0 items-center justify-between border-b border-line px-5">
          <Logo heightClassName="h-[3.25rem]" onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Menü schließen"
            className="press flex h-12 w-12 shrink-0 items-center justify-center rounded-control text-brand-900 hover:bg-brand-50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Der Listenbereich scrollt für sich, die beiden Kontaktwege darunter
            bleiben immer sichtbar — auch wenn die Leistungen aufgeklappt sind
            und die Liste länger als der Bildschirm wird. */}
        <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2">
          {mainNav.map((item) => {
            const showOverviewLink =
              item.children && !item.children.some((child) => child.href === item.href);
            const isOpen = expanded === item.label;
            return (
              <li key={item.label} className="border-b border-line last:border-b-0">
                {item.children ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      className="flex min-h-14 w-full items-center justify-between gap-3 text-left text-lg font-semibold text-brand-900"
                    >
                      {item.label}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className={`shrink-0 text-brand-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {isOpen && (
                      /* Eine Spalte über die volle Breite: jeder Name steht
                         vollständig auf einer Zeile (längster Eintrag
                         „Fitnessstudioreinigung" braucht bei 17 px rund
                         175 px, die Spalte bietet auf 320 px noch ~210). */
                      <ul className="mb-3 flex flex-col gap-0.5">
                        {showOverviewLink && (
                          <li>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="flex min-h-12 items-center gap-1.5 rounded-control px-3 text-base font-semibold text-brand-500 active:bg-brand-50"
                            >
                              Alle Leistungen ansehen
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          </li>
                        )}
                        {item.children.map((child) => {
                          const slug = child.href.split("/").pop() ?? "";
                          const active = pathname === child.href;
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                aria-current={active ? "page" : undefined}
                                className={`flex min-h-12 items-center gap-3 rounded-control px-3 text-[1.0625rem] active:bg-brand-50 ${
                                  active ? "bg-brand-50 font-semibold text-brand-500" : "text-ink hover:text-brand-500"
                                }`}
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-500">
                                  <ServiceIcon slug={slug} className="h-[1.125rem] w-[1.125rem]" />
                                </span>
                                <span className="min-w-0">{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-14 items-center text-lg font-semibold ${
                      isActive(item.href) ? "text-brand-500" : "text-brand-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="shrink-0 border-t border-line bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-8px_24px_-12px_rgba(10,22,52,0.18)]">
          <Link
            href="/preisrechner"
            onClick={onClose}
            className="press shine-sweep flex min-h-14 w-full items-center justify-center rounded-control bg-brand-500 px-5 text-base font-semibold text-white shadow-float hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900"
          >
            Kostenlos Preis erhalten
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="press mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-control border-2 border-brand-900 px-5 text-base font-semibold text-brand-900 hover:bg-brand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900"
          >
            {phoneIcon}
            {siteConfig.phone}
          </a>
        </div>
      </nav>
    </div>
  );
}
