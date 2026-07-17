import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import TrustBadges from "@/components/ui/TrustBadges";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import BrandPhoto from "@/components/ui/BrandPhoto";
import Logo from "@/components/layout/Logo";
import JsonLd from "@/components/seo/JsonLd";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const description =
  "Glanzwerk Reinigungsservice Berlin – inhabergeführter Reinigungsdienstleister für Gewerbeobjekte in Berlin.";

export const metadata: Metadata = buildMetadata({
  title: "Über uns",
  description,
  path: "/ueber-uns",
});

const workingMethodIcons = {
  products: (
    <>
      <path d="M10 3h4M11 3v4.2L7 13v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6l-4-5.8V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 15h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  equipment: (
    <>
      <rect x="5" y="10" width="10" height="10" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V6.5A2.5 2.5 0 0 1 10.5 4h0A2.5 2.5 0 0 1 13 6.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M17.5 12.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17.5" cy="10.5" r="1.7" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  process: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5l1.5 1.5 3-3M8 15l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9h2M14.5 15.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 14.6c1.7.3 3 1.7 3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
} as const;

const workingMethodPoints = [
  {
    title: "Passende Mittel statt Universallösung",
    description:
      "Für Glas, Boden, Sanitär und empfindliche Oberflächen setzen wir jeweils darauf abgestimmte, professionelle Reinigungsmittel ein – nicht ein einziges Mittel für alles.",
    icon: "products" as const,
  },
  {
    title: "Profigeräte statt Haushaltstechnik",
    description:
      "Für Gewerbeflächen nutzen wir Geräte, die auf regelmäßigen, professionellen Einsatz ausgelegt sind – das schont Böden und Oberflächen im Alltag.",
    icon: "equipment" as const,
  },
  {
    title: "Dokumentierte Arbeitsabläufe",
    description:
      "Jedes Objekt hat einen festgelegten Ablauf, keine spontane Improvisation – so bleibt die Qualität auch bei wechselnden Terminen gleich.",
    icon: "process" as const,
  },
  {
    title: "Feste, geschulte Teams",
    description:
      "Wer bei Ihnen reinigt, kennt Ihr Objekt und wurde für die jeweilige Umgebung eingewiesen – von der Praxis bis zum Autohaus-Showroom.",
    icon: "team" as const,
  },
];

const assuranceIcons = {
  shield: (
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
  refresh: (
    <>
      <path
        d="M5 11a7 7 0 0 1 12-4.9M19 13a7 7 0 0 1-12 4.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M17 3.5V6.5H14M7 20.5V17.5H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} as const;

const sustainabilityIcons = {
  dosing: (
    <>
      <path d="M9 3h6M10 3v4.5L5.5 16a2 2 0 0 0 1.8 2.9h9.4a2 2 0 0 0 1.8-2.9L14 7.5V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 14.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  microfiber: (
    <>
      <path d="M5 5.5h9a3 3 0 0 1 3 3v.5a2 2 0 0 1-2 2h-.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5.5v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 9.5h5M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  rhythm: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  selection: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.3 12.3l2.4 2.4 5-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} as const;

const sustainabilityPoints = [
  {
    title: "Dosierung statt Verschwendung",
    description:
      "Wir dosieren Reinigungsmittel nach Herstellerangabe statt „auf Verdacht“ – das schont Flächen, Kosten und Umwelt gleichermaßen.",
    icon: "dosing" as const,
  },
  {
    title: "Mikrofasertechnik",
    description:
      "Wo möglich, setzen wir Mikrofasertücher und -mopps ein, die mit weniger Chemie auskommen und mehrfach wiederverwendbar sind.",
    icon: "microfiber" as const,
  },
  {
    title: "Bedarfsgerechte Intervalle",
    description:
      "Ein passender Reinigungsrhythmus statt pauschaler Maximalreinigung vermeidet unnötigen Wasser-, Material- und Energieverbrauch.",
    icon: "rhythm" as const,
  },
  {
    title: "Bewusste Produktwahl",
    description:
      "Bei der Auswahl unserer Reinigungsmittel achten wir auf Verträglichkeit und Wirksamkeit, ohne pauschal zum stärksten Mittel zu greifen.",
    icon: "selection" as const,
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Über uns" }]} />
      <JsonLd data={webPageSchema({ name: "Über uns", description, path: "/ueber-uns", type: "AboutPage" })} />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
              Über Glanzwerk Reinigungsservice Berlin
            </h1>
            <p className="mt-4 text-lg text-ink-soft">
              Glanzwerk ist ein inhabergeführtes Reinigungsunternehmen mit Sitz
              in Berlin. Wir haben uns auf die Gebäudereinigung für
              gewerbliche Kunden spezialisiert – von Büros und Praxen über
              Kanzleien bis hin zu Kitas, Fitnessstudios und Autohäusern.
            </p>
            <p className="mt-4 text-lg text-ink-soft">
              Uns ist wichtig, dass Sie wissen, wer bei Ihnen reinigt und wen
              Sie im Zweifel direkt erreichen. Deshalb setzen wir auf feste
              Teams statt ständig wechselndem Personal und auf klare
              Absprachen statt langer Warteschleifen.
            </p>
          </div>
          <BrandPhoto
            photo={photos.professionalCleaner}
            className="shadow-2xl shadow-brand-950/20"
          />
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading eyebrow="Unsere Werte" title="Wofür wir stehen" />
        <FadeIn className="mt-10">
          <TrustBadges />
        </FadeIn>
      </Section>

      <Section background="white">
        <SectionHeading
          eyebrow="Wie wir arbeiten"
          title="Handwerkliche Sorgfalt statt Marketingversprechen"
          subtitle="Konkrete Prinzipien statt Werbefloskeln – und die professionellen Produkte, mit denen wir tatsächlich arbeiten."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {workingMethodPoints.map((point, index) => (
            <FadeIn
              key={point.title}
              delay={index * 80}
              className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {workingMethodIcons[point.icon]}
                </svg>
              </span>
              <div>
                <p className="font-display text-base font-medium text-brand-900">{point.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={320} className="mt-6 rounded-2xl border border-black/[0.06] bg-graphite-50 p-6">
          <p className="text-sm font-semibold text-brand-900">Verwendete Produkte</p>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Im Arbeitsalltag setzen wir unter anderem auf professionelle
            Reinigungsmittel und -systeme von Dr. Schnell, Kiehl, Buzil und
            DEISS – abgestimmt auf die jeweilige Fläche und Verschmutzung.
            Diese Hersteller sind keine Kooperations- oder Vertriebspartner
            von Glanzwerk; genannt werden ausschließlich Produkte, die wir
            im eigenen Arbeitsalltag tatsächlich einsetzen.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["Dr. Schnell", "Kiehl", "Buzil", "DEISS"].map((brand) => (
              <li
                key={brand}
                className="rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-sm font-medium text-brand-900"
              >
                {brand}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      <Section background="white">
        <SectionHeading
          eyebrow="Qualitätssicherung"
          title="Abgesichert und mit klarem Versprechen"
          subtitle="Zwei konkrete Zusagen statt vager Werbeaussagen."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <FadeIn className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {assuranceIcons.shield}
              </svg>
            </span>
            <p className="font-display mt-4 text-base font-medium text-brand-900">
              5 Mio. € Betriebshaftpflicht
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Glanzwerk ist mit einer Betriebshaftpflichtversicherung in Höhe
              von 5 Mio. € bei der Allianz abgesichert – für den Fall, dass
              bei der Arbeit an Ihrem Objekt tatsächlich einmal etwas
              schiefgeht.
            </p>
          </FadeIn>
          <FadeIn delay={80} className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {assuranceIcons.refresh}
              </svg>
            </span>
            <p className="font-display mt-4 text-base font-medium text-brand-900">
              Nachbesserung oder Geld zurück
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Melden Sie einen konkreten Mangel innerhalb von 24 Stunden nach
              dem Termin, beheben wir ihn in der Regel kostenlos nach. Ist das
              im Einzelfall nicht möglich oder nicht zumutbar, erstatten wir
              den anteiligen Betrag für die betroffene Leistung zurück. Die
              genauen Bedingungen regeln unsere Vertragsunterlagen.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section background="warm">
        <SectionHeading
          eyebrow="Nachhaltigkeit"
          title="Nachhaltiger reinigen, wo es wirklich etwas bringt"
          subtitle="Keine Zertifikate, keine Siegel – sondern nachvollziehbare Handgriffe im Alltag, die wir tatsächlich umsetzen."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {sustainabilityPoints.map((point, index) => (
              <FadeIn
                key={point.title}
                delay={index * 80}
                className="flex gap-3 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {sustainabilityIcons[point.icon]}
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-900">{point.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
                </div>
              </FadeIn>
            ))}
          </ul>
          <div>
            <BrandPhoto
              photo={photos.cleaningEquipment}
              className="shadow-2xl shadow-brand-950/20"
            >
              <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
                <Logo height={22} />
              </div>
            </BrandPhoto>
            <Link
              href="/wissen/nachhaltige-gebaeudereinigung"
              className="mt-4 inline-block text-sm font-semibold text-brand-500 hover:underline"
            >
              Mehr zu nachhaltiger Gebäudereinigung im Glanzwerk Wissen
            </Link>
          </div>
        </div>
      </Section>

      <Section background="muted">
        <CTASection
          title="Lernen Sie uns kennen"
          subtitle="Nehmen Sie Kontakt auf – wir beraten Sie unverbindlich zu Ihrem Reinigungsbedarf."
          primaryLabel="Kontakt aufnehmen"
          primaryHref="/kontakt"
        />
      </Section>
    </>
  );
}
