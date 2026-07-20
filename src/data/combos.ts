export interface Combo {
  serviceSlug: string;
  districtSlug: string;
  intro: string;
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
      "Rund um Regierungsviertel und Alexanderplatz liegen viele Bürostandorte auf engem Raum. Wir reinigen Büroflächen in Mitte meist in kurzen Zeitfenstern außerhalb der Geschäftszeiten, um den dichten Terminplan vieler Unternehmen im Bezirk nicht zu stören.",
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
      "Für Gewerbeobjekte in Mitte mit mehreren Teilbereichen – etwa Büro, Treppenhaus und Sanitärräumen – bündeln wir die Gebäudereinigung in einem Vertrag mit einem festen Ansprechpartner, abgestimmt auf die engen Zeitfenster vieler zentraler Standorte.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "neukoelln",
    intro:
      "In Neukölln reichen Gewerbeobjekte von kleineren Einheiten im dicht bebauten Kern bis zu größeren Flächen in Rudow. Die Gebäudereinigung fasst je nach Objekt mehrere Teilleistungen in einem gemeinsamen Konzept zusammen.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Für Gewerbeobjekte mit mehreren Nutzungsbereichen entlang des Kurfürstendamms und in den umliegenden Altbaulagen kombinieren wir Unterhalts-, Treppenhaus- und Fensterreinigung in einem gemeinsamen Konzept.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "steglitz-zehlendorf",
    intro:
      "In den ruhigen Wohnlagen von Steglitz-Zehlendorf sind überdurchschnittlich viele Arztpraxen ansässig. Wir reinigen diese Praxen diskret außerhalb der Sprechzeiten und mit besonderer Rücksicht auf das ruhige Umfeld.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "Viele Praxen in Charlottenburg-Wilmersdorf befinden sich in Altbauten mit Wohnungen in den oberen Etagen. Wir stimmen Reinigungszeiten entsprechend ab und legen Wert auf ein gepflegtes Erscheinungsbild für Patienten.",
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
      "In den zahlreichen Studios und Kursräumen in Friedrichshain-Kreuzberg reinigen wir Trainingsflächen, Geräte und Umkleiden in einem an die Frequentierung angepassten Rhythmus.",
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
      "Für die weitläufigen Gewerbeflächen in Treptow-Köpenick und den eigenständigen Ortskern Köpenick bündeln wir Unterhalts-, Fenster- und Grundreinigung in einem gemeinsamen Konzept, das auf größere Grundrisse und längere Anfahrtswege abgestimmt ist.",
  },
  {
    serviceSlug: "unterhaltsreinigung-berlin",
    districtSlug: "treptow-koepenick",
    intro:
      "In den weitläufigen Gewerbe- und Betriebsflächen des flächenmäßig größten Berliner Bezirks richten wir den Reinigungsrhythmus nach der tatsächlichen Nutzung aus, statt pauschal jeden Winkel gleich intensiv zu bedenken.",
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
      "Für die großzügig geschnittenen Büro- und Verkaufsflächen in Marzahn-Hellersdorf planen wir Reinigungseinsätze mit klar abgegrenzten Bereichen, während kleinere Praxen und Dienstleister in Wohnnähe einen kompakteren Rhythmus erhalten.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "marzahn-hellersdorf",
    intro:
      "Für die wachsende Zahl kleinerer Praxen in den Wohngebieten von Marzahn-Hellersdorf passen wir den Reinigungsumfang an die tatsächliche Größe der Praxis an, statt ein Standardpaket für größere Gewerbeflächen zu berechnen.",
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
      "Für die wachsende Zahl neuerer Gewerbeflächen in Lichtenberg richten wir die Unterhaltsreinigung auf offene Bürolandschaften und größere Glasflächen aus, die anders gepflegt werden müssen als klassisch aufgeteilte Altbau-Büros.",
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
      "Für die größer geschnittenen Büro- und Lagerflächen mittelständischer Betriebe rund um das ehemalige Flughafengelände in Reinickendorf planen wir einen Reinigungsrhythmus, der sich nach der tatsächlichen Nutzung richtet.",
  },
  {
    serviceSlug: "praxisreinigung-berlin",
    districtSlug: "reinickendorf",
    intro:
      "Für die klassischen Praxen und kleineren Büros in den Wohngebieten Reinickendorfs reinigen wir mit einem kompakteren, auf die tatsächliche Größe abgestimmten Umfang – abseits der größeren Gewerbeparks am Stadtrand.",
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
      "In den Gewerbegebäuden rund um Tempelhof mit mehreren Mietparteien gehören Glastrennwände und Eingangsbereiche zu den am stärksten frequentierten Flächen – wir stimmen die Glas- und Fensterreinigung häufig direkt mit der Hausverwaltung ab.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "neukoelln",
    intro:
      "Für die wachsende Zahl kleinerer Büros und Gemeinschaftsbüros im dicht bebauten Kern Neuköllns sowie in den größeren Bürogebäuden Rudows richten wir die Büroreinigung nach der jeweiligen Objektgröße aus.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "pankow",
    intro:
      "Für die kleineren Gewerbeflächen und Büros in gemischt genutzten Gebäuden in Pankow reinigen wir mit Rücksicht auf die Wohnungen in den oberen Etagen – Termine stimmen wir entsprechend leise und unauffällig ab.",
  },
  {
    serviceSlug: "bueroreinigung-berlin",
    districtSlug: "steglitz-zehlendorf",
    intro:
      "In den ruhigen Wohnlagen von Steglitz-Zehlendorf reinigen wir Büroflächen diskret und unauffällig, damit sich die Reinigung in den Tagesablauf des überwiegend ruhigen Umfelds einfügt.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "friedrichshain-kreuzberg",
    intro:
      "In den Altbauten, umgenutzten Gewerbehöfen und gemeinschaftlich genutzten Bürohäusern Friedrichshain-Kreuzbergs bündeln wir Unterhalts-, Treppenhaus- und Fensterreinigung in einem Konzept, das sich an unregelmäßige Grundrisse anpasst.",
  },
  {
    serviceSlug: "gebaeudereinigung-berlin",
    districtSlug: "tempelhof-schoeneberg",
    intro:
      "Für die größeren Gewerbe- und Bürogebäude mit mehreren Mietparteien im Tempelhofer Teil des Bezirks bündeln wir Unterhalts-, Treppenhaus- und Fensterreinigung in einem gemeinsamen, mit der Hausverwaltung abgestimmten Konzept.",
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
      "Für die wachsende Zahl an Arztpraxen in Wohnnähe in Pankow reinigen wir außerhalb der Sprechzeiten und mit Rücksicht auf die Wohnungen in den oberen Etagen vieler gemischt genutzter Gebäude.",
  },
  {
    serviceSlug: "treppenhausreinigung-berlin",
    districtSlug: "charlottenburg-wilmersdorf",
    intro:
      "In den Altbauten und Wohn-Geschäftshäusern Charlottenburg-Wilmersdorfs sind gepflegte Treppenhäuser Teil des repräsentativen Erscheinungsbilds, das Kanzleien und Praxen im Bezirk ihren Mandanten und Patienten bieten möchten.",
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
