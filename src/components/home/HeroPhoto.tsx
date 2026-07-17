import Image from "next/image";
import { photos } from "@/data/photos";

/**
 * Full-bleed, slowly animated hero background — the modern equivalent of
 * the autoplaying background video on the previous glanzwerk-berlin.de
 * hero. Uses a still photo with a very slow Ken Burns zoom instead of an
 * actual video file: same sense of quiet motion, without the extra
 * bytes/decode cost of video and without reusing an asset we don't hold
 * rights to.
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
        className="hero-kenburns object-cover"
        style={{ objectPosition: "center 65%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/92 via-brand-950/70 to-brand-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/60 via-brand-950/10 to-transparent" />
    </div>
  );
}
