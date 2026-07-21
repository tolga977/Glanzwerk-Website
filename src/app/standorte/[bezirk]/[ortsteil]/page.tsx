import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { districts, getOrtsteil } from "@/data/districts";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

interface Props {
  params: Promise<{ bezirk: string; ortsteil: string }>;
}

export function generateStaticParams() {
  return districts.flatMap((district) =>
    district.ortsteile.map((ortsteil) => ({
      bezirk: district.slug,
      ortsteil: ortsteil.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bezirk, ortsteil } = await params;
  const result = getOrtsteil(bezirk, ortsteil);
  if (!result) return {};
  const description = `Gebäudereinigung für Gewerbeobjekte in ${result.ortsteil.name} (${result.district.name}). Glanzwerk als Reinigungspartner vor Ort. Jetzt Angebot anfragen.`;
  const heading = seoHeadings[`/standorte/${result.district.slug}/${result.ortsteil.slug}`];
  return buildMetadata({
    title: heading?.metaTitle ?? heading?.h1 ?? `Gebäudereinigung ${result.ortsteil.name}`,
    description,
    path: `/standorte/${result.district.slug}/${result.ortsteil.slug}`,
  });
}

export default async function OrtsteilPage({ params }: Props) {
  const { bezirk, ortsteil } = await params;
  const result = getOrtsteil(bezirk, ortsteil);
  if (!result) notFound();
  const heading = seoHeadings[`/standorte/${result.district.slug}/${result.ortsteil.slug}`];
  if (!heading) notFound();

  const { district, ortsteil: ortsteilData } = result;
  const featuredServices = district.featuredServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Standorte", href: "/standorte" },
          { label: district.name, href: `/standorte/${district.slug}` },
          { label: ortsteilData.name },
        ]}
      />
      <JsonLd
        data={serviceSchema({
          name: `Gebäudereinigung ${ortsteilData.name}`,
          description: `Gebäudereinigung für Gewerbeobjekte in ${ortsteilData.name}, ${district.name}.`,
          path: `/standorte/${district.slug}/${ortsteilData.slug}`,
          areaServed: ortsteilData.name,
        })}
      />

      <Section background="white" className="pt-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Reinigungsservice für Büros, Praxen und Gewerbeobjekte in{" "}
            {ortsteilData.name} ({district.name}).
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/preisrechner"
            className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Preis berechnen
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white"
          >
            Angebot anfragen
          </Link>
        </div>
      </Section>

      {featuredServices.length > 0 && (
        <Section background="muted">
          <SectionHeading eyebrow="Leistungen" title={heading.sectionHeadings[0]} />
          <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </FadeIn>
        </Section>
      )}

      <Section background="white">
        <CTASection
          title={heading.ctaHeading ?? `Angebot für Ihr Objekt in ${ortsteilData.name}`}
          subtitle="Fordern Sie ein unverbindliches Angebot für Ihre Gebäudereinigung an."
        />
      </Section>
    </>
  );
}
