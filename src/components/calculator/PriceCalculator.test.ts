import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildContactPayload, resolveObjectLabel } from "@/components/calculator/PriceCalculator";
import { dispatchContactRequest } from "@/lib/mail/dispatch";
import { calculateGeneralPrice } from "@/lib/pricing/calculate";
import type { CalculatorFormValues, PriceEstimate } from "@/lib/pricing/types";

/**
 * Prüft ausschließlich die neu hinzugekommene Übertragung der bereits im
 * Preisrechner vorhandenen Daten an `/api/contact` — nicht die Preislogik
 * selbst (`calculateGeneralPrice`/`calculateStaircasePrice` sind
 * unverändert und bleiben ungetestet hier, dafür existieren ihre eigenen
 * Berechnungen unangetastet in `src/lib/pricing/`).
 *
 * Reine Funktionsprüfung ohne Rendering: das Projekt hat weder jsdom noch
 * React Testing Library installiert, `resolveObjectLabel`/
 * `buildContactPayload` sind deshalb bewusst als eigenständige, exportierte
 * Funktionen statt Komponenten-Closures gebaut.
 */

const baseValues: CalculatorFormValues = {
  objectType: "",
  customObjectDescription: "",
  areaSqm: "",
  floorType: "",
  kitchens: "0",
  toilets: "1",
  visitsPerWeek: "1",
  units: "",
  floors: "",
  hasBasement: false,
  hasElevator: false,
  staircaseCount: "1",
};

const contact = {
  name: "Max Mustermann",
  email: "max@example.com",
  phone: "030 1234567",
  privacyAccepted: true,
};

const generalEstimate: PriceEstimate = {
  monthlyPriceNet: 1225,
  pricePerVisitNet: 94.2,
  visitsPerWeek: 3,
};

describe("resolveObjectLabel", () => {
  it("liefert die Objektart-Bezeichnung für eine bekannte Objektart", () => {
    expect(resolveObjectLabel({ ...baseValues, objectType: "buero" })).toBe("Büro");
  });

  it("liefert die Freitextbeschreibung bei 'sonstige'", () => {
    const label = resolveObjectLabel({
      ...baseValues,
      objectType: "sonstige",
      customObjectDescription: "Lagerhalle mit Bürobereich",
    });
    expect(label).toBe("Lagerhalle mit Bürobereich");
  });

  it("liefert einen leeren String ohne gewählte Objektart", () => {
    expect(resolveObjectLabel(baseValues)).toBe("");
  });
});

describe("buildContactPayload", () => {
  it("überführt Kontaktdaten unverändert in requestValues", () => {
    const { requestValues } = buildContactPayload(
      { ...baseValues, objectType: "buero" },
      contact,
      false,
      generalEstimate,
    );
    expect(requestValues.name).toBe("Max Mustermann");
    expect(requestValues.email).toBe("max@example.com");
    expect(requestValues.phone).toBe("030 1234567");
    expect(requestValues.privacy).toBe(true);
  });

  it("setzt service auf die aufgelöste Objektart, nicht auf einen Leistungs-Slug", () => {
    const { requestValues } = buildContactPayload(
      { ...baseValues, objectType: "arztpraxis" },
      contact,
      false,
      generalEstimate,
    );
    expect(requestValues.service).toBe("Arztpraxis");
  });

  it("überträgt Fläche, Bodenart, Küchen und Toiletten für allgemeine Objekte", () => {
    const { details } = buildContactPayload(
      { ...baseValues, objectType: "buero", areaSqm: "300", floorType: "hartboden", kitchens: "1", toilets: "3" },
      contact,
      false,
      generalEstimate,
    );
    expect(details["Fläche"]).toBe("300 m²");
    expect(details["Bodenart"]).toBe("Hartboden");
    expect(details["Küchen"]).toBe("1");
    expect(details["Toiletten"]).toBe("3");
  });

  it("überträgt Wohneinheiten, Etagen und Treppenhäuser für Treppenhausreinigung", () => {
    const staircaseEstimate: PriceEstimate = {
      monthlyPriceNet: 0,
      pricePerVisitNet: 0,
      visitsPerWeek: 1,
    };
    const { details } = buildContactPayload(
      {
        ...baseValues,
        objectType: "treppenhaus",
        units: "12",
        floors: "5",
        staircaseCount: "2",
        hasBasement: true,
        hasElevator: false,
      },
      contact,
      true,
      staircaseEstimate,
    );
    expect(details["Wohneinheiten"]).toBe("12");
    expect(details["Etagen"]).toBe("5");
    expect(details["Treppenhäuser"]).toBe("2");
    expect(details["Keller vorhanden"]).toBe("ja");
    expect(details["Fahrstuhl vorhanden"]).toBe("nein");
    // Allgemeine Felder dürfen bei Treppenhausreinigung nicht auftauchen.
    expect(details["Fläche"]).toBeUndefined();
  });

  it("überträgt den berechneten Monatspreis, ohne ihn neu zu berechnen", () => {
    const { details } = buildContactPayload(
      { ...baseValues, objectType: "buero" },
      contact,
      false,
      generalEstimate,
    );
    expect(details["Geschätzter Monatspreis (netto)"]).toBe("1.225 €");
  });

  it("meldet 'unter Mindestauftragswert' statt einer erfundenen Zahl", () => {
    const belowMinimum: PriceEstimate = {
      monthlyPriceNet: 320,
      pricePerVisitNet: 74,
      visitsPerWeek: 1,
      belowMinimumOrder: true,
    };
    const { details } = buildContactPayload(
      { ...baseValues, objectType: "buero" },
      contact,
      false,
      belowMinimum,
    );
    expect(details["Geschätzter Monatspreis (netto)"]).toBe("unter Mindestauftragswert");
  });
});

