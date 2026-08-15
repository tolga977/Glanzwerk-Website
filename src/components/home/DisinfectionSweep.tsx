"use client";

import { useEffect, useRef } from "react";

/**
 * Der Hygiene-Moment der Startseite — „Disinfection Sweep".
 *
 * ── Herkunft ────────────────────────────────────────────────────────────
 * Übertragung des freigegebenen Prototyps aus
 * `docs/disinfection-sweep-prototype/disinfection-sweep.html`. Jene Datei
 * bleibt die eingefrorene Referenz und wird nicht verändert.
 *
 * Kein iframe: die Ebenen liegen als CSS-Rollen in globals.css (`.sweep-*`),
 * die Rechnung steht hier. Die Konstanten der Bewegung — Startwert des
 * Zufallsgenerators, Fragmentgruppen, Fenster, Easing, die Abbildung von
 * Fortschritt auf Kantenposition — sind zahlengleich mit dem Master.
 *
 * ── Der Antrieb: Zeit, nicht Scroll ─────────────────────────────────────
 * Der Fortschritt kam zuerst aus der Scrollposition. Das hatte zwei Fehler,
 * die zusammenhingen: die Bazille war nie länger als einen Sekundenbruchteil
 * vollständig zu sehen, weil der Zerfall schon mit dem ersten Scrollpixel
 * begann — und beim Zurückscrollen lief die Auflösung rückwärts, was den
 * Vorgang als Effekt entlarvte statt ihn zu erzählen.
 *
 * Jetzt ist es ein abgeschlossener Motion-Spot: er startet einmal, wenn die
 * Fläche wirklich im Blick ist, und läuft danach über 9 Sekunden zeitlich ab.
 * Scrollen erreicht ihn nur noch, es steuert ihn nicht mehr. Der einzige
 * Steuerparameter bleibt derselbe wie im Master: `render(p)` mit p von 0 bis
 * 1, zustandslos — derselbe p ergibt immer dasselbe Bild.
 *
 * ── Was hier bewusst NICHT passiert ─────────────────────────────────────
 * Kein React-State pro Bild. Der Fortschritt wandert direkt in CSS-Variablen
 * und auf die Leinwand; React rendert dieses Bauteil genau einmal.
 *
 * Kein Scroll-Hijacking, keine Sperre, kein Sticky-Zwang.
 */

/* ══ Konstanten des Masters ══════════════════════════════════════════════ */

/** Fester Startwert: dieselbe Fragmentverteilung bei jedem Aufruf. */
const SEED = 20260810;

/**
 * Radien der Streuscheibe, auf der die Fragmente sitzen — Anteil der
 * Bildbreite bzw. -höhe. Sie umschließt den Körper der Bazille, nicht das
 * ganze Bild: Fragmente sollen gesättigtes Material tragen, keinen Lichthof.
 */
const DISC = { x: 0.3, y: 0.455 };

/**
 * Die drei Fragmentgruppen. Die Staffelung über `delay` und `hold` ist der
 * Kern des Zerfalls: die Kruste bricht zuerst und großflächig ab, wird
 * getragen, und zerreibt weiter stromabwärts zu immer kleinerem Material.
 *
 *   n        Anzahl (auf schmalen Schirmen reduziert, siehe `streue`)
 *   size     Kantenlänge als Anteil der Bildbreite
 *   win      Länge des Wegs, über den ein Fragment lebt
 *   dx / dy  Strecke in Bildbreiten bzw. -höhen
 *   rot      Eigendrehung in Grad
 *   img      true = Ausschnitt der Aufnahme, false = einfarbiges Partikel
 *   delay    Verzögerung gegenüber der Kontaktkante
 *   hold     Anteil des Wegs bei voller Deckkraft, bevor das Ausblenden beginnt
 *   fadePow  Kurvenform des Ausblendens
 *   shr      Schrumpfung über den Weg
 *   cling    true = haftet erst an der Oberfläche (ease-in-out statt ease-out)
 *   ton      Helligkeit/Sättigung, beim Sprite-Bau eingerechnet
 */
