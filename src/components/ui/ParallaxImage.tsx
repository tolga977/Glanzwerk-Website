"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
}

interface ParallaxImageProps {
  photo: Photo;
  aspect?: string;
  sizes?: string;
  rounded?: string;
  className?: string;
  objectPosition?: string;
}

/**
 * Bild in einem maskierten Container mit dezentem Scroll-Tiefeneffekt
 * (kleines Translate-Y-Fenster, kein `background-attachment: fixed`).
 * Deaktiviert unterhalb von 1024px und bei `prefers-reduced-motion`.
 */
export default function ParallaxImage({
  photo,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 560px, 100vw",
  rounded = "rounded-3xl",
  className = "",
  objectPosition,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || window.innerWidth < 1024) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        setOffset((progress - 0.5) * 24);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`brand-photo-overlay relative overflow-hidden ${rounded} ${aspect} ${className}`}
    >
      <div
        className="absolute -inset-4 will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    </div>
  );
}
