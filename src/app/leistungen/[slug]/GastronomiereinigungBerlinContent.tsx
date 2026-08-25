import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import BerlinEinsatzgebietKarte from "@/components/ui/BerlinEinsatzgebietKarte";
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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/gastronomiereinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * die übrigen individuell verfassten Leistungsseiten. Enthält bewusst keine
 * Aussagen zu HACCP, Lebensmittelhygiene-Zertifizierungen, behördlicher
 * Anerkennung, garantierter Keimfreiheit oder Spezialreinigung von
 * Abluftanlagen/Fettabscheidern, da diese nicht nachgewiesen sind.
 */

const scopeCards = [
  {
    title: "Gasträume",
    description: "Reinigung von Böden, frei zugänglichen Tischen, Sitzbereichen und vereinbarten Oberflächen.",
  },
  {
    title: "Eingangsbereiche",
    description: "Pflege von Türen, Matten, Laufwegen und sichtbaren Kontaktflächen.",
  },
  {
    title: "Sanitäranlagen",
    description: "Reinigung von Toiletten, Waschbecken, Armaturen, Spiegeln und Trennwänden.",
  },
  {
    title: "Thekenumfeld",
    description: "Reinigung vereinbarter, frei zugänglicher Flächen rund um Theke und Ausschank.",
  },
  {
    title: "Böden",
    description: "Saugen, Kehren, Feucht- oder Nasswischen passend zum Bodenbelag.",
  },
  {
    title: "Personalräume",
    description: "Reinigung von Aufenthaltsräumen, Umkleiden und vereinbarten Nebenflächen.",
  },
  {
    title: "Abfallbehälter",
    description: "Leerung vereinbarter Behälter unter Berücksichtigung vorhandener Trennsysteme.",
  },
  {
    title: "Glasflächen",
    description: "Reinigung von Glastüren, Fenstern und Trennwänden als vereinbarte Leistung.",
  },
];

const supplementaryLinks = [
  { label: "Glas- und Fensterreinigung", href: "/leistungen/glas-und-fensterreinigung-berlin" },
  { label: "Grundreinigung", href: "/leistungen/grundreinigung-berlin" },
  { label: "Gebäudereinigung", href: "/leistungen/gebaeudereinigung-berlin" },
  { label: "Unterhaltsreinigung", href: "/leistungen/unterhaltsreinigung-berlin" },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Nennen Sie Betriebsart, Standort, Größe und Öffnungszeiten.",
  },
  {
    title: "Bereiche abstimmen",
    description: "Wir klären Gastraum, Sanitäranlagen, Thekenumfeld, Nebenräume und mögliche Ausschlüsse.",
  },
  {
    title: "Zeitfenster festlegen",
    description: "Die Reinigung wird passend zu Betriebs- und Zugangszeiten geplant.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der vereinbarten Leistungen.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung zum abgestimmten Termin.",
  },
];

const costFactors = [
  "Betriebsgröße",
  "Anzahl der Gasträume",
  "Gästeaufkommen",
  "Sanitärbereiche",
  "Bodenbeläge",
  "Öffnungs- und Reinigungszeiten",
  "gewünschtes Intervall",
  "vereinbarte Küchen- oder Zusatzbereiche",
  "Glas- und Grundreinigung",
];

