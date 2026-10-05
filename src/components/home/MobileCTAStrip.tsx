import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

/**
 * Kontakt-Anstoß zwischen zwei langen Abschnitten — ausschließlich auf dem
 * Telefon (`lg:hidden`). Ab Desktop bleibt jeder Bereich unverändert; dort
 * sorgt die reguläre Kopfzeile und die Schluss-CTA für Handlungswege, und ein
 * zusätzlicher Balken zwischen den Abschnitten wäre auf breiten Schirmen eine
 * Wiederholung ohne neuen Wert.
 *
 * Auf dem Telefon liegen zwischen zwei Handlungswegen oft mehrere
 * Bildschirmhöhen Lesestrecke. Dieses Band holt den Kontaktweg dort wieder
 * in Reichweite.
 *
 * ── Warum jetzt dunkel und gefüllt ──────────────────────────────────────
 * Die frühere Fassung war ein weißer Streifen mit Haarlinien — auf dem
 * Telefon verschwand sie zwischen den hellen Abschnitten, und die
 * Umrissschaltfläche las sich nicht als Handlung. Ein Band in Marken-Navy mit
 * gefüllter Hauptschaltfläche unterbricht das Scrollen sichtbar. Der
 * Hauptweg steht oben und über die ganze Breite (56 px hoch, mit dem Daumen
 * nicht zu verfehlen), der Anruf darunter als helle Umrissfläche.
 */
export default function MobileCTAStrip({ heading }: { heading: string }) {
  return (
    <section className="bg-gradient-to-br from-brand-900 to-brand-950 py-9 text-white lg:hidden">
      <div className="container-page flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-balance text-[1.375rem] font-medium leading-snug">{heading}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/kontakt" size="lg" className="min-h-14 w-full sm:w-auto">
            Kostenlos anfragen
          </Button>
          <Button
            href={siteConfig.phoneHref}
            variant="onMedia"
            size="lg"
            className="min-h-14 w-full sm:w-auto"
          >
            {siteConfig.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
