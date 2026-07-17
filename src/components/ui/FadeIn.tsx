"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, useful for grids of cards. */
  delay?: number;
  /** Element type to render — use "ul" when children are <li> items. */
  as?: "div" | "ul";
}

/**
 * Lightweight scroll-reveal wrapper (native IntersectionObserver, no
 * animation library). Respects prefers-reduced-motion via the global CSS
 * rule that collapses all transition/animation durations.
 */
export default function FadeIn({ children, className = "", delay = 0, as = "div" }: FadeInProps) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const combinedClassName = `fade-in-up ${visible ? "is-visible" : ""} ${className}`;
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  if (as === "ul") {
    return (
      <ul ref={ref} className={combinedClassName} style={style}>
        {children}
      </ul>
    );
  }

  return (
    <div ref={ref} className={combinedClassName} style={style}>
      {children}
    </div>
  );
}
