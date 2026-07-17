export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  summary: string;
  intro: string;
  bullets: string[];
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
      "Gebäudereinigung in Berlin für Gewerbeimmobilien: laufende Pflege, Treppenhaus, Fenster und Grundreinigung aus einer Hand. Individuelles Angebot anfragen.",
    summary:
      "Umfassende Reinigung für Gewerbeimmobilien – von der laufenden Pflege bis zur Grundreinigung.",
    intro:
      "Als Generalunternehmen für die Gebäudereinigung übernimmt Glanzwerk die komplette Pflege Ihrer Gewerbeimmobilie in Berlin – abgestimmt auf Nutzung, Frequentierung und Budget.",
    bullets: [
      "Individuelle Reinigungskonzepte je nach Objekt",
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
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "grundreinigung-berlin", "treppenhausreinigung-berlin"],
  },
  {
    slug: "bueroreinigung-berlin",
    title: "Büroreinigung Berlin",
    shortTitle: "Büroreinigung",
    metaDescription:
      "Büroreinigung in Berlin außerhalb der Geschäftszeiten – Schreibtische, Böden, Sanitär- und Teeküchenbereiche. Jetzt Angebot für Ihr Büro anfragen.",
    summary:
      "Saubere Arbeitsplätze für Mitarbeitende und Kunden – diskret, zuverlässig, außerhalb der Kernarbeitszeit.",
    intro:
      "Ein gepflegtes Büro wirkt sich direkt auf Konzentration, Wohlbefinden und den ersten Eindruck bei Kunden aus. Glanzwerk reinigt Ihre Büroflächen in Berlin nach einem festen, mit Ihnen abgestimmten Plan.",
    bullets: [
      "Reinigung außerhalb der Geschäftszeiten möglich",
      "Schreibtische, Böden, Sanitär- und Teeküchenbereiche",
      "Diskrete, geschulte Reinigungskräfte",
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
      "Kleinere Büros und Praxisverwaltungen",
      "Gemeinschaftlich genutzte Büroflächen",
      "Größere Verwaltungs- und Empfangsbereiche",
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
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "glasreinigung-berlin", "kanzleireinigung-berlin"],
  },
  {
    slug: "praxisreinigung-berlin",
    title: "Praxisreinigung Berlin",
    shortTitle: "Praxisreinigung",
    metaDescription:
      "Praxisreinigung in Berlin für Arztpraxen und medizinische Einrichtungen – abgestimmt auf Sprechzeiten, diskret durchgeführt. Jetzt Angebot anfragen.",
    summary:
      "Hygienegerechte Reinigung für Arztpraxen und medizinische Einrichtungen.",
    intro:
      "Arztpraxen stellen besondere Anforderungen an Hygiene und einen reibungslosen Praxisablauf. Glanzwerk reinigt Warte-, Empfangs- und Behandlungsräume in Berlin nach einem auf Ihre Sprechzeiten abgestimmten Ablauf.",
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
    ],
    relatedSlugs: ["grundreinigung-berlin", "unterhaltsreinigung-berlin", "kita-und-schulreinigung-berlin"],
  },
  {
    slug: "unterhaltsreinigung-berlin",
    title: "Unterhaltsreinigung Berlin",
    shortTitle: "Unterhaltsreinigung",
    metaDescription:
      "Regelmäßige Unterhaltsreinigung für Gewerbeobjekte in Berlin – fester Rhythmus, planbare Kosten. Jetzt individuelles Angebot anfragen.",
    summary:
      "Regelmäßige Pflegereinigung, damit Ihr Gewerbeobjekt dauerhaft gepflegt bleibt.",
    intro:
      "Die Unterhaltsreinigung sorgt für einen gleichbleibend gepflegten Zustand Ihrer Räume – als wiederkehrender Service in dem von Ihnen gewünschten Rhythmus.",
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
    ],
    relatedSlugs: ["gebaeudereinigung-berlin", "bueroreinigung-berlin", "grundreinigung-berlin"],
  },
  {
    slug: "treppenhausreinigung-berlin",
    title: "Treppenhausreinigung Berlin",
    shortTitle: "Treppenhausreinigung",
    metaDescription:
      "Treppenhausreinigung in Berlin für Hausverwaltungen und WEG – Treppen, Handläufe, Briefkastenanlagen. Jetzt Angebot für Ihr Treppenhaus anfragen.",
    summary:
      "Gepflegte Treppenhäuser und Eingangsbereiche für Wohn- und Gewerbeobjekte.",
    intro:
      "Ein sauberes Treppenhaus ist die Visitenkarte eines jeden Gebäudes. Glanzwerk übernimmt die regelmäßige Reinigung von Treppen, Fluren und Eingangsbereichen in Berlin.",
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
    ],
    relatedSlugs: ["gebaeudereinigung-berlin", "fensterreinigung-berlin", "grundreinigung-berlin"],
  },
  {
    slug: "fensterreinigung-berlin",
    title: "Fensterreinigung Berlin",
    shortTitle: "Fensterreinigung",
    metaDescription:
      "Fensterreinigung in Berlin für Gewerbeobjekte – innen und außen, streifenfrei. Auch für höhere Stockwerke. Jetzt Angebot anfragen.",
    summary: "Streifenfreie Fensterreinigung innen und außen für Gewerbeobjekte.",
    intro:
      "Klare Fenster verbessern Lichteinfall und Außenwirkung Ihres Objekts. Glanzwerk reinigt Fensterflächen in Berlin innen und außen, auch in größeren Höhen.",
    bullets: [
      "Innen- und Außenreinigung",
      "Rahmen, Fensterbänke und Falze inklusive",
      "Auch für höhere Gebäude mit geeigneter Ausrüstung",
    ],
    description: [
      "Fenster verschmutzen durch Witterung, Straßenstaub und – im Innenbereich – durch normale Nutzung sichtbar schneller als andere Flächen. Ein regelmäßiger Reinigungsrhythmus verhindert hartnäckige Kalk- und Wasserflecken und hält den Lichteinfall in Ihren Räumen konstant hoch.",
      "Für höhere Stockwerke arbeiten wir mit geeigneter Ausrüstung; die genaue Vorgehensweise besprechen wir vorab abhängig von Gebäudehöhe und Zugänglichkeit. Witterungsabhängige Verschiebungen einzelner Termine sind möglich und werden mit Ihnen abgestimmt.",
    ],
    tasks: [
      "Reinigung der Glasflächen innen und außen",
      "Reinigung von Rahmen und Fensterfalzen",
      "Reinigung von Fensterbänken",
      "Reinigung von Lüftungsflügeln und Oberlichtern",
    ],
    audiences: [
      "Bürogebäude mit großen Fensterflächen",
      "Ladenflächen mit Schaufenstern",
      "Mehrgeschossige Gewerbeobjekte",
    ],
    benefits: [
      "Streifenfreies Ergebnis innen und außen",
      "Regelmäßiger Rhythmus verhindert hartnäckige Verschmutzungen",
      "Geeignete Ausrüstung auch für höhere Stockwerke",
    ],
    faq: [
      {
        question: "Wie oft sollte eine Fensterreinigung stattfinden?",
        answer:
          "Das hängt von Lage und Nutzung ab. Für die meisten Gewerbeobjekte empfiehlt sich ein Rhythmus von mehreren Terminen pro Jahr, den wir individuell mit Ihnen abstimmen.",
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
    ],
    relatedSlugs: ["glasreinigung-berlin", "treppenhausreinigung-berlin", "gebaeudereinigung-berlin"],
  },
  {
    slug: "glasreinigung-berlin",
    title: "Glasreinigung Berlin",
    shortTitle: "Glasreinigung",
    metaDescription:
      "Glasreinigung in Berlin für Fassaden, Trennwände und Vitrinen – streifenfrei und rückstandsfrei. Jetzt Angebot für Ihr Objekt anfragen.",
    summary:
      "Professionelle Reinigung von Glasfassaden, Trennwänden und Vitrinen.",
    intro:
      "Über die klassische Fensterreinigung hinaus reinigt Glanzwerk Glasfassaden, Glastrennwände und Vitrinen in Berliner Gewerbeobjekten für ein durchgängig hochwertiges Erscheinungsbild.",
    bullets: [
      "Glasfassaden und Eingangsbereiche",
      "Trennwände und Vitrinen im Innenbereich",
      "Rückstandsfreie, streifenfreie Reinigung",
    ],
    description: [
      "Glasflächen im Innenbereich – etwa Trennwände in Büros, Vitrinen in Ausstellungsräumen oder Glastüren im Eingangsbereich – zeigen Fingerabdrücke und Fettspuren besonders deutlich. Anders als die klassische Fensterreinigung liegt der Fokus hier auf stark frequentierten, oft repräsentativen Innenflächen.",
      "Auch großflächige Glasfassaden gehören zum Leistungsspektrum. Je nach Höhe und Zugänglichkeit stimmen wir Ausrüstung und Vorgehensweise individuell ab.",
    ],
    tasks: [
      "Reinigung von Glasfassaden",
      "Reinigung von Glastrennwänden im Innenbereich",
      "Reinigung von Vitrinen und Schaukästen",
      "Reinigung von Glaseingangstüren",
    ],
    audiences: [
      "Autohäuser mit Glasfronten",
      "Ladengeschäfte mit Vitrinen",
      "Bürogebäude mit Glastrennwänden im Innenbereich",
    ],
    benefits: [
      "Rückstandsfreies Ergebnis auch bei Fingerabdrücken",
      "Geeignet für repräsentative, stark frequentierte Bereiche",
      "Abstimmung auf Öffnungszeiten möglich",
    ],
    faq: [
      {
        question: "Worin unterscheidet sich die Glasreinigung von der Fensterreinigung?",
        answer:
          "Die Fensterreinigung bezieht sich auf klassische Fenster. Die Glasreinigung deckt zusätzlich Glasfassaden, Innentrennwände und Vitrinen ab, die andere Anforderungen an Reinigungsmittel und Technik stellen.",
      },
      {
        question: "Werden spezielle Reiniger für Vitrinen verwendet?",
        answer:
          "Ja, je nach Material und Verschmutzung setzen wir passende, schonende Reinigungsmittel ein, damit Oberflächen nicht beschädigt werden.",
      },
      {
        question: "Ist eine Reinigung während der Öffnungszeiten möglich?",
        answer:
          "In vielen Fällen ja, insbesondere bei kurzen, gezielten Einsätzen. Für umfangreichere Arbeiten empfehlen sich Zeiten außerhalb des Kundenverkehrs.",
      },
    ],
    relatedSlugs: ["fensterreinigung-berlin", "bueroreinigung-berlin", "autohausreinigung-berlin"],
  },
  {
    slug: "grundreinigung-berlin",
    title: "Grundreinigung Berlin",
    shortTitle: "Grundreinigung",
    metaDescription:
      "Grundreinigung in Berlin für Neubezug, nach Renovierung oder als Auffrischung – intensive Tiefenreinigung. Jetzt Angebot anfragen.",
    summary:
      "Intensive Tiefenreinigung für Neubezug, Sanierung oder nach längerer Zeit ohne Pflege.",
    intro:
      "Bei der Grundreinigung werden Flächen intensiv und vollständig aufbereitet – etwa vor dem Bezug neuer Räume, nach Bauarbeiten oder in größeren Abständen zur Auffrischung.",
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
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "grundreinigung-berlin", "praxisreinigung-berlin"],
  },
  {
    slug: "kanzleireinigung-berlin",
    title: "Kanzleireinigung Berlin",
    shortTitle: "Kanzleireinigung",
    metaDescription:
      "Kanzleireinigung in Berlin für Rechtsanwälte, Steuerberater und Notariate – diskret und mit festen Teams. Jetzt Angebot anfragen.",
    summary:
      "Diskrete, zuverlässige Reinigung für Kanzleien mit hohem Anspruch an Vertraulichkeit.",
    intro:
      "Kanzleien benötigen einen Reinigungspartner, der Vertraulichkeit ernst nimmt. Glanzwerk reinigt Büro-, Empfangs- und Besprechungsräume in Berlin zuverlässig und diskret.",
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
    ],
    relatedSlugs: ["bueroreinigung-berlin", "unterhaltsreinigung-berlin", "glasreinigung-berlin"],
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
    ],
    relatedSlugs: ["unterhaltsreinigung-berlin", "grundreinigung-berlin", "glasreinigung-berlin"],
  },
  {
    slug: "autohausreinigung-berlin",
    title: "Autohausreinigung Berlin",
    shortTitle: "Autohausreinigung",
    metaDescription:
      "Autohausreinigung in Berlin für Showroom, Kundenbereiche und Glasflächen – repräsentativ und zuverlässig. Jetzt Angebot anfragen.",
    summary:
      "Gepflegte Showrooms, Werkstatt- und Kundenbereiche für Autohäuser.",
    intro:
      "Ein makelloser Showroom ist für Autohäuser Teil der Markenwirkung. Glanzwerk reinigt Ausstellungsflächen, Kundenbereiche und angrenzende Büros in Berlin nach Ihren Vorgaben.",
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
    ],
    relatedSlugs: ["glasreinigung-berlin", "unterhaltsreinigung-berlin", "gebaeudereinigung-berlin"],
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
