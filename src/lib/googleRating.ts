import { googleBusiness } from "@/data/googleBusiness";

export interface GoogleRatingData {
  /** Durchschnittliche Sternbewertung, z. B. 5 oder 4.7. */
  rating: number;
  /** Anzahl der Rezensionen. */
  count: number;
  /** true, wenn der Wert in diesem Durchlauf von Google kam. */
  live: boolean;
}

/**
 * Antwortform der Places API (New), reduziert auf die beiden Felder, die wir
 * per FieldMask anfordern. Alles andere interessiert uns nicht und wird von
 * Google auch nicht geliefert — jedes zusätzliche Feld kostet Kontingent.
 */
interface PlacesResponse {
  rating?: unknown;
  userRatingCount?: unknown;
}

/**
 * Holt Sternwert und Rezensionsanzahl aus dem Google-Unternehmensprofil.
 *
 * Die Funktion wirft nie. Jeder Fehlerfall — fehlende Zugangsdaten, Netzwerk,
 * Kontingent erschöpft, unerwartete Antwortform — endet im geprüften
 * Fallback aus `googleBusiness`. Eine Bewertungsanzeige, die bei einer
 * hakeligen API verschwindet oder die Seite zum Absturz bringt, wäre
 * schlimmer als eine, die einen Tag alt ist.
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
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
        next: { revalidate: googleBusiness.revalidateSeconds },
      },
    );

    if (!response.ok) return fallback;

    const data = (await response.json()) as PlacesResponse;
    const rating = data.rating;
    const count = data.userRatingCount;

    // Streng prüfen statt vertrauen: eine 0 oder ein String an dieser Stelle
    // würde sonst als "0,0 Sterne" auf der Startseite landen.
    if (typeof rating !== "number" || !Number.isFinite(rating) || rating <= 0) return fallback;
    if (typeof count !== "number" || !Number.isFinite(count) || count < 1) return fallback;

    return { rating, count, live: true };
  } catch {
    return fallback;
  }
}
