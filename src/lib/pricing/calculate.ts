import { pricingConfig } from "@/lib/pricing/config";
import type {
  GeneralCalculationInput,
  PriceEstimate,
  StaircaseCalculationInput,
} from "@/lib/pricing/types";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function kitchenSurchargeFor(kitchens: number): number {
  if (kitchens <= 0) return pricingConfig.kitchenSurcharge.none;
  if (kitchens <= 2) return pricingConfig.kitchenSurcharge.oneOrTwo;
  return pricingConfig.kitchenSurcharge.threeOrMore;
}

/** Progressive Flächen-Zeit (wie Steuerprogression): nur der Flächenanteil
 * oberhalb einer Schwelle nutzt die schnellere Reinigungsleistung, damit mehr
 * Fläche nie zu weniger Zeit führt. */
function progressiveCleaningMinutes(areaSqm: number): number {
  let remainingSqm = areaSqm;
  let previousThreshold = 0;
  let minutes = 0;

  for (const band of pricingConfig.areaSpeedBands) {
    const bandCapacity = band.uptoSqm - previousThreshold;
    const sqmInBand = Math.min(remainingSqm, bandCapacity);
    if (sqmInBand > 0) {
      minutes += (sqmInBand / band.sqmPerHour) * 60;
      remainingSqm -= sqmInBand;
    }
    previousThreshold = band.uptoSqm;
    if (remainingSqm <= 0) break;
  }

  return minutes;
}

/** Progressive Abrechnung (wie Steuerprogression) — Preis sinkt nie bei mehr Stunden. */
function progressiveLaborCost(totalHours: number): number {
  let remainingHours = totalHours;
  let previousThreshold = 0;
  let cost = 0;

  for (const band of pricingConfig.progressiveRateBands) {
    const bandCapacity = band.uptoWeeklyHours - previousThreshold;
    const hoursInBand = Math.min(remainingHours, bandCapacity);
    if (hoursInBand > 0) {
      cost += hoursInBand * band.rate;
      remainingHours -= hoursInBand;
    }
    previousThreshold = band.uptoWeeklyHours;
    if (remainingHours <= 0) break;
  }

  return cost;
}

/**
 * Berechnet den geschätzten Preis für flächenbasierte Objektarten
 * (Büro, Praxis, Kanzlei, Fitnessstudio, Autohaus, Kita, sonstige Gewerbefläche).
 */
export function calculateGeneralPrice(input: GeneralCalculationInput): PriceEstimate {
  const { areaSqm, kitchens, toilets, visitsPerWeek } = input;

  const cleaningMinutes = progressiveCleaningMinutes(areaSqm);
  const toiletMinutes = toilets * pricingConfig.minutesPerToilet;
  const totalMinutesPerVisit = pricingConfig.baseOverheadMinutes + cleaningMinutes + toiletMinutes;
  const hoursPerVisit = totalMinutesPerVisit / 60;

  const weeklyHours = hoursPerVisit * visitsPerWeek;
  const surcharge = kitchenSurchargeFor(kitchens);

  // Wöchentliche Arbeitskosten progressiv über alle Einsätze berechnen und
  // gleichmäßig auf die Einsätze der Woche verteilen.
  const weeklyLaborCost = progressiveLaborCost(weeklyHours) * (1 + surcharge);
  const perVisitLaborCost = weeklyLaborCost / visitsPerWeek;

  const pricePerVisitNet = round2(
    Math.max(perVisitLaborCost, pricingConfig.minimumPricePerVisit) + pricingConfig.travelFeePerVisit,
  );

  const monthlyPriceNet = round2(pricePerVisitNet * visitsPerWeek * pricingConfig.weeksPerMonth);

  return {
    monthlyPriceNet,
    pricePerVisitNet,
    visitsPerWeek,
    // Reine Kennzeichnung, kein Eingriff in den Preis: die Anzeige entscheidet,
    // ob sie einen Wert oder den Hinweis auf den Mindestauftrag zeigt. Die
    // Treppenhausberechnung weiter unten setzt das Feld bewusst nicht.
    belowMinimumOrder: monthlyPriceNet < pricingConfig.minimumMonthlyOrderNet,
  };
}

/**
 * Berechnet den geschätzten Preis für die Treppenhausreinigung, die bewusst
 * nicht primär über die Quadratmeterzahl, sondern über Wohneinheiten, Etagen
 * und Ausstattung kalkuliert wird.
 */
export function calculateStaircasePrice(input: StaircaseCalculationInput): PriceEstimate {
  const { units, floors, hasBasement, hasElevator, staircaseCount, visitsPerWeek } = input;
  const { staircase } = pricingConfig;

  const minutesPerStaircase =
    staircase.baseMinutes +
    floors * staircase.minutesPerFloor +
    units * staircase.minutesPerUnit +
    (hasBasement ? staircase.basementMinutes : 0) +
    (hasElevator ? staircase.elevatorMinutes : 0);

  const hoursPerStaircase = minutesPerStaircase / 60;
  const priceFirstStaircase = hoursPerStaircase * staircase.hourlyRate;

  // Jedes weitere Treppenhaus im selben Objekt kostet anteilig weniger, da
  // Anfahrt und Organisation geteilt werden.
  const additionalStaircases = Math.max(staircaseCount - 1, 0);
  const laborPrice =
    priceFirstStaircase + additionalStaircases * priceFirstStaircase * staircase.additionalStaircaseFactor;

  const pricePerVisitNet = round2(
    Math.max(laborPrice, pricingConfig.minimumPricePerVisit) + pricingConfig.travelFeePerVisit,
  );
  const monthlyPriceNet = round2(pricePerVisitNet * visitsPerWeek * pricingConfig.weeksPerMonth);

  return { monthlyPriceNet, pricePerVisitNet, visitsPerWeek };
}

/** Durchschnittlicher Preis pro Treppenhaus, gerundet auf 2 Nachkommastellen. */
export function averagePricePerStaircase(estimate: PriceEstimate, staircaseCount: number): number {
  if (staircaseCount <= 0) return estimate.pricePerVisitNet;
  return round2(estimate.pricePerVisitNet / staircaseCount);
}
