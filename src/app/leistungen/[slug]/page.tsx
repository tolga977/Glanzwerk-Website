import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
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
import KitaUndSchulreinigungBerlinContent from "./KitaUndSchulreinigungBerlinContent";
import FitnessstudioreinigungBerlinContent from "./FitnessstudioreinigungBerlinContent";

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
  "kita-und-schulreinigung-berlin": KitaUndSchulreinigungBerlinContent,
  "fitnessstudioreinigung-berlin": FitnessstudioreinigungBerlinContent,
} as const;

interface Props {
  params: Promise<{ slug: string }>;
}

/** Ehrliches Arbeitsprinzip statt Fantasiebezeichnung – gilt für jede Leistung gleichermaßen. Dient zugleich als 5-Schritt-Ablauf (01–05). */
const glanzwerkPrinciple = [
  { title: "Bedarf verstehen", description: "Wir klären Fläche, Nutzung und Anforderungen Ihres Objekts, bevor wir etwas anbieten." },
  { title: "Leistungen klar festlegen", description: "Der Leistungsumfang steht vorher fest – keine versteckten Zusatzkosten im Nachhinein." },
  { title: "Sorgfältig ausführen", description: "Feste Teams arbeiten nach abgestimmtem Ablauf statt spontaner Improvisation." },
  { title: "Qualität kontrollieren", description: "Melden Sie einen Mangel innerhalb von 24 Stunden, wir bessern in der Regel kostenlos nach." },
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

          {/*
            Beide Wege liefen hier als handgebaute Links mit eigener Rundung,
            eigener Hover-Physik und ohne Druckfeedback — die Schaltflächen
            auf den zwölf Leistungsseiten sahen anders aus und reagierten
            anders als die auf jeder anderen Seite. Jetzt dieselbe Komponente
            wie überall.
          */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/kontakt" size="lg">
              Reinigung anfragen
            </Button>
            <Button href="/preisrechner" variant="outline" size="lg" className="bg-white/70 backdrop-blur-sm">
              Preis berechnen
            </Button>
          </div>
        </div>

        {/*
          Vertrauensleiste am unteren Hero-Rand.

          Die Symbole standen vorher jeweils in einem runden Plättchen mit
          Farbverlauf. Drei davon nebeneinander sind das Muster, an dem man
          eine Baukastenseite auf den ersten Blick erkennt — und das Plättchen
          trug nichts bei, was das Symbol nicht schon selbst sagt. Das Symbol
          steht jetzt frei in der Markenfarbe neben der Zeile.
        */}
        <div className="relative z-[1] border-t border-line bg-white/85 backdrop-blur-sm">
          <div className="container-page grid grid-cols-1 gap-3 py-4 sm:grid-cols-3 sm:gap-6">
            {heroTrustBar.map((point) => (
              <div key={point.label} className="flex items-center gap-3 text-sm font-medium text-brand-900">
                <span className="shrink-0 text-brand-500">{point.icon}</span>
                {point.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
        2. Auf einen Blick.

        Vorher: drei weiße Karten mit je einem Symbol in einer Kachel mit
        Farbverlauf. Die Symbole waren zyklisch vergeben — `index % 3`, also
        Uhr/Schild/Team der Reihe nach, unabhängig davon, was in der Zeile
        stand. Ein Symbol, das nichts über seinen Inhalt aussagt, ist
        Füllmaterial; drei gleich große Kästen mit Symbol und Zeile sind die
        Standardlösung, die diese Seite laut ihrem eigenen Designsystem nicht
        verwenden soll.

        Jetzt tragen die drei Aussagen sich selbst: größerer Grad, mehr Luft,
        getrennt durch Haarlinien statt durch Kartenränder. Struktur aus
        Linien statt aus Kästen ist die durchgehende Sprache dieser Website —
        Spaltenlinien im Bezirksregister, Trennlinien im Beweisband, die
        Grundlinie im Ablauf. Dieser Abschnitt folgt ihr jetzt auch.
      */}
      <Section background="tint">
        <SectionHeading eyebrow="Auf einen Blick" title={heading.sectionHeadings[0]} />
        <ul className="mt-10 grid divide-y divide-line-strong border-y border-line-strong sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {service.bullets.map((bullet, index) => (
            <FadeIn
              key={bullet}
              as="li"
              delay={index * 70}
              className="py-7 sm:px-8 sm:py-9 sm:first:pl-0 sm:last:pr-0"
            >
              {/*
                Inter, nicht Fraunces: die Serife bleibt laut Designsystem
                den Überschriften vorbehalten. Gewicht und Grad tragen die
                Betonung.
              */}
              <p className="text-base font-medium leading-snug text-brand-900 sm:text-lg">{bullet}</p>
            </FadeIn>
          ))}
        </ul>
      </Section>

      {/*
        3. Die Ausgangslage im Objekt.

        Vorher steckte dieser Abschnitt in einem abgerundeten Kasten mit
        einem 6 px breiten gelben Balken an der linken Kante und einem
        Warndreieck im Symbolplättchen — also in der Aufmachung einer
        Systemmeldung. Das ist eine Verwechslung der Gattung: hier steht
        kein Fehler, sondern der Sachstand im Objekt des Kunden, bevor die
        Lösung beschrieben wird. Ein Warndreieck macht daraus eine Störung.

        Jetzt trägt der Abschnitt seine eigene Fläche, statt einen Kasten auf
        eine weiße zu legen, und die Punkte stehen als Aufzählung mit
        Trennlinien. Überschrift links, Sachverhalt rechts — dieselbe
        zweispaltige Anordnung wie in den redaktionellen Abschnitten.
      */}
      <Section background="warm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          <h2 className="font-display display-lg text-2xl font-medium text-brand-900 sm:text-3xl">
            {heading.sectionHeadings[1]}
          </h2>
          <ul className="divide-y divide-line">
            {service.challenges.map((challenge) => (
              <li
                key={challenge}
                className="measure py-4 text-base leading-relaxed text-ink-soft first:pt-0 last:pb-0"
              >
                {challenge}
              </li>
            ))}
          </ul>
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
              className={`shadow-deep ${imageLeftOnDesktop ? "lg:order-1" : ""}`}
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
                  className="rounded-control border border-line bg-brand-50/60 px-4 py-2.5 text-sm font-medium text-brand-900"
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

      {/*
        Ein einzelner Absatz stand hier in einer weißen Karte mit Rand und
        Schatten auf warmer Fläche. Eine Karte um genau einen Absatz ist der
        Behälter, den man nimmt, wenn man keine Entscheidung trifft: sie
        trennt nichts, gruppiert nichts und hebt nichts hervor, was der
        Absatz nicht selbst hergibt. Ohne sie steht derselbe Text ruhiger und
        die warme Fläche bleibt als Fläche erkennbar.
      */}
      <Section background="warm" spacing="compact">
        <div className="mx-auto max-w-3xl border-l border-line-strong pl-6 sm:pl-8">
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
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                {service.shortTitle} {district.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            Ihr Bezirk ist nicht dabei?{" "}
            <Link href="/standorte" className="font-medium text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
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
