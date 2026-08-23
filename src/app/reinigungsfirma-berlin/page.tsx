import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section, { SectionHeading } from "@/components/ui/Section";
import ProcessSteps from "@/components/ui/ProcessSteps";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import BrandPhoto from "@/components/ui/BrandPhoto";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { seoHeadings } from "@/data/seoHeadings";
import { renderHighlightedH1 } from "@/lib/renderHeading";
import Button from "@/components/ui/Button";

const heading = seoHeadings["/reinigungsfirma-berlin"];

const description =
  "Worauf Sie bei der Wahl einer Reinigungsfirma in Berlin achten sollten, welches Leistungsportfolio Glanzwerk anbietet und wie die Zusammenarbeit abläuft.";

export const metadata: Metadata = buildMetadata({
  title: heading.metaTitle ?? heading.h1,
  description,
  path: "/reinigungsfirma-berlin",
});

/**
 * Kompakte Fassung der Auswahlkriterien: je Kriterium ein Satz statt eines
 * kleinen Absatzes. Die ausführliche Fassung mit Begründung steht im
 * verlinkten Wissen-Artikel — zwei Volltexte zum selben Kriterium auf zwei
 * Seiten wären eine Dopplung, kein Mehrwert (Audit-Befund K2/P1-5).
 */
const selectionCriteria = [
  {
    title: "Fester Ansprechpartner",
    description: "Eine Kontaktperson kennt Ihr Objekt, statt Sie bei jeder Frage neu zu vermitteln.",
  },
  {
    title: "Nachvollziehbares Angebot",
    description: "Fläche, Leistungsumfang und Rhythmus stehen konkret im Angebot statt in einer pauschalen Summe.",
  },
  {
    title: "Erfahrung mit vergleichbaren Objekten",
    description: "Eine Praxis braucht andere Antworten als ein Autohaus oder eine Kanzlei.",
  },
  {
    title: "Flexible Reinigungszeiten",
    description: "Der Termin richtet sich nach Ihrem Betrieb, nicht umgekehrt.",
  },
  {
    title: "Klare Vertragsbedingungen",
    description: "Nachvollziehbare Kündigungsfristen statt langer, starrer Mindestlaufzeiten.",
  },
  {
    title: "Versicherungsschutz",
    description: "Eine Betriebshaftpflichtversicherung sollte selbstverständlich sein, nicht erst auf Nachfrage.",
  },
];

/**
 * Ablauf aus Sicht einer Firma, die gerade einen Anbieter sucht — bewusst
 * anders gerahmt als die Ablaufschritte auf den Leistungsseiten und der
 * Startseite (dort geht es um EINE konkrete Reinigung, hier um Teamzuordnung
 * und Leistungskombination als Auswahlkriterium).
 */
const workingSteps = [
  {
    title: "Bedarf schildern",
    description:
      "Sie beschreiben Objektart, Fläche und gewünschte Leistungen – telefonisch, über das Kontaktformular oder den Preisrechner.",
  },
  {
    title: "Leistungen zusammenstellen",
    description:
      "Wir prüfen, welche Reinigungsleistungen sich sinnvoll kombinieren lassen, etwa Gebäude-, Glas- oder Treppenhausreinigung in einem gemeinsamen Vertrag.",
  },
  {
    title: "Team und Ansprechpartner festlegen",
    description: "Sie erfahren vor Vertragsbeginn, wer bei Ihnen reinigt und wer bei Rückfragen zuständig ist.",
  },
  {
    title: "Start oder erst testen",
    description:
      "Die Reinigung beginnt zum vereinbarten Termin – auf Wunsch zunächst im Rahmen einer dreimonatigen Testphase.",
  },
];

