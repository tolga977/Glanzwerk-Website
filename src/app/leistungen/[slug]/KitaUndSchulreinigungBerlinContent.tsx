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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/kita-und-schulreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template: der bisherige generische
 * Auftritt war strukturell nahezu identisch mit der Fitnessstudioreinigung
 * (Audit-Befund P2-11, "strukturelle Zwillinge"). Diese Komponente führt
 * stattdessen den für Kitas/Schulen spezifischen Schwerpunkt – Betreuungs-
 * und Unterrichtszeiten, Träger/Hausmeisterdienste, Ferienplanung, gesetzlicher
 * Rahmen (IfSG) – statt des generischen "Reinigung stark frequentierter
 * Flächen"-Gerüsts, das auch für ein Fitnessstudio gelten könnte.
 */

const comboDistrictSlugs = new Set(
  combos.filter((combo) => combo.serviceSlug === "kita-und-schulreinigung-berlin").map((combo) => combo.districtSlug),
);

const scopeCards = [
  {
    title: "Gruppen- und Klassenräume",
    description: "Bodenreinigung, Abwischen frei zugänglicher Oberflächen und Ablagen.",
  },
  {
    title: "Sanitärbereiche",
    description: "Reinigung von Toiletten, Waschbecken und Armaturen, angepasst an Kindergrößen.",
  },
  {
    title: "Turnhallen und Bewegungsräume",
    description: "Bodenreinigung großer Flächen, die für Sport und Bewegung genutzt werden.",
  },
  {
    title: "Flure und Garderoben",
    description: "Pflege stark frequentierter Verkehrsflächen und Garderobenbereiche.",
  },
  {
    title: "Personal- und Verwaltungsräume",
    description: "Reinigung von Lehrer- und Personalzimmern sowie Verwaltungsbüros.",
  },
  {
    title: "Küchen- und Essbereiche",
    description: "Reinigung von Tischen, Böden und frei zugänglichen Flächen nach Absprache.",
  },
  {
    title: "Häufig berührte Kontaktflächen",
    description: "Türklinken, Lichtschalter, Geländer und Handläufe im vereinbarten Umfang.",
  },
  {
    title: "Abfallentsorgung",
    description: "Leerung vereinbarter Abfallbehälter unter Berücksichtigung der Mülltrennung.",
  },
];

const einrichtungsCards = [
  {
    title: "Kindertagesstätten",
    description: "Kleinere Gruppenräume, häufig genutzte Sanitärbereiche, kindgerechte Höhen und Materialien.",
  },
  {
    title: "Grundschulen und weiterführende Schulen",
    description: "Größere Flächen, Klassenräume mit festem Stundenplan, Turnhallen und Fachräume.",
  },
  {
    title: "Horte und Nachmittagsbetreuungen",
    description: "Reinigung außerhalb der Nachmittagsbetreuung, oft mit eigenem Zeitfenster.",
  },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Nennen Sie Einrichtungsart, Standort, Fläche und die üblichen Betreuungs- oder Unterrichtszeiten.",
  },
  {
    title: "Zeiten und Zuständigkeiten klären",
    description: "Wir sprechen Zutritt, Zeitfenster und Ansprechpartner direkt mit Träger, Schulleitung oder Hausmeisterdienst ab.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Regelmäßige Arbeiten und mögliche Zusatztermine in den Ferien werden schriftlich festgehalten.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen und Zeiten.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung zum vereinbarten Termin, außerhalb des Betreuungs- oder Unterrichtsbetriebs.",
  },
];

const costFactors = [
  "Fläche und Anzahl der Räume",
  "Anzahl der Kinder oder Schüler",
  "Anzahl der Sanitärbereiche",
  "gewünschte Reinigungshäufigkeit",
  "zusätzliche Ferientermine",
  "Bodenbeläge",
  "Reinigungszeiten",
  "zusätzliche Leistungen wie Grund- oder Glasreinigung",
];

