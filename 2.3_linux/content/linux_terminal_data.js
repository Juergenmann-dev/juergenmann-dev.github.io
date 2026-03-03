/**
 * linux_terminal_data.js – Linux Terminal (xterm/KDE1-Ära).
 * Struktur/Verhalten wie Mac: 80×18, gleicher Ablauf, gleiche Animationen.
 * Nur plattformspezifisch: Sprache, Aussehen und Befehle passend zu Linux/Debian der Zeit (Englisch wo üblich, Grün, apt/clear/sudo).
 * Nach dem Einbinden: window.LINUX_TERMINAL_DATA
 */
(function () {
  "use strict";

  window.LINUX_TERMINAL_DATA = {
    meta: {
      title: "Linux Hacker-Glow Terminal",
      os: "Debian 2.2.13",
      initials: "jm",
      promptExample: "jm@debian:~$",
      cols: 80,   /* wie Mac/Win: einheitlich 80×18 */
      rows: 18,
      language: "en"
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
        text: "jm@debian:~  -  xterm"
      },
      right: {
        text: "[UTF-8]  80x18"
      }
    },

    /** Inhalt – statische Snapshot-Lines */
    content: {
      className: "linux-output",
      lines: [
        "Linux debian 2.2.13 #1 SMP Tue Mar 21 18:42:17 EST 2000 i686",
        "jm@debian:~$ uname -a",
        "Linux debian 2.2.13 #1 SMP Tue Mar 21 18:42:17 EST 2000 i686 unknown",
        "jm@debian:~$ dmesg | grep -i bogomips",
        "Calibrating delay loop... 266.24 BogoMIPS",
        "jm@debian:~$ echo \"Welcome to Deep Work Mode\"",
        "Welcome to Deep Work Mode",
        "jm@debian:~$ sudo ./install_kaffeemaschine.sh",
        "[sudo] password for jm: ********",
        "...",
        "Preparing coffee-mod (2.0.2026)... done.",
        "Starting daemon: kaffeewatchd.",
        "jm@debian:~$ search --target android",
        "ERROR: Package 'android' not found in 2001 repository.",
        "TIP: Try searching for 'nokia_3310_emulator' or 'palm_pilot_sync'.",
        "jm@debian:~$"
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
        lineHeight: "1.4",
        color: "#00ff41",
        textShadow: "0 0 5px rgba(0, 255, 65, 0.7)",
        whiteSpace: "pre-wrap"
      },
      cursorClass: "linux-cursor"
    },

    /** Retro-Installer: dpkg (historisch, ~2000), nicht apt-get. Pakete + Kaffee mit Rollback, wie Mac. */
    installer: {
      firstLine: "jm@debian:~$ sudo dpkg -i jürgen-mann.deb",
      aptIntro: [
        "Vorbereiten zum Entpacken von jürgen-mann.deb ...",
        "Entpacken von jürgen-mann (2.0-1) ...",
        "Richte jürgen-mann (2.0-1) ein ..."
      ],
      progressFill: "*",   /* Linux: Sternchen; Mac hat Balken */
      progressEmpty: ".",
      progressLength: 30,
      packages: [
        "✓ ui-ux-modul",
        "✓ xcode-toolchain",
        "✓ firebase-sdk",
        "✓ android-sdk"
      ],
      installComplete: "✓ Installation abgeschlossen",
      coffeeLabel: "⟳ kaffeemaschine-integration",
      coffeeErrorAt: 72,
      coffeeErrors: [
        "✗ FEHLER: Wassertank leer",
        "✗ FEHLER: Kaffee vergessen",
        "✗ FEHLER: Maschine war aus."
      ],
      coffeeGags: [
        "✗ FEHLER: Fehler konnte bei Beobachtung nicht reproduziert werden. Quantenstatus instabil.",
        "✗ Empfehlung: Systemneustart durchführen. Haben Sie das Stromkabel bereits einmal ein- und ausgesteckt?",
        "✗ WARNUNG: Entfernen des Kommentars in Zeile 42 führt zu instabiler Architektur. Bitte hängen Sie das Poster wieder auf.",
        "✗ Status: Installation auf Entwickler-Rechner erfolgreich. Lokale Realität weicht von Server-Umgebung ab.",
        "✗ Lade Modul: Salami-Interoperabilität... FEHLER: Käserand fehlt. Installation pausiert bis zum Eintreffen des Lieferdienstes.",
        "✗ Status: Warte auf Bestätigung der Gummiente... Ente sagt: 'Quak'. Fortfahren."
      ],
      coffeeSuccess: "✓ kaffeemaschine (HTML aktivieren)",
      coffeeReady: "✓ Kaffee ist fertig.",
      kioskLabel: "✓ kiosk-mode",
      kioskMessage: "✓ Kiosk-Modus aktiv – Klick oder Taste = Vollbild.",
      successLine: "✓ SUCCESS: Installation complete",
      warningTitle: "⚠️  WARNUNG: Paket enthält:",
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
