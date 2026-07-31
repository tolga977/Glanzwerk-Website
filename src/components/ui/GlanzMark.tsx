interface GlanzMarkProps {
  className?: string;
}

/**
 * Markenmotiv: ein stilisierter Lichtreflex zum Namensbestandteil "Glanz".
 *
 * Die drei Striche werden nach außen dünner UND heller — sie stellen ein
 * abklingendes Licht dar, nicht drei Objekte. Der dritte Strich stand
 * vorher in warmem Gelb: damit las sich das Zeichen als drei verschieden
 * farbige Balken statt als ein Reflex, und es war die letzte Stelle, an der
 * eine markenfremde Farbe im System auftauchte.
 */
export default function GlanzMark({ className = "" }: GlanzMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 32 L26 8"
        stroke="var(--color-brand-400)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M16 34 L30 15"
        stroke="var(--color-brand-300)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24 35 L33 23"
        stroke="var(--color-brand-200)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
