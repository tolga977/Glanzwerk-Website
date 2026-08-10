import { services } from "@/data/services";

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
 * Preisrechner ist bewusst kein Textlink, sondern der CTA-Button im Header.
 *
 * "Standorte" stand hier bis August 2026 als eigener Menüpunkt mit
 * Mega-Menü (alle 12 Bezirke + "Standorte ansehen"-Kachel). Auf
 * ausdrücklichen Wunsch des Betreibers entfernt, um die Kopfzeile auf
 * Leistungen/Umweltschutz/Testphase/Wissen/Kontakt zu verkürzen.
 *
 * Kein Linkverlust dadurch: `Footer.tsx` führt weiterhin eine vollständige
 * Standorte-Spalte mit allen 12 Bezirken, und jede Bezirks-/Ortsteil- und
 * Kombiseite verlinkt intern zu ihren Nachbarn (siehe `districts.ts`,
 * `combos.ts`). Die Seite `/standorte` selbst bleibt unverändert erreichbar,
 * nur ohne eigenen Platz in der Hauptnavigation.
 */
/*
 * ── Reihenfolge und Umfang (August 2026) ──────────────────────────────────
 * „Über uns" ist neu aufgenommen und die Reihenfolge folgt jetzt der
 * Entwurfsvorlage für die Startseite: Leistungen, Testphase, Umweltschutz,
 * Glanzwerk Wissen, Über uns, Kontakt.
 *
 * `/ueber-uns` ist keine erfundene Adresse — die Seite existiert seit langem
 * unter `src/app/ueber-uns/page.tsx` und war bisher nur aus der Kopfzeile
 * nicht erreichbar. Sie trägt unter anderem den Nachweis zur
 * Betriebshaftpflicht, auf den die Vertrauenszeile der Startseite verweist;
 * dass dorthin kein Weg aus der Navigation führte, war eine Lücke.
 *
 * Kein Linkverlust und keine geänderte Adresse: es kommt ein Eintrag hinzu,
 * die übrigen fünf sind unverändert.
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
  { label: "Testphase", href: "/3-monate-testen" },
  { label: "Umweltschutz", href: "/umwelt-verantwortung" },
  { label: "Glanzwerk Wissen", href: "/wissen" },
  { label: "Über uns", href: "/ueber-uns" },
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
