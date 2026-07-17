import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import LocationCard from "@/components/ui/LocationCard";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { districts } from "@/data/districts";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Standorte",
  description:
    "Glanzwerk reinigt Gewerbeobjekte in allen 12 Berliner Bezirken – von Mitte bis Reinickendorf.",
  path: "/standorte",
});

export default function StandortePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Standorte" }]} />

      <Section background="white" className="pt-12">
        <SectionHeading
          as="h1"
          eyebrow="Standorte"
          title="Gebäudereinigung in allen Berliner Bezirken"
          subtitle="Wir betreuen Gewerbeobjekte in ganz Berlin. Wählen Sie Ihren Bezirk für weitere Informationen."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((district) => (
            <LocationCard key={district.slug} district={district} />
          ))}
        </FadeIn>
      </Section>

      <Section background="muted">
        <CTASection />
      </Section>
    </>
  );
}
