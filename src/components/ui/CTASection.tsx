import Button from "@/components/ui/Button";
import GlanzMark from "@/components/ui/GlanzMark";
import { siteConfig } from "@/data/site";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export default function CTASection({
  title = "Bereit für ein unverbindliches Angebot?",
  subtitle = "Fordern Sie in wenigen Minuten ein individuelles Angebot für Ihr Objekt an.",
  primaryLabel = "Angebot anfragen",
  primaryHref = "/kontakt",
}: CTASectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 px-6 py-14 text-center shadow-2xl shadow-brand-950/25 sm:px-12 sm:py-16">
      <GlanzMark className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 opacity-30 sm:h-32 sm:w-32" />
      <div className="relative">
        <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">{title}</h2>
        <div className="glanz-divider mx-auto mt-4 max-w-[120px]" />
        <p className="mx-auto mt-4 max-w-xl text-brand-200">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          <Button
            href={siteConfig.phoneHref}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-brand-900"
          >
            {siteConfig.phone}
          </Button>
        </div>
      </div>
    </div>
  );
}
