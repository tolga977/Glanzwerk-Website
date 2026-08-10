"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import FormField from "@/components/forms/FormField";
import { FormAlert } from "@/components/forms/FormError";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import {
  emptyContactRequest,
  SONSTIGES_SLUG,
  submitContactRequest,
  validateContactRequest,
  type ContactRequestErrors,
  type ContactRequestValues,
} from "@/lib/contactRequest";

/**
 * Angebotsanfrage in vier Schritten — das Panel in der Hero-Bühne.
 *
 * ── Ein Flow, nicht vier Formulare ──────────────────────────────────────
 * Es gibt genau ein <form> und genau einen Zustand. Sichtbar ist immer nur
 * der aktuelle Schritt; „Weiter" prüft die Felder dieses Schritts und rückt
 * vor, „Zurück" geht ohne Prüfung zurück. Weil alle Werte in einem einzigen
 * Zustandsobjekt liegen, kann beim Wechsel nichts verloren gehen — auch
 * nicht beim Zurückgehen und erneuten Vorgehen.
 *
 * Ein <form> und nicht vier: damit die Eingabetaste in jedem Schritt das
 * Naheliegende tut, ohne dass dafür ein Tastatur-Listener nötig wäre. In den
 * Schritten 1 bis 3 rückt sie vor, im vierten sendet sie ab. `handleSubmit`
 * entscheidet das anhand des Schritts.
 *
 * ── Prüfung je Schritt, nicht am Ende ───────────────────────────────────
 * Geprüft wird immer nur, was im aktuellen Schritt steht. Ein Fehler in
 * Schritt 2 darf nicht auftauchen, während jemand noch in Schritt 1 ist —
 * und ein Fehler in Schritt 1 darf nicht erst beim Absenden erscheinen.
 *
 * Pflichtangaben sind absichtlich wenige: Leistung, Name, E-Mail und die
 * Datenschutzbestätigung. Firma, Telefon und der Freitext bleiben
 * freiwillig. Dieses Formular steht im ersten Bildschirm — jedes zusätzliche
 * Pflichtfeld ist dort eine Hürde, und zum Antworten genügen Name und
 * E-Mail. Die Prüfregeln selbst liegen in `@/lib/contactRequest`, gemeinsam
 * mit dem Formular auf /kontakt.
 *
 * ── Barrierefreiheit ────────────────────────────────────────────────────
 * Beim Schrittwechsel wandert der Fokus auf die Überschrift des neuen
 * Schritts. Ohne das bliebe er auf der „Weiter"-Schaltfläche, die im neuen
 * Schritt an einer anderen Stelle steht — wer mit der Tastatur arbeitet,
 * müsste sich neu orientieren, und wer einen Screenreader benutzt, bekäme
 * den Wechsel überhaupt nicht mitgeteilt.
 *
 * Der Fortschritt steht zusätzlich als Text („Schritt 2 von 4") und wird
 * über `aria-live` angekündigt. Die vier Balken daneben sind reine
 * Wiederholung für das Auge und deshalb `aria-hidden` — der Fortschritt darf
 * nicht ausschließlich über Farbe transportiert werden.
 *
 * ── Bewegung ────────────────────────────────────────────────────────────
 * Ein Schrittwechsel wird pro Anfrage höchstens eine Handvoll Mal ausgelöst
 * und ist damit ein Zustandswechsel, der eine kurze Bewegung verträgt: 200 ms
 * Aufblenden mit vier Pixeln Versatz über die vorhandene Utility
 * `.panel-reveal`. Zwischen Tastendrücken innerhalb eines Schritts passiert
 * nichts — Eingabefelder animieren nicht.
 *
 * ── Zur Übermittlung ────────────────────────────────────────────────────
 * `submitContactRequest` ist der unveränderte Projektstand und sendet noch
 * nichts (siehe die Warnung im Kopf von `@/lib/contactRequest`). Dieses
 * Bauteil erfindet dafür keinen Ersatz.
 */

const SCHRITTE = 4;

