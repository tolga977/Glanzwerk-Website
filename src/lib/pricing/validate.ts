import { pricingConfig, type ObjectType } from "@/lib/pricing/config";
import type { CalculatorFormValues, ValidationError } from "@/lib/pricing/types";

function parsePositiveNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return num;
}

function checkRange(
  field: string,
  label: string,
  value: string,
  { min, max }: { min: number; max: number },
): ValidationError | null {
  const num = parsePositiveNumber(value);
  if (num === null) {
    return { field, message: `Bitte geben Sie ${label} an.` };
  }
  if (num < 0) {
    return { field, message: `${label} darf nicht negativ sein.` };
  }
  if (num < min || num > max) {
    return {
      field,
      message: `${label} sollte zwischen ${min} und ${max} liegen.`,
    };
  }
  return null;
}

export function validateObjectTypeStep(
  objectType: ObjectType | "",
  customObjectDescription: string,
): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!objectType) {
    errors.push({ field: "objectType", message: "Bitte wählen Sie eine Objektart aus." });
    return errors;
  }
  if (objectType === "sonstige" && customObjectDescription.trim().length === 0) {
    errors.push({
      field: "customObjectDescription",
      message: "Bitte beschreiben Sie kurz Ihre Gewerbefläche.",
    });
  }
  return errors;
}

export function validateGeneralStep(values: CalculatorFormValues): ValidationError[] {
  const errors: ValidationError[] = [];
  const { limits } = pricingConfig;

  const area = checkRange("areaSqm", "die Fläche in m²", values.areaSqm, limits.areaSqm);
  if (area) errors.push(area);

  if (!values.floorType) {
    errors.push({ field: "floorType", message: "Bitte wählen Sie eine Bodenart aus." });
  }

  const kitchens = checkRange("kitchens", "die Anzahl Küchen", values.kitchens, limits.kitchens);
  if (kitchens) errors.push(kitchens);

  const toilets = checkRange("toilets", "die Anzahl Toiletten", values.toilets, limits.toilets);
  if (toilets) errors.push(toilets);

  const visits = checkRange(
    "visitsPerWeek",
    "die Reinigungshäufigkeit",
    values.visitsPerWeek,
    limits.visitsPerWeek,
  );
  if (visits) errors.push(visits);

  return errors;
}

export function validateStaircaseStep(values: CalculatorFormValues): ValidationError[] {
  const errors: ValidationError[] = [];
  const { limits } = pricingConfig;

  const units = checkRange("units", "die Anzahl Wohneinheiten", values.units, limits.units);
  if (units) errors.push(units);

  const floors = checkRange("floors", "die Anzahl Etagen", values.floors, limits.floors);
  if (floors) errors.push(floors);

  const staircaseCount = checkRange(
    "staircaseCount",
    "die Anzahl Treppenhäuser",
    values.staircaseCount,
    limits.staircases,
  );
  if (staircaseCount) errors.push(staircaseCount);

  const visits = checkRange(
    "visitsPerWeek",
    "die Reinigungshäufigkeit",
    values.visitsPerWeek,
    limits.visitsPerWeek,
  );
  if (visits) errors.push(visits);

  return errors;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactStep(values: {
  name: string;
  email: string;
  privacyAccepted: boolean;
  honeypot: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (values.honeypot.trim().length > 0) {
    // Bot-Formularausfüllung: Feld ist für Menschen unsichtbar und darf nie befüllt sein.
    errors.push({ field: "honeypot", message: "Ungültige Anfrage." });
  }
  if (!values.name.trim()) {
    errors.push({ field: "name", message: "Bitte geben Sie Ihren Namen an." });
  }
  if (!values.email.trim()) {
    errors.push({ field: "email", message: "Bitte geben Sie Ihre E-Mail-Adresse an." });
  } else if (!emailPattern.test(values.email)) {
    errors.push({ field: "email", message: "Bitte geben Sie eine gültige E-Mail-Adresse an." });
  }
  if (!values.privacyAccepted) {
    errors.push({
      field: "privacyAccepted",
      message: "Bitte bestätigen Sie die Datenschutzerklärung.",
    });
  }

  return errors;
}
