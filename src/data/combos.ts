export interface ComboFaqItem {
  question: string;
  answer: string;
  relatedLink?: { label: string; href: string };
}

export interface Combo {
  serviceSlug: string;
  districtSlug: string;
  intro: string;
  /**
   * Optionale Vertiefung für einzelne, redaktionell ausgebaute Kombi-Seiten.
   * Bleiben diese Felder leer, rendert die Seite exakt wie zuvor (generische
   * FAQ, Standard-CTA-Text) – so bleiben alle nicht ausgebauten Kombi-Seiten
   * unverändert.
   */
  metaDescription?: string;
  introSecondParagraph?: string;
  localAngle?: string[];
  scopeBullets?: string[];
  processText?: string;
  /** Optionaler zusätzlicher Abschnitt zu Preisfaktoren, nur wenn inhaltlich sinnvoll. */
  priceFactorsText?: string;
  /** Optionale ergänzende Links (z. B. zu Teilleistungen oder einem Wissen-Artikel) unter dem Leistungsumfang. */
  additionalLinks?: { label: string; href: string }[];
  faq?: ComboFaqItem[];
  ctaSubtitle?: string;
}

/**
 * Priorisierte Auswahl wirtschaftlich relevanter Leistung+Standort-Kombinationen.
 * Bewusst keine vollständige 12x12-Matrix (144 Seiten) – nur Kombinationen mit
 * echtem eigenem Inhalt und Suchintention.
 */
