import Image from "next/image";
import { approvedProductLogos } from "@/data/productLogos";

/**
 * Zeile mit den Herstellern, deren Nennung freigegeben ist.
 *
 * ── Verhalten ohne freigegebene Eintraege ───────────────────────────────
 * Rendert `null`. Keine graue Flaeche, kein „Logos folgen", kein
 * ausgegrauter Platz — ein Besucher sieht nicht, dass hier etwas fehlt.
 * Gefiltert wird in `data/productLogos.ts`, damit ein nicht freigegebener
 * Hersteller gar nicht erst bis in die Anzeige gelangt.
 *
 * ── Warum keine Bildmarke, solange keine Datei vorliegt ─────────────────
 * Der Name laeuft als Wortbild. Ein nachgebautes oder nachgesetztes Logo
 * waere eine Behauptung ueber eine fremde Marke; der blosse Name ist eine
 * Sachangabe. Sobald die offizielle Datei vorliegt, kommen Proportionen und
 * Form aus der Datei — nicht aus dieser Komponente.
 *
 * ── Warum keine Kacheln ─────────────────────────────────────────────────
 * Kein Kasten je Eintrag, keine gleich grossen Felder: die Eintraege stehen
 * auf einer gemeinsamen Grundlinie in einer Zeile. Gleich grosse Rahmen um
 * unterschiedlich breite Marken erzeugen genau den Katalogeindruck, den der
 * uebrige Seitenaufbau vermeidet.
 */
export default function ProductLogos() {
  if (approvedProductLogos.length === 0) return null;

  return (
    <div>
      {/*
        Bewusst „unter anderem" und „arbeiten mit": das ist eine Aussage
        ueber die eigene Ausstattung, keine ueber eine Partnerschaft. Eine
        Ueberschrift wie „Unsere Partner" wuerde eine geschaeftliche
        Beziehung behaupten, die es nicht gibt.
      */}
      <p className="text-sm leading-relaxed text-ink-soft">
        Wir arbeiten unter anderem mit professionellen Produkten und Systemen von
      </p>
      <ul className="mt-6 flex flex-wrap items-baseline gap-x-12 gap-y-6">
        {approvedProductLogos.map((logo) => (
          <li key={logo.name}>
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width ?? 320}
                height={logo.height ?? 80}
                /*
                  Feste optische Hoehe, Breite folgt dem Seitenverhaeltnis der
                  Datei. Keine Farbaenderung: ob ein Logo einfarbig gezeigt
                  werden darf, steht in der Richtlinie des Herstellers und
                  nicht in unserem Ermessen.
                */
                className="h-7 w-auto sm:h-8"
                style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
              />
            ) : (
              <span className="font-display text-xl font-medium tracking-[0.02em] text-brand-900 sm:text-2xl">
                {logo.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
