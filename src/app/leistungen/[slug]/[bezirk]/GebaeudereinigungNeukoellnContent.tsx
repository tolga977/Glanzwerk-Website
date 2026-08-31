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

const bundleCards = [
  {
    title: "Gewerbeparks in Rudow",
    description: "Zusammenhängende Bürogebäude mit mehreren Gewerken in einem Vertrag.",
  },
  {
    title: "Kleinere Büros im Kern",
    description: "Einzelne Etagen oder Einheiten, oft als schlankere Einzelleistung.",
  },
  {
    title: "Fitnessstudios und Gemeinschaftsbüros",
    description: "Gut getaktete Reinigung für neuere, publikumsstarke Nutzungen.",
  },
  {
    title: "Sanitär- und Empfangsbereiche",
    description: "Abgestimmt auf Besucheraufkommen und Objektgröße.",
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
    question: "Werden auch Gewerbeflächen in Rudow bedient?",
    answer: "Ja, Rudow gehört zu unserem Einsatzgebiet in Neukölln, ebenso wie die dichter bebauten Lagen im Kern des Bezirks.",
  },
  {
    question: "Lohnt sich eine gebündelte Gebäudereinigung auch für kleinere Büros im Kern?",
    answer: "Bei kleineren, einzelnen Einheiten reicht häufig eine schlankere Einzelleistung wie die Unterhaltsreinigung. Die gebündelte Gebäudereinigung zahlt sich vor allem bei größeren, zusammenhängenden Objekten wie in Rudow aus.",
    relatedLink: { label: "Zur Unterhaltsreinigung in Berlin", href: "/leistungen/unterhaltsreinigung-berlin" },
  },
  {
    question: "Reinigt Glanzwerk auch kleinere Fitnessstudios?",
    answer: "Ja, wir reinigen Studios unterschiedlicher Größe und richten den Rhythmus nach der jeweiligen Frequentierung aus.",
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
            Reinigungsservice für Unternehmen im Berliner Südosten
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
        <SectionHeading eyebrow="Vom dichten Kern bis Rudow" title={heading.sectionHeadings[0]} />
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
          <p>
            Für ein Objekt mit mehreren Teilleistungen bringt ein gebündelter Vertrag vor allem
            organisatorische Vorteile gegenüber getrennten Einzelaufträgen: Unterhalts-,
            Treppenhaus- und Fensterreinigung laufen über denselben festen Ansprechpartner, statt
            mit drei unterschiedlichen Firmen koordiniert zu werden.
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

      {/* 4. Objektgröße bestimmt den Bündelzuschnitt */}
      <Section background="muted">
        <SectionHeading eyebrow="Ein Bezirk, zwei Objektgrößen" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Im dicht bebauten Kern Neuköllns sind Gewerbeeinheiten meist kleinteilig – hier reicht
            häufig eine einzelne, klar umrissene Leistung. In Rudow und den südlichen Gewerbeparks
            stehen dagegen größere, zusammenhängende Bürogebäude, bei denen sich mehrere Gewerke wie
            Büro, Empfang, Sanitär und Außenflächen sinnvoll in einem Vertrag bündeln lassen.
          </p>
          <p>
            Hinzu kommt eine wachsende Zahl an Fitnessstudios und Gemeinschaftsbüros im Bezirk, die
            eine eigene Taktung brauchen: hohe Frequentierung, aber oft nur wenige feste
            Ansprechpartner vor Ort.
          </p>
          <p>
            Bei gemischt genutzten Altbauten mit Gewerbe im Erdgeschoss und Wohnungen darüber
            klären wir vor Vertragsbeginn, ob der gemeinsame Hausflur zur gewerblichen
            Gebäudereinigung zählt oder ob die Eigentümergemeinschaft dafür bereits einen eigenen
            Treppenhausreinigungs-Vertrag für das gesamte Haus hat.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bundleCards.map((card, index) => (
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
          <p>
            Fitnessstudios und Gemeinschaftsbüros mit längeren Öffnungszeiten benötigen häufig
            einen anderen Rhythmus als ein klassisches Büro mit fester Kernarbeitszeit – wir
            richten den Termin nach der tatsächlichen Frequentierung des jeweiligen Objekts aus,
            statt ein einheitliches Zeitfenster für den gesamten Bezirk vorzugeben.
          </p>
        </div>
      </Section>

      {/* 7. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Gewerbeparks in Rudow bringen häufig große Bodenflächen und viel Glas mit, die
            kleinteiligen Einheiten im Bezirkskern eher ältere Bausubstanz. Glanzwerk wählt Mittel
            und Verfahren je nach Material aus, statt ein einzelnes Produkt für alle Flächen zu
            verwenden.
          </p>
          <p>
            Reinigungsmittel und Dosierung werden passend zum Material und zum tatsächlichen
            Bedarf ausgewählt. Desinfektionsmittel werden ausschließlich eingesetzt, wenn dies
            vereinbart oder erforderlich ist.
          </p>
          <p>
            Bei neu bezogenen Gewerbeflächen in Rudow empfiehlt sich eine ergänzende
            Grundreinigung vor dem ersten regulären Termin, um Montagespuren oder
            Bauschutzfolien-Rückstände zu entfernen, die eine gewöhnliche Unterhaltsreinigung
            allein nicht vollständig erfasst.
          </p>
          <p>
            Bei Gewerbeparks in Rudow mit mehreren Gebäudeteilen auf einem gemeinsamen Grundstück
            lässt sich die Anfahrt für alle im gebündelten Vertrag enthaltenen Teilleistungen
            zusammenlegen, was sich auf die Gesamtkalkulation auswirken kann.
          </p>
          <p>
            Bei Fitnessstudios mit längeren Öffnungszeiten bis in den Abend richten wir den
            Reinigungstermin auf die ruhigsten Randzeiten aus, statt den laufenden
            Trainingsbetrieb während der Hauptnutzungszeit zu stören.
          </p>
          <p>
            Wochenmärkte und temporäre Verkaufsstände rund um Hermannplatz und Karl-Marx-Straße
            tragen zeitweise mehr Straßenschmutz in angrenzende Gewerbeeingänge ein als an
            marktfreien Tagen – das lässt sich bei der Taktung des Eingangsbereichs
            berücksichtigen.
          </p>
          <p>
            Produktionsbetriebe mit angeschlossenem Verkaufsraum, wie sie im Bezirk neben reinen
            Bürodienstleistern vorkommen, benötigen für den Produktionsbereich robustere Verfahren
            als für den kundenzugänglichen Verkaufsraum.
          </p>
          <p>
            Bäckereien und Imbisse, wie sie häufig im Erdgeschoss der Gewerbeobjekte im
            Bezirkskern zu finden sind, benötigen aufgrund des Lebensmittelkontakts einen anderen
            Hygieneanspruch als die übrigen Büro- oder Verkaufsflächen im selben Gebäude.
          </p>
          <p>
            Bei Fitnessstudios und Gemeinschaftsbüros mit hoher Mitgliederfluktuation stimmen wir
            den Reinigungsumfang in regelmäßigen Abständen neu ab, da sich die tatsächliche
            Nutzung schneller ändert als bei einem klassischen Bürogebäude mit stabiler
            Mieterstruktur.
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
