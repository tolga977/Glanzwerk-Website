# Schema.org / JSON-LD Audit — glanzwerkberlin.de (localhost:3000)

Geprüft: `src/lib/schema.ts`, `src/app/layout.tsx`, alle Seiten-Templates unter `src/app/**`, `src/components/ui/Breadcrumb.tsx`, `src/components/seo/JsonLd.tsx`, `src/lib/googleRating.ts`, `src/data/googleBusiness.ts`, `src/data/site.ts`, `src/data/articles.ts`, `src/data/owner.ts`.

Format-Basis ist durchgehend korrekt: JSON-LD (kein Microdata/RDFa), `@context: "https://schema.org"` (https), alle URLs absolut über `siteConfig.url`, keine Platzhaltertexte, keine erfundenen Werte — der Code-Kommentar in `schema.ts` ("Deliberately no LocalBusiness/AggregateRating — no walk-in storefront, no real reviews yet") ist mittlerweile **teilweise veraltet**: reale, verifizierte Reviews existieren jetzt (`getGoogleRating()`, 5,0★/7 Bewertungen, Stand 29.07.2026), sind aber weiterhin nicht ins Schema eingebunden.

## 1. Detection — welches Schema wo

| Seitentyp | Datei | Schema-Typen |
|---|---|---|
| Sitewide (jede Seite) | `layout.tsx` | `Organization`, `WebSite` |
| Jede Unterseite (nicht Startseite) | `Breadcrumb.tsx` | `BreadcrumbList` |
| Startseite `/` | `app/page.tsx` | + `ProfessionalService` |
| `/ueber-uns` | `ueber-uns/page.tsx` | + `AboutPage` (via `webPageSchema`) + `ProfessionalService` |
| `/kontakt` | `kontakt/page.tsx` | + `ContactPage` (via `webPageSchema`) |
| `/leistungen/[slug]` | `leistungen/[slug]/page.tsx` | + `Service` |
| `/leistungen/[slug]/[bezirk]` | `leistungen/[slug]/[bezirk]/page.tsx` | + `Service` (areaServed = Bezirk) |
| `/standorte/[bezirk]` | `standorte/[bezirk]/page.tsx` | + `Service` (areaServed = Bezirk) |
| `/standorte/[bezirk]/[ortsteil]` | `standorte/[bezirk]/[ortsteil]/page.tsx` | + `Service` (areaServed = Ortsteil) |
| `/wissen/[slug]` | `wissen/[slug]/page.tsx` | + `Article` |
| `/reinigungsfirma-berlin`, `/umwelt-verantwortung`, `/3-monate-testen` | jeweils `page.tsx` | + `WebPage` |
| **`/bewertungen`** | `bewertungen/page.tsx` | **kein Seiten-Schema** (nur sitewide Organization/WebSite) |

Bestätigt aus paralleler Analyse: kein `LocalBusiness`/`aggregateRating`, kein `geo`/`GeoCoordinates`, `areaServed` ist tatsächlich sauber granular je Bezirk/Ortsteil überschrieben (verifiziert in `standorte/[bezirk]/page.tsx`, `.../[ortsteil]/page.tsx`, `leistungen/[slug]/[bezirk]/page.tsx`).

## 2. Validierung pro Block

| Block | Pflichtfelder | Ergebnis |
|---|---|---|
| `Organization` | name, url | ✅ Pass. Zusätzlich: telephone, email, address (PostalAddress, vollständig). ⚠️ `logo` fehlt (Google-Empfehlung für Knowledge-Panel/Entity-Resolution) — Datei liegt bereits vor (`public/brand/glanzwerk-logo.png`), wird nur nicht referenziert. Kein `sameAs`, aber korrekt: es gibt keine Social-Profile in den Daten — kein Erfindungsbedarf. |
| `WebSite` | name, url | ✅ Pass. Kein `SearchAction` — korrekt, es gibt keine interne Sitesuche. |
| `ProfessionalService` | name, address | ✅ Pass (Pflichtfelder von Google für LocalBusiness-Familie: name, address, ggf. Bild). ⚠️ Kein `image` (obwohl echte Fotos in `src/data/photos.ts` existieren), kein `priceRange` (korrekt weggelassen, keine öffentlichen Festpreise), kein `geo` (korrekt weggelassen laut vorheriger Analyse — s. Abschnitt 4), kein `aggregateRating` (**größte Lücke**, s. u.). |
| `Service` (alle Varianten) | serviceType oder name, provider | ✅ Pass. `areaServed` korrekt granular. ⚠️ Kleinigkeit: `areaServed."@type"` ist immer `"City"` — auch für Berliner **Bezirke** (Pankow, Mitte …) und **Ortsteile** (Buch, Karow …), die administrativ keine Städte sind. Schema.org/Google validieren das nicht strikt (kein Fehler), aber `"AdministrativeArea"` (Bezirk) bzw. `"Place"` (Ortsteil) wäre präziser. Niedrige Priorität. |
| `Article` | headline, image, datePublished (von Google für Article-Rich-Results verlangt) | ⚠️ **Fail gegen Google-Best-Practice**: `headline`/`description`/`url`/`author`/`publisher` vorhanden, aber **`image` fehlt** obwohl jeder Artikel in `src/data/articles.ts` ein reales `image: { src, alt }`-Feld führt, das im Schema-Builder schlicht nicht verdrahtet ist. **`datePublished`/`dateModified` fehlen komplett** — hier liegt tatsächlich keine Datumsangabe im Datenmodell vor (echte Datenlücke, nicht nur ein Wiring-Problem). `publisher` ist ein bloßes `Organization`-Objekt ohne `logo` — Google verlangt `publisher.logo` als `ImageObject` für Article-Eligibility. |
| `WebPage`/`ContactPage`/`AboutPage` | name, url | ✅ Pass, schlank und korrekt (`isPartOf` → WebSite). |
| `BreadcrumbList` | itemListElement mit position/name/item | ✅ Pass, absolute URLs, inkl. "Startseite" als Position 1 auf jeder Unterseite. |

