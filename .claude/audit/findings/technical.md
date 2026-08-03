# Technical SEO Audit — Glanzwerk Reinigungsservice Berlin

**Geprüfte Instanz:** `http://localhost:3000/` (lokaler Next.js Dev-Server, NICHT live deployt)
**Datum:** 2026-08-01
**Stack:** Next.js 16.2.10, React 19.2.4, App Router
**Methodik:** Ausschließlich lokal verifizierbare Signale (HTTP-Header, HTML-Quellcode, robots.txt/sitemap.xml, next.config.ts, Projektquellcode). Keine Ahrefs/GSC/CrUX-Daten — diese setzen Live-Traffic voraus und wurden bewusst NICHT erfunden. Keine echten Lighthouse-Feld-Scores, da kein Field-Data-Ursprung existiert (Seite nicht live).

**Technical Score: 88/100**

---

## 1. Crawlability — PASS

- `robots.txt` vorhanden und korrekt: `User-Agent: *` / `Allow: /` + `Sitemap:`-Verweis auf `https://www.glanzwerkberlin.de/sitemap.xml`. Keine spezifischen Bot-Sperren (auch keine impliziten Sperren für AI-Crawler wie GPTBot/ClaudeBot — permissiv per Default).
- `sitemap.xml` valide XML, **99 `<loc>`-Einträge** (nicht 98, exakt nachgezählt), inkl. `changefreq`/`priority`.
- 404-Verhalten korrekt: nicht existierende URL liefert echten `404 Not Found` (kein Soft-404).
- Keine `noindex`-Meta-Tags oder `X-Robots-Tag`-Header auf den gestichprobten Seiten gefunden.

**Kleinere Inkonsistenz (Medium):** In der Sitemap hat die Startseite eine URL **mit** trailing slash (`https://www.glanzwerkberlin.de/`), alle anderen URLs (z. B. `/leistungen`, `/standorte`) **ohne** trailing slash. Das ist in sich uneinheitlich, aber kein Crawling-Blocker.

---

## 2. Indexability — PASS (mit einem Trailing-Slash-Detail)

Stichprobe über 5 Templates (Startseite, Leistungsseite, Kombi-Seite Bezirk, Standorte-Hub, Wissen-Hub) — alle Canonical-Tags sind **korrekt selbstreferenzierend**, keine Duplikate:

| Seite | Canonical im HTML |
|---|---|
| `/` | `https://www.glanzwerkberlin.de` (**ohne** trailing slash) |
| `/leistungen/bueroreinigung-berlin` | `https://www.glanzwerkberlin.de/leistungen/bueroreinigung-berlin` |
| `/leistungen/gebaeudereinigung-berlin/mitte` | `https://www.glanzwerkberlin.de/leistungen/gebaeudereinigung-berlin/mitte` |
| `/standorte` | `https://www.glanzwerkberlin.de/standorte` |
| `/wissen` | `https://www.glanzwerkberlin.de/wissen` |

**Finding (Medium):** Die Startseiten-Canonical hat **keinen** trailing slash (`glanzwerkberlin.de` statt `glanzwerkberlin.de/`), während die Sitemap für dieselbe URL **mit** trailing slash arbeitet. Das ist kein Duplicate-Content-Risiko (Google normalisiert i. d. R.), aber eine unnötige Inkonsistenz zwischen zwei Quellen derselben URL. Empfehlung: beide auf denselben Zustand vereinheitlichen (Empfehlung: ohne trailing slash, konsistent mit allen anderen Seiten).

- Title-Tags und Meta-Descriptions auf allen 5 Stichproben-Seiten vorhanden, unique, keine Duplikate. Meta-Description Startseite: 172 Zeichen (im akzeptablen Bereich, leicht über der klassischen 155-160-Richtlinie, unkritisch).
- `<html lang="de">` korrekt gesetzt.
- Kein Thin-Content-Risiko sichtbar: extrahierter sichtbarer Text der Startseite ~13.200 Zeichen bereits im Server-HTML (siehe Abschnitt 8).

---

## 3. Security — PASS mit einer High-Priority-Lücke

Aus `next.config.ts` (`headers()`) und live per `curl` verifiziert:

