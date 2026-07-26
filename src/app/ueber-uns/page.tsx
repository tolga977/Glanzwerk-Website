import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import CTASection from "@/components/ui/CTASection";
import FAQ from "@/components/ui/FAQ";
import FadeIn from "@/components/ui/FadeIn";
import BrandPhoto from "@/components/ui/BrandPhoto";
import Logo from "@/components/layout/Logo";
import JsonLd from "@/components/seo/JsonLd";
import { districts } from "@/data/districts";
import { photos } from "@/data/photos";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, professionalServiceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/ueber-uns"];

const description =
  "Lernen Sie Glanzwerk Reinigungsservice Berlin kennen: klare Absprachen, feste Ansprechpartner und zuverlässige Reinigung für Gewerbekunden in Berlin.";

export const metadata: Metadata = {
  ...buildMetadata({
    title: heading.metaTitle ?? heading.h1,
    description,
    path: "/ueber-uns",
  }),
  title: { absolute: heading.metaTitle ?? heading.h1 },
};

/** Section 3 — vier Karten zur Haltung und Arbeitsweise, seiteneigen. */
const approachIcons = {
  checklist: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5l1.5 1.5 3-3M8 15l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9h2M14.5 15.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  contact: (
    <>
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 14.6c1.7.3 3 1.7 3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

const approachPoints = [
  {
    title: "Klar definierte Leistungen",
    description:
      "Vor dem Start legen wir fest, welche Räume, Flächen und Einrichtungsgegenstände zum vereinbarten Umfang gehören. Dadurch entstehen weniger Missverständnisse.",
    icon: "checklist" as const,
  },
  {
    title: "Feste Kontaktperson",
    description:
      "Sie haben einen Ansprechpartner für Fragen, Änderungen und Rückmeldungen. So müssen Anliegen nicht bei jedem Kontakt neu erklärt werden.",
    icon: "contact" as const,
  },
  {
    title: "Objektbezogene Abläufe",
    description:
      "Ein Büro, eine Praxis und ein Autohaus werden nicht nach demselben Schema gereinigt. Nutzung, Materialien und Besucheraufkommen fließen in die Planung ein.",
    icon: "building" as const,
  },
  {
    title: "Direkter Umgang mit Rückmeldungen",
    description:
      "Sollte eine Leistung einmal nicht wie vereinbart ausgeführt worden sein, wird der konkrete Punkt geprüft und mit Ihnen geklärt.",
    icon: "feedback" as const,
  },
];

/** Section 4 — Branchen mit Links auf die passenden Leistungsseiten. */
const audienceGroups = [
  {
    title: "Büros und Unternehmen",
    description:
      "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen, Sanitärbereichen und gemeinsam genutzten Flächen.",
    links: [{ label: "Büroreinigung", href: "/leistungen/bueroreinigung-berlin" }],
  },
  {
    title: "Praxen und medizinische Einrichtungen",
    description:
      "Sorgfältige Reinigung von Empfang, Wartezimmern, Behandlungsräumen und hygienisch relevanten Bereichen.",
    links: [{ label: "Praxisreinigung", href: "/leistungen/praxisreinigung-berlin" }],
  },
  {
    title: "Kanzleien und Beratungsunternehmen",
    description:
      "Diskrete Reinigung von Büros, Empfangsbereichen, Besprechungsräumen und Sanitäranlagen.",
    links: [{ label: "Kanzleireinigung", href: "/leistungen/kanzleireinigung-berlin" }],
  },
  {
    title: "Hausverwaltungen und Gewerbeimmobilien",
    description:
      "Regelmäßige Pflege von Treppenhäusern, Eingängen, Allgemeinflächen und weiteren gemeinschaftlich genutzten Bereichen.",
    links: [
      { label: "Gebäudereinigung", href: "/leistungen/gebaeudereinigung-berlin" },
      { label: "Treppenhausreinigung", href: "/leistungen/treppenhausreinigung-berlin" },
    ],
  },
  {
    title: "Autohäuser und Verkaufsflächen",
    description:
      "Reinigung von Showrooms, Kundenbereichen, Büros, Glasflächen und angrenzenden Betriebsräumen.",
    links: [{ label: "Autohausreinigung", href: "/leistungen/autohausreinigung-berlin" }],
  },
  {
    title: "Gastronomische Betriebe",
    description:
      "Abgestimmte Reinigung von Gasträumen, Thekenumfeldern, Sanitäranlagen und betrieblich genutzten Bereichen.",
    links: [{ label: "Gastronomiereinigung", href: "/leistungen/gastronomiereinigung-berlin" }],
  },
];

/** Section 6 — drei kurze Informationskarten zur Qualitätssicherung. */
const qualityPoints = [
  {
    title: "Nachvollziehbare Reinigungspläne",
    description: "Leistungen und Intervalle werden vor Beginn festgelegt und bei Änderungen aktualisiert.",
  },
  {
    title: "Objektbezogene Hinweise",
    description: "Besondere Materialien, sensible Bereiche oder Zugangsregelungen werden berücksichtigt.",
  },
  {
    title: "Regelmäßige Abstimmung",
    description: "Bei dauerhaft betreuten Objekten bleiben Anforderungen und Ausführung nicht sich selbst überlassen.",
  },
];

const faqItems = [
  {
    question: "Arbeitet Glanzwerk nur für Gewerbekunden?",
    answer:
      "Unser Angebot richtet sich vor allem an Unternehmen, Praxen, Kanzleien, Hausverwaltungen, Bildungseinrichtungen, Autohäuser, Fitnessstudios und gastronomische Betriebe. Die regelmäßige Reinigung privater Haushalte steht nicht im Mittelpunkt unseres Angebots.",
  },
  {
    question: "In welchen Teilen Berlins ist Glanzwerk tätig?",
    answer:
      "Wir arbeiten in allen zwölf Berliner Bezirken. Auf Anfrage prüfen wir außerdem Einsätze in Potsdam, Schönefeld und weiteren Orten im Berliner Umland.",
  },
  {
    question: "Gibt es eine feste Kontaktperson?",
    answer:
      "Für die Abstimmung erhalten Sie eine feste Kontaktperson. Dadurch können Fragen, Änderungen und Rückmeldungen direkt zugeordnet werden.",
  },
  {
    question: "Wie wird der Reinigungsumfang festgelegt?",
    answer:
      "Vor Beginn klären wir Objektart, Flächen, Nutzung, gewünschte Intervalle und besondere Anforderungen. Bei umfangreicheren oder komplexeren Objekten kann eine Besichtigung vor Ort sinnvoll sein.",
  },
  {
    question: "Sind Reinigungen außerhalb der Geschäftszeiten möglich?",
    answer:
      "Je nach Objekt und Einsatzplanung können Reinigungen vor Arbeitsbeginn, nach Geschäftsschluss oder innerhalb festgelegter Zeitfenster stattfinden.",
  },
  {
    question: "Welche Reinigungsmittel verwendet Glanzwerk?",
    answer:
      "Je nach Oberfläche und Anwendungsbereich verwenden wir professionelle Reinigungsprodukte, unter anderem von Kiehl, Dr. Schnell und Buzil. Die Auswahl richtet sich nach Material, Verschmutzung und hygienischen Anforderungen.",
  },
  {
    question: "Kann der Reinigungsplan später angepasst werden?",
    answer:
      "Ja. Wenn sich Nutzung, Flächen oder betriebliche Abläufe verändern, können Leistungen und Intervalle nach Abstimmung angepasst werden.",
  },
  {
    question: "Wie kann ich Glanzwerk erreichen?",
    answer: `Sie erreichen uns telefonisch unter ${siteConfig.phone}, per E-Mail an ${siteConfig.email} oder über das Kontaktformular der Website.`,
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Über uns" }]} />
      <JsonLd data={webPageSchema({ name: heading.metaTitle ?? heading.h1, description, path: "/ueber-uns", type: "AboutPage" })} />
      <JsonLd data={professionalServiceSchema()} />

      {/* 1. Hero */}
      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              Glanzwerk Reinigungsservice Berlin
            </p>
            <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Glanzwerk unterstützt Unternehmen, Praxen, Kanzleien, Hausverwaltungen, Autohäuser,
              gastronomische Betriebe und weitere Gewerbekunden bei der regelmäßigen Reinigung ihrer
              Räume. Unser Anspruch ist einfach: Vereinbarte Leistungen sollen nachvollziehbar sein,
              Termine sollen funktionieren und Rückfragen sollen schnell geklärt werden können.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Unverbindliches Angebot anfragen
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Unsere Leistungen ansehen
              </Link>
            </div>
          </div>
          <BrandPhoto photo={photos.buildingFacade} className="shadow-2xl shadow-brand-950/20" />
        </div>
      </Section>

      {/* 2. Vorstellung */}
      <Section background="muted">
        <SectionHeading eyebrow="Über Glanzwerk" title={heading.sectionHeadings[0]} />
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Gebäudereinigung findet meist dann statt, wenn andere gerade arbeiten, Feierabend machen
            oder ihren Betrieb für den nächsten Tag vorbereiten. Damit Reinigung in diesem Umfeld
            funktioniert, müssen Zeiten, Zugänge, Zuständigkeiten und Leistungen eindeutig geregelt
            sein.
          </p>
          <p>
            Genau darauf richten wir unsere Arbeit aus. Vor Beginn besprechen wir, welche Räume
            gereinigt werden, wie häufig die Einsätze stattfinden und welche Bereiche besondere
            Aufmerksamkeit benötigen. Das können stark genutzte Sanitäranlagen, sensible
            Behandlungsräume, repräsentative Empfangsbereiche oder schwer zugängliche Glasflächen
            sein.
          </p>
          <p>
            Wir möchten nicht durch große Versprechen überzeugen, sondern durch eine Zusammenarbeit,
            die im Alltag verlässlich bleibt. Dazu gehören klare Absprachen, eine feste Kontaktperson
            und die Bereitschaft, Abläufe anzupassen, wenn sich Anforderungen im Objekt verändern.
          </p>
        </div>
      </Section>

      {/* 3. Haltung und Arbeitsweise */}
      <Section background="white">
        <SectionHeading
          eyebrow="So verstehen wir unsere Arbeit"
          title={heading.sectionHeadings[1]}
          subtitle="Ein gutes Reinigungsergebnis hängt nicht nur vom eingesetzten Mittel oder Gerät ab. Entscheidend ist, ob das Team weiß, was zu tun ist, ob Besonderheiten dokumentiert sind und ob Rückmeldungen tatsächlich ankommen. Deshalb verbinden wir praktische Reinigungsarbeit mit klaren organisatorischen Abläufen."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {approachPoints.map((point, index) => (
            <FadeIn
              key={point.title}
              delay={index * 80}
              className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {approachIcons[point.icon]}
                </svg>
              </span>
              <div>
                <p className="font-display text-base font-medium text-brand-900">{point.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 4. Für wen Glanzwerk arbeitet */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Unsere Kunden"
          title={heading.sectionHeadings[2]}
          subtitle="Unser Angebot richtet sich an Unternehmen und Organisationen in Berlin. Dabei unterscheiden sich die Anforderungen je nach Branche deutlich. In einem Büro stehen Arbeitsplätze, Besprechungsräume und Gemeinschaftsflächen im Mittelpunkt. In einer Praxis kommen hygienisch sensible Bereiche hinzu. In einem Autohaus beeinflussen saubere Glasflächen und gepflegte Ausstellungsbereiche unmittelbar den Eindruck auf Besucher."
        />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
          Statt jeder Branche dieselben Leistungen anzubieten, stimmen wir den Reinigungsumfang auf
          die tatsächliche Nutzung ab.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audienceGroups.map((group, index) => (
            <FadeIn
              key={group.title}
              delay={index * 60}
              className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <p className="font-display text-base font-medium text-brand-900">{group.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{group.description}</p>
              <ul className="mt-3 space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 5. Zusammenarbeit */}
      <Section background="white">
        <SectionHeading eyebrow="Im laufenden Betrieb" title={heading.sectionHeadings[3]} />
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Ein Reinigungsdienst wird beauftragt, damit sich Unternehmen nicht täglich selbst um
            Sauberkeit, Verbrauchsmaterialien und wiederkehrende Reinigungsaufgaben kümmern müssen.
            Deshalb soll die Zusammenarbeit möglichst unkompliziert bleiben.
          </p>
          <p>
            Vor dem Start stimmen wir Umfang und Zeiten ab. Im laufenden Betrieb steht eine feste
            Kontaktperson zur Verfügung. Ändert sich die Nutzung einzelner Räume, kommen neue Flächen
            hinzu oder wird für einen bestimmten Termin eine zusätzliche Reinigung benötigt, kann der
            Reinigungsplan angepasst werden.
          </p>
          <p>
            Dabei bleiben wir realistisch: Nicht jeder kurzfristige Wunsch lässt sich sofort
            erfüllen. Wir prüfen jedoch, was organisatorisch möglich ist, und geben eine klare
            Rückmeldung.
          </p>
        </div>
      </Section>

      {/* 6. Qualität im Alltag */}
      <Section background="tint" decor id="garantie">
        <SectionHeading eyebrow="Qualitätssicherung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Qualität zeigt sich nicht in allgemeinen Aussagen, sondern an konkreten Punkten. Sind die
            vereinbarten Bereiche gereinigt? Wurden sensible Oberflächen richtig behandelt? Sind
            häufig berührte Bereiche berücksichtigt? Und funktioniert die Kommunikation, wenn etwas
            angepasst werden muss?
          </p>
          <p>
            Deshalb orientieren wir uns an festgelegten Leistungen und objektspezifischen Hinweisen.
            Rückmeldungen aus dem Objekt werden aufgenommen und bei Bedarf in die weitere Planung
            einbezogen. So bleibt die Reinigung nicht starr, sondern kann sich an veränderte
            Anforderungen anpassen.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {qualityPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <p className="font-display text-base font-medium text-brand-900">{point.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 divide-y divide-brand-900/[0.06] overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
          <FadeIn className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3.5l7 2.6v5.4c0 4.5-3 8-7 9.4-4-1.4-7-4.9-7-9.4V6.1l7-2.6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M8.7 12.2l2.3 2.3 4.3-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="font-display text-lg font-medium text-brand-900">Betriebshaftpflichtversichert</p>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Glanzwerk ist bei der Allianz betriebshaftpflichtversichert (Deckungssumme 5 Mio. €) –
                für den Fall, dass bei der Arbeit an Ihrem Objekt tatsächlich einmal etwas schiefgeht.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={80} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 11a7 7 0 0 1 12-4.9M19 13a7 7 0 0 1-12 4.9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path d="M17 3.5V6.5H14M7 20.5V17.5H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="font-display text-lg font-medium text-brand-900">Nachbesserung oder Geld zurück</p>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Melden Sie einen konkreten Mangel innerhalb von 24 Stunden nach dem Termin, beheben
                wir ihn in der Regel kostenlos nach. Ist das im Einzelfall nicht möglich oder nicht
                zumutbar, erstatten wir den anteiligen Betrag für die betroffene Leistung zurück. Die
                genauen Bedingungen regeln unsere Vertragsunterlagen.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 7. Umwelt und Materialschutz */}
      <Section background="warm">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Verantwortung im Reinigungsalltag" title={heading.sectionHeadings[5]} />
            <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Wirksame Reinigung hängt von der passenden Kombination aus Mittel, Dosierung,
                Einwirkzeit und Arbeitsverfahren ab. Ein übermäßiger Einsatz von Reinigungschemie
                verbessert das Ergebnis nicht automatisch und kann Materialien unnötig belasten.
              </p>
              <p>
                Glanzwerk verwendet je nach Anwendungsbereich professionelle Reinigungsprodukte,
                unter anderem von Kiehl, Dr. Schnell und Buzil. Die Auswahl richtet sich nach
                Oberfläche, Verschmutzung und Nutzung. Wo es sinnvoll und im Objekt umsetzbar ist,
                achten wir auf bedarfsgerechte Dosierung, einen bewussten Wasserverbrauch und die
                vorhandene Mülltrennung.
              </p>
              <p>
                Desinfektionsmittel werden dort eingesetzt, wo sie vereinbart oder hygienisch
                erforderlich sind. Auf anderen Flächen genügt häufig eine materialgerechte Reinigung.
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
          </div>
          <BrandPhoto photo={photos.cleaningEquipment} className="shadow-2xl shadow-brand-950/20">
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
              <Logo height={22} />
            </div>
          </BrandPhoto>
        </div>
      </Section>

      {/* 8. Einsatzgebiet */}
      <Section background="muted">
        <SectionHeading
          eyebrow="Vor Ort in Berlin"
          title={heading.sectionHeadings[6]}
          subtitle="Wir übernehmen Reinigungsaufträge in ganz Berlin. Dazu gehören zentrale Geschäftsstandorte ebenso wie Gewerbegebiete, medizinische Einrichtungen, Kanzleien, Wohn- und Geschäftshäuser oder gastronomische Betriebe in den äußeren Bezirken."
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
          erreichbaren Orten im Berliner Umland. Entscheidend sind Objektgröße, Reinigungsumfang,
          gewünschtes Intervall und eine sinnvoll planbare Anfahrt.
        </p>
      </Section>

      {/* 9. FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="ueber-uns" />
        </FadeIn>
      </Section>

      {/* 10. Abschließender CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Objektart, Standort, ungefähre Fläche und den gewünschten Reinigungsrhythmus. Auf dieser Grundlage klären wir die nächsten Schritte und prüfen, ob eine Besichtigung sinnvoll ist."
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
