import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

/**
 * Kontakt-Anstoß zwischen zwei langen Abschnitten — ausschließlich auf dem
 * Telefon (`lg:hidden`). Ab Desktop bleibt jeder Bereich unverändert; dort
 * sorgt die reguläre Kopfzeile und die Schluss-CTA für Handlungswege, und ein
 * zusätzlicher Balken zwischen den Abschnitten wäre auf breiten Schirmen eine
 * Wiederholung ohne neuen Wert.
 *
 * Auf dem Telefon liegen zwischen zwei Handlungswegen dagegen oft mehrere
 * Bildschirmhöhen Lesestrecke. Diese Leiste holt den Kontaktweg dort wieder
 * in Reichweite, ohne selbst wie ein neuer Seitenabschnitt zu wirken —
 * deshalb dieselbe schlichte Bauform wie `HeroBrandStrip` (Haarlinie oben und
 * unten, reiner weißer Grund, kein Kartenrahmen).
 */
export default function MobileCTAStrip({ heading }: { heading: string }) {
  return (
    <section className="border-y border-line bg-white py-8 lg:hidden">
      <div className="container-page flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg font-medium text-brand-900">{heading}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={siteConfig.phoneHref} variant="outline" size="md" className="min-h-12">
            Jetzt anrufen
          </Button>
          <Button href="/kontakt" size="md" className="min-h-12">
            Kontakt aufnehmen
          </Button>
        </div>
      </div>
    </section>
  );
}
