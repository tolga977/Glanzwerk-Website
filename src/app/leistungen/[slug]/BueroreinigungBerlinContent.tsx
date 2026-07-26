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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/bueroreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * GebaeudereinigungBerlinContent.tsx: der Auftragstext folgt einer eigenen
 * Abschnittsstruktur, die sich nicht in das gemeinsame Positions-Schema der
 * übrigen Leistungsseiten pressen lässt. Die anderen Leistungsseiten
 * durchlaufen weiterhin unverändert den generischen Zweig in page.tsx.
 */

const scopeCards = [
  {
    title: "Reinigung von Arbeitsplätzen",
    description: "Reinigung frei zugänglicher Schreibtischflächen, Ablagen, Rollcontainer und weiterer vereinbarter Oberflächen.",
  },
  {
    title: "Bodenreinigung",
    description: "Saugen, Kehren, Feucht- oder Nasswischen abhängig vom vorhandenen Bodenbelag und Verschmutzungsgrad.",
  },
  {
    title: "Reinigung von Besprechungsräumen",
    description: "Pflege von Tischen, frei zugänglichen Oberflächen, Böden und weiteren vereinbarten Bereichen.",
  },
  {
    title: "Reinigung von Küchen und Teeküchen",
    description: "Reinigung von Arbeitsflächen, Spülen, Tischen, Fronten und frei zugänglichen Bereichen in betrieblich genutzten Küchen.",
  },
  {
    title: "Sanitärreinigung",
    description: "Reinigung von Toiletten, Waschbecken, Armaturen, Spiegeln, Trennwänden und weiteren Sanitäreinrichtungen.",
  },
  {
    title: "Reinigung von Empfang und Fluren",
    description: "Pflege von Eingangsbereichen, Laufwegen, Türen, Fußmatten und häufig genutzten Kontaktflächen.",
  },
  {
    title: "Abfallentsorgung",
    description: "Leerung vereinbarter Abfallbehälter und Berücksichtigung vorhandener Systeme zur Mülltrennung.",
  },
  {
    title: "Reinigung von Gemeinschaftsflächen",
    description: "Pflege von Aufenthaltsräumen, Kopierbereichen, Lounges und weiteren gemeinsam genutzten Flächen.",
  },
];

const frequencyCards = [
  {
    title: "Tägliche Büroreinigung",
    description: "Sinnvoll bei hoher Auslastung, regelmäßigem Kundenverkehr oder stark beanspruchten Sanitär- und Küchenbereichen.",
  },
  {
    title: "Mehrmals pro Woche",
    description: "Geeignet für viele mittelgroße Büros mit regelmäßiger Nutzung und planbarem Besucheraufkommen.",
  },
  {
    title: "Wöchentliche Reinigung",
    description: "Kann für kleinere Büros oder weniger intensiv genutzte Verwaltungsflächen ausreichend sein.",
  },
  {
    title: "Individueller Reinigungsplan",
    description: "Unterschiedliche Räume können in verschiedenen Intervallen gereinigt werden, wenn dies zur Nutzung besser passt.",
  },
];

const specialAreaCards = [
  {
    title: "Sanitärbereiche",
    description: "Toiletten und Waschbereiche werden regelmäßig stark beansprucht und benötigen abgestimmte Reinigungsintervalle.",
  },
  {
    title: "Küchen und Pausenräume",
    description: "Lebensmittelreste, Fettspuren und häufig berührte Flächen erfordern eine sorgfältige und regelmäßige Reinigung.",
  },
  {
    title: "Empfang und Besucherbereiche",
    description: "Der erste Eindruck eines Unternehmens entsteht häufig bereits im Eingangsbereich.",
  },
  {
    title: "Besprechungsräume",
    description: "Räume mit wechselnder Nutzung sollten gepflegt und für den nächsten Termin vorbereitet sein.",
  },
];

