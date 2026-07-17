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

export default function ProcessSteps({ steps = defaultSteps }: { steps?: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="relative rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(7_26_58/0.04)]">
          <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-800 to-brand-900 text-base font-medium text-white shadow-sm">
            {index + 1}
          </span>
          <h3 className="mt-4 text-base font-semibold text-brand-900">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
