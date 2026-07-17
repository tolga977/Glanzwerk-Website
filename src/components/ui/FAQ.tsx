"use client";

import { useState } from "react";
import Link from "next/link";

export interface FAQItem {
  question: string;
  answer: string;
  relatedLink?: { label: string; href: string };
}

export default function FAQ({ items, idPrefix = "faq" }: { items: FAQItem[]; idPrefix?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ul className="divide-y divide-gray-100 rounded-3xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `${idPrefix}-q-${index}`;
          const panelId = `${idPrefix}-a-${index}`;
          return (
            <li key={item.question}>
              <h3 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-brand-900">
                    {item.question}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 text-brand-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </h3>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-6 pb-5 text-sm leading-relaxed text-ink-soft"
                >
                  <p>{item.answer}</p>
                  {item.relatedLink && (
                    <Link
                      href={item.relatedLink.href}
                      className="mt-2 inline-block font-medium text-brand-500 hover:underline"
                    >
                      {item.relatedLink.label}
                    </Link>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
