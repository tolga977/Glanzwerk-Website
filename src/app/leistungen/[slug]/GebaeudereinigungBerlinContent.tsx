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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/gebaeudereinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template: der Auftragstext für diese eine
 * Leistungsseite folgt einer eigenen Abschnittsstruktur, die sich nicht in das
 * gemeinsame Positions-Schema der anderen 11 Leistungsseiten pressen lässt. Die
 * anderen Leistungsseiten durchlaufen weiterhin unverändert den generischen Zweig
 * in page.tsx.
 */

const scopeCards = [
  {
    title: "Reinigung von Böden",
    description: "Saugen, Kehren, Feucht- oder Nasswischen von Hartböden sowie abgestimmte Pflege empfindlicher Bodenbeläge.",
  },
  {
    title: "Reinigung von Oberflächen",
    description: "Pflege frei zugänglicher Schreibtische, Ablagen, Fensterbänke, Türen und weiterer vereinbarter Oberflächen.",
  },
  {
    title: "Sanitärreinigung",
    description: "Reinigung von Toiletten, Waschbecken, Armaturen, Spiegeln, Trennwänden und weiteren Sanitäreinrichtungen.",
  },
  {
    title: "Reinigung von Küchen und Teeküchen",
    description: "Pflege von Arbeitsflächen, Spülen, Fronten, Tischen und frei zugänglichen Bereichen in betrieblich genutzten Küchen.",
  },
  {
    title: "Reinigung von Eingangsbereichen",
    description: "Reinigung von Fußmatten, Böden, Türen, Glasflächen und häufig berührten Kontaktflächen im Eingangsbereich.",
  },
  {
    title: "Abfallentsorgung",
    description: "Leerung vereinbarter Abfallbehälter und Berücksichtigung vorhandener Systeme zur Mülltrennung.",
  },
  {
    title: "Reinigung von Gemeinschaftsflächen",
    description: "Pflege von Fluren, Aufenthaltsräumen, Besprechungsräumen und weiteren gemeinsam genutzten Bereichen.",
  },
  {
    title: "Ergänzende Reinigungsarbeiten",
    description: "Je nach Bedarf können Glasreinigung, Grundreinigung, Treppenhausreinigung oder weitere Sonderleistungen ergänzt werden.",
  },
];

const objectTypeCards = [
  {
    title: "Bürogebäude",
    description: "Regelmäßige Reinigung von Arbeitsplätzen, Konferenzräumen, Sanitäranlagen, Küchen und Gemeinschaftsflächen.",
    linkLabel: "Zur Büroreinigung in Berlin",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxen und medizinische Einrichtungen",
    description: "Sorgfältige Reinigung von Empfang, Wartebereichen, Behandlungsräumen und hygienisch relevanten Flächen.",
    linkLabel: "Zur Praxisreinigung in Berlin",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Kanzleien",
    description: "Diskrete Reinigung repräsentativer Büros, Empfangsbereiche, Besprechungsräume und Sanitäranlagen.",
    linkLabel: "Zur Kanzleireinigung in Berlin",
    href: "/leistungen/kanzleireinigung-berlin",
  },
  {
    title: "Wohn- und Geschäftshäuser",
    description: "Pflege von Treppenhäusern, Eingangsbereichen, Fluren, Geländern und gemeinschaftlich genutzten Bereichen.",
    linkLabel: "Zur Treppenhausreinigung in Berlin",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Autohäuser",
    description: "Reinigung von Showrooms, Kundenbereichen, Büros, Glasflächen und angrenzenden Betriebsräumen.",
    linkLabel: "Zur Autohausreinigung in Berlin",
    href: "/leistungen/autohausreinigung-berlin",
  },
  {
    title: "Gastronomiebetriebe",
    description: "Abgestimmte Reinigung von Gasträumen, Thekenumfeldern, Sanitäranlagen und betrieblichen Flächen.",
    linkLabel: "Zur Gastronomiereinigung in Berlin",
    href: "/leistungen/gastronomiereinigung-berlin",
  },
];

