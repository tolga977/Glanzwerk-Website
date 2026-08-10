/**
 * Die Bildfolge der Hero-Bühne.
 *
 * ── Warum eine Datenliste und kein fest verdrahteter Ablauf ─────────────
 * Die Dramaturgie des Heros ist eine Design-Entscheidung, keine
 * Programmlogik. Sie gehört deshalb hierher: Reihenfolge, Standzeit,
 * Verlangsamung und Bildausschnitt jedes Einstellung sind Werte, die man
 * ändern können muss, ohne die Komponente anzufassen.
 *
 * ── Die Dramaturgie ────────────────────────────────────────────────────
 * Gewünscht war: Raum/Premium-Umgebung → Detail/Glas/Glanz → Mensch/Arbeit.
 *
 * Umgesetzt sind derzeit zwei der drei Akte. Der eröffnende Lobby-Clip
 * fehlt aus einem technischen und nicht aus einem gestalterischen Grund:
 * er liegt als 3840×2160 mit 67 MB auf 8 Sekunden vor, also rund
 * 70 Mbit/s. Das ist für eine Website um den Faktor zwanzig zu schwer,
 * und ohne Neukodierung lässt sich daran nichts ändern — eine
 * verlustfreie Umlagerung im Container verschiebt Bytes, sie entfernt
 * keine. Dasselbe gilt für den Staubsauger-Clip (4K, 44 MB).
 *
 * Sobald beide in 1920×1080 bei 2,5–4 Mbit/s neu exportiert vorliegen,
 * genügt hier ein zusätzlicher Eintrag an der richtigen Stelle der Liste.
 * Die Komponente kommt mit beliebig vielen Einstellungen zurecht.
 *
 * Der Glas-Clip trägt deshalb zurzeit zwei Aufgaben: er ist Raum und
 * Lichtsituation (Fenster, Tageslicht, Reflexion) und gleichzeitig das
 * eigentliche Markenmotiv — Glas, Wasser, Licht, Klarheit ist genau das,
 * was „Glanzwerk" bezeichnet. Als Eröffnung ist er damit kein Notbehelf.
 *
 * ── Zur Verlangsamung ──────────────────────────────────────────────────
 * Gewünscht war eine Wahrnehmung um 0,5×. Blind gesetzt wäre das hier
 * falsch: die Quellen liegen bei 24 und 25 Bildern je Sekunde, 0,5× ergibt
 * effektiv 12 bzw. 12,5 Bilder — sichtbares Ruckeln, besonders bei der
 * gleichmäßigen Abzieherbewegung im Glas-Clip.
 *
 * Die Raten sind deshalb so gewählt, dass beide Einstellungen auf exakt
 * 18 effektive Bilder je Sekunde kommen:
 *
 *   Glas    25 fps × 0,72 = 18,0
 *   Büro    24 fps × 0,75 = 18,0
 *
 * Das ist zweierlei: deutlich entschleunigt, aber oberhalb der Schwelle,
 * ab der eine Bewegung als Stottern statt als Ruhe gelesen wird — und
 * über den Schnitt hinweg dieselbe Bewegungsfrequenz. Zwei Einstellungen
 * mit unterschiedlicher effektiver Bildrate lesen sich als zwei
 * verschiedene Filme, auch wenn niemand die Zahl benennen könnte.
 *
 * Der Rest des entschleunigten Eindrucks kommt nicht aus der Rate, sondern
 * aus der Komposition: lange Standzeiten, eine einzige Überblendung von
 * 2,2 Sekunden, keine Schnitthektik.
 */

export interface HeroClip {
  /** Pfad unter /public. */
  src: string;
  /**
   * Bildrate der Quelle. Steht hier nur zur Nachvollziehbarkeit der
   * gewählten Rate — die Komponente rechnet damit nicht.
   */
  sourceFps: number;
  /**
   * Wiedergabegeschwindigkeit. Siehe Begründung oben: das Ziel ist eine
   * einheitliche effektive Bildrate, nicht ein runder Faktor.
   */
  playbackRate: number;
  /**
   * Standzeit in Sekunden, bevor zur nächsten Einstellung übergeblendet
   * wird — in Echtzeit, nicht in Quellzeit.
   *
   * Muss zusammen mit der Überblenddauer unter der verlangsamten Laufzeit
   * der Quelle bleiben, sonst springt der Clip während der Überblendung an
   * seinen Anfang zurück. Gerechnet:
   *
   *   Glas   20,48 s / 0,72 = 28,4 s verfügbar · 14,0 + 2,2 = 16,2 s ✓
   *   Büro    5,88 s / 0,75 =  7,8 s verfügbar ·  5,5 + 2,2 =  7,7 s ✓
   */
  holdSeconds: number;
  /**
   * Bildausschnitt-Klasse (`object-position`), definiert in globals.css.
   * Je Einstellung eigen: derselbe Ausschnitt über verschiedenes Material
   * legt den Bildschwerpunkt zufällig.
   */
  focalClassName: string;
  /**
   * Kurzbeschreibung der Einstellung. Erscheint nicht auf der Seite —
   * sie dokumentiert, welches Material gemeint ist, damit die Reihenfolge
   * ohne Öffnen der Dateien nachvollziehbar bleibt.
   */
  note: string;
}

/**
 * Dauer der Überblendung in Millisekunden.
 *
 * 2200 ms liegt weit über der 300-ms-Grenze für Bedienelemente — zu Recht:
 * die Grenze gilt für Interaktionsfeedback, das jemand hundertmal am Tag
 * auslöst. Dies hier ist die filmische Ebene und fällt in die Kategorie
 * „erklärend/gestalterisch", für die die Vorgabe ausdrücklich längere
 * Dauern zulässt.
 *
 * Die Kurve ist `linear`, und das ist keine Nachlässigkeit: bei einer
 * Auflösung wird die einfahrende Einstellung über der noch vollständig
 * deckenden vorherigen aufgeblendet. Nur eine gleichförmige Kurve hält die
 * wahrgenommene Helligkeit dabei konstant — jede Beschleunigung erzeugt in
 * der Mitte der Blende einen Helligkeitsschlag.
 */
export const HERO_CROSSFADE_MS = 2200;

export const heroSequence: HeroClip[] = [
  {
    src: "/video/hero-glas.mp4",
    sourceFps: 25,
    playbackRate: 0.72,
    holdSeconds: 14,
    focalClassName: "hero-focal-glas",
    note: "Glasreinigung am Fenster — Licht, Wasser, Reflexion. Das Markenmotiv und zugleich die Raumeröffnung.",
  },
  {
    src: "/video/hero-buero.mp4",
    sourceFps: 24,
    playbackRate: 0.75,
    holdSeconds: 5.5,
    focalClassName: "hero-focal-buero",
    note: "Reinigungskraft im Büro — die menschliche und berufliche Ebene.",
  },
];
