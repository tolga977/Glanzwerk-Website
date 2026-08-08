import Image from "next/image";
import type { ReactNode } from "react";
import GlanzMark from "@/components/ui/GlanzMark";
import { owner } from "@/data/owner";
import { siteConfig } from "@/data/site";

/**
 * Der persönliche Abschnitt der Startseite.
 *
 * Bewusst kein Karten-Raster und keine Icon-Kacheln: dieser Block ist die
 * einzige Stelle der Seite, an der eine Person spricht, und er soll auch so
 * aussehen. Große Serifenschrift für das Zitat, eine Signaturzeile darunter,
 * die Reaktionszusage als eigenes, hervorgehobenes Element.
 *
 * ── Komposition: helle redaktionelle Doppelseite (August 2026) ──────────
 * Die Bildfläche stand zuvor als dunkelblaue Vollfläche im Abschnitt — auf
 * 44 % der Breite und über 40 rem Höhe war sie der dominanteste Block der
 * Seite und ließ das persönliche Kapitel wie einen Farbbaustein wirken.
 *
 * Jetzt ist der Grund durchgehend hell. Die Tiefe kommt aus der Tonebene
 * des Abschnitts (`surface="left"` in Section.tsx, eine helle Blauebene an
 * der linken Kante), über die das Porträt mit seiner rechten Kante läuft.
 * Kein Rahmen, kein Kasten, kein Schlagschatten: das Bild ist links aus der
 * Fläche geschnitten und rechts gerundet, damit es als Teil der Seite liest
 * und nicht als eingesetztes Rechteck.
 *
 * Der Randanschnitt misst den Abstand von der Rasterspalte zur Fensterkante
 * exakt. Der anderswo genutzte Ausdruck `calc(50%-50vw)` rechnet gegen die
 * Spalte statt gegen das Fenster und schießt über die Kante hinaus — bei
 * einer Tonfläche folgenlos, bei einem Porträt würde er das Gesicht
 * beschneiden.
 *
 * Reihenfolge im Markup: Bild vor Text. Auf dem Telefon öffnet damit das
 * Bild den Abschnitt und der Text schließt direkt an; ab Desktop ergibt
 * dieselbe Reihenfolge Bild links, Text rechts. Es braucht keine
 * Umsortierung per `order`.
 */
interface OwnerNoteProps {
  /**
   * Auszeichnungszeile und Überschrift des Abschnitts.
   *
   * Sie stehen bewusst INNERHALB der Textspalte statt darüber: über dem
   * Raster gesetzt, ließ die Überschrift rechts neben sich eine leere
   * Hälfte stehen, während die Bildfläche darunter links anschnitt — zwei
   * gegenläufige Kanten im selben Abschnitt. In der Spalte gehört die linke
   * Kante ganz dem Bild, und rechts läuft eine durchgehende Erzählung:
   * Auszeichnung → Überschrift → Zitat → Signatur → Zusage.
   *
   * Der Wortlaut bleibt in page.tsx, weil er zur Seite gehört und nicht zur
   * Komponente.
   */
  heading?: ReactNode;
}

