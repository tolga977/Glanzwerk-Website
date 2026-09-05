"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import MobileNav from "@/components/layout/MobileNav";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { mainNav } from "@/data/navigation";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

const chevron = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/*
 * ── Zwei Zustände der Kopfzeile ───────────────────────────────────────────
 *
 * "stage"  — die Kopfzeile liegt transparent IN der Hero-Bühne der
 *            Startseite. Kein eigener Balken, keine Fläche, keine Unschärfe,
 *            keine Haarlinie: Kopfzeile und Bühne sind im ersten Bildschirm
 *            eine zusammenhängende Komposition.
 *
 * "solid"  — der normale Inhaltszustand: weiße Materialebene mit Unschärfe,
 *            Haarlinie unten, ein sehr flacher Ruheschatten.
 *
 * ── Warum sich Logo und Navigation NICHT mitverändern ─────────────────────
 * In der vorherigen, dunklen Fassung dieses Heros wechselte im Bühnenzustand
 * fast alles: helles Logo, weiße Navigation, weiße Trennlinie. Das war dort
 * nötig, weil die Bühne dunkel war.
 *
 * Die Bühne ist jetzt links weiß. Damit steht die Kopfzeile im Bühnenzustand
 * auf demselben hellen Grund wie im festen Zustand — und die richtige Antwort
 * ist, sie NICHT umzufärben. Logo (dunkle Variante), Navigationsfarben,
 * Hover-Flächen und die Telefonnummer sind in beiden Zuständen identisch.
 *
 * Das hat drei Folgen, die alle erwünscht sind: der Zustandswechsel besteht
 * ausschließlich aus einer ankommenden Fläche und ist damit so ruhig wie
 * möglich; es wird keine Logodatei getauscht, also kann auch nichts
 * aufblitzen; und die Lesbarkeit über dem Foto trägt jetzt die eigene
 * Materialebene der Kopfzeile statt einer Aufhellungsebene im Hero.
 *
 * Was übrig bleibt, ist eine einzige Zeile Unterschied — deshalb steht hier
 * auch keine Zustandstabelle mehr, sondern nur noch die Fläche.
 *
 * ── Geometrie ─────────────────────────────────────────────────────────────
 * Höhe, Innenabstände, Logogröße, Schriftgrade und Positionen sind in beiden
 * Zuständen gleich. Die Haarlinie bleibt im Bühnenzustand als `transparent`
 * erhalten statt zu entfallen: sie belegt weiter ihr Pixel, sonst wäre die
 * Kopfzeile in den beiden Zuständen unterschiedlich hoch und der Wechsel eine
 * Layoutverschiebung.
 */
