import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import ArticleCard from "@/components/ui/ArticleCard";
import CTASection from "@/components/ui/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { articles, getArticleBySlug } from "@/data/articles";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.metaDescription,
    path: `/wissen/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedServices = article.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const moreArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Glanzwerk Wissen", href: "/wissen" },
          { label: article.title },
        ]}
      />
      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.metaDescription,
          path: `/wissen/${article.slug}`,
        })}
      />

      <Section background="white" className="pt-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-ink-soft">{article.intro}</p>
        </div>
      </Section>

      <Section background="muted">
        <div className="max-w-3xl space-y-10">
          {article.sections.map((section, index) => (
            <FadeIn key={section.heading} delay={Math.min(index * 60, 180)}>
              <h2 className="font-display text-xl font-medium text-brand-900 sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-soft">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {relatedServices.length > 0 && (
        <Section background="white">
          <h2 className="text-2xl font-display font-medium tracking-tight text-brand-900">
            Passende Leistungen
          </h2>
          <FadeIn className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </FadeIn>
        </Section>
      )}

      {moreArticles.length > 0 && (
        <Section background="muted">
          <h2 className="text-2xl font-display font-medium tracking-tight text-brand-900">
            Weitere Artikel
          </h2>
          <FadeIn className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </FadeIn>
        </Section>
      )}

      <Section background="white">
        <CTASection
          title="Fragen zu Ihrem Objekt?"
          subtitle="Wir beraten Sie unverbindlich und erstellen ein individuelles Angebot."
        />
      </Section>
    </>
  );
}
