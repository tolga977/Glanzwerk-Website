import { getGoogleRating } from "@/lib/googleRating";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";

/**
 * Dünner Server-Component-Wrapper um `GoogleReviewsSection`, damit die
 * Sektion auf jeder Seite mit einer einzigen Zeile eingebunden werden kann,
 * ohne dass jede aufrufende Seite selbst `getGoogleRating()` abfragen und
 * die drei Werte durchreichen muss. Rendert nichts, solange keine echten
 * Rezensionen vorliegen (siehe GoogleReviewsSection.tsx).
 */
export default async function GoogleReviewsAuto() {
  const { reviews, rating, count } = await getGoogleRating();
  return <GoogleReviewsSection reviews={reviews} rating={rating} count={count} />;
}
