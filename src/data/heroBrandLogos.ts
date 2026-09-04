/**
 * Herstellerlogos der Mittel und Geräte, mit denen gearbeitet wird.
 *
 * ── Warum eine eigene Liste neben `productLogos.ts` ─────────────────────
 * `productLogos` ist auf einfarbige SVG-Dateien ausgelegt: die zugehörige
 * Anzeige stellt alle Logos in einem Ton dar, damit eine Reihe fremder Marken
 * nicht bunter wirkt als der eigene Auftritt. Für die hier gelieferten
 * Dateien ist das ausgeschlossen — sie sind ausdrücklich unverändert zu
 * verwenden, also mit ihren Originalfarben und ohne Umfärbung.
 *
 * Deshalb eine getrennte Liste mit getrennter Anzeige. `productLogos` bleibt
 * unberührt und weiterhin für den Abschnitt weiter unten auf der Seite
 * zuständig.
 *
 * ── Was diese Reihe aussagt, und was nicht ──────────────────────────────
 * Sie ist eine Sachangabe über die eigene Ausstattung: mit diesen Produkten
 * wird gearbeitet. Sie ist KEINE Partnerschaft, keine Empfehlung des
 * Herstellers und keine Zertifizierung. Die Überschrift ist entsprechend
 * formuliert und darf nicht in Richtung „Partner" verschoben werden, solange
 * nichts Schriftliches vorliegt.
 *
 * ── Zu den Höhen ────────────────────────────────────────────────────────
 * Die drei Logos haben stark unterschiedliche Seitenverhältnisse (2,26 : 1
 * bis 7,00 : 1). Eine einheitliche Höhe wäre hier das Gegenteil von optisch
 * gleichwertig: das flachste Logo würde doppelt so breit und dadurch
 * dominant, und bei DEISS nimmt die Wortmarke wegen Farbfläche und
 * Unterzeile nur rund die Hälfte der Dateihöhe ein.
 *
 * Maßgeblich ist deshalb die Höhe der WORTMARKE, nicht die der Datei. Die
 * Werte unten sind so gewählt, dass sie bei allen drei Logos auf etwa 23–30
 * px kommt:
 *
 *   Numatic      Schrift füllt die Datei fast vollständig  → 32 px
 *   Dr. Schnell  Schrift füllt die Datei fast vollständig  → 28 px
 *   DEISS        Schrift rund 45 % der Dateihöhe           → 56 px
 *
 * Das Seitenverhältnis bleibt in jedem Fall erhalten; die Breite folgt aus
 * `width`/`height` der Datei.
 */

export interface HeroBrandLogo {
  /** Herstellername — wird als Alternativtext ausgegeben. */
  name: string;
  /** Pfad unter /public. Unveränderte Originaldatei, nur ins Web-Format gebracht. */
  src: string;
  /** Maße der Datei; halten ausschließlich das Seitenverhältnis. */
  width: number;
  height: number;
  /**
   * Dargestellte Höhe in Pixeln (Desktop). Auf dem Telefon skaliert die
   * Anzeige gemeinsam herunter, das Verhältnis untereinander bleibt.
   */
  hoehe: number;
}

export const heroBrandLogos: HeroBrandLogo[] = [
  {
    name: "Dr. Schnell",
    src: "/images/marken/dr-schnell.webp",
    width: 589,
    height: 84,
    hoehe: 28,
  },
  {
    name: "DEISS",
    src: "/images/marken/deiss.webp",
    width: 380,
    height: 168,
    hoehe: 56,
  },
  {
    name: "Numatic",
    src: "/images/marken/numatic.webp",
    width: 495,
    height: 96,
    hoehe: 32,
  },
  /*
   * Vileda Professional und VERMOP kamen als eine gemeinsame PDF-Vorlage
   * (zwei Wortmarken nebeneinander auf Weiß) und wurden anhand des
   * Alphakanals in zwei einzelne, eng zugeschnittene Dateien getrennt —
   * unverändert in Form und Farbe, nur die leere Fläche drumherum entfernt.
   *
   * Beide sind Bildmarke-über-Wortmarke-Lockups, keine reinen Wortmarken wie
   * die drei oberen — die Höhe folgt deshalb, wie dort begründet, nicht der
   * Dateihöhe, sondern der Höhe des eigentlichen Namenszugs innerhalb der
   * Datei (bei Vileda das Schriftzug-Band unter dem Blatt-Zeichen, bei
   * VERMOP die Zeile „VERMOP" unter dem ovalen Zeichen). Beide Namenszüge
   * treffen bei den Werten unten auf rund 27 px — dieselbe Zielgröße, auf die
   * auch Dr. Schnell und Numatic ausgelegt sind.
   */
  {
    name: "Vileda Professional",
    src: "/images/marken/vileda-professional.webp",
    width: 458,
    height: 193,
    hoehe: 80,
  },
  {
    name: "VERMOP",
    src: "/images/marken/vermop.webp",
    width: 465,
    height: 191,
    hoehe: 95,
  },
];
