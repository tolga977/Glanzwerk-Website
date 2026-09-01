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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/autohausreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * die übrigen individuell verfassten Leistungsseiten. Anders als die meisten
 * anderen Leistungen enthält der Auftrag hier bewusst keine Testphasen-Sektion.
 */

const schaufensterPhoto = {
  src: "/images/leistungen/autohausreinigung-berlin/schaufenster.webp",
  alt: "Nasse Glasfläche eines Autohaus-Schaufensters mit Wassertropfen, im Hintergrund Grünpflanzen",
  caption: "Auf einer nassen Schaufensterscheibe ist jeder Tropfen sichtbar, bis der letzte Zug mit dem Abzieher folgt – genau die Flächen, die Kundinnen und Kunden zuerst sehen.",
};

const scopeCards = [
  {
    title: "Showroom-Böden",
    description: "Reinigung großflächiger Bodenbereiche passend zum vorhandenen Belag.",
  },
  {
    title: "Empfang und Beratung",
    description: "Pflege von Theken, Sitzbereichen, Tischen und frei zugänglichen Oberflächen.",
  },
  {
    title: "Glasflächen",
    description: "Reinigung von Glastüren, Trennwänden und vereinbarten Schaufensterflächen.",
  },
  {
    title: "Kundenbereiche",
    description: "Reinigung von Wartezonen, Lounges und weiteren Besucherflächen.",
  },
  {
    title: "Büros",
    description: "Regelmäßige Reinigung von Arbeitsplätzen, Besprechungsräumen und Gemeinschaftsflächen.",
  },
  {
    title: "Sanitäranlagen",
    description: "Reinigung von Toiletten, Waschbecken, Armaturen und Spiegeln.",
  },
  {
    title: "Küchen und Sozialräume",
    description: "Pflege von Arbeitsflächen, Spülen, Tischen und Böden.",
  },
  {
    title: "Eingangsbereiche",
    description: "Reinigung von Fußmatten, Türen, Laufwegen und stark frequentierten Flächen.",
  },
];

const rhythmCards = [
  {
    title: "Showroom",
    description: "In der Regel täglich, um Staub, Schlieren und Laufspuren gering zu halten.",
  },
  {
    title: "Sanitärbereiche",
    description: "Täglich bis mehrmals wöchentlich, abhängig vom Kunden- und Personalaufkommen.",
  },
  {
    title: "Büros und Sozialräume",
    description: "Meist mehrmals wöchentlich, angepasst an die tatsächliche Nutzung.",
  },
  {
    title: "Übergangszonen zur Werkstatt",
    description: "Eigener, engerer Rhythmus bei starkem Reifen- oder Ölabrieb.",
  },
];

const supplementaryLinks = [
  { label: "Glas- und Fensterreinigung", href: "/leistungen/glas-und-fensterreinigung-berlin" },
  { label: "Grundreinigung", href: "/leistungen/grundreinigung-berlin" },
  { label: "Büroreinigung", href: "/leistungen/bueroreinigung-berlin" },
  { label: "Gebäudereinigung", href: "/leistungen/gebaeudereinigung-berlin" },
  { label: "Unterhaltsreinigung", href: "/leistungen/unterhaltsreinigung-berlin" },
];

const processSteps = [
  {
    title: "Anfrage",
    description: "Teilen Sie uns Standort, Größe und Bereiche Ihres Autohauses mit.",
  },
  {
    title: "Bereiche und Öffnungszeiten klären",
    description: "Wir stimmen Showroom, Kundenbereiche, Büros und gewünschte Einsatzzeiten ab.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Der vereinbarte Umfang wird eindeutig beschrieben.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Ihrer Freigabe beginnt die Reinigung zum vereinbarten Termin.",
  },
];

const costFactors = [
  "Größe des Showrooms",
  "Bodenbeläge",
  "Glasflächen",
  "Anzahl der Kunden- und Büroräume",
  "Sanitärbereiche",
  "Öffnungszeiten",
  "Intervall",
  "ergänzende Leistungen",
];

