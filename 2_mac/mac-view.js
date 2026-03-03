/**
 * Mac-View V2 – Boot, Menü-Animation, Story, Retro-Installer, Musik/Titel, Redirect.
 * Erwartet: BOOT_DATA, AQUA_MAC_DATA, MAC_TERMINAL_STORY (aus data.js).
 */
(function () {
  "use strict";

  var bootLines = (window.BOOT_DATA && window.BOOT_DATA.macLines) || [];
  var storyScript = (window.MAC_TERMINAL_STORY) || [];
  var aquaMeta = (window.AQUA_MAC_DATA && window.AQUA_MAC_DATA.meta) || { cols: 80, rows: 18 };

  var bootContainer = document.getElementById("boot-container");
  var bootLog = document.getElementById("boot-log");
  var aquaStage = document.getElementById("aqua-stage");
  var terminalWindow = document.getElementById("terminal-window");
  var output = document.getElementById("output");
  var flowTrack = document.getElementById("flow-track");
  var macMenuBar = document.getElementById("mac-menu-bar");
  var macDock = document.getElementById("mac-dock");
  var finderUtilities = document.getElementById("finder-utilities");
  var desktopIcons = document.getElementById("desktop-icons");
  var goDropdown = document.getElementById("go-dropdown");
  var goMenuUtilities = document.getElementById("go-menu-utilities");
  var menuTriggerGo = document.getElementById("menu-trigger-go");
  var finderIconTerminal = document.getElementById("finder-icon-terminal");
  var retroWidgetPanel = document.getElementById("retro-widget-panel");
  var widgetToggleWrap = document.getElementById("widget-toggle-wrap");
  var widgetToggleAlt = document.getElementById("widget-toggle-alt");
  var widgetToggleNeu = document.getElementById("widget-toggle-neu");

  /** Widget Alt/Neu: Persistenz + Toggle (nur V2, unabhängig von V1). */
  function initWidgetToggle() {
    try {
      var v = sessionStorage.getItem("macWidgetVariant");
      if (v === "neu") {
        document.body.classList.add("widget-modern");
        if (widgetToggleAlt) widgetToggleAlt.setAttribute("aria-pressed", "false");
        if (widgetToggleNeu) widgetToggleNeu.setAttribute("aria-pressed", "true");
      } else {
        document.body.classList.remove("widget-modern");
        if (widgetToggleAlt) widgetToggleAlt.setAttribute("aria-pressed", "true");
        if (widgetToggleNeu) widgetToggleNeu.setAttribute("aria-pressed", "false");
      }
    } catch (e) {}
    if (widgetToggleAlt) {
      widgetToggleAlt.addEventListener("click", function () {
        document.body.classList.remove("widget-modern");
        if (widgetToggleAlt) widgetToggleAlt.setAttribute("aria-pressed", "true");
        if (widgetToggleNeu) widgetToggleNeu.setAttribute("aria-pressed", "false");
        try { sessionStorage.setItem("macWidgetVariant", "alt"); } catch (e) {}
      });
    }
    if (widgetToggleNeu) {
      widgetToggleNeu.addEventListener("click", function () {
        document.body.classList.add("widget-modern");
        if (widgetToggleAlt) widgetToggleAlt.setAttribute("aria-pressed", "false");
        if (widgetToggleNeu) widgetToggleNeu.setAttribute("aria-pressed", "true");
        try { sessionStorage.setItem("macWidgetVariant", "neu"); } catch (e) {}
      });
    }
  }
  initWidgetToggle();

  /** Terminal-Easter-Eggs: theme --dark / theme --light / coffee (Eingabezeile). */
  function initTerminalEasterEggs() {
    var cmdInput = document.getElementById("terminal-cmd-input");
    if (!cmdInput || !output) return;
    var promptStr = "MacBook-Air:~ jm$ ";

    function appendLine(text, className) {
      var div = document.createElement("div");
      if (className) div.className = className;
      div.textContent = text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    }

    function handleCommand(cmd) {
      var c = (cmd || "").trim().toLowerCase();
      if (c === "theme --dark") {
        document.body.classList.add("desktop-dark");
        return "Desktop auf Dark Mode gestellt.";
      }
      if (c === "theme --light") {
        document.body.classList.remove("desktop-dark");
        return "Desktop wieder hell.";
      }
      if (c === "coffee" || c === "kaffee") {
        return "☕ Kaffee-Modul bereits installiert. Genieß deinen Kaffee!";
      }
      if (c === "help" || c === "hilfe") {
        return "Easter Eggs: theme --dark, theme --light, coffee";
      }
      return "Befehl nicht gefunden: " + (cmd || "(leer)").trim();
    }

    cmdInput.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var cmd = cmdInput.value;
      cmdInput.value = "";
      appendLine(promptStr + cmd, "line");
      var result = handleCommand(cmd);
      appendLine(result, "response");
    });
  }
  initTerminalEasterEggs();

  /** Terminal-Fenster per Titelleiste verschiebbar. */
  function initTerminalDrag() {
    var handle = document.getElementById("terminal-drag-handle");
    if (!handle || !terminalWindow) return;
    var drag = { active: false, startX: 0, startY: 0, startTx: 0, startTy: 0 };
    terminalWindow.style.cursor = "default";
    handle.style.cursor = "move";

    handle.addEventListener("mousedown", function (e) {
      if (e.button !== 0) return;
      drag.active = true;
      drag.startX = e.clientX;
      drag.startY = e.clientY;
      var t = terminalWindow.style.transform || "";
      var m = t.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
      drag.startTx = m ? parseFloat(m[1]) : 0;
      drag.startTy = m ? parseFloat(m[2]) : 0;
    });

    window.addEventListener("mousemove", function (e) {
      if (!drag.active) return;
      var dx = e.clientX - drag.startX;
      var dy = e.clientY - drag.startY;
      terminalWindow.style.transform = "translate(" + (drag.startTx + dx) + "px, " + (drag.startTy + dy) + "px)";
    });

    window.addEventListener("mouseup", function () {
      drag.active = false;
    });
  }
  initTerminalDrag();

  /** Genie-Effekt: Gelb minimiert ins Dock, Klick auf Dock-Terminal stellt wieder her. */
  function initTerminalGenie() {
    var btnYellow = document.getElementById("terminal-btn-yellow");
    var dockTerminal = document.getElementById("dock-item-terminal");
    if (!btnYellow || !dockTerminal || !terminalWindow) return;

    btnYellow.addEventListener("click", function (e) {
      e.stopPropagation();
      if (terminalWindow.classList.contains("terminal-minimized")) return;
      terminalWindow.classList.remove("terminal-genie-restoring");
      terminalWindow.classList.add("terminal-genie-minimizing");
      setTimeout(function () {
        terminalWindow.classList.remove("terminal-genie-minimizing");
        terminalWindow.classList.add("terminal-minimized");
        dockTerminal.classList.add("has-window");
        document.body.classList.add("terminal-is-minimized");
      }, 500);
    });

    dockTerminal.addEventListener("click", function (e) {
      if (!terminalWindow.classList.contains("terminal-minimized")) return;
      e.preventDefault();
      e.stopPropagation();
      dockTerminal.classList.remove("has-window");
      document.body.classList.remove("terminal-is-minimized");
      terminalWindow.classList.remove("terminal-minimized");
      terminalWindow.classList.add("terminal-genie-restoring");
      setTimeout(function () {
        terminalWindow.classList.remove("terminal-genie-restoring");
      }, 500);
    });
  }
  initTerminalGenie();

  if (terminalWindow && aquaMeta) {
    terminalWindow.style.width = (aquaMeta.cols || 80) + "ch";
    output.style.height = "calc(1.4em * " + (aquaMeta.rows || 18) + ")";
  }

  var macLang = (window.AQUA_MAC_DATA && window.AQUA_MAC_DATA.meta && window.AQUA_MAC_DATA.meta.language) || "de";
  var macUI = (window.AQUA_MAC_DATA && window.AQUA_MAC_DATA.menuBar && window.AQUA_MAC_DATA.menuBar[macLang]) || (window.AQUA_MAC_DATA && window.AQUA_MAC_DATA.menuBar && window.AQUA_MAC_DATA.menuBar.de);
  if (macUI) {
    function set(id, key) {
      var el = document.getElementById(id);
      if (el && macUI[key]) el.textContent = macUI[key];
    }
    set("menu-trigger-finder", "finder");
    set("menu-trigger-file", "file");
    set("menu-trigger-edit", "edit");
    set("menu-trigger-view", "view");
    set("menu-trigger-go", "go");
    set("go-row-applications", "applications");
    set("go-menu-utilities", "utilities");
    set("go-row-home", "home");
    set("go-row-computer", "computer");
    set("menu-trigger-window", "window");
    set("menu-trigger-help", "help");
    set("finder-utilities-title", "utilities");
    var hintEl = document.getElementById("finder-utilities-hint");
    if (hintEl && macUI.finderHint) hintEl.textContent = macUI.finderHint;
    var dockFinder = document.getElementById("dock-item-finder");
    if (dockFinder && macUI.finder) dockFinder.textContent = macUI.finder;
  }

  /** Echte Systemzeit, Datum und Akku (soweit vom Browser bereitgestellt). Beide Widget-Ansichten (Retro + Modern) nutzen dieselben Werte. */
  function initLiveData() {
    var menuTime = document.getElementById("mac-menu-time");
    var widgetMonth = document.getElementById("widget-month");
    var widgetDay = document.getElementById("widget-day");
    var widgetWeekdayYear = document.getElementById("widget-weekday-year");
    var batteryFillMac = document.getElementById("battery-fill-mac");
    var batteryLabelMac = document.getElementById("battery-label-mac");
    var batteryFillKeyboard = document.getElementById("battery-fill-keyboard");
    var batteryLabelKeyboard = document.getElementById("battery-label-keyboard");
    var batteryFillMouse = document.getElementById("battery-fill-mouse");
    var batteryLabelMouse = document.getElementById("battery-label-mouse");
    var modernPctMac = document.getElementById("modern-battery-pct-mac");
    var modernFillMac = document.getElementById("modern-battery-fill-mac");
    var modernPctKeyboard = document.getElementById("modern-battery-pct-keyboard");
    var modernFillKeyboard = document.getElementById("modern-battery-fill-keyboard");
    var modernPctMouse = document.getElementById("modern-battery-pct-mouse");
    var modernFillMouse = document.getElementById("modern-battery-fill-mouse");

    var monthNames = ["JANUAR", "FEBRUAR", "MÄRZ", "APRIL", "MAI", "JUNI", "JULI", "AUGUST", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DEZEMBER"];
    var weekdayShort = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];

    function updateTime() {
      if (!menuTime) return;
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      menuTime.textContent = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
    }

    function updateDate() {
      var d = new Date();
      if (widgetMonth) widgetMonth.textContent = monthNames[d.getMonth()];
      if (widgetDay) widgetDay.textContent = (d.getDate() < 10 ? "0" : "") + d.getDate();
      if (widgetWeekdayYear) widgetWeekdayYear.textContent = weekdayShort[d.getDay()] + " · " + d.getFullYear();
    }

    function setBatteryFill(el, pct) {
      if (!el) return;
      var val = Math.max(0, Math.min(100, pct));
      el.style.width = val + "%";
      el.classList.remove("battery-ok", "battery-mid", "battery-low");
      if (val >= 60) el.classList.add("battery-ok");
      else if (val >= 30) el.classList.add("battery-mid");
      else el.classList.add("battery-low");
    }

    function setModernBatteryRing(fillEl, pct) {
      if (!fillEl) return;
      if (pct == null || typeof pct !== "number" || isNaN(pct)) {
        fillEl.className = "battery-fill";
        fillEl.style.background = "transparent";
        return;
      }
      var val = Math.max(0, Math.min(100, pct));
      fillEl.className = "battery-fill";
      if (val <= 0) {
        fillEl.style.background = "transparent";
      } else {
        var angle = (val / 100) * 360;
        fillEl.style.background =
          "conic-gradient(rgba(255, 255, 255, 0.85) 0deg " +
          angle +
          "deg, transparent " +
          angle +
          "deg 360deg)";
      }
    }

    function setModernBatteryPct(pctEl, pct) {
      if (!pctEl) return;
      pctEl.textContent = (pct != null && pct >= 0) ? pct + " %" : "—";
    }

    function applyModernBattery(macPct, kbPct, mousePct) {
      setModernBatteryRing(modernFillMac, macPct);
      setModernBatteryPct(modernPctMac, macPct);
      setModernBatteryRing(modernFillKeyboard, kbPct);
      setModernBatteryPct(modernPctKeyboard, kbPct);
      setModernBatteryRing(modernFillMouse, mousePct);
      setModernBatteryPct(modernPctMouse, mousePct);
    }

    updateTime();
    updateDate();
    if (menuTime) setInterval(updateTime, 60000);

    /* Tastatur und Maus: einheitliche Fallback-Werte für beide Widgets (50–70%) */
    var keyboardPct = 50 + Math.floor(Math.random() * 21);
    var mousePct = 50 + Math.floor(Math.random() * 21);
    setBatteryFill(batteryFillKeyboard, keyboardPct);
    if (batteryLabelKeyboard) batteryLabelKeyboard.textContent = "Tastatur " + keyboardPct + "%";
    setBatteryFill(batteryFillMouse, mousePct);
    if (batteryLabelMouse) batteryLabelMouse.textContent = "Apple Mouse " + mousePct + "%";
    applyModernBattery(undefined, keyboardPct, mousePct);

    /* Mac: echte Abfrage wenn möglich, sonst Fallback 80%. Danach Modern-Widget mit allen drei Werten aktualisieren. */
    function syncModernBattery(macPct) {
      applyModernBattery(macPct, keyboardPct, mousePct);
    }

    function setMacFallback() {
      setBatteryFill(batteryFillMac, 80);
      if (batteryLabelMac) batteryLabelMac.textContent = "Mac 80%";
      syncModernBattery(80);
    }

    if (navigator.getBattery) {
      navigator.getBattery().then(function (b) {
        function updateMacBattery() {
          var pct = Math.round(b.level * 100);
          setBatteryFill(batteryFillMac, pct);
          if (batteryLabelMac) batteryLabelMac.textContent = "Mac " + pct + "%";
          syncModernBattery(pct);
        }
        updateMacBattery();
        b.addEventListener("levelchange", updateMacBattery);
      }).catch(function () {
        setMacFallback();
      });
    } else {
      setMacFallback();
    }
  }

  function sleep(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
  }

  function addLine(out, text, delay, type) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var div = document.createElement("div");
        div.className = (type === "error" || (text && String(text).trim().indexOf("✗") === 0)) ? "error-msg" : "install-line";
        div.textContent = text;
        out.appendChild(div);
        out.scrollTop = out.scrollHeight;
        resolve();
      }, delay);
    });
  }

  function animateProgressBar(out, startPercent, endPercent, label, errorAt, cfg) {
    var row = document.createElement("div");
    row.className = "progress-row";
    var bar = document.createElement("div");
    bar.className = "progress-bar";
    var fill = document.createElement("div");
    fill.className = "fill";
    fill.style.width = startPercent + "%";
    bar.appendChild(fill);
    var percent = document.createElement("span");
    percent.className = "percent";
    percent.textContent = startPercent + "%";
    var status = document.createElement("span");
    status.className = "status";
    status.textContent = label && startPercent > 0 ? label : "";
    row.appendChild(bar);
    row.appendChild(percent);
    row.appendChild(status);
    out.appendChild(row);
    return new Promise(function (resolve) {
      var current = startPercent;
      function tick() {
        fill.style.width = current + "%";
        percent.textContent = current + "%";
        if (label && current > startPercent) status.textContent = label;
        out.scrollTop = out.scrollHeight;
      }
      var interval = setInterval(function () {
        if (current < endPercent) {
          current = Math.min(current + 1, endPercent);
          if (current % 2 === 0 || current === endPercent) tick();
          if (errorAt != null && current === errorAt) {
            clearInterval(interval);
            tick();
            setTimeout(function () { resolve("error"); }, 500);
            return;
          }
          if (current === endPercent) {
            clearInterval(interval);
            tick();
            setTimeout(function () { resolve("success"); }, 300);
          }
        }
      }, 50);
    });
  }

  function animateRollback(out, fromPercent, toPercent, cfg) {
    var suffix = (cfg && cfg.rollbackSuffix) || " (Rollback)";
    var row = document.createElement("div");
    row.className = "progress-row";
    var bar = document.createElement("div");
    bar.className = "progress-bar";
    var fill = document.createElement("div");
    fill.className = "fill";
    fill.style.width = fromPercent + "%";
    bar.appendChild(fill);
    var percent = document.createElement("span");
    percent.className = "percent";
    percent.textContent = fromPercent + "%";
    var status = document.createElement("span");
    status.className = "status";
    status.textContent = suffix;
    row.appendChild(bar);
    row.appendChild(percent);
    row.appendChild(status);
    out.appendChild(row);
    return new Promise(function (resolve) {
      var current = fromPercent;
      function tick() {
        fill.style.width = current + "%";
        percent.textContent = current + "%";
        out.scrollTop = out.scrollHeight;
      }
      var interval = setInterval(function () {
        if (current > toPercent) {
          current = Math.max(current - 2, toPercent);
          if (current % 2 === 0 || current === toPercent) tick();
          if (current === toPercent) {
            clearInterval(interval);
            setTimeout(resolve, 400);
          }
        }
      }, 40);
    });
  }

  function runRetroInstallation() {
    var cfg = (window.AQUA_MAC_DATA && window.AQUA_MAC_DATA.installer) || {};
    output.classList.add("terminal", "terminal-installer");
    return Promise.resolve().then(function () {
      return addLine(output, "", 400);
    }).then(function () {
      var pkg = cfg.packages || ["✓ ui-ux-modul", "✓ xcode-toolchain", "✓ firebase-sdk", "✓ android-sdk"];
      return animateProgressBar(output, 0, 15, pkg[0], null, cfg);
    }).then(function () {
      return addLine(output, "", 250);
    }).then(function () {
      var pkg = cfg.packages || [];
      return animateProgressBar(output, 15, 30, pkg[1] || "✓ xcode-toolchain", null, cfg);
    }).then(function () {
      return addLine(output, "", 250);
    }).then(function () {
      var pkg = cfg.packages || [];
      return animateProgressBar(output, 30, 45, pkg[2] || "✓ firebase-sdk", null, cfg);
    }).then(function () {
      return addLine(output, "", 250);
    }).then(function () {
      var pkg = cfg.packages || [];
      return animateProgressBar(output, 45, 60, pkg[3] || "✓ android-sdk", null, cfg);
    }).then(function () {
      return addLine(output, "", 250);
    }).then(function () {
      return addLine(output, cfg.installComplete || "✓ Installation abgeschlossen", 400);
    }).then(function () {
      return addLine(output, "", 400);
    }).then(function () {
      var coffeeLabel = cfg.coffeeLabel || "⟳ kaffeemaschine-integration";
      var errAt = cfg.coffeeErrorAt != null ? cfg.coffeeErrorAt : 72;
      var classics = (cfg.coffeeErrors || []).slice();
      if (classics.length < 2) classics = classics.concat(["✗ FEHLER: Wassertank leer", "✗ FEHLER: Kaffee vergessen", "✗ FEHLER: Maschine war aus."]);
      var gags = (cfg.coffeeGags || []).slice();
      var stromkabel = gags.filter(function (m) { return m.indexOf("Stromkabel") !== -1 || m.indexOf("ausgesteckt") !== -1; })[0];
      var otherGags = stromkabel ? gags.filter(function (m) { return m !== stromkabel; }) : [];
      var errors = (function pickTwoThenStromkabel() {
        var firstTwo = [];
        var useOneGag = otherGags.length > 0 && Math.random() < 0.5;
        if (useOneGag) {
          firstTwo.push(classics[Math.floor(Math.random() * classics.length)]);
          firstTwo.push(otherGags[Math.floor(Math.random() * otherGags.length)]);
          if (Math.random() < 0.5) firstTwo.reverse();
        } else {
          var c = classics.slice();
          for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
          firstTwo = c.slice(0, 2);
        }
        return firstTwo.concat(stromkabel || classics[classics.length - 1]);
      })();
      return animateProgressBar(output, 60, 80, coffeeLabel, errAt, cfg).then(function (r) {
        if (r === "error") {
          return sleep(800).then(function () { return addLine(output, errors[0], 400, "error"); })
            .then(function () { return addLine(output, "", 300); })
            .then(function () { return animateRollback(output, errAt, 60, cfg); })
            .then(function () { return addLine(output, "", 400); })
            .then(function () { return animateProgressBar(output, 60, 80, coffeeLabel, errAt, cfg); })
            .then(function () { return sleep(800).then(function () { return addLine(output, errors[1], 400, "error"); }); })
            .then(function () { return addLine(output, "", 300); })
            .then(function () { return animateRollback(output, errAt, 60, cfg); })
            .then(function () { return addLine(output, "", 400); })
            .then(function () { return animateProgressBar(output, 60, 80, coffeeLabel, errAt, cfg); })
            .then(function () { return sleep(800).then(function () { return addLine(output, errors[2], 400, "error"); }); })
            .then(function () { return addLine(output, "", 300); })
            .then(function () { return animateRollback(output, errAt, 60, cfg); })
            .then(function () { return addLine(output, "", 400); });
        }
      });
    }).then(function () {
      return animateProgressBar(output, 60, 100, cfg.coffeeSuccess || "✓ kaffeemaschine (HTML aktivieren)", null, cfg);
    }).then(function () {
      return addLine(output, "", 400);
    }).then(function () {
      return addLine(output, cfg.coffeeReady || "✓ Kaffee ist fertig.", 600);
    }).then(function () {
      return addLine(output, "", 300);
    }).then(function () {
      return animateProgressBar(output, 0, 100, cfg.kioskLabel || "✓ kiosk-mode", null, cfg);
    }).then(function () {
      return addLine(output, cfg.kioskMessage || "✓ Kiosk-Modus aktiv – Klick oder Taste = Vollbild.", 500);
    }).then(function () {
      return addLine(output, "", 300);
    }).then(function () {
      return addLine(output, cfg.successLine || "✓ SUCCESS: Installation complete", 800);
    }).then(function () {
      return addLine(output, "", 500);
    }).then(function () {
      return addLine(output, cfg.warningTitle || "⚠️  WARNUNG: Paket enthält:", 500);
    }).then(function () {
      var bullets = cfg.warningBullets || [];
      var p = Promise.resolve();
      bullets.forEach(function (b) {
        p = p.then(function () { return addLine(output, b, 300); });
      });
      return p;
    }).then(function () {
      return addLine(output, "", 500);
    }).then(function () {
      return addLine(output, cfg.readyLine || "Bereit für deine Erwartungen.", 700);
    }).then(function () {
      return addLine(output, "", 600);
    });
  }

  function addBootLine(text, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var div = document.createElement("div");
        div.textContent = text;
        bootLog.appendChild(div);
        if (bootContainer) bootContainer.scrollTop = bootContainer.scrollHeight;
        resolve();
      }, delay || 350);
    });
  }

  function playBoot() {
    var perLine = 45;
    var osLabel = (window.DETECTION && window.DETECTION.osLabel) || "Unbekannt";
    if (bootContainer) bootContainer.scrollTop = 0;
    return addBootLine("Systemstatus wird abgefragt", 400)
      .then(function () { return addBootLine("OS erkannt – " + osLabel, 500); })
      .then(function () { return addBootLine("Bereite Bootvorgang vor", 500); })
      .then(function () { return addBootLine("", 350); })
      .then(function () { return sleep(400); })
      .then(function () { return addBootLine("", 200); })
      .then(function () {
    return bootLines.reduce(function (prev, line) {
      return prev.then(function () {
        var div = document.createElement("div");
        div.textContent = line;
        bootLog.appendChild(div);
        if (bootContainer) bootContainer.scrollTop = bootContainer.scrollHeight;
        return sleep(perLine);
      });
    }, Promise.resolve()).then(function () {
      return sleep(600);
    }).then(function () {
      bootContainer.style.transition = "opacity 0.5s ease";
      bootContainer.style.opacity = "0";
      return sleep(520);
    }).then(function () {
      bootContainer.style.display = "none";
      document.documentElement.style.setProperty("--wallpaper", "url('Mac_hintergrund.png')");
      document.body.classList.add("retro-bg");
      if (macMenuBar) macMenuBar.style.visibility = "visible";
      if (macDock) macDock.style.visibility = "visible";
      if (retroWidgetPanel) retroWidgetPanel.style.visibility = "visible";
      if (widgetToggleWrap) widgetToggleWrap.style.visibility = "visible";
      if (desktopIcons) {
        desktopIcons.style.visibility = "visible";
        var volumeIcons = desktopIcons.querySelectorAll(".desktop-icon-volume");
        for (var i = 0; i < volumeIcons.length; i++) {
          (function (idx) {
            setTimeout(function () {
              volumeIcons[idx].style.opacity = "1";
            }, 600 + idx * 500);
          })(i);
        }
      }
      if (window.DETECTION && window.DETECTION.runConsoleSequence) window.DETECTION.runConsoleSequence();
      return sleep(500);
    }).then(function () {
      if (goDropdown) {
        goDropdown.classList.add("open");
        if (menuTriggerGo) menuTriggerGo.classList.add("open");
        return sleep(450);
      }
      return Promise.resolve();
    }).then(function () {
      if (goMenuUtilities) {
        goMenuUtilities.classList.add("highlight");
        return sleep(550);
      }
      return Promise.resolve();
    }).then(function () {
      if (goDropdown) goDropdown.classList.remove("open");
      if (menuTriggerGo) menuTriggerGo.classList.remove("open");
      if (goMenuUtilities) goMenuUtilities.classList.remove("highlight");
      return sleep(150);
    }).then(function () {
      if (finderUtilities) {
        finderUtilities.style.display = "block";
        finderUtilities.classList.remove("finder-fade-out");
        return sleep(700);
      }
      return Promise.resolve();
    }).then(function () {
      if (finderIconTerminal) {
        finderIconTerminal.classList.add("pressed");
        return sleep(180);
      }
      return Promise.resolve();
    }).then(function () {
      if (finderIconTerminal) {
        finderIconTerminal.classList.remove("pressed");
        return sleep(280);
      }
      return Promise.resolve();
    }).then(function () {
      if (finderUtilities) {
        finderUtilities.classList.add("finder-fade-out");
        return sleep(380);
      }
      return Promise.resolve();
    }).then(function () {
      if (finderUtilities) finderUtilities.style.display = "none";
      aquaStage.style.display = "flex";
      return sleep(500);
    });
  });
  }

  function playMacStory() {
    var welcome = document.createElement("div");
    welcome.className = "response";
    welcome.textContent = "Welcome to Darwin!";
    output.appendChild(welcome);
    var empty = document.createElement("div");
    empty.className = "install-line";
    empty.textContent = "";
    output.appendChild(empty);
    output.scrollTop = output.scrollHeight;

    var i = 0;
    function next() {
      if (i >= storyScript.length) {
        return askForMusicAndDeckblatt();
      }
      var step = storyScript[i++];
      if (step.type === "input") {
        var line = document.createElement("div");
        line.className = "line";
        var promptSpan = document.createElement("span");
        promptSpan.className = "prompt";
        promptSpan.textContent = step.prompt || "MacBook-Air:~ jm$ ";
        line.appendChild(promptSpan);
        var cmdSpan = document.createElement("span");
        line.appendChild(cmdSpan);
        output.appendChild(line);
        var cmd = step.cmd || "";
        var delayPerChar = step.delayPerCharMs || 45;
        function typeChar(idx) {
          if (idx >= cmd.length) {
            return sleep(step.delayAfterMs || 300).then(function () {
              if (cmd.trim() === "clear") output.innerHTML = "";
              return next();
            });
          }
          cmdSpan.textContent += cmd[idx];
          output.scrollTop = output.scrollHeight;
          return sleep(delayPerChar).then(function () { return typeChar(idx + 1); });
        }
        return typeChar(0);
      }
      if (step.type === "response") {
        var div = document.createElement("div");
        div.className = "response";
        output.appendChild(div);
        var text = (step.text || "");
        var j = 0;
        var charDelay = step.delayPerCharMs || 35;
        function typeResponse() {
          if (j >= text.length) {
            return sleep(step.delayAfterMs || 400).then(next);
          }
          div.textContent += text[j++];
          output.scrollTop = output.scrollHeight;
          return sleep(charDelay).then(typeResponse);
        }
        return typeResponse();
      }
      if (step.type === "glitch") {
        terminalWindow.classList.add("mac-glitch");
        return sleep(step.timeMs || 220).then(function () {
          terminalWindow.classList.remove("mac-glitch");
          return next();
        });
      }
      if (step.type === "story") {
        var div = document.createElement("div");
        div.className = "story-text";
        output.appendChild(div);
        var text = (step.text || "");
        var j = 0;
        function typeStory() {
          if (j >= text.length) {
            return sleep(step.delayAfterMs || 800).then(next);
          }
          div.textContent += text[j++];
          output.scrollTop = output.scrollHeight;
          return sleep(20).then(typeStory);
        }
        return typeStory();
      }
      if (step.type === "pause") {
        return sleep(step.timeMs || step.time || 400).then(next);
      }
      if (step.type === "run_retro_install") {
        return runRetroInstallation().then(function () {
          return sleep(step.delayAfterMs || 400);
        }).then(next);
      }
      return next();
    }
    return next();
  }

  function askForMusicAndDeckblatt() {
    return new Promise(function (resolve) {
      var line = document.createElement("div");
      line.className = "line";
      var promptSpan = document.createElement("span");
      promptSpan.className = "prompt";
      promptSpan.textContent = "MacBook-Air:~ jm$ ";
      line.appendChild(promptSpan);
      var cmdSpan = document.createElement("span");
      cmdSpan.textContent = "play_flow_mode";
      line.appendChild(cmdSpan);
      output.appendChild(line);

      var kioskLine = document.createElement("div");
      kioskLine.className = "response";
      kioskLine.textContent = "✓ Kiosk mode aktiv – Klick oder Taste = Vollbild.";
      output.appendChild(kioskLine);

      var question = document.createElement("div");
      question.className = "response";
      question.textContent = "Flow starten? [y/N]";
      output.appendChild(question);

      var optY = document.createElement("div");
      optY.className = "response terminal-choice";
      optY.textContent = "  [y] – Flow starten";
      output.appendChild(optY);
      var optN = document.createElement("div");
      optN.className = "response terminal-choice";
      optN.textContent = "  [n] – nicht jetzt";
      output.appendChild(optN);
      output.scrollTop = output.scrollHeight;

      function askForTitleVariant() {
        return new Promise(function (resolveTitle) {
          var q = document.createElement("div");
          q.className = "response";
          q.textContent = "Welchen Titel möchtest du hören? [1/2]";
          output.appendChild(q);

          var opt1 = document.createElement("div");
          opt1.className = "response terminal-choice";
          opt1.textContent = "  [1] – Zen Wind";
          output.appendChild(opt1);
          var opt2 = document.createElement("div");
          opt2.className = "response terminal-choice";
          opt2.textContent = "  [2] – Birds & Piano";
          output.appendChild(opt2);
          output.scrollTop = output.scrollHeight;

          function chooseTitle(key) {
            window.removeEventListener("keydown", titleKeyHandler);
            opt1.removeEventListener("click", click1);
            opt2.removeEventListener("click", click2);
            opt1.classList.add("chosen");
            opt2.classList.add("chosen");
            opt1.style.cursor = "default";
            opt2.style.cursor = "default";
            var track = key === "1" ? "zen" : "birds";
            try {
              sessionStorage.setItem("deckblattTitleVariant", key);
              sessionStorage.setItem("flowMusicContinue", track);
            } catch (e) {}
            var resp = document.createElement("div");
            resp.className = "response";
            resp.textContent = (key === "1" ? "Zen Wind" : "Birds & Piano") + " gewählt.";
            output.appendChild(resp);
            output.scrollTop = output.scrollHeight;
            resolveTitle();
          }

          function titleKeyHandler(event) {
            var key = event.key;
            if (key === "1" || key === "2") chooseTitle(key);
          }
          function click1() { chooseTitle("1"); }
          function click2() { chooseTitle("2"); }

          window.addEventListener("keydown", titleKeyHandler);
          opt1.addEventListener("click", click1);
          opt2.addEventListener("click", click2);
        });
      }

      function goToDeckblatt() {
        setTimeout(function () {
          try { sessionStorage.setItem("kioskUsed", "1"); } catch (e) {}
          window.location.href = "../4_lebenslauf/index.html";
          resolve();
        }, 700);
      }

      function doY() {
        askForTitleVariant().then(function () {
          var flowOk = document.createElement("div");
          flowOk.className = "response";
          flowOk.textContent = "✓ Flow mode aktiviert. Viel Spaß.";
          output.appendChild(flowOk);
          output.scrollTop = output.scrollHeight;
          goToDeckblatt();
        });
      }

      function doN() {
        var noResp = document.createElement("div");
        noResp.className = "response";
        noResp.textContent = "Kein Problem, manchmal passt es halt nicht.";
        output.appendChild(noResp);
        output.scrollTop = output.scrollHeight;
        goToDeckblatt();
      }

      function cleanup() {
        window.removeEventListener("keydown", handler);
        output.removeEventListener("click", handleClick);
        optY.classList.add("chosen");
        optN.classList.add("chosen");
      }

      function handler(event) {
        var key = (event.key || "").toLowerCase();
        if (key === "y") {
          cleanup();
          doY();
        } else if (key === "n" || key === "enter") {
          cleanup();
          doN();
        }
      }

      function handleClick(e) {
        if (optY.contains(e.target)) { cleanup(); doY(); }
        else if (optN.contains(e.target)) { cleanup(); doN(); }
      }

      window.addEventListener("keydown", handler);
      output.addEventListener("click", handleClick);
    });
  }

  window.addEventListener("load", function () {
    initLiveData();
    playBoot().then(playMacStory);
  });
})();
