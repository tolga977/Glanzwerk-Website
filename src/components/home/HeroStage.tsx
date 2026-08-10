import Image from "next/image";
import { heroStagePhoto } from "@/data/heroStagePhoto";

/**
 * Die Bildebene der Hero-Bühne — Foto plus Licht- und Farbführung.
 *
 * ── Zwei Rollen, je nach Breite ─────────────────────────────────────────
 * Ab 1024 px ist diese Ebene der Grund der Bühne: sie liegt absolut hinter
 * Text und Formular, und der Tageslichtverlauf trägt die weiße Textfläche
 * links.
 *
 * Darunter ist sie ein Band im Fluss — ein eigener Abschnitt zwischen den
 * Handlungswegen und dem Formular. Auf einem 390 px breiten Schirm kann ein
 * Foto keine Textfläche tragen: entweder wäre der Text unlesbar oder das
 * Bild bis zur Unkenntlichkeit aufgehellt. Deshalb steht das Foto dort für
 * sich, in voller Breite, und der Text auf Weiß.
 *
 * Derselbe DOM in beiden Fällen, kein zweites Markup und kein `hidden`-Paar:
 * das Foto wechselt nur zwischen `relative` im Fluss und `absolute` hinter
 * dem Inhalt.
 *
 * ── Zwei Flächen, nicht eine ────────────────────────────────────────────
 * Das Foto und die Farbebenen liegen in unterschiedlich großen Flächen, und
 * das ist der Kern der Komposition:
 *
 *   äußere Fläche   die ganze Bühne — sie trägt Verlauf, Lichtschleier und
 *                   den weißen Auslauf nach unten
 *   innere Fläche   ab Desktop nur 90 % der Höhe — sie trägt das Foto
 *
 * Der Unterschied macht die Person kleiner und zeigt mehr Umgebung, ohne
 * das Bild zu verzerren oder rechts eine Lücke zu lassen (Begründung an der
 * inneren Fläche).
 *
 * ── LCP ─────────────────────────────────────────────────────────────────
 * Die Aufnahme ist auf jeder Breite das größte Element im ersten Bildschirm
 * und damit das LCP-Element. Sie wird mit `priority` vorgeladen. Kein Layout
 * Shift: unter 1024 px hat das Band ein festes Seitenverhältnis, darüber
 * füllt die Fläche einen bereits durch die Bühnenhöhe bestimmten Raum.
 */
export default function HeroStage() {
  return (
    <div className="relative -mx-4 aspect-[4/3] w-auto overflow-hidden sm:-mx-6 sm:aspect-[16/9] lg:absolute lg:inset-0 lg:mx-0 lg:aspect-auto lg:w-full">
      {/*
        ── Warum die Bildfläche ab Desktop flacher ist als die Bühne ──────
        Die Aufnahme ist so komponiert, dass die Person rund 23 % der
        Bildbreite einnimmt. Solange das Bild die Bühnenbreite füllt, ist sie
        deshalb zwangsläufig etwa 330 px breit — daran ändert kein
        Bildausschnitt etwas, denn breiter als das ganze Bild geht nicht.

        Der einzige Hebel, der sie kleiner macht, ohne zu verzerren und ohne
        rechts eine Lücke zu lassen, ist die Höhe: passt das Bild in eine
        flachere Fläche, wird es insgesamt kleiner skaliert. Bei 90 % der
        Bühnenhöhe misst die Person rund 277 statt 328 px — gut ein Sechstel
        kleiner — und es ist mehr Silhouette, mehr Fernsehturm und mehr
        Fassade zu sehen.

        90 % und nicht weniger: das Bild ist rechts angeschlagen, also wandert
        die Person mit jeder Verkleinerung nach rechts unter das Panel. 90 %
        ist der Punkt, an dem sie deutlich kleiner ist und links vom Panel
        noch ein Streifen von ihr sichtbar bleibt.

        Die fehlenden 10 % Höhe unten sind kein Verlust: dort läuft das Bild
        über `.hero-floor` ohnehin ins Weiße aus, und darunter liegt der
        Vertrauensstreifen. Wie in der Vorlage endet die Fotografie damit
        oberhalb des Streifens statt hinter ihm.

        Der links entstehende Rand liegt vollständig unter der weißen
        Textfläche, die der Verlauf bis 30 % der Breite deckend hält — er ist
        nicht sichtbar.
      */}
      <div className="absolute inset-0 lg:bottom-[var(--hero-photo-bottom)]">
        <Image
          src={heroStagePhoto.src}
          alt={heroStagePhoto.alt}
          fill
          priority
          sizes="100vw"
          /*
            `object-fit` und `object-position` liegen beide in
            `.hero-photo-focal` (globals.css) — ab Desktop eingepasst statt
            beschnitten, damit die vollständige Szene sichtbar bleibt. Deshalb
            steht hier kein `object-cover`: zwei Regeln gleicher Spezifität,
            und die Reihenfolge im Stylesheet entschiede.

            Kein Farbfilter: die neue Aufnahme bringt Sättigung und Kontrast
            selbst mit (Begründung an `.hero-photo` in globals.css).
          */
          className="hero-photo-focal"
        />
      </div>

      {/*
        Ab hier die Farbebenen — auf der ganzen Bühne, nicht auf der
        Bildfläche. Der weiße Auslauf unten muss an der Unterkante der Bühne
        sitzen, nicht an der des Fotos, sonst entsteht mitten in der Fläche
        eine Kante.

        Drei Ebenen, jede mit einer eigenen Aufgabe:

          hero-daylight  die weisse Textflaeche links, diagonal auslaufend
          hero-crest     Licht von oben, damit die transparente Kopfzeile ohne
                         eigene Flaeche lesbar bleibt
          hero-floor     der weisse Auslauf nach unten

        `hero-crest` steht bewusst NACH dem Tageslichtverlauf: links liegt es
        damit auf Weiss und ist dort ohne Wirkung, rechts traegt es die
        Kopfzeile. Es ist nicht die frueher entfernte `.hero-haze` — der
        Unterschied ist die Laenge des Auslaufs, Begruendung in globals.css.
      */}
      <div aria-hidden="true" className="hero-daylight absolute inset-0 hidden lg:block" />
      <div
        aria-hidden="true"
        className="hero-crest absolute inset-x-0 top-0 hidden h-[62%] lg:block"
      />
      <div
        aria-hidden="true"
        className="hero-floor absolute inset-x-0 bottom-0 hidden h-40 lg:block"
      />
    </div>
  );
}
