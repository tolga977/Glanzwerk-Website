import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  /**
   * "feature": grosse Bildflaeche und groessere Ueberschrift fuer den
   * fuehrenden Beitrag einer redaktionellen Strecke.
   * "row": liegende Zeile (Bild links, Text rechts) fuer begleitende
   * Beitraege neben einem Feature — verhindert die Reihe aus drei
   * gleichwertigen Kacheln.
   * Der Default bleibt exakt die bisherige Darstellung.
   */
  variant?: "default" | "feature" | "row";
}

/**
 * Redaktionelle Darstellung — bewusst KEINE Karte mit Rahmen und Schatten.
 * Ratgeberbeiträge sollen sich vom Leistungsangebot unterscheiden: Bildfläche,
 * Kategorie-Label mit feiner Linie, Seriftitel, ruhiger Textblock. Dadurch
 * liest sich der Wissensbereich als Magazinstrecke statt als weitere
 * Kartenreihe.
 */
export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const feature = variant === "feature";
  const row = variant === "row";

  return (
    <Link
      href={`/wissen/${article.slug}`}
      className={`press group flex rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 ${
        row ? "flex-row items-start gap-5" : "flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-card ${
          row ? "aspect-square w-28 sm:w-32" : feature ? "aspect-[3/2]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes={
            row
              ? "128px"
              : feature
                ? "(min-width: 1024px) 680px, 100vw"
                : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className={`flex flex-1 flex-col ${row ? "" : "pt-5"}`}>
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">
            {article.category}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 origin-left bg-line-strong transition-colors duration-300 ease-out group-hover:bg-brand-300"
          />
        </div>
        <h3
          className={`font-display display-lg mt-3 font-medium text-brand-900 transition-colors duration-200 group-hover:text-brand-500 ${
            feature ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>
        <p className={`mt-2.5 leading-relaxed text-ink-soft ${feature ? "measure text-base" : "text-sm"}`}>
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-500">
          Weiterlesen
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
      </div>
    </Link>
  );
}
