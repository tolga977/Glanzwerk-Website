"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, useful for grids of cards. */
  delay?: number;
  /**
   * Element type to render.
   *  "ul" — when the children are <li> items.
   *  "li" — when this wrapper is itself an item inside a <ul>/<ol>. Ohne
   *         diese Variante landete ein <div> als direktes Kind einer Liste;
   *         das ist ungültiges Markup und nimmt Screenreadern die
   *         Listenansage ("Liste mit 4 Einträgen").
   */
  as?: "div" | "ul" | "li";
}

/**
 * Lightweight scroll-reveal wrapper (native IntersectionObserver, no
 * animation library). Respects prefers-reduced-motion via the global CSS
 * rule that collapses all transition/animation durations.
 */
export default function FadeIn({ children, className = "", delay = 0, as = "div" }: FadeInProps) {
  const ref = useRef<HTMLDivElement & HTMLUListElement & HTMLLIElement>(null);
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

  if (as === "li") {
    return (
      <li ref={ref} className={combinedClassName} style={style}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref} className={combinedClassName} style={style}>
      {children}
    </div>
  );
}
