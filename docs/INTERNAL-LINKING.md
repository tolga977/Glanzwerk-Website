# Interne Linkstruktur

Übersicht, wie die wichtigsten Seitentypen miteinander verlinkt sind.
Linktexte sind durchgehend beschreibend (z. B. "Zur Büroreinigung",
"Mitte ansehen"), nicht als sich wiederholender Keyword-Anker.

## Startseite
- → Hauptleistungen: 8 Leistungskarten (Abschnitt "Leistungen") + Link
  "Alle Leistungen im Überblick" → `/leistungen`
- → Bezirke: alle 12 Bezirke als Chips (Abschnitt "Standorte") + Link
  "Alle Standorte im Detail ansehen" → `/standorte`
- → Preisrechner: Hero-CTA, Preisrechner-Teaser-Sektion, Abschluss-CTA
- → Kontakt: Hero-CTA (sekundär), Abschluss-CTA
- FAQ-Antworten verlinken passend weiter zu `/leistungen`, `/standorte`,
  `/preisrechner`, `/kontakt`

## Leistungsseiten (`/leistungen/[slug]`)
- → verwandte Leistungen (`relatedSlugs` in `src/data/services.ts`,
  fachlich sinnvoll kuratiert, z. B. Fensterreinigung ↔ Glasreinigung)
- → Bezirksseiten: sofern für diese Leistung priorisierte Kombi-Seiten
  existieren (`src/data/combos.ts`), werden diese verlinkt; sonst Link zur
  Standortübersicht
- → Preisrechner und Kontakt (jeweils als CTA)

## Bezirksseiten (`/standorte/[bezirk]`)
- → passende Leistungen (`featuredServiceSlugs` je Bezirk, inhaltlich an den
  Bezirkscharakter angepasst, nicht für alle Bezirke identisch)
- → Nachbarbezirke (`neighborSlugs`, echte geografische Nachbarschaft)
- → Kombi-Seiten, sofern für diesen Bezirk vorhanden
- → Preisrechner und Kontakt (CTA)

## Kombi-Landingpages (`/leistungen/[slug]/[bezirk]`)
- → zugehörige Hauptleistungsseite
- → zugehörige Bezirksseite
- → dieselbe Leistung in benachbarten Bezirken (sofern dort ebenfalls eine
  Kombi-Seite existiert)

## Preisrechner
- Ergebnis-CTA → Kontakt (Angebot anfragen)
- Datenschutz-Checkbox verlinkt → Datenschutzerklärung

## Kontakt
- Datenschutz-Checkbox verlinkt → Datenschutzerklärung

## Glanzwerk Wissen (`/wissen`, `/wissen/[slug]`)
- Übersicht verlinkt zu allen Artikeln; jeder Artikel verlinkt zurück zu
  `/wissen` (Breadcrumb) sowie zu passenden Leistungsseiten
  (`relatedServiceSlugs`) und zu bis zu drei weiteren Artikeln
- In der Hauptnavigation und im Footer sitewide erreichbar

## Reinigungsfirma Berlin (`/reinigungsfirma-berlin`)
- Eigenständige Anbieter-fokussierte Landingpage (Auswahlkriterien statt
  Leistungsbeschreibung), verlinkt zu `/leistungen`, `/standorte`,
  `/preisrechner`, `/kontakt`
- Im Footer sitewide erreichbar, damit die Seite nicht verwaist

## Footer (auf jeder Seite)
- Alle 12 Leistungen, alle 12 Bezirke, Über uns, Kontakt, Preisrechner,
  Glanzwerk Wissen, Reinigungsfirma Berlin, Bewertungen, Impressum,
  Datenschutz

## Bewusst vermieden
- Keine künstlichen Linkblöcke nur für Suchmaschinen
- Keine identischen Anker-Texte für unterschiedliche Ziele
- Keine verwaisten Seiten: jede Leistungs-, Bezirks-, Kombi-, Wissens- und
  Landingpage ist sowohl von einer Übersichtsseite als auch vom Footer aus
  erreichbar (siehe `sitemap.ts` für die vollständige URL-Liste, 71 URLs)
