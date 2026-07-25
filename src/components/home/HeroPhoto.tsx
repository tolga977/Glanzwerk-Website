import Image from "next/image";
import { photos } from "@/data/photos";

/**
 * Vollflächiger Hero-Hintergrund. Das Bild driftet einmalig sehr langsam in
 * seine Ruhelage (siehe .hero-drift in globals.css) statt dauerhaft zu
 * zoomen; unter prefers-reduced-motion steht es vollständig still.
 *
 * Die drei Verläufe sind so abgestuft, dass der Textblock links sicher
 * lesbar bleibt, die rechte Bildhälfte aber sichtbar Foto bleibt und nicht
 * flächig zugedunkelt wird.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={photos.heroCleaningTeam.src}
        alt={photos.heroCleaningTeam.alt}
        fill
        priority
        sizes="100vw"
        className="hero-drift object-cover"
        style={{ objectPosition: "center 62%" }}
      />
      {/* Fußzone: trägt die Vertrauenszeile und den Übergang zur nächsten Fläche. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-950/88 via-brand-950/45 to-brand-950/30"
      />
      {/* Textzone links: sorgt für den Lesekontrast unter der Headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-950/82 via-brand-950/28 to-transparent"
      />
    </div>
  );
}
