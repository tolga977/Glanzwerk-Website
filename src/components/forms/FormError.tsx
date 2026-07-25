export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

interface FormAlertProps {
  type: "success" | "error";
  message: string;
}

export function FormAlert({ type, message }: FormAlertProps) {
  const isSuccess = type === "success";
  return (
    <div
      role={isSuccess ? "status" : "alert"}
      className={`rounded-control border px-4 py-3 text-sm font-medium ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}
