import type { ReactNode } from "react";

/**
 * Färbt eine konfigurierte Teilzeichenkette (typischerweise Leistung oder
 * Ort) innerhalb einer H1 farblich ein. Kommt die Teilzeichenkette nicht
 * vor, wird die H1 unverändert als Klartext zurückgegeben.
 */
export function renderHighlightedH1(
  h1: string,
  highlight: string | undefined,
  colorClass = "text-brand-600",
): ReactNode {
  if (!highlight) return h1;
  const idx = h1.indexOf(highlight);
  if (idx === -1) return h1;
  return (
    <>
      {h1.slice(0, idx)}
      <span className={colorClass}>{highlight}</span>
      {h1.slice(idx + highlight.length)}
    </>
  );
}

/** Hebt das Wort "Glanzwerk" innerhalb einer H2/H3 farblich hervor, falls vorhanden (wiederkehrendes Markenmotiv). */
export function renderGlanzwerkHeading(text: string, colorClass = "text-brand-600"): ReactNode {
  const idx = text.indexOf("Glanzwerk");
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className={colorClass}>Glanzwerk</span>
      {text.slice(idx + "Glanzwerk".length)}
    </>
  );
}
