export type Aktivitet = {
  id: number;
  tittel: string;
  type: "Aktivitet" | "Kurs" | "Møteplass";
  sted: string;
  beskrivelse: string;
};

export const aktiviteter: Aktivitet[] = [
  {
    id: 1,
    tittel: "Skogstur i Østmarka",
    type: "Aktivitet",
    sted: "Oslo",
    beskrivelse: "Rolig tur på bred sti med ledsager. Vi stopper for kaffe underveis.",
  },
  {
    id: 2,
    tittel: "Kurs i punktskrift for nybegynnere",
    type: "Kurs",
    sted: "Bergen",
    beskrivelse: "Fire kvelder der du lærer grunnleggende punktskrift i eget tempo.",
  },
  {
    id: 3,
    tittel: "Kafétreff på torsdager",
    type: "Møteplass",
    sted: "Trondheim",
    beskrivelse: "Uformell møteplass med kaffe, vafler og gode samtaler.",
  },
  {
    id: 4,
    tittel: "Svømming i varmtvannsbasseng",
    type: "Aktivitet",
    sted: "Stavanger",
    beskrivelse: "Ukentlig svømming med instruktør. Passer for alle nivåer.",
  },
  {
    id: 5,
    tittel: "Kurs i skjermleser på mobil",
    type: "Kurs",
    sted: "Digitalt",
    beskrivelse: "Lær å bruke VoiceOver og TalkBack effektivt i hverdagen.",
  },
];

export function sokAktiviteter(sokeord: string): Aktivitet[] {
  const ord = sokeord.trim().toLowerCase();
  if (!ord) return [];
  return aktiviteter.filter((a) =>
    [a.tittel, a.type, a.sted, a.beskrivelse].some((felt) =>
      felt.toLowerCase().includes(ord),
    ),
  );
}
