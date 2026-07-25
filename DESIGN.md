---
name: Glanzwerk Reinigungsservice Berlin
description: Gewerbliche Gebäudereinigung in Berlin — ruhige Verlässlichkeit statt Werbe-Lautstärke
colors:
  deep-navy: "#071a3a"
  action-blue: "#00799c"
  action-blue-hover: "#0f4d82"
  sky-blue: "#6fc4e2"
  navy-950: "#030d1e"
  ink: "#14181f"
  ink-soft: "#414a58"
  off-white: "#faf9f7"
  white: "#ffffff"
  graphite-100: "#f4f3f1"
  graphite-900: "#1e1e26"
  graphite-950: "#14141a"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 500
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontWeight: 400
rounded:
  sm: "12px"
  md: "16px"
  lg: "24px"
  full: "9999px"
spacing:
  section-y-mobile: "80px"
  section-y-desktop: "96px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Glanzwerk Reinigungsservice Berlin

## Overview

**Creative North Star: "The Clear Horizon"**

Ein tiefes Marineblau trägt die Marke, ein klares Himmelblau setzt Akzente — die Farbwelt eines Berliner Gewerbe-Reinigungsdienstes, der Ordnung und Verlässlichkeit verspricht, ohne laut zu werben. Fraunces-Serifen für Überschriften geben dem sonst nüchternen, Inter-basierten UI-Ton eine ruhige, etwas redaktionelle Wärme; Weiß, Off-White und neutrale Graphittöne tragen die Fläche. Ein wiederkehrender diagonaler Lichtschein ("Shine-Sweep") über Haupt-Buttons ist ein bestehendes, wiedererkennbares Markenzeichen — kein verpflichtendes Muster für neue Arbeiten, sondern ein optionales Werkzeug, das seine Wirkung gerade durch seltenen Einsatz behält.

**The 70/30 Rule.** 70 % hochwertig/premium, 30 % funktional; warm, seriös, einladend und individuell. Bestehende Glanzwerk-Identität weiterentwickeln, nicht durch eine neue Designsprache ersetzen.

Bestätigte visuelle Ablehnung: keine grellen/gesättigten Farben außerhalb der Blau-/Graphit-Familie als Fläche, kein Lila, keine zusätzlichen warmen Akzentfarben (auch kein Amber/Gelb mehr), keine harten Schlagschatten oder skeuomorphen Effekte, kein typischer SaaS- oder Template-Look (dichte, gleichförmige Kartenraster, Cards-in-Cards, generische Icon-Text-Kacheln in Dreier-/Viererreihen).

**Key Characteristics:**
- Marineblau als Anker, Himmelblau als Licht, Weiß/Off-White/Graphit als Fläche.
- Fraunces (Serif) exklusiv für Überschriften, Inter für alles andere.
- Großformatige Bild-Text-Kompositionen und ruhige, luftige Sections vor dichten Kartenrastern.
- Karten sind ein punktuelles Mittel, keine flächendeckende Standardlösung.
- Shine-Sweep als seltenes, bewusst eingesetztes Markenzeichen, nicht als Pflichteffekt.

## Colors

Eine ruhige Blau-Familie trägt fast die gesamte Fläche, ergänzt durch neutrale Graphittöne. Keine weiteren Akzentfarben.

### Primary
- **Tiefes Marineblau** (`#071a3a`): Haupttextfarbe für Überschriften (`text-brand-900`), dunkle Sektions-/Hero-Hintergründe, Header/Footer, sekundäre Button-Umrandung. Trägt die Markenidentität.

### Secondary
- **Action-Blau** (`#00799c`): Interaktive Elemente — Haupt-Buttons, Links, Icons in Trust-Badges. Der einzige Ort, an dem Blau tatsächlich "klickbar" wirkt. Hover vertieft zu `#0f4d82`.

### Tertiary
- **Klares Himmelblau** (`#6fc4e2`): Hervorgehobene Wörter innerhalb von H1-Überschriften, seltene helle Akzente auf dunklen Flächen (z. B. Trust-Bar-Text auf Navy-Hero).

### Neutral
- **Weiß** (`#ffffff`): Primäre Flächenfarbe, Kartenhintergrund, Text auf dunklen Flächen.
- **Off-White** (`#faf9f7`, "graphite-50"): Alternative helle Sektionsfläche für Rhythmuswechsel zwischen weißen Abschnitten.
- **Graphit hell** (`#f4f3f1`, "graphite-100"): Zweite, etwas kräftigere Off-White-Stufe für Flächenkontrast.
- **Graphit dunkel** (`#1e1e26`, "graphite-900") / **Graphit fast Schwarz** (`#14141a`, "graphite-950"): Dunkle neutrale Flächen/Text, wo Marineblau zu farbig wirken würde.
- **Ink** (`#14181f`) / **Ink Soft** (`#414a58`): Fließtext und sekundärer Fließtext auf hellem Grund.

