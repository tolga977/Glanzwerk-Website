import type { ReactNode } from "react";
import { owner } from "@/data/owner";

/**
 * Die Vertrauenszeile am Fuß der Hero-Bühne.
 *
 * ── Warum jeder Punkt eine Quelle mitführt ──────────────────────────────
 * Die Vorlage für diesen Hero nennt sechs Punkte. Vier davon sind im Projekt
 * belegt, zwei nicht — und die beiden nicht belegten sind ausgetauscht, nicht
 * übernommen. Damit das nachvollziehbar bleibt und nicht beim nächsten
 * Durchgang stillschweigend wieder aufweicht, steht an jedem Eintrag, woher
 * die Aussage kommt.
 *
 * Was NICHT übernommen wurde und warum:
 *
 *   „Umweltfreundliche Reinigungsmittel"
 *     Nicht belegt — und die Umweltseite widerspricht der Formulierung
 *     ausdrücklich: „Wir machen keine Aussagen, die wir nicht nachweisen
 *     können. Unser Fokus liegt auf einem verantwortungsvollen Umgang mit
 *     Wasser, Reinigungsmitteln und Materialien."
 *     (src/app/umwelt-verantwortung/page.tsx). Eine Behauptung, die die
 *     eigene Umweltseite bewusst vermeidet, darf nicht im ersten Bildschirm
 *     stehen. Ersetzt durch die dort tatsächlich getroffene Aussage.
 *
 *   „Geschultes und festes Team"
 *     Nicht belegt. Die einzige Stelle mit „geschult" im Projekt bezieht sich
 *     auf Praxispersonal beim Kunden, nicht auf Glanzwerk
 *     (src/data/articles.ts). Zu Festanstellung oder Schulung steht nichts.
 *     Ersetzt durch den festen Ansprechpartner — die Aussage, die das Projekt
 *     an dieser Stelle wirklich trägt.
 *
 * Ebenfalls nicht übernommen: die Siegel unter dem Hero der Vorlage
 * („100 % Zufriedenheit garantiert", „Geprüfter Dienstleister",
 * Verbandsmitgliedschaft). Keines davon ist im Projekt belegt; die
 * Mitgliedschaft steht in src/data/memberships.ts ausdrücklich auf `null`.
 */

