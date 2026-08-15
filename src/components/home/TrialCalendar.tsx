"use client";

import { useEffect, useRef } from "react";

/**
 * Der Kalender der dreimonatigen Testphase.
 *
 * ── Was er erzählt ──────────────────────────────────────────────────────
 * 01 MONAT → 02 MONAT → 03 MONAT → VERTRAG, jedes Mal, indem das oberste
 * Blatt an der Ringbindung abreißt und wegfliegt. Danach wird unterschrieben.
 * Die Aussage des Abschnitts — drei Monate testen, erst danach ein Vertrag —
 * steht damit auch ohne den Text daneben.
 *
 * ── Warum vier Bilder nicht genügen ─────────────────────────────────────
 * Die vier freigegebenen Aufnahmen sind vier getrennte Renderings desselben
 * Motivs. Gemessen unterscheiden sie sich nicht nur in der Ziffer: der
 * Kalender steht um bis zu zwei Prozent anders im Bild, das Papier von „03"
 * ist merklich kühler, und der Hintergrund weicht über die ganze Fläche ab
 * (mittlere Abweichung 8 bis 16 von 255). Ein harter Wechsel zwischen ihnen
 * würde bei jedem Zustandswechsel den Hintergrund, das Licht und die
 * Perspektive springen lassen — genau das, was hier nicht passieren darf.
 *
 * Deshalb liefert EINE Aufnahme (Monat 02) alles Bleibende: Raum, Tisch,
 * Ringe, Kalenderkörper, Papierkorn, Kanten, Schatten, Punktraster. Aus den
 * anderen drei wurde ausschließlich die Druckfarbe des wechselnden Feldes
 * herausgelöst und auf dieselbe Papierfläche gelegt. Die Passung dafür kommt
 * aus dem Punktraster, das in allen vier Aufnahmen dieselbe Grafik ist: über
 * dessen fünfzehn Punkte wurde je eine Affine ausgeglichen (Restfehler 0,19
 * bis 0,27 px). Zwischen den Zuständen kann sich also nichts bewegen außer
 * der Schrift, weil nichts anderes aus einem zweiten Bild stammt.
 *
 * ── Warum unten ein fünftes Blatt liegt ─────────────────────────────────
 * Am Ende der Schleife müssen drei weggeflogene Blätter wieder da sein. Ein
 * Zurücksetzen ihrer Deckkraft wäre entweder ein sichtbarer Sprung oder eine
 * Überblendung, bei der sich VERTRAG in „01" auflöst — beides liest sich als
 * Fehler.
 *
 * Stattdessen liegt unter dem Stapel ein unbewegtes Blatt „01". Auch der
 * Vertrag reißt am Ende ab, ruhiger als die Monate, und darunter steht
 * bereits der Ausgangszustand. In dem Moment, in dem die Schleife von vorn
 * beginnt, zeigt der Bildschirm exakt dieselben Bildpunkte wie eine
 * Sechzigstelsekunde davor — der Reset ist nicht versteckt, er ist
 * gegenstandslos.
 *
 * ── Aufgabenteilung ─────────────────────────────────────────────────────
 * Die Bewegung liegt vollständig in CSS (`.trial-*` in globals.css) und
 * läuft damit außerhalb des Hauptthreads. Dieses Bauteil hat genau eine
 * Aufgabe: melden, ob die Fläche im Blick ist. Außerhalb wird die Schleife
 * angehalten, statt unsichtbar weiterzulaufen.
 */

/** Anteil der Fläche, der sichtbar sein muss, damit die Schleife läuft. */
const SICHTSCHWELLE = 0.25;

const BLATT = "/images/testphase/kalender-blatt";

/*
 * Die Unterschrift, gerechnet in der Ebene des Papiers.
 *
 * Die Kurve wurde nicht frei ins Bild gezeichnet, sondern in einem
 * Koordinatensystem entworfen, das aus dem Punktraster stammt: dessen
 * Zeilen- und Spaltenvektoren (49,7 / −1,2 und 7,3 / 42,4 Bildpunkte) sind
 * die Achsen des Blattes. Dadurch liegt die Schrift in derselben Flucht und
 * Neigung wie „VERTRAG" darüber, statt flach auf dem Bildschirm zu kleben.
 *
 * Sie stellt keinen Namen dar und ist keiner realen Person zuzuordnen.
 */
