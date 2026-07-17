import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldError } from "@/components/forms/FormError";

const inputClasses =
  "w-full rounded-xl border px-4 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
}

type InputFieldProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id"> & {
    as?: "input";
  };

type TextareaFieldProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id"> & {
    as: "textarea";
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export default function FormField(props: FormFieldProps) {
  const { label, name, error, required, as = "input", className, ...rest } = props;
  const borderClass = error ? "border-red-400" : "border-gray-200";

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${inputClasses} ${borderClass} ${className ?? ""}`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={name}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${inputClasses} ${borderClass} ${className ?? ""}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <span id={`${name}-error`}>
          <FieldError message={error} />
        </span>
      )}
    </div>
  );
}
