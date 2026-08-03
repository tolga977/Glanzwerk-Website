import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import GoogleRating from "@/components/ui/GoogleRating";
import { getServiceBySlug } from "@/data/services";
import { getDistrictBySlug, getNeighborDistricts } from "@/data/districts";
import { combos, getCombo } from "@/data/combos";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { getGoogleRating } from "@/lib/googleRating";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import GebaeudereinigungMitteContent from "./GebaeudereinigungMitteContent";
import GebaeudereinigungFriedrichshainKreuzbergContent from "./GebaeudereinigungFriedrichshainKreuzbergContent";
import GebaeudereinigungPankowContent from "./GebaeudereinigungPankowContent";
import GebaeudereinigungCharlottenburgWilmersdorfContent from "./GebaeudereinigungCharlottenburgWilmersdorfContent";
import GebaeudereinigungTempelhofSchoenebergContent from "./GebaeudereinigungTempelhofSchoenebergContent";
import GebaeudereinigungNeukoellnContent from "./GebaeudereinigungNeukoellnContent";
import Button from "@/components/ui/Button";

/** Kombi-Seiten mit eigenständigem, vom generischen Template abweichendem Seiteninhalt. */
const customContentCombos = {
  "gebaeudereinigung-berlin/mitte": GebaeudereinigungMitteContent,
  "gebaeudereinigung-berlin/friedrichshain-kreuzberg": GebaeudereinigungFriedrichshainKreuzbergContent,
  "gebaeudereinigung-berlin/pankow": GebaeudereinigungPankowContent,
  "gebaeudereinigung-berlin/charlottenburg-wilmersdorf": GebaeudereinigungCharlottenburgWilmersdorfContent,
  "gebaeudereinigung-berlin/tempelhof-schoeneberg": GebaeudereinigungTempelhofSchoenebergContent,
  "gebaeudereinigung-berlin/neukoelln": GebaeudereinigungNeukoellnContent,
} as const;

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
  const heading = seoHeadings[`/leistungen/${service.slug}/${district.slug}`];
  const base = buildMetadata({
    title: heading?.metaTitle ?? heading?.h1 ?? `${service.shortTitle} ${district.name}`,
    description:
      combo.metaDescription ??
      `${service.shortTitle} in ${district.name}: ${combo.intro.slice(0, 130).replace(/\s+\S*$/, "")}…`,
    path: `/leistungen/${service.slug}/${district.slug}`,
  });
  // Kombi-Seiten mit eigenständigem Inhalt haben einen abweichenden, kurzen
  // Meta-Title-Suffix ("| Glanzwerk" statt "| Glanzwerk Reinigungsservice Berlin")
  // und müssen deshalb das Root-Template umgehen.
  const comboKey = `${service.slug}/${district.slug}`;
  if (comboKey in customContentCombos && heading?.metaTitle) {
    return { ...base, title: { absolute: heading.metaTitle } };
  }
  return base;
}

