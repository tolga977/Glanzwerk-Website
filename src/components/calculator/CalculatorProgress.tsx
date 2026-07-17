export default function CalculatorProgress({
  currentStep,
  totalSteps,
  label,
}: {
  currentStep: number;
  totalSteps: number;
  label: string;
}) {
  const percent = Math.round((currentStep / totalSteps) * 100);
  return (
    <div className="mb-8" aria-live="polite">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink-soft">
        <span>
          Schritt {currentStep} von {totalSteps}
        </span>
        <span>{label}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Fortschritt: Schritt ${currentStep} von ${totalSteps}`}
        className="h-2 w-full overflow-hidden rounded-full bg-gray-100"
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
