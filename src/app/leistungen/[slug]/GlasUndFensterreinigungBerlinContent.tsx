import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import PremiumCard from "@/components/premium/PremiumCard";
import PremiumButton from "@/components/premium/PremiumButton";
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

/**
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/glas-und-fensterreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * die übrigen individuell verfassten Leistungsseiten. Ersetzt bewusst die
 * früheren, nicht belegbaren Aussagen zu Höhenzugang/Ausrüstung für Fassaden
 * durch eine objektbezogene Zugänglichkeitsprüfung ohne pauschale Zusagen.
 */

const scopeCards = [
  {
    title: "Fensterflächen",
    description: "Reinigung zugänglicher Fensterflächen im vereinbarten Umfang.",
  },
  {
    title: "Fensterrahmen",
    description: "Reinigung von Rahmen und Falzen, sofern ausdrücklich vereinbart.",
  },
  {
    title: "Glastüren",
    description: "Entfernung sichtbarer Gebrauchsspuren und Fingerabdrücke.",
  },
  {
    title: "Glastrennwände",
    description: "Reinigung von Glasflächen in Büros, Praxen und Besprechungsräumen.",
  },
  {
    title: "Schaufenster",
    description: "Regelmäßige oder bedarfsgerechte Reinigung gewerblich genutzter Schaufenster.",
  },
  {
    title: "Eingangsanlagen",
    description: "Reinigung von Glasflächen an Türen und Eingangsbereichen.",
  },
  {
    title: "Vitrinen und Glasflächen",
    description: "Pflege frei zugänglicher Präsentationsflächen nach Vereinbarung.",
  },
  {
    title: "Innen- und Außenseiten",
    description: "Reinigung der vereinbarten Seiten abhängig von Zugang und baulicher Situation.",
  },
];

const frequencyItems = [
  "monatlich bei stark sichtbaren Schaufenstern",
  "vierteljährlich bei regelmäßig genutzten Büroflächen",
  "halbjährlich bei weniger belasteten Fenstern",
  "individuell nach Standort und Verschmutzung",
];

const supplementaryLinks = [
  { label: "Gebäudereinigung", href: "/leistungen/gebaeudereinigung-berlin" },
  { label: "Büroreinigung", href: "/leistungen/bueroreinigung-berlin" },
  { label: "Praxisreinigung", href: "/leistungen/praxisreinigung-berlin" },
  { label: "Grundreinigung", href: "/leistungen/grundreinigung-berlin" },
  { label: "Autohausreinigung", href: "/leistungen/autohausreinigung-berlin" },
];

const processSteps = [
  {
    title: "Anfrage",
    description: "Nennen Sie Objektart, Standort, Anzahl und ungefähre Größe der Glasflächen.",
  },
  {
    title: "Zugänglichkeit klären",
    description: "Wir prüfen Höhe, Erreichbarkeit, Rahmen und mögliche Hindernisse.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Scheiben, Rahmen, Falze und Innen- oder Außenseiten werden eindeutig vereinbart.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Angaben.",
  },
  {
    title: "Reinigung durchführen",
    description: "Die Arbeiten erfolgen im vereinbarten Zeitfenster.",
  },
];

const costFactors = [
  "Anzahl und Größe der Glasflächen",
  "Innen- und Außenseiten",
  "Rahmen und Falze",
  "Zugänglichkeit",
  "Höhe",
  "Verschmutzungsgrad",
  "Reinigungsintervall",
  "notwendige Vorbereitung",
  "Anfahrt und Objektlage",
];

