import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ServiceTiles from "@/components/ui/ServiceTiles";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { seoHeadings } from "@/data/seoHeadings";

const heading = seoHeadings["/leistungen"];

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description:
    "Alle Reinigungsleistungen von Glanzwerk für Unternehmen in Berlin – von der Büroreinigung bis zur Grundreinigung.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Leistungen" }]} />

      <Section background="paper" className="pt-12">
        <SectionHeading
          as="h1"
          eyebrow="Leistungen"
          title={heading.h1}
          subtitle="Von der laufenden Unterhaltsreinigung bis zur einmaligen Grundreinigung – wählen Sie die passende Leistung für Ihr Objekt."
        />
        <FadeIn className="mt-10">
          <ServiceTiles services={services} />
        </FadeIn>
      </Section>

      <Section background="muted">
        <CTASection title={heading.ctaHeading} />
      </Section>
    </>
  );
}
