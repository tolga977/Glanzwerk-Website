import Image from "next/image";
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
 * Das Layout hat zwei Zustände. Liegt ein Porträt vor, läuft der Abschnitt
 * zweispaltig mit versetzter Bildkante. Fehlt es, bleibt eine einspaltige,
 * eingezogene Zitatstrecke — vollständig, ohne Lücke, ohne Platzhalter.
 */
export default function OwnerNote() {
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

  if (!hasPhoto) {
    /*
      ── Ohne Portraet: dieselbe Buehne, nur ohne Darsteller ──────────────

      Bisher lief der Abschnitt einspaltig und liess rechts einen leeren
      Streifen von rund 450 px stehen — das las sich als vergessene Spalte,
      nicht als Weissraum.

      Jetzt steht rechts bereits die Flaeche, auf die das echte Hochformat-
      Foto spaeter kommt — im selben Seitenverhaeltnis (3:4) und an derselben
      Rasterposition wie im Portraet-Zweig unten, damit beim Einsetzen des
      Fotos nichts springt. Bis dahin traegt sie kein Ersatzbild und keinen
      Platzhalter, sondern die dunkle Markenflaeche der Website — dieselbe
      Sprache wie Fusszeile und Abschluss-CTA: Navy-Verlauf, Lichtkante,
      Glanzstreifen im 127-Grad-Markenwinkel, Wasserzeichen (das Zeichen
      erscheint gross oder gar nicht, siehe Section.tsx).

      Bewusst ohne den Randanschnitt des Portraet-Zweigs: dessen
      `mr-[calc(50%-50vw)]` greift hier nicht, weil der Abschnitt in
      page.tsx auf `max-w-5xl` begrenzt ist — 50 % beziehen sich dann auf
      die Rasterspalte statt auf das Fenster. Eine Flaeche, die 200 px vor
      der Kante endet und trotzdem rechts ungerundet ist, sieht nach Fehler
      aus. Also lieber sauber im Raster und rundum gerundet.

      Wenn das Foto eingetragen wird, aendert sich am Layout nichts mehr —
      nur der Inhalt der Flaeche wechselt von Markenton auf Aufnahme.

      Auf dem Telefon bleibt die Flaeche aus: eine leere dunkle Tafel in
      voller Breite waere dort ein toter Bildschirm. Das echte Foto zeigt
      der Portraet-Zweig spaeter auch mobil.
    */
    return (
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-20">
        <div className="lg:order-1">
          {quote}
          {signature}
          {promise}
        </div>
        <div
          aria-hidden="true"
          className="relative hidden overflow-hidden rounded-panel bg-gradient-to-br from-brand-900 via-brand-900 to-brand-950 shadow-deep lg:order-2 lg:block lg:aspect-[3/4] lg:max-h-[42rem] lg:w-full"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(127deg, transparent 38%, rgb(255 255 255 / 0.05) 50%, transparent 62%)",
            }}
          />
          <GlanzMark className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 opacity-[0.12]" />
        </div>
      </div>
    );
  }

  /*
    ── Mit Porträt ────────────────────────────────────────────────────────
    Das Bild lag bisher als 20 rem breite Kachel links neben dem Text —
    ein Passfoto in Spaltenbreite. Genau die Anordnung, die jede
    Über-uns-Seite hat, und die den Eindruck erzeugt "hier ist unser
    Geschäftsführer" statt "ich spreche mit dem Verantwortlichen".

    Jetzt steht der Text links und das Porträt rechts über die halbe
    Abschnittsbreite, hochformatig und bis an die Fensterkante laufend. Ein
    Gesicht in dieser Größe wird angesehen, nicht zur Kenntnis genommen.

    `lg:mr-[calc(50%-50vw)]` zieht die rechte Kante auf die Fensterbreite;
    der Überstand wird von der Section beschnitten. Die Rundung entfällt an
    der angeschnittenen Seite — eine gerundete Ecke an einer Kante, die es
    nicht gibt, verrät die Konstruktion.

    Der Text steht zuerst im Markup und wird erst ab Desktop nach links
    gestellt. Auf dem Telefon liest man so die Aussage vor dem Gesicht —
    das Zitat trägt den Abschnitt, das Bild bestätigt ihn.
  */
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-20">
      <div className="lg:order-1">
        {quote}
        {signature}
        {promise}
      </div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel shadow-deep lg:order-2 lg:aspect-[3/4] lg:mr-[calc(50%-50vw)] lg:max-h-[42rem] lg:rounded-r-none">
        <Image
          src={owner.photo as string}
          alt={owner.photoAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
