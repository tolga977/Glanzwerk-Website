"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import CalculatorProgress from "@/components/calculator/CalculatorProgress";
import { FieldError } from "@/components/forms/FormError";
import {
  objectTypeLabels,
  floorTypeLabels,
  pricingConfig,
  type FloorType,
  type ObjectType,
} from "@/lib/pricing/config";
import { calculateGeneralPrice, calculateStaircasePrice } from "@/lib/pricing/calculate";
import {
  validateContactStep,
  validateGeneralStep,
  validateObjectTypeStep,
  validateStaircaseStep,
} from "@/lib/pricing/validate";
import type { CalculatorFormValues, PriceEstimate, ValidationError } from "@/lib/pricing/types";
import Button from "@/components/ui/Button";

type Step = "objectType" | "details" | "contact" | "result";

const objectTypeOrder: ObjectType[] = [
  "buero",
  "arztpraxis",
  "kanzlei",
  "fitnessstudio",
  "autohaus",
  "kita",
  "treppenhaus",
  "sonstige",
];

const floorTypeOrder: FloorType[] = ["teppich", "hartboden", "beides"];

const initialValues: CalculatorFormValues = {
  objectType: "",
  customObjectDescription: "",
  areaSqm: "",
  floorType: "",
  kitchens: "0",
  toilets: "1",
  visitsPerWeek: "1",
  units: "",
  floors: "",
  hasBasement: false,
  hasElevator: false,
  staircaseCount: "1",
};

function errorFor(errors: ValidationError[], field: string): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}

