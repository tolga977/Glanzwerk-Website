import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import type { Service } from "@/data/services";
import type { SeoHeadingSet } from "@/data/seoHeadings";
import { districts } from "@/data/districts";
import { combos } from "@/data/combos";
import { siteConfig } from "@/data/site";
import { servicePhotos } from "@/data/servicePhotos";
import { serviceContentPhotos } from "@/data/serviceContentPhotos";
import { serviceMidPhotos } from "@/data/serviceMidPhotos";
import { serviceSchema } from "@/lib/schema";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import Button from "@/components/ui/Button";

/**
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/unterhaltsreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * die übrigen individuell verfassten Leistungsseiten: der Auftragstext folgt
 * einer eigenen Abschnittsstruktur, die sich nicht in das gemeinsame
 * Positions-Schema der übrigen Leistungsseiten pressen lässt.
 */

const scopeCards = [
  {
    title: "Bodenreinigung",
    description: "Kehren, Saugen oder Wischen der vorhandenen Bodenbeläge im vereinbarten Rhythmus.",
  },
  {
    title: "Oberflächenreinigung",
    description: "Abwischen frei zugänglicher Oberflächen, Ablagen und Arbeitsflächen.",
  },
  {
    title: "Sanitärreinigung",
    description: "Reinigung von Toiletten, Waschbecken, Armaturen und Spiegeln.",
  },
  {
    title: "Küchen- und Teeküchenreinigung",
    description: "Reinigung von Arbeitsflächen, Spülen und weiteren gemeinsam genutzten Küchenbereichen.",
  },
  {
    title: "Abfallentsorgung",
    description: "Leerung vereinbarter Abfallbehälter im festgelegten Turnus.",
  },
  {
    title: "Eingangsbereiche",
    description: "Pflege von Böden, Türen und frei zugänglichen Flächen am Gebäudeeingang.",
  },
  {
    title: "Gemeinschaftsflächen",
    description: "Reinigung von Fluren und weiteren gemeinschaftlich genutzten Bereichen im Objekt.",
  },
  {
    title: "Häufig berührte Kontaktflächen",
    description: "Reinigung von Türklinken, Lichtschaltern, Handläufen und weiteren häufig berührten Flächen.",
  },
];

const frequencyCards = [
  {
    title: "Täglich",
    description: "Für stark beanspruchte Büros, Praxen oder Sanitärbereiche.",
  },
  {
    title: "Mehrmals pro Woche",
    description: "Für regelmäßig genutzte Gewerberäume mit planbarem Besucheraufkommen.",
  },
  {
    title: "Wöchentlich",
    description: "Für kleinere oder weniger intensiv genutzte Flächen.",
  },
  {
    title: "Unterschiedliche Raumintervalle",
    description: "Einzelne Bereiche können in verschiedenen Rhythmen eingeplant werden.",
  },
];

const objectTypeLinks = [
  { label: "Büroreinigung", href: "/leistungen/bueroreinigung-berlin" },
  { label: "Praxisreinigung", href: "/leistungen/praxisreinigung-berlin" },
  { label: "Kanzleireinigung", href: "/leistungen/kanzleireinigung-berlin" },
  { label: "Autohausreinigung", href: "/leistungen/autohausreinigung-berlin" },
  { label: "Gastronomiereinigung", href: "/leistungen/gastronomiereinigung-berlin" },
  { label: "Gebäudereinigung", href: "/leistungen/gebaeudereinigung-berlin" },
];

const planItems = [
  "zu reinigende Räume",
  "enthaltene Leistungen",
  "Reinigungsintervalle",
  "Einsatzzeiten",
  "Zugangs- und Schlüsselregelungen",
];

