import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import CTASection from "@/components/ui/CTASection";
import HeroQuoteWizard from "@/components/forms/HeroQuoteWizard";
import FAQ from "@/components/ui/FAQ";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import { photos } from "@/data/photos";
import { productLogos } from "@/data/productLogos";
import { siteConfig } from "@/data/site";

const heading = seoHeadings["/umwelt-verantwortung"];

const description =
  "Erfahren Sie, wie Glanzwerk Reinigungsservice Berlin Reinigungsmittel, Wasser und Materialien verantwortungsvoll einsetzt und warum nachhaltige Reinigung mit durchdachten Abläufen beginnt.";

/*
 * Hero-Hintergrundbild — Neufassung 15.08.2026, vom Betreiber geliefertes
 * Foto (junger Blattspross auf Moos an einem See, Stadt-Skyline im
 * Hintergrund). Ersetzt `ecoOfficeGreenery` ausschließlich hier; jener
 * Eintrag bleibt unverändert in der Registry bestehen (siehe docs/IMAGES.md).
 */
const heroPhoto = photos.ecoHeroLeafSkyline;

export const metadata: Metadata = {
  ...buildMetadata({
    title: heading.metaTitle ?? heading.h1,
    description,
    path: "/umwelt-verantwortung",
  }),
  title: { absolute: heading.metaTitle ?? heading.h1 },
};

