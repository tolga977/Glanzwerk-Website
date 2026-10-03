import Link from "next/link";
import Section, { SectionHeading } from "@/components/ui/Section";
import { comboLinkGroups, serviceLinkGroups, type InternalLinkGroup } from "@/lib/internalLinks";
import { getDistrictBySlug } from "@/data/districts";
import { getServiceBySlug } from "@/data/services";

const pillClass =
  "rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

const listLinkClass =
  "text-sm font-semibold text-brand-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

export function LinkGroupsSection({
  eyebrow,
  title,
  groups,
  background = "white",
}: {
  eyebrow: string;
  title: string;
  groups: InternalLinkGroup[];
  background?: "white" | "muted" | "tint";
}) {
  const visible = groups.filter((group) => group.links.length > 0);
  if (visible.length === 0) return null;

  return (
    <Section background={background} spacing="compact">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-8 space-y-8">
        {visible.map((group) => (
          <div key={group.heading}>
            <h3 className="font-display text-base font-medium text-brand-900">{group.heading}</h3>
            {group.variant === "pills" ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={pillClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={listLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ServiceRelatedLinks({ serviceSlug }: { serviceSlug: string }) {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return null;
  return (
    <LinkGroupsSection
      eyebrow="Einsatzorte und mehr"
      title={`${service.shortTitle} in Ihrem Bezirk`}
      groups={serviceLinkGroups(serviceSlug)}
      background="muted"
    />
  );
}

export function ComboRelatedLinks({
  serviceSlug,
  districtSlug,
}: {
  serviceSlug: string;
  districtSlug: string;
}) {
  const district = getDistrictBySlug(districtSlug);
  if (!district) return null;
  return (
    <LinkGroupsSection
      eyebrow={`Mehr in ${district.name}`}
      title={`Weitere Reinigungsleistungen in ${district.name}`}
      groups={comboLinkGroups(serviceSlug, districtSlug)}
      background="tint"
    />
  );
}
