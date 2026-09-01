import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import TrustSignals from "@/components/ui/TrustSignals";
import EinsatzgebietKarte from "@/components/ui/EinsatzgebietKarte";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import BerlinEinsatzgebietKarte from "@/components/ui/BerlinEinsatzgebietKarte";
import GoogleReviewsAuto from "@/components/ui/GoogleReviewsAuto";
import HygieneFarbcodeSystem from "@/components/ui/HygieneFarbcodeSystem";
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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/kanzleireinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * GebaeudereinigungBerlinContent.tsx / BueroreinigungBerlinContent.tsx /
 * PraxisreinigungBerlinContent.tsx: der Auftragstext folgt einer eigenen
 * Abschnittsstruktur, die sich nicht in das gemeinsame Positions-Schema der
 * übrigen Leistungsseiten pressen lässt.
 */

const scopeCards = [
  {
    title: "Reinigung von Arbeitsplätzen",
    description: "Pflege frei zugänglicher Schreibtischflächen, Ablagen, Rollcontainer und weiterer vereinbarter Oberflächen.",
  },
  {
    title: "Reinigung von Besprechungsräumen",
    description: "Reinigung von Tischen, frei zugänglichen Flächen, Böden und weiteren Bereichen, die regelmäßig für Mandantengespräche genutzt werden.",
  },
  {
    title: "Empfangsbereich",
    description: "Pflege von Böden, Türen, Theken, Sitzbereichen und abgestimmten Kontaktflächen.",
  },
  {
    title: "Bodenreinigung",
    description: "Saugen, Kehren, Feucht- oder Nasswischen passend zum vorhandenen Bodenbelag.",
  },
  {
    title: "Sanitärreinigung",
    description: "Reinigung von Toiletten, Waschbecken, Armaturen, Spiegeln und weiteren Sanitäreinrichtungen.",
  },
  {
    title: "Küchen und Teeküchen",
    description: "Reinigung von Arbeitsflächen, Spülen, Tischen, Fronten und frei zugänglichen Bereichen.",
  },
  {
    title: "Flure und Gemeinschaftsflächen",
    description: "Pflege von Laufwegen, Wartezonen, Kopierbereichen und weiteren gemeinsam genutzten Räumen.",
  },
  {
    title: "Abfallentsorgung",
    description: "Leerung vereinbarter Abfallbehälter und Berücksichtigung vorhandener Systeme zur Mülltrennung.",
  },
];

const discretionCards = [
  {
    title: "Festgelegte Arbeitsbereiche",
    description: "Vor dem Start wird geklärt, welche Flächen und Räume zum Reinigungsumfang gehören.",
  },
  {
    title: "Rücksicht auf Unterlagen",
    description: "Akten, Schriftstücke und persönliche Arbeitsmaterialien werden nicht ohne ausdrückliche Vereinbarung bewegt.",
  },
  {
    title: "Geregelter Zugang",
    description: "Zeitfenster, Schlüssel und Zugangsberechtigungen werden eindeutig abgestimmt.",
  },
];

const frequencyCards = [
  {
    title: "Tägliche Reinigung",
    description: "Sinnvoll bei hohem Mandantenverkehr, vielen Mitarbeitenden und stark beanspruchten Gemeinschaftsbereichen.",
  },
  {
    title: "Mehrmals pro Woche",
    description: "Geeignet für viele mittelgroße Kanzleien mit regelmäßiger Büronutzung und planbarem Besucherverkehr.",
  },
  {
    title: "Wöchentliche Reinigung",
    description: "Kann für kleinere Kanzleien oder weniger intensiv genutzte Büroflächen ausreichen.",
  },
  {
    title: "Unterschiedliche Raumintervalle",
    description: "Empfang, Sanitäranlagen und Küchen können häufiger gereinigt werden als Nebenräume oder einzelne Büros.",
  },
];

