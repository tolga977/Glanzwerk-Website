import MotionAsset from "@/components/home/MotionAsset";

/**
 * „Sauberkeit entsteht nicht zufällig" — der Hygiene-Abschnitt.
 *
 * ── Woher die Bauform kommt ─────────────────────────────────────────────
 * Das Vorbild ist die biologische Tafel: ein Objekt in der Mitte, wenige
 * benannte Punkte darum, feine Linien dazwischen. Übernommen ist nur dieses
 * Prinzip — nicht die Farbigkeit, nicht das Raster, nicht der Ton solcher
 * Darstellungen. Die Punkte stehen im Schriftbild der Marke, die Linien sind
 * dieselben Haarlinien, die auf dieser Seite schon Abschnittsfüße und die
 * Vertrauensmatrix tragen. Keine Kästen, kein Raster aus vier gleichen
 * Kacheln: die Punkte stehen frei im Weißraum und sind nur über Lage und
 * Linie mit dem Motiv verbunden.
 *
 * ── Warum hier keine Überschrift steht ──────────────────────────────────
 * Die Startseite hat elf freigegebene H2. Eine zwölfte müsste erfunden
 * werden, und eine erfundene Überschrift über einem Hygienethema ist genau
 * die Art Aussage, die diese Seite nicht macht. Der Leitsatz steht deshalb
 * als Absatz im Schriftgrad einer Überschrift — die Gliederung des Dokuments
 * bleibt unverändert, die Lesbarkeit gewinnt trotzdem einen Einstieg.
 *
 * ── Was der Organismus NICHT behauptet ──────────────────────────────────
 * Er ist kein Nachweis. Es steht hier keine Prozentzahl, kein „keimfrei",
 * kein „desinfiziert". Was er zeigt, ist ein Gedanke: dass Sauberkeit aus
 * dem Zusammenspiel weniger Faktoren entsteht. Jeder der vier Punkte ist
 * durch bestehende Inhalte dieser Seite gedeckt — die Sanitärbereiche etwa,
 * weil der Preisrechner sie tatsächlich einzeln abfragt.
 */

const punkte = [
  {
    titel: "Kontaktflächen",
    text: "Griffe, Schalter, Tische. Stark genutzte Flächen brauchen häufiger Aufmerksamkeit als selten berührte — welche das in Ihrem Objekt sind, halten wir vor dem Start fest.",
  },
  {
    titel: "Sanitärbereiche",
    text: "Sie werden getrennt betrachtet und nicht in den Quadratmetern mitgeführt. Auch der Preisrechner fragt ihre Anzahl deshalb einzeln ab.",
  },
  {
    titel: "Reinigungsintervall",
    text: "Ein Büro braucht einen anderen Takt als eine Praxis mit Publikumsverkehr. Wie häufig gereinigt wird, wird vor Beginn vereinbart.",
  },
  {
    titel: "Reinigungsverfahren",
    text: "Nutzung und Material entscheiden, welches Verfahren passt. Das klären wir im Gespräch vor dem Angebot, statt es pauschal festzulegen.",
  },
] as const;

export default function HygieneSystem() {
  return (
    <div className="hyg">
      <div className="hyg-kopf">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
          <span aria-hidden="true" className="brand-tick text-brand-400" />
          Was im Reinigungsplan zusammenkommt
        </p>
        {/* Absatz, keine Überschrift — Begründung im Kopf dieser Datei. */}
        <p className="font-display display-lg mt-5 text-pretty text-[1.875rem] font-medium text-brand-900 sm:text-4xl lg:text-[2.75rem]">
          Sauberkeit entsteht nicht zufällig
        </p>
        <p className="measure mt-5 text-base leading-relaxed text-ink-soft">
          Vier Faktoren bestimmen, wie ein Objekt gereinigt wird. Keiner davon wirkt für sich
          allein — sie werden vor dem Start gemeinsam festgelegt.
        </p>
      </div>

      <div className="hyg-feld">
        {/*
          Die Bühne steht im Markup zuerst: auf dem Telefon ist sie damit das
          erste, was nach dem Leitsatz kommt, und die Punkte staffeln sich
          darunter. Ab Desktop schiebt das Raster sie in die Mitte.
        */}
        <div className="hyg-buehne">
          <MotionAsset
            quelle="/videos/hygiene-organismus.mp4"
            standbild="/videos/hygiene-standbild.webp"
            className="hyg-video"
            ablauf="schleife"
            bisSekunde={7.15}
          />
        </div>

        {punkte.map((p, i) => (
          <div key={p.titel} className={`hyg-punkt hyg-punkt-${i + 1}`}>
            <p className="hyg-punkt-titel">{p.titel}</p>
            <p className="hyg-punkt-text">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