## 3. Größter kostenloser Gewinn — mit wichtigem Caveat

Real vorhandene, verifizierte Daten (`getGoogleRating()` → 5,0★ aus 7 Bewertungen, `googleBusiness.fallback.checkedOn: "2026-07-29"`, plus bis zu 5 echte Rezensionstexte samt Autor bei aktiven API-Credentials) sind **nirgends im Schema abgebildet** — auch nicht auf `/bewertungen`, der Seite, die genau diese Daten anzeigt.

**Wichtiger Fachvorbehalt, bevor das umgesetzt wird:** Googles Richtlinien zu Review-Snippets (Spam-Policy "Review snippets") untersagen explizit **selbstreferenzielle** `Review`/`aggregateRating`-Auszeichnung auf der eigenen Unternehmensseite ("self-serving reviews"), sofern die Seite nicht selbst eine unabhängige Bewertungsplattform ist. Für `LocalBusiness`/`ProfessionalService`-Markup auf der eigenen Startseite bedeutet das: **kein Stern-Rich-Result in der Google-Suche**, unabhängig davon, wie echt die Daten sind. Das ist strukturell dasselbe Muster wie bei `FAQPage` in diesem Projekt: kein SERP-Gewinn, aber Wert für KI-/LLM-Antwortsysteme (GEO), die reale, verifizierbare Entitätsdaten für Zitate und Vertrauenssignale nutzen können, plus Nutzen für Google selbst als Kontextsignal (auch ohne Rich-Result-Darstellung).

**Empfehlung:** `aggregateRating` ergänzen — mit dem Wissen, dass der Nutzen in AI-Sichtbarkeit/Entity-Grounding liegt, nicht in Sternen in der SERP. Da die Daten dynamisch aus `getGoogleRating()` kommen (live oder geprüfter Fallback), muss die Bindung im Code passieren, nicht als statischer Wert:

```ts
// src/lib/schema.ts — professionalServiceSchema() erweitern
interface ProfessionalServiceSchemaOptions {
  aggregateRating?: { ratingValue: number; reviewCount: number };
}

export function professionalServiceSchema({ aggregateRating }: ProfessionalServiceSchemaOptions = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.zip,
      addressLocality: siteConfig.address.city,
      addressCountry: "DE",
    },
    areaServed: { "@type": "City", name: "Berlin" },
    ...(aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
      },
    }),
  };
}
```

```tsx
// src/app/page.tsx — Aufruf mit den bereits geladenen echten Werten
const googleRating = await getGoogleRating();
// ...
<JsonLd
  data={professionalServiceSchema({
    aggregateRating: { ratingValue: googleRating.rating, reviewCount: googleRating.count },
  })}
/>
```

Auf `/bewertungen` analog einsetzen, plus optional die echten geladenen Rezensionstexte (bereits mit Autor, Sternwert, Text aus der Places API geparst, keine Erfindung) als `review`-Array — nur wenn `googleRating.live` bzw. `reviews.length > 0`, da der Fallback-Pfad keine Texte liefert:

```ts
...(googleRating.reviews.length > 0 && {
  review: googleRating.reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
}),
```

## 4. Weitere Lücken (nur mit echten, vorhandenen Daten)

**a) `Organization.logo` fehlt — reine Freebie-Ergänzung, kein Caveat.**
Datei liegt bereits vor: `public/brand/glanzwerk-logo.png`.

```ts
logo: `${siteConfig.url}/brand/glanzwerk-logo.png`,
```

**b) `Article`-Schema nutzt vorhandenes Bild nicht.** `src/data/articles.ts` führt pro Artikel ein reales `image: { src, alt }`. Der Builder ignoriert es. Fix in `articleSchema()`:

```ts
interface ArticleSchemaOptions {
  headline: string;
  description: string;
  path: string;
  image?: string; // absolute URL
}

export function articleSchema({ headline, description, path, image }: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${siteConfig.url}${path}`,
    ...(image && { image: `${siteConfig.url}${image}` }),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/glanzwerk-logo.png` },
    },
  };
}
```

Aufruf in `wissen/[slug]/page.tsx` ergänzt um `image: article.image.src`.

