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
 * /leistungen/gebaeudereinigung-berlin/charlottenburg-wilmersdorf.
 * Bewusst getrennt vom generischen [slug]/[bezirk]-Template, aus demselben Grund
 * wie GebaeudereinigungMitteContent.tsx / GebaeudereinigungPankowContent.tsx.
 */

const scopeCards = [
  {
    title: "Gebäudereinigung",
    description: "Regelmäßige und ergänzende Reinigung für gewerblich genutzte Immobilien.",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Büroreinigung",
    description: "Pflege von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitäranlagen.",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxisreinigung",
    description: "Reinigung von Empfang, Wartezimmern, Behandlungsräumen und hygienisch relevanten Bereichen.",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Kanzleireinigung",
    description: "Reinigung repräsentativer Büro-, Empfangs- und Besprechungsflächen.",
    href: "/leistungen/kanzleireinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Wiederkehrende Reinigung in fest vereinbarten Intervallen.",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung zugänglicher Fenster, Glaswände, Türen und Schaufenster.",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Treppenhausreinigung",
    description: "Pflege von Eingängen, Stufen, Podesten, Fluren und Handläufen.",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung bei hartnäckigen Rückständen oder besonderem Anlass.",
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
    description: "Pflege von Tischen, Böden und abgestimmten Flächen.",
  },
  {
    title: "Glasflächen",
    description: "Entfernung sichtbarer Fingerabdrücke und Gebrauchsspuren im vereinbarten Umfang.",
  },
  {
    title: "Sanitäranlagen",
    description: "Regelmäßige Reinigung abhängig von Nutzung und Besucheraufkommen.",
  },
];

const ortsteile = [
  "Charlottenburg",
  "Wilmersdorf",
  "Schmargendorf",
  "Grunewald",
  "Westend",
  "Charlottenburg-Nord",
  "Halensee",
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie uns Standort, Objektart, Fläche und gewünschten Rhythmus mit.",
  },
  {
    title: "Anforderungen abstimmen",
    description: "Wir klären Räume, Nutzung, Besucheraufkommen, Materialien und Einsatzzeiten.",
  },
  {
    title: "Besichtigung bei Bedarf",
    description: "Bei größeren oder komplexen Objekten kann ein Vor-Ort-Termin sinnvoll sein.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen.",
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
  { label: "Mitte", href: "/standorte/mitte" },
  { label: "Spandau", href: "/standorte/spandau" },
  { label: "Steglitz-Zehlendorf", href: "/standorte/steglitz-zehlendorf" },
  { label: "Tempelhof-Schöneberg", href: "/standorte/tempelhof-schoeneberg" },
  { label: "Reinickendorf", href: "/standorte/reinickendorf" },
];

const faqItems = [
  {
    question: "Welche Gewerbeobjekte reinigt Glanzwerk im Bezirk?",
    answer: "Unter anderem Büros, Praxen, Kanzleien, Verkaufsflächen, Treppenhäuser und weitere gewerblich genutzte Räume.",
  },
  {
    question: "Arbeitet Glanzwerk in Charlottenburg und Wilmersdorf?",
    answer: "Anfragen aus allen sieben Ortsteilen des Bezirks werden geprüft.",
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
    question: "Können Fenster und Glaswände mitgereinigt werden?",
    answer: "Ja, sofern Zugänglichkeit und Leistungsumfang vorab abgestimmt wurden.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Nutzung, Intervall, Materialien, Zeitfenster und vereinbartem Umfang.",
  },
  {
    question: "Ist eine Besichtigung notwendig?",
    answer: "Nicht immer. Bei größeren oder schwer einzuschätzenden Objekten kann sie sinnvoll sein.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GebaeudereinigungCharlottenburgWilmersdorfContent({
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
            Reinigungsservice für Unternehmen im Berliner Westen
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Glanzwerk übernimmt die regelmäßige Reinigung von Büros, Praxen, Kanzleien,
            Verkaufsflächen, Treppenhäusern und weiteren Gewerbeobjekten in
            Charlottenburg-Wilmersdorf. Leistungen, Intervalle und Einsatzzeiten werden an die
            Nutzung und den betrieblichen Alltag angepasst.
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
            Charlottenburg-Wilmersdorf ist geprägt von Bürohäusern, Kanzleien, Arztpraxen,
            Einzelhandel, Hotellerie, Gastronomie und Wohn- und Geschäftshäusern. Rund um
            Kurfürstendamm, Kantstraße, Bismarckstraße, Messe Berlin, City West und
            Wilmersdorfer Straße treffen repräsentative Kundenbereiche auf intensiv genutzte
            Arbeits- und Gemeinschaftsflächen.
          </p>
          <p>
            Ein passender Reinigungsplan berücksichtigt deshalb nicht nur die Fläche, sondern
            auch Besucheraufkommen, Geschäftszeiten, Materialien und den gewünschten Eindruck
            auf Kunden oder Patienten.
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
            In Kanzleien, Praxen, Büros und Verkaufsflächen sind Eingänge und Empfangsbereiche
            häufig der erste Kontaktpunkt für Besucher. Sichtbare Laufspuren, Fingerabdrücke auf
            Glas oder ungepflegte Sitzbereiche wirken sich unmittelbar auf den Gesamteindruck
            aus.
          </p>
          <p>
            Deshalb können stark sichtbare Bereiche in kürzeren Intervallen gereinigt werden als
            Nebenräume oder wenig genutzte Flächen.
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
          <p>Anfragen werden aus allen Ortsteilen des Bezirks geprüft:</p>
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
          Auch Gewerbeobjekte rund um Kurfürstendamm, Savignyplatz, Ernst-Reuter-Platz,
          Messegelände, Fehrbelliner Platz und Bundesallee können angefragt werden. Die
          genannten Orte dienen ausschließlich der geografischen Einordnung.
        </p>
      </Section>

      {/* 6. Einsatzzeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Unternehmen bevorzugen Reinigungszeiten außerhalb des Kunden- und
            Mitarbeiterbetriebs. Je nach Objekt kann die Reinigung am frühen Morgen, nach
            Geschäftsschluss oder innerhalb fester Zeitfenster erfolgen.
          </p>
          <p>
            Zugangsregeln, Schlüssel, Alarmanlagen und mögliche Einschränkungen werden vor
            Beginn abgestimmt.
          </p>
        </div>
      </Section>

      {/* 7. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Naturstein, Holz, Glas, Metall, textile Bodenbeläge und beschichtete Möbel benötigen
            unterschiedliche Reinigungsverfahren. Glanzwerk verwendet je nach Einsatzbereich
            professionelle Produkte, unter anderem von Kiehl, Dr. Schnell und Buzil.
          </p>
          <p>
            Mittel und Dosierung werden passend zur Oberfläche und zum tatsächlichen Bedarf
            ausgewählt. Desinfektionsmittel werden nur dort eingesetzt, wo dies vereinbart oder
            erforderlich ist.
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
          <FAQ items={faqItems} idPrefix="gebaeudereinigung-charlottenburg-wilmersdorf" />
        </FadeIn>
      </Section>

      {/* 12. Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Objektart, Standort, ungefähre Fläche und gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und klären die nächsten Schritte."
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