const supplementaryLinks = [
  { label: "Grundreinigung", href: "/leistungen/grundreinigung-berlin" },
  { label: "Glas- und Fensterreinigung", href: "/leistungen/glas-und-fensterreinigung-berlin" },
  { label: "Treppenhausreinigung", href: "/leistungen/treppenhausreinigung-berlin" },
  { label: "Gebäudereinigung", href: "/leistungen/gebaeudereinigung-berlin" },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description:
      "Teilen Sie uns Objektart, Standort, ungefähre Fläche und das gewünschte Reinigungsintervall mit. Wir melden uns zeitnah mit den nächsten Schritten.",
  },
  {
    title: "Objekt und Bedarf abstimmen",
    description:
      "Wir klären die zu reinigenden Räume, gewünschten Leistungen und Zugangsregelungen. Auch Einsatzzeiten und besondere Hinweise werden besprochen.",
  },
  {
    title: "Leistungsplan festlegen",
    description:
      "Der vereinbarte Umfang wird schriftlich und nachvollziehbar festgehalten. So ist für beide Seiten klar, welche Arbeiten regelmäßig ausgeführt werden.",
  },
  {
    title: "Angebot erhalten",
    description:
      "Sie erhalten ein Angebot auf Grundlage des abgestimmten Leistungsplans. Rückfragen können vor der Freigabe jederzeit geklärt werden.",
  },
  {
    title: "Reinigung beginnen",
    description:
      "Nach Ihrer Freigabe startet die Reinigung zum vereinbarten Termin. Bei verändertem Bedarf lässt sich der Plan später anpassen.",
  },
];

const costFactors = [
  "Fläche",
  "Raumaufteilung",
  "Nutzung",
  "Anzahl der Sanitärbereiche",
  "Intervall",
  "Reinigungszeiten",
  "Bodenbeläge",
  "zusätzliche Leistungen",
];

/** Bezirke mit eigener Unterhaltsreinigung-Kombiseite – im Einsatzgebiet gezielt dorthin statt zur allgemeinen Bezirksseite verlinken. */
const comboDistrictSlugs = new Set(
  combos.filter((combo) => combo.serviceSlug === "unterhaltsreinigung-berlin").map((combo) => combo.districtSlug),
);

