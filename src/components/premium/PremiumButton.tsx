import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "shine-sweep shine-sweep-auto bg-brand-500 text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25",
  outline:
    "border-2 border-brand-900 text-brand-900 hover:-translate-y-0.5 hover:bg-brand-900 hover:text-white hover:shadow-lg hover:shadow-brand-900/10",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all duration-300 ease-out";

/**
 * Premium-Designstudie: vereinheitlicht die hand-inlinten Hero-/CTA-Buttons
 * auf Über-uns/Umwelt/Unterhaltsreinigung/Glas-Fenster (Homepage nutzt bereits
 * die geteilte Button.tsx und bleibt unberührt). Behält den bestehenden
 * Shine-Sweep-Signature-Move bei; Hover-Timing 300ms liegt innerhalb der
 * geforderten 250–350ms, keine Bounce-Effekte.
 */
export default function PremiumButton({
  href,
  variant = "primary",
  className = "",
  onClick,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // tel:/mailto: aren't app routes — render a plain <a> to avoid Next.js
  // Link's prefetch behaviour, matching the existing Button.tsx convention.
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
