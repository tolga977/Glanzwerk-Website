import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import {
  SONSTIGES_SLUG,
  type ContactRequestContext,
  type ContactRequestValues,
} from "@/lib/contactRequest";

/**
 * Zustellung einer geprüften Anfrage an info@glanzwerkberlin.de über Brevo
 * (Transactional Email API).
 *
 * ── Warum ein reiner `fetch`-Aufruf statt eines Brevo-SDKs ───────────────
 * Brevos REST-API (`POST https://api.brevo.com/v3/smtp/email`) lässt sich
 * ohne zusätzliche Abhängigkeit ansprechen — genau das bereits im Projekt
 * etablierte Muster für Drittanbieter-APIs (siehe `src/lib/googleRating.ts`,
 * das die Google-Places-API ebenfalls per rohem `fetch` aufruft, kein SDK).
 * Ein neues Paket ist damit nicht nötig.
 *
 * ── Konfiguration ─────────────────────────────────────────────────────
 * Drei serverseitige Umgebungsvariablen, keine davon `NEXT_PUBLIC_`:
 *
 *   BREVO_API_KEY      — Zugangsschlüssel aus dem Brevo-Dashboard.
 *   CONTACT_FROM_EMAIL — Absenderadresse. MUSS zu der bei Brevo
 *                         authentifizierten Domain gehören
 *                         (info@glanzwerkberlin.de) — bewusst kein
 *                         Vorgabewert im Code, weil vor der Verifizierung
 *                         jede erfundene Adresse entweder nicht sendefähig
 *                         wäre oder eine falsche Tatsache behaupten würde.
 *   CONTACT_TO_EMAIL   — Empfänger. Optional; ohne Angabe greift
 *                         `siteConfig.email` (dieselbe Adresse, die auch
 *                         Impressum und Kontaktseite zeigen), damit die
 *                         Empfängeradresse nicht doppelt im Code steht.
 *
 * Der sichtbare Absendername ("Glanzwerk Reinigungsservice") ist bewusst ein
 * Literal, kein Env-Wert: er ist keine geheime, umgebungsabhängige Angabe
 * wie ein API-Key oder eine Adresse, sondern derselbe feste Firmenname wie
 * überall sonst im Projekt (`siteConfig.name`) — hier direkt verwendet statt
 * über `siteConfig` verdrahtet, weil dieser eine String seit der
 * Domain-Verifizierung bei Brevo als Absendername feststeht.
 *
 * Fehlt `BREVO_API_KEY` oder `CONTACT_FROM_EMAIL`, wirft diese Funktion
 * `MailConfigError`, ohne die API überhaupt aufzurufen. `route.ts` fängt das
 * wie jeden anderen Fehler dieser Funktion ab und antwortet dem Besucher mit
 * einer neutralen 503 — nie mit dem eigentlichen Grund.
 *
 * ── Sicherheit der Kopfzeilen ─────────────────────────────────────────
 * `sender.email` kommt ausschließlich aus der Umgebungsvariable, nie aus
 * Besuchereingaben. Der einzige Besucherwert, der in ein API-Feld außerhalb
 * des Nachrichtentexts fließt, ist `replyTo` — das ist zu diesem Zeitpunkt
 * bereits durch `validateContactRequest` als Adresse ohne Leerzeichen
 * geprüft (die Prüfung schließt u. a. Zeilenumbrüche aus), bevor
 * `route.ts` diese Funktion überhaupt aufruft. Alle übrigen Besucherwerte
 * landen ausschließlich im Klartext-Nachrichtenkörper (`textContent`, kein
 * `htmlContent`) — ein reines Textfeld in einem JSON-Aufruf kann keine
 * zusätzlichen Mail-Kopfzeilen erzeugen, anders als ein selbst
 * zusammengebautes SMTP-Protokoll.
 *
 * ── Ausschließlich Transaktionsversand ───────────────────────────────────
 * Dieser Aufruf spricht ausschließlich den Transactional-Email-Endpunkt an.
 * Es gibt in diesem Projekt keinen Aufruf der Brevo-Contacts-/Listen-API —
 * ein Besucher landet dadurch in keiner Empfängerliste und erhält keinen
 * Newsletter.
 */

export class MailConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailConfigError";
  }
}

