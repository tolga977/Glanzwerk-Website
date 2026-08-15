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
 *   Numatic      freigegeben — wird angezeigt (noch als Wortbild, Datei
 *                unter /images/marken/numatic.webp liegt bereits vor).
 *   DR.SCHNELL   schriftliche Nutzungsrechtvereinbarung liegt vor, Original-
 *                Logodatei vom Betreiber bereitgestellt und freigegeben.
 *   DEISS        Original-Logodatei vom Betreiber bereitgestellt und
 *                freigegeben (A Sund Group Company).
 *
 * Weitere Hersteller erst nach Freigabe ergänzen — `approved: true` allein
 * genügt, die Anzeige nimmt den Eintrag dann von selbst auf.
 */
export const productLogos: ProductLogo[] = [
  { name: "Numatic", approved: true, src: null },
  {
    name: "DR.SCHNELL",
    approved: true,
    src: "/images/marken/dr-schnell.webp",
    width: 2000,
    height: 286,
  },
  {
    name: "DEISS",
    approved: true,
    src: "/images/marken/deiss.webp",
    width: 2377,
    height: 1052,
    /* Das Wortbild "DEISS" sitzt nur in der oberen Hälfte der Datei (der
       Fließtext "A SUND GROUP COMPANY" darunter gehört zur Optik der Marke
       und bleibt Teil der Datei), dadurch wirkt es bei gleicher Höhe wie die
       anderen Logos optisch kleiner. 1.3 gleicht das aus, ohne die Datei
       selbst zu beschneiden oder zu verändern. */
    scale: 1.3,
  },
];

/** Nur das, was gezeigt werden darf. Einzige Quelle für die Anzeige. */
export const approvedProductLogos = productLogos.filter((logo) => logo.approved);
