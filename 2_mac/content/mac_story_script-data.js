/**
 * mac_story_script-data.js – Mac Terminal Story Script.
 * Steuert die „Geisterhand“ im macOS-Terminal (print story + Deep-Work-Story).
 * Nach dem Einbinden: window.MAC_TERMINAL_STORY
 *
 * Die View kann dieses Array direkt als automatedStory verwenden
 * und die Typ-Logik aus deinem vorhandenen Typewriter-Script benutzen.
 */
(function () {
  "use strict";

  window.MAC_TERMINAL_STORY = [
    {
      type: "input",
      prompt: "MacBook-Air:~ jm$ ",
      cmd: "print story",
      delayPerCharMs: 45,
      delayAfterMs: 400
    },
    {
      type: "response",
      text: "Story wird im Terminal ausgegeben…",
      delayAfterMs: 600
    },
    {
      type: "glitch",
      timeMs: 220 // kurzer, subtiler „Screen pulse“
    },
    {
      type: "story",
      text: "Moin.",
      delayAfterMs: 700
    },
    {
      type: "story",
      text: "Ich möchte dich auf eine kleine Reise mitnehmen.",
      delayAfterMs: 900
    },
    {
      type: "story",
      text: "In eine Welt, die auf den ersten Blick nicht das ist, was sie vorgibt zu sein.",
      delayAfterMs: 1000
    },
    {
      type: "story",
      text: "Aber eigentlich von einem Menschen erzählt, der ein Projekt mit Substanz gebaut hat.",
      delayAfterMs: 1000
    },
    {
      type: "story",
      text: "Und genau da, wo du sonst Xcode, Terminal und Browser offen hast, landet jetzt für einen Moment nur dieses eine Projekt.",
      delayAfterMs: 1000
    },
    {
      type: "story",
      text: "Nicht alles erklärt sich sofort.",
      delayAfterMs: 800
    },
    {
      type: "story",
      text: "Manches öffnet sich erst, wenn man genauer hinschaut.",
      delayAfterMs: 900
    },
    {
      type: "story",
      text: "Lass dich treiben.",
      delayAfterMs: 800
    },
    {
      type: "story",
      text: "Und wenn du merkst, dass dich etwas neugierig macht – nimm dir einen Moment.",
      delayAfterMs: 1100
    },
    {
      type: "story",
      text: "Vielleicht mit Musik.",
      delayAfterMs: 900
    },
    {
      type: "story",
      text: "Willkommen.",
      delayAfterMs: 1100
    },
    {
      type: "pause",
      timeMs: 800
    },
    {
      type: "input",
      prompt: "MacBook-Air:~ jm$ ",
      cmd: "open deep-work-mode.app --args cv",
      delayPerCharMs: 40,
      delayAfterMs: 600
    },
    {
      type: "response",
      text: "Deep Work Mode wird gestartet…",
      delayAfterMs: 800
    },
    {
      type: "pause",
      timeMs: 600
    },
    {
      type: "input",
      prompt: "MacBook-Air:~ jm$ ",
      cmd: "clear",
      delayPerCharMs: 30,
      delayAfterMs: 350
    },
    {
      type: "story",
      text: "Installation beginnt.",
      delayAfterMs: 900
    },
    {
      type: "pause",
      timeMs: 500
    },
    {
      type: "glitch",
      timeMs: 220
    },
    {
      type: "story",
      text: "Bin ich Linux? Bin ich Windows? Bin ich iOS?",
      delayAfterMs: 900
    },
    {
      type: "story",
      text: "Mein System weiß es gerade selbst nicht mehr.",
      delayAfterMs: 900
    },
    {
      type: "pause",
      timeMs: 600
    },
    {
      type: "input",
      prompt: "MacBook-Air:~ jm$ ",
      cmd: "sudo installer -pkg jürgen-mann.pkg -target /",
      delayPerCharMs: 40,
      delayAfterMs: 500
    },
    {
      type: "run_retro_install",
      delayAfterMs: 400
    },
    {
      type: "input",
      prompt: "MacBook-Air:~ jm$ ",
      cmd: "clear",
      delayPerCharMs: 30,
      delayAfterMs: 350
    },
    {
      type: "story",
      text: "Bereit, wenn du bist.",
      delayAfterMs: 800
    }
  ];
})();

