import Image from "next/image";
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
    return (
      <div className="max-w-3xl">
        {quote}
        {signature}
        {promise}
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