const SIGNATUR =
  "M148.7 476.6 C135.0 465.9 119.9 471.8 125.1 484.9 C130.7 500.3 148.5 509.8 162.7 507.2 " +
  "C175.6 504.7 178.8 498.0 173.5 492.6 C168.1 487.2 156.6 488.6 155.5 494.1 " +
  "C154.9 500.8 169.4 503.2 181.8 497.9 C190.0 494.4 190.6 489.4 194.8 493.1 " +
  "C199.8 498.5 198.2 503.0 206.3 502.3 C213.9 501.5 214.5 491.5 218.1 488.7 " +
  "C222.3 485.3 230.2 486.7 231.9 493.3 C233.5 499.4 229.9 502.2 238.0 501.5 " +
  "C248.5 500.6 247.0 471.9 257.3 462.8 C264.4 456.5 274.5 460.2 272.6 473.5 " +
  "C271.0 484.6 262.6 493.7 266.0 500.2 C269.4 506.2 280.7 503.2 286.4 495.3 " +
  "C291.6 487.9 300.2 486.6 303.6 492.6 C307.0 498.6 303.3 501.5 310.8 500.2 " +
  "C318.8 498.9 319.4 488.9 323.2 486.6 C328.0 483.7 335.5 486.3 336.6 492.9 " +
  "C337.5 498.4 335.1 501.2 342.4 499.4 C360.0 495.4 376.4 484.4 393.8 469.6";

/**
 * Ein Blatt des Stapels. Die Ebene trägt die Lage und die Bewegung, das Bild
 * darin nur die Bildpunkte — so bleibt die Unterschrift ein Geschwister der
 * Aufnahme und nimmt jede Drehung des Blattes mit.
 */
function Blatt({ rolle, quelle, children }: { rolle: string; quelle: string; children?: React.ReactNode }) {
  return (
    <div className={`trial-sheet ${rolle}`}>
      {/*
        Bewusst ein einfaches `img` statt `next/image`: der Optimierer liefert
        je nach Aushandlung eine verlustbehaftete Fassung, bei manchen Anfragen
        ohne Alphakanal. Ein Blatt ohne Alphakanal ist ein weißes Rechteck über
        dem halben Kalender. Dieselbe Begründung wie bei `DisinfectionSweep`.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="trial-sheet-img"
        src={quelle}
        alt=""
        width={489}
        height={538}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      {children}
    </div>
  );
}

export default function TrialCalendar() {
  const rahmenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rahmen = rahmenRef.current;
    if (!rahmen) return;

    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          rahmen.dataset.view = e.intersectionRatio >= SICHTSCHWELLE ? "in" : "out";
        }
      },
      { threshold: [0, SICHTSCHWELLE] },
    );
    io.observe(rahmen);
    return () => io.disconnect();
  }, []);

  return (
    /*
      Die Fläche ist vollständig dekorativ — kein Text, nichts Bedienbares,
      keine Aussage, die nicht schon in der Überschrift und im Absatz daneben
      steht. Deshalb steht sie als Ganzes hinter `aria-hidden`.
    */
    <div ref={rahmenRef} className="trial-zone" data-view="out" aria-hidden="true">
      <div className="trial-wash" />

      <div className="trial-frame">
        <div className="trial-veil">
          <div className="trial-stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="trial-base"
              src="/images/testphase/kalender-basis.webp"
              alt=""
              width={1070}
              height={856}
              loading="lazy"
              decoding="async"
              draggable={false}
            />

            {/* Nimmt das eigene Zimmer der Aufnahme zurück, ohne die Blätter
                anzufassen — Begründung bei `.trial-shade` in globals.css. */}
            <div className="trial-shade" />

            {/* Unbewegtes Grundblatt — siehe Kopfkommentar, es schließt die Schleife. */}
            <Blatt rolle="trial-sheet-base" quelle={`${BLATT}-01.webp`} />

            <Blatt rolle="trial-sheet-v" quelle={`${BLATT}-vertrag.webp`}>
              <svg
                className="trial-signature"
                viewBox="0 0 489 538"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path d={SIGNATUR} pathLength={1} />
              </svg>
            </Blatt>

            <Blatt rolle="trial-sheet-3" quelle={`${BLATT}-03.webp`} />
            <Blatt rolle="trial-sheet-2" quelle={`${BLATT}-02.webp`} />
            <Blatt rolle="trial-sheet-1" quelle={`${BLATT}-01.webp`} />
          </div>
        </div>
      </div>
    </div>
  );
}
