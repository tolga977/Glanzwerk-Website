import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import EditorialIntro from "@/components/ui/EditorialIntro";
import ServiceCard from "@/components/ui/ServiceCard";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ProcessSteps from "@/components/ui/ProcessSteps";
import ExpectationCards from "@/components/ui/ExpectationCards";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { services, getServiceBySlug, getRelatedServices } from "@/data/services";
import { getCombosForService } from "@/data/combos";
import { getDistrictBySlug } from "@/data/districts";
import { servicePhotos } from "@/data/servicePhotos";
import { serviceContentPhotos } from "@/data/serviceContentPhotos";
import { serviceMidPhotos } from "@/data/serviceMidPhotos";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1, renderGlanzwerkHeading } from "@/lib/renderHeading";
import GebaeudereinigungBerlinContent from "./GebaeudereinigungBerlinContent";
import BueroreinigungBerlinContent from "./BueroreinigungBerlinContent";
import PraxisreinigungBerlinContent from "./PraxisreinigungBerlinContent";
import KanzleireinigungBerlinContent from "./KanzleireinigungBerlinContent";
import TreppenhausreinigungBerlinContent from "./TreppenhausreinigungBerlinContent";
import GrundreinigungBerlinContent from "./GrundreinigungBerlinContent";
import UnterhaltsreinigungBerlinContent from "./UnterhaltsreinigungBerlinContent";
import AutohausreinigungBerlinContent from "./AutohausreinigungBerlinContent";
import GlasUndFensterreinigungBerlinContent from "./GlasUndFensterreinigungBerlinContent";
import GastronomiereinigungBerlinContent from "./GastronomiereinigungBerlinContent";

/** Leistungsseiten mit eigenständigem, vom generischen Template abweichendem Seiteninhalt. */
const customContentSlugs = {
  "gebaeudereinigung-berlin": GebaeudereinigungBerlinContent,
  "bueroreinigung-berlin": BueroreinigungBerlinContent,
  "praxisreinigung-berlin": PraxisreinigungBerlinContent,
  "kanzleireinigung-berlin": KanzleireinigungBerlinContent,
  "treppenhausreinigung-berlin": TreppenhausreinigungBerlinContent,
  "grundreinigung-berlin": GrundreinigungBerlinContent,
  "unterhaltsreinigung-berlin": UnterhaltsreinigungBerlinContent,
  "autohausreinigung-berlin": AutohausreinigungBerlinContent,
  "glas-und-fensterreinigung-berlin": GlasUndFensterreinigungBerlinContent,
  "gastronomiereinigung-berlin": GastronomiereinigungBerlinContent,
} as const;

interface Props {
  params: Promise<{ slug: string }>;
}

/** Ehrliches Arbeitsprinzip statt Fantasiebezeichnung – gilt für jede Leistung gleichermaßen. Dient zugleich als 5-Schritt-Ablauf (01–05). */
const glanzwerkPrinciple = [
  { title: "Bedarf verstehen", description: "Wir klären Fläche, Nutzung und Anforderungen Ihres Objekts, bevor wir etwas anbieten." },
  { title: "Leistungen klar festlegen", description: "Der Leistungsumfang steht vorher fest – keine versteckten Zusatzkosten im Nachhinein." },
  { title: "Sorgfältig ausführen", description: "Feste Teams arbeiten nach abgestimmtem Ablauf statt spontaner Improvisation." },
  { title: "Qualität kontrollieren", description: "Mängel melden Sie uns direkt – wir bessern in der Regel innerhalb von 24 Stunden nach." },
  { title: "Persönlich abstimmen", description: "Änderungen am Bedarf besprechen Sie mit Ihrem festen Ansprechpartner, nicht mit wechselndem Personal." },
];

/** Einmalige Sonderleistungen ohne wiederkehrenden Rhythmus – für diese ist der 3-Monate-Test nicht relevant. */
const oneOffServiceSlugs = ["grundreinigung-berlin"];

