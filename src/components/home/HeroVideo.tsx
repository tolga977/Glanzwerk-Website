"use client";

import { useEffect, useState } from "react";

interface HeroVideoProps {
  mp4: string;
  webm?: string;
}

/**
 * Videoebene des Heros — bewusst die einzige Client-Komponente im Hero.
 *
 * Warum überhaupt Client-seitig: Ein Hintergrundvideo darf auf Telefonen
 * nicht geladen werden. Rein über CSS (`hidden sm:block`) wäre es zwar
 * unsichtbar, der Browser lädt es aber trotzdem — bei einem Autoplay-Video
 * überstimmt `autoplay` sogar `preload="none"`. Nur eine Prüfung vor dem
 * Einhängen verhindert den Download zuverlässig.
 *
 * Zwei Bedingungen müssen erfüllt sein, sonst wird gar kein <video> erzeugt:
 *   1. Fenster ab 640 px — darunter trägt das Standbild allein.
 *   2. Kein `prefers-reduced-motion` — Bewegung wird dann nicht ersetzt,
 *      sondern weggelassen.
 *
 * Das Standbild darunter bleibt in der Server-Komponente und ist damit
 * weiterhin LCP-Element. Diese Ebene ist rein additiv: fällt sie aus,
 * bleibt der Hero vollständig.
 *
 * Kein `poster`-Attribut: ein <video> ohne dargestelltes Bild rendert
 * transparent, sodass das optimierte Standbild darunter sichtbar bleibt.
 * Ein poster-Attribut würde dieses Bild doppeln und unoptimiert laden.
 */
export default function HeroVideo({ mp4, webm }: HeroVideoProps) {
  const [zeigen, setZeigen] = useState(false);

  useEffect(() => {
    const grossGenug = window.matchMedia("(min-width: 640px)");
    const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pruefen = () => setZeigen(grossGenug.matches && !wenigerBewegung.matches);
    pruefen();

    grossGenug.addEventListener("change", pruefen);
    wenigerBewegung.addEventListener("change", pruefen);
    return () => {
      grossGenug.removeEventListener("change", pruefen);
      wenigerBewegung.removeEventListener("change", pruefen);
    };
  }, []);

  if (!zeigen) return null;

  return (
    <video
      /*
        hero-focal setzt denselben Bildausschnitt wie beim Standbild
        darunter — sonst springt das Motiv in dem Moment, in dem das Video
        einsetzt.

        preload von "auto" auf "metadata": die vorliegende Datei ist 145 MB
        groß. Mit "auto" beginnt der Browser sofort, sie vollständig zu
        laden, was auf jeder Verbindung unterhalb von Glasfaser den
        Seitenaufbau ausbremst — im lokalen Test blockierte es den
        Renderer minutenlang. Mit "metadata" holt er zunächst nur den
        Kopfteil und streamt dann; das Standbild darunter trägt die Fläche
        in der Zwischenzeit, sichtbar ist der Unterschied nicht.

        Kein poster-Attribut: das optimierte Standbild liegt bereits
        darunter. Ein poster würde dasselbe Motiv ein zweites Mal und
        unoptimiert laden. Ein schwarzer Startframe kann dadurch nicht
        entstehen — das <video> ist vor dem ersten Frame transparent.
      */
      className="hero-video hero-focal absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
