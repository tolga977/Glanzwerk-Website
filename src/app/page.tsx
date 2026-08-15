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
import HeroStage from "@/components/home/HeroStage";
import HeroQuoteWizard from "@/components/forms/HeroQuoteWizard";
import HeroBrandStrip from "@/components/home/HeroBrandStrip";
import HygieneSystem from "@/components/home/HygieneSystem";
import PriceCalculator from "@/components/home/PriceCalculator";
import TrialCalendar from "@/components/home/TrialCalendar";
import OwnerNote from "@/components/home/OwnerNote";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";
import ClientLogos from "@/components/home/ClientLogos";
import ProcessTimeline, { type TimelineStep } from "@/components/home/ProcessTimeline";
import GoogleRating from "@/components/ui/GoogleRating";
import JsonLd from "@/components/seo/JsonLd";
import { getGoogleRating } from "@/lib/googleRating";
import { serviceVehiclePhoto } from "@/data/owner";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { districtPhotos } from "@/data/districtPhotos";
import { articles } from "@/data/articles";
import { clientLogos } from "@/data/clientLogos";
import { innungMembership } from "@/data/memberships";
import { heroStripItems } from "@/data/heroTrust";
import { photos } from "@/data/photos";
import { servicePhotos } from "@/data/servicePhotos";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { professionalServiceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";

const heading = seoHeadings["/"];

/*
 * Zeilenfall der Hero-Überschrift.
 *
 * Die Entwurfsvorlage setzt das Ortswort auf eine eigene Zeile und färbt es
 * im Markenblau — bei „Gebäudereinigung Berlin" also „Gebäudereinigung" /
 * „Berlin". Statt diesen Umbruch als zwei feste Zeichenketten ins Markup zu
 * schreiben, wird er aus der bestehenden H1 abgeleitet: alles bis zum letzten
 * Wort trägt die erste Zeile, das letzte Wort die zweite.
 *
 * Damit ändert sich am SEO-relevanten Text kein Zeichen — Inhalt, Wortlaut
 * und Reihenfolge kommen unverändert aus `seoHeadings`. Und wenn die H1
 * dort einmal anders lautet, fällt der Umbruch weiterhin an der richtigen
 * Stelle statt auf ein hartkodiertes „Berlin" zu zeigen.
 *
 * `h1Highlight` aus `seoHeadings` wird hier absichtlich nicht verwendet: für
 * die Startseite deckt es die gesamte H1 ab, was in der vorherigen dunklen
 * Fassung eine vollständig hellblaue Überschrift ergab. Auf der hellen Bühne
 * ist der Akzent auf das letzte Wort begrenzt. Das Feld bleibt unverändert
 * und wird von den übrigen Seiten weiter genutzt.
 */
const h1Words = heading.h1.trim().split(/\s+/);
const h1Accent = h1Words[h1Words.length - 1];
const h1Lead = h1Words.slice(0, -1).join(" ");

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
    cta: { label: "Anfrage jetzt stellen", href: "/kontakt" },
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
/*
 * Strichzeichnungen fuer die Nutzenzeile des Preisabschnitts.
 *
 * Bewusst inline und bewusst reduziert: 1,5 px Strich, keine Flaechen, kein
 * zweiter Farbton. Die Seite hat keine Icon-Bibliothek, und vier Zeichen
 * rechtfertigen keine. Sie erben `currentColor` und stehen damit im selben
 * Blau wie der Eyebrow darueber.
 */
const strich = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const schildIcon = (
  <svg {...strich} width={16} height={16} aria-hidden="true">
    <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 8.5 4.1-.9 7-4.3 7-8.5V6l-7-3Z" />
    <path d="m9.2 12.1 2 2 3.6-3.9" />
  </svg>
);

const gebaeudeIcon = (
  <svg {...strich} aria-hidden="true">
    <path d="M4 20h16M6 20V5.5A1.5 1.5 0 0 1 7.5 4h5A1.5 1.5 0 0 1 14 5.5V20M14 10h3.5A1.5 1.5 0 0 1 19 11.5V20" />
    <path d="M8.6 7.6h2.8M8.6 11h2.8M8.6 14.4h2.8M16.2 13.2h1M16.2 16.4h1" />
  </svg>
);

const nutzenpunkte = [
  {
    text: "In ca. 2 Minuten erste Schätzung",
    icon: (
      <svg {...strich} aria-hidden="true">
        <circle cx="12" cy="13.5" r="7" />
        <path d="M12 10.2v3.3l2.1 1.4M9.6 3.5h4.8M12 3.5v3" />
      </svg>
    ),
  },
  {
    text: "Vier Angaben genügen",
    icon: (
      <svg {...strich} aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8.2 7.2h7.6" />
        <path d="M8.6 12h.01M12 12h.01M15.4 12h.01M8.6 16.2h.01M12 16.2h.01M15.4 16.2h.01" />
      </svg>
    ),
  },
  {
    text: "Ohne Anmeldung, ohne Telefonat",
    icon: (
      <svg {...strich} aria-hidden="true">
        <rect x="5" y="10.5" width="14" height="10" rx="2" />
        <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
      </svg>
    ),
  },
  {
    text: "Grundlage fürs Gespräch",
    icon: (
      <svg {...strich} aria-hidden="true">
        <path d="M20 14.5a2 2 0 0 1-2 2H8.5L4 20.2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.5Z" />
        <path d="M8.6 9.2h6.8M8.6 12.4h4.2" />
      </svg>
    ),
  },
] as const;

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
        ══ 1. Hero — die Bühne aus Kopfzeile, Tageslicht und Anfrage ═══════

        ── Was diese Fassung anders macht als die vorherige ──────────────
        Vorher war der Hero eine dunkle Markenbühne mit Bewegtbild: Navy als
        Grundfläche, mehrere abdunkelnde Ebenen über dem Film, weiße Schrift
        darauf. Diese Fassung dreht das um. Der Grund ist links weiß, die
        Schrift dunkel, und die Farbe kommt aus einem Verlauf, der nach
        rechts in das Foto übergeht.

        Der Unterschied ist nicht nur die Helligkeit. In der dunklen Fassung
        musste jede Textstelle gegen wechselndes Bildmaterial gerechnet
        werden, und die Überschrift konnte das hellblaue Markenblau nicht
        tragen, ohne den Grund fast schwarz zu machen. Auf der weißen Fläche
        liegen Überschrift und Fließtext bei 15,2:1 und 7,9:1 — der Kontrast
        ist kein Thema mehr, und das Markenblau kann als Akzent in der
        Überschrift stehen, wo es hingehört.

        ── Der Aufbau, und warum er auf jeder Breite derselbe DOM ist ────
        Die Bühne hat vier Teile: Textblock, Foto, Anfrageformular,
        Vertrauenszeile. In dieser Reihenfolge stehen sie im Markup — und
        das ist genau die Reihenfolge, die auf dem Telefon gebraucht wird:
        Überschrift, Kernbotschaft, Bewertung, Handlungswege, dann das Bild,
        dann das Formular, dann die Fakten.

        Ab 1024 px wird aus demselben Markup die zweispaltige Bühne: das
        Foto löst sich aus dem Fluss (`lg:absolute` in HeroStage) und wird
        zur Fläche hinter allem, Textblock und Formular werden die beiden
        Spalten eines Rasters.

        Kein zweites Markup, kein `hidden`/`block`-Paar, kein zweites
        <Image>. Das ist hier nicht Sparsamkeit, sondern eine
        Performance-Bedingung: die Aufnahme ist das LCP-Element und wird mit
        `priority` vorgeladen. Zwei Varianten davon im Markup würden beide
        vorgeladen — die Hälfte davon immer umsonst.

        Damit `lg:absolute` die volle Fensterbreite bekommt und nicht die
        Rasterbreite, bleibt der Container hier bewusst ohne `relative`.
        Positionsbezug des Fotos ist dadurch die Section, nicht der
        Container. Textblock und Formular tragen ihr eigenes `relative z-20`.

        ── Höhe ─────────────────────────────────────────────────────────
        `lg:min-h-svh` — nur ab Desktop. Auf dem Telefon stehen Text, Bild
        und Formular untereinander; eine Bühne, die dort auf eine
        Bildschirmhöhe gezwungen wird, müsste entweder das Formular
        abschneiden oder alles zusammenquetschen. Sie darf dort länger sein.

        svh und nicht vh, weil vh auf Telefonen die ein- und ausfahrende
        Adressleiste mitrechnet.

        Der negative obere Außenabstand entspricht der Kopfhöhe
        (`--header-height`, einschließlich Haarlinie) und zieht die Bühne
        hinter die Kopfzeile. Der Innenabstand oben gibt denselben Betrag an
        den Inhalt zurück.
      */}
      <section
        data-hero-stage
        className="relative isolate mt-[calc(var(--header-height)*-1)] flex flex-col overflow-hidden bg-white lg:min-h-[clamp(40rem,100svh,58rem)]"
      >
        {/*
          ── Vertikale Komposition ────────────────────────────────────────
          Der obere Innenabstand ist Kopfhöhe PLUS 3,5 rem ab Desktop und
          PLUS 3 rem darunter. Die Kopfhöhe holt den von der Bühne
          überlagerten Streifen zurück, der Zuschlag ist ein bewusster
          Abstand: die Überschrift soll nicht an der Kopfzeile kleben, sondern
          erkennbar nach ihr beginnen.

          Im gestapelten Layout wirkt der Zuschlag unmittelbar, weil dort
          nicht zentriert wird — 2 rem waren dort gemessen 32 px und damit für
          eine 60 px hohe Überschrift zu knapp.

          Zusammen mit `items-center` ergibt das auf 1440 × 900 rund 180 px
          Luft zwischen Kopfzeile und Überschrift, auf 1366 × 768 noch rund
          115 px, und auf einer knappen Höhe von 700 px immer noch etwa 80 px.
          Der Abstand schrumpft also mit, statt bei kleinen Höhen den Inhalt
          aus der Bühne zu schieben — das ist der Grund, warum er über
          Innenabstand plus Zentrierung läuft und nicht über einen festen
          Versatz.

          Die Bühnenhöhe an der Section ist `clamp(40rem, 100svh, 58rem)` —
          also Boden UND Deckel, nicht nur eine Bildschirmhöhe:

            Boden 40 rem (640 px)  Unter dieser Fensterhöhe wird die Bühne
                                   nicht weiter zusammengedrückt, sondern
                                   beginnt zu scrollen.
            Deckel 58 rem (928 px) Darüber wächst sie nicht mit.

          Der Deckel ist nachträglich dazugekommen, und zwar wegen einer
          Messung: auf einem 1024 × 1366 großen Fenster (Tablet im Hochformat)
          war die Bühne 1366 px hoch, der Inhalt aber nur rund 414 px. Die
          Zentrierung verteilte den Rest gleichmäßig — gemessen 420 px
          Abstand zwischen Kopfzeile und Überschrift. Das ist kein bewusster
          Abstand mehr, sondern eine Leerstelle, in der die Komposition ihren
          Halt verliert.

          Mit dem Deckel liegt derselbe Abstand bei rund 200 px, und auf den
          gängigen Desktop-Höhen ändert sich nichts: 900 px und 768 px liegen
          beide unterhalb von 928 px und laufen unverändert durch.

          Dass auf sehr hohen Fenstern der nächste Abschnitt oberhalb der
          Faltkante beginnt, ist dabei kein Nebeneffekt, sondern richtig — eine
          Bühne von 1366 px Höhe ist keine Bühne mehr, sondern eine Wand.

          Der untere Innenabstand ist kleiner als der obere. Das ist Absicht:
          seit die Vertrauensleiste entfallen ist, läuft das Foto bis an die
          Unterkante, und dort löst es sich über `.hero-floor` ins Weiße auf.
          Ein großer Innenabstand unten würde diese Zone nur leer halten.
        */}
        <div className="container-page flex flex-1 flex-col pb-12 pt-[calc(var(--header-height)+3rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,var(--hero-panel-width))] lg:items-center lg:gap-12 lg:pb-[var(--hero-gap-bottom)] lg:pt-[calc(var(--header-height)+var(--hero-gap-top))] xl:gap-16">
          {/* ── 1) Aussage ────────────────────────────────────────────── */}
          <div className="relative z-20">
            {/*
              Keine Auszeichnungszeile über der Überschrift. Ein gerundetes
              Etikett mit „Ihre Reinigungsfirma in Berlin" wiederholte nur
              die Überschrift darunter und ist das Muster, das auf beinahe
              jeder erzeugten Seite steht. Die Hierarchie beginnt direkt mit
              der Überschrift.

              Der Umbruch ist gesetzt, nicht dem Zufall überlassen: das
              letzte Wort der bestehenden H1 steht auf einer eigenen Zeile
              und trägt das Markenblau. Bei „Gebäudereinigung Berlin" ergibt
              das die Aufteilung der Entwurfsvorlage, ohne dass am
              SEO-relevanten Text ein Zeichen geändert wurde — Inhalt und
              Reihenfolge sind identisch, nur der Zeilenfall und die Farbe
              des letzten Wortes sind bestimmt.

              brand-500 auf Weiß ergibt 4,98:1 und ist damit auch für
              Fließtextgrößen ausreichend; bei 72 px ist es weit über der
              Schwelle.

              ── Warum hier kein <br /> steht ──────────────────────────────
              Der Umbruch lief zuerst über ein <br />. Gemessen ergab der
              Textinhalt der Überschrift dann „GebäudereinigungBerlin" — ohne
              Leerzeichen, weil ein <br /> keinen Textknoten beisteuert. Für
              das Auge war das unsichtbar, für alles, was den Text ausliest,
              ein einziges Wort. Bei der wichtigsten Überschrift der Seite ist
              das keine Kleinigkeit.

              Jetzt trägt das Ortswort ein `block` und erzwingt damit den
              Umbruch als Element, während zwischen den beiden Teilen ein
              echtes Leerzeichen im Text steht. Der Textinhalt lautet wieder
              „Gebäudereinigung Berlin", identisch mit `seoHeadings`.
            */}
            <h1 className="font-display display-xl text-balance text-[2.375rem] font-medium text-brand-900 sm:text-6xl lg:text-7xl">
              {h1Lead && `${h1Lead} `}
              <span className="block text-brand-500">{h1Accent}</span>
            </h1>

            {/*
              ── Drei Stufen unter der Überschrift ────────────────────────
              Überschrift → Versprechen → für wen. Genau die Staffelung der
              Entwurfsvorlage, und die drei Zeilen leisten Verschiedenes:

                H1        das Thema (SEO-tragend, unverändert)
                Slogan    warum man es bei Glanzwerk beauftragt
                Zeile 3   für wen es gemacht ist

              Der Slogan ist der Wortlaut aus der Vorlage des Betreibers und
              damit dessen eigene Formulierung, keine hier erfundene
              Marketingzeile. Er behauptet auch nichts Prüfbares: keine Zahl,
              kein Zertifikat, keine Frist. Das Markenblau sitzt auf „jeden
              Tag", wie in der Vorlage.

              Die dritte Zeile ist der unveränderte Bestandssatz der Seite.
              Er nennt Leistung, Zielgruppe und Gebiet konkret und ist aus den
              tatsächlich angebotenen Leistungen abgeleitet — deshalb steht
              hier nicht die allgemeinere Formulierung der Vorlage („Für
              Unternehmen, Verwaltungen, Praxen und Immobilien"), sondern die
              belegte.

              Die Rangfolge läuft über zwei Merkmale gleichzeitig, nicht nur
              über die Schriftgröße: 72 → 24 → 16 px und brand-900 → brand-900
              → ink-soft. Der Slogan bleibt dadurch dunkel und nah an der
              Überschrift, die Zielgruppenzeile tritt zurück.
            */}
            <p className="mt-6 max-w-lg text-xl font-medium leading-snug text-brand-900 sm:mt-7 sm:text-2xl">
              Sauberkeit, auf die Sie sich <span className="text-brand-500">jeden Tag</span>{" "}
              verlassen können.
            </p>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
              Unterhaltsreinigung für Büros, Praxen, Kanzleien, Autohäuser und weitere
              Gewerbeobjekte — in ganz Berlin.
            </p>

            {/*
              Die Bewertung steht zwischen Aussage und Handlung: sie ist der
              Beleg, der die Entscheidung stützt, und gehört an die Stelle,
              an der die Entscheidung ansteht.

              Zahlen und Anzahl kommen aus `getGoogleRating()` — live aus
              dem Unternehmensprofil oder aus dem von Hand geprüften Stand.
              Nichts daran ist gerundet oder mit „über" versehen.
            */}
            <div className="mt-8 sm:mt-9">
              <GoogleRating data={googleRating} variant="heroLight" />
            </div>

            {/*
              ── Ein Cluster, nicht zwei Elemente ─────────────────────────
              Die beiden Handlungswege standen zuvor in eigenen Blöcken mit je
              einer Kleinzeile darunter und 24 px Abstand dazwischen. Das las
              sich als zwei getrennte Angebote statt als eine Entscheidung mit
              zwei Wegen — und die Kleinzeilen doppelten Information, die
              ohnehin schon auf der Seite steht: die Zwei-Minuten-Zusage trägt
              der Preisrechner-Abschnitt weiter unten selbst, und die
              Telefonnummer steht in der Kopfzeile.

              Jetzt eine Reihe, 12 px Abstand, gemeinsame Grundlinie über
              `items-center`. Die Abstufung übernehmen Fläche und Umriss, nicht
              die Größe: beide Schaltflächen sind gleich hoch.

              ── Warum eine ausgeschriebene Mindesthöhe ───────────────────
              Gemessen waren die beiden vorher 52 und 55 px hoch. Die Ursache
              liegt in der Variante: `outline` bringt einen 2 px starken
              Rahmen mit, der oben und unten je 2 px zur Gesamthöhe addiert,
              während `primary` keinen hat. Beide tragen dieselbe
              `size`-Angabe — die Größe war also nominell gleich und optisch
              nicht.

              `min-h-14` setzt beide auf 56 px. Das ist die Höhe, die die
              Umriss-Variante ohnehin erreicht, und sie liegt deutlich über
              der 44-px-Mindestgröße für Touch. Nicht über eine Korrektur am
              Rahmen gelöst: eine ausgeschriebene Höhe ist an dieser Stelle
              lesbar, ein kompensierender transparenter Rahmen wäre ein Trick,
              den beim nächsten Lesen niemand einordnen kann.
            */}
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <Button
                href="/preisrechner"
                size="lg"
                className="min-h-14 w-full sm:w-auto"
              >
                Preis schätzen
              </Button>
              <Button
                href={siteConfig.phoneHref}
                variant="outline"
                size="lg"
                className="min-h-14 w-full sm:w-auto"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>
                Jetzt anrufen
              </Button>
            </div>
          </div>

          {/* ── 2) Das Foto ───────────────────────────────────────────── */}
          <HeroStage />

          {/*
            ── 3) Die Anfrage ──────────────────────────────────────────
            Der Versatz nach unten ab Desktop ist Bildkomposition, nicht
            Abstand: das Panel soll VOR der Person liegen und dabei ihren
            Kopf und die Schultern frei lassen. Erst dadurch entsteht die
            Staffelung Berlin → Person → Formular.

            Gemessen an der eingepassten Aufnahme bei 1440 × 900: der Kopf
            reicht bis y 294, ohne Versatz begann das Panel bei 273 und
            schnitt ihn an. Mit 4 rem beginnt es bei 337 — der Kopf steht
            frei, die untere und mittlere Körperhälfte liegt dahinter.

            Der Versatz steht als `--hero-panel-offset` in globals.css und
            wird auf kurzen Fenstern kleiner — mit dem festen Wert stünde das
            Panel auf 1366 × 768 im Vertrauensstreifen.

            ── Warum es an der Rasterkante endet und nicht an der Fensterkante ──
            Zwischenzeitlich schob ein negativer rechter Außenabstand das Panel
            bis auf 12 px an die Fensterkante. Mit der neuen, breiteren
            Aufnahme ist das falsch: dort läuft jetzt die Glasfassade bis zum
            Rand, und ein Panel an der Fensterkante würde sie vollständig
            verdecken — gemessen blieben nur 13 px von ihr sichtbar.

            An der Rasterkante bleiben rund 105 px Fassade rechts neben dem
            Panel stehen, und die Kante liegt damit näher an der Körpermitte
            der Person: sie überlagert deren rechte Hälfte, statt sie ganz
            zuzudecken.

            `ml-auto` und die feste Breite bleiben nötig, damit das Panel die
            Rasterspalte nicht überdehnt.
          */}
          {/*
            Ab 1280 px rückt das Panel um die halbe Außenmarge des Containers
            über die Rasterkante hinaus nach rechts. Der Ausdruck ist
            selbstbegrenzend: bei 1280 px ist die Marge null und der Versatz
            ebenso, bei 1440 px sind es 40 px. Die Fassade rechts bleibt
            dadurch immer sichtbar (bei 1440 px rund 65 px), und links vom
            Panel wird entsprechend mehr von der Person frei.
          */}
          <div className="relative z-20 mt-10 lg:ml-auto lg:mt-[var(--hero-panel-offset)] lg:w-[var(--hero-panel-width)] xl:mr-[calc(-0.5*max(0rem,(100vw_-_80rem)/2))]">
            <HeroQuoteWizard />
          </div>
        </div>

        {/*
          ── Vertrauensstreifen am Fuß der Bühne ─────────────────────────
          Vier belegte Angaben, eine Zeile, im ersten Bildschirm sichtbar.

          ── Warum diese Bauform und nicht die vorherige ─────────────────
          Hier stand zuvor dieselbe Information als sechsspaltiges Raster mit
          Symbol über der Beschriftung. Gemessen war das 146 px hoch, bei
          1024 px sogar 241 px — auf einem 768 px hohen Schirm knapp ein
          Fünftel der Bühne, und der einzige Teil, der als Kartenraster
          gelesen wurde.

          Drei Änderungen machen daraus einen Streifen:
            vier statt sechs Einträge (Auswahl in heroTrust.tsx begründet)
            Symbol NEBEN statt ÜBER der Beschriftung
            kleinere Grade, engere Zeilenhöhe

          Ergebnis ist eine Zeile von rund 70 px statt eines Blocks von 146 px.
          Die beiden übrigen Einträge sind nicht verloren, sie stehen weiter in
          `heroTrust.tsx` — samt Quellenangabe und samt dem Nachweis, welche
          zwei Punkte der Entwurfsvorlage im Projekt nicht belegt waren.

          ── Warum ohne eigene Fläche ────────────────────────────────────
          Kein `bg-white`, nur eine Haarlinie oben. Der Streifen liegt in der
          Zone, in der sich das Foto über `.hero-floor` ohnehin ins Weiße
          auflöst — eine zweite weiße Fläche darüber wäre ein Balken auf einem
          Balken. So bleibt er Teil der Bühne, statt sie abzuschneiden.

          ── Logos ──────────────────────────────────────────────────────
          Die Vorlage zeigt neben den Angaben noch Siegel und Logos. Dafür
          liegt im Projekt nichts vor: `clientLogos` ist eine leere Liste (bis
          zur Freigabe durch die Kunden), `innungMembership` steht auf `null`,
          und die Siegel der Vorlage („100 % Zufriedenheit garantiert",
          „Geprüfter Dienstleister") sind nirgends belegt. Der Streifen bleibt
          deshalb rein typografisch; sobald echte Logos vorliegen, ist rechts
          daneben der Platz dafür.
        */}
        <div className="relative z-20 border-t border-line">
          <div className="container-page">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-5 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0">
              {heroStripItems.map((item, index) => (
                <li
                  key={item.label}
                  className={`flex items-start gap-2.5 lg:px-5 ${
                    index === 0 ? "lg:pl-0" : "lg:border-l lg:border-line"
                  }`}
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mt-px shrink-0 text-brand-500"
                  >
                    {item.icon}
                  </svg>
                  <span className="min-w-0">
                    <span className="block text-[0.8125rem] font-medium leading-tight text-brand-900">
                      {item.label}
                    </span>
                    {item.detail && (
                      <span className="mt-0.5 block text-xs leading-tight text-ink-muted">
                        {item.detail}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/*
        Markenleiste unmittelbar unter der Buehne.

        Sie steht bewusst ausserhalb der Hero-Section: die Buehne endet mit
        dem Vertrauensstreifen, und was danach kommt, ist ein eigener
        Abschnitt mit eigenem Grund. Innerhalb der Section haette die Leiste
        die Buehnenhoehe mitbestimmt und den Streifen unter die Faltkante
        geschoben.
      */}
      <HeroBrandStrip />

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
        Google-Bewertungen — direkt im Anschluss an das persoenliche Kapitel.

        Erscheint nur, wenn echte Rezensionen vorliegen. Solange die
        Zugangsdaten zur Places API fehlen, liefert `getGoogleRating()` eine
        leere Liste und die Komponente rendert nichts. Es gibt bewusst
        keinen Ersatztext: siehe GoogleReviewsSection.tsx.

        Ersetzt das vorherige Laufband (ReviewMarquee, weiterhin vorhanden,
        hier nicht mehr eingesetzt): links ein feststehender Kennzahlenblock
        mit Rating und Anzahl, rechts die einzelnen Rezensionskarten in
        einer nur auf Eingabe reagierenden Spur.
      */}
      <GoogleReviewsSection
        reviews={googleRating.reviews}
        rating={googleRating.rating}
        count={googleRating.count}
      />

      {/*
        Vertrauenszeile — der sachliche Fuss des persoenlichen Kapitels.

        ── Warum die Herstellerzeile hier entfallen ist ─────────────────
        Hier stand `<ProductLogos />` mit der Zeile „Wir arbeiten unter
        anderem mit professionellen Produkten und Systemen von" und darunter
        Numatic als Wortbild. Diese Aussage steht seit der Markenleiste
        unmittelbar unter dem Hero ein zweites Mal auf derselben Seite — dort
        mit den echten Herstellerlogos und unter einer eigenen Ueberschrift.
        Dieselbe Sachangabe zweimal ist keine Verstaerkung, sondern eine
        Wiederholung, und die schwaechere der beiden Fassungen war diese.

        Die Komponente und die Freigabelogik in `data/productLogos.ts`
        bleiben unberuehrt — es entfaellt nur der zweite Auftritt auf der
        Startseite.

        ── Was hier weiterhin mit Berechtigung erscheinen kann ─────────
          clientLogos       Kundenreferenzen — erst mit schriftlicher
                            Freigabe (Datei ist bis dahin leer).
          innungMembership  Gebaeudereiniger-Innung — steht auf `null`,
                            solange die Mitgliedschaft nicht bestaetigt
                            ist. Was nicht belegt ist, wird nicht einmal
                            angedeutet.

        Beide blenden sich selbst aus. Da derzeit keines von beiden vorliegt,
        entfaellt der ganze Abschnitt — es bleibt keine leere Off-White-Bahn
        zwischen Bewertungsband und Berliner Bildzaesur stehen, sondern die
        beiden ruecken unmittelbar zusammen.

        Die Trennlinie sitzt deshalb an einem Folgeelement (`* + *`) und
        nicht an jedem Block: das erste sichtbare Element beginnt ohne Linie,
        egal welches der beiden es ist.
      */}
      {(clientLogos.length > 0 || innungMembership !== null) && (
        <Section background="warm" decor spacing="compact">
          <FadeIn className="[&>*+*]:mt-12 [&>*+*]:border-t [&>*+*]:border-line [&>*+*]:pt-10">
            {clientLogos.length > 0 && <ClientLogos />}
            {innungMembership !== null && (
              <div>
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
        Preis-Schaetzung — eigener Abschnitt statt einer Schaltflaeche im
        Fliesstext.

        Die wichtigste Aussage ist nicht "wir haben einen Rechner", sondern
        "Sie bekommen sofort eine Groessenordnung, ohne mit uns zu sprechen".
        Deshalb steht rechts eine durchgerechnete Beispielzahl: eine konkrete
        Zahl im Kopf ist der Grund, warum jemand den Rechner ueberhaupt
        oeffnet.
      */}
      {/*
        ── Aufbau nach der freigegebenen Designreferenz ───────────────────
        Zweispalter: links die Aussage, rechts das Geraet. Der Rechner ist
        nativ gebaut (`PriceCalculator`) — kein Bild, kein Video. Er nimmt
        die rechte Spalte in voller Hoehe ein und traegt denselben Blauton
        wie die Flaeche, damit er aus ihr entsteht statt darauf zu liegen.

        Darunter laeuft die Beispielrechnung als ruhiges Band ueber die
        ganze Breite — dieselbe Zahl wie im Display, nur eine Stufe leiser,
        weil sie den Beleg liefert und nicht die Hauptaussage ist.

        Die vier Nutzenpunkte stammen aus der Referenz. Jeder ist durch den
        Absatz darueber gedeckt: „In zwei Minuten" aus der Ueberschrift, die
        vier Abfragen und „ohne Anmeldung, ohne Telefonat" woertlich aus dem
        Text, die Grundlage fuers Gespraech aus „wird vorher gemeinsam
        festgelegt".

        Die Datenschutzzeile der Referenz („Ihre Angaben werden nicht
        gespeichert und nicht weitergegeben") ist NICHT uebernommen: der
        echte Rechner hat einen Kontaktschritt mit Absenden. Die Zeile waere
        eine unbelegte Behauptung. An ihrer Stelle steht die Aussage, die
        der Absatz tatsaechlich hergibt.
      */}
      <Section background="tint">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-x-14 xl:gap-x-20">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              <span aria-hidden="true" className="brand-tick text-brand-400" />
              Was kostet das ungefähr?
            </p>
            <h2 className="font-display display-lg mt-6 text-pretty text-[1.875rem] font-medium text-brand-900 sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
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

            <div className="pr-nutzen mt-10">
              {nutzenpunkte.map((n) => (
                <div key={n.text}>
                  <span aria-hidden="true" className="block text-brand-500">
                    {n.icon}
                  </span>
                  <p className="mt-3 text-[0.8125rem] leading-snug text-ink-soft">{n.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/preisrechner" size="xl">
                Preis berechnen
              </Button>
            </div>

            <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-brand-400">
                {schildIcon}
              </span>
              Unverbindliche Schätzung — daraus entsteht keine Verpflichtung.
            </p>
          </div>

          <div className="lg:pl-4">
            <PriceCalculator />
          </div>
        </div>

        {/*
          Beispielrechnung als Band: Konfiguration links, Zahl rechts, eine
          Haarlinie dazwischen. Bewusst sekundaer gegenueber dem Geraet —
          gleiche Zahl, deutlich kleinerer Grad.
        */}
        <div className="mt-12 border-t border-line-strong pt-7 lg:mt-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-brand-400">
                {gebaeudeIcon}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">
                  Beispielrechnung
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {priceExample.inputs}
                </p>
              </div>
            </div>
            <p className="font-display shrink-0 text-2xl font-medium leading-tight text-brand-900 sm:border-l sm:border-line sm:pl-10 sm:text-[1.75rem]">
              {priceExample.result}{" "}
              <span className="text-base font-normal text-ink-soft">{priceExample.unit}</span>
            </p>
          </div>
          <p className="measure mt-6 text-sm leading-relaxed text-ink-soft">
            Ihr Objekt kann darüber oder darunter liegen. Genau dafür gibt es den Rechner.
          </p>
        </div>
      </Section>

      {/*
        Dreimonatige Testphase — vom Seitenende nach vorn geholt.

        Das ist das staerkste Angebot, das Glanzwerk hat, und es stand
        vorher an zehnter Stelle. Jetzt steht es dort, wo jemand noch liest,
        und traegt eine eigene dunkle Flaeche.

        ── Warum das Visual links steht und der Text rechts ─────────────
        Davor liegt der Preisabschnitt (Text links, Zahl rechts), danach der
        Vertrauensbereich (Text links, Foto rechts). Beide fuehren den Text
        links. Wuerde dieser Abschnitt das auch tun, stuenden drei gleich
        gebaute Zweispalter unmittelbar hintereinander — das Auge liest das
        als eine einzige lange Flaeche, und der mittlere verliert genau das
        Gewicht, das dieses Angebot braucht.

        Deshalb ist die Seite hier vertauscht: Visualzone links, Inhalt
        rechts. Das ist der einzige Seitenwechsel in dieser Folge und
        gleichzeitig der Grund, warum der Abschnitt als eigener Moment
        gelesen wird. `surface="left"` legt den Lichtkeil des Systems auf
        dieselbe Seite — die Prop ist genau dafuer da („fuer Abschnitte,
        deren Inhalt rechts sitzt").

        Im Fluss steht der Inhalt zuerst; die Vertauschung laeuft ueber
        `order` und damit rein visuell. Auf dem Telefon liest deshalb erst
        die Aussage, dann folgt die Zone.

        ── Die Visualzone traegt jetzt den Kalender ──────────────────────
        Der reservierte Raum ist gefuellt: `TrialCalendar`. Vier
        Kalenderblaetter — 01, 02, 03, VERTRAG — die nacheinander an der
        Ringbindung abreissen, danach die Unterschrift. Die Zone behaelt ihr
        Seitenverhaeltnis von 5 : 4 ab Desktop; die Hoehe des Abschnitts
        aendert sich dadurch nicht, es gibt keinen Layout Shift.

        Auf dem Telefon ist sie jetzt sichtbar und flacher (4 : 3), mit
        eigener, engerer Komposition statt einer verkleinerten Bildschirm-
        fassung. Sie steht im Fluss weiterhin NACH der Aussage und den
        Schaltflaechen — dort behalten Text und CTA den Vortritt.
      */}
      <Section
        background="navy"
        decor
        spacing="roomy"
        surface="left"
        backdrop={{
          src: "/images/testphase/buero-nacht.webp",
          imageClassName: "trial-backdrop",
          tone: "carry",
        }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="lg:order-2">
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
                Preisrechner öffnen
              </Button>
            </div>
          </div>

          {/*
            Einbaustelle des spaeteren „3 Monate"-Visuals.

            `data-trial-visual` ist der Anker, an dem es eingesetzt wird —
            kein Styling haengt daran, es benennt nur die Stelle. Die Zone
            traegt selbst keine Flaeche, keinen Rahmen und keinen Schatten:
            das waere schon eine Gestaltung, und der Abschnitt soll keine
            Karte werden.

            5 : 4 ab Desktop, weil ein Zeitraum aus drei Teilen sowohl
            nebeneinander als auch uebereinander darstellbar bleiben soll —
            ein Streifen oder ein Hochformat wuerde eine der beiden
            Richtungen jetzt schon ausschliessen.
          */}
          <div data-trial-visual className="order-2 w-full lg:order-1">
            <TrialCalendar />
          </div>
        </div>
      </Section>

      {/*
        2. Leistungsbereich — alle zwölf Leistungen mit Foto nebeneinander.
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
          ── Eine Bauform, viermal ─────────────────────────────────────────
          Vorher trug die Leitleistung ein vollbreites Bildband mit Schrift
          im Bild, die drei uebrigen dagegen eine Zweispalter-Komposition mit
          wechselnder Bildseite. Zwei Bauformen in einem Bereich, und beim
          Ueberfliegen las die erste Leistung als etwas anderes als die
          folgenden drei.

          Jetzt tragen alle vier dieselbe Form: volle Breite, Bild, Schrift
          im Bild, gleicher Abstand. Die Ordnung entsteht aus der
          Wiederholung, nicht aus dem Kontrast — und weil jede Leistung
          gleich breit ist, liest sich der Bereich als eine Liste statt als
          eine Sammlung von Einzelentwuerfen.

          ── Warum die Baender flacher sind ────────────────────────────────
          Bei 2,4 : 1 war das Leitband auf dem Schirm 507 px hoch. Viermal
          diese Hoehe waere ein Bereich, durch den man nur noch scrollt.
          3,1 : 1 nimmt gut ein Fuenftel heraus, ohne dass die Aufnahmen
          zu Streifen werden — 1672 × 941 px Quellmaterial vertragen den
          Anschnitt.

          Der Bereich wird dadurch nicht laenger, sondern kuerzer: die
          bisherige Zweispalter-Reihe brauchte neben dem Bild noch die
          Texthoehe, das Band traegt beides uebereinander im selben Raum.

          Der Schriftgrad geht von 2,75 rem auf 2 rem. Vier Ueberschriften
          in derselben Groesse wie zuvor die eine wuerden sich gegenseitig
          ueberbieten; eine Stufe darunter bleibt jede lesbar, ohne dass der
          Bereich schreit.
        */}
        <FadeIn>
          <ul className="mt-12 grid gap-y-8 lg:mt-16 lg:gap-y-12">
            {featuredServices.map((service) => {
              const photo = servicePhotos[service.slug];
              const { description, linkText } = serviceCopy(service);
              const href = `/leistungen/${service.slug}`;

              return (
                <li key={service.slug}>
                  <Link
                    href={href}
                    className="press group relative block overflow-hidden rounded-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                  >
                    <div className="relative aspect-[4/3] w-full sm:aspect-[2.2/1] lg:aspect-[3.1/1]">
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
                        Lesekante unten statt einer Deckung ueber das ganze
                        Bild: oben bleibt das Motiv frei, unten traegt es die
                        Schrift. Etwas kraeftiger als beim frueheren Leitband,
                        weil die Schrift im flacheren Band einen groesseren
                        Anteil der Flaeche einnimmt.
                      */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-brand-950/92 via-brand-950/55 to-brand-950/10"
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                      <h3 className="font-display display-lg text-pretty text-xl font-medium text-white sm:text-2xl lg:text-[2rem]">
                        {service.shortTitle}
                      </h3>
                      <p className="measure mt-3 text-sm leading-relaxed text-brand-100">
                        {description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        {linkText}
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
        ── Hygiene-Moment „Disinfection Sweep" ─────────────────────────────
        Die Stelle war für diesen Abschnitt vorgesehen; hier steht er jetzt.

        ── Warum genau hier ───────────────────────────────────────────────
        Der Leistungsbereich davor sagt, WAS gereinigt wird. Der Abschnitt
        danach erklärt, WORAUF es im Alltag ankommt. Dazwischen fehlte das
        WOZU — und das ist nichts, was man behaupten sollte, sondern etwas,
        das man zeigen kann. Deshalb trägt dieser Abschnitt keinen Satz,
        sondern ein Bild in Bewegung.

        ── Warum ohne Überschrift und ohne Text ───────────────────────────
        Alle sechs freigegebenen H2 dieser Seite sind bereits an anderen
        Abschnitten in Gebrauch, und eine neue Aussage über Hygiene zu
        erfinden wäre genau die Art von Versprechen, die diese Seite nicht
        macht. Die Fläche bleibt deshalb stumm. Für die Gliederung heißt das:
        die H2-Kette der Seite bleibt unverändert, es kommt keine Ebene hinzu.

        ── Flächenwechsel ────────────────────────────────────────────────
        Der Leistungsbereich steht auf `tint`, der Alltagsabschnitt auf
        `warm`. Dieser hier steht auf `white` — damit sind es drei
        verschiedene Gründe in Folge, und die helle, kühle Bühne des
        Motion-Assets sitzt auf der hellsten Fläche der Seite, statt gegen
        einen Farbton anzuarbeiten.

        `contained={false}` gibt es hier NICHT: die Bühne soll im
        Inhaltsraster stehen wie die Bildflächen der Leistungen darüber, nicht
        randlos über die Fensterbreite laufen.

        ── Der Prototyp ist abgelöst ──────────────────────────────────────
        Hier stand `<DisinfectionSweep />` — die auf der Leinwand gerechnete
        Fassung des Hygiene-Moments. Sie hat ihren Zweck erfüllt: sie hat
        gezeigt, dass die Stelle trägt. Jetzt steht dort das finale Motiv,
        und zwar nicht als stummes Bild, sondern mit dem redaktionellen
        Inhalt, der ihm bisher fehlte.

        Zwei Auflösungen desselben Gedankens nacheinander wären eine zu viel:
        die Seite hat drei Signature-Motive, und der Organismus ist eines
        davon. `DisinfectionSweep.tsx` und seine Rollen in dieser Datei
        bleiben unangetastet liegen — der Schritt ist damit umkehrbar.
      */}
      <Section background="white" spacing="roomy">
        <HygieneSystem />
      </Section>

      {/*
        3. Vertrauensbereich — redaktioneller Einstieg mit Arbeitsfoto links,
        die sechs Punkte rechts als Matrix aus feinen Trennlinien. Bewusst
        keine sechs gleichen Container.
      */}
      <Section background="warm">
        {/*
          Komposition: Textspalte und Bildflaeche als eine Einheit — gleiche
          Oberkante, gleiche Unterkante. Die staerkste Einzelaussage steht
          direkt hier oben; die uebrigen fuenf folgen als ruhiges Band darunter,
          statt alle sechs gleich zu gewichten.

          ── Was hier vorher nicht aufging ──────────────────────────────────
          Die Bildflaeche war ab Desktop auf `aspect-[3/4]` gesetzt, also
          Hochformat, und zusaetzlich um 6 rem nach oben aus dem Abschnitt
          gezogen. Beides zusammen machte sie rund 736 px hoch, waehrend der
          Text daneben endete — rechts lief das Foto weiter, links begann schon
          der naechste Inhalt. Es las sich nicht als Komposition, sondern als
          nachtraeglich daneben gestelltes Bild.

          Jetzt bestimmt der Text die Hoehe, und das Bild folgt ihr (`h-full`
          auf der von `stretch` bereits gedehnten Rasterzelle). Damit ist die
          Bildhoehe aus dem Inhalt abgeleitet statt gesetzt: wird der Text auf
          einem Breakpoint kuerzer, wird auch das Bild flacher, und die
          Unterkanten bleiben in jedem Fall auf einer Linie.

          ── Warum zwei Spalten erst ab `xl` ────────────────────────────────
          Die Textspalte ist 32 rem breit, und der Fliesstext ist dadurch rund
          459 px hoch — auf jeder Breite gleich. Bei 1024 px blieben der
          Bildzelle davon nur 369 px, also ein Hochformat von 0,80 : 1, in dem
          nur noch 44–89 % der Bildbreite sichtbar waren. Das ist derselbe
          Fehler wie vorher, nur kleiner.

          Aus dem Zweispalter herauszukommen ist dort die bessere Antwort als
          ihn zu quetschen: von 1024 bis 1279 px stehen Text und Bild
          untereinander, das Bild in voller Breite und flachem Querformat. Ab
          1280 px ist genug Breite fuer beides nebeneinander da.
        */}
        <div className="grid gap-12 xl:grid-cols-[minmax(0,32rem)_1fr] xl:gap-16">
          <div>
            <SectionHeading
              eyebrow="Was eine verlässliche Zusammenarbeit ausmacht"
              title={heading.sectionHeadings[0]}
              subtitle="Saubere Räume allein reichen nicht aus, wenn Termine ausfallen, Zuständigkeiten unklar sind oder Leistungen jedes Mal neu erklärt werden müssen. Deshalb legen wir Wert auf feste Abläufe. Vor dem Start klären wir, welche Flächen gereinigt werden, wie häufig die Reinigung stattfinden soll und welche Bereiche besondere Aufmerksamkeit benötigen. So wissen beide Seiten, was vereinbart wurde."
            />

            {/*
              Zweite Informationsebene innerhalb derselben Spalte, nicht ein
              Block, der unter dem Text weiterlaeuft. Zwei Mittel tragen das:
              der groessere Abstand nach oben, der ihn vom Fliesstext loest,
              und die kleinere Schriftgroesse.

              Vorher stand die Zeile in `text-xl sm:text-2xl` und damit fast
              auf Augenhoehe mit der Abschnitts-Ueberschrift — zwei Aussagen
              gleichen Gewichts direkt untereinander, von denen keine die
              andere stuetzt. Eine Stufe darunter liest sie sich als Beleg zur
              Ueberschrift, was sie inhaltlich auch ist.

              Die blaue Akzentlinie bleibt: sie ordnet den Block dem Thema
              Zuverlaessigkeit zu, ohne eine Kartenhuelle zu brauchen.
            */}
            <div className="mt-12 border-l-2 border-brand-500 pl-7">
              <p className="font-display display-lg text-lg font-medium text-brand-900 sm:text-xl">
                {leadTrustPoint.title}
              </p>
              <p className="measure mt-3 text-base leading-relaxed text-ink-soft">
                {leadTrustPoint.description}
              </p>
            </div>
          </div>

          {/*
            ── Warum der Randanschnitt entfallen ist ────────────────────────
            Die Flaeche lief ab Desktop mit `mr-[calc(50%-50vw)]` bis an den
            Fensterrand. Der Trick setzt voraus, dass das Element die volle
            Breite des Inhaltscontainers hat — dann sind 50 % genau die halbe
            Containerbreite. Hier steht es aber in der rechten Rasterzelle, und
            die ist bei 1440 px nur 654 px breit. Gemessen ergab das eine
            Layoutbreite von 1040 px bei 759 px sichtbarer Flaeche: rund 386 px
            Ueberschuss, den `overflow-hidden` rechts abschnitt.

            Das war nicht nur Verschnitt. `object-position` rechnet auf der
            Layoutbreite, nicht auf dem sichtbaren Rest — die beiden Personen
            wurden also auf 80 % einer Flaeche positioniert, deren rechtes
            Viertel gar nicht zu sehen war. Der Ausschnitt liess sich damit
            nicht verlaesslich steuern.

            Ohne Anschnitt sind Layoutbreite und sichtbare Breite identisch,
            und der Ausschnitt ist wieder berechenbar. Das Bild rundet dadurch
            auf allen Seiten — `rounded-panel` wie die uebrigen Aufnahmen der
            Seite, keine eigene Bauform.

            ── Drei Stufen, alle am Motiv ausgerichtet ──────────────────────
            Die Aufnahme ist 2400 × 1351 px, also 1,78 : 1 im Querformat. Sie
            in ein 3 : 4-Hochformat zu zwingen hiess, 58 % der Bildbreite
            wegzuschneiden — nur ein Streifen von 42 % blieb sichtbar, und nur
            deshalb musste `object-position` auf 84 % stehen, um die beiden
            Personen ueberhaupt einzufangen.

            Jetzt bleibt jede Stufe in der Naehe der 1,78 des Motivs:

              bis 1023 px   3 : 2 — 84 % der Bildbreite sichtbar, Hoehe voll
              1024–1279 px  16 : 9 — praktisch deckungsgleich mit dem Motiv,
                            volle Breite ueber die einspaltige Flaeche
              ab 1280 px    kein Verhaeltnis, die Hoehe kommt vom Text; das
                            ergibt gemessen etwa 1,4 : 1 und 79 % der
                            Bildbreite bei voller Hoehe

            In allen drei Faellen stehen beide Personen, das Tablet zwischen
            ihnen und der Wagen als Kontext im Bild, ohne dass der Ausschnitt
            sie an den Rand druecken muss.

            `min-h` als Boden, nicht als Sollwert: er greift nur, falls der Text
            auf einem schmalen Desktop-Fenster kuerzer umbricht als das Bild
            hoch sein soll. Ein `max-h` braucht es nicht mehr — die Hoehe kann
            gar nicht mehr davonlaufen, weil sie vom Text kommt.
          */}
          <BrandPhoto
            photo={photos.teamBriefing}
            aspect="aspect-[3/2] lg:aspect-[16/9] xl:aspect-auto"
            sizes="(min-width: 1280px) 46vw, 100vw"
            /* 80 % horizontal haelt die beiden Personen und das Tablet in der
               Flaeche und schneidet links die leere dunkle Wand weg, die im
               Motiv die ersten 30 % einnimmt. 42 % vertikal sichert die Koepfe
               fuer den Fall, dass die Flaeche flacher wird als das Bild. */
            objectPosition="80% 42%"
            className="shadow-deep xl:h-full xl:min-h-[26rem]"
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
        clip="clip-path"
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

        ── Das Motiv im Hintergrund ────────────────────────────────────────
        Weiter oben stand die Aufnahme aus Berlin-Mitte als eigene, randlose
        Bildzäsur — 21:9 über die volle Fensterbreite, mit einer Bildunter-
        schrift zum Einsatzgebiet. Sie ist entfallen: die Aussage dieser
        Zäsur („in allen zwölf Bezirken unterwegs") ist genau die Aussage
        dieses Abschnitts, nur ohne dessen Bezirksliste. Zwei Abschnitte für
        dieselbe Information, dazwischen der halbe Seitenverlauf.

        Dasselbe Asset liegt jetzt hier als Tonebene unter der Fläche. Es
        kostet keinen zusätzlichen Scrollweg mehr und steht an der Stelle,
        an der die Bezirke tatsächlich stehen. Der Bildausschnitt ist nach
        rechts gesetzt: dort liegt keine Überschrift, und das Register
        beginnt erst darunter.
      */}
      <Section
        background="tint"
        surface="left"
        spacing="compact"
        backdrop={{ src: districtPhotos.mitte.src, objectPosition: "72% 30%" }}
      >
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
        ── Hier stand der Kontaktmoment mit Hintergrundvideo ────────────
        Der Abschnitt ("Persönliche Beratung" / "Sprechen Sie uns direkt
        an") bot neben der Telefonnummer nur eine Schaltfläche zu /kontakt
        — denselben Handlungsweg, den die Schluss-CTA am Seitenende bereits
        mit derselben Zielseite anbietet, und dieselbe Telefonnummer, die im
        Hero bereits als Schaltfläche steht. Ohne eigene Information (kein
        Preis, keine neue Aussage) blieb kein eigenständiger Wert gegenüber
        Hero und Schluss-CTA übrig, deshalb ist die Einbindung entfernt.

        `ContactMoment.tsx` selbst bleibt unangetastet liegen, falls die
        Komponente an anderer Stelle wieder gebraucht wird.

        Farbfolge bleibt dadurch: Einsatzgebiet (tint) → Wissen (weiss).
      */}

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
        ── Hier stand ein zweites Anfrageformular ───────────────────────
        An dieser Stelle lag der Abschnitt „Schreiben Sie kurz, was gereinigt
        werden soll“ mit dem vollständigen Kontaktformular — auf der
        Startseite der zweite Anfrageweg neben dem Hero.

        Er ist entfernt, weil die Hero-Bühne jetzt das vierschrittige
        Formular „Kostenloses Angebot anfordern“ trägt. Zwei konkurrierende
        Anfrageformulare auf derselben Seite teilen die Aufmerksamkeit, und
        das schwächere von beiden gewinnt nichts dazu.

        Entfernt wurde ausschließlich die Einbindung an dieser Stelle:
        `ContactForm` selbst ist unverändert und trägt weiterhin die
        Kontaktseite (`src/app/kontakt/page.tsx`). Prüfregeln und
        Übermittlung liegen seit diesem Durchgang in
        `src/lib/contactRequest.ts` und werden von beiden Formularen
        gemeinsam benutzt.

        Die Verankerung `id="anfrage"` ist mit dem Abschnitt entfallen. Im
        Projekt verwies nichts darauf — geprüft über die gesamte Quelle,
        kein einziger Verweis auf `#anfrage`.

        Zum Übergang: der Wissensbereich davor läuft auf Weiß aus, der
        FAQ-Bereich danach beginnt auf `muted`. Vorher lag zwischen beiden
        die warme Fläche des Formulars als eigenes Kapitel. Ohne sie
        stüßen zwei Abschnitte mit sehr ähnlichem Grund aneinander, was
        genau die flache Stelle ergäbe, die dieser Wechsel vermeiden soll.
        Der FAQ-Bereich trägt deshalb jetzt `decor` — dieselbe Lichtkante
        an der Oberkante, die vorher das Formular trug. Sie macht aus dem
        leisen Farbwechsel eine sichtbare Naht, ohne eine weitere
        Trennlinie einzuführen.
      */}

      {/*
        10. FAQ — Ueberschrift steht links und bleibt beim Scrollen stehen,
        die Antworten laufen rechts durch. Ruhiger Abschnitt, der die Seite vor
        dem Abschluss entlastet, und zugleich die einzige zweispaltige
        Text-zu-Text-Anordnung der Seite.
      */}
      <Section background="muted" id="faq" surface="bottom" decor>
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
                Preisrechner nutzen
              </Button>
              <Button
                href="/kontakt"
                variant="onMedia"
                size="lg"
              >
                Kontakt aufnehmen
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
