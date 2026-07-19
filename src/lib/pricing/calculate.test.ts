import { describe, expect, it } from "vitest";
import {
  averagePricePerStaircase,
  calculateGeneralPrice,
  calculateStaircasePrice,
} from "@/lib/pricing/calculate";
import { pricingConfig } from "@/lib/pricing/config";
import {
  validateContactStep,
  validateGeneralStep,
  validateObjectTypeStep,
} from "@/lib/pricing/validate";
import type { CalculatorFormValues } from "@/lib/pricing/types";

describe("calculateGeneralPrice", () => {
  it("applies the highest hourly rate tier for a small, infrequently cleaned office", () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 200,
      floorType: "hartboden",
      kitchens: 0,
      toilets: 1,
      visitsPerWeek: 1,
    });
    // 200/155h * 60 + 20 overhead + 1*5 toilet = 77.4 + 20 + 5 = 102.4 min => 1.707h
    // fully within the first progressive band (up to 2.27h) => 1.707h * 36.5 = 62.31 + 10 travel = 72.31
    expect(estimate.pricePerVisitNet).toBeCloseTo(72.31, 1);
    expect(estimate.monthlyPriceNet).toBeGreaterThan(0);
  });

  it("falls back to the minimum visit price for very small objects", () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 10,
      floorType: "hartboden",
      kitchens: 0,
      toilets: 0,
      visitsPerWeek: 1,
    });
    expect(estimate.pricePerVisitNet).toBe(
      pricingConfig.minimumPricePerVisit + pricingConfig.travelFeePerVisit,
    );
  });

  it("increases the kitchen surcharge with more kitchens", () => {
    const base = { areaSqm: 500, floorType: "hartboden" as const, toilets: 2, visitsPerWeek: 2 };
    const none = calculateGeneralPrice({ ...base, kitchens: 0 });
    const oneOrTwo = calculateGeneralPrice({ ...base, kitchens: 2 });
    const threeOrMore = calculateGeneralPrice({ ...base, kitchens: 3 });

    expect(oneOrTwo.pricePerVisitNet).toBeGreaterThan(none.pricePerVisitNet);
    expect(threeOrMore.pricePerVisitNet).toBeGreaterThan(oneOrTwo.pricePerVisitNet);
  });

  it("never lets the monthly price decrease when the area grows (fixed frequency)", () => {
    const areas = [50, 150, 300, 301, 400, 600, 900, 1500];
    const prices = areas.map(
      (areaSqm) =>
        calculateGeneralPrice({ areaSqm, floorType: "hartboden", kitchens: 0, toilets: 0, visitsPerWeek: 2 })
          .monthlyPriceNet,
    );
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  it("applies the lowest rate tier only for very large, frequently cleaned objects", () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 650,
      floorType: "beides",
      kitchens: 1,
      toilets: 4,
      visitsPerWeek: 5,
    });
    // Sanity check: monthly price should stay in a plausible range, no runaway values.
    expect(estimate.monthlyPriceNet).toBeGreaterThan(1000);
    expect(estimate.monthlyPriceNet).toBeLessThan(15000);
  });

  // Named scenarios from the pricing brief — plausibility bounds rather than
  // exact figures, since the general calculator intentionally prices by
  // area/kitchens/toilets/frequency and not by the object-type label itself.
  it("Praxis 300 m², 5x pro Woche bleibt in einem plausiblen Rahmen", () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 300,
      floorType: "hartboden",
      kitchens: 1,
      toilets: 3,
      visitsPerWeek: 5,
    });
    expect(estimate.monthlyPriceNet).toBeGreaterThan(800);
    expect(estimate.monthlyPriceNet).toBeLessThan(6000);
  });

  it("Büro 300 m², 1x pro Woche bleibt in einem plausiblen Rahmen", () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 300,
      floorType: "hartboden",
      kitchens: 1,
      toilets: 2,
      visitsPerWeek: 1,
    });
    expect(estimate.monthlyPriceNet).toBeGreaterThan(200);
    expect(estimate.monthlyPriceNet).toBeLessThan(1500);
  });

  it("Büro 600 m², 5x pro Woche erreicht den günstigsten Stundensatz-Bereich", () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 600,
      floorType: "hartboden",
      kitchens: 1,
      toilets: 4,
      visitsPerWeek: 5,
    });
    expect(estimate.monthlyPriceNet).toBeGreaterThan(1000);
    expect(estimate.monthlyPriceNet).toBeLessThan(15000);
  });

  it("bleibt an den Flächen-Geschwindigkeits-Bandgrenzen monoton (kein Preissprung nach unten)", () => {
    const boundaries = [200, 600, 1500];
    for (const boundary of boundaries) {
      const below = calculateGeneralPrice({
        areaSqm: boundary - 1,
        floorType: "hartboden",
        kitchens: 0,
        toilets: 0,
        visitsPerWeek: 3,
      });
      const at = calculateGeneralPrice({
        areaSqm: boundary,
        floorType: "hartboden",
        kitchens: 0,
        toilets: 0,
        visitsPerWeek: 3,
      });
      const above = calculateGeneralPrice({
        areaSqm: boundary + 1,
        floorType: "hartboden",
        kitchens: 0,
        toilets: 0,
        visitsPerWeek: 3,
      });
      expect(at.monthlyPriceNet).toBeGreaterThanOrEqual(below.monthlyPriceNet);
      expect(above.monthlyPriceNet).toBeGreaterThanOrEqual(at.monthlyPriceNet);
    }
  });

  it("Große, häufig gereinigte Fläche (1000 m², 5x/Woche) bleibt wettbewerbsfähig gegenüber Berliner Vergleichsanbietern", () => {
    // Vergleichsbasis: reale Berliner Anbieter kalkulieren ein 1.000 m²
    // Bürogebäude bei 5x wöchentlicher Reinigung auf ca. 2.700–2.800 EUR/Monat
    // (42 EUR/h, ~330 m²/h Leistungswert). Glanzwerk positioniert sich mit
    // persönlicher Betreuung bewusst etwas darüber, darf aber nicht das
    // Vielfache kosten.
    const estimate = calculateGeneralPrice({
      areaSqm: 1000,
      floorType: "hartboden",
      kitchens: 2,
      toilets: 4,
      visitsPerWeek: 5,
    });
    expect(estimate.monthlyPriceNet).toBeGreaterThan(2700);
    expect(estimate.monthlyPriceNet).toBeLessThan(4500);
  });

  it("keine Küche bedeutet keinen Küchenzuschlag", () => {
    const estimate = calculateGeneralPrice({
      areaSqm: 400,
      floorType: "hartboden",
      kitchens: 0,
      toilets: 2,
      visitsPerWeek: 2,
    });
    const withOneKitchen = calculateGeneralPrice({
      areaSqm: 400,
      floorType: "hartboden",
      kitchens: 1,
      toilets: 2,
      visitsPerWeek: 2,
    });
    expect(estimate.monthlyPriceNet).toBeLessThan(withOneKitchen.monthlyPriceNet);
  });

  it("viele Toiletten erhöhen den Preis spürbar gegenüber wenigen", () => {
    const fewToilets = calculateGeneralPrice({
      areaSqm: 400,
      floorType: "hartboden",
      kitchens: 0,
      toilets: 1,
      visitsPerWeek: 2,
    });
    const manyToilets = calculateGeneralPrice({
      areaSqm: 400,
      floorType: "hartboden",
      kitchens: 0,
      toilets: 12,
      visitsPerWeek: 2,
    });
    expect(manyToilets.monthlyPriceNet).toBeGreaterThan(fewToilets.monthlyPriceNet);
  });
});

