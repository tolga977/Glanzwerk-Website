import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Section, { SectionHeading } from "@/components/ui/Section";
import EditorialIntro from "@/components/ui/EditorialIntro";
import ServiceCard from "@/components/ui/ServiceCard";
import TrustBadges from "@/components/ui/TrustBadges";
import ProcessSteps from "@/components/ui/ProcessSteps";
import CTASection from "@/components/ui/CTASection";
import ExpectationCards from "@/components/ui/ExpectationCards";
import ArticleCard from "@/components/ui/ArticleCard";
import BrandPhoto from "@/components/ui/BrandPhoto";
import FAQ from "@/components/ui/FAQ";
import FadeIn from "@/components/ui/FadeIn";
import GlanzMark from "@/components/ui/GlanzMark";
import HeroPhoto from "@/components/home/HeroPhoto";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { articles } from "@/data/articles";
import { photos } from "@/data/photos";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Gebäudereinigung Berlin für Unternehmen",
  description: siteConfig.description,
  path: "/",
});

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
              Professionelle <span className="text-brand-300">Gebäudereinigung</span> in Berlin
              für Unternehmen
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Wir reinigen Büros, Praxen, Kanzleien und weitere Gewerbeobjekte
              in Berlin – mit persönlichem Ansprechpartner, klaren Abläufen
              und Terminen, die sich nach Ihrem Betrieb richten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/preisrechner" size="lg">
                Preis kostenlos berechnen
              </Button>
              <Button
                href="/3-monate-testen"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-900"
              >
                3 Monate flexibel testen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fakten-Leiste: eine ruhige Zeile statt konkurrierender Schriftgrößen. */}
      <section className="border-y border-white/10 bg-brand-900 py-4">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center sm:justify-center">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-200">
            {districts.length} Berliner Bezirke
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-200">
            {services.length} Reinigungsleistungen
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-200">
            Betriebshaftpflichtversichert
          </span>
        </div>
      </section>

      {/* 2. Vertrauensbereich */}
      <Section background="white">
        <EditorialIntro eyebrow="Darauf können Sie sich verlassen" title="Verlässliche Gebäudereinigung für Gewerbekunden">
          <FadeIn>
            <TrustBadges />
          </FadeIn>
        </EditorialIntro>
      </Section>

      {/* 3. Leistungen */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Leistungen"
          title={
            <>
              Reinigungsleistungen aus <span className="text-brand-700">einer Hand</span>
            </>
          }
          subtitle="Von der laufenden Unterhaltsreinigung bis zur einmaligen Grundreinigung – abgestimmt auf Ihr Objekt."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </FadeIn>
        <div className="mt-8">
          <Button href="/leistungen" variant="ghost">
            Alle Leistungen im Überblick
          </Button>
        </div>
      </Section>

      {/* 4. Das dürfen Sie von Glanzwerk erwarten */}
      <Section background="white">
        <SectionHeading
          eyebrow="Versprechen"
          title={
            <>
              Das dürfen Sie von <span className="text-brand-600">Glanzwerk</span> erwarten
            </>
          }
          subtitle="Keine unbelegten Garantien – vier konkrete Zusagen, die wir im Alltag tatsächlich einhalten."
        />
        <ExpectationCards />
      </Section>

      {/* 5. Ablauf — kräftiger Blauton als visueller Anker in der Seitenmitte */}
      <Section background="brand" decor>
        <SectionHeading
          eyebrow="Ablauf"
          title={
            <>
              So <span className="text-brand-200">einfach</span> kommen Sie zu Ihrer Reinigung
            </>
          }
          light
        />
        <FadeIn className="mt-10">
          <ProcessSteps light />
        </FadeIn>
      </Section>

      {/* 6. Umwelt-Teaser */}
      <Section background="warm">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <BrandPhoto photo={photos.dosingLiquid} className="shadow-2xl shadow-brand-950/20 lg:order-2" />
          <div className="lg:order-1">
            <SectionHeading
              eyebrow="Umwelt & Verantwortung"
              title="Bewusster Ressourceneinsatz statt Chemie-Maximum"
              subtitle="Bedarfsgerechte Dosierung, passende Profimittel statt Universallösung und Mülltrennung, wo im Objekt möglich – nachvollziehbare Handgriffe statt Siegel."
            />
            <div className="mt-6">
              <Button href="/umwelt-verantwortung" variant="ghost">
                Alle Grundsätze ansehen
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Glanzwerk Wissen */}
      <Section background="tint" decor>
        <SectionHeading
          eyebrow="Glanzwerk Wissen"
          title="Praxiswissen rund um Reinigung und Hygiene"
          subtitle="Verständliche Antworten auf Fragen, die uns Gewerbekunden häufig stellen."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </FadeIn>
        <div className="mt-8">
          <Button href="/wissen" variant="ghost">
            Alle Artikel im Glanzwerk Wissen
          </Button>
        </div>
      </Section>

      {/* 8. 3 Monate flexibel testen */}
      <Section background="muted">
        <CTASection
          title="Glanzwerk 3 Monate flexibel testen"
          subtitle="Reguläre Reinigung zu vereinbarten Konditionen, ohne dass Sie sich vorab langfristig binden – keine automatische Verlängerung danach."
          primaryLabel="Testphase anfragen"
          primaryHref="/3-monate-testen"
          secondaryLabel="Preis berechnen"
          secondaryHref="/preisrechner"
        />
      </Section>

      {/* 9. FAQ */}
      <Section background="white" id="faq">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" align="center" />
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <FAQ items={homeFaqItems} />
        </FadeIn>
      </Section>

      {/* 10. Abschluss-CTA mit Bildhintergrund */}
      <Section background="muted">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgb(11 30 61 / 0.93), rgb(11 30 61 / 0.9)), url(${photos.buildingFacade.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <FadeIn className="px-6 py-14 text-center shadow-2xl shadow-brand-950/30 sm:px-12 sm:py-16">
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
        </div>
      </Section>
    </>
  );
}
