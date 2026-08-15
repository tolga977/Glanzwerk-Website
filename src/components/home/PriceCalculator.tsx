"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Der Preisrechner als Gerät — nativ, kein Bild, kein Video.
 *
 * ── Was er ist ──────────────────────────────────────────────────────────
 * Eine Vorführung, keine Bedienoberfläche. Das Gerät rechnet nichts: es
 * zeigt in vier Schritten, was der echte Rechner unter `/preisrechner`
 * abfragt, und endet auf derselben Zahl, die darunter als Beispielrechnung
 * ausgeschrieben steht. Gerechnet wird ausschließlich hinter der
 * Schaltfläche „Preis berechnen".
 *
 * Deshalb ist die ganze Fläche `aria-hidden` und für die Tastatur nicht
 * erreichbar — es gibt hier nichts zu bedienen, und ein Tastenfeld aus
 * sechzehn fokussierbaren Attrappen wäre für jeden, der sich durch die
 * Seite tabbt, eine Sackgasse.
 *
 * ── Warum eine Schrittliste und keine Zeitleiste ────────────────────────
 * Die Vorgabe ist streng: keine Zahl darf morphen, keine darf vor ihrem
 * Tastendruck erscheinen, und das Ergebnis erst nach der Taste „=". Eine
 * Liste aus Schritten, bei der Tastendruck und Anzeigewechsel im selben
 * Eintrag stehen, macht diese Kopplung unmöglich zu verletzen — die Anzeige
 * kann gar nicht vorlaufen, weil sie kein eigenes Zeitmaß hat.
 */

const OBJEKTE = ["BÜROREINIGUNG", "PRAXISREINIGUNG", "KITA-/SCHULREINIGUNG"] as const;
const INTERVALLE = ["1× PRO WOCHE", "2× PRO WOCHE", "3× PRO WOCHE", "5× PRO WOCHE"] as const;

type Anzeige =
  | { modus: "wert"; kontext?: string; haupt: string }
  | { modus: "liste"; optionen: readonly string[]; aktiv: number }
  | { modus: "ergebnis"; haupt: string; fuss: string };

const RUHE: Anzeige = { modus: "wert", haupt: "0" };
const ERGEBNIS: Anzeige = { modus: "ergebnis", haupt: "ca. 1.225 €", fuss: "NETTO / MONAT" };

type Schritt = { druck?: string; anzeige?: Anzeige; warte: number };

/*
 * Der Ablauf. Die Dauern folgen den dokumentierten Feedback-Zeiten: der
 * Tastendruck selbst ist mit 150 ms so kurz wie ein echter, die Pausen
 * dazwischen sind lang genug, um jeden Zustand zu lesen, ohne dass die
 * Fläche unruhig wird.
 */
const SEQUENZ: Schritt[] = [
  { anzeige: RUHE, warte: 1100 },

  // Schritt 1 — Objektart
  { druck: "objekt", warte: 520 },
  { anzeige: { modus: "liste", optionen: OBJEKTE, aktiv: -1 }, warte: 700 },
  { anzeige: { modus: "liste", optionen: OBJEKTE, aktiv: 0 }, warte: 1000 },
  { anzeige: { modus: "wert", kontext: "BÜROREINIGUNG", haupt: "0" }, warte: 650 },

  // Schritt 2 — Fläche. Ziffer und Anzeige stehen im selben Schritt.
  { druck: "3", anzeige: { modus: "wert", kontext: "BÜROREINIGUNG", haupt: "3" }, warte: 500 },
  { druck: "0", anzeige: { modus: "wert", kontext: "BÜROREINIGUNG", haupt: "30" }, warte: 500 },
  { druck: "0", anzeige: { modus: "wert", kontext: "BÜROREINIGUNG", haupt: "300 m²" }, warte: 1000 },

  // Schritt 3 — Intervall
  { druck: "intervall", warte: 520 },
  { anzeige: { modus: "liste", optionen: INTERVALLE, aktiv: -1 }, warte: 700 },
  { anzeige: { modus: "liste", optionen: INTERVALLE, aktiv: 2 }, warte: 1050 },
  {
    anzeige: { modus: "wert", kontext: "BÜRO · 300 m²", haupt: "3× PRO WOCHE" },
    warte: 800,
  },

  // Schritt 4 — erst die Taste, dann das Ergebnis
  { druck: "gleich", warte: 560 },
  { anzeige: ERGEBNIS, warte: 3600 },

  // Rückkehr in den Ausgangszustand, dann Pause vor dem nächsten Durchlauf
  { anzeige: RUHE, warte: 1600 },
];

/** Wie lange eine Taste unten steht. Kurz — es ist ein Druck, kein Zustand. */
const DRUCK_MS = 150;
/** Anteil der Fläche, der sichtbar sein muss, damit die Vorführung läuft. */
const SICHTSCHWELLE = 0.3;

/*
 * Die Bewegungsvorliebe als abonnierte Quelle statt als Zustand, der im
 * Effekt gesetzt wird. Das haelt den Server-Aufbau stabil (dort ist die
 * Vorgabe „volle Bewegung") und reagiert nebenbei darauf, wenn jemand die
 * Einstellung waehrend des Besuchs aendert.
 */
