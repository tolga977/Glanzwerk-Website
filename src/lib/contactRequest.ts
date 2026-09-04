/**
 * Die Anfrage — Datenmodell, Prüfung und Übermittlung an einer Stelle.
 *
 * ── Warum diese Datei existiert ─────────────────────────────────────────
 * Es gibt jetzt genau eine Formularkomponente für normale Anfragen
 * (`QuoteWizard`, `src/components/forms/QuoteWizard.tsx`), eingebettet an
 * vier Stellen der Website: Hero der Startseite, deren mobiler Zweitweg
 * (`MobileContactSection`), /umwelt-verantwortung und /kontakt. Alle vier
 * teilen dasselbe Datenmodell, dieselbe Prüfung und denselben Versand —
 * das liegt hier. Vorher gab es daneben noch `ContactForm` mit einem
 * eigenen, etwas anderen Feldsatz (u. a. „Firma" und „Art des Objekts" als
 * eigene Felder); auf Entscheidung des Betreibers ist das entfallen, damit
 * es website­weit nur noch eine Formularästhetik gibt.
 *
 * ── Die Übermittlung ist jetzt echt ──────────────────────────────────────
 * `submitContactRequest` simuliert keinen Erfolg mehr, sondern ruft
 * tatsächlich die Route `/api/contact` auf. Diese prüft die Angaben
 * serverseitig erneut und reicht sie an `dispatchContactRequest`
 * (`src/lib/mail/dispatch.ts`) weiter, die den Versand über Brevo an
 * info@glanzwerkberlin.de auslöst. Ein Formular zeigt „Erfolg" ausschließlich,
 * wenn Brevo die Zustellung tatsächlich bestätigt hat.
 *
 * Zweite Quelle seit dieser Erweiterung: der Kontakt-Schritt des Preisrechners
 * (`src/components/calculator/PriceCalculator.tsx`) ruft dieselbe Funktion mit
 * denselben Feldern auf — seine Berechnungslogik bleibt davon unberührt, nur
 * der bereits vorhandene Kontakt-Schritt sendet jetzt zusätzlich echt.
 */

export interface ContactRequestValues {
  /**
   * Gewählte Leistung — der Slug einer echten Leistung aus `services.ts`
   * oder `SONSTIGES_SLUG`.
   */
  service: string;
  /** Freitext, wenn als Leistung „Sonstiges" gewählt wurde. */
  serviceOther: string;
  /** Person oder Unternehmen — ein gemeinsames Feld, siehe `QuoteWizard`. */
  name: string;
  email: string;
  phone: string;
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
  email: "",
  phone: "",
  message: "",
  privacy: false,
};

/**
 * Begleitangaben zur Anfrage, die der Besucher nicht bewusst ausfüllt.
 *
 * `source` ist der Pfad der Seite, von der aus abgesendet wurde (z. B.
 * "/kontakt") — eine reine Zuordnungshilfe für den Betreiber, keine
 * personenbezogene oder verhaltensbezogene Angabe und kein Tracking.
 *
 * `honeypot` ist ein für Menschen unsichtbares Textfeld (siehe
 * `QuoteWizard`). Ist es ausgefüllt, stammt die Anfrage vermutlich von
 * einem automatisierten Absender, nicht von einem Menschen.
 *
 * `details` sind zusätzliche, quellenspezifische Angaben als Klartext-Zeilen
 * (Label → Wert), die es in `ContactRequestValues` nicht gibt, weil sie nur
 * an einer einzigen Quelle anfallen — bislang ausschließlich die bereits im
 * Preisrechner vorhandenen Objektdaten und die berechnete Schätzung
 * (siehe `PriceCalculator.tsx`). `QuoteWizard` lässt dieses Feld weg.
 *
 * `kind` unterscheidet, welches Ereignis die Mail überhaupt ausgelöst hat
 * (Phase 1D): `PriceCalculator` löst seine Benachrichtigung automatisch beim
 * Berechnen eines Richtwerts aus, ohne dass der Besucher damit bewusst "eine
 * Anfrage abschickt" — das ist `"estimate"`. Jede Absendung von `QuoteWizard`
 * (an allen vier Einbettungen) ist dagegen eine tatsächlich vom Besucher
 * gewollte Kontaktanfrage und bleibt beim Standardwert `"request"`, den
 * `QuoteWizard` deshalb gar nicht erst setzen muss. `dispatchContactRequest`
 * (`src/lib/mail/dispatch.ts`) verwendet dieses Feld ausschließlich für
 * Betreff und eine Kennzeichnungszeile im Mailtext — es fließt nicht in
 * Empfänger, Absender oder `replyTo` ein und ist keine personenbezogene
 * Angabe.
 */
export type ContactRequestKind = "request" | "estimate";

export interface ContactRequestContext {
  source: string;
  honeypot: string;
  details?: Record<string, string>;
  kind?: ContactRequestKind;
}

/*
 * Bewusst dieselbe Prüfung wie zuvor: ein Zeichen vor dem @, eines danach,
 * ein Punkt im Domainteil. Keine strengere Regel — eine Adresse abzulehnen,
 * die tatsächlich existiert, kostet eine Anfrage.
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages: Record<keyof ContactRequestValues, string> = {
  service: "Bitte wählen Sie eine Leistung aus.",
  serviceOther: "Bitte beschreiben Sie kurz Ihr Anliegen.",
  name: "Bitte geben Sie Ihren Namen an.",
  email: "Bitte geben Sie Ihre E-Mail-Adresse an.",
  phone: "Bitte geben Sie Ihre Telefonnummer an.",
  message: "Bitte beschreiben Sie kurz Ihr Anliegen.",
  privacy: "Bitte bestätigen Sie die Datenschutzerklärung.",
};

/**
 * Prüft die übergebenen Felder.
 *
 * `required` bestimmt, was Pflicht ist. `QuoteWizard` ruft dies je Schritt
 * mit einer anderen Teilmenge auf (Schritt 1: `service`, Schritt 2: `name`
 * und `email`, Schritt 4: `privacy`) — dieselbe Funktion prüft aber auch
 * serverseitig in `/api/contact` mit der vollständigen Pflichtmenge auf
 * einmal, unabhängig vom Schrittzustand des Clients.
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
   * Genutzt von `QuoteWizard`, weil das Feld `name` dort Person UND
   * Unternehmen aufnimmt und der Standardtext („Bitte geben Sie Ihren Namen
   * an.") das nicht widerspiegelt.
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
 * Übermittelt die Anfrage an `/api/contact`.
 *
 * Wirft, wenn die Route mit einem Fehlerstatus antwortet — etwa weil Brevo
 * die Zustellung ablehnt, ein Netzwerkfehler auftritt oder die
 * Versandkonfiguration fehlt (`MailConfigError`/`MailDeliveryError` in
 * `src/lib/mail/dispatch.ts`). Beide Aufrufer (`QuoteWizard` und der
 * Kontakt-Schritt des Preisrechners) fangen das ab und zeigen ihren
 * jeweiligen Fehlerzustand; es gibt keinen Fall, in dem diese Funktion
 * erfolgreich zurückkehrt, ohne dass Brevo die Zustellung bestätigt hat.
 */
export async function submitContactRequest(
  values: ContactRequestValues,
  context: ContactRequestContext,
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, context }),
  });

  if (!response.ok) {
    throw new Error(`Anfrage fehlgeschlagen (${response.status})`);
  }
}
