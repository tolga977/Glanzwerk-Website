/**
 * Kuratierte, lizenzfreie Unsplash-Platzhalterfotos (Unsplash-Lizenz –
 * kostenlose kommerzielle Nutzung, keine Zuschreibung verpflichtend).
 * Jede URL wurde vor Einbindung per HTTP-Statuscheck verifiziert.
 * Vollständige Quellenliste: docs/IMAGES.md.
 */

function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;
}

function pexels(path: string) {
  return `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=1600`;
}

export const photos = {
  heroCleaningTeam: {
    src: unsplash("photo-1696592877184-ae59bf25fdd4"),
    alt: "Zwei Fensterreiniger mit Schutzausrüstung auf einer Hebebühne reinigen die Glasfassade eines Bürogebäudes",
  },
  windowCleaning: {
    src: unsplash("photo-1746905205773-3ea50c8cd808"),
    alt: "Fensterreiniger säubert eine Glasscheibe mit dem Abzieher",
  },
  buildingFacade: {
    src: unsplash("photo-1540762693098-50320eb8a752"),
    alt: "Moderne Vorhangfassade eines Gewerbegebäudes",
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
    src: pexels("34516664/pexels-photo-34516664.jpeg"),
    alt: "Vollständig ausgestatteter Reinigungswagen mit Staubsauger, Mopps und Mülltonne",
  },
  routineCleaningTeam: {
    src: pexels("9462109/pexels-photo-9462109.jpeg"),
    alt: "Reinigungskraft staubt ein Regal in einem gepflegten Raum ab",
  },
  medicalPracticeInterior: {
    src: pexels("6812461/pexels-photo-6812461.jpeg"),
    alt: "Modernes, helles Behandlungszimmer einer Arztpraxis",
  },
  kitaInterior: {
    src: pexels("8535620/pexels-photo-8535620.jpeg"),
    alt: "Helles, freundliches Gruppenzimmer einer Kita mit bunter Wandgestaltung",
  },
  lawOfficeReception: {
    src: pexels("36631639/pexels-photo-36631639.jpeg"),
    alt: "Elegante, moderne Empfangsfläche einer Kanzlei",
  },
  brightStaircase: {
    src: pexels("6345073/pexels-photo-6345073.jpeg"),
    alt: "Helles, gepflegtes Treppenhaus mit Holzgeländer und Pflanze",
  },
  moppingFloor: {
    src: pexels("3769711/pexels-photo-3769711.jpeg"),
    alt: "Reinigungskraft in Arbeitskleidung wischt gründlich einen Boden",
  },
  businessHandshake: {
    src: pexels("6918529/pexels-photo-6918529.jpeg"),
    alt: "Zwei Geschäftspartner besiegeln eine Vereinbarung mit Handschlag",
  },
} as const;
