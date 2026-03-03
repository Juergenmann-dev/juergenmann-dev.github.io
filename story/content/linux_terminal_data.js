/**
 * linux_terminal_data.js – Linux „Hacker-Glow“ Terminal (xterm/KDE1/GNOME1).
 * Transparenter, grüner Terminal-Look mit BogoMIPS, sudo und Deep Work Mode.
 * Nach dem Einbinden: window.LINUX_TERMINAL_DATA
 */
(function () {
  "use strict";

  window.LINUX_TERMINAL_DATA = {
    meta: {
      title: "Linux Hacker-Glow Terminal",
      os: "Debian 2.2.13",
      promptExample: "user@debian:~$",
      cols: 80,
      rows: 24,
      language: "en" // authentische Original-Sprache
    },

    /** Terminal-Fenster (halbtransparent über Wallpaper) */
    window: {
      className: "linux-terminal",
      width: 720,
      backdrop: {
        backgroundColor: "#050505",
        textColor: "#00ff41"
      }
    },

    /** Schmale Titlebar wie frühe xterm/KDE-Terminals */
    titlebar: {
      className: "linux-titlebar",
      left: {
        dotClass: "linux-dot",
        text: "user@debian:~  -  xterm"
      },
      right: {
        text: "[UTF-8]  80x24"
      }
    },

    /** Inhalt – statische Snapshot-Lines */
    content: {
      className: "linux-output",
      lines: [
        "Linux debian 2.2.13 #1 SMP Tue Mar 21 18:42:17 EST 2000 i686",
        "user@debian:~$ uname -a",
        "Linux debian 2.2.13 #1 SMP Tue Mar 21 18:42:17 EST 2000 i686 unknown",
        "user@debian:~$ dmesg | grep -i bogomips",
        "Calibrating delay loop... 266.24 BogoMIPS",
        "user@debian:~$ echo \"Welcome to Deep Work Mode\"",
        "Welcome to Deep Work Mode",
        "user@debian:~$ sudo ./install_kaffeemaschine.sh",
        "[sudo] password for user: ********",
        "...",
        "Preparing coffee-mod (2.0.2026)... done.",
        "Starting daemon: kaffeewatchd.",
        "user@debian:~$ search --target android",
        "ERROR: Package 'android' not found in 2001 repository.",
        "TIP: Try searching for 'nokia_3310_emulator' or 'palm_pilot_sync'.",
        "user@debian:~$"
      ]
    },

    /** Cursor: blinkender Block █ im Sekundentakt */
    cursor: {
      type: "block",
      className: "linux-cursor",
      blinkMs: 900
    },

    /** CSS-Hinweise für das view-spezifische Styling */
    cssHints: {
      windowClass: "linux-terminal",
      window: {
        borderRadius: "6px",
        border: "1px solid rgba(0, 255, 65, 0.4)",
        background: "rgba(5, 5, 5, 0.65)",
        boxShadow:
          "0 0 25px rgba(0, 255, 65, 0.4), 0 0 60px rgba(0, 0, 0, 0.9)"
      },
      titlebarClass: "linux-titlebar",
      titlebar: {
        height: "18px",
        background: "linear-gradient(to bottom, #101010, #050505)",
        borderBottom: "1px solid rgba(0, 255, 65, 0.2)",
        color: "#00ff41",
        fontFamily: "\"Courier New\", monospace",
        fontSize: "10px",
        textShadow: "0 0 4px rgba(0, 255, 65, 0.7)"
      },
      dotClass: "linux-dot",
      dot: {
        size: "8px",
        border: "1px solid rgba(0, 255, 65, 0.5)"
      },
      outputClass: "linux-output",
      output: {
        padding: "10px 12px 12px",
        fontFamily: "\"DejaVu Sans Mono\", \"Courier New\", monospace",
        fontSize: "13px",
        lineHeight: "1.35",
        color: "#00ff41",
        textShadow: "0 0 5px rgba(0, 255, 65, 0.7)",
        whiteSpace: "pre-wrap"
      },
      cursorClass: "linux-cursor"
    }
  };
})();

