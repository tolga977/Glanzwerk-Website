"use client";

import { useState, type FormEvent } from "react";
import FormField from "@/components/forms/FormField";
import { FormAlert } from "@/components/forms/FormError";

interface FormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  objectType: string;
  message: string;
  privacy: boolean;
}

const initialValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  objectType: "",
  message: "",
  privacy: false,
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Bitte geben Sie Ihren Namen an.";
  if (!values.company.trim()) errors.company = "Bitte geben Sie Ihr Unternehmen an.";
  if (!values.email.trim()) {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }
  if (!values.message.trim()) {
    errors.message = "Bitte beschreiben Sie kurz Ihr Anliegen.";
  }
  if (!values.privacy) {
    errors.privacy = "Bitte bestätigen Sie die Datenschutzerklärung.";
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      // TODO: an Server Action / API-Route zur Angebotsanfrage anbinden.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setValues(initialValues);
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Wird gesendet…" : "Anfrage senden"}
      </button>
    </form>
  );
}
