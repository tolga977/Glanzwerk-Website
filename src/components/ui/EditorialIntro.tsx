import type { ReactNode } from "react";
import GlanzMark from "@/components/ui/GlanzMark";

interface EditorialIntroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Label/title in a narrow left column beside the content — an alternative to
 *  SectionHeading's stacked layout, used to break up repeated section rhythm. */
export default function EditorialIntro({ eyebrow, title, subtitle, children }: EditorialIntroProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
      <div>
        {eyebrow && (
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
            <GlanzMark className="h-4 w-4 shrink-0" />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-medium tracking-tight text-brand-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-3.5 text-base leading-relaxed text-ink-soft">{subtitle}</p>}
      </div>
      <div className="lg:pt-1">{children}</div>
    </div>
  );
}
