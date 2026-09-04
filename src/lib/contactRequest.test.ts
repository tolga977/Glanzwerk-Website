import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  emptyContactRequest,
  SONSTIGES_SLUG,
  submitContactRequest,
  validateContactRequest,
  type ContactRequestValues,
} from "@/lib/contactRequest";

/**
 * Prüft die eine Validierungsfunktion, die jetzt von allen vier
 * Einbettungen von `QuoteWizard` sowie serverseitig von `/api/contact`
 * gemeinsam benutzt wird (siehe `src/lib/contactRequest.ts`).
 *
 * Reine Logikprüfung ohne DOM: `vitest.config.ts` läuft mit
 * `environment: "node"`, es ist weder jsdom noch React Testing Library
 * installiert. Das UI-Verhalten von `QuoteWizard` selbst lässt sich in
 * dieser Testumgebung nicht rendern und wird deshalb hier nicht geprüft —
 * nur die serverseitig wiederverwendbare Prüfregel.
 */

function withValues(overrides: Partial<ContactRequestValues>): ContactRequestValues {
  return { ...emptyContactRequest, ...overrides };
}

describe("validateContactRequest", () => {
  it("meldet alle fehlenden Pflichtfelder", () => {
    const errors = validateContactRequest(emptyContactRequest, [
      "service",
      "name",
      "email",
      "privacy",
    ]);
    expect(errors.service).toBeDefined();
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.privacy).toBeDefined();
  });

  it("meldet keinen Fehler, wenn alle Pflichtfelder gültig ausgefüllt sind", () => {
    const values = withValues({
      service: "bueroreinigung-berlin",
      name: "Max Mustermann",
      email: "max@example.com",
      privacy: true,
    });
    const errors = validateContactRequest(values, ["service", "name", "email", "privacy"]);
    expect(errors).toEqual({});
  });

  it("lässt optionale Felder wie phone und message leer", () => {
    const values = withValues({
      service: "bueroreinigung-berlin",
      name: "Max Mustermann",
      email: "max@example.com",
      privacy: true,
    });
    const errors = validateContactRequest(values, ["service", "name", "email", "privacy"]);
    expect(errors.phone).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it("weist eine E-Mail-Adresse ohne @ zurück", () => {
    const values = withValues({ email: "keine-email-adresse" });
    const errors = validateContactRequest(values, ["email"]);
    expect(errors.email).toBe("Bitte geben Sie eine gültige E-Mail-Adresse an.");
  });

  it("akzeptiert eine plausible E-Mail-Adresse", () => {
    const values = withValues({ email: "info@glanzwerkberlin.de" });
    const errors = validateContactRequest(values, ["email"]);
    expect(errors.email).toBeUndefined();
  });

  it("verlangt serviceOther, sobald die Leistung 'Sonstiges' ist", () => {
    const values = withValues({ service: SONSTIGES_SLUG, serviceOther: "" });
    const errors = validateContactRequest(values, ["service"]);
    expect(errors.serviceOther).toBeDefined();
  });

  it("verlangt serviceOther nicht bei einer echten Leistung", () => {
    const values = withValues({ service: "bueroreinigung-berlin", serviceOther: "" });
    const errors = validateContactRequest(values, ["service"]);
    expect(errors.serviceOther).toBeUndefined();
  });

  it("prüft nur die als 'required' übergebenen Felder je Schritt", () => {
    // Entspricht Schritt 1 von QuoteWizard: nur "service" ist an dieser
    // Stelle Pflicht, obwohl name/email/privacy im Gesamtmodell fehlen.
    const errors = validateContactRequest(emptyContactRequest, ["service"]);
    expect(Object.keys(errors)).toEqual(["service"]);
  });

  it("übernimmt eine abweichende Pflichtmeldung, wenn eine übergeben wird", () => {
    const errors = validateContactRequest(emptyContactRequest, ["name"], {
      name: "Bitte geben Sie Ihren Namen oder Ihr Unternehmen an.",
    });
    expect(errors.name).toBe("Bitte geben Sie Ihren Namen oder Ihr Unternehmen an.");
  });

  it("meldet privacy nur als fehlend, wenn die Checkbox nicht gesetzt ist", () => {
    const nichtBestaetigt = validateContactRequest(withValues({ privacy: false }), ["privacy"]);
    const bestaetigt = validateContactRequest(withValues({ privacy: true }), ["privacy"]);
    expect(nichtBestaetigt.privacy).toBeDefined();
    expect(bestaetigt.privacy).toBeUndefined();
  });
});

/**
 * Prüft, dass `submitContactRequest` das Ergebnis von `/api/contact`
 * unverändert durchreicht: Erfolg nur bei einer Antwort mit ok-Status,
 * sonst wirft die Funktion — das gilt gleichermaßen für `QuoteWizard` und
 * den Kontakt-Schritt des Preisrechners, die beide dieselbe Funktion
 * aufrufen. Die Route selbst wird hier nicht ausgeführt, `fetch` ist
 * gemockt — keine echte Netzwerkanfrage, kein echter Versand.
 */
describe("submitContactRequest", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const context = { source: "/kontakt", honeypot: "" };

  it("ruft /api/contact per POST mit values und context im Body auf", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await submitContactRequest(withValues({ name: "Max" }), context);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body);
    expect(body.values.name).toBe("Max");
    expect(body.context).toEqual(context);
  });

  it("kehrt bei einer ok-Antwort erfolgreich zurück", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await expect(submitContactRequest(emptyContactRequest, context)).resolves.toBeUndefined();
  });

  it("wirft bei einer Fehlerantwort, statt Erfolg vorzutäuschen", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "delivery_unavailable" }), { status: 503 }),
    );
    await expect(submitContactRequest(emptyContactRequest, context)).rejects.toThrow();
  });
});
