import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import ArticleCard from "@/components/ui/ArticleCard";
import BrandPhoto from "@/components/ui/BrandPhoto";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { articles } from "@/data/articles";
import { buildMetadata } from "@/lib/metadata";

const wissenHeroPhoto = {
  src: "/images/wissen/hero-wissen.webp",
  alt: "Reinigungsmittel und Reinigungstuch an einem gepflegten Arbeitsplatz",
};

const description =
  "Praxisnahes Wissen rund um Gebäudereinigung, Hygiene und Kosten – verständlich erklärt von Glanzwerk Reinigungsservice Berlin.";

export const metadata: Metadata = buildMetadata({
  title: "Glanzwerk Wissen",
  description,
  path: "/wissen",
});

export default function WissenPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Glanzwerk Wissen" }]} />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              Glanzwerk Wissen
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
              Praxiswissen rund um <span className="text-brand-600">Reinigung und Hygiene</span> in
              Berlin
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Verständliche Antworten auf Fragen, die uns Gewerbekunden
              häufig stellen – ohne Werbefloskeln, dafür mit echtem Nutzen
              für Büros, Praxen, Kanzleien und Unternehmen in Berlin.
            </p>
          </div>
          <BrandPhoto photo={wissenHeroPhoto} priority className="shadow-2xl shadow-brand-950/20" />
        </div>
      </Section>

      <Section background="tint" decor>
        <FadeIn className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </FadeIn>
      </Section>

      <Section background="muted">
        <CTASection />
      </Section>
    </>
  );
}