const GROUPS = [
  {
    key: "large" as const,
    n: 96,
    size: [0.013, 0.028],
    win: 0.4,
    dx: [0.1, 0.26],
    dy: 0.05,
    rot: 38,
    img: true,
    delay: 0,
    hold: 0.46,
    fadePow: 2.4,
    shr: 0.32,
    cling: true,
    ton: "brightness(1.14) saturate(0.94)",
  },
  {
    key: "medium" as const,
    n: 150,
    size: [0.006, 0.014],
    win: 0.52,
    dx: [0.28, 0.6],
    dy: 0.09,
    rot: 64,
    img: true,
    delay: 0.07,
    hold: 0.34,
    fadePow: 2.0,
    shr: 0.48,
    cling: false,
    ton: "brightness(1.2) saturate(0.9)",
  },
  {
    key: "fine" as const,
    n: 210,
    size: [0.0022, 0.0055],
    win: 0.7,
    dx: [0.55, 1.25],
    dy: 0.13,
    rot: 0,
    img: false,
    delay: 0.16,
    hold: 0.18,
    fadePow: 1.7,
    shr: 0.6,
    cling: false,
    ton: "",
  },
];

/**
 * Die Zeitachse des Motion-Spots. Stützstellen in Sekunden und der zugehörige
 * Fortschritt des Masters:
 *
 *   0,0 – 2,5   die vollständige Bazille, nur mit Ruhebewegung. p bleibt 0,
 *               dort greift weder Maske noch Kontaktlicht und es existiert
 *               kein einziges Fragment — das Motiv ist unangetastet zu sehen.
 *   2,5 – 3,7   der Wasserlauf fährt heran. p bis 0,12: das ist genau der
 *               Wert, bei dem die Kante den Körper erreicht, aber noch nichts
 *               abbricht.
 *   3,7 – 6,8   Kontakt und Zerfall. Mit 3,1 s bekommt die längste Phase auch
 *               den größten Teil des Fortschritts (0,12 → 0,72).
 *   6,8 – 8,3   Abtransport der gelösten Fragmente.
 *   8,3 – 9,0   Auslauf in die saubere Fläche.
 */
const ZEITACHSE = [
  { t: 0, p: 0 },
  { t: 2.5, p: 0 },
  { t: 3.7, p: 0.12 },
  { t: 6.8, p: 0.72 },
  { t: 8.3, p: 0.9 },
  { t: 9.0, p: 1 },
];
const DAUER = ZEITACHSE[ZEITACHSE.length - 1].t;

/** Anteil der Bühne, der sichtbar sein muss, bevor die Zeitachse anläuft. */
const STARTSCHWELLE = 0.55;

/**
 * Steuerschnittstelle des Prototyps, hier am Bühnenelement (`__sweep`).
 * `setProgress` ist zustandslos wie im Master: derselbe Wert ergibt immer
 * dasselbe Bild.
 */
type SweepHandle = {
  setProgress: (p: number) => void;
  getProgress: () => number;
  load: () => void;
  start: () => void;
};

type Item = {
  img: boolean;
  s: number;
  fx: number;
  fy: number;
  win: number;
  dx: number;
  dy: number;
  rot: number;
  lag: number;
  ar: number;
  rx: number;
  ry: number;
  tilt: number;
  col: string;
  sprite?: HTMLCanvasElement;
};

