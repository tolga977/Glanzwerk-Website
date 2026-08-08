/**
 * Hersteller der Reinigungsmittel und Geräte, die Glanzwerk tatsächlich
 * einsetzt (z. B. Numatic, Dr. Schnell, Unger).
 *
 * ── Warum getrennt von `clientLogos` ────────────────────────────────────
 * Das sind zwei grundverschiedene Aussagen, auch wenn beide als Logoreihe
 * erscheinen:
 *
 *   clientLogos   „diese Unternehmen sind unsere Auftraggeber"
 *   productLogos  „mit diesen Produkten arbeiten wir"
 *
 * Die erste ist eine Referenz und braucht die schriftliche Freigabe des
 * Kunden. Die zweite ist eine Sachangabe über die eigene Ausstattung und
 * braucht das nicht. In einer gemeinsamen Liste würde die schwächere
 * Aussage wie die stärkere aussehen — ein Besucher läse Herstellerlogos
 * als Kundenliste. Deshalb zwei Datensätze und zwei Überschriften.
 *
 * ── Was die Überschrift leisten muss ────────────────────────────────────
 * Sie sagt „Produkte, die wir einsetzen", nicht „Unsere Partner". Eine
 * Partnerschaft ist eine geschäftliche Beziehung; die bloße Verwendung
 * eines Produkts ist keine. Solange keine Herstellerpartnerschaft
 * schriftlich vorliegt, bleibt es bei der Sachangabe.
 *
 * ── Format ──────────────────────────────────────────────────────────────
 * Bevorzugt SVG: die Anzeige stellt alle Logos einfarbig dar, damit eine
 * Reihe fremder Marken nicht bunter wirkt als der eigene Auftritt. Eine
 * PNG-Datei mit fest eingebrannter Farbe lässt sich dafür nicht verwenden.
 *
 * `width`/`height` sind die Maße der Datei und halten nur das
 * Seitenverhältnis; die Anzeige skaliert auf eine einheitliche Höhe.
 *
 * Hinweis zu Herstellerlogos: Die Nennung eingesetzter Produkte ist
 * zulässig, solange sie nicht wie eine Empfehlung oder Zusammenarbeit des
 * Herstellers aussieht. Einige Hersteller haben eigene Vorgaben zur
 * Logoverwendung — im Zweifel die Marken-Richtlinie prüfen oder kurz
 * anfragen.
 */

export interface ProductLogo {
  /** Herstellername — wird als Alternativtext ausgegeben. */
  name: string;
  /**
   * Freigabestatus.
   *
   * `false` heißt: der Hersteller wird auf der Website nicht genannt und
   * nicht abgebildet. Die Anzeige filtert danach, es entsteht keine leere
   * Stelle und kein ausgegrauter Eintrag — ein Besucher sieht nicht, dass
   * hier etwas fehlt.
   *
   * Der Eintrag bleibt trotzdem in dieser Liste stehen, damit beim
   * Vorliegen der Freigabe nur ein Wort zu ändern ist und niemand den
   * Namen neu recherchieren muss.
   */
  approved: boolean;
  /**
   * Pfad unter /public, z. B. "/images/produkte/numatic.svg".
   *
   * `null`, solange die Logodatei noch nicht vorliegt. Die Anzeige setzt
   * dann den Herstellernamen als Wortbild. Das ist bewusst kein Ersatzlogo:
   * ein Name ist eine Sachangabe, eine nachgebaute Bildmarke wäre eine
   * Behauptung über die Marke. Liegt die offizielle Datei später vor,
   * genügt es, hier den Pfad einzutragen — die Proportionen kommen dann aus
   * der Datei selbst.
   */
  src: string | null;
  /** Intrinsische Maße der Datei, gegen Layoutsprünge. Nur mit `src` nötig. */
  width?: number;
  height?: number;
  /**
   * Optische Korrektur je Logo. Ein breites Wortbild wirkt bei gleicher
   * Höhe größer als ein kompaktes Signet; dieser Faktor gleicht das aus.
   * 1 = keine Korrektur.
   */
  scale?: number;
}

/**
 * Stand der Freigaben (August 2026):
 *
 *   Numatic      freigegeben — wird angezeigt.
 *   DR.SCHNELL   noch keine schriftliche Freigabe. Der Hersteller wird
 *                deshalb in dieser Zeile nicht genannt. (Dass Dr. Schnell
 *                als Reinigungsmittel eingesetzt wird, steht als reine
 *                Sachaussage im Fragenbereich der Startseite — das ist
 *                etwas anderes als eine Nennung in einer Herstellerzeile,
 *                die wie eine Zusammenarbeit gelesen werden kann.)
 *
 * Weitere Hersteller erst nach Freigabe ergänzen — `approved: true` allein
 * genügt, die Anzeige nimmt den Eintrag dann von selbst auf.
 *
 * Beispiel für den späteren Wechsel auf die offizielle Bildmarke:
 *   { name: "Numatic", approved: true, src: "/images/produkte/numatic.svg", width: 320, height: 80 }
 */
export const productLogos: ProductLogo[] = [
  { name: "Numatic", approved: true, src: null },
  { name: "DR.SCHNELL", approved: false, src: null },
];

/** Nur das, was gezeigt werden darf. Einzige Quelle für die Anzeige. */
export const approvedProductLogos = productLogos.filter((logo) => logo.approved);
