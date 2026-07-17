"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        Fehler
      </p>
      <h1 className="mt-3 text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
        Es ist ein unerwarteter Fehler aufgetreten
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        Bitte versuchen Sie es erneut. Sollte der Fehler weiterhin
        auftreten, kontaktieren Sie uns gerne direkt.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Erneut versuchen</Button>
        <Button href="/" variant="outline">
          Zur Startseite
        </Button>
      </div>
    </div>
  );
}
