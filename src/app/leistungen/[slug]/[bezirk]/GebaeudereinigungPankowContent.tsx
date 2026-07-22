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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/gebaeudereinigung-berlin/pankow.
 * Bewusst getrennt vom generischen [slug]/[bezirk]-Template, aus demselben Grund wie
 * GebaeudereinigungMitteContent.tsx / GebaeudereinigungFriedrichshainKreuzbergContent.tsx.
 * Diese Kombination existierte zuvor noch nicht in combos.ts/seoHeadings.ts und wurde
 * für diesen Auftrag neu angelegt. Die Ortsteilliste im Auftrag enthielt den Eintrag
 * „Pankow-Heinersdorf“ – eine fälschliche Dopplung der bereits separat aufgeführten
 * Ortsteile „Pankow“ und „Heinersdorf“ – und wurde deshalb entfernt.
 */

const scopeCards = [
  {
    title: "Gebäudereinigung",
    description: "Regelmäßige und ergänzende Reinigung für gewerblich genutzte Immobilien.",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Büroreinigung",
    description: "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitäranlagen.",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxisreinigung",
    description: "Abgestimmte Reinigung von Empfang, Wartebereichen, Behandlungsräumen und Sanitärbereichen.",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Kanzleireinigung",
    description: "Reinigung von Büros, Empfangsbereichen, Besprechungsräumen und gemeinsam genutzten Flächen.",
    href: "/leistungen/kanzleireinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Wiederkehrende Reinigung in festgelegten Intervallen.",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Treppenhausreinigung",
    description: "Pflege von Eingängen, Stufen, Podesten, Fluren und Geländern.",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung erreichbarer Fenster, Glastüren, Schaufenster und Trennwände.",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung bei hartnäckigen Verschmutzungen oder besonderem Anlass.",
    href: "/leistungen/grundreinigung-berlin",
  },
];

const objectTypeCards = [
  {
    title: "Büros und Agenturen",
    description: "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitärbereichen.",
  },
  {
    title: "Praxen und Therapieräume",
    description: "Abgestimmte Reinigung von Empfang, Wartebereichen, Behandlungsräumen und Kontaktflächen.",
  },
  {
    title: "Wohn- und Geschäftshäuser",
    description: "Pflege von Eingängen, Treppenhäusern, Podesten und gemeinschaftlichen Flächen.",
  },
  {
    title: "Gewerbliche Einrichtungen",
    description: "Regelmäßige Reinigung von Verkaufs-, Verwaltungs- und Betriebsflächen.",
  },
];

/**
 * Korrigierte Liste der offiziellen Ortsteile des Bezirks Pankow. „Pankow-Heinersdorf“
 * aus dem Auftragstext wurde entfernt, da es sich um eine Dopplung der bereits
 * separat enthaltenen Ortsteile „Pankow“ und „Heinersdorf“ handelt.
 */
const ortsteile = [
  "Prenzlauer Berg",
  "Weißensee",
  "Pankow",
  "Heinersdorf",
  "Blankenburg",
  "Karow",
  "Stadtrandsiedlung Malchow",
  "Blankenfelde",
  "Buch",
  "Französisch Buchholz",
  "Niederschönhausen",
  "Rosenthal",
  "Wilhelmsruh",
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie uns Objektart, Standort und ungefähre Fläche mit. Wir melden uns zeitnah mit den nächsten Schritten.",
  },
  {
    title: "Flächen und Anforderungen abstimmen",
    description: "Wir klären Räume, Nutzung, Reinigungszeiten und besondere Anforderungen Ihres Objekts.",
  },
  {
    title: "Besichtigung bei Bedarf",
    description: "Bei größeren oder schwer einzuschätzenden Objekten kann ein Vor-Ort-Termin sinnvoll sein.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen und Intervalle.",
  },
  {
    title: "Reinigung beginnen",
    description: "Nach Ihrer Freigabe beginnt die Reinigung zum vereinbarten Termin.",
  },
];

const costFactors = [
  "Fläche",
  "Objektart",
  "Raumaufteilung",
  "Nutzung",
  "Sanitärbereiche",
  "gewünschtes Intervall",
  "Zugänglichkeit",
  "Reinigungszeit",
  "ergänzende Leistungen",
];

const neighborDistrictLinks = [
  { label: "Mitte", href: "/standorte/mitte" },
  { label: "Reinickendorf", href: "/standorte/reinickendorf" },
  { label: "Lichtenberg", href: "/standorte/lichtenberg" },
  { label: "Friedrichshain-Kreuzberg", href: "/standorte/friedrichshain-kreuzberg" },
];

