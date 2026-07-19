import { photos } from "@/data/photos";

/**
 * Featured photo per service — each maps to a genuinely fitting, verified
 * stock photo (see docs/IMAGES.md for the full source list).
 */
export const servicePhotos: Record<string, (typeof photos)[keyof typeof photos]> = {
  "gebaeudereinigung-berlin": photos.buildingFacade,
  "bueroreinigung-berlin": photos.officeCleaningTeam,
  "praxisreinigung-berlin": photos.medicalPracticeInterior,
  "unterhaltsreinigung-berlin": photos.routineCleaningTeam,
  "treppenhausreinigung-berlin": photos.brightStaircase,
  "fensterreinigung-berlin": photos.windowCleaning,
  "glasreinigung-berlin": photos.facadeCleaning,
  "grundreinigung-berlin": photos.moppingFloor,
  "kita-und-schulreinigung-berlin": photos.kitaInterior,
  "kanzleireinigung-berlin": photos.lawOfficeReception,
  "fitnessstudioreinigung-berlin": photos.gymInterior,
  "autohausreinigung-berlin": photos.carShowroom,
};
