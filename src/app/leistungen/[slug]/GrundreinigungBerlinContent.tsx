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
import { siteConfig } from "@/data/site";
import { servicePhotos } from "@/data/servicePhotos";
import { serviceContentPhotos } from "@/data/serviceContentPhotos";
import { serviceMidPhotos } from "@/data/serviceMidPhotos";
import { serviceSchema } from "@/lib/schema";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import Button from "@/components/ui/Button";

/**
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/grundreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * GebaeudereinigungBerlinContent.tsx / BueroreinigungBerlinContent.tsx /
 * PraxisreinigungBerlinContent.tsx / KanzleireinigungBerlinContent.tsx /
 * TreppenhausreinigungBerlinContent.tsx: der Auftragstext folgt einer eigenen
 * Abschnittsstruktur, die sich nicht in das gemeinsame Positions-Schema der
 * übrigen Leistungsseiten pressen lässt. Anders als bei den anderen Leistungen
 * enthält der Auftrag hier bewusst keine Testphasen-Sektion, da die
 * Grundreinigung eine Einmalleistung ist (siehe bereits vorhandene
 * oneOffServiceSlugs-Logik im generischen Template).
 */

const scopeCards = [
  {
    title: "Intensive Bodenreinigung",
    description: "Bearbeitung stark verschmutzter Hartböden mit einem geeigneten Verfahren.",
  },
  {
    title: "Entfernung hartnäckiger Rückstände",
    description: "Gezielte Behandlung von Verschmutzungen, die durch die regelmäßige Reinigung nicht ausreichend entfernt werden.",
  },
  {
    title: "Reinigung von Kanten und Ecken",
    description: "Bearbeitung schwer erreichbarer Randbereiche und Übergänge.",
  },
  {
    title: "Reinigung von Türen und Rahmen",
    description: "Intensive Pflege vereinbarter Türen, Zargen und Griffbereiche.",
  },
  {
    title: "Reinigung von Sockelleisten",
    description: "Entfernung von Staub und Rückständen auf frei zugänglichen Sockeln.",
  },
  {
    title: "Intensive Sanitärreinigung",
    description: "Gründliche Reinigung vereinbarter Sanitärflächen und Einrichtungen.",
  },
  {
    title: "Reinigung frei zugänglicher Oberflächen",
    description: "Bearbeitung von Fensterbänken, Ablagen und weiteren abgestimmten Flächen.",
  },
  {
    title: "Abschluss- und Übergabereinigung",
    description: "Reinigung vor Übergaben, nach Umzügen oder bei einer veränderten Nutzung.",
  },
];

const occasionItems = [
  "vor oder nach einem Mieterwechsel",
  "nach Umbau- oder Renovierungsarbeiten",
  "bei hartnäckigen Bodenrückständen",
  "vor wichtigen Veranstaltungen oder Terminen",
  "nach längerer eingeschränkter Nutzung",
  "als Ergänzung zur regelmäßigen Unterhaltsreinigung",
];

const processSteps = [
  {
    title: "Anfrage",
    description: "Nennen Sie Objektart, Standort, Fläche und Anlass der Grundreinigung.",
  },
  {
    title: "Einschätzung",
    description: "Wir klären Materialien, Verschmutzungen, Zugänglichkeit und gewünschte Leistungen.",
  },
  {
    title: "Besichtigung bei Bedarf",
    description: "Bei größeren oder schwer einzuschätzenden Flächen kann eine Besichtigung sinnvoll sein.",
  },
  {
    title: "Angebot",
    description: "Sie erhalten ein Angebot auf Grundlage des abgestimmten Umfangs.",
  },
  {
    title: "Durchführung",
    description: "Die Grundreinigung erfolgt im vereinbarten Zeitfenster.",
  },
];

const costFactors = [
  "Flächengröße",
  "Bodenbeläge und Materialien",
  "Verschmutzungsgrad",
  "Anzahl der Räume",
  "Zugänglichkeit",
  "benötigte Verfahren",
  "gewünschter Leistungsumfang",
  "Reinigungszeit",
  "ergänzende Glas- oder Fensterreinigung",
];

const supplementaryLinks = [
  { label: "Unterhaltsreinigung", href: "/leistungen/unterhaltsreinigung-berlin" },
  { label: "Gebäudereinigung", href: "/leistungen/gebaeudereinigung-berlin" },
  { label: "Glas- und Fensterreinigung", href: "/leistungen/glas-und-fensterreinigung-berlin" },
  { label: "Büroreinigung", href: "/leistungen/bueroreinigung-berlin" },
];

