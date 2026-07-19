/** Zentrale Preiskonfiguration — Richtwerte, ersetzen keine Kalkulation vor Ort. */

export const pricingConfig = {
  /**
   * Reinigungsleistung in m² pro Stunde, progressiv nach Fläche gestaffelt
   * (wie die Stundensatz-Bänder unten): größere, offenere Flächen werden pro
   * m² schneller gereinigt (weniger Ecken/Wände/Möblierung pro Quadratmeter).
   * Nur der Flächenanteil oberhalb einer Schwelle nutzt die schnellere Stufe,
   * damit mehr Fläche nie zu weniger Zeit/einem niedrigeren Preis führt.
   * Richtwerte orientieren sich an marktüblichen Leistungswerten für
   * Büroreinigung in Berlin (ca. 155–160 m²/h im Basisbereich bis ca.
   * 250–330 m²/h bei sehr großen, einfachen Flächen).
   */
  areaSpeedBands: [
    { uptoSqm: 200, sqmPerHour: 155 },
    { uptoSqm: 600, sqmPerHour: 220 },
    { uptoSqm: 1500, sqmPerHour: 280 },
    { uptoSqm: Infinity, sqmPerHour: 330 },
  ],

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
