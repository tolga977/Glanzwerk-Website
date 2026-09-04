/**
 * Google-Unternehmensprofil von Glanzwerk.
 *
 * ── Wie die Bewertung auf die Website kommt ─────────────────────────────
 * Die Anzeige holt Sternwert und Anzahl bei jedem Neuaufbau der Seite direkt
 * bei Google (siehe `src/lib/googleRating.ts`). Ändert sich die Bewertung von
 * 5,0 auf 4,8 oder kommt eine Rezension dazu, aktualisiert sich die Website
 * von selbst — ohne dass hier etwas angefasst werden muss.
 *
 * Dafür braucht der Server zwei Angaben als Umgebungsvariablen:
 *   GOOGLE_PLACES_API_KEY  — Schlüssel aus der Google Cloud Console,
 *                            Places API (New) muss aktiviert sein
 *   GOOGLE_PLACE_ID        — die Place-ID des Profils
 *
 * Solange die beiden fehlen (also auch in dieser Vorschau), zeigt die Seite
 * den unten hinterlegten, von Hand geprüften Stand. Die Anzeige sieht in
 * beiden Fällen identisch aus — es gibt keinen sichtbaren Unterschied
 * zwischen "live" und "Fallback".
 */

export const googleBusiness = {
  /**
   * Öffentliches Profil, auf das die Bewertungsanzeige verlinkt.
   *
   * Vom Betreiber bestätigter Google-Share-Link (Phase 7B) — ein von Google
   * selbst ausgestellter Kurzlink, der auf den Knowledge-Panel-Eintrag von
   * Glanzwerk führt (verifiziert: zeigt Adresse, Telefonnummer und 5,0 aus
   * 7 Rezensionen, deckungsgleich mit den Angaben in diesem Projekt). Das
   * eigentliche Weiterleitungsziel trägt eine Google-eigene, sitzungsbe-
   * zogene Such-URL mit Tracking-Parametern (u. a. `sei=`) — nicht stabil
   * genug für einen dauerhaften Verweis. Der Kurzlink selbst ist Googles
   * dafür vorgesehenes, dauerhaftes Format und bleibt deshalb die
   * verwendete Adresse, statt selbst eine Profil-URL aus Firmennamen oder
   * Place-ID zusammenzusetzen.
   */
  profileUrl: "https://share.google/Ko7qB5fwUIQJ1UU2L",

  /**
   * Von Hand geprüfter Stand, gültig bis die API antwortet.
   *
   * Am 29.07.2026 im Google-Unternehmensprofil abgelesen: 5,0 Sterne aus
   * 7 Rezensionen. Dieser Wert wird nicht geschätzt und nicht gerundet —
   * steht hier eine Zahl, wurde sie vorher gesehen.
   */
  fallback: {
    rating: 5,
    count: 7,
    checkedOn: "2026-07-29",
  },

  /**
   * Wie oft im Hintergrund neu bei Google nachgefragt wird (Sekunden).
   * Sechs Stunden: häufig genug, dass eine neue Rezension am selben Tag
   * sichtbar wird, selten genug, dass das kostenlose API-Kontingent reicht.
   */
  revalidateSeconds: 60 * 60 * 6,
} as const;
