import type { ReactNode } from "react";
import GlanzMark from "@/components/ui/GlanzMark";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Plain string, or JSX with a highlighted word/phrase (e.g. <span className="text-brand-400">...</span>). */
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Render the title as an h1 for pages where this is the primary heading. */
  as?: "h1" | "h2";
  /** Use light text colors when placed on a dark ("navy" or "brand") Section background. */
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
  light = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] ${
            light ? "text-brand-200" : "text-brand-500"
          } ${centered ? "justify-center" : ""}`}
        >
          <GlanzMark className="h-4 w-4 shrink-0" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-display font-medium tracking-tight ${light ? "text-white" : "text-brand-900"} ${
          Heading === "h1" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={`mt-3.5 text-base leading-relaxed ${light ? "text-brand-100" : "text-ink-soft"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  /**
   * white/muted/warm: existing light surfaces.
   * tint: soft light-blue gradient wash, for rhythm between white sections.
   * brand: bold mid-blue gradient block, white text.
   * navy: darkest brand block, white text.
   */
  background?: "white" | "muted" | "tint" | "brand" | "warm" | "navy";
  id?: string;
  /** Adds soft, contained blurred blue shapes in the background for extra depth. */
  decor?: boolean;
}

const backgroundClasses: Record<NonNullable<SectionProps["background"]>, string> = {
  white: "bg-white",
  muted: "bg-brand-50/60",
  tint: "bg-gradient-to-b from-brand-100/70 via-brand-50/50 to-white",
  brand: "bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white",
  warm: "bg-graphite-50",
  navy: "bg-gradient-to-br from-brand-900 via-brand-900 to-brand-950 text-white",
};

export default function Section({
  children,
  className = "",
  background = "white",
  id,
  decor = false,
}: SectionProps) {
  const dark = background === "navy" || background === "brand";
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden ${backgroundClasses[background]} py-20 sm:py-24`}
    >
      {decor && (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${
              dark ? "bg-white/10" : "bg-brand-200/40"
            }`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full blur-3xl ${
              dark ? "bg-brand-400/10" : "bg-brand-100/60"
            }`}
          />
        </>
      )}
      <div className={`container-page relative z-[1] ${className}`}>{children}</div>
    </section>
  );
}
