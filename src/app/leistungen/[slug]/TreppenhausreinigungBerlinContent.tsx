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
 * Eigenständiger, vollständiger Seiteninhalt für /leistungen/treppenhausreinigung-berlin.
 * Bewusst getrennt vom generischen [slug]-Template, aus demselben Grund wie
 * GebaeudereinigungBerlinContent.tsx / BueroreinigungBerlinContent.tsx /
 * PraxisreinigungBerlinContent.tsx / KanzleireinigungBerlinContent.tsx: der
 * Auftragstext folgt einer eigenen Abschnittsstruktur, die sich nicht in das
 * gemeinsame Positions-Schema der übrigen Leistungsseiten pressen lässt.
 */

const materialschutzPhoto = {
  src: "/images/leistungen/treppenhausreinigung-berlin/ablauf.webp",
  alt: "Wischmopp auf einer dunklen Naturstein-Treppenstufe",
  caption: "Dunkler Naturstein zeigt Schlieren deutlich sichtbarer als ein heller Fliesenboden – ein Grund, warum das Mittel je nach Belag unterschiedlich ausfällt.",
};

const scopeCards = [
  {
    title: "Eingangsbereiche",
    description: "Reinigung von Bodenflächen, Fußmatten, Türen und frei zugänglichen Bereichen rund um den Hauseingang.",
  },
  {
    title: "Stufen und Podeste",
    description: "Kehren, Saugen oder Wischen abhängig vom Bodenbelag und vereinbartem Reinigungsumfang.",
  },
  {
    title: "Handläufe und Geländer",
    description: "Reinigung frei zugänglicher Handläufe, Geländer und vereinbarter Kontaktflächen.",
  },
  {
    title: "Flure und Laufwege",
    description: "Pflege gemeinschaftlich genutzter Flächen zwischen Wohnungen, Büros oder Gewerbeeinheiten.",
  },
  {
    title: "Aufzugbereiche",
    description: "Reinigung von Bodenflächen, Türen und abgestimmten Oberflächen im Bereich vorhandener Aufzüge.",
  },
  {
    title: "Briefkastenanlagen",
    description: "Reinigung frei zugänglicher Oberflächen im vereinbarten Umfang.",
  },
  {
    title: "Fensterbänke und Sockel",
    description: "Entfernung von Staub und alltäglichen Verschmutzungen auf vereinbarten Flächen.",
  },
  {
    title: "Spinnweben und sichtbarer Staub",
    description: "Entfernung frei zugänglicher Spinnweben und Staubablagerungen im Rahmen der regelmäßigen Reinigung.",
  },
];

const frequencyCards = [
  {
    title: "Mehrmals pro Woche",
    description: "Für stark frequentierte Eingänge und größere Wohn- oder Geschäftsgebäude.",
  },
  {
    title: "Wöchentliche Reinigung",
    description: "Ein häufig gewählter Rhythmus für regelmäßig genutzte Treppenhäuser.",
  },
  {
    title: "Vierzehntägige Reinigung",
    description: "Kann bei kleineren und weniger stark beanspruchten Objekten ausreichen.",
  },
  {
    title: "Saisonale Anpassung",
    description: "Bei Nässe, Laub, Schnee oder Streumittelrückständen kann eine vorübergehende Anpassung sinnvoll sein.",
  },
];

const supplementaryCards = [
  {
    title: "Glas- und Fensterreinigung",
    description: "Für Treppenhausfenster, Glastüren und weitere Glasflächen.",
    linkLabel: "Mehr zur Glas- und Fensterreinigung",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Für hartnäckige Rückstände auf stark beanspruchten Böden.",
    linkLabel: "Mehr zur Grundreinigung",
    href: "/leistungen/grundreinigung-berlin",
  },
  {
    title: "Gebäudereinigung",
    description: "Für zusätzliche gemeinschaftlich oder gewerblich genutzte Gebäudebereiche.",
    linkLabel: "Mehr zur Gebäudereinigung",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Für regelmäßig wiederkehrende Reinigungsarbeiten im gesamten Objekt.",
    linkLabel: "Mehr zur Unterhaltsreinigung",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie uns Adresse, Gebäudeart, Anzahl der Etagen und das gewünschte Intervall mit.",
  },
  {
    title: "Anforderungen klären",
    description: "Wir stimmen Eingangsbereiche, Stufen, Podeste, Aufzüge und ergänzende Flächen ab.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage des vereinbarten Umfangs.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung zum vereinbarten Termin.",
  },
];

