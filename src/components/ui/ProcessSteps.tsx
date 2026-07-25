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

/**
 * Der Ablauf wird als zusammenhängender Weg dargestellt, nicht als vier
 * unabhängige Karten:
 *  - Mobil: senkrechte Schiene links neben den Nummern. Die Linie liegt bei
 *    20 px, der Text beginnt bei 56 px — sie schneidet also nie Text.
 *  - Tablet: 2×2, Reihenfolge über die zweistelligen Nummern eindeutig.
 *  - Desktop: vier Stationen auf einer durchgehenden Linie.
 *
 * `light`: für dunkle ("navy"/"brand") Section-Hintergründe.
 */
export default function ProcessSteps({
  steps = defaultSteps,
  light = false,
}: {
  steps?: ProcessStep[];
  light?: boolean;
}) {
  return (
    <ol className="relative grid gap-9 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
      {/* Durchgehende Linie zwischen den Stationen — nur im vierspaltigen Layout. */}
      <span
        aria-hidden="true"
        className={`absolute left-5 right-5 top-5 hidden h-px lg:block ${
          light ? "bg-white/25" : "bg-line-strong"
        }`}
      />

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} className="relative pl-16 sm:pl-0">
            {/* Senkrechte Schiene zum nächsten Schritt (nur mobil). */}
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-5 top-12 -bottom-9 w-px sm:hidden ${
                  light ? "bg-white/25" : "bg-line-strong"
                }`}
              />
            )}

            <span
              className={`font-display absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-base font-medium sm:relative sm:mb-5 ${
                light ? "bg-white text-brand-900" : "bg-brand-900 text-white"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3
              className={`text-base font-semibold sm:mt-0 ${light ? "text-white" : "text-brand-900"}`}
            >
              {step.title}
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${light ? "text-brand-100" : "text-ink-soft"}`}
            >
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
