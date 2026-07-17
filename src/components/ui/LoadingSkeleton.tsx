/**
 * Reusable loading skeleton for future async route segments.
 *
 * Not wired up as a Next.js `loading.tsx` convention file: a root-level
 * loading.tsx produced a permanently-pending Suspense boundary in the
 * prerendered output on Next.js 16 / Turbopack (without `cacheComponents`).
 * Use this component explicitly inside a local `<Suspense fallback={...}>`
 * once a route segment does real async data fetching.
 */
export default function LoadingSkeleton() {
  return (
    <div className="container-page py-16" aria-busy="true" aria-live="polite">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded-full bg-gray-200" />
        <div className="h-9 w-2/3 rounded-lg bg-gray-200" />
        <div className="h-4 w-full max-w-xl rounded-lg bg-gray-200" />
        <div className="grid gap-5 pt-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
