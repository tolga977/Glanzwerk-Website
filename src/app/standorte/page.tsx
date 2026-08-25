import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import LocationCard from "@/components/ui/LocationCard";
import BrandPhoto from "@/components/ui/BrandPhoto";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import EinsatzgebietKarte from "@/components/ui/EinsatzgebietKarte";
import { districts } from "@/data/districts";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/metadata";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/standorte"];

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description:
    "Glanzwerk reinigt Gewerbeobjekte in allen 12 Berliner Bezirken – von Mitte bis Reinickendorf.",
  path: "/standorte",
});

export default function StandortePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Standorte" }]} />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              Standorte
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Wir betreuen Gewerbeobjekte in ganz Berlin. Wählen Sie Ihren
              Bezirk für weitere Informationen zu Einsatzgebiet und
              Ansprechpartnern vor Ort.
            </p>
          </div>
          <BrandPhoto photo={photos.buildingFacade} priority className="shadow-deep" />
        </div>
        <FadeIn className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((district) => (
            <LocationCard key={district.slug} district={district} />
          ))}
        </FadeIn>
      </Section>

      <Section background="tint">
        <SectionHeading
          eyebrow="Firmensitz"
          title="Wo Glanzwerk zu finden ist"
        />
        <div className="mt-8 max-w-2xl">
          <EinsatzgebietKarte />
        </div>
      </Section>

      <Section background="muted">
        <CTASection title={heading.ctaHeading} />
      </Section>
    </>
  );
}
