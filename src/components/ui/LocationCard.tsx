import Link from "next/link";
import type { District } from "@/data/districts";

export default function LocationCard({ district }: { district: District }) {
  return (
    <Link
      href={`/standorte/${district.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-900/[0.08]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500 transition-transform duration-300 ease-out group-hover:scale-105">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 22s7-7.4 7-12.4A7 7 0 0 0 5 9.6C5 14.6 12 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="9.6" r="2.4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-brand-900 group-hover:text-brand-500">
          {district.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{district.summary}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
        {district.name} ansehen
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
