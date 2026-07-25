import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Section, { SectionHeading } from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import { TrustIcon } from "@/components/ui/TrustBadges";
import ProcessSteps from "@/components/ui/ProcessSteps";
import ArticleCard from "@/components/ui/ArticleCard";
import BrandPhoto from "@/components/ui/BrandPhoto";
import FAQ from "@/components/ui/FAQ";
import FadeIn from "@/components/ui/FadeIn";
import GlanzMark from "@/components/ui/GlanzMark";
import HeroPhoto from "@/components/home/HeroPhoto";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { articles } from "@/data/articles";
import { photos } from "@/data/photos";
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
const homeProcessSteps = [
  {
    title: "Anfrage stellen",
    description:
      "Kontaktieren Sie uns telefonisch, über das Formular oder über den Preisrechner. Teilen Sie uns mit, um welche Objektart es geht und welche Reinigung Sie benötigen.",
  },
  {
    title: "Anforderungen besprechen",
    description:
      "Wir klären Größe, Flächen, gewünschte Intervalle, Reinigungszeiten und besondere Anforderungen. Bei umfangreicheren Objekten kann eine Besichtigung sinnvoll sein.",
  },
  {
    title: "Angebot erhalten",
    description:
      "Sie erhalten ein nachvollziehbares Angebot auf Grundlage der besprochenen Leistungen. Zusätzliche Arbeiten werden nicht ohne vorherige Abstimmung eingeplant.",
  },
  {
    title: "Reinigung starten",
    description:
      "Nach der Freigabe beginnt die Reinigung zum vereinbarten Termin. Anpassungen können später vorgenommen werden, wenn sich Nutzung oder Bedarf verändern.",
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
 * Section 3 — Rhythmus im Leistungsraster: die vier breitesten Leistungen
 * bekommen die größere Kartenfläche, die acht spezialisierten die kompakte.
 * Beide Gruppen behalten Foto und Beschreibung; die Reihenfolge entspricht
 * unverändert der Datenreihenfolge in services.ts (keine Umsortierung).
 * 4 + 8 füllt das 2er- bzw. 4er-Raster restlos auf — kein ausgefranstes
 * letztes Raster und kein Bento-Zufallsmuster.
 */
const broadServices = services.slice(0, 4);
const specialisedServices = services.slice(4);

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

export default function HomePage() {
  return (
    <>
      <JsonLd data={professionalServiceSchema()} />

      {/*
        1. Hero — vollflächiges Foto als räumliche Basis, Textblock links auf
        einer kontrollierten Verlaufskante. Kein Glaspanel, kein Badge-Cluster,
        keine Kennzahlen. Das Bild driftet einmalig langsam in seine Ruhelage.
      */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <HeroPhoto />
        <div className="container-page relative z-10 py-24 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-control border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <GlanzMark className="h-3.5 w-3.5 shrink-0" />
              Gebäudereinigung für Gewerbekunden in Berlin
            </p>
            <h1 className="font-display display-xl text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight, "text-brand-300")}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
              Glanzwerk Reinigungsservice Berlin reinigt Büros, Praxen, Kanzleien, Autohäuser,
              Gastronomiebetriebe und weitere Gewerbeobjekte in ganz Berlin. Wir stimmen Leistungen,
              Reinigungszeiten und Intervalle auf Ihren Betrieb ab. Sie erhalten einen festen
              Ansprechpartner, nachvollziehbare Absprachen und eine Reinigung, die Ihren Arbeitsalltag
              möglichst wenig beeinträchtigt.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/preisrechner" size="lg">
                Preis kostenlos berechnen
              </Button>
              <Button
                href="/kontakt"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-900"
              >
                Unverbindliches Angebot anfragen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vertrauenszeile: ruhiges Band, das den Hero abschließt statt eines Badge-Clusters im Bild. */}
      <section className="light-edge border-b border-white/10 bg-brand-900 py-5">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          {[
            "In allen zwölf Berliner Bezirken im Einsatz",
            "Flexible Reinigungszeiten",
            "Betriebshaftpflichtversichert",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-brand-100"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-brand-300"
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
            </span>
          ))}
        </div>
      </section>

      {/*
        2. Vertrauensbereich — redaktioneller Einstieg mit Arbeitsfoto links,
        die sechs Punkte rechts als Matrix aus feinen Trennlinien. Bewusst
        keine sechs gleichen Container.
      */}
      <Section background="warm" spacing="roomy">
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

          <BrandPhoto
            photo={photos.routineCleaningTeam}
            aspect="aspect-[4/3] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 640px, 100vw"
            objectPosition="center 40%"
            className="shadow-deep lg:-mt-16"
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
          eyebrow="Unsere Reinigungsleistungen"
          title={heading.sectionHeadings[1]}
          subtitle="Ein Büro stellt andere Anforderungen als eine Arztpraxis, ein Autohaus oder ein gastronomischer Betrieb. Deshalb betrachten wir nicht nur die Fläche, sondern auch die Nutzung des Gebäudes. Gemeinsam legen wir fest, welche Bereiche regelmäßig gereinigt werden, wo hygienisch sensible Zonen liegen und welche Arbeiten in größeren Abständen sinnvoll sind."
        />

        <FadeIn className="mt-12 grid gap-6 sm:grid-cols-2">
          {broadServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              variant="feature"
              summaryOverride={homepageServiceCopy[service.slug]?.description}
              ctaLabelOverride={homepageServiceCopy[service.slug]?.linkText}
            />
          ))}
        </FadeIn>

        <FadeIn className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {specialisedServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              variant="compact"
              summaryOverride={homepageServiceCopy[service.slug]?.description}
              ctaLabelOverride={homepageServiceCopy[service.slug]?.linkText}
            />
          ))}
        </FadeIn>

        <div className="mt-10">
          <Button href="/leistungen" variant="ghost">
            Alle Reinigungsleistungen ansehen
          </Button>
        </div>
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
      <Section background="white" spacing="roomy" contained={false}>
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
      <Section background="brand" decor>
        <SectionHeading
          eyebrow="Von der Anfrage bis zum Reinigungsstart"
          title={heading.sectionHeadings[3]}
          light
        />
        <FadeIn className="mt-12">
          <ProcessSteps steps={homeProcessSteps} light />
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
      <Section background="warm" spacing="roomy">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Umwelt und Schutz" title={heading.sectionHeadings[4]} />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
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

            <div className="mt-8">
              <Button href="/umwelt-verantwortung" variant="ghost">
                Mehr über Umwelt und Verantwortung
              </Button>
            </div>
          </div>

          <div>
            <BrandPhoto
              photo={dosierungPhoto}
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              sizes="(min-width: 1024px) 420px, 100vw"
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
      <Section background="tint" surface="left">
        <SectionHeading
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

        Rein gestalterisch, deshalb leeres alt-Attribut. Laedt verzoegert.
      */}
      <div
        aria-hidden="true"
        className="relative aspect-[16/9] w-full overflow-hidden bg-brand-950 sm:aspect-[21/9] lg:aspect-[3.4/1]"
      >
        <Image
          src={photos.heroCleaningTeam.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 55%" }}
        />
        <div className="absolute inset-0 bg-brand-950/[0.58]" />
        {/* Lichtkanten: dieselbe Sprache wie auf den anderen dunklen Flaechen. */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/*
        8. Wissensbereich — Magazinstrecke mit einem fuehrenden Beitrag und zwei
        begleitenden Zeilen statt drei gleichwertiger Kacheln.
      */}
      <Section background="white" surface="right">
        <SectionHeading
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
        <div className="mt-10">
          <Button href="/wissen" variant="ghost">
            Alle Ratgeber ansehen
          </Button>
        </div>
      </Section>

      {/*
        9. Dreimonatige Testphase — markantes horizontales Band auf dunkler
        Fläche. Bewusst kein Preisschild, kein Countdown, keine Dringlichkeit.
      */}
      <Section background="navy" decor>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_auto] lg:items-center lg:gap-20">
          <div>
            <h2 className="font-display display-lg text-2xl font-medium text-white sm:text-3xl">
              {heading.secondaryCtaHeading}
            </h2>
            <div className="glanz-divider mt-5 max-w-[120px]" />
            <p className="measure mt-6 text-base leading-relaxed text-brand-100">
              Sie möchten zunächst prüfen, ob Abläufe, Kommunikation und Reinigungsleistung zu Ihrem
              Unternehmen passen? Vereinbaren Sie eine dreimonatige Testphase zu den regulär
              angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige
              Verlängerung. Die genauen Leistungen und Termine werden vor Beginn schriftlich
              festgehalten.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button href="/3-monate-testen" size="lg">
              Testphase anfragen
            </Button>
            <Button
              href="/preisrechner"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-900"
            >
              Preis berechnen
            </Button>
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

      {/* 11. Abschließender Kontaktbereich — greift die Bildsprache des Heros wieder auf. */}
      <Section background="warm" spacing="roomy">
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-panel shadow-deep"
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgb(11 30 61 / 0.93), rgb(11 30 61 / 0.9)), url(${photos.buildingFacade.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="light-edge relative px-6 py-16 text-center sm:px-12 sm:py-20">
              <GlanzMark className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 opacity-25 sm:h-32 sm:w-32" />
              <h2 className="font-display display-lg text-2xl font-medium text-white sm:text-3xl">
                {heading.ctaHeading}
              </h2>
              <div className="glanz-divider mx-auto mt-5 max-w-[120px]" />
              <p className="measure mx-auto mt-6 text-base leading-relaxed text-brand-100">
                Beschreiben Sie kurz, welche Räume gereinigt werden sollen und wie häufig Sie
                Unterstützung benötigen. Wir prüfen Ihre Angaben und melden uns mit den nächsten
                Schritten. Bei größeren oder besonders genutzten Objekten stimmen wir bei Bedarf einen
                Besichtigungstermin ab.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/preisrechner" variant="primary" size="lg">
                  Preis kostenlos berechnen
                </Button>
                <Button
                  href="/kontakt"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-900"
                >
                  Angebot anfragen
                </Button>
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-8">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-control px-3 text-sm font-medium text-brand-100 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                  className="inline-flex min-h-11 items-center gap-2 rounded-control px-3 text-sm font-medium text-brand-100 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
        </FadeIn>
      </Section>
    </>
  );
}
