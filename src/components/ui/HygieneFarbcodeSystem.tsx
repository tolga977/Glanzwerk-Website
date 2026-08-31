import { hygieneColors, hygieneColorBenefits } from "@/data/hygieneFarbcode";

interface HygieneFarbcodeSystemProps {
  /** Überschrift der rechten Spalte, pro Seite individuell formuliert. */
  title: string;
}

/**
 * Farbcodierungssystem für Reinigungstücher – feststehender Fakt (siehe
 * `hygieneFarbcode.ts`), deshalb bewusst EINE gemeinsame Komponente statt
 * pro Seite neu formulierter Fließtext: Die Farb-Zuordnung selbst ändert
 * sich nicht von Seite zu Seite, nur die einleitende Ansprache darüber tut
 * das (siehe jeweiliger Seiten-Intro-Satz, der diese Komponente umgibt).
 */
export default function HygieneFarbcodeSystem({ title }: HygieneFarbcodeSystemProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {hygieneColors.map((color) => (
          <div
            key={color.name}
            className="flex items-start gap-4 rounded-card border border-line bg-white p-5 shadow-raise"
          >
            <span
              aria-hidden="true"
              className={`mt-1 h-8 w-8 shrink-0 rounded-full ${color.swatchClassName}`}
            />
            <div>
              <p className="text-sm font-semibold text-brand-900">
                {color.name}: {color.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{color.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-display text-2xl font-medium tracking-tight text-brand-900 sm:text-3xl">
          {title}
        </h3>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {hygieneColorBenefits.map((benefit) => (
            <li key={benefit} className="py-4 text-base leading-relaxed text-ink-soft first:pt-0 last:pb-0">
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
