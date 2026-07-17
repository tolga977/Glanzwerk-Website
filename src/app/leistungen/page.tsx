import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Leistungen",
  description:
    "Alle Reinigungsleistungen von Glanzwerk für Unternehmen in Berlin – von der Büroreinigung bis zur Grundreinigung.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Leistungen" }]} />

      <Section background="white" className="pt-12">
        <SectionHeading
          as="h1"
          eyebrow="Leistungen"
          title="Reinigungsleistungen für Gewerbeobjekte"
          subtitle="Von der laufenden Unterhaltsreinigung bis zur einmaligen Grundreinigung – wählen Sie die passende Leistung für Ihr Objekt."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </FadeIn>
      </Section>

      <Section background="muted">
        <CTASection />
      </Section>
    </>
  );
}
