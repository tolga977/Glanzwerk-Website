import type { NextConfig } from "next";

const baseSecurityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

// Next.js dev mode (Turbopack/React DevTools) relies on eval() for source
// maps and debugging; a strict CSP without 'unsafe-eval' breaks that in
// development while never affecting the production build, which never uses
// eval(). So the CSP is only sent for production responses.
const cspHeader = {
  // unsafe-inline ist für Next.js Inline-Skripte (Hydration) und die
  // JSON-LD <script>-Blöcke erforderlich. Ohne echtes Third-Party-Skript
  // (Analytics, Ads etc.) bleibt die Angriffsfläche dennoch klein.
  key: "Content-Security-Policy",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

const securityHeaders =
  process.env.NODE_ENV === "production"
    ? [...baseSecurityHeaders, cspHeader]
    : baseSecurityHeaders;

const nextConfig: NextConfig = {
  // Next.js liefert Antworten standardmäßig gzip-komprimiert aus (compress: true).
  // Brotli, HTTP/2 bzw. HTTP/3 und ein CDN werden nicht von Next.js selbst,
  // sondern vom gewählten Hosting bereitgestellt – siehe docs/DEPLOYMENT.md.
  images: {
    formats: ["image/avif", "image/webp"],
    // Lizenzfreie Unsplash-Platzhalterfotos für Hero/Leistungsbereiche,
    // siehe docs/IMAGES.md für die vollständige Bildquellen-Liste.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
