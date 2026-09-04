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
