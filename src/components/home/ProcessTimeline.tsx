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
 * Ab `lg` kommt eine zweite, mit demselben Mechanismus gekoppelte Ebene
 * dazu: rechts steht eine einzelne, am oberen Rand angeheftete Bildfläche
 * ("Bühne"), auf der die vier vorhandenen Schrittfotos ineinander
 * überblenden — welches Foto sichtbar ist, richtet sich nach demselben
 * "erreicht"-Zustand, der auch die Schiene und die Nummern-Punkte steuert.
 * Kein zweiter Mechanismus, nur eine zweite Wirkung desselben Zustands.
 *
 * ── Warum ohne Bibliothek ───────────────────────────────────────────────
 * Dieselbe Wirkung erreicht man üblicherweise mit GSAP ScrollTrigger. Das
 * sind rund 70 kB zusätzliches JavaScript für einen einzigen Abschnitt —
 * hier genügen ein Scroll-Listener und eine CSS-Variable.
 *
 * Zwei Abweichungen von der üblichen Umsetzung, beide bewusst:
 *  1. Die Linie wächst über `transform: scaleY()`, nicht über `height`.
 *     Höhe zu animieren löst in jedem Frame Layout und Paint aus; eine
 *     Transformation läuft auf dem Compositor. Die Bildüberblendung läuft
 *     aus demselben Grund über `opacity`, nicht über `display`/`visibility`.
 *  2. Alle Messungen liegen in einem requestAnimationFrame-Durchlauf, alle
 *     Schreibvorgänge danach. Damit entsteht kein Layout-Thrashing.
 *
 * ── Warum die Bühne von selbst löst, ohne eigene Pin-Logik ─────────────
 * Die Bildfläche liegt in einer eigenen Spalte, die im Raster auf die
 * Höhe der Schritt-Spalte gestreckt ist (Grid-Vorgabe `stretch`, deshalb
 * kein `items-start` am Raster). `position: sticky` bleibt von sich aus
 * innerhalb der Box seines eigenen Elternelements — sobald die gestreckte
 * Spalte zu Ende ist, läst die Bühne automatisch mit dem übrigen Inhalt
 * weiter, ganz ohne JavaScript dafür. Das ist derselbe Effekt, für den
 * andere Umsetzungen eine eigene "sticky nur innerhalb des Elternelements"-
 * Option brauchen — hier ergibt er sich allein aus der Rasterhöhe.
 *
 * ── Barrierefreiheit ────────────────────────────────────────────────────
 * Bei `prefers-reduced-motion: reduce` wird kein Listener registriert: die
 * Linie steht sofort vollständig, alle Punkte sind aktiv, und die Bühne
 * zeigt unverändert das erste Foto. Ohne JavaScript gilt derselbe Zustand,
 * weil er im Markup als Ausgangswert steht — der Abschnitt ist dann
 * statisch, aber vollständig.
 *
 * Die Schiene selbst ist rein dekorativ und für Screenreader ausgeblendet;
 * die Reihenfolge trägt die geordnete Liste. Die Bühne ab `lg` ist
 * ebenfalls rein dekorativ (`aria-hidden`, leere Alt-Texte): die
 * eigentliche Bildbeschreibung tragen die Fotos in der mobilen/Tablet-
 * Ansicht, die dort — anders als die Bühne — mit echtem Alt-Text stehen.
 */
