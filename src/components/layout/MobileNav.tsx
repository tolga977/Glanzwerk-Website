"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Menü schließen"
        onClick={onClose}
        className="absolute inset-0 bg-brand-950/50"
      />
      <nav
        aria-label="Mobile Navigation"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <Logo height={40} onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Menü schließen"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-1">
          {mainNav.map((item) => {
            const showOverviewLink =
              item.children && !item.children.some((child) => child.href === item.href);
            return (
              <li key={item.label} className="border-b border-gray-100 py-1">
                {item.children ? (
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between py-3 text-left text-base font-semibold text-brand-900"
                    >
                      {item.label}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform ${
                          expanded === item.label ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {expanded === item.label && (
                      <ul className="mb-2 flex flex-col gap-1 pl-4">
                        {showOverviewLink && (
                          <li>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="block py-2 text-sm font-medium text-brand-500"
                            >
                              Übersicht {item.label}
                            </Link>
                          </li>
                        )}
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-2 text-sm text-ink-soft hover:text-brand-500"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block min-h-11 py-3 text-base font-semibold ${
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

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-brand-900 px-5 py-3 text-sm font-semibold text-brand-900"
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/preisrechner"
            onClick={onClose}
            className="flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Preis berechnen
          </Link>
        </div>
      </nav>
    </div>
  );
}
