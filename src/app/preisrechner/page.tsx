import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import PriceCalculator from "@/components/calculator/PriceCalculator";
import { buildMetadata } from "@/lib/metadata";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/preisrechner"];

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description:
    "Berechnen Sie eine unverbindliche Richtpreis-Schätzung für die Gebäudereinigung Ihres Objekts.",
  path: "/preisrechner",
});

export default function PreisrechnerPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Preisrechner" }]} />

      <Section background="white" className="pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
            {renderHighlightedH1(heading.h1, heading.h1Highlight)}
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Erhalten Sie in wenigen Schritten eine erste, unverbindliche
            Richtpreis-Schätzung für die Reinigung Ihres Objekts.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-panel border border-line bg-white p-6 shadow-raise sm:p-8">
          <PriceCalculator />
        </div>
      </Section>
    </>
  );
}