interface StepDef {
  titel: string;
  frage: string;
  /** Was dieser Schritt prüft, bevor er weiterlässt. */
  pflicht: (keyof ContactRequestValues)[];
}

const schritte: StepDef[] = [
  {
    titel: "Ihr Anliegen",
    frage: "Welche Leistung benötigen Sie?",
    pflicht: ["service"],
  },
  {
    titel: "Kontaktdaten",
    frage: "Wie können wir Sie erreichen?",
    pflicht: ["name", "email"],
  },
  {
    titel: "Weitere Informationen",
    frage: "Gibt es noch etwas, das wir wissen sollten?",
    pflicht: [],
  },
  {
    titel: "Zusammenfassung",
    frage: "Bitte prüfen Sie Ihre Angaben.",
    pflicht: ["privacy"],
  },
];

/** Anzeigename einer Leistung — oder die Freitextangabe bei „Sonstiges". */
function leistungLabel(values: ContactRequestValues): string {
  if (values.service === SONSTIGES_SLUG) {
    return values.serviceOther.trim() || "Sonstiges";
  }
  return services.find((s) => s.slug === values.service)?.shortTitle ?? "—";
}

export default function HeroQuoteWizard() {
  const [schritt, setSchritt] = useState(0);
  const [values, setValues] = useState<ContactRequestValues>(emptyContactRequest);
  const [errors, setErrors] = useState<ContactRequestErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  /** Erst nach dem ersten Schrittwechsel den Fokus setzen — nicht beim Laden. */
  const bewegt = useRef(false);
  const titelRef = useRef<HTMLParagraphElement>(null);
  const panelId = useId();

  function updateField<K extends keyof ContactRequestValues>(
    field: K,
    value: ContactRequestValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    /* Fehler verschwindet, sobald korrigiert wird — nicht erst beim nächsten
       Prüfdurchgang. Eine stehende Fehlermeldung neben einem inzwischen
       gefüllten Feld ist die häufigste Reibung in Formularen. */
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  /*
   * Fokus auf die Überschrift des neuen Schritts. Nur nach einem echten
   * Wechsel: beim ersten Rendern würde ein Fokussprung die Seite auf das
   * Formular scrollen, bevor jemand die Überschrift der Bühne gelesen hat.
   */
  useEffect(() => {
    if (!bewegt.current) return;
    titelRef.current?.focus();
  }, [schritt, status]);

  function pruefen(bis: number): boolean {
    const pflicht = schritte[bis].pflicht;
    /*
     * Die Pflichtmeldung für `name` ist hier überschrieben, weil das Feld in
     * diesem Formular Person UND Unternehmen aufnimmt. Der Standardtext
     * („Bitte geben Sie Ihren Namen an.") gilt weiter auf /kontakt, wo es ein
     * eigenes Feld für das Unternehmen gibt.
     */
    const alle = validateContactRequest(values, pflicht, {
      name: "Bitte geben Sie Ihren Namen oder Ihr Unternehmen an.",
    });

    /* Nur die Felder dieses Schritts übernehmen. `validateContactRequest`
       prüft E-Mail-Form und den Freitext bei „Sonstiges" immer mit — was
       hier richtig ist, solange beides in diesem Schritt steht. */
    const relevant: ContactRequestErrors = {};
    const felder: (keyof ContactRequestValues)[] = [
      ...pflicht,
      ...(bis === 0 ? (["serviceOther"] as const) : []),
      ...(bis === 1 ? (["email"] as const) : []),
    ];
    for (const f of felder) {
      if (alle[f]) relevant[f] = alle[f];
    }

    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!pruefen(schritt)) return;

    if (schritt < SCHRITTE - 1) {
      bewegt.current = true;
      setSchritt((s) => s + 1);
      return;
    }

    setStatus("submitting");
    try {
      await submitContactRequest(values);
      bewegt.current = true;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function zurueck() {
    bewegt.current = true;
    setErrors({});
    setSchritt((s) => Math.max(0, s - 1));
  }

  /* Aus der Zusammenfassung heraus einen bestimmten Schritt öffnen. */
  function springeZu(ziel: number) {
    bewegt.current = true;
    setErrors({});
    setSchritt(ziel);
  }

  const aktuell = schritte[schritt];

  /*
   * Das Panel.
   *
   * Weiße Fläche, sehr feiner Rahmen, ein Schatten aus der Elevation-Familie
   * der Website. Kein Glas, keine Unschärfe, keine Transparenz: das Panel
   * liegt über einem Foto und muss Eingabefelder tragen — eine
   * durchscheinende Fläche würde die Feldrahmen gegen wechselndes
   * Bildmaterial stellen und wäre genau die Optik, die hier nicht gewollt
   * ist. Radius aus der Radiusfamilie (`rounded-card`), nicht maximal
   * gerundet.
   *
   * Der Schatten ist wieder `shadow-float`, nicht mehr `shadow-deep`. Der
   * tiefe Schatten stammte aus der Phase, in der das Panel auf einer sehr
   * hellen Fläche kaum Kante hatte. Über dem jetzigen, farbkräftigen Foto
   * kippte er ins Plakative — ein aufgeklebtes Objekt statt einer schwebenden
   * Fläche. Der flachere Wert trägt die Staffelung vor der Person genauso,
   * nur leiser. Beide Werte kommen aus der Elevation-Familie der Website.
   *
   * Die Innenabstände und Schriftgrade sind eine Stufe verdichtet (p-5/p-6
   * statt p-6/p-7, Untertitel 12 px): gemessen war das Panel 432 px hoch und
   * damit das größte Einzelobjekt der Bühne — höher als die Person im Bild.
   * Nach der Verdichtung sind es rund 400 px; die Fläche bleibt dieselbe
   * Bauform, nur weniger vertikal gestreckt.
   */
  if (status === "success") {
    return (
      <div className="rounded-[1rem] border border-white/80 bg-white p-5 shadow-float ring-1 ring-brand-900/[0.04] sm:p-6">
        <p
          ref={titelRef}
          tabIndex={-1}
          className="font-display text-xl font-medium text-brand-900 focus:outline-none"
        >
          Vielen Dank für Ihre Anfrage
        </p>
        <div className="mt-5">
          <FormAlert
            type="success"
            message={`Ihre Angaben sind vollständig. Wir melden uns bei Ihnen unter ${values.email.trim()}.`}
          />
        </div>
        <dl className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-ink-muted">Leistung</dt>
            <dd className="font-medium text-brand-900">{leistungLabel(values)}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-ink-muted">Name</dt>
            <dd className="font-medium text-brand-900">{values.name.trim()}</dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <div className="rounded-[1rem] border border-white/80 bg-white p-5 shadow-float ring-1 ring-brand-900/[0.04] sm:p-6">
      {/* Kopf: Titel links, Fortschritt rechts. */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-lg font-medium text-brand-900">
            Kostenloses Angebot anfordern
          </p>
          <p className="mt-0.5 text-xs text-ink-soft">Unverbindlich in 4 Schritten</p>
        </div>
        <p
          aria-live="polite"
          className="shrink-0 pt-1 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted"
        >
          Schritt {schritt + 1} von {SCHRITTE}
        </p>
      </div>

      {/*
        Fortschrittsbalken — vier Segmente, gefüllt bis zum aktuellen Schritt.
        `aria-hidden`, weil die Zeile darüber denselben Stand als Text nennt:
        die Information darf nicht nur in der Farbe liegen.
      */}
      <div aria-hidden="true" className="mt-3 flex gap-1.5">
        {Array.from({ length: SCHRITTE }, (_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ease-out ${
              i <= schritt ? "bg-brand-500" : "bg-line"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5">
        {/*
          `key` am Container: der Schrittwechsel soll die Einblendung erneut
          auslösen. Ohne den Schlüssel bliebe das Element dasselbe und die
          Animation liefe nur einmal.
        */}
        <div key={schritt} className="panel-reveal motion-reduce:animate-none">
          <p
            ref={titelRef}
            tabIndex={-1}
            className="font-display text-base font-medium text-brand-900 focus:outline-none"
          >
            {schritt + 1}. {aktuell.titel}
          </p>
          <p className="mt-1 text-sm text-ink-soft" id={`${panelId}-frage`}>
            {aktuell.frage}
          </p>

          <div className="mt-4 space-y-3.5">
            {schritt === 0 && (
              <>
                <FormField
                  as="select"
                  label="Leistung"
                  name="service"
                  required
                  value={values.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  error={errors.service}
                  aria-describedby={`${panelId}-frage`}
                >
                  <option value="">Bitte auswählen</option>
                  {/* Die echten Leistungen des Projekts, nicht eine Auswahl daraus. */}
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.shortTitle}
                    </option>
                  ))}
                  <option value={SONSTIGES_SLUG}>Sonstiges</option>
                </FormField>

                {/*
                  Erscheint nur bei „Sonstiges" — und ist dann Pflicht. Eine
                  Anfrage, deren Leistung „Sonstiges" heißt und die keinen
                  Text mitbringt, enthält keine Information.
                */}
                {values.service === SONSTIGES_SLUG && (
                  <div className="panel-reveal motion-reduce:animate-none">
                    <FormField
                      as="textarea"
                      rows={3}
                      label="Ihr Anliegen"
                      name="serviceOther"
                      required
                      value={values.serviceOther}
                      onChange={(e) => updateField("serviceOther", e.target.value)}
                      error={errors.serviceOther}
                      placeholder="Beschreiben Sie kurz Ihr Anliegen."
                    />
                  </div>
                )}
              </>
            )}

            {schritt === 1 && (
              <>
                {/*
                  ── Ein Feld für Person und Unternehmen ────────────────────
                  Hier standen zwei getrennte Felder: „Name" (Pflicht) und
                  „Unternehmen (optional)". Für eine Anfrage im ersten
                  Bildschirm ist das eine Unterscheidung, die den Absender
                  nichts angeht — wer schreibt, gibt an, wer er ist, und ob
                  das eine Person oder eine Firma ist, ergibt sich aus der
                  Eingabe selbst.

                  „Name / Unternehmen" statt „Ihr Name oder Unternehmen": die
                  übrigen Beschriftungen dieses Formulars und des Formulars auf
                  /kontakt sind knappe Substantive („E-Mail-Adresse",
                  „Telefonnummer", „Art des Objekts"). Eine ausgeschriebene
                  Frage wäre hier die einzige Ausnahme.

                  `autocomplete="name"` bleibt: bei einem gemischten Feld
                  trifft die Personenangabe den häufigeren Fall, und sie
                  verhindert, dass der Browser eine Firma dort einsetzt, wo
                  jemand seinen Namen erwartet.

                  Das Feld `company` des gemeinsamen Datenmodells wird von
                  diesem Formular nicht mehr gefüllt. Es bleibt im Modell, weil
                  das Formular auf /kontakt es weiterhin eigenständig erhebt.
                */}
                <FormField
                  label="Name / Unternehmen"
                  name="name"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  error={errors.name}
                />
                <FormField
                  label="E-Mail-Adresse"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  error={errors.email}
                />
                <FormField
                  label="Telefonnummer (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  error={errors.phone}
                />
              </>
            )}

            {schritt === 2 && (
              <FormField
                as="textarea"
                rows={5}
                label="Ihre Angaben (optional)"
                name="message"
                value={values.message}
                onChange={(e) => updateField("message", e.target.value)}
                error={errors.message}
                /*
                  Der Hilfetext nennt Beispiele und behauptet ausdrücklich
                  nicht, dass diese Angaben nötig wären — der letzte Satz ist
                  der wichtigere.
                */
                placeholder="z. B. Größe der Fläche, Anzahl der Räume, gewünschter Reinigungsturnus oder besondere Anforderungen. Alternativ klären wir die Details gerne persönlich."
              />
            )}

            {schritt === 3 && (
              <>
                {status === "error" && (
                  <FormAlert
                    type="error"
                    message="Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
                  />
                )}

                {/*
                  Zusammenfassung mit Sprungmarken. Jede Zeile lässt sich
                  ändern, ohne sich vorher durch „Zurück" zu klicken — das ist
                  der Unterschied zwischen einer Übersicht und einer
                  Kontrollinstanz.
                */}
                <dl className="divide-y divide-line rounded-control border border-line">
                  {[
                    { label: "Leistung", wert: leistungLabel(values), ziel: 0 },
                    {
                      label: "Kontakt",
                      /* `company` steht hier nicht mehr: Schritt 2 erhebt es
                         nicht, und ein Feld in der Zusammenfassung, das nie
                         gefüllt werden kann, wäre eine leere Zeile. */
                      wert: [values.name.trim(), values.email.trim(), values.phone.trim()]
                        .filter(Boolean)
                        .join(" · "),
                      ziel: 1,
                    },
                    {
                      label: "Weitere Angaben",
                      wert: values.message.trim() || "Keine",
                      ziel: 2,
                    },
                  ].map((zeile) => (
                    <div key={zeile.label} className="flex items-start gap-3 px-4 py-3">
                      <dt className="w-32 shrink-0 text-sm text-ink-muted">{zeile.label}</dt>
                      <dd className="min-w-0 flex-1 text-sm text-brand-900">
                        <span className="break-words">{zeile.wert}</span>
                      </dd>
                      <button
                        type="button"
                        onClick={() => springeZu(zeile.ziel)}
                        className="shrink-0 rounded-control px-1 text-sm font-semibold text-brand-500 transition-colors duration-200 ease-out hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                      >
                        Ändern
                        <span className="sr-only"> – {zeile.label}</span>
                      </button>
                    </div>
                  ))}
                </dl>

                {/* Unveränderte Datenschutzbestätigung — Pflicht wie im Formular auf /kontakt. */}
                <div>
                  <label className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={values.privacy}
                      onChange={(e) => updateField("privacy", e.target.checked)}
                      aria-invalid={!!errors.privacy}
                      aria-describedby={errors.privacy ? "hero-privacy-error" : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong text-brand-500 focus:ring-brand-500/40"
                    />
                    <span>
                      Ich habe die{" "}
                      <Link
                        href="/datenschutz"
                        className="font-medium text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                      >
                        Datenschutzerklärung
                      </Link>{" "}
                      zur Kenntnis genommen. *
                    </span>
                  </label>
                  {errors.privacy && (
                    <span id="hero-privacy-error">
                      <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.privacy}
                      </p>
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/*
          Schaltflächen. „Zurück" erscheint erst ab Schritt 2 — im ersten
          Schritt hätte es kein Ziel und wäre nur ein toter Knopf.
        */}
        <div className="mt-5 flex items-center gap-3">
          {schritt > 0 && (
            <button
              type="button"
              onClick={zurueck}
              className="press inline-flex min-h-11 items-center rounded-control px-3 text-sm font-semibold text-ink-soft transition-colors duration-200 ease-out hover:text-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Zurück
            </button>
          )}
          <Button
            type="submit"
            size="md"
            disabled={status === "submitting"}
            /*
              `flex-1` statt `ml-auto w-full sm:w-auto`: die Schaltfläche
              nimmt den verfügbaren Raum der Zeile ein, statt als kleiner
              Knopf unten rechts zu stehen. In Schritt 1 gibt es kein
              „Zurück", dort läuft sie über die ganze Panelbreite; ab Schritt 2
              teilt sie die Zeile mit „Zurück" und bleibt die dominante
              Fläche. Größe, Text und Verhalten sind unverändert.
            */
            className="flex-1"
          >
            {schritt < SCHRITTE - 1
              ? "Weiter"
              : status === "submitting"
                ? "Wird gesendet…"
                : "Anfrage absenden"}
          </Button>
        </div>
      </form>
    </div>
  );
}
