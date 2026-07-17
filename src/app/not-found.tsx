import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        Fehler 404
      </p>
      <h1 className="mt-3 text-3xl font-display font-medium tracking-tight text-brand-900 sm:text-4xl">
        Diese Seite konnte nicht gefunden werden
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        Die aufgerufene Seite existiert nicht oder wurde verschoben. Nutzen
        Sie die Navigation oder kehren Sie zur Startseite zurück.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Zur Startseite</Button>
        <Button href="/kontakt" variant="outline">
          Kontakt aufnehmen
        </Button>
      </div>
    </div>
  );
}
