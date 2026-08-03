import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Section, { SectionHeading } from "@/components/ui/Section";
import { TrustIcon } from "@/components/ui/TrustBadges";
import ArticleCard from "@/components/ui/ArticleCard";
import BrandPhoto from "@/components/ui/BrandPhoto";
import FAQ from "@/components/ui/FAQ";
import FadeIn from "@/components/ui/FadeIn";
import GlanzMark from "@/components/ui/GlanzMark";
import HeroMedia from "@/components/home/HeroMedia";
import OwnerNote from "@/components/home/OwnerNote";
import ReviewMarquee from "@/components/home/ReviewMarquee";
import ClientLogos from "@/components/home/ClientLogos";
import ProcessTimeline, { type TimelineStep } from "@/components/home/ProcessTimeline";
import GoogleRating from "@/components/ui/GoogleRating";
import ContactForm from "@/components/forms/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { getGoogleRating } from "@/lib/googleRating";
import { owner, serviceVehiclePhoto } from "@/data/owner";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { districtPhotos } from "@/data/districtPhotos";
import { articles } from "@/data/articles";
import { photos } from "@/data/photos";
import { servicePhotos } from "@/data/servicePhotos";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { professionalServiceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/"];

const dosierungPhoto = {
  src: "/images/umwelt-verantwortung/dosierung.webp",
  alt: "Wiederverwendbare Reinigungsutensilien für einen bewussten Ressourceneinsatz",
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: heading.metaTitle ?? heading.h1,
    description:
      "Glanzwerk übernimmt die Gebäudereinigung für Büros, Praxen, Kanzleien und Gewerbeobjekte in ganz Berlin. Klare Abläufe, feste Ansprechpartner und flexible Reinigungszeiten.",
    path: "/",
  }),
  title: { absolute: heading.metaTitle ?? heading.h1 },
};

/** Homepage-eigene Kartentexte je Leistung (Section 3) — überschreibt nur die Anzeige, nicht service.summary selbst. */
const homepageServiceCopy: Record<string, { description: string; linkText: string }> = {
  "gebaeudereinigung-berlin": {
    description:
      "Regelmäßige und ergänzende Reinigungsarbeiten für gewerblich genutzte Immobilien. Leistungen und Intervalle werden an das jeweilige Objekt angepasst.",
    linkText: "Mehr zur Gebäudereinigung",
  },
  "bueroreinigung-berlin": {
    description:
      "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen, Sanitärbereichen und Gemeinschaftsflächen – auf Wunsch außerhalb der regulären Bürozeiten.",
    linkText: "Mehr zur Büroreinigung",
  },
  "praxisreinigung-berlin": {
    description:
      "Sorgfältige Reinigung von Empfang, Wartezimmern, Behandlungsräumen, Sanitäranlagen und weiteren Bereichen medizinischer Einrichtungen.",
    linkText: "Mehr zur Praxisreinigung",
  },
  "unterhaltsreinigung-berlin": {
    description:
      "Regelmäßig wiederkehrende Reinigung für dauerhaft gepflegte Gewerberäume. Umfang und Häufigkeit richten sich nach Nutzung und Bedarf.",
    linkText: "Mehr zur Unterhaltsreinigung",
  },
  "treppenhausreinigung-berlin": {
    description:
      "Pflege von Eingangsbereichen, Stufen, Podesten, Geländern, Handläufen und weiteren gemeinschaftlich genutzten Flächen.",
    linkText: "Mehr zur Treppenhausreinigung",
  },
  "glas-und-fensterreinigung-berlin": {
    description:
      "Reinigung von Fenstern, Rahmen, Glasfassaden, Trennwänden, Eingangstüren und Vitrinen mit geeigneten Verfahren.",
    linkText: "Mehr zur Glas- und Fensterreinigung",
  },
  "grundreinigung-berlin": {
    description:
      "Intensive Reinigung stark beanspruchter oder länger nicht gründlich bearbeiteter Flächen, beispielsweise bei einem Mieterwechsel oder nach Bauarbeiten.",
    linkText: "Mehr zur Grundreinigung",
  },
  "kita-und-schulreinigung-berlin": {
    description:
      "Reinigung von Gruppenräumen, Klassenräumen, Sanitärbereichen, Fluren und Gemeinschaftsflächen mit besonderem Blick auf häufig berührte Bereiche.",
    linkText: "Mehr zur Kita- und Schulreinigung",
  },
  "kanzleireinigung-berlin": {
    description:
      "Diskrete Reinigung von Büros, Besprechungsräumen, Empfangsbereichen und Sanitäranlagen in Kanzleien und Beratungsunternehmen.",
    linkText: "Mehr zur Kanzleireinigung",
  },
  "fitnessstudioreinigung-berlin": {
    description:
      "Reinigung von Trainingsflächen, Umkleiden, Sanitärbereichen, Empfang und häufig genutzten Kontaktflächen.",
    linkText: "Mehr zur Fitnessstudioreinigung",
  },
  "autohausreinigung-berlin": {
    description:
      "Pflege von Showrooms, Verkaufsbereichen, Büros, Kundenflächen und weiteren Bereichen rund um Fahrzeugpräsentation und Service.",
    linkText: "Mehr zur Autohausreinigung",
  },
  "gastronomiereinigung-berlin": {
    description:
      "Reinigung von Gasträumen, Thekenbereichen, Küchenumfeldern, Sanitäranlagen und weiteren betrieblich genutzten Flächen.",
    linkText: "Mehr zur Gastronomiereinigung",
  },
};

/** Section 2 — sechs Vertrauenspunkte, homepage-eigen (nicht die sitewide TrustBadges-Standardliste). */
const trustSectionBadges = [
  {
    title: "Fester Ansprechpartner",
    description:
      "Sie haben eine feste Kontaktperson, die Ihr Objekt und die vereinbarten Leistungen kennt. Fragen oder Änderungen lassen sich dadurch direkt klären.",
    icon: "personal" as const,
  },
  {
    title: "Abgestimmte Reinigungszeiten",
    description:
      "Wir reinigen je nach Bedarf vor Arbeitsbeginn, nach Geschäftsschluss oder innerhalb fest vereinbarter Zeitfenster.",
    icon: "flexible" as const,
  },
  {
    title: "Klare Leistungsabsprachen",
    description:
      "Reinigungsumfang und Intervalle werden vorab festgelegt. Dadurch bleiben Leistungen nachvollziehbar und Kosten besser planbar.",
    icon: "transparent" as const,
  },
  {
    title: "Sorgfältiger Materialeinsatz",
    description:
      "Böden, Glasflächen, Sanitärbereiche und empfindliche Oberflächen werden mit geeigneten Verfahren und passenden Reinigungsmitteln bearbeitet.",
    icon: "specialized" as const,
  },
  {
    title: "Verlässliche Durchführung",
    description:
      "Vereinbarte Reinigungstermine werden fest eingeplant. Bei Änderungen stimmen wir uns frühzeitig mit Ihnen ab.",
    icon: "reliable" as const,
  },
  {
    title: "Einsatz in ganz Berlin",
    description:
      "Wir betreuen Gewerbekunden in allen zwölf Berliner Bezirken sowie nach Absprache in Potsdam, Schönefeld und weiteren Orten im Berliner Umland.",
    icon: "berlin" as const,
  },
];

/**
 * Der feste Ansprechpartner ist die konkreteste Aussage der Liste und der
 * Punkt, den Interessenten zuerst wissen wollen. Er wird deshalb sichtbar
 * vorgezogen, die uebrigen fuenf folgen als Band. Reihenfolge und Wortlaut
 * der Daten bleiben unveraendert.
 */
const [leadTrustPoint, ...supportingTrustPoints] = trustSectionBadges;

/** Section 8 — ein fuehrender Ratgeber, zwei begleitende. Auswahl und
 *  Reihenfolge entsprechen unveraendert den ersten drei Artikeln. */
const [leadArticle, ...supportingArticles] = articles.slice(0, 3);

/** Section 4 — vier Aussagen zur konkreten Arbeitsweise, homepage-eigen. */
const workingMethodPoints = [
  {
    title: "Ihr Objekt wird vorab eingeordnet",
    description:
      "Wir klären Flächen, Nutzung, Besucheraufkommen, sensible Bereiche und gewünschte Reinigungszeiten.",
  },
  {
    title: "Die Leistungen werden eindeutig festgelegt",
    description:
      "Sie wissen, welche Arbeiten regelmäßig ausgeführt werden und welche Leistungen bei Bedarf ergänzt werden können.",
  },
  {
    title: "Das eingesetzte Team kennt die Anforderungen",
    description:
      "Wiederkehrende Abläufe und objektspezifische Hinweise werden so organisiert, dass nicht bei jedem Einsatz neu begonnen werden muss.",
  },
  {
    title: "Beanstandungen werden direkt geklärt",
    description:
      "Sollte eine vereinbarte Leistung einmal nicht wie erwartet ausgeführt worden sein, prüfen wir den konkreten Fall und kümmern uns um eine zeitnahe Lösung.",
  },
];

