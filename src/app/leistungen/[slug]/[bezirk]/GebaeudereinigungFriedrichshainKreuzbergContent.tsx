import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import type { Service } from "@/data/services";
import type { District } from "@/data/districts";
import type { Combo } from "@/data/combos";
import type { SeoHeadingSet } from "@/data/seoHeadings";
import { siteConfig } from "@/data/site";
import { serviceSchema } from "@/lib/schema";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import Button from "@/components/ui/Button";

/**
 * Eigenständiger, vollständiger Seiteninhalt für
 * /leistungen/gebaeudereinigung-berlin/friedrichshain-kreuzberg.
 * Bewusst getrennt vom generischen [slug]/[bezirk]-Template, aus demselben Grund
 * wie GebaeudereinigungMitteContent.tsx: der Auftragstext folgt einer eigenen,
 * deutlich umfangreicheren Abschnittsstruktur (12 Abschnitte statt der fixen
 * Slots des generischen Kombi-Templates). Bewusst photo-los gehalten, um am
 * bestehenden, bild-freien Erscheinungsbild der generischen Kombi-Seiten
 * festzuhalten.
 */

const scopeCards = [
  {
    title: "Gebäudereinigung",
    description: "Regelmäßige und ergänzende Reinigung für gewerblich genutzte Immobilien.",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Büroreinigung",
    description: "Reinigung von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitäranlagen.",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxisreinigung",
    description: "Abgestimmte Reinigung von Empfang, Wartezimmern, Behandlungsräumen und weiteren Praxisflächen.",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Gastronomiereinigung",
    description: "Reinigung von Gasträumen, Eingängen, Sanitärbereichen und vereinbarten Betriebsflächen.",
    href: "/leistungen/gastronomiereinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Wiederkehrende Reinigung in festgelegten Intervallen.",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Treppenhausreinigung",
    description: "Pflege von Eingängen, Stufen, Podesten, Fluren und Geländern.",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung erreichbarer Fenster, Glastüren, Schaufenster und Trennwände.",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung bei hartnäckigen Verschmutzungen oder besonderem Anlass.",
    href: "/leistungen/grundreinigung-berlin",
  },
];

const objectTypeCards = [
  {
    title: "Agenturen und Büros",
    description: "Reinigungszeiten und Intervalle passend zu flexiblen Arbeitsmodellen und gemeinsam genutzten Flächen.",
  },
  {
    title: "Gastronomie und Veranstaltungsorte",
    description: "Berücksichtigung von Öffnungszeiten, Gästeaufkommen und stark beanspruchten Eingängen.",
  },
  {
    title: "Praxen und Gesundheitsangebote",
    description: "Sorgfältige Reinigung von Wartebereichen, Behandlungsräumen und Sanitäranlagen.",
  },
  {
    title: "Wohn- und Geschäftshäuser",
    description: "Regelmäßige Pflege gemeinschaftlich genutzter Treppenhäuser und Eingänge.",
  },
];

const ortsteile = ["Friedrichshain", "Kreuzberg"];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Nennen Sie Objektart, Standort, Fläche und gewünschten Rhythmus.",
  },
  {
    title: "Bedarf abstimmen",
    description: "Wir klären Räume, Nutzung, Besucheraufkommen und Reinigungszeiten.",
  },
  {
    title: "Besichtigung bei Bedarf",
    description: "Bei größeren oder komplexen Objekten kann ein Vor-Ort-Termin sinnvoll sein.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein nachvollziehbares Angebot auf Grundlage der abgestimmten Leistungen.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung zum vereinbarten Termin.",
  },
];

const costFactors = [
  "Flächengröße",
  "Objektart",
  "Raumaufteilung",
  "Nutzung und Besucheraufkommen",
  "Sanitär- und Küchenbereiche",
  "gewünschtes Intervall",
  "Reinigungszeiten",
  "Bodenbeläge",
  "ergänzende Leistungen",
];

const neighborDistrictLinks = [
  { label: "Mitte", href: "/standorte/mitte" },
  { label: "Pankow", href: "/standorte/pankow" },
  { label: "Lichtenberg", href: "/standorte/lichtenberg" },
  { label: "Neukölln", href: "/standorte/neukoelln" },
  { label: "Treptow-Köpenick", href: "/standorte/treptow-koepenick" },
  { label: "Tempelhof-Schöneberg", href: "/standorte/tempelhof-schoeneberg" },
];

