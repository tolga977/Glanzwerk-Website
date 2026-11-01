import type { ReactNode } from "react";

/**
 * Milchglas-Karte für Inhalte, die auf einem Foto liegen.
 *
 * Halbtransparentes Weiß mit Hintergrundunschärfe: das Motiv dahinter scheint
 * als Licht und Farbe durch, bleibt aber nicht lesbar genug, um den Text zu
 * stören. Darum wirkt die Karte als Teil des Fotos und nicht wie ein darauf
 * gelegtes Kästchen.
 *
 * Kontrast: Die Deckung (90 % ohne, 78 % mit Unschärfe-Unterstützung, ab 640 px 68 %) ist gegen
 * ein helles Foto gerechnet — dunkler Text auf dieser Fläche bleibt über AA.
 * Nur auf Fotos verwenden; auf einfarbigem Grund wäre es eine blasse Karte.
 */
export default function GlassCard({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  /**
   * "light": helles Milchglas auf einem hellen Foto.
   * "dark": dunkles Milchglas auf einer nachtblauen Fläche mit eingefärbtem
   * Foto — Weiß mit nur 9 % Deckung, feiner heller Rand, Text in Weiß.
   * Wird in den Markenflächen der Seite verwendet.
   */
  tone?: "light" | "dark";
}) {
  const surface =
    tone === "dark"
      ? "bg-brand-900/70 ring-1 ring-white/20 shadow-raise supports-[backdrop-filter]:bg-white/[0.09] supports-[backdrop-filter]:backdrop-blur-md"
      : "bg-white/90 shadow-raise ring-1 ring-white/70 supports-[backdrop-filter]:bg-white/78 supports-[backdrop-filter]:backdrop-blur-lg sm:supports-[backdrop-filter]:bg-white/68";
  return (
    <div className={`rounded-card ${surface} ${className}`}>
      {children}
    </div>
  );
}
