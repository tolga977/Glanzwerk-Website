import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Section, { SectionHeading } from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import TrustBadges from "@/components/ui/TrustBadges";
import ProcessSteps from "@/components/ui/ProcessSteps";
import CTASection from "@/components/ui/CTASection";
import FAQ from "@/components/ui/FAQ";
import FadeIn from "@/components/ui/FadeIn";
import GlanzMark from "@/components/ui/GlanzMark";
import HeroPhoto from "@/components/home/HeroPhoto";
import { getServiceBySlug, services } from "@/data/services";
import { districts } from "@/data/districts";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Gebäudereinigung Berlin für Unternehmen",
  description: siteConfig.description,
  path: "/",
});

const homepageServiceSlugs = [
  "gebaeudereinigung-berlin",
  "bueroreinigung-berlin",
  "praxisreinigung-berlin",
  "unterhaltsreinigung-berlin",
  "treppenhausreinigung-berlin",
  "grundreinigung-berlin",
  "kita-und-schulreinigung-berlin",
] as const;

const homeFaqItems = [
  {
    question: "Welche Reinigungsleistungen bietet Glanzwerk in Berlin an?",
    answer:
      "Glanzwerk bietet unter anderem Gebäude-, Büro-, Praxis-, Unterhalts-, Treppenhaus-, Fenster-, Glas- und Grundreinigung sowie Reinigung für Kitas, Schulen, Kanzleien, Fitnessstudios und Autohäuser in Berlin an.",
    relatedLink: { label: "Alle Leistungen im Überblick", href: "/leistungen" },
  },
  {
    question: "Für welche Unternehmen eignet sich der Service?",
    answer:
      "Unser Service richtet sich an gewerbliche Kunden – von Büros und Praxen über Kanzleien und Hausverwaltungen bis hin zu Kitas, Schulen, Fitnessstudios und Autohäusern.",
  },
  {
    question: "In welchen Berliner Bezirken ist Glanzwerk tätig?",
    answer: "Wir sind in allen zwölf Berliner Bezirken tätig, von Mitte bis Reinickendorf.",
    relatedLink: { label: "Alle Standorte ansehen", href: "/standorte" },
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer:
      "Der Preis richtet sich nach Fläche, Reinigungshäufigkeit und gewünschten Zusatzleistungen. Mit unserem Preisrechner erhalten Sie eine erste, unverbindliche Richtpreis-Schätzung – das endgültige Angebot erstellen wir nach Besprechung Ihres Objekts.",
    relatedLink: { label: "Zum Preisrechner", href: "/preisrechner" },
  },
  {
    question: "Sind auch Reinigungen außerhalb regulärer Geschäftszeiten möglich?",
    answer:
      "Ja, wir stimmen die Reinigungszeiten auf Ihren Betriebsablauf ab – auch früh morgens, abends oder am Wochenende.",
  },
  {
    question: "Wie kann ein Angebot angefragt werden?",
    answer:
      "Über unseren Preisrechner, das Kontaktformular oder telefonisch – wir melden uns zeitnah mit einem individuellen Angebot.",
    relatedLink: { label: "Kontakt aufnehmen", href: "/kontakt" },
  },
];

