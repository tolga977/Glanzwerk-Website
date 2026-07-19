import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import EditorialIntro from "@/components/ui/EditorialIntro";
import ServiceCard from "@/components/ui/ServiceCard";
import LocationCard from "@/components/ui/LocationCard";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { districts, getDistrictBySlug, getNeighborDistricts } from "@/data/districts";
import { getServiceBySlug } from "@/data/services";
import { getCombosForDistrict } from "@/data/combos";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ bezirk: string }>;
}

export function generateStaticParams() {
  return districts.map((district) => ({ bezirk: district.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bezirk } = await params;
  const district = getDistrictBySlug(bezirk);
  if (!district) return {};
  return buildMetadata({
    title: `Gebäudereinigung ${district.name}`,
    description: district.metaDescription,
    path: `/standorte/${district.slug}`,
  });
}

export default async function DistrictPage({ params }: Props) {
  const { bezirk } = await params;
  const district = getDistrictBySlug(bezirk);
  if (!district) notFound();

  const featuredServices = district.featuredServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const neighbors = getNeighborDistricts(district);
  const districtCombos = getCombosForDistrict(district.slug)
    .map((combo) => ({ combo, service: getServiceBySlug(combo.serviceSlug) }))
    .filter((entry): entry is { combo: typeof entry.combo; service: NonNullable<typeof entry.service> } =>
      Boolean(entry.service),
    );

  return (
    <>
      <Breadcrumb
        items={[{ label: "Standorte", href: "/standorte" }, { label: district.name }]}
      />
      <JsonLd
        data={serviceSchema({
          name: `Gebäudereinigung ${district.name}`,
          description: district.metaDescription,
          path: `/standorte/${district.slug}`,
          areaServed: district.name,
        })}
      />

      <Section background="white" className="pt-12">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            Gebäudereinigung {district.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{district.intro}</p>
        </div>

        {district.ortsteile.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {district.ortsteile.map((ortsteil) => (
              <Link
                key={ortsteil.slug}
                href={`/standorte/${district.slug}/${ortsteil.slug}`}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500"
              >
                {ortsteil.name}
              </Link>
            ))}
          </div>
        )}

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

      <Section background="muted">
        <EditorialIntro title={`Reinigung in ${district.name}`}>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
            {district.localContext.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </EditorialIntro>
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-brand-900">
            Typische Kunden in {district.name}
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {district.audiences.map((audience) => (
              <li
                key={audience}
                className="rounded-xl border border-black/[0.06] bg-white px-4 py-2.5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
              >
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {featuredServices.length > 0 && (
        <Section background="white">
          <SectionHeading
            eyebrow="Leistungen"
            title={`Gefragte Reinigungsleistungen in ${district.name}`}
          />
          <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </FadeIn>
          <div className="mt-6">
            <Link href="/leistungen" className="text-sm font-semibold text-brand-500 hover:underline">
              Alle Leistungen im Überblick
            </Link>
          </div>
        </Section>
      )}

      {districtCombos.length > 0 && (
        <Section background="muted">
          <SectionHeading
            eyebrow="Spezialisierte Seiten"
            title={`Leistungen mit direktem Bezug zu ${district.name}`}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {districtCombos.map(({ combo, service }) => (
              <Link
                key={service.slug}
                href={`/leistungen/${service.slug}/${combo.districtSlug}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500"
              >
                {service.shortTitle} {district.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section background={districtCombos.length > 0 ? "white" : "muted"}>
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />
        <div className="mx-auto mt-8 max-w-2xl">
          <FAQ items={district.faq} idPrefix={`district-${district.slug}`} />
        </div>
      </Section>

      {neighbors.length > 0 && (
        <Section background="white">
          <SectionHeading eyebrow="Nachbarbezirke" title="Auch in angrenzenden Bezirken im Einsatz" />
          <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {neighbors.map((neighbor) => (
              <LocationCard key={neighbor.slug} district={neighbor} />
            ))}
          </FadeIn>
        </Section>
      )}

      <Section background="muted">
        <CTASection
          title={`Angebot für Ihr Objekt in ${district.name}`}
          subtitle="Fordern Sie ein unverbindliches Angebot für Ihre Gebäudereinigung an."
        />
      </Section>
    </>
  );
}
