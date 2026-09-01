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
 * Bilderpaket) the meisten Services nutzen ihr eigenes lokales `hero.*` aus
 * `serviceContentPhotos.ts`. "kanzleireinigung-berlin" erhielt im August
 * 2026 ebenfalls ein eigenes lokales Foto (vorher Pexels-Hotlink).
 * "fitnessstudioreinigung-berlin" ist weiterhin nicht im Bilderpaket
 * enthalten (kein passendes Motiv verfügbar) und behält ihr bisheriges Foto.
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
  "kanzleireinigung-berlin": serviceContentPhotos["kanzleireinigung-berlin"].hero,
  "fitnessstudioreinigung-berlin": photos.gymInterior,
  "autohausreinigung-berlin": serviceContentPhotos["autohausreinigung-berlin"].hero,
  "gastronomiereinigung-berlin": serviceContentPhotos["gastronomiereinigung-berlin"].hero,
};
