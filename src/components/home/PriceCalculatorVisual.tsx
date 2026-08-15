import MotionAsset from "@/components/home/MotionAsset";

/**
 * Der Rechner als Gegenstand — das Bewegtbild des Preisabschnitts.
 *
 * ── Warum freigestellt, und warum es beim ersten Mal nicht trug ─────────
 * Der Abschnitt ist hell (brand-100, Leuchtdichte 234), die Aufnahme spielt
 * in einem dunklen Büro (Mittel 43). Ein Rechteck davon ist ein Klotz, eine
 * weich auslaufende Zone darum ein Nebelfleck. Bleibt: den Gegenstand aus
 * seiner Umgebung nehmen und wie ein Produktfoto auf die Fläche stellen.
 *
 * Der erste Versuch dazu ist an drei Ausführungsfehlern gescheitert, nicht
 * am Gedanken:
 *
 *   1. Die Maske reichte bis y 612. Gemessen am Helligkeitsprofil endet der
 *      Sockel aber bei y 556 bis 561 — darunter liegt der Schatten, den das
 *      Gerät auf die Tischplatte wirft. Fünfzig Bildpunkte dunkler Tisch
 *      liefen also rundum mit. Dieser Hof ist es, der „ausgeschnitten und
 *      eingefügt" sagt.
 *   2. Der Sockel lief nach unten weich aus, statt sauber zu enden. Ein
 *      Gegenstand, dessen Fuß sich auflöst, steht auf nichts.
 *   3. Der Schatten war eine große Ellipse mittig darunter — die Form, die
 *      jedes Freistellwerkzeug per Vorgabe anbietet, und die man deshalb
 *      sofort als solche erkennt.
 *
 * Jetzt: Maske hart an der echten Kante (Weichzeichnung 2,4 px statt 5),
 * Sockel bei 558 abgeschnitten, und der Schatten aus zwei Ebenen — ein
 * schmaler, dunkler direkt unter dem Fuß, der den Kontakt macht, und ein
 * breiter, sehr schwacher, der die Streuung übernimmt. Beide sind nach
 * rechts versetzt, weil das Licht im Motiv von links vorn kommt.
 *
 * Die feste Maske genügt, weil die Kamera über die ganzen acht Sekunden
 * stillsteht: außerhalb des Displays bewegt sich kein Bildpunkt um mehr als
 * 28 von 255, das 99. Perzentil liegt bei 5.
 *
 * ── Was er zeigt ────────────────────────────────────────────────────────
 * Objektart, Fläche, Intervall, Ergebnis — dieselbe Reihenfolge, die der
 * echte Rechner abfragt, und dasselbe Beispiel, das darunter ausgeschrieben
 * steht. Er läuft einmal ab und bleibt auf dem Ergebnis stehen: das ist der
 * Zustand, der zur Schaltfläche führt.
 */
export default function PriceCalculatorVisual() {
  return (
    <div className="rechner" aria-hidden="true">
      <div className="rechner-streu" />
      <div className="rechner-kontakt" />
      <MotionAsset
        quelle="/videos/preisrechner.mp4"
        standbild="/videos/preisrechner-standbild.webp"
        className="rechner-video"
        ablauf="einmal"
      />
    </div>
  );
}