### Named Rules
**The Blue-and-Graphite-Only Rule.** Flächenfarben (Hintergründe, große Blöcke) kommen ausschließlich aus der Marineblau/Action-Blau/Himmelblau/Weiß/Off-White/Graphit-Familie. Kein Amber, kein Lila, keine weiteren warmen Akzentfarben.

## Typography

**Display Font:** Fraunces (mit Georgia, serif als Fallback)
**Body Font:** Inter (mit Arial, Helvetica, sans-serif als Fallback)

**Character:** Eine seriöse Serifen-/Sans-Paarung — Fraunces gibt Überschriften eine leicht redaktionelle, vertrauenswürdige Note, Inter hält Fließtext und UI klar und neutral.

### Hierarchy
- **Display / Hero** (Fraunces, medium/500, `text-4xl`–`text-6xl`, `leading-[1.1]`–`leading-[1.15]`, `tracking-tight`): Seiten-H1, immer mit einem Himmelblau-hervorgehobenen Wort.
- **Headline / Section** (Fraunces, medium/500, `text-2xl`–`text-3xl`): Section-H2, mit Eyebrow-Label darüber.
- **Body** (Inter, regular, `text-base`/`text-lg`, `leading-relaxed`): Fließtext, meist `max-w-2xl`–`max-w-3xl` begrenzt.
- **Label / Eyebrow** (Inter, semibold, `text-xs`, `tracking-[0.16em]`, uppercase): Kicker-Zeile über Section-Überschriften.

### Named Rules
**The Serif-Headline-Only Rule.** Fraunces erscheint ausschließlich in Überschriften (`.font-display`); Fließtext, Buttons, Navigation und UI bleiben durchgehend bei Inter.

## Layout

`container-page`-Utility (max. Inhaltsbreite, `px-4 sm:px-6 lg:px-8`) rahmt jede Section. Vertikaler Rhythmus ist einheitlich: `py-20` (80px) mobil, `sm:py-24` (96px) ab Tablet — für jede Section unabhängig vom Inhaltsgewicht. Sechs Hintergrundvarianten wechseln sich ab (`white`, `muted`, `tint`, `warm`, `brand`, `navy`) und erzeugen Rhythmus zwischen den Abschnitten, ohne die Textbreite zu ändern. Zweispaltige `grid lg:grid-cols-2`-Layouts wechseln Bild-links/Bild-rechts zur Auflockerung.

## Elevation & Depth

Ambiente, weiche Tiefe statt harter Schlagschatten. Flächen ruhen im Normalzustand nahezu schattenfrei und heben sich beim Hover sanft an (`-translate-y-1`, Schatten wird weicher/größer statt härter).

### Shadow Vocabulary
- **Ruhezustand** (`box-shadow: 0 1px 2px rgb(7 26 58 / 0.04)`): dezenter Kartenrand-Schatten, kaum wahrnehmbar.
- **Hover-Anhebung** (`box-shadow: 0 20px 40px -12px rgb(7 26 58 / 0.12)`): weicher, großflächiger Schatten beim Hover von Karten.
- **CTA-Block-Schatten** (`box-shadow: 0 25px 50px -12px` auf Navy-Verlauf): stärkste Schattenstufe, reserviert für den dunklen Abschluss-CTA-Block.

### Named Rules
**The Ambient-Not-Structural Rule.** Schatten kommunizieren Interaktivität (Hover-Zustand), nicht permanente Objekthaftigkeit. Ruhende Elemente bleiben nahezu flach.

## Shapes

Abgerundete Formen sind der bisherige Grundton, keine scharfen Ecken. Das ist aber kein starres Gesetz: die Rundung sollte zum jeweiligen Element und Kontext passen (z. B. `rounded-full` für Buttons, `rounded-xl`/`rounded-2xl`/`rounded-3xl` für kleinere UI-Elemente, Bild-Container oder vereinzelte Karten), statt schematisch überall dieselbe Rundungsstufe zu wiederholen.

## Components

