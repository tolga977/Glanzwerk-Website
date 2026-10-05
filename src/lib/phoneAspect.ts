/**
 * Macht aus einer Seitenverhältnis-Klasse eine telefontaugliche.
 *
 * Ein 4 : 3-Bild ist auf 390 px Breite 270 px hoch — fast ein Drittel des
 * Bildschirms für ein Motiv, das im Text nur begleitet. Unter 640 px werden
 * deshalb alle Bildflächen, die höher als 2 : 1 sind, auf 2 : 1 abgeflacht
 * (358 × 179 px). Ab `sm` gilt unverändert die ursprüngliche Klasse.
 *
 * Nur das erste Verhältnis der Klasse wird ersetzt, damit Angaben wie
 * `aspect-[3/2] lg:aspect-[16/9]` ihre größeren Stufen behalten. Klassen, die
 * schon 2 : 1 oder flacher sind, bleiben unberührt.
 */
export function phoneAspect(aspect: string): string {
  const match = aspect.match(/^aspect-\[(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\]/);
  if (!match) return aspect;
  const ratio = Number(match[1]) / Number(match[2]);
  if (ratio >= 2) return aspect;
  const [token] = match;
  return `aspect-[2/1] sm:${token} ${aspect.slice(token.length).trim()}`.trim();
}
