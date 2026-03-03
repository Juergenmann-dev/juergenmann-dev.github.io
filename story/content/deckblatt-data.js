/**
 * deckblatt-data.js – Deckblatt (Cover): Slogan-Zeilen (Typewriter), Hinweis, Titel (eine Quelle).
 * Nach dem Einbinden: window.DECKBLATT_DATA
 */
(function () {
  "use strict";

  window.DECKBLATT_DATA = {
    /** Slogan-Zeilen für Typewriter (oben + unten). typewriter = Text, optional pauseAfter, typoAfter/typoWrong für Effekt */
    sloganLines: [
      { typewriter: "Code denkt in Zuständen.", pauseAfter: "Code denkt" },
      { typewriter: "\\n", nl: true },
      { typewriter: "Nutzer denken in Handlungen.", pauseAfter: "Nutzer denken" },
      { typewriter: "Produkte müssen beides verbinden.", pauseAfter: "Produkte müssen beides", typoAfter: "Produkte ", typoWrong: "machen beide verbinden" }
    ],

    /** Hinweis über den Bubbles */
    hint: "Wählen Sie eine Ansicht",

    /** Titel auf dem Deckblatt (kurz + Name) */
    title: "JM",
    sub: "Jürgen Mann"
  };
})();