const representativeCards = [
  {
    title: "Empfang und Wartezone",
    description: "Reinigung von Böden, Sitzbereichen, Theken und frei zugänglichen Oberflächen.",
  },
  {
    title: "Besprechungsräume",
    description: "Pflege von Tischen, Stühlen, Böden und abgestimmten Flächen vor dem nächsten Termin.",
  },
  {
    title: "Glasflächen und Türen",
    description: "Reinigung sichtbarer Fingerabdrücke und Gebrauchsspuren im vereinbarten Umfang.",
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
    title: "Büroreinigung",
    description: "Regelmäßige Reinigung von Arbeitsplätzen, Gemeinschaftsflächen, Küchen und Sanitäranlagen.",
    linkLabel: "Mehr zur Büroreinigung",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Wiederkehrende Reinigungsleistungen für dauerhaft gepflegte Kanzleiräume.",
    linkLabel: "Mehr zur Unterhaltsreinigung",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie uns Standort, ungefähre Fläche, Anzahl der Räume und das gewünschte Reinigungsintervall mit.",
  },
  {
    title: "Anforderungen besprechen",
    description: "Wir klären Arbeitsplätze, Empfang, Besprechungsräume, Küchen, Sanitärbereiche, Zugangsregeln und Reinigungszeiten.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Die regelmäßig auszuführenden Arbeiten und nicht zu bearbeitenden Bereiche werden eindeutig beschrieben.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen und Intervalle.",
  },
  {
    title: "Kanzleireinigung starten",
    description: "Nach Ihrer Freigabe beginnt die Reinigung zum vereinbarten Termin. Bei verändertem Bedarf kann der Reinigungsplan später angepasst werden.",
  },
];