**c) `datePublished`/`dateModified` fehlen — echte Datenlücke, nicht nur Wiring.** Es gibt in `Article` (interface in `src/data/articles.ts`) kein Datumsfeld. Google verlangt `datePublished` für Article-Rich-Result-Eligibility. Empfehlung: **kein** Datum erfinden — stattdessen ein reales Feld ergänzen (z. B. `publishedDate: "2026-XX-XX"` in ISO 8601), sobald die tatsächlichen Veröffentlichungsdaten der Wissen-Artikel bekannt/dokumentiert sind, dann erst ins Schema ziehen.

**d) `GeoCoordinates` fehlen.** Die vorherige Analyse markiert das als bewusste Auslassung — korrekt in dem Sinne, dass niemand Koordinaten erfunden hat. Da die Adresse (`Joachim-Gottschalk-Weg 12, 12353 Berlin`) real und bereits öffentlich ist, ließe sich `geo` durch echtes Geocoding (kein Rateweg, sondern ein Lookup-Schritt) ergänzen — das ist kein "Erfinden", sondern eine Ableitung aus bereits publizierter Adresse. Empfehlung: als kleinen, separaten Task einplanen (echter Geocoding-Call, dann Wert eintragen), nicht in diesem Audit selbst schätzen.

**e) `/bewertungen` hat aktuell kein Page-Schema**, obwohl es die einzige Seite ist, die die Bewertungsdaten prominent zeigt. Mindestens `webPageSchema({ ..., path: "/bewertungen" })` für Konsistenz mit den anderen Content-Seiten ergänzen; `aggregateRating`/`review` wie in Abschnitt 3 beschrieben.

**f) Kein `@id`-Verbund zwischen den Schema-Blöcken.** `Organization`, `ProfessionalService` und `WebSite` sind unabhängige Knoten ohne `@id`. Best Practice (nicht kritisch): `Organization` mit `"@id": "https://www.glanzwerkberlin.de/#organization"` versehen und in `ProfessionalService`/`WebSite`/`Article.publisher` per `@id`-Referenz statt Duplikat verlinken — reduziert Redundanz im Knowledge Graph, ändert aber keine Rich-Result-Eligibility.

**g) `areaServed."@type"` immer `"City"`** — für Bezirke (`AdministrativeArea`) und Ortsteile (`Place`) technisch ungenauer, aber nicht fehlerhaft. Niedrige Priorität, nur bei ohnehin anstehender Überarbeitung von `serviceSchema()` mitnehmen.

## 5. Was bewusst nicht empfohlen wird

- **`LocalBusiness`/eigenständiges `AggregateRating` als primärer Typ**: `ProfessionalService` ist bereits ein `LocalBusiness`-Subtyp — der Code-Kommentar "Deliberately no LocalBusiness" ist insofern leicht irreführend, faktisch wird schon ein LocalBusiness-Subtyp ausgegeben. Kein zusätzlicher `LocalBusiness`-Block nötig.
- **`FAQPage`**: nicht im Projekt gefunden (kein `FAQPage`-Aufruf in `schema.ts` oder den Seiten) — nichts zu markieren.
- **`HowTo`, `SpecialAnnouncement`, `CourseInfo`**: nicht vorhanden, nicht empfohlen (deprecated).
- **`priceRange`, Öffnungszeiten (`openingHoursSpecification`), Zertifikate**: keine echten Daten im Projekt vorhanden (`owner.ts` bestätigt: keine Öffnungszeiten-Daten, nur "Reaktion innerhalb von 2 Stunden während der Geschäftszeiten" als Prosa-Aussage, kein strukturiertes Zeitfenster) — bewusst nicht erfunden.
- **`Person`/Autor-Schema für den Inhaber** (`src/data/owner.ts`: Tolga Doguc, Inhaber): optionale Zukunftsoption für E-E-A-T (z. B. als `author` auf `/ueber-uns` oder auf Artikeln, die tatsächlich von ihm verfasst sind), aber nicht pauschal auf alle `Article`-Seiten anwenden, da keine Autorenzuordnung pro Artikel in den Daten vorliegt — würde sonst eine unbelegte Autorschaft suggerieren.

## Priorisierte Kurzliste

1. **Kritisch (Daten bereits vorhanden, nur Wiring):** `Organization.logo`, `Article.image`, `Article.publisher.logo`.
2. **Wichtig, mit Caveat kommunizieren:** `aggregateRating` auf `ProfessionalService` + `/bewertungen` — Wert liegt in AI/GEO-Sichtbarkeit, nicht in SERP-Sternen (Google verbietet Self-Review-Rich-Results).
3. **Info, echte Datenlücke:** `Article.datePublished`/`dateModified` — braucht zuerst ein reales Datumsfeld im Datenmodell, dann Schema-Anbindung.
4. **Niedrige Priorität / technische Politur:** `geo` (echtes Geocoding als Task), `@id`-Verbund, `areaServed`-Typ-Präzisierung (`AdministrativeArea`/`Place` statt `City`).
5. **Konsistenzlücke:** `/bewertungen` fehlt jegliches Page-Schema.
