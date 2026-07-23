import FadeIn from "@/components/ui/FadeIn";
import type { ReactNode } from "react";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, passed straight through to FadeIn. */
  delay?: number;
}

/**
 * Premium-Designstudie: vereinheitlicht die zuvor als Copy-Paste-String
 * wiederholte Karten-Optik (rounded-2xl border ... shadow-[...]) auf den
 * seiten-lokalen "Karten" von Über-uns/Umwelt/Unterhaltsreinigung/Glas-Fenster.
 * Übernimmt ServiceCard.tsx's bereits bewährte Hover-Physik (Anheben, Border-
 * und Schatten-Verstärkung) für konsistentes Erscheinungsbild, ohne
 * ServiceCard.tsx selbst (sitewide, 11 Dateien) anzufassen.
 */
export default function PremiumCard({ children, className = "", delay = 0 }: PremiumCardProps) {
  return (
    <FadeIn
      delay={delay}
      className={`group rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_3px_rgb(7_26_58/0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_20px_40px_-12px_rgb(7_26_58/0.12)] ${className}`}
    >
      {children}
    </FadeIn>
  );
}
