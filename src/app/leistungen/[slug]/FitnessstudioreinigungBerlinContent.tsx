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
import HygieneFarbcodeSystem from "@/components/ui/HygieneFarbcodeSystem";
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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/fitnessstudioreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template: der bisherige generische
 * Auftritt war strukturell nahezu identisch mit der Kita- und Schulreinigung
 * (Audit-Befund P2-11, "strukturelle Zwillinge"). Diese Komponente führt
 * stattdessen den für Fitnessstudios spezifischen Schwerpunkt – Peak-Zeiten,
 * Zutrittssysteme ohne durchgehendes Personal, Abgrenzung zu vom Studio selbst
 * bereitgestellten Hygienestationen – statt des generischen
 * "Reinigung stark frequentierter Flächen"-Gerüsts.
 */

const comboDistrictSlugs = new Set(
  combos.filter((combo) => combo.serviceSlug === "fitnessstudioreinigung-berlin").map((combo) => combo.districtSlug),
);

const scopeCards = [
  {
    title: "Trainingsgeräte",
    description: "Abwischen von Griffen, Sitzflächen und Kontaktpunkten an Kraft- und Ausdauergeräten.",
  },
  {
    title: "Trainingsflächen",
    description: "Bodenreinigung in Freihantelbereichen, Funktionszonen und Kursräumen.",
  },
  {
    title: "Umkleiden und Spinde",
    description: "Reinigung von Böden, Bänken und frei zugänglichen Oberflächen.",
  },
  {
    title: "Duschen und Sanitärbereiche",
    description: "Reinigung von Duschen, Toiletten, Waschbecken und Armaturen.",
  },
  {
    title: "Empfang und Wartebereich",
    description: "Pflege von Theken, Sitzbereichen und Eingangsflächen.",
  },
  {
    title: "Matten und Trainingszubehör",
    description: "Reinigung frei zugänglicher Matten und Kleingeräte nach Vereinbarung.",
  },
  {
    title: "Getränke- und Aufenthaltsbereiche",
    description: "Reinigung von Tischen, Sitzgelegenheiten und Getränkestationen.",
  },
  {
    title: "Abfallentsorgung",
    description: "Leerung vereinbarter Abfallbehälter im festgelegten Turnus.",
  },
];

const studioTypeCards = [
  {
    title: "Boutique- und Personal-Training-Studios",
    description: "Kleinere Flächen mit festen Kurszeiten und überschaubarer Geräteausstattung.",
  },
  {
    title: "Große Fitnesscenter mit mehreren Bereichen",
    description: "Ausgedehnte Trainingsflächen, mehrere Umkleide- und Sanitärbereiche, oft mit durchgehendem Betrieb.",
  },
  {
    title: "24/7-Studios ohne durchgehendes Personal",
    description: "Zutritt ausschließlich über elektronische Systeme, Reinigung in fest abgestimmten Zeitfenstern.",
  },
];

const frequencyCards = [
  {
    title: "Vor Öffnung",
    description: "Grundreinigung von Flächen, die über Nacht abkühlen und wieder einsatzbereit sein müssen.",
  },
  {
    title: "In Nebenzeiten",
    description: "Kurze Zwischenreinigung in ruhigeren Stunden zwischen den Trainings-Stoßzeiten.",
  },
  {
    title: "Nach Kursende",
    description: "Reinigung von Kursräumen und Matten nach intensiv genutzten Gruppenstunden.",
  },
  {
    title: "Nach Betriebsschluss",
    description: "Umfassendere Reinigung, wenn keine Mitglieder mehr im Studio sind.",
  },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Nennen Sie Studiogröße, Öffnungszeiten und die am stärksten frequentierten Tageszeiten.",
  },
  {
    title: "Zutritt klären",
    description: "Wir stimmen ab, wie das Reinigungsteam Zugang erhält – über Schlüssel, Zugangscode oder ein elektronisches Zutrittssystem.",
  },
  {
    title: "Leistungsumfang festlegen",
    description: "Trainingsflächen, Umkleiden, Sanitärbereiche und mögliche Zwischenreinigungen werden eindeutig beschrieben.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen und Zeiten.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung im vereinbarten Rhythmus, angepasst an Ihre Frequentierung.",
  },
];

