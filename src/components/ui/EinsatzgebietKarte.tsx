"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { googleBusiness } from "@/data/googleBusiness";

/**
 * Berlin-/Einsatzgebiet-Karte auf Basis der echten, bereits bestätigten
 * Firmenadresse (`siteConfig.address`) – keine erfundene Place-ID, kein
 * Maps-API-Schlüssel nötig. Der klassische `output=embed`-Modus von Google
 * Maps funktioniert ohne Zugangsdaten.
 *
 * Bewusst click-to-load statt automatischem iframe beim Seitenaufruf:
 * 1) Performance – auf keiner Landingpage wird beim ersten Rendern eine
 *    schwere Drittanbieter-Ressource nachgeladen (SEO-Audit-Vorgabe).
 * 2) Datenschutz – ohne bestehende Cookie-/Consent-Lösung im Projekt ist ein
 *    Klick-vor-Laden die vorsichtigere Variante, statt eine Google-iframe
 *    ungefragt bei jedem Seitenaufruf zu verbinden. Der Klick selbst ist die
 *    Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) – siehe Datenschutzerklärung.
 *
 * Die Vorschau (`einsatzgebiet-vorschau.png`) ist kein Fake-Screenshot,
 * sondern ein einmalig aus echten OpenStreetMap-Kacheln zusammengesetztes,
 * lokal gehostetes Bild des tatsächlichen Standorts – dadurch entsteht schon
 * vor jeder Einwilligung ein echtes, korrektes Kartenbild, ohne dass dafür
 * bereits eine Verbindung zu Google nötig wäre.
 *
 * Keine Marker für einzelne Bezirke: Glanzwerk hat keine Niederlassungen in
 * einzelnen Stadtteilen, nur diesen einen Firmensitz – alles andere wäre eine
 * erfundene Standortbehauptung.
 */
export default function EinsatzgebietKarte() {
  const [loaded, setLoaded] = useState(false);
  const address = `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-raise">
      {loaded ? (
        <iframe
          src={embedSrc}
          title={`Google Maps – ${siteConfig.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[320px] w-full border-0"
        />
      ) : (
        <div className="relative h-[320px] w-full">
          <Image
            src="/images/karte/einsatzgebiet-vorschau.png"
            alt={`Lageplan – ${address}`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-900/55" />
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-500 shadow-raise">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="font-display text-base font-medium text-white">
              Interaktive Google-Maps-Karte laden
            </span>
            <span className="max-w-sm text-sm leading-relaxed text-white/90">
              {address}. Mit Klick verbinden Sie sich zu Google Maps; dabei werden Daten wie Ihre
              IP-Adresse an Google übertragen und ggf. in den USA verarbeitet. Näheres in unserer{" "}
              <Link href="/datenschutz" className="underline hover:no-underline">
                Datenschutzerklärung
              </Link>
              .
            </span>
          </button>
        </div>
      )}
      <div className="border-t border-line bg-white px-5 py-3">
        <a
          href={googleBusiness.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Google-Unternehmensprofil ansehen
        </a>
      </div>
    </div>
  );
}
