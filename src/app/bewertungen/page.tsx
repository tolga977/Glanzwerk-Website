import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import Reviews from "@/components/ui/Reviews";
import BrandPhoto from "@/components/ui/BrandPhoto";
import CTASection from "@/components/ui/CTASection";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/metadata";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/bewertungen"];

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description: "Erfahrungen und Bewertungen von Glanzwerk Reinigungsservice Berlin.",
  path: "/bewertungen",
});

export default function BewertungenPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Bewertungen" }]} />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              Bewertungen
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Wir sammeln fortlaufend Rückmeldungen unserer Kunden zu
              unserer Arbeit und veröffentlichen sie hier, sobald sie
              vorliegen.
            </p>
          </div>
          <BrandPhoto photo={photos.cleaningEquipment} priority className="shadow-2xl shadow-brand-950/20" />
        </div>
        <div className="mt-14">
          <Reviews reviews={[]} />
        </div>
      </Section>

      <Section background="muted">
        <CTASection title={heading.ctaHeading} />
      </Section>
    </>
  );
}