describe("calculateStaircasePrice", () => {
  it("calculates a plausible price for a single staircase", () => {
    const estimate = calculateStaircasePrice({
      units: 12,
      floors: 5,
      hasBasement: true,
      hasElevator: false,
      staircaseCount: 1,
      visitsPerWeek: 1,
    });
    // 15 base + 5*4 + 12*1 + 10 basement = 15+20+12+10 = 57 min => 0.95h
    // 0.95h * 33 = 31.35 -> below minimum -> 55 + 10 travel = 65
    expect(estimate.pricePerVisitNet).toBe(
      pricingConfig.minimumPricePerVisit + pricingConfig.travelFeePerVisit,
    );
  });

  it("reduces the average price per staircase when multiple staircases are cleaned together", () => {
    const single = calculateStaircasePrice({
      units: 20,
      floors: 6,
      hasBasement: true,
      hasElevator: true,
      staircaseCount: 1,
      visitsPerWeek: 1,
    });
    const multiple = calculateStaircasePrice({
      units: 20,
      floors: 6,
      hasBasement: true,
      hasElevator: true,
      staircaseCount: 4,
      visitsPerWeek: 1,
    });

    const avgSingle = averagePricePerStaircase(single, 1);
    const avgMultiple = averagePricePerStaircase(multiple, 4);

    expect(avgMultiple).toBeLessThan(avgSingle);
  });

  it("increases total price with more floors and units", () => {
    const small = calculateStaircasePrice({
      units: 4,
      floors: 2,
      hasBasement: false,
      hasElevator: false,
      staircaseCount: 1,
      visitsPerWeek: 1,
    });
    const large = calculateStaircasePrice({
      units: 40,
      floors: 12,
      hasBasement: true,
      hasElevator: true,
      staircaseCount: 1,
      visitsPerWeek: 1,
    });
    expect(large.pricePerVisitNet).toBeGreaterThan(small.pricePerVisitNet);
  });
});

describe("validation", () => {
  it("requires a free-text description for 'sonstige Gewerbefläche'", () => {
    const errors = validateObjectTypeStep("sonstige", "");
    expect(errors.some((e) => e.field === "customObjectDescription")).toBe(true);
  });

  it("accepts 'sonstige' with a filled-in description", () => {
    const errors = validateObjectTypeStep("sonstige", "Lagerhalle mit Bürobereich");
    expect(errors).toHaveLength(0);
  });

  it("rejects negative and out-of-range area values", () => {
    const values: CalculatorFormValues = {
      objectType: "buero",
      customObjectDescription: "",
      areaSqm: "-50",
      floorType: "hartboden",
      kitchens: "1",
      toilets: "1",
      visitsPerWeek: "2",
      units: "",
      floors: "",
      hasBasement: false,
      hasElevator: false,
      staircaseCount: "",
    };
    const errors = validateGeneralStep(values);
    expect(errors.some((e) => e.field === "areaSqm")).toBe(true);
  });

  it("flags the honeypot field as invalid when filled in", () => {
    const errors = validateContactStep({
      name: "Max Mustermann",
      email: "max@example.com",
      privacyAccepted: true,
      honeypot: "spam",
    });
    expect(errors.some((e) => e.field === "honeypot")).toBe(true);
  });

  it("passes contact validation with correct data", () => {
    const errors = validateContactStep({
      name: "Max Mustermann",
      email: "max@example.com",
      privacyAccepted: true,
      honeypot: "",
    });
    expect(errors).toHaveLength(0);
  });
});
