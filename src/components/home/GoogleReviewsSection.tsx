"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { googleBusiness } from "@/data/googleBusiness";
import type { GoogleReview } from "@/lib/googleRating";

/**
 * Bewertungssektion direkt im Anschluss an das persönliche Kapitel.
 *
 * ── Datenquelle ──────────────────────────────────────────────────────────
 * Rating, Anzahl und Rezensionen kommen unverändert aus `getGoogleRating()`
 * (Places API, siehe src/lib/googleRating.ts) und damit von der Startseite
 * hereingereicht. Es gibt hier keine eigene Datenabfrage und keine
 * hinterlegten Ersatztexte — ohne echte Rezensionen rendert die Sektion
 * nichts, siehe `if (reviews.length === 0)` unten.
 *
 * ── Layout (Referenz-Screenshot, August 2026) ───────────────────────────
 * Links ein knapper Kennzahlenblock (Gesamturteil, Sterne, Anzahl,
 * Google-Wortmarke) — er nimmt nur so viel Breite ein, wie er braucht.
 * Direkt daneben, ohne Zwischenraum durch eine feste Spaltenbreite, die
 * Pfeil-Navigation und die Kartenspur: drei kompakte, hellgraue Karten
 * gleichzeitig sichtbar statt der vorherigen großen weißen Karten mit
 * vollständigem Fließtext. Lange Rezensionen werden auf drei Zeilen
 * begrenzt und lassen sich über „Weiterlesen" pro Karte aufklappen, statt
 * die ganze Karte von vornherein zu strecken.
 *
 * ── Warum kein Laufband wie ReviewMarquee ───────────────────────────────
 * Das Laufband (weiterhin in ReviewMarquee.tsx, hier nicht mehr eingesetzt)
 * bewegt sich von selbst. Diese Sektion soll das ausdrücklich nicht: die
 * Spur bewegt sich ausschließlich auf Eingabe — Finger, Mausrad oder die
 * beiden Pfeiltasten. Keine Animation heißt auch: nichts, das unter
 * reduzierter Bewegung abgeschaltet werden müsste.
 */

/** Originalfarben der Google-Bildmarke — Pflicht bei der Zuordnung von Rezensionen. */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/** Google-Wortmarke in Originalfarben — für den Kennzahlenblock, wie in der Referenz. */
function GoogleWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans font-medium tracking-tight ${className}`} aria-hidden="true">
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

const STAR_PATH =
  "M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27l7.1-1.01L12 2z";

function Stars({ rating, large = false }: { rating: number; large?: boolean }) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const box = large ? "h-5 w-5 sm:h-6 sm:w-6" : "h-3.5 w-3.5";
  const gap = large ? "gap-1" : "gap-0.5";
  const row = (fill: string) => (
    <div className={`flex ${gap}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${box} shrink-0`} aria-hidden="true">
          <path d={STAR_PATH} fill={fill} />
        </svg>
      ))}
    </div>
  );
  return (
    <div className="relative inline-block" aria-hidden="true">
      {row("#d2d8e1")}
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${percent}%` }}>
        {row("#f5a623")}
      </div>
    </div>
  );
}

/** "Anna Schmidt" → "AS" · "Cher" → "CH" — für Profile ohne Google-Foto. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

/** Gesamturteil in Worten, wie es Google-Widgets üblicherweise zeigen. */
function ratingWord(rating: number): string {
  if (rating >= 4.5) return "Ausgezeichnet";
  if (rating >= 3.5) return "Sehr gut";
  if (rating >= 2.5) return "Gut";
  return "Bewertet";
}

/*
 * Schwellenwert fürs Einblenden von "Weiterlesen": drei Zeilen fassen bei
 * der Kartenbreite (~280 px) und dieser Schriftgröße ungefähr 110–130
 * Zeichen. Ein Text darunter braucht die Klappe nicht — sie bliebe dann
 * wirkungslos, weil ohnehin nichts abgeschnitten wird.
 */
const REVIEW_TRUNCATE_THRESHOLD = 120;

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > REVIEW_TRUNCATE_THRESHOLD;

  return (
    <figure className="flex w-[16.5rem] shrink-0 snap-start flex-col rounded-[1rem] bg-graphite-100 p-4.5 sm:w-[17.5rem] sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          {review.photoUrl ? (
            <Image
              src={review.photoUrl}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-500"
            >
              {initials(review.author)}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-medium text-brand-900">{review.author}</p>
            {review.publishedLabel && (
              <p className="text-xs text-ink-soft">{review.publishedLabel}</p>
            )}
          </div>
        </div>
        <GoogleG className="mt-0.5 h-4 w-4 shrink-0" />
      </div>

      <div className="mt-3">
        <Stars rating={review.rating} />
      </div>

      <blockquote
        className={`mt-2.5 text-pretty text-sm leading-relaxed text-ink-soft ${expanded ? "" : "line-clamp-3"}`}
      >
        {review.text}
      </blockquote>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-1 self-start text-xs font-semibold text-ink-soft underline decoration-line-strong underline-offset-2 transition-colors duration-200 ease-out hover:text-brand-500 hover:decoration-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {expanded ? "Weniger anzeigen" : "Weiterlesen"}
        </button>
      )}
    </figure>
  );
}

export default function GoogleReviewsSection({
  reviews,
  rating,
  count,
}: {
  reviews: GoogleReview[];
  rating: number;
  count: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(reviews.length <= 1);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("figure");
    const step = card instanceof HTMLElement ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * step, behavior: reducedMotion ? "auto" : "smooth" });
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section
      aria-label="Bewertungen aus dem Google-Unternehmensprofil"
      className="border-b border-line bg-white py-10 sm:py-12"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
          {/* Kennzahlenblock — zentriert, nur so breit wie sein Inhalt. */}
          <div className="flex shrink-0 flex-col items-center text-center lg:pr-2">
            <p className="font-display text-2xl font-bold tracking-tight text-brand-900">
              {ratingWord(rating).toUpperCase()}
            </p>
            <div className="mt-2.5">
              <Stars rating={rating} large />
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
              Basierend auf{" "}
              <strong className="font-semibold text-brand-900">{count} Bewertungen</strong>
            </p>
            <a
              href={googleBusiness.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil auf Google ansehen"
              className="mt-3 inline-flex rounded-control transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <GoogleWordmark className="text-2xl" />
            </a>
          </div>

          {/* Pfeil-Navigation und Kartenspur — Pfeile flankieren die Spur direkt. */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            {reviews.length > 1 && (
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label="Vorherige Bewertungen"
                className="press hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-500 transition-colors duration-200 ease-out hover:bg-graphite-100 disabled:opacity-30 disabled:hover:bg-transparent lg:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            {/* Karten-Spur — reine Eingabebewegung, siehe .no-scrollbar in globals.css. */}
            <div
              ref={trackRef}
              onScroll={updateEdges}
              className="no-scrollbar flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto py-1"
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {reviews.length > 1 && (
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label="Weitere Bewertungen"
                className="press hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-500 transition-colors duration-200 ease-out hover:bg-graphite-100 disabled:opacity-30 disabled:hover:bg-transparent lg:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
