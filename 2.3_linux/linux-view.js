/**
 * Linux-View V2 – Boot → Konsole → Flow → Deckblatt.
 * Struktur und Aufbau wie Mac (boot-data, content/OS-Daten, view.js), nur OS-spezifisch.
 * Erwartet: BOOT_DATA (../story/content), LINUX_TERMINAL_DATA (content/linux_terminal_data.js).
 */
(function () {
  "use strict";

  var bootData = window.BOOT_DATA || {};
  var linuxBootSequence = bootData.linuxBootSequence || [];
  var linuxData = window.LINUX_TERMINAL_DATA || {};
  var storyScript = window.LINUX_STORY_SCRIPT || [];
  var installerCfg = (linuxData.installer) || {};
  var titlebarLeft = (linuxData.titlebar && linuxData.titlebar.left && linuxData.titlebar.left.text) || "user@debian:~  -  xterm";
  var titlebarRight = (linuxData.titlebar && linuxData.titlebar.right && linuxData.titlebar.right.text) || "[UTF-8]  80x24";
  var promptStr = (linuxData.meta && linuxData.meta.promptExample) || "user@debian:~$";

  var monitor = document.getElementById("monitor");
  var bootContainer = document.getElementById("boot-container");
  var terminalStage = document.getElementById("terminal-stage");
  var consoleOutput = document.getElementById("console-output");
  var termTitleLeft = document.getElementById("term-title-left");
  var termTitleRight = document.getElementById("term-title-right");
  var terminalWindow = document.getElementById("terminal-window");
  var linuxMeta = (linuxData.meta) || {};
  var termCols = linuxMeta.cols || 80;
  var termRows = linuxMeta.rows || 18;

  if (termTitleLeft) termTitleLeft.textContent = titlebarLeft;
  if (termTitleRight) termTitleRight.textContent = titlebarRight;
  /* Struktur wie Mac: 80×18, 1.4em Zeilenhöhe, gleicher Ablauf/Animationen – nur xterm-Styling (Grün, apt-Befehle). */
  if (terminalWindow) terminalWindow.style.width = termCols + "ch";
  if (consoleOutput && consoleOutput.parentElement) {
    consoleOutput.parentElement.style.height = "calc(1.4em * " + termRows + ")";
  }

  function sleep(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
  }

  /** Eine Zeile der Boot-Sequenz anzeigen (div mit optional line-error). */
  function addBootSequenceLine(line, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (!bootContainer) { resolve(); return; }
        var div = document.createElement("div");
        div.textContent = line.text;
        if (line.error) div.className = "line-error";
        bootContainer.appendChild(div);
        bootContainer.scrollTop = bootContainer.scrollHeight;
        resolve();
      }, delay != null ? delay : 50);
    });
  }

  function addTermLine(text, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var node = document.createTextNode(text + "\n");
        consoleOutput.appendChild(node);
        scrollConsole();
        resolve();
      }, delay || 80);
    });
  }

  /** Typewriter: Zeichen für Zeichen wie in V1 (nur für Story/Response). */
  function addTermLineTypewriter(text, charDelayMs, delayAfterMs) {
    var wrap = document.createElement("div");
    wrap.className = "story-line";
    var span = document.createElement("span");
    wrap.appendChild(span);
    consoleOutput.appendChild(wrap);
    var i = 0;
    var str = String(text || "");
    return new Promise(function (resolve) {
      function tick() {
        if (i < str.length) {
          span.textContent += str.charAt(i++);
          scrollConsole();
          setTimeout(tick, charDelayMs);
        } else {
          var nl = document.createTextNode("\n");
          wrap.appendChild(nl);
          scrollConsole();
          setTimeout(resolve, delayAfterMs || 400);
        }
      }
      tick();
    });
  }

  /** Fehlerzeile rot (nur für Installer). */
  function addTermLineError(text, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var div = document.createElement("div");
        div.className = "install-line-error";
        div.textContent = text;
        consoleOutput.appendChild(div);
        scrollConsole();
        resolve();
      }, delay || 80);
    });
  }

  /** ASCII-Balken-Text für einen Prozentsatz (eine Zeile). */
  function asciiBarText(pct, label, cfg) {
    var c = cfg || installerCfg;
    var len = c.progressLength || 30;
    var fill = c.progressFill || "#";
    var empty = c.progressEmpty || ".";
    var n = Math.round((pct / 100) * len);
    n = Math.max(0, Math.min(len, n));
    return "[" + fill.repeat(n) + empty.repeat(len - n) + "] " + pct + "%" + (label ? " " + label : "");
  }

  /** Wie Mac: animierter Fortschritt, aber als ASCII-Zeile (# oder *), die sich füllt. */
  function animateProgressBarLinux(out, startPercent, endPercent, label, errorAt, cfg) {
    var c = cfg || installerCfg;
    var row = document.createElement("div");
    row.className = "install-line";
    row.textContent = asciiBarText(startPercent, label && startPercent > 0 ? label : "", c);
    out.appendChild(row);
    out.scrollTop = out.scrollHeight;
    return new Promise(function (resolve) {
      var current = startPercent;
      function tick() {
        row.textContent = asciiBarText(current, label && current > startPercent ? label : "", c);
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

  /** Wie Mac: Rollback – ASCII-Zeile läuft zurück. */
  function animateRollbackLinux(out, fromPercent, toPercent, cfg) {
    var c = cfg || installerCfg;
    var suffix = (c && c.rollbackSuffix) || " (Rollback)";
    var row = document.createElement("div");
    row.className = "install-line";
    row.textContent = asciiBarText(fromPercent, suffix, c);
    out.appendChild(row);
    out.scrollTop = out.scrollHeight;
    return new Promise(function (resolve) {
      var current = fromPercent;
      function tick() {
        row.textContent = asciiBarText(current, suffix, c);
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

  function scrollConsole() {
    var wrap = consoleOutput && consoleOutput.parentElement;
    if (wrap) wrap.scrollTop = wrap.scrollHeight;
  }

  /** Boot: Erste 3 Zeilen wie Mac, dann LILO/Debian linuxBootSequence, dann Monitor aus, Terminal ein */
  function playBoot() {
    var seq = linuxBootSequence;
    var p = Promise.resolve()
      .then(function () { return addBootSequenceLine({ text: "Systemstatus wird abgefragt" }, 400); })
      .then(function () { return addBootSequenceLine({ text: "OS erkannt – Linux" }, 500); })
      .then(function () { return addBootSequenceLine({ text: "Bereite Bootvorgang vor" }, 500); })
      .then(function () { return addBootSequenceLine({ text: "" }, 350); })
      .then(function () { return sleep(400); })
      .then(function () { return addBootSequenceLine({ text: "" }, 200); });
    seq.forEach(function (line) {
      p = p.then(function () { return addBootSequenceLine(line, line.delay); });
    });
    return p
      .then(function () { return sleep(600); })
      .then(function () {
        if (monitor) {
          monitor.style.transition = "opacity 0.5s ease";
          monitor.style.opacity = "0";
        }
        return sleep(520);
      })
      .then(function () {
        if (monitor) monitor.classList.add("hidden");
        if (terminalStage) {
          terminalStage.classList.remove("hidden");
          terminalStage.classList.add("visible");
        }
        return sleep(400);
      });
  }

  /** Retro-Installer: Wie Mac (gleicher Ablauf), aber mit animierten ASCII-Balken (# oder *) statt Grafik. */
  function runRetroInstallationLinux() {
    var cfg = installerCfg;
    var out = consoleOutput;
    var pkg = cfg.packages || ["✓ ui-ux-modul", "✓ xcode-toolchain", "✓ firebase-sdk", "✓ android-sdk"];
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

    var aptIntro = (cfg.aptIntro || []);
    var p = Promise.resolve()
      .then(function () { return addTermLine("", 400); });
    aptIntro.forEach(function (line) {
      p = p.then(function (l) { return addTermLine(l, 180); }.bind(null, line));
    });
    p = p.then(function () { return animateProgressBarLinux(out, 0, 15, pkg[0], null, cfg); })
      .then(function () { return addTermLine("", 250); })
      .then(function () { return animateProgressBarLinux(out, 15, 30, pkg[1] || "✓ xcode-toolchain", null, cfg); })
      .then(function () { return addTermLine("", 250); })
      .then(function () { return animateProgressBarLinux(out, 30, 45, pkg[2] || "✓ firebase-sdk", null, cfg); })
      .then(function () { return addTermLine("", 250); })
      .then(function () { return animateProgressBarLinux(out, 45, 60, pkg[3] || "✓ android-sdk", null, cfg); })
      .then(function () { return addTermLine("", 250); })
      .then(function () { return addTermLine(cfg.installComplete || "✓ Installation abgeschlossen", 400); })
      .then(function () { return addTermLine("", 400); })
      .then(function () {
        return animateProgressBarLinux(out, 60, 80, coffeeLabel, errAt, cfg).then(function (r) {
          if (r === "error") {
            return sleep(800).then(function () { return addTermLineError(errors[0], 400); })
              .then(function () { return addTermLine("", 300); })
              .then(function () { return animateRollbackLinux(out, errAt, 60, cfg); })
              .then(function () { return addTermLine("", 400); })
              .then(function () { return animateProgressBarLinux(out, 60, 80, coffeeLabel, errAt, cfg); })
              .then(function () { return sleep(800).then(function () { return addTermLineError(errors[1], 400); }); })
              .then(function () { return addTermLine("", 300); })
              .then(function () { return animateRollbackLinux(out, errAt, 60, cfg); })
              .then(function () { return addTermLine("", 400); })
              .then(function () { return animateProgressBarLinux(out, 60, 80, coffeeLabel, errAt, cfg); })
              .then(function () { return sleep(800).then(function () { return addTermLineError(errors[2], 400); }); })
              .then(function () { return addTermLine("", 300); })
              .then(function () { return animateRollbackLinux(out, errAt, 60, cfg); })
              .then(function () { return addTermLine("", 400); });
          }
        });
      })
      .then(function () { return animateProgressBarLinux(out, 60, 100, cfg.coffeeSuccess || "✓ kaffeemaschine (HTML aktivieren)", null, cfg); })
      .then(function () { return addTermLine("", 400); })
      .then(function () { return addTermLine(cfg.coffeeReady || "✓ Kaffee ist fertig.", 600); })
      .then(function () { return addTermLine("", 300); })
      .then(function () { return animateProgressBarLinux(out, 0, 100, cfg.kioskLabel || "✓ kiosk-mode", null, cfg); })
      .then(function () { return addTermLine(cfg.kioskMessage || "✓ Kiosk-Modus aktiv – Klick oder Taste = Vollbild.", 500); })
      .then(function () { return addTermLine("", 300); })
      .then(function () { return addTermLine(cfg.successLine || "✓ SUCCESS: Installation complete", 800); })
      .then(function () { return addTermLine("", 500); })
      .then(function () { return addTermLine(cfg.warningTitle || "⚠️  WARNUNG: Paket enthält:", 500); });

    var bullets = cfg.warningBullets || [];
    bullets.forEach(function (b) {
      p = p.then(function () { return addTermLine(b, 300); });
    });
    return p.then(function () { return addTermLine("", 500); })
      .then(function () { return addTermLine(cfg.readyLine || "Bereit für deine Erwartungen.", 700); })
      .then(function () { return addTermLine("", 600); });
  }

  /** Story-Script abspielen (response, story, input, pause, run_retro_install), dann Flow. */
  function playLinuxStory() {
    var i = 0;
    function next() {
      if (i >= storyScript.length) {
        return addTermLine("", 400).then(function () { return addTermLine("Flow starten? [y/N]", 300); }).then(askForFlow);
      }
      var step = storyScript[i++];
      if (step.type === "response" || step.type === "story") {
        var charDelay = step.delayPerCharMs || 35;
        return addTermLineTypewriter(step.text, charDelay, step.delayAfterMs || 400).then(next);
      }
      if (step.type === "input") {
        var line = (step.prompt || promptStr) + (step.cmd || "");
        return addTermLine(line, step.delayAfterMs || 500).then(function () {
          if (String(step.cmd || "").trim() === "clear") {
            consoleOutput.innerHTML = "";
            scrollConsole();
          }
          return next();
        });
      }
      if (step.type === "pause") {
        return sleep(step.timeMs || 400).then(next);
      }
      if (step.type === "run_retro_install") {
        return runRetroInstallationLinux().then(function () { return sleep(step.delayAfterMs || 400); }).then(next);
      }
      return next();
    }
    return next();
  }

  /** Konsole: Start direkt mit Story (cat story_start.txt), ohne Vorlauf. */
  function playTerminal() {
    return Promise.resolve()
      .then(function () { return sleep(500); })
      .then(playLinuxStory);
  }

  function askForFlow() {
    return new Promise(function (resolve) {
      var optY = document.createElement("div");
      optY.className = "terminal-choice";
      optY.textContent = "  [y] – Flow starten";
      consoleOutput.appendChild(optY);
      var optN = document.createElement("div");
      optN.className = "terminal-choice";
      optN.textContent = "  [n] – nicht jetzt";
      consoleOutput.appendChild(optN);
      scrollOutput();

      function scrollOutput() {
        var wrap = consoleOutput.parentElement;
        if (wrap) wrap.scrollTop = wrap.scrollHeight;
      }

      function askForTitle() {
        return new Promise(function (resolveTitle) {
          var q = document.createElement("div");
          q.textContent = "Welchen Titel möchtest du hören? [1/2]";
          consoleOutput.appendChild(q);
          var opt1 = document.createElement("div");
          opt1.className = "terminal-choice";
          opt1.textContent = "  [1] – Zen Wind";
          consoleOutput.appendChild(opt1);
          var opt2 = document.createElement("div");
          opt2.className = "terminal-choice";
          opt2.textContent = "  [2] – Birds & Piano";
          consoleOutput.appendChild(opt2);
          scrollOutput();

          function choose(key) {
            window.removeEventListener("keydown", titleHandler);
            opt1.removeEventListener("click", c1);
            opt2.removeEventListener("click", c2);
            var track = key === "1" ? "zen" : "birds";
            try {
              sessionStorage.setItem("deckblattTitleVariant", key);
              sessionStorage.setItem("flowMusicContinue", track);
            } catch (e) {}
            var r = document.createElement("div");
            r.textContent = (key === "1" ? "Zen Wind" : "Birds & Piano") + " gewählt.";
            consoleOutput.appendChild(r);
            scrollOutput();
            resolveTitle();
          }

          function titleHandler(e) {
            if (e.key === "1" || e.key === "2") choose(e.key);
          }
          function c1() { choose("1"); }
          function c2() { choose("2"); }

          window.addEventListener("keydown", titleHandler);
          opt1.addEventListener("click", c1);
          opt2.addEventListener("click", c2);
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
        window.removeEventListener("keydown", handler);
        consoleOutput.removeEventListener("click", clickHandler);
        askForTitle().then(function () {
          var ok = document.createElement("div");
          ok.textContent = "✓ Flow mode aktiviert. Viel Spaß.";
          consoleOutput.appendChild(ok);
          scrollOutput();
          goToDeckblatt();
        });
      }

      function doN() {
        window.removeEventListener("keydown", handler);
        consoleOutput.removeEventListener("click", clickHandler);
        var no = document.createElement("div");
        no.textContent = "Kein Problem, manchmal passt es halt nicht.";
        consoleOutput.appendChild(no);
        scrollOutput();
        goToDeckblatt();
      }

      function handler(e) {
        var key = (e.key || "").toLowerCase();
        if (key === "y") doY();
        else if (key === "n" || key === "enter") doN();
      }

      function clickHandler(e) {
        if (optY.contains(e.target)) doY();
        else if (optN.contains(e.target)) doN();
      }

      window.addEventListener("keydown", handler);
      consoleOutput.addEventListener("click", clickHandler);
    });
  }

  window.addEventListener("load", function () {
    playBoot().then(playTerminal);
  });
})();