| Header | Status |
|---|---|
| `X-Content-Type-Options: nosniff` | Vorhanden |
| `Referrer-Policy: strict-origin-when-cross-origin` | Vorhanden |
| `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` | Vorhanden |
| `X-Frame-Options: SAMEORIGIN` | Vorhanden |
| `Content-Security-Policy` | Im Code vorhanden, aber **nur für `NODE_ENV=production`** aktiv (im Dev-Server deshalb nicht sichtbar — das ist beabsichtigt lt. Kommentar im Code, kein Bug). CSP-Policy: `default-src 'self'`, `script-src 'self' 'unsafe-inline'`, `img-src` erlaubt `self`, `data:`, Unsplash/Pexels — konsistent mit den im Code genutzten Bildquellen. |
| `Strict-Transport-Security` (HSTS) | **Fehlt komplett** — weder im Dev- noch im Prod-Header-Array in `next.config.ts` konfiguriert. |
| `X-Powered-By: Next.js` | Gesetzt (Next.js-Standardverhalten), verrät Stack-Info. |

**Finding (High):** Kein HSTS-Header konfiguriert. Da die Seite künftig unter HTTPS (`www.glanzwerkberlin.de`) live gehen soll, sollte `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` in `baseSecurityHeaders` in `next.config.ts` ergänzt werden — HSTS lässt sich nicht nachträglich per Hosting/CDN "reparieren", wenn er im ersten Requests fehlt, daher jetzt vor Launch einbauen.

**Finding (Low):** `X-Powered-By: Next.js` verrät unnötig den Stack. Kann via `next.config.ts` (`poweredByHeader: false`) deaktiviert werden. Kein SEO-Impact, reine Hardening-Empfehlung.

Da der Dev-Server nur über HTTP läuft, konnte kein echter HTTPS/TLS-Check (Zertifikat, Mixed Content) durchgeführt werden — das ist ausschließlich nach Live-Deployment prüfbar.

---

## 4. URL-Struktur & Redirects — PASS

- Saubere, sprechende URLs (`/leistungen/bueroreinigung-berlin`, `/leistungen/gebaeudereinigung-berlin/mitte`), keine Query-Parameter oder IDs in indexierbaren Pfaden.
- Redirects verifiziert:
  - `/leistungen/` → `/leistungen` — `308 Permanent Redirect`, Single-Hop.
  - Alte Glasreinigung-Routen (`/leistungen/glasreinigung-berlin`, `/leistungen/fensterreinigung-berlin`, inkl. Bezirks-Subrouten) → `/leistungen/glas-und-fensterreinigung-berlin[/:bezirk]` — als `redirects()` in `next.config.ts` mit `permanent: true` (308) korrekt konfiguriert, Single-Hop bestätigt.
- Kein `trailingSlash`-Setting in `next.config.ts` — Next.js-Standardverhalten (ohne trailing slash), passend zu den meisten Sitemap-Einträgen, aber siehe Trailing-Slash-Inkonsistenz oben (Abschnitt 1/2).

---

## 5. Mobile — PASS

- `<meta name="viewport" content="width=device-width, initial-scale=1">` korrekt gesetzt (vom Nutzer bereits verifiziert, hier bestätigt).
- Responsive Tailwind-Klassen durchgängig im Markup sichtbar (z. B. `h-[5.5rem] 2xl:h-24` am Logo).
- Alle 22 Bilder auf der Startseite haben `alt`-Attribute (0 fehlend) — auch relevant für Accessibility/Mobile-UX.
- Keine Interstitials oder Blocking-Overlays im Server-HTML erkennbar.
- Touch-Target-Größen konnten nicht pixelgenau vermessen werden (kein Rendering-Tool im Scope dieses Checks); aus dem Quellcode keine auffällig kleinen Klick-Ziele identifiziert.

---

## 6. Core Web Vitals (aus Quellcode-Inspektion, KEINE echten Feldmessdaten) — WEITGEHEND GUT, ein konkretes Finding

Da die Seite nicht live ist, existieren keine CrUX-/PageSpeed-Felddaten. Folgende Aussagen basieren ausschließlich auf strukturellen Signalen im HTML/Code:

**LCP-relevante Signale — größtenteils gut:**
- Next/Image mit `priority` korrekt für die wahrscheinlichen LCP-Kandidaten gesetzt: Hero-Hintergrundbild UND beide Logo-Varianten werden per `<link rel="preload" as="image">` vorab geladen (kein `loading="lazy"` auf diesen Elementen).
- Hero-Bild hat einen sauberen, mehrstufigen `srcset` (640w bis 3840w) — responsive Auslieferung funktioniert korrekt für dieses Bild.
- Übrige Bilder unterhalb des Folds nutzen korrekt `loading="lazy"` (19 von 22 Bildern).

