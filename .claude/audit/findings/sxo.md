# SXO-Analyse — Glanzwerk Reinigungsservice Berlin

**Geprüfte Seiten:** Startseite (`/`) und Kombi-Seite `/leistungen/bueroreinigung-berlin/mitte`
**Methode:** curl-Fetch (kein Rendering), Struktur-/Element-Extraktion, WebSearch-SERP-Stichprobe für "Büroreinigung Berlin Mitte" und "Gebäudereinigung Preis"
**Zielgruppe:** B2B-Entscheider (Büroleiter, Facility Manager, Hausverwaltungen, Praxis-/Kanzleiinhaber) in Berlin

---

## Hauptbefund: Zwei unterschiedliche Mismatch-Situationen

### A) "Büroreinigung Berlin Mitte" — ALIGNED (kein Mismatch)
Die Top-Ergebnisse (rat-gebaeudereinigung.de, conzept-clean.de, esta-clean.de, dustlesservice.de, bm-facility.de, putzprofisberlin.de, grw-berlin.de) sind fast ausschließlich **Leistung+Bezirk-Kombiseiten** — exakt der Seitentyp von `/leistungen/bueroreinigung-berlin/mitte`. Seitentyp-Fit ist gegeben. **Aber:** Mehrere Wettbewerber zeigen den Preis bereits in Titel/Snippet ("ab 1 €/m²", "2,50–4,50 € netto") — bei Glanzwerk liefert die Meta-Description nur "Jetzt Angebot anfragen", keine Zahl. Das ist ein CTR-relevanter UX-Erwartungs-Gap, kein Ranking-Mismatch im engeren Sinn.

### B) "Gebäudereinigung Preis" — CRITICAL Mismatch
Die SERP für diese Anfrage wird komplett von **Preis-Ratgeber-/Kostenrechner-Artikeln** dominiert (11880 Preisvergleich, CleanCalc "Preisliste ab 0,80 €", Blink "Preise: Tabelle & Faktoren", Nick Reinigung "Kosten Preise Berechnung", FIMI "Kostenrechner 2026"). Dominanter Seitentyp: **informativer Preis-Guide mit Tabelle/Rechner**, nicht kommerzielle Unternehmens-Startseite. Die Glanzwerk-Startseite ist eine klassische Service-Homepage — selbst mit dem eingebetteten Preisrechner ("In zwei Minuten zu einer realistischen Hausnummer") fehlt der Content-Typ, den Google hier erwartet: eine strukturierte Preistabelle/-übersicht mit Kostenfaktoren als eigenständige Ressource.
→ **Das ist der wahrscheinlichste Grund, warum eine gut optimierte Seite trotzdem nicht für preisbezogene Suchanfragen rankt: Der Seitentyp passt nicht zur Suchintention, unabhängig von Optimierungsqualität.**

---

## 1. Above-the-Fold-Check (Byte-Offset-Analyse der Ladereihenfolge)

| Element | Startseite | Kombi-Seite Mitte |
|---|---|---|
| Telefon-CTA (Header) | sehr früh (Offset ~10.300, noch vor H1) | sehr früh (Offset ~8.600, noch vor H1) |
| H1 | ~15.600 | ~13.700 |
| Google-Bewertung / Vertrauenssignal | ~17.200 (direkt nach H1, prominent) | **nicht gefunden** |
| Preisrechner ("Hausnummer in 2 Min.") | ~30.400 (erstes Drittel der Seite) | **nicht vorhanden** |
| FAQ-Schema | ~126.000 (spät, ~40 % der Seite) | ~23.500 (früh, ~21 % der Seite) |

**Bewertung:** Die Startseite beantwortet beide Kernbedürfnisse (Preis + Vertrauen) im oberen Seitenbereich gut. Die Kombi-Seite — die laut SERP-Analyse tatsächlich die Landingpage für "Büroreinigung Berlin Mitte" ist — hat **weder den Preisrechner noch ein sichtbares Google-Bewertungs-Signal**. Nutzer, die direkt über die lokale Suche auf dieser Unterseite landen, sehen keinen der beiden vertrauens-/preisbildenden Bausteine, die auf der Startseite vorhanden sind.

---

## 2. Persona-Kurzcheck

**Büroleiter/in (sucht schnell eine Hausnummer zum Preis)**
- Startseite: gut bedient (Rechner im ersten Drittel, Telefon sofort erreichbar).
- Kombi-Seite (Mitte) — die eigentliche Eintrittsseite aus der organischen Suche: **schlecht bedient**. Kein Rechner, nur "Jetzt Angebot anfragen" als Text-CTA ohne Zahl. Wettbewerber liefern hier bereits im SERP-Snippet einen €/m²-Wert. Empfehlung: Preisrechner oder zumindest eine Preisspanne (z. B. "0,80–3,00 €/m² je nach Umfang") auf allen Leistung-Bezirk-Kombiseiten reproduzieren, nicht nur auf der Startseite.

**Facility Manager / Hausverwaltung (sucht Vertrauenssignale, feste Ansprechpartner, Verlässlichkeit)**
- Startseite: gut bedient — H2 "Sie sprechen direkt mit dem Inhaber" plus Google-Bewertung nah am H1.
- Kombi-Seite: Vertrauenssignal in der Extraktion nicht auffindbar (Limitation: könnte tiefer im Schema/Footer stecken, siehe unten). Sollte geprüft und ggf. in den oberen Seitenbereich der Kombiseiten gezogen werden — gerade für Hausverwaltungen mit mehreren Objekten ist "direkter Ansprechpartner" ein zentrales Entscheidungskriterium.

---

## 3. Warum eine gut optimierte Seite trotzdem nicht ranken könnte

1. **Seitentyp-Mismatch bei preisbezogenen Suchanfragen (CRITICAL):** "Gebäudereinigung Preis" und ähnliche Kostenanfragen verlangen einen eigenständigen Preis-Ratgeber/Rechner-Content-Typ. Die Startseite ist strukturell eine Verkaufsseite, kein Ratgeberartikel — On-Page-Optimierung allein behebt das nicht.
2. **Fehlende Preis-/Vertrauens-Snippets auf der tatsächlichen Landingpage:** Für "Büroreinigung Berlin Mitte" ist der Seitentyp korrekt, aber die Meta-Description verzichtet auf Zahlen, während mehrere Top-Wettbewerber genau das im Snippet zeigen — das drückt eher die CTR als das Ranking, kann aber langfristig auch Rankings über Nutzersignale (CTR, Pogo-Sticking) beeinflussen.

---

## Limitations (nicht geprüft)

- Kein Playwright-Rendering verwendet (curl-only) — rein clientseitig nachgeladene Inhalte (z. B. Reviews via JS-Widget) wurden ggf. nicht erfasst.
- `aggregateRating`/Review-Schema wurde nicht vollständig ausgewertet — die fehlende "Google-Bewertung"-Textfundstelle auf der Kombi-Seite bedeutet nicht zwingend, dass keinerlei Bewertungs-Markup vorhanden ist.
- SERP-Stichprobe basiert auf WebSearch-Linkliste (kein vollständiges SERP-Feature-Set wie Featured Snippets, PAA, AI Overview erfasst).
- Nur 2 von potenziell vielen Leistung-Bezirk-Kombiseiten geprüft (Budget-Vorgabe: max. 8 Tool-Aufrufe) — Befunde zur Kombi-Seite ggf. nicht 1:1 auf alle 12+ Bezirke übertragbar, sollten aber stichprobenartig verifiziert werden.
- Keine Wireframe- oder vollständige 100-Punkte-Gap-Score-Bewertung erstellt (kompakter Modus laut Auftrag).