const faqItems = [
  {
    question: "Welche Bereiche eines Restaurants werden gereinigt?",
    answer: "Je nach Vereinbarung Gasträume, Eingänge, Sanitäranlagen, Böden, Thekenumfeld und Personalbereiche.",
  },
  {
    question: "Ist die Küche automatisch enthalten?",
    answer: "Nein. Küchenbereiche und spezielle Geräte müssen ausdrücklich vereinbart werden.",
  },
  {
    question: "Reinigt Glanzwerk Abluftanlagen oder Fettabscheider?",
    answer: "Solche Spezialleistungen dürfen nur angeboten werden, wenn sie ausdrücklich im Leistungsangebot vorhanden sind.",
  },
  {
    question: "Kann nach Betriebsschluss gereinigt werden?",
    answer: "Je nach Öffnungszeiten und Einsatzplanung können passende Zeitfenster abgestimmt werden.",
  },
  {
    question: "Wird überall desinfiziert?",
    answer: "Nein. Desinfektion erfolgt nur dort, wo sie vereinbart oder erforderlich ist.",
  },
  {
    question: "Wie oft sollte ein Gastronomiebetrieb gereinigt werden?",
    answer: "Das hängt von Gästeaufkommen, Betriebsart, Öffnungszeiten und Nutzung der einzelnen Bereiche ab.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Bereichen, Intervall, Reinigungszeiten und vereinbartem Leistungsumfang.",
  },
  {
    question: "Was passiert, wenn ich mit einem Termin einmal nicht zufrieden bin?",
    answer:
      "Melden Sie den Mangel innerhalb von 24 Stunden nach dem Termin bei Ihrem Ansprechpartner. Bei berechtigten Fällen bessern wir zeitnah nach – die genauen Bedingungen unseres Nachbesserungs-Versprechens stehen auf der Über-uns-Seite.",
    relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GastronomiereinigungBerlinContent({
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
              Glanzwerk übernimmt abgestimmte Reinigungsarbeiten in Restaurants, Cafés, Bars,
              Kantinen und weiteren gastronomischen Betrieben in Berlin. Reinigungsumfang und
              Einsatzzeiten werden an Öffnungszeiten, Nutzung und die unterschiedlichen Bereiche
              des Betriebs angepasst.
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
            <SectionHeading eyebrow="Reinigung im laufenden Betrieb" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Gastronomische Betriebe werden täglich intensiv genutzt. In Gasträumen entstehen
                Krümel, Laufspuren und Getränkerückstände, während Sanitäranlagen und
                Eingangsbereiche durch viele Gäste stark beansprucht werden.
              </p>
              <p>
                Reinigungsarbeiten müssen deshalb klar geplant und mit den Betriebszeiten
                abgestimmt werden. Nicht jeder Bereich gehört automatisch zum gleichen
                Leistungsumfang.
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

      {/* Küchenbereiche */}
      <Section background="muted">
        <SectionHeading eyebrow="Klare Abgrenzung" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In gastronomischen Betrieben müssen Gastraumreinigung und spezielle Küchenreinigung
            klar voneinander getrennt werden. Arbeitsflächen, Geräte, Abluftanlagen,
            Fettabscheider und lebensmittelverarbeitende Bereiche können besondere Anforderungen
            haben.
          </p>
          <p>
            Solche Leistungen werden nur genannt, wenn sie ausdrücklich vereinbart und technisch
            tatsächlich angeboten werden.
          </p>
          <p>
            Diese Trennung schützt beide Seiten: Sie wissen genau, wofür der vereinbarte
            Reinigungsvertrag gilt, und wir übernehmen keine Zusagen zu Bereichen, die besondere
            technische Ausstattung oder Fachkenntnisse voraussetzen.
          </p>
        </div>
      </Section>

      {/* Reinigung und Desinfektion */}
      <Section background="white">
        <SectionHeading eyebrow="Gezielter Einsatz" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Nicht jede Fläche muss pauschal desinfiziert werden. Desinfektionsmittel werden nur
            dort eingesetzt, wo dies vereinbart oder hygienisch erforderlich ist.
          </p>
        </div>
      </Section>

      {/* Einsatzzeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Je nach Öffnungszeiten kann die Reinigung vor dem ersten Gast, nach Betriebsschluss
            oder innerhalb festgelegter Zeitfenster stattfinden. Nacht- oder Wochenendleistungen
            werden nur genannt, wenn sie tatsächlich planbar sind.
          </p>
        </div>
      </Section>

      {/* Vorbereitung */}
      <Section background="white">
        <SectionHeading eyebrow="Kurze Abstimmung erleichtert den Ablauf" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Ein paar einfache Vorbereitungen erleichtern den Ablauf: Werden Stühle nach
            Betriebsschluss hochgestellt und Tische freigeräumt, lassen sich Böden schneller und
            gründlicher bearbeiten. Bargeld, Wertgegenstände und sensible Unterlagen sollten wie in
            jedem Gewerbebetrieb nicht offen zugänglich liegen bleiben.
          </p>
          <p>
            Zugangsregelungen für die Reinigungszeit außerhalb der Öffnungszeiten – etwa Schlüssel,
            Code oder ein anwesender Mitarbeiter – werden vorab schriftlich festgehalten, damit am
            Reinigungstag nichts ungeklärt bleibt.
          </p>
        </div>
      </Section>

      {/* Betriebsarten */}
      <Section background="muted">
        <SectionHeading eyebrow="Angepasst an den Betrieb" title={heading.sectionHeadings[6]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Ein Schnellrestaurant mit hohem Gästedurchlauf hat einen anderen Reinigungsbedarf als
            ein Café mit ruhigeren Tagesrandzeiten oder eine Kantine mit festen Essenszeiten. Wir
            richten Umfang und Intervall nach der tatsächlichen Betriebsart aus – von der
            täglichen Reinigung stark frequentierter Gasträume bis zu selteneren Terminen für
            ruhigere Betriebe.
          </p>
        </div>
      </Section>

      {/* Sonderanlässe */}
      <Section background="white">
        <SectionHeading eyebrow="Flexibel bei besonderen Anlässen" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Private Feiern, Firmenveranstaltungen oder saisonale Aktionen bringen oft ein höheres
            Gästeaufkommen oder eine andere Nutzung der Räume mit sich als der reguläre Betrieb.
            Für solche Anlässe lässt sich zusätzlich zum bestehenden Reinigungsplan ein einmaliger
            Termin vereinbaren, etwa am Folgetag einer größeren Veranstaltung.
          </p>
          <p>
            Wie kurzfristig ein solcher Zusatztermin möglich ist, hängt von der aktuellen
            Einsatzplanung ab – eine frühzeitige Anfrage schafft mehr Spielraum bei der Terminwahl.
          </p>
        </div>
      </Section>

      {/* Terrassen */}
      <Section background="muted">
        <SectionHeading eyebrow="Auch außerhalb des Gastraums" title={heading.sectionHeadings[8]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele gastronomische Betriebe haben Terrassen oder Außensitzbereiche, die anderen
            Verschmutzungen ausgesetzt sind als der Innenraum – Laub, Vogelkot, Straßenstaub und
            Witterung wirken hier unmittelbarer.
          </p>
          <p>
            Je nach Saison und Wetterlage lässt sich für Außenflächen ein eigener Rhythmus
            vereinbaren, unabhängig vom Reinigungsplan des Gastraums.
          </p>
        </div>
      </Section>

      {/* Zusammenspiel Personal */}
      <Section background="white">
        <SectionHeading eyebrow="Klare Aufgabenteilung" title={heading.sectionHeadings[9]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Manche Aufgaben, etwa das Abwischen von Tischen zwischen zwei Gästen oder das
            Nachfüllen von Servietten, übernimmt in der Regel das eigene Servicepersonal während
            des laufenden Betriebs. Die vereinbarte Reinigung deckt die tiefergehende, regelmäßige
            Pflege ab – etwa Böden, Sanitärbereiche und Kontaktflächen außerhalb der unmittelbaren
            Servicezeiten.
          </p>
          <p>
            Diese Aufteilung legen wir vor Beginn konkret fest, damit keine Aufgabe doppelt oder
            gar nicht erledigt wird.
          </p>
        </div>
      </Section>

      {/* Technische Abgrenzung */}
      <Section background="muted">
        <SectionHeading eyebrow="Weitere Leistungsgrenzen" title={heading.sectionHeadings[10]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Lüftungs- und Dunstabzugsanlagen benötigen eine technische Wartung durch spezialisierte
            Fachbetriebe und sind kein Bestandteil der Gastronomiereinigung. Auch eine
            Schädlingsbekämpfung ist eine eigene Leistung mit eigenen rechtlichen Anforderungen und
            wird nicht von uns übernommen.
          </p>
        </div>
      </Section>

      {/* Neueröffnung */}
      <Section background="white">
        <SectionHeading eyebrow="Sauberer Start" title={heading.sectionHeadings[11]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Vor der Neueröffnung eines gastronomischen Betriebs oder nach Umbau- und
            Renovierungsarbeiten liegt in der Regel eine andere Ausgangslage vor als im laufenden
            Betrieb: Baustaub, Reste von Schutzfolien oder Verschmutzungen an neu verlegten Böden
            erfordern eine intensivere Erstreinigung.
          </p>
          <p>
            Eine Grundreinigung vor der Eröffnung schafft die Ausgangsbasis, auf der die
            anschließende, regelmäßige Gastronomiereinigung aufbauen kann.{" "}
            <Link href="/leistungen/grundreinigung-berlin" className="font-semibold text-brand-500 hover:underline">
              Mehr zur Grundreinigung
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Materialgerechte Reinigung */}
      <Section background="muted">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[12]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Holz, Fliesen, Naturstein, Edelstahl, Glas und beschichtete Flächen benötigen
            unterschiedliche Verfahren. Glanzwerk verwendet je nach Einsatzbereich professionelle
            Produkte, unter anderem von Kiehl, Dr. Schnell und Buzil.
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

      {/* Auswahlkriterien */}
      <Section background="white">
        <SectionHeading eyebrow="Worauf Sie achten sollten" title={heading.sectionHeadings[13]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Bei der Auswahl eines Reinigungsdienstleisters für einen gastronomischen Betrieb lohnt
            sich ein Blick auf einige konkrete Punkte: Wird nach Betriebsart, Gästeaufkommen und
            tatsächlichen Öffnungszeiten gefragt, oder wird ein pauschaler Preis ohne Bezug zum
            Betrieb genannt? Lässt sich die Reinigung flexibel auf frühe, späte oder
            Wochenendtermine legen, ohne den laufenden Service zu stören?
          </p>
          <p>
            Ebenso wichtig ist eine klare, schriftliche Abgrenzung dessen, was zur vereinbarten
            Reinigung gehört und was Sache des eigenen Personals oder spezialisierter Fachbetriebe
            bleibt – etwa bei Küchengeräten, Abluftanlagen oder Fettabscheidern. Ein fester
            Ansprechpartner für kurzfristige Rückfragen rundet eine verlässliche Zusammenarbeit ab.
          </p>
        </div>
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
        <SectionHeading eyebrow="Preis der Gastronomiereinigung" title={heading.sectionHeadings[15]} />
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
      </Section>

      {/* Berlin-Abschnitt (getrennt vom Einsatzgebiet-Abschnitt oben) */}
      <Section background="white">
        <SectionHeading eyebrow="Berlin" title="Enge Kiezlagen und größere Gastronomiebetriebe" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In dicht besiedelten Kiezen wie Prenzlauer Berg, Kreuzberg oder Neukölln liegen viele
            kleinere Restaurants und Cafés auf begrenzter Fläche, oft mit Küche und Gastraum
            direkt nebeneinander. In Einkaufszentren der äußeren Bezirke sind gastronomische
            Betriebe dagegen häufig großzügiger geschnitten, mit getrennten Bereichen für Küche,
            Theke und Gastraum.
          </p>
          <p>
            Bei kleineren Betrieben stimmen wir Zeitfenster besonders eng mit Küche und Service
            ab, damit sich niemand in die Quere kommt. Bei größeren Flächen lässt sich die
            Reinigung eher in einzelne Bereiche aufteilen.
          </p>
          <p>
            Eine Übersicht der Bezirke finden Sie auf der{" "}
            <Link href="/standorte" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Standortseite
            </Link>
            .
          </p>
        </div>
        <div className="mt-8 max-w-lg">
          <BerlinEinsatzgebietKarte />
        </div>
      </Section>

      {/* Testphase */}
      <Section background="muted">
        <CTASection
          title={heading.secondaryCtaHeading}
          subtitle="Sie möchten zunächst feststellen, ob Reinigungsleistung, Kommunikation und Abläufe zu Ihrem Betrieb passen? Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung. Umfang, Termine und Bedingungen werden vor Beginn schriftlich abgestimmt."
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
          <FAQ items={faqItems} idPrefix="gastronomiereinigung" />
        </FadeIn>
      </Section>

      {/* Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Betriebsart, Größe, Öffnungszeiten und gewünschte Reinigungsbereiche. Wir prüfen Ihre Angaben und stimmen die nächsten Schritte ab."
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
