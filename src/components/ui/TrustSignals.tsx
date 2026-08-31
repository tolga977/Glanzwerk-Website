import { getGoogleRating } from "@/lib/googleRating";
import { googleBusiness } from "@/data/googleBusiness";

/**
 * Kompakter Vertrauensblock aus Versicherung und Google-Bewertung.
 *
 * Beide Fakten stehen bereits an anderer Stelle im Projekt (Startseite-Hero,
 * /ueber-uns) — dieser Block bringt sie zusätzlich direkt auf die
 * Leistungsseiten, statt sie nur eine Klickebene entfernt zu belassen. Die
 * Bewertung wird bei jedem Seitenaufbau live über `getGoogleRating()`
 * geholt, damit hier nie eine veraltete Zahl steht.
 */
export default async function TrustSignals() {
  const { rating, count } = await getGoogleRating();
  const ratingLabel = rating.toLocaleString("de-DE", { maximumFractionDigits: 1 });

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="flex gap-4 rounded-card border border-line bg-white p-6 shadow-raise">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3.5l7 2.6v5.4c0 4.5-3 8-7 9.4-4-1.4-7-4.9-7-9.4V6.1l7-2.6Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M8.7 12.2l2.3 2.3 4.3-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="font-display text-base font-medium text-brand-900">Betriebshaftpflichtversichert</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Glanzwerk ist bei der Allianz betriebshaftpflichtversichert (Deckungssumme 5 Mio. €) –
            für den Fall, dass bei der Arbeit an Ihrem Objekt tatsächlich einmal etwas schiefgeht.
          </p>
        </div>
      </div>
      <div className="flex gap-4 rounded-card border border-line bg-white p-6 shadow-raise">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <a
            href={googleBusiness.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-base font-medium text-brand-900 hover:text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {ratingLabel} von 5 Sternen bei Google
          </a>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Bewertung von {count} Kundinnen und Kunden auf dem Google-Unternehmensprofil von
            Glanzwerk.
          </p>
        </div>
      </div>
    </div>
  );
}
