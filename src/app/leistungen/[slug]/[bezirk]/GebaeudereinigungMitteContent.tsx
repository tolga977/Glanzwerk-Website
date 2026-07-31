import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import type { Service } from "@/data/services";
import type { District } from "@/data/districts";
import type { Combo } from "@/data/combos";
import type { SeoHeadingSet } from "@/data/seoHeadings";
import { siteConfig } from "@/data/site";
import { serviceSchema } from "@/lib/schema";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import Button from "@/components/ui/Button";

/**
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/gebaeudereinigung-berlin/mitte.
 * Bewusst getrennt vom generischen [slug]/[bezirk]-Template, aus demselben Grund wie
 * die individuell verfassten Leistungsseiten unter [slug]: der Auftragstext folgt einer
 * eigenen, deutlich umfangreicheren Abschnittsstruktur (12 Abschnitte statt der fixen
 * Slots des generischen Kombi-Templates). Bewusst photo-los gehalten, um am bestehenden,
 * bild-freien Erscheinungsbild der generischen Kombi-Seiten festzuhalten.
 */

const scopeCards = [
  {
    title: "Gebäudereinigung",
    description: "Regelmäßige und ergänzende Reinigungsarbeiten für gewerblich genutzte Immobilien.",
    linkLabel: "Mehr zur Gebäudereinigung",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Büroreinigung",
    description: "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen, Sanitäranlagen und Gemeinschaftsflächen.",
    linkLabel: "Mehr zur Büroreinigung",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxisreinigung",
    description: "Sorgfältige Reinigung von Empfang, Wartezimmern, Behandlungsräumen und Sanitärbereichen.",
    linkLabel: "Mehr zur Praxisreinigung",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Kanzleireinigung",
    description: "Reinigung von Büros, Empfangsbereichen, Besprechungsräumen und gemeinsam genutzten Flächen.",
    linkLabel: "Mehr zur Kanzleireinigung",
    href: "/leistungen/kanzleireinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Wiederkehrende Reinigung in täglich, mehrmals wöchentlich oder individuell vereinbarten Intervallen.",
    linkLabel: "Mehr zur Unterhaltsreinigung",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Treppenhausreinigung",
    description: "Pflege von Eingängen, Stufen, Podesten, Geländern und gemeinschaftlich genutzten Bereichen.",
    linkLabel: "Mehr zur Treppenhausreinigung",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung zugänglicher Fenster, Rahmen, Glastüren, Trennwände und weiterer Glasflächen.",
    linkLabel: "Mehr zur Glas- und Fensterreinigung",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung bei hartnäckigen Rückständen, Übergaben oder besonderem Bedarf.",
    linkLabel: "Mehr zur Grundreinigung",
    href: "/leistungen/grundreinigung-berlin",
  },
];

const localRequirementCards = [
  {
    title: "Büro- und Verwaltungsstandorte",
    description: "Reinigung passend zu Arbeitszeiten, Besucheraufkommen und internen Abläufen.",
  },
  {
    title: "Praxen und medizinische Einrichtungen",
    description: "Abgestimmte Reinigung von Warte-, Behandlungs- und Sanitärbereichen.",
  },
  {
    title: "Gastronomie und Verkaufsflächen",
    description: "Berücksichtigung von Öffnungszeiten, Gästen und stark frequentierten Eingängen.",
  },
  {
    title: "Wohn- und Geschäftshäuser",
    description: "Regelmäßige Pflege von Treppenhäusern, Eingängen und gemeinschaftlichen Flächen.",
  },
];

const ortsteile = ["Mitte", "Moabit", "Hansaviertel", "Tiergarten", "Wedding", "Gesundbrunnen"];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Nennen Sie uns Objektart, Adresse, ungefähre Fläche und gewünschten Reinigungsrhythmus.",
  },
  {
    title: "Anforderungen abstimmen",
    description: "Wir klären Räume, Nutzung, Reinigungszeiten und besondere Anforderungen.",
  },
  {
    title: "Besichtigung bei Bedarf",
    description: "Bei größeren oder schwer einzuschätzenden Objekten kann ein Vor-Ort-Termin sinnvoll sein.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage des abgestimmten Leistungsumfangs.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung zum vereinbarten Termin.",
  },
];

const costFactors = [
  "Objektart",
  "Flächengröße",
  "Raumaufteilung",
  "Anzahl der Sanitärbereiche",
  "Besucheraufkommen",
  "gewünschtes Reinigungsintervall",
  "Reinigungszeiten und Zugänglichkeit",
  "Bodenbeläge und Oberflächen",
  "zusätzliche Glas- oder Grundreinigungen",
];

