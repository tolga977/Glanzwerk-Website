/**
 * Die Anfrage — Datenmodell, Prüfung und Übermittlung an einer Stelle.
 *
 * ── Warum diese Datei existiert ─────────────────────────────────────────
 * Die Anfrage wird jetzt an zwei Stellen gestellt: im vierschrittigen
 * Formular in der Hero-Bühne der Startseite und im einstufigen Formular auf
 * /kontakt. Ohne eine gemeinsame Grundlage hätten beide ihre eigene
 * Feldliste, ihre eigenen Fehlermeldungen und ihre eigene Übermittlung —
 * und würden ab dem ersten Änderungswunsch auseinanderlaufen.
 *
 * Hier liegt deshalb alles, was beide teilen. Was sich unterscheidet, ist
 * nur die Frage, WELCHE Felder Pflicht sind: das entscheidet die jeweilige
 * Oberfläche und übergibt es an `validateContactRequest`.
 *
 * ── ACHTUNG: Es gibt noch keine Übermittlung ───────────────────────────
 * `submitContactRequest` sendet nichts. Der Projektstand hat keine
 * Server Action, keine API-Route und keinen Mailversand — das war schon vor
 * diesem Umbau so (siehe die TODO-Notiz, die vorher in ContactForm.tsx
 * stand). Diese Datei übernimmt den bestehenden Zustand unverändert und
 * erfindet bewusst keinen Ersatz: ein zusammengebauter Versand ohne
 * Zugangsdaten wäre entweder wirkungslos oder unehrlich.
 *
 * Solange das so ist, bestätigt die Oberfläche nach dem Absenden einen
 * Eingang, der nicht stattgefunden hat. Das ist kein Detail, sondern der
 * Punkt, der vor einer Veröffentlichung geklärt sein muss.
 */

export interface ContactRequestValues {
  /**
   * Gewählte Leistung — der Slug einer echten Leistung aus `services.ts`
   * oder `SONSTIGES_SLUG`.
   *
   * Nur das Hero-Formular füllt dieses Feld. Auf /kontakt beschreibt das
   * Freitextfeld das Anliegen, dort gibt es keine Auswahlliste.
   */
  service: string;
  /** Freitext, wenn als Leistung „Sonstiges" gewählt wurde. */
  serviceOther: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  /** „Art des Objekts" — nur im Formular auf /kontakt erhoben. */
  objectType: string;
  message: string;
  privacy: boolean;
}

export type ContactRequestErrors = Partial<Record<keyof ContactRequestValues, string>>;

/** Kennung für „Sonstiges" in der Leistungsauswahl. Kein echter Leistungs-Slug. */
export const SONSTIGES_SLUG = "sonstiges";

export const emptyContactRequest: ContactRequestValues = {
  service: "",
  serviceOther: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  objectType: "",
  message: "",
  privacy: false,
};

/*
 * Bewusst dieselbe Prüfung wie zuvor in ContactForm.tsx: ein Zeichen vor
 * dem @, eines danach, ein Punkt im Domainteil. Keine strengere Regel —
 * eine Adresse abzulehnen, die tatsächlich existiert, kostet eine Anfrage.
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages: Record<keyof ContactRequestValues, string> = {
  service: "Bitte wählen Sie eine Leistung aus.",
  serviceOther: "Bitte beschreiben Sie kurz Ihr Anliegen.",
  name: "Bitte geben Sie Ihren Namen an.",
  company: "Bitte geben Sie Ihr Unternehmen an.",
  email: "Bitte geben Sie Ihre E-Mail-Adresse an.",
  phone: "Bitte geben Sie Ihre Telefonnummer an.",
  objectType: "Bitte geben Sie die Art des Objekts an.",
  message: "Bitte beschreiben Sie kurz Ihr Anliegen.",
  privacy: "Bitte bestätigen Sie die Datenschutzerklärung.",
};

/**
 * Prüft die übergebenen Felder.
 *
 * `required` bestimmt, was Pflicht ist — die beiden Oberflächen haben
 * unterschiedliche Ansprüche, und das ist Absicht:
 *
 *   /kontakt      name, company, email, message, privacy
 *                 (unveränderter Bestand)
 *   Hero-Formular service, name, email, privacy
 *                 (weniger Pflichtfelder: es steht im ersten Bildschirm und
 *                 soll den Einstieg nicht verstellen. Firma, Telefon und
 *                 Freitext bleiben freiwillig — zum Antworten genügen Name
 *                 und E-Mail.)
 *
 * `serviceOther` wird zusätzlich geprüft, sobald „Sonstiges" gewählt ist:
 * eine Anfrage, deren Leistung „Sonstiges" ist und die keinen Text mitbringt,
 * enthält keine Information.
 */
export function validateContactRequest(
  values: ContactRequestValues,
  required: (keyof ContactRequestValues)[],
  /**
   * Abweichende Pflichtmeldungen für einzelne Felder.
   *
   * Nötig geworden, weil dasselbe Feld in den beiden Oberflächen
   * unterschiedlich beschriftet ist: auf /kontakt heißt es „Name" und hat ein
   * eigenes Feld „Unternehmen" daneben, im Hero-Formular sind beide zu
   * „Name / Unternehmen" zusammengefasst. Eine Meldung „Bitte geben Sie Ihren
   * Namen an." wäre dort nur halb richtig.
   *
   * Bewusst als Überschreibung und nicht als zweiter Meldungssatz: die
   * Standardtexte bleiben die eine Quelle, und an der Aufrufstelle steht
   * genau die eine Abweichung, die sie braucht.
   */
  messageOverrides?: Partial<Record<keyof ContactRequestValues, string>>,
): ContactRequestErrors {
  const errors: ContactRequestErrors = {};
  const text = (field: keyof ContactRequestValues) =>
    messageOverrides?.[field] ?? messages[field];

  for (const field of required) {
    if (field === "privacy") {
      if (!values.privacy) errors.privacy = text("privacy");
      continue;
    }
    if (!String(values[field]).trim()) {
      errors[field] = text(field);
    }
  }

  if (values.email.trim() && !emailPattern.test(values.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }

  if (values.service === SONSTIGES_SLUG && !values.serviceOther.trim()) {
    errors.serviceOther = messages.serviceOther;
  }

  return errors;
}

/**
 * Übermittelt die Anfrage.
 *
 * Siehe die Warnung im Dateikopf: hier passiert nichts außer einer kurzen
 * Wartezeit, damit die Oberfläche ihren Sendezustand zeigen kann. Das ist
 * der unveränderte Projektstand, an einer Stelle zusammengezogen statt in
 * zwei Komponenten verteilt.
 *
 * Sobald eine Server Action oder API-Route vorliegt, ist dies die einzige
 * Datei, die dafür angefasst werden muss — beide Formulare hängen daran.
 */
export async function submitContactRequest(values: ContactRequestValues): Promise<void> {
  void values;
  await new Promise((resolve) => setTimeout(resolve, 600));
}
