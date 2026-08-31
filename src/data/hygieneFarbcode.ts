/**
 * Farbcodierungssystem für Reinigungstücher/Mopps, das Glanzwerk in der
 * Praxis einsetzt (Bestätigung durch den Auftraggeber, 26.08.2026) – kein
 * hausinternes Konzept, sondern die in der Gebäudereinigung verbreitete
 * Vier-Farben-Zuordnung zur Vermeidung von Kreuzkontamination.
 *
 * Einzige Quelle für Farbe/Label/Beschreibung – Komponente und alle Seiten,
 * die das System zeigen, lesen von hier, damit die Zuordnung überall
 * identisch bleibt.
 */
export interface HygieneColor {
  name: string;
  label: string;
  description: string;
  swatchClassName: string;
}

export const hygieneColors: HygieneColor[] = [
  {
    name: "Rot",
    label: "Hochrisikobereiche",
    description: "Toiletten und Sanitäranlagen.",
    swatchClassName: "bg-red-600",
  },
  {
    name: "Gelb",
    label: "Waschbereiche",
    description: "Waschbecken, Armaturen und Spiegel.",
    swatchClassName: "bg-amber-400",
  },
  {
    name: "Blau",
    label: "Allgemeine Bereiche",
    description: "Böden, Türen und Oberflächen in Fluren und Büros.",
    swatchClassName: "bg-sky-600",
  },
  {
    name: "Grün",
    label: "Küchen- & Lebensmittelbereiche",
    description: "Küchen, Kantinen und alle Bereiche mit Lebensmittelkontakt.",
    swatchClassName: "bg-emerald-600",
  },
];

export const hygieneColorBenefits: string[] = [
  "Kreuzkontamination zwischen Risikobereichen wird vermieden",
  "Sofort erkennbar für jede Reinigungskraft, unabhängig von Sprache oder Erfahrung",
  "Orientiert an anerkannten Hygienestandards für die Gebäudereinigung",
  "Neue Teammitglieder sind schneller eingearbeitet, weil die Zuordnung selbsterklärend ist",
];
