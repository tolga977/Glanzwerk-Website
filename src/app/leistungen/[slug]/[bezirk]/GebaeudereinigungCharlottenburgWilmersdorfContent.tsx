import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import ParallaxImage from "@/components/ui/ParallaxImage";
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
 * /leistungen/gebaeudereinigung-berlin/charlottenburg-wilmersdorf.
 * Bewusst getrennt vom generischen [slug]/[bezirk]-Template, aus demselben Grund
 * wie GebaeudereinigungMitteContent.tsx / GebaeudereinigungPankowContent.tsx.
 */

const districtPhoto = {
  src: "/images/leistungen/gebaeudereinigung-berlin/bezirke/charlottenburg-wilmersdorf.webp",
  alt: "Bodenreinigungsmaschine in einem hellen, repräsentativen Empfangsbereich mit Glasfront",
  caption: "Polierter Naturstein in repräsentativen Eingangsbereichen braucht eine Maschine statt eines einfachen Wischmopps, um seinen Glanz zu behalten.",
};

const scopeCards = [
  {
    title: "Gebäudereinigung",
    description: "Regelmäßige und ergänzende Reinigung für gewerblich genutzte Immobilien.",
    href: "/leistungen/gebaeudereinigung-berlin",
  },
  {
    title: "Büroreinigung",
    description: "Pflege von Arbeitsplätzen, Besprechungsräumen, Küchen und Sanitäranlagen.",
    href: "/leistungen/bueroreinigung-berlin",
  },
  {
    title: "Praxisreinigung",
    description: "Reinigung von Empfang, Wartezimmern, Behandlungsräumen und hygienisch relevanten Bereichen.",
    href: "/leistungen/praxisreinigung-berlin",
  },
  {
    title: "Kanzleireinigung",
    description: "Reinigung repräsentativer Büro-, Empfangs- und Besprechungsflächen.",
    href: "/leistungen/kanzleireinigung-berlin",
  },
  {
    title: "Unterhaltsreinigung",
    description: "Wiederkehrende Reinigung in fest vereinbarten Intervallen.",
    href: "/leistungen/unterhaltsreinigung-berlin",
  },
  {
    title: "Glas- und Fensterreinigung",
    description: "Reinigung zugänglicher Fenster, Glaswände, Türen und Schaufenster.",
    href: "/leistungen/glas-und-fensterreinigung-berlin",
  },
  {
    title: "Treppenhausreinigung",
    description: "Pflege von Eingängen, Stufen, Podesten, Fluren und Handläufen.",
    href: "/leistungen/treppenhausreinigung-berlin",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Reinigung bei hartnäckigen Rückständen oder besonderem Anlass.",
    href: "/leistungen/grundreinigung-berlin",
  },
];

const representativeCards = [
  {
    title: "Schaufenster und Eingangsglas",
    description: "Regelmäßige Reinigung der Schaufensterflächen von Ladengeschäften und Autohäusern am Ku'damm.",
  },
  {
    title: "Empfangs- und Wartebereiche",
    description: "Böden, Sitzbereiche und Theken in Kanzleien, Praxen und Verkaufsräumen.",
  },
  {
    title: "Besprechungsräume",
    description: "Pflege außerhalb laufender Mandantentermine und Sprechzeiten.",
  },
  {
    title: "Sanitäranlagen",
    description: "Reinigung passend zu Kunden-, Mandanten- und Mitarbeiteraufkommen.",
  },
];

const ortsteile = [
  "Charlottenburg",
  "Wilmersdorf",
  "Schmargendorf",
  "Grunewald",
  "Westend",
  "Charlottenburg-Nord",
  "Halensee",
];

const processSteps = [
  {
    title: "Anfrage stellen",
    description: "Teilen Sie uns Standort, Objektart, Fläche und gewünschten Rhythmus mit.",
  },
  {
    title: "Anforderungen abstimmen",
    description: "Wir klären Räume, Nutzung, Besucheraufkommen, Materialien und Einsatzzeiten.",
  },
  {
    title: "Besichtigung bei Bedarf",
    description: "Bei größeren oder komplexen Objekten kann ein Vor-Ort-Termin sinnvoll sein.",
  },
  {
    title: "Angebot erhalten",
    description: "Sie erhalten ein Angebot auf Grundlage der abgestimmten Leistungen.",
  },
  {
    title: "Reinigung starten",
    description: "Nach Freigabe beginnt die Reinigung zum vereinbarten Termin.",
  },
];