const costFactors = [
  "Fläche der Trainingsbereiche",
  "Anzahl der Geräte",
  "Anzahl der Umkleiden und Duschen",
  "Mitgliederzahl beziehungsweise Frequentierung",
  "gewünschte Reinigungshäufigkeit",
  "Zwischenreinigungen zu Stoßzeiten",
  "Reinigungszeiten",
  "zusätzliche Leistungen wie Grundreinigung",
];

const faqItems = [
  {
    question: "Was gehört zur Fitnessstudioreinigung?",
    answer:
      "Der genaue Umfang wird individuell festgelegt. Typische Leistungen sind die Reinigung von Trainingsgeräten, Trainingsflächen, Umkleiden, Duschen, Empfang und Aufenthaltsbereichen.",
  },
  {
    question: "Wie erhält das Reinigungsteam Zutritt, wenn niemand vom Studio anwesend ist?",
    answer:
      "Viele Studios arbeiten mit elektronischen Zutrittssystemen oder Zeitschlössern statt durchgehender Personalbesetzung. Wir stimmen vorab ab, ob Zugang über einen Code, eine Chipkarte oder einen Schlüssel erfolgt, und klären, wie mit Alarmanlagen umzugehen ist.",
  },
  {
    question: "Wer ist für die Sprühflaschen an den Trainingsgeräten zuständig?",
    answer:
      "Die von vielen Studios selbst bereitgestellten Desinfektionsspender für Mitglieder zwischen zwei Trainingseinheiten sind Sache des Studiobetriebs, nicht Teil der vereinbarten Reinigung. Unsere Leistung deckt die grundlegende, regelmäßige Reinigung der Geräte und Flächen ab.",
  },
  {
    question: "Ist eine Reinigung zwischen Kursen möglich?",
    answer:
      "Ja, bei Bedarf planen wir kurze Reinigungseinsätze zwischen Kursen ein, etwa für Matten und häufig genutzte Geräte.",
  },
  {
    question: "Werden Gerüche in Umkleiden und Duschen behandelt?",
    answer:
      "Eine gründliche Reinigung reduziert Gerüche spürbar. Bei besonderem Bedarf sprechen wir zusätzliche Maßnahmen gezielt mit Ihnen ab.",
  },
  {
    question: "Ist eine Reinigung am Wochenende möglich?",
    answer:
      "Ja, wir richten den Reinigungsplan nach den tatsächlichen Öffnungszeiten Ihres Studios, auch am Wochenende.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer:
      "Der Preis richtet sich unter anderem nach Fläche, Anzahl der Geräte, Umkleiden und Duschen, Frequentierung und gewünschtem Reinigungsintervall.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer: "Ja. Für die laufende Abstimmung erhalten Sie eine feste Kontaktperson.",
  },
  {
    question: "Was passiert, wenn ich mit einem Termin einmal nicht zufrieden bin?",
    answer:
      "Sagen Sie uns Bescheid, was nicht gestimmt hat. Ist die Beanstandung berechtigt, bessern wir zeitnah nach – die genauen Bedingungen unseres Nachbesserungs-Versprechens stehen auf der Über-uns-Seite.",
    relatedLink: { label: "Zu unserem Nachbesserungs-Versprechen", href: "/ueber-uns#garantie" },
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function FitnessstudioreinigungBerlinContent({
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
              Reinigung für Fitnessstudios und Kursräume
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk reinigt Trainingsflächen, Geräte, Umkleiden und Duschen in Berliner
              Fitnessstudios – im Rhythmus der tatsächlichen Frequentierung und mit Zugang auch
              außerhalb der Öffnungszeiten mit Personal vor Ort.
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
            <SectionHeading eyebrow="Hoher Durchsatz, kurze Kontaktflächen" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Ein Trainingsgerät wird an einem einzigen Vormittag von deutlich mehr Personen
                berührt als ein Schreibtisch in einem Büro. Griffe, Sitzflächen und Matten geraten
                dadurch in kurzer Zeit in Kontakt mit vielen unterschiedlichen Nutzenden – eine
                andere Ausgangslage als in den meisten übrigen Gewerbeobjekten.
              </p>
              <p>
                Hinzu kommt, dass viele Studios ohne durchgehende Personalbesetzung auskommen:
                Mitglieder kommen und gehen über elektronische Zutrittssysteme, oft auch früh
                morgens oder spät abends. Die Reinigung muss deshalb organisatorisch anders
                gedacht werden als in einem Objekt mit festen Bürozeiten und einer Rezeption, die
                durchgehend besetzt ist.
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

      {/* Zutritt */}
      <Section background="muted">
        <SectionHeading eyebrow="Zugang ohne Personal vor Ort" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Fitnessstudios setzen auf elektronische Zutrittssysteme, Chipkarten oder
            Zeitschlösser statt auf eine durchgehend besetzte Rezeption. Für die Reinigung bedeutet
            das: Zugang, Alarmanlage und mögliche Sicherheitsvorgaben müssen vorab eindeutig
            geklärt sein, bevor der erste Termin stattfindet.
          </p>
          <p>
            Wir stimmen deshalb konkret ab, ob das Reinigungsteam über einen Code, eine Chipkarte
            oder einen Schlüssel Zutritt erhält, und wie im Fall eines ausgelösten Alarms zu
            verfahren ist – damit ein früher oder später Termin nicht zum Problem wird.
          </p>
          <p>
            Auch der Umgang mit Videoüberwachung, sofern vorhanden, wird vorab kurz angesprochen –
            nicht aus Misstrauen, sondern damit im Fall einer technischen Auffälligkeit klar ist,
            wer wann im Gebäude war.
          </p>
        </div>
      </Section>

      {/* Frequenzabhängiger Rhythmus */}
      <Section background="white">
        <SectionHeading
          eyebrow="Reinigung im Rhythmus der Frequentierung"
          title={heading.sectionHeadings[3]}
          subtitle="Ein Fitnessstudio hat selten eine gleichmäßige Auslastung über den Tag verteilt. Wir richten Zeitpunkt und Intensität der Reinigung danach aus."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {frequencyCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 60} className="rounded-card border border-line bg-white p-6 shadow-raise">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Abgrenzung Hygienestationen */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Klare Aufgabenteilung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Studios stellen ihren Mitgliedern eigene Desinfektionsspender oder Papiertücher
            bereit, damit Geräte direkt nach der Nutzung selbst abgewischt werden können. Diese
            Zwischenreinigung durch die Mitglieder selbst ist Teil des Studiobetriebs und nicht
            Bestandteil unserer Leistung.
          </p>
          <p>
            Unsere Reinigung deckt die grundlegende, regelmäßige Pflege von Geräten, Böden und
            Sanitärbereichen ab, unabhängig davon, was zwischen zwei Terminen an Selbstreinigung
            durch Mitglieder stattfindet. Diese Aufteilung legen wir vor Beginn konkret fest.
          </p>
          <p>
            Diese klare Trennung verhindert Missverständnisse, wenn Mitglieder sich einmal über den
            Zustand eines Geräts beschweren: Es lässt sich schnell klären, ob es sich um eine
            Lücke in der vereinbarten Reinigung handelt oder um fehlende Selbstreinigung zwischen
            zwei Trainingseinheiten.
          </p>
        </div>
      </Section>

      {/* Studiotypen */}
      <Section background="white">
        <SectionHeading
          eyebrow="Unterschiedlicher Bedarf je nach Studiotyp"
          title={heading.sectionHeadings[5]}
          subtitle="Ein kleines Boutique-Studio hat andere Anforderungen als ein großes Fitnesscenter oder ein durchgehend geöffnetes 24/7-Studio ohne feste Rezeption."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {studioTypeCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 60} className="rounded-card border border-line bg-white p-6 shadow-raise">
              <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Materialschutz */}
      <Section background="muted">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Geräten und Böden" title={heading.sectionHeadings[6]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Gepolsterte Griffe, Kunstleder-Sitzflächen, gummierte Bodenbeläge und Spiegelflächen
            benötigen unterschiedliche Reinigungsmittel und Verfahren. Ein zu aggressives Mittel
            kann Polsterung oder Gummierung auf Dauer angreifen, ein zu mildes reicht bei starker
            Beanspruchung nicht aus.
          </p>
          <p>
            Glanzwerk wählt Mittel und Dosierung je nach Material und Verschmutzung aus, statt ein
            einzelnes Produkt für alle Flächen zu verwenden.
          </p>
        </div>
      </Section>

      {/* Farbcodierungssystem für Reinigungstücher */}
      <Section background="tint">
        <SectionHeading eyebrow="Hygienekonzept" title="Klare Zuordnung auch im Studio" />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          In einem Fitnessstudio mit Umkleiden, Duschen und Trainingsflächen sorgt eine feste
          Farbzuordnung für eine eindeutige Trennung zwischen den unterschiedlich stark
          beanspruchten Bereichen.
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

      {/* Feuchtigkeit und Schimmelvorbeugung */}
      <Section background="white">
        <SectionHeading eyebrow="Besonderes Augenmerk auf Nassbereiche" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Duschen und Umkleiden sind durch Feuchtigkeit, Wärme und hohe Frequentierung anfälliger
            für Schimmelbildung als andere Bereiche eines Studios. Regelmäßiges Reinigen von Fugen,
            Ablagerinnen und Duschwänden verringert diese Anfälligkeit deutlich, ersetzt aber keine
            ausreichende Belüftung der Räume durch das Studio selbst.
          </p>
          <p>
            Bei sichtbaren Anzeichen von Schimmel oder einem dauerhaft feuchten Raumklima sprechen
            wir das gezielt an – eine zusätzliche bauliche oder lüftungstechnische Maßnahme liegt
            dann jedoch außerhalb unseres Leistungsumfangs.
          </p>
          <p>
            Auch Wäschesammelbehälter für benutzte Handtücher tragen zum feuchten Klima in
            Umkleiden bei, wenn sie länger stehen bleiben. Ob deren Leerung Teil der vereinbarten
            Reinigung ist oder vom Studio selbst organisiert wird, legen wir vorab eindeutig fest.
          </p>
        </div>
      </Section>

      {/* Rückmeldungen */}
      <Section background="muted">
        <SectionHeading eyebrow="Kurzer Draht bei Auffälligkeiten" title={heading.sectionHeadings[8]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Mitglieder bemerken Sauberkeitsmängel oft unmittelbar – etwa eine leere Papierhandtuch-
            Halterung oder eine verschmutzte Bank in der Umkleide. Damit solche Rückmeldungen schnell
            bei uns ankommen, erhalten Sie einen festen Ansprechpartner, den Ihr Team direkt
            kontaktieren kann, statt Anliegen erst zum nächsten regulären Termin zu sammeln.
          </p>
          <p>
            So lässt sich schnell klären, ob es sich um eine einmalige Ausnahme handelt oder der
            bestehende Reinigungsplan angepasst werden sollte.
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
        <SectionHeading eyebrow="Preis der Fitnessstudioreinigung" title={heading.sectionHeadings[10]} />
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
        <div className="mt-8 max-w-2xl">
          <EinsatzgebietKarte />
        </div>
      </Section>

      {/* Berlin-Abschnitt (getrennt vom Einsatzgebiet-Abschnitt oben) */}
      <Section background="white">
        <SectionHeading eyebrow="Berlin" title="Zwischen Kiezstudio und Kette im Einkaufszentrum" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In urbanen Kiezen wie Friedrichshain oder Prenzlauer Berg gibt es viele kleinere,
            oft spezialisierte Studios mit direktem Bezug zur Nachbarschaft. In den äußeren
            Bezirken sind Fitnessstudios dagegen häufiger Teil größerer Kettenanbieter, oft in
            Einkaufszentren mit entsprechend höherem Publikumsaufkommen zu bestimmten
            Tageszeiten.
          </p>
          <p>
            Ein kleines Studio lässt sich meist mit festen Zeitfenstern abdecken, ein größeres
            mit mehreren Kursräumen braucht dagegen oft mehrere Reinigungstermine über den Tag
            verteilt. Wir richten den Rhythmus nach der tatsächlichen Auslastung des jeweiligen
            Studios aus.
          </p>
          <p>
            Die Bezirke im Überblick finden Sie auf der{" "}
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
          subtitle="Sie möchten zunächst feststellen, ob Reinigungsleistung, Kommunikation und Abläufe zu Ihrem Studio passen? Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Nach Ablauf entsteht keine automatische langfristige Verlängerung."
          primaryLabel="Testphase anfragen"
          primaryHref="/3-monate-testen"
          secondaryLabel="Angebot erhalten"
          secondaryHref="/kontakt"
        />
      </Section>

      {/* FAQ */}
      <Section background="white">
        <div className="mx-auto mb-12 max-w-3xl">
          <TrustSignals />
        </div>
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="fitnessstudioreinigung" />
        </FadeIn>
      </Section>

      {/* Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Studiogröße, Öffnungszeiten und die stärksten Frequentierungszeiten. Wir prüfen Ihre Angaben und klären die nächsten Schritte."
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
