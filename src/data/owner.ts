/**
 * Der Mensch hinter Glanzwerk.
 *
 * Diese Datei existiert, weil "fester Ansprechpartner" auf der Website
 * vorher sechzigmal vorkam, ohne dass dieser Ansprechpartner je einen Namen
 * oder ein Gesicht hatte. Genau das ist der Unterschied zwischen einer
 * austauschbaren Dienstleisterseite und einer, hinter der jemand steht.
 */

export const owner = {
  name: "Tolga Doguc",
  role: "Inhaber",

  /**
   * Porträt.
   *
   * Sobald die Datei unter `public/images/team/tolga-doguc.webp` liegt, hier
   * den Pfad eintragen — das Layout ist darauf vorbereitet und wechselt von
   * selbst von der textbasierten auf die zweispaltige Darstellung mit Bild.
   * Solange hier `null` steht, bleibt der Abschnitt vollständig, nur eben
   * ohne Foto. Kein grauer Platzhalter, kein gebrochenes Bild.
   *
   * Empfehlung fürs Foto: Oberkörper, echter Arbeitskontext statt Studio,
   * Blick in die Kamera, Hochformat 4:5, mindestens 1200 px breit.
   */
  photo: null as string | null,
  photoAlt: "Tolga Doguc, Inhaber von Glanzwerk Reinigungsservice Berlin",

  /**
   * Bildausschnitt des Porträts.
   *
   * Die Bildfläche auf der Startseite läuft im Hochformat (3:4) und
   * beschneidet über `object-fit: cover`. Welcher Teil der Aufnahme dabei
   * stehen bleibt, hängt davon ab, wo der Kopf im Bild sitzt — deshalb hier
   * einstellbar statt fest im Bauteil. `center 30%` hält den Kopf im oberen
   * Drittel und lässt Oberkörper und Umgebung sichtbar; nach dem Einsetzen
   * des echten Fotos genügt es, diesen Wert zu justieren.
   */
  photoObjectPosition: "center 30%",

  /**
   * Die Reaktionszusage. Bewusst mit Einschränkung auf die Geschäftszeiten:
   * ein Versprechen, das nachts nicht gilt, aber immer gehalten wird, ist
   * mehr wert als eine runde Zahl, die um 23 Uhr bricht.
   */
  responseTime: "innerhalb von 2 Stunden",
  responseTimeQualifier: "während der Geschäftszeiten",

  /**
   * Erste Person, kein Marketing-Wir. Jede Aussage hier muss stimmen —
   * dieser Abschnitt ist der einzige auf der Seite, der persönlich haftet.
   */
  quote:
    "Anfragen landen bei Glanzwerk nicht in einem Sammelpostfach. Wenn Sie schreiben oder anrufen, komme ich zurück — nicht ein Callcenter und nicht ein Formular-Autoresponder. Ich schaue mir Ihr Objekt an und sage Ihnen ehrlich, was sinnvoll ist und was Sie sich sparen können.",
} as const;

/**
 * Dienstfahrzeug.
 *
 * Ein beschriftetes Fahrzeug vor einem echten Berliner Objekt ist das Bild,
 * das kein Wettbewerber kopieren und keine Bilddatenbank liefern kann.
 * Sobald die Aufnahme vorliegt, hier eintragen — der Abschnitt auf der
 * Startseite erscheint dann automatisch und fällt bis dahin sauber weg.
 */
export const serviceVehiclePhoto: { src: string; alt: string } | null = null;
