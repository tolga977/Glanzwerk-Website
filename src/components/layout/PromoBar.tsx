import Link from "next/link";

interface PromoBarProps {
  text: string;
  shortText: string;
  href: string;
}

/** Schmale, hochwertige Hinweisleiste oberhalb des Headers – kein Pop-up. */
export default function PromoBar({ text, shortText, href }: PromoBarProps) {
  return (
    <Link
      href={href}
      className="block bg-brand-900 py-2.5 text-center text-xs font-medium text-brand-100 transition-colors duration-200 ease-out hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-300 sm:text-sm"
    >
      <span className="hidden sm:inline">{text}</span>
      <span className="sm:hidden">{shortText}</span>
    </Link>
  );
}
