/**
 * Lokale Bilder für die Hero-Sektion und den unteren CTA-Bereich der
 * Leistungsseiten (korrigiertes Bilderpaket vom Betreiber, Juli 2026).
 * Die Hero-Bilder ERSETZEN das bisherige Hero-Motiv der jeweiligen Seite
 * (siehe servicePhotos.ts) – sie werden bewusst NICHT zusätzlich im
 * Mittelbereich verwendet, um Bildduplikate zu vermeiden.
 * Lokale Assets unter `public/images/leistungen/<slug>/`; next/image
 * optimiert sie automatisch ohne `remotePatterns`-Eintrag.
 */

export interface ServiceContentPhoto {
  src: string;
  alt: string;
  /** CSS object-position, individuell pro Bild geprüft (Personen/Hände/Geräte nicht abschneiden). */
  objectPosition: string;
}

export interface ServiceContentPhotoSet {
  hero: ServiceContentPhoto;
  ctaUnten: { src: string; alt: string };
}

export const serviceContentPhotos: Record<string, ServiceContentPhotoSet> = {
  "bueroreinigung-berlin": {
    hero: {
      src: "/images/leistungen/bueroreinigung-berlin/hero.png",
      alt: "Professionelle Reinigung eines modernen Büroarbeitsplatzes",
      objectPosition: "30% 45%",
    },
    ctaUnten: {
      src: "/images/leistungen/bueroreinigung-berlin/cta-unten.png",
      alt: "Reinigungsmittel und Tuch auf einem sauberen Bürotisch",
    },
  },
  "praxisreinigung-berlin": {
    hero: {
      src: "/images/leistungen/praxisreinigung-berlin/hero.png",
      alt: "Hygienische Reinigung einer modernen Zahnarztpraxis",
      objectPosition: "30% 55%",
    },
    ctaUnten: {
      src: "/images/leistungen/praxisreinigung-berlin/cta-unten.png",
      alt: "Reinigungsutensilien in einem hellen Praxisraum",
    },
  },
  "kita-und-schulreinigung-berlin": {
    hero: {
      src: "/images/leistungen/kita-und-schulreinigung-berlin/hero.png",
      alt: "Reinigung eines hellen Gruppenraums in einer Kita",
      objectPosition: "65% 60%",
    },
    ctaUnten: {
      src: "/images/leistungen/kita-und-schulreinigung-berlin/cta-unten.png",
      alt: "Sauberer Kita-Raum mit Spielzeug und Kindermöbeln",
    },
  },
  "gastronomiereinigung-berlin": {
    hero: {
      src: "/images/leistungen/gastronomiereinigung-berlin/hero-kitchen.png",
      alt: "Saubere Arbeitsfläche in einer modernen Gastronomieküche",
      objectPosition: "80% 55%",
    },
    ctaUnten: {
      src: "/images/leistungen/gastronomiereinigung-berlin/cta-unten.png",
      alt: "Saubere Arbeitsfläche in einer modernen Gastronomieküche",
    },
  },
  "treppenhausreinigung-berlin": {
    hero: {
      src: "/images/leistungen/treppenhausreinigung-berlin/hero.png",
      alt: "Professionelle Reinigung eines gepflegten Treppenhauses",
      objectPosition: "20% 55%",
    },
    ctaUnten: {
      src: "/images/leistungen/treppenhausreinigung-berlin/cta-unten.png",
      alt: "Sauberes und helles Treppenhaus nach der Reinigung",
    },
  },
  "glas-und-fensterreinigung-berlin": {
    hero: {
      src: "/images/leistungen/glas-und-fensterreinigung-berlin/hero.png",
      alt: "Professionelle Glas- und Fensterreinigung einer großen Glasfläche",
      objectPosition: "70% 40%",
    },
    ctaUnten: {
      src: "/images/leistungen/glas-und-fensterreinigung-berlin/cta-unten.png",
      alt: "Fensterabzieher und Reinigungstuch an einer sauberen Glasfläche",
    },
  },
  "grundreinigung-berlin": {
    hero: {
      src: "/images/leistungen/grundreinigung-berlin/hero.png",
      alt: "Grundreinigung eines Bodens mit einer Einscheibenmaschine",
      objectPosition: "55% 55%",
    },
    ctaUnten: {
      src: "/images/leistungen/grundreinigung-berlin/cta-unten.png",
      alt: "Professionelle Maschine für die gründliche Bodenreinigung",
    },
  },
  "autohausreinigung-berlin": {
    hero: {
      src: "/images/leistungen/autohausreinigung-berlin/hero.webp",
      alt: "Professionelle Bodenreinigung im Showroom eines modernen Autohauses",
      objectPosition: "78% 55%",
    },
    ctaUnten: {
      src: "/images/leistungen/autohausreinigung-berlin/cta-unten.png",
      alt: "Sauberer Ausstellungsbereich eines modernen Autohauses",
    },
  },
  "unterhaltsreinigung-berlin": {
    hero: {
      src: "/images/leistungen/unterhaltsreinigung-berlin/hero.png",
      alt: "Regelmäßige Unterhaltsreinigung in einem modernen Büro",
      objectPosition: "45% 50%",
    },
    ctaUnten: {
      src: "/images/leistungen/unterhaltsreinigung-berlin/cta-unten.png",
      alt: "Professionell ausgestatteter Reinigungswagen für die Unterhaltsreinigung",
    },
  },
  "gebaeudereinigung-berlin": {
    hero: {
      src: "/images/leistungen/gebaeudereinigung-berlin/hero.png",
      alt: "Professionelle Reinigung eines modernen Geschäftsgebäudes",
      objectPosition: "65% 50%",
    },
    ctaUnten: {
      src: "/images/leistungen/gebaeudereinigung-berlin/cta-unten.png",
      alt: "Reinigungswagen in einem gepflegten Eingangsbereich",
    },
  },
  "kanzleireinigung-berlin": {
    hero: {
      src: "/images/leistungen/kanzleireinigung-berlin/hero.webp",
      alt: "Reinigungswagen in einem modernen Büro mit Blick auf die Berliner Skyline",
      objectPosition: "50% 55%",
    },
    ctaUnten: {
      src: "/images/leistungen/kanzleireinigung-berlin/cta-unten.webp",
      alt: "Reinigungskraft wischt mit blauem Tuch einen Schreibtisch ab",
    },
  },
};
