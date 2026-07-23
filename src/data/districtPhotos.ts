/**
 * Hero-Bilder für die zwölf allgemeinen Bezirksseiten (/standorte/[bezirk]).
 * Lokale Assets unter `public/images/standorte/`, vom Betreiber bereitgestellt
 * (Juli 2026). Nur auf den allgemeinen Bezirksseiten verwendet, nicht auf den
 * Ortsteilseiten oder den Leistung-Bezirk-Kombinationsseiten.
 */

export interface DistrictPhoto {
  src: string;
  alt: string;
  /** CSS object-position, individuell pro Bild geprüft, damit Türme/Kuppeln nicht abgeschnitten werden. */
  objectPosition: string;
}

export const districtPhotos: Record<string, DistrictPhoto> = {
  mitte: {
    src: "/images/standorte/berlin-mitte-hero.webp",
    alt: "Brandenburger Tor in Berlin-Mitte als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "75% 35%",
  },
  "charlottenburg-wilmersdorf": {
    src: "/images/standorte/charlottenburg-wilmersdorf-hero.webp",
    alt: "Schloss Charlottenburg in Berlin-Charlottenburg-Wilmersdorf als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "75% 30%",
  },
  "friedrichshain-kreuzberg": {
    src: "/images/standorte/friedrichshain-kreuzberg-hero.webp",
    alt: "Oberbaumbrücke über die Spree in Berlin-Friedrichshain-Kreuzberg als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "65% 30%",
  },
  lichtenberg: {
    src: "/images/standorte/lichtenberg-hero.webp",
    alt: "Historisches Schlossgebäude mit Kuppelturm in einer Parkanlage in Berlin-Lichtenberg als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "70% 40%",
  },
  "marzahn-hellersdorf": {
    src: "/images/standorte/marzahn-hellersdorf-hero.webp",
    alt: "Historische Windmühle vor Wohnhochhäusern in Berlin-Marzahn-Hellersdorf als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "70% 45%",
  },
  neukoelln: {
    src: "/images/standorte/neukoelln-hero.webp",
    alt: "Rathaus Neukölln in Berlin-Neukölln als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "70% 30%",
  },
  pankow: {
    src: "/images/standorte/pankow-hero.webp",
    alt: "Weißes Schlossgebäude mit Parkanlage in Berlin-Pankow als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "75% 30%",
  },
  reinickendorf: {
    src: "/images/standorte/reinickendorf-hero.webp",
    alt: "Uferpromenade an einem See mit Turm im Hintergrund in Berlin-Reinickendorf als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "60% 40%",
  },
  spandau: {
    src: "/images/standorte/spandau-hero.webp",
    alt: "Zitadelle Spandau in Berlin-Spandau als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "70% 35%",
  },
  "steglitz-zehlendorf": {
    src: "/images/standorte/steglitz-zehlendorf-hero.webp",
    alt: "Historisches Gewächshaus mit Glaskuppel im Botanischen Garten in Berlin-Steglitz-Zehlendorf als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "70% 40%",
  },
  "tempelhof-schoeneberg": {
    src: "/images/standorte/tempelhof-schoeneberg-hero.webp",
    alt: "Ehemaliges Flughafengebäude Tempelhof in Berlin-Tempelhof-Schöneberg als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "60% 65%",
  },
  "treptow-koepenick": {
    src: "/images/standorte/treptow-koepenick-hero.webp",
    alt: "Historisches Schlossgebäude am Wasser in Berlin-Treptow-Köpenick als Hintergrund der Glanzwerk-Standortseite",
    objectPosition: "70% 40%",
  },
};