/**
 * Phase 1D.1 – Regressionstest für den vollständigen Realtest-Fehler: der
 * manuelle Realtest zeigte eine Mail, die trotz reiner Preisrechner-Nutzung
 * als "Neue Website-Anfrage" ankam. Dieser Test verkettet exakt das, was
 * `PriceCalculator`s `sendEstimateNotification` tatsächlich aufruft
 * (`buildContactPayload` → `dispatchContactRequest`, mit demselben
 * `kind: "estimate"`-Kontext) und prüft die daraus tatsächlich entstehende
 * Brevo-Payload — nicht nur `dispatch.ts` isoliert wie in Phase 1D.
 */
describe("Preisrechner → Brevo: vollständige Pipeline (Phase 1D.1)", () => {
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

  it("eine abgeschlossene Preisrechner-Berechnung erzeugt nachweislich eine als Preisrechner gekennzeichnete Mail, keine Anfrage-Mail", async () => {
    const { requestValues, details } = buildContactPayload(
      { ...baseValues, objectType: "buero", areaSqm: "250", floorType: "hartboden", kitchens: "1", toilets: "2" },
      contact,
      false,
      generalEstimate,
    );

    fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));

    // Exakt der Kontext, den `sendEstimateNotification` in PriceCalculator.tsx baut.
    await dispatchContactRequest(requestValues, {
      source: "/preisrechner",
      honeypot: "",
      details,
      kind: "estimate",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.subject).toMatch(/^Preisrechner genutzt – Büro$/);
    expect(body.subject).not.toContain("Neue Website-Anfrage");
    expect(body.textContent).toContain("Ereignis: Preisrechner – Richtwert berechnet");
    expect(body.textContent).not.toContain("Ereignis: Website-Anfrage – abgeschickt");
    // Preisrechnerdaten bleiben vollständig erhalten.
    expect(body.textContent).toContain("Fläche: 250 m²");
  });

  /**
   * Phase 1E: 200 m²/1 Toilette/2× pro Woche lag mit ca. 616 € unter dem
   * ALTEN Mindestauftragswert (750 €) und wäre dort als "unter
   * Mindestauftragswert" ohne Zahl in der Mail gelandet. Unter dem neuen
   * Wert (599 €) ist das ein regulärer, unveränderter Preis — dieser Test
   * beweist, dass genau dieser tatsächlich berechnete Wert (nicht 750, nicht
   * "unter Mindestauftragswert") bis in die Brevo-Payload durchgereicht wird.
   */
  it("ein Ergebnis zwischen 599 € und dem alten Mindestwert von 750 € landet als echter Preis in der Mail, nicht als Mindestwert-Hinweis", async () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 200,
      floorType: "hartboden",
      kitchens: 0,
      toilets: 1,
      visitsPerWeek: 2,
    });
    expect(estimate.belowMinimumOrder).toBe(false);
    expect(estimate.monthlyPriceNet).toBeGreaterThan(599);
    expect(estimate.monthlyPriceNet).toBeLessThan(750);

    const { requestValues, details } = buildContactPayload(
      { ...baseValues, objectType: "buero", areaSqm: "200", floorType: "hartboden", kitchens: "0", toilets: "1", visitsPerWeek: "2" },
      contact,
      false,
      estimate,
    );

    fetchMock.mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 }));
    await dispatchContactRequest(requestValues, {
      source: "/preisrechner",
      honeypot: "",
      details,
      kind: "estimate",
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.textContent).toContain(
      `Geschätzter Monatspreis (netto): ${estimate.monthlyPriceNet.toLocaleString("de-DE", { maximumFractionDigits: 0 })} €`,
    );
    expect(body.textContent).not.toContain("unter Mindestauftragswert");
    expect(body.textContent).not.toContain("750");
  });
});
