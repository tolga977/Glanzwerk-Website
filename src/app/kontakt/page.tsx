import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/forms/ContactForm";
import BrandPhoto from "@/components/ui/BrandPhoto";
import EinsatzgebietKarte from "@/components/ui/EinsatzgebietKarte";
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

            {/*
              Nur auf Mobile: Ohne diesen Button ist im ersten Bildschirm
              weder ein CTA noch eine Telefonnummer sichtbar – die
              Kontaktdaten in der rechten Spalte folgen dort erst nach dem
              gesamten Formular. Ab lg steht die Spalte bereits daneben,
              der Button wäre dort redundant.
            */}
            {/*
              Plain <a> statt Button-Komponente: Button rendert interne Links
              immer über next/link, das für tel:-URIs nicht das richtige
              Werkzeug ist (siehe auch OwnerNote.tsx, das aus demselben Grund
              ein rohes <a> für Telefon/E-Mail verwendet).
            */}
            <a
              href={siteConfig.phoneHref}
              className="lift press mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control border-2 border-brand-900 text-base font-semibold text-brand-900 hover:bg-brand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900 lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              Jetzt anrufen: {siteConfig.phone}
            </a>

            <div className="mt-6 rounded-panel border border-line bg-white p-6 shadow-raise sm:p-8">
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
            <div className="mt-6">
              <EinsatzgebietKarte />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
