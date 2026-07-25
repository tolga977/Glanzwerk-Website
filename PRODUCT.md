# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Entscheider bei gewerblich genutzten Objekten in Berlin: Büros, Praxen, Kanzleien, Hausverwaltungen, Fitnessstudios, Autohäuser, Gastronomiebetriebe, Kitas/Schulen. Sie suchen eine wiederkehrende, professionelle Gebäudereinigung für ihr Unternehmen bzw. ihr verwaltetes Objekt. Reines B2B-Geschäft, kein Privatkunden-/B2C-Angebot.

## Product Purpose

Glanzwerk Reinigungsservice Berlin bietet professionelle Gebäudereinigung für gewerbliche Kunden in allen zwölf Berliner Bezirken. Ziel ist eine zuverlässige, individuell auf das jeweilige Objekt abgestimmte Reinigung mit klaren Abläufen, persönlicher und direkt erreichbarer Betreuung und flexiblen Reinigungszeiten, die den Geschäftsbetrieb der Kunden möglichst wenig beeinträchtigt.

## Positioning

Individuell auf das Objekt abgestimmte Leistungsbündel statt Standardpaket; persönliche und direkt erreichbare Betreuung statt Callcenter; vorab schriftlich festgelegte Leistungsumfänge und Intervalle; Reinigung außerhalb der Geschäftszeiten möglich; dokumentiertes Nachbesserungsversprechen bei Mängeln statt vager Qualitätswerbung.

## Operating Context

Next.js-Website (App Router) mit rund 109 Routen. Reale Struktur (kein vollständiges 12×12-Raster): 12 Leistungsseiten (`/leistungen/[slug]`) + 1 Leistungen-Übersicht, 12 Bezirksseiten (`/standorte/[bezirk]`) + 1 Standorte-Übersicht, 8 Ortsteilseiten (`/standorte/[bezirk]/[ortsteil]`, nur bei den Bezirken mit erfassten Ortsteilen), 50 kuratierte Leistung-Bezirk-Kombinationsseiten (`/leistungen/[slug]/[bezirk]`, eine bewusst getroffene Auswahl relevanter Paarungen statt aller rechnerisch möglichen 144 Kombinationen), 9 redaktionelle Ratgeberartikel ("Glanzwerk Wissen") + 1 Wissen-Übersicht, sowie neun statische Einzelseiten (u. a. Über uns, Umwelt & Verantwortung, Kontakt, Preisrechner, "3 Monate testen", Bewertungen, Impressum, Datenschutz). Zentrale Datenquellen: `src/data/services.ts`, `src/data/districts.ts`, `src/data/combos.ts`, `src/data/seoHeadings.ts`.

## Capabilities and Constraints

- 12 Leistungen: Gebäudereinigung, Büroreinigung, Praxisreinigung, Unterhaltsreinigung, Treppenhausreinigung, Glas- und Fensterreinigung, Grundreinigung, Kita- und Schulreinigung, Kanzleireinigung, Fitnessstudioreinigung, Autohausreinigung, Gastronomiereinigung.
- Einsatzgebiet: alle zwölf Berliner Bezirke, Berliner Umland nur auf Anfrage.
- Der Preisrechner liefert ausdrücklich eine unverbindliche Richtpreis-Schätzung, kein verbindliches Angebot.
- Verbindliche Content-Regel dieses Projekts: keine erfundenen Zertifikate, Kundenbewertungen, Kundenzahlen oder Garantien; nur das real dokumentierte Nachbesserungsversprechen (`/ueber-uns#garantie`); keine Aussage zu Klimaneutralität oder Umweltzertifizierung.
- Einzige Kontaktdaten: Telefon 030 837 56816, E-Mail info@glanzwerkberlin.de.
- Bestehende Website-Struktur, Texte, Bilder, SEO-Inhalte und Funktionen sind für die aktuelle Design-Kontext-Erfassung nicht im Geltungsbereich und bleiben unverändert.

## Brand Commitments

Name: "Glanzwerk Reinigungsservice Berlin" (Kurzform "Glanzwerk"), Wortmarke über die `GlanzMark`-Komponente. Tonalität: sachlich und zurückhaltend, ohne Marketing-Floskeln oder Übertreibung (bestehende Content-Stilregeln des Projekts). Der Betreiber hat die aktuelle Farbwelt — Dunkelblau, Hellblau, Weiß und Off-White — als beizubehaltende Markenfarben ausdrücklich bestätigt; die konkreten Token-Werte gehören gemäß Impeccable-Schema in DESIGN.md, nicht in diese Datei.

## Evidence on Hand

Vollständige, produktive Website mit realem Content unter `src/data/` (Leistungen, Bezirke, Kombinationen, Ratgeberartikel, Erwartungs-/Vertrauensinhalte). Reale Geschäftsadresse (Joachim-Gottschalk-Weg 12, 12353 Berlin) und echte Kontaktdaten. Keine Kundenreferenzen, Testimonials oder Pressestimmen vorhanden — dürfen für künftige Arbeiten nicht erfunden werden.

## Product Principles

1. Gewerbekunden-Fokus statt Privatkundengeschäft.
2. Verlässlichkeit vor Werbeversprechen: feste Abläufe, persönliche und direkt erreichbare Betreuung.
3. Nur belegbare Aussagen — keine erfundenen Zertifikate, Bewertungen oder Garantien.
4. Flexibilität für den Kundenbetrieb, insbesondere bei Reinigungszeiten.
5. Sachlicher, zurückhaltender Ton statt Marketing-Übertreibung.
