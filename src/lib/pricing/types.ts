import type { FloorType, ObjectType } from "@/lib/pricing/config";

export interface GeneralCalculationInput {
  areaSqm: number;
  floorType: FloorType;
  kitchens: number;
  toilets: number;
  visitsPerWeek: number;
}

export interface StaircaseCalculationInput {
  units: number;
  floors: number;
  hasBasement: boolean;
  hasElevator: boolean;
  staircaseCount: number;
  visitsPerWeek: number;
}

export interface PriceEstimate {
  /** Geschätzter Monatspreis netto – das Hauptergebnis für den Nutzer. */
  monthlyPriceNet: number;
  /** Preis pro Reinigungseinsatz netto (inkl. Fahrtkostenpauschale). */
  pricePerVisitNet: number;
  visitsPerWeek: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface CalculatorFormValues {
  objectType: ObjectType | "";
  customObjectDescription: string;
  areaSqm: string;
  floorType: FloorType | "";
  kitchens: string;
  toilets: string;
  visitsPerWeek: string;
  units: string;
  floors: string;
  hasBasement: boolean;
  hasElevator: boolean;
  staircaseCount: string;
}
