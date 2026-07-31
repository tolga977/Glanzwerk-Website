import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { servicePhotos } from "@/data/servicePhotos";

interface ServiceCardProps {
  service: Service;
  /** Override the card's title (e.g. to combine two related services). */
  titleOverride?: string;
  /** Override the card's description text. */
  summaryOverride?: string;
  /** Override the destination link (defaults to the service's own page). */
  hrefOverride?: string;
  /** Override the trailing CTA label (defaults to "Zur {title}"). */
  ctaLabelOverride?: string;
  /**
   * "feature": größere Bildfläche und größere Überschrift für Leistungen,
   * die in einem Raster mehr Breite bekommen.
   * "compact": auf Telefonen eine liegende Zeile (Bild links, Text rechts),
   * ab 640 px wieder die normale stehende Karte — halbiert die Scrollhöhe
   * einer langen Leistungsliste, ohne Inhalte zu entfernen.
   * Der Default bleibt exakt die bisherige Darstellung, damit alle anderen
   * Seiten unverändert bleiben.
   */
  variant?: "default" | "feature" | "compact";
}

export default function ServiceCard({
  service,
  titleOverride,
  summaryOverride,
  hrefOverride,
  ctaLabelOverride,
  variant = "default",
}: ServiceCardProps) {
  const title = titleOverride ?? service.shortTitle;
  const photo = servicePhotos[service.slug];
  const feature = variant === "feature";
  const compact = variant === "compact";

  return (
    <Link
      href={hrefOverride ?? `/leistungen/${service.slug}`}
      className={`lift press group relative flex h-full overflow-hidden rounded-card border border-line bg-white shadow-raise hover:border-brand-200 hover:shadow-float focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
        compact ? "flex-row sm:flex-col" : "flex-col"
      }`}
    >
      {photo && (
        <div
          className={`relative overflow-hidden ${
            feature
              ? "aspect-[16/10]"
              : compact
                ? "w-32 shrink-0 sm:aspect-[4/3] sm:w-auto"
                : "aspect-[4/3]"
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              feature
                ? "(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw"
                : compact
                  ? "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 112px"
                  : "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/25 via-transparent to-transparent" />
        </div>
      )}
      <div
        className={`relative flex flex-1 flex-col ${
          feature ? "p-7 sm:p-8" : compact ? "p-4 sm:p-6" : "p-6"
        }`}
      >
        {/*
          Hier lag eine 2 px hohe Akzentleiste, die beim Überfahren von links
          nach rechts einfuhr — in einem Verlauf aus zwei Blautönen in ein
          warmes Gelb.

          Sie ist ersatzlos entfallen. Die Karte hatte damit sieben
          gleichzeitige Hover-Reaktionen: Anheben, Rahmenfarbe, Schatten,
          Bildzoom, Leiste, Titelfarbe, Pfeil. Wenn alles gleichzeitig
          antwortet, antwortet nichts erkennbar. Übrig bleiben sechs, und
          jede einzelne sagt etwas über den Zustand aus — die Leiste war die
          einzige rein dekorative. Der Verlauf in eine markenfremde Farbe war
          zusätzlich das Erkennungszeichen jeder Baukastenkarte.
        */}
        {/* In der liegenden Telefon-Darstellung trägt bereits das Foto die
            visuelle Kennzeichnung — das Icon würde dort nur konkurrieren. */}
        <div
          className={`items-center justify-center rounded-control bg-brand-50 text-brand-500 ${
            compact ? "hidden h-11 w-11 sm:flex" : feature ? "flex h-12 w-12" : "flex h-11 w-11"
          }`}
        >
          <ServiceIcon slug={service.slug} />
        </div>
        <h3
          className={`font-display display-lg mt-4 font-medium text-brand-900 transition-colors duration-200 group-hover:text-brand-500 ${
            feature ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        <p className={`mt-2.5 leading-relaxed text-ink-soft ${feature ? "text-base" : "text-sm"}`}>
          {summaryOverride ?? service.summary}
        </p>
        {/* mt-auto hält den Link am Kartenfuß, sodass er in einer Kartenreihe
            auf einer Linie sitzt; der Pfeil läuft im Textfluss mit und steht
            bei zweizeiligen Labels nicht frei daneben. */}
        <span className="mt-auto block pt-5 text-sm font-semibold text-brand-500">
          {ctaLabelOverride ?? `Zur ${title}`}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="ml-1.5 inline-block align-[-0.15em] transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
