/**
 * win95_cmd_data.js – MS-DOS-Eingabeaufforderung (Windows 95/98).
 * Statisches Fenster-Template (3D-Rahmen, Titelleiste, Toolbar, schwarzer Inhalt).
 * Nach dem Einbinden: window.WIN95_CMD_DATA
 */
(function () {
  "use strict";

  window.WIN95_CMD_DATA = {
    meta: {
      title: "MS-DOS-Eingabeaufforderung",
      os: "Windows 95",
      promptExample: "C:\\>",
      font: "'Fixedsys', 'Lucida Console', monospace"
    },

    /** Fenster-Hülle (Rahmen + Schatten) */
    window: {
      className: "win95-window",
      width: 640,
      backdropColor: "#008080"
    },

    /** Titelleiste (aktiv) */
    titlebar: {
      className: "win95-titlebar",
      text: "MS-DOS-Eingabeaufforderung",
      buttons: [
        { id: "minimize", label: "_" },
        { id: "maximize", label: "\u25fb" }, // ◻
        { id: "close", label: "X" }
      ]
    },

    /** Toolbar direkt unter der Titelleiste */
    toolbar: {
      className: "win95-toolbar",
      fontLabel: "Schriftgröße:",
      fontOptions: ["Auto", "8 x 12", "10 x 18"],
      actions: [
        { id: "fullscreen", label: "Vollbild" },
        { id: "windowed", label: "Fenster" }
      ]
    },

    /** Inhalt des schwarzen Fensters (statischer Snapshot) */
    content: {
      className: "win95-content",
      lines: [
        "Microsoft(R) Windows 95",
        "(C)Copyright Microsoft Corp 1981-1995.",
        "",
        "C:\\>dir",
        " Volume in Laufwerk C: hat keine Bezeichnung.",
        " Volumeseriennummer: 13F2-1A2B",
        "",
        " Verzeichnis von C:\\",
        "",
        "KAFFEE     EXE       42.368  24.03.1998  13:37",
        "WINDOWS              <DIR>   24.03.1998  10:15",
        "PROGRAMME            <DIR>   24.03.1998  10:16",
        "DOS                  <DIR>   24.03.1998  10:12",
        "        1 Datei(en)          42.368 Bytes",
        "        3 Verzeichnis(se)  1.234.567.890 Bytes frei",
        "",
        "C:\\>"
      ]
    },

    cssHints: {
      window: {
        background: "#c0c0c0",
        borderTop: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        boxShadow: "2px 2px 0 #000000",
        fontSize: "12px"
      },
      titlebar: {
        background: "#000080",
        color: "#ffffff",
        padding: "2px 4px"
      },
      titleButtons: {
        className: "win95-btn",
        size: { width: "16px", height: "14px" }
      },
      toolbar: {
        background: "#c0c0c0"
      },
      content: {
        background: "#000000",
        color: "#c0c0c0",
        fontFamily: "'Fixedsys', 'Lucida Console', monospace",
        padding: "6px 6px 8px",
        whiteSpace: "pre"
      }
    }
  };
})();