const supplementaryCards = [
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung von Fenstern, Rahmen, Glaswänden, Eingangstüren und weiteren Glasflächen.",
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
    description: "Regelmäßig wiederkehrende Reinigung für dauerhaft gepflegte Büroräume.",
    linkLabel: "Mehr zur Unterhaltsreinigung",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Gebäudereinigung",
    description: "Ergänzende Reinigung weiterer Flächen und Bereiche innerhalb eines gewerblich genutzten Gebäudes.",
    linkLabel: "Mehr zur Gebäudereinigung",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie uns Standort, ungefähre Bürofläche, Anzahl der Räume und das gewünschte Reinigungsintervall mit.",
  },
  {
    title: "Anforderungen abstimmen",
    description: "Wir klären Arbeitsplätze, Küchen, Sanitärbereiche, Gemeinschaftsflächen, Reinigungszeiten und besondere Anforderungen.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Die regelmäßig auszuführenden Arbeiten werden eindeutig beschrieben. Ergänzende Leistungen können separat vereinbart werden.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen und Intervalle.",
  },
  {
    title: "Büroreinigung starten",
    description: "Nach Ihrer Freigabe beginnt die Reinigung zum vereinbarten Termin. Bei verändertem Bedarf kann der Reinigungsplan später angepasst werden.",
  },
];

const costFactors = [
  "Größe der zu reinigenden Fläche",
  "Anzahl der Arbeitsplätze",
  "Raumaufteilung",
  "Anzahl und Größe der Sanitärbereiche",
  "Küchen und Gemeinschaftsräume",
  "gewünschte Reinigungshäufigkeit",
  "Bodenbeläge und Oberflächen",
  "Zugänglichkeit und Reinigungszeiten",
  "zusätzliche Leistungen wie Fenster- oder Grundreinigung",
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
  building: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 8h1.5M14 8h1.5M8.5 12h1.5M14 12h1.5M8.5 16h1.5M14 16h1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  adjust: (
    <>
      <path d="M5 11a7 7 0 0 1 12-4.9M19 13a7 7 0 0 1-12 4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 3.5V6.5H14M7 20.5V17.5H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
    title: "Abgestimmte Reinigungszeiten",
    description: "Die Einsätze werden so geplant, dass Ihr Arbeitsalltag möglichst wenig beeinträchtigt wird.",
    icon: "clock" as const,
  },
  {
    title: "Klare Leistungsbeschreibung",
    description: "Sie wissen, welche Räume und Arbeiten im vereinbarten Umfang enthalten sind.",
    icon: "checklist" as const,
  },
  {
    title: "Objektbezogene Planung",
    description: "Raumaufteilung, Mitarbeiterzahl und Nutzung fließen in den Reinigungsplan ein.",
    icon: "building" as const,
  },
  {
    title: "Anpassbare Intervalle",
    description: "Ändert sich die Nutzung Ihres Büros, können Leistungen und Häufigkeit neu abgestimmt werden.",
    icon: "adjust" as const,
  },
  {
    title: "Direkte Klärung bei Rückmeldungen",
    description: "Hinweise werden dem konkreten Objekt und der vereinbarten Leistung zugeordnet.",
    icon: "feedback" as const,
  },
];

const faqItems = [
  {
    question: "Was gehört zu einer Büroreinigung?",
    answer:
      "Der genaue Umfang wird individuell festgelegt. Typische Leistungen sind Bodenreinigung, Reinigung frei zugänglicher Oberflächen, Sanitärreinigung, Küchenreinigung, Abfallentsorgung sowie die Pflege von Empfangs- und Gemeinschaftsbereichen.",
  },
  {
    question: "Wie oft sollte ein Büro gereinigt werden?",
    answer:
      "Das hängt von Mitarbeiterzahl, Besucheraufkommen, Raumart und Nutzung ab. Stark beanspruchte Büros benötigen häufig eine tägliche oder mehrmals wöchentliche Reinigung. Bei kleineren und weniger intensiv genutzten Flächen kann ein längeres Intervall ausreichen.",
  },
  {
    question: "Reinigt Glanzwerk auch außerhalb der Geschäftszeiten?",
    answer:
      "Ja. Je nach Objekt und Einsatzplanung kann die Reinigung vor Arbeitsbeginn, nach Geschäftsschluss oder innerhalb anderer fest vereinbarter Zeitfenster stattfinden.",
  },
  {
    question: "Werden Schreibtische und technische Geräte gereinigt?",
    answer:
      "Frei zugängliche Schreibtischflächen können im vereinbarten Umfang gereinigt werden. Der Umgang mit technischen Geräten, persönlichen Unterlagen und empfindlichen Gegenständen wird vorab abgestimmt.",
  },
  {
    question: "Werden Küchen und Sanitäranlagen mitgereinigt?",
    answer:
      "Ja, sofern diese Bereiche Bestandteil des vereinbarten Leistungsumfangs sind. Aufgrund ihrer Nutzung werden für Küchen und Sanitäranlagen häufig eigene Reinigungsintervalle festgelegt.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer:
      "Der Preis richtet sich unter anderem nach Fläche, Anzahl der Räume und Arbeitsplätze, Sanitärbereichen, Reinigungsintervall, Bodenbelägen, Reinigungszeit und gewünschtem Leistungsumfang.",
  },
  {
    question: "Muss das Büro vorab besichtigt werden?",
    answer:
      "Nicht in jedem Fall. Bei größeren, komplexen oder besonders genutzten Büroflächen kann eine Besichtigung sinnvoll sein, um den Aufwand realistisch einzuschätzen.",
  },
  {
    question: "Können Fenster und Glaswände mitgereinigt werden?",
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
    answer: `Nutzen Sie das Kontaktformular oder den Preisrechner, rufen Sie uns unter ${siteConfig.phone} an oder schreiben Sie an ${siteConfig.email}. Hilfreich sind Angaben zu Standort, Bürofläche, Anzahl der Arbeitsplätze und gewünschtem Reinigungsintervall.`,
  },
];