const faqItems = [
  {
    question: "Was gehört zur Fensterreinigung?",
    answer: "Der genaue Umfang wird vereinbart. Möglich sind Scheiben, Rahmen, Falze, Fensterbänke und weitere Glasflächen.",
  },
  {
    question: "Sind Rahmen automatisch enthalten?",
    answer: "Nein. Rahmen und Falze müssen ausdrücklich Bestandteil des Angebots sein.",
  },
  {
    question: "Werden Fenster innen und außen gereinigt?",
    answer: "Je nach Vereinbarung und Zugänglichkeit können beide Seiten gereinigt werden.",
  },
  {
    question: "Reinigt Glanzwerk Schaufenster?",
    answer: "Ja, sofern Größe, Zugänglichkeit und Leistungsumfang abgestimmt wurden.",
  },
  {
    question: "Können hohe Fenster gereinigt werden?",
    answer: "Das wird anhand der konkreten Zugänglichkeit geprüft. Es werden keine nicht nachgewiesenen Höhenzugangsmöglichkeiten versprochen.",
  },
  {
    question: "Wie oft sollten Fenster gereinigt werden?",
    answer: "Das hängt von Lage, Nutzung, Witterung und gewünschtem Erscheinungsbild ab.",
  },
  {
    question: "Werden Glaswände in Büros gereinigt?",
    answer: "Ja, Glastrennwände und Glastüren können in den Leistungsumfang aufgenommen werden.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GlasUndFensterreinigungBerlinContent({
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
              Glanzwerk reinigt Fenster, Rahmen, Glastüren, Trennwände, Schaufenster und weitere
              erreichbare Glasflächen in Berliner Gewerbeobjekten. Umfang, Zugänglichkeit und
              Reinigungsintervalle werden vor Beginn abgestimmt.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PremiumButton href="/kontakt">Angebot anfragen</PremiumButton>
            <PremiumButton href="/preisrechner" variant="outline" className="bg-white/70 backdrop-blur-sm">
              Preis kostenlos berechnen
            </PremiumButton>
          </div>
        </div>
        <div className="relative z-[1] border-t border-black/[0.06] bg-white/85 backdrop-blur-sm">
          <div className="container-page grid grid-cols-1 gap-3 py-4 sm:grid-cols-3 sm:gap-4">
            {["Kostenlose Anfrage in wenigen Minuten", "Fester Ansprechpartner statt Callcenter", "Klare Absprachen ohne versteckte Kosten"].map(
              (label) => (
                <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-brand-900">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {label}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <Section background="tint" decor>
        <div className={midPhoto ? "grid gap-10 lg:grid-cols-2 lg:items-center" : undefined}>
          <div>
            <SectionHeading eyebrow="Erster Eindruck" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Fingerabdrücke, Staub, Regenrückstände und Straßenverschmutzungen werden auf Glas
                schnell sichtbar. Besonders in Eingangsbereichen, Besprechungsräumen,
                Verkaufsflächen und Praxen beeinflussen saubere Glasflächen den Gesamteindruck.
              </p>
              <p>
                Nicht jede Glasfläche ist gleich zugänglich. Deshalb klären wir vorab Größe, Höhe,
                Rahmen, Verschmutzungsgrad und mögliche Zugangsbeschränkungen.
              </p>
            </div>
          </div>
          {midPhoto && (
            <ParallaxImage
              photo={midPhoto}
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="shadow-xl shadow-brand-950/15"
            />
          )}
        </div>
      </Section>

      {/* Leistungen */}
      <Section background="white">
        <SectionHeading eyebrow="Möglicher Leistungsumfang" title={heading.sectionHeadings[1]} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scopeCards.map((card, index) => (
            <PremiumCard key={card.title} delay={index * 60}>
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      {/* Rahmen und Falze */}
      <Section background="muted">
        <SectionHeading eyebrow="Klare Abgrenzung" title={heading.sectionHeadings[2]} />
        <FadeIn className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Eine reine Glasreinigung umfasst nicht automatisch die vollständige Reinigung von
            Rahmen, Falzen, Fensterbänken oder angrenzenden Flächen. Deshalb wird vor Beginn
            eindeutig festgelegt, welche Bestandteile enthalten sind.
          </p>
        </FadeIn>
      </Section>

      {/* Zugänglichkeit */}
      <Section background="white">
        <SectionHeading eyebrow="Objektbezogene Prüfung" title={heading.sectionHeadings[3]} />
        <FadeIn className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Ebenerdig zugängliche Fenster stellen andere Anforderungen als hohe Fassadenflächen
            oder schwer erreichbare Glasbereiche. Vor der Angebotserstellung prüfen wir, ob die
            Flächen mit den verfügbaren Arbeitsmitteln sicher erreichbar sind.
          </p>
        </FadeIn>
      </Section>

      {/* Intervalle */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Orientierung, keine pauschale Vorgabe" title={heading.sectionHeadings[4]} />
        <FadeIn as="ul" className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {frequencyItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-xl border border-black/[0.06] bg-white px-4 py-3 text-sm text-ink-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_20px_-8px_rgb(7_26_58/0.12)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand-500">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </FadeIn>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Diese Angaben sind nur Orientierungen und keine pauschalen Vorgaben. Der tatsächliche
          Rhythmus wird individuell mit Ihnen abgestimmt.
        </p>
      </Section>

      {/* Materialgerechtes Arbeiten */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Material" title={heading.sectionHeadings[5]} />
        <FadeIn className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Beschichtete Gläser, Kunststoffrahmen, Aluminium, Holz und empfindliche Oberflächen
            benötigen unterschiedliche Verfahren. Glanzwerk verwendet je nach Material und
            Verschmutzung geeignete professionelle Produkte, unter anderem von Kiehl, Dr. Schnell
            und Buzil.
          </p>
        </FadeIn>
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {supplementaryLinks.map((link) => (
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

      {/* Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zur Durchführung" title={heading.sectionHeadings[6]} light />
        <FadeIn className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </FadeIn>
      </Section>

      {/* Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Fensterreinigung" title={heading.sectionHeadings[7]} />
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
          <PremiumButton href="/preisrechner">Preis kostenlos berechnen</PremiumButton>
          <PremiumButton href="/kontakt" variant="outline">
            Angebot anfragen
          </PremiumButton>
        </div>
      </Section>

      {/* Einsatzgebiete */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[8]} />
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
          Nach Absprache prüfen wir außerdem Aufträge in Potsdam, Schönefeld und weiteren gut
          erreichbaren Orten im Berliner Umland.
        </p>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="glas-fensterreinigung" />
        </FadeIn>
      </Section>

      {/* Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Teilen Sie uns Anzahl, Größe und Zugänglichkeit der Glasflächen mit. Wir prüfen die Angaben und erstellen ein passendes Angebot."
          primaryLabel="Angebot anfragen"
          primaryHref="/kontakt"
          secondaryLabel="Preis kostenlos berechnen"
          secondaryHref="/preisrechner"
          backgroundImage={contentPhotos?.ctaUnten}
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