/** Section 5 — vier Ablaufschritte, exakter Auftragstext. */
/*
 * Die Beschreibungen sind unverändert. Ergänzt sind je Schritt zwei bis drei
 * Einzelheiten — und ausschließlich solche, die an anderer Stelle der Seite
 * bereits belegt sind: die Antwortzeit stammt aus owner.ts, der
 * Mindestauftragswert aus der Preiskonfiguration, die Testphase aus dem
 * eigenen Abschnitt, die Besichtigung aus dem Anfrageformular. Nichts davon
 * ist für diesen Abschnitt neu erfunden.
 *
 * Der Handlungsweg steht nur am ersten Schritt. Vier gleichwertige
 * Schaltflächen nebeneinander heben sich gegenseitig auf.
 */
const homeProcessSteps: TimelineStep[] = [
  {
    title: "Anfrage stellen",
    description:
      "Kontaktieren Sie uns telefonisch, über das Formular oder über den Preisrechner. Teilen Sie uns mit, um welche Objektart es geht und welche Reinigung Sie benötigen.",
    facts: [
      "Kostenlos und unverbindlich",
      "Antwort innerhalb von 2 Stunden während der Geschäftszeiten",
    ],
    photo: photos.lawOfficeReception,
    cta: { label: "Anfrage stellen", href: "/kontakt" },
  },
  {
    title: "Anforderungen besprechen",
    description:
      "Wir klären Größe, Flächen, gewünschte Intervalle, Reinigungszeiten und besondere Anforderungen. Bei umfangreicheren Objekten kann eine Besichtigung sinnvoll sein.",
    facts: [
      "Flächen, Intervalle und Reinigungszeiten werden festgelegt",
      "Besichtigungstermin bei größeren Objekten",
    ],
    photo: photos.medicalPracticeInterior,
  },
  {
    title: "Angebot erhalten",
    description:
      "Sie erhalten ein nachvollziehbares Angebot auf Grundlage der besprochenen Leistungen. Zusätzliche Arbeiten werden nicht ohne vorherige Abstimmung eingeplant.",
    facts: [
      "Leistungen und Termine schriftlich festgehalten",
      "Wiederkehrende Reinigung ab 750 € netto im Monat",
    ],
    photo: photos.businessHandshake,
  },
  {
    title: "Reinigung starten",
    description:
      "Nach der Freigabe beginnt die Reinigung zum vereinbarten Termin. Anpassungen können später vorgenommen werden, wenn sich Nutzung oder Bedarf verändern.",
    facts: [
      "Fester Ansprechpartner, der Ihr Objekt kennt",
      "Auf Wunsch drei Monate testen, ohne automatische Verlängerung",
    ],
    photo: photos.windowCleaning,
  },
];

/** Section 6 — drei kurze Umweltpunkte, homepage-eigen. */
const environmentPoints = [
  {
    title: "Bedarfsgerechte Dosierung",
    description: "Reinigungsmittel werden entsprechend dem tatsächlichen Bedarf und den Herstellerangaben eingesetzt.",
  },
  {
    title: "Materialschonende Verfahren",
    description: "Das Verfahren wird an Bodenbeläge, Glas, Mobiliar und weitere Oberflächen angepasst.",
  },
  {
    title: "Mülltrennung im Objekt",
    description: "Bestehende Trennsysteme berücksichtigen wir im Rahmen der vereinbarten Leistungen.",
  },
];

const homeFaqItems = [
  {
    question: "Welche Reinigungsleistungen bietet Glanzwerk in Berlin an?",
    answer:
      "Glanzwerk übernimmt unter anderem Gebäude-, Büro-, Praxis-, Unterhalts-, Treppenhaus-, Glas-, Fenster- und Grundreinigungen. Hinzu kommen Reinigungsleistungen für Kanzleien, Kitas, Schulen, Fitnessstudios, Autohäuser und gastronomische Betriebe. Welche Leistungen sinnvoll sind, hängt von Objektart, Nutzung und gewünschtem Reinigungsintervall ab.",
  },
  {
    question: "Für welche Unternehmen eignet sich der Reinigungsservice?",
    answer:
      "Unser Angebot richtet sich an Gewerbekunden und Organisationen, beispielsweise Büros, Arztpraxen, Kanzleien, Hausverwaltungen, Bildungseinrichtungen, Autohäuser, Fitnessstudios und Gastronomiebetriebe. Privathaushalte stehen nicht im Mittelpunkt unseres Angebots.",
  },
  {
    question: "In welchen Berliner Bezirken ist Glanzwerk tätig?",
    answer:
      "Wir sind in allen zwölf Berliner Bezirken im Einsatz: Mitte, Friedrichshain-Kreuzberg, Pankow, Charlottenburg-Wilmersdorf, Spandau, Steglitz-Zehlendorf, Tempelhof-Schöneberg, Neukölln, Treptow-Köpenick, Marzahn-Hellersdorf, Lichtenberg und Reinickendorf. Auf Anfrage prüfen wir auch Einsätze in Potsdam, Schönefeld und weiteren Orten im Berliner Umland.",
  },
  {
    question: "Wie wird der Preis für die Reinigung berechnet?",
    answer:
      "Der Preis hängt unter anderem von Fläche, Objektart, Reinigungsumfang, gewünschtem Intervall, Zugänglichkeit und Reinigungszeit ab. Über den Preisrechner erhalten Sie eine erste Orientierung. Für ein verbindliches Angebot müssen die konkreten Anforderungen abgestimmt werden.",
  },
  {
    question: "Sind Reinigungen außerhalb der Geschäftszeiten möglich?",
    answer:
      "Ja. Je nach Objekt und Einsatzplanung kann die Reinigung vor Arbeitsbeginn, nach Geschäftsschluss oder innerhalb vereinbarter Zeitfenster stattfinden. Die konkreten Zeiten werden vor dem Start abgestimmt.",
  },
  {
    question: "Gibt es feste Ansprechpartner?",
    answer:
      "Ja. Für die Abstimmung erhalten Sie eine feste Kontaktperson. Dadurch können Fragen, Änderungen oder Hinweise direkt zugeordnet werden.",
  },
  {
    question: "Welche Reinigungsmittel verwendet Glanzwerk?",
    answer:
      "Wir setzen je nach Oberfläche und Anwendungsbereich professionelle Reinigungsmittel ein, unter anderem von Kiehl, Dr. Schnell und Buzil. Die Auswahl richtet sich nach Material, Verschmutzung und hygienischen Anforderungen.",
  },
  {
    question: "Wie kann ich ein Angebot anfragen?",
    answer: `Sie können den Preisrechner nutzen, das Kontaktformular ausfüllen, uns unter ${siteConfig.phone} anrufen oder eine E-Mail an ${siteConfig.email} senden. Für die erste Einschätzung helfen Angaben zu Objektart, Fläche, Adresse und gewünschtem Reinigungsintervall.`,
  },
];

/**
 * Section 3 — die vier Hauptleistungen der Startseite.
 *
 * Auswahl und Gewichtung auf ausdrückliche Vorgabe des Betreibers (August
 * 2026): diese vier Leistungen, in dieser Reihenfolge, und alle vier in
 * derselben grossen Bauform untereinander — nicht mehr eine Leitleistung
 * gross und drei Begleiter klein daneben.
 *
 * Die Liste steht bewusst als explizite Slug-Aufzählung statt als
 * `services.slice(0, 4)`: die gewünschte Auswahl entspricht nicht mehr der
 * Datenreihenfolge in services.ts (Grundreinigung und Glas-/Fensterreinigung
 * stehen dort weiter hinten). Eine Slice-Grenze würde bei der nächsten
 * Umsortierung in services.ts stillschweigend andere Leistungen nach vorne
 * holen; die Aufzählung hier kann das nicht.
 */
const FEATURED_SERVICE_SLUGS = [
  "gebaeudereinigung-berlin",
  "bueroreinigung-berlin",
  "grundreinigung-berlin",
  "glas-und-fensterreinigung-berlin",
] as const;

const featuredServices = FEATURED_SERVICE_SLUGS.map((slug) =>
  services.find((service) => service.slug === slug),
).filter((service): service is NonNullable<typeof service> => Boolean(service));

/*
 * Alle übrigen Leistungen — abgeleitet, nicht zweite Liste von Hand. So kann
 * keine Leistung doppelt erscheinen oder ganz herausfallen, egal wie sich
 * die Auswahl oben oder services.ts künftig ändert.
 */
const specialisedServices = services.filter(
  (service) => !FEATURED_SERVICE_SLUGS.includes(service.slug as (typeof FEATURED_SERVICE_SLUGS)[number]),
);

const arrowIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
  >
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/*
 * ── Zum Beweisband unter dem Hero ────────────────────────────────────────
 *
 * Der Abschnitt trug bis zuletzt links die Google-Bewertung als grösste
 * Ziffer der Flaeche und rechts vier Zahlen in einer Staffelung. Die
 * Bewertung ist daraus entfernt: dieselbe Aussage steht bereits im Hero,
 * keine 400 px darueber. Zwei identische Belege unmittelbar hintereinander
 * verstaerken einander nicht, sie entwerten sich.
 *
 * Geblieben ist die Rangfolge nach dem, was ein neuer Besucher in zwei bis
 * drei Sekunden beantwortet haben will — ohne die Frage, die der Hero schon
 * beantwortet:
 *   1. Ist das Angebot risikoarm?    → 3 Monate ohne Verlaengerung
 *   2. Lohnt sich der Kontakt jetzt? → Antwort in 2 Stunden
 *   3./4. Absicherung und Reichweite → 5 Mio. EUR · 12 Bezirke
 *
 * Punkt 1 steht allein und gross, die uebrigen drei stehen als eine ruhige
 * linierte Zeile darunter. Die Schriftgrade folgen dieser Reihenfolge; die
 * Beschreibungen bleiben durchgehend gleich leise: die Zahl traegt die
 * Aufmerksamkeit, der Text nur die Bedeutung.
 *
 * Bewusst ohne Karten, ohne Radien, ohne Schatten. Zwischen dem Bewegtbild
 * des Heros und der Bildstrecke darunter liest sich eine rein typografische
 * Flaeche als Absicht, nicht als Baukasten.
 *
 * Darunter haengt der Kundenlogo-Slot (`ClientLogos`), der erscheint, sobald
 * echte freigegebene Logos vorliegen.
 */

/**
 * Beispielrechnung für den Preisabschnitt.
 *
 * Der Wert stammt nicht aus einer Schätzung, sondern aus derselben Formel,
 * die der Preisrechner benutzt (progressive Flächenzeit, progressive
 * Stundensätze, Küchenzuschlag, Fahrtkostenpauschale). Ändert sich die
 * Preiskonfiguration, muss diese Zahl mitgeführt werden — deshalb stehen die
 * Eingabewerte hier vollständig daneben.
 */
const priceExample = {
  inputs: "Büro · 300 m² · 1 Küche · 3 WC · 3× pro Woche",
  result: "ca. 1.225 €",
  unit: "netto im Monat",
};

