import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import EditorialIntro from "@/components/ui/EditorialIntro";
import ServiceCard from "@/components/ui/ServiceCard";
import BrandPhoto from "@/components/ui/BrandPhoto";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { services, getServiceBySlug, getRelatedServices } from "@/data/services";
import { getCombosForService } from "@/data/combos";
import { getDistrictBySlug } from "@/data/districts";
import { servicePhotos } from "@/data/servicePhotos";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Ehrliches Arbeitsprinzip statt Fantasiebezeichnung – gilt für jede Leistung gleichermaßen. */
const glanzwerkPrinciple = [
  { title: "Bedarf verstehen", description: "Wir klären Fläche, Nutzung und Anforderungen Ihres Objekts, bevor wir etwas anbieten." },
  { title: "Leistungen klar festlegen", description: "Der Leistungsumfang steht vorher fest – keine versteckten Zusatzkosten im Nachhinein." },
  { title: "Sorgfältig ausführen", description: "Feste Teams arbeiten nach abgestimmtem Ablauf statt spontaner Improvisation." },
  { title: "Qualität kontrollieren", description: "Mängel melden Sie uns direkt – wir bessern in der Regel innerhalb von 24 Stunden nach." },
  { title: "Persönlich abstimmen", description: "Änderungen am Bedarf besprechen Sie mit Ihrem festen Ansprechpartner, nicht mit wechselndem Personal." },
];

/** Einmalige Sonderleistungen ohne wiederkehrenden Rhythmus – für diese ist der 3-Monate-Test nicht relevant. */
const oneOffServiceSlugs = ["grundreinigung-berlin"];

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/leistungen/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = getRelatedServices(service);
  const photo = servicePhotos[service.slug];
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

      <Section background="white" className="pt-12">
        <div className={photo ? "grid gap-10 lg:grid-cols-2 lg:items-center" : ""}>
          <div>
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{service.intro}</p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-2xl border border-black/[0.06] bg-white p-5 text-sm font-medium text-brand-900 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
                >
                  {bullet}
                </li>
              ))}
            </ul>

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
                Kontakt aufnehmen
              </Link>
            </div>
          </div>

          {photo && (
            <BrandPhoto
              photo={photo}
              aspect="aspect-[4/3]"
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="shadow-2xl shadow-brand-950/20"
            />
          )}
        </div>
      </Section>

      <Section background="muted">
        <EditorialIntro eyebrow="Leistungsbeschreibung" title={`So läuft die ${service.shortTitle} ab`}>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
            {service.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </EditorialIntro>
      </Section>

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-brand-900 sm:text-3xl">
              Typische Reinigungsaufgaben
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
              Für wen eignet sich diese Leistung
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

      <Section background="muted">
        <SectionHeading eyebrow="Ablauf" title="Ablauf der Zusammenarbeit" />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Section>

      <Section background="white">
        <SectionHeading eyebrow="Unser Prinzip" title="Das Glanzwerk-Prinzip" />
        <div className="mt-10">
          <ProcessSteps steps={glanzwerkPrinciple} />
        </div>
      </Section>

      <Section background="muted">
        <CTASection
          title={`Was kostet die ${service.shortTitle} für Ihr Objekt?`}
          subtitle="Nutzen Sie unseren Preisrechner für eine erste, unverbindliche Einschätzung – in wenigen Minuten."
          primaryLabel="Preis berechnen"
          primaryHref="/preisrechner"
          backgroundImageUrl={photo?.src}
        />
      </Section>

      <Section background="muted">
        <EditorialIntro eyebrow="Vorteile" title={`Warum Glanzwerk für die ${service.shortTitle}`}>
          <FadeIn as="ul" className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium text-brand-900">{benefit}</span>
              </li>
            ))}
          </FadeIn>
        </EditorialIntro>
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
        <Section background="muted">
          <SectionHeading
            eyebrow="Standorte"
            title={`${service.shortTitle} in ausgewählten Berliner Bezirken`}
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

      <Section background={districtCombos.length > 0 ? "white" : "muted"}>
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />
        <div className="mx-auto mt-8 max-w-2xl">
          <FAQ items={service.faq} idPrefix={`service-${service.slug}`} />
        </div>
      </Section>

      {relatedServices.length > 0 && (
        <Section background={districtCombos.length > 0 ? "muted" : "white"}>
          <SectionHeading eyebrow="Weitere Leistungen" title="Das könnte Sie auch interessieren" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {relatedServices.map((related) => (
              <ServiceCard key={related.slug} service={related} />
            ))}
          </div>
        </Section>
      )}

      {!oneOffServiceSlugs.includes(service.slug) && (
        <Section background="white">
          <CTASection
            title="Glanzwerk 3 Monate flexibel testen"
            subtitle={`Lernen Sie die ${service.shortTitle} im laufenden Betrieb kennen – regulär bezahlt, ohne langfristige Bindung.`}
            primaryLabel="Testphase anfragen"
            primaryHref="/3-monate-testen"
            secondaryLabel="Preis berechnen"
            secondaryHref="/preisrechner"
          />
        </Section>
      )}

      <Section background="muted">
        <CTASection
          title={`Angebot für ${service.shortTitle} anfragen`}
          subtitle="Beschreiben Sie kurz Ihr Objekt – wir melden uns mit einem individuellen Angebot."
          primaryLabel="Reinigung anfragen"
        />
      </Section>
    </>
  );
}
