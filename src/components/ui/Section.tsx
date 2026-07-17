import type { ReactNode } from "react";
import GlanzMark from "@/components/ui/GlanzMark";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Render the title as an h1 for pages where this is the primary heading. */
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500 ${
            centered ? "justify-center" : ""
          }`}
        >
          <GlanzMark className="h-4 w-4 shrink-0" />
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
        {title}
      </Heading>
      {subtitle && <p className="mt-3.5 text-base leading-relaxed text-ink-soft">{subtitle}</p>}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "muted" | "navy";
  id?: string;
}

const backgroundClasses: Record<NonNullable<SectionProps["background"]>, string> = {
  white: "bg-white",
  muted: "bg-brand-50/60",
  navy: "bg-brand-900 text-white",
};

export default function Section({
  children,
  className = "",
  background = "white",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`${backgroundClasses[background]} py-16 sm:py-20`}>
      <div className={`container-page ${className}`}>{children}</div>
    </section>
  );
}
