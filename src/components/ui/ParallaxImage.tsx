"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  /** Kurzer, konkreter Bildtext – blendet als eigene Schicht über dem Foto ein, sobald es ins Blickfeld scrollt. Optional: nicht jedes Foto braucht einen. */
  caption?: string;
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
 *
 * Trägt `photo.caption` einen Text, blendet zusätzlich eine Bildunterschrift
 * über einem dunklen Verlauf ein – unabhängig vom Parallax-Effekt per eigenem
 * IntersectionObserver, damit sie auch auf Mobilgeräten erscheint.
 */
export default function ParallaxImage({
  photo,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 560px, 100vw",
  rounded = "rounded-panel",
  className = "",
  objectPosition,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(false);

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

  useEffect(() => {
    if (!photo.caption) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCaptionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [photo.caption]);

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
      {photo.caption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
          <p
            className="text-sm font-medium leading-snug text-white transition-all duration-700 ease-out motion-reduce:transition-none"
            style={{
              opacity: captionVisible ? 1 : 0,
              transform: captionVisible ? "translateY(0)" : "translateY(14px)",
            }}
          >
            {photo.caption}
          </p>
        </div>
      )}
    </div>
  );
}
