import { googleBusiness } from "@/data/googleBusiness";
import type { GoogleRatingData } from "@/lib/googleRating";

/**
 * Google-Bewertung als typografisches Lockup.
 *
 * ── Warum keine Karte mehr ──────────────────────────────────────────────
 * Vorher lag die Bewertung in einer weißen Karte mit Radius und Schatten
 * neben einem Zahlenraster. Genau so sieht ein eingebettetes Widget aus:
 * ein Fremdkörper, der zufällig auf der Seite liegt. Die Bewertung ist aber
 * das stärkste Vertrauenssignal des Abschnitts und gehört deshalb nicht in
 * einen Container, sondern in die Satzhierarchie.
 *
 * Jetzt trägt die Ziffer selbst die Rolle der Überschrift: 88 px in der
 * Display-Serife, daneben die Sterne, darunter der Markenstrich. Die
 * Google-Bildmarke steht klein in der Auszeichnungszeile darüber — Zuordnung
 * ohne Rahmen. Kein Schatten, kein Radius, keine Fläche.
 *
 * Die Komponente rechnet nicht und lädt nicht — sie bekommt die Zahlen
 * fertig übergeben (aus `getGoogleRating()`) und bleibt damit eine reine
 * Server Component.
 *
 * Die Sterne sind bewusst nicht auf halbe Schritte gerundet: bei 4,7 ist
 * der fünfte Stern zu 70 % gefüllt. Eine auf 4,5 gerundete Anzeige wäre
 * eine andere Aussage als die, die bei Google steht.
 */

interface GoogleRatingProps {
  data: GoogleRatingData;
  /**
   * "editorial" — großes typografisches Lockup für helle Flächen
   *               (Beweisband: 88-px-Ziffer, Markenstrich, Profil-Link)
   * "badge"     — kompakte Auszeichnung für dunkle Flächen und Bewegtbild
   *               (Hero: Glasplättchen, Sterne zuerst, Zahl klein)
   *
   * "rail"      — ohne eigene Fläche, für die Vertrauensleiste am Hero-Fuß.
   *               Dort trennen senkrechte Haarlinien die Einträge; ein
   *               Plättchen mit eigenem Rand würde als einziger Eintrag
   *               einen Kasten in die Leiste setzen.
   *
   *               Warum eine eigene Bauform statt Zusatzklassen: `bg-white/10`
   *               und `bg-transparent` haben dieselbe Spezifität — welche
   *               gewinnt, entscheidet allein die Reihenfolge im erzeugten
   *               Stylesheet. Genau diese Wette ist auf dieser Website schon
   *               einmal verloren worden (siehe Button `onMedia`).
   *
   * "inline"    — wie "rail", aber für helle Flächen (dunkler statt weißer
   *               Text). Für Stellen, an denen "editorial" zu schwer wirkt,
   *               etwa neben Schaltflächen im Fließtext-Kontext der
   *               Leistungs-×-Bezirk-Kombiseiten.
   */
  variant?: "editorial" | "badge" | "rail" | "inline";
  className?: string;
}

/** Originalfarben der Google-Bildmarke — Pflicht bei der Zuordnung von Rezensionen. */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

const STAR_PATH =
  "M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27l7.1-1.01L12 2z";

/**
 * Fünf Sterne mit anteiliger Füllung.
 *
 * Umsetzung über zwei identisch gesetzte Reihen: unten die leere, darüber
 * die goldene, deren Container auf den erreichten Prozentsatz beschnitten
 * ist. Kein halber Stern als eigenes Icon, keine Rundung, kein Rechnen mit
 * Icon-Breiten — die Füllung stimmt bei jedem Zwischenwert.
 */
