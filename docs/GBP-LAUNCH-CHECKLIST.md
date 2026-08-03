# Google-Business-Profil — Entscheidungen vor Anlage

Aus dem SEO-Audit vom 02.08.2026 (`findings/local.md`, Critical Finding). GBP-Kategorie und NAP-Format lassen sich nach der Profilanlage nur mit Reibung ändern (Google-Review, Ranking-Reset-Risiko) — beide Punkte hier festhalten und **vor** der Anlage final entscheiden, nicht danach nachbessern.

## 1. Primärkategorie

**Empfehlung: „Building & office cleaning service"**

Begründung: Glanzwerk ist eine reine B2B-Gebäudereinigung (Büros, Praxen, Kanzleien, Gewerbeobjekte) ohne Privatkundengeschäft und ohne Ladengeschäft. Eine generische Kategorie wie „Cleaning service" oder eine auf Privatkunden ausgerichtete Kategorie („House cleaning service") würde die Zielgruppe falsch signalisieren. Laut Whitespark-Studien ist die Primärkategorie sowohl der stärkste positive als auch der stärkste negative lokale Rankingfaktor — die Auswahl sollte nicht dem Zufall oder Google-Autovorschlägen überlassen werden.

Mögliche Sekundärkategorien (optional, unkritisch nachträglich änderbar): „Commercial cleaning service", „Office cleaning service" — je nachdem, welche Google zum Zeitpunkt der Anlage tatsächlich als getrennte Kategorien anbietet (das GBP-Kategorienschema ändert sich gelegentlich).

## 2. NAP-Format (Name/Adresse/Telefon) — muss exakt mit `siteConfig` übereinstimmen

Aktueller Stand aus `src/data/site.ts`:

```
Name:     Glanzwerk Reinigungsservice Berlin
Adresse:  Joachim-Gottschalk-Weg 12, 12353 Berlin
Telefon:  030 837 56816  (tel:+493083756816)
```

Google prüft NAP-Übereinstimmung strenger als Schema.org (auch Abkürzungsstil zählt, z. B. „Str." vs. ausgeschrieben). Beim Ausfüllen des GBP-Formulars exakt diese Schreibweise übernehmen — keine Varianten wie „Joachim-Gottschalk-Weg 12" vs. „J.-Gottschalk-Weg 12".

**Wichtig:** Die Adresse ist eine gesetzlich vorgeschriebene Geschäftsadresse (TMG-Impressumspflicht), keine kundenzugängliche Anlaufstelle. Bei der GBP-Einrichtung als **Service Area Business (SAB)** konfigurieren — Adresse wird für die Verifizierung genutzt, aber nicht öffentlich als „Besuchen Sie uns"-Standort angezeigt. Servicegebiet: alle 12 Berliner Bezirke (deckungsgleich mit `src/data/districts.ts`).

## 3. Vor der Anlage prüfen

- [ ] Kategorie final festlegen (Vorschlag oben bestätigen oder abweichen)
- [ ] Adressformat 1:1 mit `siteConfig.address` abgleichen
- [ ] SAB-Modus (Adresse verborgen) statt Standort-Modus wählen
- [ ] Servicegebiet auf alle 12 Bezirke setzen
