"use client";

import { FormEvent, useRef, useState } from "react";
import type { Aktivitet } from "@/lib/aktiviteter";

type Resultat = { sokeord: string; treff: Aktivitet[] };

export default function Sok() {
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const overskriftRef = useRef<HTMLHeadingElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sokeord = String(data.get("q") ?? "");

    const svar = await fetch(`/api/search?q=${encodeURIComponent(sokeord)}`);
    setResultat(await svar.json());

    // Flytter tastaturfokus til resultatene, slik at bruker ikke må lete etter dem.
    overskriftRef.current?.focus();
  }

  const antall = resultat?.treff.length ?? 0;
  const statusmelding = resultat
    ? antall === 1
      ? `1 treff for «${resultat.sokeord}»`
      : `${antall} treff for «${resultat.sokeord}»`
    : "";

  return (
    <>
      <form onSubmit={handleSubmit} role="search" className="sokeskjema">
        <label htmlFor="sokefelt">Søk etter aktivitet, kurs eller møteplass</label>
        <div className="sokefelt-rad">
          <input id="sokefelt" name="q" type="search" autoComplete="off" />
          <button type="submit">Søk</button>
        </div>
      </form>

      <section aria-labelledby="resultat-overskrift" className="resultater">
        <h2 id="resultat-overskrift" ref={overskriftRef} tabIndex={-1}>
          {resultat ? statusmelding : "Søkeresultater"}
        </h2>

        <p role="status" aria-live="polite" className="skjult">
          {statusmelding}
        </p>

        {resultat && antall > 0 && (
          <ul>
            {resultat.treff.map((a) => (
              <li key={a.id}>
                <h3>{a.tittel}</h3>
                <p>
                  {a.type} · {a.sted}
                </p>
                <p>{a.beskrivelse}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
