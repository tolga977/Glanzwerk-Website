import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import Reviews from "@/components/ui/Reviews";
import CTASection from "@/components/ui/CTASection";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Bewertungen",
  description: "Erfahrungen und Bewertungen von Glanzwerk Reinigungsservice Berlin.",
  path: "/bewertungen",
});

export default function BewertungenPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Bewertungen" }]} />

      <Section background="white" className="pt-12">
        <SectionHeading
          as="h1"
          eyebrow="Bewertungen"
          title="Erfahrungen unserer Kunden in Berlin"
          subtitle="Wir sammeln fortlaufend Rückmeldungen unserer Kunden zu unserer Arbeit."
        />
        <div className="mt-10">
          <Reviews reviews={[]} />
        </div>
      </Section>

      <Section background="muted">
        <CTASection />
      </Section>
    </>
  );
}