const costFactors = [
  "Flächengröße",
  "Objektart",
  "Anzahl der Räume",
  "Sanitär- und Küchenbereiche",
  "Besucheraufkommen",
  "Bodenbeläge und empfindliche Oberflächen",
  "Reinigungsintervall",
  "Einsatzzeiten und Zugänglichkeit",
  "ergänzende Leistungen",
];

const neighborDistrictLinks = [
  { label: "Mitte", href: "/standorte/mitte" },
  { label: "Spandau", href: "/standorte/spandau" },
  { label: "Steglitz-Zehlendorf", href: "/standorte/steglitz-zehlendorf" },
  { label: "Tempelhof-Schöneberg", href: "/standorte/tempelhof-schoeneberg" },
  { label: "Reinickendorf", href: "/standorte/reinickendorf" },
];

const faqItems = [
  {
    question: "Reinigt Glanzwerk auch Schaufenster und Glasflächen am Kurfürstendamm?",
    answer: "Ja, Schaufenster- und Eingangsglas lassen sich als fester Bestandteil des Gebäudereinigungsvertrags einplanen, statt sie separat zu beauftragen.",
  },
  {
    question: "Wird bei Kanzleien und Praxen auf Sprechzeiten Rücksicht genommen?",
    answer: "Ja, Zutritt und Reinigungszeiten werden so abgestimmt, dass laufende Mandanten- oder Patiententermine nicht gestört werden.",
  },
  {
    question: "Was ist der Unterschied zur eigenständigen Treppenhausreinigung im Bezirk?",
    answer: "Die Gebäudereinigung bündelt mehrere Gewerke – etwa Büro, Empfang und Glas – unter einem Vertrag. Soll ausschließlich das Treppenhaus gereinigt werden, ist die eigenständige Treppenhausreinigung in Charlottenburg-Wilmersdorf die passendere Leistung.",
    relatedLink: { label: "Zur Treppenhausreinigung in Charlottenburg-Wilmersdorf", href: "/leistungen/treppenhausreinigung-berlin/charlottenburg-wilmersdorf" },
  },
  {
    question: "Arbeitet Glanzwerk in Charlottenburg und Wilmersdorf?",
    answer: "Anfragen aus allen sieben Ortsteilen des Bezirks werden geprüft.",
  },
  {
    question: "Werden hochwertige Böden und Möbel materialgerecht gereinigt?",
    answer: "Reinigungsmittel und Verfahren werden passend zu Material und Verschmutzung ausgewählt.",
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Nach Fläche, Nutzung, Intervall, Materialien, Zeitfenster und vereinbartem Umfang.",
  },
  {
    question: "Ist eine Besichtigung notwendig?",
    answer: "Nicht immer. Bei größeren oder schwer einzuschätzenden Objekten kann sie sinnvoll sein.",
  },
  {
    question: "Wie kann ich ein Angebot anfordern?",
    answer: `Unter ${siteConfig.phone} oder per E-Mail an ${siteConfig.email}.`,
  },
];

