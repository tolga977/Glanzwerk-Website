import FadeIn from "@/components/ui/FadeIn";
import { expectations, expectationIcons } from "@/data/expectations";

/**
 * "Das dürfen Sie von Glanzwerk erwarten" — vier Zusagen.
 *
 * ── Was hier vorher stand ───────────────────────────────────────────────
 * Vier gleich große Karten in einer Viererreihe, jede mit einem Symbol in
 * einem Plättchen mit Farbverlauf, Überschrift und Text; jede zweite Karte
 * war eingefärbt, alle hoben sich beim Überfahren an.
 *
 * Das ist wortwörtlich das Muster, das das Designsystem dieser Website
 * ausschließt — "keine flächendeckenden Kartenraster", "keine generischen
 * Dreier-/Viererreihen aus Icon-Kacheln". Vier Kästen nebeneinander sagen
 * über den Inhalt nichts aus: sie behaupten, die vier Zusagen seien vier
 * Objekte. Es sind vier Sätze.
 *
 * ── Was jetzt hier steht ────────────────────────────────────────────────
 * Ein liniertes Feld: zwei Spalten, waagerechte Linien zwischen den Zeilen,
 * eine senkrechte zwischen den Spalten. Keine Fläche, kein Rand um den
 * Inhalt, kein Schatten, keine Hebung beim Überfahren — es gibt hier nichts
 * anzuklicken, also braucht es auch keine Reaktion darauf.
 *
 * Die abwechselnde Einfärbung ist entfallen. Sie sollte Monotonie brechen,
 * hat aber eine Rangfolge behauptet, die es nicht gibt: die zweite und die
 * vierte Zusage sind nicht wichtiger als die erste und die dritte.
 *
 * Die Überschriften standen in der Display-Serife. Das Designsystem hält
 * Fraunces den Überschriften vor — dies hier sind Listeneinträge. Sie
 * stehen jetzt in Inter, halbfett.
 *
 * Die Symbole bleiben: anders als an anderen Stellen der Website sind sie
 * hier nicht reihum vergeben, sondern gehören inhaltlich zu ihrer Zeile.
 */
export default function ExpectationCards() {
  return (
    <ul className="mt-10 grid border-t border-line-strong sm:grid-cols-2">
      {expectations.map((point, index) => (
        <FadeIn
          key={point.title}
          as="li"
          delay={index * 70}
          className="border-b border-line-strong py-7 sm:px-8 sm:py-8 sm:even:border-l sm:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(even)]:pr-0"
        >
          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-brand-400"
            >
              {expectationIcons[point.icon]}
            </svg>
            <p className="text-base font-semibold text-brand-900">{point.title}</p>
          </div>
          <p className="measure mt-2.5 text-sm leading-relaxed text-ink-soft">{point.description}</p>
        </FadeIn>
      ))}
    </ul>
  );
}
