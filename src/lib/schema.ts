import { siteConfig } from "@/data/site";
import { owner } from "@/data/owner";
import { googleBusiness } from "@/data/googleBusiness";

/**
 * Centralized JSON-LD builders, sourced from `siteConfig`.
 */

/**
 * Geokoordinaten des Firmensitzes (Joachim-Gottschalk-Weg 12, 12353 Berlin).
 * Per Adress-Lookup ermittelt (OpenStreetMap/Nominatim, hausnummerngenau),
 * nicht geschätzt — Grundlage für `geo` in professionalServiceSchema().
 */
const OFFICE_GEO = {
  latitude: 52.4224132,
  longitude: 13.4763628,
} as const;

/**
 * Geschäftszeiten Mo–Sa 08:00–18:00, vom Nutzer bestätigt (nicht erfunden).
 * Grundlage für `openingHoursSpecification` in professionalServiceSchema().
 */
const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "08:00",
  closes: "18:00",
} as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/glanzwerk-logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.zip,
      addressLocality: siteConfig.address.city,
      addressCountry: "DE",
    },
    // Kein Bild — owner.photo ist noch null (src/data/owner.ts). Sobald ein
    // echtes Porträt vorliegt, hier analog zu Organization.logo ergänzen.
    founder: {
      "@type": "Person",
      name: owner.name,
    },
  };
}

interface ProfessionalServiceSchemaOptions {
  /**
   * Aus `getGoogleRating()` — nie erfunden. Wird weggelassen, wenn kein
   * Aufrufer sie übergibt, statt hier einen eigenen Fallback zu ziehen: die
   * Zahl soll immer exakt der sein, die auch sichtbar auf der Seite steht.
   *
   * Google verbietet Review-Rich-Results auf der eigenen Unternehmensseite
   * ("self-serving reviews") – kein SERP-Sternchen zu erwarten. Der Wert
   * liegt in Entity-Grounding für KI-Suchsysteme (GEO), nicht im Snippet.
   */
  aggregateRating?: { ratingValue: number; reviewCount: number };
}

/** More specific than the sitewide Organization schema, without inventing ratings. Used on the homepage, Über-uns- und Bewertungen-Seite. */
export function professionalServiceSchema({
  aggregateRating,
}: ProfessionalServiceSchemaOptions = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/brand/glanzwerk-logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.zip,
      addressLocality: siteConfig.address.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OFFICE_GEO.latitude,
      longitude: OFFICE_GEO.longitude,
    },
    openingHoursSpecification: [OPENING_HOURS],
    sameAs: [googleBusiness.profileUrl],
    areaServed: {
      "@type": "City",
      name: "Berlin",
    },
    ...(aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
      },
    }),
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
  /** Absoluter Pfad des Artikelbilds, z. B. `article.image.src` aus `src/data/articles.ts`. */
  image?: string;
}

export function articleSchema({ headline, description, path, image }: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${siteConfig.url}${path}`,
    ...(image && { image: `${siteConfig.url}${image}` }),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/glanzwerk-logo.png`,
      },
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
