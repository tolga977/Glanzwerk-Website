import QuoteWizard from "@/components/forms/QuoteWizard";

/**
 * Zweiter Anfrageweg — ausschließlich auf dem Telefon (`lg:hidden`).
 *
 * ── Warum jetzt derselbe Wizard wie im Hero, nicht ein eigenes Formular ──
 * Hier stand zuerst `ContactForm` (das schwerere, sechs Felder umfassende
 * Formular, das früher auch auf /kontakt stand) — ausdrücklich als
 * "zweiter", andersartiger Weg gedacht. Auf Wunsch des Betreibers steht
 * hier jetzt exakt dieselbe `QuoteWizard`-Komponente wie oben im Hero und
 * inzwischen auch auf /kontakt: dieselben vier Schritte, dieselbe
 * Kopfzeile "Kostenloses Angebot anfordern", dieselbe Fläche. Wer im Hero
 * abgebrochen hat, findet hier keinen zweiten, andersartigen Weg, sondern
 * exakt denselben noch einmal.
 *
 * Die Komponente bringt ihre eigene weiße Karte samt Titel mit (siehe dort)
 * — deshalb hier nur eine schmale Auszeichnungszeile darüber, keine zweite
 * Überschrift, die sich mit der eigenen des Wizards doppeln würde.
 *
 * ── Warum trotzdem ein eigener Abschnitt statt nur der Wizard ───────────
 * An dieser Stelle stand früher ein zweites Anfrageformular für alle
 * Breiten; es wurde entfernt, weil es auf dem Desktop gegen das Formular
 * der Hero-Bühne konkurrierte (siehe Kommentar in page.tsx an dieser
 * Stelle). Dieser Einwand betrifft ausschließlich Desktop: dort steht die
 * Hero-Bühne beim Erreichen dieses Abschnitts längst nicht mehr im
 * Blickfeld, aber der Wizard bleibt über die Kopfzeile erreichbar, und ein
 * zweites vollständiges Formular mitten in derselben Ansicht wäre
 * tatsächlich eine Doppelung.
 *
 * Auf dem Telefon liegt die Hero-Bühne dagegen viele Bildschirmhöhen zurück.
 * Wer bis hierher gescrollt ist, ohne die Anfrage im Hero abzuschicken, soll
 * nicht zurückscrollen müssen — deshalb dieselbe Anfrage hier noch einmal,
 * aber nur unterhalb von 1024 px sichtbar.
 */
export default function MobileContactSection() {
  return (
    <section className="border-y border-line bg-gradient-to-b from-graphite-100 via-graphite-100 to-graphite-50 py-14 lg:hidden">
      <div className="container-page">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
          <span aria-hidden="true" className="brand-tick text-brand-400" />
          Direkt anfragen
        </p>
        <div className="mt-6">
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
