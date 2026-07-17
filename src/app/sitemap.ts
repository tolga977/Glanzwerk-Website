import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { combos } from "@/data/combos";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/leistungen"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/standorte"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/preisrechner"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/kontakt"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/ueber-uns"), changeFrequency: "yearly", priority: 0.5 },
    { url: url("/bewertungen"), changeFrequency: "monthly", priority: 0.4 },
    { url: url("/wissen"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/reinigungsfirma-berlin"), changeFrequency: "yearly", priority: 0.6 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: url(`/wissen/${article.slug}`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: url(`/leistungen/${service.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const districtPages: MetadataRoute.Sitemap = districts.map((district) => ({
    url: url(`/standorte/${district.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const ortsteilPages: MetadataRoute.Sitemap = districts.flatMap((district) =>
    district.ortsteile.map((ortsteil) => ({
      url: url(`/standorte/${district.slug}/${ortsteil.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  const comboPages: MetadataRoute.Sitemap = combos.map((combo) => ({
    url: url(`/leistungen/${combo.serviceSlug}/${combo.districtSlug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...districtPages,
    ...ortsteilPages,
    ...comboPages,
    ...articlePages,
  ];
}
