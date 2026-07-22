import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Section, { SectionHeading } from "@/components/ui/Section";
import EditorialIntro from "@/components/ui/EditorialIntro";
import ServiceCard from "@/components/ui/ServiceCard";
import TrustBadges from "@/components/ui/TrustBadges";
import ProcessSteps from "@/components/ui/ProcessSteps";
import CTASection from "@/components/ui/CTASection";
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

/** Section 2 — sechs Vertrauenskarten, homepage-eigen (nicht die sitewide TrustBadges-Standardliste). */
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

/** Section 4 — vier Karten zur konkreten Arbeitsweise, homepage-eigen. */
const workingMethodBadges = [
  {
    title: "Ihr Objekt wird vorab eingeordnet",
    description:
      "Wir klären Flächen, Nutzung, Besucheraufkommen, sensible Bereiche und gewünschte Reinigungszeiten.",
    icon: "specialized" as const,
  },
  {
    title: "Die Leistungen werden eindeutig festgelegt",
    description:
      "Sie wissen, welche Arbeiten regelmäßig ausgeführt werden und welche Leistungen bei Bedarf ergänzt werden können.",
    icon: "transparent" as const,
  },
  {
    title: "Das eingesetzte Team kennt die Anforderungen",
    description:
      "Wiederkehrende Abläufe und objektspezifische Hinweise werden so organisiert, dass nicht bei jedem Einsatz neu begonnen werden muss.",
    icon: "personal" as const,
  },
  {
    title: "Beanstandungen werden direkt geklärt",
    description:
      "Sollte eine vereinbarte Leistung einmal nicht wie erwartet ausgeführt worden sein, prüfen wir den konkreten Fall und kümmern uns um eine zeitnahe Lösung.",
    icon: "reliable" as const,
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
const environmentBadges = [
  {
    title: "Bedarfsgerechte Dosierung",
    description: "Reinigungsmittel werden entsprechend dem tatsächlichen Bedarf und den Herstellerangaben eingesetzt.",
    icon: "transparent" as const,
  },
  {
    title: "Materialschonende Verfahren",
    description: "Das Verfahren wird an Bodenbeläge, Glas, Mobiliar und weitere Oberflächen angepasst.",
    icon: "specialized" as const,
  },
  {
    title: "Mülltrennung im Objekt",
    description: "Bestehende Trennsysteme berücksichtigen wir im Rahmen der vereinbarten Leistungen.",
    icon: "reliable" as const,
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={professionalServiceSchema()} />

      {/* 1. Hero — volltonige, langsam bewegte Hintergrundfläche (Ken-Burns-
          Zoom statt Video), als moderne Weiterentwicklung des bisherigen
          Glanzwerk-Hero-Konzepts mit Hintergrundvideo. */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <HeroPhoto />
        <div className="container-page relative z-10 py-24 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              Gebäudereinigung für Gewerbekunden in Berlin
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight, "text-brand-300")}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Glanzwerk Reinigungsservice Berlin reinigt Büros, Praxen, Kanzleien, Autohäuser,
              Gastronomiebetriebe und weitere Gewerbeobjekte in ganz Berlin. Wir stimmen Leistungen,
              Reinigungszeiten und Intervalle auf Ihren Betrieb ab. Sie erhalten einen festen
              Ansprechpartner, nachvollziehbare Absprachen und eine Reinigung, die Ihren Arbeitsalltag
              möglichst wenig beeinträchtigt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

      {/* Vertrauenszeile unter dem Hero. */}
      <section className="border-y border-white/10 bg-brand-900 py-4">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center sm:justify-center">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-200">
            In allen zwölf Berliner Bezirken im Einsatz
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-200">
            Flexible Reinigungszeiten
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-200">
            Betriebshaftpflichtversichert
          </span>
        </div>
      </section>

      {/* 2. Vertrauensbereich */}
      <Section background="white">
        <EditorialIntro
          eyebrow="Darauf kommt es im Reinigungsalltag an"
          title={heading.sectionHeadings[0]}
          subtitle="Saubere Räume allein reichen nicht aus, wenn Termine ausfallen, Zuständigkeiten unklar sind oder Leistungen jedes Mal neu erklärt werden müssen. Deshalb legen wir Wert auf feste Abläufe. Vor dem Start klären wir, welche Flächen gereinigt werden, wie häufig die Reinigung stattfinden soll und welche Bereiche besondere Aufmerksamkeit benötigen. So wissen beide Seiten, was vereinbart wurde."
        >
          <FadeIn>
            <TrustBadges badges={trustSectionBadges} />
          </FadeIn>
        </EditorialIntro>
      </Section>

      {/* 3. Leistungsbereich */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Unsere Reinigungsleistungen"
          title={heading.sectionHeadings[1]}
          subtitle="Ein Büro stellt andere Anforderungen als eine Arztpraxis, ein Autohaus oder ein gastronomischer Betrieb. Deshalb betrachten wir nicht nur die Fläche, sondern auch die Nutzung des Gebäudes. Gemeinsam legen wir fest, welche Bereiche regelmäßig gereinigt werden, wo hygienisch sensible Zonen liegen und welche Arbeiten in größeren Abständen sinnvoll sind."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              summaryOverride={homepageServiceCopy[service.slug]?.description}
              ctaLabelOverride={homepageServiceCopy[service.slug]?.linkText}
            />
          ))}
        </FadeIn>
        <div className="mt-8">
          <Button href="/leistungen" variant="ghost">
            Alle Reinigungsleistungen ansehen
          </Button>
        </div>
      </Section>

      {/* 4. Konkrete Arbeitsweise */}
      <Section background="white">
        <SectionHeading
          eyebrow="So arbeitet Glanzwerk"
          title={heading.sectionHeadings[2]}
          subtitle="Ob eine Reinigung dauerhaft funktioniert, zeigt sich im Alltag. Deshalb setzen wir nicht auf allgemeine Werbeversprechen, sondern auf klare Zuständigkeiten und praktische Vereinbarungen. Ihr Objekt wird vor dem Start besprochen, Leistungen werden festgehalten und Besonderheiten dokumentiert."
        />
        <div className="mt-10">
          <TrustBadges badges={workingMethodBadges} />
        </div>
      </Section>

      {/* 5. Ablauf — kräftiger Blauton als visueller Anker in der Seitenmitte */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[3]} light />
        <FadeIn className="mt-10">
          <ProcessSteps steps={homeProcessSteps} light />
        </FadeIn>
      </Section>

      {/* 6. Umwelt und Verantwortung */}
      <Section background="warm">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <BrandPhoto photo={dosierungPhoto} className="shadow-2xl shadow-brand-950/20 lg:order-2" />
          <div className="lg:order-1">
            <SectionHeading eyebrow="Umwelt und Schutz" title={heading.sectionHeadings[4]} />
            <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Wirksame Reinigung bedeutet nicht, möglichst viel Chemie einzusetzen. Entscheidend sind
                das passende Mittel, die richtige Dosierung und ein Verfahren, das zur Oberfläche passt.
                Glanzwerk arbeitet unter anderem mit professionellen Reinigungsprodukten von Kiehl, Dr.
                Schnell und Buzil. Welches Produkt eingesetzt wird, richtet sich nach Material,
                Verschmutzung und Nutzungsbereich.
              </p>
              <p>
                Wo es im Objekt möglich und sinnvoll ist, achten wir auf einen sparsamen
                Wasserverbrauch, bedarfsgerechte Dosierung und Mülltrennung. Empfindliche Oberflächen
                behandeln wir materialgerecht, damit sie nicht durch ungeeignete Mittel oder zu
                aggressive Verfahren beschädigt werden. Desinfektionsmittel setzen wir dort ein, wo sie
                vereinbart oder hygienisch erforderlich sind – nicht pauschal auf jeder Fläche.
              </p>
            </div>
            <div className="mt-6">
              <TrustBadges badges={environmentBadges} />
            </div>
            <div className="mt-6">
              <Button href="/umwelt-verantwortung" variant="ghost">
                Mehr über Umwelt und Verantwortung
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Einsatzgebiet */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Gebäudereinigung vor Ort"
          title={heading.sectionHeadings[5]}
          subtitle="Glanzwerk betreut gewerblich genutzte Objekte in ganz Berlin. Dazu gehören zentrale Bürostandorte ebenso wie Praxen, Kanzleien, Gastronomiebetriebe, Autohäuser und Gewerbeflächen in den äußeren Bezirken. Kurze Abstimmungswege und eine realistische Einsatzplanung sind dabei wichtiger als künstlich eingebaute Ortsnamen."
        />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {districts.map((district) => (
            <Link
              key={district.slug}
              href={`/standorte/${district.slug}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500"
            >
              {district.name}
            </Link>
          ))}
        </FadeIn>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Nach Absprache übernehmen wir auch Reinigungsaufträge in Potsdam, Schönefeld und weiteren gut
          erreichbaren Orten im Berliner Umland. Ob ein Einsatz möglich ist, hängt von Objektgröße,
          Leistungsumfang und Reinigungsintervall ab.
        </p>
      </Section>

      {/* 8. Wissensbereich */}
      <Section background="white">
        <SectionHeading
          eyebrow="Glanzwerk Wissen"
          title={heading.sectionHeadings[6]}
          subtitle="Was kostet eine Gebäudereinigung? Wie häufig sollte ein Büro gereinigt werden? Und wann reicht eine Unterhaltsreinigung nicht mehr aus? In unserem Wissensbereich erklären wir wichtige Begriffe und Entscheidungskriterien verständlich und ohne unnötige Fachsprache."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </FadeIn>
        <div className="mt-8">
          <Button href="/wissen" variant="ghost">
            Alle Ratgeber ansehen
          </Button>
        </div>
      </Section>

      {/* 9. Dreimonatige Testphase */}
      <Section background="muted">
        <CTASection
          title={heading.secondaryCtaHeading}
          subtitle="Sie möchten zunächst prüfen, ob Abläufe, Kommunikation und Reinigungsleistung zu Ihrem Unternehmen passen? Vereinbaren Sie eine dreimonatige Testphase zu den regulär angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung. Die genauen Leistungen und Termine werden vor Beginn schriftlich festgehalten."
          primaryLabel="Testphase anfragen"
          primaryHref="/3-monate-testen"
          secondaryLabel="Preis berechnen"
          secondaryHref="/preisrechner"
        />
      </Section>

      {/* 10. FAQ */}
      <Section background="white" id="faq">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={homeFaqItems} />
        </FadeIn>
      </Section>

      {/* 11. Abschließender Kontaktbereich — Abschluss-CTA mit Bildhintergrund */}
      <Section background="muted">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgb(11 30 61 / 0.93), rgb(11 30 61 / 0.9)), url(${photos.buildingFacade.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <FadeIn className="px-6 py-14 text-center shadow-2xl shadow-brand-950/30 sm:px-12 sm:py-16">
            <GlanzMark className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 opacity-30 sm:h-32 sm:w-32" />
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              {heading.ctaHeading}
            </h2>
            <div className="glanz-divider mx-auto mt-4 max-w-[120px]" />
            <p className="mx-auto mt-4 max-w-xl text-brand-200">
              Beschreiben Sie kurz, welche Räume gereinigt werden sollen und wie häufig Sie
              Unterstützung benötigen. Wir prüfen Ihre Angaben und melden uns mit den nächsten
              Schritten. Bei größeren oder besonders genutzten Objekten stimmen wir bei Bedarf einen
              Besichtigungstermin ab.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/preisrechner" variant="primary" size="lg">
                Preis kostenlos berechnen
              </Button>
              <Button href="/kontakt" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-900">
                Angebot anfragen
              </Button>
            </div>
            <a href={siteConfig.phoneHref} className="mt-5 block text-sm text-brand-200 hover:text-white">
              Oder direkt anrufen: {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-brand-200 hover:text-white">
              {siteConfig.email}
            </a>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
