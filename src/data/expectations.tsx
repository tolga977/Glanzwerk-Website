import type { ReactNode } from "react";

/**
 * "Das dürfen Sie von Glanzwerk erwarten" – wiederverwendete Vertrauenskarten
 * auf Startseite und Leistungsseiten. Nur Aussagen, die Glanzwerk tatsächlich
 * zusichern kann; keine unbelegten Garantien.
 */
export const expectationIcons: Record<string, ReactNode> = {
  agreement: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5l1.5 1.5 3-3M8 15l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9h2M14.5 15.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 14.6c1.7.3 3 1.7 3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  refresh: (
    <>
      <path d="M5 11a7 7 0 0 1 12-4.9M19 13a7 7 0 0 1-12 4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 3.5V6.5H14M7 20.5V17.5H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  products: (
    <>
      <path d="M10 3h4M11 3v4.2L7 13v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6l-4-5.8V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 15h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
};

export interface Expectation {
  title: string;
  description: string;
  icon: keyof typeof expectationIcons;
}

export const expectations: Expectation[] = [
  {
    title: "Klare Absprachen statt Kleingedrucktem",
    description: "Feste Teams statt ständig wechselndem Personal – und ein transparentes Angebot ohne versteckte Kosten.",
    icon: "agreement",
  },
  {
    title: "Fester Ansprechpartner",
    description: "Wer bei Ihnen reinigt, kennt Ihr Objekt und macht sich mit den Besonderheiten vertraut.",
    icon: "team",
  },
  {
    title: "Schnelle Reaktion bei Beanstandungen",
    description: "Melden Sie einen konkreten Mangel innerhalb von 24 Stunden, beheben wir ihn in der Regel kostenlos nach.",
    icon: "refresh",
  },
  {
    title: "Sorgfältiger Umgang mit Materialien",
    description: "Für Glas, Boden, Sanitär und empfindliche Oberflächen kommen jeweils passende Profimittel zum Einsatz.",
    icon: "products",
  },
];