export default async function HomePage() {
  const googleRating = await getGoogleRating();

  return (
    <>
      <JsonLd
        data={professionalServiceSchema({
          aggregateRating: { ratingValue: googleRating.rating, reviewCount: googleRating.count },
        })}
      />

      {/*
        1. Hero — die Markenbuehne.

        Hoehe ueber svh statt ueber Innenabstand: der Hero fuellt den Blick,
        ohne ihn zu ueberschreiten. svh statt vh, weil vh auf Telefonen die
        ein- und ausfahrende Adressleiste mitrechnet und der Hero dadurch
        beim Scrollen springt. Der Inhalt sitzt vertikal zentriert — ein
        Textblock, der im Raum steht, wirkt souveraener als einer, der von
        oben eingeschoben ist.

        Die Medienebene liegt in HeroMedia und ist bereits auf das spaetere
        Cinematic-Video vorbereitet; an dieser Stelle aendert sich dann nichts.
      */}
      {/*
        Die Hero-Höhe ist jetzt an die Kopfzone gekoppelt statt an einen
        gegriffenen Prozentwert.

        Vorher: 78svh. Zusammen mit Hinweisleiste und Kopfzeile (137 px)
        endete der Hero auf einem 900-px-Schirm bei 839 px — 61 px des
        Folgeabschnitts hingen mit im Bild, ohne lesbar zu sein.

        Jetzt füllt `100svh minus Kopfhöhe` den ersten Schirm exakt aus. Auf
        demselben Gerät ist die Medienfläche dadurch rund 75 px höher, das
        Video wirkt sichtbar größer, und darunter beginnt sauber der nächste
        Abschnitt statt eines angeschnittenen Streifens.

        svh statt vh, weil vh auf Telefonen die ein- und ausfahrende
        Adressleiste mitrechnet und der Hero beim Scrollen springen würde.
      */}
      {/*
        ── Warum der Hero jetzt anders aufgebaut ist ─────────────────────
        Vorher lag alles in einem einzigen linksbündigen Block: Überschrift,
        Satz, zwei Schaltflächen und darunter drei Glasplättchen mit
        Bewertung, Versicherung und Antwortzeit. Die drei Plättchen brachen
        auf gängigen Breiten in zwei Zeilen um (2 + 1) — der Hero endete also
        mit einer unruhigen, halb gefüllten Reihe.

        Jetzt trägt der Hero zwei getrennte Ebenen:

          oben   die Aussage — Überschrift, Satz, Handlungswege. Sie steht
                 allein und bekommt die ganze Höhe.
          unten  eine Vertrauensleiste über die volle Fensterbreite, durch
                 eine Haarlinie abgesetzt.

        Das ist der Unterschied zwischen "Etiketten unter einem Textblock"
        und einer Leiste, die den Hero unten abschließt. Eine über die volle
        Breite laufende Faktenzeile ist die Bauform seriöser Unternehmens-
        und Architekturauftritte; gerundete Glasplättchen sind die von
        Software-Startseiten.

        Nebeneffekt: die Leiste bildet zugleich die Kante zum nächsten
        Abschnitt und macht aus dem harten Schnitt einen Übergang.
      */}
      <section className="relative isolate flex min-h-[calc(100svh-7rem)] flex-col overflow-hidden bg-brand-950 2xl:min-h-[calc(100svh-8rem)]">
        <HeroMedia />
        {/*
          `flex-1` plus `justify-end`: der Textblock sitzt im oberen Bereich
          und läuft gegen die Vertrauensleiste aus, statt exakt mittig zu
          stehen. Optisch mittig heißt bei einem Block, der nach unten
          schwerer wird, ohnehin: leicht darüber.
        */}
        <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-14 pt-12 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
          <div className="max-w-[46rem]">
            {/*
              Die Auszeichnungszeile über der Überschrift ist entfallen. Sie
              wiederholte mit "Gebäudereinigung für Gewerbekunden in Berlin"
              fast wörtlich die Überschrift darunter — und ein gerundetes
              Glas-Etikett über einer großen Headline ist genau das Muster,
              das auf beinahe jeder generierten Seite steht. Der Platz geht
              an das Video.
            */}
            {/*
              Zwei Wörter tragen die Fläche allein. Die Größe steigt deshalb
              von 56 auf 72 px ab Desktop; auf dem Telefon bleiben es 38 px,
              gemessen: bei 44 px stand "Gebäudereinigung" exakt auf beiden
              Innenkanten und wirkte eingeklemmt statt groß.

              Einfarbig in Weiß. Bei zwei Wörtern wäre eine eingefärbte
              Teilzeile kein Akzent mehr, sondern eine cyanfarbene Headline.
            */}
            <h1 className="font-display display-xl text-balance text-[2.375rem] font-medium text-white sm:text-6xl lg:text-7xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight, "text-brand-300")}
            </h1>

            {/* Ein Satz. Nennt Leistung, Zielgruppe und Gebiet — mehr nicht. */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:mt-7 sm:text-lg">
              Unterhaltsreinigung für Büros, Praxen, Kanzleien, Autohäuser und weitere
              Gewerbeobjekte — in ganz Berlin.
            </p>

            {/*
              Groesserer Abstand und mehr Luft zwischen den beiden Zielen: die
              Schaltflaechen sollen als eigener Akt der Komposition gelesen
              werden, nicht als Fussleiste des Absatzes.
            */}
            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-5">
              <Button href="/preisrechner" size="xl">
                Preis schätzen
              </Button>
              <Button href="/kontakt" variant="onMedia" size="xl">
                Angebot anfragen
              </Button>
            </div>

            {/*
              Die Google-Bewertung steht wieder hier, direkt unter den
              Schaltflächen — als Glasplättchen, wie vor dem letzten
              Durchgang. Sie ist der unmittelbare Social Proof zum ersten
              Eindruck und gehört an die Stelle, an der jemand gerade zwei
              Handlungswege abgewogen hat.

              Die Fußleiste des Heros zeigt sie nicht mehr: dieselbe Zahl an
              zwei Stellen desselben Bildausschnitts verstärkt sich nicht,
              sie wiederholt sich nur.
            */}
            <div className="mt-6 sm:mt-7">
              <GoogleRating data={googleRating} variant="badge" />
            </div>
          </div>
        </div>

        {/*
          ── Vertrauensleiste am Fuß des Heros ──────────────────────────
          Drei Belege über die volle Fensterbreite, getrennt durch senkrechte
          Haarlinien — keine Plättchen, keine Rahmen, keine Flächen.

          Die Bewertung stand hier zuvor an erster Stelle. Sie ist jetzt aus
          dieser Leiste entfernt, weil sie direkt darüber — unter den
          Schaltflächen — bereits erscheint: derselbe Beleg zweimal im
          selben Bildausschnitt ist keine Verstärkung, sondern eine
          Wiederholung. Jedes Vertrauenselement hier übernimmt jetzt genau
          eine, unterschiedliche Aufgabe.

          An erster Stelle steht deshalb die Testphase — das einzige
          Argument der Seite, das ein Risiko beim Kunden wegnimmt statt eine
          Eigenschaft zu behaupten. Derselbe Fakt trägt weiter unten einen
          eigenen, großformatigen Abschnitt; hier ist er die kurze Fassung,
          so wie die Bewertung vorher als Plättchen und an anderer Stelle
          als ausführliches Lockup erschien.

          Auf dem Telefon wird aus der Reihe eine waagerecht schiebbare
          Zeile statt eines Umbruchs in drei Zeilen. Ein Umbruch würde die
          Leiste zum Block machen und dem Video ein Drittel der Höhe nehmen;
          geschoben bleibt sie eine Zeile und verhält sich wie das, was sie
          ist — eine Fußleiste.
        */}
        <div className="relative z-10 border-t border-white/15 bg-brand-950/35 backdrop-blur-md">
          <div className="container-page">
            <ul className="-mx-4 flex snap-x snap-mandatory items-stretch overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {[
                {
                  label: "3 Monate ohne automatische Verlängerung",
                  icon: (
                    <>
                      <circle cx="12" cy="12.5" r="7.5" stroke="currentColor" strokeWidth="1.8" />
                      <path
                        d="M12 8v4.5l3 2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M9 2.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </>
                  ),
                },
                {
                  label: "5 Mio. € Betriebshaftpflicht",
                  icon: (
                    <>
                      <path
                        d="M12 3l7 3v5.5c0 4.3-2.9 8.2-7 9.5-4.1-1.3-7-5.2-7-9.5V6l7-3Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ),
                },
                {
                  label: `Antwort ${owner.responseTime}`,
                  icon: (
                    <>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ),
                },
              ].map((fact, index) => (
                <li
                  key={fact.label}
                  className={`flex shrink-0 snap-start items-center gap-2.5 py-5 pr-7 text-sm font-medium text-white sm:flex-1 lg:py-6 ${
                    index === 0
                      ? "pl-0 sm:pr-6"
                      : "border-l border-white/15 pl-7 sm:pl-6 sm:pr-0"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-brand-300"
                  >
                    {fact.icon}
                  </svg>
                  <span className="whitespace-nowrap">{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/*
        Bewertungsband — erscheint nur, wenn echte Rezensionen vorliegen.

        Solange die Zugangsdaten zur Places API fehlen, liefert
        `getGoogleRating()` eine leere Liste und diese Komponente rendert
        nichts. Es gibt bewusst keinen Ersatztext: siehe ReviewMarquee.tsx.
      */}
      <ReviewMarquee reviews={googleRating.reviews} />

      {/*
        Beweisband — der erste Abschnitt nach dem Hero.

        ── Was hier entfernt wurde ──────────────────────────────────────
        Links stand bis eben die Google-Bewertung als 88-px-Ziffer: „5,0 aus
        7 Bewertungen", das größte Einzelelement der Fläche. Dieselbe Zahl
        steht jedoch schon im Hero, keine 400 px darüber, als Glasplättchen
        mit Google-Zeichen und Sternen.

        Zweimal dieselbe Aussage unmittelbar hintereinander macht sie nicht
        stärker, sondern schwächer: die Wiederholung liest sich als Mangel an
        weiteren Argumenten. Die Bewertung bleibt im Hero — dort steht sie
        früher und über dem Bewegtbild. Dieser Abschnitt trägt jetzt das,
        was der Hero NICHT sagt.

        ── Wie er jetzt aufgebaut ist ───────────────────────────────────
        Eine einzelne große Aussage statt vier gleich gewichteter Zahlen.
        „3 Monate testen" ist das einzige Argument auf dieser Seite, das ein
        Risiko beim Kunden wegnimmt statt eine Eigenschaft zu behaupten —
        es bekommt deshalb allein so viel Fläche wie die drei anderen
        zusammen. Die übrigen Belege stehen darunter in einer linierten
        Zeile: vorhanden, nachlesbar, aber nicht gleichrangig.
      */}
      <section className="border-b border-line bg-graphite-50 py-14 sm:py-16 lg:py-[4.5rem]">
        {/*
          ── Zur Bewegung in diesem Abschnitt ──────────────────────────────
          Eine einzige, gemeinsame Einblendung für den ganzen Block. Ein
          gestaffelter Aufbau über die vier Belege wurde verworfen: bei
          500 ms Übergang plus Versatz war die erste Vertrauensfläche der
          Seite fast eine Sekunde lang nicht lesbar. Die Hierarchie trägt der
          Schriftgrad — dauerhaft statt für eine halbe Sekunde.
        */}
        {/*
          ── Satzspiegel mit Marginalspalte ────────────────────────────────
          Die drei Belege standen bis eben als Dreierspalte mit senkrechten
          Trennlinien unter der Leitaussage: drei gleich breite Felder, je
          eine große Zahl über einer Beschriftung. Das ist die Anordnung
          einer Kennzahlenübersicht — dieselbe Bauform, in der eine Software
          ihre Nutzungsstatistik zeigt.

          Jetzt läuft der Abschnitt als zweispaltiger Satzspiegel:

            links   die Aussage, über zwei Drittel der Breite
            rechts  eine schmale Randspalte mit den Belegen

          Die Randspalte ist ein Mittel aus dem Buchsatz: Anmerkungen stehen
          neben dem Haupttext, nicht darunter, und sind schon durch ihre Lage
          als zweitrangig erkennbar — ohne dass man sie kleiner machen oder
          ausgrauen müsste. Die Belege konkurrieren dadurch nicht mehr mit
          der Leitaussage, sie begleiten sie.

          Die Zahlen stehen jetzt in der Zeile ihres Textes statt darüber.
          Eine Zahl auf eigener Zeile mit Beschriftung darunter ist das
          Kennzahlen-Muster; eine Zahl im Satz ist eine Angabe.
        */}
        <FadeIn className="container-page">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-x-20">
            <div>
              {/*
                Leitaussage. Die Zahl steht als Satzanfang in der Zeile des
                Satzes, den sie eröffnet — nicht als Ziffer über einer
                Beschriftung. Dadurch liest sich der Block als ein Gedanke.
              */}
              <p className="font-display display-xl max-w-3xl text-pretty text-[2.75rem] font-medium text-brand-900 sm:text-[3.5rem] lg:text-[4.25rem]">
                3 Monate
              </p>
              <p className="measure mt-6 text-pretty text-lg leading-relaxed text-ink-soft sm:mt-7 sm:text-xl">
                können Sie Glanzwerk im laufenden Betrieb testen — zu den regulären
                Konditionen, ohne dass sich der Auftrag danach automatisch verlängert.
              </p>
              <div className="mt-9">
                <Button href="/3-monate-testen" variant="ghost">
                  Wie die Testphase abläuft
                </Button>
              </div>
            </div>

            {/*
              Randspalte. Auf dem Schirm eine senkrechte Haarlinie als
              Bundsteg, darunter die Angaben mit feinen Zwischenlinien.
              Unterhalb von 1024 px wandert sie unter den Text und die
              Bundsteglinie wird zur Oberlinie — dieselbe Trennung, nur in
              der Richtung, die der schmale Schirm hergibt.
            */}
            <dl className="border-t border-line-strong pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
              {[
                { value: "2 Stunden", label: "Antwortzeit auf Anfragen während der Geschäftszeiten" },
                { value: "5 Mio. €", label: "Betriebshaftpflichtversicherung" },
                { value: "12 Bezirke", label: "Einsatzgebiet in ganz Berlin" },
              ].map((fact, index) => (
                <div
                  key={fact.value}
                  className={index > 0 ? "mt-5 border-t border-line pt-5" : ""}
                >
                  <dt className="font-display text-lg font-medium text-brand-900">{fact.value}</dt>
                  <dd className="mt-1 text-pretty text-sm leading-relaxed text-ink-soft">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/*
            Kundenlogos — erscheinen, sobald in `data/clientLogos.ts` echte,
            freigegebene Einträge stehen. Bis dahin rendert die Komponente
            nichts; an dieser Stelle bleibt dann keine Lücke, weil die Zeile
            darüber den Abschnitt bereits abschließt.
          */}
          <div className="mt-12 empty:mt-0 lg:mt-14">
            <ClientLogos />
          </div>
        </FadeIn>
      </section>

      {/*
        Der persoenliche Abschnitt — bewusst an zweiter Stelle.

        "Fester Ansprechpartner" stand auf dieser Website sechzigmal, ohne
        dass dieser Ansprechpartner je einen Namen hatte. Diese Stelle
        korrigiert das, und sie steht weit oben, weil sie das Einzige ist,
        was ein Wettbewerber nicht kopieren kann.

        Eigene Satzbreite, keine Karten, kein Raster: der Abschnitt soll auch
        formal aus der Reihe fallen.
      */}
      <Section background="white" spacing="roomy">
        <div className="mx-auto max-w-5xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
            <span aria-hidden="true" className="brand-tick text-brand-400" />
            Wer bei Glanzwerk antwortet
          </p>
          <h2 className="font-display display-lg mt-5 max-w-2xl text-pretty text-[1.875rem] font-medium text-brand-900 sm:text-4xl lg:text-5xl">
            Sie sprechen direkt mit dem Inhaber
          </h2>

          <div className="mt-12">
            <OwnerNote />
          </div>

          {/*
            Das Dienstfahrzeug ist der zweite Beleg, den keine Bilddatenbank
            liefern kann. Fehlt die Aufnahme, faellt der Block ersatzlos weg —
            eine leere Bildflaeche waere schlechter als keine.
          */}
          {serviceVehiclePhoto && (
            <figure className="mt-14">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-panel shadow-deep sm:aspect-[21/9]">
                <Image
                  src={serviceVehiclePhoto.src}
                  alt={serviceVehiclePhoto.alt}
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-ink-soft">
                Unser Dienstfahrzeug im Einsatz in Berlin.
              </figcaption>
            </figure>
          )}
        </div>
      </Section>

      {/*
        Bildzäsur nach dem persönlichen Abschnitt.

        Gemessen: zwischen Hero und Vertrauensbereich lagen 2.586 px ohne ein
        einziges Bild — auf einem Laptop 3,4 Bildschirme reiner Text, direkt
        an der Stelle, an der die meisten noch entscheiden, ob sie
        weiterlesen. Genau dort sitzt jetzt eine randlose Bildfläche.

        Sie zeigt ein reales Berliner Motiv statt einer Reinigungssituation:
        an dieser Stelle geht es nicht um die Leistung, sondern darum, dass
        hier jemand vor Ort ist. 21:9 auf dem Schirm, 4:3 auf dem Telefon —
        eine Fläche, die auf dem Handy zu flach wird, ist kein Bildmoment
        mehr, sondern ein Streifen.

        Die Bildunterschrift ist keine Beschriftung des Fotos, sondern die
        Ortsangabe: sie trägt die Aussage, das Bild trägt den Rhythmus.
      */}
      <figure className="relative isolate bg-brand-950">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={districtPhotos.mitte.src}
            alt={districtPhotos.mitte.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: districtPhotos.mitte.objectPosition }}
          />
          {/* Fußzone, damit die Bildunterschrift auf jedem Einzelbild lesbar bleibt. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/85 via-brand-950/35 to-transparent"
          />
          <figcaption className="container-page absolute inset-x-0 bottom-0 pb-8 sm:pb-10">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
              <span aria-hidden="true" className="brand-tick text-brand-300" />
              Einsatzgebiet
            </p>
            <p className="font-display display-lg mt-3 max-w-2xl text-pretty text-xl font-medium text-white sm:text-2xl lg:text-3xl">
              In allen zwölf Berliner Bezirken unterwegs — mit realistischer
              Einsatzplanung statt langer Anfahrtswege.
            </p>
          </figcaption>
        </div>
      </figure>

      {/*
        Preis-Schaetzung — eigener Abschnitt statt einer Schaltflaeche im
        Fliesstext.

        Die wichtigste Aussage ist nicht "wir haben einen Rechner", sondern
        "Sie bekommen sofort eine Groessenordnung, ohne mit uns zu sprechen".
        Deshalb steht rechts eine durchgerechnete Beispielzahl: eine konkrete
        Zahl im Kopf ist der Grund, warum jemand den Rechner ueberhaupt
        oeffnet.
      */}
      <Section background="tint">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              <span aria-hidden="true" className="brand-tick text-brand-400" />
              Was kostet das ungefähr?
            </p>
            <h2 className="font-display display-lg mt-5 text-pretty text-[1.875rem] font-medium text-brand-900 sm:text-4xl lg:text-5xl">
              In zwei Minuten zu einer realistischen Hausnummer
            </h2>
            <p className="measure mt-6 text-base leading-relaxed text-ink-soft">
              Der Preisrechner fragt Fläche, Sanitärbereiche, Küchen und Reinigungsintervall ab und
              nennt Ihnen sofort eine Größenordnung — ohne Anmeldung, ohne Telefonat.{" "}
              <strong className="font-semibold text-brand-900">
                Das Ergebnis ist eine unverbindliche Schätzung, kein Angebot.
              </strong>{" "}
              Was am Ende im Vertrag steht, hängt vom Objekt ab und wird vorher gemeinsam
              festgelegt. Wiederkehrende Reinigung übernehmen wir ab 750 € netto im Monat.
            </p>
            <div className="mt-10">
              <Button href="/preisrechner" size="xl">
                Jetzt Preis schätzen
              </Button>
            </div>
          </div>

          {/*
            Beispielrechnung — dieselbe Formel wie im Rechner, damit die Zahl
            haelt.

            Der Kasten ist weg: weisse Flaeche, Rahmen und Schatten haben aus
            einer Zahl ein Objekt gemacht, das neben dem Text liegt. Jetzt
            traegt die Zahl selbst. Sie steht auf 96 px — groesser als jede
            Ueberschrift dieser Seite ausser der Titelzeile — und ist damit
            das, was sie sein soll: der Grund, den Rechner zu oeffnen.

            Struktur entsteht ueber zwei Haarlinien und die Einrueckung, nicht
            ueber einen Rahmen. Die senkrechte Linie links bindet den Block an
            den Text daneben, statt ihn davon abzugrenzen.
          */}
          <div className="border-t border-line-strong pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Beispielrechnung
            </p>
            <p className="measure mt-4 text-sm leading-relaxed text-ink-soft">
              {priceExample.inputs}
            </p>
            <p className="font-display display-xl mt-8 text-[3.5rem] font-medium leading-none text-brand-900 sm:text-[4.5rem] lg:text-[6rem]">
              {priceExample.result}
            </p>
            <p className="mt-3 text-sm font-medium text-ink-soft">{priceExample.unit}</p>
            <p className="measure mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink-soft">
              Ihr Objekt kann darüber oder darunter liegen. Genau dafür gibt es den Rechner.
            </p>
          </div>
        </div>
      </Section>

      {/*
        Dreimonatige Testphase — vom Seitenende nach vorn geholt.

        Das ist das staerkste Angebot, das Glanzwerk hat, und es stand
        vorher an zehnter Stelle. Jetzt steht es dort, wo jemand noch liest,
        und traegt eine eigene dunkle Flaeche.
      */}
      <Section
        background="navy"
        decor
        spacing="roomy"
        backdrop={{ src: photos.brightStaircase.src, objectPosition: "center 40%" }}
      >
        <div className="grid gap-12 lg:grid-cols-[1.25fr_auto] lg:items-center lg:gap-20">
          <div>
            <p className="inline-flex items-center rounded-control border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              Ohne langfristige Bindung
            </p>
            <h2 className="font-display display-lg mt-6 text-pretty text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
              {heading.secondaryCtaHeading}
            </h2>
            <div className="glanz-divider mt-6 max-w-[120px]" />
            <p className="measure mt-7 text-base leading-relaxed text-brand-100 sm:text-lg">
              Sie möchten zunächst prüfen, ob Abläufe, Kommunikation und Reinigungsleistung zu Ihrem
              Unternehmen passen? Vereinbaren Sie eine dreimonatige Testphase zu den regulär
              angebotenen Konditionen.{" "}
              <strong className="font-semibold text-white">
                Nach Ablauf entsteht keine automatische Verlängerung.
              </strong>{" "}
              Die genauen Leistungen und Termine werden vor Beginn schriftlich festgehalten.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Button href="/3-monate-testen" size="xl">
              Testphase anfragen
            </Button>
            <Button
              href="/preisrechner"
              variant="onMedia"
              size="xl"
            >
              Preis schätzen
            </Button>
          </div>
        </div>
      </Section>

      {/*
        2. Vertrauensbereich — redaktioneller Einstieg mit Arbeitsfoto links,
        die sechs Punkte rechts als Matrix aus feinen Trennlinien. Bewusst
        keine sechs gleichen Container.
      */}
      <Section background="warm">
        {/*
          Komposition: schmale Textspalte gegen eine bewusst grosse, hochformatige
          Bildflaeche, die vertikal versetzt sitzt — keine mittige Zweiteilung.
          Die staerkste Einzelaussage steht direkt hier oben; die uebrigen fuenf
          folgen als ruhiges Band darunter, statt alle sechs gleich zu gewichten.
        */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-20">
          <div className="lg:pt-10">
            <SectionHeading
              eyebrow="Darauf kommt es im Reinigungsalltag an"
              title={heading.sectionHeadings[0]}
              subtitle="Saubere Räume allein reichen nicht aus, wenn Termine ausfallen, Zuständigkeiten unklar sind oder Leistungen jedes Mal neu erklärt werden müssen. Deshalb legen wir Wert auf feste Abläufe. Vor dem Start klären wir, welche Flächen gereinigt werden, wie häufig die Reinigung stattfinden soll und welche Bereiche besondere Aufmerksamkeit benötigen. So wissen beide Seiten, was vereinbart wurde."
            />

            <div className="mt-10 border-l-2 border-brand-500 pl-7">
              <p className="font-display display-lg text-xl font-medium text-brand-900 sm:text-2xl">
                {leadTrustPoint.title}
              </p>
              <p className="measure mt-3 text-base leading-relaxed text-ink-soft">
                {leadTrustPoint.description}
              </p>
            </div>
          </div>

          {/*
            Bildanschnitt: ab Desktop laeuft die Flaeche ueber den Inhalts-
            container hinaus bis an den Fensterrand und ist dort nicht mehr
            gerundet. Das Bild begrenzt damit den Abschnitt, statt darin zu
            liegen — der Weissraum links entsteht als Gegengewicht zur
            Bildkante, nicht als Restflaeche.
            calc(50% - 50vw) zieht die rechte Kante auf die Fensterbreite; der
            Ueberstand wird vom overflow-hidden der Section sauber beschnitten.
          */}
          <BrandPhoto
            photo={photos.teamBriefing}
            aspect="aspect-[4/3] lg:aspect-[3/4]"
            sizes="(min-width: 1024px) 55vw, 100vw"
            objectPosition="84% 45%"
            rounded="rounded-panel lg:rounded-r-none"
            /* Hoehendeckel ab Desktop: 3/4 rechnet sich auf der randlosen
               Flaeche auf ueber 1450 px hoch, daneben blieb eine leere weisse
               Spalte von mehr als einem halben Bildschirm stehen — das las
               sich nicht als Weissraum, sondern als Layoutfehler. 46rem
               bringt die Bildunterkante etwa auf Hoehe des Textblocks; der
               Deckel greift, weil der Rahmen overflow-hidden traegt. */
            className="shadow-deep lg:-mt-24 lg:-mb-8 lg:mr-[calc(50%-50vw)] lg:max-h-[46rem]"
          />
        </div>

        <FadeIn
          as="ul"
          className="mt-16 grid border-t border-line sm:grid-cols-2 sm:gap-x-12 lg:mt-20 lg:grid-cols-3"
        >
          {supportingTrustPoints.map((badge) => (
            <li key={badge.title} className="flex gap-4 border-b border-line py-6">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-white text-brand-500 shadow-raise">
                <TrustIcon name={badge.icon} />
              </span>
              <div>
                <p className="font-display text-base font-medium text-brand-900">{badge.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{badge.description}</p>
              </div>
            </li>
          ))}
        </FadeIn>
      </Section>

      {/*
        3. Leistungsbereich — alle zwölf Leistungen mit Foto nebeneinander.
        Rhythmus über zwei Kartengrößen statt über zwölf identische Kacheln.
      */}
      <Section background="tint" decor>
        <SectionHeading
          scale="editorial"
          eyebrow="Unsere Reinigungsleistungen"
          title={heading.sectionHeadings[1]}
          subtitle="Ein Büro stellt andere Anforderungen als eine Arztpraxis, ein Autohaus oder ein gastronomischer Betrieb. Deshalb betrachten wir nicht nur die Fläche, sondern auch die Nutzung des Gebäudes. Gemeinsam legen wir fest, welche Bereiche regelmäßig gereinigt werden, wo hygienisch sensible Zonen liegen und welche Arbeiten in größeren Abständen sinnvoll sind."
        />

        {/*
          ── Was hier vorher stand ────────────────────────────────────────
          Vier gleich große Karten in einem 2×2-Raster: weißer Grund, Rahmen,
          Schatten, Bild oben, Text unten, Pfeil-Link. Viermal exakt dieselbe
          Bauform — die Anordnung, an der man einen Leistungskatalog von
          einem Onlineshop nicht mehr unterscheiden kann.

          ── Was jetzt hier steht ─────────────────────────────────────────
          Vier gleichrangige Bildflächen im selben grossen Querformat,
          untereinander gestapelt — auf ausdrückliche Vorgabe des Betreibers
          (August 2026).

          Beibehalten aus dem vorherigen Aufbau:

          1. Kein Behälter. Weder Rahmen noch Schatten noch weiße Fläche —
             es gibt nur Bild und Satz. Genau der Kasten war das, was die
             Leistungen vorher zu „Karten" gemacht hat; ohne ihn liest sich
             dieselbe Information als redaktionelle Strecke.

          2. Text auf dem Bild, mit Lesekante unten statt Deckung über die
             ganze Fläche: oben bleibt das Motiv frei, unten trägt es die
             Schrift.

          Geändert ist die Gewichtung: vorher trug eine Leitleistung die
          doppelte Fläche und drei Begleiter standen im Hochformat daneben,
          jetzt sind alle vier gleich gross. Das Format bleibt auf allen
          Breakpoints dasselbe wie zuvor bei der Leitleistung (4:3 auf dem
          Telefon, 16:9 ab sm, 21:9 ab lg), damit ein einzelner Eintrag auf
          dem Telefon nicht die halbe Bildschirmhöhe einnimmt.
        */}
        <FadeIn className="mt-12">
          <ul className="grid gap-6 lg:gap-8">
            {featuredServices.map((service) => {
              const photo = servicePhotos[service.slug];
              return (
                <li key={service.slug}>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="press group relative block overflow-hidden rounded-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                  >
                    <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
                      {photo && (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 76rem, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      )}
                      {/*
                        Lesekante unten statt einer Deckung über das ganze
                        Bild: oben bleibt das Motiv frei, unten trägt es die
                        Schrift.
                      */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-brand-950/5"
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
                      <h3 className="font-display display-lg text-pretty text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
                        {service.shortTitle}
                      </h3>
                      <p className="measure mt-4 text-sm leading-relaxed text-brand-100 sm:text-base">
                        {homepageServiceCopy[service.slug]?.description ?? service.summary}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        {homepageServiceCopy[service.slug]?.linkText ?? `Zur ${service.shortTitle}`}
                        {arrowIcon}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </FadeIn>

        {/*
          Die uebrigen acht Leistungen — als Verzeichnis, nicht als Karten.

          Vorher standen hier acht weitere Bildkacheln. Zwoelf gleichrangige
          Kacheln nehmen jeder Leistung ihr Gewicht: wenn alles gleich gross
          ist, ist nichts wichtig.

          Jetzt tragen die vier Hauptleistungen oben das Bild und die Flaeche,
          die restlichen acht stehen als klar sichtbares, sofort anklickbares
          Register darunter. Alle zwoelf internen Verlinkungen bleiben damit
          unveraendert erhalten — an der internen Linkstruktur aendert sich
          nichts, nur an der Gewichtung.
        */}
        {/*
          Das Register stand in einer weissen Flaeche mit Rahmen und Schatten
          — unmittelbar unter vier rahmenlosen Bildflaechen. Genau dieser
          Wechsel liess den Abschnitt wieder nach Kartensammlung aussehen.

          Jetzt traegt es eine kraeftige Oberlinie statt eines Kastens: die
          Trennung zwischen den vier inszenierten Leistungen und dem
          vollstaendigen Verzeichnis bleibt sichtbar, ohne dass eine zweite
          Flaeche entsteht.
        */}
        <FadeIn className="mt-20 border-t-2 border-brand-900 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h3 className="font-display display-lg text-xl font-medium text-brand-900 sm:text-2xl">
              Alle weiteren Leistungen
            </h3>
            <Link
              href="/leistungen"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Leistungsübersicht öffnen
              {arrowIcon}
            </Link>
          </div>

          <ul className="mt-7 grid border-t border-line sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
            {specialisedServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-line py-4 text-base font-medium text-brand-900 transition-colors duration-200 ease-out hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
                >
                  <span>{service.shortTitle}</span>
                  <span className="text-brand-300 transition-colors duration-200 ease-out group-hover:text-brand-500">
                    {arrowIcon}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      {/*
        4. Konkrete Arbeitsweise — bewusst KEIN zweiter Kartenbereich: großes
        Betriebsfoto plus vier Betriebsprinzipien an einer durchgehenden Kante.
      */}
      {/*
        Komposition: randloses Bildband ueber die volle Fensterbreite, darueber
        ein versetztes Textpanel. Das Layout entsteht hier um das Bild herum
        statt das Bild in eine Spalte zu setzen — die einzige Stelle der Seite,
        an der eine Flaeche den Raster verlaesst.
      */}
      <Section background="white" contained={false}>
        <div className="relative aspect-[3/2] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={photos.cleaningEquipment.src}
            alt={photos.cleaningEquipment.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-950/35 via-transparent to-transparent"
          />
        </div>

        <div className="container-page">
          <div className="relative z-[1] -mt-14 max-w-2xl rounded-panel bg-graphite-50 p-8 shadow-deep sm:-mt-24 sm:p-11 lg:-mt-40 lg:ml-auto lg:p-12">
            <SectionHeading
              eyebrow="So arbeitet Glanzwerk"
              title={heading.sectionHeadings[2]}
              subtitle="Ob eine Reinigung dauerhaft funktioniert, zeigt sich im Alltag. Deshalb setzen wir nicht auf allgemeine Werbeversprechen, sondern auf klare Zuständigkeiten und praktische Vereinbarungen. Ihr Objekt wird vor dem Start besprochen, Leistungen werden festgehalten und Besonderheiten dokumentiert."
            />
            <FadeIn as="ul" className="mt-9 space-y-7 border-l-2 border-brand-200 pl-7">
              {workingMethodPoints.map((point) => (
                <li key={point.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[calc(1.75rem+3px)] top-2 h-1.5 w-1.5 rounded-full bg-brand-500"
                  />
                  <p className="font-display text-base font-medium text-brand-900">{point.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
                </li>
              ))}
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* 5. Ablauf — kräftiger Blauton als visueller Anker in der Seitenmitte. */}
      {/*
        Wasserzeichen unten links statt oben rechts: die vorherige und die
        folgende dunkle Fläche der Startseite (Testphase, Schluss-CTA)
        tragen das Zeichen beide oben rechts. Ohne diese Abweichung stünde
        es dreimal im selben Scroll an derselben Stelle — dann ist es kein
        Signatur-Detail mehr, sondern ein Aufkleber.
      */}
      <Section
        background="brand"
        decor
        markCorner="bottom-left"
        backdrop={{ src: photos.lawOfficeReception.src, objectPosition: "center 45%" }}
      >
        <SectionHeading
          scale="editorial"
          eyebrow="Von der Anfrage bis zum Reinigungsstart"
          title={heading.sectionHeadings[3]}
          light
        />
        <FadeIn className="mt-12">
          <ProcessTimeline steps={homeProcessSteps} />
        </FadeIn>
      </Section>

      {/*
        6. Umwelt und Verantwortung — warme Graphitfläche und ein sehr
        zurückhaltender Grünakzent, der ausschließlich hier vorkommt.
      */}
      {/*
        Komposition: als einziger Abschnitt textgefuehrt. Ueberschrift ueber
        die volle Breite, darunter zwei ungleiche Spalten — links der
        Fliesstext, rechts ein kleines Belegbild ueber der Punkteliste.
        Das Foto ist eine Nahaufnahme (1600x1200) und bleibt deshalb bewusst
        klein: grossformatig wuerde es koernig und grell wirken.
      */}
      {/*
        Eigene Proportion: dieser Abschnitt laeuft als einziger auf einer
        schmaleren Satzbreite. Der Weissraum links und rechts ist damit
        gestaltete Marginalie statt Restflaeche — die Strecke liest sich als
        redaktioneller Essay und unterscheidet sich schon in der Breite von
        jedem anderen Abschnitt.
      */}
      <Section background="warm">
        <div className="mx-auto max-w-5xl">
          <SectionHeading scale="editorial" eyebrow="Umwelt und Schutz" title={heading.sectionHeadings[4]} />

          {/*
            Spaltenverhaeltnis von 1,4:1 auf 1:1 geoeffnet. Vorher lief das
            Foto auf 420 px Breite und deckte nur 10 % der Abschnittsflaeche —
            zusammen mit dem bildlosen Bezirksregister darunter ergab das die
            laengste bildlose Strecke der Seite (2.003 px). Mit halber
            Spaltenbreite traegt das Bild den Abschnitt sichtbar mit.
          */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <div className="space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                <strong className="font-semibold text-brand-900">
                  Wirksame Reinigung bedeutet nicht, möglichst viel Chemie einzusetzen.
                </strong>{" "}
                Entscheidend sind das passende Mittel, die richtige Dosierung und ein Verfahren, das
                zur Oberfläche passt. Glanzwerk arbeitet unter anderem mit professionellen
                Reinigungsprodukten von Kiehl, Dr. Schnell und Buzil. Welches Produkt eingesetzt wird,
                richtet sich nach Material, Verschmutzung und Nutzungsbereich.
              </p>
              <p>
                Wo es im Objekt möglich und sinnvoll ist, achten wir auf einen sparsamen
                Wasserverbrauch, bedarfsgerechte Dosierung und Mülltrennung. Empfindliche Oberflächen
                behandeln wir materialgerecht, damit sie nicht durch ungeeignete Mittel oder zu
                aggressive Verfahren beschädigt werden. Desinfektionsmittel setzen wir dort ein, wo sie
                vereinbart oder hygienisch erforderlich sind – nicht pauschal auf jeder Fläche.
              </p>
            </div>

            {/* Abschnittsfuss: die Haarlinie bindet den Link an den Block darueber,
                statt ihn frei im Raum stehen zu lassen. */}
            <div className="mt-12 border-t border-line pt-8">
              <Button href="/umwelt-verantwortung" variant="ghost">
                Mehr über Umwelt und Verantwortung
              </Button>
            </div>
          </div>

          <div>
            <BrandPhoto
              photo={dosierungPhoto}
              aspect="aspect-[4/3] lg:aspect-[3/4]"
              sizes="(min-width: 1024px) 512px, 100vw"
              objectPosition="center 45%"
              className="shadow-float"
            />
            <ul className="mt-8 divide-y divide-line border-t border-line">
              {environmentPoints.map((point) => (
                <li key={point.title} className="flex gap-3.5 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-eco-600"
                  />
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-eco-600">{point.title}</span>{" "}
                    <span className="text-ink-soft">— {point.description}</span>
                  </p>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/*
        7. Einsatzgebiet — typografische Bezirksmatrix statt Pill-Wolke:
        liest sich als Einsatzverzeichnis, nicht als Ortsnamen-SEO-Block.
      */}
      <Section background="tint" surface="left" spacing="compact">
        <SectionHeading
          scale="editorial"
          eyebrow="Gebäudereinigung vor Ort"
          title={heading.sectionHeadings[5]}
          subtitle="Glanzwerk betreut gewerblich genutzte Objekte in ganz Berlin. Dazu gehören zentrale Bürostandorte ebenso wie Praxen, Kanzleien, Gastronomiebetriebe, Autohäuser und Gewerbeflächen in den äußeren Bezirken. Kurze Abstimmungswege und eine realistische Einsatzplanung sind dabei wichtiger als künstlich eingebaute Ortsnamen."
        />
        {/*
          Spaltensatz statt Raster: die senkrechten Trennlinien machen aus der
          Luft zwischen den Spalten eine sichtbare Struktur. Ein Einsatz-
          verzeichnis liest sich spaltenweise — wie ein gedrucktes Register.
          Die Linienfarbe steht literal, weil das Theme die Token inline
          aufloest und keine CSS-Variable ausliefert.
        */}
        <FadeIn className="mt-10 border-t border-line sm:columns-2 sm:gap-14 sm:[column-rule:1px_solid_#e7eaef] lg:columns-3">
          {districts.map((district) => (
            <Link
              key={district.slug}
              href={`/standorte/${district.slug}`}
              className="group flex break-inside-avoid items-center justify-between gap-4 border-b border-line py-4 text-base font-medium text-brand-900 transition-colors duration-200 ease-out hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
            >
              <span>{district.name}</span>
              <span className="text-brand-300 transition-colors duration-200 ease-out group-hover:text-brand-500">
                {arrowIcon}
              </span>
            </Link>
          ))}
        </FadeIn>
        <p className="measure mt-8 text-sm leading-relaxed text-ink-soft">
          Nach Absprache übernehmen wir auch Reinigungsaufträge in Potsdam, Schönefeld und weiteren gut
          erreichbaren Orten im Berliner Umland. Ob ein Einsatz möglich ist, hängt von Objektgröße,
          Leistungsumfang und Reinigungsintervall ab.
        </p>
      </Section>

      {/*
        Kapitelpause — randlose Caesur zwischen zwei hellen Flaechen.

        Zwischen Bezirken, Wissen, Testphase und FAQ folgen vier Textbloecke
        aufeinander; das ist die flachste Strecke der Seite.

        Bewusst KEINE Abbildung, sondern eine Materialflaeche: die Fassaden-
        aufnahme des Heros liegt unter einer kraeftigen Navy-Deckung und
        liefert nur noch Struktur und Tiefe. Damit haengt die Wirkung nicht am
        Charme eines Stockfotos — bei voller Breite tragen die vorhandenen
        Motive das nicht (geprueft und verworfen: Treppenhaus und Empfangs-
        bereich, beide lesen sich grossformatig als Bestandsimmobilie statt
        als Gewerbe).

        Nebeneffekt: der vom Rhythmus gewuenschte Dunkelwert zwischen zwei
        hellen Flaechen und eine Klammer zurueck zum Hero.

        Hoehe angehoben: 3.4/1 ergab auf dem Schirm 445 px — einen Streifen,
        keine Flaeche. Bei 2.2/1 sind es rund 690 px und die Zaesur wirkt als
        eigener Moment statt als Trennlinie. Auf dem Telefon bleibt 16/9, dort
        traegt die schmale Spalte kein flacheres Format.

        Rein gestalterisch, deshalb leeres alt-Attribut. Laedt verzoegert.
      */}
      {/*
        ── Was sich hier geändert hat ────────────────────────────────────
        Diese Fläche war `aria-hidden` und vollständig ohne Inhalt: eine
        dunkle Bildfläche über die volle Fensterbreite, deren einzige Aufgabe
        darin bestand, zwei helle Abschnitte zu trennen. Genau das ist die
        „rein dekorative Großfläche", die eine Kapitelpause nicht sein soll —
        auf einem Laptop rund 690 px Höhe, die der Besucher durchscrollt,
        ohne etwas zu erfahren.

        Jetzt trägt sie die einzige belegte Zusage, die auf der Startseite
        noch nicht vorkam: das Nachbesserungsversprechen. Der Wortlaut ist
        unverändert aus `data/expectations.tsx` übernommen — dieselbe Aussage
        wie auf den Leistungsseiten und unter /ueber-uns#garantie, nicht neu
        formuliert.

        Damit ist die Fläche keine Pause mehr, sondern die Stelle, an der
        zwischen zwei sachlichen Abschnitten das stärkste Argument steht.

        ── Tiefe statt Farbblock ─────────────────────────────────────────
        Drei Ebenen über dem Foto, alle aus dem vorhandenen System:
          1. Grundton, links dichter als rechts — eine Lichtrichtung statt
             einer gleichmäßigen Deckung. Der Text sitzt links, wo es dunkel
             ist; rechts bleibt das Motiv sichtbar.
          2. ein einzelner Lichtstreifen im Glanzwerk-Winkel. 127 Grad ist
             die in globals.css dokumentierte Verlaufsachse senkrecht zum
             53-Grad-Band des Markenzeichens — derselbe Winkel wie beim
             Glanzstreifen der Schaltflächen, nicht frei gewählt.
          3. die Lichtkanten oben und unten, die alle dunklen Flächen der
             Seite tragen.

        Kein Glühen, keine animierten Verläufe, keine Partikel.
      */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <div className="absolute inset-0">
          <Image
            src={photos.heroCleaningTeam.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          {/* 1 — gerichteter Grundton: links tragend, rechts geöffnet. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-950/55"
          />
          {/* 2 — Lichtstreifen im Markenwinkel. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(127deg, transparent 34%, rgb(255 255 255 / 0.07) 50%, transparent 66%)",
            }}
          />
          {/* 3 — Lichtkanten, dieselbe Sprache wie auf allen dunklen Flächen. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </div>

        {/*
          Höhe entsteht jetzt aus dem Inhalt statt aus einem festen
          Seitenverhältnis. Vorher war sie auf 2.2/1 festgelegt — eine Zahl,
          die nichts trug. Der Mindestwert verhindert nur, dass die Fläche
          auf breiten Schirmen zum Streifen zusammenfällt.
        */}
        <div className="container-page relative z-[1] flex min-h-[22rem] items-center py-20 sm:min-h-[26rem] sm:py-24">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
              <span aria-hidden="true" className="brand-tick text-brand-300" />
              Wenn etwas nicht stimmt
            </p>
            <p className="font-display display-lg mt-6 text-pretty text-2xl font-medium leading-snug text-white sm:text-3xl lg:text-[2.5rem]">
              Melden Sie einen konkreten Mangel innerhalb von 24 Stunden, beheben wir
              ihn in der Regel kostenlos nach.
            </p>
            <Link
              href="/ueber-uns#garantie"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-200 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Was genau wir zusagen
              {arrowIcon}
            </Link>
          </div>
        </div>
      </section>

      {/*
        8. Wissensbereich — Magazinstrecke mit einem fuehrenden Beitrag und zwei
        begleitenden Zeilen statt drei gleichwertiger Kacheln.
      */}
      <Section background="white" surface="right">
        {/*
          Eigene Satzbreite, zweite von zwei: neben Umwelt laeuft nur dieser
          Abschnitt schmaler als das uebrige Raster. Eine Magazinstrecke
          vertraegt keine volle Rasterbreite — die eingezogene Kante macht
          aus dem Weissraum rechts eine Marginalie und trennt den redak-
          tionellen Teil sichtbar von den Leistungs- und Bezirksflaechen.
        */}
        <div className="mx-auto max-w-6xl">
          <SectionHeading
          scale="editorial"
            eyebrow="Glanzwerk Wissen"
            title={heading.sectionHeadings[6]}
            subtitle="Was kostet eine Gebäudereinigung? Wie häufig sollte ein Büro gereinigt werden? Und wann reicht eine Unterhaltsreinigung nicht mehr aus? In unserem Wissensbereich erklären wir wichtige Begriffe und Entscheidungskriterien verständlich und ohne unnötige Fachsprache."
          />
          <FadeIn className="mt-12 grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
            <ArticleCard article={leadArticle} variant="feature" />
            <div className="flex flex-col divide-y divide-line border-t border-line lg:border-t-0 lg:pt-1">
              {supportingArticles.map((article) => (
                <div key={article.slug} className="py-7 first:pt-0 lg:first:pt-0">
                  <ArticleCard article={article} variant="row" />
                </div>
              ))}
            </div>
          </FadeIn>
          {/* Abschnittsfuss: die Haarlinie bindet den Link an den Block darueber,
              statt ihn frei im Raum stehen zu lassen. */}
          <div className="mt-14 border-t border-line pt-8">
            <Button href="/wissen" variant="ghost">
              Alle Ratgeber ansehen
            </Button>
          </div>
        </div>
      </Section>

      {/*
        Anfrageformular direkt auf der Startseite.

        Vorher fuehrte jeder Weg zur Anfrage ueber einen weiteren Klick auf
        /kontakt. Jeder Zwischenschritt kostet Anfragen, und das Formular hat
        nur fuenf Pflichtfelder — es passt hierher.

        Links steht, was nach dem Absenden passiert, rechts das Formular.
        Ungleiche Spalten, damit auch dieser Abschnitt nicht als mittige
        Zweiteilung liest.

        Die dreimonatige Testphase erscheint hier zum dritten Mal auf der
        Seite: einmal als Zahl im Beweisband, einmal als eigener Abschnitt,
        einmal als Option beim Absenden.
      */}
      {/*
        Grundwechsel von Weiss auf Warm: der Wissensbereich davor laeuft
        ebenfalls auf Weiss. Zwei identische Gruende hintereinander lesen
        sich als eine einzige, sehr lange Flaeche — genau die flache Stelle,
        die am Seitenende entstand.
      */}
      <Section background="warm" id="anfrage">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <div className="lg:pt-2">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              <span aria-hidden="true" className="brand-tick text-brand-400" />
              Anfrage stellen
            </p>
            <h2 className="font-display display-lg mt-5 text-pretty text-[1.875rem] font-medium text-brand-900 sm:text-4xl lg:text-5xl">
              Schreiben Sie kurz, was gereinigt werden soll
            </h2>
            <p className="measure mt-6 text-base leading-relaxed text-ink-soft">
              Fünf Angaben genügen. {owner.name} meldet sich {owner.responseTime}{" "}
              {owner.responseTimeQualifier} bei Ihnen — mit Rückfragen zum Objekt oder direkt mit
              den nächsten Schritten.
            </p>

            <ul className="mt-9 space-y-4 border-t border-line pt-8">
              {[
                "Kostenlos und unverbindlich",
                "Auf Wunsch mit dreimonatiger Testphase",
                "Besichtigungstermin bei größeren Objekten",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-base text-ink-soft">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brand-500"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-line pt-8">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-control text-base font-semibold text-brand-900 transition-colors duration-200 ease-out hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                Lieber telefonisch? {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="rounded-panel border border-line bg-white p-7 shadow-float sm:p-9">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/*
        10. FAQ — Ueberschrift steht links und bleibt beim Scrollen stehen,
        die Antworten laufen rechts durch. Ruhiger Abschnitt, der die Seite vor
        dem Abschluss entlastet, und zugleich die einzige zweispaltige
        Text-zu-Text-Anordnung der Seite.
      */}
      <Section background="muted" id="faq" surface="bottom">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} />
          </div>
          <FadeIn>
            <FAQ items={homeFaqItems} />
          </FadeIn>
        </div>
      </Section>

      {/*
        11. Abschliessender Kontaktbereich â die Bildflaeche traegt den Abschnitt.

        Vorher lag hier ein CSS-Hintergrundbild unter 90â93 % Deckung in einer
        gerundeten Karte. Das hatte zwei Nachteile: das Bild war praktisch
        unsichtbar, und als CSS-Hintergrund lief es an der Bildoptimierung
        vorbei â ohne WebP/AVIF, ohne responsive Groessen, ohne Lazy Loading.

        Jetzt randlos ueber die volle Fensterbreite, ueber next/image, mit einem
        gerichteten Verlauf von links statt einer flaechigen Deckung. Die
        Fassade bleibt lesbar und schliesst die Seite als Gegenstueck zum Hero:
        dort oeffnet eine Fassade mit linksbuendigem Text, hier schliesst eine.

        Der zentrierte Stapel aus Bild, Text und Button ist damit aufgeloest.
      */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <Image
          src={photos.buildingFacade.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-950/72 to-brand-950/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-brand-950/45"
        />
        {/* Wasserzeichen nach derselben Regel wie auf allen dunklen Markenflaechen. */}
        <GlanzMark className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 opacity-[0.10]" />
        <div className="light-edge container-page relative z-[1] py-24 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <h2 className="font-display display-lg text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
              {heading.ctaHeading}
            </h2>
            <div className="glanz-divider mt-6 max-w-[120px]" />
            <p className="measure mt-7 text-base leading-relaxed text-brand-100">
              Beschreiben Sie kurz, welche Räume gereinigt werden sollen und wie häufig Sie
              Unterstützung benötigen. Wir prüfen Ihre Angaben und melden uns mit den nächsten
              Schritten. Bei größeren oder besonders genutzten Objekten stimmen wir bei Bedarf einen
              Besichtigungstermin ab.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/preisrechner" variant="primary" size="lg">
                Preis kostenlos berechnen
              </Button>
              <Button
                href="/kontakt"
                variant="onMedia"
                size="lg"
              >
                Angebot anfragen
              </Button>
            </div>
            <div className="mt-9 flex flex-col gap-1 sm:flex-row sm:gap-8">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-medium text-brand-100 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                Oder direkt anrufen: {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-medium text-brand-100 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
