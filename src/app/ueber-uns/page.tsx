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

const sustainabilityPoints = [
  {
    title: "Dosierung statt Verschwendung",
    description:
      "Wir dosieren Reinigungsmittel nach Herstellerangabe statt „auf Verdacht“ – das schont Flächen, Kosten und Umwelt gleichermaßen.",
  },
  {
    title: "Mikrofasertechnik",
    description:
      "Wo möglich, setzen wir Mikrofasertücher und -mopps ein, die mit weniger Chemie auskommen und mehrfach wiederverwendbar sind.",
  },
  {
    title: "Bedarfsgerechte Intervalle",
    description:
      "Ein passender Reinigungsrhythmus statt pauschaler Maximalreinigung vermeidet unnötigen Wasser-, Material- und Energieverbrauch.",
  },
  {
    title: "Bewusste Produktwahl",
    description:
      "Bei der Auswahl unserer Reinigungsmittel achten wir auf Verträglichkeit und Wirksamkeit, ohne pauschal zum stärksten Mittel zu greifen.",
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
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
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
