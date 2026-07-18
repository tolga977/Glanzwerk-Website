import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceIcon from "@/components/ui/ServiceIcon";

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
}

export default function ServiceCard({
  service,
  titleOverride,
  summaryOverride,
  hrefOverride,
  ctaLabelOverride,
}: ServiceCardProps) {
  const title = titleOverride ?? service.shortTitle;

  return (
    <Link
      href={hrefOverride ?? `/leistungen/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_20px_40px_-12px_rgb(7_26_58/0.12)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500 transition-transform duration-300 ease-out group-hover:scale-105">
        <ServiceIcon slug={service.slug} />
      </div>
      <h3 className="font-display mt-4 text-lg font-medium text-brand-900 group-hover:text-brand-500">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {summaryOverride ?? service.summary}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
        {ctaLabelOverride ?? `Zur ${title}`}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
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
    </Link>
  );
}
