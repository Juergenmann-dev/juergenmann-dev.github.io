/**
 * flow-data.js – Flow-Mode / Musik-Komponente: Button, Menü, Tracks, Pause, Plus (eine Quelle).
 * Nach dem Einbinden: window.FLOW_DATA
 */
(function () {
  "use strict";

  window.FLOW_DATA = {
    /** Titel des Flow-Menüs (Popup) */
    menuTitle: "♪ Flow Mode",

    /** Play-Button: title wenn aus, title wenn läuft */
    button: {
      titlePlay: "Flow Mode",
      titlePause: "Musik pausieren",
      titleTrack: "♪ "
    },

    /** Tracks (Reihenfolge = Track 1, Track 2) */
    tracks: [
      { id: "zen", file: "zen_wind.mp3", label: "Zen Wind", menuLabel: "1 – Zen Wind" },
      { id: "birds", file: "birds_piano.mp3", label: "Birds & Piano", menuLabel: "2 – Birds & Piano" }
    ],

    /** Pause-Option im Menü */
    pause: {
      label: "⏸ Pausieren"
    },

    /** Plus (z. B. Lautstärke + / nächster Track) – für spätere Erweiterung */
    plus: {
      label: "+"
    }
  };
})();