const intervalCards = [
  {
    title: "Unterhaltsreinigung",
    description: "Regelmäßig wiederkehrende Arbeiten für dauerhaft gepflegte Räume.",
    linkLabel: "Mehr zur Unterhaltsreinigung",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung von Flächen, auf denen sich hartnäckige Rückstände angesammelt haben.",
    linkLabel: "Mehr zur Grundreinigung",
    href: "/leistungen/grundreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung von Fenstern, Rahmen, Trennwänden, Türen und weiteren Glasflächen.",
    linkLabel: "Mehr zur Glas- und Fensterreinigung",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
];

const processSteps = [
  {
    title: "Anfrage übermitteln",
    description: "Teilen Sie uns mit, um welche Art von Gebäude es geht, wo sich das Objekt befindet und welche Reinigung Sie benötigen.",
  },
  {
    title: "Anforderungen klären",
    description: "Wir besprechen Flächen, Nutzung, gewünschte Intervalle, Reinigungszeiten und besondere Anforderungen. Bei größeren oder komplexeren Objekten kann eine Besichtigung sinnvoll sein.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Die vereinbarten Arbeiten werden so beschrieben, dass nachvollziehbar ist, welche Bereiche und Leistungen enthalten sind.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage des abgestimmten Umfangs. Zusätzliche Arbeiten werden nicht ohne vorherige Abstimmung durchgeführt.",
  },
  {
    title: "Reinigung beginnen",
    description: "Nach Ihrer Freigabe startet die Gebäudereinigung zum vereinbarten Termin. Spätere Anpassungen sind möglich, wenn sich Nutzung oder Bedarf verändern.",
  },
];

const costFactors = [
  "Größe der zu reinigenden Fläche",
  "Art und Nutzung des Gebäudes",
  "Anzahl der Räume und Sanitärbereiche",
  "gewünschte Reinigungshäufigkeit",
  "Umfang der vereinbarten Leistungen",
  "Zugänglichkeit und Reinigungszeiten",
  "besondere hygienische oder materialbezogene Anforderungen",
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
  checklist: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5l1.5 1.5 3-3M8 15l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9h2M14.5 15.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
    description: "Sie haben eine feste Kontaktperson für Fragen, Hinweise und Änderungen.",
    icon: "team" as const,
  },
  {
    title: "Klare Leistungsbeschreibung",
    description: "Vor Beginn wird festgelegt, welche Flächen und Arbeiten zum vereinbarten Umfang gehören.",
    icon: "checklist" as const,
  },
  {
    title: "Abgestimmte Einsatzzeiten",
    description: "Die Reinigung wird in planbaren Zeitfenstern organisiert.",
    icon: "clock" as const,
  },
  {
    title: "Objektbezogene Planung",
    description: "Nutzung, Materialien und Besonderheiten des Gebäudes werden berücksichtigt.",
    icon: "building" as const,
  },
  {
    title: "Anpassbare Intervalle",
    description: "Ändert sich der Bedarf, können Leistungen und Reinigungshäufigkeit nach Abstimmung angepasst werden.",
    icon: "adjust" as const,
  },
  {
    title: "Direkte Klärung bei Rückmeldungen",
    description: "Hinweise werden einem konkreten Objekt und Leistungsumfang zugeordnet und zeitnah geprüft.",
    icon: "feedback" as const,
  },
];

const faqItems = [
  {
    question: "Was gehört zu einer Gebäudereinigung?",
    answer:
      "Der genaue Umfang wird für jedes Objekt festgelegt. Typische Leistungen sind Bodenreinigung, Oberflächenreinigung, Sanitärreinigung, Reinigung von Küchen und Gemeinschaftsflächen, Abfallentsorgung sowie die Pflege von Eingangsbereichen. Glas-, Grund- oder Treppenhausreinigungen können ergänzt werden.",
  },
  {
    question: "Für welche Gebäude bietet Glanzwerk die Reinigung an?",
    answer:
      "Wir reinigen unter anderem Büros, Praxen, Kanzleien, Gewerbeimmobilien, Treppenhäuser, Autohäuser, Fitnessstudios, Bildungseinrichtungen und gastronomische Betriebe. Das Angebot richtet sich an Gewerbekunden und Organisationen.",
  },
  {
    question: "Wie oft sollte ein Gebäude gereinigt werden?",
    answer:
      "Das hängt von Nutzung, Besucheraufkommen, Raumart und hygienischen Anforderungen ab. Stark genutzte Sanitäranlagen oder Eingangsbereiche benötigen häufig kürzere Intervalle als wenig genutzte Nebenräume.",
  },
  {
    question: "Sind Reinigungen außerhalb der Geschäftszeiten möglich?",
    answer:
      "Ja. Je nach Objekt und Einsatzplanung kann die Reinigung vor Arbeitsbeginn, nach Geschäftsschluss oder innerhalb anderer fest vereinbarter Zeitfenster stattfinden.",
  },
  {
    question: "Muss das Objekt vorab besichtigt werden?",
    answer:
      "Nicht in jedem Fall. Bei größeren, komplexen oder besonders genutzten Objekten ist eine Besichtigung jedoch sinnvoll, damit der Reinigungsaufwand realistisch eingeschätzt werden kann.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer:
      "Der Preis richtet sich unter anderem nach Fläche, Nutzung, Reinigungsumfang, Intervall, Raumaufteilung, Zugänglichkeit und Reinigungszeit. Für ein verbindliches Angebot müssen die konkreten Anforderungen bekannt sein.",
  },
  {
    question: "Verwendet Glanzwerk eigene Reinigungsmittel und Geräte?",
    answer:
      "Die benötigten Reinigungsmittel und Arbeitsgeräte werden im Rahmen der vereinbarten Leistung eingeplant. Welche Mittel und Verfahren eingesetzt werden, richtet sich nach Material, Verschmutzung und Nutzung.",
  },
  {
    question: "Werden auch kurzfristige Zusatzreinigungen angeboten?",
    answer:
      "Zusätzliche Einsätze können angefragt werden. Ob und wann sie möglich sind, hängt vom Umfang, der Dringlichkeit und der aktuellen Einsatzplanung ab.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer:
      "Ja. Für die laufende Abstimmung erhalten Sie eine feste Kontaktperson, die Fragen und Änderungen Ihrem Objekt zuordnen kann.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Nutzen Sie das Kontaktformular oder den Preisrechner, rufen Sie uns unter ${siteConfig.phone} an oder schreiben Sie an ${siteConfig.email}. Hilfreich sind Angaben zu Objektart, Standort, Fläche, gewünschtem Intervall und Reinigungszeiten.`,
  },
];