export class MailDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailDeliveryError";
  }
}

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/** Sichtbarer Absendername, seit der Domain-Verifizierung bei Brevo fest. */
const SENDER_NAME = "Glanzwerk Reinigungsservice";

/** Anzeigename der angefragten Leistung — oder die Freitextangabe bei „Sonstiges". */
function resolveServiceLabel(values: ContactRequestValues): string {
  if (values.service === SONSTIGES_SLUG) {
    return values.serviceOther.trim() || "Sonstiges";
  }
  // Trifft kein Leistungs-Slug zu (z. B. weil die Anfrage vom Preisrechner
  // stammt, der hier bereits eine lesbare Objektart einträgt), bleibt der
  // Wert selbst die beste verfügbare Bezeichnung.
  return services.find((s) => s.slug === values.service)?.shortTitle ?? values.service;
}

/**
 * Betreff und Kennzeichnungszeile unterscheiden sich je nach
 * `context.kind` (Phase 1D): eine reine Preisrechner-Berechnung darf im
 * IONOS-Postfach nicht wie eine tatsächlich abgeschickte Anfrage aussehen.
 * Alle übrigen Inhalte (Leistung, Kontaktdaten, `details`) bleiben für beide
 * Ereignisarten identisch aufgebaut.
 */
function buildSubject(kind: ContactRequestContext["kind"], serviceLabel: string): string {
  return kind === "estimate"
    ? `Preisrechner genutzt – ${serviceLabel}`
    : `Neue Website-Anfrage – ${serviceLabel}`;
}

function buildEmailText(
  values: ContactRequestValues,
  context: ContactRequestContext,
  serviceLabel: string,
): string {
  const eventLine =
    context.kind === "estimate"
      ? "Ereignis: Preisrechner – Richtwert berechnet (noch keine abgeschickte Anfrage)"
      : "Ereignis: Website-Anfrage – abgeschickt";

  const lines = [
    eventLine,
    `Quelle: ${context.source || "unbekannt"}`,
    `Leistung: ${serviceLabel}`,
    `Name: ${values.name}`,
    `E-Mail: ${values.email}`,
    `Telefon: ${values.phone.trim() || "nicht angegeben"}`,
    `Nachricht: ${values.message.trim() || "keine"}`,
  ];

  if (context.details) {
    for (const [label, value] of Object.entries(context.details)) {
      lines.push(`${label}: ${value}`);
    }
  }

  return lines.join("\n");
}

export async function dispatchContactRequest(
  values: ContactRequestValues,
  context: ContactRequestContext,
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    throw new MailConfigError(
      "BREVO_API_KEY und/oder CONTACT_FROM_EMAIL fehlen in der Umgebung.",
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const serviceLabel = resolveServiceLabel(values);

  let response: Response;
  try {
    response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: from },
        to: [{ email: to }],
        subject: buildSubject(context.kind, serviceLabel),
        textContent: buildEmailText(values, context, serviceLabel),
        replyTo: { email: values.email, name: values.name },
      }),
    });
  } catch (networkError) {
    throw new MailDeliveryError(
      `Netzwerkfehler beim Aufruf der Brevo-API: ${
        networkError instanceof Error ? networkError.message : "unbekannter Fehler"
      }`,
    );
  }

  if (!response.ok) {
    // Nur Brevos eigene Kernmeldung fürs Server-Log, nie den API-Key oder
    // den vollen Antwortkörper — derselbe Vorsichtsgrundsatz wie in
    // `src/lib/googleRating.ts`.
    let detail = "";
    try {
      const body: unknown = await response.json();
      if (
        typeof body === "object" &&
        body !== null &&
        "message" in body &&
        typeof (body as { message?: unknown }).message === "string"
      ) {
        detail = (body as { message: string }).message;
      }
    } catch {
      // Antwortkörper nicht lesbar oder kein JSON — der Statuscode allein
      // reicht fürs Log.
    }
    throw new MailDeliveryError(`Brevo antwortete ${response.status}${detail ? `: ${detail}` : ""}`);
  }

  // Die `messageId` aus einer erfolgreichen Antwort wird bewusst nicht
  // ausgelesen: es gibt aktuell keine technische Weiterverarbeitung, die sie
  // bräuchte, und sie darf ohnehin nie an den Besucher zurückgegeben werden.
}
