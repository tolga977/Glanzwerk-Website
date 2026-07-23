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

/**
 * Eigenständiger, vollständiger Seiteninhalt für
 * /leistungen/gebaeudereinigung-berlin/neukoelln.
 * Bewusst getrennt vom generischen [slug]/[bezirk]-Template, aus demselben
 * Grund wie GebaeudereinigungPankowContent.tsx / GebaeudereinigungTempelhofSchoenebergContent.tsx.
 */

const scopeCards = [
  {
    title: "Gebäudereinigung",
    description: "Regelmäßige und ergänzende Reinigung gewerblich genutzter Immobilien.",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Büroreinigung",
    description: "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitäranlagen.",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxisreinigung",
    description: "Reinigung von Empfang, Wartezimmern und Behandlungsräumen.",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Kanzleireinigung",
    description: "Pflege repräsentativer Büro- und Besprechungsbereiche.",
    href: "/leistungen/kanzleireinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Regelmäßige Reinigung nach individuell vereinbarten Intervallen.",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung zugänglicher Fenster, Türen, Glaswände und Schaufenster.",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Treppenhausreinigung",
    description: "Pflege von Eingängen, Treppen, Fluren, Podesten und Handläufen.",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung bei besonderen Verschmutzungen oder in größeren Zeitabständen.",
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
    description: "Entfernung sichtbarer Fingerabdrücke und alltäglicher Gebrauchsspuren.",
  },
  {
    title: "Sanitäranlagen",
    description: "Regelmäßige Reinigung entsprechend Besucheraufkommen und Nutzung.",
  },
];

const ortsteile = ["Neukölln", "Britz", "Buckow", "Rudow", "Gropiusstadt"];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie Standort, Objektart, Fläche und gewünschten Reinigungsrhythmus mit.",
  },
  {
    title: "Anforderungen abstimmen",
    description: "Wir besprechen Räume, Nutzung, Materialien, Besucheraufkommen und Einsatzzeiten.",
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
  { label: "Tempelhof-Schöneberg", href: "/standorte/tempelhof-schoeneberg" },
  { label: "Treptow-Köpenick", href: "/standorte/treptow-koepenick" },
  { label: "Friedrichshain-Kreuzberg", href: "/standorte/friedrichshain-kreuzberg" },
  { label: "Mitte", href: "/standorte/mitte" },
  { label: "Lichtenberg", href: "/standorte/lichtenberg" },
];

const faqItems = [
  {
    question: "Welche Gewerbeobjekte reinigt Glanzwerk in Neukölln?",
    answer: "Unter anderem Büros, Praxen, Kanzleien, Verkaufsflächen, Treppenhäuser und weitere gewerblich genutzte Räume.",
  },
  {
    question: "Arbeitet Glanzwerk in allen Ortsteilen Neuköllns?",
    answer: "Anfragen aus allen fünf Ortsteilen des Bezirks werden geprüft.",
  },
  {
    question: "Können Reinigungen außerhalb der Geschäftszeiten erfolgen?",
    answer: "Je nach Objekt und Einsatzplanung können passende Zeitfenster vereinbart werden.",
  },
  {
    question: "Werden empfindliche Oberflächen materialgerecht gereinigt?",
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

export default function GebaeudereinigungNeukoellnContent({
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
            Verkaufsflächen, Treppenhäusern und weiteren Gewerbeobjekten in Neukölln.
            Reinigungsleistungen, Intervalle und Einsatzzeiten werden individuell auf die
            Nutzung und den Arbeitsalltag Ihres Unternehmens abgestimmt.
          </p>
        </div>

        <FadeIn as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-2xl border border-black/[0.06] bg-white p-5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            Flexible Einsatzzeiten
          </li>
          <li className="rounded-2xl border border-black/[0.06] bg-white p-5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            Fester Ansprechpartner
          </li>
          <li className="rounded-2xl border border-black/[0.06] bg-white p-5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            Reinigung im gesamten Bezirk
          </li>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/kontakt"
            className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Unverbindliches Angebot anfragen
          </Link>
          <Link
            href="/preisrechner"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white"
          >
            Preis kostenlos berechnen
          </Link>
        </div>
      </Section>

      {/* 2. Einleitung */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Büro-, Praxis- und Geschäftsstandorte" title={heading.sectionHeadings[0]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Neukölln gehört zu den vielfältigsten Wirtschaftsstandorten Berlins. Neben
            klassischen Büroflächen finden sich Arztpraxen, Dienstleistungsunternehmen,
            Hotels, Einzelhandel, Produktionsbetriebe und moderne Gewerbestandorte. Rund um
            Hermannplatz, Sonnenallee, Karl-Marx-Straße, die Neukölln Arcaden, Britz und das
            Gewerbegebiet Grenzallee entstehen unterschiedlichste Anforderungen an Sauberkeit
            und Pflege.
          </p>
          <p>
            Ein individuell abgestimmter Reinigungsplan berücksichtigt deshalb
            Flächengröße, Besucheraufkommen, Nutzung, Materialien und betriebliche Abläufe.
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
              className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
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
            Empfangsbereiche, Wartezonen und Besprechungsräume prägen häufig den ersten
            Eindruck eines Unternehmens. Saubere Böden, gepflegte Glasflächen und hygienische
            Sanitäranlagen tragen zu einem professionellen Erscheinungsbild gegenüber Kunden,
            Patienten und Geschäftspartnern bei.
          </p>
          <p>
            Je nach Nutzung können besonders stark frequentierte Bereiche häufiger gereinigt
            werden als interne Arbeitsräume.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {representativeCards.map((card, index) => (
            <FadeIn
              key={card.title}
              delay={index * 60}
              className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
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
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-900"
            >
              {ortsteil}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Auch Gewerbeobjekte rund um Hermannplatz, Karl-Marx-Straße, Sonnenallee,
          Grenzallee, Buschkrugallee, Britzer Damm und den BER-Zubringer können angefragt
          werden. Die genannten Orte dienen ausschließlich der geografischen Einordnung. Es
          werden keine bestehenden Kundenbeziehungen suggeriert.
        </p>
      </Section>

      {/* 6. Einsatzzeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Unternehmen bevorzugen Reinigungsarbeiten außerhalb der Geschäftszeiten. Je
            nach Objekt können Reinigungen früh morgens, abends oder innerhalb individuell
            abgestimmter Zeitfenster durchgeführt werden.
          </p>
          <p>
            Schlüsselübergaben, Alarmanlagen und Zutrittsregelungen werden im Vorfeld
            abgestimmt.
          </p>
        </div>
      </Section>

      {/* 7. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Holz, Naturstein, Glas, Metall, textile Bodenbeläge und beschichtete Oberflächen
            benötigen unterschiedliche Reinigungsverfahren. Glanzwerk verwendet je nach
            Einsatzbereich professionelle Produkte, unter anderem von Kiehl, Dr. Schnell und
            Buzil.
          </p>
          <p>
            Reinigungsmittel und Dosierung werden passend zum Material und zum tatsächlichen
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
          <Link
            href="/preisrechner"
            className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Preis kostenlos berechnen
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white"
          >
            Individuelles Angebot anfragen
          </Link>
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
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500"
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
          <FAQ items={faqItems} idPrefix="gebaeudereinigung-neukoelln" />
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
          <a href={siteConfig.phoneHref} className="font-semibold text-brand-500 hover:underline">
            {siteConfig.phone}
          </a>
          {" · "}
          E-Mail:{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-500 hover:underline">
            {siteConfig.email}
          </a>
        </p>
      </Section>
    </>
  );
}
