/**
 * linux_story_script-data.js – Linux Terminal Story Script.
 * Gleiche Reihenfolge wie Mac: Story → Installation (Pakete + Kaffee Rollback) → Flow.
 * Nach dem Einbinden: window.LINUX_STORY_SCRIPT
 */
(function () {
  "use strict";

  window.LINUX_STORY_SCRIPT = [
    { type: "response", text: "Story wird im Terminal ausgegeben…", delayAfterMs: 500 },
    { type: "story", text: "Moin.", delayAfterMs: 600 },
    { type: "story", text: "Ich möchte dich auf eine kleine Reise mitnehmen.", delayAfterMs: 800 },
    { type: "story", text: "In eine Welt, die auf den ersten Blick nicht das ist, was sie vorgibt zu sein.", delayAfterMs: 900 },
    { type: "story", text: "Aber eigentlich von einem Menschen erzählt, der ein Projekt mit Substanz gebaut hat.", delayAfterMs: 900 },
    { type: "story", text: "Nicht alles erklärt sich sofort.", delayAfterMs: 700 },
    { type: "story", text: "Manches öffnet sich erst, wenn man genauer hinschaut.", delayAfterMs: 800 },
    { type: "story", text: "Lass dich treiben.", delayAfterMs: 700 },
    { type: "story", text: "Willkommen.", delayAfterMs: 900 },
    { type: "pause", timeMs: 500 },
    { type: "input", prompt: "jm@debian:~$ ", cmd: "clear", delayPerCharMs: 30, delayAfterMs: 350 },
    { type: "response", text: "Installation beginnt.", delayAfterMs: 800 },
    { type: "pause", timeMs: 600 },
    { type: "input", prompt: "jm@debian:~$ ", cmd: "sudo apt-get install -y jürgen-mann.deb", delayPerCharMs: 35, delayAfterMs: 600 },
    { type: "run_retro_install", delayAfterMs: 400 }
  ];
})();