export default function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  const railRef = useRef<HTMLOListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = railRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stepNodes = Array.from(node.querySelectorAll<HTMLElement>("[data-step]"));
    const stageImageNodes = Array.from(
      stageRef.current?.querySelectorAll<HTMLElement>("[data-stage-image]") ?? [],
    );
    const stageDotNodes = Array.from(
      stageRef.current?.parentElement?.querySelectorAll<HTMLElement>("[data-stage-dot]") ?? [],
    );
    let frame = 0;

    const update = () => {
      frame = 0;

      // Lesen
      const rect = node.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      /* Die Schiene endet am letzten Schritt, nicht am Auslauf darunter (ab `lg` hält
         der Bodenabstand die Bühne nach dem vierten Schritt noch im Bild). */
      const lastStep = stepNodes[stepNodes.length - 1];
      const railEnd = lastStep ? lastStep.getBoundingClientRect().bottom : rect.bottom;
      const progress = Math.min(1, Math.max(0, (mid - rect.top) / Math.max(railEnd - rect.top, 1)));
      const reached = stepNodes.map((step) => {
        const r = step.getBoundingClientRect();
        return r.top <= mid;
      });
      /* Der zuletzt erreichte Schritt ist der aktive — vor dem ersten
         Schritt (kein Eintrag erreicht) bleibt das erste Foto sichtbar,
         dieselbe Fallback-Regel wie bei `--progress`. */
      const active = Math.max(0, reached.lastIndexOf(true));

      // Schreiben
      node.style.setProperty("--progress", String(progress));
      stepNodes.forEach((step, i) => {
        step.dataset.reached = reached[i] ? "true" : "false";
        step.dataset.dim = i === active ? "false" : "true";
      });
      stageImageNodes.forEach((img, i) => {
        img.style.opacity = i === active ? "1" : "0";
        img.dataset.active = i === active ? "true" : "false";
      });
      stageDotNodes.forEach((dot, i) => {
        dot.dataset.active = i === active ? "true" : "false";
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
    /*
      Ab `lg` zwei Spalten: links die Schritte, rechts die Bühne. Bewusst
      ohne `items-start` — der Vorgabewert `stretch` streckt die rechte
      Spalte auf die Höhe der linken, und genau diese Streckung ist es, die
      die Bühne unten "loslässt" (Begründung im Kommentar oberhalb der
      Komponente).
    */
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_27rem] xl:gap-20">
      <ol
        ref={railRef}
        /*
          --progress startet bei 1. Ohne JavaScript und unter Reduced Motion
          ist die Linie damit vollständig gefüllt statt unsichtbar — der
          Ausfall führt zu einem vollständigen, nicht zu einem leeren Bild.
        */
        style={{ "--progress": 1 } as React.CSSProperties}
        className="relative lg:pb-[50vh]"
      >
        {/* Schiene: liegt auf 15 px mobil, auf der Spaltenmitte ab Desktop. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[0.9375rem] top-2 w-px bg-white/20 lg:bottom-[50vh] lg:left-[1.4375rem]"
        />
        {/* Fortschritt: wächst über scaleY von oben nach unten. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[0.9375rem] top-2 w-px origin-top bg-brand-300 lg:bottom-[50vh] lg:left-[1.4375rem]"
          style={{ transform: "scaleY(var(--progress))" }}
        />

        {steps.map((step, index) => (
          <li
            key={step.title}
            data-step
            data-reached="true"
            className="group relative pb-14 pl-11 last:pb-0 lg:pb-28 lg:pl-20 lg:last:pb-0"
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

              Das Foto steht hier nur noch unterhalb `lg`: ab Desktop
              übernimmt die gemeinsame Bühne rechts dieselben vier Fotos in
              Groß — ein zweites, kleines Foto daneben wäre dort eine
              Wiederholung.
            */}
            <div className="grid gap-6 lg:block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-deep ring-1 ring-white/25 lg:hidden">
                <Image
                  src={step.photo.src}
                  alt={step.photo.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                {/* Gleiche Tonebene wie auf der Fläche, damit die Bilder zur Section gehören. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-brand-900/5 to-brand-700/15"
                />
              </div>

              <div className="transition-opacity duration-500 ease-out motion-reduce:transition-none lg:group-data-[dim=true]:opacity-40">
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

      {/*
        ── Die Bühne ────────────────────────────────────────────────────
        Nur ab `lg` im DOM sichtbar (`hidden lg:block`) — darunter tragen
        die Schritte ihr eigenes Foto (siehe oben), für eine angeheftete
        Fläche fehlt auf einer einspaltigen Breite ohnehin der Sinn.

        Die äußere Spalte bleibt (per `stretch`, s. o.) auf die Höhe der
        Schritt-Liste gestreckt — das ist der Bewegungsraum. Die
        angeheftete Fläche selbst bleibt darin ihrer eigenen Höhe treu
        (`aspect-[4/3]`, kein Streckungsverhalten nötig: sie ist ein reiner
        Block-Nachfahre der gestreckten Spalte, kein eigenes Rasterelement).

        Deckung/Radius/Schatten unverändert von der bisherigen
        Schritt-Fotokarte übernommen — dieselbe Bildsprache, nur einmal
        statt viermal auf der Seite.
      */}
      <div className="relative hidden lg:block">
        <div className="sticky top-[max(calc(var(--header-height)+1.5rem),calc(50vh-11rem))]">
          {/* Versetzter Rahmen hinter dem Foto: gibt der Fläche Tiefe, statt das Bild wie aufgeklebt wirken zu lassen. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-card border border-white/20 bg-white/[0.05]"
          />
          <div
            ref={stageRef}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-deep ring-1 ring-white/25"
          >
            {steps.map((step, index) => (
              <div
                key={step.title}
                data-stage-image
                data-active={index === 0 ? "true" : "false"}
                aria-hidden="true"
                className="group absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-out motion-reduce:transition-none first:opacity-100"
              >
                <Image
                  src={step.photo.src}
                  alt=""
                  fill
                  sizes="27rem"
                  className="scale-[1.06] object-cover transition-transform duration-[1600ms] ease-out group-data-[active=true]:scale-100 motion-reduce:scale-100 motion-reduce:transition-none"
                />
                {/* Verlauf zum Bildfuß: bindet das Foto in die Blaufläche ein und trägt die Bildunterschrift. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-900/5 to-brand-700/10"
                />
                <p className="absolute bottom-4 left-4 flex items-center gap-3 rounded-control bg-brand-950/55 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md">
                  <span className="font-display text-white/60">{String(index + 1).padStart(2, "0")}</span>
                  {step.title}
                </p>
              </div>
            ))}
            {/* Einheitliche Blautönung über allen vier Fotos, unabhängig davon, welches gerade sichtbar ist. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-brand-700/15 mix-blend-multiply"
            />
          </div>
          <div aria-hidden="true" className="relative mt-10 flex gap-2">
            {steps.map((step, index) => (
              <span
                key={step.title}
                data-stage-dot
                data-active={index === 0 ? "true" : "false"}
                className="h-1 w-10 rounded-full bg-white/25 transition-colors duration-500 ease-out data-[active=true]:bg-brand-300 motion-reduce:transition-none"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
