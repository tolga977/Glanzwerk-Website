import { describe, expect, it } from "vitest";
import { seoHeadings, type SeoHeadingSet } from "@/data/seoHeadings";
import { services } from "@/data/services";
import { districts } from "@/data/districts";
import { combos } from "@/data/combos";
import { articles } from "@/data/articles";

const centralPaths = [
  "/",
  "/leistungen",
  "/standorte",
  "/umwelt-verantwortung",
  "/3-monate-testen",
  "/ueber-uns",
  "/bewertungen",
  "/preisrechner",
  "/kontakt",
  "/wissen",
  "/reinigungsfirma-berlin",
];

const leistungenPaths = services.map((service) => `/leistungen/${service.slug}`);

const bezirkPaths = districts.map((district) => `/standorte/${district.slug}`);

const ortsteilPaths = districts.flatMap((district) =>
  district.ortsteile.map((ortsteil) => `/standorte/${district.slug}/${ortsteil.slug}`),
);

const komboPaths = combos.map((combo) => `/leistungen/${combo.serviceSlug}/${combo.districtSlug}`);

const wissenPaths = articles.map((article) => `/wissen/${article.slug}`);

/**
 * Vollständige, aus den echten Datenquellen generierte Liste aller
 * indexierbaren SEO-URLs. Fehlt hier eine URL oder existiert ein
 * seoHeadings-Eintrag ohne Gegenstück, muss dieser Test fehlschlagen –
 * es gibt bewusst keinen generischen Fallback für vorhandene SEO-Seiten.
 */
const allSeoPaths = [
  ...centralPaths,
  ...leistungenPaths,
  ...bezirkPaths,
  ...ortsteilPaths,
  ...komboPaths,
  ...wissenPaths,
];

function heading(path: string): SeoHeadingSet {
  const entry = seoHeadings[path];
  if (!entry) throw new Error(`Kein seoHeadings-Eintrag für ${path}`);
  return entry;
}

describe("seoHeadings Vollständigkeit", () => {
  it("hat für jede tatsächlich vorhandene SEO-URL genau einen Eintrag", () => {
    const missing = allSeoPaths.filter((path) => !seoHeadings[path]);
    expect(missing, `Fehlende seoHeadings-Einträge: ${missing.join(", ")}`).toEqual([]);
  });

  it("enthält keine Einträge für nicht (mehr) existierende URLs", () => {
    const known = new Set(allSeoPaths);
    const unused = Object.keys(seoHeadings).filter((path) => !known.has(path));
    expect(unused, `Verwaiste seoHeadings-Einträge ohne zugehörige URL: ${unused.join(", ")}`).toEqual([]);
  });

  it("deckt genau die erwartete Gesamtzahl an URLs ab (kein Duplikat in den Quelldaten)", () => {
    expect(new Set(allSeoPaths).size).toBe(allSeoPaths.length);
  });
});

describe("seoHeadings H1-Qualität", () => {
  it.each(allSeoPaths)("hat für %s eine nicht-leere H1", (path) => {
    expect(heading(path).h1.trim().length).toBeGreaterThan(0);
  });

  it("verwendet jede H1 im gesamten SEO-Inventar nur einmal", () => {
    const byH1 = new Map<string, string[]>();
    for (const path of allSeoPaths) {
      const h1 = heading(path).h1;
      byH1.set(h1, [...(byH1.get(h1) ?? []), path]);
    }
    const duplicates = [...byH1.entries()].filter(([, paths]) => paths.length > 1);
    expect(
      duplicates,
      duplicates.map(([h1, paths]) => `"${h1}" auf ${paths.join(" & ")}`).join("; "),
    ).toEqual([]);
  });

  it.each(leistungenPaths)("H1 von %s enthält keinen rohen {shortTitle}-{name}-Platzhalter-Stil", (path) => {
    // Regressionsschutz: die alte, generische H1 folgte exakt dem Muster "<Leistung> Berlin".
    const service = services.find((s) => `/leistungen/${s.slug}` === path)!;
    expect(heading(path).h1).not.toBe(`${service.title}`);
  });

  it.each(komboPaths)("lokale H1 von %s nennt sowohl Leistung als auch Standort", (path) => {
    const combo = combos.find((c) => `/leistungen/${c.serviceSlug}/${c.districtSlug}` === path)!;
    const district = districts.find((d) => d.slug === combo.districtSlug)!;
    const entry = heading(path);
    expect(entry.h1, `H1 "${entry.h1}" nennt den Bezirk "${district.name}" nicht`).toContain(district.name);
    expect(entry.h1Highlight, `Kombi-H1 "${entry.h1}" braucht ein h1Highlight zur Leistung`).toBeTruthy();
    if (entry.h1Highlight) {
      expect(entry.h1).toContain(entry.h1Highlight);
    }
  });

  it.each(bezirkPaths)("lokale H1 von %s nennt den Bezirksnamen", (path) => {
    const district = districts.find((d) => `/standorte/${d.slug}` === path)!;
    expect(heading(path).h1).toContain(district.name);
  });

  it.each(ortsteilPaths)("lokale H1 von %s nennt den Ortsteilnamen", (path) => {
    const [, , bezirkSlug, ortsteilSlug] = path.split("/");
    const district = districts.find((d) => d.slug === bezirkSlug)!;
    const ortsteil = district.ortsteile.find((o) => o.slug === ortsteilSlug)!;
    expect(heading(path).h1).toContain(ortsteil.name);
  });
});

describe("seoHeadings H2/FAQ/CTA-Qualität", () => {
  it.each(allSeoPaths)("hat für %s keine leeren sectionHeadings-Einträge", (path) => {
    const entry = heading(path);
    for (const section of entry.sectionHeadings) {
      expect(section.trim().length).toBeGreaterThan(0);
    }
  });

  it.each(allSeoPaths)("hat für %s ein nicht-leeres faqHeading, sofern gesetzt", (path) => {
    const entry = heading(path);
    if (entry.faqHeading !== undefined) {
      expect(entry.faqHeading.trim().length).toBeGreaterThan(0);
    }
  });

  it.each(allSeoPaths)("hat für %s ein nicht-leeres ctaHeading, sofern gesetzt", (path) => {
    const entry = heading(path);
    if (entry.ctaHeading !== undefined) {
      expect(entry.ctaHeading.trim().length).toBeGreaterThan(0);
    }
  });

  it.each(allSeoPaths)("verweist mostSimilarUrl von %s auf eine existierende SEO-URL", (path) => {
    const entry = heading(path);
    if (entry.mostSimilarUrl !== undefined) {
      expect(seoHeadings[entry.mostSimilarUrl], `mostSimilarUrl "${entry.mostSimilarUrl}" existiert nicht`).toBeDefined();
    }
  });

  it.each(allSeoPaths)("hat für %s eine nicht-leere differentiation-Begründung", (path) => {
    expect(heading(path).differentiation.trim().length).toBeGreaterThan(0);
  });
});
