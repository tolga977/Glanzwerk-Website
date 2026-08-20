import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Display serif for headings only — pairs with the native system-font body copy to give the
// site a distinctive, editorial "premium agency" character instead of the
// single-sans look shared by most competitor sites.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-ink">
        {/* Fallback für Browser ohne Unterstützung der scripting-Media-Query:
            ohne JavaScript dürfen Scroll-Einblendungen keine Inhalte verbergen. */}
        <noscript>
          <style>{`.fade-in-up{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Zum Inhalt springen
        </a>
        {/*
          Die Hinweisleiste ueber dem Header ist entfernt — nicht ausgeblendet,
          sondern aus dem Layout genommen. Sie kostete 41 px Bildschirmhoehe
          auf jeder Seite und schob die Marke unter eine Werbezeile. Die
          dreimonatige Testphase bleibt auf der Startseite dreifach vertreten
          (Beweisband, eigener Abschnitt, Formular-Checkliste) und behaelt ihre
          eigene Seite unter /3-monate-testen.
        */}
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
