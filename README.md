# Et tilgjengelig søk

Liten nettside der brukeren kan søke etter fiktive aktiviteter, kurs og møteplasser. Laget som hjemmeoppgave til intervju hos Norges Blindeforbund.

## Slik starter du løsningen

Krever Node.js 20 eller nyere.

```bash
npm install
npm run dev
```

Åpne http://localhost:3000 i nettleseren.

API-et kan også testes direkte: http://localhost:3000/api/search?q=tur

## Teknologivalg

Next.js (App Router) med React og TypeScript. Frontend og serverdel ligger i samme prosjekt, og det er den stacken Blindeforbundet selv bruker.

- `lib/aktiviteter.ts` – fast datasett med fem oppføringer og søkefunksjonen (delstrengmatching, ufølsom for store/små bokstaver).
- `app/api/search/route.ts` – serverdelen. Leser `?q=` fra URL-en og returnerer treff som JSON.
- `components/Sok.tsx` – søkeskjema og resultatvisning.
- `app/globals.css` – all styling, uten rammeverk.

## Universell utforming – hva jeg har gjort

**Tastatur**
- Vanlig `<form>` med `<label for>`, `<input type="search">` og `<button type="submit">`. Enter i feltet sender skjemaet uten egen tastaturhåndtering.
- Etter søk flyttes fokus til resultatoverskriften, så tastaturbrukere slipper å tabbe seg fram til treffene.
- Tydelig fokusmarkering på alle interaktive elementer: 3 px rød ramme med luft rundt (`outline-offset`), slik at den ikke forsvinner inn i kanten på feltet.

**Skjermleser**
- Skjemaet har `role="search"`, så det dukker opp som landemerke.
- En visuelt skjult statusregion (`role="status"`, `aria-live="polite"`) annonserer «3 treff for «kurs»» når resultatene er klare.
- Resultatoverskriften får samme tekst og fokus, så brukeren både hører meldingen og står rett ved resultatene.
- Resultatene er en `<ul>` med én `<h3>` per treff, så man kan navigere mellom treff med overskrift- og listekommandoer.
- `lang="nb"` på dokumentet, så skjermleser velger norsk uttale.

**Svaksynte og zoom**
- Alle størrelser i `rem`. Grunnskrift tilsvarer 18 px og følger brukerens innstilling for skriftstørrelse.
- Ingen faste bredder eller høyder. Søkefelt og knapp bryter til én kolonne på smale flater, og siden reflower uten horisontal scrolling ved 400 % zoom.
- Kontrast: tekst mot bakgrunn ca. 16:1, knapp ca. 10:1, fokusramme ca. 6:1 mot hvit bakgrunn. Alle over kravet i WCAG 2.1 AA.
- Søkefelt og knapp har synlig kant i tillegg til farge, og minst 44 px høyde.

## Hva jeg har kontrollert

- Tab, Shift+Tab og Enter gjennom hele flyten: søkefelt → knapp → resultatoverskrift → tilbake.
- Søk via API-et direkte: «tur» gir Skogstur, «KURS» gir begge kursene, tomt søk gir ingen treff.
- `npm run build` går gjennom uten feil.
- Zoom til 400 % i nettleseren: ingen horisontal scrolling, alt er lesbart.
- VoiceOver i Safari: label leses ved fokus i feltet, antall treff annonseres etter søk, og fokus lander på resultatoverskriften.

## Prioriteringer, hva som gjenstår og tidsbruk

**Prioritert:** selve søkeflyten og at den fungerer med tastatur, skjermleser og zoom. Lite kode som er lett å følge, framfor flere funksjoner.

**Valg jeg vil begrunne:** søk ved å sende skjemaet, ikke søk-mens-du-skriver. Det gir én tydelig hendelse («nå er resultatene klare») som kan annonseres, og unngår at skjermleser avbrytes for hvert tastetrykk.

**Gjenstår / mulig videreutvikling**
- Egen melding ved ingen treff, utover «0 treff for …».
- Lastestatus og feilhåndtering hvis API-et feiler.
- Filtrering på aktivitetstype: jeg ville lagt til `type` som ekstra parameter i API-et, og en `<fieldset>` med radioknapper (eller en `<select>`) i skjemaet, slik at filteret sendes med samme skjema og samme statusmelding.
- Progressiv forbedring: skjemaet kunne fungert uten JavaScript ved å la siden lese `?q=` direkte fra URL-en.
- Automatiserte tester.

**Tidsbruk:** ca. 90 minutter, inkludert oppsett og README.

## KI-bruk

Jeg har brukt Claude Code til oppsett, kode og sparring om tilgjengelighetsvalg. Alle valg er mine, og jeg kan forklare koden.
