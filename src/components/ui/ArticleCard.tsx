import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/wissen/${article.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-900/[0.06]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-500">
          {article.category}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold text-brand-900 group-hover:text-brand-500">
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
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
