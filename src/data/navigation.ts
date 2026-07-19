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

/** Preisrechner ist bewusst kein Textlink, sondern der CTA-Button im Header. */
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
  { label: "Umwelt & Verantwortung", href: "/umwelt-verantwortung" },
  { label: "Glanzwerk Wissen", href: "/wissen" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerServiceLinks: NavChild[] = services.map((service) => ({
  label: service.shortTitle,
  href: `/leistungen/${service.slug}`,
}));

export const footerLegalLinks: NavChild[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
