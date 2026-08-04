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
  /** Pfad unter /public, z. B. "/images/produkte/numatic.svg". */
  src: string;
  /** Intrinsische Maße der Datei, gegen Layoutsprünge. */
  width: number;
  height: number;
  /**
   * Optische Korrektur je Logo. Ein breites Wortbild wirkt bei gleicher
   * Höhe größer als ein kompaktes Signet; dieser Faktor gleicht das aus.
   * 1 = keine Korrektur.
   */
  scale?: number;
}

/**
 * Leer, bis die echten Logodateien vorliegen. Die Anzeige
 * (`components/home/ProductLogos.tsx`) erscheint automatisch, sobald hier
 * der erste Eintrag steht — kein Platzhalter, keine Beispielmarken.
 *
 * Beispiel für einen späteren Eintrag:
 *   { name: "Numatic", src: "/images/produkte/numatic.svg", width: 320, height: 80 }
 */
export const productLogos: ProductLogo[] = [];
