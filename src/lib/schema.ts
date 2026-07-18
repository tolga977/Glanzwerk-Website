import { siteConfig } from "@/data/site";

/**
 * Centralized JSON-LD builders, sourced from `siteConfig`. Deliberately no
 * LocalBusiness/AggregateRating — no walk-in storefront, no real reviews yet.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.zip,
      addressLocality: siteConfig.address.city,
      addressCountry: "DE",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "de-DE",
  };
}

interface ServiceSchemaOptions {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}

export function serviceSchema({ name, description, path, areaServed = "Berlin" }: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${siteConfig.url}${path}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
    },
    areaServed: {
      "@type": "City",
      name: areaServed,
    },
  };
}

interface ArticleSchemaOptions {
  headline: string;
  description: string;
  path: string;
}

export function articleSchema({ headline, description, path }: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${siteConfig.url}${path}`,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

interface WebPageSchemaOptions {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "ContactPage" | "AboutPage";
}

export function webPageSchema({ name, description, path, type = "WebPage" }: WebPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
