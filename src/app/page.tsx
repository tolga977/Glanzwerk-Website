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
import ContactMoment from "@/components/home/ContactMoment";
import OwnerNote from "@/components/home/OwnerNote";
import ReviewMarquee from "@/components/home/ReviewMarquee";
import ClientLogos from "@/components/home/ClientLogos";
import ProductLogos from "@/components/home/ProductLogos";
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
import { clientLogos } from "@/data/clientLogos";
import { approvedProductLogos } from "@/data/productLogos";
import { innungMembership } from "@/data/memberships";
import { photos } from "@/data/photos";
import { servicePhotos } from "@/data/servicePhotos";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { professionalServiceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/"];

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

/**
 * Section 4 — drei Aussagen zur konkreten Arbeitsweise, homepage-eigen.
 *
 * Ein vierter Punkt „Beanstandungen werden direkt geklärt" stand hier bis
 * August 2026. Er ist entfernt, weil derselbe Sachverhalt weiter unten einen
 * eigenen Abschnitt hat — dort aber mit Zahlen statt in Prosa („innerhalb von
 * 24 Stunden", „in der Regel kostenlos"). Zwei Fassungen derselben Zusage
 * verstärken sich nicht; die unbestimmte schwächt die belastbare.
 */
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
    cta: { label: "Angebot anfragen", href: "/kontakt" },
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

/** Homepage-Kartentext je Leistung, mit Rueckfall auf die Daten aus services.ts. */
function serviceCopy(service: (typeof services)[number]) {
  return {
    description: homepageServiceCopy[service.slug]?.description ?? service.summary,
    linkText: homepageServiceCopy[service.slug]?.linkText ?? `Zur ${service.shortTitle}`,
  };
}

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
                Preis berechnen
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
        Der persoenliche Abschnitt — bewusst an zweiter Stelle.

        "Fester Ansprechpartner" stand auf dieser Website sechzigmal, ohne
        dass dieser Ansprechpartner je einen Namen hatte. Diese Stelle
        korrigiert das, und sie steht weit oben, weil sie das Einzige ist,
        was ein Wettbewerber nicht kopieren kann.

        ── Komposition: helle redaktionelle Doppelseite (August 2026) ────
        Bildflaeche links, Inhalt rechts. Die Flaeche fuer das echte
        Inhaberfoto ist links aus dem Raster geschnitten und laeuft bis an
        die Fensterkante; die Tiefe kommt aus der hellen Tonebene
        (`surface="left"`), ueber deren Kante das Bild laeuft — nicht aus
        einem Rahmen und nicht aus einem Schatten.

        Der Grund ist durchgehend hell. Zuvor stand hier eine dunkelblaue
        Vollflaeche als Platzhalter fuer das Portraet: auf 44 % der Breite
        und ueber 40 rem Hoehe war sie der dominanteste Block der Seite und
        liess das persoenliche Kapitel wie einen Farbbaustein wirken.

        Die Ueberschrift laeuft auf 2,5 rem statt 2,75 rem — sie soll die
        Bildflaeche daneben anfuehren, nicht gegen sie arbeiten.
      */}
      <Section background="white" spacing="roomy" surface="left">
        <OwnerNote
          heading={
            <>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
                <span aria-hidden="true" className="brand-tick text-brand-400" />
                Wer bei Glanzwerk antwortet
              </p>
              <h2 className="font-display display-lg mt-5 text-pretty text-[1.875rem] font-medium text-brand-900 sm:text-4xl lg:text-[2.5rem]">
                Sie sprechen direkt mit dem Inhaber
              </h2>
            </>
          }
        />

        {/*
          Das Dienstfahrzeug ist der zweite Beleg, den keine Bilddatenbank
          liefern kann. Fehlt die Aufnahme, faellt der Block ersatzlos weg —
          eine leere Bildflaeche waere schlechter als keine.
        */}
        {serviceVehiclePhoto && (
          <figure className="mt-16 max-w-5xl">
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
      </Section>

      {/*
        Bewertungsband — direkt im Anschluss an das persoenliche Kapitel.

        Es stand zuvor zwischen Hero und Inhaber-Abschnitt und damit vor
        der Person, auf die es sich bezieht. Jetzt folgt es ihr: erst wer
        antwortet, dann was Kunden darueber schreiben.

        Erscheint nur, wenn echte Rezensionen vorliegen. Solange die
        Zugangsdaten zur Places API fehlen, liefert `getGoogleRating()`
        eine leere Liste und die Komponente rendert nichts. Es gibt bewusst
        keinen Ersatztext: siehe ReviewMarquee.tsx.

        Die Kennzahl (5,0 aus 7) erscheint ausschliesslich im Hero. Dieses
        Band zeigt die Rezensionstexte — zwei verschiedene Aussagen aus
        derselben Quelle. Das grosse Ziffern-Lockup, das hier zuvor unter
        dem Titel „Google-Bewertungen" stand, ist entfallen: dieselbe Zahl
        einmal als Kennzahl und einmal als Band ist keine Verstaerkung,
        sondern eine Wiederholung.
      */}
      <ReviewMarquee reviews={googleRating.reviews} />

      {/*
        Vertrauens- und Logozeile — der sachliche Fuss des persoenlichen
        Kapitels.

        Sie stand zuvor direkt unter dem Hero. Dort belegte die schwaechste
        Aussage der Seite (welche Produkte eingesetzt werden) den staerksten
        Platz. Jetzt folgt sie auf Person und Bewertungen: erst wer
        antwortet, dann was Kunden schreiben, dann womit gearbeitet wird.

        ── Was hier nur mit Berechtigung erscheint ──────────────────────
          productLogos      Hersteller mit `approved: true`. Numatic ist
                            freigegeben, DR.SCHNELL nicht — der Filter
                            steht in data/productLogos.ts, damit ein nicht
                            freigegebener Name gar nicht erst bis in die
                            Anzeige gelangt. Ohne Logodatei laeuft der Name
                            als Wortbild; eine nachgesetzte Bildmarke waere
                            eine Behauptung ueber eine fremde Marke.
          clientLogos       Kundenreferenzen — eigener, klar getrennter
                            Zusammenhang, erst mit schriftlicher Freigabe
                            (Datei ist bis dahin leer).
          innungMembership  Gebaeudereiniger-Innung — steht auf `null`,
                            solange die Mitgliedschaft nicht bestaetigt
                            ist, und rendert dann nichts. Was nicht belegt
                            ist, wird nicht einmal angedeutet.

        Alle drei blenden sich selbst aus. Steht nichts davon zur
        Verfuegung, entfaellt der ganze Abschnitt — keine leere Flaeche,
        kein ausgegrauter Platz, kein „folgt in Kuerze".

        ── Flaeche ──────────────────────────────────────────────────────
        `warm` (Off-White) statt der blauen `muted`-Flaeche, die hier
        zuvor stand: der Vertrauensbereich soll durchgehend hell laufen,
        Blau bleibt der Tonebene im Inhaber-Kapitel und dem schmalen
        Bewertungsband vorbehalten. Die Lichtkante aus `decor` markiert die
        Naht zum weissen Kapitel darueber.
      */}
      {(approvedProductLogos.length > 0 ||
        clientLogos.length > 0 ||
        innungMembership !== null) && (
        <Section background="warm" decor spacing="compact">
          <FadeIn>
            <ProductLogos />
            {clientLogos.length > 0 && (
              <div className="mt-12 border-t border-line pt-10">
                <ClientLogos />
              </div>
            )}
            {innungMembership !== null && (
              <div className="mt-12 border-t border-line pt-10">
                <p className="text-sm leading-relaxed text-ink-soft">Mitglied der</p>
                <p className="mt-3 font-display text-xl font-medium text-brand-900 sm:text-2xl">
                  {innungMembership.detail
                    ? `${innungMembership.name} · ${innungMembership.detail}`
                    : innungMembership.name}
                </p>
              </div>
            )}
          </FadeIn>
        </Section>
      )}

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
                Preis berechnen
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

        ── Warum hier kein Zweispalter mehr steht ───────────────────────
        Davor liegt der Preisabschnitt (Text links, Zahl rechts), danach
        der Vertrauensbereich (Text links, Foto rechts). Mit dem frueheren
        Aufbau — Text links, Schaltflaechen rechts — standen drei
        Zweispalter unmittelbar hintereinander, alle mit dem Text auf
        derselben Seite. Drei gleich gebaute Abschnitte in Folge liest das
        Auge als eine einzige lange Flaeche; der mittlere verliert dabei
        genau das Gewicht, das dieses Angebot braucht.

        Jetzt eine einzelne, tiefer gestellte Textbahn ueber der vollen
        Breite: die Aussage laeuft auf Satzbreite von links, die
        Schaltflaechen stehen darunter in einer Zeile. Dieselben
        Schaltflaechen, dieselbe Reihenfolge — nur nicht mehr als
        Randspalte, sondern als Abschluss der Bahn.

        Der Bildgrund traegt jetzt sichtbar mit: `spacing` bleibt roomy,
        aber die Bahn sitzt in der unteren Haelfte, sodass ueber ihr eine
        ruhige Bildzone stehen bleibt. Damit ist dies die einzige dunkle
        Flaeche der Seite, die als Bildkomposition und nicht als Farbblock
        gelesen wird.
      */}
      <Section
        background="navy"
        decor
        spacing="roomy"
        backdrop={{ src: photos.brightStaircase.src, objectPosition: "center 40%" }}
      >
        {/* Bildzone ueber der Textbahn — leer, aber nicht leer wirkend: das
            Motiv traegt sie. Nur ab Desktop, auf dem Telefon waere sie
            verschenkte Hoehe. */}
        <div aria-hidden="true" className="hidden lg:block lg:h-40" />
        <div className="max-w-3xl">
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
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/3-monate-testen" size="xl">
              Testphase anfragen
            </Button>
            <Button
              href="/preisrechner"
              variant="onMedia"
              size="xl"
            >
              Preis berechnen
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
          ── Warum jede der vier Leistungen anders gebaut ist ──────────────
          Vorher: vier Bildflaechen im identischen 21:9-Querformat,
          untereinander gestapelt, Text jeweils unten links auf dem Bild.
          Kein Rahmen und kein Schatten — aber viermal exakt dieselbe
          Komposition. Eine Wiederholung bleibt eine Wiederholung, auch
          wenn man ihr den Kasten wegnimmt: ab der zweiten Flaeche liest
          niemand mehr, weil die Form schon bekannt ist.

          Jetzt traegt jede der vier eine eigene Bauform. Die Reihenfolge
          und die Auswahl der Leistungen bleiben unveraendert
          (FEATURED_SERVICE_SLUGS), ebenso jeder Text:

            1  Gebaeudereinigung     Bildband ueber die volle Breite, Text
                                     auf dem Bild. Die Leitleistung behaelt
                                     die groesste Flaeche und als einzige
                                     die Schrift im Bild.
            2  Bueroreinigung        Querformat, sieben Rasterspalten, Text
                                     UNTER dem Bild auf der Abschnitts-
                                     flaeche — dunkle Schrift statt weisser.
            3  Grundreinigung        Hochformat, fuenf Rasterspalten, um
                                     eine Bildhoehe nach unten versetzt.
                                     Zusammen mit 2 ergibt das eine
                                     ungleiche, versetzte Doppelseite statt
                                     zweier gleicher Kacheln.
            4  Glas- und Fenster-    Bild links, Text rechts daneben, mittig
               reinigung             — die einzige der vier, die quer
                                     gelesen wird und damit die Strecke
                                     abschliesst.

          Ein zwoelfspaltiges Raster traegt alle vier, damit die Liste
          semantisch eine Liste bleibt (ul/li) und die unterschiedlichen
          Breiten trotzdem aus einer gemeinsamen Ordnung kommen.
        */}
        <FadeIn>
          <ul className="mt-12 grid gap-x-12 gap-y-14 lg:mt-16 lg:grid-cols-12 lg:gap-y-4">
            {featuredServices.map((service, index) => {
              const photo = servicePhotos[service.slug];
              const { description, linkText } = serviceCopy(service);
              const href = `/leistungen/${service.slug}`;

              /* 1 — Leitleistung: Bildband, Schrift im Bild. */
              if (index === 0) {
                return (
                  <li key={service.slug} className="lg:col-span-12">
                    <Link
                      href={href}
                      className="press group relative block overflow-hidden rounded-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                    >
                      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[2.4/1]">
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
                        <h3 className="font-display display-lg text-pretty text-2xl font-medium text-white sm:text-3xl lg:text-[2.75rem]">
                          {service.shortTitle}
                        </h3>
                        <p className="measure mt-4 text-sm leading-relaxed text-brand-100 sm:text-base">
                          {description}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                          {linkText}
                          {arrowIcon}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              }

              /* 4 — quer gelesen: Bild links, Text rechts daneben. */
              if (index === 3) {
                return (
                  <li key={service.slug} className="lg:col-span-12 lg:mt-20">
                    <Link
                      href={href}
                      className="press group grid items-center gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-panel sm:aspect-[16/10]">
                        {photo && (
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 1024px) 42rem, 100vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-display display-lg text-pretty text-2xl font-medium text-brand-900 sm:text-3xl">
                          {service.shortTitle}
                        </h3>
                        <p className="measure mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                          {description}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out group-hover:text-brand-600">
                          {linkText}
                          {arrowIcon}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              }

              /* 2 und 3 — ungleiche Doppelseite, Text unter dem Bild. */
              const isPortrait = index === 2;
              return (
                <li
                  key={service.slug}
                  className={
                    isPortrait ? "lg:col-span-5 lg:mt-28" : "lg:col-span-7 lg:mt-16"
                  }
                >
                  <Link
                    href={href}
                    className="press group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                  >
                    <div
                      className={`relative w-full overflow-hidden rounded-panel ${
                        isPortrait ? "aspect-[4/5]" : "aspect-[4/3] sm:aspect-[16/10]"
                      }`}
                    >
                      {photo && (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 38rem, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <h3 className="font-display display-lg mt-7 text-pretty text-2xl font-medium text-brand-900 sm:text-3xl">
                      {service.shortTitle}
                    </h3>
                    <p className="measure mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                      {description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out group-hover:text-brand-600">
                      {linkText}
                      {arrowIcon}
                    </span>
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
        7. Einsatzgebiet — typografische Bezirksmatrix statt Pill-Wolke:
        liest sich als Einsatzverzeichnis, nicht als Ortsnamen-SEO-Block.
      */}
      <Section background="tint" surface="left" spacing="compact">
        <SectionHeading
          scale="editorial"
          eyebrow="Gebäudereinigung vor Ort"
          title={heading.sectionHeadings[4]}
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
        Kontaktmoment mit Hintergrundvideo.

        ── Warum genau hier ─────────────────────────────────────────────
        An dieser Stelle hat der Leser Leistungen, Arbeitsweise, Ablauf und
        Einsatzgebiet hinter sich — er weiss, was Glanzwerk macht und wie.
        Was danach folgt (Wissensbereich, Anfrageformular, Fragen), ist
        vertiefend. Zwischen „ich habe verstanden" und „ich lese weiter"
        liegt der Punkt, an dem eine Erinnerung an den direkten Weg am
        wenigsten unterbricht.

        Vor dem Abschluss steht der Abschnitt damit deutlich: es folgen noch
        drei Abschnitte bis zum Kontaktbereich. Und er ersetzt keinen
        bestehenden Handlungsweg — an dieser Stelle stand bisher gar kein
        CTA. Die vorhandenen bleiben unangetastet: die Testphase weiter
        oben, das Formular weiter unten, der Abschluss am Seitenende.

        Farbfolge: Einsatzgebiet (tint) → dunkle Videoflaeche → Wissen
        (weiss). Der Abschnitt sitzt als einziger dunkler Moment zwischen
        zwei hellen Flaechen und faellt dadurch auf, ohne laut zu sein.
      */}
      <ContactMoment />

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
            title={heading.sectionHeadings[5]}
            subtitle="Was kostet eine Gebäudereinigung? Wie häufig sollte ein Büro gereinigt werden? Und wann reicht eine Unterhaltsreinigung nicht mehr aus? In unserem Wissensbereich erklären wir wichtige Begriffe und Entscheidungskriterien verständlich und ohne unnötige Fachsprache."
          />
          {/*
            ── Warum die Strecke jetzt gestapelt statt gespalten ist ──────
            Vorher: fuehrender Beitrag links, zwei begleitende rechts —
            zwei Spalten. Unmittelbar danach folgt das Anfrageformular
            (Text links, Formular rechts) und darauf der Fragenbereich
            (Ueberschrift links, Antworten rechts). Drei Zweispalter in
            Folge, alle mit dem Schwergewicht links: das Seitenende las
            sich als eine einzige lange, gleichfoermige Flaeche.

            Jetzt liegt der fuehrende Beitrag als Band ueber die volle
            Breite (Bild und Text nebeneinander, `variant "band"`), die
            beiden begleitenden folgen darunter als Zeilenregister mit
            kleinen Bildern — dieselbe Sprache wie das Leistungs- und das
            Bezirksverzeichnis. Gestapelt statt gespalten, und damit die
            einzige Bauform dieser Art auf der Seite.

            Kein Textwechsel, keine andere Auswahl, dieselbe Reihenfolge
            der drei Beitraege.
          */}
          <FadeIn className="mt-12">
            <ArticleCard article={leadArticle} variant="band" />
          </FadeIn>
          <FadeIn className="mt-14 flex flex-col divide-y divide-line border-t border-line">
            {supportingArticles.map((article) => (
              <div key={article.slug} className="py-7">
                <ArticleCard article={article} variant="row" />
              </div>
            ))}
          </FadeIn>
          {/* Abschnittsfuss: die Haarlinie bindet den Link an den Block darueber,
              statt ihn frei im Raum stehen zu lassen. */}
          <div className="mt-6 border-t border-line pt-8">
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
      {/*
        `decor` gibt der Flaeche eine Lichtkante an der Oberkante. Der
        Wissensbereich davor laeuft auf Weiss aus, diese hier beginnt auf
        Graphit — 255 gegen 244 ist ein Unterschied von elf Punkten und als
        Kapitelgrenze zu leise. Die Kante macht aus dem Farbwechsel eine
        sichtbare Naht, ohne eine weitere Trennlinie einzufuehren.
      */}
      <Section background="warm" id="anfrage" decor>
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

          {/*
            Das Formular stand in einer weissen Karte mit Rahmen und
            Schlagschatten — das groesste schwebende Objekt der Seite, auf
            einer Flaeche, die sonst ohne Behaelter auskommt.

            Jetzt ist es eine Flaeche statt eines Objekts: reines Weiss,
            kein Rahmen, kein Schatten, und nach rechts bis an die
            Fensterkante durchlaufend, wo die Rundung entfaellt. Damit
            gehoert es zur Seite, statt auf ihr zu liegen — dieselbe
            Anschnitt-Sprache wie das Inhaberbild (links) und das
            Arbeitsfoto im Vertrauensbereich (rechts).

            ── Warum ueberhaupt eine eigene Flaeche ─────────────────────
            Das Formular lag zwischenzeitlich direkt auf dem warmen Grund.
            Gemessen ergab das einen Feldrahmen (#e7eaef) auf #f4f3f1 mit
            1,08:1 — die Feldgrenzen verschwanden praktisch. Auf Weiss sind
            es 1,20:1, also der Stand von vorher. Die Flaeche ist hier
            keine Dekoration, sondern das, was die Eingabefelder ueberhaupt
            als Eingabefelder lesbar haelt. (Der Feldrahmen selbst liegt
            unter 3:1 und waere in FormField.tsx zu beheben — das ist eine
            eigene Sache und nicht Teil dieses Durchgangs.)

            ── Warum hier NICHT `calc(50%-50vw)` steht ──────────────────
            Das ist der Anschnitt-Ausdruck, den Inhaberbild und Arbeitsfoto
            benutzen. Er rechnet gegen die Rasterspalte, nicht gegen das
            Fenster, und schiesst deshalb ueber die Kante hinaus — bei
            1528 px Fensterbreite um 240 px. Bei einer reinen Bildflaeche
            faellt das nicht auf, weil der Ueberstand beschnitten wird und
            dort kein Inhalt steht. Hier stuenden die Eingabefelder im
            abgeschnittenen Bereich.

            Der Ausdruck unten misst stattdessen genau den Abstand von der
            Spaltenkante zur Fensterkante: halbe Differenz zwischen Fenster
            und Container (max-w-7xl) plus dessen Innenabstand (px-8).
            Unterhalb von 80rem Fensterbreite bleiben davon die 2rem uebrig.
          */}
          <div className="rounded-panel bg-white p-7 sm:p-9 lg:-mr-[calc((100vw-min(100vw,80rem))/2+2rem)] lg:rounded-r-none lg:py-12 lg:pl-12 lg:pr-12">
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
                Preis berechnen
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
