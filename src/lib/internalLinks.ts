import { articles } from "@/data/articles";
import { getCombosForDistrict, getCombosForService } from "@/data/combos";
import { getDistrictBySlug } from "@/data/districts";
import { getRelatedServices, getServiceBySlug } from "@/data/services";

export interface InternalLink {
  href: string;
  label: string;
}

export interface InternalLinkGroup {
  heading: string;
  variant: "pills" | "list";
  links: InternalLink[];
}

/** Allgemeine Ratgeber, die zu jeder Leistung passen – füllen Leistungen ohne eigenen Fachartikel auf. */
const generalArticleSlugs = [
  "reinigungsdienstleister-auswaehlen",
  "objektbesichtigung-vorbereiten",
  "was-kostet-gebaeudereinigung",
];

function articleLinksForService(serviceSlug: string): InternalLink[] {
  const related = articles.filter((a) => a.relatedServiceSlugs.includes(serviceSlug));
  const general = generalArticleSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a) && !related.includes(a as (typeof related)[number]));
  return [...related, ...general]
    .slice(0, Math.max(3, related.length))
    .map((a) => ({ href: `/wissen/${a.slug}`, label: a.title }));
}

export function serviceLinkGroups(serviceSlug: string): InternalLinkGroup[] {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return [];

  const districtLinks = getCombosForService(serviceSlug).flatMap((combo) => {
    const district = getDistrictBySlug(combo.districtSlug);
    return district
      ? [{ href: `/leistungen/${serviceSlug}/${district.slug}`, label: `${service.shortTitle} ${district.name}` }]
      : [];
  });

  const relatedServiceLinks = getRelatedServices(service).map((s) => ({
    href: `/leistungen/${s.slug}`,
    label: s.shortTitle,
  }));

  return [
    { heading: "Nach Bezirk", variant: "pills", links: districtLinks },
    { heading: "Passende Leistungen", variant: "pills", links: relatedServiceLinks },
    { heading: "Ratgeber", variant: "list", links: articleLinksForService(serviceSlug) },
  ];
}

export function comboLinkGroups(serviceSlug: string, districtSlug: string): InternalLinkGroup[] {
  const district = getDistrictBySlug(districtSlug);
  if (!district) return [];

  const otherServiceLinks = getCombosForDistrict(districtSlug)
    .filter((combo) => combo.serviceSlug !== serviceSlug)
    .flatMap((combo) => {
      const other = getServiceBySlug(combo.serviceSlug);
      return other
        ? [{ href: `/leistungen/${other.slug}/${district.slug}`, label: `${other.shortTitle} ${district.name}` }]
        : [];
    });

  const ortsteilLinks = district.ortsteile.map((o) => ({
    href: `/standorte/${district.slug}/${o.slug}`,
    label: `Gebäudereinigung ${o.name}`,
  }));

  return [
    { heading: `Weitere Leistungen in ${district.name}`, variant: "pills", links: otherServiceLinks },
    { heading: `Ortsteile in ${district.name}`, variant: "pills", links: ortsteilLinks },
    { heading: "Ratgeber", variant: "list", links: articleLinksForService(serviceSlug) },
  ];
}
