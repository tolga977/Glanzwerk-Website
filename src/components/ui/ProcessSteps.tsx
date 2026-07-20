export interface ProcessStep {
  title: string;
  description: string;
}

const defaultSteps: ProcessStep[] = [
  {
    title: "Anfrage stellen",
    description: "Sie kontaktieren uns über den Preisrechner, das Kontaktformular oder telefonisch.",
  },
  {
    title: "Objekt und Anforderungen besprechen",
    description: "Wir klären Details zu Ihrem Objekt, Flächen und gewünschten Reinigungsintervallen.",
  },
  {
    title: "Transparentes Angebot erhalten",
    description: "Sie erhalten ein individuelles Angebot ohne versteckte Kosten.",
  },
  {
    title: "Reinigung starten",
    description: "Die Reinigung beginnt nach dem mit Ihnen abgestimmten Zeitplan.",
  },
];

/** `light`: use on dark ("navy"/"brand") Section backgrounds — inverts the number badge and lightens text. */
export default function ProcessSteps({
  steps = defaultSteps,
  light = false,
}: {
  steps?: ProcessStep[];
  light?: boolean;
}) {
  return (
    <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title}>
          <div className="flex items-center">
            <span
              className={`font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium shadow-sm ${
                light
                  ? "bg-white text-brand-900"
                  : "bg-gradient-to-br from-brand-800 to-brand-900 text-white"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={`ml-3 hidden h-px flex-1 lg:block ${
                  light
                    ? "bg-gradient-to-r from-white/40 to-white/10"
                    : "bg-gradient-to-r from-brand-200 to-brand-100"
                }`}
              />
            )}
          </div>
          <h3 className={`mt-4 text-base font-semibold ${light ? "text-white" : "text-brand-900"}`}>
            {step.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${light ? "text-brand-100" : "text-ink-soft"}`}>
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
