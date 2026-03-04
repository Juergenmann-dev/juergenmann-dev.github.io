/**
 * linux_story_script-data.js – Linux Terminal Story Script.
 * Gleiche Reihenfolge wie Mac: Story → Installation (Pakete + Kaffee Rollback) → Flow.
 * Nach dem Einbinden: window.LINUX_STORY_SCRIPT
 */
(function () {
  "use strict";

  window.LINUX_STORY_SCRIPT = [
    /* Retro-Header: erste drei Zeilen fast zeitgleich, dann 500ms Pause, Story-Zeilen je 200ms */
    { type: "input", prompt: "jm@debian:~$ ", cmd: "cat story_start.txt", delayPerCharMs: 30, delayAfterMs: 600 },
    { type: "response", text: "Reading story_start.txt... done.", delayAfterMs: 80 },
    { type: "response", text: "Encoding: ISO-8859-1 (Latin-1)", delayAfterMs: 80 },
    { type: "response", text: "Lines: 12  Bytes: 456", delayAfterMs: 80 },
    { type: "response", text: "", delayAfterMs: 500 },
    { type: "response", text: "Story wird im Terminal ausgegeben...", delayAfterMs: 200 },
    { type: "response", text: "------------------------------------------------------------", delayAfterMs: 200 },
    /* Story: Zeile für Zeile mit 200ms Verzögerung (System „liest“ die Datei) */
    { type: "story", text: "Moin.", delayAfterMs: 200 },
    { type: "story", text: "Erinnerst du dich? Hier hat alles angefangen.", delayAfterMs: 400 },
    { type: "story", text: "Bevor die Welt kompliziert wurde, war sie grün auf schwarz.", delayAfterMs: 500 },
    { type: "story", text: "Ich möchte dich auf eine kleine Reise mitnehmen.", delayAfterMs: 200 },
    { type: "story", text: "In eine Welt, die auf den ersten Blick nicht das ist, was sie vorgibt zu sein.", delayAfterMs: 200 },
    { type: "story", text: "Aber eigentlich von einem Menschen erzählt, der ein Projekt mit Substanz gebaut hat.", delayAfterMs: 200 },
    { type: "story", text: "Nicht alles erklärt sich sofort.", delayAfterMs: 200 },
    { type: "story", text: "Manches öffnet sich erst, wenn man genauer hinschaut.", delayAfterMs: 200 },
    { type: "story", text: "Lass dich treiben.", delayAfterMs: 200 },
    { type: "story", text: "Und wenn du merkst, dass dich etwas neugierig macht – nimm dir einen Moment.", delayAfterMs: 200 },
    { type: "story", text: "Vielleicht mit Musik.", delayAfterMs: 200 },
    { type: "story", text: "Willkommen.", delayAfterMs: 200 },
    { type: "response", text: "------------------------------------------------------------", delayAfterMs: 200 },
    { type: "pause", timeMs: 600 },
    { type: "response", text: "jm@debian:~$ _", delayAfterMs: 800 },
    { type: "pause", timeMs: 700 },
    /* Installation wie Mac/Win */
    { type: "input", prompt: "jm@debian:~$ ", cmd: "clear", delayPerCharMs: 30, delayAfterMs: 350 },
    { type: "response", text: "Installation beginnt.", delayAfterMs: 800 },
    { type: "pause", timeMs: 600 },
    { type: "input", prompt: "jm@debian:~$ ", cmd: "sudo dpkg -i jürgen-mann.deb", delayPerCharMs: 35, delayAfterMs: 600 },
    { type: "run_retro_install", delayAfterMs: 400 }
  ];
})();
