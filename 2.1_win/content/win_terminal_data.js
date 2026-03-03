/**
 * win_terminal_data.js – Windows 95 MS-DOS-Eingabeaufforderung.
 * Struktur/Verhalten wie Mac/Linux: 80×18, gleicher Ablauf (Boot → CMD → Story → Installation → Flow → Deckblatt).
 * Inhalt: Zuerst Versuch auf C: (klappt nicht), dann neue Formatierung mit jm lebenslauf.html, Daten installieren, am Ende Prüfung ob Daten im Verzeichnis liegen.
 * Nach dem Einbinden: window.WIN_TERMINAL_DATA
 */
(function () {
  "use strict";

  window.WIN_TERMINAL_DATA = {
    meta: {
      title: "MS-DOS-Eingabeaufforderung",
      os: "Windows 95",
      cols: 80,
      rows: 18,
      promptExample: "C:\\>",
      language: "de"
    },

    titlebar: {
      text: "MS-DOS-Eingabeaufforderung"
    },

    /** CMD-Prompt */
    prompt: "C:\\>",

    /** Retro-Installer: zuerst C: versuchen (schlägt fehl), dann jm lebenslauf.html anlegen, Daten kopieren, am Ende dir-Prüfung. Gleiche logische Schritte wie Mac/Linux (Pakete, Kaffee, Kiosk). */
    installer: {
      tryC: "Kopiere nach C:\\...",
      tryCFail: "Laufwerk A: nicht bereit.",
      commandAfterError: "jm_lebenslauf.html",
      newFormat: "Neue Formatierung: jm_lebenslauf.html",
      progressFill: "#",
      progressEmpty: ".",
      progressLength: 30,
      packages: [
        "  [1/4] ui-ux-modul kopiert",
        "  [2/4] xcode-toolchain kopiert",
        "  [3/4] firebase-sdk kopiert",
        "  [4/4] android-sdk kopiert"
      ],
      installComplete: "  Alle Dateien nach jm_lebenslauf.html kopiert.",
      coffeeLabel: "  kaffeemaschine-integration",
      coffeeErrorAt: 72,
      coffeeErrors: [
        "  FEHLER: Wassertank leer",
        "  FEHLER: Kaffee vergessen",
        "  FEHLER: Maschine war aus."
      ],
      coffeeSuccess: "  kaffeemaschine (HTML aktivieren)",
      coffeeReady: "  Kaffee ist fertig.",
      kioskLabel: "  kiosk-mode",
      kioskMessage: "  Kiosk-Modus aktiv – Klick oder Taste = Vollbild.",
      successLine: "  SUCCESS: Installation abgeschlossen",
      verifyDir: "  Prüfe Verzeichnis jm_lebenslauf.html...",
      verifyOk: "  Alle Daten korrekt installiert und im Verzeichnis.",
      warningTitle: "  WARNUNG: Paket enthält:",
      warningBullets: [
        "  - 11 Easter Eggs erkannt",
        "  - State Management, das funktioniert",
        "  - Typewriter-Animationen (können schlaflos machen)",
        "  - Und offenbar Kaffee-Künste"
      ],
      readyLine: "Bereit für deine Erwartungen.",
      rollbackSuffix: " (Rollback)"
    }
  };
})();
