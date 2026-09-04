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
            2. Hosting und technische Bereitstellung
          </h2>
          <p className="mt-2">
            Diese Website wird technisch über die Plattform des
            Hosting-Anbieters Vercel Inc. bereitgestellt. Beim Aufruf einer
            Seite verarbeitet Vercel im Rahmen der Bereitstellung automatisch
            technische Verbindungsdaten, insbesondere IP-Adresse, Datum und
            Uhrzeit des Zugriffs, die aufgerufene Seite sowie technische
            Browser- und Requestinformationen. Diese Verarbeitung dient
            ausschließlich der sicheren, stabilen und performanten Auslieferung
            der Website und erfolgt unabhängig von unserem eigenen
            Anwendungscode.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist unser berechtigtes Interesse an einer
            funktionsfähigen und sicheren Website (Art. 6 Abs. 1 lit. f
            DSGVO).
          </p>
          <p className="mt-2">
            Vercel Inc. hat ihren Sitz in den USA. Nach den öffentlich
            zugänglichen Angaben von Vercel kann die Verarbeitung auch
            außerhalb der Europäischen Union, unter anderem in den USA,
            stattfinden. Für eine solche Übermittlung in Drittländer gibt
            Vercel den Einsatz anerkannter Transfermechanismen an, unter
            anderem Standardvertragsklauseln der Europäischen Kommission.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            3. Kontaktaufnahme über das Kontaktformular
          </h2>
          <p className="mt-2">
            Wenn Sie über unser Kontaktformular eine Anfrage stellen, erheben
            wir je nach Ihren Angaben: die gewünschte Leistung bzw. eine von
            Ihnen beschriebene sonstige Leistung, Ihren Namen bzw.
            Unternehmensnamen, Ihre E-Mail-Adresse sowie optional Ihre
            Telefonnummer und eine Nachricht. Zusätzlich erfassen wir
            technisch die Seite, von der aus Sie das Formular abgesendet
            haben, zur internen Zuordnung, sowie ein für Sie nicht sichtbares
            Feld, das ausschließlich der Erkennung automatisierter
            Absendungen dient.
          </p>
          <p className="mt-2">
            Diese Angaben verwenden wir ausschließlich zur Bearbeitung und
            Beantwortung Ihrer Anfrage.
          </p>
          <p className="mt-2">
            Die Bestätigung „Ich habe die Datenschutzerklärung zur Kenntnis
            genommen" im Formular ist eine Kenntnisnahme dieser
            Datenschutzerklärung, keine gesonderte Einwilligung in eine
            Datenverarbeitung.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist, soweit Ihre Anfrage auf den Abschluss eines
            Reinigungsvertrags gerichtet ist, Art. 6 Abs. 1 lit. b DSGVO
            (vorvertragliche Maßnahmen). Für Anfragen ohne unmittelbaren
            Vertragsbezug stützen wir die Verarbeitung auf unser berechtigtes
            Interesse an der Bearbeitung eingehender geschäftlicher
            Kommunikation (Art. 6 Abs. 1 lit. f DSGVO).
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            4. Preisrechner
          </h2>
          <p className="mt-2">
            Unser Preisrechner ermittelt anhand Ihrer Angaben (z. B.
            Objektart, Fläche, Bodenart, Anzahl Küchen und Toiletten bzw. bei
            Treppenhausreinigung Wohneinheiten, Etagen und Ausstattung, sowie
            das gewünschte Reinigungsintervall) eine unverbindliche
            Richtpreis-Schätzung. Diese Eingaben und die Berechnung selbst
            finden zunächst ausschließlich in Ihrem Browser statt.
          </p>
          <p className="mt-2">
            Um den berechneten Richtpreis angezeigt zu bekommen, bitten wir
            Sie um Ihren Namen, Ihre E-Mail-Adresse und optional eine
            Telefonnummer. Mit dem Anzeigen des Richtpreises werden diese
            Kontaktangaben zusammen mit den genannten Objektangaben und dem
            berechneten Richtwert an uns übermittelt und lösen eine interne
            Benachrichtigung darüber aus, dass der Preisrechner genutzt wurde.
          </p>
          <p className="mt-2">
            Diese Benachrichtigung ist ausdrücklich noch keine Kontaktanfrage
            und noch keine Anfrage im Sinne einer Angebotsanforderung. Sie
            dient uns ausschließlich zur internen Kenntnisnahme, dass eine
            Richtpreis-Schätzung für ein bestimmtes Objekt erfolgt ist. Erst
            wenn Sie im Anschluss bewusst eine gesonderte Anfrage stellen
            (siehe Abschnitt 3), behandeln wir dies als tatsächliche
            Kontaktaufnahme.
          </p>
          <p className="mt-2">
            Rechtsgrundlage für die Übermittlung der Angaben beim Anzeigen des
            Richtpreises ist unser berechtigtes Interesse an der
            Bereitstellung der von Ihnen angeforderten Preisschätzung und an
            der internen Nachvollziehbarkeit der Nutzung dieser Funktion
            (Art. 6 Abs. 1 lit. f DSGVO).
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            5. Versand über Brevo
          </h2>
          <p className="mt-2">
            Nachrichten aus dem Kontaktformular und dem Preisrechner
            versenden wir technisch über den E-Mail-Dienstleister Brevo.
            Brevo übermittelt dabei ausschließlich die für die jeweilige
            Benachrichtigung erforderlichen Angaben (siehe Abschnitte 3 und 4)
            an unser nachfolgend genanntes Postfach. Brevo wird auf dieser
            Website ausschließlich für den technischen Versand dieser
            einzelnen Nachrichten eingesetzt, nicht als Newsletter- oder
            Marketingplattform; es findet keine automatische Aufnahme in
            Kontakt- oder Verteilerlisten bei Brevo statt.
          </p>
          <p className="mt-2">
            Brevo gibt an, seine Datenbanken auf Servern innerhalb der
            Europäischen Union zu verarbeiten und zu speichern.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist dieselbe wie für die zugrunde liegende
            Kontaktaufnahme bzw. Preisrechner-Nutzung (Abschnitte 3 und 4);
            Brevo handelt hierbei als unser Auftragsverarbeiter.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            6. Zustellung an unser E-Mail-Postfach bei IONOS
          </h2>
          <p className="mt-2">
            Die über Brevo versendeten Nachrichten gehen an unsere
            geschäftliche E-Mail-Adresse {siteConfig.email}, die bei IONOS
            betrieben wird. Dort werden sie im gewöhnlichen Geschäftsbetrieb
            wie eingehende geschäftliche E-Mails behandelt und bearbeitet.
            IONOS ist in diesem Zusammenhang ausschließlich unser
            E-Mail-Postfach-Anbieter, nicht der Hosting-Anbieter dieser
            Website.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            7. Google-Bewertungen auf dieser Website
          </h2>
          <p className="mt-2">
            Wir zeigen auf dieser Website Bewertungsdaten aus unserem
            Google-Unternehmensprofil an (Sternebewertung, Anzahl sowie
            Texte einzelner Rezensionen). Diese Daten rufen wir serverseitig
            über die Google Places API ab; Ihr Browser stellt dafür keine
            eigene Verbindung zu Google her und lädt kein
            Google-Bewertungs-Widget. Die Anzeige besteht aus gewöhnlichem,
            von uns selbst erzeugtem HTML.
          </p>
          <p className="mt-2">
            Beim serverseitigen Abruf erhält Google technische Informationen
            der Serveranfrage; Ihre eigene IP-Adresse wird dabei nach unserem
            aktuellen technischen Aufbau nicht an Google übermittelt.
            Externe Links zu unserem Google-Unternehmensprofil öffnen erst
            nach Ihrem Klick eine neue Seite bei Google; beim bloßen Anzeigen
            dieser Website werden dadurch keine Daten übertragen.
          </p>
          <p className="mt-2">
            Rechtsgrundlage für die Anzeige ist unser berechtigtes Interesse
            an einer transparenten Darstellung vorhandener Kundenbewertungen
            (Art. 6 Abs. 1 lit. f DSGVO).
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            8. Google Maps
          </h2>
          <p className="mt-2">
            Auf Seiten mit unserem Einsatzgebiet binden wir eine
            Kartenvorschau ein, die zunächst als lokal gespeichertes Bild
            angezeigt wird – ohne dass dabei eine Verbindung zu Google
            hergestellt wird. Erst wenn Sie aktiv auf „Interaktive
            Google-Maps-Karte laden" klicken, wird der Kartendienst Google
            Maps von Google Ireland Limited (Gordon House, Barrow Street,
            Dublin 4, Irland) geladen und eine direkte Verbindung Ihres
            Browsers zu Google hergestellt.
          </p>
          <p className="mt-2">
            Dabei können insbesondere Ihre IP-Adresse und weitere technische
            Requestinformationen an Google übermittelt und dort verarbeitet
            werden; eine Verarbeitung auf Servern außerhalb der Europäischen
            Union ist dabei nicht auszuschließen. Es gelten die
            Nutzungsbedingungen und Datenschutzhinweise von Google für die
            Google Maps Platform.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist unser berechtigtes Interesse an einer
            anschaulichen Darstellung unseres Einsatzgebiets (Art. 6 Abs. 1
            lit. f DSGVO). Durch Ihren aktiven Klick entscheiden Sie
            zusätzlich selbst, ob diese Verbindung überhaupt zustande kommt.
            Möchten Sie die Verbindung nicht mehr bestehen lassen, laden Sie
            die Seite einfach neu und aktivieren die Karte nicht erneut.
          </p>
          <p className="mt-2">
            Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in
            der Datenschutzerklärung von Google:{" "}
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
            9. Cookies und lokale Speicherung
          </h2>
          <p className="mt-2">
            Diese Website setzt selbst keine Cookies und speichert keine
            Daten in Local Storage, Session Storage oder vergleichbaren
            Browser-Speichern. Nach Aktivierung eingebetteter externer
            Inhalte (siehe Abschnitt 8) können diese eigene Technologien des
            jeweiligen Anbieters einsetzen; das liegt außerhalb unseres
            eigenen Anwendungscodes und ist im jeweiligen Abschnitt
            beschrieben.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            10. Schriftarten
          </h2>
          <p className="mt-2">
            Die auf dieser Website verwendete Schriftart wird beim Bau der
            Website eingebunden und von unserem eigenen Server ausgeliefert.
            Beim Aufruf dieser Website findet dafür keine Verbindung Ihres
            Browsers zu Google-Schriftservern statt.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            11. Bilder und Videos
          </h2>
          <p className="mt-2">
            Videos auf dieser Website liegen als Dateien im Projekt und
            werden von unserem eigenen Server ausgeliefert. Fotografien
            binden wir über eine serverseitige Bildoptimierung ein, die die
            Bilder verarbeitet und über unsere eigene Domain ausliefert;
            auch hierfür stellt Ihr Browser keine eigene Verbindung zur
            ursprünglichen Bildquelle her. Profilbilder aus
            Google-Rezensionen (siehe Abschnitt 7) werden auf dieselbe Weise
            über unsere eigene Domain ausgeliefert.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            12. Speicherdauer
          </h2>
          <p className="mt-2">
            Wir verarbeiten die im Rahmen von Kontaktaufnahme und
            Preisrechner-Nutzung erhobenen Daten so lange, wie dies zur
            Bearbeitung des jeweiligen Vorgangs und einer sich daraus
            möglicherweise ergebenden Geschäftsbeziehung erforderlich ist.
            Danach werden die Daten gelöscht, soweit dem keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-900">
            13. Ihre Rechte
          </h2>
          <p className="mt-2">
            Ihnen stehen nach der DSGVO grundsätzlich folgende Rechte zu:
            Auskunft über die von uns verarbeiteten personenbezogenen Daten,
            Berichtigung unrichtiger Daten, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen eine
            auf Art. 6 Abs. 1 lit. f DSGVO gestützte Verarbeitung. Sollte
            eine Verarbeitung ausnahmsweise auf einer Einwilligung beruhen,
            können Sie diese jederzeit mit Wirkung für die Zukunft
            widerrufen.
          </p>
          <p className="mt-2">
            Zur Ausübung dieser Rechte können Sie sich jederzeit über die im
            Impressum genannten Kontaktdaten an uns wenden.
          </p>
          <p className="mt-2">
            Daneben steht Ihnen ein Beschwerderecht bei einer
            Datenschutzaufsichtsbehörde zu. Für uns als in Berlin ansässiges
            Unternehmen ist dies regelmäßig die Berliner Beauftragte für
            Datenschutz und Informationsfreiheit.
          </p>
        </div>
      </Section>
    </>
  );
}
