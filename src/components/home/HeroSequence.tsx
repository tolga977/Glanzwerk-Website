"use client";

import { useEffect, useRef, useState } from "react";
import { heroSequence, HERO_CROSSFADE_MS } from "@/data/heroSequence";

/**
 * Die filmische Ebene der Hero-Bühne — eine Folge ruhiger Einstellungen,
 * die sich überblenden.
 *
 * ── Warum Client-Komponente ─────────────────────────────────────────────
 * Aus demselben Grund wie bisher bei `HeroVideo`: ein Hintergrundvideo darf
 * auf Telefonen nicht geladen werden, und rein über CSS lässt sich das nicht
 * verhindern — bei einem Autoplay-Video überstimmt `autoplay` sogar
 * `preload="none"`. Nur eine Prüfung vor dem Einhängen verhindert den
 * Download zuverlässig.
 *
 * Zwei Bedingungen, sonst wird kein einziges <video> erzeugt:
 *   1. Fenster ab 640 px — darunter trägt das Standbild allein.
 *   2. Kein `prefers-reduced-motion` — Bewegung wird dann nicht ersetzt,
 *      sondern weggelassen.
 *
 * Das Standbild darunter liegt in der Server-Komponente und bleibt
 * LCP-Element. Diese Ebene ist rein additiv: fällt sie aus, bleibt der Hero
 * vollständig.
 *
 * ── Wie die Überblendung aufgebaut ist ──────────────────────────────────
 * Eine Auflösung, kein Slider. Kein Punkt, kein Pfeil, keine Player-UI.
 *
 * Der Trick liegt in der Stapelung, nicht in der Kurve: die einfahrende
 * Einstellung wird ÜBER der noch vollständig deckenden vorherigen von 0 auf
 * 1 aufgeblendet. Damit ist zu jedem Zeitpunkt genau eine deckende Fläche
 * unter einer teiltransparenten — das Ergebnis ist eine echte Auflösung
 * ohne den Helligkeitseinbruch, den zwei gegenläufige Blenden erzeugen.
 *
 * Erst wenn die Blende durch ist, wird die alte Einstellung auf 0 gesetzt
 * und angehalten. Zu diesem Zeitpunkt ist sie ohnehin vollständig verdeckt,
 * der Sprung ist unsichtbar — und ab dann dekodiert wieder nur ein Video.
 *
 * ── Interruptibility ───────────────────────────────────────────────────
 * Bewusst CSS-Transitions statt Keyframes: eine Transition lässt sich
 * mitten im Lauf umlenken, eine Keyframe-Animation beginnt von vorn. Sollte
 * ein Wechsel während einer laufenden Blende ausgelöst werden — etwa weil
 * der Tab zurückkommt —, blendet die Fläche von ihrem aktuellen Wert weiter
 * statt zu springen.
 *
 * ── Was hier absichtlich NICHT passiert ────────────────────────────────
 * Kein Ken-Burns-Zoom über dem laufenden Film. Eine zweite, konkurrierende
 * Bewegung über einer Vollbildfläche ist genau die langsame Dauerschleife,
 * die als unerwünscht dokumentiert ist — und über bewegtem Material ist sie
 * nicht Tiefe, sondern Unruhe.
 */
