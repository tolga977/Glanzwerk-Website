import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { FieldError } from "@/components/forms/FormError";

/*
 * `min-h-11` sind 44 px und damit die Mindestgröße für ein Ziel, das mit dem
 * Daumen getroffen werden soll.
 *
 * Ohne die Angabe ergaben `py-2.5` und `text-sm` gemessen 40 px — vier Pixel
 * zu wenig, und zwar in jedem Formular der Website. Aufgefallen ist es am
 * Auswahlfeld im Hero-Formular, das auf dem Telefon die erste Eingabe
 * überhaupt ist; die Ursache lag aber schon vorher hier.
 *
 * `min-h` statt mehr Innenabstand: das Textfeld (`textarea`) bekommt seine
 * Höhe über `rows` und ist ohnehin höher — ein größeres Polster hätte dort
 * nur die Zeilen auseinandergezogen.
 */
const inputClasses =
  "w-full min-h-11 rounded-control border px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand-500/40";

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

/**
 * Auswahlfeld — neu hinzugekommen für die Leistungsauswahl im ersten Schritt
 * des Hero-Formulars.
 *
 * Bewusst als Variante dieses Bauteils und nicht als eigenes Feld daneben:
 * Beschriftung, Pflichtkennzeichnung, Rahmenfarbe im Fehlerfall,
 * `aria-invalid` und die Verknüpfung zur Fehlermeldung über
 * `aria-describedby` sind bei einem Auswahlfeld dieselben wie bei einem
 * Eingabefeld. Ein zweites Bauteil hätte diese Regeln kopiert — und die
 * Kopie wäre beim ersten Änderungswunsch zurückgeblieben.
 *
 * Ein eigenes `appearance-none` mit selbstgebautem Pfeil steht hier
 * absichtlich nicht: das native Auswahlfeld bringt auf dem Telefon die
 * systemeigene Auswahlrolle mit, die sich mit dem Daumen deutlich sicherer
 * bedienen lässt als eine nachgebaute Liste.
 */
type SelectFieldProps = BaseProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "id"> & {
    as: "select";
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export default function FormField(props: FormFieldProps) {
  const {
    label,
    name,
    error,
    required,
    as = "input",
    className,
    "aria-describedby": describedBy,
    ...rest
  } = props;
  const borderClass = error ? "border-red-400" : "border-line";

  /*
   * `aria-describedby` wird zusammengeführt, nicht überschrieben.
   *
   * Hier lag ein echter Fehler. Die Verknüpfung zur Fehlermeldung stand
   * zuvor allein in diesem Bauteil und wurde von jedem Aufrufer
   * überschrieben, der selbst ein `aria-describedby` mitgab — im
   * Hero-Formular etwa der Verweis auf die Frage über dem Auswahlfeld.
   * Gemessen: bei einem Pflichtfehler zeigte das Feld `aria-invalid="true"`
   * und einen roten Rahmen, die Fehlermeldung war aber nicht mehr mit ihm
   * verknüpft. Wer den Bildschirm sieht, bemerkt das nicht; wer ihn vorlesen
   * lässt, erfährt nur, dass etwas falsch ist, aber nicht was.
   *
   * `aria-describedby` nimmt eine Liste von IDs. Beide gehören hinein, und
   * die Fehlermeldung zuerst — sie ist im Fehlerfall die wichtigere Angabe.
   */
  const describedIds = [error ? `${name}-error` : null, describedBy]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id: name,
    name,
    "aria-invalid": !!error,
    "aria-describedby": describedIds || undefined,
    className: `${inputClasses} ${borderClass} ${className ?? ""}`,
  };

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </label>
      {as === "textarea" && (
        <textarea
          {...shared}
          rows={5}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}
      {as === "select" && (
        /* `bg-white`, weil ein Auswahlfeld ohne eigene Fläche auf einer
           farbigen Umgebung den Systemhintergrund erbt und dann als einziges
           Feld anders aussieht als die Eingabefelder daneben. */
        <select
          {...shared}
          className={`${shared.className} bg-white`}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        />
      )}
      {as === "input" && (
        <input {...shared} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && (
        <span id={`${name}-error`}>
          <FieldError message={error} />
        </span>
      )}
    </div>
  );
}
