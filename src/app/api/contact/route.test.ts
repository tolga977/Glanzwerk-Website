import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Prüft den Route Handler selbst — serverseitige Validierung, Honeypot und
 * Fehlerabbildung — mit gemocktem `dispatchContactRequest`. Kein echter
 * Brevo-Aufruf, siehe `src/lib/mail/dispatch.test.ts` für die Prüfung von
 * `dispatchContactRequest` selbst.
 */

vi.mock("@/lib/mail/dispatch", () => ({
  dispatchContactRequest: vi.fn(),
}));

const { dispatchContactRequest } = await import("@/lib/mail/dispatch");
const { POST } = await import("@/app/api/contact/route");

function request(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validValues = {
  service: "bueroreinigung-berlin",
  serviceOther: "",
  name: "Max Mustermann",
  email: "max@example.com",
  phone: "",
  message: "",
  privacy: true,
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.mocked(dispatchContactRequest).mockReset();
  });

  it("liefert 200 und ruft dispatchContactRequest bei einer gültigen Anfrage auf", async () => {
    vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
    const res = await POST(
      request({ values: validValues, context: { source: "/kontakt", honeypot: "" } }),
    );
    expect(res.status).toBe(200);
    expect(dispatchContactRequest).toHaveBeenCalledTimes(1);
  });

  it("liefert 400 bei fehlenden Pflichtfeldern, ohne zu versenden", async () => {
    const res = await POST(
      request({
        values: { ...validValues, name: "" },
        context: { source: "/kontakt", honeypot: "" },
      }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("validation_failed");
    expect(dispatchContactRequest).not.toHaveBeenCalled();
  });

  it("beantwortet einen ausgefüllten Honeypot mit Erfolg, ohne zu versenden", async () => {
    const res = await POST(
      request({
        values: validValues,
        context: { source: "/kontakt", honeypot: "ich-bin-ein-bot" },
      }),
    );
    expect(res.status).toBe(200);
    expect(dispatchContactRequest).not.toHaveBeenCalled();
  });

  it("liefert 503 und keinen Erfolg, wenn der Versand fehlschlägt", async () => {
    vi.mocked(dispatchContactRequest).mockRejectedValue(
      new Error("Kein Versandweg konfiguriert — interner Grund, darf den Besucher nie erreichen"),
    );
    const res = await POST(
      request({ values: validValues, context: { source: "/kontakt", honeypot: "" } }),
    );
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error).toBe("delivery_unavailable");
    expect(JSON.stringify(body)).not.toContain("Kein Versandweg");
  });

  it("lehnt ungültiges JSON mit 400 ab", async () => {
    const res = await POST(
      new Request("http://localhost/api/contact", { method: "POST", body: "kein-json" }),
    );
    expect(res.status).toBe(400);
    expect(dispatchContactRequest).not.toHaveBeenCalled();
  });

  it("lehnt einen falsch typisierten Payload mit 400 ab", async () => {
    const res = await POST(request({ values: { service: 123 }, context: {} }));
    expect(res.status).toBe(400);
    expect(dispatchContactRequest).not.toHaveBeenCalled();
  });

  it("reicht context.details unverändert an dispatchContactRequest weiter", async () => {
    vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
    await POST(
      request({
        values: validValues,
        context: { source: "/preisrechner", honeypot: "", details: { Fläche: "300 m²" } },
      }),
    );
    const [, passedContext] = vi.mocked(dispatchContactRequest).mock.calls[0];
    expect(passedContext).toMatchObject({ source: "/preisrechner", details: { Fläche: "300 m²" } });
  });

  it("reicht kind: 'estimate' unverändert an dispatchContactRequest weiter", async () => {
    vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
    await POST(
      request({
        values: validValues,
        context: { source: "/preisrechner", honeypot: "", kind: "estimate" },
      }),
    );
    const [, passedContext] = vi.mocked(dispatchContactRequest).mock.calls[0];
    expect(passedContext).toMatchObject({ kind: "estimate" });
  });

  it("verwirft einen unbekannten kind-Wert, statt ihn durchzureichen", async () => {
    vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
    await POST(
      request({
        values: validValues,
        context: { source: "/kontakt", honeypot: "", kind: "irgendetwas" },
      }),
    );
    const [, passedContext] = vi.mocked(dispatchContactRequest).mock.calls[0] as [
      unknown,
      { kind?: string },
    ];
    expect(passedContext.kind).toBeUndefined();
  });

  describe("Rate-Limit", () => {
    function fromIp(ip: string, body: unknown): Request {
      return new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify(body),
      });
    }
    const valid = { values: validValues, context: { source: "/kontakt", honeypot: "" } };

    it("liefert 429 mit Retry-After, sobald dieselbe IP das Limit überschreitet", async () => {
      vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
      for (let i = 0; i < 6; i++) {
        expect((await POST(fromIp("198.51.100.1", valid))).status).toBe(200);
      }
      const blocked = await POST(fromIp("198.51.100.1", valid));
      expect(blocked.status).toBe(429);
      expect((await blocked.json()).error).toBe("rate_limited");
      expect(Number(blocked.headers.get("Retry-After"))).toBeGreaterThan(0);
      expect(dispatchContactRequest).toHaveBeenCalledTimes(6);
    });

    it("lässt eine andere IP weiterhin durch", async () => {
      vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
      for (let i = 0; i < 7; i++) await POST(fromIp("198.51.100.2", valid));
      expect((await POST(fromIp("198.51.100.3", valid))).status).toBe(200);
    });

    it("zählt ungültige Anfragen und Honeypot-Treffer nicht mit", async () => {
      vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
      for (let i = 0; i < 10; i++) {
        await POST(fromIp("198.51.100.4", { values: { ...validValues, name: "" }, context: { honeypot: "" } }));
        await POST(fromIp("198.51.100.4", { values: validValues, context: { honeypot: "bot" } }));
      }
      expect((await POST(fromIp("198.51.100.4", valid))).status).toBe(200);
    });

    it("begrenzt nicht, wenn keine IP bekannt ist", async () => {
      vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
      for (let i = 0; i < 10; i++) {
        expect((await POST(request(valid))).status).toBe(200);
      }
    });
  });

  it("verwirft details-Einträge, die keine Strings sind", async () => {
    vi.mocked(dispatchContactRequest).mockResolvedValue(undefined);
    await POST(
      request({
        values: validValues,
        context: { source: "/preisrechner", honeypot: "", details: { gueltig: "ok", ungueltig: 5 } },
      }),
    );
    const [, passedContext] = vi.mocked(dispatchContactRequest).mock.calls[0] as [
      unknown,
      { details?: Record<string, string> },
    ];
    expect(passedContext.details).toEqual({ gueltig: "ok" });
  });
});