const faqItems = [
  {
    question: "Was ist eine Grundreinigung?",
    answer: "Eine Grundreinigung umfasst intensivere Arbeiten, die über die regelmäßig ausgeführte Unterhaltsreinigung hinausgehen.",
  },
  {
    question: "Wann ist eine Grundreinigung sinnvoll?",
    answer: "Zum Beispiel bei hartnäckigen Rückständen, nach Umbauten, vor Übergaben oder bei einer veränderten Nutzung.",
  },
  {
    question: "Werden alle Flecken vollständig entfernt?",
    answer:
      "Das hängt von Material, Alter, Art und Tiefe der Verschmutzung ab. Eine vollständige Entfernung kann nicht pauschal garantiert werden.",
  },
  {
    question: "Muss das Objekt besichtigt werden?",
    answer: "Bei größeren oder schwer einzuschätzenden Flächen kann eine Besichtigung sinnvoll sein.",
  },
  {
    question: "Wird die Grundreinigung außerhalb der Geschäftszeiten durchgeführt?",
    answer: "Je nach Objekt und Einsatzplanung können passende Zeitfenster abgestimmt werden.",
  },
  {
    question: "Wie lange dauert eine Grundreinigung?",
    answer: "Die Dauer hängt von Fläche, Verschmutzung, Verfahren und Leistungsumfang ab.",
  },
  {
    question: "Können Fenster mitgereinigt werden?",
    answer: "Ja, die Glas- und Fensterreinigung kann ergänzend vereinbart werden.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GrundreinigungBerlinContent({
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
              Glanzwerk übernimmt Grundreinigungen in Büros, Praxen, Kanzleien, Gewerbeobjekten und
              gemeinschaftlich genutzten Gebäudebereichen. Die Arbeiten werden passend zu
              Bodenbelägen, Oberflächen, Verschmutzungsgrad und gewünschtem Ergebnis geplant.
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
            <SectionHeading eyebrow="Über die laufende Reinigung hinaus" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Bei der laufenden Unterhaltsreinigung werden regelmäßig anfallende Verschmutzungen
                entfernt. Mit der Zeit können dennoch hartnäckige Rückstände, Pflegefilme oder
                Verschmutzungen in schwer erreichbaren Bereichen entstehen.
              </p>
              <p>
                Eine Grundreinigung geht über die üblichen laufenden Arbeiten hinaus. Welche
                Flächen intensiv bearbeitet werden, wird vor Beginn genau festgelegt.
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

      {/* Leistungen */}
      <Section background="white">
        <SectionHeading eyebrow="Möglicher Leistungsumfang" title={heading.sectionHeadings[1]} />
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

      {/* Anlässe */}
      <Section background="muted">
        <SectionHeading eyebrow="Typische Anlässe" title={heading.sectionHeadings[2]} />
        <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {occasionItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5 rounded-control border border-line bg-white px-4 py-3 text-sm text-ink-soft">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand-500">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Abgrenzung */}
      <Section background="white">
        <SectionHeading eyebrow="Klare Unterscheidung" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Unterhaltsreinigung umfasst regelmäßig wiederkehrende Arbeiten. Die Grundreinigung
            wird dagegen gezielt für intensivere Verschmutzungen und zusätzliche Flächen
            eingeplant.
          </p>
          <p>
            Nicht jede Grundreinigung umfasst automatisch alle Räume und Oberflächen. Der konkrete
            Leistungsumfang wird objektbezogen vereinbart.
          </p>
        </div>
      </Section>

      {/* Planung */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Materialgerechtes Vorgehen" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Bodenbeläge und Oberflächen reagieren unterschiedlich auf Wasser, Reinigungsmittel und
            mechanische Bearbeitung. Deshalb müssen Material, Zustand und Verschmutzungsgrad
            berücksichtigt werden.
          </p>
          <p>
            Glanzwerk verwendet je nach Einsatzbereich professionelle Produkte, unter anderem von
            Kiehl, Dr. Schnell und Buzil. Es werden keine Ergebnisse versprochen, die ohne
            vorherige Prüfung nicht realistisch beurteilt werden können.
          </p>
        </div>
      </Section>

      {/* Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zur Durchführung" title={heading.sectionHeadings[5]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Grundreinigung" title={heading.sectionHeadings[6]} />
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
        <p className="mt-6 text-sm text-ink-soft">
          Ergänzende Leistungen:{" "}
          {supplementaryLinks.map((link, index) => (
            <span key={link.href}>
              <Link href={link.href} className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                {link.label}
              </Link>
              {index < supplementaryLinks.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </Section>

      {/* Berlin-Bezug */}
      <Section background="white">
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[7]} />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {districts.map((district) => (
            <Link
              key={district.slug}
              href={`/standorte/${district.slug}`}
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

      {/* FAQ */}
      <Section background="muted">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="grundreinigung" />
        </FadeIn>
      </Section>

      {/* Abschluss-CTA */}
      <Section background="white">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Fläche, Material, Verschmutzung und Anlass. Wir prüfen die Angaben und klären, ob eine Besichtigung erforderlich ist."
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
