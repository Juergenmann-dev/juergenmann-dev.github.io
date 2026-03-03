/**
 * detection.js – zentrale Geräte-/OS-Erkennung für 2_mac, 2.1_win, 2.3_linux.
 * Eine Quelle für User-Agent-Auswertung und gerätespezifische F12/Debug-Hinweise.
 * Nach dem Einbinden: window.DETECTION
 */
(function () {
  "use strict";

  var ua = typeof navigator !== "undefined" ? (navigator.userAgent || "") : "";

  var osLabel = "Unbekannt";
  var osKey = "default";

  if (ua.indexOf("Android") !== -1) {
    osLabel = "Android";
    osKey = "android";
  } else if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) {
    osLabel = "iOS";
    osKey = "ios";
  } else if (ua.indexOf("Win") !== -1) {
    osLabel = "Windows";
    osKey = "win";
  } else if (ua.indexOf("Mac") !== -1) {
    osLabel = "macOS";
    osKey = "mac";
  } else if (ua.indexOf("Linux") !== -1) {
    osLabel = "Linux";
    osKey = "linux";
  }

  var debugHints = {
    mac: "DevTools: Cmd+Option+I (oder Cmd+Option+J für Konsole).",
    win: "Entwicklertools: F12 oder Strg+Shift+I.",
    linux: "Entwicklertools: F12 oder Strg+Shift+I.",
    android: "Remote Debugging z.B. chrome://inspect (Chrome) oder USB-Debugging.",
    ios: "Safari: Einstellungen → Erweitert → Web-Inspektor; am Rechner Safari → Entwickler.",
    default: "Entwicklertools: F12 oder Kontextmenü → Untersuchen."
  };

  window.DETECTION = {
    osLabel: osLabel,
    osKey: osKey,
    isMac: osKey === "mac",
    isWin: osKey === "win",
    isLinux: osKey === "linux",
    isAndroid: osKey === "android",
    isIOS: osKey === "ios",
    isMobile: osKey === "android" || osKey === "ios",
    userAgent: ua,
    debugHints: debugHints,
    /** Aktuellen F12-Hinweis für dieses Gerät holen */
    getDebugHint: function () {
      return debugHints[osKey] || debugHints.default;
    },
    /** Konsolen-Easter-Egg pro Plattform (einmal pro Session) */
    runConsoleSequence: runConsoleSequence
  };

  function runConsoleSequence() {
    if (window.consoleFired) return;
    window.consoleFired = true;

    var GREEN = "#39D353";
    var RED = "#FF3B30";

    console.log("%c ⚠️ ERROR 404: BUGS NOT FOUND ",
      "background:" + RED + "; color:white; font-size:18px; font-weight:bold; padding:6px 12px; border-radius:6px;");
    console.log("%cHey Erdling 👋",
      "color:" + GREEN + "; font-size:20px; font-weight:bold; font-family:monospace;");

    if (osKey === "mac") {
      console.group("%c[macOS Diagnostics]", "color: #A1A1A6; font-weight: bold;");
      console.error("🔴 EXC_BAD_ACCESS (code=1, address=0x0)");
      console.log("fatal error: unexpectedly found nil while unwrapping an Optional 'Experience' value.");
      console.log("%cTip: Jürgen Mann is thread-safe and ready for production.", "color: #00a1ff; font-style: italic;");
      console.groupEnd();
    } else if (osKey === "ios") {
      console.error("🚫 SecurityPolicy Violation: Unknown .ipa detected.");
      console.warn("⚠️ SpringBoard glitched: Attempting to render 1995 UI on Retina Display.");
      console.log("%cExtracting jm_core.ipsw... [Done]", "color: #8E8E93;");
      console.log("%cTry to catch me? I'm already in DFU mode.", "color: #FF375F; font-weight: bold;");
    } else if (osKey === "win") {
      console.log("%c C:\\> FATAL ERROR: SYSTEM.INI IS CORRUPT ", "background: #000080; color: #ffffff; font-weight: bold; padding: 4px;");
      console.log("Der Befehl 'Sicherheit' ist entweder falsch geschrieben oder konnte nicht gefunden werden.");
      console.warn("Standard-Fehler: User hat F12 gedrückt. Starte Schutzprotokoll...");
    } else if (osKey === "linux") {
      console.log("%c [ 0.000000] Kernel panic - not syncing: VFS: Unable to mount jm_resume ", "color: #00ff41; background: #050505;");
      console.error("❌ sudo: /dev/hr_manager: permission denied. Try 'sudo hire jm'.");
      console.log("jm@debian:~$ grep -r \"talent\" /world/");
    } else if (osKey === "android") {
      console.log("%c D/NotificationService: New personal message from JM received. ", "color: #3ddc84; font-weight: bold;");
      console.error("E/AndroidRuntime: Process: com.jm.resume, PID: 1337. Unexpectedly smart developer found.");
      console.warn("W/BatteryStats: Energy drain high: Resume is too interactive for your screen.");
    } else {
      console.log("%c[Unbekannte Plattform] DevTools geöffnet – willkommen im Code.", "color: #8E8E93;");
    }

    if (typeof console.groupCollapsed === "function") {
      console.groupCollapsed("%cSYSTEM CHECK", "color:" + GREEN + "; font-weight:900; letter-spacing:0.06em;");
      console.log("%cSTATE   → aktuell stabil", "color:" + GREEN + "; font-weight:800;");
      console.log("%cCONTEXT → browser runtime", "color:" + GREEN + "; font-weight:800;");
      console.log("%cSHIP    → releasefähig", "color:" + GREEN + "; font-weight:800;");
      console.groupEnd();
    }
  }

  /* Lazy Trigger: Getter wird erst ausgeführt, wenn die Konsole das Objekt anzeigt → 0 % CPU, solange Konsole zu bleibt */
  var spy = {};
  Object.defineProperty(spy, "▶ Konsole", {
    get: function () {
      runConsoleSequence();
      return "Status: Monitoring active.";
    },
    enumerable: true
  });

  if (typeof console !== "undefined" && console.log) {
    console.log(spy);
  }

  /* F12: Sequenz erneut auslösen (consoleFired wird zurückgesetzt) */
  function onF12(e) {
    if (e.key !== "F12") return;
    if (window.DETECTION && window.DETECTION.runConsoleSequence) {
      window.consoleFired = false;
      window.DETECTION.runConsoleSequence();
    } else {
      console.log("[Jürgen Mann – Dev-Hinweis] " + (window.DETECTION ? window.DETECTION.getDebugHint() : "F12 für Entwicklertools."));
    }
  }

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("keydown", onF12, false);
  }
})();
