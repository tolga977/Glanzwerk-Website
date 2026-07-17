const paths: Record<string, React.ReactNode> = {
  "gebaeudereinigung-berlin": (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M14 21v-9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9" />
      <path d="M8 8h1M11 8h1M8 12h1M11 12h1M8 16h1M11 16h1M17 13h1M17 17h1" />
    </>
  ),
  "bueroreinigung-berlin": (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  "praxisreinigung-berlin": (
    <>
      <path d="M12 4v16M4 12h16" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </>
  ),
  "unterhaltsreinigung-berlin": (
    <>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 4v3h-3M6 20v-3h3" />
    </>
  ),
  "treppenhausreinigung-berlin": (
    <path d="M4 20h4v-4h4v-4h4V8h4V4M4 20V4" />
  ),
  "fensterreinigung-berlin": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M12 4v16M4 12h16" />
    </>
  ),
  "glasreinigung-berlin": (
    <>
      <path d="M4 3.5h16M6 3.5v17M18 3.5v17" />
      <path d="M9 8l2.2 2.2L15 6" />
      <path d="M6 15.5h4" />
    </>
  ),
  "grundreinigung-berlin": (
    <>
      <path d="M12 3v3M5.6 6.6l2.1 2.1M18.4 6.6l-2.1 2.1M3 13h3M18 13h3" />
      <path d="M7 21h10l-1-8H8l-1 8Z" />
    </>
  ),
  "kita-und-schulreinigung-berlin": (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V16c0 1.1 2.7 3 6 3s6-1.9 6-3v-5.5" />
    </>
  ),
  "kanzleireinigung-berlin": (
    <>
      <path d="M4 20h16M6 20V10M18 10v10M12 20V6" />
      <path d="M4 10h16l-2-4H6l-2 4Z" />
    </>
  ),
  "fitnessstudioreinigung-berlin": (
    <>
      <path d="M6.5 8v8M17.5 8v8M3 10.5v3M21 10.5v3M6.5 12h11" />
    </>
  ),
  "autohausreinigung-berlin": (
    <>
      <path d="M4 16V11l2-5h12l2 5v5" />
      <path d="M4 16h16M7 16v2M17 16v2" />
      <circle cx="7.5" cy="16" r="1.2" />
      <circle cx="16.5" cy="16" r="1.2" />
    </>
  ),
};

export default function ServiceIcon({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const content = paths[slug] ?? paths["gebaeudereinigung-berlin"];
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {content}
    </svg>
  );
}