### Buttons
- **Charakter:** Hochwertig und klar statt verspielt. Mindesthöhe `min-h-11` (44px). Rundung passend zum jeweiligen Kontext wählen, nicht schematisch immer `rounded-full`.
- **Primary:** `bg-action-blue` (`#00799c`), weißer Text, Hover vertieft zu `#0f4d82` und hebt sich leicht an (`-translate-y-0.5`) plus weicher blauer Glow-Schatten. Der signature **Shine-Sweep**-Effekt (siehe unten) ist ein optionales Werkzeug für ausgewählte Haupt-CTAs, kein Pflichtbestandteil jedes Buttons.
- **Outline / Secondary:** Transparent, 2px `deep-navy`-Rand, Text `deep-navy`; Hover füllt die Fläche mit `deep-navy` und dreht den Text auf Weiß.

### Cards
- **Einsatz:** Punktuell, nicht als flächendeckendes Standardmittel. Keine dichten, gleichförmigen Kartenraster und keine Cards-in-Cards (eine Karte innerhalb einer anderen Karte). Wo Inhalte auch als großformatige Bild-Text-Komposition oder ruhige Fließtext-Section funktionieren, ist das die bevorzugte Lösung gegenüber einem Kartenraster.
- **Wenn Karten sinnvoll sind:** Weiß, dünner `border-black/[0.06]`-Rand, Rundung passend zur Kartengröße (`rounded-xl` bis `rounded-3xl`).
- **Shadow Strategy:** siehe Elevation — nahezu flach ruhend, weicher Hebe-Schatten beim Hover, Rand färbt sich leicht zu Himmelblau nach.
- **Bildkarten:** Bild zoomt beim Hover dezent (`scale-105`).

### Inputs / Fields
- **Style:** `rounded-xl`, dünner grauer Rand, Fehlerzustand färbt den Rand rot.
- **Focus:** 2px Action-Blau-Fokusring plus dezent eingefärbter Rand.

### Navigation
- **Style:** Weißer Header, dünner Rand unten. Aktive/gehoverte Links färben sich zu Action-Blau ein. Mobiles Menü schiebt sich seitlich ein.

### Shine-Sweep (optionales Signature-Element)
Ein wiederkehrender diagonaler Lichtreflex, der einmal beim Hover (oder automatisch kurz nach dem Laden auf mobilen Geräten) über ausgewählte Haupt-Buttons streicht: ein schräg gestellter, halbtransparenter weißer Verlaufsbalken bewegt sich in 0,65s von links außerhalb nach rechts außerhalb des Buttons. Kein Pflichtbestandteil jedes Buttons, sondern ein bewusst selten eingesetztes Markenzeichen — die Zurückhaltung ist Teil seiner Wirkung.

## Do's and Don'ts

### Do:
- **Do** Fraunces ausschließlich für Überschriften verwenden, nie für Fließtext oder UI-Labels.
- **Do** Schatten nur als Reaktion auf Hover/Fokus einsetzen, nie als permanenten Objekt-Schatten.
- **Do** den Shine-Sweep-Effekt als seltenes, bewusst eingesetztes Markenzeichen behandeln, nicht als Standardeffekt für jeden Button.
- **Do** Buttons hochwertig und klar gestalten, mit einer zum Kontext passenden Rundung statt eines schematisch immer gleichen Pill-Shapes.
- **Do** großformatige Bild-Text-Kompositionen und ruhige, luftige Sections bevorzugen, wo sie genauso gut funktionieren wie eine Karte.
- **Do** das Ziel "70 % hochwertig/premium, 30 % funktional; warm, seriös, einladend, individuell" als Maßstab für neue Design-Entscheidungen anlegen.

### Don't:
- **Don't** neue, gesättigte Farben außerhalb der Marineblau/Action-Blau/Himmelblau/Graphit-Familie als Flächenfarbe einführen. Kein Amber, kein Lila, keine weiteren warmen Akzentfarben.
- **Don't** harte, dunkle Schlagschatten oder skeuomorphe Tiefe verwenden — das System ist durchgehend "ambient soft".
- **Don't** Pill-Buttons, Shine-Sweep oder stark abgerundete Karten als allgemeine Gestaltungspflicht behandeln — es sind bestehende, optionale Mittel, keine Vorschrift.
- **Don't** flächendeckende Kartenraster oder Cards-in-Cards einsetzen.
- **Don't** den typischen SaaS- oder Template-Look erzeugen (generische Dreier-/Viererreihen aus Icon-Kacheln, austauschbare Feature-Grids).
- **Don't** den Shine-Sweep-Effekt kopieren oder auf sekundäre/Outline-Buttons ausweiten.
