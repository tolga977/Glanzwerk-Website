import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { districts, getOrtsteil } from "@/data/districts";
import { getServiceBySlug } from "@/data/services";
import { getCombosForDistrict } from "@/data/combos";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import Button from "@/components/ui/Button";

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
  const featuredServices = (ortsteilData.featuredServiceSlugs ?? district.featuredServiceSlugs)
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const hasLocalContext = Boolean(ortsteilData.localContext && ortsteilData.localContext.length > 0);
  let headingIdx = 0;
  const vorOrtHeading = hasLocalContext ? heading.sectionHeadings[headingIdx++] : undefined;
  const leistungenHeading = heading.sectionHeadings[headingIdx++];

  // Interne Verlinkung: bisher waren Ortsteilseiten eine Sackgasse – sie
  // verlinkten nur zu Leistungen und zur CTA, nicht zu Geschwister-Ortsteilen
  // oder den passenden Leistung×Bezirk-Kombiseiten (SEO-Audit local.md).
  const siblingOrtsteile = district.ortsteile.filter((o) => o.slug !== ortsteilData.slug);
  const relevantCombos = getCombosForDistrict(district.slug).filter((combo) =>
    featuredServices.some((service) => service.slug === combo.serviceSlug),
  );

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
          <Button href="/preisrechner">
              Preis berechnen
            </Button>
          <Button href="/kontakt" variant="outline">
              Angebot anfragen
            </Button>
        </div>
      </Section>

      {hasLocalContext && (
        <Section background="tint" decor>
          <SectionHeading eyebrow="Vor Ort" title={vorOrtHeading} />
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
            {ortsteilData.localContext!.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>
      )}

      {featuredServices.length > 0 && (
        <Section background="muted">
          <SectionHeading eyebrow="Leistungen" title={leistungenHeading} />
          <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </FadeIn>
        </Section>
      )}

      {(siblingOrtsteile.length > 0 || relevantCombos.length > 0) && (
        <Section background="muted">
          <SectionHeading eyebrow="In der Nähe" title={`${district.name} im Überblick`} />
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href={`/standorte/${district.slug}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Alle Leistungen in {district.name}
            </Link>
            {siblingOrtsteile.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/standorte/${district.slug}/${sibling.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Gebäudereinigung {sibling.name}
              </Link>
            ))}
            {relevantCombos.map((combo) => {
              const service = getServiceBySlug(combo.serviceSlug);
              if (!service) return null;
              return (
                <Link
                  key={combo.serviceSlug}
                  href={`/leistungen/${combo.serviceSlug}/${combo.districtSlug}`}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  {service.shortTitle} in {district.name}
                </Link>
              );
            })}
          </div>
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
