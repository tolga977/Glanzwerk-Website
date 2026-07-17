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
 * Primary header navigation: Leistungen, Standorte, Glanzwerk Wissen, Über
 * uns, Kontakt as plain top-level links, "Mehr" bundling the lower-traffic
 * pages. "Preisrechner" is intentionally NOT a plain text link here — it's
 * the header's primary CTA button (see Header.tsx), which is a more
 * prominent treatment than a text link, not a demotion. FAQ is deliberately
 * not a nav destination — FAQs live embedded on their respective pages
 * (Leistungen, Standorte, Startseite, Reinigungsfirma Berlin) rather than
 * as one central page.
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
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
  {
    label: "Mehr",
    href: "/bewertungen",
    children: [
      { label: "Bewertungen", href: "/bewertungen" },
      { label: "Reinigungsfirma Berlin", href: "/reinigungsfirma-berlin" },
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
