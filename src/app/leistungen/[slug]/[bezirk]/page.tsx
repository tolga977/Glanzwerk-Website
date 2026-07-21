import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceBySlug } from "@/data/services";
import { getDistrictBySlug, getNeighborDistricts } from "@/data/districts";
import { combos, getCombo } from "@/data/combos";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string; bezirk: string }>;
}

export function generateStaticParams() {
  return combos.map((combo) => ({ slug: combo.serviceSlug, bezirk: combo.districtSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, bezirk } = await params;
  const combo = getCombo(slug, bezirk);
  const service = getServiceBySlug(slug);
  const district = getDistrictBySlug(bezirk);
  if (!combo || !service || !district) return {};
  return buildMetadata({
    title: `${service.shortTitle} ${district.name}`,
    description:
      combo.metaDescription ??
      `${service.shortTitle} in ${district.name}: ${combo.intro.slice(0, 130).replace(/\s+\S*$/, "")}…`,
    path: `/leistungen/${service.slug}/${district.slug}`,
  });
}

export default async function ServiceDistrictPage({ params }: Props) {
  const { slug, bezirk } = await params;
  const combo = getCombo(slug, bezirk);
  const service = getServiceBySlug(slug);
  const district = getDistrictBySlug(bezirk);
  if (!combo || !service || !district) notFound();

  const neighborCombos = getNeighborDistricts(district)
    .map((neighbor) => ({
      neighbor,
      combo: getCombo(service.slug, neighbor.slug),
    }))
    .filter((entry): entry is { neighbor: typeof entry.neighbor; combo: NonNullable<typeof entry.combo> } =>
      Boolean(entry.combo),
    );

  const faqItems = combo.faq ?? [
    {
      question: `Bietet Glanzwerk ${service.shortTitle} auch in ${district.name} an?`,
      answer: `Ja, ${service.shortTitle} gehört in ${district.name} zu unserem Einsatzgebiet. ${combo.intro}`,
    },
    {
      question: `Wie kann ich ein Angebot für ${service.shortTitle} in ${district.name} anfragen?`,
      answer:
        "Nutzen Sie unseren Preisrechner für eine erste Einschätzung oder das Kontaktformular – wir melden uns zeitnah mit einem individuellen Angebot.",
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Leistungen", href: "/leistungen" },
          { label: service.shortTitle, href: `/leistungen/${service.slug}` },
          { label: district.name },
        ]}
      />
      <JsonLd
        data={serviceSchema({
          name: `${service.shortTitle} ${district.name}`,
          description: combo.intro,
          path: `/leistungen/${service.slug}/${district.slug}`,
          areaServed: district.name,
        })}
      />

      <Section background="white" className="pt-12">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
            {service.shortTitle} {district.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{combo.intro}</p>
          {combo.introSecondParagraph && (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{combo.introSecondParagraph}</p>
          )}
        </div>

        <FadeIn as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-2xl border border-black/[0.06] bg-white p-5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            {service.benefits[0]}
          </li>
          <li className="rounded-2xl border border-black/[0.06] bg-white p-5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            Typische Aufgabe: {service.tasks[0]}
          </li>
          <li className="rounded-2xl border border-black/[0.06] bg-white p-5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
            Passend für: {district.audiences[0]}
          </li>
        </FadeIn>

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

      {combo.localAngle && combo.localAngle.length > 0 && (
        <Section background="tint" decor>
          <SectionHeading
            eyebrow="Vor Ort"
            title={`Was ${service.shortTitle} in ${district.name} besonders macht`}
          />
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
            {combo.localAngle.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>
      )}

      {(combo.scopeBullets || combo.processText) && (
        <Section background="white">
          <div className="grid gap-10 lg:grid-cols-2">
            {combo.scopeBullets && (
              <div>
                <SectionHeading eyebrow="Umfang" title="Leistungsumfang auf einen Blick" />
                <ul className="mt-6 space-y-2.5">
                  {combo.scopeBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-brand-500"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="mt-5 inline-block text-sm font-semibold text-brand-500 hover:underline"
                >
                  Vollständigen Leistungsumfang der {service.shortTitle} ansehen
                </Link>
                {combo.additionalLinks && combo.additionalLinks.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {combo.additionalLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-block text-sm font-semibold text-brand-500 hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {combo.processText && (
              <div>
                <SectionHeading eyebrow="Ablauf" title={`So starten Sie in ${district.name}`} />
                <p className="mt-6 text-base leading-relaxed text-ink-soft">{combo.processText}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {combo.priceFactorsText && (
        <Section background="tint" decor>
          <SectionHeading
            eyebrow="Preisfaktoren"
            title={`Was die ${service.shortTitle} in ${district.name} kostet`}
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">{combo.priceFactorsText}</p>
        </Section>
      )}

      {combo.localAngle && combo.localAngle.length > 0 && (
        <Section background="white">
          <SectionHeading eyebrow="Zielgruppe" title={`Passende Objekte in ${district.name}`} />
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-3">
            {service.audiences.map((audience) => (
              <li
                key={audience}
                className="rounded-xl border border-black/[0.06] bg-white px-4 py-2.5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
              >
                {audience}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section background="muted">
        <FadeIn className="grid gap-6 sm:grid-cols-2">
          <Link
            href={`/leistungen/${service.slug}`}
            className="group rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-900/[0.08]"
          >
            <h2 className="font-display text-lg font-medium text-brand-900 group-hover:text-brand-500">
              Mehr zur {service.shortTitle} in Berlin
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.summary}</p>
          </Link>
          <Link
            href={`/standorte/${district.slug}`}
            className="group rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-900/[0.08]"
          >
            <h2 className="font-display text-lg font-medium text-brand-900 group-hover:text-brand-500">
              Alle Leistungen in {district.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{district.summary}</p>
          </Link>
        </FadeIn>
      </Section>

      <Section background="white">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />
        <div className="mx-auto mt-8 max-w-2xl">
          <FAQ items={faqItems} idPrefix={`combo-${service.slug}-${district.slug}`} />
        </div>
      </Section>

      {neighborCombos.length > 0 && (
        <Section background="muted">
          <SectionHeading
            eyebrow="Angrenzende Bezirke"
            title={`${service.shortTitle} auch in der Nähe`}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {neighborCombos.map(({ neighbor }) => (
              <Link
                key={neighbor.slug}
                href={`/leistungen/${service.slug}/${neighbor.slug}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500"
              >
                {service.shortTitle} {neighbor.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section background={neighborCombos.length > 0 ? "white" : "muted"}>
        <CTASection
          title={`Angebot für ${service.shortTitle} in ${district.name}`}
          subtitle={
            combo.ctaSubtitle ??
            "Beschreiben Sie kurz Ihr Objekt – wir melden uns mit einem individuellen Angebot."
          }
          primaryLabel="Reinigung anfragen"
        />
      </Section>
    </>
  );
}
