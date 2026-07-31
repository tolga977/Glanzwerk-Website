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
}: CTASectionProps) {
  return (
    <div
      className="relative overflow-hidden rounded-panel bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 px-6 py-16 text-center shadow-deep ring-1 ring-white/10 sm:px-12 sm:py-20"
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
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/92 via-brand-900/88 to-brand-800/85" />
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
        <p className="mx-auto mt-5 max-w-xl text-brand-200">{subtitle}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={primaryHref}
            variant="primary"
            size="lg"
            className="shadow-float shadow-brand-500/30"
          >
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