function Stars({ rating, compact = false }: { rating: number; compact?: boolean }) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const box = compact ? "h-4 w-4" : "h-5 w-5 sm:h-[1.375rem] sm:w-[1.375rem]";
  const gap = compact ? "gap-0.5" : "gap-1";

  const row = (fill: string) => (
    <div className={`flex ${gap}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${box} shrink-0`} aria-hidden="true">
          <path d={STAR_PATH} fill={fill} />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="relative inline-block">
      {row("#d2d8e1")}
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${percent}%` }}>
        {row("#f5a623")}
      </div>
    </div>
  );
}

/** 5 → "5,0" · 4.7 → "4,7" — deutsche Schreibweise mit Komma. */
function formatRating(rating: number): string {
  return rating.toFixed(1).replace(".", ",");
}

export default function GoogleRating({
  data,
  variant = "editorial",
  className = "",
}: GoogleRatingProps) {
  const value = formatRating(data.rating);

  if (variant === "rail") {
    return (
      <a
        href={googleBusiness.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${value} von 5 Sternen aus ${data.count} Google-Bewertungen — Profil auf Google ansehen`}
        className={`group inline-flex items-center gap-2.5 rounded-control transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
      >
        <GoogleG className="h-[18px] w-[18px] shrink-0" />
        <span aria-hidden="true">
          <Stars rating={data.rating} compact />
        </span>
        <span aria-hidden="true" className="text-sm font-semibold text-white">
          {value}
        </span>
        <span aria-hidden="true" className="text-sm text-white/70">
          ({data.count})
        </span>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={googleBusiness.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${value} von 5 Sternen aus ${data.count} Google-Bewertungen — Profil auf Google ansehen`}
        className={`group inline-flex items-center gap-2.5 rounded-control transition-opacity duration-200 ease-out hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 ${className}`}
      >
        <GoogleG className="h-[18px] w-[18px] shrink-0" />
        <span aria-hidden="true">
          <Stars rating={data.rating} compact />
        </span>
        <span aria-hidden="true" className="text-sm font-semibold text-brand-900">
          {value}
        </span>
        <span aria-hidden="true" className="text-sm text-ink-soft">
          ({data.count} Bewertungen)
        </span>
      </a>
    );
  }

  if (variant === "badge") {
    /*
     * Glasplättchen für den Hero.
     *
     * Reihenfolge bewusst anders als im Beweisband: erst die Sterne, dann
     * die Zahl, dann die Anzahl. Über einem laufenden Film hat niemand Zeit
     * zu lesen — das Sternenmuster wird als Form erkannt, bevor eine Ziffer
     * gelesen wird.
     *
     * Material statt Kasten: 8 % Weiß mit Unschärfe dahinter. Über einem
     * bewegten Bild liest sich eine deckende Fläche als aufgeklebtes Widget,
     * eine durchscheinende als Teil der Szene.
     */
    return (
      <a
        href={googleBusiness.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${value} von 5 Sternen aus ${data.count} Google-Bewertungen — Profil auf Google ansehen`}
        className={`press inline-flex items-center gap-2.5 rounded-control border border-white/25 bg-white/10 px-3.5 py-2 backdrop-blur-md transition-colors duration-200 ease-out hover:border-white/50 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
      >
        <GoogleG className="h-4 w-4 shrink-0" />
        <span aria-hidden="true">
          <Stars rating={data.rating} compact />
        </span>
        <span aria-hidden="true" className="text-sm font-semibold text-white">
          {value}
        </span>
        <span aria-hidden="true" className="text-sm text-white/75">
          ({data.count})
        </span>
      </a>
    );
  }

  return (
    <a
      href={googleBusiness.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${value} von 5 Sternen aus ${data.count} Google-Bewertungen — Profil auf Google ansehen`}
      className={`group block rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 ${className}`}
    >
      {/* Zuordnung: Bildmarke plus Haarlinie statt Kartenkopf. */}
      <span aria-hidden="true" className="flex items-center gap-3">
        <GoogleG className="h-4 w-4 shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
          Google-Bewertungen
        </span>
        <span className="h-px flex-1 bg-line-strong" />
      </span>

      {/*
        Das Lockup. Ziffer und Sterne stehen auf einer gemeinsamen
        Grundlinie (items-end), damit sie als ein Zeichen gelesen werden und
        nicht als zwei nebeneinander gestellte Elemente.
      */}
      <span aria-hidden="true" className="mt-7 flex items-end gap-5 sm:gap-7">
        <span className="font-display display-xl text-[3.75rem] font-medium text-brand-900 sm:text-[4.5rem] lg:text-[5.5rem]">
          {value}
        </span>
        <span className="pb-2 sm:pb-3">
          <Stars rating={data.rating} />
          <span className="mt-3 block text-sm leading-relaxed text-ink-soft">
            aus <strong className="font-semibold text-brand-900">{data.count} Bewertungen</strong>
          </span>
        </span>
      </span>

      {/*
        Der Markenstrich als Abschluss. Es ist die einzige Stelle im ersten
        Bildschirm, an der die warme Akzentfarbe vorkommt — genau deshalb
        wirkt sie hier als Signatur und nicht als Dekoration.
      */}
      <span aria-hidden="true" className="glanz-divider mt-8 block max-w-[9rem]" />

      <span
        aria-hidden="true"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out group-hover:text-brand-600"
      >
        Profil auf Google ansehen
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
