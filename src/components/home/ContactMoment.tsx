import Image from "next/image";
import Button from "@/components/ui/Button";
import HeroVideo from "@/components/home/HeroVideo";
import { photos } from "@/data/photos";
import { siteConfig } from "@/data/site";

/**
 * Der Kontaktmoment in der Seitenmitte.
 *
 * ── Aufgabe ─────────────────────────────────────────────────────────────
 * Eine ruhige Erinnerung im Vorbeiscrollen: anrufen oder unverbindlich
 * anfragen. Kein zweiter Hero und kein Werbebanner — der Abschnitt hält
 * genau zwei Handlungswege bereit und sonst nichts.
 *
 * ── Warum dieselbe Aufnahme wie im Hero ─────────────────────────────────
 * Es gibt in diesem Projekt genau ein Video (`public/video/hero.mp4`). Neues
 * Material zu erzeugen oder zu beschaffen war ausgeschlossen, also läuft
 * hier dieselbe Datei — aus dem Browser-Cache, ohne zweiten Download.
 *
 * Damit der Abschnitt trotzdem nicht wie eine Wiederholung des Heros liest,
 * unterscheiden sich drei Dinge: der Bildausschnitt (`cta-focal` statt
 * `hero-focal`, Schwerpunkt links unten statt rechts mittig), die Bauform
 * (randnah eingerückte Fläche mit Radius statt randlos über das ganze
 * Fenster) und die Höhe (rund 560 px statt volle Bildschirmhöhe).
 *
 * ── Standbild, Bewegung, reduzierte Bewegung ────────────────────────────
 * Das Standbild ist IMMER gerendert und liegt unter dem Video — als Poster
 * (über next/image optimiert statt als rohes `poster`-Attribut, dadurch
 * kein schwarzer Startframe), als Rückfall, wenn das Video nicht lädt, und
 * als Darstellung unter `prefers-reduced-motion`.
 *
 * Das <video> selbst liegt in `HeroVideo`, einer schmalen Client-Komponente:
 * auf Telefonen und unter reduzierter Bewegung wird es gar nicht erst
 * eingehängt. Bei einem Autoplay-Video überstimmt `autoplay` sonst sogar
 * `preload="none"` — CSS allein verhindert den Download nicht. Der Rest
 * dieser Komponente bleibt eine Server Component.
 *
 * Keine Layoutverschiebung beim Laden: die Fläche hat feste Mindesthöhen je
 * Breakpoint, das Standbild liegt als `fill` darin.
 *
 * ── Lesbarkeit ──────────────────────────────────────────────────────────
 * Drei benannte Ebenen aus globals.css statt einer flachen Deckfläche:
 * `cta-scrim` verdunkelt örtlich hinter der Textzone, `cta-veil` bindet die
 * Szene kühl an die Farbwelt an, `cta-edge` setzt die Fläche gegen die
 * hellen Abschnitte darüber und darunter. Rechts der Textzone bleibt das
 * Videobild offen.
 */
const contactVideo: { mp4: string; webm?: string } | null = { mp4: "/video/hero.mp4" };

export default function ContactMoment() {
  return (
    <section
      aria-labelledby="kontaktmoment-titel"
      className="bg-white py-16 sm:py-20"
    >
      <div className="container-page">
        {/*
          Randnah eingerückt statt randlos: der Hero und der Abschluss der
          Seite laufen bereits über die volle Fensterbreite. Eine dritte
          randlose dunkle Fläche dazwischen nähme diesem Moment seine
          Eigenständigkeit. Voller Inhaltsbreite plus Radius — keine Karte,
          dafür zu groß, aber auch keine Wiederholung der beiden anderen.
        */}
        <div className="relative isolate min-h-[27rem] overflow-hidden rounded-panel bg-brand-950 sm:min-h-[30rem] lg:min-h-[35rem]">
          <Image
            src={photos.heroCleaningTeam.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 76rem, 100vw"
            className="cta-focal object-cover"
          />

          {contactVideo && (
            <HeroVideo
              mp4={contactVideo.mp4}
              webm={contactVideo.webm}
              focalClassName="cta-focal"
              lazyUntilVisible
            />
          )}

          <div aria-hidden="true" className="cta-scrim absolute inset-0" />
          <div aria-hidden="true" className="cta-veil absolute inset-0" />
          <div aria-hidden="true" className="cta-edge absolute inset-0" />

          {/*
            Inhalt leicht asymmetrisch im linken Drittel statt mittig: eine
            zentrierte Textsäule über Bewegtbild ist die Bauform jeder
            Software-Startseite. Links gesetzt folgt der Abschnitt der
            Satzkante der übrigen Seite.
          */}
          <div className="relative z-[1] flex min-h-[27rem] flex-col justify-center px-6 py-14 sm:min-h-[30rem] sm:px-10 sm:py-16 lg:min-h-[35rem] lg:px-16">
            <div className="max-w-xl">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
                <span aria-hidden="true" className="brand-tick text-brand-300" />
                Persönliche Beratung
              </p>

              {/*
                Bewusst ein <p> und keine Überschrift: die Überschriften-
                architektur der Startseite kommt vollständig aus
                seoHeadings.ts (1× H1, 12× H2). Eine dreizehnte Überschrift
                hier würde diese Struktur ändern — die Aufgabe stellt SEO
                ausdrücklich unter Bestandsschutz. Die Größe trägt die
                Aussage, das Element bleibt Fließtext.

                `id` fürs `aria-labelledby` der Section, damit der Abschnitt
                in der Landmark-Übersicht trotzdem benannt ist.
              */}
              <p
                id="kontaktmoment-titel"
                className="font-display display-lg mt-5 text-pretty text-[1.75rem] font-medium text-white sm:text-4xl lg:text-[2.5rem]"
              >
                Sprechen Sie uns direkt an
              </p>

              <div className="glanz-divider mt-6 max-w-[120px]" />

              <p className="measure mt-6 text-base leading-relaxed text-brand-100">
                Kostenlos und unverbindlich — telefonisch oder über das Anfrageformular.
              </p>

              {/*
                Die Telefonnummer als eigenständiger Kontaktweg, nicht als
                Kleingedrucktes unter den Schaltflächen. Sie steht in der
                Display-Schrift auf Überschriftengröße: wer diesen Abschnitt
                nur streift, soll die Nummer mitnehmen können.

                `min-h-11` haelt die Trefferflaeche auf Telefonen; die
                Farbaenderung beim Ueberfahren verschiebt nichts im Layout.
              */}
              <a
                href={siteConfig.phoneHref}
                className="mt-8 inline-flex min-h-11 items-center gap-3.5 rounded-control text-2xl font-medium text-white transition-colors duration-200 ease-out hover:text-brand-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-3xl"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-brand-300"
                >
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-display">{siteConfig.phone}</span>
              </a>

              {/*
                Genau eine Schaltflaeche. Zusammen mit der Telefonnummer sind
                das zwei Handlungswege — mehr traegt ein Abschnitt nicht, der
                im Vorbeiscrollen wirken soll.
              */}
              <div className="mt-9">
                <Button href="/kontakt" size="xl">
                  Angebot anfragen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
