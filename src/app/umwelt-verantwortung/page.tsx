import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import EditorialIntro from "@/components/ui/EditorialIntro";
import BrandPhoto from "@/components/ui/BrandPhoto";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/umwelt-verantwortung"];

const description =
  "Wie Glanzwerk Reinigungsservice Berlin Ressourcen im Reinigungsalltag bewusst einsetzt – konkrete Handgriffe statt Umweltversprechen.";

const dosierungPhoto = {
  src: "/images/umwelt-verantwortung/dosierung.webp",
  alt: "Wiederverwendbare Reinigungsutensilien für einen bewussten Ressourceneinsatz",
};

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description,
  path: "/umwelt-verantwortung",
});

const principleIcons = {
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
  rhythm: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  sorting: (
    <>
      <path d="M7 7l-2.5 2.5L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 9.5h8a4 4 0 0 1 4 4V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 17l2.5-2.5L17 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 14.5h-8a4 4 0 0 1-4-4V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  selection: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.3 12.3l2.4 2.4 5-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} as const;

const principles = [
  {
    title: "Dosierung statt Verschwendung",
    description:
      "Reinigungsmittel werden nach Herstellerangabe dosiert statt „auf Verdacht“ eingesetzt – das schont Flächen, Kosten und Umwelt gleichermaßen.",
    icon: "dosing" as const,
  },
  {
    title: "Schonender Umgang mit Oberflächen",
    description:
      "Für Glas, Boden, Sanitär und empfindliche Materialien kommen jeweils passende, professionelle Mittel zum Einsatz – nicht ein aggressives Universalmittel für alles.",
    icon: "surface" as const,
  },
  {
    title: "Kein unnötiger Verbrauch",
    description:
      "Der Reinigungsrhythmus richtet sich nach dem tatsächlichen Bedarf des Objekts statt nach pauschaler Maximalreinigung – das vermeidet unnötigen Wasser-, Material- und Energieverbrauch.",
    icon: "rhythm" as const,
  },
  {
    title: "Mülltrennung, wo im Objekt möglich",
    description:
      "Wo im Kundenobjekt eine Mülltrennung eingerichtet ist, wird sie bei der Reinigung berücksichtigt statt pauschal in einer Tonne gesammelt.",
    icon: "sorting" as const,
  },
  {
    title: "Bewusste Produktwahl",
    description:
      "Bei der Auswahl der Reinigungsmittel zählen Verträglichkeit und Wirksamkeit – nicht automatisch das stärkste verfügbare Mittel.",
    icon: "selection" as const,
  },
];

const benefits = [
  "Materialschonende Reinigung verlängert die Lebensdauer von Böden, Oberflächen und Einrichtung in Ihrem Objekt.",
  "Bedarfsgerechte Dosierung bedeutet weniger Chemie- und Geruchsbelastung für Mitarbeitende und Besucher.",
  "Eine nachvollziehbare, ehrliche Antwort, wenn Kunden oder Vermieter nach dem Umgang mit Ressourcen fragen.",
];

export default function UmweltVerantwortungPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Umwelt & Verantwortung" }]} />
      <JsonLd
        data={webPageSchema({
          name: "Umwelt & Verantwortung",
          description,
          path: "/umwelt-verantwortung",
        })}
      />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Nachhaltigkeit ist bei Glanzwerk kein Siegel und kein
              Werbeversprechen, sondern eine Reihe nachvollziehbarer
              Handgriffe im Reinigungsalltag – konsequent bedarfsgerecht statt
              pauschal maximal.
            </p>
          </div>
          <BrandPhoto photo={dosierungPhoto} priority className="shadow-2xl shadow-brand-950/20" />
        </div>
      </Section>

      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Unsere Grundsätze"
          title={heading.sectionHeadings[0]}
          subtitle="Keine Zertifikate, keine Siegel – dafür konkrete Prinzipien, die sich in jedem Einsatz wiederfinden."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((point, index) => (
            <FadeIn
              key={point.title}
              delay={index * 80}
              className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {principleIcons[point.icon]}
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

      <Section background="white">
        <EditorialIntro
          eyebrow="Produkte"
          title={heading.sectionHeadings[1]}
          subtitle="Weniger, aber gezielter eingesetzte Reinigungsmittel sind wirksamer und ressourcenschonender als ein pauschal starkes Universalmittel."
        >
          <div className="rounded-2xl border border-black/[0.06] bg-graphite-50 p-6">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
              Im Arbeitsalltag setzen wir unter anderem auf professionelle
              Reinigungsmittel und -systeme von Dr. Schnell und Kiehl,
              abgestimmt auf die jeweilige Fläche und Verschmutzung. Diese
              Hersteller sind keine Kooperations- oder Vertriebspartner von
              Glanzwerk; genannt werden ausschließlich Produkte, die wir im
              eigenen Arbeitsalltag tatsächlich einsetzen.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Dr. Schnell", "Kiehl"].map((brand) => (
                <li
                  key={brand}
                  className="rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-sm font-medium text-brand-900"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </EditorialIntro>
      </Section>

      <Section background="warm">
        <SectionHeading eyebrow="Für Ihr Unternehmen" title={heading.sectionHeadings[2]} />
        <FadeIn className="mt-10 grid divide-y divide-brand-900/[0.08] overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgb(7_26_58/0.04)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {benefits.map((benefit, index) => (
            <div key={benefit} className="flex gap-4 p-6 sm:flex-col sm:gap-3">
              <span className="font-display shrink-0 text-2xl font-medium text-brand-300 sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{benefit}</p>
            </div>
          ))}
        </FadeIn>
        <p className="mt-6 text-sm text-ink-soft">
          Mehr zu den handwerklichen Prinzipien hinter unserer Arbeit finden
          Sie auf der{" "}
          <Link href="/ueber-uns" className="font-semibold text-brand-500 hover:underline">
            Über-uns-Seite
          </Link>{" "}
          sowie im Glanzwerk-Wissen-Artikel{" "}
          <Link
            href="/wissen/nachhaltige-gebaeudereinigung"
            className="font-semibold text-brand-500 hover:underline"
          >
            Nachhaltige Gebäudereinigung
          </Link>
          .
        </p>
      </Section>

      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Sprechen Sie uns direkt an oder berechnen Sie in wenigen Minuten einen ersten Richtpreis für Ihr Objekt."
          primaryLabel="Preis berechnen"
          primaryHref="/preisrechner"
          secondaryLabel="Kontakt aufnehmen"
          secondaryHref="/kontakt"
        />
      </Section>
    </>
  );
}