const faqItems = [
  {
    question: "Was unterscheidet eine gute Reinigungsfirma von einem besonders günstigen Angebot?",
    answer:
      "Der günstigste Stundenpreis sagt wenig über Zuverlässigkeit, feste Ansprechpartner oder tatsächliche Reinigungsqualität aus. Ein nachvollziehbares Angebot mit klarem Leistungsumfang ist meist aussagekräftiger als der reine Preis pro Stunde.",
  },
  {
    question: "Arbeitet Glanzwerk mit festen Mitarbeitenden oder wechselndem Personal?",
    answer:
      "Wir setzen auf feste Reinigungsteams pro Objekt, damit Sie wissen, wer bei Ihnen reinigt, statt ständig wechselndes Personal zu erleben.",
  },
  {
    question: "Ist Glanzwerk auch für kleinere Objekte die richtige Reinigungsfirma?",
    answer:
      "Ja, wir betreuen sowohl kleinere Büros und Praxen als auch größere Gewerbeobjekte – der Leistungsumfang wird individuell auf die Objektgröße abgestimmt.",
  },
  {
    question: "Kann ich mehrere Leistungen bei Glanzwerk kombinieren?",
    answer:
      "Ja. Viele Kunden verbinden die laufende Gebäude- oder Unterhaltsreinigung mit Glas-, Treppenhaus- oder Grundreinigung. Die Kombination wird gemeinsam im Angebot festgelegt.",
  },
  {
    question: "Muss ich mich langfristig an Glanzwerk binden?",
    answer:
      "Reguläre Verträge lassen sich kündigen. Wer zunächst prüfen möchte, ob Zusammenarbeit und Reinigungsqualität passen, kann stattdessen die dreimonatige Testphase ohne automatische Verlängerung nutzen.",
    relatedLink: { label: "Zur dreimonatigen Testphase", href: "/3-monate-testen" },
  },
  {
    question: "Wie lange dauert es bis zur ersten Rückmeldung?",
    answer:
      "Innerhalb der Geschäftszeiten antworten wir in der Regel innerhalb von zwei Stunden auf eine neue Anfrage.",
  },
  {
    question: "Was passiert, wenn ich mit der Reinigung einmal nicht zufrieden bin?",
    answer:
      "Melden Sie den Mangel innerhalb von 24 Stunden nach dem Termin bei Ihrem festen Ansprechpartner. Wir prüfen die Beanstandung und bessern bei berechtigten Fällen in der Regel kostenlos nach.",
  },
  {
    question: "In welchen Teilen Berlins ist Glanzwerk als Reinigungsfirma tätig?",
    answer: "Wir sind als Reinigungsfirma in allen zwölf Berliner Bezirken im Einsatz.",
    relatedLink: { label: "Alle Standorte ansehen", href: "/standorte" },
  },
];

export default function ReinigungsfirmaBerlinPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Reinigungsfirma Berlin" }]} />
      <JsonLd
        data={webPageSchema({
          name: "Reinigungsfirma Berlin für Gewerbekunden",
          description,
          path: "/reinigungsfirma-berlin",
        })}
      />

      <Section background="white" className="pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
              {renderHighlightedH1(heading.h1, heading.h1Highlight)}
            </h1>
            <p className="mt-4 text-lg text-ink-soft">
              Bei der Suche nach einer Reinigungsfirma in Berlin stehen
              Unternehmen meist vor einer unübersichtlichen Auswahl. Diese
              Seite zeigt, worauf es bei der Wahl eines
              Reinigungsdienstleisters ankommt – und wie Glanzwerk als
              Reinigungsfirma für Gewerbekunden arbeitet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/preisrechner">
              Preis berechnen
            </Button>
              <Button href="/kontakt" variant="outline">
              Angebot anfragen
            </Button>
            </div>
          </div>
          <BrandPhoto photo={photos.windowCleaning} priority className="shadow-deep" />
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading eyebrow="Eigenes Personal oder Dienstleister" title={heading.sectionHeadings[0]} />
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Eigenes Reinigungspersonal bedeutet für ein Unternehmen eine reguläre Anstellung, eine
            Regelung für Urlaub und Krankheit sowie die eigene Beschaffung von Reinigungsmitteln und
            Geräten. Eine Reinigungsfirma übernimmt das als Dienstleistung: Vertretung im Team ist
            geregelt, die Betriebshaftpflichtversicherung deckt Schäden im Rahmen der vereinbarten
            Arbeiten ab, und Material sowie Geräte gehören zur Leistung.
          </p>
          <p>
            Für Unternehmen mit mehreren Reinigungsbedarfen – etwa Büroflächen und zusätzlich ein
            Treppenhaus oder Schaufenster – kommt hinzu, dass eine Reinigungsfirma mehrere Leistungen
            unter einem Vertrag bündeln kann, statt mehrere Einzelpersonen oder Kleinanbieter
            parallel zu koordinieren.
          </p>
          <p>
            Der Schritt zu einer Reinigungsfirma hat in der Praxis meist einen konkreten Anlass: ein
            neu gegründetes Unternehmen hat noch keine Reinigungslösung, der bisherige Anbieter
            reagiert nicht zuverlässig genug auf Rückfragen, zusätzliche Flächen sollen in einen
            bestehenden Vertrag aufgenommen werden, oder ein Umzug in neue Räumlichkeiten macht eine
            neue Vergabe nötig. In jedem dieser Fälle hilft ein klar beschriebener Leistungsumfang
            mehr als ein schneller Vergleich einzelner Stundensätze.
          </p>
        </div>
      </Section>

      <Section background="white">
        <SectionHeading
          eyebrow="Auswahlkriterien"
          title={heading.sectionHeadings[1]}
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
          Wer sich für eine Reinigungsfirma statt eigenem Personal entscheidet, sollte bei der Wahl
          des Anbieters auf mehr achten als auf den Stundenpreis. Diese sechs Punkte entscheiden meist
          mehr über eine funktionierende Zusammenarbeit.
        </p>
        <FadeIn className="mt-8 grid gap-6 sm:grid-cols-2">
          {selectionCriteria.map((item, index) => (
            <FadeIn key={item.title} delay={index * 70} className="flex gap-3 rounded-card border border-line bg-white p-5 shadow-raise">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
              <div>
                <p className="text-sm font-semibold text-brand-900">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </FadeIn>
        <Link
          href="/wissen/reinigungsdienstleister-auswaehlen"
          className="mt-6 inline-block text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Ausführliche Checkliste im Glanzwerk Wissen
        </Link>
      </Section>

      <Section background="muted">
        <SectionHeading eyebrow="Zusammenarbeit" title={heading.sectionHeadings[2]} />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
          Eine Reinigungsfirma zu beauftragen heißt, Verantwortung abzugeben, ohne die Kontrolle über
          Qualität und Ansprechpartner zu verlieren. Deshalb steht vor der ersten Reinigung fest,
          welches Team zuständig ist und welche Leistungen genau zum Auftrag gehören.
        </p>
        <div className="mt-10">
          <ProcessSteps steps={workingSteps} />
        </div>
      </Section>

      <Section background="white">
        <SectionHeading eyebrow="Portfolio" title={heading.sectionHeadings[3]} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Den größten Teil unserer Aufträge macht die laufende Pflege gewerblich genutzter Flächen
            aus. Die{" "}
            <Link href="/leistungen/gebaeudereinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Gebäudereinigung
            </Link>{" "}
            bündelt mehrere Teilleistungen unter einem Vertrag, die{" "}
            <Link href="/leistungen/unterhaltsreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Unterhaltsreinigung
            </Link>{" "}
            deckt eine einzelne, regelmäßig zu pflegende Fläche ab. Welche der beiden Varianten passt,
            hängt davon ab, wie viele Gewerke in Ihrem Objekt zusammenkommen.
          </p>
          <p>
            Daneben bieten wir Leistungen an, die nicht bei jedem Termin anfallen:{" "}
            <Link href="/leistungen/glas-und-fensterreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Glas- und Fensterreinigung
            </Link>
            ,{" "}
            <Link href="/leistungen/treppenhausreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Treppenhausreinigung
            </Link>{" "}
            für Hausverwaltungen und Eigentümergemeinschaften sowie{" "}
            <Link href="/leistungen/grundreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Grundreinigung
            </Link>{" "}
            nach Bauarbeiten oder bei einem Mieterwechsel. Diese Leistungen lassen sich einzeln
            beauftragen oder in ein bestehendes Reinigungskonzept aufnehmen.
          </p>
          <p>
            Für einzelne Branchen mit eigenen Anforderungen führen wir eigene Leistungsseiten – von
            der{" "}
            <Link href="/leistungen/bueroreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Büroreinigung
            </Link>{" "}
            und{" "}
            <Link href="/leistungen/praxisreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Praxisreinigung
            </Link>{" "}
            über die{" "}
            <Link href="/leistungen/kanzleireinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Kanzleireinigung
            </Link>{" "}
            bis zur{" "}
            <Link href="/leistungen/kita-und-schulreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Kita- und Schulreinigung
            </Link>
            . Auch{" "}
            <Link href="/leistungen/fitnessstudioreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Fitnessstudios
            </Link>
            ,{" "}
            <Link href="/leistungen/autohausreinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Autohäuser
            </Link>{" "}
            und{" "}
            <Link href="/leistungen/gastronomiereinigung-berlin" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              gastronomische Betriebe
            </Link>{" "}
            haben eigene Seiten mit den jeweils typischen Reinigungsfragen. Einen vollständigen
            Überblick bietet die{" "}
            <Link href="/leistungen" className="font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Leistungsübersicht
            </Link>
            .
          </p>
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <SectionHeading eyebrow="Einsatzgebiet" title={heading.sectionHeadings[4]} />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft">
            Als Reinigungsfirma sind wir in allen zwölf Berliner Bezirken für Gewerbekunden im
            Einsatz – von Mitte und Charlottenburg-Wilmersdorf bis nach Marzahn-Hellersdorf und
            Treptow-Köpenick. Nach Absprache übernehmen wir außerdem Aufträge in Potsdam, Schönefeld
            und weiteren Orten im Berliner Umland.
          </p>
          <Link
            href="/standorte"
            className="mt-4 inline-block text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Standorte mit lokalen Ansprechpunkten ansehen
          </Link>
        </div>
      </Section>

      <Section background="white">
        <SectionHeading eyebrow="FAQ" title={heading.faqHeading} />
        <div className="mx-auto mt-8 max-w-2xl">
          <FAQ items={faqItems} idPrefix="reinigungsfirma" />
        </div>
      </Section>

      <Section background="muted">
        <CTASection
          title={heading.ctaHeading}
          subtitle="Beschreiben Sie kurz Ihr Objekt und die gewünschten Leistungen. Wir sagen Ihnen, welche Kombination sinnvoll ist, und nennen Ihnen Ihren Ansprechpartner."
        />
      </Section>
    </>
  );
}