export default function HomePage() {
  const homepageServices = homepageServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const fensterreinigung = getServiceBySlug("fensterreinigung-berlin")!;

  return (
    <>
      {/* 1. Hero — volltonige, langsam bewegte Hintergrundfläche (Ken-Burns-
          Zoom statt Video), als moderne Weiterentwicklung des bisherigen
          Glanzwerk-Hero-Konzepts mit Hintergrundvideo. */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <HeroPhoto />
        <div className="container-page relative z-10 py-24 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              Gebäudereinigung für Unternehmen in Berlin
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Professionelle Gebäudereinigung in Berlin für Unternehmen
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Wir reinigen Büros, Praxen, Kanzleien und weitere Gewerbeobjekte
              in Berlin – mit persönlichem Ansprechpartner, klaren Abläufen
              und Terminen, die sich nach Ihrem Betrieb richten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/preisrechner" size="lg">
                Preis berechnen
              </Button>
              <Button
                href="/kontakt"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-900"
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="relative overflow-hidden bg-brand-900 py-10">
        <GlanzMark className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 opacity-[0.12] sm:h-56 sm:w-56" />
        <div className="container-page relative">
          <dl className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4 sm:text-left">
            <div>
              <dt className="font-display text-3xl font-medium text-white sm:text-4xl">{districts.length}</dt>
              <dd className="mt-1 text-sm text-brand-200">Berliner Bezirke im Einsatzgebiet</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-medium text-white sm:text-4xl">{services.length}</dt>
              <dd className="mt-1 text-sm text-brand-200">Reinigungsleistungen aus einer Hand</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-medium text-white sm:text-4xl">5 Mio. €</dt>
              <dd className="mt-1 text-sm text-brand-200">Betriebshaftpflicht (Allianz)</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-medium text-white sm:text-4xl">1</dt>
              <dd className="mt-1 text-sm text-brand-200">Fester Ansprechpartner pro Kunde</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 2. Vertrauensbereich */}
      <Section background="white">
        <SectionHeading
          eyebrow="Darauf können Sie sich verlassen"
          title="Verlässliche Gebäudereinigung für Gewerbekunden"
        />
        <FadeIn className="mt-10">
          <TrustBadges />
        </FadeIn>
      </Section>

      {/* 3. Leistungsübersicht */}
      <Section background="muted">
        <SectionHeading
          eyebrow="Leistungen"
          title="Reinigungsleistungen aus einer Hand"
          subtitle="Von der laufenden Unterhaltsreinigung bis zur einmaligen Grundreinigung – abgestimmt auf Ihr Objekt."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homepageServices.slice(0, 5).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
          <ServiceCard
            service={fensterreinigung}
            titleOverride="Fenster- und Glasreinigung"
            summaryOverride="Streifenfreie Reinigung von Fenstern, Glasfassaden und Vitrinen innen und außen."
            ctaLabelOverride="Zur Fenster- und Glasreinigung"
          />
          {homepageServices.slice(5).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </FadeIn>
        <div className="mt-8">
          <Button href="/leistungen" variant="ghost">
            Alle Leistungen im Überblick
          </Button>
        </div>
      </Section>

      {/* 5. Ablauf */}
      <Section background="muted">
        <SectionHeading eyebrow="Ablauf" title="So einfach kommen Sie zu Ihrer Reinigung" />
        <FadeIn className="mt-10">
          <ProcessSteps />
        </FadeIn>
      </Section>

      {/* 6. Preisrechner-Teaser */}
      <Section background="white">
        <CTASection
          title="Was kostet Ihre Reinigung?"
          subtitle="Nutzen Sie unseren Preisrechner für eine erste, unverbindliche Einschätzung – in wenigen Minuten."
          primaryLabel="Preis berechnen"
          primaryHref="/preisrechner"
        />
      </Section>

      {/* 7. Standorte */}
      <Section background="muted">
        <SectionHeading
          eyebrow="Standorte"
          title="In allen Berliner Bezirken im Einsatz"
          subtitle="Wählen Sie Ihren Bezirk für Ansprechpartner und Leistungen vor Ort."
        />
        <FadeIn as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {districts.map((district) => (
            <li key={district.slug}>
              <Link
                href={`/standorte/${district.slug}`}
                className="flex min-h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-brand-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-500 hover:shadow-md"
              >
                {district.name}
              </Link>
            </li>
          ))}
        </FadeIn>
        <div className="mt-8">
          <Button href="/standorte" variant="ghost">
            Alle Standorte im Detail ansehen
          </Button>
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section background="muted" id="faq">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={homeFaqItems} />
        </FadeIn>
      </Section>

      {/* 10. Abschluss-CTA */}
      <Section background="white">
        <FadeIn className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 px-6 py-14 text-center shadow-2xl shadow-brand-950/30 sm:px-12 sm:py-16">
          <GlanzMark className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 opacity-30 sm:h-32 sm:w-32" />
          <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
            Bereit für Ihre Gebäudereinigung?
          </h2>
          <div className="glanz-divider mx-auto mt-4 max-w-[120px]" />
          <p className="mx-auto mt-4 max-w-xl text-brand-200">
            Wählen Sie den für Sie passenden Weg – wir melden uns zeitnah
            zurück.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/preisrechner" variant="primary" size="lg">
              Preis berechnen
            </Button>
            <Button href="/kontakt" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-900">
              Angebot anfragen
            </Button>
          </div>
          <a href={siteConfig.phoneHref} className="mt-5 inline-block text-sm text-brand-200 hover:text-white">
            Oder rufen Sie uns an: {siteConfig.phone}
          </a>
        </FadeIn>
      </Section>
    </>
  );
}
