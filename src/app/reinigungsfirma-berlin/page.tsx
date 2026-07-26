import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import TrustBadges from "@/components/ui/TrustBadges";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import BrandPhoto from "@/components/ui/BrandPhoto";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/reinigungsfirma-berlin"];

const description =
  "Worauf Sie bei der Wahl einer Reinigungsfirma in Berlin achten sollten – und wie Glanzwerk für Gewerbekunden arbeitet.";

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description,
  path: "/reinigungsfirma-berlin",
});

const selectionCriteria = [
  {
    title: "Fester Ansprechpartner statt Callcenter",
    description:
      "Eine seriöse Reinigungsfirma benennt Ihnen eine konkrete Kontaktperson, statt Sie bei jeder Rückfrage an ein anonymes Callcenter zu verweisen.",
  },
  {
    title: "Transparentes Angebot",
    description:
      "Leistungsumfang, Rhythmus und Preis sollten nachvollziehbar aufgelistet sein – ohne unklare Pauschalen oder versteckte Zusatzkosten.",
  },
  {
    title: "Erfahrung mit vergleichbaren Objekten",
    description:
      "Büros, Praxen und Kanzleien stellen unterschiedliche Anforderungen. Fragen Sie gezielt nach Erfahrung mit Objekten wie Ihrem.",
  },
  {
    title: "Flexibilität bei Terminen",
    description:
      "Früh morgens, abends oder am Wochenende: Der Reinigungstermin sollte sich nach Ihrem Betriebsablauf richten, nicht umgekehrt.",
  },
  {
    title: "Klare Vertragslaufzeiten",
    description:
      "Achten Sie auf nachvollziehbare Kündigungsfristen statt langer, unflexibler Mindestlaufzeiten.",
  },
  {
    title: "Versicherungsschutz",
    description:
      "Fragen Sie gezielt nach einer Betriebshaftpflichtversicherung – für einen professionellen Anbieter sollte das selbstverständlich sein.",
  },
];

const faqItems = [
  {
    question: "Was unterscheidet eine gute Reinigungsfirma von einem besonders günstigen Angebot?",
    answer:
      "Der günstigste Stundenpreis sagt wenig über Zuverlässigkeit, feste Ansprechpartner oder tatsächliche Reinigungsqualität aus. Ein nachvollziehbares Angebot mit klarem Leistungsumfang ist meist aussagekräftiger als der reine Preis pro Stunde.",
  },
  {
    question: "Arbeitet Glanzwerk mit festen Mitarbeitenden oder wechselndem Personal?",
    answer:
      "Wir setzen auf feste Reinigungsteams pro Objekt, damit Sie wissen, wer bei Ihnen reinigt, statt ständig wechselndes Personal zu erleben.",
  },
  {
    question: "Ist Glanzwerk auch für kleinere Objekte die richtige Reinigungsfirma?",
    answer:
      "Ja, wir betreuen sowohl kleinere Büros und Praxen als auch größere Gewerbeobjekte – der Leistungsumfang wird individuell auf die Objektgröße abgestimmt.",
  },
  {
    question: "In welchen Teilen Berlins ist Glanzwerk als Reinigungsfirma tätig?",
    answer: "Wir sind als Reinigungsfirma in allen zwölf Berliner Bezirken im Einsatz.",
    relatedLink: { label: "Alle Standorte ansehen", href: "/standorte" },
  },
];

export default function ReinigungsfirmaBerlinPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Reinigungsfirma Berlin" }]} />
      <JsonLd
        data={webPageSchema({
          name: "Reinigungsfirma Berlin für Gewerbekunden",
          description,
          path: "/reinigungsfirma-berlin",
        })}
      />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg text-ink-soft">
              Bei der Suche nach einer Reinigungsfirma in Berlin stehen
              Unternehmen meist vor einer unübersichtlichen Auswahl. Diese
              Seite zeigt, worauf es bei der Wahl eines
              Reinigungsdienstleisters ankommt – und wie Glanzwerk als
              Reinigungsfirma für Gewerbekunden arbeitet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/preisrechner"
                className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Preis berechnen
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Angebot anfragen
              </Link>
            </div>
          </div>
          <BrandPhoto photo={photos.windowCleaning} priority className="shadow-2xl shadow-brand-950/20" />
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading
          eyebrow="Auswahlkriterien"
          title={heading.sectionHeadings[0]}
        />
        <FadeIn className="mt-10 grid gap-6 sm:grid-cols-2">
          {selectionCriteria.map((item, index) => (
            <FadeIn key={item.title} delay={index * 70} className="flex gap-3 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
              <div>
                <p className="text-sm font-semibold text-brand-900">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </FadeIn>
        <Link
          href="/wissen/reinigungsdienstleister-auswaehlen"
          className="mt-6 inline-block text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Ausführliche Checkliste im Glanzwerk Wissen
        </Link>
      </Section>

      <Section background="white">
        <SectionHeading eyebrow="Glanzwerk" title={heading.sectionHeadings[1]} />
        <FadeIn className="mt-10">
          <TrustBadges />
        </FadeIn>
      </Section>

      <Section background="muted">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/leistungen"
            className="group rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-900/[0.08]"
          >
            <h2 className="font-display text-lg font-medium text-brand-900 group-hover:text-brand-500">{heading.sectionHeadings[2]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Von der Büroreinigung bis zur Grundreinigung – alle Leistungen auf einen Blick.
            </p>
          </Link>
          <Link
            href="/standorte"
            className="group rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-900/[0.08]"
          >
            <h2 className="font-display text-lg font-medium text-brand-900 group-hover:text-brand-500">{heading.sectionHeadings[3]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Als Reinigungsfirma in allen zwölf Berliner Bezirken vor Ort.
            </p>
          </Link>
        </div>
      </Section>

      <Section background="white">
        <SectionHeading eyebrow="FAQ" title={heading.faqHeading} />
        <div className="mx-auto mt-8 max-w-2xl">
          <FAQ items={faqItems} idPrefix="reinigungsfirma" />
        </div>
      </Section>

      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Fordern Sie ein unverbindliches Angebot an oder nutzen Sie unseren Preisrechner für eine erste Einschätzung."
        />
      </Section>
    </>
  );
}
