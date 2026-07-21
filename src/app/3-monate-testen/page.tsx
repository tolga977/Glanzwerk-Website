import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import EditorialIntro from "@/components/ui/EditorialIntro";
import BrandPhoto from "@/components/ui/BrandPhoto";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/3-monate-testen"];

/**
 * HINWEIS: Die genaue Vertragsmechanik (Kündigungsfrist, was nach den 3
 * Monaten passiert, Mindestleistungsumfang) ist bewusst vorsichtig und
 * gemäß Vorgabe formuliert (regulär bezahlt, keine automatische
 * Verlängerung), muss aber vor Veröffentlichung fachlich/rechtlich vom
 * Betreiber bestätigt werden.
 */

const description =
  "Glanzwerk 3 Monate flexibel testen – reguläre Gebäudereinigung für Ihr Berliner Gewerbeobjekt, ohne langfristige Vertragsbindung.";

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description,
  path: "/3-monate-testen",
});

const benefitIcons = {
  noBinding: (
    <>
      <rect x="5" y="11" width="11" height="9" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V7.5A4 4 0 0 1 15.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10.5" cy="15.2" r="1.3" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  fairPay: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v9M9.5 9.8c0-1.3 1.1-2.3 2.5-2.3s2.5.8 2.5 2c0 2.3-5 1.4-5 3.7 0 1.2 1.1 2 2.5 2s2.5-1 2.5-2.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  realTest: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5l1.5 1.5 3-3M8 15l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9h2M14.5 15.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  freeChoice: (
    <>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 15l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </>
  ),
} as const;

const benefits = [
  {
    title: "Keine langfristige Bindung",
    description:
      "Sie gehen zu Beginn keinen langfristigen Vertrag ein – die Pilotphase ist auf drei Monate begrenzt.",
    icon: "noBinding" as const,
  },
  {
    title: "Regulär bezahlte Leistung",
    description:
      "Die vereinbarten Reinigungsleistungen werden während der drei Monate ganz normal erbracht und bezahlt – „testen“ heißt hier: die Zusammenarbeit testen, nicht die Reinigung selbst.",
    icon: "fairPay" as const,
  },
  {
    title: "Echter Test der Zusammenarbeit",
    description:
      "Sie lernen Qualität, Kommunikation und Zuverlässigkeit im echten Betrieb kennen – nicht nur anhand eines Angebots auf dem Papier.",
    icon: "realTest" as const,
  },
  {
    title: "Freie Entscheidung danach",
    description:
      "Die Pilotphase endet nach Ablauf automatisch. Eine längerfristige Zusammenarbeit kommt nur durch eine neue, ausdrücklich bestätigte Vereinbarung zustande – keine automatische Verlängerung.",
    icon: "freeChoice" as const,
  },
];

const steps = [
  {
    title: "Bedarf und Objekt kennenlernen",
    description: "Wir besprechen Ihr Objekt, die gewünschten Leistungen und den passenden Reinigungsrhythmus.",
  },
  {
    title: "Leistungen und Preis transparent vereinbaren",
    description: "Sie erhalten ein klares Angebot für die dreimonatige Pilotphase, ohne versteckte Kosten.",
  },
  {
    title: "Drei Monate regulär zusammenarbeiten",
    description: "Die Reinigung läuft nach dem vereinbarten Plan – ganz normal beauftragt und bezahlt.",
  },
  {
    title: "Danach frei entscheiden",
    description: "Nach den drei Monaten entscheiden Sie, ob und wie die Zusammenarbeit weitergeht.",
  },
];