export default function HeroSequence() {
  /** Erst wahr, wenn Fenstergröße und Bewegungsvorliebe geprüft sind. */
  const [zeigen, setZeigen] = useState(false);
  /** Index der Einstellung, die gerade die Fläche trägt. */
  const [aktiv, setAktiv] = useState(0);
  /**
   * Die vorherige Einstellung bleibt deckend darunter stehen, bis die
   * Blende durch ist. `null`, sobald sie verdeckt und angehalten ist.
   */
  const [vorher, setVorher] = useState<number | null>(null);
  /**
   * Die Folgeclips werden erst nach dem Start der ersten Einstellung
   * angefordert. Sonst konkurrieren beim Seitenaufbau mehrere Streams um
   * dieselbe Leitung, und der erste Frame kommt später.
   */
  const [vorgeladen, setVorgeladen] = useState(false);

  const videos = useRef<(HTMLVideoElement | null)[]>([]);

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

  /*
    Die Wiedergabegeschwindigkeit muss nach dem Laden der Metadaten gesetzt
    werden: vorher gesetzt verwirft der Browser den Wert beim Anhängen der
    Quelle. Deshalb hier und nicht als Attribut.
  */
  useEffect(() => {
    if (!zeigen) return;
    videos.current.forEach((video, index) => {
      if (!video) return;
      const rate = heroSequence[index].playbackRate;
      const setzen = () => {
        video.playbackRate = rate;
      };
      setzen();
      video.addEventListener("loadedmetadata", setzen);
    });
  }, [zeigen]);

  /* Folgeclips nachladen, sobald die erste Einstellung sicher läuft. */
  useEffect(() => {
    if (!zeigen || heroSequence.length < 2) return;
    const timer = window.setTimeout(() => setVorgeladen(true), 2500);
    return () => window.clearTimeout(timer);
  }, [zeigen]);

  useEffect(() => {
    if (!vorgeladen) return;
    videos.current.slice(1).forEach((video) => video?.load());
  }, [vorgeladen]);

  /*
    Der Taktgeber. Ein Zeitgeber je Standzeit statt eines Abgleichs auf
    `timeupdate`: `timeupdate` feuert je nach Browser vier- bis fünfmal in
    der Sekunde und unregelmäßig — als Schnittmarke wäre das ungenau, und
    für eine Standzeit von Sekunden braucht es keine Frame-Genauigkeit.
  */
  useEffect(() => {
    if (!zeigen || heroSequence.length < 2) return;

    const halten = window.setTimeout(() => {
      const naechster = (aktiv + 1) % heroSequence.length;
      const kommend = videos.current[naechster];
      if (kommend) {
        kommend.currentTime = 0;
        kommend.playbackRate = heroSequence[naechster].playbackRate;
        void kommend.play().catch(() => {
          /* Autoplay kann verweigert werden — dann bleibt das Standbild. */
        });
      }
      setVorher(aktiv);
      setAktiv(naechster);
    }, heroSequence[aktiv].holdSeconds * 1000);

    return () => window.clearTimeout(halten);
  }, [aktiv, zeigen]);

  /*
    Nach der Blende: die verdeckte Einstellung anhalten und freigeben.
    Ohne dieses Aufräumen dekodiert der Browser dauerhaft alle Clips
    gleichzeitig — auf schwächeren Geräten der sichere Weg zu Bildaussetzern.
  */
  useEffect(() => {
    if (vorher === null) return;
    const aufraeumen = window.setTimeout(() => {
      videos.current[vorher]?.pause();
      setVorher(null);
    }, HERO_CROSSFADE_MS);
    return () => window.clearTimeout(aufraeumen);
  }, [vorher]);

  if (!zeigen) return null;

  return (
    <>
      {heroSequence.map((clip, index) => {
        const istAktiv = index === aktiv;
        const istVorher = index === vorher;
        return (
          <video
            key={clip.src}
            ref={(node) => {
              videos.current[index] = node;
            }}
            /*
              `hero-video` trägt die Regel, die unter prefers-reduced-motion
              jedes Hintergrundvideo ausblendet. Sie darf nicht
              überschreibbar sein und steht deshalb immer.

              Kein `poster`-Attribut: das optimierte Standbild liegt bereits
              darunter in der Server-Komponente. Ein poster würde dasselbe
              Motiv ein zweites Mal und unoptimiert laden. Ein schwarzer
              Startframe kann nicht entstehen — ein <video> ist vor dem
              ersten Frame transparent.
            */
            className={`hero-video ${clip.focalClassName} absolute inset-0 h-full w-full object-cover`}
            style={{
              opacity: istAktiv || istVorher ? 1 : 0,
              /* Die einfahrende Einstellung liegt oben, die ausfahrende darunter. */
              zIndex: istAktiv ? 2 : istVorher ? 1 : 0,
              transition: `opacity ${HERO_CROSSFADE_MS}ms linear`,
            }}
            autoPlay={index === 0}
            muted
            /*
              `loop` nur auf der letzten Einstellung — und nur, wenn es
              überhaupt eine Folge gibt. Bei einer einzelnen Einstellung
              muss sie sich selbst schließen, sonst steht der Hero nach
              einem Durchlauf still. Bei einer Folge übernimmt der Taktgeber
              den Wechsel; ein zusätzliches `loop` würde einen harten
              Schnitt in die Blende setzen.
            */
            loop={heroSequence.length === 1}
            playsInline
            /*
              Nur die erste Einstellung wird sofort angefordert. Die
              Folgeclips stehen auf "none" und werden nach 2,5 Sekunden per
              load() nachgeholt — bis dahin hat die erste die Leitung für
              sich.
            */
            preload={index === 0 ? "auto" : "none"}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
        );
      })}
    </>
  );
}