function useReduzierteBewegung() {
  return useSyncExternalStore(
    (melde) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", melde);
      return () => mq.removeEventListener("change", melde);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export default function PriceCalculator() {
  const rahmenRef = useRef<HTMLDivElement>(null);
  const [anzeige, setAnzeige] = useState<Anzeige>(RUHE);
  const [gedrueckt, setGedrueckt] = useState<string | null>(null);
  const sanft = useReduzierteBewegung();

  /*
   * Bei reduzierter Bewegung läuft nichts. Stehen bleibt das Ergebnis — der
   * einzige Zustand, der die Aussage des Abschnitts allein trägt und zur
   * Beispielrechnung darunter passt.
   */
  const sichtbar = sanft ? ERGEBNIS : anzeige;

  useEffect(() => {
    const rahmen = rahmenRef.current;
    if (!rahmen || sanft) return;

    let schritt = 0;
    let lauf = 0;
    let druckAb = 0;
    let laeuft = false;

    function weiter() {
      const s = SEQUENZ[schritt % SEQUENZ.length];
      if (s.druck) {
        setGedrueckt(s.druck);
        druckAb = window.setTimeout(() => setGedrueckt(null), DRUCK_MS);
      }
      if (s.anzeige) setAnzeige(s.anzeige);
      lauf = window.setTimeout(() => {
        schritt += 1;
        weiter();
      }, s.warte);
    }

    function anhalten() {
      laeuft = false;
      window.clearTimeout(lauf);
      window.clearTimeout(druckAb);
      setGedrueckt(null);
    }

    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          const imBlick = e.intersectionRatio >= SICHTSCHWELLE;
          if (imBlick && !laeuft) {
            /*
             * Neu ansetzen statt fortsetzen: wer den Abschnitt erreicht,
             * soll die Rechnung von vorn sehen und nicht in ihrer Mitte
             * einsteigen.
             */
            laeuft = true;
            schritt = 0;
            weiter();
          } else if (!imBlick && laeuft) {
            anhalten();
            setAnzeige(RUHE);
          }
        }
      },
      { threshold: [0, SICHTSCHWELLE] },
    );
    io.observe(rahmen);

    return () => {
      io.disconnect();
      anhalten();
    };
  }, [sanft]);

  const taste = (id: string, inhalt: string, extra = "") => (
    <button
      key={id}
      type="button"
      tabIndex={-1}
      className={`pk-taste ${extra}`}
      data-druck={gedrueckt === id ? "ja" : undefined}
    >
      {inhalt}
    </button>
  );

  return (
    <div ref={rahmenRef} className="pk" aria-hidden="true">
      <div className="pk-geraet">
        <div className="pk-display">
          <span className="pk-display-marke">Beispielrechnung</span>

          {sichtbar.modus === "liste" ? (
            <ul className="pk-liste">
              {sichtbar.optionen.map((o, i) => (
                <li key={o} className="pk-liste-zeile" data-aktiv={sichtbar.aktiv === i ? "ja" : undefined}>
                  {o}
                </li>
              ))}
            </ul>
          ) : (
            <div className="pk-wert">
              {sichtbar.modus === "wert" && sichtbar.kontext && (
                <span className="pk-wert-kontext">{sichtbar.kontext}</span>
              )}
              <span className="pk-wert-haupt" data-lang={sichtbar.modus === "wert" && sichtbar.haupt.length > 8 ? "ja" : undefined}>
                {sichtbar.haupt}
              </span>
              {sichtbar.modus === "ergebnis" && <span className="pk-wert-fuss">{sichtbar.fuss}</span>}
            </div>
          )}
        </div>

        <div className="pk-funktionen">
          {taste("objekt", "OBJEKT", "pk-taste-funktion")}
          {taste("flaeche", "m²", "pk-taste-funktion")}
          {taste("intervall", "INTERVALL", "pk-taste-funktion")}
          {taste("berechnen", "BERECHNEN", "pk-taste-funktion")}
        </div>

        {/*
          Zeilenweise notiert, nicht als Ziffernfeld plus Seitenspalte: das
          Raster fliesst dadurch von allein richtig, und nur die Gleich-Taste
          braucht eine ausdrueckliche Lage, weil sie zwei Reihen hoch ist.
        */}
        <div className="pk-feld">
          {taste("7", "7")}
          {taste("8", "8")}
          {taste("9", "9")}
          {taste("clr", "CLR", "pk-taste-neben")}

          {taste("4", "4")}
          {taste("5", "5")}
          {taste("6", "6")}
          {taste("del", "DEL", "pk-taste-neben")}

          {taste("1", "1")}
          {taste("2", "2")}
          {taste("3", "3")}
          {taste("gleich", "=", "pk-taste-gleich")}

          {taste("0", "0")}
          {taste("komma", ",")}
          {taste("vorzeichen", "+/−")}
        </div>
      </div>
    </div>
  );
}