const costFactors = [
  "Größe der zu reinigenden Fläche",
  "Anzahl der Büros und Besprechungsräume",
  "Größe von Empfang und Wartebereich",
  "Anzahl der Sanitäranlagen",
  "Küchen und Gemeinschaftsräume",
  "gewünschte Reinigungshäufigkeit",
  "Bodenbeläge und empfindliche Oberflächen",
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
    description: "Die Reinigung wird passend zu Geschäftszeiten und Zugangsregelungen geplant.",
    icon: "clock" as const,
  },
  {
    title: "Klare Leistungsbeschreibung",
    description: "Sie wissen, welche Räume und Arbeiten im vereinbarten Umfang enthalten sind.",
    icon: "checklist" as const,
  },
  {
    title: "Rücksicht auf sensible Bereiche",
    description: "Unterlagen, Akten und nicht freigegebene Arbeitsmittel werden nicht eigenständig bewegt.",
    icon: "selection" as const,
  },
  {
    title: "Objektbezogene Planung",
    description: "Raumaufteilung, Besucherbereiche und Materialien werden im Reinigungsplan berücksichtigt.",
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
    question: "Was gehört zu einer Kanzleireinigung?",
    answer:
      "Der genaue Umfang wird individuell festgelegt. Typische Leistungen sind Bodenreinigung, Reinigung frei zugänglicher Oberflächen, Sanitärreinigung, Küchenreinigung, Abfallentsorgung sowie die Pflege von Empfangs- und Besprechungsbereichen.",
  },
  {
    question: "Für welche Kanzleien bietet Glanzwerk die Reinigung an?",
    answer:
      "Wir reinigen unter anderem Rechtsanwaltskanzleien, Notariate, Steuerkanzleien, Wirtschaftsprüfungen und Beratungsunternehmen in Berlin.",
  },
  {
    question: "Werden Akten und Unterlagen bewegt?",
    answer:
      "Persönliche Unterlagen, Akten und nicht freigegebene Arbeitsmaterialien werden nicht eigenständig bewegt. Der Umgang mit frei zugänglichen Arbeitsflächen wird vor Beginn abgestimmt.",
  },
  {
    question: "Ist eine Vertraulichkeitsvereinbarung möglich?",
    answer: "Ja, auf Wunsch treffen wir eine schriftliche Vertraulichkeitsvereinbarung mit Ihrer Kanzlei.",
  },
  {
    question: "Ist eine Reinigung außerhalb der Geschäftszeiten möglich?",
    answer:
      "Ja. Je nach Objekt und Einsatzplanung kann die Reinigung vor Arbeitsbeginn, nach Geschäftsschluss oder innerhalb anderer fest vereinbarter Zeitfenster stattfinden.",
  },
  {
    question: "Wie häufig sollte eine Kanzlei gereinigt werden?",
    answer:
      "Das hängt von Mitarbeiterzahl, Besucheraufkommen, Raumart und Nutzung ab. Empfang, Besprechungsräume, Küchen und Sanitäranlagen benötigen häufig kürzere Intervalle als wenig genutzte Nebenräume.",
  },
  {
    question: "Werden Fenster und Glastrennwände mitgereinigt?",
    answer:
      "Ja. Die Glas- und Fensterreinigung kann als ergänzende Leistung in regelmäßigen oder individuell vereinbarten Abständen eingeplant werden.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer:
      "Der Preis richtet sich unter anderem nach Fläche, Anzahl der Räume, Besucheraufkommen, Reinigungsintervall, Bodenbelägen, Reinigungszeit und gewünschtem Leistungsumfang.",
  },
  {
    question: "Muss die Kanzlei vorab besichtigt werden?",
    answer:
      "Nicht in jedem Fall. Bei größeren, komplexen oder hochwertig ausgestatteten Räumen kann eine Besichtigung sinnvoll sein, um den Aufwand realistisch einzuschätzen.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer:
      "Ja. Für die laufende Abstimmung erhalten Sie eine feste Kontaktperson, die Fragen und Änderungen Ihrem Objekt zuordnen kann.",
  },
  {
    question: "Was passiert, wenn ich mit einem Termin einmal nicht zufrieden bin?",
    answer:
      "Melden Sie den Mangel innerhalb von 24 Stunden nach dem Termin bei Ihrem Ansprechpartner. Bei berechtigten Fällen bessern wir zeitnah nach – die genauen Bedingungen unseres Nachbesserungs-Versprechens stehen auf der Über-uns-Seite.",
    relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Nutzen Sie das Kontaktformular oder den Preisrechner, rufen Sie uns unter ${siteConfig.phone} an oder schreiben Sie an ${siteConfig.email}. Hilfreich sind Angaben zu Standort, Fläche, Anzahl der Räume und gewünschtem Reinigungsintervall.`,
  },
];

export default function KanzleireinigungBerlinContent({
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
              Reinigung für Kanzleien und Beratungsunternehmen
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk übernimmt die regelmäßige Reinigung von Rechtsanwaltskanzleien,
              Notariaten, Steuerkanzleien, Wirtschaftsprüfungen und Beratungsunternehmen in
              Berlin. Reinigungsumfang, Intervalle und Einsatzzeiten werden passend zu Ihren
              Räumen, Arbeitsabläufen und Besucherzeiten festgelegt.
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
        <div className="relative z-[1] border-t border-line bg-white/85 backdrop-blur-sm">
          <div className="container-page grid grid-cols-1 gap-3 py-4 sm:grid-cols-3 sm:gap-4">
            {["Flexible Reinigungszeiten", "Fester Ansprechpartner", "Einsatz in allen zwölf Berliner Bezirken"].map(
              (label) => (
                <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-brand-900">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
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

      <GoogleReviewsAuto />

      {/* 2. Einleitung */}
      <Section background="tint" decor>
        <div className={midPhoto ? "grid gap-10 lg:grid-cols-2 lg:items-center" : undefined}>
          <div>
            <SectionHeading eyebrow="Reinigung im Kanzleialltag" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                In Kanzleien treffen konzentrierte Büroarbeit, vertrauliche Gespräche und
                regelmäßiger Mandantenverkehr aufeinander. Empfang, Besprechungsräume,
                Arbeitsplätze, Küchen und Sanitäranlagen werden unterschiedlich genutzt und
                benötigen deshalb einen abgestimmten Reinigungsplan.
              </p>
              <p>
                Besonders in repräsentativen Bereichen zählt ein ordentlicher Gesamteindruck.
                Gleichzeitig sollen Reinigungsarbeiten den laufenden Betrieb möglichst wenig
                beeinträchtigen. Deshalb stimmen wir vor dem Start ab, welche Räume gereinigt
                werden, wie häufig die Einsätze stattfinden und welche Zeitfenster geeignet sind.
              </p>
              <p>
                Je nach Bedarf kann die Reinigung vor Arbeitsbeginn, nach Geschäftsschluss oder
                innerhalb fest vereinbarter Zeiten erfolgen.
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

      {/* 3. Leistungen der Kanzleireinigung */}
      <Section background="white">
        <SectionHeading
          eyebrow="Möglicher Leistungsumfang"
          title={heading.sectionHeadings[1]}
          subtitle="Der konkrete Umfang richtet sich nach Ihren Räumen und den vereinbarten Leistungen. Die folgenden Arbeiten können einzeln oder miteinander kombiniert werden."
        />
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

      {/* 4. Diskrete Arbeitsweise */}
      <Section background="muted">
        <SectionHeading eyebrow="Rücksicht auf sensible Arbeitsbereiche" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In Kanzleien befinden sich häufig Akten, Schriftstücke, technische Geräte und
            persönliche Arbeitsunterlagen auf Schreibtischen oder in Besprechungsräumen. Deshalb
            müssen vor Beginn eindeutige Regeln für frei zugängliche und nicht zu bearbeitende
            Bereiche festgelegt werden.
          </p>
          <p>
            Unsere Reinigung konzentriert sich auf die vereinbarten Flächen. Persönliche
            Unterlagen, geschlossene Schränke, Akten und nicht freigegebene Arbeitsmittel werden
            nicht eigenständig bewegt oder bearbeitet.
          </p>
          <p>
            Zugangszeiten, Schlüsselregelungen und besondere Hinweise werden vor dem ersten
            Einsatz abgestimmt. Dadurch bleibt nachvollziehbar, welche Räume zugänglich sind und
            welche Bereiche besondere Rücksicht erfordern.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {discretionCards.map((card) => (
            <div key={card.title} className="rounded-card border border-line bg-white p-6 shadow-raise">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Reinigungsintervalle */}
      <Section background="white">
        <SectionHeading eyebrow="Passender Rhythmus für Ihre Kanzlei" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die passende Reinigungshäufigkeit hängt von Mitarbeiterzahl, Besucheraufkommen,
            Raumgröße und Nutzung ab. Empfang, Besprechungsräume, Sanitäranlagen und Küchen werden
            häufig stärker beansprucht als einzelne Büros oder Archivräume.
          </p>
          <p>
            Deshalb muss nicht jeder Bereich bei jedem Einsatz in demselben Umfang gereinigt
            werden. Ein sinnvoller Reinigungsplan unterscheidet zwischen stark frequentierten
            Räumen und weniger intensiv genutzten Nebenflächen.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* 6. Reinigung außerhalb der Geschäftszeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Reinigungsarbeiten sollen Mandantengespräche, Telefonate und konzentriertes Arbeiten
            möglichst wenig stören. Deshalb stimmen wir die Einsatzzeiten mit Ihnen ab.
          </p>
          <p>
            Viele Kanzleien bevorzugen eine Reinigung am frühen Morgen oder nach dem regulären
            Geschäftsschluss. In anderen Objekten kann ein festgelegtes Zeitfenster während des
            Tages sinnvoll sein.
          </p>
          <p>
            Welche Zeiten möglich sind, hängt von Zugangsregelungen, Objektgröße, gewünschtem
            Intervall und unserer Einsatzplanung ab. Vor dem Start werden die vereinbarten
            Zeitfenster eindeutig festgelegt.
          </p>
        </div>
      </Section>

      {/* 7. Repräsentative Bereiche */}
      <Section background="white">
        <SectionHeading eyebrow="Der erste Eindruck Ihrer Kanzlei" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Mandanten und Geschäftspartner nehmen eine Kanzlei häufig zuerst über den
            Eingangsbereich, den Empfang und die Besprechungsräume wahr. Gepflegte Böden, saubere
            Oberflächen und ordentliche Sitzbereiche tragen zu einem professionellen Gesamteindruck
            bei.
          </p>
          <p>
            Diese Bereiche werden oft stärker genutzt als einzelne Büroräume. Deshalb kann es
            sinnvoll sein, für Empfang, Wartezone und Besprechungsräume kürzere Reinigungsintervalle
            festzulegen.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {representativeCards.map((card, index) => (
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

      {/* 8. Materialgerechte Reinigung */}
      <Section background="muted">
        <SectionHeading eyebrow="Schutz von Mobiliar und Oberflächen" title={heading.sectionHeadings[6]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Kanzleien verfügen häufig über hochwertige Möbel, Holzoberflächen, Glaswände, textile
            Bodenbeläge, Naturstein oder empfindliche Beschichtungen. Diese Materialien benötigen
            unterschiedliche Reinigungsmittel und Arbeitsverfahren.
          </p>
          <p>
            Die Auswahl und Dosierung des Reinigungsmittels richtet sich nach Oberfläche,
            Verschmutzung und Herstellerangaben, nicht nach einem festen Standardprodukt.
          </p>
          <p>
            Unser Ziel ist eine sorgfältige Reinigung, ohne Möbel und Materialien durch ungeeignete
            oder unnötig aggressive Verfahren zu belasten. Desinfektionsmittel werden nur dort
            eingesetzt, wo dies vereinbart oder hygienisch erforderlich ist.
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

      {/* Farbcodierungssystem für Reinigungstücher */}
      <Section background="tint">
        <SectionHeading eyebrow="Hygienekonzept" title="Klare Zuordnung auch in Kanzleiräumen" />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Auch in einer Kanzlei mit Empfang, Besprechungsräumen und Sanitärbereich verhindert eine
          feste Farbzuordnung, dass Reinigungstücher zwischen unterschiedlich sensiblen Bereichen
          wechseln.
        </p>
        <div className="mt-8">
          <HygieneFarbcodeSystem title="Die Vorteile auf einen Blick" />
        </div>
        <Link
          href="/wissen/farbcodierung-reinigungstuecher"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Mehr zum Farbsystem im Glanzwerk Wissen
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </Section>

      {/* 9. Ergänzende Leistungen */}
      <Section background="white">
        <SectionHeading
          eyebrow="Zusätzliche Reinigung für Kanzleien"
          title={heading.sectionHeadings[7]}
          subtitle="Neben der laufenden Reinigung können weitere Arbeiten in größeren Abständen oder bei einem konkreten Anlass sinnvoll sein. Diese Leistungen werden gesondert abgestimmt."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supplementaryCards.map((card, index) => (
            <FadeIn
              key={card.title}
              delay={index * 60}
              className="rounded-card border border-line bg-white p-6 shadow-raise"
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

      {/* 10. Ablauf der Zusammenarbeit */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[8]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 11. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Kanzleireinigung" title={heading.sectionHeadings[9]} />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Der Preis richtet sich nicht allein nach der Quadratmeterzahl. Zwei gleich große
          Kanzleien können durch unterschiedliche Raumaufteilung, Besucherzahlen, Bodenbeläge und
          gewünschte Reinigungsintervalle einen verschiedenen Aufwand verursachen.
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
          Über den Preisrechner erhalten Sie eine erste Orientierung. Für ein verbindliches
          Angebot stimmen wir die konkreten Anforderungen Ihrer Kanzlei mit Ihnen ab.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/preisrechner">
              Preis kostenlos berechnen
            </Button>
          <Button href="/kontakt" variant="outline">
              Individuelles Angebot anfragen
            </Button>
        </div>
      </Section>

      {/* 12. Warum Glanzwerk */}
      <Section background="white">
        <SectionHeading
          eyebrow="Zusammenarbeit im Kanzleialltag"
          title={heading.sectionHeadings[10]}
          subtitle="Eine Kanzleireinigung soll zuverlässig funktionieren, ohne dass Leistungen bei jedem Einsatz neu erklärt werden müssen. Deshalb achten wir auf eindeutige Vereinbarungen und direkte Kommunikation."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyGlanzwerkCards.map((point, index) => (
            <FadeIn
              key={point.title}
              delay={index * 60}
              className="flex gap-4 rounded-card border border-line bg-white p-6 shadow-raise"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-500">
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
          <Link href="/leistungen/gebaeudereinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Gebäudereinigung
          </Link>{" "}
          und{" "}
          <Link href="/leistungen/praxisreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Praxisreinigung
          </Link>
          .
        </p>
      </Section>

      {/* 13. Kanzleireinigung in ganz Berlin */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Unser Einsatzgebiet"
          title={heading.sectionHeadings[11]}
          subtitle="Glanzwerk betreut Rechtsanwaltskanzleien, Notariate, Steuerkanzleien, Wirtschaftsprüfungen und Beratungsunternehmen in ganz Berlin. Dazu gehören zentrale Geschäftsstandorte ebenso wie Büroflächen in Wohn- und Gewerbegebieten."
        />
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
          erreichbaren Orten im Berliner Umland. Ob ein Einsatz möglich ist, hängt von
          Objektgröße, Reinigungsumfang und gewünschtem Intervall ab.
        </p>
        <div className="mt-8 max-w-lg">
          <BerlinEinsatzgebietKarte />
        </div>
      </Section>

      {/* Berlin-Abschnitt (getrennt vom Einsatzgebiet-Abschnitt oben) */}
      <Section background="white">
        <SectionHeading eyebrow="Berlin" title="Zwischen Geschäftsadresse und ruhiger Lage" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Berliner Kanzleien sitzen in repräsentativen Lagen wie rund um die
            Fasanenstraße oder in der Nähe der Gerichte in Mitte. Andere haben sich bewusst in
            ruhigeren Villenlagen etwa in Steglitz-Zehlendorf angesiedelt, fernab vom
            Publikumsverkehr der Innenstadt.
          </p>
          <p>
            Beide Adressformen haben denselben Anspruch an Vertraulichkeit, aber unterschiedliche
            Zugangswege: ein Geschäftshaus mit Empfang und mehreren Kanzleien unter einem Dach,
            oder ein einzelnes Büro mit eigenem Schlüssel. Wir stimmen die Reinigung auf die
            jeweilige Zutrittssituation ab.
          </p>
          <p>
            Mehr zu den einzelnen Bezirken finden Sie unter{" "}
            <Link href="/standorte" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Standorte
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* 14. Dreimonatige Testphase */}
      <Section background="muted">
        <CTASection
          title={heading.secondaryCtaHeading}
          subtitle="Sie möchten zunächst feststellen, ob Reinigungsleistung, Kommunikation und Abläufe zu Ihrer Kanzlei passen? Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung. Umfang, Termine und Bedingungen werden vor Beginn schriftlich abgestimmt."
          primaryLabel="Testphase anfragen"
          primaryHref="/3-monate-testen"
          secondaryLabel="Angebot erhalten"
          secondaryHref="/kontakt"
        />
      </Section>

      {/* 15. FAQ */}
      <Section background="white">
        <div className="mx-auto mb-12 max-w-3xl">
          <TrustSignals />
        </div>
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="kanzleireinigung" />
        </FadeIn>
      </Section>

      {/* Google-Unternehmensprofil — eigener Platz kurz vor dem Abschluss-CTA */}
      <Section background="white">
        <SectionHeading
          eyebrow="Auf Google zu finden"
          title="Unser Standort und Unternehmensprofil bei Google"
        />
        <div className="mt-8 max-w-md">
          <EinsatzgebietKarte />
        </div>
      </Section>

      {/* 16. Abschließender CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Ihre Kanzlei, die ungefähre Fläche, die Anzahl der Räume und den gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und klären mit Ihnen die nächsten Schritte."
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