const productIcons = {
  dosing: (
    <>
      <path d="M9 3h6M10 3v4.5L5.5 16a2 2 0 0 0 1.8 2.9h9.4a2 2 0 0 0 1.8-2.9L14 7.5V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 14.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  surface: (
    <>
      <path
        d="M12 3.5l7 2.6v5.4c0 4.5-3 8-7 9.4-4-1.4-7-4.9-7-9.4V6.1l7-2.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.7 12.2l2.3 2.3 4.3-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  selection: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.3 12.3l2.4 2.4 5-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} as const;

const productCards = [
  {
    title: "Bedarfsgerechte Dosierung",
    description: "Reinigungsmittel werden entsprechend den Herstellerangaben und dem tatsächlichen Bedarf eingesetzt.",
    icon: "dosing" as const,
  },
  {
    title: "Passend zur Oberfläche",
    description: "Glas, Stein, Kunststoff, Holz oder empfindliche Bodenbeläge benötigen unterschiedliche Verfahren.",
    icon: "surface" as const,
  },
  {
    title: "Materialschonende Reinigung",
    description: "Unser Ziel ist nicht nur Sauberkeit, sondern auch der langfristige Erhalt der gereinigten Oberflächen.",
    icon: "selection" as const,
  },
];

/*
 * DR.SCHNELL und DEISS — ausschließlich die beiden vom Betreiber
 * bereitgestellten und freigegebenen Original-Logodateien (siehe
 * src/data/productLogos.ts). Aussage bleibt sachlich ("wir setzen ein"),
 * keine Partnerschaft, keine Zertifizierung, keine Produktkarten/Preise.
 */
const drSchnellLogo = productLogos.find((logo) => logo.name === "DR.SCHNELL")!;
const deissLogo = productLogos.find((logo) => logo.name === "DEISS")!;

/*
 * Vier Strich-Icons im Schriftbild der bestehenden Seiten-Icons oben
 * (dieselbe Bauform: 1.8 px Strich, currentColor, 24er Raster). Das
 * Desinfektions-Icon übernimmt bewusst den Schild-mit-Haken aus dem
 * Preisrechner-Abschnitt der Startseite (dieselbe Aussage: geprüft/gezielt),
 * statt ein neues Zeichen zu erfinden.
 */
const practiceIcons = {
  wasser: (
    <path
      d="M12 3.5c3.5 4.8 6 8.3 6 11.3a6 6 0 0 1-12 0c0-3 2.5-6.5 6-11.3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  muell: (
    <>
      <path
        d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.6 3.5v3.4h-3.4M6.4 20.5v-3.4h3.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  desinfektion: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 8.5 4.1-.9 7-4.3 7-8.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m9.2 12.1 2 2 3.6-3.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  ressourcen: (
    <>
      <path d="M5 19c0-7 4-13 14-14-1 10-7 14-14 14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6.5 17.5 15 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
} as const;

/*
 * "Unsere Verantwortung in der Praxis" — die vier bestehenden, freigegebenen
 * H2-Abschnitte (Wasser, Mülltrennung, Desinfektion, Gesamtbild) als ein
 * gemeinsames Kartenraster statt vier gestapelter Vollbreite-Sections.
 *
 * Wichtig: es werden weiterhin VIER echte <h2>-Elemente gerendert, in
 * unveränderter Reihenfolge und mit unverändertem Wortlaut — nur die
 * Bauform (nebeneinander statt untereinander) und die Bebilderung sind neu.
 * Die H1/H2-Struktur der Seite bleibt dadurch exakt wie vorher.
 */
const practiceCards = [
  {
    icon: "wasser" as const,
    title: heading.sectionHeadings[2],
    text: "Auch Wasser ist eine Ressource. Deshalb achten wir darauf, Arbeitsabläufe so zu gestalten, dass unnötiger Wasserverbrauch vermieden wird. Moderne Reinigungstechniken und sinnvoll vorbereitete Arbeitsprozesse helfen dabei, Ressourcen effizient einzusetzen, ohne die Reinigungsqualität zu beeinträchtigen.",
    photo: photos.ecoWaterCareCard,
    objectPosition: "50% 40%",
  },
  {
    icon: "muell" as const,
    title: heading.sectionHeadings[3],
    text: "Dort, wo unsere Kunden Mülltrennung im Gebäude vorsehen, berücksichtigen wir diese im Rahmen der vereinbarten Leistungen. Ziel ist es, bestehende Entsorgungskonzepte sinnvoll zu unterstützen und Arbeitsbereiche sauber zu halten.",
    photo: photos.ecoWasteSeparationCard,
    objectPosition: "50% 40%",
  },
  {
    icon: "desinfektion" as const,
    title: heading.sectionHeadings[4],
    text: "Nicht jede Fläche muss desinfiziert werden. In medizinischen Einrichtungen oder anderen hygienisch sensiblen Bereichen kann eine Desinfektion notwendig sein. In vielen anderen Bereichen reicht eine fachgerechte Reinigung vollkommen aus. Deshalb unterscheiden wir bewusst zwischen Reinigung und Desinfektion und setzen Desinfektionsmittel nur dort ein, wo sie erforderlich oder vereinbart sind.",
    photo: photos.ecoNeutralProductsCard,
    objectPosition: "56% 48%",
  },
  {
    icon: "ressourcen" as const,
    title: heading.sectionHeadings[5],
    text: "Eine zuverlässige Gebäudereinigung besteht aus vielen kleinen Entscheidungen. Dazu gehören sorgfältige Arbeitsabläufe, ein respektvoller Umgang mit den Räumlichkeiten unserer Kunden, eine klare Kommunikation und die Auswahl geeigneter Reinigungsverfahren. Unser Anspruch ist eine Reinigung, die Gebäude langfristig pflegt und den täglichen Betrieb zuverlässig unterstützt.",
    photo: photos.ecoForestCanopy,
    objectPosition: undefined,
  },
];

const faqItems = [
  {
    question: "Welche Reinigungsmittel verwendet Glanzwerk?",
    answer: "Je nach Oberfläche und Einsatzbereich arbeiten wir unter anderem mit Produkten von Kiehl, Dr. Schnell und Buzil.",
  },
  {
    question: "Arbeitet Glanzwerk klimaneutral?",
    answer:
      "Wir machen keine Aussagen, die wir nicht nachweisen können. Unser Fokus liegt auf einem verantwortungsvollen Umgang mit Wasser, Reinigungsmitteln und Materialien.",
  },
  {
    question: "Wird bei jeder Reinigung desinfiziert?",
    answer: "Nein. Desinfektionsmittel werden nur eingesetzt, wenn dies hygienisch notwendig oder ausdrücklich vereinbart ist.",
  },
  {
    question: "Achtet Glanzwerk auf materialschonende Reinigung?",
    answer: "Ja. Reinigungsmittel und Verfahren werden auf die jeweilige Oberfläche abgestimmt, um Materialien langfristig zu erhalten.",
  },
];

const phoneIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export default function UmweltVerantwortungPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Umwelt & Verantwortung" }]} />
      <JsonLd
        data={webPageSchema({
          name: heading.metaTitle ?? heading.h1,
          description,
          path: "/umwelt-verantwortung",
        })}
      />

      {/*
        ── Hero ──────────────────────────────────────────────────────────
        H1, Einleitungstext und Handlungszeile (Kontakt-CTA, "Preis
        schätzen", Telefonnummer) bleiben inhaltlich unverändert. Neu ist
        ausschließlich die Bauform: das mitgelieferte Naturfoto liegt jetzt
        als echtes Hero-Hintergrundbild hinter dem Text, exakt nach dem
        Muster von `HeroStage` auf der Startseite — derselbe DOM auf jeder
        Breite, dieselbe Auflösung in ein randloses Band unter dem Text
        (< 1024 px) und eine absolut positionierte Bühnenfläche hinter der
        Textspalte (≥ 1024 px). Kein zweites Bild-Markup, kein
        `hidden`/`block`-Paar.
        Anders als auf der Startseite ist der Container hier bewusst NICHT
        `relative` (siehe Kommentar in HeroStage.tsx) — genau das lässt
        `lg:absolute lg:inset-0` unten gegen die Section greifen statt gegen
        die schmalere Rasterspalte.
        Die Kopfzeile bleibt auf dieser Seite immer in ihrem "solid"-Zustand
        (Header.tsx: der transparente Bühnenzustand ist auf `pathname === "/"`
        begrenzt) — die Bühne muss sich deshalb nicht hinter die Kopfzeile
        ziehen, anders als auf der Startseite.

        ── Farbstimmung ────────────────────────────────────────────────────
        Die Fläche bleibt hell (Weiß → Foto), mit dunkler Schrift — dieselbe
        Bühnenlogik wie auf der Startseite, nicht die dunkelgrüne
        Verlaufsfläche des weiter unten stehenden Signature-Banners "Wir
        können auch grün." Zwei solche Flächen kurz hintereinander wären
        Wiederholung, keine Verstärkung. Grün steht hier bewusst nur an drei
        Stellen: der Eyebrow-Zeile, dem primären Button (`variant="eco"`,
        einzige grüne Primärfarbe der Website, siehe Button.tsx) und dem
        Hover der Telefonzeile — alles andere bleibt Weiß, Off-White und
        Glanzwerk-Dunkelblau.
      */}
      <section className="relative isolate overflow-hidden bg-white">
        <div className="container-page flex flex-col gap-10 py-14 sm:gap-12 sm:py-16 lg:py-24 xl:py-28">
          <div className="relative z-20 max-w-xl">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-eco-600">
              <span aria-hidden="true" className="brand-tick" />
              Nachhaltige Arbeitsweise
            </p>
            <h1 className="font-display display-xl mt-5 text-balance text-[2.375rem] font-medium text-brand-900 sm:text-5xl lg:text-6xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Nachhaltigkeit bedeutet für uns nicht, möglichst viele Umweltbegriffe zu verwenden. Sie
              zeigt sich im täglichen Umgang mit Reinigungsmitteln, Wasser, Materialien und den
              Gebäuden unserer Kunden. Deshalb setzen wir auf sorgfältige Arbeitsabläufe, eine
              bedarfsgerechte Dosierung und Reinigungsverfahren, die Oberflächen langfristig schonen.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <Button href="/kontakt" variant="eco" size="lg" className="min-h-14 w-full sm:w-auto">
                Unverbindliches Angebot anfragen
              </Button>
              <Button href="/preisrechner" variant="outline" size="lg" className="min-h-14 w-full sm:w-auto">
                Preis schätzen
              </Button>
            </div>
            <a
              href={siteConfig.phoneHref}
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-control text-sm font-medium text-ink-soft transition-colors duration-200 ease-out hover:text-eco-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eco-600"
            >
              <span className="text-eco-600">{phoneIcon}</span>
              Oder direkt anrufen: {siteConfig.phone}
            </a>
          </div>

          {/*
            ── Die Bildbühne ──────────────────────────────────────────────
            < 1024 px: eigenes randloses Band im Fluss, nach dem Text — ein
            Hintergrundfoto kann auf einem 390 px breiten Schirm keine
            Textfläche tragen (dieselbe Begründung wie in HeroStage.tsx).
            ≥ 1024 px: volle Bühnenfläche hinter dem Text, mit einem nach
            rechts auslaufenden weißen Tageslichtverlauf, der die Textspalte
            trägt — derselbe Mechanismus wie `.hero-daylight`, hier als
            eigene, auf dieses Foto zugeschnittene Verlaufsangabe statt der
            globalen (personenbezogenen) Klasse.
          */}
          <div className="relative -mx-4 aspect-[4/3] w-auto overflow-hidden sm:-mx-6 sm:aspect-[16/9] lg:absolute lg:inset-0 lg:mx-0 lg:aspect-auto lg:w-full">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "70% 45%" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(100deg, rgb(255 255 255) 0%, rgb(255 255 255) 52%, rgb(255 255 255 / 0.92) 60%, rgb(255 255 255 / 0.55) 70%, rgb(255 255 255 / 0.15) 82%, rgb(255 255 255 / 0) 92%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* H2 1 — unverändert */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Unser Ansatz" title={heading.sectionHeadings[0]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Eine professionelle Reinigung muss gründlich sein und gleichzeitig Materialien schützen.
            Deshalb wählen wir Reinigungsmittel und Verfahren passend zur jeweiligen Oberfläche aus.
            Nicht jede Verschmutzung benötigt dieselbe Chemie und nicht jede Fläche dieselbe
            Behandlung.
          </p>
          <p>
            Unser Ziel ist ein sauberes Ergebnis mit einem sinnvollen Einsatz von Wasser,
            Reinigungsmitteln und Arbeitsmaterialien.
          </p>
        </div>
      </Section>

      {/*
        ── Signature-Moment "Wir können auch grün." ─────────────────────
        Bewusst ohne eigene Überschrift: alle sechs freigegebenen H2 dieser
        Seite sind bereits vergeben, eine siebte wäre eine erfundene
        Überschrift über einem Thema, zu dem die Seite an dieser Stelle
        nichts Neues behauptet — dasselbe Prinzip, nach dem der
        Hygiene-Abschnitt der Startseite ohne eigene Überschrift auskommt.
        Der Satz steht stattdessen als großer Absatz im Schriftgrad einer
        Überschrift; die H1/H2-Gliederung der Seite bleibt unverändert.

        Ein einzelnes Foto (Sonnenlicht durch Blätterdach) plus ein
        Verlauf von links (dunkel, trägt den Text) nach rechts (hell, zeigt
        das Motiv) erzeugen die Tiefe der Referenz, ohne zwei Aufnahmen
        kombinieren zu müssen. Kein Glanzwerk-Wasserzeichen in dieser
        Fläche — die Referenzvorlage zeigt hier ausdrücklich kein Logo.
      */}
      <section className="relative isolate overflow-hidden bg-eco-800">
        <Image
          src={photos.ecoForestLight.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgb(27 63 47 / 0.88) 0%, rgb(27 63 47 / 0.74) 34%, rgb(27 63 47 / 0.3) 62%, rgb(27 63 47 / 0.05) 100%)",
          }}
        />
        <div className="container-page relative z-[1] py-20 sm:py-24 lg:py-28">
          <div className="max-w-xl">
            <p className="font-display display-lg text-pretty text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
              Wir können auch <span className="text-eco-100">grün.</span>
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              Professionelle Reinigung. Bewusste Verantwortung.
              <br />
              Sauber für heute. Besser für morgen.
            </p>
          </div>
        </div>
      </section>

      {/* H2 2 — unverändert, ergänzt um die Marken-/Materialzeile DR.SCHNELL + DEISS */}
      <Section background="white">
        <SectionHeading eyebrow="Produkte" title={heading.sectionHeadings[1]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Je nach Einsatzbereich verwenden wir Reinigungsprodukte von Kiehl, Dr. Schnell und Buzil.
            Welches Produkt eingesetzt wird, richtet sich nach Material, Verschmutzung und Nutzung
            der Fläche.
          </p>
          <p>
            Durch die richtige Dosierung lassen sich Reinigungsergebnisse erzielen, ohne unnötig
            viele Reinigungsmittel einzusetzen. Das schont Oberflächen und verhindert vermeidbare
            Rückstände.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {productCards.map((point, index) => (
            <FadeIn
              key={point.title}
              delay={index * 80}
              className="flex gap-4 rounded-card border border-line bg-white p-6 shadow-raise"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {productIcons[point.icon]}
                </svg>
              </span>
              <div>
                <p className="font-display text-base font-medium text-brand-900">{point.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/*
          Marken-/Materialzeile — ausschließlich die beiden bereitgestellten
          Original-Logodateien (DR.SCHNELL, DEISS). Sachliche Aussage
          ("wir setzen ein"), keine Partnerschaft, keine Preise, keine
          Produktkarten. Eigene Bauform statt der kompakten `<ProductLogos />`
          von der Startseite: jene zeigt automatisch ALLE freigegebenen
          Herstellerlogos (aktuell auch Numatic) in einer sehr knappen
          einzeiligen Höhe — hier sollen ausdrücklich nur diese zwei stehen,
          großzügig und ohne die dritte Marke.
        */}
        <FadeIn className="mt-14 border-t border-line pt-10">
          <p className="text-sm leading-relaxed text-ink-soft">
            Für ausgewählte Reinigungsleistungen setzen wir auf Produkte und Lösungen von:
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-16 gap-y-10">
            {drSchnellLogo.src && (
              <Image
                src={drSchnellLogo.src}
                alt={drSchnellLogo.name}
                width={drSchnellLogo.width ?? 2000}
                height={drSchnellLogo.height ?? 286}
                className="h-7 w-auto sm:h-8"
              />
            )}
            {deissLogo.src && (
              <Image
                src={deissLogo.src}
                alt={`${deissLogo.name} – A Sund Group Company`}
                width={deissLogo.width ?? 2377}
                height={deissLogo.height ?? 1052}
                className="h-14 w-auto sm:h-16"
              />
            )}
          </div>
        </FadeIn>
      </Section>

      {/*
        ── Anfrage-Moment in der Seitenmitte ──────────────────────────────
        Dieselbe Komponente wie im Startseiten-Hero (`HeroQuoteWizard`) —
        unverändert übernommen, kein neues Formular, keine neue Variante.
        Weder Felder noch Validierung noch Versandlogik sind angerührt.
        Ebenso wenig eine neue H2: alle sechs freigegebenen Überschriften
        dieser Seite sind bereits vergeben (siehe Kommentar am
        Signature-Banner "Wir können auch grün." weiter oben) — der Absatz
        links steht deshalb in der Schriftgröße einer Überschrift, ist aber
        keine.
        Der weiche Grün-Verlauf im Hintergrund ist die einzige Anpassung an
        die Seitenstimme: das Panel selbst bleibt exakt die weiße Fläche mit
        den Marken-blauen Bedienelementen, die auch auf der Startseite steht
        — eindeutig Glanzwerk, nicht neu eingefärbt.
      */}
      <section className="bg-gradient-to-b from-eco-50 via-eco-50 to-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="max-w-lg">
              <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-eco-600">
                <span aria-hidden="true" className="brand-tick text-eco-600" />
                Direkt anfragen
              </p>
              <p className="font-display display-lg mt-5 text-pretty text-[1.875rem] font-medium text-brand-900 sm:text-4xl">
                Sprechen Sie mit uns über Ihr Objekt
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
                Wählen Sie Ihre gewünschte Leistung und hinterlassen Sie kurz Ihre Kontaktdaten —
                den Rest klären wir gemeinsam. Unverbindlich und in wenigen Minuten ausgefüllt.
              </p>
            </div>
            <HeroQuoteWizard />
          </div>
        </div>
      </section>

      {/*
        ── "Unsere Verantwortung in der Praxis" ──────────────────────────
        Die vier bisherigen Vollbreite-Abschnitte (Wasser, Mülltrennung,
        Desinfektion, Gesamtbild) als ein Kartenraster. Vier echte,
        unveränderte H2 — nur nebeneinander statt untereinander, mit Fotos
        statt reinem Fließtext. Der Link-Absatz aus dem bisherigen letzten
        Abschnitt steht unverändert darunter.
      */}
      <Section background="muted" decor>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-eco-600">
          Unsere Verantwortung in der Praxis
        </p>

        <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {practiceCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 70} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-raise">
                <Image
                  src={card.photo.src}
                  alt={card.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                  style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-control bg-white text-eco-600 shadow-raise"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {practiceIcons[card.icon]}
                  </svg>
                </span>
              </div>
              <h2 className="font-display mt-5 text-lg font-medium text-brand-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.text}</p>
            </FadeIn>
          ))}
        </div>

        <p className="mt-12 max-w-3xl border-t border-eco-100 pt-8 text-sm text-ink-soft">
          Mehr zu einzelnen Leistungen:{" "}
          <Link href="/leistungen/gebaeudereinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Gebäudereinigung
          </Link>
          ,{" "}
          <Link href="/leistungen/unterhaltsreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Unterhaltsreinigung
          </Link>
          ,{" "}
          <Link href="/leistungen/bueroreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Büroreinigung
          </Link>
          ,{" "}
          <Link href="/leistungen/praxisreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Praxisreinigung
          </Link>{" "}
          und{" "}
          <Link href="/leistungen/glas-und-fensterreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            Glas- und Fensterreinigung
          </Link>
          .
        </p>
      </Section>

      {/* FAQ — unverändert */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="umwelt" />
        </FadeIn>
      </Section>

      {/*
        ── Abschluss-CTA ─────────────────────────────────────────────────
        Führt die Seite bewusst zur Hauptmarke zurück: dieselbe dunkle
        CTASection wie auf jeder anderen Seite (Navy-Verlauf, Glanzwerk-
        Wasserzeichen, bestehender Kontakt-CTA + Telefonnummer), nur mit
        einem der neuen Naturfotos als sehr dezenter Untergrund — Grün bleibt
        Textur, nicht Grundfarbe.
      */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Sprechen Sie mit uns über Ihr Objekt. Gemeinsam finden wir den passenden Reinigungsumfang für Ihr Unternehmen."
          primaryLabel="Jetzt unverbindlich anfragen"
          primaryHref="/kontakt"
          tone="eco"
          backgroundImage={{ src: photos.ecoForestCanopy.src, alt: "" }}
        />
      </Section>
    </>
  );
}