export default function GebaeudereinigungCharlottenburgWilmersdorfContent({
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
            Reinigungsservice für Unternehmen im Berliner Westen
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Glanzwerk übernimmt die regelmäßige Reinigung von Büros, Praxen, Kanzleien,
            Verkaufsflächen, Treppenhäusern und weiteren Gewerbeobjekten in
            Charlottenburg-Wilmersdorf. Leistungen, Intervalle und Einsatzzeiten werden an die
            Nutzung und den betrieblichen Alltag angepasst.
          </p>
        </div>

        <FadeIn as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Flexible Einsatzzeiten
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Fester Ansprechpartner
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Reinigung im gesamten Bezirk
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Publikumsflächen und Altbaubüros" title={heading.sectionHeadings[0]} />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Charlottenburg-Wilmersdorf ist geprägt von Bürohäusern, Kanzleien, Arztpraxen,
                Einzelhandel, Hotellerie, Gastronomie und Wohn- und Geschäftshäusern. Rund um
                Kurfürstendamm, Kantstraße, Bismarckstraße, Messe Berlin, City West und
                Wilmersdorfer Straße treffen repräsentative Kundenbereiche auf intensiv genutzte
                Arbeits- und Gemeinschaftsflächen.
              </p>
              <p>
                Ein passender Reinigungsplan berücksichtigt deshalb nicht nur die Fläche, sondern
                auch Besucheraufkommen, Geschäftszeiten, Materialien und den gewünschten Eindruck
                auf Kunden oder Patienten.
              </p>
              <p>
                Wer für Unterhalts-, Treppenhaus- und Fensterreinigung sonst drei unterschiedliche
                Firmen koordinieren müsste, spart sich mit einem gebündelten Vertrag den
                Abstimmungsaufwand: Ein Ansprechpartner ist für alle drei Teilleistungen im selben
                Gebäude zuständig.
              </p>
            </div>
          </div>
          <ParallaxImage
            photo={districtPhoto}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="shadow-deep"
          />
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

      {/* 4. Repräsentative Bereiche */}
      <Section background="muted">
        <SectionHeading eyebrow="Schaufenster und Kanzleiflur in einem Vertrag" title={heading.sectionHeadings[2]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Am Kurfürstendamm und in den angrenzenden Geschäftsstraßen hängt der Gesamteindruck
            eines Ladengeschäfts oder Autohauses stark von der Schaufensterscheibe ab – Fingerabdrücke
            oder Straßenstaub fallen dort schneller auf als in einem Bürogebäude ohne Publikumsverkehr.
            In den Altbaulagen dahinter zählt dagegen weniger die Fensterscheibe als ein ruhiger,
            unauffälliger Ablauf für Kanzleien und Praxen.
          </p>
          <p>
            Die Gebäudereinigung bündelt beide Anforderungen in einem Vertrag: Glas- und
            Eingangsreinigung für publikumsstarke Flächen, abgestimmte Zeitfenster für Kanzleien und
            Praxen – statt zwei getrennte Dienstleister für dieselbe Immobilie zu koordinieren.
          </p>
          <p>
            Bürogebäude mit mehreren vermieteten Etagen benötigen zusätzlich eine Abstimmung mit
            der Hausverwaltung, welche Gemeinschaftsflächen wie Empfang und Treppenhaus zentral
            über den gebündelten Vertrag abgerechnet werden und welche Fläche jede Mietpartei
            separat beauftragt.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* 5. Ortsteile */}
      <Section background="white">
        <SectionHeading eyebrow="Unser Einsatzgebiet" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>Anfragen werden aus allen Ortsteilen des Bezirks geprüft:</p>
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
          Auch Gewerbeobjekte rund um Kurfürstendamm, Savignyplatz, Ernst-Reuter-Platz,
          Messegelände, Fehrbelliner Platz und Bundesallee können angefragt werden. Die
          genannten Orte dienen ausschließlich der geografischen Einordnung.
        </p>
      </Section>

      {/* 6. Einsatzzeiten */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Flexible Einsatzplanung" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Viele Unternehmen bevorzugen Reinigungszeiten außerhalb des Kunden- und
            Mitarbeiterbetriebs. Je nach Objekt kann die Reinigung am frühen Morgen, nach
            Geschäftsschluss oder innerhalb fester Zeitfenster erfolgen.
          </p>
          <p>
            Zugangsregeln, Schlüssel, Alarmanlagen und mögliche Einschränkungen werden vor
            Beginn abgestimmt.
          </p>
          <p>
            Bei Kanzleien und Praxen richten wir das Zeitfenster zusätzlich nach Sprechzeiten
            oder Mandantenterminen aus, während Ladengeschäfte am Kurfürstendamm meist eine
            Reinigung vor Öffnung bevorzugen, damit Schaufenster und Eingangsbereich bereits zu
            Geschäftsbeginn makellos wirken.
          </p>
        </div>
      </Section>

      {/* 7. Materialgerechte Reinigung */}
      <Section background="white">
        <SectionHeading eyebrow="Sorgfältiger Umgang mit Oberflächen" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Gerade in den Altbauten des Bezirks kommen häufig Naturstein, Holzböden und historische
            Fliesen vor, während Schaufenster und moderne Büroflächen eher Glas, Metall und
            beschichtete Oberflächen mitbringen.
          </p>
          <p>
            Mittel und Dosierung werden passend zur Oberfläche und zum tatsächlichen Bedarf
            ausgewählt. Desinfektionsmittel werden nur dort eingesetzt, wo dies vereinbart oder
            erforderlich ist.
          </p>
          <p>
            Messingbeschläge und Türgriffe, wie sie an vielen historischen Eingängen im Bezirk
            noch original erhalten sind, benötigen speziell auf das Metall abgestimmte
            Pflegemittel, da handelsübliche Allzweckreiniger die Oberfläche auf Dauer stumpf
            werden lassen können.
          </p>
          <p>
            Villenbüros und umgenutzte Wohnhäuser, wie sie in Grunewald und Westend vorkommen,
            haben oft empfindlichere Böden wie Parkett als die Geschäftshäuser entlang der
            Hauptstraßen. Innerhalb des gebündelten Vertrags arbeiten wir dort mit angepasster
            Feuchtigkeit und für Holz geeigneten Produkten.
          </p>
          <p>
            Bei Geschäftshäusern mit mehreren Ladenlokalen im Erdgeschoss und Büros in den oberen
            Etagen klären wir vorab, welche Gemeinschaftsflächen zentral über den gebündelten
            Vertrag abgerechnet werden und welche Fläche jeder Mieter separat beauftragt.
          </p>
          <p>
            Autohäuser mit Showroom entlang der Kantstraße haben einen eigenen Reinigungsbedarf
            rund um Glasflächen und Kundenbereiche. Dafür ist die eigenständige Autohausreinigung
            meist die passendere Wahl als das allgemeine Gebäudereinigungs-Bündel.
          </p>
          <p>
            Nach einem Ladenumbau bleiben häufig Montagespuren oder Schutzfolien-Reste zurück, die
            eine gewöhnliche Unterhaltsreinigung allein nicht vollständig entfernt – eine
            ergänzende Grundreinigung schafft hier einen sauberen Start vor der Neueröffnung.
          </p>
          <p>
            Antiquitätengeschäfte und Galerien, wie sie in den Seitenstraßen abseits des
            Kurfürstendamms häufig vorkommen, haben ein anderes Reinigungsbedürfnis als ein
            Ladengeschäft mit hoher Kundenfrequenz – der Bodenbereich um ausgestellte Objekte wird
            besonders vorsichtig behandelt.
          </p>
          <p>
            Hotelnahe Gewerbeflächen rund um den Kurfürstendamm haben teils sehr frühe oder späte
            Reinigungsfenster, da Gäste rund um die Uhr im Haus sein können. Wir stimmen den
            Termin entsprechend mit der jeweiligen Rezeption ab.
          </p>
          <p>
            Empfangsbereiche mit Concierge-Service, wie sie in manchen repräsentativen
            Bürogebäuden entlang des Kurfürstendamms vorhanden sind, stimmen den Zutritt für das
            Reinigungsteam direkt mit dem Concierge-Dienst ab, statt eine separate Lösung zu
            suchen.
          </p>
          <p>
            Bei einem Wechsel des Ladeninhabers in einem bereits vom gebündelten Vertrag erfassten
            Geschäft passen wir den bestehenden Vertrag an die neue Nutzung an, statt einen
            komplett neuen Vertrag aufzusetzen.
          </p>
          <p>
            Bei größeren Bürohäusern mit gemeinsamer Tiefgarage klären wir vorab, ob dieser
            Bereich zum gebündelten Vertrag gehört oder über einen separaten Parkhausbetreiber
            organisiert wird.
          </p>
          <p>
            Bei Praxen mit Zugang über einen separaten Seiteneingang, wie er in manchen
            Altbauten des Bezirks neben dem Haupteingang vorhanden ist, klären wir vorab, ob
            dieser Eingang zum gebündelten Vertrag gehört oder gesondert vereinbart wird.
          </p>
        </div>
      </Section>

      {/* 8. Ablauf */}
      <Section background="brand" decor>
        <SectionHeading eyebrow="Von der Anfrage bis zum Reinigungsstart" title={heading.sectionHeadings[6]} light />
        <div className="mt-10">
          <ProcessSteps steps={processSteps} light />
        </div>
      </Section>

      {/* 9. Kosten */}
      <Section background="warm">
        <SectionHeading eyebrow="Preis der Gebäudereinigung" title={heading.sectionHeadings[7]} />
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

      {/* 10. Benachbarte Bezirke */}
      <Section background="tint" decor>
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
          <FAQ items={faqItems} idPrefix="gebaeudereinigung-charlottenburg-wilmersdorf" />
        </FadeIn>
      </Section>

      {/* 12. Abschluss-CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Nennen Sie uns Objektart, Standort, ungefähre Fläche und gewünschten Reinigungsrhythmus. Wir prüfen Ihre Angaben und klären die nächsten Schritte."
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
