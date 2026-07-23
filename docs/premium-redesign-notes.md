# Premium-Designstudie — Notizen

Branch: `premium-redesign` (main unberührt). Testversion, noch nicht gemerged.

## Ausgangsanalyse (Creative-Director-Blick auf die bestehende Website)

**Was bereits gut war und unverändert blieb:** die zweispaltigen Hero-Layouts auf Über-uns/Umwelt (bereits elegante Fraunces-Serifenüberschrift), `ServiceCard`s Hover-Physik (Lift, Schatten, Bild-Zoom, Akzentstreifen), der Shine-Sweep-Marken-Move auf Primär-Buttons, Farbpalette, Logo, FAQ-Akkordeon.

**Konkrete Schwachstellen, die die Studie adressiert:**

1. Startseiten-Hero nutzte als einzige H1 der Website `font-bold` (Sans) statt der sonst durchgängigen `font-display`-Serife (Fraunces) — größter Hebel, kleinstes Risiko.
2. Trust-Leiste unter dem Hero wirkte mit `|`-Pipe-Trennern wie ein Rechtshinweis.
3. Einheitlicher `py-20/24`-Rhythmus auf jeder Section unabhängig vom Inhaltsgewicht.
4. Icon-Vertrauensraster auf der Startseite wirkte durch fehlenden Zusatzabstand gedrängt.
5. Karten-Optik (Radius/Schatten/Hover) war auf 4 Seiten als kopierter String dupliziert und leicht inkonsistent.
6. `MobileNav` hatte keine Öffnen/Schließen-Transition (abruptes `return null`).
7. Header-/MobileNav-CTA-Buttons waren von der geteilten `Button.tsx`-Optik abgedriftet.
8. Unterhaltsreinigung/Glas-Fenster fehlte die Hero-Trust-Bar des generischen Templates.
9. Umwelt-Hero hat bewusst nur einen CTA — als Beobachtung festgehalten, nicht verändert.

## Was geändert wurde

### Neue Komponenten (`src/components/premium/`, nur von den 5 Zielseiten genutzt)
- **`PremiumCard.tsx`** — vereinheitlicht die vorher kopierten Karten-Strings; Hover: Anheben (`-translate-y-1`), verstärkter Schatten, hervorgehobener Border, 300ms. Übernimmt intern `FadeIn` für den Scroll-Reveal (Fix für Punkt 5, teils 3).
- **`PremiumButton.tsx`** — vereinheitlicht die hand-inlinten Hero-/CTA-Buttons auf denselben 4 Seiten; Hover: Anheben, weicher Schatten, Farbübergang, 300ms, Shine-Sweep bleibt erhalten. Behandelt `tel:`/`mailto:`-Links korrekt als reine `<a>`-Tags.

Kein neuer globaler CSS-Keyframe war nötig — beide Komponenten kommen mit den bestehenden `transition`/`transform`/`shadow`-Utilities aus.

### Sitewide-Chrome (mit Zustimmung überarbeitet)
- **`Header.tsx`**: Nav-Link-Hover jetzt mit 300ms-Transition statt Tailwind-Standard; Mega-Dropdown öffnet/schließt jetzt mit Fade+leichtem Scale (`opacity`/`scale`/`translate-y`, 200ms) statt Sofort-Erscheinen; Desktop-CTA nutzt `PremiumButton`.
- **`MobileNav.tsx`**: Panel bleibt dauerhaft im DOM und wird rein über CSS (`translate-x`, `opacity`) ein-/ausgeblendet statt bei jedem Schließen komplett zu unmounten — dadurch echte Slide-Transition (300ms) ohne zusätzlichen Mount-Timing-State. `inert`-Attribut hält das geschlossene Panel außerhalb von Tab-Reihenfolge/Screenreader-Baum. CTA-Buttons nutzen `PremiumButton`.
- **`Footer.tsx`**: alle Link-Hover haben jetzt `transition-colors duration-300` statt sofortigem Farbwechsel.
- **`PromoBar.tsx`**: Hover-Transition auf 300ms vereinheitlicht.

### Die 5 Zielseiten (Punkt-für-Punkt)
- **Startseite** (`src/app/page.tsx`): Hero-H1 → `font-display font-medium` (Punkt 1); Trust-Leiste → Punkt-Trenner statt Pipes, mehr Letter-/Row-Spacing (Punkt 2); zusätzlicher Abstand vor dem Icon-Raster (Punkt 4); fehlendes `FadeIn` bei der zweiten Vertrauens-Sektion ergänzt.
- **Über uns**: alle kopierten Karten → `PremiumCard`, Hero-Buttons → `PremiumButton`, drei reine Textabschnitte (Sektionen 2, 5, 7) erhielten das bislang fehlende `FadeIn`.
- **Unterhaltsreinigung / Glas-Fensterreinigung** (Content-Komponenten): Karten → `PremiumCard`, Buttons → `PremiumButton`, fehlende `FadeIn`-Stellen (Reinigungsplan-Grid, Intervalle-Checkliste, Ablauf-Sektion, einzelne Textblöcke) ergänzt, beiden Hero-Bereichen die fehlende Trust-Bar (3 Punkte, wie im generischen Template) hinzugefügt.
- **Umwelt & Verantwortung**: Produkt-Karten → `PremiumCard`, Hero-Button → `PremiumButton`, alle vier bislang statischen Textsektionen (Ressourcen, Entsorgung, Hygiene, Gesamtbild) erhielten `FadeIn`; der bewusste Ein-Button-Hero (Punkt 9) blieb unverändert.

Keine Text-, H1/H2/H3-, Meta-, Schema-, URL- oder Farb-Änderungen. Alle Animationen nutzen ausschließlich `transform`/`opacity`, respektieren `prefers-reduced-motion` (bestehende globale Regel), kein Layout-Shift.

## Bewusst nicht angefasst
`Section`/`SectionHeading`, `Button.tsx`, `CTASection.tsx`, `FadeIn.tsx`, `ServiceCard`, `ArticleCard`, `ProcessSteps`, `FAQ`, `TrustBadges`, `ExpectationCards`, `Breadcrumb` — alle sitewide (9–32 Dateien) und daher unverändert, damit jede nicht gelistete Seite (außer der freigegebenen Navigation) exakt wie im Hauptbranch aussieht.

## Verifikation
- `npx tsc --noEmit`, `npx vitest run` (697/697), `npm run lint`, `npx next build` (109/109 Seiten) — alle grün auf dem Branch.
- Visuelle Live-Prüfung im Browser (Desktop): Startseiten-Hero, Trust-Leiste, Mega-Dropdown-Transition, Karten-Hover (Unterhaltsreinigung), neue Hero-Trust-Bar — alle wie erwartet.
- Stichprobe einer nicht gelisteten Seite (`/leistungen/bueroreinigung-berlin`): unverändert bis auf die freigegebene Navigation.
- Mobile-Viewport-Screenshot konnte in dieser Sitzung wegen einer Browser-Tooling-Einschränkung (Resize griff nicht auf den Screenshot-Viewport durch) nicht abschließend eingeholt werden. Die Änderung selbst ist rein CSS-basiert (`translate-x`/`opacity`) und über `tsc`/`lint` verifiziert; ein manueller Test auf einem echten Mobilgerät wird vor einer Freigabe empfohlen.

## Status
Alles liegt unverändert (nicht committet) auf dem Branch `premium-redesign`. `main` ist unberührt. Kein Push.