export default function OwnerNote({ heading }: OwnerNoteProps = {}) {
  const hasPhoto = owner.photo !== null;

  const quote = (
    <blockquote className="border-l-2 border-brand-500 pl-6 sm:pl-8">
      <p className="font-display display-lg text-pretty text-xl font-medium leading-relaxed text-brand-900 sm:text-2xl lg:text-[1.75rem]">
        {`„${owner.quote}“`}
      </p>
    </blockquote>
  );

  const signature = (
    <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 pl-6 sm:pl-8">
      <span className="font-display text-lg font-medium text-brand-900">{owner.name}</span>
      <span aria-hidden="true" className="text-line-strong">
        ·
      </span>
      <span className="text-sm uppercase tracking-[0.14em] text-ink-soft">{owner.role}</span>
    </div>
  );

  /*
    Die Zusage.

    Sie stand in einer hellblauen Karte mit Rand — ein farbiger Kasten
    mitten in einem Abschnitt, in dem sonst eine Person spricht. Das las
    sich wie ein eingeschobener Hinweiskasten aus einer Softwaredoku, nicht
    wie ein Satz, den jemand sagt.

    Jetzt trägt sie eine Doppellinie darüber statt einer Fläche darum. Die
    Zusage bleibt abgesetzt — aber als Absatz mit eigener Kante, nicht als
    Objekt. Die Kontaktwege stehen darunter in derselben Zeile wie die
    Signatur; sie sind Teil des Gesprächs, kein Fußbereich.
  */
  const promise = (
    <div className="mt-12 border-t-2 border-brand-900 pt-8 sm:mt-14">
      <p className="measure text-lg leading-relaxed text-brand-900 sm:text-xl">
        <strong className="font-semibold">Antwort {owner.responseTime}</strong>{" "}
        {owner.responseTimeQualifier} — auf Anfragen über das Formular, per E-Mail und am Telefon.
      </p>
      <div className="mt-6 flex flex-col gap-x-10 gap-y-2 sm:flex-row sm:items-center">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          {siteConfig.phone}
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          {siteConfig.email}
        </a>
      </div>
    </div>
  );

  /*
    Der Randanschnitt.

    Misst den Abstand von der linken Rasterkante zur Fensterkante: halbe
    Differenz zwischen Fenster und Container (`max-w-7xl`) plus dessen
    Innenabstand (`px-8`). Unterhalb von 80rem Fensterbreite bleiben die
    2rem uebrig. Damit endet die Flaeche exakt am Fenster statt darueber
    hinaus — bei einem Portraet der Unterschied zwischen angeschnitten und
    angeschnittenem Gesicht.
  */
  const bleedLeft = "lg:-ml-[calc((100vw-min(100vw,80rem))/2+2rem)]";

  /*
    Spaltenverhaeltnis: Bild rund 44 %, Text rund 50 %, dazwischen die
    Rasterluft. Das Bild bekommt bewusst weniger als die Haelfte — es traegt
    den Abschnitt, aber die Aussage steht im Text.

    `items-end` statt `items-center`: die Bildunterkante und die Unterkante
    des Textblocks laufen auf eine gemeinsame Linie aus. Mittig zentriert
    haetten beide Spalten oben und unten unterschiedlich viel Luft, was bei
    zwei so verschiedenen Blockhoehen als Ausrichtungsfehler liest.
  */
  const grid =
    "grid gap-12 lg:grid-cols-[0.88fr_1fr] lg:items-end lg:gap-16";

  const text = (
    <div>
      {/* Ohne Einzug, anders als Zitat und Signatur: die Überschrift steht
          an der Spaltenkante, das Zitat rückt mit seinem Akzentstrich
          darunter ein. */}
      {heading && <div className="mb-10 lg:mb-12">{heading}</div>}
      {quote}
      {signature}
      {promise}
    </div>
  );

  if (!hasPhoto) {
    /*
      ── Ohne Portraet ────────────────────────────────────────────────────

      Links liegt die Flaeche, auf die das echte Hochformat spaeter kommt —
      im selben Seitenverhaeltnis und an derselben Rasterposition wie im
      Portraet-Zweig, damit beim Eintragen des Fotos nichts springt.

      Sie traegt kein Ersatzbild, keinen Rahmen, keine Beschriftung und
      keinen Grauton, sondern die hellste Stufe der eigenen Farbwelt mit dem
      Markenzeichen als Wasserzeichen. Damit liest sie als ruhige Tonebene
      der Seite und nicht als unfertiger Platzhalter — und vor allem nicht
      mehr als dunkelblauer Block, der den halben Abschnitt einnimmt.

      Auf dem Telefon bleibt sie aus: eine leere Flaeche ueber die volle
      Breite waere dort ein toter Bildschirm. Das echte Foto zeigt der
      Portraet-Zweig dann auch mobil.
    */
    return (
      <div className={grid}>
        <div
          aria-hidden="true"
          /* Kein w-full und keine aspect-ratio: die Breite muss `auto`
             bleiben, damit der negative Rand die Flaeche bis zur
             Fensterkante VERBREITERT statt sie nur zu verschieben —
             Prozentbreiten ignorieren Raender, und eine aspect-ratio
             rechnet die Breite aus der gekappten Hoehe zurueck und macht
             die Flaeche wieder schmal. Feste Hoehe, Breite aus dem Raster. */
          className={`relative hidden overflow-hidden rounded-panel bg-gradient-to-br from-brand-50 via-white to-brand-100/70 lg:block lg:h-[38rem] lg:rounded-l-none ${bleedLeft}`}
        >
          <GlanzMark className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 text-brand-300 opacity-[0.16]" />
        </div>
        {text}
      </div>
    );
  }

  /*
    ── Mit Portraet ───────────────────────────────────────────────────────
    Hochformat, links aus der Flaeche geschnitten, rechts gerundet. Kein
    Rahmen und kein Schlagschatten: die Tiefe kommt aus der Tonebene des
    Abschnitts, ueber deren Kante das Bild laeuft.

    `object-position` steht in owner.ts und ist nach dem Einsetzen des
    echten Fotos dort zu justieren — Kopf, Oberkoerper und ein Teil der
    Umgebung sollen im Ausschnitt bleiben.

    Auf dem Telefon laeuft das Bild in 4:5 ueber die volle Spaltenbreite und
    oeffnet den Abschnitt; der Text schliesst direkt an.
  */
  return (
    <div className={grid}>
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-panel lg:aspect-auto lg:h-[38rem] lg:rounded-l-none ${bleedLeft}`}
      >
        <Image
          src={owner.photo as string}
          alt={owner.photoAlt}
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
          style={{ objectPosition: owner.photoObjectPosition }}
        />
      </div>
      {text}
    </div>
  );
}
