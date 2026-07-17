# Deployment- und Hosting-Anforderungen

Dieses Dokument hält fest, was **außerhalb des Quellcodes** beim Hosting
konfiguriert werden muss. Next.js selbst kann Brotli-Kompression, CDN-Auslieferung
oder HTTP/2 bzw. HTTP/3 nicht erzwingen – das übernimmt die Hosting-Plattform.

## Empfohlen: Vercel

Bei Vercel (dem Next.js-eigenen Hosting) sind automatisch aktiv, ohne
zusätzliche Konfiguration:
- Brotli-Kompression
- HTTP/2 und HTTP/3
- globales CDN für `/_next/static/*` und alle statisch generierten Seiten
- lange, unveränderliche Cache-Header (`Cache-Control: public, max-age=31536000, immutable`)
  für versionierte Assets unter `/_next/static/*`

In diesem Fall ist **keine zusätzliche Serverkonfiguration** nötig.

## Bei Self-Hosting (z. B. eigener Server mit nginx/Caddy)

Falls nicht auf Vercel gehostet wird, muss der Reverse Proxy / Webserver
konfigurieren:
- **Brotli**: `ngx_brotli`-Modul (oder Caddys eingebaute Brotli-Unterstützung) aktivieren
- **HTTP/2 oder HTTP/3**: `listen 443 ssl http2;` bzw. QUIC/HTTP-3-Unterstützung aktivieren
- **Cache-Header** für `/_next/static/*`: `Cache-Control: public, max-age=31536000, immutable`
- **CDN**: vorgeschaltetes CDN (Cloudflare, CloudFront o. ä.) für statische Assets und HTML

## Umgebungsvariablen

Aktuell benötigt das Projekt **keine** Umgebungsvariablen für Build oder lokalen
Start (`npm run build`, `npm run dev`).

Für den Produktivbetrieb fehlen noch:

| Bereich | Was fehlt | Warum |
|---|---|---|
| Kontaktformular / Preisrechner | E-Mail-Versand (z. B. über Resend, SendGrid oder SMTP) inkl. API-Key als Env-Var | Aktuell werden Formulareingaben nur clientseitig validiert und angezeigt, aber **nicht** irgendwohin gesendet (kein Backend-Endpunkt). Siehe `src/components/forms/ContactForm.tsx` (`// TODO: an Server Action / API-Route anbinden`). |
| Analytics (optional) | Keine Tracking-Skripte aktuell eingebunden | Bewusst weggelassen ("keine unnötigen Third-Party-Skripte"); falls gewünscht, per Cookie-Consent-Tool nachrüsten. |
| Google Search Console | Keine Verifizierung hinterlegt | Nach Go-Live: Property anlegen, Sitemap (`/sitemap.xml`) einreichen. |

## Externe Bild-Abhängigkeit (Unsplash)

Hero- und einige Leistungsbilder werden aktuell von `images.unsplash.com`
geladen (per `next/image` + `remotePatterns` in `next.config.ts`, siehe
`docs/IMAGES.md`). Das ist für Platzhalterfotos akzeptabel, bedeutet aber:

- Erreichbarkeit dieser Bilder hängt von einem Drittanbieter ab.
- Sobald echte Projektfotos vorliegen, sollten sie stattdessen lokal unter
  `public/` abgelegt werden, um diese externe Abhängigkeit aufzulösen.

## Vor Veröffentlichung zu prüfen

- `NEXT_PUBLIC_*`-Variablen sind nicht vorhanden/nötig, solange kein
  clientseitig sichtbarer externer Dienst angebunden wird.
- Kein Zugangsdaten/Secret liegt aktuell im Repository.

## Sicherheit: was erst mit echtem Backend möglich ist

Kontaktformular und Preisrechner validieren aktuell nur **clientseitig**
(`src/lib/pricing/validate.ts`, `ContactForm.tsx`) und senden nirgends etwas
ab – es gibt bewusst noch keinen Server-Endpunkt. Sobald einer angebunden wird
(Server Action oder API-Route), zusätzlich einplanen:

- **Serverseitige Validierung**: dieselben Regeln aus `src/lib/pricing/validate.ts`
  serverseitig erneut prüfen – Client-Validierung lässt sich umgehen.
- **Rate Limiting**: z. B. über die Hosting-Plattform (Vercel Firewall/Edge
  Config) oder eine einfache IP-basierte Zwischenspeicherung, um
  Formular-Spam über viele Anfragen zu verhindern.
- **CSRF**: Next.js Server Actions prüfen die Origin-Header bereits automatisch;
  bei einer klassischen API-Route selbst implementieren.
- Das im Preisrechner bereits vorhandene Honeypot-Feld (`website`) sollte auch
  serverseitig geprüft werden (befüllt = verwerfen), nicht nur clientseitig.
