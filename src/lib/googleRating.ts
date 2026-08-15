import { googleBusiness } from "@/data/googleBusiness";

/**
 * Eine einzelne, von Google gelieferte Rezension.
 *
 * Jedes Feld stammt unverändert aus der Places API. Es wird hier nichts
 * gekürzt, umformuliert oder zusammengefasst — eine Bewertung, die auf der
 * Website anders klingt als bei Google, wäre keine Bewertung mehr.
 */
export interface GoogleReview {
  /** Stabiler Schlüssel aus dem Ressourcennamen der Rezension. */
  id: string;
  /** Anzeigename der Person, so wie er im öffentlichen Profil steht. */
  author: string;
  /** Sternwert dieser einzelnen Rezension. */
  rating: number;
  /** Der Rezensionstext im Original. */
  text: string;
  /** Von Google formulierte relative Zeitangabe, z. B. "vor 2 Monaten". */
  publishedLabel: string;
  /**
   * Profilbild aus dem Google-Konto der rezensierenden Person.
   *
   * Kommt unverändert aus `authorAttribution.photoUri` — demselben Feld, aus
   * dem bereits `author` gelesen wird, keine zusätzliche FieldMask nötig.
   * Fehlt es (nicht jedes Google-Konto hat ein Profilbild), bleibt der Wert
   * `undefined`; die Anzeige fällt dann auf ein Initialen-Kürzel zurück statt
   * ein kaputtes Bild zu zeigen.
   */
  photoUrl?: string;
}

export interface GoogleRatingData {
  /** Durchschnittliche Sternbewertung, z. B. 5 oder 4.7. */
  rating: number;
  /** Anzahl der Rezensionen. */
  count: number;
  /** true, wenn der Wert in diesem Durchlauf von Google kam. */
  live: boolean;
  /**
   * Rezensionen mit Text, höchstens fünf — mehr gibt die Places API nicht
   * heraus.
   *
   * Leer, solange die Zugangsdaten fehlen. Das ist kein Fehlerfall: die
   * Komponenten, die diese Liste anzeigen, rendern dann schlicht nicht.
   * Es gibt in diesem Projekt keine hinterlegten Ersatztexte, weil eine
   * erfundene Bewertung schlimmer wäre als gar keine.
   */
  reviews: GoogleReview[];
}

/**
 * Antwortform der Places API (New), reduziert auf die Felder, die wir per
 * FieldMask anfordern. Alles andere interessiert uns nicht und wird von
 * Google auch nicht geliefert — jedes zusätzliche Feld kostet Kontingent.
 */
interface PlacesResponse {
  rating?: unknown;
  userRatingCount?: unknown;
  reviews?: unknown;
}

/**
 * Wandelt einen einzelnen Eintrag aus `reviews` in unsere Form um.
 *
 * Gibt `null` zurück, sobald irgendetwas fehlt oder den falschen Typ hat.
 * Lieber eine Rezension weglassen als eine halb gefüllte anzeigen: ein
 * Zitat ohne Namen oder ein Name ohne Text liest sich wie ein Platzhalter.
 */
function parseReview(raw: unknown): GoogleReview | null {
  if (typeof raw !== "object" || raw === null) return null;
  const entry = raw as Record<string, unknown>;

  const name = entry.name;
  const rating = entry.rating;
  const textNode = entry.text as { text?: unknown } | undefined;
  const authorNode = entry.authorAttribution as { displayName?: unknown } | undefined;
  const publishedLabel = entry.relativePublishTimeDescription;

  const text = typeof textNode?.text === "string" ? textNode.text.trim() : "";
  const author = typeof authorNode?.displayName === "string" ? authorNode.displayName.trim() : "";
  const photoUri = (authorNode as { photoUri?: unknown } | undefined)?.photoUri;

  if (typeof name !== "string" || name.length === 0) return null;
  if (typeof rating !== "number" || !Number.isFinite(rating) || rating < 1) return null;
  if (text.length === 0 || author.length === 0) return null;

  return {
    id: name,
    author,
    rating,
    text,
    publishedLabel: typeof publishedLabel === "string" ? publishedLabel : "",
    photoUrl: typeof photoUri === "string" && photoUri.length > 0 ? photoUri : undefined,
  };
}

/**
 * Holt Sternwert, Rezensionsanzahl und Rezensionstexte aus dem
 * Google-Unternehmensprofil.
 *
 * Die Funktion wirft nie. Jeder Fehlerfall — fehlende Zugangsdaten, Netzwerk,
 * Kontingent erschöpft, unerwartete Antwortform — endet im geprüften
 * Fallback aus `googleBusiness`. Eine Bewertungsanzeige, die bei einer
 * hakeligen API verschwindet oder die Seite zum Absturz bringt, wäre
 * schlimmer als eine, die einen Tag alt ist.
 *
 * Wichtig zum Fallback: Sternwert und Anzahl haben einen von Hand geprüften
 * Ersatzwert, die Rezensionstexte nicht. Der Zahlenwert ist nachprüfbar
 * abgelesen worden; ein Rezensionstext lässt sich nicht "hinterlegen", ohne
 * ihn zu erfinden. Ohne Zugangsdaten bleibt `reviews` deshalb leer.
 *
 * Nur serverseitig aufrufen: der API-Schlüssel darf den Server nicht
 * verlassen. Deshalb steht hier bewusst kein "use client" und die Funktion
 * wird ausschließlich aus Server Components benutzt.
 */
export async function getGoogleRating(): Promise<GoogleRatingData> {
  const fallback: GoogleRatingData = {
    rating: googleBusiness.fallback.rating,
    count: googleBusiness.fallback.count,
    live: false,
    reviews: [],
  };

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return fallback;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          // Ohne FieldMask antwortet die Places API (New) mit 400.
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: googleBusiness.revalidateSeconds },
      },
    );

    if (!response.ok) {
      // Nur Statuscode und Googles eigene Kernmeldung aus dem Antwortkörper —
      // nie Header oder Anfragedaten. Der Schlüssel steht in keinem von
      // beiden, da Google ihn aus Sicherheitsgründen nie zurückspiegelt.
      const errorBody: unknown = await response.json().catch(() => null);
      const googleMessage =
        typeof errorBody === "object" &&
        errorBody !== null &&
        "error" in errorBody &&
        typeof (errorBody as { error?: { message?: unknown } }).error?.message === "string"
          ? (errorBody as { error: { message: string } }).error.message
          : "(keine Detailmeldung)";
      console.error(
        `[getGoogleRating] Places API antwortete ${response.status} ${response.statusText}: ${googleMessage}`,
      );
      return fallback;
    }

    const data = (await response.json()) as PlacesResponse;
    const rating = data.rating;
    const count = data.userRatingCount;

    // Streng prüfen statt vertrauen: eine 0 oder ein String an dieser Stelle
    // würde sonst als "0,0 Sterne" auf der Startseite landen.
    if (typeof rating !== "number" || !Number.isFinite(rating) || rating <= 0) return fallback;
    if (typeof count !== "number" || !Number.isFinite(count) || count < 1) return fallback;

    const reviews = Array.isArray(data.reviews)
      ? data.reviews
          .map(parseReview)
          .filter((review): review is GoogleReview => review !== null)
      : [];

    return { rating, count, live: true, reviews };
  } catch (error) {
    // Nur die Fehlermeldung, nie das Error-Objekt/die Request-Konfiguration —
    // aus demselben Grund wie oben.
    console.error(
      `[getGoogleRating] Abfrage fehlgeschlagen: ${error instanceof Error ? error.message : "unbekannter Fehler"}`,
    );
    return fallback;
  }
}
