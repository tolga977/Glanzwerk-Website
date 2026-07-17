export interface Ortsteil {
  slug: string;
  name: string;
}

export interface DistrictFaqItem {
  question: string;
  answer: string;
}

export interface District {
  slug: string;
  name: string;
  summary: string;
  metaDescription: string;
  intro: string;
  localContext: string[];
  audiences: string[];
  featuredServiceSlugs: string[];
  faq: DistrictFaqItem[];
  neighborSlugs: string[];
  ortsteile: Ortsteil[];
}

export const districts: District[] = [
  {
    slug: "mitte",
    name: "Mitte",
    summary:
      "Gewerbereinigung für Büros, Kanzleien und Gewerbeobjekte im Bezirk Mitte.",
    metaDescription:
      "Gebäudereinigung in Berlin-Mitte für Büros, Kanzleien und Praxen. Glanzwerk reinigt Gewerbeobjekte im Bezirk Mitte zuverlässig. Angebot anfragen.",
    intro:
      "Mitte zählt zu den am dichtesten mit Büros, Kanzleien und Verwaltungen bebauten Bezirken Berlins. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig und diskret.",
    localContext: [
      "Rund um Regierungsviertel, Alexanderplatz und die angrenzenden Geschäftsstraßen liegen viele Bürostandorte dicht beieinander – von kleineren Kanzleien in Altbauten bis zu größeren Verwaltungsflächen in modernen Gebäuden. Das stellt unterschiedliche Anforderungen an Zutritt, Zeitfenster und Diskretion.",
      "Wir richten Reinigungstermine in Mitte häufig auf enge Zeitfenster außerhalb der Geschäftszeiten aus, da viele Objekte im Bezirk stark frequentiert sind und tagsüber wenig Spielraum für Reinigungsarbeiten lassen.",
    ],
    audiences: [
      "Bürostandorte und Kanzleien im Zentrum",
      "Verwaltungsflächen mit hohem Publikumsverkehr",
      "Gewerbeobjekte in historischen und modernen Gebäuden",
    ],
    featuredServiceSlugs: ["bueroreinigung-berlin", "kanzleireinigung-berlin", "gebaeudereinigung-berlin"],
    faq: [
      {
        question: "Bedient Glanzwerk auch kleinere Kanzleien in Mitte?",
        answer:
          "Ja, wir reinigen sowohl kleinere Kanzleiflächen in Altbauten als auch größere Bürostandorte im Bezirk Mitte.",
      },
      {
        question: "Ist eine Reinigung in engen Zeitfenstern möglich?",
        answer:
          "Ja, gerade in zentralen Lagen mit hoher Auslastung stimmen wir kurze, feste Zeitfenster außerhalb der Geschäftszeiten mit Ihnen ab.",
      },
    ],
    neighborSlugs: ["pankow", "friedrichshain-kreuzberg", "charlottenburg-wilmersdorf", "tempelhof-schoeneberg"],
    ortsteile: [],
  },
  {
    slug: "friedrichshain-kreuzberg",
    name: "Friedrichshain-Kreuzberg",
    summary: "Reinigungsservice für Unternehmen in Friedrichshain-Kreuzberg.",
    metaDescription:
      "Gebäudereinigung in Friedrichshain-Kreuzberg für Büros, Coworking-Flächen und Gewerbeobjekte. Glanzwerk als zuverlässiger Reinigungspartner. Angebot anfragen.",
    intro:
      "Friedrichshain-Kreuzberg ist geprägt von einer wachsenden Zahl kleinerer Unternehmen, Agenturen und gemeinschaftlich genutzter Büroflächen. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Viele Unternehmen im Bezirk sind in Altbauten, umgenutzten Gewerbehöfen oder gemeinschaftlich genutzten Bürohäusern untergebracht. Das bringt oft unregelmäßige Grundrisse und unterschiedliche Zugangswege mit sich, auf die wir uns individuell einstellen.",
      "Da in vielen Objekten mehrere kleinere Firmen unter einem Dach arbeiten, stimmen wir Reinigungszeiten häufig mit mehreren Ansprechpartnern oder einer gemeinsamen Hausverwaltung ab.",
    ],
    audiences: [
      "Kleinere Büros und Agenturen",
      "Gemeinschaftlich genutzte Bürohäuser",
      "Gewerbeeinheiten in umgenutzten Altbauten",
    ],
    featuredServiceSlugs: ["bueroreinigung-berlin", "unterhaltsreinigung-berlin", "treppenhausreinigung-berlin"],
    faq: [
      {
        question: "Reinigt Glanzwerk auch einzelne Etagen in gemeinschaftlich genutzten Bürohäusern?",
        answer:
          "Ja, wir reinigen sowohl einzelne Büroeinheiten als auch ganze Etagen und stimmen die Organisation bei mehreren Mietparteien direkt mit der Hausverwaltung ab.",
      },
      {
        question: "Sind auch unregelmäßige Grundrisse in Altbauten kein Problem?",
        answer:
          "Nein, wir passen Zeitaufwand und Vorgehen an die jeweilige Raumaufteilung an – das besprechen wir bei der ersten Besichtigung.",
      },
    ],
    neighborSlugs: ["mitte", "lichtenberg", "treptow-koepenick", "neukoelln", "tempelhof-schoeneberg"],
    ortsteile: [],
  },
  {
    slug: "pankow",
    name: "Pankow",
    summary: "Gebäudereinigung für Gewerbeobjekte im Bezirk Pankow.",
    metaDescription:
      "Gebäudereinigung in Pankow für Kitas, Praxen und Gewerbeobjekte. Glanzwerk reinigt zuverlässig im Einsatzgebiet Pankow. Jetzt Angebot anfragen.",
    intro:
      "Pankow verbindet gewachsene Wohnlagen mit einer steigenden Zahl an Kitas, Praxen und kleineren Gewerbebetrieben. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Mit dem Bevölkerungswachstum im Bezirk ist auch die Zahl an Kindertagesstätten, Arztpraxen und kleineren Gewerbeflächen in Wohnnähe gestiegen. Für diese Objekte ist eine Reinigung außerhalb der Betreuungs- beziehungsweise Sprechzeiten besonders wichtig.",
      "Viele Gewerbeeinheiten in Pankow liegen in gemischt genutzten Gebäuden mit Wohnungen in den oberen Etagen, was bei der Terminplanung und der Rücksicht auf Anwohner berücksichtigt wird.",
    ],
    audiences: [
      "Kindertagesstätten und Schulen",
      "Arztpraxen in Wohnnähe",
      "Kleinere Gewerbeflächen in gemischt genutzten Gebäuden",
    ],
    featuredServiceSlugs: ["kita-und-schulreinigung-berlin", "praxisreinigung-berlin", "unterhaltsreinigung-berlin"],
    faq: [
      {
        question: "Wird bei der Reinigung Rücksicht auf Anwohner genommen?",
        answer:
          "Ja, gerade in gemischt genutzten Gebäuden mit Wohnungen stimmen wir Zeitfenster so ab, dass Anwohner möglichst wenig gestört werden.",
      },
      {
        question: "Reinigt Glanzwerk auch kleinere Kitas in Pankow?",
        answer:
          "Ja, wir reinigen Kitas unterschiedlicher Größe und richten uns dabei nach den jeweiligen Betreuungszeiten der Einrichtung.",
      },
    ],
    neighborSlugs: ["mitte", "reinickendorf", "lichtenberg", "friedrichshain-kreuzberg"],
    ortsteile: [],
  },
  {
    slug: "charlottenburg-wilmersdorf",
    name: "Charlottenburg-Wilmersdorf",
    summary:
      "Reinigungsservice für Büros und Gewerbeobjekte in Charlottenburg-Wilmersdorf.",
    metaDescription:
      "Gebäudereinigung in Charlottenburg-Wilmersdorf für Büros, Kanzleien, Praxen und Autohäuser rund um den Kurfürstendamm. Jetzt Angebot anfragen.",
    intro:
      "Charlottenburg-Wilmersdorf ist einer der etabliertesten Geschäftsstandorte Berlins, mit repräsentativen Büro- und Geschäftsflächen rund um den Kurfürstendamm. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Entlang von Kurfürstendamm und angrenzenden Geschäftsstraßen liegen zahlreiche Ladengeschäfte, Autohäuser und repräsentative Büroflächen, bei denen ein gepflegtes Erscheinungsbild direkt auf Kunden und Mandanten wirkt.",
      "Gleichzeitig prägen viele Altbauten mit Kanzleien, Arztpraxen und Wohn-Geschäftshäusern den Bezirk – hier zählt neben der Optik auch die Abstimmung auf Sprechzeiten und einen ruhigen, störungsarmen Ablauf.",
    ],
    audiences: [
      "Autohäuser und Ladengeschäfte am Kurfürstendamm",
      "Kanzleien und Praxen in Altbaulagen",
      "Repräsentative Büroflächen",
    ],
    featuredServiceSlugs: ["autohausreinigung-berlin", "glasreinigung-berlin", "kanzleireinigung-berlin"],
    faq: [
      {
        question: "Reinigt Glanzwerk auch Schaufenster und Glasflächen am Kurfürstendamm?",
        answer:
          "Ja, Glas- und Fensterreinigung für Ladengeschäfte und Showrooms gehört zu unseren Kernleistungen im Bezirk.",
      },
      {
        question: "Wird auf Kanzleizeiten in Altbaulagen Rücksicht genommen?",
        answer:
          "Ja, wir stimmen Zutritt und Zeitfenster individuell mit Kanzleien und Praxen im Bezirk ab.",
      },
    ],
    neighborSlugs: ["mitte", "spandau", "reinickendorf", "steglitz-zehlendorf", "tempelhof-schoeneberg"],
    ortsteile: [
      { slug: "charlottenburg", name: "Charlottenburg" },
      { slug: "wilmersdorf", name: "Wilmersdorf" },
    ],
  },
  {
    slug: "spandau",
    name: "Spandau",
    summary: "Gewerbereinigung für Unternehmen im Bezirk Spandau.",
    metaDescription:
      "Gebäudereinigung in Spandau für Gewerbeflächen, Autohäuser und Büros. Glanzwerk reinigt zuverlässig im Einsatzgebiet Spandau. Angebot anfragen.",
    intro:
      "Spandau bietet mit seinen Gewerbegebieten und Betrieben am Stadtrand Platz für größere Gewerbeflächen. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Neben der historischen Altstadt prägen vor allem Gewerbegebiete und größere Betriebsflächen den Bezirk – von Autohäusern über Werkstätten bis zu Bürostandorten mit angeschlossenen Lager- oder Ausstellungsflächen.",
      "Für diese Objekte ist häufig eine Kombination mehrerer Reinigungsleistungen sinnvoll, etwa Unterhaltsreinigung der Büroflächen zusammen mit Glasreinigung für Ausstellungsbereiche.",
    ],
    audiences: [
      "Autohäuser und Werkstätten mit Kundenbereich",
      "Gewerbeflächen mit angeschlossenen Büros",
      "Betriebe in Gewerbegebieten",
    ],
    featuredServiceSlugs: ["autohausreinigung-berlin", "gebaeudereinigung-berlin", "unterhaltsreinigung-berlin"],
    faq: [
      {
        question: "Werden auch größere Gewerbeflächen in Spandau bedient?",
        answer:
          "Ja, wir reinigen sowohl kleinere Büros als auch größere zusammenhängende Gewerbeflächen im Bezirk.",
      },
      {
        question: "Lassen sich mehrere Reinigungsleistungen kombinieren?",
        answer:
          "Ja, insbesondere bei Autohäusern und größeren Gewerbeobjekten bündeln wir häufig mehrere Teilleistungen in einem Vertrag.",
      },
    ],
    neighborSlugs: ["charlottenburg-wilmersdorf", "reinickendorf"],
    ortsteile: [],
  },
  {
    slug: "steglitz-zehlendorf",
    name: "Steglitz-Zehlendorf",
    summary: "Reinigungsservice für Gewerbeobjekte in Steglitz-Zehlendorf.",
    metaDescription:
      "Gebäudereinigung in Steglitz-Zehlendorf für Praxen, Kanzleien und Schulen in ruhiger Lage. Glanzwerk als Reinigungspartner. Jetzt Angebot anfragen.",
    intro:
      "Steglitz-Zehlendorf ist geprägt von ruhigen Wohnlagen mit vielen Arztpraxen, Kanzleien und Bildungseinrichtungen. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "In den villenartigen Wohngebieten und entlang der Geschäftsstraßen finden sich überdurchschnittlich viele Arztpraxen, kleinere Kanzleien und Schulen. Diskretion und ein ruhiger, unauffälliger Reinigungsablauf stehen hier meist im Vordergrund.",
      "Da viele Objekte in Wohnnähe liegen, planen wir Reinigungstermine so, dass sie sich unauffällig in den Tagesablauf des Umfelds einfügen.",
    ],
    audiences: [
      "Arztpraxen und Gemeinschaftspraxen",
      "Kanzleien in ruhiger Lage",
      "Schulen und Bildungseinrichtungen",
    ],
    featuredServiceSlugs: ["praxisreinigung-berlin", "kita-und-schulreinigung-berlin", "kanzleireinigung-berlin"],
    faq: [
      {
        question: "Ist eine besonders diskrete Reinigung für Praxen möglich?",
        answer:
          "Ja, gerade in Wohnnähe legen wir Wert auf einen unauffälligen, ruhigen Reinigungsablauf außerhalb der Sprechzeiten.",
      },
      {
        question: "Werden auch Schulen in Steglitz-Zehlendorf bedient?",
        answer:
          "Ja, wir reinigen Schulen und Bildungseinrichtungen im Bezirk außerhalb des Unterrichtsbetriebs.",
      },
    ],
    neighborSlugs: ["charlottenburg-wilmersdorf", "tempelhof-schoeneberg"],
    ortsteile: [
      { slug: "steglitz", name: "Steglitz" },
      { slug: "zehlendorf", name: "Zehlendorf" },
    ],
  },
  {
    slug: "tempelhof-schoeneberg",
    name: "Tempelhof-Schöneberg",
    summary: "Gebäudereinigung für Unternehmen in Tempelhof-Schöneberg.",
    metaDescription:
      "Gebäudereinigung in Tempelhof-Schöneberg für Büros, Kanzleien und Gewerbegebiete. Glanzwerk als zuverlässiger Reinigungspartner. Angebot anfragen.",
    intro:
      "Tempelhof-Schöneberg vereint das urbane Schöneberg mit den Gewerbegebieten rund um Tempelhof. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "In Schöneberg dominieren Büros, Kanzleien und Wohn-Geschäftshäuser mit gemischter Nutzung, während im Tempelhofer Teil des Bezirks größere Gewerbe- und Bürogebäude mit mehreren Mietparteien üblich sind.",
      "Bei mehrstöckigen Objekten mit mehreren Mietern spielt die Treppenhausreinigung neben der klassischen Büroreinigung eine wichtige Rolle, die wir häufig gemeinsam mit Hausverwaltungen abstimmen.",
    ],
    audiences: [
      "Büros und Kanzleien in Schöneberg",
      "Gewerbegebäude mit mehreren Mietparteien in Tempelhof",
      "Hausverwaltungen mit Treppenhausbedarf",
    ],
    featuredServiceSlugs: ["treppenhausreinigung-berlin", "bueroreinigung-berlin", "gebaeudereinigung-berlin"],
    faq: [
      {
        question: "Werden auch größere Gewerbegebäude mit mehreren Mietern in Tempelhof betreut?",
        answer:
          "Ja, wir reinigen sowohl einzelne Büroeinheiten als auch ganze Gebäude mit mehreren Mietparteien.",
      },
      {
        question: "Ist eine Kombination aus Büro- und Treppenhausreinigung möglich?",
        answer:
          "Ja, das lässt sich in einem gemeinsamen Reinigungskonzept bündeln, insbesondere wenn eine Hausverwaltung mehrere Bereiche koordiniert.",
      },
    ],
    neighborSlugs: ["mitte", "neukoelln", "steglitz-zehlendorf", "charlottenburg-wilmersdorf"],
    ortsteile: [
      { slug: "tempelhof", name: "Tempelhof" },
      { slug: "schoeneberg", name: "Schöneberg" },
    ],
  },
  {
    slug: "neukoelln",
    name: "Neukölln",
    summary: "Reinigungsservice für Gewerbeobjekte im Bezirk Neukölln.",
    metaDescription:
      "Gebäudereinigung in Neukölln für Büros, Fitnessstudios und Gewerbeflächen, auch in Rudow. Glanzwerk als Reinigungspartner. Jetzt Angebot anfragen.",
    intro:
      "Neukölln entwickelt sich mit einer wachsenden Zahl kleinerer Unternehmen, Studios und Gewerbeflächen dynamisch weiter. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Neben dem dicht bebauten Kern des Bezirks liegen im südlichen Teil, etwa in Rudow, größere Gewerbeflächen mit Bürogebäuden und Gewerbeparks. Beide Lagen unterscheiden sich deutlich in Objektgröße und Zugänglichkeit.",
      "In den vergangenen Jahren sind zudem mehr Fitnessstudios und Gemeinschaftsbüros entstanden, für die eine hygienische, gut getaktete Reinigung besonders relevant ist.",
    ],
    audiences: [
      "Kleinere Büros und Gemeinschaftsbüros",
      "Fitnessstudios und Kursräume",
      "Gewerbeflächen in Rudow und südlichem Neukölln",
    ],
    featuredServiceSlugs: ["fitnessstudioreinigung-berlin", "unterhaltsreinigung-berlin", "gebaeudereinigung-berlin"],
    faq: [
      {
        question: "Werden auch Gewerbeflächen in Rudow bedient?",
        answer:
          "Ja, Rudow gehört zu unserem Einsatzgebiet in Neukölln, ebenso wie die dichter bebauten Lagen im Kern des Bezirks.",
      },
      {
        question: "Reinigt Glanzwerk auch kleinere Fitnessstudios?",
        answer:
          "Ja, wir reinigen Studios unterschiedlicher Größe und richten den Rhythmus nach der jeweiligen Frequentierung aus.",
      },
    ],
    neighborSlugs: ["friedrichshain-kreuzberg", "tempelhof-schoeneberg", "treptow-koepenick"],
    ortsteile: [{ slug: "rudow", name: "Rudow" }],
  },
  {
    slug: "treptow-koepenick",
    name: "Treptow-Köpenick",
    summary: "Gebäudereinigung für Unternehmen in Treptow-Köpenick.",
    metaDescription:
      "Gebäudereinigung in Treptow-Köpenick für Gewerbeflächen und Büros, auch in Köpenick. Glanzwerk als Reinigungspartner. Jetzt Angebot anfragen.",
    intro:
      "Treptow-Köpenick ist der flächenmäßig größte Berliner Bezirk mit Gewerbegebieten, Wasserlage und einem eigenständigen Ortskern in Köpenick. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Neben klassischen Bürostandorten prägen größere Gewerbe- und Betriebsflächen mit teils weitläufigen Grundrissen den Bezirk. Anfahrtswege und Objektgröße spielen bei der Planung eine größere Rolle als in dichter bebauten Innenstadtbezirken.",
      "Der Ortskern Köpenick mit seinen Geschäften und Praxen bildet einen eigenen Schwerpunkt innerhalb des Bezirks, den wir bei der Terminplanung separat berücksichtigen.",
    ],
    audiences: [
      "Gewerbeflächen mit größeren Grundrissen",
      "Büros und Praxen im Ortskern Köpenick",
      "Betriebe in Gewerbegebieten am Stadtrand",
    ],
    featuredServiceSlugs: ["gebaeudereinigung-berlin", "unterhaltsreinigung-berlin", "grundreinigung-berlin"],
    faq: [
      {
        question: "Werden auch weitläufige Gewerbeflächen in Treptow-Köpenick gereinigt?",
        answer:
          "Ja, wir kalkulieren bei größeren, weitläufigen Objekten Anfahrt und Zeitaufwand entsprechend in das Angebot ein.",
      },
      {
        question: "Ist Köpenick als eigener Standort abgedeckt?",
        answer:
          "Ja, der Ortskern Köpenick gehört zu unserem Einsatzgebiet innerhalb des Bezirks Treptow-Köpenick.",
      },
    ],
    neighborSlugs: ["friedrichshain-kreuzberg", "neukoelln", "lichtenberg", "marzahn-hellersdorf"],
    ortsteile: [{ slug: "koepenick", name: "Köpenick" }],
  },
  {
    slug: "marzahn-hellersdorf",
    name: "Marzahn-Hellersdorf",
    summary: "Reinigungsservice für Gewerbeobjekte in Marzahn-Hellersdorf.",
    metaDescription:
      "Gebäudereinigung in Marzahn-Hellersdorf für Gewerbeflächen, Büros und Einkaufszentren. Glanzwerk als Reinigungspartner. Jetzt Angebot anfragen.",
    intro:
      "Marzahn-Hellersdorf bietet mit großzügig geschnittenen Gewerbegebieten Platz für größere Flächen und Einkaufszentren. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Die Gewerbegebiete des Bezirks sind häufig großzügiger geschnitten als in der Innenstadt, mit größeren zusammenhängenden Büro- und Verkaufsflächen. Das erlaubt effiziente, gut planbare Reinigungseinsätze mit klar abgegrenzten Bereichen.",
      "Gleichzeitig gibt es eine wachsende Zahl kleinerer Dienstleister und Praxen in den Wohngebieten, für die ein flexibler, kleinerer Reinigungsumfang passender ist.",
    ],
    audiences: [
      "Größere Gewerbeflächen und Bürostandorte",
      "Einkaufs- und Geschäftszentren",
      "Kleinere Praxen und Dienstleister in Wohnnähe",
    ],
    featuredServiceSlugs: ["gebaeudereinigung-berlin", "unterhaltsreinigung-berlin", "praxisreinigung-berlin"],
    faq: [
      {
        question: "Werden auch größere zusammenhängende Gewerbeflächen betreut?",
        answer:
          "Ja, für großzügig geschnittene Flächen erstellen wir ein Reinigungskonzept, das auf klar abgegrenzte Bereiche und Zeitfenster setzt.",
      },
      {
        question: "Ist auch ein kleinerer Reinigungsumfang für Praxen möglich?",
        answer:
          "Ja, wir passen den Umfang an die tatsächliche Größe und Nutzung einer Praxis oder eines kleineren Dienstleisters an.",
      },
    ],
    neighborSlugs: ["lichtenberg", "treptow-koepenick", "pankow"],
    ortsteile: [],
  },
  {
    slug: "lichtenberg",
    name: "Lichtenberg",
    summary: "Gebäudereinigung für Unternehmen im Bezirk Lichtenberg.",
    metaDescription:
      "Gebäudereinigung in Lichtenberg für Büros und Gewerbeflächen in wachsenden Standorten. Glanzwerk als Reinigungspartner. Jetzt Angebot anfragen.",
    intro:
      "Lichtenberg hat sich in den vergangenen Jahren zu einem wachsenden Bürostandort mit vielen neuen Gewerbeflächen entwickelt. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Rund um neu entstandene Bürokomplexe und Gewerbeparks hat sich in Lichtenberg in den letzten Jahren einiges getan. Viele Objekte sind neuer und technisch anders ausgestattet als in gewachsenen Innenstadtlagen, etwa mit größeren Glasflächen oder offenen Bürolandschaften.",
      "Für diese neueren Gebäude lohnt sich häufig eine Kombination aus Unterhalts- und Glasreinigung, um das moderne Erscheinungsbild dauerhaft zu erhalten.",
    ],
    audiences: [
      "Neuere Bürokomplexe und Gewerbeparks",
      "Offene Bürolandschaften mit großen Glasflächen",
      "Wachsende Unternehmen mit neuem Bürostandort",
    ],
    featuredServiceSlugs: ["gebaeudereinigung-berlin", "glasreinigung-berlin", "unterhaltsreinigung-berlin"],
    faq: [
      {
        question: "Sind moderne Bürokomplexe mit viel Glas kein Problem?",
        answer:
          "Nein, gerade für neuere Gebäude mit großen Glasflächen kombinieren wir häufig Unterhalts- und Glasreinigung in einem Konzept.",
      },
      {
        question: "Reinigt Glanzwerk auch offene Bürolandschaften?",
        answer:
          "Ja, offene Flächen ohne feste Raumtrennung reinigen wir ebenso wie klassisch aufgeteilte Büros.",
      },
    ],
    neighborSlugs: ["pankow", "friedrichshain-kreuzberg", "treptow-koepenick", "marzahn-hellersdorf"],
    ortsteile: [],
  },
  {
    slug: "reinickendorf",
    name: "Reinickendorf",
    summary: "Reinigungsservice für Gewerbeobjekte im Bezirk Reinickendorf.",
    metaDescription:
      "Gebäudereinigung in Reinickendorf für Gewerbeparks, Büros und mittelständische Betriebe. Glanzwerk als Reinigungspartner. Jetzt Angebot anfragen.",
    intro:
      "Reinickendorf ist geprägt von Gewerbeparks und mittelständischen Betrieben rund um das Gebiet des ehemaligen Flughafens Tegel. Glanzwerk reinigt Gewerbeobjekte in diesem Einsatzgebiet zuverlässig.",
    localContext: [
      "Rund um die ehemalige Flughafenfläche und angrenzende Gewerbegebiete haben sich zahlreiche mittelständische Betriebe mit eigenen Büro- und Lagerflächen angesiedelt. Diese Objekte sind häufig größer geschnitten als in dicht bebauten Innenstadtlagen.",
      "Daneben gibt es in den Wohngebieten des Bezirks weiterhin klassische Praxen und kleinere Büros, für die ein kompakterer Reinigungsumfang ausreicht.",
    ],
    audiences: [
      "Mittelständische Betriebe in Gewerbeparks",
      "Büro- und Lagerflächen am Stadtrand",
      "Praxen und kleinere Büros in Wohnnähe",
    ],
    featuredServiceSlugs: ["gebaeudereinigung-berlin", "unterhaltsreinigung-berlin", "praxisreinigung-berlin"],
    faq: [
      {
        question: "Werden auch größere Büro- und Lagerflächen in Reinickendorf betreut?",
        answer:
          "Ja, für größer geschnittene Objekte in den Gewerbeparks des Bezirks erstellen wir ein passendes Reinigungskonzept.",
      },
      {
        question: "Ist auch ein kleinerer Umfang für Praxen in Wohnnähe möglich?",
        answer:
          "Ja, den Umfang passen wir an die tatsächliche Größe und Nutzung der jeweiligen Praxis oder des Büros an.",
      },
    ],
    neighborSlugs: ["mitte", "pankow", "spandau", "charlottenburg-wilmersdorf"],
    ortsteile: [],
  },
];

export function getDistrictBySlug(slug: string): District | undefined {
  return districts.find((district) => district.slug === slug);
}

export function getOrtsteil(
  bezirkSlug: string,
  ortsteilSlug: string,
): { district: District; ortsteil: Ortsteil } | undefined {
  const district = getDistrictBySlug(bezirkSlug);
  const ortsteil = district?.ortsteile.find((o) => o.slug === ortsteilSlug);
  if (!district || !ortsteil) return undefined;
  return { district, ortsteil };
}

export function getNeighborDistricts(district: District): District[] {
  return district.neighborSlugs
    .map((slug) => getDistrictBySlug(slug))
    .filter((d): d is District => Boolean(d));
}
