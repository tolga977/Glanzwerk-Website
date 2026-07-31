import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/forms/ContactForm";
import BrandPhoto from "@/components/ui/BrandPhoto";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";

const heading = seoHeadings["/kontakt"];

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description:
    "Kontaktieren Sie Glanzwerk Reinigungsservice Berlin für ein individuelles Angebot zur Gebäudereinigung.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Kontakt" }]} />
      <JsonLd
        data={webPageSchema({
          name: "Kontakt",
          description:
            "Kontaktieren Sie Glanzwerk Reinigungsservice Berlin für ein individuelles Angebot zur Gebäudereinigung.",
          path: "/kontakt",
          type: "ContactPage",
        })}
      />

      <Section background="white" className="pt-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">
              Beschreiben Sie kurz Ihr Objekt – wir melden uns zeitnah mit
              einem individuellen Angebot für Ihre Gebäudereinigung.
            </p>
            <p className="mt-3 max-w-xl text-sm text-ink-soft">
              Ihre Anfrage ist unverbindlich und noch keine Buchung. Nach dem
              Absenden prüfen wir Ihre Angaben und melden uns mit einem
              individuellen Angebot bei Ihnen zurück.
            </p>
            <div className="mt-8 rounded-panel border border-line bg-white p-6 shadow-raise sm:p-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2">
            <BrandPhoto
              photo={photos.businessHandshake}
              priority
              aspect="aspect-[4/3]"
              className="mb-6 shadow-deep"
            />
            <div className="rounded-panel bg-brand-900 p-8 text-white">
              <h2 className="text-lg font-semibold">{heading.sectionHeadings[0]}</h2>
              <ul className="mt-5 space-y-4 text-sm text-brand-100">
                <li>
                  <span className="block text-xs uppercase tracking-wide text-brand-300">
                    Telefon
                  </span>
                  <a href={siteConfig.phoneHref} className="text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-brand-300">
                    E-Mail
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-brand-300">
                    Adresse
                  </span>
                  <span className="text-base">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.zip} {siteConfig.address.city}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
