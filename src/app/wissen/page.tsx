import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ArticleCard from "@/components/ui/ArticleCard";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { articles } from "@/data/articles";
import { buildMetadata } from "@/lib/metadata";

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
        <SectionHeading
          as="h1"
          eyebrow="Glanzwerk Wissen"
          title="Praxiswissen rund um Reinigung und Hygiene in Berlin"
          subtitle="Verständliche Antworten auf Fragen, die uns Gewerbekunden häufig stellen – ohne Werbefloskeln, dafür mit echtem Nutzen."
        />
        <FadeIn className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
