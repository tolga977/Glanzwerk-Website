import { services } from "@/data/services";
import { districts } from "@/data/districts";

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/**
 * Primary header navigation. Kept deliberately short — "Leistungen" and
 * "Standorte" carry their full lists via mega menus, "Unternehmen" bundles
 * the lower-traffic pages. "Preisrechner" lives in the header as the primary
 * CTA button instead of a plain nav link (see Header.tsx), and the logo
 * itself is the home link, so neither appears again here.
 */
export const mainNav: NavItem[] = [
  {
    label: "Leistungen",
    href: "/leistungen",
    children: services.map((service) => ({
      label: service.shortTitle,
      href: `/leistungen/${service.slug}`,
    })),
  },
  {
    label: "Standorte",
    href: "/standorte",
    children: districts.map((district) => ({
      label: district.name,
      href: `/standorte/${district.slug}`,
    })),
  },
  { label: "Glanzwerk Wissen", href: "/wissen" },
  {
    label: "Unternehmen",
    href: "/ueber-uns",
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Bewertungen", href: "/bewertungen" },
      { label: "Reinigungsfirma Berlin", href: "/reinigungsfirma-berlin" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

export const footerServiceLinks: NavChild[] = services.map((service) => ({
  label: service.shortTitle,
  href: `/leistungen/${service.slug}`,
}));

export const footerLegalLinks: NavChild[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
