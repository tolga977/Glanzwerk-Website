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
    <ol className="relative grid gap-10 sm:grid-cols-2 sm:gap-11 lg:grid-cols-4 lg:gap-8">
      {/*
        Signaturelement: die Ziffer steht als Satzzahl auf einer Linie, nicht
        in einem Kreisabzeichen.

        Das Kreisabzeichen ist das generischste Element dieser Branche — es
        steht bei praktisch jedem Wettbewerber identisch da. Die Satzzahl in
        der Display-Schrift nutzt dagegen die einzige typografische
        Besonderheit der Marke an einer Groesse, bei der ihr Charakter
        sichtbar wird, und die Linie darunter traegt weiterhin die Lesart
        "zusammenhaengender Ablauf" statt "vier Kaertchen".
      */}
      {/* Durchgehende Grundlinie unter den Ziffern — nur im vierspaltigen Layout. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-[3.25rem] hidden h-px lg:block ${
          light ? "bg-white/25" : "bg-line-strong"
        }`}
      />

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} className="relative pl-16 sm:pl-0">
            {/* Senkrechte Schiene zum naechsten Schritt (nur mobil). */}
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[1.35rem] top-12 -bottom-10 w-px sm:hidden ${
                  light ? "bg-white/25" : "bg-line-strong"
                }`}
              />
            )}

            <span
              className={`font-display absolute left-0 top-0 block w-12 text-3xl font-medium leading-none tracking-tight sm:relative sm:mb-0 sm:w-auto ${
                light ? "text-white/55" : "text-brand-500"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Grundlinie unter der Ziffer im ein- und zweispaltigen Layout. */}
            <span
              aria-hidden="true"
              className={`mt-4 hidden h-px w-full sm:block lg:hidden ${
                light ? "bg-white/25" : "bg-line-strong"
              }`}
            />

            <h3
              className={`text-base font-semibold sm:mt-5 lg:mt-[1.9rem] ${light ? "text-white" : "text-brand-900"}`}
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