const faqItems = [
  {
    question: "Welche Leistungen bietet Glanzwerk in Pankow an?",
    answer: "Unter anderem Gebäude-, Büro-, Praxis-, Kanzlei-, Unterhalts-, Treppenhaus-, Glas-, Fenster- und Grundreinigung.",
  },
  {
    question: "Arbeitet Glanzwerk auch in Prenzlauer Berg und Weißensee?",
    answer: "Anfragen aus allen Ortsteilen des Bezirks Pankow werden geprüft.",
  },
  {
    question: "Werden Treppenhäuser regelmäßig gereinigt?",
    answer: "Ja. Intervalle und Leistungsumfang werden passend zum Gebäude festgelegt.",
  },
  {
    question: "Sind Reinigungen außerhalb der Geschäftszeiten möglich?",
    answer: "Je nach Objekt und Einsatzplanung können passende Zeitfenster vereinbart werden.",
  },
  {
    question: "Wie häufig sollte ein Büro gereinigt werden?",
    answer: "Das hängt von Mitarbeiterzahl, Besucheraufkommen, Raumart und Nutzung ab.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Objektart, Intervall, Zugänglichkeit und vereinbarten Leistungen.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer: "Ja. Für die laufende Abstimmung erhalten Sie eine feste Kontaktperson.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Telefonisch unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GebaeudereinigungPankowContent({
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
            Reinigung für Unternehmen und Immobilien im Bezirk Pankow
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Glanzwerk übernimmt die regelmäßige Reinigung von Büros, Praxen, Kanzleien,
            Treppenhäusern und weiteren Gewerbeobjekten in Berlin-Pankow. Reinigungsumfang,
            Intervalle und Einsatzzeiten richten sich nach der Nutzung und den Anforderungen
            Ihres Gebäudes.
          </p>
        </div>

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
        <SectionHeading eyebrow="Vielseitig genutzter Bezirk" title={heading.sectionHeadings[0]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Der Bezirk Pankow reicht von dicht bebauten Geschäfts- und Wohnquartieren bis zu
            Gewerbegebieten und ruhigeren äußeren Ortsteilen. Büroflächen rund um Prenzlauer
            Berg oder Weißensee stellen teilweise andere Anforderungen als medizinische
            Einrichtungen, Treppenhäuser oder Gewerbeobjekte in Buch, Karow oder Französisch
            Buchholz.
          </p>
          <p>
            Deshalb planen wir die Reinigung anhand der tatsächlichen Nutzung. Vor Beginn
            werden Räume, Flächen, Intervalle, Zugangsregeln und geeignete Reinigungszeiten
            festgelegt.
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

      {/* 4. Objektarten */}
      <Section background="muted">
        <SectionHeading eyebrow="Passend zur Nutzung" title={heading.sectionHeadings[2]} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {objectTypeCards.map((card, index) => (
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
          <p>Anfragen werden aus allen Ortsteilen des Bezirks geprüft, darunter:</p>
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
          Die Ortsangaben dienen nur zur Beschreibung des Einsatzgebiets.
        </p>
      </Section>

      {/* 6. Besondere Anforderungen */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Objektbezogene Planung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Stark frequentierte Eingänge, Sanitäranlagen und gemeinschaftliche Bereiche
            benötigen häufig kürzere Intervalle. Weniger genutzte Nebenräume können in
            größeren Abständen berücksichtigt werden.
          </p>
          <p>
            Bei Treppenhäusern beeinflussen zusätzlich Anzahl der Parteien, Jahreszeit und
            eingetragener Straßenschmutz den Aufwand. In Praxen und Büros spielen dagegen
            Arbeitszeiten, Patienten- oder Besucherverkehr und sensible Flächen eine größere
            Rolle.
          </p>
        </div>
      </Section>

      {/* 7. Reinigungszeiten */}
      <Section background="white">
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Je nach Objekt kann die Reinigung vor Arbeitsbeginn, nach Geschäftsschluss oder
            innerhalb fester Zeitfenster stattfinden. Vor dem Start klären wir Zugänge,
            Schlüsselregelungen und mögliche Einschränkungen.
          </p>
        </div>
      </Section>

      {/* 8. Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zur Reinigung" title={heading.sectionHeadings[6]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 9. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Wovon die Kosten abhängen" title={heading.sectionHeadings[7]} />
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

      {/* 10. Umwelt und Materialien */}
      <Section background="white">
        <SectionHeading eyebrow="Bedarfsgerechte Dosierung" title={heading.sectionHeadings[8]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Glanzwerk verwendet je nach Anwendungsbereich professionelle Reinigungsprodukte,
            unter anderem von Kiehl, Dr. Schnell und Buzil. Die Auswahl richtet sich nach
            Material, Verschmutzung und Nutzung.
          </p>
        </div>
        <Link
          href="/umwelt-verantwortung"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:underline"
        >
          Mehr über Umwelt und Verantwortung
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </Section>

      {/* 11. Benachbarte Bezirke */}
      <Section background="muted">
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

      {/* 12. FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="gebaeudereinigung-pankow" />
        </FadeIn>
      </Section>

      {/* 13. Abschluss-CTA */}
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
