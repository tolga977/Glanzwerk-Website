import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Section, { SectionHeading } from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import TrustBadges from "@/components/ui/TrustBadges";
import ProcessSteps from "@/components/ui/ProcessSteps";
import CTASection from "@/components/ui/CTASection";
import FAQ from "@/components/ui/FAQ";
import Reviews from "@/components/ui/Reviews";
import FadeIn from "@/components/ui/FadeIn";
import HeroPhoto from "@/components/home/HeroPhoto";
import { getServiceBySlug } from "@/data/services";
import { districts } from "@/data/districts";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Gebäudereinigung Berlin für Unternehmen",
  description: siteConfig.description,
  path: "/",
});

const heroTrustHints = [
  "Fester Ansprechpartner",
  "Ganz Berlin",
  "Flexible Termine",
];

const homepageServiceSlugs = [
  "gebaeudereinigung-berlin",
  "bueroreinigung-berlin",
  "praxisreinigung-berlin",
  "unterhaltsreinigung-berlin",
  "treppenhausreinigung-berlin",
  "grundreinigung-berlin",
  "kita-und-schulreinigung-berlin",
] as const;

const whyGlanzwerk = [
  {
    title: "Ein Ansprechpartner, der Ihr Objekt kennt",
    description:
      "Statt wechselnder Reinigungskräfte über ein Callcenter arbeiten Sie mit einer festen Kontaktperson zusammen.",
  },
  {
    title: "Klare, nachvollziehbare Angebote",
    description:
      "Sie erhalten ein Angebot, das auf Ihr Objekt zugeschnitten ist – ohne versteckte Zusatzkosten.",
  },
  {
    title: "Reinigungskonzepte statt Standardpaketen",
    description:
      "Reinigungsintervalle und Leistungsumfang richten sich nach Ihrem tatsächlichen Bedarf.",
  },
  {
    title: "Erfahrung mit unterschiedlichen Gewerbeobjekten",
    description:
      "Von Büros über Praxen bis zu Kitas kennen wir die jeweiligen Anforderungen an Hygiene und Ablauf.",
  },
];

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
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white">
        <div className="container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-24">
          <div>
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              <span className="glanz-divider !w-8" />
              Gebäudereinigung für Unternehmen in Berlin
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
              Gebäudereinigung, die Ihrem Berliner Unternehmen gerecht wird
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Als inhabergeführtes Unternehmen kümmern wir uns persönlich um
              die Reinigung Ihrer Büros, Praxen, Kanzleien und Gewerbeobjekte
              in Berlin – zuverlässig, diskret und mit einem festen
              Ansprechpartner, der Ihr Objekt kennt.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/preisrechner" size="lg">
                Preis berechnen
              </Button>
              <Button href="/kontakt" variant="outline" size="lg">
                Kontakt aufnehmen
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100 pt-6">
              {heroTrustHints.map((hint) => (
                <li key={hint} className="flex items-center gap-1.5 text-sm text-ink-soft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-brand-500">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {hint}
                </li>
              ))}
            </ul>
          </div>

          <HeroPhoto />
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

      {/* 4. Warum Glanzwerk */}
      <Section background="white">
        <SectionHeading eyebrow="Warum Glanzwerk" title="Was uns von anderen Anbietern unterscheidet" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {whyGlanzwerk.map((item, index) => (
            <FadeIn key={item.title} delay={index * 90} className="flex gap-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
              <div>
                <p className="text-base font-semibold text-brand-900">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
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

      {/* 8. Bewertungen */}
      <Section background="white">
        <SectionHeading eyebrow="Bewertungen" title="Was Kunden über uns sagen" />
        <FadeIn className="mt-10">
          <Reviews reviews={[]} />
        </FadeIn>
      </Section>

      {/* 9. FAQ */}
      <Section background="muted">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={homeFaqItems} />
        </FadeIn>
      </Section>

      {/* 10. Abschluss-CTA */}
      <Section background="white">
        <FadeIn className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 px-6 py-14 text-center shadow-2xl shadow-brand-950/30 sm:px-12 sm:py-16">
          <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
            Bereit für Ihre Gebäudereinigung?
          </h2>
          <div className="glanz-divider mx-auto mt-4 max-w-[120px]" />
          <p className="mx-auto mt-4 max-w-xl text-brand-200">
            Wählen Sie den für Sie passenden Weg – wir melden uns zeitnah
            zurück.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/kontakt" variant="primary" size="lg">
              Angebot anfragen
            </Button>
            <Button href="/preisrechner" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-900">
              Preis berechnen
            </Button>
            <Button href={siteConfig.phoneHref} variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Kontakt aufnehmen: {siteConfig.phone}
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
