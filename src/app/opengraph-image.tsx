import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { siteConfig } from "@/data/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/brand/glanzwerk-logo-dark-bg.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #071a3a 0%, #0b2650 55%, #00799c 130%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={620} height={315} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#a9dcee",
            fontFamily: "sans-serif",
            letterSpacing: 1,
          }}
        >
          Professionelle Gebäudereinigung in Berlin für Unternehmen
        </div>
      </div>
    ),
    { ...size },
  );
}