export interface HeroTrustItem {
  /** Kurzform für die Zeile. Zwei Zeilen Umbruch sind eingeplant. */
  label: string;
  /**
   * Einschränkung oder Präzisierung, sofern die belegte Aussage eine hat.
   * Wird als zweite, kleinere Zeile gesetzt — nicht weggelassen: eine
   * Zusage ohne ihre Bedingung ist eine andere Zusage.
   */
  detail?: string;
  /** Woher die Aussage stammt. Erscheint nicht auf der Seite. */
  quelle: string;
  icon: ReactNode;
  /**
   * Erscheint im schmalen Streifen am Fuß der Hero-Bühne.
   *
   * Vier von sechs, und das ist der Punkt: die erste Fassung dieses Streifens
   * zeigte alle sechs Einträge und wurde dadurch 146 px hoch (bei 1024 px
   * sogar 241 px) — ein Raster, das dem Motiv den Raum nahm. Bei vier
   * Einträgen bleibt es eine Zeile.
   *
   * Ausgewählt sind die beiden ausdrücklich gewünschten Angaben
   * (Betriebshaftpflicht, Antwortzeit) sowie die beiden, die ein Risiko beim
   * Kunden wegnehmen statt eine Eigenschaft zu behaupten. Die übrigen zwei
   * bleiben vollständig erhalten und stehen für den geplanten, kompakteren
   * Vertrauensbereich weiter unten auf der Seite bereit.
   */
  imStreifen?: boolean;
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const heroTrustItems: HeroTrustItem[] = [
  {
    label: "Flexible Reinigungszeiten",
    detail: "auch außerhalb der Geschäftszeiten",
    quelle:
      "Wortlaut aus der Metabeschreibung der Startseite (src/app/page.tsx: „Klare Abläufe, feste Ansprechpartner und flexible Reinigungszeiten“) und aus siteConfig.description („flexible Reinigungsintervalle“). Die Präzisierung ist auf den Leistungsseiten mehrfach zugesagt, u. a. Büro-, Gebäude-, Kanzlei- und Unterhaltsreinigung (FAQ „außerhalb der Geschäftszeiten“).",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" {...stroke} />
        <path d="M12 7.5V12l3 2" {...stroke} />
      </>
    ),
  },
  {
    label: "Bedarfsgerechte Dosierung",
    detail: "nach Herstellerangabe",
    quelle:
      "src/app/umwelt-verantwortung/page.tsx — „Bedarfsgerechte Dosierung: Reinigungsmittel werden entsprechend den Herstellerangaben und dem tatsächlichen Bedarf eingesetzt.“",
    icon: (
      <>
        <path d="M9 3h6M10 3v3.5L6.5 15a4.5 4.5 0 0 0 4.1 6h2.8a4.5 4.5 0 0 0 4.1-6L14 6.5V3" {...stroke} />
        <path d="M7.5 14h9" {...stroke} />
      </>
    ),
  },
  {
    label: "Fester Ansprechpartner",
    imStreifen: true,
    detail: owner.name,
    quelle:
      "src/data/owner.ts — namentlich benannter Inhaber; die Zusage ist projektweit die tragende Aussage zur Erreichbarkeit.",
    icon: (
      <>
        <circle cx="12" cy="8.5" r="3.5" {...stroke} />
        <path d="M5 20.5c0-3.6 3.1-6 7-6s7 2.4 7 6" {...stroke} />
      </>
    ),
  },
  {
    label: "5 Mio. € Betriebshaftpflicht",
    imStreifen: true,
    quelle:
      "src/app/ueber-uns/page.tsx — „Glanzwerk ist bei der Allianz betriebshaftpflichtversichert (Deckungssumme 5 Mio. €)“.",
    icon: (
      <>
        <path d="M12 3l7 3v5.5c0 4.3-2.9 8.2-7 9.5-4.1-1.3-7-5.2-7-9.5V6l7-3Z" {...stroke} />
        <path d="m9 12 2 2 4-4" {...stroke} />
      </>
    ),
  },
  {
    label: "3 Monate flexibel testen",
    imStreifen: true,
    detail: "ohne automatische Verlängerung",
    quelle:
      "src/data/seoHeadings.ts und src/data/combos.ts — „3 Monate flexibel testen“; eigene Seite unter /3-monate-testen.",
    icon: (
      <>
        <rect x="4" y="5.5" width="16" height="15" rx="2.5" {...stroke} />
        <path d="M8 3v4M16 3v4M4 10.5h16" {...stroke} />
        <path d="m9.5 15 1.8 1.8L15 13" {...stroke} />
      </>
    ),
  },
  {
    label: `Antwort ${owner.responseTime}`,
    imStreifen: true,
    detail: owner.responseTimeQualifier,
    quelle: "src/data/owner.ts — responseTime und responseTimeQualifier.",
    icon: (
      <>
        <path d="M21 12.5a8.5 8.5 0 1 1-3.2-6.6" {...stroke} />
        <path d="M21 4v5h-5" {...stroke} />
        <path d="M12 8.5V13l2.5 1.5" {...stroke} />
      </>
    ),
  },
];

/**
 * Die vier Einträge des schmalen Streifens am Fuß der Hero-Bühne.
 *
 * Abgeleitet und nicht von Hand kopiert: so kann die Auswahl nicht von der
 * vollständigen Liste abweichen, und die Quellenangaben bleiben an jedem
 * Eintrag hängen.
 */
export const heroStripItems: HeroTrustItem[] = heroTrustItems.filter(
  (item) => item.imStreifen,
);
