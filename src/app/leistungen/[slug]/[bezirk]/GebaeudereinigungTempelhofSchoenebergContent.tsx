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
 * Eigenständiger, vollständiger Seiteninhalt für
 * /leistungen/gebaeudereinigung-berlin/tempelhof-schoeneberg.
 * Bewusst getrennt vom generischen [slug]/[bezirk]-Template, aus demselben
 * Grund wie GebaeudereinigungMitteContent.tsx / GebaeudereinigungPankowContent.tsx
 * / GebaeudereinigungCharlottenburgWilmersdorfContent.tsx.
 */

const scopeCards = [
  {
    title: "Gebäudereinigung",
    description: "Regelmäßige und ergänzende Reinigung gewerblich genutzter Immobilien.",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Büroreinigung",
    description: "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitärbereichen.",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxisreinigung",
    description: "Pflege von Empfang, Wartezimmern, Behandlungsräumen und hygienisch relevanten Bereichen.",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Kanzleireinigung",
    description: "Saubere und gepflegte Besprechungs-, Büro- und Empfangsbereiche.",
    href: "/leistungen/kanzleireinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Regelmäßige Reinigung nach individuell vereinbarten Intervallen.",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung zugänglicher Fenster, Glasflächen, Türen und Schaufenster.",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Treppenhausreinigung",
    description: "Pflege von Eingängen, Treppen, Podesten, Fluren und Handläufen.",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung bei besonderen Anforderungen oder hartnäckigen Verschmutzungen.",
    href: "/leistungen/grundreinigung-berlin",
  },
];

const representativeCards = [
  {
    title: "Empfangsbereiche",
    description: "Reinigung von Böden, Theken, Sitzbereichen und frei zugänglichen Oberflächen.",
  },
  {
    title: "Besprechungsräume",
    description: "Pflege von Tischen, Böden und vereinbarten Flächen.",
  },
  {
    title: "Glasflächen",
    description: "Entfernung sichtbarer Fingerabdrücke und Gebrauchsspuren.",
  },
  {
    title: "Sanitäranlagen",
    description: "Regelmäßige Reinigung entsprechend Nutzung und Besucheraufkommen.",
  },
];

const ortsteile = ["Tempelhof", "Schöneberg", "Friedenau", "Mariendorf", "Marienfelde", "Lichtenrade"];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie Standort, Objektart, Fläche und gewünschten Reinigungsrhythmus mit.",
  },
  {
    title: "Anforderungen abstimmen",
    description: "Wir besprechen Nutzung, Räume, Materialien, Besucheraufkommen und Einsatzzeiten.",
  },
  {
    title: "Besichtigung bei Bedarf",
    description: "Bei größeren oder komplexen Objekten kann eine Vor-Ort-Besichtigung sinnvoll sein.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein individuelles Angebot auf Grundlage der abgestimmten Leistungen.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung zum vereinbarten Termin.",
  },
];

const costFactors = [
  "Flächengröße",
  "Objektart",
  "Anzahl der Räume",
  "Sanitär- und Küchenbereiche",
  "Besucheraufkommen",
  "Bodenbeläge und empfindliche Oberflächen",
  "Reinigungsintervall",
  "Einsatzzeiten und Zugänglichkeit",
  "ergänzende Leistungen",
];

const neighborDistrictLinks = [
  { label: "Steglitz-Zehlendorf", href: "/standorte/steglitz-zehlendorf" },
  { label: "Neukölln", href: "/standorte/neukoelln" },
  { label: "Mitte", href: "/standorte/mitte" },
  { label: "Friedrichshain-Kreuzberg", href: "/standorte/friedrichshain-kreuzberg" },
  { label: "Charlottenburg-Wilmersdorf", href: "/standorte/charlottenburg-wilmersdorf" },
];

