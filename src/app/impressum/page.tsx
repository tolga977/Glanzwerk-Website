import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/data/site";
import { owner } from "@/data/owner";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Impressum",
  description: `Impressum von ${siteConfig.name}.`,
  path: "/impressum",
  noIndex: true,
});

export default function ImpressumPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Impressum" }]} />

      <Section background="white" className="pt-12">
        <div className="prose-sm max-w-2xl text-ink-soft">
          <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900">
            Impressum
          </h1>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            Angaben gemäß § 5 DDG
          </h2>
          <p className="mt-2">
            {siteConfig.name}
            <br />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.zip} {siteConfig.address.city}
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">Kontakt</h2>
          <p className="mt-2">
            Telefon: {siteConfig.phone}
            <br />
            E-Mail: {siteConfig.email}
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            Vertretungsberechtigte Person
          </h2>
          <p className="mt-2">
            {owner.name}, {owner.role}
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            Streitschlichtung
          </h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit. Wir sind nicht verpflichtet
            und nicht bereit, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            Haftung für Inhalte
          </h2>
          <p className="mt-2">
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen.
          </p>
        </div>
      </Section>
    </>
  );
}
