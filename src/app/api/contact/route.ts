import { NextResponse } from "next/server";
import {
  emptyContactRequest,
  validateContactRequest,
  type ContactRequestContext,
  type ContactRequestValues,
} from "@/lib/contactRequest";
import { dispatchContactRequest } from "@/lib/mail/dispatch";

/**
 * Nimmt Anfragen aus `QuoteWizard` und dem Kontakt-Schritt des Preisrechners
 * entgegen (siehe `submitContactRequest` in `@/lib/contactRequest`) und
 * reicht sie an `dispatchContactRequest` (Brevo) weiter.
 *
 * ── Serverseitige Prüfung, unabhängig vom Client ─────────────────────────
 * `QuoteWizard` prüft je Schritt nur eine Teilmenge der Felder. Hier gilt
 * die vollständige Pflichtmenge auf einmal — eine clientseitige Prüfung
 * allein ließe sich umgehen (z. B. durch einen direkten POST ohne
 * Browser), und die Route darf sich darauf nicht verlassen.
 *
 * ── Honeypot ──────────────────────────────────────────────────────────
 * Ist `context.honeypot` gefüllt, antwortet die Route mit demselben
 * Erfolgsstatus wie bei einer echten Anfrage, verarbeitet sie aber nicht
 * weiter. Ein automatisierter Absender soll nicht erkennen können, dass er
 * erkannt wurde — sonst probiert er es mit einem leeren Feld erneut.
 *
 * ── Fehlermeldungen ───────────────────────────────────────────────────
 * Der Besucher bekommt nie mehr als einen von drei Statuscodes zu sehen
 * (400 bei ungültigen Angaben, 503 wenn Brevo die Zustellung nicht
 * bestätigt — sei es wegen fehlender Konfiguration, eines Brevo- oder
 * eines Netzwerkfehlers —, 500 bei einem unerwarteten Fehler) — nie die
 * eigentliche Fehlermeldung, den API-Key oder den Stacktrace. Die echte
 * Ursache steht ausschließlich im Server-Log.
 */

const REQUIRED_FIELDS: (keyof ContactRequestValues)[] = ["service", "name", "email", "privacy"];

/**
 * Grobe Obergrenzen gegen übergroße oder offensichtlich missbräuchliche
 * Anfragen.
 *
 * `service` ist großzügiger als ein Leistungs-Slug es bräuchte: Der
 * Kontakt-Schritt des Preisrechners trägt hier statt eines Slugs die
 * bereits lesbare Objektart ein, bei „Sonstige Gewerbefläche" bis hin zur
 * frei eingegebenen Objektbeschreibung (siehe `PriceCalculator.tsx`).
 */
const MAX_LENGTHS: Partial<Record<keyof ContactRequestValues, number>> = {
  service: 300,
  serviceOther: 2000,
  name: 200,
  email: 200,
  phone: 50,
  message: 5000,
};

/** Obergrenzen für `context.details` — siehe `readDetails`. */
const MAX_DETAILS_ENTRIES = 15;
const MAX_DETAIL_KEY_LENGTH = 60;
const MAX_DETAIL_VALUE_LENGTH = 300;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Baut die Werte streng aus dem Anfragekörper — jede Abweichung vom erwarteten Typ bricht ab. */
function readValues(raw: unknown): ContactRequestValues | null {
  if (!isPlainObject(raw)) return null;
  const values = { ...emptyContactRequest };

  for (const key of Object.keys(values) as (keyof ContactRequestValues)[]) {
    const incoming = raw[key];
    if (key === "privacy") {
      values.privacy = incoming === true;
      continue;
    }
    if (typeof incoming !== "string") return null;
    const max = MAX_LENGTHS[key];
    if (max !== undefined && incoming.length > max) return null;
    values[key] = incoming;
  }

  return values;
}

/**
 * Liest `context.details` — zusätzliche, quellenspezifische Klartext-Zeilen
 * (bislang nur vom Preisrechner befüllt, siehe `ContactRequestContext`).
 * Jeder Eintrag, der nicht als String vorliegt oder die Obergrenzen
 * überschreitet, wird stillschweigend übersprungen statt die ganze Anfrage
 * abzulehnen — `details` ist eine Zugabe, kein Pflichtfeld.
 */
function readDetails(raw: unknown): Record<string, string> | undefined {
  if (!isPlainObject(raw)) return undefined;
  const details: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw).slice(0, MAX_DETAILS_ENTRIES)) {
    if (typeof value !== "string") continue;
    if (key.length > MAX_DETAIL_KEY_LENGTH || value.length > MAX_DETAIL_VALUE_LENGTH) continue;
    details[key] = value;
  }
  return Object.keys(details).length > 0 ? details : undefined;
}

/** Nur die beiden bekannten Werte übernehmen — alles andere bleibt beim Standard ("request"). */
function readKind(raw: unknown): "estimate" | undefined {
  return raw === "estimate" ? "estimate" : undefined;
}

function readContext(raw: unknown): ContactRequestContext {
  if (!isPlainObject(raw)) return { source: "", honeypot: "" };
  const source = typeof raw.source === "string" ? raw.source.slice(0, 200) : "";
  const honeypot = typeof raw.honeypot === "string" ? raw.honeypot : "";
  const details = readDetails(raw.details);
  const kind = readKind(raw.kind);
  return { source, honeypot, ...(details ? { details } : {}), ...(kind ? { kind } : {}) };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const raw = isPlainObject(body) ? body : {};
  const values = readValues(raw.values);
  const context = readContext(raw.context);

  if (!values) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  // Bot-Falle: derselbe Erfolgsstatus, keine weitere Verarbeitung.
  if (context.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const validationErrors = validateContactRequest(values, REQUIRED_FIELDS);
  if (Object.keys(validationErrors).length > 0) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  try {
    await dispatchContactRequest(values, context);
  } catch (error) {
    console.error(
      `[api/contact] Zustellung fehlgeschlagen: ${error instanceof Error ? error.message : "unbekannter Fehler"}`,
    );
    return NextResponse.json({ error: "delivery_unavailable" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
