/** Zentrale Preiskonfiguration — Richtwerte, ersetzen keine Kalkulation vor Ort. */

export const pricingConfig = {
  /** Durchschnittliche Reinigungsleistung in m² pro Stunde (Richtwert 150–160). */
  sqmPerHour: 155,

  /** Pauschaler Zeitaufwand pro Einsatz in Minuten (Rüstzeit, Material, Wege). */
  baseOverheadMinutes: 20,

  /** Zusätzlicher Zeitaufwand pro Toilette in Minuten. */
  minutesPerToilet: 5,

  /** Küchenzuschlag als Prozentsatz auf den Arbeitspreis. */
  kitchenSurcharge: {
    none: 0,
    oneOrTwo: 0.03,
    threeOrMore: 0.05,
  },

  /** Mindestpreis pro Reinigungseinsatz in Euro netto (vor Fahrtkosten). */
  minimumPricePerVisit: 55,

  /** Fahrtkostenpauschale pro Einsatz in Euro netto. */
  travelFeePerVisit: 10,

  /** Durchschnittliche Wochen pro Monat für die Hochrechnung auf den Monatspreis. */
  weeksPerMonth: 4.33,

  /**
   * Progressive Stundensatz-Bänder (wie Steuerprogression): nur der
   * Stundenanteil oberhalb einer Schwelle wird günstiger abgerechnet, damit
   * ein zusätzlicher m² oder Tag nie zu einem niedrigeren Gesamtpreis führt.
   */
  progressiveRateBands: [
    { uptoWeeklyHours: 2.27, rate: 36.5 },
    { uptoWeeklyHours: 8, rate: 34.5 },
    { uptoWeeklyHours: 21, rate: 32 },
    { uptoWeeklyHours: Infinity, rate: 30 },
  ],

  /** Grenzwerte für Eingaben (Validierung). */
  limits: {
    areaSqm: { min: 10, max: 20000 },
    toilets: { min: 0, max: 50 },
    kitchens: { min: 0, max: 20 },
    visitsPerWeek: { min: 1, max: 7 },
    units: { min: 1, max: 500 },
    floors: { min: 1, max: 50 },
    staircases: { min: 1, max: 50 },
  },

  /** Treppenhausreinigung: Zeitbausteine in Minuten pro Treppenhaus. */
  staircase: {
    baseMinutes: 15,
    minutesPerFloor: 4,
    minutesPerUnit: 1,
    basementMinutes: 10,
    elevatorMinutes: 8,
    /** Stundensatz für die Treppenhausreinigung. */
    hourlyRate: 33,
    /**
     * Anteiliger Aufwand für jedes weitere Treppenhaus im selben Objekt
     * (1 = kein Rabatt, 0.8 = jedes weitere Treppenhaus kostet 80 % eines
     * eigenständigen Treppenhauses, da Anfahrt und Organisation geteilt werden).
     */
    additionalStaircaseFactor: 0.8,
  },
} as const;

export type ObjectType =
  | "buero"
  | "arztpraxis"
  | "kanzlei"
  | "fitnessstudio"
  | "autohaus"
  | "kita"
  | "treppenhaus"
  | "sonstige";

export const objectTypeLabels: Record<ObjectType, string> = {
  buero: "Büro",
  arztpraxis: "Arztpraxis",
  kanzlei: "Kanzlei",
  fitnessstudio: "Fitnessstudio",
  autohaus: "Autohaus",
  kita: "Kita",
  treppenhaus: "Treppenhaus",
  sonstige: "Sonstige Gewerbefläche",
};

export type FloorType = "teppich" | "hartboden" | "beides";

export const floorTypeLabels: Record<FloorType, string> = {
  teppich: "Teppich",
  hartboden: "Hartboden",
  beides: "Teppich und Hartboden",
};