const headerSurface = {
  /*
   * Im Buehnenzustand vollstaendig transparent: keine Flaeche, keine
   * Unschaerfe, keine Haarlinie, kein Schatten.
   *
   * Zwischenzeitlich trug die Kopfzeile hier eine Off-White-Flaeche. Die war
   * lesbar, aber sie schnitt das Foto oben waagerecht ab — Himmel und
   * Fernsehturm endeten an einer Kante, und Kopfzeile und Buehne lasen sich
   * als zwei Blöcke statt als eine Komposition.
   *
   * Die Lesbarkeit traegt jetzt der Tageslichtverlauf der Buehne selbst: er
   * ist ueber die linken 38 % der Breite deckend weiss und traegt dort Logo
   * und die ersten Navigationseintraege. Rechts davon liegt im Motiv der
   * helle Morgenhimmel; die Werte sind nachgemessen, siehe Bericht.
   *
   * Der Preis-Knopf braucht ohnehin keinen Grund — er bringt seine eigene
   * Flaeche mit.
   *
   * ── Nur ab `lg` ─────────────────────────────────────────────────────────
   * Dieser Zustand ist NUR ab 1024 px als Modifikator eingebunden (siehe
   * Rückgabe unten): die Begründung oben — heller Tageslichtverlauf trägt
   * das dunkle Logo — gilt ausschließlich für die zweispaltige
   * Desktop-Komposition mit weißer Textfläche links.
   *
   * Der mobile Hero (siehe HeroStage/page.tsx) ist keine solche Komposition:
   * dort liegt ganz oben das volle Foto mit dunklem Verlaufsschleier, damit
   * der weiße Überschrifttext darauf lesbar ist. Eine transparente
   * Kopfzeile mit demselben dunklen Logo wäre dort auf dunklem Grund fast
   * unsichtbar — die Kopfzeile blieb erkennbar erst, sobald man an der
   * hellen Markenleiste unter dem Hero vorbeigescrollt war. Unterhalb von
   * `lg` bleibt die Kopfzeile deshalb IMMER in der `solid`-Fläche, auch
   * während `imBuehnenzustand` true ist.
   */
  stage: "lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-none lg:backdrop-saturate-100",
  solid: "border-line bg-white/85 shadow-raise backdrop-blur-xl backdrop-saturate-150",
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  /*
   * Nur die Startseite bringt eine Bühne mit. Diese Ableitung kommt aus dem
   * Pfad und nicht aus einer Messung, weil sie damit auf dem Server und im
   * Browser dasselbe Ergebnis hat: die Kopfzeile wird sofort im richtigen
   * Zustand ausgeliefert. Über eine Messung nach dem Einhängen würde sie
   * erst weiß erscheinen und dann sichtbar umschlagen.
   */
  const stagePage = pathname === "/";

  /*
   * Seiteneigene Farbrolle: ausschließlich auf "Umwelt & Verantwortung"
   * wechselt der primäre Kopfzeilen-Knopf von Markenblau auf das Grün der
   * Seite (`eco-600`/`eco-800`, dieselben Werte wie `Button`-Variante
   * "eco"). Verlässt man die Seite, greift wieder die normale Farbe — der
   * Zustand hängt ausschließlich am aktuellen Pfad, es gibt keinen
   * darüber hinaus gespeicherten Zustand.
   */
  const ecoPage = pathname.startsWith("/umwelt-verantwortung");

  /*
   * `true`, solange die Kopfzeile noch über der Bühne liegt.
   *
   * Anfangswert `stagePage`: auf der Startseite wird die Kopfzeile damit
   * sofort — schon serverseitig — im Bühnenzustand ausgeliefert. Würde hier
   * `false` stehen und der richtige Zustand erst nach einer Messung folgen,
   * erschiene die Kopfzeile für einen Frame weiß und schlüge dann sichtbar um.
   *
   * Gesetzt wird der Wert ausschließlich aus dem Callback des
   * IntersectionObservers, also aus einem externen System — nicht aus dem
   * Effektkörper. Für die anderen Seiten braucht es deshalb auch keinen
   * Abgleich: dort ist `stagePage` falsch, und der abgeleitete Zustand unten
   * prüft beides. Ein veralteter Wert kann den Zustand nicht kippen.
   */
  const [ueberBuehne, setUeberBuehne] = useState(stagePage);

  useEffect(() => {
    if (!stagePage) return;

    const buehne = document.querySelector("[data-hero-stage]");

    /*
     * Sicherung für den Fall, dass die Bühne fehlt — etwa weil der Hero
     * einmal umgebaut wird, ohne das Attribut mitzunehmen. Ohne diesen Zweig
     * stünde die Kopfzeile dann transparent über weißem Inhalt und wäre
     * unlesbar.
     *
     * Der Wechsel läuft über den nächsten Frame und nicht direkt: ein
     * synchroner Zustandswechsel im Effektkörper löst eine zweite
     * Renderrunde aus, bevor der Browser gezeichnet hat. Hier ist das ein
     * Fehlerpfad, der praktisch nie läuft — aber er soll denselben Regeln
     * folgen wie der Normalfall.
     */
    if (!buehne) {
      const frame = requestAnimationFrame(() => setUeberBuehne(false));
      return () => cancelAnimationFrame(frame);
    }

    /*
     * IntersectionObserver statt Scroll-Listener: kein Callback bei jedem
     * Scroll-Ereignis, sondern genau einer je Übertritt. Der Browser wertet
     * das außerhalb des Haupt-Threads aus.
     *
     * Der negative obere Rand verkleinert den Beobachtungsbereich um die
     * Höhe der Kopfzeile. Damit endet die Überschneidung genau in dem
     * Moment, in dem die Unterkante der Bühne die Unterkante der Kopfzeile
     * erreicht — also genau dann, wenn die Kopfzeile aufhört, über Film zu
     * liegen. Die Höhe wird gemessen und nicht geschätzt, weil sie ab
     * 1536 px von 112 auf 128 px wechselt.
     *
     * `observe()` meldet den aktuellen Stand von selbst beim Einhängen. Wer
     * die Startseite mitten im Dokument betritt (Anker, Zurück-Taste,
     * Neuladen bei Scrollposition), bekommt dadurch sofort den richtigen
     * Zustand, ohne dass dafür gescrollt werden muss.
     */
    const kopfhoehe = headerRef.current?.offsetHeight ?? 112;

    const beobachter = new IntersectionObserver(
      ([eintrag]) => setUeberBuehne(eintrag.isIntersecting),
      { rootMargin: `-${kopfhoehe}px 0px 0px 0px`, threshold: 0 },
    );
    beobachter.observe(buehne);
    return () => beobachter.disconnect();
  }, [stagePage, pathname]);

  /** Der eine abgeleitete Wert, an dem der Flächenwechsel hängt. */
  const imBuehnenzustand = stagePage && ueberBuehne;

  /*
   * Die beiden Symbolknöpfe brauchen über der Bühne eine eigene Fläche —
   * aber nur dort, wo tatsächlich Foto hinter ihnen liegt.
   *
   * Im Band 1024–1279 px ist die Hauptnavigation eingeklappt, und rechts
   * stehen nur Anruf- und Menüsymbol. Genau dort liegt im Motiv die dunkle
   * Glasfassade: gemessen bei 1035 px Breite ein Grund von 0,10 Leuchtdichte
   * und damit 2,4:1 für die Symbole — unter den 3:1, die Bedienelemente
   * brauchen.
   *
   * Die Aufhellung des Fotos ist dafür das falsche Werkzeug: um an dieser
   * Stelle auf 3:1 zu kommen, müsste die Kopflicht-Ebene auf rund 52 %
   * Deckkraft, und dann wäre das obere Bilddrittel ausgebleicht.
   *
   * Stattdessen gilt hier dieselbe Regel wie beim Preis-Knopf: ein
   * Bedienelement bringt seine Fläche selbst mit, die Navigation trägt der
   * Verlauf. Zwei kompakte Flächen sind kein waagerechter Kopfbalken und
   * erzeugen keine Trennkante — der Unterschied zur früheren Lösung ist
   * genau der.
   *
   * Erst ab `lg`, weil darunter kein Foto hinter der Kopfzeile liegt: dort
   * wird das Bild eingepasst statt beschnitten, die obere Bildkante ist Weiß,
   * und die Symbole stehen gemessen bei 16,9:1.
   *
   * Der Schatten liegt mit in der Übergangsliste der Knöpfe. Ohne das würde
   * die Fläche beim Scrollen weich verschwinden, der Schatten aber im selben
   * Moment springen — und dann trägt die Kopfzeile ihre Fläche ohnehin selbst.
   */
  const steuerFlaeche = imBuehnenzustand
    ? "lg:bg-white/85 lg:shadow-raise lg:ring-1 lg:ring-brand-900/5 lg:backdrop-blur-sm"
    : "";

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function handleBlur(event: FocusEvent<HTMLLIElement>, label: string) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenDropdown((prev) => (prev === label ? null : prev));
    }
  }

  /*
   * Der Übergang läuft über Fläche, Rahmen, Schatten und Unschärfe — nicht
   * über Layout-Eigenschaften. 300 ms mit der Signaturkurve der Website:
   * der Wechsel soll als ankommende Materialebene lesbar sein, nicht als
   * Farbumschlag. Unter reduzierter Bewegung bleibt er erhalten, weil ein
   * Farb-/Deckkraftwechsel dem Verständnis dient und keine Bewegung ist —
   * genau die Unterscheidung, die die Vorgabe verlangt.
   *
   * Der Ruheschatten gehört zum festen Zustand: über der Bühne hätte ein
   * Schatten keine Fläche, von der er abfallen könnte.
   */
  return (
    <header
      ref={headerRef}
      data-header-state={imBuehnenzustand ? "stage" : "solid"}
      /*
       * `solid` steht jetzt immer als Grundlage da — nicht mehr als eine von
       * zwei sich ausschließenden Varianten. `stage` (ausschließlich
       * `lg:`-Klassen, siehe dort) legt sich bei Bedarf darüber und hebt
       * Fläche, Rahmen, Schatten und Unschärfe erst ab 1024 px auf. Unterhalb
       * bleibt die Kopfzeile dadurch in jedem Scrollzustand lesbar.
       */
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-signature)] ${headerSurface.solid} ${
        imBuehnenzustand ? headerSurface.stage : ""
      }`}
    >
      {/*
        Kopfhöhe und Logogröße gestaffelt — gemessen, nicht geschätzt.

          < 1536 px   112 px hoch
          ≥ 1536 px   128 px hoch

        Warum die volle Navigation erst ab 1280 px erscheint:
        Bei 1024 px stellt die Zeile nur 945 px Inhaltsbreite bereit und
        reicht für Logo, sechs Navigationseinträge und die Telefonnummer
        nicht. Zwischen 1024 und 1279 px zeigt der Kopf deshalb dieselbe
        kompakte Form wie auf dem Telefon; über das Menü bleiben alle
        Einträge vollständig erreichbar. Eine umbrechende Navigation wäre
        die schlechtere Antwort.

        Die Kopfhöhe folgt dem Logo mit gleichem Abstand oben und unten. Ein
        Logo, das den Rand berührt, wirkt nicht groß, sondern gedrängt.

        `mr-auto` am Logo statt `justify-between` am Container: der freie Raum
        sammelt sich hinter dem Logo, statt sich gleichmäßig auf beide Lücken
        zu verteilen. Genau diese Gleichverteilung ließ die Navigation mittig
        und damit beliebig wirken.
      */}
      <div className="container-page flex h-28 items-center gap-4 2xl:h-32 2xl:gap-6">
        {/*
          Die dunkle Logovariante in beiden Zuständen — die Bühne ist links
          weiß. Damit wird beim Zustandswechsel keine Bilddatei getauscht und
          es kann nichts aufblitzen. Die Größe ist unverändert.
        */}
        <Logo
          variant="dark"
          heightClassName="h-[5.5rem] 2xl:h-24"
          className="mr-auto shrink-0"
        />

        <nav aria-label="Hauptnavigation" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const isMega = item.label === "Leistungen";
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => item.children && setOpenDropdown(null)}
                  onBlur={(event) => item.children && handleBlur(event, item.label)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-expanded={item.children ? openDropdown === item.label : undefined}
                    onFocus={() => item.children && setOpenDropdown(item.label)}
                    /* px-3 statt px-4: das eingesparte Innenpolster geht an
                       das größere Logo. Trefferfläche bleibt über min-h-11
                       bei 44 px.

                       whitespace-nowrap ist hier kein Detail, sondern der
                       Unterschied zwischen Kopfzeile und Textblock: ohne die
                       Angabe brachen "Umwelt & Verantwortung" und "Glanzwerk
                       Wissen" bei 1440 px zweizeilig um, sobald das Logo
                       wuchs. Eine zweizeilige Navigation liest sich nicht als
                       Menü, sondern als Absatz.

                       Farben in beiden Kopfzeilen-Zuständen gleich — siehe
                       die Begründung an `headerSurface`. */
                    className={`flex min-h-11 items-center gap-1 whitespace-nowrap rounded-control px-2.5 py-3 text-sm font-medium 2xl:px-3 transition-colors duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                      isActive(item.href) ? "bg-brand-50 text-brand-500" : "text-brand-900"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <span
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      >
                        {chevron}
                      </span>
                    )}
                  </Link>

                  {item.children && (
                    <div
                      inert={openDropdown !== item.label}
                      /*
                       * Bleibt permanent im DOM statt nur bei offenem Zustand
                       * zu mounten, und wird über `opacity`/`scale`/
                       * `translate-y` weich ein-/ausgeblendet statt abrupt zu
                       * erscheinen/verschwinden. `inert` nimmt das
                       * geschlossene Dropdown aus Tab-Reihenfolge und
                       * Screenreader-Baum heraus — sonst blieben seine Links
                       * bei unsichtbarem Panel per Tab erreichbar.
                       * `motion-reduce:transition-none` lässt den Zustand
                       * unverändert, nur der Übergang entfällt.
                       *
                       * Bleibt in beiden Kopfzeilen-Zuständen weiß: ein
                       * geöffnetes Untermenü ist eine schwebende Fläche über
                       * dem Inhalt, keine Fortsetzung der Kopfzeile. Über der
                       * Bühne ist eine deckende weiße Fläche hier genau
                       * richtig — sie trägt Text und braucht keine
                       * Kontrastführung.
                       */
                      className={`absolute left-1/2 top-full z-10 -translate-x-1/2 rounded-card border border-line bg-white p-5 shadow-float transition-all duration-200 ease-out motion-reduce:transition-none ${
                        isMega ? "w-[560px]" : "w-64"
                      } ${
                        openDropdown === item.label
                          ? "visible translate-y-0 scale-100 opacity-100"
                          : "invisible translate-y-1 scale-[0.98] opacity-0"
                      }`}
                    >
                      {item.label === "Leistungen" && (
                        <div className="grid grid-cols-[1fr_auto] gap-5">
                          <ul className="grid grid-cols-2 gap-1">
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/leistungen/${service.slug}`}
                                  className="flex items-center gap-2.5 rounded-control px-3 py-2 text-sm text-ink-soft transition-colors duration-200 ease-out hover:bg-brand-50 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-500">
                                    <ServiceIcon slug={service.slug} className="h-4 w-4" />
                                  </span>
                                  {service.shortTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/preisrechner"
                            className="lift flex w-40 flex-col justify-between rounded-control bg-gradient-to-br from-brand-900 to-brand-800 p-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                          >
                            <span className="text-sm font-semibold">
                              Nicht sicher, was Sie brauchen?
                            </span>
                            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-200">
                              Preis berechnen {chevron}
                            </span>
                          </Link>
                        </div>
                      )}

                      {!isMega && (
                        <ul className="grid gap-0.5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-control px-3 py-2 text-sm text-ink-soft transition-colors duration-200 ease-out hover:bg-brand-50 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/*
          Navigieren und Kontakt aufnehmen sind zwei verschiedene Absichten
          und werden deshalb sichtbar getrennt: links die Orientierung, rechts
          hinter einer Haarlinie der Kontaktweg.

          ── Warum hier keine Schaltfläche mehr steht ────────────────────
          Bis eben stand rechts neben der Telefonnummer eine primäre
          Schaltfläche „Preis berechnen". Sie ist entfallen, und das ist eine
          bewusste Entscheidung mit einem Preis:

          Die Entwurfsvorlage führt rechts ausschließlich den Kontaktweg, und
          die Navigation ist gleichzeitig von fünf auf sechs Einträge
          gewachsen. Beides zusammen ginge bei 1280 px nicht auf — gemessen
          fehlten der Zeile mit Schaltfläche rund 90 px. Von den beiden
          Möglichkeiten (Schaltfläche behalten und die Navigation erst ab
          1536 px zeigen, oder Schaltfläche streichen) ist die zweite die
          bessere: eine Hauptnavigation, die auf gängigen Laptop-Breiten
          hinter einem Menüknopf verschwindet, kostet mehr als ein zweiter
          Weg zum Preisrechner.

          Der Preisrechner bleibt aus der Kopfzeile erreichbar: die Kachel
          „Nicht sicher, was Sie brauchen? — Preis berechnen" steht
          unverändert im Leistungen-Menü. Zusätzlich trägt die Hero-Bühne
          „Preis schätzen" als primäre Handlung im ersten Bildschirm.

          Die Telefonnummer übernimmt dafür sichtbar mehr Gewicht: 16 px
          halbfett in Marken-Navy statt 14 px in gedecktem Grau.
        */}
        <div className="hidden items-center gap-4 xl:flex">
          {/*
            Trennung zwischen Navigation und Kontaktweg.

            Hier stand ein senkrechter Strich — die Voreinstellung, die in
            jeder Kopfzeile steht. Es ist derselbe Strich geblieben, nur im
            53-Grad-Winkel des Markenzeichens. Damit trägt die Kopfzeile
            neben der Logodatei ein zweites, eigenes Merkmal, und der
            Besucher begegnet dem Winkel schon vor dem ersten Scrollen.
          */}
          <span
            aria-hidden="true"
            className="h-7 w-px shrink-0 rotate-[36.87deg] rounded-full bg-line-strong"
          />
          {/*
            Öffnungszeiten stehen hier weiterhin NICHT.

            Mo–Sa 08:00–18:00 ist seit Phase 7B vom Betreiber bestätigt und
            steht sichtbar im Footer sowie in `openingHoursSpecification`
            (professionalServiceSchema(), src/lib/schema.ts) — eine zweite
            Zeile hier in der Kopfzeile würde dieselbe Angabe nur doppeln,
            an der Stelle, die am wenigsten Raum dafür hat.
          */}
          <a
            href={siteConfig.phoneHref}
            className="flex min-h-11 items-center gap-2 whitespace-nowrap rounded-control px-1 text-base font-semibold text-brand-900 transition-colors duration-200 ease-out hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-brand-500"
            >
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {siteConfig.phone}
          </a>
          {/*
            Primaerer Weg in der Kopfzeile, ab derselben Breite wie die volle
            Navigation. Auf Telefon und Tablet bleibt die kompakte Form mit
            Anruf- und Menueknopf: ein zusaetzlicher Knopf wuerde die Zeile
            dort ueberlaufen lassen, und der Hero traegt die Preisschaetzung
            ohnehin als primaere Handlung im ersten Bildschirm.
          */}
          <Link
            href="/preisrechner"
            className={`press inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-control px-5 text-sm font-semibold text-white transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              ecoPage
                ? "bg-eco-600 hover:bg-eco-800 focus-visible:outline-eco-800"
                : "bg-brand-500 hover:bg-brand-600 focus-visible:outline-brand-900"
            }`}
          >
            Preis schätzen
          </Link>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Anrufen: ${siteConfig.phone}`}
            className={`press flex h-12 w-12 items-center justify-center rounded-control text-brand-900 transition-[color,background-color,box-shadow] duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500 ${steuerFlaeche}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className={`press flex h-12 w-12 items-center justify-center rounded-control text-brand-900 transition-[color,background-color,box-shadow] duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500 ${steuerFlaeche}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
