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
import GlassCard from "@/components/ui/GlassCard";
import GlanzMark from "@/components/ui/GlanzMark";
import ServiceTiles from "@/components/ui/ServiceTiles";
import QuoteWizard from "@/components/forms/QuoteWizard";
import HeroBrandStrip from "@/components/home/HeroBrandStrip";
import MobileCTAStrip from "@/components/home/MobileCTAStrip";
import MobileContactSection from "@/components/home/MobileContactSection";
import PriceCalculator from "@/components/home/PriceCalculator";
import TrialCalendar from "@/components/home/TrialCalendar";
import OwnerNote from "@/components/home/OwnerNote";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";
import ClientLogos from "@/components/home/ClientLogos";
import ProcessTimeline, { type TimelineStep } from "@/components/home/ProcessTimeline";
import GoogleRating from "@/components/ui/GoogleRating";
import EinsatzgebietKarte from "@/components/ui/EinsatzgebietKarte";
import BerlinEinsatzgebietKarte from "@/components/ui/BerlinEinsatzgebietKarte";
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
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { pricingConfig } from "@/lib/pricing/config";
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
    // Überarbeitet 2026-08 (SEO-Redaktionsrunde 2, Audit-Befund P0-3): die
    // vorherige Beschreibung nannte ausschließlich die Gebäudereinigung und
    // las sich damit fast wie die Meta-Description der Leistungsseite
    // /leistungen/gebaeudereinigung-berlin. Die Startseite bündelt tatsächlich
    // alle 12 Leistungen (siehe Leistungsraster weiter unten) – das trägt
    // jetzt auch die Beschreibung.
    description:
      "Glanzwerk ist Ihre Reinigungsfirma für Gebäude-, Büro-, Praxis- und weitere gewerbliche Reinigungen in ganz Berlin. Klare Abläufe, feste Ansprechpartner und flexible Reinigungszeiten.",
    path: "/",
  }),
  title: { absolute: heading.metaTitle ?? heading.h1 },
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
    photo: photos.processRequest,
    cta: { label: "Angebot erhalten", href: "/kontakt" },
  },
  {
    title: "Anforderungen besprechen",
    description:
      "Wir klären Größe, Flächen, gewünschte Intervalle, Reinigungszeiten und besondere Anforderungen. Bei umfangreicheren Objekten kann eine Besichtigung sinnvoll sein.",
    facts: [
      "Flächen, Intervalle und Reinigungszeiten werden festgelegt",
      "Besichtigungstermin bei größeren Objekten",
    ],
    photo: photos.processRequirements,
  },
  {
    title: "Angebot erhalten",
    description:
      "Sie erhalten ein nachvollziehbares Angebot auf Grundlage der besprochenen Leistungen. Zusätzliche Arbeiten werden nicht ohne vorherige Abstimmung eingeplant.",
    facts: [
      "Leistungen und Termine schriftlich festgehalten",
      `Wiederkehrende Reinigung ab ${pricingConfig.minimumMonthlyOrderNet} € netto im Monat`,
    ],
    photo: photos.processOffer,
  },
  {
    title: "Reinigung starten",
    description:
      "Nach der Freigabe beginnt die Reinigung zum vereinbarten Termin. Anpassungen können später vorgenommen werden, wenn sich Nutzung oder Bedarf verändern.",
    facts: [
      "Fester Ansprechpartner, der Ihr Objekt kennt",
      "Auf Wunsch drei Monate testen, ohne automatische Verlängerung",
    ],
    photo: photos.processCleaning,
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
      "Wir setzen je nach Oberfläche und Anwendungsbereich professionelle Reinigungsmittel ein. Die Auswahl richtet sich nach Material, Verschmutzung und hygienischen Anforderungen, nicht nach einem einzigen Standardprodukt für alle Flächen.",
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

/** Telefonhörer fürs Hero-CTA — einmal definiert, weil die Schaltfläche
 *  jetzt zweimal im Markup steht (Bühnenzustand mobil/Desktop, siehe dort). */
const phoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
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
      <section data-hero-stage className="bg-white pb-5 lg:pb-6">
        {/*
          ── Hero nach dem Vorbild GRG, Runde 2 (28.10.2026) ───────────────
          Weiße Kopfzeile, darunter ein durchgezogenes Foto über die volle
          Breite, ohne Farbschleier. Auf Wunsch des Betreibers ist das Band
          nach unten LÄNGER (Fensterhöhe abzüglich Kopf und Beleg-Zeile) und
          das Formular steht wieder als Karte mit „Schritt 1 von 4" — ab `lg`
          rechts unten im Band, auf dem Handy unter dem Text. Sichtbar im
          ersten Bildschirm, ohne dass der Mitarbeiter verdeckt wird: Sein Kopf
          steht oberhalb der Karte.
        */}
        <div className="relative isolate flex min-h-[clamp(19rem,44svh,26rem)] flex-col overflow-hidden bg-gradient-to-br from-brand-900 via-brand-900 to-brand-950 text-white sm:min-h-[clamp(28rem,calc(100svh-14rem),46rem)]">
          {/* Hero ohne Foto (31.10.2026): ruhiger Markenverlauf. Die Fotos folgen mit der Bildrunde. */}
          <div className="container-page relative flex flex-1 flex-col gap-6 py-7 sm:py-10 lg:grid lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-3 rounded-control bg-black/45 backdrop-blur-sm sm:mb-4">
                <GoogleRating data={googleRating} variant="badge" />
              </div>

              <h1 className="font-display display-xl text-balance text-[1.75rem] font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-4xl xl:text-5xl">
                {h1Lead && `${h1Lead} `}
                <span className="block">{h1Accent}</span>
              </h1>

              <p className="mt-3 max-w-2xl text-base font-medium leading-snug text-white sm:mt-4 sm:text-xl lg:text-2xl">
                Sauberkeit, auf die Sie sich jeden Tag verlassen können.
              </p>

              <p className="mt-3 flex flex-wrap items-center justify-center gap-x-8 text-sm text-white">
                <Link
                  href="/preisrechner"
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Preis berechnen
                  {arrowIcon}
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {phoneIcon}
                  {siteConfig.phone}
                </a>
              </p>
            </div>

            <div className="w-full max-w-md self-center text-left lg:max-w-none">
              <QuoteWizard />
            </div>
          </div>
        </div>

        <div className="container-page">
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 lg:mt-9 lg:grid-cols-4 lg:gap-x-0">
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
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                <span aria-hidden="true" className="brand-tick text-brand-400" />
                Wer bei Glanzwerk antwortet
              </p>
              <h2 className="font-display display-lg mt-5 text-pretty text-[1.5rem] font-medium uppercase tracking-[0.005em] text-brand-900 sm:text-[2rem] lg:text-[2.25rem]">
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
          <figure className="mt-10 max-w-5xl sm:mt-16">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-panel shadow-deep sm:aspect-[21/9]">
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

      <MobileCTAStrip heading="Überzeugt von den Bewertungen?" />

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
        2. Leistungsbereich — alle zwölf Leistungen als Kachelraster mit Zeichnung.
      */}
      <Section background="paper" decor>
        <SectionHeading
          scale="editorial"
          eyebrow="Unsere Reinigungsleistungen"
          title={heading.sectionHeadings[1]}
          subtitle="Ein Büro stellt andere Anforderungen als eine Arztpraxis, ein Autohaus oder ein gastronomischer Betrieb. Deshalb betrachten wir nicht nur die Fläche, sondern auch die Nutzung des Gebäudes. Gemeinsam legen wir fest, welche Bereiche regelmäßig gereinigt werden, wo hygienisch sensible Zonen liegen und welche Arbeiten in größeren Abständen sinnvoll sind."
        />

        {/*
          Leistungsübersicht als Kachelraster nach dem Vorbild einer klaren
          Verzeichnisseite: alle zwölf Leistungen gleichrangig, jede als
          vollständig anklickbare Kachel mit Zeichnung. Die vier Hauptleistungen
          (Vorgabe des Betreibers, siehe FEATURED_SERVICE_SLUGS) stehen
          unverändert vorn, die übrigen acht folgen in der Reihenfolge aus
          services.ts. Alle zwölf internen Verlinkungen bleiben erhalten.
        */}
        <FadeIn className="mt-8 sm:mt-12">
          <ServiceTiles services={[...featuredServices, ...specialisedServices]} />
        </FadeIn>

        <FadeIn className="mt-8 sm:mt-10">
          <Link
            href="/leistungen"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Leistungsübersicht öffnen
            {arrowIcon}
          </Link>
        </FadeIn>
      </Section>

      <MobileCTAStrip heading="Fragen zu einer Leistung?" />

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

        {/*
          Die fünf übrigen Vertrauenspunkte stehen als dunkle Milchglas-Karten
          auf einer nachtblauen Fläche — derselben Bildsprache wie der
          Testphase-Abschnitt und die Kontaktflächen (abgerundete Markenfläche,
          Foto nur als eingefärbte Textur). Das Foto läuft als Luminanz unter
          dem Blau und bleibt dadurch Stimmung statt Motiv; die Karten tragen
          dieselben Texte und Symbole wie zuvor. Sobald echte Teamfotos
          vorliegen, wird nur das Bild getauscht.

          Ab `lg` sechs Spalten: die ersten drei Karten je zwei Spalten, die
          letzten beiden je drei — so bleibt keine Zelle leer. Auf dem Handy ein
          seitlich wischbares Band.
        */}
        <div className="relative isolate mt-16 overflow-hidden rounded-panel bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 shadow-deep ring-1 ring-white/10 lg:mt-20">
          <Image
            src="/images/leistungen/gebaeudereinigung-berlin/cta-unten.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 76rem, 100vw"
            className="object-cover object-[72%_50%] opacity-45 mix-blend-luminosity"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-brand-900/55 to-brand-800/70"
          />
          <FadeIn
            as="ul"
            className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto p-4 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:p-8 lg:grid-cols-6 lg:gap-5 lg:p-10"
          >
            {supportingTrustPoints.map((badge, index) => (
              <li
                key={badge.title}
                className={`w-[16.5rem] shrink-0 snap-start sm:w-auto ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              >
                <GlassCard tone="dark" className="flex h-full flex-col gap-3 p-4 sm:flex-row sm:gap-4 sm:p-5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-brand-500 text-white shadow-raise">
                    <TrustIcon name={badge.icon} />
                  </span>
                  <div>
                    <p className="font-display text-base font-medium text-white">{badge.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-100">{badge.description}</p>
                  </div>
                </GlassCard>
              </li>
            ))}
          </FadeIn>
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
      <Section
        background="tint"
        bottomPhoto={{ src: "/images/leistungen/bueroreinigung-berlin/hero.png", objectPosition: "center 60%" }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-x-14 xl:gap-x-20">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span aria-hidden="true" className="brand-tick text-brand-400" />
              Was kostet das ungefähr?
            </p>
            <h2 className="font-display display-lg mt-6 text-pretty text-[1.5rem] font-medium uppercase tracking-[0.005em] text-brand-900 sm:text-[2rem] lg:text-[2.5rem] xl:text-[2.75rem]">
              In zwei Minuten zu einer realistischen Hausnummer
            </h2>
            <p className="measure mt-6 text-base leading-relaxed text-ink-soft">
              Der Preisrechner fragt Fläche, Sanitärbereiche, Küchen und Reinigungsintervall ab und
              nennt Ihnen sofort eine Größenordnung — ohne Anmeldung, ohne Telefonat.{" "}
              <strong className="font-semibold text-brand-900">
                Das Ergebnis ist eine unverbindliche Schätzung, kein Angebot.
              </strong>{" "}
              Was am Ende im Vertrag steht, hängt vom Objekt ab und wird vorher gemeinsam
              festgelegt. Wiederkehrende Reinigung übernehmen wir ab{" "}
              {pricingConfig.minimumMonthlyOrderNet} € netto im Monat.
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

          {/* Rechner-Illustration nur ab lg: auf dem Handy ist sie Dekor und kostete ~330 px Scrollweg. */}
          <div className="hidden lg:block lg:pl-4">
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
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
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
        TEST (27.10.2026): Reihenfolge Ablauf → Preisrechner → Testphase (hell/dunkel im Wechsel). Testphase kompakt. Auf dem
        Handy ohne Kalender und ohne zweite Schaltfläche; der Kalender bleibt ab
        Desktop und auf der Seite /3-monate-testen. Sicherung des früheren
        Zustands: Desktop/glanzwerk-backup-2026-10-27/vor-startseitentest-page.tsx

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
        spacing="normal"
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
            <h2 className="font-display display-lg mt-6 text-pretty text-[1.375rem] font-medium uppercase tracking-[0.005em] text-white sm:text-[1.75rem] lg:text-[2rem]">
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
              <Button href="/3-monate-testen" variant="inverse" size="xl">
                Testphase anfragen
              </Button>
              <Button
                href="/preisrechner"
                variant="onMedia"
                size="xl"
                className="max-sm:hidden"
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
          <div data-trial-visual className="order-2 hidden w-full lg:order-1 lg:block">
            <TrialCalendar />
          </div>
        </div>
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
        background="white"
        spacing="compact"
        bottomPhoto={{ src: districtPhotos.mitte.src, objectPosition: "72% 30%" }}
      >
        <SectionHeading
          scale="editorial"
          eyebrow="Gebäudereinigung vor Ort"
          title={heading.sectionHeadings[4]}
          subtitle="Glanzwerk betreut gewerblich genutzte Objekte in ganz Berlin. Dazu gehören zentrale Bürostandorte ebenso wie Praxen, Kanzleien, Gastronomiebetriebe, Autohäuser und Gewerbeflächen in den äußeren Bezirken. Kurze Abstimmungswege und eine realistische Einsatzplanung sind dabei wichtiger als künstlich eingebaute Ortsnamen."
        />
        {/*
          Der frühere eigene Abschnitt „Berlin ist größer, als es von innen
          wirkt" ist hier eingearbeitet (Test, 27.10.2026): derselbe Gedanke,
          auf zwei Sätze gekürzt, ohne zusätzliche Fläche und ohne zweiten
          Farbwechsel. Inhaltlich unverändert — nur Bestandsaussagen.
        */}
        <p className="measure mt-6 text-base leading-relaxed text-ink-soft">
          Berlin gehört flächenmäßig zu den größten Stadtgebieten Deutschlands — von Spandau nach
          Marzahn sind es je nach Verkehrslage über eine Stunde Fahrzeit. Deshalb organisieren wir
          Einsätze nach Bezirken statt nach einem zentralen Fahrplan: Jedes Objekt bekommt einen
          Ansprechpartner, der die jeweilige Ecke Berlins kennt. Mehr dazu auf der{" "}
          <Link
            href="/standorte"
            className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Standortseite
          </Link>
          .
        </p>
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
        <div className="mt-8 max-w-lg">
          <BerlinEinsatzgebietKarte />
        </div>
      </Section>

      <MobileCTAStrip heading="Bereit für den ersten Schritt?" />

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

        Farbfolge bleibt dadurch: Einsatzgebiet (tint) → Berlin-Abschnitt (muted) → Wissen (weiss).
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

        Entfernt wurde ausschließlich die Einbindung an dieser Stelle.
        `ContactForm` selbst gibt es inzwischen nicht mehr: auf Entscheidung
        des Betreibers trägt seit Phase 1 der Go-Live-Vorbereitung auch die
        Kontaktseite (`src/app/kontakt/page.tsx`) dieselbe `QuoteWizard`-
        Komponente wie diese Bühne — eine einzige Formularästhetik statt
        zweier auseinanderlaufender. Prüfregeln und Übermittlung liegen in
        `src/lib/contactRequest.ts` und werden von allen Einbettungen
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

      <MobileContactSection />

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
        10b. Google-Unternehmensprofil — eigener, später Abschnitt statt einer
        Karte mitten im Einsatzgebiet-Kapitel. Wer bis hierhin gescrollt ist,
        hat Leistungen, Bewertungen und FAQ bereits gesehen; der Sprung zu
        Google (Karte + Profil) ist an dieser Stelle die naheliegende letzte
        Bestätigung vor der Kontaktaufnahme.
      */}
      <Section background="white">
        <SectionHeading
          eyebrow="Auf Google zu finden"
          title="Unser Standort und Unternehmensprofil bei Google"
        />
        <div className="mt-8 max-w-md">
          <EinsatzgebietKarte />
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
      <section
        data-tone="navy"
        data-dark="true"
        data-pad="strip"
        className="flow-section relative isolate overflow-hidden bg-brand-900"
      >
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
            <h2 className="font-display display-lg text-[1.375rem] font-medium uppercase tracking-[0.005em] text-white sm:text-[1.75rem] lg:text-[2rem]">
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
              <Button href="/kontakt" variant="inverse" size="lg">
                Angebot erhalten
              </Button>
              <Button
                href="/preisrechner"
                variant="onMedia"
                size="lg"
              >
                Preis berechnen
              </Button>
            </div>
            <div className="mt-9 flex flex-col gap-1 sm:flex-row sm:gap-8">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-medium text-brand-100 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[1200px]:focus-visible:outline-brand-700"
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
                className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-medium text-brand-100 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[1200px]:focus-visible:outline-brand-700"
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
