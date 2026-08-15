"use client";

import { useEffect, useRef } from "react";

/**
 * Gemeinsame Mechanik der beiden Bewegtbild-Motive der Startseite.
 *
 * ── Warum ein gemeinsames Bauteil ───────────────────────────────────────
 * Der Organismus und der Preisrechner sehen nichts gleich, verhalten sich
 * aber gleich: beide laden erst in Sichtweite, beide laufen nur im Blick,
 * beide zeigen bei reduzierter Bewegung ein Standbild statt gar nichts.
 * Diese Mechanik zweimal zu schreiben hieße, sie zweimal zu pflegen.
 *
 * ── Was hier NICHT passiert ─────────────────────────────────────────────
 * Keine Steuerelemente, kein Ton, kein Vollbild. Beide Motive sind
 * Gestaltung, nicht Medien — ein Abspielknopf würde eine Bedienung
 * versprechen, die es nicht gibt.
 *
 * ── Laden ───────────────────────────────────────────────────────────────
 * `src` steht bewusst nicht im Markup. Die beiden Dateien wiegen zusammen
 * knapp elf Megabyte; als Teil des ersten Seitenaufbaus wären sie ein
 * Fehler. Das `poster` steht dagegen sofort — die Fläche ist damit von der
 * ersten Sekunde an vollständig, sie bewegt sich nur noch nicht. Es gibt
 * deshalb auch keinen Moment, in dem hier ein Loch im Layout stünde.
 *
 * ── Reduzierte Bewegung ─────────────────────────────────────────────────
 * Dann wird `src` nie gesetzt. Was stehen bleibt, ist das Standbild, und
 * beide sind mit Absicht so gewählt, dass sie die Aussage allein tragen:
 * der vollständige Organismus, und der Rechner mit dem Ergebnis im Display.
 */

type Props = {
  quelle: string;
  standbild: string;
  className?: string;
  /**
   * "einmal"  — läuft einmal ab und bleibt auf dem letzten Bild stehen.
   *   Für den Preisrechner: das letzte Bild ist das Ergebnis, und ein Sprung
   *   zurück auf das leere Display würde die Rechnung entwerten.
   *
   * "schleife" — läuft bis `bisSekunde`, hält kurz inne und blendet weich
   *   zum Anfang zurück. Für den Organismus: er löst sich vollständig auf,
   *   und ein harter Schnitt vom leeren Bild zurück auf das ganze Tier wäre
   *   der einzige sichtbare Ruck der Sequenz.
   */
  ablauf: "einmal" | "schleife";
  /** Nur bei "schleife": ab wann das Bild leer ist und die Pause beginnt. */
  bisSekunde?: number;
};

/** Vorlauf, mit dem die Datei angefordert wird, bevor die Fläche im Blick ist. */
const LADEVORLAUF = "700px";
/** Anteil der Fläche, der sichtbar sein muss, damit abgespielt wird. */
const SPIELSCHWELLE = 0.2;
/**
 * Ruhe am Ende der Schleife, bevor der Organismus wieder erscheint.
 *
 * Gemessen am Motiv: bei 6,4 s stehen noch 8,2 % dunkle Bildpunkte im Bild
 * (kleinste Helligkeit 132) — dort hing die Schleife sichtbar und sprang
 * zurueck, waehrend die Partikelwolke noch zu sehen war. Erst ab 7,0 s ist
 * kein Bildpunkt mehr unter 205, ab 7,2 s aendert sich gar nichts mehr.
 * Der Schnitt liegt deshalb bei 7,15 s, und die Pause ist von einer Sekunde
 * auf gut eine halbe gekuerzt: die Aufloesung laeuft jetzt zu Ende, und der
 * Wiedereinstieg kommt, bevor die leere Flaeche als Stillstand liest.
 */
const RUHE_MS = 550;

export default function MotionAsset({
  quelle,
  standbild,
  className = "",
  ablauf,
  bisSekunde,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const sanft = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (sanft.matches) return;

    let geladen = false;
    let sichtbar = false;
    let zeitgeber = 0;

    const ioLaden = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting) && !geladen) {
          geladen = true;
          v.src = quelle;
          ioLaden.disconnect();
        }
      },
      { rootMargin: `${LADEVORLAUF} 0px` },
    );
    ioLaden.observe(v);

    /*
     * Der weiche Wiedereinstieg. Zum Zeitpunkt `bisSekunde` ist das Bild
     * ohnehin leer — das Ausblenden ist dort unsichtbar. Sichtbar ist nur
     * das Einblenden danach, und genau das soll man sehen: der Organismus
     * kommt zurück, er springt nicht zurück.
     */
    function ruecksprung() {
      if (!v) return;
      v.pause();
      zeitgeber = window.setTimeout(() => {
        v.currentTime = 0;
        v.dataset.ein = "nein";
        /*
         * Zwei Bilder Abstand, nicht eines.
         *
         * Wird das Attribut im selben Bild wieder auf "ja" gesetzt, hat der
         * Browser den Zustand mit Deckkraft null nie berechnet — der
         * Übergang startet dann gar nicht, und der Organismus springt hart
         * ins Bild. Das erzwungene Auslesen der Breite rechnet den Stil
         * sofort durch, das zweite Bild gibt ihm Zeit, ihn auch zu zeigen.
         */
        void v.offsetWidth;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!sichtbar) return;
            v.dataset.ein = "ja";
            void v.play().catch(() => {});
          });
        });
      }, RUHE_MS);
    }

    function beiZeit() {
      if (!v || ablauf !== "schleife" || bisSekunde === undefined) return;
      if (v.currentTime >= bisSekunde && !v.paused) ruecksprung();
    }
    v.addEventListener("timeupdate", beiZeit);

    const ioSpielen = new IntersectionObserver(
      (e) => {
        for (const x of e) {
          sichtbar = x.intersectionRatio >= SPIELSCHWELLE;
          if (!v.src) continue;
          if (sichtbar) {
            void v.play().catch(() => {});
          } else {
            v.pause();
            window.clearTimeout(zeitgeber);
            /*
             * Der Preisrechner wird beim Verlassen zurückgesetzt. Er läuft
             * nur einmal; ohne das Zurücksetzen sähe jeder, der später noch
             * einmal vorbeikommt, nur das Ergebnis und nie die Rechnung.
             */
            if (ablauf === "einmal" && v.ended) v.currentTime = 0;
          }
        }
      },
      { threshold: [0, SPIELSCHWELLE] },
    );
    ioSpielen.observe(v);

    return () => {
      ioLaden.disconnect();
      ioSpielen.disconnect();
      v.removeEventListener("timeupdate", beiZeit);
      window.clearTimeout(zeitgeber);
    };
  }, [quelle, ablauf, bisSekunde]);

  return (
    <video
      ref={ref}
      className={className}
      poster={standbild}
      preload="none"
      muted
      playsInline
      autoPlay
      loop={false}
      controls={false}
      disablePictureInPicture
      tabIndex={-1}
      aria-hidden="true"
      data-ein="ja"
    />
  );
}