export default async function ServiceDistrictPage({ params }: Props) {
  const { slug, bezirk } = await params;
  const combo = getCombo(slug, bezirk);
  const service = getServiceBySlug(slug);
  const district = getDistrictBySlug(bezirk);
  if (!combo || !service || !district) notFound();
  const heading = seoHeadings[`/leistungen/${service.slug}/${district.slug}`];
  if (!heading) notFound();
  const googleRating = await getGoogleRating();

  const CustomContent = customContentCombos[`${service.slug}/${district.slug}` as keyof typeof customContentCombos];
  if (CustomContent) {
    return <CustomContent service={service} district={district} combo={combo} heading={heading} />;
  }

  let headingIdx = 0;
  const hasLocalAngle = Boolean(combo.localAngle && combo.localAngle.length > 0);
  const vorOrtHeading = hasLocalAngle ? heading.sectionHeadings[headingIdx++] : undefined;
  const scopeHeading = combo.scopeBullets ? heading.sectionHeadings[headingIdx++] : undefined;
  const processHeading = combo.processText ? heading.sectionHeadings[headingIdx++] : undefined;
  const priceHeading = combo.priceFactorsText ? heading.sectionHeadings[headingIdx++] : undefined;
  const passendeObjekteHeading = hasLocalAngle ? heading.sectionHeadings[headingIdx++] : undefined;
  const mehrZurLeistungHeading = heading.sectionHeadings[headingIdx++];
  const alleLeistungenHeading = heading.sectionHeadings[headingIdx++];

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
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{combo.intro}</p>
          {combo.introSecondParagraph && (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{combo.introSecondParagraph}</p>
          )}
        </div>

        <FadeIn as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            {service.benefits[0]}
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Typische Aufgabe: {service.tasks[0]}
          </li>
          <li className="rounded-card border border-line bg-white p-5 text-sm font-medium text-brand-900 shadow-raise">
            Passend für: {district.audiences[0]}
          </li>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/preisrechner">
              Preis berechnen
            </Button>
          <Button href="/kontakt" variant="outline">
              Angebot anfragen
            </Button>
        </div>

        {/*
          SXO-Audit: Wer über die lokale Suche direkt hier landet (nicht über
          die Startseite), sah bislang weder Preisrechner-Hinweis noch
          Vertrauenssignal – beides stand nur im Hero der Startseite. Der
          Preisrechner-Button steht bereits oben; das Bewertungssignal fehlte.
        */}
        <div className="mt-6">
          <GoogleRating data={googleRating} variant="inline" />
        </div>
      </Section>

      {combo.localAngle && combo.localAngle.length > 0 && (
        <Section background="tint" decor>
          <SectionHeading eyebrow="Vor Ort" title={vorOrtHeading} />
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
                <SectionHeading eyebrow="Umfang" title={scopeHeading} />
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
                  className="mt-5 inline-block text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  Vollständigen Leistungsumfang der {service.shortTitle} ansehen
                </Link>
                {combo.additionalLinks && combo.additionalLinks.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {combo.additionalLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-block text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
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
                <SectionHeading eyebrow="Ablauf" title={processHeading} />
                <p className="mt-6 text-base leading-relaxed text-ink-soft">{combo.processText}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {combo.priceFactorsText && (
        <Section background="tint" decor>
          <SectionHeading eyebrow="Preisfaktoren" title={priceHeading} />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">{combo.priceFactorsText}</p>
        </Section>
      )}

      {combo.localAngle && combo.localAngle.length > 0 && (
        <Section background="white">
          <SectionHeading eyebrow="Zielgruppe" title={passendeObjekteHeading} />
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-3">
            {service.audiences.map((audience) => (
              <li
                key={audience}
                className="rounded-control border border-line bg-white px-4 py-2.5 text-sm font-medium text-brand-900 shadow-raise"
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
            className="group rounded-card border border-line bg-white p-6 shadow-raise lift hover:border-brand-100 hover:shadow-float"
          >
            <h2 className="font-display text-lg font-medium text-brand-900 group-hover:text-brand-500">
              {mehrZurLeistungHeading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.summary}</p>
          </Link>
          <Link
            href={`/standorte/${district.slug}`}
            className="group rounded-card border border-line bg-white p-6 shadow-raise lift hover:border-brand-100 hover:shadow-float"
          >
            <h2 className="font-display text-lg font-medium text-brand-900 group-hover:text-brand-500">
              {alleLeistungenHeading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{district.summary}</p>
          </Link>
        </FadeIn>
      </Section>

      <Section background="white">
        <SectionHeading eyebrow="FAQ" title={heading.faqHeading ?? "Häufige Fragen"} />
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
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                {service.shortTitle} {neighbor.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section background={neighborCombos.length > 0 ? "white" : "muted"}>
        <CTASection
          title={heading.ctaHeading ?? `Angebot für ${service.shortTitle} in ${district.name}`}
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