export default function BueroreinigungBerlinContent({
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
              Büroreinigung für Unternehmen in ganz Berlin
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk übernimmt die regelmäßige Reinigung von Büros, Kanzleien, Agenturen,
              Verwaltungsflächen und weiteren gewerblich genutzten Arbeitsräumen in Berlin.
              Gemeinsam legen wir fest, welche Bereiche gereinigt werden, wie häufig die Einsätze
              stattfinden und zu welchen Zeiten die Reinigung Ihren Betrieb möglichst wenig
              beeinträchtigt.
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
            <SectionHeading eyebrow="Saubere Arbeitsplätze im laufenden Betrieb" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                In Büros entstehen täglich unterschiedliche Verschmutzungen. Arbeitsplätze werden
                genutzt, Besprechungsräume wechseln zwischen mehreren Terminen, Küchen und
                Sanitäranlagen werden regelmäßig beansprucht und Besucher betreten
                Empfangsbereiche. Damit Räume dauerhaft gepflegt bleiben, muss die Reinigung an die
                tatsächliche Nutzung angepasst werden.
              </p>
              <p>
                Wir betrachten deshalb nicht nur die Gesamtfläche, sondern auch Raumaufteilung,
                Mitarbeiterzahl, Besucheraufkommen und gewünschte Reinigungszeiten. Je nach Bedarf
                kann die Büroreinigung täglich, mehrmals pro Woche, wöchentlich oder in einem
                individuell vereinbarten Rhythmus stattfinden.
              </p>
              <p>
                Vor dem Start wird festgelegt, welche Leistungen regelmäßig ausgeführt werden und
                welche Arbeiten nur in größeren Abständen erforderlich sind.
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

      {/* 3. Leistungen der Büroreinigung */}
      <Section background="white">
        <SectionHeading
          eyebrow="Möglicher Leistungsumfang"
          title={heading.sectionHeadings[1]}
          subtitle="Der genaue Umfang richtet sich nach den vereinbarten Leistungen. Die folgenden Arbeiten können einzeln oder miteinander kombiniert werden."
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

      {/* 4. Reinigungsintervalle */}
      <Section background="muted">
        <SectionHeading eyebrow="Passender Rhythmus für Ihr Büro" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die passende Reinigungshäufigkeit hängt von der Nutzung ab. Ein Büro mit vielen
            Mitarbeitenden, Kundenverkehr und mehreren Sanitärbereichen benötigt meist kürzere
            Intervalle als eine kleine Verwaltungsfläche mit wenigen Arbeitsplätzen.
          </p>
          <p>
            Stark genutzte Bereiche wie Küchen, Toiletten, Eingänge und Besprechungsräume sollten
            häufiger berücksichtigt werden als wenig genutzte Nebenräume. Deshalb muss nicht jede
            Fläche bei jedem Einsatz in demselben Umfang bearbeitet werden.
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

      {/* 5. Reinigung außerhalb der Bürozeiten */}
      <Section background="white">
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Reinigungsarbeiten sollen Besprechungen, Telefonate und konzentriertes Arbeiten
            möglichst wenig stören. Deshalb stimmen wir die Einsatzzeiten mit Ihnen ab.
          </p>
          <p>
            Viele Unternehmen bevorzugen eine Reinigung am frühen Morgen oder nach dem regulären
            Geschäftsschluss. In anderen Büros kann eine Reinigung während festgelegter Tageszeiten
            sinnvoll sein. Welche Lösung möglich ist, hängt von Zugangsregelungen, Objektgröße,
            gewünschtem Intervall und unserer Einsatzplanung ab.
          </p>
          <p>Vor Beginn werden feste Zeitfenster und der Zugang zum Gebäude eindeutig geregelt.</p>
        </div>
      </Section>

      {/* 6. Besondere Bereiche im Büro */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Mehr als Schreibtische und Böden"
          title={heading.sectionHeadings[4]}
          subtitle="Ein Büro besteht aus unterschiedlich genutzten Räumen. Während an Arbeitsplätzen vor allem Staub und alltägliche Gebrauchsspuren entstehen, benötigen Sanitäranlagen, Küchen und stark frequentierte Eingänge eine andere Vorgehensweise."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specialAreaCards.map((card, index) => (
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

      {/* 7. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Schutz von Einrichtung und Oberflächen" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Moderne Büros kombinieren unterschiedliche Materialien. Dazu gehören beschichtete
            Schreibtische, Holzoberflächen, Glaswände, Metall, Kunststoff, Teppichboden und
            verschiedene Hartbodenbeläge.
          </p>
          <p>
            Nicht jedes Reinigungsmittel eignet sich für jede Oberfläche. Deshalb wählen wir Mittel
            und Verfahren passend zum jeweiligen Material aus. Glanzwerk verwendet je nach
            Einsatzbereich professionelle Reinigungsprodukte, unter anderem von Kiehl, Dr. Schnell
            und Buzil.
          </p>
          <p>
            Die Dosierung richtet sich nach Herstellerangaben, Verschmutzungsgrad und Oberfläche.
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
          eyebrow="Zusätzliche Reinigung für Büros"
          title={heading.sectionHeadings[6]}
          subtitle="Die regelmäßige Büroreinigung deckt die laufenden Aufgaben im Arbeitsalltag ab. Einige Arbeiten müssen jedoch nicht bei jedem Einsatz stattfinden. Deshalb können zusätzliche Leistungen in größeren Abständen oder nach konkretem Bedarf vereinbart werden."
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

      {/* 10. Preise */}
      <Section background="warm">
        <SectionHeading eyebrow="Kosten der Büroreinigung" title={heading.sectionHeadings[8]} />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Der Preis lässt sich nicht allein anhand der Bürofläche bestimmen. Zwei gleich große
          Büros können durch unterschiedliche Raumaufteilungen, Mitarbeiterzahlen und
          Nutzungsintensitäten einen deutlich verschiedenen Reinigungsaufwand verursachen.
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
          stimmen wir die konkreten Anforderungen Ihres Büros mit Ihnen ab.
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
          eyebrow="Zusammenarbeit im Büroalltag"
          title={heading.sectionHeadings[9]}
          subtitle="Eine Büroreinigung soll Ihr Unternehmen entlasten. Deshalb achten wir darauf, dass Leistungen, Zeitfenster und Ansprechpartner eindeutig festgelegt sind."
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
          <Link href="/leistungen/kanzleireinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Kanzleireinigung
          </Link>{" "}
          und{" "}
          <Link href="/leistungen/praxisreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Praxisreinigung
          </Link>
          .
        </p>
      </Section>

      {/* 12. Büroreinigung in ganz Berlin */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Unser Einsatzgebiet"
          title={heading.sectionHeadings[10]}
          subtitle="Glanzwerk betreut Büros, Kanzleien, Agenturen und Verwaltungsflächen in ganz Berlin. Dazu gehören zentrale Geschäftsstandorte ebenso wie Büroflächen in Gewerbegebieten und äußeren Stadtteilen."
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
          erreichbaren Orten im Berliner Umland. Ob ein Einsatz möglich ist, hängt von Bürogröße,
          Reinigungsumfang und gewünschtem Intervall ab.
        </p>
      </Section>

      {/* 13. Dreimonatige Testphase */}
      <Section background="muted">
        <CTASection
          title={heading.secondaryCtaHeading}
          subtitle="Sie möchten zunächst feststellen, ob Reinigungsleistung, Kommunikation und Abläufe zu Ihrem Unternehmen passen? Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung. Umfang, Termine und Bedingungen werden vor Beginn schriftlich abgestimmt."
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
          <FAQ items={faqItems} idPrefix="bueroreinigung" />
        </FadeIn>
      </Section>

      {/* 15. Abschließender CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Ihr Büro, die ungefähre Fläche, die Anzahl der Arbeitsplätze und den gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und klären mit Ihnen die nächsten Schritte."
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
