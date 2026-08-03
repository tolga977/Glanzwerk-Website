import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import BrandPhoto from "@/components/ui/BrandPhoto";
import CTASection from "@/components/ui/CTASection";
import GoogleRating from "@/components/ui/GoogleRating";
import JsonLd from "@/components/seo/JsonLd";
import { photos } from "@/data/photos";
import { googleBusiness } from "@/data/googleBusiness";
import { getGoogleRating } from "@/lib/googleRating";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, professionalServiceSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/bewertungen"];

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description: "Erfahrungen und Bewertungen von Glanzwerk Reinigungsservice Berlin.",
  path: "/bewertungen",
});

export default async function BewertungenPage() {
  /*
   * Dieselbe Datenquelle wie auf der Startseite (Google Places, sechsstündige
   * Auffrischung, geprüfter Fallback). Vorher stand hier eine leere Liste mit
   * dem Hinweis "sobald sie vorliegen" — während die Startseite gleichzeitig
   * 5,0 aus 7 Bewertungen zeigte. Wer von dort hierher klickte, las das
   * Gegenteil dessen, was er gerade gesehen hatte.
   */
  const googleRating = await getGoogleRating();

  return (
    <>
      <Breadcrumb items={[{ label: "Bewertungen" }]} />
      <JsonLd
        data={webPageSchema({
          name: heading.metaTitle ?? heading.h1,
          description: "Erfahrungen und Bewertungen von Glanzwerk Reinigungsservice Berlin.",
          path: "/bewertungen",
        })}
      />
      <JsonLd
        data={professionalServiceSchema({
          aggregateRating: { ratingValue: googleRating.rating, reviewCount: googleRating.count },
        })}
      />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              Bewertungen
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Rückmeldungen unserer Kundinnen und Kunden sammeln wir dort, wo sie
              nachprüfbar sind: im Google-Unternehmensprofil. Der Stand unten wird
              automatisch aktualisiert.
            </p>
          </div>
          <BrandPhoto photo={photos.cleaningEquipment} priority className="shadow-deep" />
        </div>

        {/*
          Dieselbe typografische Auszeichnung wie im Beweisband der Startseite —
          kein zweiter Darstellungsstil für dieselbe Aussage.
        */}
        <div className="mt-14 border-t border-line pt-12">
          <div className="max-w-xl">
            <GoogleRating data={googleRating} />
          </div>
          <p className="measure mt-10 text-sm leading-relaxed text-ink-soft">
            Die einzelnen Rezensionstexte lesen Sie direkt bei Google — dort sind sie
            an ein Konto gebunden und damit überprüfbar.{" "}
            <a
              href={googleBusiness.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-500 underline decoration-brand-200 underline-offset-4 transition-colors duration-200 ease-out hover:text-brand-600 hover:decoration-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Zum Google-Profil
            </a>
          </p>
        </div>
      </Section>

      <Section background="muted">
        <CTASection title={heading.ctaHeading} />
      </Section>
    </>
  );
}
