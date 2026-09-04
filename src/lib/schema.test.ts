import { describe, expect, it } from "vitest";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
  serviceSchema,
  articleSchema,
  webPageSchema,
} from "@/lib/schema";
import { siteConfig } from "@/data/site";
import { googleBusiness } from "@/data/googleBusiness";

/**
 * Prüft die in Phase 7B eingeführte @id-Verknüpfung: Organization und
 * ProfessionalService müssen dieselbe Entity referenzieren, und die
 * abhängigen Bausteine (WebSite, WebPage, Service, Article) müssen per
 * @id auf sie verweisen statt sie erneut auszuschreiben.
 */

describe("zentrale Unternehmens-@id", () => {
  it("ist stabil und auf die kanonische Domain bezogen", () => {
    expect(ORGANIZATION_ID).toBe(`${siteConfig.url}/#organization`);
    expect(WEBSITE_ID).toBe(`${siteConfig.url}/#website`);
  });

  it("organizationSchema und professionalServiceSchema tragen dieselbe @id", () => {
    const org = organizationSchema();
    const service = professionalServiceSchema();
    expect(org["@id"]).toBe(ORGANIZATION_ID);
    expect(service["@id"]).toBe(ORGANIZATION_ID);
    expect(org["@id"]).toBe(service["@id"]);
  });

  it("websiteSchema referenziert die Organization per @id, nicht inline", () => {
    const site = websiteSchema();
    expect(site["@id"]).toBe(WEBSITE_ID);
    expect(site.publisher).toEqual({ "@id": ORGANIZATION_ID });
  });

  it("webPageSchema referenziert WebSite per @id in isPartOf", () => {
    const page = webPageSchema({ name: "Test", description: "Test", path: "/test" });
    expect(page.isPartOf).toEqual({ "@id": WEBSITE_ID });
    expect(page["@id"]).toBe(`${siteConfig.url}/test#webpage`);
  });

  it("serviceSchema.provider referenziert die Organization per @id, ohne sie erneut auszuschreiben", () => {
    const service = serviceSchema({ name: "Büroreinigung", description: "Test", path: "/leistungen/test" });
    expect(service.provider).toEqual({ "@id": ORGANIZATION_ID });
    // Keine erneute Ausschreibung von name/url/telephone im provider-Objekt.
    expect(Object.keys(service.provider)).toEqual(["@id"]);
  });

  it("articleSchema.author und .publisher referenzieren dieselbe zentrale Entity", () => {
    const article = articleSchema({ headline: "Test", description: "Test", path: "/wissen/test" });
    expect(article.author).toEqual({ "@id": ORGANIZATION_ID });
    expect(article.publisher).toEqual({ "@id": ORGANIZATION_ID });
  });
});

describe("Telefonnummer im Schema", () => {
  it("verwendet das bereits vorhandene E.164-Format aus siteConfig.phoneHref", () => {
    const expected = siteConfig.phoneHref.replace(/^tel:/, "");
    expect(expected).toMatch(/^\+\d+$/);
    expect(organizationSchema().telephone).toBe(expected);
    expect(professionalServiceSchema().telephone).toBe(expected);
  });

  it("weicht von der sichtbaren nationalen Darstellung ab (das ist beabsichtigt)", () => {
    expect(organizationSchema().telephone).not.toBe(siteConfig.phone);
  });
});

describe("Google-Unternehmensprofil", () => {
  it("professionalServiceSchema.sameAs verwendet die zentrale, bestätigte Profil-URL", () => {
    expect(professionalServiceSchema().sameAs).toEqual([googleBusiness.profileUrl]);
  });

  it("ist kein generischer Maps-Suchlink mehr", () => {
    expect(googleBusiness.profileUrl).not.toContain("/maps/search");
  });
});

describe("aggregateRating bleibt optional und unverändert", () => {
  it("fehlt vollständig, wenn keine Bewertung übergeben wird", () => {
    const service = professionalServiceSchema();
    expect(service).not.toHaveProperty("aggregateRating");
  });

  it("übernimmt nur real übergebene Werte, keine Erfindung", () => {
    const service = professionalServiceSchema({ aggregateRating: { ratingValue: 4.7, reviewCount: 12 } });
    expect(service.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.7,
      reviewCount: 12,
      bestRating: 5,
    });
  });
});

describe("Öffnungszeiten", () => {
  it("professionalServiceSchema führt die bestätigten Mo–Sa-08:00–18:00-Zeiten", () => {
    const spec = professionalServiceSchema().openingHoursSpecification[0];
    expect(spec.opens).toBe("08:00");
    expect(spec.closes).toBe("18:00");
    expect(spec.dayOfWeek).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);
  });

  it("organizationSchema (die schlichte, globale Variante) führt keine Öffnungszeiten", () => {
    expect(organizationSchema()).not.toHaveProperty("openingHoursSpecification");
  });
});
