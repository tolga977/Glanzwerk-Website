import Image from "next/image";
import type { ReactNode } from "react";

interface Photo {
  src: string;
  alt: string;
}

interface BrandPhotoProps {
  photo: Photo;
  /** Tailwind aspect-ratio utility, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Tailwind rounding utility. */
  rounded?: string;
  className?: string;
  /** Absolutely-positioned overlay content (badge, caption) above the photo. */
  children?: ReactNode;
  /** Set false to show the photo at native color, e.g. for small thumbnails. */
  overlay?: boolean;
}

/**
 * Consistent premium treatment for stock photography: a soft brand-tinted
 * duotone wash unifies otherwise-unrelated stock photos into one coherent
 * visual system, plus a shared rounding/shadow language used everywhere a
 * photo appears (hero, service/district pages, Über uns).
 */
export default function BrandPhoto({
  photo,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 560px, 100vw",
  priority = false,
  rounded = "rounded-3xl",
  className = "",
  children,
  overlay = true,
}: BrandPhotoProps) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${aspect} ${overlay ? "brand-photo-overlay" : ""} ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {children && <div className="relative z-[2] h-full w-full">{children}</div>}
    </div>
  );
}
