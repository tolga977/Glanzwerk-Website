/**
 * Logos von Auftraggebern, die einer Nennung zugestimmt haben.
 *
 * ── Warum diese Liste leer ist ──────────────────────────────────────────
 * Sie ist leer, weil Glanzwerk bisher keine freigegebenen Kundenlogos
 * bereitgestellt hat — nicht, weil die Anzeige noch fehlt. Die Anzeige ist
 * fertig (`components/home/ClientLogos.tsx`) und erscheint in dem Moment,
 * in dem hier der erste echte Eintrag steht.
 *
 * Nichts erfinden: kein Beispiellogo, keine Branchenplatzhalter, keine
 * ausgegrauten Kästchen mit „Ihr Logo hier". Ein Vertrauensabschnitt, der
 * mit Fantasiemarken arbeitet, entwertet jede echte Aussage daneben.
 *
 * ── Bevor ein Logo hier eingetragen wird ────────────────────────────────
 * Zwei Dinge müssen vorliegen, beides aus rechtlichen Gründen:
 *   1. eine schriftliche Freigabe des Kunden zur Nennung als Referenz,
 *   2. die Logodatei vom Kunden selbst, nicht aus dessen Website gezogen.
 *
 * ── Format ──────────────────────────────────────────────────────────────
 * SVG ist die richtige Wahl: die Anzeige stellt alle Logos einfarbig dar,
 * damit eine Reihe fremder Marken nicht bunter wirkt als die eigene. Eine
 * PNG-Datei mit fest eingebrannter Farbe lässt sich dafür nicht verwenden.
 *
 * `width` und `height` sind die Maße der Datei. Sie werden nur gebraucht,
 * um das Seitenverhältnis zu halten; die Anzeige skaliert auf eine
 * einheitliche optische Höhe.
 */

export interface ClientLogo {
  /** Firmenname — wird als Alternativtext ausgegeben. */
  name: string;
  /** Pfad unter /public, z. B. "/images/kunden/beispiel.svg". */
  src: string;
  /** Intrinsische Maße der Datei, gegen Layoutsprünge. */
  width: number;
  height: number;
  /**
   * Optische Korrektur je Logo. Ein sehr breites Wortbild wirkt bei gleicher
   * Höhe größer als ein kompaktes Signet; dieser Faktor gleicht das aus.
   * 1 = keine Korrektur.
   */
  scale?: number;
}

export const clientLogos: ClientLogo[] = [];
