"use client";

import { useState, type FocusEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import MobileNav from "@/components/layout/MobileNav";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { mainNav } from "@/data/navigation";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { siteConfig } from "@/data/site";

const chevron = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const pinIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 22s7-7.4 7-12.4A7 7 0 0 0 5 9.6C5 14.6 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.6" r="2.4" stroke="currentColor" strokeWidth="2" />
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

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-24 items-center justify-between gap-6">
        <Logo height={56} className="shrink-0" />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const isMega = item.label === "Leistungen" || item.label === "Standorte";
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
                    className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-brand-50 ${
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

                  {item.children && openDropdown === item.label && (
                    <div
                      className={`absolute left-1/2 top-full z-10 -translate-x-1/2 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-2xl shadow-brand-950/[0.08] ${
                        item.label === "Standorte" ? "w-[640px]" : isMega ? "w-[560px]" : "w-64"
                      }`}
                    >
                      {item.label === "Leistungen" && (
                        <div className="grid grid-cols-[1fr_auto] gap-5">
                          <ul className="grid grid-cols-2 gap-1">
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/leistungen/${service.slug}`}
                                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-brand-50 hover:text-brand-500"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                                    <ServiceIcon slug={service.slug} className="h-4 w-4" />
                                  </span>
                                  {service.shortTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/preisrechner"
                            className="flex w-40 flex-col justify-between rounded-xl bg-gradient-to-br from-brand-900 to-brand-800 p-4 text-white transition-transform hover:-translate-y-0.5"
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

                      {item.label === "Standorte" && (
                        <div className="grid grid-cols-[1fr_auto] gap-5">
                          <ul className="grid grid-cols-2 gap-1">
                            {districts.map((district) => (
                              <li key={district.slug}>
                                <Link
                                  href={`/standorte/${district.slug}`}
                                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:bg-brand-50 hover:text-brand-500"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                                    {pinIcon}
                                  </span>
                                  {district.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/standorte"
                            className="flex w-40 flex-col justify-between rounded-xl bg-gradient-to-br from-brand-900 to-brand-800 p-4 text-white transition-transform hover:-translate-y-0.5"
                          >
                            <span className="text-sm font-semibold">
                              Alle 12 Bezirke im Überblick
                            </span>
                            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-200">
                              Standorte ansehen {chevron}
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
                                className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-brand-50 hover:text-brand-500"
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

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-brand-500"
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
            className="shine-sweep inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Preis berechnen
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Anrufen: ${siteConfig.phone}`}
            className="flex h-11 w-11 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
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
            className="flex h-11 w-11 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
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
