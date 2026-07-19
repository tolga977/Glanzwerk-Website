"use client";

import Link from "next/link";
import { useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type MouseEvent, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "shine-sweep shine-sweep-auto bg-brand-500 text-white shadow-sm hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline-brand-500",
  secondary:
    "shine-sweep shine-sweep-auto bg-brand-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-lg hover:shadow-brand-900/25 focus-visible:outline-brand-900",
  outline:
    "border-2 border-brand-900 text-brand-900 hover:-translate-y-0.5 hover:bg-brand-900 hover:text-white focus-visible:outline-brand-900",
  ghost:
    "border border-brand-200 text-brand-500 hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-brand-900",
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

/** Primary buttons pull gently toward the cursor (~6px max); other variants stay static. */
function useMagnetic() {
  const ref = useRef<HTMLElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.3 - 2;
    setStyle({ transform: `translate(${x}px, ${y}px)` });
  }

  function onMouseLeave() {
    setStyle({ transform: "translate(0, 0)" });
  }

  return { ref, style, onMouseMove, onMouseLeave };
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const magnetic = useMagnetic();
  // Cast: same ref reused across the <a>/Link/<button> branches below.
  const magneticProps =
    variant === "primary"
      ? {
          ref: magnetic.ref as never,
          style: magnetic.style,
          onMouseMove: magnetic.onMouseMove,
          onMouseLeave: magnetic.onMouseLeave,
        }
      : {};

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...magneticProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...magneticProps}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  void _href;
  return (
    <button className={classes} {...buttonProps} {...magneticProps}>
      {children}
    </button>
  );
}
