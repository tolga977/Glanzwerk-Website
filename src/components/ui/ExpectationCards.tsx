import FadeIn from "@/components/ui/FadeIn";
import { expectations, expectationIcons } from "@/data/expectations";

/**
 * "Das dürfen Sie von Glanzwerk erwarten" — shared card grid used on the
 * homepage and every service page. Alternates white and light-blue-tinted
 * cards instead of four identical white boxes, per the sitewide design
 * pass toward more visual variety.
 */
export default function ExpectationCards() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {expectations.map((point, index) => {
        const tinted = index % 2 === 1;
        return (
          <FadeIn
            key={point.title}
            delay={index * 80}
            className={`group rounded-2xl border p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/[0.08] ${
              tinted
                ? "border-brand-100 bg-gradient-to-br from-brand-50 to-brand-100/50"
                : "border-black/[0.06] bg-white hover:border-brand-100"
            }`}
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover:scale-105 ${
                tinted ? "bg-white text-brand-500 shadow-sm" : "bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500"
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {expectationIcons[point.icon]}
              </svg>
            </span>
            <p className="font-display mt-4 text-base font-medium text-brand-900">{point.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
          </FadeIn>
        );
      })}
    </div>
  );
}
