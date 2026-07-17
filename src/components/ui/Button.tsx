import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "shine-sweep shine-sweep-auto bg-brand-500 text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline-brand-500",
  secondary:
    "shine-sweep shine-sweep-auto bg-brand-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-lg hover:shadow-brand-900/25 focus-visible:outline-brand-900",
  outline:
    "border-2 border-brand-900 text-brand-900 hover:-translate-y-0.5 hover:bg-brand-900 hover:text-white focus-visible:outline-brand-900",
  ghost:
    "text-brand-900 hover:bg-brand-50 focus-visible:outline-brand-900",
};

const sizeClasses: Record<Size, string> = {
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-12 px-7 py-3.5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap";

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
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
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