export const combos: Combo[] = [
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "mitte",
    intro:
      "In Mitte liegen Büros, Kanzleien und Verwaltungen dichter beieinander als in den meisten anderen Berliner Bezirken – rund um Regierungsviertel, Alexanderplatz und die angrenzenden Geschäftsstraßen. Glanzwerk reinigt diese Standorte zuverlässig und mit festen Ansprechpartnern statt wechselndem Personal.",
    metaDescription:
      "Büroreinigung für Kanzleien, Verwaltungen und Büros in Berlin-Mitte – zuverlässig, mit festen Ansprechpartnern und flexiblen Zeitfenstern. Jetzt Angebot anfragen.",
    introSecondParagraph:
      "Für die Büroreinigung bedeutet das vor allem eines: wenig Spielraum während der Kernarbeitszeit. Wir legen Reinigungstermine in Mitte deshalb meist in enge Zeitfenster außerhalb der Geschäftszeiten und stimmen Zutritt über Schlüssel, Code oder ein festes Zeitfenster individuell mit Ihnen ab.",
    localAngle: [
      "Kanzleietagen im Altbau und große, offene Verwaltungsflächen im Neubau kommen in Mitte auf engstem Raum vor. Beides bringt einen unterschiedlichen Zuschnitt der Reinigung mit sich, etwa bei Grundriss oder der Zahl der Ansprechpartner pro Objekt – das legen wir vorab gemeinsam mit Ihnen fest.",
      "Wer im Zentrum ein Büro betreibt, hat selten ungenutzte Randzeiten für die Reinigung. Deshalb reinigen wir hier überwiegend früh morgens, abends oder am Wochenende, statt während des laufenden Betriebs.",
    ],
    scopeBullets: [
      "Schreibtische, Ablageflächen und Bildschirme außen",
      "Böden in Büro- und Gemeinschaftsflächen",
      "Teeküchen und Pausenräume",
      "Sanitär-, Empfangs- und Besprechungsräume",
    ],
    processText:
      "Nach einer kurzen Abstimmung zu Fläche, Zugang und gewünschtem Rhythmus erhalten Sie ein individuelles Angebot. Nach Bestätigung legen wir Zeitfenster und Zutritt gemeinsam fest, bevor die Reinigung nach dem vereinbarten Plan beginnt.",
    faq: [
      {
        question: "Bietet Glanzwerk Büroreinigung auch für kleinere Kanzleiflächen in Mitte an?",
        answer:
          "Ja. Neben größeren Verwaltungsflächen reinigen wir in Mitte auch kleinere Kanzlei- und Büroeinheiten in Altbauten – der Leistungsumfang wird auf die tatsächliche Fläche und Nutzung abgestimmt.",
      },
      {
        question: "Wie kurzfristig lässt sich ein Termin für die Büroreinigung in Mitte einrichten?",
        answer:
          "Das hängt von Ihrem gewünschten Zeitfenster und unserer aktuellen Teamplanung ab. Sprechen Sie uns über den Preisrechner oder das Kontaktformular an, dann nennen wir Ihnen einen realistischen Starttermin.",
      },
      {
        question: "Ist eine Reinigung außerhalb der Bürozeiten in Mitte möglich, etwa früh morgens oder abends?",
        answer:
          "Ja, das ist in Mitte sogar die Regel: Viele Büros hier haben dicht getaktete Tagesabläufe, deshalb reinigen wir überwiegend früh morgens, abends oder am Wochenende – Zutritt und Zeitfenster stimmen wir vorher mit Ihnen ab.",
      },
      {
        question: "Was passiert, wenn ich mit der Reinigung einmal nicht zufrieden bin?",
        answer:
          "Melden Sie sich direkt bei Ihrem Ansprechpartner. Bei berechtigten Beanstandungen bessern wir zeitnah nach – die Bedingungen dazu finden Sie auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    ctaSubtitle:
      "Beschreiben Sie kurz Ihr Büro in Mitte – wir melden uns mit einem individuellen Angebot.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Entlang des Kurfürstendamms und in den angrenzenden Altbaulagen arbeiten viele Unternehmen in repräsentativen Büroflächen. Wir reinigen diese Büros in Charlottenburg-Wilmersdorf mit besonderem Blick auf ein gepflegtes Erscheinungsbild für Kunden und Mandanten.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "friedrichshain-kreuzberg",
    intro:
      "In Friedrichshain-Kreuzberg teilen sich häufig mehrere kleinere Unternehmen ein Bürohaus oder einen umgenutzten Gewerbehof. Wir stimmen die Büroreinigung hier oft mit mehreren Ansprechpartnern oder einer gemeinsamen Hausverwaltung ab.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "tempelhof-schoeneberg",
    intro:
      "Im urbanen Schöneberg und den Gewerbegebäuden rund um Tempelhof reinigen wir Büroflächen unterschiedlicher Größe – von einzelnen Kanzleietagen bis zu mehrstöckigen Gewerbeobjekten mit mehreren Mietern.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "mitte",
    intro:
      "Ein Gewerbeobjekt in Mitte besteht selten nur aus einer Bodenfläche. Büroetagen, Treppenhaus, Sanitärräume und oft auch Fensterflächen kommen zusammen – und jeder Teilbereich hat einen eigenen Pflegebedarf. Glanzwerk bündelt diese Teilleistungen für Gewerbeobjekte in Mitte in einem Vertrag mit einem festen Ansprechpartner.",
    metaDescription:
      "Gebäudereinigung in Berlin-Mitte für Büros, Praxen, Kanzleien, Gewerbeobjekte und Hausverwaltungen. Flexible Zeiten und abgestimmte Leistungen.",
    introSecondParagraph:
      "Der genaue Zuschnitt hängt vom Objekt ab: Ein einzelnes Büro benötigt ein anderes Bündel als ein mehrstöckiges Verwaltungsgebäude mit eigenem Treppenhaus und Empfang. Wir legen das vorab gemeinsam mit Ihnen fest, abgestimmt auf die engen Zeitfenster, die der dichte Terminplan vieler zentraler Standorte in Mitte mit sich bringt.",
    localAngle: [
      "Die Gebäudereinigung bündelt für Gewerbeobjekte in Mitte typischerweise mehrere Teilleistungen in einem Vertrag: Unterhaltsreinigung der Büro- und Gemeinschaftsflächen, Pflege des Treppenhauses und regelmäßige Fensterreinigung. Ob zusätzlich zur laufenden Reinigung eine Grundreinigung sinnvoll ist, hängt vom Zustand, von der Nutzung und von den vorhandenen Oberflächen ab.",
      "In Mitte kommt hinzu, dass viele Gebäude von mehreren Mietparteien gleichzeitig genutzt werden – von einzelnen Kanzleietagen bis zu ganzen Verwaltungsflächen. Das erfordert eine klare Abstimmung, welche Bereiche zum gemeinsamen Vertrag gehören und welche die einzelne Mietpartei selbst regelt. Bei Bürogemeinschaften mit mehreren kleinen Mietern übernimmt häufig die Hausverwaltung die Koordination, bei einem einzelnen großen Nutzer meist eine interne Ansprechperson vor Ort.",
    ],
    scopeBullets: [
      "Unterhaltsreinigung von Büro- und Gemeinschaftsflächen",
      "Pflege von Treppenhaus und Eingangsbereich",
      "Regelmäßige Fensterreinigung nach Bedarf",
      "Sanitärbereiche und Entsorgung",
    ],
    additionalLinks: [
      { label: "Unterhaltsreinigung separat anfragen", href: "/leistungen/unterhaltsreinigung-berlin" },
      { label: "Treppenhausreinigung separat anfragen", href: "/leistungen/treppenhausreinigung-berlin" },
      { label: "Glas- und Fensterreinigung separat anfragen", href: "/leistungen/glas-und-fensterreinigung-berlin" },
    ],
    processText:
      "Nach einer kurzen Objektbesichtigung legen wir fest, welche Teilleistungen in Ihr Gebäudereinigungs-Bündel gehören, und stimmen Rhythmus und Zeitfenster mit Ihnen ab. Für organisatorische Fragen und Beanstandungen erhalten Sie eine klar geregelte Kontaktmöglichkeit, statt sie über mehrere Dienstleister verteilen zu müssen.",
    priceFactorsText:
      "Der Preis richtet sich vor allem nach der zu reinigenden Fläche, dem vereinbarten Leistungsumfang und dem gewünschten Reinigungsrhythmus. Auch Nutzungsintensität, Zugänglichkeit und die Beschaffenheit der Flächen fließen ein: Ein Objekt, das nur Unterhalts- und Treppenhausreinigung benötigt, kalkuliert sich anders als eines, das zusätzlich regelmäßige Fensterreinigung einbezieht. Eine erste Einschätzung liefert unser Preisrechner, das endgültige Angebot erstellen wir nach kurzer Abstimmung zu Ihrem Objekt.",
    faq: [
      {
        question: "Was genau gehört zum Leistungsbündel der Gebäudereinigung in Mitte?",
        answer:
          "Das hängt von Ihrem Objekt ab – meist Unterhaltsreinigung, Treppenhaus und Fensterreinigung, bei Bedarf ergänzt um eine Grundreinigung. Den genauen Umfang legen wir vorab gemeinsam fest.",
      },
      {
        question: "Kann ich einzelne Teilleistungen wie die Treppenhausreinigung auch separat statt im Bündel buchen?",
        answer:
          "Ja. Die Gebäudereinigung bündelt mehrere Einzelleistungen – wenn Sie nur eine davon benötigen, buchen Sie diese direkt über die jeweilige Leistungsseite, etwa die Treppenhausreinigung.",
        relatedLink: { label: "Zur Treppenhausreinigung", href: "/leistungen/treppenhausreinigung-berlin" },
      },
      {
        question: "Wie wird die Zuständigkeit geklärt, wenn ein Gebäude mehrere Mietparteien hat?",
        answer:
          "Bei mehreren Mietparteien klären wir vorab, welche Flächen zum gemeinsamen Vertrag gehören und welche Fläche die einzelne Partei selbst regelt – etwa in Abstimmung mit der Hausverwaltung.",
      },
      {
        question: "Kann ich die Gebäudereinigung in Mitte zunächst unverbindlich testen?",
        answer:
          "Ja. Die reguläre Gebäudereinigung fällt unter unser Modell „3 Monate flexibel testen“ – Sie beauftragen und bezahlen die Leistung ganz normal, binden sich aber nicht langfristig.",
        relatedLink: { label: "Zum 3-Monate-Test-Modell", href: "/3-monate-testen" },
      },
      {
        question: "Was passiert, wenn ich mit der Reinigung einmal nicht zufrieden bin?",
        answer:
          "Geben Sie uns direkt Bescheid. Ist die Beanstandung berechtigt, bessern wir zeitnah nach – Näheres dazu auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    ctaSubtitle:
      "Beschreiben Sie kurz Ihr Gebäude in Mitte – wir melden uns mit einem individuellen Angebot für das passende Leistungsbündel.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "neukoelln",
    intro:
      "In Neukölln reichen Gewerbeobjekte von kleineren Einheiten im dicht bebauten Kern bis zu größeren Flächen in Rudow. Die Gebäudereinigung fasst je nach Objekt mehrere Teilleistungen in einem gemeinsamen Konzept zusammen.",
    metaDescription:
      "Gebäudereinigung in Neukölln für Büros, Praxen, Kanzleien und Gewerbeobjekte. Individuelle Reinigungskonzepte und flexible Einsatzzeiten.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Für Gewerbeobjekte mit mehreren Nutzungsbereichen entlang des Kurfürstendamms und in den umliegenden Altbaulagen kombinieren wir Unterhalts-, Treppenhaus- und Fensterreinigung in einem gemeinsamen Konzept.",
    metaDescription:
      "Gebäudereinigung in Charlottenburg-Wilmersdorf für Büros, Praxen, Kanzleien und Gewerbeobjekte. Flexible Zeiten und abgestimmte Leistungen.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "steglitz-zehlendorf",
    intro:
      "Steglitz-Zehlendorf hat in seinen ruhigen Wohnlagen überdurchschnittlich viele Arztpraxen. Wir reinigen diese Praxen diskret außerhalb der Sprechzeiten und mit besonderer Rücksicht auf das ruhige Umfeld.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Glanzwerk reinigt Arztpraxen in Charlottenburg-Wilmersdorf zuverlässig und mit Rücksicht auf einen ungestörten Praxisbetrieb. Reinigungstermine stimmen wir konkret auf Ihre Sprechzeiten ab.",
    metaDescription:
      "Praxisreinigung für Arztpraxen in Charlottenburg-Wilmersdorf – abgestimmt auf Ihre Sprechzeiten, mit klar geregeltem Leistungsumfang. Jetzt Angebot anfragen.",
    introSecondParagraph:
      "Wir reinigen Warte-, Empfangs- und Behandlungsräume diskret und mit einem auf Ihre Sprechzeiten abgestimmten Zeitfenster – meist nach Praxisschluss oder früh morgens vor der ersten Sprechstunde.",
    scopeBullets: [
      "Warte- und Empfangsbereiche",
      "Reinigung der vereinbarten Flächen in Behandlungsräumen",
      "Bodenpflege in allen Praxisräumen",
      "Sanitärbereiche und Kontaktflächen wie Türgriffe",
    ],
    additionalLinks: [
      { label: "Praxishygiene im Glanzwerk-Wissen nachlesen", href: "/wissen/reinigung-arztpraxen" },
    ],
    processText:
      "Bei Gemeinschaftspraxen mit mehreren Ärzten legen wir den genauen Ablauf gemeinsam mit der Praxisleitung fest. Für organisatorische Fragen und Beanstandungen erhalten Sie eine klar geregelte Kontaktmöglichkeit.",
    faq: [
      {
        question: "Passt die Reinigung zu den Sprechzeiten meiner Praxis?",
        answer:
          "Ja, wir stimmen den Reinigungstermin individuell auf Ihre tatsächlichen Sprechzeiten ab – das klären wir bereits bei der ersten Anfrage gemeinsam mit Ihnen.",
      },
      {
        question: "Werden auch einzelne, kleinere Praxen bedient, nicht nur größere Gemeinschaftspraxen?",
        answer:
          "Ja, wir reinigen sowohl einzelne Praxisräume als auch größere Gemeinschaftspraxen – der Leistungsumfang wird auf die tatsächliche Fläche abgestimmt. Eine Einzelpraxis mit zwei Behandlungsräumen benötigt spürbar weniger Zeit als eine Gemeinschaftspraxis mit mehreren Ärzten.",
      },
      {
        question: "Werden Behandlungsräume auch desinfiziert?",
        answer:
          "Wir reinigen die vereinbarten Oberflächen und Kontaktbereiche. Desinfektionsmaßnahmen führen wir nur durch, wenn sie ausdrücklich beauftragt und nach den Vorgaben Ihrer Praxis festgelegt wurden. Die medizinische Aufbereitung und Sterilisation von Instrumenten bleibt in jedem Fall ausgeschlossen und Aufgabe des Praxispersonals.",
      },
      {
        question: "Gilt für die Praxisreinigung auch das Modell „3 Monate flexibel testen“?",
        answer:
          "Ja, sofern es sich um eine regelmäßige Praxisreinigung handelt. Einmalige Grundreinigungen sind davon unabhängig und lassen sich jederzeit separat anfragen.",
        relatedLink: { label: "Zum 3-Monate-Test-Modell", href: "/3-monate-testen" },
      },
      {
        question: "Was passiert, wenn ich mit der Reinigung einmal nicht zufrieden bin?",
        answer:
          "Sprechen Sie uns direkt darauf an. Wir prüfen die Beanstandung und bessern in berechtigten Fällen zeitnah nach – die Bedingungen dazu finden Sie auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    ctaSubtitle:
      "Beschreiben Sie kurz Ihre Praxis in Charlottenburg-Wilmersdorf – wir melden uns mit einem individuellen Angebot.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "mitte",
    intro:
      "Praxen in Mitte liegen häufig in stark frequentierten Lagen mit hohem Publikumsverkehr. Wir reinigen Warte- und Behandlungsräume in engen Zeitfenstern, die sich an die jeweiligen Sprechzeiten anpassen.",
  },
  {
    serviceSlug: "treppenhausreinigung-berlin",
    districtSlug: "tempelhof-schoeneberg",
    intro:
      "Mehrstöckige Gewerbegebäude mit mehreren Mietparteien sind im Tempelhofer Teil des Bezirks keine Seltenheit. Wir stimmen die Treppenhausreinigung hier häufig direkt mit der Hausverwaltung ab.",
  },
  {
    serviceSlug: "treppenhausreinigung-berlin",
    districtSlug: "neukoelln",
    intro:
      "In dicht bebauten Lagen Neuköllns mit mehreren Aufgängen pro Objekt sinkt der Reinigungsaufwand pro Treppenhaus, wenn mehrere Aufgänge gemeinsam betreut werden – das berücksichtigen wir bereits im Angebot.",
  },
  {
    serviceSlug: "treppenhausreinigung-berlin",
    districtSlug: "pankow",
    intro:
      "In gemischt genutzten Gebäuden mit Wohnungen und Gewerbe in Pankow reinigen wir Treppenhäuser mit Rücksicht auf Anwohner und in enger Abstimmung mit der jeweiligen Hausverwaltung.",
  },
  {
    serviceSlug: "kanzleireinigung-berlin",
    districtSlug: "mitte",
    intro:
      "Kanzleien in Mitte benötigen häufig kurze, verlässliche Zeitfenster außerhalb dichter Terminpläne. Wir reinigen Empfang, Besprechungsräume und Büroflächen diskret und mit festen Reinigungsteams.",
  },
  {
    serviceSlug: "kanzleireinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Viele Kanzleien in Charlottenburg-Wilmersdorf liegen in repräsentativen Altbaulagen. Wir legen bei der Reinigung besonderen Wert auf ein gepflegtes Erscheinungsbild für Mandanten sowie auf Vertraulichkeit im Umgang mit Unterlagen.",
  },
  {
    serviceSlug: "unterhaltsreinigung-berlin",
    districtSlug: "friedrichshain-kreuzberg",
    intro:
      "Kleinere Büros und Agenturen in Friedrichshain-Kreuzberg profitieren von einer wiederkehrenden Unterhaltsreinigung in einem festen, an die jeweilige Nutzung angepassten Rhythmus.",
  },
  {
    serviceSlug: "unterhaltsreinigung-berlin",
    districtSlug: "steglitz-zehlendorf",
    intro:
      "Für Praxen, Kanzleien und Büros in den ruhigen Lagen von Steglitz-Zehlendorf bieten wir eine regelmäßige Unterhaltsreinigung, die sich unauffällig in den Tagesablauf des Umfelds einfügt.",
  },
  {
    serviceSlug: "grundreinigung-berlin",
    districtSlug: "neukoelln",
    intro:
      "Bei Neubezug oder nach Renovierung in Neukölln – ob im dicht bebauten Kern oder in den Gewerbeflächen Rudows – sorgt eine einmalige Grundreinigung für einen sauberen Ausgangspunkt.",
  },
  {
    serviceSlug: "grundreinigung-berlin",
    districtSlug: "mitte",
    intro:
      "Nach Bauarbeiten oder bei Neubezug von Büroflächen in Mitte übernehmen wir die intensive Aufbereitung der Räume, bevor ein regelmäßiger Unterhaltsreinigungsrhythmus beginnt.",
  },
  {
    serviceSlug: "kita-und-schulreinigung-berlin",
    districtSlug: "pankow",
    intro:
      "Mit der wachsenden Zahl an Kitas und Schulen in Pankow steigt auch der Bedarf an verlässlicher Reinigung außerhalb der Betreuungszeiten. Wir richten unsere Einsätze nach den jeweiligen Öffnungs- und Ferienzeiten der Einrichtung.",
  },
  {
    serviceSlug: "fitnessstudioreinigung-berlin",
    districtSlug: "friedrichshain-kreuzberg",
    intro:
      "Friedrichshain-Kreuzberg hat zahlreiche Studios und Kursräume, deren Trainingsflächen, Geräte und Umkleiden wir in einem an die Frequentierung angepassten Rhythmus reinigen.",
  },
  {
    serviceSlug: "autohausreinigung-berlin",
    districtSlug: "spandau",
    intro:
      "Autohäuser und Werkstätten mit Kundenbereich in Spandau profitieren von einer auf Öffnungszeiten abgestimmten Reinigung von Showroom, Glasflächen und Kundenbereichen.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "treptow-koepenick",
    intro:
      "Treptow-Köpenick bringt weitläufige Gewerbeflächen und einen eigenständigen Ortskern in Köpenick mit – dafür bündeln wir Unterhalts-, Fenster- und Grundreinigung in einem Konzept, das auf größere Grundrisse und längere Anfahrtswege abgestimmt ist.",
  },
  {
    serviceSlug: "unterhaltsreinigung-berlin",
    districtSlug: "treptow-koepenick",
    intro:
      "Der flächenmäßig größte Berliner Bezirk bringt weitläufige Gewerbe- und Betriebsflächen mit sich – wir richten den Reinigungsrhythmus nach der tatsächlichen Nutzung aus, statt pauschal jeden Winkel gleich intensiv zu bedenken.",
  },
  {
    serviceSlug: "grundreinigung-berlin",
    districtSlug: "treptow-koepenick",
    intro:
      "Nach Neubezug oder Umbau größerer Gewerbeflächen in Treptow-Köpenick übernehmen wir die intensive Aufbereitung – auch bei weitläufigen Grundrissen mit mehreren Gebäudeteilen im Ortskern Köpenick.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "marzahn-hellersdorf",
    intro:
      "Die großzügig geschnittenen Gewerbegebiete und Einkaufszentren in Marzahn-Hellersdorf erlauben effiziente, gut planbare Reinigungseinsätze mit klar abgegrenzten Bereichen – wir bündeln Unterhalts-, Fenster- und Sanitärreinigung in einem Konzept.",
  },
  {
    serviceSlug: "unterhaltsreinigung-berlin",
    districtSlug: "marzahn-hellersdorf",
    intro:
      "Marzahn-Hellersdorf bietet großzügig geschnittene Büro- und Verkaufsflächen, für die wir Reinigungseinsätze mit klar abgegrenzten Bereichen planen – kleinere Praxen und Dienstleister in Wohnnähe erhalten dagegen einen kompakteren Rhythmus.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "marzahn-hellersdorf",
    intro:
      "Kleinere Praxen in den Wohngebieten von Marzahn-Hellersdorf berechnen wir nicht nach einem Standardpaket für größere Gewerbeflächen – wir passen den Reinigungsumfang an die tatsächliche Größe der Praxis an.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "lichtenberg",
    intro:
      "Rund um die neu entstandenen Bürokomplexe und Gewerbeparks in Lichtenberg kombinieren wir Unterhalts-, Glas- und Treppenhausreinigung, um das moderne Erscheinungsbild dieser technisch anders ausgestatteten Gebäude zu erhalten.",
  },
  {
    serviceSlug: "glas-und-fensterreinigung-berlin",
    districtSlug: "lichtenberg",
    intro:
      "Die neueren Bürokomplexe in Lichtenberg setzen häufig auf große Glasflächen und offene Bürolandschaften – dafür kombinieren wir Glas- und Fensterreinigung regelmäßig mit der laufenden Unterhaltsreinigung, um das moderne Erscheinungsbild dauerhaft zu erhalten.",
  },
  {
    serviceSlug: "unterhaltsreinigung-berlin",
    districtSlug: "lichtenberg",
    intro:
      "Lichtenberg hat eine wachsende Zahl neuerer Gewerbeflächen mit offenen Bürolandschaften und größeren Glasflächen, die anders gepflegt werden müssen als klassisch aufgeteilte Altbau-Büros – darauf richten wir die Unterhaltsreinigung aus.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "reinickendorf",
    intro:
      "Rund um das Gebiet des ehemaligen Flughafens Tegel bündeln wir für mittelständische Betriebe in Reinickendorf Unterhalts-, Fenster- und Sanitärreinigung in einem gemeinsamen Konzept für Büro- und Lagerflächen.",
  },
  {
    serviceSlug: "unterhaltsreinigung-berlin",
    districtSlug: "reinickendorf",
    intro:
      "Rund um das ehemalige Flughafengelände in Reinickendorf haben viele mittelständische Betriebe größer geschnittene Büro- und Lagerflächen – dafür planen wir einen Reinigungsrhythmus, der sich nach der tatsächlichen Nutzung richtet.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "reinickendorf",
    intro:
      "Abseits der größeren Gewerbeparks am Stadtrand liegen in den Wohngebieten Reinickendorfs klassische Praxen und kleinere Büros, die wir mit einem kompakteren, auf die tatsächliche Größe abgestimmten Umfang reinigen.",
  },
  {
    serviceSlug: "glas-und-fensterreinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Große Schaufensterflächen, Vitrinen und Showrooms entlang des Kurfürstendamms zeigen Straßenstaub, Fingerabdrücke und Fettspuren besonders deutlich. Wir reinigen diese Flächen in einem regelmäßigen, auf den Kundenverkehr abgestimmten Rhythmus und legen dabei besonderen Wert auf ein rückstandsfreies, repräsentatives Ergebnis.",
  },
  {
    serviceSlug: "glas-und-fensterreinigung-berlin",
    districtSlug: "mitte",
    intro:
      "Bürogebäude in Mitte mit großen Fensterflächen und Glastrennwänden profitieren von einem regelmäßigen Reinigungsrhythmus, der Kalk- und Wasserflecken vorbeugt und den Lichteinfall in den Innenräumen erhält – wir reinigen rückstandsfrei, ohne den laufenden Betrieb zu stören.",
  },
  {
    serviceSlug: "glas-und-fensterreinigung-berlin",
    districtSlug: "tempelhof-schoeneberg",
    intro:
      "Rund um Tempelhof gehören Glastrennwände und Eingangsbereiche in Gewerbegebäuden mit mehreren Mietparteien zu den am stärksten frequentierten Flächen – wir stimmen die Glas- und Fensterreinigung häufig direkt mit der Hausverwaltung ab.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "neukoelln",
    intro:
      "Im dicht bebauten Kern Neuköllns wächst die Zahl kleinerer Büros und Gemeinschaftsbüros, während Rudow eher größere Bürogebäude bietet – wir richten die Büroreinigung nach der jeweiligen Objektgröße aus.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "pankow",
    intro:
      "Viele Gewerbeflächen und Büros in Pankow liegen in gemischt genutzten Gebäuden mit Wohnungen in den oberen Etagen – wir reinigen entsprechend leise und unauffällig und stimmen Termine darauf ab.",
    metaDescription:
      "Büroreinigung für gemischt genutzte Gewerbeobjekte in Berlin-Pankow – leise, mit festen Ansprechpartnern und Rücksicht auf Anwohner. Jetzt Angebot anfragen.",
    introSecondParagraph:
      "Das unterscheidet Pankow von rein gewerblich geprägten Lagen: Reinigungstermine dürfen hier weder den Büroalltag noch die Nachbarschaft stören. Wir stimmen Zeitfenster deshalb so ab, dass sie sowohl zum Tagesablauf im Büro als auch zur Hausordnung passen.",
    localAngle: [
      "Mit dem Bevölkerungswachstum im Bezirk ist auch die Zahl kleinerer Gewerbeflächen und Büros in Wohnnähe gestiegen – oft in Häusern, in denen sich Gewerbe und Wohnungen die Etagen teilen. Das bringt engere Zugangswege und mehr Rücksichtnahme mit sich als in reinen Bürogebäuden.",
      "Weil Anwohner in denselben Häusern leben, reinigen wir Büroflächen in Pankow bevorzugt in ruhigen Zeitfenstern und mit leisem Gerät – Treppenhaus und Zugänge werden entsprechend rücksichtsvoll genutzt.",
    ],
    scopeBullets: [
      "Schreibtische, Ablageflächen und Bildschirme außen",
      "Böden in Büro- und Gemeinschaftsflächen",
      "Teeküchen und Pausenräume",
      "Sanitär-, Empfangs- und Besprechungsräume",
    ],
    processText:
      "Nach einer kurzen Abstimmung zu Fläche, Zugang und gewünschtem Rhythmus erhalten Sie ein individuelles Angebot. Da viele Objekte in Pankow gemischt genutzt sind, legen wir Zeitfenster und Zutritt so fest, dass sie auch mit den Wohnparteien im Haus abgestimmt sind, bevor die Reinigung nach dem vereinbarten Plan beginnt.",
    faq: [
      {
        question: "Wird bei der Büroreinigung in Pankow Rücksicht auf die Wohnparteien im selben Haus genommen?",
        answer:
          "Ja. Gerade in gemischt genutzten Gebäuden mit Wohnungen in den oberen Etagen stimmen wir Zeitfenster und Lautstärke so ab, dass Anwohner möglichst wenig gestört werden.",
      },
      {
        question: "Bietet Glanzwerk Büroreinigung auch für kleinere Gewerbeflächen in Pankow an?",
        answer:
          "Ja. Neben größeren Büroflächen reinigen wir in Pankow auch kleinere Gewerbeeinheiten in gemischt genutzten Häusern – der Leistungsumfang wird auf die tatsächliche Fläche und Nutzung abgestimmt.",
      },
      {
        question: "Ist eine Reinigung außerhalb der Bürozeiten in Pankow möglich?",
        answer:
          "Ja. Zeitfenster stimmen wir individuell ab – üblich sind früher Morgen, Abend oder Wochenende, jeweils so gewählt, dass weder der Büroalltag noch die Nachbarschaft gestört wird.",
      },
      {
        question: "Was passiert, wenn ich mit der Reinigung einmal nicht zufrieden bin?",
        answer:
          "Melden Sie sich direkt bei Ihrem Ansprechpartner. Bei berechtigten Beanstandungen bessern wir zeitnah nach – die Bedingungen dazu finden Sie auf unserer Über-uns-Seite.",
        relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
      },
    ],
    ctaSubtitle:
      "Beschreiben Sie kurz Ihr Büro in Pankow – wir melden uns mit einem individuellen Angebot.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "steglitz-zehlendorf",
    intro:
      "Steglitz-Zehlendorf ist überwiegend ruhig geprägt – wir reinigen Büroflächen hier entsprechend diskret und unauffällig, damit sich die Termine in den Tagesablauf des Umfelds einfügen.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "friedrichshain-kreuzberg",
    intro:
      "Friedrichshain-Kreuzberg ist geprägt von Altbauten, umgenutzten Gewerbehöfen und gemeinschaftlich genutzten Bürohäusern – wir bündeln Unterhalts-, Treppenhaus- und Fensterreinigung in einem Konzept, das sich an unregelmäßige Grundrisse anpasst.",
    metaDescription:
      "Gebäudereinigung in Friedrichshain-Kreuzberg für Büros, Praxen, Gastronomie und Gewerbeobjekte. Flexible Zeiten und klar abgestimmte Leistungen.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "pankow",
    intro:
      "Pankow reicht von dicht bebauten Geschäfts- und Wohnquartieren bis zu Gewerbegebieten und ruhigeren äußeren Ortsteilen – wir bündeln Unterhalts-, Treppenhaus- und Fensterreinigung passend zur jeweiligen Objektnutzung.",
    metaDescription:
      "Gebäudereinigung in Berlin-Pankow für Büros, Praxen, Kanzleien, Treppenhäuser und Gewerbeobjekte. Klare Leistungen und flexible Reinigungszeiten.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "tempelhof-schoeneberg",
    intro:
      "Im Tempelhofer Teil des Bezirks stehen größere Gewerbe- und Bürogebäude mit mehreren Mietparteien – wir bündeln Unterhalts-, Treppenhaus- und Fensterreinigung in einem gemeinsamen, mit der Hausverwaltung abgestimmten Konzept.",
    metaDescription:
      "Gebäudereinigung in Tempelhof-Schöneberg für Büros, Praxen, Kanzleien und Gewerbeobjekte. Flexible Reinigungszeiten und individuell abgestimmte Leistungen.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "spandau",
    intro:
      "Für Autohäuser, Werkstätten und Gewerbeflächen mit angeschlossenen Büros in Spandau kombinieren wir Unterhaltsreinigung der Büroflächen mit Glasreinigung für Ausstellungs- und Kundenbereiche in einem Vertrag.",
  },
  {
    serviceSlug: "kanzleireinigung-berlin",
    districtSlug: "steglitz-zehlendorf",
    intro:
      "Kanzleien in den ruhigen Wohnlagen von Steglitz-Zehlendorf reinigen wir diskret und mit besonderer Rücksicht auf Vertraulichkeit im Umgang mit Unterlagen – abgestimmt auf einen unauffälligen Ablauf im überwiegend ruhigen Umfeld.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "pankow",
    intro:
      "In Pankow wächst die Zahl an Arztpraxen in Wohnnähe – wir reinigen außerhalb der Sprechzeiten und mit Rücksicht auf die Wohnungen in den oberen Etagen vieler gemischt genutzter Gebäude.",
  },
  {
    serviceSlug: "treppenhausreinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Charlottenburg-Wilmersdorf ist geprägt von Altbauten und Wohn-Geschäftshäusern, in denen ein gepflegtes Treppenhaus Teil des repräsentativen Erscheinungsbilds ist, das Kanzleien und Praxen ihren Mandanten und Patienten bieten möchten.",
  },
];

export function getCombo(serviceSlug: string, districtSlug: string): Combo | undefined {
  return combos.find((c) => c.serviceSlug === serviceSlug && c.districtSlug === districtSlug);
}

export function getCombosForService(serviceSlug: string): Combo[] {
  return combos.filter((c) => c.serviceSlug === serviceSlug);
}

export function getCombosForDistrict(districtSlug: string): Combo[] {
  return combos.filter((c) => c.districtSlug === districtSlug);
}
