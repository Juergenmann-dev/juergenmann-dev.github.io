/**
 * platform-copy-data.js – systemspezifische Sprache + Shortcuts pro Gerät (Mac, Win, Linux, Android, iPhone).
 * Eine Quelle – jedes Erlebnis einzigartig, Nutzer erkennen sich wieder (Terminal, echo/print/Log.d, Progressbar, Erfolgsmeldung, Install-Befehl).
 * Nach dem Einbinden: window.PLATFORM_COPY
 */
(function () {
  "use strict";

  window.PLATFORM_COPY = {
    mac: {
      device: "Mac",
      terminal: "Terminal",
      terminalOpen: "Terminal öffnen",
      output: "print",
      outputPrefix: "print(\"",
      outputSuffix: "\")",
      installCmd: "brew install jürgen-mann",
      prompt: "jm@Mac lebenslauf %",
      firstLine: "$ brew install jürgen-mann",
      progressbar: { fill: "█", empty: "░" },
      successMessage: "✓ Coffee is ready.",
      installComplete: "✓ packages installed",
      spotlight: "Spotlight",
      spotlightPlaceholder: "Spotlight-Suche",
      boot: "Boot",
      install: "Installieren",
      dockIcon: ">_",
      shortcuts: {
        spotlight: "⌘ + Leertaste",
        spotlightKeys: ["⌘", "Leertaste"]
      }
    },

    win: {
      device: "Windows",
      terminal: "Eingabeaufforderung",
      terminalShort: "CMD",
      terminalOpen: "Eingabeaufforderung öffnen",
      output: "echo",
      outputPrefix: "echo \"",
      outputSuffix: "\"",
      installCmd: "winget install jürgen-mann",
      prompt: "C:\\Users\\jm\\lebenslauf>",
      firstLine: "C:\\Users\\jm> winget install jürgen-mann",
      progressbar: { fill: "=", empty: "-" },
      successMessage: "✓ Kaffee ist fertig.",
      installComplete: "✓ Installation abgeschlossen",
      startMenu: "Start",
      boot: "Boot",
      install: "Installieren",
      runDialog: "Ausführen",
      shortcuts: {
        run: "Win + R",
        runKeys: ["Win", "R"]
      }
    },

    linux: {
      device: "Linux",
      terminal: "Konsole",
      terminalOpen: "Konsole öffnen",
      output: "echo",
      outputPrefix: "echo \"",
      outputSuffix: "\"",
      installCmd: "apt install jürgen-mann",
      prompt: "jm@DESKTOP-Mama-Papa:~$ ",
      firstLine: "jm@DESKTOP-Mama-Papa:~$ apt install jürgen-mann",
      progressbar: { fill: "█", empty: "░" },
      successMessage: "✓ Kaffee ist fertig.",
      installComplete: "✓ Installation abgeschlossen",
      boot: "Boot",
      install: "Installieren",
      shortcuts: {
        terminal: "Strg + Alt + T",
        terminalKeys: ["Strg", "Alt", "T"]
      }
    },

    android: {
      device: "Android",
      terminal: null,
      output: "Log.d",
      outputPrefix: "Log.d(\"CV\", \"",
      outputSuffix: "\")",
      installCmd: "pm install jürgen-mann",
      prompt: "shell>$ ",
      firstLine: "shell>$ pm install jürgen-mann",
      progressbar: { fill: "█", empty: "░" },
      successMessage: "✓ Coffee is ready.",
      installComplete: "✓ Installation abgeschlossen",
      install: "Installieren",
      packageInstall: "Paketinstallation",
      installProgress: "Installiere...",
      shortcuts: {}
    },

    iphone: {
      device: "iPhone",
      terminal: null,
      output: "print",
      outputPrefix: "print(\"",
      outputSuffix: "\")",
      installCmd: "ideviceinstaller -i jürgen-mann.ipa",
      prompt: "iphone@iOS % ",
      firstLine: "iphone@iOS % ideviceinstaller -i jürgen-mann.ipa",
      progressbar: { fill: "█", empty: "░" },
      successMessage: "✓ Coffee is ready.",
      installComplete: "✓ Install complete",
      restore: "Wiederherstellen",
      ipsw: ".ipsw",
      ipa: ".ipa",
      dfu: "DFU",
      install: "Installieren",
      shortcuts: {}
    }
  };
})();
