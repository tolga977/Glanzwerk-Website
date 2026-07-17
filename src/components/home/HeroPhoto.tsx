import GlanzMark from "@/components/ui/GlanzMark";
import BrandPhoto from "@/components/ui/BrandPhoto";
import Logo from "@/components/layout/Logo";
import { photos } from "@/data/photos";

export default function HeroPhoto() {
  return (
    <div className="relative">
      <BrandPhoto
        photo={photos.heroBuilding}
        aspect="aspect-[4/3] sm:aspect-[5/4]"
        priority
        className="shadow-2xl shadow-brand-950/20"
      >
        <GlanzMark className="absolute right-5 top-5 h-9 w-9 opacity-90" />
      </BrandPhoto>

      <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:-left-6">
        <Logo height={28} />
        <span className="hidden h-8 w-px bg-gray-200 sm:block" />
        <span className="hidden text-xs font-medium leading-tight text-ink-soft sm:block">
          Inhabergeführt
          <br />
          aus Berlin
        </span>
      </div>
    </div>
  );
}