const faqItems = [
  {
    question: "Was gehört zur Kita- und Schulreinigung?",
    answer:
      "Der genaue Umfang wird individuell festgelegt. Typische Leistungen sind die Reinigung von Gruppen- und Klassenräumen, Sanitärbereichen, Turnhallen, Fluren und Personalräumen.",
  },
  {
    question: "Warum gelten für Kitas und Schulen besondere Hygieneanforderungen?",
    answer:
      "Kindertagesstätten und Schulen sind als Gemeinschaftseinrichtungen im Infektionsschutzgesetz (IfSG) gesondert geregelt. Träger und Einrichtungsleitungen führen dafür in der Regel einen eigenen Hygieneplan. Unsere Reinigungsintervalle stimmen wir bei Bedarf auf die dort festgelegten Vorgaben ab.",
  },
  {
    question: "Werden kindgerechte Reinigungsmittel verwendet?",
    answer:
      "Wir setzen für Einrichtungen mit Kindern geeignete, schonende Reinigungsmittel ein und stimmen besondere Vorgaben Ihrer Einrichtung gerne vorab ab.",
  },
  {
    question: "Findet die Reinigung auch in den Ferien statt?",
    answer:
      "Ja, in den Ferien lassen sich zusätzliche, intensivere Reinigungstermine einplanen, etwa in Kombination mit einer Grundreinigung.",
  },
  {
    question: "Wie erfolgt die Abstimmung mit dem Hausmeisterdienst?",
    answer:
      "Wir sprechen Zutritt, Zeitfenster und Zuständigkeiten direkt mit Trägern und vorhandenen Hausmeisterdiensten ab, damit es keine Überschneidungen gibt.",
  },
  {
    question: "Unterscheidet sich der Umfang zwischen Kita und Schule?",
    answer:
      "Ja. Kitas benötigen häufig kleinere, aber intensiv genutzte Sanitärbereiche und kindgerechte Höhen, während Schulen größere Flächen, Fachräume und Turnhallen mit festem Stundenplan mitbringen.",
  },
  {
    question: "Kann während des laufenden Betreuungs- oder Unterrichtsbetriebs gereinigt werden?",
    answer:
      "In der Regel nicht in den Gruppen- oder Klassenräumen selbst. Die Reinigung findet außerhalb der Betreuungs- oder Unterrichtszeiten statt, etwa früh morgens oder nach Betreuungsende.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer:
      "Der Preis richtet sich unter anderem nach Fläche, Anzahl der Kinder oder Schüler, Sanitärbereichen, Reinigungsintervall und zusätzlichen Ferienterminen.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer:
      "Ja. Für die laufende Abstimmung mit Träger, Leitung oder Hausmeisterdienst erhalten Sie eine feste Kontaktperson.",
  },
  {
    question: "Was passiert, wenn ich mit einem Termin einmal nicht zufrieden bin?",
    answer:
      "Melden Sie den Mangel innerhalb von 24 Stunden nach dem Termin. Bei berechtigten Fällen bessern wir zeitnah nach – die genauen Bedingungen unseres Nachbesserungs-Versprechens stehen auf der Über-uns-Seite.",
    relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function KitaUndSchulreinigungBerlinContent({
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
              Reinigung für Kitas, Schulen und Horte
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk reinigt Gruppen- und Klassenräume, Sanitärbereiche, Turnhallen und
              Gemeinschaftsflächen in Berliner Kitas, Schulen und Horten – außerhalb der
              Betreuungs- und Unterrichtszeiten und abgestimmt mit Träger oder Hausmeisterdienst.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/kontakt">Unverbindliches Angebot anfragen</Button>
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
            <SectionHeading eyebrow="Reinigung außerhalb des Betreuungsalltags" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Trainingsgeräte oder Büroflächen werden von Erwachsenen genutzt – Gruppen- und
                Klassenräume dagegen von Kindern, die anders mit Flächen und Gegenständen umgehen.
                Sanitärbereiche werden in Kitas und Schulen besonders intensiv beansprucht, und
                Böden, Türklinken oder Handläufe geraten schneller in Kontakt mit vielen Händen als
                in den meisten anderen Gewerbeobjekten.
              </p>
              <p>
                Gleichzeitig lässt sich während des laufenden Betreuungs- oder Unterrichtsbetriebs
                kaum reinigen, ohne den Alltag zu stören. Reinigungstermine finden deshalb
                überwiegend früh morgens vor Betreuungsbeginn oder nach Betreuungsende statt – nicht
                zwischendurch.
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
            <FadeIn key={card.title} delay={index * 60} className="rounded-card border border-line bg-white p-6 shadow-raise">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Gesetzlicher Rahmen */}
      <Section background="muted">
        <SectionHeading eyebrow="Warum Hygiene hier besonders zählt" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Kindertagesstätten und Schulen gelten als Gemeinschaftseinrichtungen im Sinne des
            Infektionsschutzgesetzes (IfSG). Träger und Einrichtungsleitungen sind dafür
            verantwortlich, einen eigenen Hygieneplan zu führen, der unter anderem
            Reinigungsintervalle für Sanitärbereiche und häufig berührte Flächen vorsieht.
          </p>
          <p>
            Die vereinbarte Reinigung stimmen wir auf Wunsch so ab, dass sie zu den in Ihrem
            Hygieneplan festgelegten Vorgaben passt. Die inhaltliche Verantwortung für den
            Hygieneplan selbst bleibt bei Träger und Einrichtungsleitung – wir setzen die
            vereinbarten Reinigungsarbeiten zuverlässig um.
          </p>
        </div>
      </Section>

      {/* Betreuungs-/Unterrichtszeiten und Ferien */}
      <Section background="white">
        <SectionHeading eyebrow="Zwei Taktungen statt einer" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Während des laufenden Betriebs richten wir uns nach den Betreuungs- oder
            Unterrichtszeiten der Einrichtung – meist früh morgens vor Ankunft der ersten Kinder
            oder nach Betreuungsende am Nachmittag. Kurzfristige Änderungen, etwa durch bewegliche
            Ferientage oder Elternabende, lassen sich in Absprache berücksichtigen.
          </p>
          <p>
            In den Schulferien oder während der Betriebsschließzeiten einer Kita ergibt sich ein
            zweites, ruhigeres Zeitfenster: Ohne laufenden Betrieb lassen sich zusätzliche,
            intensivere Reinigungstermine einplanen, etwa in Kombination mit einer Grundreinigung
            von Böden oder stark genutzten Sanitärbereichen.
          </p>
          <p>
            Bewegliche Ferientage und regionale Feiertage unterscheiden sich zwischen einzelnen
            Bezirken und Schulformen – wir stimmen den Reinigungskalender deshalb individuell mit
            dem tatsächlichen Ferienplan Ihrer Einrichtung ab, statt einen einheitlichen Rhythmus
            für alle Standorte anzunehmen.
          </p>
        </div>
      </Section>

      {/* Träger/Hausmeister */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Ein Ansprechpartner für alle Beteiligten" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            An der Organisation einer Kita oder Schule sind oft mehrere Stellen beteiligt: der
            Träger, die Einrichtungsleitung und häufig ein eigener Hausmeisterdienst, der Zutritt,
            Schließanlage und technische Fragen verantwortet. Wir sprechen Zutritt, Zeitfenster und
            Zuständigkeiten direkt mit den jeweils richtigen Ansprechpartnern ab, statt Anfragen
            unkoordiniert an mehrere Stellen zu richten.
          </p>
          <p>
            Für die laufende Zusammenarbeit erhalten Sie umgekehrt eine feste Kontaktperson bei
            Glanzwerk, die Rückmeldungen direkt Ihrer Einrichtung zuordnen kann.
          </p>
        </div>
      </Section>

      {/* Zutritt ohne Kontakt zu Kindern */}
      <Section background="white">
        <SectionHeading eyebrow="Organisatorisch klar getrennt" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Reinigungstermine liegen bewusst außerhalb der Betreuungs- und Unterrichtszeiten – nicht
            nur aus organisatorischen Gründen, sondern auch, damit das Reinigungsteam zu keinem
            Zeitpunkt unbeaufsichtigten Kontakt zu Kindern hat. Zutritt erfolgt über die vorab mit
            Träger oder Hausmeisterdienst abgestimmten Schlüssel-, Code- oder Alarmregelungen.
          </p>
          <p>
            Diese klare zeitliche Trennung schafft für alle Beteiligten Klarheit darüber, wer sich
            wann im Gebäude aufhält, und vermeidet Überschneidungen mit dem laufenden
            Betreuungsbetrieb.
          </p>
        </div>
      </Section>

      {/* Objektarten */}
      <Section background="muted">
        <SectionHeading
          eyebrow="Passend zur Einrichtungsart"
          title={heading.sectionHeadings[6]}
          subtitle="Eine Kita hat andere Anforderungen als eine weiterführende Schule oder ein Hort. Wir richten Leistungsumfang und Rhythmus danach aus."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {einrichtungsCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 60} className="rounded-card border border-line bg-white p-6 shadow-raise">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Sommerferien-Grundreinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Ruhigeres Zeitfenster nutzen" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In den Sommerferien steht das Gebäude über mehrere Wochen ohne laufenden
            Betreuungsbetrieb zur Verfügung. Dieses Zeitfenster eignet sich besonders für eine
            Grundreinigung, die im Schulalltag kaum möglich wäre – etwa die intensive Aufbereitung
            von Turnhallenböden oder stark genutzten Sanitärbereichen.{" "}
            <Link href="/leistungen/grundreinigung-berlin" className="font-semibold text-brand-500 hover:underline">
              Mehr zur Grundreinigung
            </Link>
            .
          </p>
          <p>
            Da viele Einrichtungen dasselbe Zeitfenster nutzen möchten, lohnt sich eine frühzeitige
            Anfrage – Termine in den ersten Ferienwochen sind erfahrungsgemäß zuerst ausgebucht.
          </p>
        </div>
      </Section>

      {/* Materialschutz */}
      <Section background="muted">
        <SectionHeading eyebrow="Kindgerechte Reinigungsmittel" title={heading.sectionHeadings[8]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In Einrichtungen mit Kindern verwenden wir geeignete, schonende Reinigungsmittel und
            achten besonders auf Dosierung und Nachtrocknungszeit, bevor Räume wieder genutzt
            werden. Glanzwerk verwendet je nach Einsatzbereich professionelle Produkte, unter
            anderem von Kiehl, Dr. Schnell und Buzil.
          </p>
          <p>
            Besondere Vorgaben Ihrer Einrichtung – etwa zu bestimmten Duftstoffen, Allergien
            einzelner Kinder oder vorgeschriebenen Desinfektionsmitteln laut Hygieneplan –
            besprechen wir vorab konkret mit Ihnen.
          </p>
          <p>
            Gerade in Krippen- und Kita-Gruppen, in denen Kinder viel Zeit auf dem Boden verbringen
            oder Gegenstände in den Mund nehmen, wird bei Bodenflächen und häufig angefassten
            Spielbereichen besonders auf eine rückstandsarme Anwendung geachtet.
          </p>
        </div>
      </Section>

      {/* Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[9]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Kita- und Schulreinigung" title={heading.sectionHeadings[10]} />
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
          <Button href="/preisrechner">Preis kostenlos berechnen</Button>
          <Button href="/kontakt" variant="outline">
            Individuelles Angebot anfragen
          </Button>
        </div>
      </Section>

      {/* Einsatzgebiet */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[11]} />
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
          subtitle="Sie möchten zunächst feststellen, ob Reinigungsleistung, Kommunikation und Abläufe zu Ihrer Einrichtung passen? Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung."
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
          <FAQ items={faqItems} idPrefix="kita-schulreinigung" />
        </FadeIn>
      </Section>

      {/* Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Einrichtungsart, Fläche, Anzahl der Kinder oder Schüler und die üblichen Betreuungs- oder Unterrichtszeiten. Wir prüfen Ihre Angaben und klären die nächsten Schritte."
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