const faqItems = [
  {
    question: "Ist die Reinigung während der drei Monate kostenlos?",
    answer:
      "Nein. „Testen“ bezieht sich auf die Zusammenarbeit, nicht auf die Reinigungsleistung selbst. Die vereinbarten Leistungen werden während der gesamten Pilotphase regulär erbracht und bezahlt, zu den im Angebot festgehaltenen Konditionen.",
  },
  {
    question: "Verlängert sich der Vertrag nach den drei Monaten automatisch?",
    answer:
      "Nein. Die Pilotphase endet nach Ablauf automatisch. Für eine anschließende, längerfristige Zusammenarbeit ist eine neue beziehungsweise ausdrücklich bestätigte Vereinbarung nötig.",
    relatedLink: { label: "Kontakt aufnehmen", href: "/kontakt" },
  },
  {
    question: "Für welche Leistungen gilt das Modell?",
    answer:
      "Das Modell richtet sich an regelmäßige, gewerbliche Unterhaltsreinigung und wird nach individueller Prüfung Ihres Objekts vereinbart. Einmalige Sonder- oder Grundreinigungen sind davon unabhängig und jederzeit separat anfragbar.",
    relatedLink: { label: "Zur Unterhaltsreinigung", href: "/leistungen/unterhaltsreinigung-berlin" },
  },
  {
    question: "Wie berechne ich einen ersten Richtpreis?",
    answer:
      "Über unseren Preisrechner erhalten Sie in wenigen Minuten eine erste, unverbindliche Einschätzung für Ihr Objekt – Grundlage für das Angebot zur Pilotphase.",
    relatedLink: { label: "Zum Preisrechner", href: "/preisrechner" },
  },
];

export default function DreiMonateTestenPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "3 Monate flexibel testen" }]} />
      <JsonLd
        data={webPageSchema({
          name: "3 Monate flexibel testen",
          description,
          path: "/3-monate-testen",
        })}
      />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-500">
              Neu bei Glanzwerk
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Lernen Sie Glanzwerk im laufenden Betrieb kennen – ohne dass Sie
              sich vorab langfristig binden müssen. Die Reinigung wird dabei
              ganz normal beauftragt und bezahlt; getestet wird die
              Zusammenarbeit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/kontakt"
                className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
              >
                Testphase anfragen
              </a>
              <a
                href="/preisrechner"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white"
              >
                Preis berechnen
              </a>
            </div>
          </div>
          <BrandPhoto photo={photos.businessHandshake} priority className="shadow-2xl shadow-brand-950/20" />
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading
          eyebrow="Was „testen“ bedeutet"
          title={heading.sectionHeadings[0]}
          subtitle="Drei Monate lang arbeiten wir so zusammen, wie es dauerhaft aussehen würde – zu regulären, vorher festgelegten Konditionen."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <FadeIn
              key={benefit.title}
              delay={index * 80}
              className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {benefitIcons[benefit.icon]}
                </svg>
              </span>
              <div>
                <p className="font-display text-base font-medium text-brand-900">{benefit.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{benefit.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section background="white">
        <EditorialIntro eyebrow="Ablauf" title={heading.sectionHeadings[1]}>
          <ProcessSteps steps={steps} />
        </EditorialIntro>
      </Section>

      <Section background="warm">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
            Wichtig zu wissen
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            Die drei Monate sind eine Pilotphase für die Zusammenarbeit – kein
            kostenloser Zeitraum. Reinigungsleistungen werden während dieser
            Zeit regulär zu den vereinbarten Konditionen erbracht und
            bezahlt. Die Pilotphase endet nach Ablauf automatisch; für eine
            anschließende, längerfristige Zusammenarbeit ist eine neue
            beziehungsweise ausdrücklich bestätigte Vereinbarung nötig. Die
            genauen Konditionen regeln die individuellen Vertragsunterlagen.
          </p>
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading eyebrow="FAQ" title={heading.faqHeading} />
        <div className="mx-auto mt-8 max-w-2xl">
          <FAQ items={faqItems} idPrefix="trial-faq" />
        </div>
      </Section>

      <Section background="white">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Ihr Objekt – wir melden uns mit einem individuellen Angebot für die dreimonatige Pilotphase."
          primaryLabel="Testphase anfragen"
          primaryHref="/kontakt"
          secondaryLabel="Preis berechnen"
          secondaryHref="/preisrechner"
        />
      </Section>
    </>
  );
}
