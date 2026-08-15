import Image from "next/image";
import Button from "@/components/ui/Button";
import GlanzMark from "@/components/ui/GlanzMark";
import { siteConfig } from "@/data/site";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Optional zweiter CTA (z. B. "3 Monate flexibel testen"), ersetzt die Telefonnummer als zweite Option. */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Optionales Hintergrundbild statt des reinen Verlaufs, für Abschluss-CTAs mit atmosphärischem Bezug. */
  backgroundImageUrl?: string;
  /** Wie backgroundImageUrl, aber über next/image ausgeliefert (Optimierung/Lazy Loading) – für große lokale Bilddateien. */
  backgroundImage?: { src: string; alt: string };
  /**
   * Farbrolle der Grundfläche. Vorgabe "brand" (Navy) bleibt für alle
   * bestehenden Einsatzstellen unverändert. "eco" ist ausschließlich für
   * "Umwelt & Verantwortung" gedacht — dieselbe Bauform, dieselbe
   * Konversionslogik, nur der Verlauf und die Bildabdunkelung laufen im
   * entsättigten Waldgrün der Seite statt im Markenblau.
   */
  tone?: "brand" | "eco";
}

export default function CTASection({
  title = "Bereit für ein unverbindliches Angebot?",
  subtitle = "Fordern Sie in wenigen Minuten ein individuelles Angebot für Ihr Objekt an.",
  primaryLabel = "Angebot anfragen",
  primaryHref = "/kontakt",
  secondaryLabel,
  secondaryHref,
  backgroundImageUrl,
  backgroundImage,
  tone = "brand",
}: CTASectionProps) {
  const eco = tone === "eco";
  return (
    <div
      className={`relative overflow-hidden rounded-panel px-6 py-16 text-center shadow-deep ring-1 ring-white/10 sm:px-12 sm:py-20 ${
        eco
          ? "bg-gradient-to-br from-eco-800 via-eco-800 to-eco-600"
          : "bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800"
      }`}
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `linear-gradient(to bottom right, rgb(11 30 61 / 0.92), rgb(11 30 61 / 0.88)), url(${backgroundImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          {/*
            Deckung deutlich niedriger als bei "brand" (55–70 % statt
            85–92 %): das Foto soll hier sichtbar Grün tragen, nicht als
            blosse Textur unter einer fast blickdichten Farbe verschwinden.
          */}
          <div
            className={`absolute inset-0 ${
              eco
                ? "bg-gradient-to-br from-eco-800/78 via-eco-800/62 to-eco-600/55"
                : "bg-gradient-to-br from-brand-900/92 via-brand-900/88 to-brand-800/85"
            }`}
          />
        </>
      )}
      {/* Lichtkante statt der früheren großflächigen Blur-Kreise: markiert die
          Oberkante der Fläche, ohne Nebel auf den Text zu legen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <GlanzMark className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 opacity-[0.10]" />
      <div className="relative">
        <h2 className="font-display text-3xl font-medium text-white sm:text-4xl">{title}</h2>
        <div className="glanz-divider mx-auto mt-5 max-w-[140px]" />
        <p className={`mx-auto mt-5 max-w-xl ${eco ? "text-eco-100" : "text-brand-200"}`}>{subtitle}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/*
            Der zusätzliche `shadow-brand-500/30`-Glow ist entfernt
            (Slop-Detect: gesättigter farbiger Box-Shadow) — er widersprach
            der eigenen Schatten-Doktrin des Systems ("Kein blauer Glow,
            keine diffusen SaaS-Schatten", siehe globals.css). Ohne eigenes
            `className` trägt der Button wieder ausschließlich den neutralen
            `shadow-float`-Token, den die `primary`-Variante ohnehin schon
            mitbringt — Größe, Farbe, Text, Funktion und
            Hover/Active/Focus-Zustände bleiben unverändert.
          */}
          <Button href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          <Button
            href={secondaryLabel ? secondaryHref! : siteConfig.phoneHref}
            variant="onMedia"
            size="lg"
          >
            {secondaryLabel ?? siteConfig.phone}
          </Button>
        </div>
      </div>
    </div>
  );
}
