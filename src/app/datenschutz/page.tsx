import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${siteConfig.name}.`,
  path: "/datenschutz",
  noIndex: true,
});

export default function DatenschutzPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Datenschutz" }]} />

      <Section background="white" className="pt-12">
        <div className="max-w-2xl text-ink-soft">
          <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900">
            Datenschutzerklärung
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            Hinweis: Dieser Text ist eine allgemeine Vorlage und ersetzt
            keine rechtliche Prüfung. Vor Veröffentlichung sollte er durch
            eine fachkundige Stelle geprüft und an die tatsächlich
            eingesetzten Dienste angepasst werden.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            1. Verantwortlicher
          </h2>
          <p className="mt-2">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            {siteConfig.name}
            <br />
            {siteConfig.address.street}, {siteConfig.address.zip}{" "}
            {siteConfig.address.city}
            <br />
            E-Mail: {siteConfig.email}
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            2. Erhebung und Speicherung personenbezogener Daten
          </h2>
          <p className="mt-2">
            Beim Besuch dieser Website werden durch den Hosting-Anbieter
            automatisch Informationen in Server-Logfiles erfasst (z. B.
            IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
            verwendeter Browser). Diese Daten sind nicht bestimmten Personen
            zuordenbar und werden ausschließlich zur Sicherstellung eines
            störungsfreien Betriebs sowie zur Verbesserung des Angebots
            ausgewertet.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            3. Kontaktformular und Preisrechner
          </h2>
          <p className="mt-2">
            Wenn Sie uns über das Kontaktformular oder den Preisrechner
            Anfragen zukommen lassen, werden Ihre Angaben zur Bearbeitung
            der Anfrage und für den Fall von Anschlussfragen bei uns
            gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
            weiter.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">4. Cookies</h2>
          <p className="mt-2">
            Diese Website verwendet, sofern technisch erforderlich, Cookies
            zur Bereitstellung grundlegender Funktionen. Sollten
            zusätzliche, nicht notwendige Cookies (z. B. für Analyse- oder
            Marketingzwecke) eingesetzt werden, erfolgt dies nur nach
            vorheriger Einwilligung über ein Consent-Tool.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            5. Google Maps
          </h2>
          <p className="mt-2">
            Auf Seiten mit unserem Einsatzgebiet binden wir eine Kartenvorschau ein, die
            zunächst als lokal gespeichertes Bild angezeigt wird – ohne dass dabei bereits eine
            Verbindung zu Google hergestellt wird. Erst wenn Sie aktiv auf &bdquo;Interaktive
            Google-Maps-Karte laden&ldquo; klicken, wird der Kartendienst Google Maps von Google
            Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland) geladen.
          </p>
          <p className="mt-2">
            Mit diesem Klick erteilen Sie Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) zur
            Übertragung Ihrer IP-Adresse sowie weiterer technisch notwendiger Daten an Google.
            Eine Verarbeitung dieser Daten auf Servern in den USA ist dabei nicht auszuschließen.
            Diese Einwilligung können Sie jederzeit für die Zukunft widerrufen, indem Sie die
            Seite neu laden und die Karte nicht erneut aktivieren.
          </p>
          <p className="mt-2">
            Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der
            Datenschutzerklärung von Google:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-500 hover:underline"
            >
              policies.google.com/privacy
            </a>
            .
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            6. Ihre Rechte
          </h2>
          <p className="mt-2">
            Sie haben jederzeit das Recht auf Auskunft über Ihre
            gespeicherten personenbezogenen Daten, deren Herkunft und
            Empfänger sowie den Zweck der Datenverarbeitung sowie ein Recht
            auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu
            sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
            jederzeit über die im Impressum angegebenen Kontaktdaten an uns
            wenden.
          </p>
        </div>
      </Section>
    </>
  );
}
