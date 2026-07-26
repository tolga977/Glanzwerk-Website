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

/**
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/praxisreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * GebaeudereinigungBerlinContent.tsx / BueroreinigungBerlinContent.tsx: der
 * Auftragstext folgt einer eigenen Abschnittsstruktur, die sich nicht in das
 * gemeinsame Positions-Schema der übrigen Leistungsseiten pressen lässt. Die
 * anderen Leistungsseiten durchlaufen weiterhin unverändert den generischen
 * Zweig in page.tsx.
 */

const scopeCards = [
  {
    title: "Empfangsbereich",
    description: "Reinigung von Böden, frei zugänglichen Oberflächen, Türen und häufig genutzten Kontaktflächen.",
  },
  {
    title: "Wartezimmer",
    description: "Pflege von Böden, Sitzbereichen, Ablagen und weiteren vereinbarten Flächen.",
  },
  {
    title: "Behandlungsräume",
    description: "Reinigung frei zugänglicher Flächen, Böden und der abgestimmten Bereiche innerhalb der Behandlungszimmer.",
  },
  {
    title: "Sanitäranlagen",
    description: "Reinigung von Toiletten, Waschbecken, Armaturen, Spiegeln und weiteren Sanitäreinrichtungen.",
  },
  {
    title: "Flure und Laufwege",
    description: "Reinigung stark genutzter Verkehrsflächen innerhalb der Praxis.",
  },
  {
    title: "Personal- und Aufenthaltsräume",
    description: "Pflege von Küchenbereichen, Tischen, Böden und weiteren gemeinsam genutzten Flächen.",
  },
  {
    title: "Abfallbehälter",
    description: "Leerung der vereinbarten Abfallbehälter unter Berücksichtigung der im Objekt vorgesehenen Trennung.",
  },
  {
    title: "Häufig berührte Flächen",
    description: "Reinigung von Türklinken, Schaltern, Handläufen und weiteren abgestimmten Kontaktflächen.",
  },
];

const disinfectionCards = [
  {
    title: "Reguläre Reinigung",
    description: "Entfernung von Staub, Schmutz und alltäglichen Rückständen auf vereinbarten Flächen.",
  },
  {
    title: "Vereinbarte Desinfektion",
    description: "Gezielter Einsatz in Bereichen, für die eine Desinfektion ausdrücklich festgelegt wurde.",
  },
  {
    title: "Dokumentierte Anforderungen",
    description: "Besondere Hinweise und vereinbarte Abläufe werden dem jeweiligen Objekt zugeordnet.",
  },
];

const frequencyCards = [
  {
    title: "Tägliche Reinigung",
    description: "Häufig sinnvoll bei regelmäßigem Patientenverkehr und intensiv genutzten Behandlungs- und Sanitärbereichen.",
  },
  {
    title: "Mehrmals pro Woche",
    description: "Kann bei kleineren Einrichtungen oder einzelnen weniger stark genutzten Bereichen ausreichen.",
  },
  {
    title: "Unterschiedliche Raumintervalle",
    description: "Behandlungsräume, Wartezimmer und Nebenräume können in unterschiedlichen Rhythmen eingeplant werden.",
  },
  {
    title: "Anpassbarer Reinigungsplan",
    description: "Ändert sich die Auslastung oder Nutzung, können Leistungen und Intervalle nach Abstimmung angepasst werden.",
  },
];

const supplementaryCards = [
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung von Fenstern, Rahmen, Glastüren, Trennwänden und weiteren Glasflächen.",
    linkLabel: "Mehr zur Glas- und Fensterreinigung",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung stark beanspruchter Böden und weiterer Flächen mit hartnäckigen Rückständen.",
    linkLabel: "Mehr zur Grundreinigung",
    href: "/leistungen/grundreinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Regelmäßig wiederkehrende Reinigung für dauerhaft gepflegte Praxisräume.",
    linkLabel: "Mehr zur Unterhaltsreinigung",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Gebäudereinigung",
    description: "Ergänzende Reinigung weiterer Flächen innerhalb medizinisch oder gewerblich genutzter Gebäude.",
    linkLabel: "Mehr zur Gebäudereinigung",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie uns Standort, Praxisart, ungefähre Fläche und das gewünschte Reinigungsintervall mit.",
  },
  {
    title: "Anforderungen besprechen",
    description: "Wir klären Empfang, Wartezimmer, Behandlungsräume, Sanitärbereiche, Reinigungszeiten und besondere Hinweise.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Regelmäßige Reinigungsarbeiten und gegebenenfalls vereinbarte Desinfektionsleistungen werden eindeutig voneinander getrennt beschrieben.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen und Intervalle.",
  },
  {
    title: "Praxisreinigung starten",
    description: "Nach Ihrer Freigabe beginnt die Reinigung zum vereinbarten Termin. Bei verändertem Bedarf kann der Reinigungsplan später angepasst werden.",
  },
];

