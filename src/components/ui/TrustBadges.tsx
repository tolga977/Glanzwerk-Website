export interface TrustBadge {
  title: string;
  description: string;
  icon?: keyof typeof icons;
}

const icons = {
  personal: (
    <>
      <circle cx="12" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 20c.8-3.4 3.5-5.5 6.5-5.5s5.7 2.1 6.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16.2 8.2l1.3 1.3 2.3-2.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  transparent: (
    <>
      <path
        d="M7 3.5h8l3 3V20a.8.8 0 0 1-.8.8H7.8A.8.8 0 0 1 7 20V3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 11.5h6M10 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.6" cy="12" r="1" fill="currentColor" />
      <circle cx="8.6" cy="15.4" r="1" fill="currentColor" />
    </>
  ),
  flexible: (
    <>
      <circle cx="12" cy="12.5" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8v4.5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 2.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  reliable: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 9.5h16M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M8.7 14.2l2 2 4.2-4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  specialized: (
    <>
      <rect x="3.5" y="8" width="17" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 8V6.2A1.7 1.7 0 0 1 10.2 4.5h3.6A1.7 1.7 0 0 1 15.5 6.2V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M3.5 13h17" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  berlin: (
    <>
      <path
        d="M12 21s6.5-6.8 6.5-11.4A6.5 6.5 0 0 0 5.5 9.6C5.5 14.2 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.4" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
} as const;

export type TrustIconName = keyof typeof icons;

/** Einzelnes Vertrauens-Icon, damit Seiten eigene Kompositionen mit demselben
 *  Icon-Satz bauen können, ohne die Rasterdarstellung von TrustBadges zu erben. */
export function TrustIcon({
  name,
  className = "h-[18px] w-[18px]",
}: {
  name?: TrustIconName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      {icons[name ?? "reliable"]}
    </svg>
  );
}

const defaultBadges: TrustBadge[] = [
  {
    title: "Persönliche Betreuung",
    description: "Fester Ansprechpartner statt anonymer Callcenter.",
    icon: "personal",
  },
  {
    title: "Transparente Angebote",
    description: "Klare Preise ohne versteckte Kosten.",
    icon: "transparent",
  },
  {
    title: "Flexible Reinigungszeiten",
    description: "Auch außerhalb Ihrer Geschäftszeiten möglich.",
    icon: "flexible",
  },
  {
    title: "Zuverlässige Durchführung",
    description: "Feste Reinigungstermine, die eingehalten werden.",
    icon: "reliable",
  },
  {
    title: "Spezialisiert auf Gewerbekunden",
    description: "Büros, Praxen, Kanzleien und weitere Gewerbeobjekte.",
    icon: "specialized",
  },
  {
    title: "Einsatz in ganz Berlin",
    description: "Vor Ort in allen zwölf Berliner Bezirken.",
    icon: "berlin",
  },
];

export default function TrustBadges({ badges = defaultBadges }: { badges?: TrustBadge[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <li
          key={badge.title}
          className="group flex gap-3 rounded-card p-3 transition-colors duration-300 hover:bg-brand-50/60"
        >
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 text-brand-500 transition-transform duration-300 ease-out group-hover:scale-105">
            <TrustIcon name={badge.icon} />
          </span>
          <div>
            <p className="text-sm font-semibold text-brand-900">{badge.title}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{badge.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