export default function PriceCalculator() {
  const [step, setStep] = useState<Step>("objectType");
  const [values, setValues] = useState<CalculatorFormValues>(initialValues);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    privacyAccepted: false,
    honeypot: "",
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [estimate, setEstimate] = useState<PriceEstimate | null>(null);
  const idBase = useId();

  const isStaircase = values.objectType === "treppenhaus";

  function updateValue<K extends keyof CalculatorFormValues>(field: K, value: CalculatorFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleObjectTypeNext(e: FormEvent) {
    e.preventDefault();
    const stepErrors = validateObjectTypeStep(values.objectType, values.customObjectDescription);
    setErrors(stepErrors);
    if (stepErrors.length === 0) setStep("details");
  }

  function handleDetailsNext(e: FormEvent) {
    e.preventDefault();
    const stepErrors = isStaircase ? validateStaircaseStep(values) : validateGeneralStep(values);
    setErrors(stepErrors);
    if (stepErrors.length === 0) setStep("contact");
  }

  function handleContactSubmit(e: FormEvent) {
    e.preventDefault();
    const stepErrors = validateContactStep(contact);
    setErrors(stepErrors);
    if (stepErrors.length > 0) return;

    const result = isStaircase
      ? calculateStaircasePrice({
          units: Number(values.units),
          floors: Number(values.floors),
          hasBasement: values.hasBasement,
          hasElevator: values.hasElevator,
          staircaseCount: Number(values.staircaseCount),
          visitsPerWeek: Number(values.visitsPerWeek),
        })
      : calculateGeneralPrice({
          areaSqm: Number(values.areaSqm),
          floorType: (values.floorType || "hartboden") as FloorType,
          kitchens: Number(values.kitchens),
          toilets: Number(values.toilets),
          visitsPerWeek: Number(values.visitsPerWeek),
        });

    setEstimate(result);
    setErrors([]);
    setStep("result");
  }

  function goBack(target: Step) {
    setErrors([]);
    setStep(target);
  }

  function restart() {
    setValues(initialValues);
    setContact({ name: "", email: "", phone: "", privacyAccepted: false, honeypot: "" });
    setErrors([]);
    setEstimate(null);
    setStep("objectType");
  }

  const stepNumber = step === "objectType" ? 1 : step === "details" ? 2 : 3;

  return (
    <div>
      {step !== "result" && (
        <CalculatorProgress
          currentStep={stepNumber}
          totalSteps={3}
          label={
            step === "objectType" ? "Objektart" : step === "details" ? "Angaben zum Objekt" : "Kontakt"
          }
        />
      )}

      {step === "objectType" && (
        <form onSubmit={handleObjectTypeNext} noValidate className="flex flex-col gap-6">
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-brand-900">
              Um welche Art von Objekt geht es? <span className="text-brand-500">*</span>
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {objectTypeOrder.map((type) => (
                <label
                  key={type}
                  className={`flex min-h-11 cursor-pointer items-center rounded-control border px-4 py-2.5 text-sm font-medium transition-colors ${
                    values.objectType === type
                      ? "border-brand-500 bg-brand-50 text-brand-900"
                      : "border-line text-ink-soft hover:border-brand-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="objectType"
                    value={type}
                    checked={values.objectType === type}
                    onChange={() => updateValue("objectType", type)}
                    className="sr-only"
                  />
                  {objectTypeLabels[type]}
                </label>
              ))}
            </div>
            <FieldError message={errorFor(errors, "objectType")} />
          </fieldset>

          {values.objectType === "sonstige" && (
            <div>
              <label htmlFor={`${idBase}-custom`} className="mb-1.5 block text-sm font-medium text-brand-900">
                Beschreiben Sie kurz Ihre Gewerbefläche <span className="text-brand-500">*</span>
              </label>
              <textarea
                id={`${idBase}-custom`}
                rows={3}
                value={values.customObjectDescription}
                onChange={(e) => updateValue("customObjectDescription", e.target.value)}
                placeholder="z. B. Lagerhalle mit angeschlossenem Bürobereich"
                className="w-full rounded-control border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <FieldError message={errorFor(errors, "customObjectDescription")} />
            </div>
          )}

          <Button type="submit" className="w-full sm:w-auto sm:self-start">
            Weiter
          </Button>
        </form>
      )}

      {step === "details" && isStaircase && (
        <form onSubmit={handleDetailsNext} noValidate className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${idBase}-units`} className="mb-1.5 block text-sm font-medium text-brand-900">
                Anzahl Wohneinheiten <span className="text-brand-500">*</span>
              </label>
              <input
                id={`${idBase}-units`}
                type="number"
                inputMode="numeric"
                min={pricingConfig.limits.units.min}
                max={pricingConfig.limits.units.max}
                value={values.units}
                onChange={(e) => updateValue("units", e.target.value)}
                className="w-full rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <FieldError message={errorFor(errors, "units")} />
            </div>
            <div>
              <label htmlFor={`${idBase}-floors`} className="mb-1.5 block text-sm font-medium text-brand-900">
                Anzahl Etagen <span className="text-brand-500">*</span>
              </label>
              <input
                id={`${idBase}-floors`}
                type="number"
                inputMode="numeric"
                min={pricingConfig.limits.floors.min}
                max={pricingConfig.limits.floors.max}
                value={values.floors}
                onChange={(e) => updateValue("floors", e.target.value)}
                className="w-full rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <FieldError message={errorFor(errors, "floors")} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex min-h-11 items-center gap-2.5 rounded-control border border-line px-4 py-2.5 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={values.hasBasement}
                onChange={(e) => updateValue("hasBasement", e.target.checked)}
                className="h-4 w-4 rounded border-line-strong text-brand-500 focus:ring-brand-500/40"
              />
              Keller vorhanden
            </label>
            <label className="flex min-h-11 items-center gap-2.5 rounded-control border border-line px-4 py-2.5 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={values.hasElevator}
                onChange={(e) => updateValue("hasElevator", e.target.checked)}
                className="h-4 w-4 rounded border-line-strong text-brand-500 focus:ring-brand-500/40"
              />
              Fahrstuhl vorhanden
            </label>
          </div>

          <div>
            <label
              htmlFor={`${idBase}-staircases`}
              className="mb-1.5 block text-sm font-medium text-brand-900"
            >
              Anzahl Treppenhäuser <span className="text-brand-500">*</span>
            </label>
            <input
              id={`${idBase}-staircases`}
              type="number"
              inputMode="numeric"
              min={pricingConfig.limits.staircases.min}
              max={pricingConfig.limits.staircases.max}
              value={values.staircaseCount}
              onChange={(e) => updateValue("staircaseCount", e.target.value)}
              className="w-full max-w-xs rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <FieldError message={errorFor(errors, "staircaseCount")} />
          </div>

          <FrequencyField
            idBase={idBase}
            value={values.visitsPerWeek}
            onChange={(v) => updateValue("visitsPerWeek", v)}
            error={errorFor(errors, "visitsPerWeek")}
          />

          <StepNav onBack={() => goBack("objectType")} />
        </form>
      )}

      {step === "details" && !isStaircase && (
        <form onSubmit={handleDetailsNext} noValidate className="flex flex-col gap-5">
          <div>
            <label htmlFor={`${idBase}-area`} className="mb-1.5 block text-sm font-medium text-brand-900">
              Gesamtfläche (m²) <span className="text-brand-500">*</span>
            </label>
            <input
              id={`${idBase}-area`}
              type="number"
              inputMode="numeric"
              min={pricingConfig.limits.areaSqm.min}
              max={pricingConfig.limits.areaSqm.max}
              value={values.areaSqm}
              onChange={(e) => updateValue("areaSqm", e.target.value)}
              placeholder="z. B. 250"
              className="w-full rounded-control border border-line px-4 py-2.5 text-sm placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <FieldError message={errorFor(errors, "areaSqm")} />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-brand-900">
              Bodenart <span className="text-brand-500">*</span>
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {floorTypeOrder.map((floor) => (
                <label
                  key={floor}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-control border px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                    values.floorType === floor
                      ? "border-brand-500 bg-brand-50 text-brand-900"
                      : "border-line text-ink-soft hover:border-brand-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="floorType"
                    value={floor}
                    checked={values.floorType === floor}
                    onChange={() => updateValue("floorType", floor)}
                    className="sr-only"
                  />
                  {floorTypeLabels[floor]}
                </label>
              ))}
            </div>
            <FieldError message={errorFor(errors, "floorType")} />
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${idBase}-kitchens`}
                className="mb-1.5 block text-sm font-medium text-brand-900"
              >
                Anzahl Küchen <span className="text-brand-500">*</span>
              </label>
              <input
                id={`${idBase}-kitchens`}
                type="number"
                inputMode="numeric"
                min={pricingConfig.limits.kitchens.min}
                max={pricingConfig.limits.kitchens.max}
                value={values.kitchens}
                onChange={(e) => updateValue("kitchens", e.target.value)}
                className="w-full rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <FieldError message={errorFor(errors, "kitchens")} />
            </div>
            <div>
              <label
                htmlFor={`${idBase}-toilets`}
                className="mb-1.5 block text-sm font-medium text-brand-900"
              >
                Anzahl Toiletten <span className="text-brand-500">*</span>
              </label>
              <input
                id={`${idBase}-toilets`}
                type="number"
                inputMode="numeric"
                min={pricingConfig.limits.toilets.min}
                max={pricingConfig.limits.toilets.max}
                value={values.toilets}
                onChange={(e) => updateValue("toilets", e.target.value)}
                className="w-full rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <FieldError message={errorFor(errors, "toilets")} />
            </div>
          </div>

          <FrequencyField
            idBase={idBase}
            value={values.visitsPerWeek}
            onChange={(v) => updateValue("visitsPerWeek", v)}
            error={errorFor(errors, "visitsPerWeek")}
          />

          <StepNav onBack={() => goBack("objectType")} />
        </form>
      )}

      {step === "contact" && (
        <form onSubmit={handleContactSubmit} noValidate className="flex flex-col gap-5">
          <p className="text-sm text-ink-soft">
            Damit wir Ihnen die Schätzung zeigen können, benötigen wir kurz Ihre Kontaktdaten.
          </p>

          {/* Honeypot: für Menschen unsichtbar, Bots füllen es häufig automatisch aus. */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor={`${idBase}-website`}>Firmenwebsite</label>
            <input
              id={`${idBase}-website`}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={contact.honeypot}
              onChange={(e) => setContact((prev) => ({ ...prev, honeypot: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor={`${idBase}-name`} className="mb-1.5 block text-sm font-medium text-brand-900">
              Name <span className="text-brand-500">*</span>
            </label>
            <input
              id={`${idBase}-name`}
              type="text"
              autoComplete="name"
              value={contact.name}
              onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <FieldError message={errorFor(errors, "name")} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${idBase}-email`}
                className="mb-1.5 block text-sm font-medium text-brand-900"
              >
                E-Mail <span className="text-brand-500">*</span>
              </label>
              <input
                id={`${idBase}-email`}
                type="email"
                autoComplete="email"
                value={contact.email}
                onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <FieldError message={errorFor(errors, "email")} />
            </div>
            <div>
              <label
                htmlFor={`${idBase}-phone`}
                className="mb-1.5 block text-sm font-medium text-brand-900"
              >
                Telefon
              </label>
              <input
                id={`${idBase}-phone`}
                type="tel"
                autoComplete="tel"
                value={contact.phone}
                onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </div>
          </div>

          <div>
            <label className="flex items-start gap-2.5 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={contact.privacyAccepted}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, privacyAccepted: e.target.checked }))
                }
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong text-brand-500 focus:ring-brand-500/40"
              />
              <span>
                Ich habe die{" "}
                <Link href="/datenschutz" className="font-medium text-brand-500 hover:underline">
                  Datenschutzerklärung
                </Link>{" "}
                zur Kenntnis genommen. *
              </span>
            </label>
            <FieldError message={errorFor(errors, "privacyAccepted")} />
          </div>

          <StepNav onBack={() => goBack("details")} nextLabel="Richtpreis anzeigen" />
        </form>
      )}

      {step === "result" && estimate && (
        <ResultView
          estimate={estimate}
          isStaircase={isStaircase}
          values={values}
          onRestart={restart}
        />
      )}
    </div>
  );
}

function FrequencyField({
  idBase,
  value,
  onChange,
  error,
}: {
  idBase: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={`${idBase}-visits`} className="mb-1.5 block text-sm font-medium text-brand-900">
        Reinigungshäufigkeit <span className="text-brand-500">*</span>
      </label>
      <select
        id={`${idBase}-visits`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-xs rounded-control border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
      >
        {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            {n}× pro Woche
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

function StepNav({ onBack, nextLabel = "Weiter" }: { onBack: () => void; nextLabel?: string }) {
  return (
    <div className="flex gap-3">
      <Button type="button" variant="outline" onClick={onBack}>
        Zurück
      </Button>
      <Button type="submit" className="flex-1">
        {nextLabel}
      </Button>
    </div>
  );
}

function ResultView({
  estimate,
  isStaircase,
  values,
  onRestart,
}: {
  estimate: PriceEstimate;
  isStaircase: boolean;
  values: CalculatorFormValues;
  onRestart: () => void;
}) {
  const objectLabel =
    values.objectType === "sonstige"
      ? values.customObjectDescription
      : values.objectType
        ? objectTypeLabels[values.objectType]
        : "";

  return (
    <div className="rounded-card border border-brand-100 bg-brand-50 p-6 text-center sm:p-8">
      {/*
        Unterhalb des Mindestauftragswerts zeigen wir bewusst keinen Preis.
        Eine Zahl zu nennen, die wir nicht anbieten, waere irrefuehrend — und
        die Schaetzung kuenstlich auf 750 anzuheben waere fuer ein kleines
        Objekt schlicht falsch. Stattdessen der Hinweis plus Gespraechsangebot:
        bei mehreren Objekten oder Zusatzleistungen ist ein Auftrag oft
        trotzdem moeglich.
      */}
      {estimate.belowMinimumOrder ? (
        <>
          <p className="text-sm font-medium text-ink-soft">Ihr Objekt im Überblick</p>
          <p className="font-display display-lg mx-auto mt-3 max-w-md text-2xl font-medium text-brand-900">
            Für dieses Objekt liegt der Aufwand unter unserem Mindestauftragswert
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Wir übernehmen wiederkehrende Reinigung ab{" "}
            <strong className="font-semibold text-brand-900">
              {pricingConfig.minimumMonthlyOrderNet} € netto im Monat
            </strong>
            . Sprechen Sie uns trotzdem an: Bei mehreren Objekten, zusätzlichen
            Leistungen oder einem anderen Reinigungsintervall lässt sich häufig
            eine passende Lösung finden.
          </p>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-ink-soft">Geschätzter Monatspreis netto</p>
          <p className="mt-2 text-4xl font-bold text-brand-900">
            {estimate.monthlyPriceNet.toLocaleString("de-DE", { maximumFractionDigits: 0 })} €
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            bei {estimate.visitsPerWeek}× Reinigung pro Woche
          </p>
        </>
      )}

      <div className="mx-auto mt-6 max-w-sm rounded-control bg-white p-4 text-left text-sm text-ink-soft shadow-raise">
        <p className="font-semibold text-brand-900">Ihre Angaben</p>
        <ul className="mt-2 space-y-1">
          <li>Objektart: {objectLabel}</li>
          {isStaircase ? (
            <>
              <li>Wohneinheiten: {values.units}</li>
              <li>Etagen: {values.floors}</li>
              <li>Treppenhäuser: {values.staircaseCount}</li>
            </>
          ) : (
            <>
              <li>Fläche: {values.areaSqm} m²</li>
              <li>Küchen: {values.kitchens} · Toiletten: {values.toilets}</li>
            </>
          )}
          <li>Reinigungshäufigkeit: {estimate.visitsPerWeek}× pro Woche</li>
        </ul>
      </div>

      {!estimate.belowMinimumOrder && (
      <p className="mx-auto mt-6 max-w-md text-xs text-ink-soft">
        Diese Schätzung dient der ersten Orientierung und ersetzt kein persönliches Angebot.
        Der endgültige Preis kann sich nach einer Besichtigung und dem tatsächlichen Aufwand
        vor Ort ändern.
      </p>
      )}

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/kontakt">
              Angebot anfragen
            </Button>
        <Button type="button" variant="outline" onClick={onRestart}>
          Neue Berechnung
        </Button>
      </div>
    </div>
  );
}
