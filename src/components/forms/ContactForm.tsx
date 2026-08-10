"use client";

import { useState, type FormEvent } from "react";
import FormField from "@/components/forms/FormField";
import { FormAlert } from "@/components/forms/FormError";
import Button from "@/components/ui/Button";
import {
  emptyContactRequest,
  submitContactRequest,
  validateContactRequest,
  type ContactRequestErrors,
  type ContactRequestValues,
} from "@/lib/contactRequest";

/*
 * Datenmodell, Prüfregeln und Übermittlung liegen jetzt in
 * `@/lib/contactRequest` — gemeinsam mit dem vierschrittigen Formular in der
 * Hero-Bühne der Startseite. Vorher standen sie hier, und dieses Formular war
 * die einzige Stelle, die sie kannte.
 *
 * Am sichtbaren Verhalten dieses Formulars ändert das nichts: dieselben
 * Felder, dieselben Pflichtangaben (Name, Unternehmen, E-Mail, Anliegen,
 * Datenschutz), dieselben Meldungen. Die Felder `service` und `serviceOther`
 * aus dem gemeinsamen Modell bleiben hier ungenutzt — dieses Formular fragt
 * die Leistung nicht über eine Liste ab, sondern über den Freitext.
 */
const requiredFields: (keyof ContactRequestValues)[] = [
  "name",
  "company",
  "email",
  "message",
  "privacy",
];

export default function ContactForm() {
  const [values, setValues] = useState<ContactRequestValues>(emptyContactRequest);
  const [errors, setErrors] = useState<ContactRequestErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  function updateField<K extends keyof ContactRequestValues>(
    field: K,
    value: ContactRequestValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateContactRequest(values, requiredFields);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      await submitContactRequest(values);
      setStatus("success");
      setValues(emptyContactRequest);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === "success" && (
        <FormAlert
          type="success"
          message="Vielen Dank für Ihre Anfrage. Wir melden uns zeitnah bei Ihnen."
        />
      )}
      {status === "error" && Object.keys(errors).length > 0 && (
        <FormAlert
          type="error"
          message="Bitte prüfen Sie Ihre Angaben – einige Felder sind noch nicht korrekt ausgefüllt."
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          required
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <FormField
          label="Unternehmen"
          name="company"
          required
          value={values.company}
          onChange={(e) => updateField("company", e.target.value)}
          error={errors.company}
          autoComplete="organization"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="E-Mail"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <FormField
          label="Telefon"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <FormField
        label="Art des Objekts"
        name="objectType"
        value={values.objectType}
        onChange={(e) => updateField("objectType", e.target.value)}
        error={errors.objectType}
        placeholder="z. B. Büro, Praxis, Kanzlei, Gewerbeobjekt"
      />

      <FormField
        as="textarea"
        label="Ihr Anliegen"
        name="message"
        required
        value={values.message}
        onChange={(e) => updateField("message", e.target.value)}
        error={errors.message}
        placeholder="Beschreiben Sie kurz Ihr Objekt und Ihren Reinigungsbedarf."
      />

      <div>
        <label className="flex items-start gap-2.5 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="privacy"
            checked={values.privacy}
            onChange={(e) => updateField("privacy", e.target.checked)}
            aria-invalid={!!errors.privacy}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong text-brand-500 focus:ring-brand-500/40"
          />
          <span>
            Ich habe die{" "}
            <a href="/datenschutz" className="font-medium text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              Datenschutzerklärung
            </a>{" "}
            zur Kenntnis genommen. *
          </span>
        </label>
        {errors.privacy && (
          <span id="privacy-error">
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.privacy}
            </p>
          </span>
        )}
      </div>

      {/*
        Auf dem Telefon volle Breite, ab Tablet auf die eigene Textbreite.
        Ein Absendeknopf ueber die ganze Spalte ist auf einem 500 px breiten
        Formular unnoetig wuchtig; auf einem 390-px-Schirm ist er dagegen das
        sicherste Ziel fuer den Daumen.
      */}
      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto sm:self-start">
        {status === "submitting" ? "Wird gesendet…" : "Anfrage senden"}
      </Button>
    </form>
  );
}
