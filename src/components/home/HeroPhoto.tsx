import Image from "next/image";
import { photos } from "@/data/photos";

/** Full-bleed animated hero background — photo with Ken Burns zoom instead of video. */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={photos.heroCleaningTeam.src}
        alt={photos.heroCleaningTeam.alt}
        fill
        priority
        sizes="100vw"
        className="hero-kenburns object-cover"
        style={{ objectPosition: "center 65%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/92 via-brand-950/70 to-brand-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/60 via-brand-950/10 to-transparent" />
    </div>
  );
}