export default function DisinfectionSweep() {
  const stageRef = useRef<HTMLDivElement>(null);
  const organismRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const atmRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const fragRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    /*
     * Die Referenzen werden zuerst geprüft und dann mit nicht-nullbarem Typ
     * gebunden. Ohne diesen zweiten Schritt verliert die Typprüfung die
     * Nullprüfung in den unten stehenden Funktionsdeklarationen wieder: sie
     * sind gehisted und könnten aus Sicht des Prüfers vor der Prüfung
     * aufgerufen werden.
     */
    if (
      !stageRef.current ||
      !organismRef.current ||
      !glowRef.current ||
      !imgRef.current ||
      !atmRef.current ||
      !fragRef.current
    ) {
      return;
    }
    const stage: HTMLDivElement = stageRef.current;
    const organism: HTMLDivElement = organismRef.current;
    const glow: HTMLDivElement = glowRef.current;
    const img: HTMLImageElement = imgRef.current;
    const atm: HTMLDivElement = atmRef.current;
    const leinwand: HTMLCanvasElement = fragRef.current;
    const ctx2d = leinwand.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    /* ── Hilfsrechnung, zahlengleich mit dem Master ───────────────────── */
    let seed = SEED;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    /*
     * Streupunkt auf der Scheibe. `Math.sqrt` verteilt gleichmäßig über die
     * Fläche statt zum Rand hin zu häufen; der Faktor 0,74 hält die Punkte im
     * gesättigten Bereich des Körpers.
     */
    const discPoint = () => {
      const a = rnd() * 2 * Math.PI;
      const r = Math.sqrt(rnd()) * 0.74;
      return { fx: 0.5 + Math.cos(a) * r * DISC.x, fy: 0.5 + Math.sin(a) * r * DISC.y };
    };

    const gruppen = GROUPS.map((g) => ({ ...g, items: [] as Item[] }));

    /*
     * Streuung der Fragmente und des Schwebstaubs — erst beim Laden der
     * Aufnahme, nicht beim Einhängen. Vor dem Laden gibt es nichts zu
     * zeichnen, und die Dichte hängt an der Fensterbreite, die zum
     * Ladezeitpunkt feststeht.
     *
     * Fragmentdichte nach Breite: der Master ist eine Desktop-Bühne. 456
     * Fragmente auf einem Telefon kosten Bildrate, ohne dass die zusätzliche
     * Dichte dort aufzulösen wäre. Weil der Zufallsgenerator einen festen
     * Startwert hat, ist die kleinere Menge die vordere Teilmenge derselben
     * Verteilung — kein anderes Bild, nur ein dünneres.
     */
    let gestreut = false;
    function streue() {
      if (gestreut) return;
      gestreut = true;

      const breite = window.innerWidth;
      const dichte = breite < 640 ? 0.45 : breite < 1024 ? 0.7 : 1;

      for (const g of gruppen) {
        const anzahl = Math.max(8, Math.round(g.n * dichte));
        for (let i = 0; i < anzahl; i++) {
          const p = discPoint();
          const s = g.size[0] + rnd() * (g.size[1] - g.size[0]);
          g.items.push({
            img: g.img,
            s,
            fx: p.fx,
            fy: p.fy,
            win: g.win * (0.7 + rnd() * 0.6),
            dx: g.dx[0] + rnd() * (g.dx[1] - g.dx[0]),
            dy: (rnd() - 0.5) * 2 * g.dy,
            rot: ((rnd() - 0.5) * 2 * g.rot * Math.PI) / 180,
            lag: rnd() * 0.05,
            // organische Form, keine perfekten Perlen
            ar: 0.72 + rnd() * 0.5,
            rx: 0.4 + rnd() * 0.12,
            ry: 0.36 + rnd() * 0.14,
            tilt: rnd() * Math.PI,
            col: rnd() > 0.5 ? "#9dc2de" : "#cfe6f6",
          });
        }
      }

      /* Schwebstaub — reine CSS-Bewegung, hier nur die Streuung. */
      const staubAnzahl = Math.round(20 * (breite < 640 ? 0.5 : 1));
      for (let i = 0; i < staubAnzahl; i++) {
        const n = document.createElement("i");
        const r = 1.6 + rnd() * 3.2;
        n.style.width = n.style.height = `${r}px`;
        n.style.left = `${rnd() * 100}%`;
        n.style.top = `${rnd() * 100}%`;
        n.style.opacity = (0.12 + rnd() * 0.2).toFixed(2);
        n.style.animationDuration = `${(14 + rnd() * 16).toFixed(1)}s`;
        n.style.animationDelay = `${(-rnd() * 20).toFixed(1)}s`;
        atm.appendChild(n);
      }
    }

    /*
     * Ein Sprite pro Fragment, einmal gerendert: jedes Bruchstück ist ein
     * elliptisch beschnittener Ausschnitt der Aufnahme an genau der Stelle, an
     * der es sitzt. Das ist der Grund, warum der Zerfall wie Material aussieht
     * und nicht wie aufgestreute Punkte — die Farbe stammt aus dem Original.
     * Im laufenden Bild bleibt dann nur noch `drawImage`.
     *
     * Die Helligkeit der Gruppe wird hier eingerechnet statt als CSS-Filter
     * auf einer eigenen Leinwand zu liegen. Dadurch genügt eine einzige
     * Leinwand für alle drei Größen.
     */
    function buildSprites(src: CanvasImageSource) {
      const IW = img.naturalWidth;
      const IH = img.naturalHeight;
      if (!IW || !IH) return;
      for (const g of gruppen) {
        for (const it of g.items) {
          if (!it.img) continue;
          const w = Math.max(2, Math.round(it.s * IW));
          const h = Math.max(2, Math.round(it.s * IW * it.ar));
          const sx = it.fx * IW - w / 2;
          const sy = it.fy * IH - h / 2;
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          const x = c.getContext("2d");
          if (!x) continue;
          x.save();
          if (g.ton && "filter" in x) x.filter = g.ton;
          x.beginPath();
          x.ellipse(w / 2, h / 2, w * it.rx * 2, h * it.ry * 2, it.tilt, 0, 6.284);
          x.clip();
          x.drawImage(src, sx, sy, w, h, 0, 0, w, h);
          x.restore();
          it.sprite = c;
        }
      }
    }

    /* ── Maße ────────────────────────────────────────────────────────────
     * W/H sind die Maße der AUFNAHME und bleiben die Einheit aller
     * Fragmentwege — genau wie im Master. Die Leinwand ist dagegen so groß
     * wie die Bühne, damit der Abtransport nicht an der Bildkante
     * abgeschnitten wird; `orgLeft`/`orgTop` verschieben die Rechnung.
     */
    let W = 0;
    let H = 0;
    let SW = 0;
    let SH = 0;
    let orgLeft = 0;
    let orgTop = 0;
    let sweepHalf = 120;
    let dprS = 1;
    /* Der Ausschnitt, in dem überhaupt Fragmente liegen können. Nur er wird
       pro Bild gelöscht — die Bühne ist ein Vielfaches davon. */
    let zone = { x: 0, y: 0, w: 0, h: 0 };

    function layout() {
      const r = organism.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      if (s.width < 1 || s.height < 1 || r.width < 1) return false;
      W = r.width;
      H = r.height;
      SW = s.width;
      SH = s.height;
      orgLeft = r.left - s.left;
      orgTop = r.top - s.top;
      const sv = flowRef.current?.querySelector("svg");
      if (sv) sweepHalf = sv.getBoundingClientRect().width * 0.43;
      dprS = Math.min(window.devicePixelRatio || 1, 2);

      const zx = Math.max(0, orgLeft - W * 0.05);
      const zy = Math.max(0, orgTop - H * 0.25);
      zone = {
        x: zx,
        y: zy,
        w: Math.min(SW - zx, W * 2.5),
        h: Math.min(SH - zy, H * 1.6),
      };

      /*
       * Die Maße werden nur gesetzt, wenn sie sich wirklich ändern. Eine
       * Zuweisung an `width` verwirft den Inhalt und legt den Speicher neu
       * an — bei jedem Aufruf wäre das nicht nur verschenkte Arbeit, sondern
       * auch eine Quelle für minimal abweichende Rasterung desselben Bildes.
       */
      const bw = Math.round(SW * dprS);
      const bh = Math.round(SH * dprS);
      if (leinwand.width !== bw || leinwand.height !== bh) {
        leinwand.width = bw;
        leinwand.height = bh;
      }
      ctx.setTransform(dprS, 0, 0, dprS, 0, 0);
      return true;
    }

    /* ── Der Antrieb ─────────────────────────────────────────────────────── */
    let progress = -1;

    function render(pRaw: number) {
      const p = clamp(pRaw, 0, 1);
      progress = p;
      stage.style.setProperty("--p", String(p));

      /* Fehlen die Maße noch, wird jetzt nachgemessen. Die CSS-Ebenen hängen
         allein an den Variablen; nur die Leinwand braucht sie. */
      if (SW < 1) layout();

      /*
       * Die Kantenposition ist absichtlich nicht linear. Der Körper der
       * Bazille liegt etwa zwischen 20 % und 80 % ihrer Bildbreite; genau
       * dieses Band bekommt mit 69 % der Achse den Großteil des Ablaufs,
       * davor und danach läuft die Kante schnell. Dadurch gehört die Zeit dem
       * Zerfall — sonst wäre die Bazille weggewischt, bevor man das Aufbrechen
       * gesehen hat.
       */
      const ep =
        p < 0.15
          ? -8 + (p / 0.15) * 26
          : p < 0.84
            ? 18 + ((p - 0.15) / 0.69) * 66
            : 84 + ((p - 0.84) / 0.16) * 56;
      stage.style.setProperty("--ep", `${ep}%`);
      stage.style.setProperty("--sweepx", `${(orgLeft + (ep / 100) * W - sweepHalf).toFixed(1)}px`);
      stage.style.setProperty("--idle", (1 - easeOut(clamp(p / 0.22, 0, 1)) * 0.85).toFixed(3));

      /*
       * Der Verdrängungsfilter läuft nur, solange wirklich Material bricht.
       * Außerhalb dieser Spanne steht die Aufnahme unverfälscht und scharf.
       */
      const zerfaellt = p > 0.1 && p < 0.92;
      const phase = zerfaellt ? "zerfall" : "ruhe";
      if (stage.dataset.sweepPhase !== phase) stage.dataset.sweepPhase = phase;

      /*
       * Das Kontaktlicht brennt nur, solange die Kante wirklich auf dem Körper
       * steht: es fährt in 6 Prozentpunkten hoch und in 8 wieder herunter. Ein
       * durchgehend leuchtender Streifen wäre ein Strahl, kein Kontakt.
       */
      const onBody = clamp((p - 0.13) / 0.06, 0, 1) * clamp((0.88 - p) / 0.08, 0, 1);
      glow.style.opacity = (onBody * 0.95).toFixed(3);

      /* Nur der Fragmentausschnitt wird geleert, nicht die ganze Bühne. */
      ctx.setTransform(dprS, 0, 0, dprS, 0, 0);
      ctx.clearRect(zone.x, zone.y, zone.w, zone.h);

      const edge = (ep + 7) / 100;
      for (const g of gruppen) {
        for (const it of g.items) {
          const t = clamp((edge - it.fx - it.lag - g.delay) / it.win, 0, 1);
          if (t <= 0 || t >= 1) continue;
          /* Große Kruste haftet erst und wird dann mitgenommen; feines
             Material wird sofort erfasst. */
          const e = g.cling ? easeInOut(t) : easeOut(t);
          const o =
            t < 0.09
              ? t / 0.09
              : t < g.hold
                ? 1
                : 1 - Math.pow((t - g.hold) / (1 - g.hold), g.fadePow);
          if (o <= 0.004) continue;
          const cx = orgLeft + it.fx * W + (0.02 + e * it.dx) * W;
          const cy = orgTop + it.fy * H + e * it.dy * H + Math.sin(t * 3.1) * 3;
          /* Verschmieren in Flussrichtung statt Flug als Perle. */
          const sc = 1 - e * g.shr;
          const sx = sc * (1 + e * 0.75);
          const sy = sc * (1 - e * 0.22);
          ctx.globalAlpha = o;
          if (it.img && it.sprite) {
            const w = it.s * W;
            const h = w * it.ar;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(cx * dprS, cy * dprS);
            ctx.scale(dprS * sx, dprS * sy);
            if (it.rot) ctx.rotate(e * it.rot);
            ctx.drawImage(it.sprite, -w / 2, -h / 2, w, h);
          } else {
            const r = it.s * W * 0.5;
            ctx.setTransform(dprS, 0, 0, dprS, 0, 0);
            ctx.fillStyle = it.col;
            ctx.beginPath();
            ctx.ellipse(cx, cy, r * sx, r * sy, 0, 0, 6.284);
            ctx.fill();
          }
        }
      }
      ctx.setTransform(dprS, 0, 0, dprS, 0, 0);
      ctx.globalAlpha = 1;
    }

    /* ── Die Zeitachse ────────────────────────────────────────────────────
     * Stückweise linear zwischen den Stützstellen. Nur das Anfahren des
     * Wasserlaufs (Abschnitt 2) läuft mit einer weichen Kurve: dort geht es
     * aus dem Stillstand los, und ein harter Einsatz wäre der einzige
     * sichtbare Ruck der ganzen Sequenz. Die übrigen Übergänge sind schon
     * durch die nichtlineare Kantenkurve gedämpft.
     */
    function progressBei(sek: number) {
      if (sek <= ZEITACHSE[1].t) return 0;
      if (sek >= DAUER) return 1;
      for (let i = 1; i < ZEITACHSE.length; i++) {
        const a = ZEITACHSE[i - 1];
        const b = ZEITACHSE[i];
        if (sek <= b.t) {
          const k = (sek - a.t) / (b.t - a.t);
          return a.p + (b.p - a.p) * (i === 2 ? easeInOut(k) : k);
        }
      }
      return 1;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let t0 = 0;
    let gestartet = false;

    function tick(ts: number) {
      if (!t0) t0 = ts;
      const sek = (ts - t0) / 1000;
      render(progressBei(sek));
      if (sek < DAUER) {
        raf = requestAnimationFrame(tick);
      } else {
        /* Endzustand steht; die Schleife wird beendet und nicht wieder
           aufgenommen — es gibt keinen zweiten Durchlauf. */
        raf = 0;
        render(1);
      }
    }

    function starteZeitachse() {
      if (gestartet || reduce.matches) return;
      gestartet = true;
      /*
       * Die vollständige Bazille steht sichtbar, bevor die Uhr läuft: erst
       * ein Bild mit p = 0, im nächsten Bild beginnt die Zeitmessung. Ohne
       * diesen Umweg fiele der erste Zeitstempel mit dem ersten Erscheinen
       * zusammen und die Ruhephase wäre um die Ladezeit kürzer.
       */
      render(0);
      requestAnimationFrame((ts) => {
        t0 = ts;
        raf = requestAnimationFrame(tick);
      });
    }

    /* ── Maße neu vermessen ──────────────────────────────────────────────
     * Kein Scroll-Listener mehr — nur Größenänderungen sind relevant. Läuft
     * die Sequenz gerade, zeichnet der nächste Takt ohnehin neu; steht sie,
     * wird einmal nachgezeichnet.
     */
    function onResize() {
      layout();
      if (!raf) render(progress < 0 ? 0 : progress);
    }
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      layout();
      if (!raf) render(progress < 0 ? 0 : progress);
    });
    ro.observe(organism);

    /* ── Die Aufnahme ────────────────────────────────────────────────────
     * Sie liegt bereits freigestellt vor (`bacteria-keyed.png`, einmalig aus
     * dem unveränderten Master erzeugt). Der Prototyp musste die weiße Matte
     * bei jedem Seitenaufruf im Browser herausrechnen — ein Durchlauf über
     * 1,5 Millionen Bildpunkte mit `getImageData`, genau in dem Moment, in
     * dem die Fläche ins Blickfeld kommt. Das ist jetzt Bauzeit statt
     * Laufzeit; an den Bildpunkten selbst ändert das nichts, es ist dieselbe
     * Rechnung mit demselben Ergebnis.
     */
    let ladenGestartet = false;
    let bereit = false;
    let startWunsch = false;

    function pruefeStart() {
      if (bereit && startWunsch && !document.hidden) starteZeitachse();
    }

    function assetBereit() {
      if (bereit) return;
      bereit = true;
      streue();
      buildSprites(img);
      glow.style.setProperty("-webkit-mask-image", `url(${img.src})`);
      glow.style.setProperty("mask-image", `url(${img.src})`);
      layout();
      render(0);
      pruefeStart();
    }

    function starteLaden() {
      if (ladenGestartet) return;
      ladenGestartet = true;
      /* Erst jetzt anfordern: die Aufnahme darf den ersten Seitenaufbau nicht
         belasten. */
      img.src = "/images/hygiene/bacteria-keyed.png";
      const fertigLaden = () => {
        /*
         * `decode()` sorgt dafür, dass die Aufnahme wirklich dekodiert ist,
         * bevor das erste Bild gezeichnet wird — aber es ist eine
         * Beschleunigung, keine Bedingung. In einem Hintergrund-Tab schiebt
         * der Browser das Dekodieren auf, und das Versprechen kann dann
         * beliebig lange offen bleiben. Hinge der Start daran, würde die
         * Sequenz nach der Rückkehr in den Tab nie anlaufen. Die Zeitgrenze
         * löst das: danach wird ohnehin fortgefahren.
         */
        let erledigt = false;
        const weiter = () => {
          if (erledigt) return;
          erledigt = true;
          assetBereit();
        };
        window.setTimeout(weiter, 400);
        if (typeof img.decode === "function") img.decode().then(weiter, weiter);
        else weiter();
      };
      if (img.complete && img.naturalWidth > 0) fertigLaden();
      else img.onload = fertigLaden;
    }

    /*
     * ── Zwei Beobachter, nicht einer ─────────────────────────────────────
     * Sie messen zwei verschiedene Dinge und dürfen deshalb nicht dieselben
     * Parameter haben.
     *
     * Der erste soll früh auslösen, damit die Aufnahme schon geladen ist,
     * wenn die Fläche ins Bild kommt — er arbeitet mit 400 px Vorlauf.
     *
     * Der zweite entscheidet über den Start und darf genau diesen Vorlauf
     * NICHT haben. `rootMargin` vergrößert den Bezugsrahmen, gegen den der
     * Anteil gerechnet wird: bei einer 684 px hohen Bühne und 400 px Vorlauf
     * erreicht der Anteil 1,0, während die Bühne noch weit unter der
     * Faltkante steht. Mit einem gemeinsamen Beobachter hätte die Sequenz
     * also genau dann begonnen, wenn niemand hinsieht — das Gegenteil der
     * Absicht.
     */
    const ioLaden = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          const drin = e.isIntersecting;
          stage.dataset.sweepView = drin ? "in" : "out";
          if (drin) starteLaden();
        }
      },
      { rootMargin: "400px 0px 400px 0px" },
    );
    ioLaden.observe(stage);

    const ioStart = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.intersectionRatio >= STARTSCHWELLE) {
            startWunsch = true;
            pruefeStart();
          }
        }
        if (gestartet) ioStart.disconnect();
      },
      { threshold: [STARTSCHWELLE] },
    );
    ioStart.observe(stage);

    /*
     * Liegt der Tab im Hintergrund, wird nicht gestartet: `requestAnimationFrame`
     * ruht dort, und der Ablauf soll nicht als Standbild in der Mitte hängen,
     * wenn der Besucher zurückkommt. Sobald der Tab wieder sichtbar ist, wird
     * die Startbedingung erneut geprüft.
     */
    function onVisibility() {
      if (!document.hidden) pruefeStart();
    }
    document.addEventListener("visibilitychange", onVisibility);

    /*
     * Steuerschnittstelle — aus dem Master übernommen, dort `DisinfectionSweep`
     * auf `window`. Hier am Element statt global, damit zwei Instanzen sich
     * nicht überschreiben. Sie dient der Prüfung und einer späteren Steuerung
     * aus anderer Quelle.
     */
    const handle: SweepHandle = {
      setProgress: (p) => {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        layout();
        render(p);
      },
      getProgress: () => progress,
      load: starteLaden,
      start: () => {
        startWunsch = true;
        pruefeStart();
      },
    };
    (stage as HTMLDivElement & { __sweep?: SweepHandle }).__sweep = handle;

    layout();
    render(0);

    /*
     * Sicht-Erstprüfung ohne Beobachter. Der IntersectionObserver liefert
     * seinen ersten Rückruf erst mit dem nächsten Bild; kommt keines — etwa
     * weil der Tab im Hintergrund liegt —, würde die Aufnahme nie angefordert.
     * Deckt außerdem den Fall ab, dass die Seite mitten in diesem Abschnitt
     * geladen wird.
     */
    {
      const s = stage.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (s.top < vh + 400 && s.bottom > -400) {
        stage.dataset.sweepView = "in";
        starteLaden();
      }
    }

    return () => {
      ioLaden.disconnect();
      ioStart.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      img.onload = null;
      atm.replaceChildren();
      delete (stage as HTMLDivElement & { __sweep?: SweepHandle }).__sweep;
    };
  }, []);

  return (
    <div className="sweep-scene">
      {/*
        Der Verdrängungsfilter, der der Bruchkante ihre krümelige Struktur
        gibt. SVG-Filter werden global über ihre id angesprochen; die Kennung
        ist deshalb eindeutig benannt. Das Element trägt keine Fläche.
      */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <filter id="glanzwerk-crumble" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.016 0.032"
              numOctaves="1"
              seed="7"
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale="13"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/*
        Die Bühne ist vollständig dekorativ: sie trägt keine Aussage in Text
        und keine bedienbaren Elemente. Deshalb steht sie als Ganzes hinter
        `aria-hidden` — die Bedeutung tragen die vier Begriffe darunter und
        die Abschnitte davor und danach.
      */}
      <div ref={stageRef} className="sweep-stage" aria-hidden="true" data-sweep-view="out">
        <div ref={atmRef} className="sweep-atm" />

        <div ref={flowRef} className="sweep-flow">
          {/*
            Der Wasserlauf. Bewusst kein Strahl und keine Maskenkante: mehrere
            versetzte Strähnen unterschiedlicher Breite und Deckkraft, dazu ein
            weicher Schleier und ein nachlaufender Fächer. Erst diese Schichtung
            liest sich als Wasser, das durch die Szene zieht, statt als Licht.
          */}
          <svg viewBox="0 0 120 800" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="glanzwerk-sweep-core" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset=".42" stopColor="#fff" stopOpacity="1" />
                <stop offset=".74" stopColor="#e6f6ff" stopOpacity=".6" />
                <stop offset="1" stopColor="#cfebfa" stopOpacity="0" />
              </linearGradient>
              <filter id="glanzwerk-sweep-soft" x="-60%" y="-20%" width="220%" height="140%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <filter id="glanzwerk-sweep-sharp" x="-60%" y="-20%" width="220%" height="140%">
                <feGaussianBlur stdDeviation="1.6" />
              </filter>
              <linearGradient id="glanzwerk-sweep-trail" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#cbe8f8" stopOpacity="0" />
                <stop offset=".55" stopColor="#cbe8f8" stopOpacity=".26" />
                <stop offset=".88" stopColor="#e9f7ff" stopOpacity=".6" />
                <stop offset="1" stopColor="#ffffff" stopOpacity=".75" />
              </linearGradient>
            </defs>
            <rect x="-155" y="-20" width="207" height="840" fill="url(#glanzwerk-sweep-trail)" />
            <g
              stroke="#bcdff4"
              fill="none"
              strokeLinecap="round"
              filter="url(#glanzwerk-sweep-sharp)"
            >
              <path d="M-140 168 C-80 158 -20 176 46 164" strokeWidth="2.6" opacity=".2" />
              <path d="M-126 318 C-66 330 -8 310 48 322" strokeWidth="2.2" opacity=".22" />
              <path d="M-148 452 C-84 442 -24 460 44 448" strokeWidth="2.4" opacity=".18" />
              <path d="M-118 596 C-58 608 -2 588 50 600" strokeWidth="2" opacity=".2" />
              <path d="M-134 244 C-70 252 -14 236 46 246" strokeWidth="1.6" opacity=".14" />
              <path d="M-130 528 C-66 518 -10 534 46 524" strokeWidth="1.6" opacity=".14" />
            </g>
            <path
              d="M52 -20 C86 140 26 250 58 400 C90 550 30 640 62 820"
              fill="none"
              stroke="#e8f7ff"
              strokeWidth="54"
              opacity=".16"
              filter="url(#glanzwerk-sweep-soft)"
            />
            <path
              d="M52 -20 C86 140 26 250 58 400 C90 550 30 640 62 820"
              fill="none"
              stroke="url(#glanzwerk-sweep-core)"
              strokeWidth="24"
              strokeLinecap="round"
              opacity=".95"
              filter="url(#glanzwerk-sweep-sharp)"
            />
            <path
              d="M26 -20 C60 140 0 250 32 400 C64 550 4 640 36 820"
              fill="none"
              stroke="#fff"
              strokeWidth="9"
              strokeLinecap="round"
              opacity=".5"
              filter="url(#glanzwerk-sweep-sharp)"
            />
            <path
              d="M80 -20 C114 140 54 250 86 400 C118 550 58 640 90 820"
              fill="none"
              stroke="#cdeafb"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".45"
              filter="url(#glanzwerk-sweep-sharp)"
            />
            <path
              d="M8 -20 C42 140 -18 250 14 400 C46 550 -14 640 18 820"
              fill="none"
              stroke="#eaf7ff"
              strokeWidth="30"
              opacity=".3"
              filter="url(#glanzwerk-sweep-soft)"
            />
            <path
              d="M38 -20 C72 140 12 250 44 400 C76 550 16 640 48 820"
              fill="none"
              stroke="#fff"
              strokeWidth="3.4"
              strokeLinecap="round"
              opacity=".62"
              filter="url(#glanzwerk-sweep-sharp)"
            />
            <path
              d="M66 -20 C100 140 40 250 72 400 C104 550 44 640 76 820"
              fill="none"
              stroke="#f2fbff"
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity=".5"
              filter="url(#glanzwerk-sweep-sharp)"
            />
            <path
              d="M58 40 C82 180 40 270 66 400"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              opacity=".75"
            />
            <path
              d="M54 460 C80 560 40 660 64 760"
              fill="none"
              stroke="#fff"
              strokeWidth="1.8"
              opacity=".6"
            />
            <path
              d="M30 90 C54 210 16 300 40 430 C62 550 26 650 46 780"
              fill="none"
              stroke="#fff"
              strokeWidth="1.2"
              opacity=".45"
            />
            <path
              d="M20 -10 C44 120 6 220 30 340"
              fill="none"
              stroke="#dff2fd"
              strokeWidth="1.6"
              opacity=".4"
            />
          </svg>
        </div>

        <div ref={organismRef} className="sweep-organism">
          <div className="sweep-organism-inner">
            <div className="sweep-idle-a">
              <div className="sweep-idle-b">
                <div className="sweep-mask">
                  {/*
                    Bewusst ein einfaches `img` und nicht `next/image`: der
                    Optimierer liefert je nach Aushandlung eine
                    verlustbehaftete Fassung (bei manchen Anfragen sogar JPEG,
                    also ganz ohne Transparenz). Beides würde das Master-Asset
                    sichtbar verändern. Die Datei wird deshalb unangetastet
                    ausgeliefert und stattdessen erst angefordert, wenn die
                    Fläche in Sichtweite kommt.

                    `src` bleibt hier leer und wird vom Bauteil gesetzt; ein
                    leeres `src` im Markup würde sonst eine zweite Anfrage auf
                    die Seite selbst auslösen.
                  */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    className="sweep-img"
                    alt=""
                    draggable={false}
                    decoding="async"
                  />
                </div>
                <div ref={glowRef} className="sweep-glow" />
              </div>
            </div>
          </div>
        </div>

        <canvas ref={fragRef} className="sweep-frag" />
      </div>

      {/*
        Die vier Begriffe. Sie sind der einzige Text des Abschnitts und tragen
        seine Aussage für alle, die die Bewegung nicht sehen — links der
        Ausgangszustand, rechts das Ergebnis. Keine Karten, keine Plättchen,
        keine Umrandung: sie stehen frei im Weißraum.
      */}
      <ul className="sweep-words">
        <li className="sweep-word sweep-word-a">Keime &amp; Bakterien</li>
        <li className="sweep-word sweep-word-b">Sensible Oberflächen</li>
        <li className="sweep-word sweep-word-c">Gründliche Reinigung</li>
        <li className="sweep-word sweep-word-d">Saubere Räume</li>
      </ul>
    </div>
  );
}
