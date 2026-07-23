import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import BrandPhoto from "@/components/ui/BrandPhoto";
import CTASection from "@/components/ui/CTASection";
import FAQ from "@/components/ui/FAQ";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/umwelt-verantwortung"];

const description =
  "Erfahren Sie, wie Glanzwerk Reinigungsservice Berlin Reinigungsmittel, Wasser und Materialien verantwortungsvoll einsetzt und warum nachhaltige Reinigung mit durchdachten Abläufen beginnt.";

const heroPhoto = {
  src: "/images/umwelt-verantwortung/umwelt-hippie-peace.webp",
  alt: "Illustrierter umweltbewusster Mann mit Peace-Zeichen in einem begrünten Büro",
};

const baumPhoto = {
  src: "/images/umwelt-verantwortung/umwelt-hippie-baum.webp",
  alt: "Illustration eines Mannes, der einen Baum als Symbol für Umweltverantwortung umarmt",
};

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

      {/* Hero */}
      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Nachhaltigkeit bedeutet für uns nicht, möglichst viele Umweltbegriffe zu verwenden. Sie
              zeigt sich im täglichen Umgang mit Reinigungsmitteln, Wasser, Materialien und den
              Gebäuden unserer Kunden. Deshalb setzen wir auf sorgfältige Arbeitsabläufe, eine
              bedarfsgerechte Dosierung und Reinigungsverfahren, die Oberflächen langfristig schonen.
            </p>
            <div className="mt-8">
              <Link
                href="/kontakt"
                className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
              >
                Unverbindliches Angebot anfragen
              </Link>
            </div>
          </div>
          <BrandPhoto photo={heroPhoto} priority className="shadow-2xl shadow-brand-950/20" />
        </div>
      </Section>

      {/* H2 1 */}
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

      {/* H2 2 */}
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
              className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
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
      </Section>

      {/* H2 3 */}
      <Section background="warm">
        <SectionHeading eyebrow="Ressourcen" title={heading.sectionHeadings[2]} />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Auch Wasser ist eine Ressource. Deshalb achten wir darauf, Arbeitsabläufe so zu gestalten,
          dass unnötiger Wasserverbrauch vermieden wird. Moderne Reinigungstechniken und sinnvoll
          vorbereitete Arbeitsprozesse helfen dabei, Ressourcen effizient einzusetzen, ohne die
          Reinigungsqualität zu beeinträchtigen.
        </p>
      </Section>

      {/* H2 4 — Bild-Text-Komposition, Bild links (alternierend zum Hero, wo das Bild rechts steht) */}
      <Section background="tint" decor>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <BrandPhoto photo={baumPhoto} className="shadow-2xl shadow-brand-950/20" />
          <div>
            <SectionHeading eyebrow="Entsorgung" title={heading.sectionHeadings[3]} />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              Dort, wo unsere Kunden Mülltrennung im Gebäude vorsehen, berücksichtigen wir diese im
              Rahmen der vereinbarten Leistungen. Ziel ist es, bestehende Entsorgungskonzepte sinnvoll
              zu unterstützen und Arbeitsbereiche sauber zu halten.
            </p>
          </div>
        </div>
      </Section>

      {/* H2 5 */}
      <Section background="white">
        <SectionHeading eyebrow="Hygiene" title={heading.sectionHeadings[4]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Nicht jede Fläche muss desinfiziert werden. In medizinischen Einrichtungen oder anderen
            hygienisch sensiblen Bereichen kann eine Desinfektion notwendig sein. In vielen anderen
            Bereichen reicht eine fachgerechte Reinigung vollkommen aus.
          </p>
          <p>
            Deshalb unterscheiden wir bewusst zwischen Reinigung und Desinfektion und setzen
            Desinfektionsmittel nur dort ein, wo sie erforderlich oder vereinbart sind.
          </p>
        </div>
      </Section>

      {/* H2 6 */}
      <Section background="warm">
        <SectionHeading eyebrow="Gesamtbild" title={heading.sectionHeadings[5]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Eine zuverlässige Gebäudereinigung besteht aus vielen kleinen Entscheidungen. Dazu
            gehören sorgfältige Arbeitsabläufe, ein respektvoller Umgang mit den Räumlichkeiten
            unserer Kunden, eine klare Kommunikation und die Auswahl geeigneter
            Reinigungsverfahren.
          </p>
          <p>
            Unser Anspruch ist eine Reinigung, die Gebäude langfristig pflegt und den täglichen
            Betrieb zuverlässig unterstützt.
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-ink-soft">
          Mehr zu einzelnen Leistungen:{" "}
          <Link href="/leistungen/gebaeudereinigung-berlin" className="font-semibold text-brand-500 hover:underline">
            Gebäudereinigung
          </Link>
          ,{" "}
          <Link href="/leistungen/unterhaltsreinigung-berlin" className="font-semibold text-brand-500 hover:underline">
            Unterhaltsreinigung
          </Link>
          ,{" "}
          <Link href="/leistungen/bueroreinigung-berlin" className="font-semibold text-brand-500 hover:underline">
            Büroreinigung
          </Link>
          ,{" "}
          <Link href="/leistungen/praxisreinigung-berlin" className="font-semibold text-brand-500 hover:underline">
            Praxisreinigung
          </Link>{" "}
          und{" "}
          <Link href="/leistungen/glas-und-fensterreinigung-berlin" className="font-semibold text-brand-500 hover:underline">
            Glas- und Fensterreinigung
          </Link>
          .
        </p>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <SectionHeading eyebrow="Häufige Fragen" title={heading.faqHeading} align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={faqItems} idPrefix="umwelt" />
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Sprechen Sie mit uns über Ihr Objekt. Gemeinsam finden wir den passenden Reinigungsumfang für Ihr Unternehmen."
          primaryLabel="Jetzt unverbindlich anfragen"
          primaryHref="/kontakt"
        />
      </Section>
    </>
  );
}
