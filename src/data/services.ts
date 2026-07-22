export interface ServiceFaqItem {
  question: string;
  answer: string;
  relatedLink?: { label: string; href: string };
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  summary: string;
  intro: string;
  bullets: string[];
  /** Drei kurze, konkrete Probleme aus Kundensicht für den Problem-Abschnitt der Leistungsseite. */
  challenges: string[];
  description: string[];
  tasks: string[];
  audiences: string[];
  benefits: string[];
  faq: ServiceFaqItem[];
  relatedSlugs: string[];
}

export const services: Service[] = [
  {
    slug: "gebaeudereinigung-berlin",
    title: "Gebäudereinigung Berlin",
    shortTitle: "Gebäudereinigung",
    metaDescription:
      "Professionelle Gebäudereinigung in Berlin für Büros, Praxen, Kanzleien, Gewerbeobjekte und Hausverwaltungen. Flexible Zeiten und klar abgestimmte Leistungen.",
    summary:
      "Umfassende Reinigung für Gewerbeimmobilien – von der laufenden Pflege bis zur Grundreinigung.",
    intro:
      "Als Generalunternehmen für die Gebäudereinigung übernimmt Glanzwerk die komplette Pflege Ihrer Gewerbeimmobilie in Berlin – abgestimmt auf Nutzung, Frequentierung und Budget.",
    challenges: [
      "Mehrere Dienstleister für Fenster, Treppenhaus und Unterhalt bedeuten Abstimmungsaufwand und unklare Zuständigkeiten.",
      "Unregelmäßig gepflegte Gemeinschaftsflächen wirken schnell ungepflegt und schaden dem Gesamteindruck der Immobilie.",
      "Ohne festen Ansprechpartner bleiben Rückfragen zu Umfang und Rhythmus oft unbeantwortet.",
    ],
    bullets: [
      "Leistungsumfang wird auf das jeweilige Objekt abgestimmt",
      "Feste Ansprechpartner und Reinigungsteams",
      "Flexible Intervalle von täglich bis wöchentlich",
    ],
    description: [
      "Viele Gewerbeimmobilien bestehen aus mehreren Teilbereichen mit unterschiedlichem Reinigungsbedarf: Büroflächen, Treppenhäuser, Sanitärräume, Fenster und gelegentlich auch Außenanlagen. Statt für jeden Bereich einen eigenen Dienstleister zu beauftragen, bündelt die Gebäudereinigung diese Teilleistungen in einem Vertrag mit einem festen Ansprechpartner.",
      "Der konkrete Leistungsumfang wird vorab gemeinsam festgelegt – etwa welche Flächen in welchem Rhythmus gereinigt werden und welche Zusatzleistungen wie Fenster- oder Grundreinigung einbezogen sind. Dadurch bleibt der Aufwand für Sie überschaubar, während Glanzwerk die Koordination der einzelnen Arbeitsschritte übernimmt.",
    ],
    tasks: [
      "Bodenreinigung in Büro-, Flur- und Gemeinschaftsflächen",
      "Pflege von Sanitärräumen",
      "Reinigung von Treppenhäusern und Eingangsbereichen",
      "Staubwischen und Oberflächenreinigung",
      "Leerung von Mülleimern und Organisation der Entsorgung",
      "Basisreinigung von Fenstern nach Absprache",
    ],
    audiences: [
      "Bürogebäude mit mehreren Mietparteien",
      "Gemischt genutzte Gewerbeimmobilien",
      "Hausverwaltungen mit Reinigungsbedarf über mehrere Objekte",
    ],
    benefits: [
      "Ein Ansprechpartner für mehrere Teilleistungen",
      "Ein Vertrag statt mehrerer einzelner Dienstleister",
      "Reinigungskonzept lässt sich um Zusatzleistungen erweitern",
    ],
    faq: [
      {
        question: "Was unterscheidet die Gebäudereinigung von der Unterhaltsreinigung?",
        answer:
          "Die Unterhaltsreinigung ist eine wiederkehrende Pflegereinigung einzelner Flächen. Die Gebäudereinigung fasst mehrere Teilleistungen – etwa Unterhalts-, Treppenhaus- und Fensterreinigung – unter einem gemeinsamen Konzept zusammen.",
      },
      {
        question: "Wie wird der Leistungsumfang festgelegt?",
        answer:
          "Wir sprechen mit Ihnen die Flächen, gewünschten Zusatzleistungen und den passenden Reinigungsrhythmus durch und fassen das Ergebnis in einem individuellen Angebot zusammen.",
      },
      {
        question: "Können mehrere Gewerke miteinander kombiniert werden?",
        answer:
          "Ja, das ist der eigentliche Zweck der Gebäudereinigung: Unterhalts-, Treppenhaus-, Fenster- und bei Bedarf Grundreinigung lassen sich in einem Vertrag bündeln.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Melden Sie sich direkt bei Ihrem Ansprechpartner. Wir prüfen die Beanstandung und bessern bei berechtigten Fällen zeitnah nach – Details zu unserem Nachbesserungs-Versprechen stehen auf der Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "grundreinigung-berlin", "treppenhausreinigung-berlin"],
  },
  {
    slug: "bueroreinigung-berlin",
    title: "Büroreinigung Berlin",
    shortTitle: "Büroreinigung",
    metaDescription:
      "Professionelle Büroreinigung in Berlin für Unternehmen, Kanzleien und Gewerbebetriebe. Flexible Reinigungszeiten, klare Leistungen und feste Ansprechpartner.",
    summary:
      "Saubere Arbeitsplätze für Mitarbeitende und Kunden – diskret, zuverlässig, außerhalb der Kernarbeitszeit.",
    intro:
      "Ein gepflegtes Büro wirkt sich direkt auf Konzentration, Wohlbefinden und den ersten Eindruck bei Kunden aus. Glanzwerk reinigt Ihre Büroflächen in Berlin nach einem festen, mit Ihnen abgestimmten Plan.",
    challenges: [
      "Verschmutzte Arbeitsplätze wirken sich spürbar auf Konzentration und den Eindruck bei Kunden aus.",
      "Reinigungstermine während der Kernarbeitszeit stören den Betriebsablauf.",
      "Wechselndes Reinigungspersonal kennt Ihre Räume und Abläufe nicht.",
    ],
    bullets: [
      "Reinigung außerhalb der Geschäftszeiten möglich",
      "Schreibtische, Böden, Sanitär- und Teeküchenbereiche",
      "Diskrete, zuverlässige Reinigungskräfte",
    ],
    description: [
      "Büroflächen werden täglich genutzt und sollten entsprechend regelmäßig gepflegt werden, ohne den Arbeitsablauf zu stören. Aus diesem Grund findet die Büroreinigung in der Regel früh morgens, abends oder an Wochenenden statt – Zutritt und Ablauf stimmen wir vorab mit Ihnen ab, etwa über Schlüssel, Zugangscodes oder feste Zeitfenster.",
      "Neben den klassischen Arbeitsplätzen gehören auch Besprechungsräume, Teeküchen und Sanitärbereiche zum Leistungsumfang. Der Reinigungsrhythmus richtet sich nach der Nutzungsintensität Ihres Büros – von einmal wöchentlich bis zur täglichen Reinigung.",
    ],
    tasks: [
      "Abwischen von Schreibtischen und Ablageflächen",
      "Reinigung von Bildschirmen und Peripherie außen",
      "Bodenpflege in Büro- und Gemeinschaftsflächen",
      "Reinigung von Teeküchen und Pausenräumen",
      "Pflege der Sanitärbereiche",
      "Leerung von Papierkörben und Mülleimern",
    ],
    audiences: [
      "Einzelbüros bis große Verwaltungsflächen",
      "Gemeinschaftlich genutzte Büroflächen und Co-Working",
      "Empfangs- und Kundenbereiche mit hohem Anspruch",
    ],
    benefits: [
      "Reinigung außerhalb der Kernarbeitszeit möglich",
      "Fester Reinigungsplan statt spontaner Einsätze",
      "Diskrete Durchführung ohne Störung des Tagesgeschäfts",
    ],
    faq: [
      {
        question: "Kann die Reinigung während der Arbeitszeit stattfinden?",
        answer:
          "Möglich ist es, üblich ist jedoch eine Reinigung außerhalb der Kernarbeitszeit – früh morgens, abends oder am Wochenende –, damit der Bürobetrieb nicht gestört wird.",
      },
      {
        question: "Wie erhält das Reinigungsteam Zutritt zum Büro?",
        answer:
          "Das klären wir individuell: über einen Schlüssel, einen Zugangscode oder feste Zeitfenster, in denen jemand aus Ihrem Team anwesend ist.",
      },
      {
        question: "Werden eigene Reinigungsmittel verwendet?",
        answer:
          "In der Regel bringt unser Team eigenes Material und Reinigungsmittel mit. Besondere Vorgaben zu Produkten besprechen wir gerne vorab mit Ihnen.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Geben Sie uns kurz Bescheid, was nicht gepasst hat. Ist die Beanstandung berechtigt, bessern wir zeitnah nach – die genauen Bedingungen dazu stehen auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "glas-und-fensterreinigung-berlin", "kanzleireinigung-berlin"],
  },
  {
    slug: "praxisreinigung-berlin",
    title: "Praxisreinigung Berlin",
    shortTitle: "Praxisreinigung",
    metaDescription:
      "Professionelle Praxisreinigung in Berlin für Arztpraxen, Therapiezentren und medizinische Einrichtungen. Klare Abläufe, flexible Zeiten und abgestimmte Leistungen.",
    summary:
      "Hygienegerechte Reinigung für Arztpraxen und medizinische Einrichtungen.",
    intro:
      "Arztpraxen stellen besondere Anforderungen an Hygiene und einen reibungslosen Praxisablauf. Glanzwerk reinigt Warte-, Empfangs- und Behandlungsräume in Berlin nach einem auf Ihre Sprechzeiten abgestimmten Ablauf.",
    challenges: [
      "Unzureichend gereinigte Warte- und Behandlungsräume wirken sich direkt auf das Vertrauen der Patienten aus.",
      "Reinigungstermine, die nicht zu den Sprechzeiten passen, stören den Praxisablauf.",
      "Sensible Bereiche erfordern sorgfältigen, eingespielten Umgang statt improvisierter Einsätze.",
    ],
    bullets: [
      "Reinigung von Warte-, Empfangs- und Behandlungsräumen",
      "Abstimmung auf Praxisöffnungszeiten",
      "Sorgfältiger Umgang mit sensiblen Bereichen",
    ],
    description: [
      "In Praxisräumen treffen Patienten, Personal und häufig auch sensible Wartesituationen aufeinander. Eine gepflegte, hygienisch saubere Umgebung trägt spürbar zum Eindruck einer Praxis bei. Wir reinigen Warte- und Empfangsbereiche sowie die allgemeinen Oberflächen in Behandlungsräumen zwischen den Sprechzeiten oder danach.",
      "Die medizinische Aufbereitung von Instrumenten und die Sterilisation bleiben Aufgabe des Praxispersonals – hierfür gelten eigene medizinische Vorgaben. Unsere Leistung deckt die allgemeine Flächenreinigung und -desinfektion der Räumlichkeiten ab und wird mit dem Praxisteam individuell abgestimmt.",
    ],
    tasks: [
      "Reinigung von Warte- und Empfangsbereichen",
      "Flächendesinfektion in Behandlungsräumen",
      "Bodenpflege in allen Praxisräumen",
      "Reinigung von Sanitärbereichen",
      "Abwischen von Kontaktflächen wie Türgriffen und Handläufen",
    ],
    audiences: [
      "Allgemeinarzt- und Facharztpraxen",
      "Zahnarztpraxen",
      "Physiotherapie- und Gemeinschaftspraxen",
    ],
    benefits: [
      "Termine passend zu Ihren Sprechzeiten",
      "Diskrete Durchführung auch bei laufendem Betrieb",
      "Ansprechpartner, der die Praxisabläufe kennt",
    ],
    faq: [
      {
        question: "Wird auch desinfiziert?",
        answer:
          "Wir reinigen und desinfizieren allgemeine Flächen wie Warteräume, Empfang und Kontaktflächen. Die medizinische Aufbereitung von Instrumenten bleibt Aufgabe des Praxispersonals.",
      },
      {
        question: "Passt die Reinigung zu unseren Sprechzeiten?",
        answer:
          "Ja, wir stimmen die Reinigungszeiten auf Ihre Öffnungszeiten ab – etwa in der Mittagspause, nach Praxisschluss oder früh morgens vor Öffnung.",
      },
      {
        question: "Was passiert bei Personalausfall im Reinigungsteam?",
        answer:
          "Feste Teams sind bei uns die Regel. Bei Ausfall organisieren wir eine Vertretung, damit Ihr Reinigungstermin zuverlässig stattfindet.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Melden Sie den Mangel direkt Ihrem Ansprechpartner. Bei berechtigten Fällen bessern wir zeitnah nach – Näheres zu unserem Nachbesserungs-Versprechen finden Sie auf der Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["grundreinigung-berlin", "unterhaltsreinigung-berlin", "kita-und-schulreinigung-berlin"],
  },
  {
    slug: "unterhaltsreinigung-berlin",
    title: "Unterhaltsreinigung Berlin",
    shortTitle: "Unterhaltsreinigung",
    metaDescription:
      "Regelmäßige Unterhaltsreinigung in Berlin für Büros, Praxen, Kanzleien und Gewerbeobjekte. Flexible Intervalle und klar vereinbarte Leistungen.",
    summary:
      "Regelmäßige Pflegereinigung, damit Ihr Gewerbeobjekt dauerhaft gepflegt bleibt.",
    intro:
      "Die Unterhaltsreinigung sorgt für einen gleichbleibend gepflegten Zustand Ihrer Räume – als wiederkehrender Service in dem von Ihnen gewünschten Rhythmus.",
    challenges: [
      "Unregelmäßige Reinigung lässt Verschmutzung sich erst richtig festsetzen, statt sie gar nicht entstehen zu lassen.",
      "Spontane Einzeleinsätze sind schwer zu planen und schwanken in der Qualität.",
      "Ohne festen Rhythmus bleibt der Pflegezustand des Objekts unvorhersehbar.",
    ],
    bullets: [
      "Wiederkehrende Reinigung nach festem Rhythmus",
      "Boden-, Oberflächen- und Sanitärpflege",
      "Anpassbar an Nutzungsintensität",
    ],
    description: [
      "Anders als die Grundreinigung, die einmalig eine intensive Aufbereitung leistet, ist die Unterhaltsreinigung auf Wiederholung ausgelegt: Böden, Oberflächen und Sanitärbereiche werden in einem festen Rhythmus gepflegt, sodass sich Verschmutzung erst gar nicht ansammelt.",
      "Der Rhythmus richtet sich nach der tatsächlichen Nutzung des Objekts – von einmal wöchentlich bis zur täglichen Reinigung. Steigt der Bedarf saisonal oder durch mehr Publikumsverkehr, lässt sich der Umfang unkompliziert anpassen.",
    ],
    tasks: [
      "Bodenpflege je nach Belag",
      "Staubwischen und Oberflächenreinigung",
      "Pflege von Sanitärräumen",
      "Leerung von Mülleimern",
      "Nachfüllen von Verbrauchsmaterial wie Seife oder Papierhandtüchern",
    ],
    audiences: [
      "Büros und Verwaltungsflächen",
      "Praxen und Kanzleien mit regelmäßigem Bedarf",
      "Gewerbeobjekte mit täglichem Publikumsverkehr",
    ],
    benefits: [
      "Planbare, wiederkehrende Kosten",
      "Fester Rhythmus statt spontaner Einzeleinsätze",
      "Sinnvolle Ergänzung zur einmaligen Grundreinigung",
    ],
    faq: [
      {
        question: "Wie wird der Reinigungsrhythmus festgelegt?",
        answer:
          "Gemeinsam legen wir fest, wie oft Ihr Objekt gereinigt werden soll – von einmal wöchentlich bis täglich – abhängig von Fläche, Nutzung und Publikumsverkehr.",
      },
      {
        question: "Worin liegt der Unterschied zur Grundreinigung?",
        answer:
          "Die Unterhaltsreinigung pflegt das Objekt wiederkehrend, die Grundreinigung reinigt einmalig besonders intensiv, etwa bei Neubezug oder nach längerer Zeit ohne Pflege.",
      },
      {
        question: "Lässt sich der Umfang bei Bedarf anpassen?",
        answer:
          "Ja, bei saisonal höherem Aufkommen oder verändertem Bedarf passen wir Rhythmus und Umfang gemeinsam mit Ihnen an.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Sagen Sie uns kurz Bescheid. Berechtigte Beanstandungen bessern wir zeitnah nach – die genauen Bedingungen unseres Nachbesserungs-Versprechens stehen auf der Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["gebaeudereinigung-berlin", "bueroreinigung-berlin", "grundreinigung-berlin"],
  },
  {
    slug: "treppenhausreinigung-berlin",
    title: "Treppenhausreinigung Berlin",
    shortTitle: "Treppenhausreinigung",
    metaDescription:
      "Treppenhausreinigung in Berlin für Hausverwaltungen, Gewerbeimmobilien und Eigentümergemeinschaften. Klare Intervalle und zuverlässig abgestimmte Leistungen.",
    summary:
      "Gepflegte Treppenhäuser und Eingangsbereiche für Wohn- und Gewerbeobjekte.",
    intro:
      "Ein sauberes Treppenhaus ist die Visitenkarte eines jeden Gebäudes. Glanzwerk übernimmt die regelmäßige Reinigung von Treppen, Fluren und Eingangsbereichen in Berlin.",
    challenges: [
      "Ein vernachlässigtes Treppenhaus ist oft der erste Eindruck, den Besucher und Mieter vom Gebäude bekommen.",
      "Unklare Zuständigkeiten zwischen mehreren Parteien führen häufig dazu, dass sich niemand verantwortlich fühlt.",
      "Handläufe, Briefkastenanlagen und Fensterbänke werden bei oberflächlicher Reinigung häufig übersehen.",
    ],
    bullets: [
      "Treppen, Handläufe, Böden und Briefkastenanlagen",
      "Abstimmung mit Hausverwaltungen möglich",
      "Feste Reinigungstage nach Objektgröße",
    ],
    description: [
      "Treppenhäuser werden von allen Bewohnern und Besuchern eines Gebäudes genutzt und entsprechend stark beansprucht. Wir reinigen Treppenstufen, Handläufe, Fensterbänke im Treppenhaus und Briefkastenanlagen in einem festen, mit der Hausverwaltung abgestimmten Turnus.",
      "Bei Objekten mit mehreren Treppenhäusern lässt sich der Aufwand pro Treppenhaus reduzieren, da Anfahrt und Grundorganisation für mehrere Aufgänge gemeinsam erfolgen. Das machen wir bereits bei der Angebotserstellung transparent.",
    ],
    tasks: [
      "Reinigung von Treppenstufen und Handläufen",
      "Wischen der Flurböden",
      "Reinigung von Fensterbänken im Treppenhaus",
      "Pflege von Briefkastenanlagen und Klingeltableaus",
      "Reinigung von Kellerzugängen und Eingangsbereichen",
    ],
    audiences: [
      "Hausverwaltungen und WEG",
      "Gewerbeimmobilien mit mehreren Mietparteien",
      "Gemischt genutzte Wohn- und Geschäftshäuser",
    ],
    benefits: [
      "Abstimmung direkt mit der Hausverwaltung",
      "Reduzierter Aufwand pro Treppenhaus bei mehreren Aufgängen",
      "Feste Reinigungstage statt unregelmäßiger Einsätze",
    ],
    faq: [
      {
        question: "Kann die Reinigung über die Nebenkostenabrechnung laufen?",
        answer:
          "Die Abrechnung erfolgt über die Hausverwaltung oder Eigentümergemeinschaft; ob und wie sie in der Nebenkostenabrechnung erscheint, entscheidet die jeweilige Verwaltung.",
      },
      {
        question: "Ist Winterdienst in der Treppenhausreinigung enthalten?",
        answer:
          "Nein, Winterdienst ist keine Standardleistung der Treppenhausreinigung. Sprechen Sie uns bei Bedarf gerne gesondert darauf an.",
      },
      {
        question: "Wird der Preis pro Treppenhaus oder pro Objekt berechnet?",
        answer:
          "Bei mehreren Treppenhäusern im selben Objekt kalkulieren wir gemeinsame Anfahrt und Organisation ein, wodurch der Preis pro einzelnem Treppenhaus sinken kann.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Melden Sie sich bei Ihrem Ansprechpartner, sobald Ihnen etwas auffällt. Berechtigte Mängel bessern wir zeitnah nach – Details dazu finden Sie auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["gebaeudereinigung-berlin", "glas-und-fensterreinigung-berlin", "grundreinigung-berlin"],
  },
  {
    slug: "glas-und-fensterreinigung-berlin",
    title: "Glas- und Fensterreinigung Berlin",
    shortTitle: "Glas- und Fensterreinigung",
    metaDescription:
      "Glas- und Fensterreinigung in Berlin für Büros, Praxen, Kanzleien, Geschäfte und Gewerbeobjekte. Fenster, Rahmen und Glasflächen nach Vereinbarung.",
    summary:
      "Streifenfreie Reinigung von Fenstern, Glasfassaden, Trennwänden und Vitrinen für Gewerbeobjekte.",
    intro:
      "Klare Fenster und makellose Glasflächen prägen den Lichteinfall und die Außenwirkung Ihres Objekts. Glanzwerk reinigt Fenster, Glasfassaden, Trennwände und Vitrinen in Berlin innen und außen, auch in größeren Höhen.",
    challenges: [
      "Verschmutzte Fenster und Glasflächen mindern sichtbar den Lichteinfall und das Erscheinungsbild des Objekts.",
      "Kalk- und Wasserflecken setzen sich ohne regelmäßigen Rhythmus zunehmend hartnäckiger fest.",
      "Höhere Stockwerke und Fassaden erfordern Ausrüstung, über die viele Betriebe selbst nicht verfügen.",
    ],
    bullets: [
      "Fenster innen und außen, inklusive Rahmen und Fensterbänke",
      "Glasfassaden, Trennwände und Vitrinen im Innenbereich",
      "Auch für höhere Gebäude mit geeigneter Ausrüstung",
    ],
    description: [
      "Fenster verschmutzen durch Witterung, Straßenstaub und – im Innenbereich – durch normale Nutzung sichtbar schneller als andere Flächen. Ein regelmäßiger Reinigungsrhythmus verhindert hartnäckige Kalk- und Wasserflecken und hält den Lichteinfall in Ihren Räumen konstant hoch.",
      "Über die klassische Fensterreinigung hinaus reinigen wir auch Glasfassaden, Glastrennwände und Vitrinen im Innenbereich – etwa in Büros, Ausstellungsräumen oder Eingangsbereichen, wo Fingerabdrücke und Fettspuren besonders deutlich auffallen. Für höhere Stockwerke und großflächige Fassaden arbeiten wir mit geeigneter Ausrüstung; die genaue Vorgehensweise besprechen wir vorab abhängig von Gebäudehöhe und Zugänglichkeit. Witterungsabhängige Verschiebungen einzelner Termine sind möglich und werden mit Ihnen abgestimmt.",
    ],
    tasks: [
      "Reinigung der Fensterglasflächen innen und außen",
      "Reinigung von Rahmen, Fensterfalzen und Fensterbänken",
      "Reinigung von Lüftungsflügeln und Oberlichtern",
      "Reinigung von Glasfassaden und Glaseingangstüren",
      "Reinigung von Glastrennwänden, Vitrinen und Schaukästen im Innenbereich",
    ],
    audiences: [
      "Bürogebäude mit großen Fensterflächen und Glastrennwänden",
      "Ladenflächen mit Schaufenstern und Vitrinen",
      "Autohäuser und mehrgeschossige Gewerbeobjekte mit Glasfassaden",
    ],
    benefits: [
      "Streifenfreies, rückstandsfreies Ergebnis innen und außen",
      "Regelmäßiger Rhythmus verhindert hartnäckige Verschmutzungen",
      "Geeignete Ausrüstung auch für höhere Stockwerke und Fassaden",
    ],
    faq: [
      {
        question: "Wie oft sollte eine Glas- und Fensterreinigung stattfinden?",
        answer:
          "Das hängt von Lage und Nutzung ab. Für die meisten Gewerbeobjekte empfiehlt sich ein Rhythmus von mehreren Terminen pro Jahr, den wir individuell mit Ihnen abstimmen.",
      },
      {
        question: "Werden auch Glasfassaden, Trennwände und Vitrinen gereinigt?",
        answer:
          "Ja, neben klassischen Fenstern reinigen wir auch Glasfassaden, Innentrennwände, Vitrinen und Glaseingangstüren – je nach Material und Verschmutzung mit passenden, schonenden Reinigungsmitteln.",
      },
      {
        question: "Wie werden höhere Stockwerke gereinigt?",
        answer:
          "Je nach Gebäudehöhe und Zugänglichkeit setzen wir geeignete Ausrüstung ein. Details besprechen wir vorab bei der Besichtigung Ihres Objekts.",
      },
      {
        question: "Was passiert bei schlechtem Wetter?",
        answer:
          "Bei starkem Regen oder Frost verschieben wir den Termin kurzfristig und stimmen einen Ersatztermin mit Ihnen ab.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Kontaktieren Sie einfach Ihren Ansprechpartner. Wir prüfen die Beanstandung und bessern in berechtigten Fällen zeitnah nach – Details dazu stehen auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["treppenhausreinigung-berlin", "bueroreinigung-berlin", "autohausreinigung-berlin"],
  },
  {
    slug: "grundreinigung-berlin",
    title: "Grundreinigung Berlin",
    shortTitle: "Grundreinigung",
    metaDescription:
      "Grundreinigung in Berlin für Büros, Praxen und Gewerbeflächen. Intensive Reinigung bei hartnäckigen Rückständen, Übergaben oder besonderem Bedarf.",
    summary:
      "Intensive Tiefenreinigung für Neubezug, Sanierung oder nach längerer Zeit ohne Pflege.",
    intro:
      "Bei der Grundreinigung werden Flächen intensiv und vollständig aufbereitet – etwa vor dem Bezug neuer Räume, nach Bauarbeiten oder in größeren Abständen zur Auffrischung.",
    challenges: [
      "Nach Bauarbeiten oder längerer Zeit ohne Pflege reicht eine normale Reinigung oft nicht mehr aus.",
      "Fugen, Sockelleisten und schwer zugängliche Bereiche werden im laufenden Betrieb selten gründlich mitgereinigt.",
      "Ohne sauberen Ausgangspunkt lässt sich ein neuer Unterhaltsreinigungsrhythmus schwer etablieren.",
    ],
    bullets: [
      "Ideal bei Neubezug oder nach Renovierung",
      "Intensivreinigung von Böden und Oberflächen",
      "Einmalig oder als Ergänzung zur Unterhaltsreinigung",
    ],
    description: [
      "Anders als die wiederkehrende Unterhaltsreinigung ist die Grundreinigung auf einen einzelnen, intensiven Einsatz ausgelegt. Dabei werden auch Bereiche einbezogen, die im laufenden Betrieb selten im Fokus stehen – etwa Fugen, Sockelleisten oder stark genutzte Bodenbeläge.",
      "Typische Anlässe sind der Bezug neuer Räume, die Zeit nach Bauarbeiten oder eine jährliche Auffrischung bestehender Objekte. Bei laufendem Betrieb lässt sich die Grundreinigung in Etappen oder außerhalb der Geschäftszeiten durchführen.",
    ],
    tasks: [
      "Intensivreinigung von Böden inklusive Fugen",
      "Entfernen hartnäckiger Verschmutzungen",
      "Reinigung von Sockelleisten und schwer zugänglichen Bereichen",
      "Aufbereitung von Flächen nach Bauarbeiten",
    ],
    audiences: [
      "Neu bezogene Büro- und Gewerbeflächen",
      "Objekte nach Renovierung oder Umbau",
      "Bestehende Objekte zur jährlichen Auffrischung",
    ],
    benefits: [
      "Einmalig buchbar oder als Ergänzung zur Unterhaltsreinigung",
      "Guter Ausgangspunkt für einen neuen Reinigungsrhythmus",
      "Auch bei laufendem Betrieb in Etappen möglich",
    ],
    faq: [
      {
        question: "Wie lange dauert eine Grundreinigung?",
        answer:
          "Das hängt von Fläche und Verschmutzungsgrad ab. Nach einer kurzen Besichtigung nennen wir Ihnen einen realistischen Zeitrahmen.",
      },
      {
        question: "Ist eine Grundreinigung bei laufendem Betrieb möglich?",
        answer:
          "Ja, wir teilen die Arbeiten bei Bedarf in Etappen auf oder führen sie außerhalb Ihrer Geschäftszeiten durch.",
      },
      {
        question: "Ist eine Bauendreinigung enthalten?",
        answer:
          "Die Grundreinigung deckt die intensive Aufbereitung von Flächen ab. Ob eine klassische Bauendreinigung mit Entfernung von Bauschutt und Folien benötigt wird, klären wir vorab mit Ihnen.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Geben Sie uns direkt Bescheid. Ist die Beanstandung berechtigt, bessern wir zeitnah nach – die Bedingungen unseres Nachbesserungs-Versprechens finden Sie auf der Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "praxisreinigung-berlin", "gebaeudereinigung-berlin"],
  },
  {
    slug: "kita-und-schulreinigung-berlin",
    title: "Kita- und Schulreinigung Berlin",
    shortTitle: "Kita- & Schulreinigung",
    metaDescription:
      "Kita- und Schulreinigung in Berlin außerhalb der Betreuungszeiten – Gruppenräume, Sanitär, Gemeinschaftsflächen. Jetzt Angebot anfragen.",
    summary:
      "Gründliche Reinigung für Kitas und Schulen mit besonderem Augenmerk auf Hygiene.",
    intro:
      "In Kitas und Schulen sind Hygiene und ein gepflegtes Umfeld besonders wichtig. Glanzwerk reinigt Gruppen- und Klassenräume, Sanitärbereiche und Gemeinschaftsflächen in Berlin zuverlässig außerhalb des Betreuungsbetriebs.",
    challenges: [
      "Stark genutzte Gruppen- und Sanitärräume erfordern besonders zuverlässige Hygiene.",
      "Reinigungstermine während der Betreuungs- oder Unterrichtszeit sind kaum umsetzbar.",
      "Häufig berührte Oberflächen werden bei oberflächlicher Reinigung leicht übersehen.",
    ],
    bullets: [
      "Reinigung außerhalb der Betreuungs- und Unterrichtszeiten",
      "Besonderer Fokus auf Sanitär- und Gemeinschaftsräume",
      "Abstimmung mit Trägern und Hausverwaltung",
    ],
    description: [
      "In Einrichtungen mit vielen Kindern sind Sanitärbereiche, Gemeinschaftsräume und häufig berührte Oberflächen besonders relevant für die tägliche Hygiene. Wir reinigen Gruppen- und Klassenräume, Turnhallen oder Gemeinschaftsräume sowie Sanitärbereiche nach Betreuungsende oder vor Unterrichtsbeginn.",
      "Termine legen wir gemeinsam mit Trägern, Schulleitungen oder Hausmeisterdiensten fest, damit die Reinigung den Betrieb nicht stört. In den Ferien lassen sich zusätzliche, intensivere Reinigungstermine einplanen.",
    ],
    tasks: [
      "Reinigung von Gruppen- und Klassenräumen",
      "Reinigung von Sanitärbereichen",
      "Reinigung von Turnhallen und Gemeinschaftsräumen",
      "Reinigung von Spiel- und Pausenbereichen",
      "Leerung von Mülleimern",
    ],
    audiences: [
      "Kindertagesstätten",
      "Grundschulen und weiterführende Schulen",
      "Horte und Nachmittagsbetreuungen",
    ],
    benefits: [
      "Reinigung außerhalb der Betreuungs- und Unterrichtszeiten",
      "Abstimmung mit Trägern und Hausmeisterdiensten",
      "Zusätzliche Termine in den Ferien möglich",
    ],
    faq: [
      {
        question: "Werden kindgerechte Reinigungsmittel verwendet?",
        answer:
          "Wir setzen für Einrichtungen mit Kindern geeignete, schonende Reinigungsmittel ein und stimmen besondere Vorgaben Ihrer Einrichtung gerne vorab ab.",
      },
      {
        question: "Findet die Reinigung auch in den Ferien statt?",
        answer:
          "Ja, in den Ferien lassen sich zusätzliche, intensivere Reinigungstermine einplanen, etwa in Kombination mit einer Grundreinigung.",
      },
      {
        question: "Wie erfolgt die Abstimmung mit dem Hausmeisterdienst?",
        answer:
          "Wir sprechen Zutritt, Zeitfenster und Zuständigkeiten direkt mit Trägern und vorhandenen Hausmeisterdiensten ab, damit es keine Überschneidungen gibt.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Sprechen Sie uns direkt an. Bei berechtigten Beanstandungen bessern wir zeitnah nach – die genauen Bedingungen dazu finden Sie auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "grundreinigung-berlin", "praxisreinigung-berlin"],
  },
  {
    slug: "kanzleireinigung-berlin",
    title: "Kanzleireinigung Berlin",
    shortTitle: "Kanzleireinigung",
    metaDescription:
      "Professionelle Kanzleireinigung in Berlin für Rechtsanwälte, Notare, Steuerberater und Beratungsunternehmen. Flexible Zeiten und klar abgestimmte Leistungen.",
    summary:
      "Diskrete, zuverlässige Reinigung für Kanzleien mit hohem Anspruch an Vertraulichkeit.",
    intro:
      "Kanzleien benötigen einen Reinigungspartner, der Vertraulichkeit ernst nimmt. Glanzwerk reinigt Büro-, Empfangs- und Besprechungsräume in Berlin zuverlässig und diskret.",
    challenges: [
      "Vertrauliche Unterlagen auf Schreibtischen erfordern einen diskreten, eingespielten Umgang bei der Reinigung.",
      "Ein ungepflegter Empfangsbereich wirkt sich direkt auf den Eindruck bei Mandanten aus.",
      "Wechselndes Reinigungspersonal passt schlecht zum Vertraulichkeitsanspruch einer Kanzlei.",
    ],
    bullets: [
      "Diskrete, vertrauenswürdige Reinigungsteams",
      "Empfangs-, Büro- und Besprechungsräume",
      "Flexible Termine außerhalb der Kanzleizeiten",
    ],
    description: [
      "In Kanzleien liegen häufig vertrauliche Unterlagen offen zugänglich – etwa auf Schreibtischen oder in Besprechungsräumen. Unser Team reinigt Oberflächen, ohne Akten oder Unterlagen zu bewegen, und arbeitet mit festen, statt ständig wechselnden Reinigungskräften.",
      "Empfangsbereich und Besprechungsräume sind für Mandanten der erste Eindruck Ihrer Kanzlei. Wir legen hier besonderen Wert auf ein gepflegtes, repräsentatives Erscheinungsbild, abgestimmt auf Ihre Kanzleizeiten.",
    ],
    tasks: [
      "Reinigung von Empfangs- und Besprechungsräumen",
      "Abwischen von Schreibtischen und Ablageflächen",
      "Bodenpflege in Büro- und Gemeinschaftsflächen",
      "Reinigung von Sanitärbereichen",
    ],
    audiences: [
      "Rechtsanwaltskanzleien",
      "Steuerberatungskanzleien",
      "Notariate",
    ],
    benefits: [
      "Feste, vertrauenswürdige Reinigungsteams",
      "Diskrete Durchführung ohne Bewegen von Unterlagen",
      "Termine außerhalb der Kanzleizeiten möglich",
    ],
    faq: [
      {
        question: "Ist eine Vertraulichkeitsvereinbarung möglich?",
        answer:
          "Ja, auf Wunsch treffen wir eine schriftliche Vertraulichkeitsvereinbarung mit Ihrer Kanzlei.",
      },
      {
        question: "Werden Unterlagen oder Aktenschränke bewegt?",
        answer:
          "Nein, wir reinigen Oberflächen, ohne Unterlagen oder Akten zu verschieben. Sensible Bereiche besprechen wir vorab mit Ihnen.",
      },
      {
        question: "Ist Zutritt außerhalb der Kanzleizeiten möglich?",
        answer:
          "Ja, wir stimmen Zugang und Zeitfenster individuell mit Ihnen ab, etwa über Schlüssel oder Zugangscodes.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Melden Sie den Punkt Ihrem Ansprechpartner. Berechtigte Beanstandungen bessern wir zeitnah nach – die Bedingungen unseres Nachbesserungs-Versprechens stehen auf der Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["bueroreinigung-berlin", "unterhaltsreinigung-berlin", "glas-und-fensterreinigung-berlin"],
  },
  {
    slug: "fitnessstudioreinigung-berlin",
    title: "Fitnessstudioreinigung Berlin",
    shortTitle: "Fitnessstudioreinigung",
    metaDescription:
      "Fitnessstudioreinigung in Berlin – Trainingsflächen, Geräte, Umkleiden und Duschen hygienisch gereinigt. Jetzt Angebot anfragen.",
    summary:
      "Hygienische Reinigung von Trainingsflächen, Geräten und Umkleiden.",
    intro:
      "Fitnessstudios sind stark frequentiert und benötigen häufige, hygienische Reinigung. Glanzwerk reinigt Trainingsflächen, Geräte, Umkleiden und Sanitärbereiche in Berlin zuverlässig.",
    challenges: [
      "Trainingsgeräte und Matten werden von vielen Personen nacheinander genutzt und erfordern häufige Reinigung.",
      "Umkleiden und Duschen entwickeln ohne regelmäßige Pflege schnell unangenehme Gerüche.",
      "Reinigungsintervalle, die nicht zur Frequentierung passen, wirken sich direkt auf die hygienische Wahrnehmung aus.",
    ],
    bullets: [
      "Trainingsflächen und Gerätereinigung",
      "Umkleiden, Duschen und Sanitärbereiche",
      "Reinigungsintervalle nach Frequentierung",
    ],
    description: [
      "Trainingsgeräte, Matten und Umkleiden werden in Fitnessstudios von vielen Personen nacheinander genutzt – entsprechend wichtig ist eine regelmäßige, gründliche Reinigung der Kontaktflächen. Wir reinigen Geräte, Böden und Sanitärbereiche in einem an Ihre Öffnungszeiten angepassten Rhythmus.",
      "Bei stark frequentierten Studios lassen sich mehrfache Reinigungstermine pro Tag einplanen, etwa vor Öffnung, in ruhigeren Tagesstunden und nach Kursende.",
    ],
    tasks: [
      "Abwischen von Trainingsgeräten",
      "Bodenreinigung der Trainingsflächen",
      "Reinigung von Umkleiden und Spinden",
      "Reinigung von Duschen und Sanitärbereichen",
    ],
    audiences: [
      "Fitnessstudios",
      "Yoga- und Kursräume",
      "Boxstudios und funktionale Trainingsflächen",
    ],
    benefits: [
      "Reinigungsintervalle passend zur Frequentierung",
      "Fokus auf stark beanspruchte Kontaktflächen",
      "Termine auch am Wochenende möglich",
    ],
    faq: [
      {
        question: "Ist eine Reinigung zwischen Kursen möglich?",
        answer:
          "Ja, bei Bedarf planen wir kurze Reinigungseinsätze zwischen Kursen ein, etwa für Matten und häufig genutzte Geräte.",
      },
      {
        question: "Werden Gerüche in Umkleiden und Duschen behandelt?",
        answer:
          "Eine gründliche Reinigung reduziert Gerüche spürbar. Bei besonderem Bedarf sprechen wir zusätzliche Maßnahmen gezielt mit Ihnen ab.",
      },
      {
        question: "Ist eine Reinigung am Wochenende möglich?",
        answer:
          "Ja, wir richten den Reinigungsplan nach den tatsächlichen Öffnungszeiten Ihres Studios, auch am Wochenende.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Sagen Sie uns Bescheid, was nicht gestimmt hat. Ist die Beanstandung berechtigt, bessern wir zeitnah nach – Näheres dazu auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "grundreinigung-berlin", "glas-und-fensterreinigung-berlin"],
  },
  {
    slug: "autohausreinigung-berlin",
    title: "Autohausreinigung Berlin",
    shortTitle: "Autohausreinigung",
    metaDescription:
      "Autohausreinigung in Berlin für Showrooms, Verkaufsbereiche, Büros und Kundenflächen. Flexible Einsatzzeiten und abgestimmte Reinigungsleistungen.",
    summary:
      "Gepflegte Showrooms, Werkstatt- und Kundenbereiche für Autohäuser.",
    intro:
      "Ein makelloser Showroom ist für Autohäuser Teil der Markenwirkung. Glanzwerk reinigt Ausstellungsflächen, Kundenbereiche und angrenzende Büros in Berlin nach Ihren Vorgaben.",
    challenges: [
      "Fingerabdrücke auf Glasflächen und Fußspuren auf glänzenden Böden fallen im Showroom besonders schnell auf.",
      "Ein ungepflegter Ausstellungsbereich wirkt sich unmittelbar auf die Markenwirkung aus.",
      "Reinigungstermine, die nicht zu Öffnungs- und Werkstattzeiten passen, stören den Kundenverkehr.",
    ],
    bullets: [
      "Showroom- und Glasflächenreinigung",
      "Kunden- und Empfangsbereiche",
      "Abstimmung mit Werkstatt- und Öffnungszeiten",
    ],
    description: [
      "Im Showroom eines Autohauses fallen Fingerabdrücke auf Glasflächen, Fußspuren auf glänzenden Böden und Staub auf Ausstellungsflächen besonders schnell auf. Wir reinigen Showroom, Kundenbereiche und angrenzende Büros in einem auf Ihre Öffnungszeiten abgestimmten Rhythmus.",
      "Der Werkstattbereich selbst gehört in der Regel nicht zum Standardumfang, da hier meist andere Anforderungen an Reinigungsmittel und Bodenschutz gelten. Kundennahe Sozialräume in Werkstattnähe lassen sich auf Wunsch einbeziehen.",
    ],
    tasks: [
      "Reinigung von Showroom-Böden",
      "Reinigung von Glasflächen im Kundenbereich",
      "Reinigung von Empfangs- und Wartebereichen",
      "Reinigung angrenzender Büroflächen",
    ],
    audiences: [
      "Autohäuser mit Showroom",
      "Autowerkstätten mit Kundenbereich",
      "Fahrzeughändler mit Ausstellungsflächen",
    ],
    benefits: [
      "Repräsentativer, gepflegter Showroom",
      "Termine passend zu Öffnungs- und Werkstattzeiten",
      "Fokus auf Glas- und Bodenflächen im Kundenbereich",
    ],
    faq: [
      {
        question: "Ist der Werkstattbereich in der Reinigung enthalten?",
        answer:
          "Der eigentliche Werkstattbereich gehört meist nicht zum Standardumfang, da hier andere Reinigungsanforderungen gelten. Kundennahe Sozialräume lassen sich auf Wunsch einbeziehen.",
      },
      {
        question: "Ist eine Reinigung vor besonderen Terminen möglich?",
        answer:
          "Ja, vor Kundentagen oder Veranstaltungen lässt sich ein zusätzlicher Reinigungstermin einplanen.",
      },
      {
        question: "Wie oft werden Glasflächen im Showroom gereinigt?",
        answer:
          "Das hängt vom Kundenverkehr ab. Bei starker Frequentierung empfehlen sich mehrfache Reinigungstermine pro Woche.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Sprechen Sie uns direkt darauf an. Wir prüfen die Beanstandung und bessern in berechtigten Fällen zeitnah nach – die Bedingungen dazu finden Sie auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["glas-und-fensterreinigung-berlin", "unterhaltsreinigung-berlin", "gebaeudereinigung-berlin"],
  },
  /**
   * Neue Leistung (Juli 2026). Inhalte bewusst vorsichtig formuliert, ohne
   * Zertifizierungen (z. B. HACCP) oder sonstige nicht bestätigte
   * Zusicherungen zu erfinden. Vor Veröffentlichung fachlich vom Betreiber
   * zu bestätigen: tatsächlicher Leistungsumfang, verwendete Mittel für
   * Küchenbereiche, ob Fettabscheider/Dunstabzugsreinigung angeboten wird.
   */
  {
    slug: "gastronomiereinigung-berlin",
    title: "Gastronomiereinigung Berlin",
    shortTitle: "Gastronomiereinigung",
    metaDescription:
      "Gastronomiereinigung in Berlin für Restaurants, Cafés, Bars und Kantinen. Gasträume, Sanitärbereiche und betriebliche Flächen nach Vereinbarung.",
    summary:
      "Gründliche Reinigung von Küchen, Gast- und Thekenbereichen für gastronomische Betriebe.",
    intro:
      "In der Gastronomie zählen Sauberkeit und ein gepflegter Gastraum unmittelbar zum Gästeerlebnis. Glanzwerk reinigt Küchen-, Gast- und Thekenbereiche in Berlin zuverlässig außerhalb Ihrer Öffnungs- und Servicezeiten.",
    challenges: [
      "Verschmutzte Arbeitsflächen und Böden in der Küche wirken sich direkt auf Hygiene und Betriebsablauf aus.",
      "Reinigungstermine während der Service- und Stoßzeiten sind im laufenden Betrieb kaum möglich.",
      "Unklare Zuständigkeiten zwischen Küchenpersonal und Reinigungsteam führen zu Lücken im Reinigungsumfang.",
    ],
    bullets: [
      "Reinigung außerhalb der Öffnungs- und Servicezeiten",
      "Küchenoberflächen, Gastraum und Thekenbereiche",
      "Abstimmung auf betriebliche Abläufe und Stoßzeiten",
    ],
    description: [
      "Küchen und Gasträume werden im laufenden Betrieb stark beansprucht und benötigen eine regelmäßige, gründliche Reinigung, die den Serviceablauf nicht stört. Wir reinigen Arbeitsflächen, Böden und Kontaktflächen in der Küche sowie Gastraum, Theke und Sanitärbereiche nach Betriebsschluss oder vor Öffnung.",
      "Den genauen Leistungsumfang – etwa ob Küchengeräte von außen, Fliesenflächen oder besonders fettige Bereiche einbezogen werden – stimmen wir vorab konkret mit Ihnen ab, damit Zuständigkeiten klar zwischen Küchenpersonal und Reinigungsteam getrennt sind.",
    ],
    tasks: [
      "Reinigung von Arbeitsflächen und Edelstahlflächen in der Küche",
      "Bodenreinigung in Küche und Gastraum",
      "Reinigung von Theke, Tischen und Sitzbereichen",
      "Reinigung von Sanitärbereichen für Gäste und Personal",
      "Reinigung von Küchengeräten von außen nach Absprache",
    ],
    audiences: [
      "Restaurants und Cafés",
      "Kantinen und Betriebsgastronomie",
      "Catering-Küchen und Imbissbetriebe",
    ],
    benefits: [
      "Termine außerhalb von Service- und Stoßzeiten",
      "Klar abgestimmter Leistungsumfang zwischen Küche und Reinigungsteam",
      "Fester Ansprechpartner statt wechselndem Personal",
    ],
    faq: [
      {
        question: "Wird auch die Küche selbst gereinigt oder nur der Gastraum?",
        answer:
          "Beides ist möglich. Den genauen Umfang für Küche, Gastraum und Thekenbereich stimmen wir vorab konkret mit Ihnen ab.",
      },
      {
        question: "Findet die Reinigung während der Öffnungszeiten statt?",
        answer:
          "In der Regel reinigen wir außerhalb Ihrer Service- und Stoßzeiten, etwa nach Betriebsschluss oder vor Öffnung, damit der laufende Betrieb nicht gestört wird.",
      },
      {
        question: "Werden Küchengeräte wie Öfen oder Fritteusen gereinigt?",
        answer:
          "Die äußere Reinigung von Küchengeräten ist nach Absprache möglich. Die genaue Abgrenzung zur Zuständigkeit des Küchenpersonals klären wir vorab individuell mit Ihnen.",
      },
      {
        question: "Was passiert, wenn ich einmal nicht zufrieden bin?",
        answer:
          "Melden Sie sich bei Ihrem Ansprechpartner, sobald etwas nicht passt. Berechtigte Beanstandungen bessern wir zeitnah nach – die Bedingungen dazu stehen auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "grundreinigung-berlin", "gebaeudereinigung-berlin"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}
