import { photos } from "@/data/photos";
import { serviceContentPhotos } from "@/data/serviceContentPhotos";

interface Photo {
  src: string;
  alt: string;
  /**
   * CSS object-position, wo geprüft (siehe `ServiceContentPhoto` in
   * serviceContentPhotos.ts). Optional, weil die beiden Bilder aus
   * `@/data/photos` (Kanzlei-, Fitnessstudioreinigung) keine eigene Angabe
   * mitbringen und beim Standardwert der Bildmitte bleiben.
   */
  objectPosition?: string;
}

/**
 * Featured (hero) photo per service. As of Juli 2026 (korrigiertes
 * Bilderpaket) the 10 services covered by the package use their dedicated
 * local `hero.png` from `serviceContentPhotos.ts`, explicitly replacing
 * the previous Unsplash/Pexels hero photo per the operator's correction.
 * "kanzleireinigung-berlin" and "fitnessstudioreinigung-berlin" were not
 * part of the package and keep their existing photo unchanged.
 */
export const servicePhotos: Record<string, Photo> = {
  "gebaeudereinigung-berlin": serviceContentPhotos["gebaeudereinigung-berlin"].hero,
  "bueroreinigung-berlin": serviceContentPhotos["bueroreinigung-berlin"].hero,
  "praxisreinigung-berlin": serviceContentPhotos["praxisreinigung-berlin"].hero,
  "unterhaltsreinigung-berlin": serviceContentPhotos["unterhaltsreinigung-berlin"].hero,
  "treppenhausreinigung-berlin": serviceContentPhotos["treppenhausreinigung-berlin"].hero,
  "glas-und-fensterreinigung-berlin": serviceContentPhotos["glas-und-fensterreinigung-berlin"].hero,
  "grundreinigung-berlin": serviceContentPhotos["grundreinigung-berlin"].hero,
  "kita-und-schulreinigung-berlin": serviceContentPhotos["kita-und-schulreinigung-berlin"].hero,
  "kanzleireinigung-berlin": photos.lawOfficeReception,
  "fitnessstudioreinigung-berlin": photos.gymInterior,
  "autohausreinigung-berlin": serviceContentPhotos["autohausreinigung-berlin"].hero,
  "gastronomiereinigung-berlin": serviceContentPhotos["gastronomiereinigung-berlin"].hero,
};
