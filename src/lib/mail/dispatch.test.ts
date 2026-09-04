import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { dispatchContactRequest, MailConfigError, MailDeliveryError } from "@/lib/mail/dispatch";
import { emptyContactRequest, type ContactRequestValues } from "@/lib/contactRequest";

/**
 * Prüft `dispatchContactRequest` gegen eine gemockte Brevo-API — keine
 * echte Netzwerkanfrage, kein echter Versand (siehe Vorgabe in Phase 1B:
 * "Keine echten E-Mails in automatisierten Tests verschicken").
 */

function values(overrides: Partial<ContactRequestValues> = {}): ContactRequestValues {
  return {
    ...emptyContactRequest,
    service: "bueroreinigung-berlin",
    name: "Max Mustermann",
    email: "max@example.com",
    privacy: true,
    ...overrides,
  };
}

const context = { source: "/kontakt", honeypot: "" };

describe("dispatchContactRequest", () => {
  const originalEnv = { ...process.env };
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    process.env.BREVO_API_KEY = "xkeysib-test-key-do-not-leak";
    process.env.CONTACT_FROM_EMAIL = "info@glanzwerkberlin.de";
    delete process.env.CONTACT_TO_EMAIL;
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllGlobals();
  });

  it("wirft MailConfigError, wenn BREVO_API_KEY fehlt, ohne die API aufzurufen", async () => {
    delete process.env.BREVO_API_KEY;
    await expect(dispatchContactRequest(values(), context)).rejects.toBeInstanceOf(MailConfigError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("wirft MailConfigError, wenn CONTACT_FROM_EMAIL fehlt, ohne die API aufzurufen", async () => {
    delete process.env.CONTACT_FROM_EMAIL;
    await expect(dispatchContactRequest(values(), context)).rejects.toBeInstanceOf(MailConfigError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("ruft die Brevo-API mit korrektem Endpunkt, Auth-Header und Body auf", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
    await dispatchContactRequest(values({ phone: "030 1234567" }), context);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");
    expect(init.method).toBe("POST");
    expect(init.headers["api-key"]).toBe("xkeysib-test-key-do-not-leak");
    expect(init.headers["Content-Type"]).toBe("application/json");

    const body = JSON.parse(init.body);
    expect(body.sender).toEqual({ name: "Glanzwerk Reinigungsservice", email: "info@glanzwerkberlin.de" });
    expect(body.to).toEqual([{ email: "info@glanzwerkberlin.de" }]); // Fallback aus siteConfig.email
    expect(body.replyTo).toEqual({ email: "max@example.com", name: "Max Mustermann" });
    expect(body.subject).toContain("Neue Website-Anfrage");
    expect(body.textContent).toContain("030 1234567");
    expect(body.htmlContent).toBeUndefined(); // reines Textformat, kein HTML-Injection-Risiko
  });

  it("verwendet niemals die Besucheradresse als Sender", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
    await dispatchContactRequest(values(), context);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.sender.email).toBe("info@glanzwerkberlin.de");
    expect(body.sender.email).not.toBe("max@example.com");
    expect(body.replyTo.email).toBe("max@example.com");
  });

  it("verwendet CONTACT_TO_EMAIL als Empfänger, wenn gesetzt", async () => {
    process.env.CONTACT_TO_EMAIL = "team@glanzwerkberlin.de";
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
    await dispatchContactRequest(values(), context);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.to).toEqual([{ email: "team@glanzwerkberlin.de" }]);
  });

  it("nimmt context.details als zusätzliche Zeilen in den Mailtext auf", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
    await dispatchContactRequest(values(), {
      ...context,
      details: { Fläche: "300 m²", Küchen: "1" },
    });
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.textContent).toContain("Fläche: 300 m²");
    expect(body.textContent).toContain("Küchen: 1");
  });

  it("wirft MailDeliveryError bei einer Fehlerantwort von Brevo", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ code: "invalid_parameter", message: "Invalid `sender` field" }), {
        status: 400,
      }),
    );
    await expect(dispatchContactRequest(values(), context)).rejects.toBeInstanceOf(MailDeliveryError);
  });

  it("wirft MailDeliveryError bei einem Netzwerkfehler", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    await expect(dispatchContactRequest(values(), context)).rejects.toBeInstanceOf(MailDeliveryError);
  });

  it("gibt den API-Key nie in einer Fehlermeldung preis", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }));
    await expect(dispatchContactRequest(values(), context)).rejects.toSatisfy((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      return !message.includes("xkeysib-test-key-do-not-leak");
    });
  });

  it("gibt den API-Key auch bei fehlender Konfiguration nie preis", async () => {
    delete process.env.BREVO_API_KEY;
    await expect(dispatchContactRequest(values(), context)).rejects.toSatisfy((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      return !message.includes("xkeysib-test-key-do-not-leak");
    });
  });

  it("ruft ausschließlich den Transactional-Email-Endpunkt auf, nie eine Contacts-/Listen-API", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
    await dispatchContactRequest(values(), context);
    for (const call of fetchMock.mock.calls) {
      expect(String(call[0])).not.toMatch(/contacts|lists/i);
    }
  });

  /**
   * Phase 1D: Preisrechner-Ereignis vs. tatsächliche Anfrage müssen im
   * IONOS-Postfach eindeutig unterscheidbar sein — geprüft an Betreff UND
   * Mailtext, nicht nur an einem der beiden.
   */
  describe("kind: Preisrechner-Ereignis vs. tatsächliche Anfrage", () => {
    it("kennzeichnet eine Preisrechner-Berechnung eindeutig im Betreff", async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
      await dispatchContactRequest(values({ service: "Büro" }), { ...context, kind: "estimate" });
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.subject).toBe("Preisrechner genutzt – Büro");
    });

    it("kennzeichnet eine Preisrechner-Berechnung eindeutig im Mailtext", async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
      await dispatchContactRequest(values(), { ...context, kind: "estimate" });
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.textContent).toContain("Ereignis: Preisrechner – Richtwert berechnet");
      expect(body.textContent).toMatch(/noch keine abgeschickte Anfrage/);
    });

    it("behält für eine tatsächliche Anfrage (kind fehlt) den bisherigen Betreff", async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
      await dispatchContactRequest(values({ service: "bueroreinigung-berlin" }), context);
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.subject).toContain("Neue Website-Anfrage");
      expect(body.subject).not.toContain("Preisrechner genutzt");
    });

    it("kennzeichnet eine tatsächliche Anfrage (kind fehlt) im Mailtext als abgeschickte Website-Anfrage", async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
      await dispatchContactRequest(values(), context);
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.textContent).toContain("Ereignis: Website-Anfrage – abgeschickt");
    });

    it("behandelt kind: 'request' explizit genauso wie ein fehlendes kind", async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
      await dispatchContactRequest(values(), { ...context, kind: "request" });
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.subject).toContain("Neue Website-Anfrage");
      expect(body.textContent).toContain("Ereignis: Website-Anfrage – abgeschickt");
    });

    /**
     * Phase 1D.1: `source` beschreibt nur die Herkunft, `kind` die Bedeutung
     * des Ereignisses — ein Realtest zeigte eine Mail mit `Quelle:
     * Preisrechner`, aber Betreff/Text einer echten Anfrage. Dieser Test
     * stellt sicher, dass `source: "/preisrechner"` allein niemals implizit
     * als `kind === "request"` behandelt wird: ohne explizites `kind:
     * "estimate"` bleibt es beim (sichereren) Anfrage-Standardverhalten,
     * nie umgekehrt automatisch als Preisrechner-Ereignis erraten.
     */
    it("leitet kind niemals aus source ab — 'Preisrechner' als Quelle allein macht daraus keine Preisrechner-Mail", async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
      await dispatchContactRequest(values(), { source: "/preisrechner", honeypot: "" });
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.subject).toContain("Neue Website-Anfrage");
      expect(body.subject).not.toContain("Preisrechner genutzt");
      expect(body.textContent).toContain("Ereignis: Website-Anfrage – abgeschickt");
    });

    it("erhebt für die reine Preisrechner-Berechnung keine zusätzlichen personenbezogenen Daten", async () => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
      await dispatchContactRequest(values(), {
        ...context,
        kind: "estimate",
        details: { Fläche: "300 m²" },
      });
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      // Dieselben Felder wie bei jeder anderen Anfrage — kein IP/UA/Fingerprint-Feld.
      expect(Object.keys(body).sort()).toEqual(
        ["replyTo", "sender", "subject", "textContent", "to"].sort(),
      );
    });
  });
});
