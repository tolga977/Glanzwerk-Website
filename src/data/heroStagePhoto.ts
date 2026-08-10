/**
 * Die Aufnahme der Hero-Bühne.
 *
 * ── Herkunft ────────────────────────────────────────────────────────────
 * Vom Betreiber am 09.08.2026 geliefert und ausdrücklich für den Hero
 * bestimmt. Lokal ausgeliefert statt über eine Bilddatenbank-URL, wie es
 * docs/IMAGES.md für gelieferte Motive vorsieht.
 *
 * Quelle war eine PNG-Datei mit 1672 × 941 px; hier liegt sie als WebP
 * (Qualität 84, rund 138 KB statt 2,0 MB). Umgewandelt mit dem `sharp`, das
 * Next.js ohnehin mitbringt — bewusst OHNE Hochskalierung: mehr Bildpunkte
 * hätten keine zusätzliche Information, nur zusätzliche Dateigröße.
 *
 * ── Warum das Seitenverhältnis entscheidend ist ─────────────────────────
 * 1,78 : 1 statt der früheren 1,50 : 1. Die Bühne ist rund 1,58 : 1, das Bild
 * ist also BREITER als die Fläche — und erst dadurch funktioniert `cover`
 * mit horizontalem Spielraum. Die vorherige Aufnahme war schmaler als die
 * Bühne; dort musste `contain` verwendet werden, was links einen Rand ließ
 * und jede Verschiebung des Motivs unmöglich machte.
 *
 * Gemessen im neuen Bild: Person bei 62–80 % der Bildbreite, Fernsehturm bei
 * rund 58 %, Glasfassade ab rund 80 % bis zum rechten Rand.
 *
 * ── Warum das Motiv trägt ───────────────────────────────────────────────
 * Es erfüllt alle vier Anforderungen, an denen der vorherige Platzhalter
 * gescheitert war:
 *
 *   Person       Reinigungskraft im rechten Bilddrittel, von hinten, ohne
 *                Logo auf der Kleidung — die Markierung setzt der Betreiber
 *                selbst, wenn er möchte.
 *   Berlin       Fernsehturm mittig, dahinter die Stadtsilhouette. Der
 *                Ortsbezug ist eindeutig, ohne Postkarte zu sein.
 *   Architektur  Glasfassade am rechten Rand, Dachterrasse im Vordergrund.
 *   Licht        Morgensonne von links, dunstig und warm.
 *
 * Entscheidend für die Komposition ist die linke Bildhälfte: sie läuft im
 * Gegenlicht praktisch weiß aus. Genau dort liegt die Textfläche, und der
 * Tageslichtverlauf (`.hero-daylight`) setzt die Aufhellung fort, die das
 * Foto von sich aus mitbringt. Der Übergang von Weiß nach Bild ist deshalb
 * hier kein aufgelegter Effekt mehr, sondern die Fortsetzung des Motivs.
 *
 * ── Auflösung, offen ────────────────────────────────────────────────────
 * 1672 px Breite reichen für eine vollflächige Bühne bis etwa 1672 CSS-px
 * ohne Hochrechnung. Auf breiteren Schirmen und auf Geräten mit doppelter
 * Pixeldichte skaliert `next/image` hoch, was sichtbar weicher wird. Eine
 * Fassung mit rund 3200 px Breite bei gleichem Ausschnitt wäre hier ein
 * reiner Austausch — Layout und Bildausschnitt bleiben unverändert.
 *
 * Der Bildausschnitt selbst wird nicht hier, sondern über
 * `.hero-photo-focal` in globals.css gesteuert.
 *
 * ── Warum der Dateiname gewechselt hat ──────────────────────────────────
 * Die vorherige Fassung hieß `hero-berlin-reinigungskraft.webp`. Beim Tausch
 * unter demselben Namen zeigte der Browser weiterhin das alte Bild: die URL
 * `/_next/image?url=…&w=1920` war unverändert, also griff sein Cache. Auf dem
 * Server war das neue Motiv längst korrekt ausgeliefert — nachgeprüft, es kam
 * mit 1672 × 941 an.
 *
 * Das betrifft nicht nur die Vorschau, sondern jeden Besucher, der die Seite
 * schon einmal geöffnet hatte. Ein neuer Dateiname ist die einzige
 * verlässliche Abhilfe: neue URL, kein alter Cache-Eintrag. Bei jedem
 * weiteren Motivwechsel sollte der Name deshalb mitwechseln.
 */
export const heroStagePhoto: { src: string; alt: string } = {
  src: "/images/startseite/hero-berlin-skyline-reinigungskraft.webp",
  alt: "Reinigungskraft von Glanzwerk auf der Dachterrasse eines Berliner Bürogebäudes, im Hintergrund der Fernsehturm und die Stadtsilhouette im Morgenlicht",
};