/** Trust-Leiste am unteren Hero-Rand: drei sitewide bereits bestätigte Aussagen mit Icon. */
const heroTrustBar = [
  {
    label: "Kostenlose Anfrage in wenigen Minuten",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Fester Ansprechpartner statt Callcenter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15 14.6c1.7.3 3 1.7 3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Transparentes Angebot ohne versteckte Kosten",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5 19 6.5V11c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6.5L12 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12l2.2 2.2L15.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/** Drei einheitliche, zyklisch zugeordnete Icons für die "Schnelle Vorteile"-Karten (Uhr, Schild, Team). */
const quickBenefitIcons = [
  <svg key="clock" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="shield" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3.5 19 6.5V11c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6.5L12 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2.2 2.2L15.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="team" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M15 14.6c1.7.3 3 1.7 3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
];

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const heading = seoHeadings[`/leistungen/${service.slug}`];
  const base = buildMetadata({
    title: heading?.metaTitle ?? heading?.h1 ?? service.title,
    description: service.metaDescription,
    path: `/leistungen/${service.slug}`,
  });
  // Leistungsseiten mit eigenständigem Inhalt haben einen abweichenden, kurzen
  // Meta-Title-Suffix ("| Glanzwerk" statt "| Glanzwerk Reinigungsservice Berlin")
  // und müssen deshalb das Root-Template umgehen.
  if (service.slug in customContentSlugs && heading?.metaTitle) {
    return { ...base, title: { absolute: heading.metaTitle } };
  }
  return base;
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const heading = seoHeadings[`/leistungen/${service.slug}`];
  if (!heading) notFound();

  const CustomContent = customContentSlugs[service.slug as keyof typeof customContentSlugs];
  if (CustomContent) {
    return <CustomContent service={service} heading={heading} />;
  }

  const relatedServices = getRelatedServices(service);
  const photo = servicePhotos[service.slug];
  const contentPhotos = serviceContentPhotos[service.slug];
  const midPhoto = serviceMidPhotos[service.slug];
  const serviceIndex = services.findIndex((s) => s.slug === service.slug);
  const imageLeftOnDesktop = serviceIndex % 2 === 0;
  const districtCombos = getCombosForService(service.slug)
    .map((combo) => ({ combo, district: getDistrictBySlug(combo.districtSlug) }))
    .filter((entry): entry is { combo: typeof entry.combo; district: NonNullable<typeof entry.district> } =>
      Boolean(entry.district),
    );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Leistungen", href: "/leistungen" },
          { label: service.shortTitle },
        ]}
      />
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.metaDescription,
          path: `/leistungen/${service.slug}`,
        })}
      />

      {/* 1. Hero: vollflächiges Hintergrundbild, Text darüber, helle Verlaufsmaske, Trust-Leiste am unteren Rand */}
      <section className="relative isolate overflow-hidden bg-white">
        {photo && (
          <div className="absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: contentPhotos?.hero.objectPosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/15 sm:from-white sm:via-white/75 sm:to-white/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/10 to-transparent sm:hidden" />
          </div>
        )}

        <div
          className={`relative z-[1] container-page flex flex-col justify-center py-16 lg:py-20 ${
            photo ? "min-h-[520px] lg:min-h-[620px]" : ""
          }`}
        >
          <div className="max-w-xl">
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-brand-900 sm:text-5xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{service.intro}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="shine-sweep shine-sweep-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
            >
              Reinigung anfragen
            </Link>
            <Link
              href="/preisrechner"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-900 bg-white/70 px-6 text-sm font-semibold text-brand-900 backdrop-blur-sm transition-colors hover:bg-brand-900 hover:text-white"
            >
              Preis berechnen
            </Link>
          </div>
        </div>

        {/* Trust-Leiste am unteren Hero-Rand */}
        <div className="relative z-[1] border-t border-black/[0.06] bg-white/85 backdrop-blur-sm">
          <div className="container-page grid grid-cols-1 gap-3 py-4 sm:grid-cols-3 sm:gap-4">
            {heroTrustBar.map((point) => (
              <div key={point.label} className="flex items-center gap-2.5 text-sm font-medium text-brand-900">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                  {point.icon}
                </span>
                {point.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Schnelle Vorteile mit Symbolen */}
      <Section background="tint" decor>
        <SectionHeading eyebrow="Auf einen Blick" title={heading.sectionHeadings[0]} />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {service.bullets.map((bullet, index) => (
            <FadeIn
              key={bullet}
              delay={index * 80}
              className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                {quickBenefitIcons[index % quickBenefitIcons.length]}
              </span>
              <p className="text-sm font-medium leading-relaxed text-brand-900">{bullet}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 3. Problem/Herausforderung - optisch hervorgehoben */}
      <Section background="white">
        <div className="relative overflow-hidden rounded-3xl bg-graphite-50 p-8 sm:p-10">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-accent-500" />
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4 21 19H3L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <div>
              <h2 className="font-display text-2xl font-medium tracking-tight text-brand-900 sm:text-3xl">
                {heading.sectionHeadings[1]}
              </h2>
              <ul className="mt-5 space-y-3">
                {service.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Lösung im Mittelbereich: eigenes, vom Hero verschiedenes Bild (dezenter Scroll-Tiefeneffekt), alternierend links/rechts */}
      {midPhoto ? (
        <Section background="muted">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className={imageLeftOnDesktop ? "lg:order-2" : ""}>
              <EditorialIntro eyebrow="Leistungsbeschreibung" title={heading.sectionHeadings[2]}>
                <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
                  {service.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </EditorialIntro>
            </div>
            <ParallaxImage
              photo={midPhoto}
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 560px, 100vw"
              className={`shadow-xl shadow-brand-950/15 ${imageLeftOnDesktop ? "lg:order-1" : ""}`}
            />
          </div>
        </Section>
      ) : (
        <Section background="muted">
          <EditorialIntro eyebrow="Leistungsbeschreibung" title={heading.sectionHeadings[2]}>
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
              {service.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </EditorialIntro>
        </Section>
      )}

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-brand-900 sm:text-3xl">
              {heading.sectionHeadings[3]}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {service.tasks.map((task) => (
                <li key={task} className="flex items-start gap-2.5 text-sm text-ink-soft">
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
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-brand-900 sm:text-3xl">
              {heading.sectionHeadings[4]}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {service.audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-xl border border-gray-100 bg-brand-50/60 px-4 py-2.5 text-sm font-medium text-brand-900"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 5. Ablauf: fünf nummerierte Schritte 01-05 (Glanzwerk-Prinzip) — kräftiger Blauton als visueller Anker */}
      <Section background="brand" decor>
        <SectionHeading
          eyebrow="Ablauf"
          title={renderGlanzwerkHeading(heading.sectionHeadings[5], "text-brand-200")}
          light
        />
        <div className="mt-10">
          <ProcessSteps steps={glanzwerkPrinciple} light />
        </div>
      </Section>

      {/* 6. Vertrauen/Garantie: vier Karten, sitewide wiederverwendet */}
      <Section background="white">
        <SectionHeading
          eyebrow="Vertrauen"
          title={renderGlanzwerkHeading(heading.sectionHeadings[6])}
          subtitle="Keine unbelegten Garantien – vier konkrete Zusagen, die wir im Alltag tatsächlich einhalten."
        />
        <ExpectationCards />
      </Section>

      <Section background="warm">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">Nachhaltigkeit</p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            Bei der {service.shortTitle} setzen wir auf hochwertige, materialschonende Reinigungsmittel
            und dosieren sie nach Herstellerangabe statt pauschal maximal. Wo möglich kommt
            wiederverwendbare Mikrofasertechnik zum Einsatz, und der Reinigungsrhythmus richtet sich
            nach dem tatsächlichen Bedarf Ihres Objekts – das schont Flächen, Ressourcen und Kosten
            gleichermaßen.
          </p>
        </div>
      </Section>

      {districtCombos.length > 0 && (
        <Section background="white">
          <SectionHeading
            eyebrow="Standorte"
            title={heading.sectionHeadings[7]}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {districtCombos.map(({ district }) => (
              <Link
                key={district.slug}
                href={`/leistungen/${service.slug}/${district.slug}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500"
              >
                {service.shortTitle} {district.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            Ihr Bezirk ist nicht dabei?{" "}
            <Link href="/standorte" className="font-medium text-brand-500 hover:underline">
              Alle Berliner Bezirke ansehen
            </Link>
            .
          </p>
        </Section>
      )}

      <Section background={districtCombos.length > 0 ? "muted" : "white"}>
        <SectionHeading eyebrow="FAQ" title={heading.faqHeading ?? "Häufige Fragen"} />
        <div className="mx-auto mt-8 max-w-2xl">
          <FAQ items={service.faq} idPrefix={`service-${service.slug}`} />
        </div>
      </Section>

      {relatedServices.length > 0 && (
        <Section background={districtCombos.length > 0 ? "white" : "muted"}>
          <SectionHeading eyebrow="Weitere Leistungen" title="Das könnte Sie auch interessieren" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {relatedServices.map((related) => (
              <ServiceCard key={related.slug} service={related} />
            ))}
          </div>
        </Section>
      )}

      {!oneOffServiceSlugs.includes(service.slug) && (
        <Section background="muted">
          <CTASection
            title={heading.secondaryCtaHeading ?? "Glanzwerk 3 Monate flexibel testen"}
            subtitle={`Lernen Sie die ${service.shortTitle} im laufenden Betrieb kennen – regulär bezahlt, ohne langfristige Bindung.`}
            primaryLabel="Testphase anfragen"
            primaryHref="/3-monate-testen"
            secondaryLabel="Preis berechnen"
            secondaryHref="/preisrechner"
          />
        </Section>
      )}

      {/* 7. Abschluss-CTA mit unterem Bild vor dem Footer */}
      <Section background="white">
        {contentPhotos ? (
          <CTASection
            title={heading.ctaHeading ?? "Überzeugen Sie sich selbst"}
            subtitle={`Fordern Sie ein kostenloses Angebot für die ${service.shortTitle} an – unverbindlich und in wenigen Minuten.`}
            primaryLabel="Kostenloses Angebot anfordern"
            primaryHref="/kontakt"
            secondaryLabel="Preis berechnen"
            secondaryHref="/preisrechner"
            backgroundImage={contentPhotos.ctaUnten}
          />
        ) : (
          <CTASection
            title={heading.ctaHeading ?? `Angebot für ${service.shortTitle} anfragen`}
            subtitle="Beschreiben Sie kurz Ihr Objekt – wir melden uns mit einem individuellen Angebot."
            primaryLabel="Reinigung anfragen"
          />
        )}
      </Section>
    </>
  );
}