const faqItems = [
  {
    question: "Welche Objekte reinigt Glanzwerk im Bezirk?",
    answer: "Unter anderem Büros, Praxen, Gastronomiebetriebe, Kanzleien, Treppenhäuser und weitere Gewerbeobjekte.",
  },
  {
    question: "Werden sowohl Friedrichshain als auch Kreuzberg betreut?",
    answer: "Anfragen aus beiden Ortsteilen werden geprüft.",
  },
  {
    question: "Sind Reinigungen außerhalb der Öffnungszeiten möglich?",
    answer: "Je nach Objekt und Einsatzplanung können passende Zeitfenster vereinbart werden.",
  },
  {
    question: "Welche Leistungen können kombiniert werden?",
    answer: "Beispielsweise Unterhaltsreinigung, Büroreinigung, Glasreinigung, Grundreinigung und Treppenhausreinigung.",
  },
  {
    question: "Reinigt Glanzwerk auch Gastronomiebetriebe?",
    answer: "Ja. Der genaue Umfang wird passend zu Betriebsart, Öffnungszeiten und Bereichen abgestimmt.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Nutzung, Reinigungsintervall, Zeitfenster und vereinbartem Leistungsumfang.",
  },
  {
    question: "Ist eine Besichtigung erforderlich?",
    answer: "Nicht immer. Bei größeren oder schwer einzuschätzenden Objekten kann sie sinnvoll sein.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GebaeudereinigungFriedrichshainKreuzbergContent({
  service,
  district,
  heading,
}: {
  service: Service;
  district: District;
  combo: Combo;
  heading: SeoHeadingSet;
}) {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Leistungen", href: "/leistungen" },
          { label: service.shortTitle, href: `/leistungen/${service.slug}` },
          { label: district.name },
        ]}
      />
      <JsonLd
        data={serviceSchema({
          name: heading.metaTitle ?? heading.h1,
          description: service.metaDescription,
          path: `/leistungen/${service.slug}/${district.slug}`,
          areaServed: district.name,
        })}
      />

      {/* 1. Hero */}
      <Section background="white" className="pt-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-500">
            Reinigung für Unternehmen im Bezirk Friedrichshain-Kreuzberg
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Glanzwerk übernimmt die regelmäßige Reinigung von Büros, Praxen, Kanzleien,
            Gastronomiebetrieben, Gewerbeflächen und gemeinschaftlich genutzten
            Gebäudebereichen in Friedrichshain-Kreuzberg. Leistungen, Intervalle und
            Einsatzzeiten werden passend zur Nutzung Ihres Objekts abgestimmt.
          </p>
        </div>

        <FadeIn as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Flexible Reinigungsintervalle
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Fester Ansprechpartner
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Gewerblicher Reinigungsservice im gesamten Bezirk
          </li>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakt">
              Unverbindliches Angebot anfragen
            </Button>
          <Button href="/preisrechner" variant="outline">
              Preis kostenlos berechnen
            </Button>
        </div>
      </Section>

      {/* 2. Einleitung */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Vielseitig genutzter Bezirk" title={heading.sectionHeadings[0]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Friedrichshain-Kreuzberg ist geprägt von Bürostandorten, Agenturen, Start-ups,
            Praxen, Gastronomie, Einzelhandel, Kulturstätten und Wohn- und Geschäftshäusern.
            Rund um die Warschauer Straße, den Ostbahnhof, die Frankfurter Allee, den
            Moritzplatz, das Kottbusser Tor und den Mehringdamm unterscheiden sich Nutzung und
            Besucheraufkommen deutlich.
          </p>
          <p>
            Deshalb stimmen wir jede Gebäudereinigung auf das konkrete Objekt ab. Entscheidend
            sind nicht nur Fläche und Raumzahl, sondern auch Öffnungszeiten, Publikumsverkehr,
            Bodenbeläge, Sanitärbereiche und Zugänglichkeit.
          </p>
          <p>
            Viele Gewerbeflächen im Bezirk liegen in umgenutzten Altbauten oder ehemaligen
            Fabriketagen mit unregelmäßigen Grundrissen – kleinteilige Zimmer statt offener
            Bürolandschaften, historische Treppenhäuser als Hauptzugang und Sprossenfenster statt
            großflächiger moderner Verglasung. Ein Reinigungskonzept, das für ein neu gebautes
            Bürohaus konzipiert wurde, passt selten unverändert auf solche Objekte.
          </p>
          <p>
            Statt für Unterhalts-, Treppenhaus- und Fensterreinigung mit drei unterschiedlichen
            Firmen zu verhandeln, deckt ein einziger Vertrag alle drei Teilleistungen ab – mit
            einem Ansprechpartner, der bei Rückfragen den gesamten Leistungsumfang des Objekts
            kennt.
          </p>
        </div>
      </Section>

      {/* 3. Leistungen */}
      <Section background="white">
        <SectionHeading eyebrow="Leistungsumfang" title={heading.sectionHeadings[1]} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scopeCards.map((card, index) => (
            <FadeIn
              key={card.title}
              delay={index * 60}
              className="rounded-card border border-line bg-white p-6 shadow-raise"
            >
              <Link href={card.href} className="block">
                <p className="font-display text-base font-medium text-brand-900">{card.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 4. Unterschiedliche Objektarten */}
      <Section background="muted">
        <SectionHeading eyebrow="Passend zu Branche und Nutzung" title={heading.sectionHeadings[2]} />
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In Gewerbehöfen mit mehreren kleinen Firmen unter einem Dach teilen sich die Mieter
            häufig Empfang, Treppenhaus und Innenhof, ohne dass eine Firma allein für die
            Gemeinschaftsflächen zuständig ist. Für solche Objekte stimmen wir den gebündelten
            Vertrag meist mit der Hausverwaltung statt mit einer einzelnen Firma ab.
          </p>
          <p>
            Gastronomiebetriebe und Kulturstätten mit Abendöffnung haben einen anderen
            Reinigungsbedarf als ein Bürostandort mit klassischer Kernarbeitszeit: Eingänge und
            Sanitärbereiche sind nach einem Veranstaltungsabend stärker beansprucht als nach einem
            gewöhnlichen Bürotag. Der gebündelte Vertrag berücksichtigt das mit einem entsprechend
            angepassten Rhythmus.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {objectTypeCards.map((card, index) => (
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

      {/* 5. Ortsteile und lokale Einordnung */}
      <Section background="white">
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>Unser Einsatzgebiet umfasst beide Ortsteile des Bezirks:</p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {ortsteile.map((ortsteil) => (
            <li
              key={ortsteil}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900"
            >
              {ortsteil}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          Anfragen aus Bereichen rund um Boxhagener Platz, Ostkreuz, Warschauer Straße,
          Oberbaumbrücke, Kottbusser Tor, Bergmannkiez, Mehringdamm, Görlitzer Park und
          Landwehrkanal können geprüft werden.
        </p>
      </Section>

      {/* 6. Reinigungszeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            In Büroobjekten kann eine Reinigung vor Arbeitsbeginn oder nach Geschäftsschluss
            sinnvoll sein. Gastronomische Betriebe und Einrichtungen mit Publikumsverkehr
            benötigen häufig andere Zeitfenster.
          </p>
          <p>
            Vor Beginn klären wir Zugang, Schlüsselregelungen, Öffnungszeiten und mögliche
            Einschränkungen. Kurzfristige Nacht- oder Wochenendeinsätze werden nur angeboten,
            wenn sie tatsächlich planbar sind.
          </p>
          <p>
            Bei Objekten mit mehreren kleinen Mietparteien und wechselnden Ansprechpartnern
            dokumentieren wir die vereinbarte Zutrittsregelung schriftlich, statt sie bei jedem
            Personalwechsel auf Mieterseite erneut mündlich abzustimmen.
          </p>
          <p>
            Bei Gewerbehöfen, die nach längerem Leerstand neu vermietet werden, ist der
            Verschmutzungsgrad häufig höher als bei einem direkten Mieterwechsel ohne Leerstand.
            Eine ergänzende, einmalige Grundreinigung lässt sich dem gebündelten Vertrag für solche
            Fälle voranstellen, bevor der reguläre Rhythmus beginnt.
          </p>
        </div>
      </Section>

      {/* 7. Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[5]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 8. Preise */}
      <Section background="warm">
        <SectionHeading eyebrow="Wovon die Reinigungskosten abhängen" title={heading.sectionHeadings[6]} />
        <ul className="mt-6 grid max-w-3xl gap-2.5 sm:grid-cols-2">
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

      {/* 9. Umwelt und Materialschutz */}
      <Section background="white">
        <SectionHeading eyebrow="Bedarfsgerechter Einsatz" title={heading.sectionHeadings[7]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Dosierung und Verfahren werden abhängig von Oberfläche, Verschmutzung und Nutzung
            abgestimmt, nicht nach einer einheitlichen Vorgabe für alle Flächen.
          </p>
          <p>
            Desinfektionsmittel kommen nur dort zum Einsatz, wo dies vereinbart oder hygienisch
            erforderlich ist.
          </p>
          <p>
            Raue, unverputzte Wandflächen im Industrial-Look erfordern bei der Staubentfernung
            andere Werkzeuge als glatte Gipskartonwände – ein Umstand, den wir bei der
            Materialauswahl innerhalb des gebündelten Vertrags berücksichtigen, statt ein
            einheitliches Tuch für alle Wandoberflächen im Objekt zu verwenden.
          </p>
          <p>
            Alte Holzfensterrahmen, wie sie in vielen Altbauten des Bezirks noch original erhalten
            sind, vertragen aggressive Reinigungsmittel schlechter als die robusteren Aluminium-
            oder Kunststoffrahmen neuerer Gewerbeflächen. Die im Rahmen der Fensterreinigung
            eingesetzten Mittel wählen wir entsprechend nach dem tatsächlich verbauten
            Rahmenmaterial.
          </p>
          <p>
            Kreativagenturen und Start-ups mit häufigem Personalwechsel benötigen eine schriftlich
            festgehaltene Zutrittsregelung, damit sich bei jedem neuen Ansprechpartner auf
            Mieterseite nicht die gesamte Absprache wiederholen muss.
          </p>
          <p>
            Alte Fabrikfenster mit vielen kleinen Einzelscheiben statt großflächiger moderner
            Verglasung benötigen bei der Fensterreinigung mehr Zeit pro Quadratmeter als eine
            gleich große, ungeteilte Scheibe – das fließt in die Kalkulation des gebündelten
            Vertrags ein.
          </p>
          <p>
            Bei Objekten mit gemeinsam genutzter Dachterrasse oder begrüntem Innenhof gehört
            dieser Außenbereich nur dann zum gebündelten Vertrag, wenn er ausdrücklich vereinbart
            wurde.
          </p>
          <p>
            Individuell gestaltete Einrichtung und Second-Hand-Möbel, wie sie in vielen
            Kreativbüros des Bezirks anstelle einheitlicher Büromöbel-Serien stehen, benötigen bei
            der Reinigung mehr Rücksicht auf unterschiedliche Materialien als eine durchgehend
            gleich ausgestattete Bürolandschaft.
          </p>
          <p>
            Außensportflächen oder kleine Pausenbereiche im Freien, wie sie manche Gewerbehöfe des
            Bezirks bieten, gehören zum Außenbereich und damit nicht zur Innenraum-
            Gebäudereinigung.
          </p>
          <p>
            Fahrradabstellräume, die in vielen Gewerbehöfen des Bezirks durch die hohe Zahl an
            Radfahrenden zur Standardausstattung gehören, unterliegen einem anderen
            Verschmutzungsbild als Büroflächen und werden nur bei ausdrücklicher Vereinbarung in
            den gebündelten Vertrag aufgenommen.
          </p>
          <p>
            Bei einem Wechsel der Hausverwaltung eines Gewerbehofs bleibt der bestehende
            gebündelte Vertrag unberührt – lediglich der Ansprechpartner auf Verwaltungsseite
            ändert sich.
          </p>
          <p>
            Second-Hand-Möbel-Läden und Vintage-Geschäfte, wie sie im Bezirk neben klassischen
            Büros vorkommen, benötigen für ihre Verkaufsflächen eine andere Herangehensweise als
            ein reines Bürolayout.
          </p>
          <p>
            Streetart und Graffiti, wie sie an manchen Gebäudefassaden im Bezirk bewusst toleriert
            oder sogar gefördert werden, bleiben von der regulären Gebäudereinigung unberührt,
            sofern keine gesonderte Entfernung ausdrücklich vereinbart wurde.
          </p>
          <p>
            Bei Gewerbehöfen mit gemeinsamem Innenhof, den mehrere Firmen als Zufahrt und
            Fahrradabstellfläche nutzen, klären wir vorab, welcher Anteil der Reinigung dieses
            Hofs über den gebündelten Vertrag mit der Hausverwaltung abgerechnet wird.
          </p>
        </div>
      </Section>

      {/* 10. Angrenzende Bezirke */}
      <Section background="muted">
        <SectionHeading eyebrow="Auch in der Nähe" title="Reinigungsservice auch in angrenzenden Berliner Bezirken" />
        <FadeIn className="mt-8 flex flex-wrap gap-2">
          {neighborDistrictLinks.map((link) => (
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

      {/* 11. FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="gebaeudereinigung-friedrichshain-kreuzberg" />
        </FadeIn>
      </Section>

      {/* 12. Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Teilen Sie uns Objektart, Standort, ungefähre Fläche und gewünschten Reinigungsrhythmus mit. Wir prüfen Ihre Angaben und klären die nächsten Schritte."
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
