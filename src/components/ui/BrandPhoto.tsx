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
  /** CSS object-position, individually tuned per photo so key subjects (hands, faces, equipment) aren't cropped. */
  objectPosition?: string;
}

/** Shared photo treatment: brand-tinted overlay + consistent rounding/shadow. */
export default function BrandPhoto({
  photo,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 560px, 100vw",
  priority = false,
  rounded = "rounded-panel",
  className = "",
  children,
  overlay = true,
  objectPosition,
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
        style={objectPosition ? { objectPosition } : undefined}
      />
      {children && <div className="relative z-[2] h-full w-full">{children}</div>}
    </div>
  );
}