/** Bezirke mit eigener Treppenhausreinigung-Kombiseite – im Einsatzgebiet gezielt dorthin statt zur allgemeinen Bezirksseite verlinken. */
const treppenhausDistrictSlugs: Record<string, true> = {
  "tempelhof-schoeneberg": true,
  "charlottenburg-wilmersdorf": true,
  pankow: true,
  neukoelln: true,
};

const costFactors = [
  "Anzahl der Etagen",
  "Größe von Eingängen und Podesten",
  "vorhandene Bodenbeläge",
  "Anzahl der Aufzüge",
  "gewünschtes Reinigungsintervall",
  "Besucheraufkommen",
  "Zugänglichkeit",
  "ergänzende Leistungen",
];

const faqItems = [
  {
    question: "Was gehört zur Treppenhausreinigung?",
    answer:
      "Typische Leistungen sind die Reinigung von Eingängen, Stufen, Podesten, Handläufen, Geländern, Fluren und vereinbarten Aufzugbereichen.",
  },
  {
    question: "Wie oft sollte ein Treppenhaus gereinigt werden?",
    answer: "Das hängt von Gebäudegröße, Anzahl der Parteien, Besucheraufkommen und Jahreszeit ab.",
  },
  {
    question: "Werden Aufzüge mitgereinigt?",
    answer: "Aufzugbereiche können in den Leistungsumfang aufgenommen werden. Der genaue Umfang wird vorab festgelegt.",
  },
  {
    question: "Werden Treppenhausfenster gereinigt?",
    answer: "Die Fensterreinigung kann als ergänzende Leistung vereinbart werden.",
  },
  {
    question: "Reinigt Glanzwerk auch Gewerbeobjekte?",
    answer: "Ja. Wir reinigen Treppenhäuser in Wohn- und Geschäftshäusern sowie gewerblich genutzten Immobilien.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Entscheidend sind unter anderem Etagenzahl, Flächengröße, Bodenbeläge, Intervall und gewünschter Leistungsumfang.",
  },
  {
    question: "Zahle ich pro Treppenhaus oder für das ganze Objekt?",
    answer:
      "Bei einem einzelnen Aufgang kalkulieren wir pro Treppenhaus. Bei mehreren Aufgängen im selben Objekt bündeln wir Anfahrt und Organisation, wodurch der Preis pro einzelnem Treppenhaus meist sinkt.",
  },
  {
    question: "Lässt sich die Treppenhausreinigung über die Nebenkosten abrechnen?",
    answer:
      "Die Abrechnung läuft über Ihre Hausverwaltung oder Eigentümergemeinschaft. Ob und in welcher Höhe die Kosten in der Nebenkostenabrechnung erscheinen, entscheidet die jeweilige Verwaltung – das liegt außerhalb unseres Vertrags mit Ihnen.",
  },
  {
    question: "Ist Winterdienst im Preis der Treppenhausreinigung enthalten?",
    answer: "Nein, Winterdienst ist eine eigene Leistung und nicht automatisch Teil der Treppenhausreinigung. Sprechen Sie uns bei Bedarf gesondert darauf an.",
  },
  {
    question: "Gibt es einen festen Ansprechpartner?",
    answer: "Ja. Für die Objektbetreuung erhalten Sie eine feste Kontaktperson.",
  },
  {
    question: "Was passiert, wenn das übliche Reinigungsteam einmal ausfällt?",
    answer: "Feste Teams sind bei uns die Regel. Fällt jemand aus, organisieren wir eine Vertretung, damit der Reinigungstermin für Ihr Treppenhaus trotzdem stattfindet.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Telefonisch unter ${siteConfig.phone}, per Kontaktformular oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function TreppenhausreinigungBerlinContent({
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
              Treppenhausreinigung für Wohn- und Gewerbeimmobilien
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Glanzwerk übernimmt die regelmäßige Reinigung von Treppenhäusern, Eingangsbereichen
              und gemeinschaftlich genutzten Flächen in Berliner Immobilien. Reinigungsumfang und
              Intervalle werden passend zur Größe, Nutzung und Besucherfrequenz des Gebäudes
              abgestimmt.
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
            {["Feste Reinigungsintervalle", "Ansprechpartner für die Objektbetreuung", "Einsatz in allen zwölf Berliner Bezirken"].map(
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
            <SectionHeading eyebrow="Reinigungsplan für das Treppenhaus" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Treppenhäuser gehören zu den am stärksten beanspruchten Bereichen eines Gebäudes.
                Straßenschmutz, Staub, Feuchtigkeit und täglicher Personenverkehr hinterlassen
                besonders in Eingängen, auf Stufen und Podesten sichtbare Spuren.
              </p>
              <p>
                Wie häufig eine Reinigung erforderlich ist, hängt von der Anzahl der Parteien, dem
                Besucheraufkommen, der Jahreszeit und den vorhandenen Bodenbelägen ab. Deshalb
                stimmen wir die Leistungen objektbezogen ab, statt jedes Treppenhaus nach demselben
                Schema zu behandeln.
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

      {/* 3. Leistungsumfang */}
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

      {/* 3b. Auftraggeber und Nutzer */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Wer entscheidet, wer nutzt" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Wer ein Treppenhaus beauftragt, ist selten identisch mit den Menschen, die es täglich
            benutzen. In den meisten Fällen entscheidet eine Hausverwaltung oder eine
            Eigentümergemeinschaft über den Reinigungsvertrag, während Bewohner, Mieter und
            Besucher nur das Ergebnis sehen – und sich bei Problemen zuerst an die Verwaltung
            wenden, nicht an uns direkt.
          </p>
          <p>
            Bei Gebäuden mit mehreren Mietparteien oder mehreren Eigentümern fehlt dafür oft eine
            klare Zuständigkeit: Jeder nutzt das Treppenhaus, niemand fühlt sich richtig
            verantwortlich. Deshalb klären wir vor Vertragsbeginn direkt mit der Hausverwaltung
            oder der Eigentümergemeinschaft, wer Ansprechpartner ist, wie eine Beanstandung
            gemeldet wird und wer die Rechnung erhält. Bei Wohn- und Geschäftshäusern mit
            gemischter Nutzung kommt oft eine dritte Ebene hinzu, weil Gewerbemieter im
            Erdgeschoss andere Ansprüche an Sauberkeit und Zeitfenster haben als die Bewohner in
            den oberen Etagen.
          </p>
          <p>
            Der Hintergrund ist mehr als Ordnungssinn: Wer ein Treppenhaus unterhält, trägt die
            sogenannte Verkehrssicherungspflicht dafür – die Pflicht, es zu jeder Jahreszeit
            gefahrlos begehbar zu halten. Dazu gehört auch, Reinigungsmittel und Verfahren so zu
            wählen, dass keine zusätzliche Rutschgefahr entsteht, etwa durch zu glatt gewischte
            Stufen. Diese Aufgabe lässt sich an ein Reinigungsunternehmen übertragen, die
            Verantwortung dafür, dass sorgfältig gearbeitet wird, bleibt aber bei der
            Hausverwaltung oder Eigentümergemeinschaft. Genau deshalb ist ein fester, verlässlicher
            Ansprechpartner hier wichtiger als der niedrigste Stundenpreis.
          </p>
        </div>
      </Section>

      {/* 4. Reinigungsintervalle */}
      <Section background="muted">
        <SectionHeading eyebrow="Passender Rhythmus" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die passende Häufigkeit richtet sich nach Nutzung und Verschmutzung. In Gebäuden mit
            vielen Parteien oder hohem Besucheraufkommen sind häufig kürzere Intervalle sinnvoll.
            Kleinere Objekte können mit einer wöchentlichen oder individuell abgestimmten Reinigung
            auskommen.
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

      {/* 5. Besondere Verschmutzungen */}
      <Section background="white">
        <SectionHeading eyebrow="Saisonale Einflüsse" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Im Herbst werden Blätter und Feuchtigkeit in das Gebäude getragen. Im Winter entstehen
            Rückstände durch Schnee, Streusalz und Splitt. In gewerblich genutzten Gebäuden kann
            zusätzlicher Besucher- oder Lieferverkehr den Reinigungsbedarf erhöhen.
          </p>
          <p>
            Solche Faktoren sollten bei der Festlegung des Reinigungsplans berücksichtigt werden.
            Zusätzliche Einsätze oder intensivere Arbeiten werden vorab abgestimmt.
          </p>
        </div>
      </Section>

      {/* 5b. Leistungsgrenze */}
      <Section background="muted">
        <SectionHeading eyebrow="Klare Grenze zum Winterdienst" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          <p>
            Die Reinigung endet dort, wo klassischer Winterdienst beginnt. Schnee räumen und bei
            Glätte streuen gehört nicht zur Treppenhausreinigung – das ist eine eigene, meist
            separat beauftragte Leistung. Was wir übernehmen, ist die Reinigung dessen, was Winter
            und Wetter ins Haus tragen: aufgeweichtes Streusalz auf den Stufen, nasse Fußabdrücke
            im Eingang, liegengebliebener Splitt auf dem Podest. Brauchen Sie zusätzlich
            Winterdienst, sprechen Sie uns gesondert darauf an – das stimmen wir dann getrennt mit
            Ihnen ab.
          </p>
        </div>
      </Section>

      {/* 6. Materialgerechte Reinigung */}
      <Section background="tint" decor>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Schutz von Böden und Oberflächen" title={heading.sectionHeadings[6]} />
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Naturstein, Fliesen, Kunststoffbeläge, Holz und beschichtete Oberflächen benötigen
                unterschiedliche Reinigungsverfahren, die wir vorab mit der Hausverwaltung abstimmen,
                statt ein einziges Verfahren für das gesamte Treppenhaus anzusetzen.
              </p>
              <p>
                Naturstein etwa reagiert empfindlich auf säurehaltige Reiniger, die Kalk lösen und die
                Oberfläche auf Dauer angreifen können – deshalb kommen bei diesen Belägen möglichst
                pH-neutrale Mittel zum Einsatz, auch wenn ein aggressiveres Produkt kurzfristig
                schneller wirken würde. Beschichtete Böden vertragen wiederum keine zu alkalischen
                Reiniger, die die Versiegelung angreifen. Welches Mittel zu Ihrem Bodenbelag passt,
                klären wir vor dem ersten Einsatz.
              </p>
              <p>
                Die Dosierung richtet sich nach Herstellerangaben und tatsächlichem Bedarf. Ziel ist
                eine sorgfältige Reinigung, ohne Oberflächen durch ungeeignete Mittel zu belasten.
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
          <ParallaxImage
            photo={materialschutzPhoto}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="shadow-deep"
          />
        </div>
      </Section>

      {/* Farbcodierungssystem für Reinigungstücher */}
      <Section background="muted">
        <SectionHeading eyebrow="Hygienekonzept" title="Auch im Treppenhaus klar geregelt" />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Für Treppenhaus, Flure und angrenzende Gemeinschaftsflächen gilt dieselbe farbliche
          Zuordnung wie im gesamten Objekt.
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

      {/* 7. Ergänzende Leistungen */}
      <Section background="white">
        <SectionHeading eyebrow="Zusätzliche Reinigung" title={heading.sectionHeadings[7]} />
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

      {/* 8. Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[8]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 9. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Treppenhausreinigung" title={heading.sectionHeadings[9]} />
        <p className="mt-6 max-w-3xl text-sm font-semibold text-brand-900">Der Preis richtet sich unter anderem nach:</p>
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
          Bei Objekten mit mehreren Treppenhäusern sinkt der Preis pro einzelnem Aufgang meist
          spürbar, weil sich Anfahrt und Grundorganisation auf mehrere Aufgänge verteilen. Das
          rechnen wir bereits im Angebot vor, nicht erst danach.
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

      {/* 9b. Umlage und Steuervorteil */}
      <Section background="white">
        <SectionHeading eyebrow="Rechtlicher Rahmen" title={heading.sectionHeadings[10]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Die Kosten der Treppenhausreinigung zählen nach der Betriebskostenverordnung zu den
            Kosten der Gebäudereinigung und lassen sich grundsätzlich auf die Mieter umlegen,
            sofern das im Mietvertrag vereinbart ist. Das gilt für laufende Reinigungskosten – für
            die Pflege von Zugängen, Fluren, Treppen und, sofern vorhanden, den Aufzug.
          </p>
          <p>
            Für Eigentümergemeinschaften kommt ein zweiter Punkt hinzu: Treppenhausreinigung zählt
            als haushaltsnahe Dienstleistung nach § 35a Einkommensteuergesetz. Wohnungseigentümer
            können einen Teil der Kosten steuerlich geltend machen, auch wenn nicht sie selbst,
            sondern die Verwaltung den Auftrag erteilt hat – die Kostenaufstellung der
            Hausgeldabrechnung genügt dafür in der Regel als Nachweis. Die genaue steuerliche
            Handhabung im Einzelfall besprechen Sie am besten mit Ihrem Steuerberater; hier geht es
            nur um den grundsätzlichen Rahmen, den viele Eigentümer nicht kennen.
          </p>
        </div>
      </Section>

      {/* 10. Einsatzgebiet */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[11]} />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {districts.map((district) => (
            <Link
              key={district.slug}
              href={
                district.slug in treppenhausDistrictSlugs
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
      <Section background="white">
        <SectionHeading eyebrow="Berlin" title="Altbau-Treppenhäuser und moderne Aufgänge" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Berlins Gründerzeitviertel prägen bis heute viele hohe Treppenhäuser mit mehreren
            Stockwerken und oft ohne Aufzug. In neueren Wohn- und Geschäftshäusern übernimmt
            dagegen häufig der Aufzug den Hauptweg zwischen den Etagen, während das Treppenhaus
            seltener genutzt wird.
          </p>
          <p>
            Das wirkt sich auf den Reinigungsaufwand aus. Ein fünfgeschossiger Altbau ohne Aufzug
            braucht einen anderen Rhythmus als ein Neubau, in dem die Treppe nur ein Fluchtweg
            ist. Wir legen die Taktung mit der Hausverwaltung entsprechend fest.
          </p>
          <p>
            Welche Bezirke wir abdecken, steht auf der{" "}
            <Link href="/standorte" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Standortseite
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* 11. Testphase */}
      <Section background="muted">
        <CTASection
          title={heading.secondaryCtaHeading}
          subtitle="Vereinbaren Sie eine dreimonatige Testphase zu den angebotenen Konditionen. Umfang, Termine und Bedingungen werden vor Beginn schriftlich abgestimmt. Nach Ablauf entsteht keine automatische langfristige Verlängerung."
          primaryLabel="Testphase anfragen"
          primaryHref="/3-monate-testen"
          secondaryLabel="Angebot erhalten"
          secondaryHref="/kontakt"
        />
      </Section>

      {/* 12. FAQ */}
      <Section background="white">
        <div className="mx-auto mb-12 max-w-3xl">
          <TrustSignals />
        </div>
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="treppenhausreinigung" />
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

      {/* 13. Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Standort, Anzahl der Etagen und den gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und klären die nächsten Schritte."
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
