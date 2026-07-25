import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

/*
 * Zustandsmatrix (design-system/references/states-and-variants.md):
 *
 * Variante   | Ruhe                | Hover               | Active        | Focus-visible
 * -----------|---------------------|---------------------|---------------|---------------
 * primary    | brand-500 / weiß    | brand-600 + Hebung  | scale(0.97)   | Outline brand-900
 * secondary  | brand-900 / weiß    | brand-800 + Hebung  | scale(0.97)   | Outline brand-900
 * outline    | Rahmen brand-900    | Fläche brand-900    | scale(0.97)   | Outline brand-900
 * ghost      | Rahmen brand-200    | Rahmen/Fläche brand | scale(0.97)   | Outline brand-900
 *
 * Hebung und Glanzstreifen laufen ausschließlich über die Utilities .lift
 * und .shine-sweep, die beide auf Zeigergeräte beschränkt und unter
 * prefers-reduced-motion deaktiviert sind. Kein magnetischer Cursor-Effekt:
 * er koppelt die Schaltfläche vom Zeiger entkoppelt an die Mausposition und
 * wirkt auf einer seriösen Dienstleisterseite wie eine Spielerei.
 */
const variantClasses: Record<Variant, string> = {
  primary:
    "shine-sweep bg-brand-500 text-white shadow-raise hover:bg-brand-600 hover:shadow-float focus-visible:outline-brand-900",
  secondary:
    "shine-sweep bg-brand-900 text-white shadow-raise hover:bg-brand-800 hover:shadow-float focus-visible:outline-brand-900",
  outline:
    "border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white focus-visible:outline-brand-900",
  ghost:
    "border border-brand-200 bg-white text-brand-500 hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-brand-900",
};

const sizeClasses: Record<Size, string> = {
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-12 px-7 py-3.5 text-base",
};

/* rounded-control statt rounded-full: die Radiusfamilie unterscheidet
   Controls (klein) von Karten (mittel) und Bildflächen (groß), statt überall
   dieselbe maximale Rundung zu verwenden. */
const baseClasses =
  "lift press inline-flex items-center justify-center gap-2 rounded-control font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  external?: boolean;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  void _href;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