const faqItems = [
  {
    question: "Welche Bereiche eines Autohauses werden gereinigt?",
    answer: "Je nach Vereinbarung Showroom, Empfang, Beratungsplätze, Büros, Sanitäranlagen, Küchen und Eingänge.",
  },
  {
    question: "Werden ausgestellte Fahrzeuge gereinigt?",
    answer: "Fahrzeugaufbereitung gehört nicht automatisch zur Gebäudereinigung und muss gegebenenfalls separat vereinbart werden.",
  },
  {
    question: "Ist der Werkstattbereich in der Reinigung enthalten?",
    answer:
      "Der eigentliche Werkstattbereich gehört meist nicht zum Standardumfang, da hier andere Reinigungsanforderungen gelten. Kundennahe Sozialräume in Werkstattnähe lassen sich auf Wunsch einbeziehen.",
  },
  {
    question: "Ist eine Reinigung vor besonderen Terminen möglich?",
    answer: "Ja, vor Kundentagen oder Veranstaltungen lässt sich ein zusätzlicher Reinigungstermin einplanen.",
  },
  {
    question: "Kann außerhalb der Öffnungszeiten gereinigt werden?",
    answer: "Ja, abhängig von Objekt und Einsatzplanung.",
  },
  {
    question: "Werden große Glasflächen gereinigt?",
    answer: "Ja, sofern Zugänglichkeit und Umfang vorab abgestimmt wurden.",
  },
  {
    question: "Wie häufig sollte ein Showroom gereinigt werden?",
    answer: "Das hängt von Kundenverkehr, Fläche, Bodenbelag und gewünschtem Erscheinungsbild ab.",
  },
  {
    question: "Sind Grundreinigungen möglich?",
    answer: "Ja, für stark beanspruchte Böden oder besondere Anlässe.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Bereichen, Intervall, Materialien und Reinigungszeiten.",
  },
  {
    question: "Was passiert, wenn ich mit einem Termin einmal nicht zufrieden bin?",
    answer:
      "Sprechen Sie uns direkt darauf an. Wir prüfen die Beanstandung und bessern in berechtigten Fällen zeitnah nach – die Bedingungen dazu finden Sie auf unserer Über-uns-Seite.",
    relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder ${siteConfig.email}.`,
  },
];

export default function AutohausreinigungBerlinContent({
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
              Glanzwerk übernimmt die regelmäßige Reinigung von Autohäusern,
              Fahrzeugausstellungen, Verkaufsbereichen, Büros und Kundenflächen in Berlin. Der
              Reinigungsplan wird an Öffnungszeiten, Besucheraufkommen und die unterschiedlichen
              Bereiche des Betriebs angepasst.
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

      <GoogleReviewsAuto />

      {/* Einleitung */}
      <Section background="tint" decor>
        <div className={midPhoto ? "grid gap-10 lg:grid-cols-2 lg:items-center" : undefined}>
          <div>
            <SectionHeading eyebrow="Gepflegter Gesamteindruck" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                In Autohäusern treffen großflächige Böden, Glasflächen, Fahrzeuge, Kundenverkehr
                und interne Arbeitsbereiche aufeinander. Staub, Reifenabrieb, Straßenschmutz und
                sichtbare Gebrauchsspuren können den Eindruck des Showrooms beeinträchtigen.
              </p>
              <p>
                Deshalb werden Ausstellungsflächen, Empfang, Beratungsplätze, Sanitäranlagen und
                Büros nicht automatisch nach demselben Rhythmus gereinigt.
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

      {/* Showroom */}
      <Section background="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Besondere Aufmerksamkeit" title={heading.sectionHeadings[2]} />
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Große, offene Flächen und helle Beleuchtung machen Staub, Schlieren und Laufspuren
                schnell sichtbar. Gleichzeitig muss die Reinigung so geplant werden, dass
                Fahrzeugpräsentation und Kundenverkehr möglichst wenig beeinträchtigt werden.
              </p>
            </div>
          </div>
          <ParallaxImage
            photo={schaufensterPhoto}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="shadow-deep"
          />
        </div>
      </Section>

      {/* Abgrenzung Fahrzeuge */}
      <Section background="white">
        <SectionHeading eyebrow="Klare Unterscheidung" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Autohausreinigung bezieht sich auf Räume, Böden, Glasflächen, Sanitäranlagen und
            vereinbarte Betriebsbereiche. Eine Fahrzeugaufbereitung oder Innen- und
            Außenreinigung ausgestellter Fahrzeuge ist nur Bestandteil des Angebots, wenn dies
            ausdrücklich separat vereinbart und tatsächlich angeboten wird.
          </p>
          <p>
            Diese Abgrenzung betrifft auch die Fläche unter und um ausgestellte Fahrzeuge: Der
            sichtbare Boden wird im vereinbarten Rhythmus mitgereinigt, eine Bewegung der Fahrzeuge
            selbst gehört jedoch nicht automatisch dazu und wird bei Bedarf vorab abgesprochen.
          </p>
        </div>
      </Section>

      {/* Einsatzzeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Je nach Betrieb kann die Reinigung vor Öffnung, nach Geschäftsschluss oder in
            abgestimmten Zeitfenstern erfolgen. Besondere Veranstaltungen, Fahrzeugpräsentationen
            oder saisonale Aktionen können bei rechtzeitiger Abstimmung berücksichtigt werden.
          </p>
        </div>
      </Section>

      {/* Rhythmus je nach Bereich */}
      <Section background="white">
        <SectionHeading
          eyebrow="Nicht jeder Bereich gleich oft"
          title={heading.sectionHeadings[5]}
          subtitle="Showroom, Sanitärbereiche, Büros und die Übergangszonen zur Werkstatt sind unterschiedlich stark beansprucht. Der Reinigungsplan berücksichtigt das."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rhythmCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 60} className="rounded-card border border-line bg-white p-6 shadow-raise">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </FadeIn>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-ink-soft">
          Diese Einteilung ist kein starres Schema: Steigt das Besucheraufkommen etwa durch eine
          neue Modellreihe oder eine Verkaufsaktion spürbar an, lässt sich der Rhythmus einzelner
          Bereiche entsprechend anpassen, statt am ursprünglich vereinbarten Plan festzuhalten.
        </p>
      </Section>

      {/* Sicherheit */}
      <Section background="muted">
        <SectionHeading eyebrow="Rutschgefahr im Blick" title={heading.sectionHeadings[6]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Frisch gewischte Böden im Showroom sind kurzzeitig rutschig – ein Risiko, das bei
            laufendem Kundenverkehr anders zu handhaben ist als in einem geschlossenen Büro. Wo
            nötig, setzen wir Warnschilder ein und stimmen den Ablauf so ab, dass stark
            frequentierte Bereiche nach Möglichkeit außerhalb der Stoßzeiten nass gewischt werden.
          </p>
          <p>
            Bei glatten Natursteinböden oder frisch versiegelten Oberflächen gilt diese Vorsicht
            besonders lange, da sie Feuchtigkeit langsamer abgeben als beschichtete Beläge.
          </p>
        </div>
      </Section>

      {/* Vorbereitung */}
      <Section background="white">
        <SectionHeading eyebrow="Kurze Abstimmung vorab" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Fahrzeuge, die im Reinigungsbereich stehen, lassen sich am schnellsten bewegen, wenn
            vorab klar ist, welche Flächen zum vereinbarten Termin frei sein sollen. Bei besonders
            wertvollen Ausstellungsstücken ist es hilfreich, das vorab zu benennen, damit wir
            entsprechend vorsichtig arbeiten.
          </p>
        </div>
      </Section>

      {/* Wechselnde Ausstellung */}
      <Section background="muted">
        <SectionHeading eyebrow="Flexibel bei besonderen Anlässen" title={heading.sectionHeadings[8]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Autohäuser wechseln ihre Ausstellungsflächen häufiger als viele andere Gewerbebetriebe
            – neue Modelle kommen hinzu, Sonderausstellungen oder Kundentage verändern kurzfristig
            den Zuschnitt des Showrooms. Ein zusätzlicher Reinigungstermin vor einem solchen Anlass
            lässt sich bei rechtzeitiger Anfrage einplanen, ohne den regulären Rhythmus zu
            verändern.
          </p>
        </div>
      </Section>

      {/* Übergangszonen */}
      <Section background="white">
        <SectionHeading eyebrow="Schnittstelle zur Werkstatt" title={heading.sectionHeadings[9]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            An Zufahrten und Übergängen zwischen Werkstatt und Kundenbereich sammeln sich häufig
            Reifenabrieb und Ölspuren, die in den eigentlichen Kundenbereich hineingetragen werden.
            Diese Übergangszonen lassen sich bei Bedarf mit einem eigenen, engeren Rhythmus
            behandeln, unabhängig vom übrigen Showroom.
          </p>
          <p>
            Gerade an Regentagen verstärkt sich dieser Effekt zusätzlich, da Feuchtigkeit von
            Fahrzeugen und Kundschaft den Schmutz weiter in Richtung Showroom trägt. In solchen
            Phasen lässt sich die Reinigung dieser Zonen bei Bedarf kurzfristig verdichten.
          </p>
        </div>
      </Section>

      {/* Auswahlkriterien */}
      <Section background="muted">
        <SectionHeading eyebrow="Worauf es ankommt" title={heading.sectionHeadings[10]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Nicht jede Reinigungsfirma hat Erfahrung mit den großen, offenen Flächen und der
            Kombination aus Kundenverkehr und wertvollen Ausstellungsstücken, die ein Autohaus
            mitbringt. Achten Sie auf einen Anbieter, der Termine zuverlässig auch außerhalb
            klassischer Bürozeiten anbietet, der auf Rückfragen zu speziellen Bodenbelägen oder
            Glasflächen konkret antworten kann und der einen festen Ansprechpartner benennt statt
            wechselnder Kontaktpersonen.
          </p>
        </div>
      </Section>

      {/* Realistische Erwartungen */}
      <Section background="white">
        <SectionHeading eyebrow="Ehrliche Einschätzung" title={heading.sectionHeadings[11]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Öl- und Reifenspuren, die über längere Zeit in einen porösen Estrich oder
            unversiegelten Fliesenboden eingezogen sind, lassen sich durch reguläre Reinigung oft
            nur verringern, nicht vollständig entfernen.
          </p>
          <p>
            Eine kurze Einschätzung vor Ort zeigt, was mit den vorhandenen Mitteln realistisch
            erreichbar ist. Bei stark betroffenen Flächen kann eine zusätzliche Grundreinigung
            sinnvoller sein als eine wiederholte reguläre Reinigung.
          </p>
        </div>
      </Section>

      {/* Abnahme und Rückmeldung */}
      <Section background="muted">
        <SectionHeading eyebrow="Kurzer Rundgang nach dem Termin" title={heading.sectionHeadings[12]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Bei größeren Terminen oder nach einer intensiveren Reinigung bietet sich ein kurzer
            gemeinsamer Rundgang durch Showroom und Kundenbereiche an, statt Rückfragen erst Tage
            später zu klären. So lässt sich direkt vor Ort besprechen, ob eine Stelle noch einmal
            nachbearbeitet werden sollte.
          </p>
          <p>
            Für die laufende Zusammenarbeit erhalten Sie einen festen Ansprechpartner, an den sich
            Ihr Team auch zwischen den regulären Terminen mit kurzfristigen Rückmeldungen wenden
            kann.
          </p>
        </div>
      </Section>

      {/* Materialschutz */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[13]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Showrooms kombinieren häufig Fliesen, Naturstein, beschichtete Böden, Glas, Metall
            und hochwertige Einrichtung. Glanzwerk wählt Verfahren und Reinigungsprodukte passend
            zu diesem Materialmix aus, statt ein einheitliches Vorgehen für alle Flächen anzusetzen.
          </p>
        </div>
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

      {/* Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[14]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Autohausreinigung" title={heading.sectionHeadings[15]} />
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
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[16]} />
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
        <div className="mt-8 max-w-lg">
          <BerlinEinsatzgebietKarte />
        </div>
      </Section>

      {/* Berlin-Abschnitt (getrennt vom Einsatzgebiet-Abschnitt oben) */}
      <Section background="muted">
        <SectionHeading eyebrow="Berlin" title="Autohäuser liegen meist am Stadtrand" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Showrooms und Werkstätten brauchen viel Fläche für Ausstellung, Kundenparkplätze und
            Anlieferung. Deshalb liegen die meisten Berliner Autohäuser nicht in der dichten
            Innenstadt, sondern entlang großer Ausfallstraßen und in Gewerbegebieten etwa in
            Spandau, Reinickendorf oder Marzahn.
          </p>
          <p>
            Diese Lagen sind gut mit dem Auto erreichbar, aber oft weitläufiger als ein
            Innenstadtstandort. Bei mehreren Autohäusern eines Händlers in unterschiedlichen
            Bezirken lässt sich die Reinigung über einen gemeinsamen Ansprechpartner koordinieren,
            statt für jeden Standort einzeln zu planen.
          </p>
          <p>
            Die Bezirke, in denen wir aktiv sind, stehen auf der{" "}
            <Link href="/standorte" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Standortseite
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <div className="mx-auto mb-12 max-w-3xl">
          <TrustSignals />
        </div>
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="autohausreinigung" />
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

      {/* Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Größe, Bereiche, Öffnungszeiten und gewünschten Rhythmus. Wir prüfen die Angaben und stimmen die nächsten Schritte ab."
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
