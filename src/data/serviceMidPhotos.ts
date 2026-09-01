import { photos } from "@/data/photos";

/**
 * Zweites, unterstützendes Bild im Mittelbereich der Leistungsseiten.
 * August 2026: die Mittelbilder von Praxis-, Treppenhaus-, Glas-/Fenster-
 * und Unterhaltsreinigung wurden von Pexels/Unsplash-Hotlinks auf lokale,
 * lizenzierte Fotos (selbes Bilderpaket wie die Hero-Korrektur) umgestellt.
 * Kanzlei- und Gastronomiereinigung haben mit diesem Paket erstmals ein
 * eigenes Mittelbild erhalten. Kita und Autohaus nutzen weiterhin ihr
 * bisheriges, fachlich passendes Foto aus `@/data/photos`.
 */
export const serviceMidPhotos: Record<string, { src: string; alt: string; caption?: string }> = {
  "bueroreinigung-berlin": {
    src: "/images/leistungen/bueroreinigung-berlin/mittelbereich.webp",
    alt: "Helles, modernes Büro mit gepflegten Arbeitsplätzen",
  },
  "praxisreinigung-berlin": {
    src: "/images/leistungen/praxisreinigung-berlin/mittelbereich.webp",
    alt: "Behandlungsliege und Reinigungsausrüstung in einem Praxisraum",
    caption: "Die Liege wird nach jedem Patienten abgewischt. Die Grundreinigung des restlichen Raums läuft unabhängig davon nach ihrem eigenen Rhythmus.",
  },
  "kita-und-schulreinigung-berlin": photos.kitaInterior,
  "treppenhausreinigung-berlin": {
    src: "/images/leistungen/treppenhausreinigung-berlin/mittelbereich.webp",
    alt: "Wischmopp auf einer gepflegten Granit-Treppenstufe",
    caption: "Naturstein verzeiht keine falsche Chemie. Ein zu aggressives Mittel greift die Oberfläche an, ein zu schwaches lässt Schlieren zurück.",
  },
  "glas-und-fensterreinigung-berlin": {
    src: "/images/leistungen/glas-und-fensterreinigung-berlin/mittelbereich.webp",
    alt: "Reinigung einer großen Glasfassade mit Himmelsspiegelung",
    caption: "Auf einer großen Fassade sieht man jeden Streifen schon aus mehreren Metern Entfernung. Das verlangt ein anderes Werkzeug als das Bürofenster nebenan.",
  },
  "grundreinigung-berlin": {
    src: "/images/leistungen/grundreinigung-berlin/grundreinigung-einscheibenmaschine.webp",
    alt: "Professionelle Grundreinigung eines Bodens mit einer Einscheibenmaschine",
  },
  "autohausreinigung-berlin": photos.carShowroom,
  "unterhaltsreinigung-berlin": {
    src: "/images/leistungen/unterhaltsreinigung-berlin/mittelbereich.webp",
    alt: "Reinigungskraft wischt einen Flur, daneben ein Warnschild für nassen Boden",
    caption: "Das Warnschild steht nicht aus Vorsicht daneben, sondern gehört zum Ablauf dazu, solange der Boden noch nass ist.",
  },
  "gebaeudereinigung-berlin": photos.buildingFacade,
  "kanzleireinigung-berlin": {
    src: "/images/leistungen/kanzleireinigung-berlin/mittelbereich.webp",
    alt: "Reinigungskraft säubert Bildschirme an einem Büroarbeitsplatz",
    caption: "Bildschirm, Tastatur und Ablage werden mitgereinigt, nicht nur der Boden darunter. Akten und Unterlagen auf dem Tisch bleiben dabei unangetastet.",
  },
  "gastronomiereinigung-berlin": {
    src: "/images/leistungen/gastronomiereinigung-berlin/mittelbereich.webp",
    alt: "Blitzsaubere Edelstahlflächen in einer professionellen Gastronomieküche",
    caption: "Edelstahl zeigt jeden Fingerabdruck und jeden Fettfilm sofort. In einer Küche, die regelmäßig kontrolliert wird, kein kosmetisches Detail.",
  },
};