**Finding (Medium) — LCP/Payload-Risiko durch Logo-Preload:**
Die beiden Logo-`<link rel="preload">`-Tags (`glanzwerk-logo.png`, `glanzwerk-logo-dark-bg.png`) fordern jeweils die **volle Quellauflösung `w=3840`** an, obwohl das Logo nur mit `h-24` (≈96–150px Höhe) gerendert wird. Ursache im Quellcode: Die `<Image>`-Komponenten übergeben offenbar die intrinsischen Quellmaße (3830×1948) statt der tatsächlichen Zielgröße, wodurch next/image keine kleineren, passenden Varianten generiert. Die Quelldateien selbst sind PNG-Rasterbilder mit 292–308 KB (`public/brand/glanzwerk-logo*.png`).
Das bedeutet: **Zwei hochpriorisierte Preload-Requests konkurrieren unnötig um Bandbreite mit dem echten LCP-Kandidaten** (Hero-Bild), was das LCP-Timing auf langsamen Verbindungen verschlechtern kann.
Empfehlung: (a) `width`/`height`-Props der Logo-`<Image>`-Komponenten auf die tatsächliche Render-Größe setzen, damit next/image passend kleinere Varianten erzeugt, oder (b) besser: Logo als SVG ausliefern (verlustfrei skalierbar, typischerweise <10 KB statt 300 KB).

**CLS-relevante Signale — unauffällig:**
- 20 von 22 `<img>`-Tags haben kein explizites `width`/`height`-Attribut — auf den ersten Blick ein klassisches CLS-Risiko. Bei Prüfung des tatsächlichen Markups stellte sich heraus: Es handelt sich durchgängig um next/image im `fill`-Modus (`data-nimg="fill"`, `position:absolute; height:100%; width:100%`), bei dem Breite/Höhe bewusst über den (positionierten) Elterncontainer gesteuert werden — das ist ein valides next/image-Pattern und kein automatischer CLS-Bug. Nicht abschließend verifiziert werden konnte, ob **jeder** Elterncontainer ein festes Seitenverhältnis/feste Höhe per CSS erhält (dafür wäre visuelles Rendering nötig, außerhalb dieses Scopes) — Empfehlung: stichprobenartig mit echtem Lighthouse/CrUX nach Go-Live erneut prüfen.
- Web Fonts werden korrekt per `<link rel="preload" as="font">` vorab geladen (3 woff2-Dateien) — reduziert Font-Swap-bedingtes Layout-Shift-Risiko.

**INP-relevante Signale:**
- Nur 10 Client-Komponenten (`"use client"`) im gesamten `src`-Verzeichnis (Header, MobileNav, FadeIn, HeroVideo, ProcessTimeline, ContactForm, PriceCalculator, ParallaxImage, FAQ, error.tsx) — schlanker Hydration-/JS-Footprint, spricht für gute INP-Voraussetzungen. Keine echte Interaktionsmessung ohne Live-Browser möglich.

**Kompression:** Gzip aktiv (`Content-Encoding: gzip`, Next.js-Standard `compress: true`). Brotli/HTTP2/CDN sind laut Code-Kommentar in `next.config.ts` bewusst dem Hosting überlassen (`docs/DEPLOYMENT.md`) — nach Deployment verifizieren.

---

## 7. Structured Data — PASS

JSON-LD auf allen Stichproben vorhanden und **als valides JSON geparst** (kein Syntax-Fehler):

| Seite | Anzahl `<script type="application/ld+json">` | Schema-Typen |
|---|---|---|
| `/` | 4 | Organization, WebSite, ProfessionalService, FAQPage |
| `/leistungen/bueroreinigung-berlin` | 5 | Organization, WebSite, BreadcrumbList, Service, FAQPage |
| `/leistungen/gebaeudereinigung-berlin/mitte` | 9 | (u. a. Breadcrumb/Service/FAQ-Familie, mehrfach je nach Bezirks-Template) |
| `/standorte` | 6 | — |
| `/wissen` | 6 | — |

Keine offensichtlichen Pflichtfeld-Lücken bei Stichprobenprüfung (Organization/WebSite/ProfessionalService/FAQPage mit erwarteten `@type`-Werten). Eine vollständige Schema.org-Validierung (Google Rich Results Test) war lokal nicht möglich, da das Tool eine öffentlich erreichbare URL benötigt — nach Deployment nachholen.

---

## 8. JavaScript-Rendering (SSR vs. CSR) — PASS, sehr SSR-lastig

