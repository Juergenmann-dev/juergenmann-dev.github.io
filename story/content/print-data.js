/**
 * print-data.js – Druck-Dialog: Titel und Optionen (eine Quelle).
 * Nach dem Einbinden: window.PRINT_DATA
 */
(function () {
  "use strict";

  window.PRINT_DATA = {
    title: "Was soll gedruckt werden?",

    /** Optionen: mode = setMode/printChoice, label = Button-Text */
    options: [
      { mode: "design", label: "Lebenslauf (Handoff)" },
      { mode: "onepage", label: "1 Seite" },
      { mode: "ats", label: "ATS" },
      { mode: "anschreiben", label: "Anschreiben" },
      { mode: "komplett", label: "Komplett (Anschreiben + Lebenslauf)" },
      { mode: "profilplus", label: "Profil+ (ausführliches Profil)" }
    ],

    cancelLabel: "Abbrechen"
  };
})();
