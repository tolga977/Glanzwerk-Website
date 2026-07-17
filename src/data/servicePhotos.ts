import { photos } from "@/data/photos";

/**
 * Featured photo per service — each maps to a genuinely fitting, verified
 * stock photo (see docs/IMAGES.md for the full source list).
 */
export const servicePhotos: Record<string, (typeof photos)[keyof typeof photos]> = {
  "gebaeudereinigung-berlin": photos.buildingFacade,
  "bueroreinigung-berlin": photos.officeCleaning,
  "praxisreinigung-berlin": photos.practiceWaitingRoom,
  "unterhaltsreinigung-berlin": photos.modernOfficeInterior,
  "treppenhausreinigung-berlin": photos.staircase,
  "fensterreinigung-berlin": photos.windowCleaning,
  "glasreinigung-berlin": photos.windowCleaning,
  "grundreinigung-berlin": photos.emptyOfficeRoom,
  "kita-und-schulreinigung-berlin": photos.classroom,
  "kanzleireinigung-berlin": photos.conferenceRoom,
  "fitnessstudioreinigung-berlin": photos.gymInterior,
  "autohausreinigung-berlin": photos.carShowroom,
};