- Vollständiger Content bereits im initialen Server-HTML vorhanden — **kein** JS-Ausführung nötig, um Kerninhalte zu sehen. Verifiziert durch Boilerplate-Extraktion des Startseiten-`<body>` (Skripte/Styles entfernt): **~13.200 Zeichen sichtbarer Text** bereits im rohen `curl`-Response.
- Nur 1 `<h1>` pro Seite (Startseite: „Gebäudereinigung Berlin"), sauber im Server-HTML.
- Nur 10 von vielen Komponenten sind `"use client"` — der Rest läuft als React Server Components. Das bestätigt eine RSC-first-Architektur mit minimaler CSR-Abhängigkeit.
- `x-nextjs-prerender: 1` Header auf statisch generierten Seiten (z. B. Leistungsseite) bestätigt Static Generation/ISR statt Server-seitigem Rendering pro Request.
- Für Crawler/LLM-Bots (Googlebot, GPTBot, ClaudeBot etc.) ist somit **kein** Headless-Rendering nötig, um vollständigen Content zu erfassen — niedriges Risiko für Indexierungsprobleme durch clientseitiges Rendering.

---

## 9. IndexNow-Protokoll — NICHT IMPLEMENTIERT (Low)

- Keine Treffer für „indexnow"/„IndexNow" im gesamten Projektquellcode.
- Kein API-Endpoint oder Key-File (`/<key>.txt`) für IndexNow (Bing, Yandex, Naver) gefunden.
- **Empfehlung (Low/Optional):** Nach Go-Live IndexNow-Integration erwägen, damit Content-Updates (insb. die 99 Sitemap-URLs bei künftigen Änderungen) Bing/Yandex/Naver ohne Wartezeit auf den nächsten Crawl signalisiert werden. Kein Blocker, aber güns­tiger Quick-Win für schnellere Reindexierung.

---

## 10. hreflang — N/A (korrekt)

Keine `hreflang`-Attribute im HTML gefunden (0 Treffer). Da es sich um eine einsprachige (Deutsch), auf den Berliner Markt fokussierte B2B-Seite ohne internationale/mehrsprachige Varianten handelt, ist das Fehlen von hreflang **korrekt und kein Fehler** — kein Delegations-Bedarf an `seo-hreflang`.

---

## Zusammenfassung: Priorisierte Findings

| Prio | Finding | Kategorie | Fundort |
|---|---|---|---|
| High | HSTS-Header (`Strict-Transport-Security`) fehlt komplett in `next.config.ts` | Security | `next.config.ts` → `baseSecurityHeaders` |
| Medium | Logo-Preload lädt volle 3840px-Auflösung (300 KB PNG) statt Zielgröße (~100–150px) — konkurriert mit LCP-Ressource | Core Web Vitals | Logo-`<Image>`-Komponenten (Header), Quelldateien `public/brand/glanzwerk-logo*.png` |
| Medium | Trailing-Slash-Inkonsistenz Startseite: Sitemap nutzt `.../` , Canonical-Tag nutzt `...` ohne Slash | Indexability / Crawlability | `sitemap.xml` vs. Homepage-`<head>` |
| Low | `X-Powered-By: Next.js` Header verrät Stack (Hardening, kein SEO-Impact) | Security | Next.js-Default, via `poweredByHeader: false` abschaltbar |
| Low | Kein IndexNow-Protokoll implementiert | Crawling-Effizienz | Projektweit (kein Treffer) |
| Info | CLS-Risiko durch `fill`-Mode-Bilder ohne `width`/`height` konnte nicht abschließend visuell verifiziert werden (Elterncontainer-Sizing) | Core Web Vitals | Nach Go-Live mit echtem Lighthouse/CrUX erneut prüfen |
| Info | Echte CWV-Feldwerte (LCP/INP/CLS), TLS/HSTS-Wirkung, Rich-Results-Validierung erst nach Live-Deployment prüfbar | — | — |

## Bestätigte Stärken (Pass)

- robots.txt korrekt permissiv, Sitemap mit 99 validen URLs
- Alle gestichprobten Canonicals selbstreferenzierend, keine Duplikate
- Redirects sauber, single-hop, korrekter 308-Statuscode
- Echter 404-Statuscode für nicht existierende Seiten
- Security-Header (außer HSTS) vollständig, CSP für Produktion vorbereitet
- Vollständig serverseitig gerenderter Content (SSR/SSG), minimaler CSR-Fußabdruck (10 Client-Komponenten)
- Sauberes strukturiertes Daten-Markup (JSON-LD, valide, mehrere Schema-Typen je Seite)
- Responsive Images mit korrektem `srcset` und `priority`/`loading="lazy"`-Steuerung für die meisten Assets
- Gzip-Kompression aktiv
- Korrekte `lang="de"`, ein `<h1>` pro Seite, alle Bilder mit `alt`-Text auf der Startseite
