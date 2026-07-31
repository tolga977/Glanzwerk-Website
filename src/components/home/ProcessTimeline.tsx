"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export interface TimelineStep {
  title: string;
  description: string;
  /** Zwei bis drei nachprüfbare Einzelheiten zu diesem Schritt. */
  facts: string[];
  photo: { src: string; alt: string };
  /** Handlungsweg an genau einem Schritt — üblicherweise dem ersten. */
  cta?: { label: string; href: string };
}

/**
 * Der Ablauf als senkrechte Zeitachse mit mitlaufender Fortschrittslinie.
 *
 * ── Was hier passiert ───────────────────────────────────────────────────
 * Links steht eine durchgehende Schiene. Während der Abschnitt durch die
 * Bildschirmmitte wandert, füllt sich darauf eine zweite, helle Linie von
 * oben nach unten, und die Punkte der bereits erreichten Schritte werden
 * kräftiger. Der Fortschritt ist dabei nicht animiert im Sinne von
 * "läuft ab", sondern direkt an die Scrollposition gekoppelt: scrollt man
 * zurück, läuft er zurück.
 *
 * ── Warum ohne Bibliothek ───────────────────────────────────────────────
 * Dieselbe Wirkung erreicht man üblicherweise mit GSAP ScrollTrigger. Das
 * sind rund 70 kB zusätzliches JavaScript für einen einzigen Abschnitt —
 * hier genügen ein Scroll-Listener und eine CSS-Variable.
 *
 * Zwei Abweichungen von der üblichen Umsetzung, beide bewusst:
 *  1. Die Linie wächst über `transform: scaleY()`, nicht über `height`.
 *     Höhe zu animieren löst in jedem Frame Layout und Paint aus; eine
 *     Transformation läuft auf dem Compositor.
 *  2. Alle Messungen liegen in einem requestAnimationFrame-Durchlauf, alle
 *     Schreibvorgänge danach. Damit entsteht kein Layout-Thrashing.
 *
 * ── Barrierefreiheit ────────────────────────────────────────────────────
 * Bei `prefers-reduced-motion: reduce` wird kein Listener registriert: die
 * Linie steht sofort vollständig, alle Punkte sind aktiv. Ohne JavaScript
 * gilt derselbe Zustand, weil er im Markup als Ausgangswert steht — der
 * Abschnitt ist dann statisch, aber vollständig.
 *
 * Die Schiene selbst ist rein dekorativ und für Screenreader ausgeblendet;
 * die Reihenfolge trägt die geordnete Liste.
 */
export default function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  const railRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const node = railRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stepNodes = Array.from(node.querySelectorAll<HTMLElement>("[data-step]"));
    let frame = 0;

    const update = () => {
      frame = 0;

      // Lesen
      const rect = node.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const progress = Math.min(1, Math.max(0, (mid - rect.top) / Math.max(rect.height, 1)));
      const reached = stepNodes.map((step) => {
        const r = step.getBoundingClientRect();
        return r.top <= mid;
      });

      // Schreiben
      node.style.setProperty("--progress", String(progress));
      stepNodes.forEach((step, i) => {
        step.dataset.reached = reached[i] ? "true" : "false";
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol
      ref={railRef}
      /*
        --progress startet bei 1. Ohne JavaScript und unter Reduced Motion
        ist die Linie damit vollständig gefüllt statt unsichtbar — der
        Ausfall führt zu einem vollständigen, nicht zu einem leeren Bild.
      */
      style={{ "--progress": 1 } as React.CSSProperties}
      className="relative"
    >
      {/* Schiene: liegt auf 15 px mobil, auf der Spaltenmitte ab Desktop. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[0.9375rem] top-2 w-px bg-white/20 lg:left-[1.4375rem]"
      />
      {/* Fortschritt: wächst über scaleY von oben nach unten. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[0.9375rem] top-2 w-px origin-top bg-brand-300 lg:left-[1.4375rem]"
        style={{ transform: "scaleY(var(--progress))" }}
      />

      {steps.map((step, index) => (
        <li
          key={step.title}
          data-step
          data-reached="true"
          className="group relative pb-14 pl-11 last:pb-0 lg:pb-20 lg:pl-20"
        >
          {/*
            Markierung auf der Schiene. Der Ring bleibt immer sichtbar, nur
            die Füllung wechselt — ein Punkt, der erst beim Erreichen
            erscheint, würde die Schiene beim Scrollen unruhig machen.
          */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-brand-900/70 backdrop-blur-sm transition-colors duration-300 ease-out group-data-[reached=true]:border-brand-300/70 lg:h-12 lg:w-12"
          >
            <span className="h-2 w-2 rounded-full bg-white/30 transition-colors duration-300 ease-out group-data-[reached=true]:bg-brand-300 lg:h-2.5 lg:w-2.5" />
          </span>

          {/*
            Bild links, Text rechts — nicht abwechselnd. Der Zickzack ist
            das Erkennungszeichen jeder Standard-Zeitachse; eine gleich
            bleibende Leserichtung ist ruhiger und liest sich schneller.
          */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start lg:gap-10">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-deep">
              <Image
                src={step.photo.src}
                alt={step.photo.alt}
                fill
                sizes="(min-width: 1024px) 18rem, 100vw"
                className="object-cover"
              />
              {/* Gleiche Tonebene wie auf der Fläche, damit die Bilder zur Section gehören. */}
              <div aria-hidden="true" className="absolute inset-0 bg-brand-900/25" />
            </div>

            <div className="lg:pt-1">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-2xl font-medium leading-none tracking-tight text-white/55 sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
              </div>

              <p className="measure mt-4 text-sm leading-relaxed text-brand-100">
                {step.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {step.facts.map((fact) => (
                  <li key={fact} className="flex gap-2.5 text-sm leading-relaxed text-white">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-brand-300"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {fact}
                  </li>
                ))}
              </ul>

              {step.cta && (
                <div className="mt-7">
                  <Button href={step.cta.href} variant="onMedia" size="md">
                    {step.cta.label}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
