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
      <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-raise">
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
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ease-out hover:bg-brand-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500"
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
                    className={`shrink-0 text-brand-500 transition-transform duration-200 ease-out ${
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
                  className="panel-reveal px-6 pb-5 text-sm leading-relaxed text-ink-soft"
                >
                  <p className="measure">{item.answer}</p>
                  {item.relatedLink && (
                    <Link
                      href={item.relatedLink.href}
                      className="mt-2 inline-block font-medium text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
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
