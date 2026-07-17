import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/leistungen/bueroreinigung-berlin" */
  path: string;
  noIndex?: boolean;
}

export function buildMetadata({ title, description, path, noIndex }: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
