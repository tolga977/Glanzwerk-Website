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
  /**
   * Lizenziertes Adobe-Stock-Foto (August 2026, vom Betreiber bereitgestellt),
   * lokal ausgeliefert statt über eine Bilddatenbank-URL.
   *
   * Bewusst als eigener Eintrag statt als Ersatz für `routineCleaningTeam`:
   * jener Eintrag hängt zusätzlich am Mittelteil der Unterhaltsreinigungs-Seite
   * (`serviceMidPhotos.ts`). Ein Austausch dort war nicht beauftragt und
   * wäre bei einer direkten Überschreibung stillschweigend mitgelaufen.
   */
  teamBriefing: {
    src: "/images/startseite/reinigungsteam-abstimmung.webp",
    alt: "Zwei Reinigungskräfte stimmen sich in einem Büroflur anhand eines Tablets ab, daneben steht ein Reinigungswagen",
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
  businessHandshake: {
    src: pexels("6918529/pexels-photo-6918529.jpeg"),
    alt: "Zwei Geschäftspartner besiegeln eine Vereinbarung mit Handschlag",
  },
  /*
   * Umwelt & Verantwortung — Redesign 15.08.2026. Sechs neue, kuratierte
   * Unsplash-Fotos (Unsplash-Lizenz, kostenlose kommerzielle Nutzung, keine
   * Zuschreibung verpflichtend), Direktlinks vor Einbindung geprüft. Siehe
   * docs/IMAGES.md für die vollständige Quellenangabe je Foto.
   */
  /*
   * Ersetzt am 15.08.2026: die erste Auswahl (photo-1765371514743, enger
   * Ausschnitt einer Besprechungsecke) trug zu wenig sichtbares Grün und zu
   * wenig Weite. Diese Aufnahme zeigt einen hellen Schreibtisch, viel
   * natürliches Licht durch Vorhänge und eine grosse, deutlich erkennbare
   * Pflanze im Vordergrund — trägt die "Atmosphäre" deutlich stärker.
   */
  ecoOfficeGreenery: {
    src: unsplash("photo-1765371513276-a74f1ecbcf7d"),
    alt: "Heller Schreibtisch in einem modernen Büro mit grosser Grünpflanze und natürlichem Licht",
  },
  ecoForestLight: {
    src: unsplash("photo-1605467518368-b959213686dd"),
    alt: "Sonnenlicht fällt durch dichtes grünes Blätterdach eines Waldes",
  },
  ecoWaterDroplet: {
    src: unsplash("photo-1450696714834-bb5b4aee70d3"),
    alt: "Wassertropfen auf einem grünen Blatt in Nahaufnahme",
  },
  /*
   * Ersetzt am 15.08.2026: die erste Auswahl (photo-1611284446314) zeigte
   * australische Bio-/Restmüll-Tonnen mit vollflächig bedruckten
   * Etiketten (englischer Text, teils erkennbare Fremdmarken auf den
   * Aufklebern) — nicht vereinbar mit der Regel "keine fremden
   * Marken/Beschriftungen im Bild" (siehe Hinweis weiter oben in dieser
   * Datei). Diese Aufnahme zeigt vier einfarbige Mülltonnen ohne jede
   * Beschriftung.
   */
  ecoRecyclingBins: {
    src: unsplash("photo-1532996122724-e3c354a0b15b"),
    alt: "Vier bunte Mülltonnen in Gelb, Blau, Rot und Grün nebeneinander vor einer Wand",
  },
  ecoCleaningSpray: {
    src: unsplash("photo-1550963295-019d8a8a61c5"),
    alt: "Sprühflasche mit Reinigungsmittel neben Papiertüchern",
  },
  ecoForestCanopy: {
    src: unsplash("photo-1701157121748-aa59ab87f983"),
    alt: "Blick von unten durch ein grünes Blätterdach hoher Bäume in den Himmel",
  },
} as const;
