import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "onMedia" | "eco";
type Size = "md" | "lg" | "xl";

/*
 * Zustandsmatrix (design-system/references/states-and-variants.md):
 *
 * Variante   | Ruhe                | Hover               | Active        | Focus-visible
 * -----------|---------------------|---------------------|---------------|---------------
 * primary    | brand-500 / weiß    | brand-600 + Hebung  | scale(0.97)   | Outline brand-900
 * secondary  | brand-900 / weiß    | brand-800 + Hebung  | scale(0.97)   | Outline brand-900
 * outline    | Rahmen brand-900    | Fläche brand-900    | scale(0.97)   | Outline brand-900
 * ghost      | Rahmen brand-200    | Rahmen/Fläche brand | scale(0.97)   | Outline brand-900
 *
 * Hebung und Glanzstreifen laufen ausschließlich über die Utilities .lift
 * und .shine-sweep, die beide auf Zeigergeräte beschränkt und unter
 * prefers-reduced-motion deaktiviert sind. Kein magnetischer Cursor-Effekt:
 * er koppelt die Schaltfläche vom Zeiger entkoppelt an die Mausposition und
 * wirkt auf einer seriösen Dienstleisterseite wie eine Spielerei.
 */
const variantClasses: Record<Variant, string> = {
  /* Ruheschatten von shadow-raise auf shadow-float angehoben: die primäre
     Schaltfläche liegt jetzt sichtbar über der Fläche statt bündig darauf.
     Das ist der Unterschied zwischen "da ist ein Button" und "da ist der
     nächste Schritt" — und wirkt auf jeder Seite, nicht nur der Startseite. */
  primary:
    "shine-sweep bg-brand-500 text-white shadow-float hover:bg-brand-600 hover:shadow-deep focus-visible:outline-brand-900",
  secondary:
    "shine-sweep bg-brand-900 text-white shadow-raise hover:bg-brand-800 hover:shadow-float focus-visible:outline-brand-900",
  outline:
    "border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white focus-visible:outline-brand-900",
  ghost:
    "border border-brand-200 bg-white text-brand-500 hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-brand-900",
  /*
   * Sekundärweg auf dunklen Flächen und über Bewegtbild.
   *
   * Ersetzt das bisherige Muster `variant="outline"` plus den Zusatzklassen
   * `border-white text-white hover:bg-white hover:text-brand-900`. Das war
   * ein echter Fehler: die Variante brachte `hover:text-white` mit, die
   * Zusatzklasse `hover:bg-white` — beide mit gleicher Spezifität. Welche
   * gewinnt, entschied allein die Reihenfolge im erzeugten Stylesheet, und
   * sie fiel zugunsten von weißem Text auf weißer Fläche aus: der Knopf war
   * beim Überfahren unlesbar.
   *
   * Als eigene Variante kann nichts mehr kollidieren — Ruhe- und
   * Hover-Zustand sind an einer Stelle definiert und gegeneinander geprüft:
   * Weiß auf Marken-Navy ergibt im Hover 14,9:1.
   */
  onMedia:
    "border-2 border-white/75 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-brand-900 focus-visible:outline-white",
  /*
   * Einzige grüne Primärvariante der Website — ausschließlich für den Hero
   * von "Umwelt & Verantwortung" (siehe dortiger Kommentar). Gleiche
   * Zustandslogik wie `primary`, nur `--color-eco-600`/`--color-eco-800`
   * statt Markenblau: Weiß auf eco-600 ergibt 6,3:1, auf eco-800 11,7:1
   * (siehe Farbrollen-Kommentar in globals.css) — beides deutlich über AA.
   */
  eco: "shine-sweep bg-eco-600 text-white shadow-float hover:bg-eco-800 hover:shadow-deep focus-visible:outline-eco-800",
};

const sizeClasses: Record<Size, string> = {
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-12 px-7 py-3.5 text-base",
  /* xl ist den Hauptzielen der Startseite vorbehalten. 56 px hoch liegt
     deutlich über der 44-px-Mindestgröße für Touch und ist auf einem
     Telefon mit dem Daumen nicht mehr zu verfehlen. */
  xl: "min-h-14 px-8 py-4 text-base sm:px-10 sm:text-lg",
};

/* rounded-control statt rounded-full: die Radiusfamilie unterscheidet
   Controls (klein) von Karten (mittel) und Bildflächen (groß), statt überall
   dieselbe maximale Rundung zu verwenden. */
/*
 * `disabled:pointer-events-none` ist hier die eigentliche Arbeit, nicht die
 * Deckkraft: `.lift` und `.shine-sweep` haengen an `:hover`, und `:hover`
 * greift in CSS auch auf deaktivierten Schaltflaechen. Ohne diese Zeile hob
 * sich der abgeschaltete Absendeknopf beim Ueberfahren an und liess den
 * Glanzstreifen laufen — er sah aus, als koenne man ihn druecken.
 */
const baseClasses =
  "lift press inline-flex items-center justify-center gap-2 rounded-control font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  external?: boolean;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  /*
   * Hier lag ein echter Fehler.
   *
   * Vorher wurde nur `href` herausgezogen und der gesamte Rest auf das
   * <button>-Element gestreut — einschliesslich `className`. Da der Spread
   * NACH `className={classes}` stand, ueberschrieb die uebergebene
   * Zusatzklasse die vollstaendigen Button-Klassen. Eine Schaltflaeche mit
   * className hatte damit keine Flaeche, keine Farbe, keine Groesse: sie
   * stand als nackter Text auf der Seite.
   *
   * Sichtbar wurde das erst jetzt, weil bis eben jede <button>-Schaltflaeche
   * der Website von Hand gebaut war und diese Komponente nur fuer Links
   * benutzt wurde. Ausserdem landeten `variant` und `size` als unbekannte
   * Attribute im DOM.
   *
   * Jetzt werden alle komponenteneigenen Eigenschaften herausgezogen; nur
   * echte Button-Attribute (`type`, `disabled`, `onClick`, `aria-*` …)
   * werden weitergereicht.
   */
  const {
    href: _href,
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...buttonProps
  } = props as ButtonAsButton;
  void _href;
  void _variant;
  void _size;
  void _className;
  void _children;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
