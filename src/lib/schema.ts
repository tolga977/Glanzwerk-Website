import { siteConfig } from "@/data/site";
import { owner } from "@/data/owner";
import { googleBusiness } from "@/data/googleBusiness";

/**
 * Centralized JSON-LD builders, sourced from `siteConfig`.
 *
 * ── Eine Entity, mehrere Bausteine, eine @id ─────────────────────────────
 * Glanzwerk erscheint an unterschiedlichen Stellen mit unterschiedlicher
 * Ausführlichkeit: als schlichte `Organization` sitzt es global in jedem
 * Seitenkopf (`layout.tsx`), als ausführlichere `ProfessionalService` mit
 * Geokoordinaten, Öffnungszeiten und Bewertung nur auf Startseite, Über-uns
 * und Bewertungen. Beides beschreibt dasselbe reale Unternehmen — deshalb
 * tragen beide dieselbe `@id` (`ORGANIZATION_ID`). Suchmaschinen führen
 * Knoten mit identischer `@id` zu einer Entity zusammen, statt zwei
 * unabhängige Firmen zu vermuten. Es entsteht dadurch keine neue Tatsache:
 * beide Bausteine bestanden vorher schon, nur ohne die Klammer, die sie als
 * dieselbe Entity kenntlich macht.
 *
 * Aus demselben Grund tragen `Service.provider` und `Article.publisher`
 * nur noch eine `@id`-Referenz statt eines eigenen, erneut ausgeschriebenen
 * Organization-Objekts — pro Leistungs-/Bezirks-/Wissensseite eine weitere,
 * für Suchmaschinen nicht von der Haupt-Entity unterscheidbare Kopie der
 * Firma zu erzeugen, wäre die eigentliche Duplikation gewesen.
 */

/**
 * Stabile, seitenunabhängige Kennung der Glanzwerk-Unternehmensentity.
 *
 * Das Fragment `#organization` ist reine Konvention (verbreitet u. a. durch
 * Yoast SEOs Schema-Graph) und trägt keine eigene Bedeutung für Google —
 * entscheidend ist nur, dass exakt dieser eine String überall identisch
 * wiederverwendet wird, nie neu zusammengesetzt.
 */
export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

/** Stabile Kennung der WebSite-Entity, nach demselben Prinzip. */
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/**
 * Telefonnummer in E.164 für maschinenlesbare Structured Data.
 *
 * Erfindet keinen neuen Wert: `siteConfig.phoneHref` enthält dieselbe
 * Nummer bereits international formatiert (`tel:+493083756816`), nur mit
 * dem `tel:`-Präfix für Anruf-Links. Die sichtbare Darstellung
 * (`siteConfig.phone`, „030 837 56816") bleibt davon unberührt — sie wird
 * hier nicht verwendet.
 */
const SCHEMA_TELEPHONE = siteConfig.phoneHref.replace(/^tel:/, "");

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
 * Geschäftszeiten Mo–Sa 08:00–18:00 — vom Betreiber ausdrücklich bestätigt
 * (Phase 7B). Dieselben Zeiten stehen seither auch sichtbar im Footer
 * (`src/components/layout/Footer.tsx`), damit Structured Data und
 * sichtbarer Seiteninhalt übereinstimmen.
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
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/glanzwerk-logo.png`,
    telephone: SCHEMA_TELEPHONE,
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

/**
 * Ausführlichere Beschreibung derselben Entity wie `organizationSchema()`
 * (geteilte `@id`, siehe Datei-Kommentar oben) — mit Geokoordinaten,
 * Öffnungszeiten, Google-Profil-Verknüpfung und, sofern übergeben, der
 * echten aktuellen Bewertung. Verwendet auf Homepage, Über-uns- und
 * Bewertungen-Seite.
 */
export function professionalServiceSchema({
  aggregateRating,
}: ProfessionalServiceSchemaOptions = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/brand/glanzwerk-logo.png`,
    telephone: SCHEMA_TELEPHONE,
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
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "de-DE",
    publisher: { "@id": ORGANIZATION_ID },
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
    provider: { "@id": ORGANIZATION_ID },
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

/**
 * `author` bleibt die Organization, nicht eine Person: `articles.ts` führt
 * kein Autorenfeld, ein Name wäre erfunden. Sobald das Datenmodell einen
 * echten Artikel-Autor ausweist, gehört die Unterscheidung hierher.
 */
export function articleSchema({ headline, description, path, image }: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${siteConfig.url}${path}`,
    ...(image && { image: `${siteConfig.url}${image}` }),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
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
    "@id": `${siteConfig.url}${path}#webpage`,
    name,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: { "@id": WEBSITE_ID },
  };
}