const neighborDistrictLinks = [
  { label: "Friedrichshain-Kreuzberg", href: "/standorte/friedrichshain-kreuzberg" },
  { label: "Pankow", href: "/standorte/pankow" },
  { label: "Charlottenburg-Wilmersdorf", href: "/standorte/charlottenburg-wilmersdorf" },
  { label: "Reinickendorf", href: "/standorte/reinickendorf" },
];

const faqItems = [
  {
    question: "Welche Unternehmen betreut Glanzwerk in Berlin-Mitte?",
    answer:
      "Unser Angebot richtet sich unter anderem an Büros, Praxen, Kanzleien, Hausverwaltungen, Autohäuser, Gastronomiebetriebe und weitere gewerbliche Auftraggeber.",
  },
  {
    question: "Welche Reinigungsleistungen werden angeboten?",
    answer:
      "Möglich sind unter anderem Gebäude-, Büro-, Praxis-, Kanzlei-, Unterhalts-, Treppenhaus-, Glas-, Fenster- und Grundreinigungen.",
  },
  {
    question: "Sind Reinigungen außerhalb der Geschäftszeiten möglich?",
    answer:
      "Je nach Objekt und Einsatzplanung können Einsätze vor Arbeitsbeginn, nach Geschäftsschluss oder in anderen fest vereinbarten Zeitfenstern stattfinden.",
  },
  {
    question: "Arbeitet Glanzwerk in allen Ortsteilen von Mitte?",
    answer: "Anfragen aus Mitte, Moabit, Hansaviertel, Tiergarten, Wedding und Gesundbrunnen werden geprüft.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Der Preis hängt unter anderem von Fläche, Objektart, Nutzung, Intervall, Zugänglichkeit und Leistungsumfang ab.",
  },
  {
    question: "Muss das Objekt vorab besichtigt werden?",
    answer: "Nicht immer. Bei größeren oder komplexen Objekten kann eine Besichtigung sinnvoll sein.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer: "Ja. Für die laufende Abstimmung erhalten Sie eine feste Kontaktperson.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Telefonisch unter ${siteConfig.phone}, über das Kontaktformular oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GebaeudereinigungMitteContent({
  service,
  district,
  heading,
}: {
  service: Service;
  district: District;
  combo: Combo;
  heading: SeoHeadingSet;
}) {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Leistungen", href: "/leistungen" },
          { label: service.shortTitle, href: `/leistungen/${service.slug}` },
          { label: district.name },
        ]}
      />
      <JsonLd
        data={serviceSchema({
          name: heading.metaTitle ?? heading.h1,
          description: service.metaDescription,
          path: `/leistungen/${service.slug}/${district.slug}`,
          areaServed: district.name,
        })}
      />

      {/* 1. Hero */}
      <Section background="white" className="pt-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-500">
            Reinigungsservice für Unternehmen im Bezirk Mitte
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Glanzwerk übernimmt die regelmäßige und bedarfsgerechte Reinigung gewerblich
            genutzter Räume in Berlin-Mitte. Wir betreuen Büros, Praxen, Kanzleien,
            Gastronomiebetriebe, Autohäuser, Treppenhäuser und weitere Gewerbeobjekte.
            Leistungen, Reinigungsintervalle und Einsatzzeiten werden passend zu Ihrem Betrieb
            abgestimmt.
          </p>
        </div>

        <FadeIn as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Flexible Reinigungszeiten
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Fester Ansprechpartner
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Gewerbliche Reinigung in Berlin-Mitte
          </li>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakt">
              Unverbindliches Angebot anfragen
            </Button>
          <Button href="/preisrechner" variant="outline">
              Preis kostenlos berechnen
            </Button>
        </div>
      </Section>

      {/* 2. Einleitung */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Reinigung im zentralen Berliner Bezirk" title={heading.sectionHeadings[0]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Berlin-Mitte vereint Bürostandorte, medizinische Einrichtungen, Kanzleien, Hotels,
            Gastronomie, Einzelhandel und öffentliche Einrichtungen auf engem Raum. Rund um
            Alexanderplatz, Friedrichstraße, Potsdamer Platz, Moabit, Tiergarten und den
            Hauptbahnhof unterscheiden sich Gebäudenutzung und Besucheraufkommen teilweise
            deutlich.
          </p>
          <p>
            Ein Büro mit regelmäßigem Kundenverkehr benötigt einen anderen Reinigungsplan als
            eine Praxis, ein Treppenhaus oder ein gastronomischer Betrieb. Deshalb legen wir vor
            Beginn fest, welche Flächen gereinigt werden, wie häufig die Einsätze stattfinden und
            welche Zeitfenster zum Arbeitsalltag passen.
          </p>
        </div>
      </Section>

      {/* 3. Leistungen */}
      <Section background="white">
        <SectionHeading eyebrow="Leistungsumfang" title={heading.sectionHeadings[1]} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scopeCards.map((card, index) => (
            <FadeIn
              key={card.title}
              delay={index * 60}
              className="rounded-card border border-line bg-white p-6 shadow-raise"
            >
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
              <Link href={card.href} className="mt-3 inline-block text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                {card.linkLabel}
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 4. Lokale Anforderungen */}
      <Section background="muted">
        <SectionHeading eyebrow="Objektbezogene Planung" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In zentralen Lagen können Straßenschmutz, Besucheraufkommen und Lieferverkehr den
            Reinigungsbedarf erhöhen. Eingangsbereiche, Aufzüge, Sanitäranlagen und stark
            genutzte Laufwege benötigen dadurch häufig kürzere Intervalle als Nebenräume.
          </p>
          <p>
            Gleichzeitig sind Zugangs- und Reinigungszeiten in vielen Objekten genau geregelt.
            Deshalb klären wir vor dem Start, wann Räume zugänglich sind, welche Bereiche
            besondere Aufmerksamkeit benötigen und ob die Reinigung vor Arbeitsbeginn, nach
            Geschäftsschluss oder in einem festen Tageszeitfenster erfolgen soll.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {localRequirementCards.map((card, index) => (
            <FadeIn
              key={card.title}
              delay={index * 60}
              className="rounded-card border border-line bg-white p-6 shadow-raise"
            >
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 5. Ortsteile und lokale Bezüge */}
      <Section background="white">
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>Unser Einsatzgebiet umfasst den gesamten Bezirk Mitte. Dazu gehören unter anderem:</p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {ortsteile.map((ortsteil) => (
            <li
              key={ortsteil}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900"
            >
              {ortsteil}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Auch Objekte rund um Alexanderplatz, Unter den Linden, Friedrichstraße, Potsdamer
          Platz, Hauptbahnhof, Turmstraße, Müllerstraße und Osloer Straße können nach Abstimmung
          betreut werden.
        </p>
      </Section>

      {/* 6. Reinigungszeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Unternehmen möchten Reinigungsarbeiten außerhalb der regulären Geschäftszeiten
            durchführen lassen. Je nach Objekt und Einsatzplanung kann die Reinigung am frühen
            Morgen, nach Geschäftsschluss oder in fest vereinbarten Zeitfenstern stattfinden.
          </p>
          <p>
            Zugänge, Schlüsselregelungen, Empfangszeiten und mögliche Einschränkungen werden vor
            dem ersten Einsatz geklärt.
          </p>
        </div>
      </Section>

      {/* 7. Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[5]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 8. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Gebäudereinigung" title={heading.sectionHeadings[6]} />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Der Preis richtet sich nicht allein nach der Quadratmeterzahl. Entscheidend sind unter
          anderem:
        </p>
        <ul className="mt-3 grid max-w-3xl gap-2.5 sm:grid-cols-2">
          {costFactors.map((factor) => (
            <li key={factor} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand-500">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {factor}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/preisrechner">
              Preis kostenlos berechnen
            </Button>
          <Button href="/kontakt" variant="outline">
              Individuelles Angebot anfragen
            </Button>
        </div>
      </Section>

      {/* 9. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Glanzwerk verwendet je nach Material und Einsatzbereich professionelle
            Reinigungsprodukte, unter anderem von Kiehl, Dr. Schnell und Buzil. Mittel und
            Dosierung werden an Oberfläche, Verschmutzung und tatsächlichen Bedarf angepasst.
          </p>
          <p>
            Desinfektionsmittel werden nur dort eingesetzt, wo dies vereinbart oder hygienisch
            erforderlich ist.
          </p>
        </div>
        <Link
          href="/umwelt-verantwortung"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Mehr über Umwelt und Verantwortung
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </Section>

      {/* 10. Benachbarte Bezirke */}
      <Section background="muted">
        <SectionHeading eyebrow="Auch in der Nähe" title={heading.sectionHeadings[8]} />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {neighborDistrictLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              {link.label}
            </Link>
          ))}
        </FadeIn>
      </Section>

      {/* 11. FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="gebaeudereinigung-mitte" />
        </FadeIn>
      </Section>

      {/* 12. Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Ihr Objekt, die ungefähre Fläche und den gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und stimmen mit Ihnen die nächsten Schritte ab."
          primaryLabel="Unverbindliches Angebot anfragen"
          primaryHref="/kontakt"
          secondaryLabel="Preis kostenlos berechnen"
          secondaryHref="/preisrechner"
        />
        <p className="mt-6 text-center text-sm text-ink-soft">
          Telefon:{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            {siteConfig.phone}
          </a>
          {" · "}
          E-Mail:{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            {siteConfig.email}
          </a>
        </p>
      </Section>
    </>
  );
}
