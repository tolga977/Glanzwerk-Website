/**
 * Kuratierte, lizenzfreie Unsplash-Platzhalterfotos (Unsplash-Lizenz –
 * kostenlose kommerzielle Nutzung, keine Zuschreibung verpflichtend).
 * Jede URL wurde vor Einbindung per HTTP-Statuscheck verifiziert.
 * Vollständige Quellenliste: docs/IMAGES.md.
 */

function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;
}

export const photos = {
  heroBuilding: {
    src: unsplash("photo-1763116146508-5a052fce3461"),
    alt: "Moderne Glasfassade eines Bürogebäudes",
  },
  officeCleaning: {
    src: unsplash("photo-1781637590564-01c65dbf2039"),
    alt: "Reinigungskraft saugt einen Büroboden",
  },
  windowCleaning: {
    src: unsplash("photo-1782864840610-51d4c135a405"),
    alt: "Fensterreiniger an einer modernen Glasfassade",
  },
  practiceWaitingRoom: {
    src: unsplash("photo-1762625570087-6d98fca29531"),
    alt: "Modernes, helles Wartezimmer einer Praxis",
  },
  professionalCleaner: {
    src: unsplash("photo-1740657254989-42fe9c3b8cce"),
    alt: "Reinigungskraft bei der Bodenreinigung mit Schutzhandschuhen",
  },
  modernOfficeInterior: {
    src: unsplash("photo-1774494168068-0f716c3aafcf"),
    alt: "Modernes Büro mit Schreibtischen und Arbeitsplätzen",
  },
  buildingFacade: {
    src: unsplash("photo-1540762693098-50320eb8a752"),
    alt: "Moderne Vorhangfassade eines Gewerbegebäudes",
  },
  staircase: {
    src: unsplash("photo-1563201189-8a32607c079b"),
    alt: "Treppenhaus mit Handlauf und Betonwand",
  },
  emptyOfficeRoom: {
    src: unsplash("photo-1542081403278-ba5973c25c7a"),
    alt: "Leerer, frisch aufbereiteter Büroraum",
  },
  classroom: {
    src: unsplash("photo-1751704623306-fefadee241a9"),
    alt: "Helles Klassenzimmer mit Tischen und Stühlen",
  },
  conferenceRoom: {
    src: unsplash("photo-1638786246810-39870f0e77d9"),
    alt: "Konferenzraum mit langem Tisch und Stühlen",
  },
  gymInterior: {
    src: unsplash("photo-1761971974992-6df33df97c3a"),
    alt: "Modernes Fitnessstudio mit Laufbändern und Trainingsgeräten",
  },
  carShowroom: {
    src: unsplash("photo-1777175013302-eaf4b3ef785a"),
    alt: "Autohaus-Ausstellungsraum mit mehreren Fahrzeugen",
  },
  cleaningEquipment: {
    src: unsplash("photo-1779345169505-be7319f62b97"),
    alt: "Reinigungswagen mit Eimer und Mopp vor Glastüren",
  },
} as const;
