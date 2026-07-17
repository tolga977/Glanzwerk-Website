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

/**
 * Rechnet Stunden progressiv über die konfigurierten Stundensatz-Bänder ab
 * (wie bei einer Steuerprogression): Nur der Stundenanteil oberhalb einer
 * Schwelle wird zum günstigeren Satz abgerechnet. Das garantiert, dass der
 * Gesamtpreis mit wachsendem Stundenvolumen niemals sinkt.
 */
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

  const cleaningMinutes = (areaSqm / pricingConfig.sqmPerHour) * 60;
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

  return { monthlyPriceNet, pricePerVisitNet, visitsPerWeek };
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