const costFactors = [
  "Größe der zu reinigenden Fläche",
  "Art der medizinischen oder therapeutischen Einrichtung",
  "Anzahl der Behandlungsräume",
  "Größe und Anzahl der Sanitärbereiche",
  "Patienten- und Besucheraufkommen",
  "gewünschte Reinigungshäufigkeit",
  "vereinbarte Desinfektionsleistungen",
  "Bodenbeläge und Oberflächen",
  "Zugänglichkeit und Reinigungszeiten",
  "zusätzliche Leistungen wie Glas- oder Grundreinigung",
];

const whyGlanzwerkIcons = {
  team: (
    <>
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 14.6c1.7.3 3 1.7 3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  checklist: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5l1.5 1.5 3-3M8 15l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9h2M14.5 15.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  selection: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.3 12.3l2.4 2.4 5-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 8h1.5M14 8h1.5M8.5 12h1.5M14 12h1.5M8.5 16h1.5M14 16h1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  feedback: (
    <>
      <path d="M4.5 5.5h15v10h-8l-3.5 3v-3h-3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.3 10.3l2 2 4.4-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} as const;

const whyGlanzwerkCards = [
  {
    title: "Fester Ansprechpartner",
    description: "Sie haben eine feste Kontaktperson für Fragen, Änderungen und Rückmeldungen.",
    icon: "team" as const,
  },
  {
    title: "Abgestimmte Einsatzzeiten",
    description: "Die Reinigung wird passend zu Sprechzeiten und Zugangsregelungen geplant.",
    icon: "clock" as const,
  },
  {
    title: "Klare Leistungsbeschreibung",
    description: "Sie wissen, welche Räume und Arbeiten im vereinbarten Umfang enthalten sind.",
    icon: "checklist" as const,
  },
  {
    title: "Trennung von Reinigung und Desinfektion",
    description: "Desinfektionsleistungen werden nur dort eingeplant, wo sie vereinbart oder erforderlich sind.",
    icon: "selection" as const,
  },
  {
    title: "Objektbezogene Planung",
    description: "Raumart, Nutzung und besondere Hinweise werden im Reinigungsplan berücksichtigt.",
    icon: "building" as const,
  },
  {
    title: "Direkte Klärung bei Rückmeldungen",
    description: "Hinweise werden dem konkreten Objekt und Leistungsumfang zugeordnet.",
    icon: "feedback" as const,
  },
];

const faqItems = [
  {
    question: "Was gehört zu einer Praxisreinigung?",
    answer:
      "Der genaue Umfang wird individuell festgelegt. Typische Leistungen sind die Reinigung von Empfang, Wartezimmern, Behandlungsräumen, Sanitäranlagen, Böden, frei zugänglichen Oberflächen und häufig berührten Kontaktflächen.",
  },
  {
    question: "Übernimmt Glanzwerk auch Desinfektionsarbeiten?",
    answer:
      "Ja, wenn diese ausdrücklich vereinbart oder hygienisch erforderlich sind. Reinigung und Desinfektion werden im Leistungsumfang klar voneinander getrennt.",
  },
  {
    question: "Muss in jeder Praxis täglich gereinigt werden?",
    answer:
      "Nicht zwingend. Die passende Häufigkeit hängt von Praxisart, Patientenzahl, Raumaufteilung und Nutzung ab. Stark beanspruchte Bereiche benötigen in der Regel kürzere Intervalle als wenig genutzte Nebenräume.",
  },
  {
    question: "Reinigt Glanzwerk außerhalb der Sprechzeiten?",
    answer:
      "Ja. Je nach Einrichtung und Einsatzplanung kann die Reinigung vor Praxisbeginn, nach dem letzten Termin oder innerhalb anderer fest vereinbarter Zeitfenster stattfinden.",
  },
  {
    question: "Werden medizinische Geräte gereinigt?",
    answer:
      "Der Umgang mit medizinischen Geräten und empfindlichen technischen Flächen muss ausdrücklich abgestimmt werden. Standardmäßig konzentriert sich die Reinigung auf die vereinbarten Raum- und Oberflächenbereiche.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer:
      "Der Preis richtet sich unter anderem nach Fläche, Praxisart, Anzahl der Räume, Sanitärbereichen, Reinigungsintervall, vereinbarten Desinfektionsleistungen und Reinigungszeiten.",
  },
  {
    question: "Muss die Praxis vorab besichtigt werden?",
    answer:
      "Nicht in jedem Fall. Bei größeren, komplexen oder besonders genutzten Einrichtungen kann eine Besichtigung sinnvoll sein, um den Aufwand realistisch einzuschätzen.",
  },
  {
    question: "Können Fenster und Glasflächen mitgereinigt werden?",
    answer:
      "Ja. Die Glas- und Fensterreinigung kann als ergänzende Leistung in regelmäßigen oder individuell vereinbarten Abständen eingeplant werden.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer:
      "Ja. Für die laufende Abstimmung erhalten Sie eine feste Kontaktperson, die Fragen und Änderungen Ihrem Objekt zuordnen kann.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Nutzen Sie das Kontaktformular oder den Preisrechner, rufen Sie uns unter ${siteConfig.phone} an oder schreiben Sie an ${siteConfig.email}. Hilfreich sind Angaben zu Praxisart, Standort, Fläche, Anzahl der Räume und gewünschtem Reinigungsintervall.`,
  },
];

export default function PraxisreinigungBerlinContent({
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
            <p className="mb-4 inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-500">
              Reinigung für Arztpraxen und medizinische Einrichtungen
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk übernimmt die regelmäßige Reinigung von Arztpraxen, Therapiepraxen,
              medizinischen Versorgungszentren und weiteren gesundheitlich genutzten Einrichtungen
              in Berlin. Reinigungsumfang, Intervalle und Einsatzzeiten werden passend zu den
              Räumen und zum Praxisalltag festgelegt.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Unverbindliches Angebot anfragen
            </Link>
            <Link
              href="/preisrechner"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 bg-white/70 px-6 text-sm font-semibold text-brand-900 backdrop-blur-sm transition-colors hover:bg-brand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Preis kostenlos berechnen
            </Link>
          </div>
        </div>
        <div className="relative z-[1] border-t border-black/[0.06] bg-white/85 backdrop-blur-sm">
          <div className="container-page grid grid-cols-1 gap-3 py-4 sm:grid-cols-3 sm:gap-4">
            {["Flexible Reinigungszeiten", "Fester Ansprechpartner", "Einsatz in allen zwölf Berliner Bezirken"].map(
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

      {/* 2. Einleitung */}
      <Section background="tint" decor>
        <div className={midPhoto ? "grid gap-10 lg:grid-cols-2 lg:items-center" : undefined}>
          <div>
            <SectionHeading eyebrow="Reinigung im laufenden Praxisbetrieb" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                In medizinisch genutzten Räumen treffen viele Menschen aufeinander. Empfang,
                Wartezimmer, Behandlungsräume, Sanitäranlagen und Laufwege werden unterschiedlich
                stark beansprucht. Gleichzeitig müssen Reinigungsarbeiten so organisiert werden,
                dass der Praxisbetrieb möglichst wenig gestört wird.
              </p>
              <p>
                Deshalb stimmen wir vor dem Start nicht nur die Flächen und Leistungen ab, sondern
                auch Behandlungszeiten, Zugangsregelungen und sensible Bereiche. Je nach Bedarf
                kann die Reinigung vor Praxisbeginn, nach dem letzten Termin oder innerhalb fest
                vereinbarter Zeitfenster stattfinden.
              </p>
              <p>
                Der genaue Reinigungsplan richtet sich nach Raumart, Nutzung, Besucheraufkommen und
                den mit Ihnen vereinbarten Anforderungen.
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

      {/* 3. Leistungen der Praxisreinigung */}
      <Section background="white">
        <SectionHeading
          eyebrow="Möglicher Leistungsumfang"
          title={heading.sectionHeadings[1]}
          subtitle="Der konkrete Umfang wird für jede Einrichtung individuell festgelegt. Die folgenden Leistungen können Bestandteil der regelmäßigen Praxisreinigung sein."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scopeCards.map((card, index) => (
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

      {/* 4. Reinigung und Desinfektion */}
      <Section background="muted">
        <SectionHeading eyebrow="Klare Unterscheidung" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Eine gründliche Reinigung entfernt sichtbare Verschmutzungen und reduziert Rückstände
            auf Oberflächen. Eine Desinfektion verfolgt einen anderen Zweck und wird nur dort
            eingesetzt, wo sie hygienisch erforderlich oder ausdrücklich vereinbart ist.
          </p>
          <p>
            Nicht jede Fläche muss bei jedem Einsatz desinfiziert werden. Welche Bereiche
            berücksichtigt werden, hängt von der Nutzung, den Vorgaben der Einrichtung und dem
            abgestimmten Leistungsumfang ab.
          </p>
          <p>
            Wir trennen deshalb klar zwischen regulärer Reinigung und vereinbarten
            Desinfektionsarbeiten. Desinfektionsmittel werden gezielt eingesetzt und nicht
            pauschal auf allen Flächen verwendet.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {disinfectionCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Reinigungsintervalle */}
      <Section background="white">
        <SectionHeading eyebrow="Passender Rhythmus für die Praxis" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die benötigte Häufigkeit hängt von Praxisart, Patientenzahl, Raumaufteilung und Nutzung
            ab. Empfang, Wartezimmer, Sanitäranlagen und Behandlungsräume werden in vielen
            Einrichtungen täglich beansprucht. Weniger intensiv genutzte Nebenräume können in
            anderen Intervallen berücksichtigt werden.
          </p>
          <p>
            Nicht jede Fläche muss bei jedem Einsatz gleich behandelt werden. Ein sinnvoller
            Reinigungsplan unterscheidet zwischen stark frequentierten Bereichen, hygienisch
            sensiblen Räumen und wenig genutzten Nebenflächen.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {frequencyCards.map((card, index) => (
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

      {/* 6. Reinigung außerhalb der Sprechzeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Reinigungsarbeiten sollen Behandlungen, Gespräche und den Empfang von Patienten
            möglichst wenig beeinträchtigen. Deshalb stimmen wir die Einsatzzeiten mit Ihnen ab.
          </p>
          <p>
            In vielen Praxen bietet sich die Reinigung vor Beginn der Sprechstunde oder nach dem
            letzten Termin an. In anderen Einrichtungen können festgelegte Zwischenzeiten sinnvoll
            sein. Welche Lösung möglich ist, hängt von Öffnungszeiten, Zugang, Objektgröße und
            Einsatzplanung ab.
          </p>
          <p>
            Vor dem Start werden Zeitfenster, Schlüsselregelungen und besondere
            Zugangsanforderungen eindeutig festgelegt.
          </p>
        </div>
      </Section>

      {/* 7. Sensible Bereiche und Materialien */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Einrichtung und Oberflächen" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Praxen enthalten unterschiedliche Materialien und Einrichtungsgegenstände. Dazu
            gehören beschichtete Möbel, Glas, Metall, Kunststoff, textile Bodenbeläge und
            verschiedene Hartböden.
          </p>
          <p>
            Nicht jedes Mittel eignet sich für jede Oberfläche. Deshalb wählen wir
            Reinigungsprodukte und Verfahren passend zum Material, zur Verschmutzung und zum
            vereinbarten Einsatzbereich aus.
          </p>
          <p>
            Glanzwerk verwendet je nach Anwendungsbereich professionelle Reinigungsprodukte, unter
            anderem von Kiehl, Dr. Schnell und Buzil. Die Dosierung richtet sich nach
            Herstellerangaben und tatsächlichem Bedarf.
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

      {/* 8. Ergänzende Leistungen */}
      <Section background="muted">
        <SectionHeading
          eyebrow="Zusätzliche Reinigung für Praxen"
          title={heading.sectionHeadings[6]}
          subtitle="Neben der laufenden Reinigung können in größeren Abständen oder bei konkretem Bedarf zusätzliche Arbeiten sinnvoll sein. Diese Leistungen werden separat abgestimmt und nicht automatisch in jeden Einsatz aufgenommen."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supplementaryCards.map((card, index) => (
            <FadeIn
              key={card.title}
              delay={index * 60}
              className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
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

      {/* 9. Ablauf der Zusammenarbeit */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[7]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 10. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Praxisreinigung" title={heading.sectionHeadings[8]} />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Der Preis richtet sich nicht allein nach der Quadratmeterzahl. Zwei gleich große Praxen
          können durch unterschiedliche Raumaufteilung, Patientenzahl und hygienische
          Anforderungen einen verschiedenen Reinigungsaufwand verursachen.
        </p>
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
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Über den Preisrechner erhalten Sie eine erste Orientierung. Für ein verbindliches Angebot
          stimmen wir die konkreten Anforderungen Ihrer Praxis mit Ihnen ab.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/preisrechner"
            className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Preis kostenlos berechnen
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Individuelles Angebot anfragen
          </Link>
        </div>
      </Section>

      {/* 11. Warum Glanzwerk */}
      <Section background="white">
        <SectionHeading
          eyebrow="Zusammenarbeit im Praxisalltag"
          title={heading.sectionHeadings[9]}
          subtitle="Eine Praxisreinigung soll zuverlässig funktionieren, ohne dass Leistungen bei jedem Einsatz neu erklärt werden müssen. Deshalb achten wir auf eindeutige Absprachen und feste Zuständigkeiten."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyGlanzwerkCards.map((point, index) => (
            <FadeIn
              key={point.title}
              delay={index * 60}
              className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {whyGlanzwerkIcons[point.icon]}
                </svg>
              </span>
              <div>
                <p className="font-display text-base font-medium text-brand-900">{point.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          Mehr über unsere Arbeitsweise finden Sie auf der{" "}
          <Link href="/ueber-uns" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Über-uns-Seite
          </Link>
          . Verwandte Leistungen:{" "}
          <Link href="/leistungen/bueroreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Büroreinigung
          </Link>{" "}
          und{" "}
          <Link href="/leistungen/kita-und-schulreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Kita- und Schulreinigung
          </Link>
          .
        </p>
      </Section>

      {/* 12. Praxisreinigung in ganz Berlin */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Unser Einsatzgebiet"
          title={heading.sectionHeadings[10]}
          subtitle="Glanzwerk betreut Arztpraxen, Therapiepraxen und weitere medizinische Einrichtungen in ganz Berlin. Dazu gehören zentrale Praxisstandorte ebenso wie Einrichtungen in Wohngebieten, Gesundheitszentren und äußeren Bezirken."
        />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {districts.map((district) => (
            <Link
              key={district.slug}
              href={`/standorte/${district.slug}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              {district.name}
            </Link>
          ))}
        </FadeIn>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Nach Absprache prüfen wir außerdem Aufträge in Potsdam, Schönefeld und weiteren gut
          erreichbaren Orten im Berliner Umland. Ob ein Einsatz möglich ist, hängt von
          Praxisgröße, Reinigungsumfang und gewünschtem Intervall ab.
        </p>
      </Section>

      {/* 13. Dreimonatige Testphase */}
      <Section background="muted">
        <CTASection
          title={heading.secondaryCtaHeading}
          subtitle="Sie möchten zunächst feststellen, ob Reinigungsleistung, Kommunikation und Abläufe zu Ihrer Einrichtung passen? Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung. Umfang, Termine und Bedingungen werden vor Beginn schriftlich abgestimmt."
          primaryLabel="Testphase anfragen"
          primaryHref="/3-monate-testen"
          secondaryLabel="Angebot erhalten"
          secondaryHref="/kontakt"
        />
      </Section>

      {/* 14. FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="praxisreinigung" />
        </FadeIn>
      </Section>

      {/* 15. Abschließender CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Ihre Praxis, die ungefähre Fläche, die Anzahl der Räume und den gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und klären mit Ihnen die nächsten Schritte."
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
