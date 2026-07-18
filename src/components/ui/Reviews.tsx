export interface Review {
  author: string;
  rating: number;
  text: string;
  date?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "var(--color-accent-500)" : "none"}
          stroke="var(--color-accent-500)"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.3l-5.8 3.2 1.1-6.5-4.8-4.6 6.6-.9L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-200 bg-graphite-50/60 p-10 text-center">
        <p className="text-sm text-ink-soft">
          Bewertungen unserer Kunden veröffentlichen wir hier, sobald sie vorliegen.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, index) => (
        <li
          key={`${review.author}-${index}`}
          className="flex flex-col rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgb(7_26_58/0.04)]"
        >
          <Stars rating={review.rating} />
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
            &ldquo;{review.text}&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="font-semibold text-brand-900">{review.author}</span>
            {review.date && <span className="text-ink-soft">{review.date}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
