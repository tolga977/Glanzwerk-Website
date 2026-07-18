interface GlanzMarkProps {
  className?: string;
}

/** Signature brand motif: stylised "shine glint" echoing "Glanz". */
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
        stroke="var(--color-accent-500)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
