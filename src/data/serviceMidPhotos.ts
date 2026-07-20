import { photos } from "@/data/photos";

/**
 * Zweites, unterstützendes Bild im Mittelbereich der Leistungsseiten.
 * Seit der Hero-Korrektur (Juli 2026) sind das genau die Fotos, die vor
 * dem Bilderpaket als Hero dieser Leistung dienten – fachlich passend,
 * bereits geprüft, keine neue Bildbeschaffung nötig. Gastronomiereinigung
 * ist neu und hat kein Alt-Foto zum Wiederverwenden.
 */
export const serviceMidPhotos: Record<string, (typeof photos)[keyof typeof photos]> = {
  "bueroreinigung-berlin": photos.officeCleaningTeam,
  "praxisreinigung-berlin": photos.medicalPracticeInterior,
  "kita-und-schulreinigung-berlin": photos.kitaInterior,
  "treppenhausreinigung-berlin": photos.brightStaircase,
  "glas-und-fensterreinigung-berlin": photos.windowCleaning,
  "grundreinigung-berlin": photos.moppingFloor,
  "autohausreinigung-berlin": photos.carShowroom,
  "unterhaltsreinigung-berlin": photos.routineCleaningTeam,
  "gebaeudereinigung-berlin": photos.buildingFacade,
};
