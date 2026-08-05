import { googleBusiness } from "@/data/googleBusiness";
import type { GoogleReview } from "@/lib/googleRating";

/**
 * Bewertungsband direkt unter dem Hero.
 *
 * ── Was hier bewusst NICHT passiert ─────────────────────────────────────
 * Es gibt in diesem Projekt keine hinterlegten Bewertungstexte. Die Texte
 * kommen ausschließlich aus dem Google-Unternehmensprofil (Places API,
 * siehe `lib/googleRating.ts`). Liegt keine Rezension vor, rendert diese
 * Komponente `null` — es gibt keinen Beispieltext, keinen Platzhalter und
 * keine „typische Kundenstimme". Eine erfundene Bewertung wäre auf einer
 * Seite, die mit Verlässlichkeit wirbt, der teuerste denkbare Fehler.
 *
 * ── Warum ein Band und keine Kartenwand ─────────────────────────────────
 * Drei nebeneinander gestellte Zitatkarten sind die Standardlösung jeder
 * Vorlage. Ein ruhig laufendes Band liest sich dagegen als redaktionelle
 * Zeile: es zeigt, dass es mehr gibt als das, was gerade zu sehen ist, ohne
 * dafür Fläche zu verbrauchen — und es hat keine Pfeile, keine Punkte und
 * keinen Zustand, den man bedienen müsste.
 *
 * ── Wie der Endloslauf funktioniert ─────────────────────────────────────
 * Die Spur enthält die Liste zweimal und verschiebt sich um genau die
 * Hälfte (siehe `.marquee` in globals.css). Die zweite Hälfte ist eine rein
 * technische Kopie und trägt `aria-hidden`; Screenreader lesen die
 * Bewertungen also genau einmal.
 *
 * Bewegung nur auf Zeigergeräten, dort pausiert sie bei Hover und Fokus.
 * Auf Touch und unter reduzierter Bewegung steht das Band still und lässt
 * sich mit dem Finger schieben.
 *
 * Die Laufzeit wächst mit der Anzahl der Karten, damit die Lesegeschwindig-
 * keit gleich bleibt: bei zwei Bewertungen läuft dieselbe Strecke sonst
 * doppelt so schnell vorbei wie bei fünf.
 */

const STAR_PATH =
  "M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27l7.1-1.01L12 2z";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
          <path d={STAR_PATH} fill={i < Math.round(rating) ? "#f5a623" : "#d2d8e1"} />
        </svg>
      ))}
    </span>
  );
}

function ReviewItem({ review }: { review: GoogleReview }) {
  return (
    /*
      Keine Karte mit Rand und Schatten, sondern eine Spalte mit einer
      Haarlinie links — dieselbe Sprache wie im übrigen Seitenaufbau.

      Die Breite ist nicht fest, sondern liegt zwischen 18 und 28 rem. Damit
      bekommt jede Bewertung die Breite, die ihr Text braucht, und das Band
      bildet von selbst einen unregelmäßigen Rhythmus statt einer Reihe
      identisch geschnittener Klone.
    */
    <figure className="flex min-w-[18rem] max-w-[28rem] shrink-0 flex-col border-l border-line-strong px-7 py-1">
      <Stars rating={review.rating} />
      <blockquote className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink">
        {review.text}
      </blockquote>
      <figcaption className="mt-3 text-sm text-ink-soft">
        <span className="font-semibold text-brand-900">{review.author}</span>
        {review.publishedLabel && <span> · {review.publishedLabel}</span>}
      </figcaption>
    </figure>
  );
}

export default function ReviewMarquee({ reviews }: { reviews: GoogleReview[] }) {
  if (reviews.length === 0) return null;

  /*
    Laufzeit je Bewertung von 18 auf 34 Sekunden angehoben.

    Bei 18 s wanderte eine Bewertung in rund neun Sekunden durch das Sichtfeld
    — lesbar, aber spürbar in Bewegung. Ein Band, dessen Tempo man bemerkt,
    verlangt Aufmerksamkeit; genau das soll es an dieser Stelle nicht. Bei
    34 s liegt die Geschwindigkeit unterhalb der Schwelle, ab der Bewegung
    zieht: das Band wirkt eher wie eine langsam atmende Fläche als wie ein
    laufender Text.

    Der Mindestwert steigt entsprechend mit, damit auch zwei Bewertungen
    nicht schneller vorbeiziehen als fünf.
  */
  const durationSeconds = Math.max(72, reviews.length * 34);

  return (
    /*
      ── Eigene Fläche statt Weiß ────────────────────────────────────────
      Das Band lag auf reinem Weiß zwischen dem dunklen Hero und dem weißen
      Inhaber-Kapitel darunter — es hatte damit keine eigene Fläche, sondern
      war der erste helle Streifen eines langen hellen Blocks.

      Jetzt trägt es eine sehr flache kühle Tönung (brand-50 nach Weiß) plus
      eine Lichtkante oben. Die Tönung ist stark genug, dass die Naht zum
      weißen Kapitel darunter sichtbar bleibt, und schwach genug, dass die
      Fläche nicht als Farbblock auftritt. Beide Töne stammen aus der
      vorhandenen Palette.
    */
    <section
      aria-label="Bewertungen aus dem Google-Unternehmensprofil"
      className="relative border-b border-line bg-gradient-to-b from-brand-50 via-brand-50/70 to-white py-10 sm:py-12"
    >
      {/* Lichtkante: markiert den Beginn der Fläche unter dem dunklen Hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgb(47 166 206 / 0.35), transparent)",
        }}
      />
      <div className="container-page flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
          <span aria-hidden="true" className="brand-tick text-brand-400" />
          Was Kunden bei Google schreiben
        </p>
        <a
          href={googleBusiness.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Alle Bewertungen bei Google
        </a>
      </div>

      <div
        className="marquee marquee-fade mt-8"
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        <div className="marquee-track">
          {/* Original — dies ist die Fassung, die vorgelesen wird. */}
          <div className="flex shrink-0">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
          {/*
            Technische Kopie für den nahtlosen Umlauf. `aria-hidden` und
            `inert`: der Inhalt wird weder vorgelesen noch fokussierbar, es
            entsteht also keine Dopplung und keine Tabfalle.
          */}
          <div className="flex shrink-0" aria-hidden="true" inert>
            {reviews.map((review) => (
              <ReviewItem key={`${review.id}-copy`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