const faqItems = [
  {
    question: "Was ist eine Unterhaltsreinigung?",
    answer: "Regelmäßig wiederkehrende Reinigung nach einem festgelegten Leistungsplan.",
  },
  {
    question: "Welche Arbeiten sind enthalten?",
    answer: "Das hängt von der Vereinbarung ab. Typisch sind Böden, Oberflächen, Sanitäranlagen, Küchen und Abfallbehälter.",
  },
  {
    question: "Wie häufig wird gereinigt?",
    answer: "Täglich, mehrmals pro Woche, wöchentlich oder in einem individuellen Rhythmus.",
  },
  {
    question: "Sind zusätzliche Leistungen möglich?",
    answer: "Ja. Glas-, Grund- oder Treppenhausreinigung können ergänzt werden.",
  },
  {
    question: "Kann außerhalb der Geschäftszeiten gereinigt werden?",
    answer: "Je nach Objekt und Einsatzplanung sind abgestimmte Zeitfenster möglich.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Nutzung, Intervall, Raumaufteilung und Leistungsumfang.",
  },
  {
    question: "Kann der Reinigungsplan angepasst werden?",
    answer: "Ja, wenn sich Nutzung oder Bedarf verändern.",
  },
  {
    question: "Was passiert, wenn ich mit einem Termin einmal nicht zufrieden bin?",
    answer:
      "Sagen Sie uns kurz Bescheid. Berechtigte Beanstandungen bessern wir zeitnah nach – die genauen Bedingungen unseres Nachbesserungs-Versprechens stehen auf der Über-uns-Seite.",
    relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder ${siteConfig.email}.`,
  },
];

export default function UnterhaltsreinigungBerlinContent({
  service,
  heading,
}: {
  service: Service;
  heading: SeoHeadingSet;
}) {
  const photo = servicePhotos[service.slug];
  const contentPhotos = serviceContentPhotos[service.slug];
  const midPhoto = serviceMidPhotos[service.slug];

  return (
    <>
      <Breadcrumb items={[{ label: "Leistungen", href: "/leistungen" }, { label: service.shortTitle }]} />
      <JsonLd
        data={serviceSchema({
          name: heading.metaTitle ?? heading.h1,
          description: service.metaDescription,
          path: `/leistungen/${service.slug}`,
        })}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white">
        {photo && (
          <div className="absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: contentPhotos?.hero.objectPosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/15 sm:from-white sm:via-white/75 sm:to-white/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/10 to-transparent sm:hidden" />
          </div>
        )}
        <div
          className={`relative z-[1] container-page flex flex-col justify-center py-16 lg:py-20 ${
            photo ? "min-h-[520px] lg:min-h-[620px]" : ""
          }`}
        >
          <div className="max-w-xl">
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk übernimmt regelmäßig wiederkehrende Reinigungsarbeiten in Büros, Praxen,
              Kanzleien, Gewerbeimmobilien und weiteren betrieblich genutzten Räumen. Leistungen,
              Intervalle und Einsatzzeiten werden passend zum Objekt vereinbart.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/kontakt">
              Unverbindliches Angebot anfragen
            </Button>
            <Button href="/preisrechner" variant="outline">
              Preis kostenlos berechnen
            </Button>
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <Section background="tint" decor>
        <div className={midPhoto ? "grid gap-10 lg:grid-cols-2 lg:items-center" : undefined}>
          <div>
            <SectionHeading eyebrow="Fester Rhythmus statt spontaner Einsätze" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Unterhaltsreinigung bezeichnet wiederkehrende Arbeiten, die in festgelegten
                Abständen durchgeführt werden. Ziel ist, Räume dauerhaft gepflegt zu halten und
                alltägliche Verschmutzungen regelmäßig zu entfernen.
              </p>
              <p>
                Nicht jede Fläche muss bei jedem Einsatz gereinigt werden. Stark genutzte Bereiche
                können häufiger berücksichtigt werden als Nebenräume. Deshalb erstellen wir einen
                Reinigungsplan, der zur tatsächlichen Nutzung passt.
              </p>
            </div>
          </div>
          {midPhoto && (
            <ParallaxImage
              photo={midPhoto}
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="shadow-deep"
            />
          )}
        </div>
      </Section>

      {/* Ausgangslage */}
      <Section background="warm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          <h2 className="font-display display-lg text-2xl font-medium text-brand-900 sm:text-3xl">
            {heading.sectionHeadings[1]}
          </h2>
          <ul className="divide-y divide-line">
            {service.challenges.map((challenge) => (
              <li key={challenge} className="measure py-4 text-base leading-relaxed text-ink-soft first:pt-0 last:pb-0">
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Leistungen */}
      <Section background="white">
        <SectionHeading eyebrow="Möglicher Leistungsumfang" title={heading.sectionHeadings[2]} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scopeCards.map((card, index) => (
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

      {/* Intervalle */}
      <Section background="muted">
        <SectionHeading eyebrow="Passender Rhythmus" title={heading.sectionHeadings[3]} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {frequencyCards.map((card, index) => (
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

      {/* Objektarten */}
      <Section background="white">
        <SectionHeading eyebrow="Passend zu Ihrem Objekt" title={heading.sectionHeadings[4]} />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {objectTypeLinks.map((link) => (
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

      {/* Zielgruppen und Vorteile */}
      <Section background="muted">
        <SectionHeading eyebrow="Für wen sich der feste Rhythmus lohnt" title={heading.sectionHeadings[5]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-medium text-brand-900">Besonders gefragt bei</h3>
            <ul className="mt-5 space-y-2.5">
              {service.audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-control border border-line bg-white px-4 py-2.5 text-sm font-medium text-brand-900"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-medium text-brand-900">Der Vorteil eines festen Plans</h3>
            <ul className="mt-5 space-y-2.5">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand-500">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Reinigungsplan */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Klare Abstimmung vor Beginn" title={heading.sectionHeadings[6]} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {planItems.map((item) => (
            <div
              key={item}
              className="rounded-control border border-line bg-white px-4 py-3 text-sm font-medium text-brand-900"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      {/* Zugang und Ablauf am Reinigungstag */}
      <Section background="white">
        <SectionHeading eyebrow="Reibungsloser Ablauf vor Ort" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Je nach Objekt findet die Reinigung während der Öffnungszeiten, in einer ruhigeren
            Randzeit oder außerhalb der Geschäftszeiten statt. Welche Variante passt, richtet sich
            danach, wie das Objekt genutzt wird und wer zu welcher Zeit vor Ort ist – das wird vor
            Vertragsbeginn festgelegt.
          </p>
          <p>
            Damit die vereinbarte Zeit effizient genutzt werden kann, hilft es, wenn Schreibtische
            und Ablageflächen zum Termin einigermaßen frei zugänglich sind und persönliche
            Wertgegenstände nicht offen liegen. Zugangsregelungen – etwa Schlüssel, Transponder
            oder Codes – werden vorab schriftlich festgehalten.
          </p>
        </div>
      </Section>

      {/* Abgrenzung Facility Management */}
      <Section background="muted">
        <SectionHeading eyebrow="Klare Leistungsgrenze" title={heading.sectionHeadings[8]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Unterhaltsreinigung deckt die regelmäßige Pflege von Böden, Oberflächen, Sanitär-
            und Küchenbereichen ab. Technische Gebäudeinstandhaltung – etwa die Wartung von
            Heizungs- oder Lüftungsanlagen, kleinere Reparaturen oder der Winterdienst – gehört
            nicht automatisch dazu und wird, wenn benötigt, als eigene Leistung besprochen.
          </p>
          <p>
            Diese Trennung ist keine Formalität, sondern schafft von Anfang an Klarheit darüber,
            wofür der vereinbarte Reinigungsvertrag tatsächlich gilt und wer bei technischen
            Anliegen der richtige Ansprechpartner ist.
          </p>
        </div>
      </Section>

      {/* Absprachen über die Zeit */}
      <Section background="white">
        <SectionHeading eyebrow="Verlässliche Grundlage" title={heading.sectionHeadings[9]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Ein schriftlicher Reinigungsplan hält fest, welche Flächen in welchem Rhythmus
            gereinigt werden. Diese Übersicht dient während der gesamten Zusammenarbeit als
            gemeinsamer Bezugspunkt – etwa wenn eine neue Kollegin im Unternehmen erstmals mit der
            Reinigung zu tun hat oder wenn nach längerer Zeit ein Detail geklärt werden muss.
          </p>
          <p>
            Ändert sich die Nutzung Ihres Objekts, etwa durch mehr Mitarbeitende oder eine neue
            Raumaufteilung, wird der bestehende Plan angepasst, statt die Zusammenarbeit von Grund
            auf neu zu verhandeln.
          </p>
        </div>
      </Section>

      {/* Qualitätssicherung über die Zeit */}
      <Section background="muted">
        <SectionHeading eyebrow="Kontinuität über viele Termine" title={heading.sectionHeadings[10]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Eine Unterhaltsreinigung wird über Wochen und Monate hinweg von denselben oder
            wechselnden Kräften ausgeführt. Damit die Qualität dabei gleich bleibt, orientiert sich
            das Team am schriftlich festgehaltenen Reinigungsplan statt an individuellem Ermessen –
            so lässt sich jederzeit nachvollziehen, was zu welchem Termin gehört.
          </p>
          <p>
            Rückmeldungen zu einzelnen Terminen erreichen uns über einen festen Ansprechpartner.
            So lässt sich schnell klären, ob eine Abweichung einmalig war oder der Plan angepasst
            werden sollte.
          </p>
        </div>
      </Section>

      {/* Umzug/Erweiterung */}
      <Section background="white">
        <SectionHeading eyebrow="Wenn sich das Objekt ändert" title={heading.sectionHeadings[11]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Zieht Ihr Unternehmen in neue Räume um oder kommen zusätzliche Flächen hinzu, wird der
            bestehende Reinigungsplan entsprechend erweitert oder neu abgestimmt, statt die
            Zusammenarbeit komplett neu aufzusetzen.
          </p>
          <p>
            Der feste Ansprechpartner bleibt dabei in der Regel bestehen, auch wenn sich Fläche
            oder Adresse ändern – das erspart Ihnen, Zuständigkeiten und Absprachen ein zweites Mal
            von vorne zu klären.
          </p>
        </div>
      </Section>

      {/* Abgrenzung Grundreinigung */}
      <Section background="muted">
        <SectionHeading eyebrow="Häufig verwechselt" title={heading.sectionHeadings[12]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Unterhaltsreinigung und Grundreinigung verfolgen unterschiedliche Ziele. Die
            Unterhaltsreinigung hält ein bereits gepflegtes Objekt im laufenden Betrieb sauber und
            wird in festen Intervallen wiederholt. Die Grundreinigung entfernt dagegen tiefsitzenden,
            über längere Zeit angesammelten Schmutz, der im normalen Reinigungsrhythmus nicht erfasst
            wird.
          </p>
          <p>
            In der Praxis ergänzen sich beide Leistungen: Eine turnusmäßige Grundreinigung schafft
            die Grundlage, auf der die Unterhaltsreinigung den erreichten Zustand halten kann. Ob und
            wann eine Grundreinigung sinnvoll ist, hängt vom Zustand des Objekts und der bisherigen
            Pflege ab.{" "}
            <Link href="/leistungen/grundreinigung-berlin" className="font-semibold text-brand-500 hover:underline">
              Mehr zur Grundreinigung
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Ergänzende Leistungen */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Bei Bedarf erweiterbar" title={heading.sectionHeadings[13]} />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {supplementaryLinks.map((link) => (
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

      {/* Materialschutz */}
      <Section background="muted">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[14]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Glanzwerk verwendet je nach Einsatzbereich professionelle Reinigungsprodukte, unter
            anderem von Kiehl, Dr. Schnell und Buzil. Dosierung und Verfahren richten sich nach
            Oberfläche, Verschmutzung und tatsächlichem Bedarf.
          </p>
          <p>
            Desinfektionsmittel werden nur dort eingesetzt, wo sie vereinbart oder hygienisch
            erforderlich sind.
          </p>
        </div>
      </Section>

      {/* Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[15]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Unterhaltsreinigung" title={heading.sectionHeadings[16]} />
        <p className="mt-6 max-w-3xl text-sm font-semibold text-brand-900">Folgende Faktoren beeinflussen den Preis:</p>
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

      {/* Berlin */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[17]} />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {districts.map((district) => (
            <Link
              key={district.slug}
              href={
                comboDistrictSlugs.has(district.slug)
                  ? `/leistungen/${service.slug}/${district.slug}`
                  : `/standorte/${district.slug}`
              }
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              {district.name}
            </Link>
          ))}
        </FadeIn>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Nach Absprache prüfen wir außerdem Aufträge in Potsdam, Schönefeld und weiteren gut
          erreichbaren Orten im Berliner Umland.
        </p>
      </Section>

      {/* Testphase */}
      <Section background="muted">
        <CTASection
          title={heading.secondaryCtaHeading}
          subtitle="Sie möchten zunächst feststellen, ob Reinigungsleistung, Kommunikation und Abläufe zu Ihrem Objekt passen? Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung. Umfang, Termine und Bedingungen werden vor Beginn schriftlich abgestimmt."
          primaryLabel="Testphase anfragen"
          primaryHref="/3-monate-testen"
          secondaryLabel="Angebot erhalten"
          secondaryHref="/kontakt"
        />
      </Section>

      {/* FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="unterhaltsreinigung" />
        </FadeIn>
      </Section>

      {/* Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Objektart, Standort, Fläche und gewünschten Rhythmus. Wir prüfen Ihre Angaben und stimmen die nächsten Schritte ab."
          primaryLabel="Unverbindliches Angebot anfragen"
          primaryHref="/kontakt"
          secondaryLabel="Preis kostenlos berechnen"
          secondaryHref="/preisrechner"
          backgroundImage={contentPhotos?.ctaUnten}
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