export default function GebaeudereinigungBerlinContent({
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
              Gebäudereinigung für Unternehmen und Gewerbeobjekte
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk übernimmt die professionelle Reinigung gewerblich und gemeinschaftlich
              genutzter Gebäude in ganz Berlin. Wir betreuen unter anderem Büros, Praxen, Kanzleien,
              Autohäuser, gastronomische Betriebe, Treppenhäuser und weitere Gewerbeflächen.
              Reinigungsumfang, Intervalle und Einsatzzeiten werden passend zu Ihrem Objekt
              festgelegt.
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
            {["Einsatz in allen zwölf Berliner Bezirken", "Flexible Reinigungszeiten", "Fester Ansprechpartner"].map(
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
            <SectionHeading eyebrow="Gebäudereinigung für den laufenden Betrieb" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Eine gewerbliche Immobilie wird täglich unterschiedlich genutzt. Mitarbeitende
                kommen und gehen, Kunden betreten Empfangsbereiche, Sanitäranlagen werden regelmäßig
                beansprucht und in Küchen oder Gemeinschaftsräumen entstehen laufend neue
                Verschmutzungen. Damit das Gebäude dauerhaft gepflegt bleibt, müssen
                Reinigungsleistungen zur tatsächlichen Nutzung passen.
              </p>
              <p>
                Wir stimmen deshalb nicht nur die zu reinigenden Flächen ab, sondern auch die
                passenden Intervalle und Zeitfenster. Je nach Objekt kann die Reinigung vor
                Arbeitsbeginn, nach Geschäftsschluss oder innerhalb fest vereinbarter Zeiten
                stattfinden.
              </p>
              <p>
                Vor dem Start klären wir, welche Bereiche regelmäßig gereinigt werden, welche
                Flächen besondere Pflege benötigen und welche ergänzenden Arbeiten in größeren
                Abständen sinnvoll sind.
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

      {/* 3. Leistungen der Gebäudereinigung */}
      <Section background="white">
        <SectionHeading
          eyebrow="Möglicher Leistungsumfang"
          title={heading.sectionHeadings[1]}
          subtitle="Der genaue Umfang hängt von der Art des Gebäudes, der Nutzung und den vereinbarten Anforderungen ab. Die folgenden Leistungen können einzeln oder miteinander kombiniert werden."
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

      {/* 4. Objektarten */}
      <Section background="muted">
        <SectionHeading
          eyebrow="Für unterschiedliche Gewerbeobjekte"
          title={heading.sectionHeadings[2]}
          subtitle="Nicht jedes Gebäude benötigt denselben Reinigungsplan. Ein Verwaltungsbüro hat andere Anforderungen als eine Arztpraxis, ein Autohaus oder ein gastronomischer Betrieb. Deshalb berücksichtigen wir Besucheraufkommen, Nutzungszeiten, Bodenbeläge, hygienisch sensible Bereiche und den gewünschten Eindruck auf Kunden oder Patienten."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {objectTypeCards.map((card, index) => (
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

      {/* 5. Regelmäßige und ergänzende Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Passende Reinigungsintervalle" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Grundlage der laufenden Gebäudereinigung ist häufig eine regelmäßige
            Unterhaltsreinigung. Dabei werden festgelegte Arbeiten täglich, mehrmals pro Woche,
            wöchentlich oder in einem anderen vereinbarten Rhythmus durchgeführt.
          </p>
          <p>
            Nicht alle Arbeiten müssen bei jedem Einsatz erfolgen. Glasflächen, schwer zugängliche
            Bereiche oder stark beanspruchte Böden können beispielsweise in größeren Abständen
            gereinigt werden. Auch eine Grundreinigung lässt sich ergänzen, wenn Rückstände durch
            die regelmäßige Pflege allein nicht mehr vollständig entfernt werden können.
          </p>
          <p>
            Durch diese Aufteilung bleibt der tägliche Reinigungsumfang nachvollziehbar, während
            zusätzliche Leistungen nach tatsächlichem Bedarf eingeplant werden.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {intervalCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
              <Link href={card.href} className="mt-3 inline-block text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                {card.linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Ablauf der Zusammenarbeit */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Start" title={heading.sectionHeadings[4]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 7. Reinigungszeiten */}
      <Section background="warm">
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Reinigung soll den laufenden Betrieb möglichst wenig beeinträchtigen. Deshalb
            stimmen wir die Einsatzzeiten mit Ihnen ab. In vielen Objekten bietet sich eine
            Reinigung vor Arbeitsbeginn oder nach Geschäftsschluss an. In anderen Fällen kann ein
            Einsatz während des Tages sinnvoll sein, beispielsweise wenn bestimmte Bereiche
            dauerhaft betreut werden müssen.
          </p>
          <p>
            Welche Zeiten möglich sind, hängt von Objekt, Zugang, gewünschtem Intervall und unserer
            Einsatzplanung ab. Vor Beginn legen wir feste Zeitfenster und Zugangsregelungen fest.
          </p>
        </div>
      </Section>

      {/* 8. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Schutz von Flächen und Einrichtung" title={heading.sectionHeadings[6]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Bodenbeläge, Glasflächen, Holz, Kunststoff, Metall und beschichtete Oberflächen
            reagieren unterschiedlich auf Feuchtigkeit, Reinigungsmittel und mechanische
            Bearbeitung. Deshalb wählen wir Mittel und Verfahren passend zum jeweiligen Material
            aus.
          </p>
          <p>
            Glanzwerk verwendet je nach Anwendungsbereich professionelle Reinigungsprodukte, unter
            anderem von Kiehl, Dr. Schnell und Buzil. Die Dosierung richtet sich nach
            Herstellerangaben, Verschmutzungsgrad und Oberfläche.
          </p>
          <p>
            Unser Ziel ist ein sauberes Ergebnis, ohne Materialien durch unnötig aggressive
            Verfahren zu belasten. Desinfektionsmittel werden nur dort eingesetzt, wo dies
            vereinbart oder hygienisch erforderlich ist.
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

      {/* 9. Einsatzgebiet */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Unser Einsatzgebiet"
          title={heading.sectionHeadings[7]}
          subtitle="Wir betreuen Unternehmen und Gewerbeobjekte in ganz Berlin. Dabei spielt es keine Rolle, ob sich Ihr Objekt in einem zentralen Geschäftsviertel, einem Gewerbegebiet oder einem äußeren Stadtteil befindet. Entscheidend sind ein sinnvoller Leistungsumfang und eine zuverlässig planbare Einsatzzeit."
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
          Objektgröße, Reinigungsumfang und gewünschtem Intervall ab.
        </p>
      </Section>

      {/* 10. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Gebäudereinigung" title={heading.sectionHeadings[8]} />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Ein seriöser Preis lässt sich nicht allein anhand der Quadratmeterzahl bestimmen. Zwei
          gleich große Gebäude können einen sehr unterschiedlichen Reinigungsaufwand verursachen.
          Entscheidend sind unter anderem Nutzung, Raumaufteilung, Bodenbeläge, Sanitärbereiche,
          Besucheraufkommen und gewünschtes Reinigungsintervall.
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
          stimmen wir die konkreten Anforderungen Ihres Objekts mit Ihnen ab.
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
          eyebrow="Zusammenarbeit im Alltag"
          title={heading.sectionHeadings[9]}
          subtitle="Eine Reinigungsfirma soll Arbeit abnehmen und nicht durch unklare Abläufe zusätzliche Aufgaben verursachen. Deshalb achten wir auf eine direkte Kommunikation und nachvollziehbare Vereinbarungen."
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
          .
        </p>
      </Section>

      {/* 12. Dreimonatige Testphase */}
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

      {/* 13. FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="gebaeudereinigung" />
        </FadeIn>
      </Section>

      {/* 14. Abschließender CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Ihr Objekt, die ungefähre Fläche und den gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und klären mit Ihnen die nächsten Schritte. Bei größeren oder komplexeren Gebäuden kann eine Besichtigung vereinbart werden."
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
