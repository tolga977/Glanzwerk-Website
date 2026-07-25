import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  /** Rendered height in pixels (width follows automatically from the logo's fixed aspect ratio). */
  height?: number;
  onClick?: () => void;
}

// Intrinsic size of the original logo file — used so Next.js can reserve
// the correct aspect ratio and avoid layout shift while the image loads.
const INTRINSIC_WIDTH = 3830;
const INTRINSIC_HEIGHT = 1948;

export default function Logo({ className = "", variant = "dark", height = 48, onClick }: LogoProps) {
  const isLight = variant === "light";
  const src = isLight ? "/brand/glanzwerk-logo-dark-bg.png" : "/brand/glanzwerk-logo.png";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 ${className}`}
      aria-label="Glanzwerk Reinigungsservice Berlin – Startseite"
    >
      <Image
        src={src}
        alt="Glanzwerk Reinigungsservice Berlin"
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
