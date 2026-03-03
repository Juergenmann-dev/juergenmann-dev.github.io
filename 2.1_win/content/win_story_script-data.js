/**
 * win_story_script-data.js – Windows CMD Story Script.
 * Gleiche Reihenfolge wie Mac/Linux: Story → C:-Versuch (klappt nicht) → neue Formatierung jm lebenslauf.html → Installation → Prüfung → Flow.
 * Nach dem Einbinden: window.WIN_STORY_SCRIPT
 */
(function () {
  "use strict";

  window.WIN_STORY_SCRIPT = [
    { type: "input", prompt: "C:\\>", cmd: "@echo off", delayAfterMs: 500 },
    { type: "response", text: "Story wird in der Eingabeaufforderung ausgegeben...", delayAfterMs: 500 },
    { type: "story", text: "Moin.", delayAfterMs: 600 },
    { type: "story", text: "Ich möchte dich auf eine kleine Reise mitnehmen.", delayAfterMs: 800 },
    { type: "story", text: "In eine Welt, die auf den ersten Blick nicht das ist, was sie vorgibt zu sein..", delayAfterMs: 900 },
    { type: "story", text: "Aber eigentlich von einem Menschen erzählt, der ein Projekt mit Substanz gebaut hat.", delayAfterMs: 900 },
    { type: "story", text: "Nicht alles erklärt sich sofort.", delayAfterMs: 700 },
    { type: "story", text: "Manches öffnet sich erst, wenn man genauer hinschaut.", delayAfterMs: 800 },
    { type: "story", text: "Lass dich treiben.", delayAfterMs: 700 },
    { type: "story", text: "Willkommen.", delayAfterMs: 900 },
    { type: "show_prompt", delayAfterMs: 800 },
    { type: "pause", timeMs: 500 },
    { type: "input", prompt: "C:\\>", cmd: "cls", delayAfterMs: 350 },
    { type: "response", text: "Vorbereitung: Festplatte für die Installation bereit machen...", delayAfterMs: 700 },
    { type: "input", prompt: "C:\\>", cmd: "format c: /s", delayAfterMs: 600 },
    { type: "response", text: "Laufwerkintegrität wird geprüft. Status: 100%", delayAfterMs: 600 },
    { type: "response", text: "Systemdateien werden übertragen...", delayAfterMs: 600 },
    { type: "response", text: "Formatierung abgeschlossen.", delayAfterMs: 800 },
    { type: "pause", timeMs: 600 },
    { type: "response", text: "Nun wird dein Lebenslauf von Diskette nach C:\\ kopiert...", delayAfterMs: 700 },
    { type: "input", prompt: "C:\\>", cmd: "copy A:\\jm_lebenslauf.html C:\\", delayAfterMs: 600 },
    { type: "response_error", text: "Laufwerk A: nicht bereit.", delayAfterMs: 700 },
    { type: "response", text: "Abbrechen, Wiederholen, Fehler? w", delayAfterMs: 700 },
    { type: "response", text: "        1 Datei(en) kopiert.", delayAfterMs: 800 },
    { type: "pause", timeMs: 600 },
    { type: "input", prompt: "C:\\>", cmd: "jm_lebenslauf.html", delayAfterMs: 700 },
    { type: "response", text: "Starte Hypertext-Modul...", delayAfterMs: 700 },
    { type: "response_aqua", text: "Status: 200 OK - Datei im Zukunfts-Format erkannt.", delayAfterMs: 900 },
    { type: "run_retro_install", delayAfterMs: 500 }
  ];
})();
