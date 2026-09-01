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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/glas-und-fensterreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * die übrigen individuell verfassten Leistungsseiten. Ersetzt bewusst die
 * früheren, nicht belegbaren Aussagen zu Höhenzugang/Ausrüstung für Fassaden
 * durch eine objektbezogene Zugänglichkeitsprüfung ohne pauschale Zusagen.
 */

/** Bezirke mit eigener Glas- und Fensterreinigung-Kombiseite – im Einsatzgebiet gezielt dorthin verlinken. */
const glasDistrictSlugs: Record<string, true> = {
  "charlottenburg-wilmersdorf": true,
  mitte: true,
  "tempelhof-schoeneberg": true,
  lichtenberg: true,
};

const aussenreinigungPhoto = {
  src: "/images/leistungen/glas-und-fensterreinigung-berlin/aussenreinigung.webp",
  alt: "Fensterreiniger zieht mit einem Abzieher eine große Schaufensterscheibe von außen ab",
  caption: "Eingewaschen wird mit Wasser und Reiniger, abgezogen mit dem Abzieher in einem Zug von oben nach unten – nur so bleiben keine Streifen zurück.",
};

const rahmenreinigungPhoto = {
  src: "/images/leistungen/glas-und-fensterreinigung-berlin/rahmenreinigung.webp",
  alt: "Reinigungskraft wischt mit einem Tuch die Schiene einer Balkon- oder Terrassentür",
  caption: "In Rahmen, Falzen und Schienen sammeln sich Staub und Kondenswasser, die eine reine Scheibenreinigung nicht erfasst – deshalb wird das im Angebot getrennt ausgewiesen.",
};

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
    answer: "Nein. Rahmen und Falze müssen ausdrücklich Bestandteil des Angebots sein, da ihre Reinigung deutlich mehr Zeit beansprucht als das reine Abziehen der Scheibe.",
  },
  {
    question: "Gehören Fensterbänke zur Glasreinigung oder zur Unterhaltsreinigung?",
    answer: "Innenliegende Fensterbänke zählen meist zur Unterhaltsreinigung, nicht automatisch zur Glas- und Fensterreinigung. Nutzen Sie beide Leistungen, stimmen wir die Zuständigkeit vorab ab.",
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
    question: "Zwischen meinen Fensterscheiben ist ein milchiger Schleier oder Feuchtigkeit – können Sie das reinigen?",
    answer:
      "Nein, das lässt sich von außen nicht beheben. Bei Isolierglas ist das ein Hinweis auf einen Dichtungsdefekt im Scheibenzwischenraum, kein Reinigungsproblem – hier hilft nur ein Glaser oder Fensterbauer.",
  },
  {
    question: "Warum werden nicht alle Fenster mit derselben Methode gereinigt?",
    answer:
      "Weil Glasarten unterschiedlich empfindlich sind. Einscheibensicherheitsglas etwa verträgt keine scharfkantigen Werkzeuge, obwohl es besonders stoßfest ist. Wir passen Methode und Werkzeug an das jeweilige Glas an.",
  },
  {
    question: "Ab welcher Höhe braucht es besondere Sicherung?",
    answer:
      "Ab etwa fünf Metern Absturzhöhe verlangt der Arbeitsschutz zusätzliche Maßnahmen wie ein Schutzgeländer, persönliche Absturzsicherung oder eine Hubarbeitsbühne. Das prüfen wir objektbezogen, bevor wir eine Zusage machen.",
  },
  {
    question: "Warum wirken manche Fenster nach der Reinigung trotzdem streifig?",
    answer:
      "Meist liegt es am Verfahren: Reines Nachwischen mit einem trockenen Tuch verteilt Rückstände oft nur. Wir arbeiten deshalb im professionellen Einwascher-Abzieher-Verfahren, das Wasser und gelösten Schmutz in einem Zug entfernt.",
  },
  {
    question: "Zeigen alle Fensterseiten gleich schnell Verschmutzung?",
    answer:
      "Nein. Südseitig gelegene Flächen zeigen Wasserflecken durch die Sonneneinstrahlung oft deutlicher als schattigere Fassadenseiten, auch wenn die tatsächliche Verschmutzung ähnlich ist.",
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
            <Button href="/kontakt">
              Angebot anfragen
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
              <p>
                Wie schnell eine Verschmutzung aus der Ferne auffällt, hängt außerdem von der
                Ausrichtung ab: Südseitig gelegene Glasflächen zeigen Wasserflecken und Kalkränder
                durch die direkte Sonneneinstrahlung oft deutlicher als schattigere Nordfassaden,
                bei denen dieselbe Verschmutzung länger unauffällig bleibt. Im Frühjahr kommt bei
                vielen Objekten zusätzlicher Blütenstaub hinzu, der sich besonders auf dunklem
                Rahmenmaterial sichtbar absetzt.
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

      {/* Rahmen und Falze */}
      <Section background="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Klare Abgrenzung" title={heading.sectionHeadings[2]} />
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Eine reine Glasreinigung umfasst nicht automatisch die vollständige Reinigung von
                Rahmen, Falzen, Fensterbänken oder angrenzenden Flächen. Deshalb wird vor Beginn
                eindeutig festgelegt, welche Bestandteile enthalten sind.
              </p>
              <p>
                Der Grund für diese Trennung liegt im Aufwand: Eine reine Scheibenreinigung im
                Einwascher-Abzieher-Verfahren dauert deutlich kürzer als eine gründliche Reinigung von
                Rahmen, Falzen und Fensterbänken, in denen sich Staub, Insekten und
                Kondenswasserreste ansammeln können. Wird beides im selben Preis erwartet, ohne dass
                es vereinbart wurde, führt das erfahrungsgemäß zu Missverständnissen – deshalb listen
                wir den Umfang im Angebot konkret auf, statt ihn allgemein zu formulieren.
              </p>
              <p>
                Fensterbänke im Innenbereich zählen in den meisten Fällen zum Leistungsumfang der
                Unterhaltsreinigung, nicht automatisch zur Glas- und Fensterreinigung. Nutzen Sie
                beide Leistungen gemeinsam, stimmen wir ab, welche Fläche zu welcher Leistung gehört,
                damit nichts doppelt oder gar nicht gereinigt wird.
              </p>
            </div>
          </div>
          <ParallaxImage
            photo={rahmenreinigungPhoto}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="shadow-deep"
          />
        </div>
      </Section>

      {/* Zugänglichkeit */}
      <Section background="white">
        <SectionHeading eyebrow="Objektbezogene Prüfung" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Ebenerdig zugängliche Fenster stellen andere Anforderungen als hohe Fassadenflächen
            oder schwer erreichbare Glasbereiche. Vor der Angebotserstellung prüfen wir, ob die
            Flächen mit den verfügbaren Arbeitsmitteln sicher erreichbar sind.
          </p>
          <p>
            Ab einer Absturzhöhe von etwa fünf Metern verlangt der Arbeitsschutz zusätzliche
            Sicherung – etwa ein mobiles Schutzgeländer, persönliche Absturzsicherung an
            geeigneten Anschlagpunkten oder eine Hubarbeitsbühne. Leitern gelten dabei ausdrücklich
            als Arbeitsmittel mit erhöhtem Risiko und kommen nur zum Einsatz, wenn kein
            risikoärmeres Mittel infrage kommt. Deshalb sagen wir erst nach Prüfung der
            tatsächlichen Zugänglichkeit zu, ob und wie eine Fläche gereinigt werden kann – nicht
            pauschal am Telefon.
          </p>
        </div>
      </Section>

      {/* Glasarten */}
      <Section background="muted">
        <SectionHeading eyebrow="Nicht jedes Glas ist gleich" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Im gewerblichen Bereich kommen unterschiedliche Glasarten zum Einsatz – vom einfachen
            Floatglas bis zum thermisch vorgespannten Einscheibensicherheitsglas (ESG), wie es
            häufig in Eingangstüren und Glastrennwänden verbaut ist. ESG ist zwar besonders
            stoßfest, reagiert aber empfindlicher auf feine Kratzer durch ungeeignete
            Reinigungswerkzeuge als gewöhnliches Glas – ein Widerspruch, den viele nicht erwarten.
          </p>
          <p>
            Bei Fenstern kommt meist Isolierglas zum Einsatz: zwei oder mehr Scheiben mit einem
            abgeschlossenen Zwischenraum, der für die Wärmedämmung sorgt. Dieser Zwischenraum
            lässt sich nicht reinigen, und das ist auch nicht nötig – zeigt sich dort dennoch ein
            milchiger Schleier oder Feuchtigkeit, deutet das auf einen Dichtungsdefekt hin, keinen
            Reinigungsbedarf. Das klären wir offen an, statt eine Leistung zu versprechen, die das
            eigentliche Problem nicht lösen kann.
          </p>
        </div>
      </Section>

      {/* Intervalle */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Orientierung, keine pauschale Vorgabe" title={heading.sectionHeadings[5]} />
        <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {frequencyItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5 rounded-control border border-line bg-white px-4 py-3 text-sm text-ink-soft">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand-500">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Diese Angaben sind nur Orientierungen und keine pauschalen Vorgaben. Der tatsächliche
          Rhythmus wird individuell mit Ihnen abgestimmt.
        </p>
      </Section>

      {/* Materialgerechtes Arbeiten */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Material" title={heading.sectionHeadings[6]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Beschichtete Gläser, Kunststoffrahmen, Aluminium, Holz und empfindliche Oberflächen
            benötigen unterschiedliche Verfahren. Glanzwerk richtet Reinigungsmittel und
            Vorgehensweise nach Material und Verschmutzungsgrad aus, statt pauschal vorzugehen.
          </p>
          <p>
            Für streifenfreie Ergebnisse arbeiten wir im professionellen
            Einwascher-Abzieher-Verfahren: Die Fläche wird zunächst vollständig eingewaschen,
            bevor ein Gummiabzieher das Wasser samt gelöstem Schmutz in einem Zug entfernt. Reines
            Nachwischen mit einem trockenen Tuch verteilt Verschmutzungen dagegen häufig nur,
            statt sie zu entfernen, und hinterlässt eher Schlieren als ein klares Ergebnis.
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

      {/* Wetterabhängigkeit */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Der richtige Zeitpunkt" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Ein für den Vormittag vereinbarter Termin verliert seinen Wert, wenn kurz zuvor
            starker Regen niedergeht. Wir behalten die Wetterlage im Blick und schlagen bei Bedarf
            eine kurzfristige Verschiebung vor, statt einen Kalendertermin bei strömendem Regen
            stur durchzuziehen – das Ergebnis wäre am Ende ohnehin nicht besser, nur der Einsatz
            umsonst.
          </p>
          <p>
            Frost wirkt sich zusätzlich auf das Ergebnis aus: Wischwasser trocknet auf kalten
            Scheiben schneller an und hinterlässt eher Schlieren als bei milderen Temperaturen.
            Deshalb passen wir Termine bei Minusgraden nach Möglichkeit an, statt ein Ergebnis zu
            liefern, das der eigentlichen Arbeit nicht gerecht wird.
          </p>
        </div>
      </Section>

      {/* Vorbereitung */}
      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Kurze Vorbereitung, glatter Ablauf" title={heading.sectionHeadings[8]} />
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Für Innenseiten ist Zugang zu den jeweiligen Räumen nötig. Bei Besprechungsräumen oder
                Büros mit vertraulichen Unterlagen sollte vorab klar sein, wer den Zutritt begleitet
                oder ob eine Reinigung außerhalb der Nutzungszeiten sinnvoller ist. Gegenstände auf
                Fensterbänken, die im Weg stehen, lassen sich schneller entfernen, wenn sie vorher zur
                Seite geräumt wurden.
              </p>
              <p>
                Bei Objekten, für die eine Hubarbeitsbühne oder ein Fahrzeug mit Anhänger benötigt
                wird, ist eine kurzfristig freigehaltene Stellfläche vor dem Gebäude hilfreich, damit
                der Termin wie geplant stattfinden kann und nicht an einem zugeparkten Gehweg
                scheitert.
              </p>
            </div>
          </div>
          <ParallaxImage
            photo={aussenreinigungPhoto}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="shadow-deep"
          />
        </div>
      </Section>

      {/* Abgrenzung Fassade */}
      <Section background="muted">
        <SectionHeading eyebrow="Klare Leistungsgrenze" title={heading.sectionHeadings[9]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Glas- und Fensterreinigung deckt Fenster, Glastüren, Trennwände und vergleichbare
            Flächen ab. Eine großflächige Fassadenreinigung von Naturstein-, Putz- oder
            Klinkerflächen mit Spezialverfahren ist eine andere Leistung mit anderen Anforderungen
            an Verfahren und Ausrüstung als das Einwascher-Abzieher-Verfahren für Glas.
          </p>
          <p>
            Sie wird deshalb nicht automatisch mitgeliefert, sondern bei konkretem Bedarf gesondert
            besprochen – so bleibt für Sie nachvollziehbar, wofür das Angebot tatsächlich gilt.
          </p>
        </div>
      </Section>

      {/* Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zur Durchführung" title={heading.sectionHeadings[10]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Fensterreinigung" title={heading.sectionHeadings[11]} />
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
          Flächen, die eine Hubarbeitsbühne oder eine besondere Absturzsicherung erfordern, fallen
          teurer aus als ebenerdig zugängliches Glas – nicht wegen der Fläche selbst, sondern
          wegen des zusätzlichen Arbeitsschutzaufwands. Das prüfen wir vor dem Angebot, nicht erst
          beim Termin vor Ort.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/preisrechner">
              Preis kostenlos berechnen
            </Button>
          <Button href="/kontakt" variant="outline">
              Angebot anfragen
            </Button>
        </div>
      </Section>

      {/* Einsatzgebiete */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[12]} />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {districts.map((district) => (
            <Link
              key={district.slug}
              href={
                district.slug in glasDistrictSlugs
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
        <div className="mt-8 max-w-lg">
          <BerlinEinsatzgebietKarte />
        </div>
      </Section>

      {/* Berlin-Abschnitt (getrennt vom Einsatzgebiet-Abschnitt oben) */}
      <Section background="muted">
        <SectionHeading eyebrow="Berlin" title="Von kleinteiligen Altbaufenstern bis zur Glasfassade" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Gründerzeitfenster mit mehreren Sprossen und Flügeln, wie sie in weiten Teilen Berlins
            vorkommen, brauchen mehr Zeit pro Fensterfläche als eine durchgehende Glasfassade an
            einem Bürostandort etwa am Potsdamer Platz oder in der City West. Kalk- und
            Wetterspuren setzen sich zudem unterschiedlich schnell fest, je nachdem wie exponiert
            das Gebäude liegt.
          </p>
          <p>
            Wir kalkulieren den Aufwand deshalb nicht nach der Quadratmeterzahl allein, sondern
            nach Fensterform, Zugänglichkeit und Anzahl der Flügel. Bei größeren Fassaden klären
            wir vorab, welche Ausrüstung nötig ist.
          </p>
          <p>
            Die abgedeckten Bezirke sehen Sie auf der{" "}
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
          <FAQ items={faqItems} idPrefix="glas-fensterreinigung" />
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

      <GoogleReviewsAuto />

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
