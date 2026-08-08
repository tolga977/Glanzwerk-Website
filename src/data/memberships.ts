/**
 * Mitgliedschaften — vorbereitet für die Gebäudereiniger-Innung.
 *
 * Solange keine Mitgliedschaft besteht, steht hier `null`, und die
 * Startseite zeigt an der vorbereiteten Stelle nichts an: kein „in
 * Vorbereitung", kein ausgegrautes Signet, keine Andeutung. Eine
 * Mitgliedschaft, die nicht besteht, darf auf einer Seite, die mit
 * Verlässlichkeit wirbt, nicht einmal angedeutet werden — dieselbe
 * Disziplin wie bei `clientLogos` (leer bis zur Freigabe) und bei den
 * Bewertungen (keine erfundenen Texte).
 *
 * Sobald die Mitgliedschaft vorliegt: Objekt eintragen, fertig — der
 * Abschnitt „Womit wir arbeiten" auf der Startseite rendert den Eintrag
 * dann von selbst.
 */
export interface Membership {
  /** Offizieller Name, z. B. "Gebäudereiniger-Innung Berlin". */
  name: string;
  /** Signet unter /public — oder null für eine reine Textnennung. */
  logoSrc: string | null;
  /** Ergänzende Angabe, etwa die Mitgliedsnummer, falls sie genannt werden soll. */
  detail?: string;
  /** Verweis auf den Auftritt der Innung. */
  href?: string;
}

export const innungMembership: Membership | null = null;