const faqItems = [
  {
    question: "Welche Gewerbeobjekte reinigt Glanzwerk im Bezirk?",
    answer: "Unter anderem Büros, Praxen, Kanzleien, Verkaufsflächen, Treppenhäuser und weitere gewerblich genutzte Räume.",
  },
  {
    question: "Arbeitet Glanzwerk in allen Ortsteilen von Tempelhof-Schöneberg?",
    answer: "Anfragen aus allen Ortsteilen des Bezirks werden geprüft.",
  },
  {
    question: "Können Reinigungen außerhalb der Geschäftszeiten stattfinden?",
    answer: "Je nach Objekt und Einsatzplanung können passende Zeitfenster vereinbart werden.",
  },
  {
    question: "Werden hochwertige Böden und Möbel materialgerecht gereinigt?",
    answer: "Reinigungsmittel und Verfahren werden passend zu Material und Verschmutzung ausgewählt.",
  },
  {
    question: "Können Fenster und Glasflächen mitgereinigt werden?",
    answer: "Ja, sofern Zugänglichkeit und Leistungsumfang vorab abgestimmt wurden.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Nutzung, Intervall, Materialien, Zeitfenster und vereinbartem Leistungsumfang.",
  },
  {
    question: "Ist eine Besichtigung notwendig?",
    answer: "Nicht immer. Bei größeren oder komplexen Objekten kann sie sinnvoll sein.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GebaeudereinigungTempelhofSchoenebergContent({
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
            Reinigungsservice für Unternehmen im Berliner Süden
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Glanzwerk übernimmt die regelmäßige Reinigung von Büros, Praxen, Kanzleien,
            Verkaufsflächen, Treppenhäusern und weiteren Gewerbeobjekten in
            Tempelhof-Schöneberg. Reinigungsumfang, Intervalle und Einsatzzeiten werden
            individuell auf die Nutzung und den betrieblichen Ablauf abgestimmt.
          </p>
        </div>

        <FadeIn as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Flexible Einsatzzeiten
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Fester Ansprechpartner
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Reinigung im gesamten Bezirk
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
        <SectionHeading eyebrow="Büro-, Praxis- und Geschäftsstandorte" title={heading.sectionHeadings[0]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Tempelhof-Schöneberg verbindet etablierte Geschäftsstraßen, Bürostandorte,
            medizinische Einrichtungen, Hotels, öffentliche Einrichtungen und Gewerbegebiete.
            Rund um den Tempelhofer Damm, den Bayerischen Platz, den Nollendorfplatz, den
            Südkreuz-Bereich sowie das Schöneberger Ufer treffen stark frequentierte
            Arbeitsplätze auf repräsentative Kundenbereiche.
          </p>
          <p>
            Ein passender Reinigungsplan berücksichtigt deshalb Flächengröße,
            Besucheraufkommen, Geschäftszeiten, Bodenbeläge und individuelle Anforderungen des
            jeweiligen Unternehmens.
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
              <Link href={card.href} className="block">
                <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 4. Repräsentative Bereiche */}
      <Section background="muted">
        <SectionHeading eyebrow="Erster Eindruck für Besucher" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Der erste Eindruck entsteht häufig bereits im Eingangsbereich. Gepflegte
            Empfangszonen, saubere Besprechungsräume und gereinigte Glasflächen tragen zu
            einem professionellen Erscheinungsbild gegenüber Kunden, Besuchern und
            Geschäftspartnern bei.
          </p>
          <p>
            Je nach Nutzung können stark frequentierte Bereiche häufiger gereinigt werden als
            Nebenräume oder interne Arbeitsbereiche.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {representativeCards.map((card, index) => (
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

      {/* 5. Ortsteile */}
      <Section background="white">
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>Anfragen werden aus allen Ortsteilen geprüft.</p>
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
          Auch Gewerbeobjekte rund um Tempelhofer Damm, Südkreuz, Nollendorfplatz, Bayerischer
          Platz, Rathaus Schöneberg, Bahnhof Schöneberg und das Tempelhofer Feld können
          angefragt werden. Die genannten Orte dienen ausschließlich der geografischen
          Einordnung.
        </p>
      </Section>

      {/* 6. Einsatzzeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Unternehmen bevorzugen Reinigungszeiten außerhalb der regulären
            Geschäftszeiten. Je nach Objekt können Einsätze früh morgens, abends oder innerhalb
            individuell abgestimmter Zeitfenster erfolgen.
          </p>
          <p>
            Schlüsselübergabe, Zutrittsregelungen und Alarmanlagen werden vor Beginn gemeinsam
            abgestimmt.
          </p>
        </div>
      </Section>

      {/* 7. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Naturstein, Holz, Glas, Metall, textile Bodenbeläge und beschichtete Oberflächen
            benötigen unterschiedliche Reinigungsverfahren. Glanzwerk verwendet je nach
            Einsatzbereich professionelle Produkte, unter anderem von Kiehl, Dr. Schnell und
            Buzil.
          </p>
          <p>
            Reinigungsmittel und Dosierung werden passend zur Oberfläche und zum tatsächlichen
            Bedarf ausgewählt. Desinfektionsmittel werden ausschließlich eingesetzt, wenn dies
            vereinbart oder erforderlich ist.
          </p>
        </div>
      </Section>

      {/* 8. Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[6]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 9. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Gebäudereinigung" title={heading.sectionHeadings[7]} />
        <ul className="mt-6 grid max-w-3xl gap-2.5 sm:grid-cols-2">
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

      {/* 10. Benachbarte Bezirke */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Auch in der Nähe" title="Reinigungsservice auch in angrenzenden Berliner Bezirken" />
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
          <FAQ items={faqItems} idPrefix="gebaeudereinigung-tempelhof-schoeneberg" />
        </FadeIn>
      </Section>

      {/* 12. Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Objektart, Standort, ungefähre Fläche und den gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und besprechen die nächsten Schritte."
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
