/**
 * Aqua_mac_data.js – Mac OS X 10.0 „Aqua“-Terminal.
 * Statisches Aqua-Template (Pinstripes, Glas-Buttons, tcsh-Prompt).
 * Nach dem Einbinden: window.AQUA_MAC_DATA
 *
 * Sprache umstellen: meta.language auf "en" setzen – dann nutzen Menü,
 * Fenstertitel und Hinweise automatisch die Texte aus menuBar.en.
 */
(function () {
  "use strict";

  window.AQUA_MAC_DATA = {
    meta: {
      title: "macOS Aqua Terminal",
      subtitle: "Mac OS X 10.0 · Darwin · tcsh",
      promptExample: "[localhost:~] user%",
      cols: 80,
      rows: 18,
      language: "de"
    },
    header: {
      title: "Terminal — tcsh — 80x18",
      buttons: [
        { id: "close", color: "red" },
        { id: "minimize", color: "yellow" },
        { id: "maximize", color: "green" }
      ]
    },
    initialLines: [
      "Letzte Anmeldung: Sa 24. Mär 2001 auf tty000",
      "Willkommen bei Darwin!",
      "[localhost:~] user%"
    ],
    cursor: {
      type: "block",
      className: "aqua-cursor",
      blinkMs: 1000
    },
    /** Menüleiste / UI-Texte je nach meta.language (z. B. "de") */
    menuBar: {
      de: {
        finder: "Finder",
        file: "Ablage",
        edit: "Bearbeiten",
        view: "Ansicht",
        go: "Gehe zu",
        window: "Fenster",
        help: "Hilfe",
        utilities: "Diensteprogramme",
        applications: "Programme",
        home: "Startseite",
        computer: "Computer",
        finderHint: "Umschalt+⌘+U → Diensteprogramme → Terminal"
      },
      en: {
        finder: "Finder",
        file: "File",
        edit: "Edit",
        view: "View",
        go: "Go",
        window: "Window",
        help: "Help",
        utilities: "Utilities",
        applications: "Applications",
        home: "Home",
        computer: "Computer",
        finderHint: "Shift+⌘+U → Utilities → Terminal"
      }
    },
    cssHints: {
      windowClass: "term-mac-aqua",
      window: {
        background: "#ffffff",
        pinstripes: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px) / 100% 3px",
        border: "1px solid #888",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        color: "#000000",
        fontFamily: "\"Monaco\", \"Courier New\", monospace",
        fontSize: "12px"
      },
      headerClass: "aqua-header",
      header: {
        height: "25px",
        background: "linear-gradient(to bottom, #e0e0e0, #b0b0b0)",
        borderBottom: "1px solid #888",
        padding: "0 10px",
        borderRadius: "8px 8px 0 0"
      },
      buttonClass: "aqua-btn",
      buttons: {
        size: "12px",
        boxShadow:
          "inset 0 1px 3px rgba(255,255,255,0.8), 0 1px 1px rgba(0,0,0,0.3)",
        border: "1px solid rgba(0,0,0,0.2)",
        red: "radial-gradient(circle at 4px 4px, #ff8080, #cc0000)",
        yellow: "radial-gradient(circle at 4px 4px, #ffff80, #cccc00)",
        green: "radial-gradient(circle at 4px 4px, #80ff80, #00cc00)"
      },
      cursorClass: "aqua-cursor"
    },
    /** Retro-Installer (wie damals: kein brew, installer -pkg / Fink / Skript). 1:1 wie v1, aber alte Befehle + deutsche Meldungen. */
    installer: {
      /** Erste Zeile: Prompt + Befehl (Mac OS X vor Homebrew: installer -pkg oder Skript) */
      firstLine: "MacBook-Air:~ jm$ sudo installer -pkg jürgen-mann.pkg -target /",
      progressFill: "█",
      progressEmpty: "░",
      progressLength: 30,
      /** Vier Pakete 0→15, 15→30, 30→45, 45→60 % */
      packages: [
        "✓ ui-ux-modul",
        "✓ xcode-toolchain",
        "✓ firebase-sdk",
        "✓ android-sdk"
      ],
      installComplete: "✓ Installation abgeschlossen",
      /** Coffee-Maker-Gag: Label, Fehlermeldungen, Erfolg, Kiosk */
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

