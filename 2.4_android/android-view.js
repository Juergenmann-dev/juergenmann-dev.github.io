 (function(){
 var path = (window.location.pathname || "") + (window.location.href || "");
 if (path.indexOf("2.4_android") !== -1) {
  document.body.classList.add("os-android");
  document.body.classList.remove("os-mac", "os-win", "os-linux");
  document.documentElement.style.setProperty("--wallpaper", "url('https://juergenmann-dev.github.io/Android.jpeg')");
 } else if (window.DETECTION) {
  document.body.classList.add("os-" + (window.DETECTION.osKey || "android"));
  document.body.classList.remove("os-mac", "os-win", "os-linux");
  if (window.DETECTION.isAndroid) document.documentElement.style.setProperty("--wallpaper", "url('https://juergenmann-dev.github.io/Android.jpeg')");
 }
 var output = document.getElementById("console-output");
 var lines = [];
 function scrollToBottom() {
  var p = output && output.parentElement;
  if (p) {
   requestAnimationFrame(function() {
    p.scrollTop = p.scrollHeight;
   });
  }
 }
 
 function addLine(text, delay) {
 return new Promise(function(resolve) {
 setTimeout(function() {
 lines.push(text);
 output.textContent = lines.join("\n");
 scrollToBottom();
 resolve();
 }, delay);
 });
 }
 
 function updateLastLine(text, delay) {
 return new Promise(function(resolve) {
 setTimeout(function() {
 if (lines.length > 0) {
 lines[lines.length - 1] = text;
 output.textContent = lines.join("\n");
 scrollToBottom();
 }
 resolve();
 }, delay);
 });
 }
 
          function animateProgressBar(startPercent, endPercent, label, errorAt) {
            var fillCh = document.body.classList.contains("os-win") ? "=" : "█";
            var emptyCh = document.body.classList.contains("os-win") ? "-" : "░";
            return new Promise(function(resolve) {
              // Start with an empty placeholder - animation fills it immediately
              // This avoids showing a duplicate of the previous bar's endpoint
              lines.push("");
              output.textContent = lines.join("\n");
              scrollToBottom();
              
              // Edge case: start === end
              if (startPercent === endPercent) {
                var blF = Math.round(endPercent / 3.33);
                lines[lines.length - 1] = "[" + fillCh.repeat(blF) + emptyCh.repeat(30 - blF) + "] " + endPercent + "%" + (label ? " " + label : "");
                output.textContent = lines.join("\n");
                scrollToBottom();
                setTimeout(function() { resolve("success"); }, 300);
                return;
              }
              
              var currentPercent = startPercent;
              
              // Draw the first frame immediately (no blank flash)
              (function drawFrame() {
                var bl = Math.round(currentPercent / 3.33);
                lines[lines.length - 1] = "[" + fillCh.repeat(bl) + emptyCh.repeat(30 - bl) + "] " + currentPercent + "%";
                output.textContent = lines.join("\n");
                scrollToBottom();
              })();
              
              var interval = setInterval(function() {
                if (currentPercent < endPercent) {
                  currentPercent = Math.min(currentPercent + 1, endPercent);
                  
                  if (currentPercent % 3 === 0 || currentPercent === endPercent) {
                    var barLength = Math.round(currentPercent / 3.33);
                    var filled = fillCh.repeat(barLength);
                    var empty = emptyCh.repeat(30 - barLength);
                    var barText = "[" + filled + empty + "] " + currentPercent + "%";
                    
                    if (label && currentPercent > startPercent + 1) {
                      barText += " " + label;
                    }
                    
                    lines[lines.length - 1] = barText;
                    output.textContent = lines.join("\n");
                    scrollToBottom();
                  }
                  
                  if (errorAt && currentPercent === errorAt) {
                    clearInterval(interval);
                    setTimeout(function() {
                      resolve("error");
                    }, 500);
                    return;
                  }
                  
                  if (currentPercent === endPercent) {
                    clearInterval(interval);
                    setTimeout(function() {
                      resolve("success");
                    }, 300);
                  }
                }
              }, 50);
            });
          }
 
          function animateRollback(fromPercent, toPercent) {
            var fillCh = document.body.classList.contains("os-win") ? "=" : "█";
            var emptyCh = document.body.classList.contains("os-win") ? "-" : "░";
            return new Promise(function(resolve) {
              lines.push("");
              var currentPercent = fromPercent;
              (function drawFrame() {
                var bl = Math.round(currentPercent / 3.33);
                lines[lines.length - 1] = "[" + fillCh.repeat(bl) + emptyCh.repeat(30 - bl) + "] " + currentPercent + "% (rollback)";
                output.textContent = lines.join("\n");
                scrollToBottom();
              })();
              var interval = setInterval(function() {
                if (currentPercent > toPercent) {
                  currentPercent = Math.max(currentPercent - 1, toPercent);
                  if (currentPercent % 2 === 0 || currentPercent === toPercent) {
                    var bl = Math.round(currentPercent / 3.33);
                    lines[lines.length - 1] = "[" + fillCh.repeat(bl) + emptyCh.repeat(30 - bl) + "] " + currentPercent + "% (rollback)";
                    output.textContent = lines.join("\n");
                    scrollToBottom();
                  }
                  if (currentPercent === toPercent) {
                    clearInterval(interval);
                    setTimeout(function() { resolve(); }, 400);
                  }
                }
              }, 40);
            });
          }

 async function runInstallation() {
  // Android nutzt eigenen Installer
  if (document.body.classList.contains("os-android")) {
   startAndroidInstall();
   return;
  }
  var ov = document.getElementById("loading-overlay");
  if (ov) { ov.style.display = "flex"; ov.style.alignItems = "center"; ov.style.justifyContent = "center"; }
  if (document.body.classList.contains("os-mac")) updateMacMenuBar("terminal");
  var dockTerm = document.getElementById("dock-term-icon");
  var taskbarTerm = document.getElementById("taskbar-term-icon");
  if (dockTerm) dockTerm.classList.add("active");
  if (taskbarTerm) taskbarTerm.classList.add("active");

  var termTitle = document.getElementById("term-win-title");
  var termOs = document.getElementById("term-os");
  if (document.body.classList.contains("os-win")) {
   if (termTitle) termTitle.textContent = "Eingabeaufforderung — cmd.exe";
   if (termOs) termOs.textContent = "Windows";
  } else if (document.body.classList.contains("os-mac")) {
   if (termTitle) termTitle.textContent = "lebenslauf.html — -zsh — 120x30";
   if (termOs) termOs.textContent = "Mac";
  } else if (document.body.classList.contains("os-android")) {
   if (termTitle) termTitle.textContent = "Shell — jm";
   if (termOs) termOs.textContent = "Android";
  } else if (document.body.classList.contains("os-linux")) {
   if (termTitle) termTitle.textContent = "bash — jm";
   if (termOs) termOs.textContent = "Linux";
  }

  var isAndroid = document.body.classList.contains("os-android");
  var firstLine = document.body.classList.contains("os-win") ? "C:\\Users\\jm> winget install jürgen-mann" : (isAndroid ? "shell>$ pm install jürgen-mann" : "$ brew install jürgen-mann");
  await addLine(firstLine, 400);
 await addLine("", 400);
 
 // Tech Skills Phase - 0 to 60% (Paketnamen plattformspezifisch)
  var isWin = document.body.classList.contains("os-win");
  var pkg1 = isWin ? "✓ vs-build-tools" : (isAndroid ? "✓ android-sdk" : "✓ ui/ux-module");
  var pkg2 = isWin ? "✓ windows-sdk" : (isAndroid ? "✓ kotlin-stdlib" : "✓ xcode-toolchain");
  var pkg3 = isWin ? "✓ firebase-sdk" : "✓ firebase-sdk";
  var pkg4 = isWin ? "✓ android-sdk" : (isAndroid ? "✓ compose-ui" : "✓ android-sdk");
  var result0 = await animateProgressBar(0, 15, pkg1);
 await addLine("", 250);
  var result1 = await animateProgressBar(15, 30, pkg2);
 await addLine("", 250);
  var result2 = await animateProgressBar(30, 45, pkg3);
 await addLine("", 250);
  var result2b = await animateProgressBar(45, 60, pkg4);
 await addLine("", 250);
 
        await addLine(document.body.classList.contains("os-win") ? "✓ Installation abgeschlossen" : (document.body.classList.contains("os-android") ? "✓ Installation abgeschlossen" : "✓ packages installed"), 400);
 await addLine("", 400);
 
          // Coffee-maker Gag (Mac + Win): 3 Fehlversuche + Rollback, dann Erfolg
          var result3 = await animateProgressBar(60, 80, "⟳ coffee-maker-integration", 72);
          if (result3 === "error") {
          await addLine("✗ ERROR: water tank empty", 600);
          await addLine("", 300);
          await animateRollback(72, 60);
          await addLine("", 400);
          var result4 = await animateProgressBar(60, 80, "⟳ coffee-maker-integration", 72);
          await addLine("✗ ERROR: coffee forgotten", 700);
          await addLine("", 300);
          await animateRollback(72, 60);
          await addLine("", 400);
          var result5 = await animateProgressBar(60, 80, "⟳ coffee-maker-integration", 72);
          await addLine("✗ ERROR: ah shit forgot to turn it on", 700);
          await addLine("", 300);
          await animateRollback(72, 60);
          await addLine("", 400);
          }
          await animateProgressBar(60, 100, "✓ coffee-maker [HTML enabled]");

 await addLine("", 400);
 await addLine(isWin ? "✓ Kaffee ist fertig." : "✓ Coffee is ready.", 600);
 await addLine("", 300);
 await animateProgressBar(0, 100, "✓ kiosk-mode");
 await addLine("✓ Kiosk mode aktiv – Klick oder Taste = Vollbild.", 500);
 await addLine("", 300);
 await addLine("✓ SUCCESS: Installation complete", 800);
 await addLine("", 500);
 await addLine("⚠️  WARNING: Package contains:", 500);
 await addLine("  - 13 Easter Eggs detected (Android)", 300);
 await addLine("  - State Management that actually works", 300);
 await addLine("  - Typewriter animations (may cause sleeplessness)", 300);
 await addLine("  - And apparently, coffee-making skills", 300);
 await addLine("", 500);
 await addLine("Ready to compile your expectations.", 700);
 await addLine("", 600);

 // Flow Mode Abfrage
 await showFlowModePrompt();
 }

 function showFlowModePrompt() {
  return new Promise(function(resolve) {
   var container = document.getElementById("console-output");
   if (!container) { resolve(); return; }
   function scrollContainer() {
    var p = container.parentElement;
    if (p) p.scrollTop = p.scrollHeight;
   }

   // Auf innerHTML umschalten damit appendChild funktioniert
   // Bisherigen textContent als HTML-Element erhalten
   var existing = document.createElement("span");
   existing.style.whiteSpace = "pre-wrap";
   existing.textContent = container.textContent;
   container.textContent = "";
   container.appendChild(existing);

   function addEl(html, delay) {
    return new Promise(function(res) {
     setTimeout(function() {
      var div = document.createElement("div");
      div.innerHTML = html;
      container.appendChild(div);
      scrollContainer();
      res();
     }, delay || 0);
    });
   }

   // Prompt-Zeile
   var promptLine = document.createElement("div");
   promptLine.innerHTML = '<span style="color:#39D353;">?</span> <span style="color:#e6edf3;">Enable flow mode?</span>';
   container.appendChild(promptLine);
   scrollContainer();

   setTimeout(function() {
    // Optionen einblenden
    var optJ = document.createElement("div");
    optJ.className = "console-line";
    optJ.innerHTML = '  <span style="color:#39D353;font-weight:700;">[j]</span> <span style="color:#e6edf3;">– ich bin dabei</span>';
    container.appendChild(optJ);
    scrollContainer();

    setTimeout(function() {
     var optN = document.createElement("div");
     optN.className = "console-line";
     optN.innerHTML = '  <span style="color:#7d8590;">[n]</span> <span style="color:#e6edf3;">– nicht jetzt</span>';
     container.appendChild(optN);
     scrollContainer();

     // Cursor-Zeile
     setTimeout(function() {
      var inputLine = document.createElement("div");
      inputLine.className = "console-line";
      inputLine.innerHTML = '<span style="color:#39D353;">›</span> <span class="flow-cursor" style="display:inline-block;width:10px;height:14px;background:#39D353;vertical-align:middle;animation:typewriter-blink 0.8s step-end infinite;margin-left:4px;"></span>';
      container.appendChild(inputLine);
      scrollContainer();

      function handleKey(e) {
       if (e.key === "j" || e.key === "J") {
        cleanup();
        // Cursor ersetzen durch Eingabe
        inputLine.innerHTML = '<span style="color:#39D353;">›</span> <span style="color:#39D353;font-weight:700;">j</span>';
        setTimeout(function() {
         var resp = document.createElement("div");
         resp.className = "console-line";
         resp.innerHTML = '<span style="color:#39D353;">✓</span> <span style="color:#e6edf3;">Flow mode aktiviert. Viel Spaß.</span>';
         container.appendChild(resp);
         scrollContainer();
         // 🎵 Flow Mode – Track Auswahl (Pfad von 2.4_android/ aus: ../musik/)
         var zenB64 = "../musik/zen_wind.mp3";
         var birdsB64 = "../musik/birds_piano.mp3";

         // Track-Auswahl anzeigen
         var resp2 = document.createElement("div");
         resp2.className = "console-line";
         resp2.innerHTML = '<span style="color:#39D353;">?</span> <span style="color:#e6edf3;">Wähle deine Atmosphäre:</span>';
         container.appendChild(resp2);
         scrollContainer();

         setTimeout(function() {
           var t1 = document.createElement("div");
           t1.className = "console-line";
           t1.style.cursor = "pointer";
           t1.innerHTML = '  <span style="color:#39D353;font-weight:700;">[1]</span> <span style="color:#e6edf3;">– Zen Wind</span>';
           container.appendChild(t1);

           var t2 = document.createElement("div");
           t2.className = "console-line";
           t2.style.cursor = "pointer";
           t2.innerHTML = '  <span style="color:#39D353;font-weight:700;">[2]</span> <span style="color:#e6edf3;">– Birds & Piano</span>';
           container.appendChild(t2);
           scrollContainer();

           function playTrack(src, label) {
             t1.style.cursor = "default";
             t2.style.cursor = "default";
             document.removeEventListener("keydown", handleTrackKey);
             t1.removeEventListener("click", clickT1);
             t2.removeEventListener("click", clickT2);

             var chosen = document.createElement("div");
             chosen.className = "console-line";
             chosen.innerHTML = '<span style="color:#39D353;">›</span> <span style="color:#39D353;font-weight:700;">' + label + '</span>';
             container.appendChild(chosen);
             scrollContainer();

             // Erst NACH Track-Auswahl den Overlay entfernen
             setTimeout(function() { removeOverlay(); resolve(); }, 1000);
           }

           function startAudio(src, label) {
             // Audio SOFORT im User-Gesture-Kontext starten
             var audio = new Audio(src);
             audio.loop = true;
             audio.volume = 0.3;
             var playPromise = audio.play();
             if (playPromise !== undefined) {
               playPromise.catch(function() {
                 // Fallback: auf nächsten Klick warten
                 document.addEventListener("click", function retry() {
                   audio.play();
                   document.removeEventListener("click", retry);
                 }, { once: true });
               });
             }
             window._flowAudio = audio;
             showMusicBtn();
             playTrack(src, label);
           }

           function handleTrackKey(e) {
             if (e.key === "1") startAudio(zenB64, "1 – Zen Wind");
             else if (e.key === "2") startAudio(birdsB64, "2 – Birds & Piano");
           }
           function clickT1() { startAudio(zenB64, "1 – Zen Wind"); }
           function clickT2() { startAudio(birdsB64, "2 – Birds & Piano"); }

           t1.addEventListener("click", clickT1);
           t2.addEventListener("click", clickT2);
           document.addEventListener("keydown", handleTrackKey);
         }, 400);
        }, 300);
       } else if (e.key === "n" || e.key === "N") {
        cleanup();
        inputLine.innerHTML = '<span style="color:#39D353;">›</span> <span style="color:#7d8590;">n</span>';
        setTimeout(function() {
         var resp = document.createElement("div");
         resp.className = "console-line";
         resp.innerHTML = '<span style="color:#7d8590;">✓</span> <span style="color:#e6edf3;">No problem – manchmal passt es nicht.</span>';
         container.appendChild(resp);
         scrollContainer();
         setTimeout(function() { removeOverlay(); resolve(); }, 1200);
        }, 300);
       }
      }

      function handleClick(e) {
       // Touch/Click auf j oder n Option
       if (optJ.contains(e.target)) { handleKey({ key: "j" }); }
       else if (optN.contains(e.target)) { handleKey({ key: "n" }); }
      }

      function cleanup() {
       document.removeEventListener("keydown", handleKey);
       container.removeEventListener("click", handleClick);
       optJ.style.cursor = "default";
       optN.style.cursor = "default";
      }

      // Klickbar machen für Touch/Mobile
      optJ.style.cursor = "pointer";
      optN.style.cursor = "pointer";

      document.addEventListener("keydown", handleKey);
      container.addEventListener("click", handleClick);

     }, 400);
    }, 300);
   }, 400);
  });
 }

 function removeOverlay() {
  var overlay = document.getElementById("loading-overlay");
  var credit = document.getElementById("unsplash-credit");
  if (credit) credit.style.display = "none";
  document.body.classList.remove("retro-bg");
  document.body.classList.remove("retro-active");
  document.body.classList.add("retro-bg-off");
  var isAndroid = document.body.classList.contains("os-android");
  if (isAndroid) {
   // Android: kein sichtbares Overlay – sofort Deckblatt/Lebenslauf zeigen (von startAndroidInstall)
   if (overlay) overlay.remove();
   window._consoleAnimationDone = true;
   setTimeout(function() {
    if (typeof runDeckblattTypewriter === "function") runDeckblattTypewriter();
   }, 400);
   return;
  }
  if (overlay) {
   overlay.style.transition = "opacity 1.5s ease-out";
   overlay.style.opacity = "0";
   setTimeout(function() {
    overlay.remove();
    window._consoleAnimationDone = true;
    setTimeout(function() {
     if (typeof runDeckblattTypewriter === "function") runDeckblattTypewriter();
    }, 1200);
   }, 1500);
  }
 }
 
 window.addEventListener("load", function() {
  var ua = navigator.userAgent;
  var path = window.location.pathname || "";
  // Anbindung Boot: von 1_bootvorgang (Android erkannt) hierher → Android-UI → removeOverlay() → Deckblatt/Lebenslauf
  if (path.indexOf("2.4_android") !== -1) {
   document.body.classList.add("os-android");
   document.body.classList.remove("os-mac", "os-win", "os-linux");
  } else if (ua.indexOf("Win") !== -1) document.body.classList.add("os-win");
  else if (ua.indexOf("Mac") !== -1 || ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) document.body.classList.add("os-mac");
  else if (ua.indexOf("Android") !== -1) document.body.classList.add("os-android");
  else if (ua.indexOf("Linux") !== -1) document.body.classList.add("os-linux");

  // Wie 2_mac / 2.1_win: eigener OS-Zweig, kein Boot – Android: Homescreen mit Kacheln → Notification → Klick öffnet Chat (Reise)
  if (document.body.classList.contains("os-android")) {
   document.documentElement.style.setProperty("--wallpaper",
    "url('https://juergenmann-dev.github.io/Android.jpeg')"
   );
   document.body.classList.remove("boot-phase");
   document.body.classList.add("retro-bg");
   runAndroidHomeFlow();
   return;
  }

  // Wallpaper erst NACH Systemstart (in runPreload) – während Boot-Code schwarz
  document.body.classList.add("boot-phase");

  var storyScreen = document.getElementById("story-screen");
  if (storyScreen) {
   var storyTitleEl = storyScreen.querySelector(".term-win-title");
   var storyStatusEl = storyScreen.querySelector(".term-win-statusbar");
   if (storyTitleEl && storyStatusEl) {
    if (document.body.classList.contains("os-win")) {
     storyTitleEl.textContent = "Eingabeaufforderung — cmd.exe";
     storyStatusEl.innerHTML = "<span>C:\\Users\\jm</span><span>lebenslauf</span>";
    } else if (document.body.classList.contains("os-mac")) {
     storyTitleEl.textContent = "lebenslauf.html — -zsh — 120x30";
     storyStatusEl.innerHTML = "<span>jm@Mac</span><span>lebenslauf</span>";
    } else if (document.body.classList.contains("os-android")) {
     storyTitleEl.textContent = "Shell — jm";
     storyStatusEl.innerHTML = "<span>jm@Android</span><span>lebenslauf</span>";
    } else if (document.body.classList.contains("os-linux")) {
     storyTitleEl.textContent = "bash — jm";
     storyStatusEl.innerHTML = "<span>jm</span><span>lebenslauf</span>";
    }
   }
  }

  if (document.body.classList.contains("os-mac") || document.body.classList.contains("os-win")) {
   // Boot nur in 1_bootvorgang – hier sofort Desktop
   var ua = navigator.userAgent;
   var wallpaperUrl = ua.indexOf("Win") !== -1 ? "https://juergenmann-dev.github.io/Windows.jpg" : "https://juergenmann-dev.github.io/Mac.jpg";
   document.documentElement.style.setProperty("--wallpaper", "url('" + wallpaperUrl + "')");
   document.body.classList.remove("boot-phase");
   document.body.classList.add("retro-bg");
   var credit = document.getElementById("unsplash-credit");
   if (credit) credit.style.display = "block";
   setTimeout(runSpotlightSimulation, 200);
  } else {
   setTimeout(runPreload, 200);
  }
  // Dock/Taskbar: ans Ende von body verschieben + Position unten erzwingen
  var dock = document.getElementById("os-dock-bar");
  if (dock && dock.parentNode) {
   dock.parentNode.appendChild(dock);
   dock.style.setProperty("position", "fixed", "important");
   dock.style.setProperty("top", "auto", "important");
   dock.style.setProperty("bottom", "0", "important");
   dock.style.setProperty("left", "0", "important");
   dock.style.setProperty("right", "0", "important");
  }
  // Windows Taskbar: Uhrzeit aktualisieren
  var clockEl = document.getElementById("taskbar-clock");
  if (clockEl && navigator.userAgent.indexOf("Win") !== -1) {
   function updateClock() {
    var now = new Date();
    clockEl.textContent = now.getHours().toString().padStart(2,"0") + ":" + now.getMinutes().toString().padStart(2,"0");
   }
   updateClock();
   setInterval(updateClock, 60000);
  }
  // Mac Menu Bar: Uhrzeit aktualisieren
  var macClockEl = document.getElementById("mac-menu-clock");
  if (macClockEl && (document.body.classList.contains("os-mac"))) {
   function updateMacClock() {
    var now = new Date();
    macClockEl.textContent = now.getHours().toString().padStart(2,"0") + ":" + now.getMinutes().toString().padStart(2,"0");
   }
   updateMacClock();
   setInterval(updateMacClock, 60000);
  }
 });

 var SPOTLIGHT = {
  DELAY: { SHORT: 400, MEDIUM: 600, LONG: 1000 },
  TYPE_SPEED: { MIN: 80, MAX: 120 }
 };

 function wait(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
 }
 var preloadWait = wait;

 function show(el) { if (el) el.classList.remove("spotlight-hidden"); }
 function hide(el) { if (el) el.classList.add("spotlight-hidden"); }

 async function typeInto(el, text, speedMin, speedMax, onFirstChar) {
  speedMin = speedMin || SPOTLIGHT.TYPE_SPEED.MIN;
  speedMax = speedMax || SPOTLIGHT.TYPE_SPEED.MAX;
  for (var i = 0; i <= text.length; i++) {
   el.textContent = text.slice(0, i);
   if (i === 1 && typeof onFirstChar === 'function') onFirstChar();
   await wait(speedMin + Math.random() * (speedMax - speedMin));
  }
 }

 async function runSpotlightSimulation() {
  document.body.classList.add("spotlight-active");
  var shortcut = document.getElementById("spotlight-shortcut");
  var enterEl = document.getElementById("spotlight-enter");
  var bar = document.getElementById("spotlight-bar");
  var textEl = document.getElementById("spotlight-text");
  var cursor = document.getElementById("spotlight-cursor");
  var inputWrap = document.getElementById("spotlight-input-wrap");
  var categories = document.getElementById("spotlight-categories");
  var results = document.getElementById("spotlight-results");
  var btnOpen = document.getElementById("spotlight-btn-open");
  if (!shortcut || !bar || !textEl) {
   document.body.classList.remove("spotlight-active");
   runStory();
   return;
  }

  var isWin = document.body.classList.contains("os-win");
  var shortcutMac = shortcut.querySelector(".spotlight-shortcut-mac");
  var shortcutWin = shortcut.querySelector(".spotlight-shortcut-win");
  if (shortcutMac) shortcutMac.style.display = isWin ? "none" : "";
  if (shortcutWin) shortcutWin.style.display = isWin ? "" : "none";
  var searchTerm = isWin ? "cmd" : "Terminal";

  function showEl(el) { if (el) el.classList.remove("spotlight-hidden"); }
  function hideEl(el) { if (el) el.classList.add("spotlight-hidden"); }

  (async function step() {
   try {
    hideEl(bar);
    hideEl(enterEl);
    if (categories) hideEl(categories);
    if (results) hideEl(results);
    if (btnOpen) hideEl(btnOpen);
    textEl.textContent = "";
    if (inputWrap) inputWrap.classList.remove("has-text");
    showEl(shortcut);
    await wait(SPOTLIGHT.DELAY.LONG);

    hideEl(shortcut);
    showEl(bar);
    await wait(SPOTLIGHT.DELAY.MEDIUM);

    if (inputWrap) inputWrap.classList.add("has-text");
    await typeInto(textEl, searchTerm, null, null, function() {
     if (categories) showEl(categories);
     if (results) showEl(results);
     if (btnOpen) showEl(btnOpen);
    });
    await wait(SPOTLIGHT.DELAY.SHORT);

    if (cursor) cursor.style.display = "none";
    showEl(enterEl);
    await wait(SPOTLIGHT.DELAY.LONG);

    hideEl(bar);
    hideEl(enterEl);
    hideEl(shortcut);
    await wait(SPOTLIGHT.DELAY.SHORT);
   } catch (e) {
    console.error("Spotlight:", e);
   }
   document.body.classList.remove("spotlight-active");
   var spot = document.getElementById("spotlight-screen");
   if (spot) spot.style.display = "none";
   runStory();
  })();
 }

 async function runPreload(opts) {
  opts = opts || {};
  var ua = navigator.userAgent;

  // Android: eigene UI – Homescreen mit Kacheln → Notification → Chat (Reise)
  if (ua.indexOf("Android") !== -1) {
   document.body.classList.add("os-android");
   document.documentElement.style.setProperty("--wallpaper", "url('Android.jpeg')");
   document.body.classList.add("retro-bg");
   runAndroidHomeFlow();
   return;
  }

  var screen = document.getElementById("preload-screen");
  var msg = document.getElementById("preload-msg");
  var bar = document.getElementById("preload-bar");

  // OS sofort erkennen und Body-Klasse setzen
  if (ua.indexOf("Win") !== -1) {
   document.body.classList.add("os-win");
  } else if (ua.indexOf("Mac") !== -1 || ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) {
   document.body.classList.add("os-mac");
  } else if (ua.indexOf("Android") !== -1) {
   document.body.classList.add("os-android");
  } else if (ua.indexOf("Linux") !== -1) {
   document.body.classList.add("os-linux");
  }
  // Schritt 1 – Hintergrund laden (bei Fehler: Fallback Retrotürkis #008B8B)
  msg.textContent = "Hintergrund wird geladen...";
  bar.style.width = "40%";

  var wallpaperUrl = null;
  if (ua.indexOf("Win") !== -1) {
   wallpaperUrl = "https://juergenmann-dev.github.io/Windows.jpg";
  } else if (ua.indexOf("Mac") !== -1 || ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) {
   wallpaperUrl = "https://juergenmann-dev.github.io/Mac.jpg";
  } else if (ua.indexOf("Android") !== -1) {
   document.body.classList.remove("boot-phase");
   document.documentElement.style.setProperty("--wallpaper", "url('Android.jpeg')");
   document.body.classList.add("retro-bg");
  } else if (ua.indexOf("Linux") !== -1) {
   document.body.classList.remove("boot-phase");
   document.documentElement.style.setProperty("--wallpaper",
    "radial-gradient(ellipse at 30% 60%, #a0522d 0%, #8b3a0f 25%, #4a1a00 55%, #1a0800 100%)"
   );
   document.body.classList.add("retro-bg");
  }

  if (wallpaperUrl) {
   await new Promise(function(resolve) {
    var done = false;
    function aktivierFallback() {
     if (done) return; done = true;
     document.body.classList.remove("boot-phase");
     document.body.classList.remove("retro-bg");
     document.documentElement.style.setProperty("--wallpaper", "none");
     document.body.style.background = "linear-gradient(180deg, #008B8B 0%, #006666 50%, #004d4d 100%)";
     msg.textContent = "Hintergrund von GitHub konnte nicht geladen werden (Firewall/Netzwerk). Fallback: Retrotürkis, Standard-Schema wie vor 25+ Jahren.";
     screen.style.background = "rgba(0,80,80,0.7)";
     resolve();
    }
    var img = new Image();
    img.onload = function() {
     if (done) return; done = true;
     document.body.classList.remove("boot-phase");
     document.documentElement.style.setProperty("--wallpaper", "url('" + wallpaperUrl + "')");
     document.body.classList.add("retro-bg");
     screen.style.background = "transparent";
     var credit = document.getElementById("unsplash-credit");
     if (credit) credit.style.display = "block";
     resolve();
    };
    img.onerror = function() { aktivierFallback(); };
    img.src = wallpaperUrl;
    setTimeout(function() { if (!done) aktivierFallback(); }, 4000);
   });
  }

  bar.style.width = "70%";
  msg.textContent = "";
  bar.style.width = "100%";
  await preloadWait(500);

  screen.remove();
  if (opts.skipBoot) {
   var bootScreen = document.getElementById("boot-screen");
   if (bootScreen) bootScreen.remove();
   var storyScreen = document.getElementById("story-screen");
   if (storyScreen) storyScreen.remove();
   runInstallation();
  } else {
   runBoot();
  }
 }

 async function bootWait(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
 }

 async function runBoot() {
  // Android hat eigene UI – kein Boot-Screen
  if (document.body.classList.contains("os-android")) {
   runAndroidStory();
   return;
  }
  var screen = document.getElementById("boot-screen");
  if (screen) screen.style.display = "flex";
  var label = document.getElementById("boot-label");
  var progress = document.getElementById("boot-progress");
  var progressText = document.getElementById("boot-progress-text");
  var status = document.getElementById("boot-status");
  var osEl = document.getElementById("boot-os");
  var ua = navigator.userAgent;
  var isAndroid = ua.indexOf("Android") !== -1;
  var bootTitleEl = screen ? screen.querySelector(".boot-titlebar-title") : null;
  if (bootTitleEl && isAndroid) bootTitleEl.textContent = "Shell öffnen";

  // Detect OS
  var osName = "Unbekanntes System";
  var wallpaper = null;
  if (ua.indexOf("Win") !== -1) {
   osName = "Windows erkannt – cmd.exe wird vorbereitet";
   wallpaper = "https://juergenmann-dev.github.io/Windows.jpg";
  } else if (ua.indexOf("Mac") !== -1 || ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) {
   osName = ua.indexOf("Win") === -1 && ua.indexOf("Mac") !== -1 ? "macOS erkannt – Terminal.app wird gestartet" : "iOS erkannt – Terminal wird simuliert";
   wallpaper = "https://juergenmann-dev.github.io/Mac.jpg";
  } else if (ua.indexOf("Android") !== -1) {
   osName = "Android erkannt – Shell wird geöffnet";
   wallpaper = "https://juergenmann-dev.github.io/Android.jpeg";
   document.documentElement.style.setProperty("--wallpaper", "url('" + wallpaper + "')");
   document.body.classList.add("retro-bg");
  } else if (ua.indexOf("Linux") !== -1) {
   osName = "Linux erkannt – bash wird geladen";
   wallpaper = null;
   document.documentElement.style.setProperty("--wallpaper",
    "radial-gradient(ellipse at 30% 60%, #a0522d 0%, #8b3a0f 25%, #4a1a00 55%, #1a0800 100%)"
   );
   document.body.classList.add("retro-bg");
  }
  // Apply wallpaper to boot + story screens
  if (wallpaper) {
   var credit = document.getElementById("unsplash-credit");
   if (credit) credit.style.display = "block";
  }

  await bootWait(400);
  osEl.textContent = osName;
  // Also update terminal window statusbar
  var termOs = document.getElementById("term-os");
  var termTitle = document.getElementById("term-win-title");
  if (termOs) termOs.textContent = osName.split("–")[0].trim();
  if (termTitle) {
   if (ua.indexOf("Win") !== -1) {
    termTitle.textContent = "cmd.exe";
    document.body.classList.add("os-win");
   } else if (ua.indexOf("Mac") !== -1 || ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) {
    termTitle.textContent = "lebenslauf.html — -zsh — 120x30";
    document.body.classList.add("os-mac");
   } else if (ua.indexOf("Android") !== -1) {
    termTitle.textContent = "Shell — jm";
    document.body.classList.add("os-android");
   } else if (ua.indexOf("Linux") !== -1) {
    termTitle.textContent = "bash — jm";
    document.body.classList.add("os-linux");
   } else {
    termTitle.textContent = "Terminal";
   }
  }
  await bootWait(600);

  var steps = [
   { pct: 15, status: "Systemressourcen prüfen..." },
   { pct: 32, status: isAndroid ? "Shell-Emulator laden..." : "Terminal-Emulator laden..." },
   { pct: 51, status: "Umgebungsvariablen setzen..." },
   { pct: 68, status: "Shell initialisieren..." },
   { pct: 84, status: "Verbindung herstellen..." },
   { pct: 100, status: "Bereit." },
  ];

  for (var i = 0; i < steps.length; i++) {
   var s = steps[i];
   progress.style.width = s.pct + "%";
   if (progressText) progressText.textContent = s.pct + "%";
   status.textContent = s.status;
   await bootWait(350 + Math.random() * 250);
  }

  label.textContent = isAndroid ? "Shell bereit." : "Terminal bereit.";
  await bootWait(700);

  // Remove boot screen
  screen.remove();

  // Start story
  runStory();
 }

 async function storyWait(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
 }

 function scrollStoryToBottom() {
  var container = document.getElementById("story-text");
  var p = container && container.parentElement;
  if (p) requestAnimationFrame(function() { p.scrollTop = p.scrollHeight; });
 }

 function updateMacMenuBar(app) {
  var nameEl = document.getElementById("menu-bar-app-name");
  var subEl = document.getElementById("menu-bar-app-sub");
  var geheEl = document.getElementById("menu-bar-gehe-zu");
  if (!nameEl || !subEl) return;
  if (app === "terminal") {
   nameEl.textContent = "Terminal";
   subEl.textContent = "Shell";
   if (geheEl) geheEl.style.display = "none";
  } else {
   nameEl.textContent = "Finder";
   subEl.textContent = "Ablage";
   if (geheEl) geheEl.style.display = "";
  }
 }

 async function runStory() {
  // Android hat eigene Chat-UI
  if (document.body.classList.contains("os-android")) {
   runAndroidStory();
   return;
  }
  var container = document.getElementById("story-text");
  var screen = document.getElementById("story-screen");
  if (screen) screen.style.display = "flex";
  if (document.body.classList.contains("os-mac")) updateMacMenuBar("terminal");
  var dockTerm = document.getElementById("dock-term-icon");
  var taskbarTerm = document.getElementById("taskbar-term-icon");
  if (dockTerm) dockTerm.classList.add("active");
  if (taskbarTerm) taskbarTerm.classList.add("active");
  if (!container || !screen) { runInstallation(); return; }

  var isWin = document.body.classList.contains("os-win");
  var isAndroid = document.body.classList.contains("os-android");
  var promptStr = isWin ? "C:\\Users\\jm\\lebenslauf>" : (isAndroid ? "shell>$ " : "jm@Mac lebenslauf %");
  var installCmdStr = isWin ? "winget install jürgen-mann" : (isAndroid ? "pm install jürgen-mann" : "brew install jürgen-mann");
  var outputCmdStr = isWin ? "echo" : (isAndroid ? "log" : "print story");

  var storyTitleEl = screen.querySelector(".term-win-title");
  var storyStatusEl = screen.querySelector(".term-win-statusbar");
  if (storyTitleEl && isWin) storyTitleEl.textContent = "Eingabeaufforderung — cmd.exe";
  if (storyStatusEl && isWin) storyStatusEl.innerHTML = "<span>C:\\Users\\jm</span><span>lebenslauf</span>";
  if (storyTitleEl && isAndroid) storyTitleEl.textContent = "Shell — jm";
  if (storyStatusEl && isAndroid) storyStatusEl.innerHTML = "<span>jm@Android</span><span>lebenslauf</span>";

  // Jede Zeile bekommt ein eigenes div mit print("...") Prefix + Cursor am Ende
  var storyText = [
   "Moin.",
   "",
   "Ich möchte dich auf eine kleine Reise mitnehmen.",
   "",
   "In eine Welt,",
   "die auf den ersten Blick nicht das ist, was sie vorgibt zu sein.",
   "aber eigentlich von einem Menschen erzählt,",
   "der ein wunderbares Projekt gebaut hat.",
   "",
   "Lass dich treiben.",
   "Nicht alles erklärt sich sofort.",
   "Manches öffnet sich erst,",
   "wenn du genauer hinschaust.",
   "",
   "Und wenn du denkst – wow. Oder holy shit –",
   "schließ die Augen.",
   "Und lausch der Musik.",
   "",
   "Willkommen.",
  ];

  function typeInto(rowEl, text, speed) {
   return new Promise(function(resolve) {
    var i = 0;
    var cur = rowEl.querySelector(".story-cursor");
    function tick() {
     if (i < text.length) {
      cur.insertAdjacentText("beforebegin", text[i]);
      i++;
      setTimeout(tick, speed);
     } else { resolve(); }
    }
    tick();
   });
  }

  // Last login Zeile – nur Mac
  if (!isWin && !isAndroid) {
   var now = new Date();
   var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var hh = now.getHours().toString().padStart(2,'0');
   var mm = now.getMinutes().toString().padStart(2,'0');
   var ss = now.getSeconds().toString().padStart(2,'0');
   var lastLogin = 'Last login: ' + days[now.getDay()] + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ' ' + hh + ':' + mm + ':' + ss + ' on ttys000';
   var loginRow = document.createElement('div');
   loginRow.style.cssText = 'line-height:1.6; margin-bottom:0.6em; opacity:0.55; font-size:0.95em;';
   loginRow.textContent = lastLogin;
   container.appendChild(loginRow);
   scrollStoryToBottom();
   await storyWait(300);
  }

  // Header: Prompt sofort setzen, dann Befehl eintippen
  var headerRow = document.createElement("div");
  headerRow.style.cssText = "line-height:1.8; margin-bottom:0.2em;";

  // Prompt sofort (nicht eintippen)
  var promptSpan = document.createElement("span");
  promptSpan.style.opacity = "0.6";
  promptSpan.textContent = promptStr;
  headerRow.appendChild(promptSpan);

  // Leerzeichen + Cursor + leerer Befehlstext
  var spaceSpan = document.createElement("span");
  spaceSpan.textContent = " ";
  headerRow.appendChild(spaceSpan);

  var cmdTextSpan = document.createElement("span");
  cmdTextSpan.style.opacity = "0.9";
  var cmdCursor = document.createElement("span");
  cmdCursor.className = "story-cursor";
  cmdTextSpan.appendChild(cmdCursor);
  headerRow.appendChild(cmdTextSpan);
  container.appendChild(headerRow);
  scrollStoryToBottom();
  await storyWait(400);

  // 1. Befehl eintippen (outputCmdStr = "print")
  await typeInto(cmdTextSpan, outputCmdStr, 90);
  // Cursor ausblenden
  cmdCursor.style.display = "none";
  await storyWait(350);

  // 2. Ausgabe-Zeile
  var outputRow = document.createElement("div");
  outputRow.style.cssText = "line-height:1.8; margin-bottom:0.4em; opacity:0.9;";
  outputRow.textContent = "Befehl erhalten: " + outputCmdStr;
  container.appendChild(outputRow);
  scrollStoryToBottom();
  await storyWait(600);



  var divRow = document.createElement("div");
  divRow.style.cssText = "line-height:1.4; margin-bottom:0.6em; opacity:0.25;";
  divRow.textContent = "─".repeat(48);
  container.appendChild(divRow);
  scrollStoryToBottom();
  await storyWait(300);

  // Öffnung: print(""" / echo """ / log("""
  var openRow = document.createElement("div");
  openRow.style.cssText = "line-height:1.8;";
  openRow.innerHTML = '<span style="opacity:0.45;">' + outputCmdStr + (isWin ? ' """' : '("""') + '</span>';
  container.appendChild(openRow);
  scrollStoryToBottom();
  await storyWait(400);

  // Jede Zeile einrückt tippen
  for (var i = 0; i < storyText.length; i++) {
   var row = document.createElement("div");
   row.style.cssText = "line-height:1.8; padding-left:1.8em;";
   var cur = document.createElement("span");
   cur.className = "story-cursor";
   row.appendChild(cur);
   container.appendChild(row);
   scrollStoryToBottom();

   if (storyText[i] === "") {
    await storyWait(350);
   } else {
    await typeInto(row, storyText[i], 36);
    scrollStoryToBottom();
    var pause = storyText[i].endsWith(".") ? 480 : 180;
    await storyWait(pause);
   }
   cur.remove();
  }

  // Abschluss: """) (Mac) / """ (Win)  mit Cursor der bleibt
  var closeRow = document.createElement("div");
  closeRow.style.cssText = "line-height:1.8;";
  var closeCur = document.createElement("span");
  closeCur.className = "story-cursor";
  closeRow.innerHTML = '<span style="opacity:0.45;">"""' + (isWin ? '' : ')') + '</span>';
  closeRow.appendChild(closeCur);
  container.appendChild(closeRow);
  scrollStoryToBottom();

  // 5 Sekunden warten
  await storyWait(5000);

  // Letzten Cursor entfernen
  var lastCursor = container.querySelector(".story-cursor");
  if (lastCursor) lastCursor.remove();

  // Typische Konsolenausgabe: clear-Befehl
  var storyContainer = document.getElementById("story-text");
  var promptLine = document.createElement("div");
  promptLine.style.cssText = "line-height:1.8;";
  promptLine.innerHTML = '<span style="opacity:0.6;">' + promptStr + '</span> <span style="opacity:0.9;">clear</span>';
  storyContainer.appendChild(promptLine);
  scrollStoryToBottom();
  await storyWait(600);

  storyContainer.textContent = "";
  scrollStoryToBottom();
  await storyWait(300);

  // brew install animiert eintippen
  var brewRow = document.createElement("div");
  brewRow.style.cssText = "line-height:1.8;";
  var brewPromptSpan = document.createElement("span");
  brewPromptSpan.style.opacity = "0.6";
  brewPromptSpan.textContent = promptStr + " ";
  var brewCmdSpan = document.createElement("span");
  brewCmdSpan.style.opacity = "0.9";
  var brewCursor = document.createElement("span");
  brewCursor.className = "story-cursor";
  brewCmdSpan.appendChild(brewCursor);
  brewRow.appendChild(brewPromptSpan);
  brewRow.appendChild(brewCmdSpan);
  storyContainer.appendChild(brewRow);
  scrollStoryToBottom();
  await storyWait(300);

  // Befehl Zeichen für Zeichen eintippen
  var brewStr = installCmdStr;
  await new Promise(function(res) {
   var bi = 0;
   function tick() {
    if (bi < brewStr.length) {
     brewCursor.insertAdjacentText("beforebegin", brewStr[bi++]);
     scrollStoryToBottom();
     setTimeout(tick, 65 + Math.random() * 40);
    } else { res(); }
   }
   tick();
  });
  brewCursor.style.display = "none";
  await storyWait(500);

  // Story Screen weg – Installationsterminal übernimmt
  screen.remove();

  runInstallation();
 }

 /* ══ ANDROID: Uhr + Akku in Statusbar (Original-Zustand wie Gerät) ══ */
 function updateAndroidClock() {
  var el = document.getElementById('android-time');
  if (!el) return;
  var d = new Date();
  el.textContent = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
 }
 function updateAndroidBattery(battery) {
  var el = document.getElementById('android-battery');
  if (!el) return;
  if (!battery) {
   el.textContent = '–%🔋';
   return;
  }
  var pct = Math.round(battery.level * 100);
  var icon = battery.charging ? '⚡' : '🔋';
  el.textContent = pct + '%' + icon;
 }
 if (document.body.classList.contains('os-android')) {
  updateAndroidClock();
  setInterval(updateAndroidClock, 30000);
  document.body.style.paddingTop = '24px';
  if (navigator.getBattery) {
   navigator.getBattery().then(function(b) {
    updateAndroidBattery(b);
    b.addEventListener('levelchange', function() { updateAndroidBattery(b); });
    b.addEventListener('chargingchange', function() { updateAndroidBattery(b); });
   }).catch(function() { updateAndroidBattery(null); });
  }
 }

 /* ══ ANDROID: Home Screen → Notification → Chat (Reise) öffnen ══ */
 function wait(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }
 async function openAndroidChatFromNotification() {
  var home = document.getElementById('android-homescreen');
  var notif = document.getElementById('android-notification');
  var storyEl = document.getElementById('android-story');
  if (!notif || !storyEl) { runAndroidStory(); return; }
  if (notif.classList.contains('opening')) return;
  notif.classList.add('tapped');
  var hintEl = notif.querySelector('.android-notification-hint');
  if (hintEl) hintEl.textContent = 'Öffnen …';
  await wait(1100);
  notif.classList.remove('tapped');
  notif.classList.add('opening');
  if (home) home.classList.add('screen-out');
  if (storyEl) storyEl.classList.add('active');
  await wait(380);
  if (home) home.classList.remove('visible', 'screen-out');
  notif.classList.remove('visible', 'opening');
  if (hintEl) hintEl.textContent = 'Tippen';
  runAndroidStory();
 }

 function runAndroidHomeFlow() {
  var home = document.getElementById('android-homescreen');
  var notif = document.getElementById('android-notification');
  if (!home || !notif) { runAndroidStory(); return; }
  home.classList.add('visible');
  notif.classList.remove('visible');
  var storyEl = document.getElementById('android-story');
  if (storyEl) storyEl.classList.remove('active');
  var autoTimerId = null;
  function onPress() { notif.classList.add('pressing'); }
  function onRelease() { notif.classList.remove('pressing'); }
  notif.addEventListener('touchstart', onPress, { passive: true });
  notif.addEventListener('mousedown', onPress);
  notif.addEventListener('touchend', onRelease, { passive: true });
  notif.addEventListener('mouseup', onRelease);
  notif.addEventListener('mouseleave', onRelease);
  notif.addEventListener('click', function onNotifClick() {
   notif.removeEventListener('click', onNotifClick);
   notif.removeEventListener('touchstart', onPress);
   notif.removeEventListener('mousedown', onPress);
   notif.removeEventListener('touchend', onRelease);
   notif.removeEventListener('mouseup', onRelease);
   notif.removeEventListener('mouseleave', onRelease);
   if (autoTimerId != null) { clearTimeout(autoTimerId); autoTimerId = null; }
   notif.classList.remove('pressing');
   openAndroidChatFromNotification();
  });
  notif.addEventListener('keydown', function onNotifKey(e) {
   if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    notif.removeEventListener('keydown', onNotifKey);
    if (autoTimerId != null) { clearTimeout(autoTimerId); autoTimerId = null; }
    notif.classList.remove('pressing');
    openAndroidChatFromNotification();
   }
  });
  setTimeout(function() {
   notif.classList.add('visible');
   autoTimerId = setTimeout(function() {
    if (notif.classList.contains('visible') && !notif.classList.contains('opening')) {
     openAndroidChatFromNotification();
    }
   }, 5000);
  }, 1200);
 }

 /* ══ ANDROID: Story als Chat ══ */
 async function runAndroidStory() {
  var storyEl = document.getElementById('android-story');
  var msgs = document.getElementById('android-chat-messages');
  var typing = document.getElementById('chat-typing');
  var statusEl = document.getElementById('android-chat-status');
  var installBtn = document.getElementById('android-chat-install-btn');
  if (!storyEl || !msgs) { startAndroidInstall(); return; }

  storyEl.classList.add('active');

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function showTyping(ms) {
   typing.classList.add('visible');
   msgs.appendChild(typing);
   msgs.scrollTop = msgs.scrollHeight;
   await wait(ms);
   typing.classList.remove('visible');
  }

  async function addBubble(text, type, delay) {
   await showTyping(delay || 1200);
   var b = document.createElement('div');
   b.className = 'chat-bubble ' + (type || 'received');
   b.textContent = text;
   msgs.insertBefore(b, typing);
   msgs.scrollTop = msgs.scrollHeight;
   await wait(60);
   b.classList.add('visible');
   await wait(400);
  }

  async function addSystem(text) {
   await wait(600);
   var b = document.createElement('div');
   b.className = 'chat-bubble system';
   b.textContent = text;
   msgs.insertBefore(b, typing);
   msgs.scrollTop = msgs.scrollHeight;
   await wait(80);
   b.classList.add('visible');
   await wait(500);
  }

  statusEl.textContent = 'tippt...';
  await wait(800);

  await addSystem('Kioskmodus temporär aktiv. Installation erfolgt im Anschluss.');
  await wait(400);

  var messages = (window.STORY_DATA && window.STORY_DATA.messages) || [
    { type: 'bubble', text: 'Moin. 👋', delay: 900 },
    { type: 'bubble', text: 'Ich möchte dich auf eine kleine Reise mitnehmen.', delay: 1400 },
    { type: 'bubble', text: 'In eine Welt, die auf den ersten Blick wie ein Lebenslauf aussieht –', delay: 1800 },
    { type: 'bubble', text: 'aber eigentlich von einem Menschen erzählt, der ein wunderbares Projekt gebaut hat.', delay: 1600 },
    { type: 'system', text: 'Heute, ' },
    { type: 'bubble', text: 'Lass dich treiben. Nicht alles erklärt sich sofort.', delay: 1500 },
    { type: 'bubble', text: 'Manches öffnet sich erst, wenn du genauer hinschaust. 🔍', delay: 1400 },
    { type: 'bubble', text: 'Und wenn du denkst – wow. Oder holy shit –', delay: 1600 },
    { type: 'bubble', text: 'schließ die Augen. Und lausch der Musik. 🎵', delay: 1200 },
    { type: 'bubble', text: 'Willkommen. 🚀', delay: 1400 },
    { type: 'bubble', text: '📦 Lebenslauf wird installiert...', delay: 1000 }
  ];
  for (var m = 0; m < messages.length; m++) {
    var msg = messages[m];
    var text = msg.text || '';
    if (msg.type === 'system') {
      if (text.indexOf('Heute,') !== -1) text = text + new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
      await addSystem(text);
    } else {
      await addBubble(text, 'received', msg.delay || 1200);
    }
  }

  statusEl.textContent = 'online';
  await wait(600);
  startAndroidInstall();
 }

 /* ══ ANDROID: Package Installer öffnen ══ */

 /* ══ ANDROID: Installation ══ */

 function startAndroidInstall() {
  var story = document.getElementById('android-story');
  if (story) { story.style.display = 'none'; story.classList.remove('active'); }
  var home = document.getElementById('android-homescreen');
  if (home) { home.classList.add('visible'); home.classList.remove('screen-out'); }
  var installer = document.getElementById('android-installer');
  if (!installer) { runInstallation(); return; }
  installer.style.display = 'flex';
  var perms = ['perm-1','perm-2','perm-3','perm-4'];
  for (var i = 0; i < perms.length; i++) {
   (function(idx) {
    setTimeout(function() {
     var el = document.getElementById(perms[idx]);
     if (el) el.classList.add('visible');
     if (idx === perms.length - 1) setTimeout(runAndroidInstall, 800);
    }, 250 + idx * 300);
   })(i);
  }
 }

 async function runAndroidInstall() {
  var CIRC = 100.53;
  var overallBar = document.getElementById('apk-overall-bar');
  var overallFill = document.getElementById('apk-overall-fill');
  var overallStatus = document.getElementById('apk-overall-status');
  var overallPct = document.getElementById('apk-overall-pct');
  if (overallBar) overallBar.classList.add('visible');

  function wait(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

  function setOverall(pct, label) {
   if (overallFill) overallFill.style.width = pct + '%';
   if (overallPct) overallPct.textContent = Math.round(pct) + '%';
   if (overallStatus && label) overallStatus.textContent = label;
  }

  async function animateRing(n, from, to) {
   var rf = document.getElementById('ring-fill-' + n);
   if (!rf) return;
   var cur = from;
   while (cur < to) {
    cur = Math.min(cur + 2, to);
    rf.style.strokeDashoffset = CIRC - (CIRC * cur / 100);
    await wait(30);
   }
  }

  async function rollbackRing(n, from, to) {
   var rf = document.getElementById('ring-fill-' + n);
   if (!rf) return;
   rf.style.stroke = '#e53935';
   var cur = from;
   while (cur > to) {
    cur = Math.max(cur - 3, to);
    rf.style.strokeDashoffset = CIRC - (CIRC * cur / 100);
    await wait(25);
   }
   await wait(200);
   rf.style.stroke = '#3ddc84';
  }

  function openDetail(n) { var d = document.getElementById('detail-' + n); if (d) d.classList.add('open'); }
  async function closeDetail(n) { var d = document.getElementById('detail-' + n); if (d) d.classList.remove('open'); await wait(420); }

  var steps = (window.STORY_DATA && window.STORY_DATA.installSteps) || [
    { label: 'Systemarchitektur laden...', pct: 0 },
    { label: 'Systemarchitektur ✓', pct: 25 },
    { label: 'Deep Work Mode aktivieren...', pct: 25 },
    { label: 'Deep Work Mode ✓', pct: 50 },
    { label: 'Firebase & SwiftUI verknüpfen...', pct: 50 },
    { label: 'Firebase & SwiftUI ✓', pct: 75 },
    { label: 'Kaffee-Integration...', pct: 75 },
    { label: '✓ Installation abgeschlossen', pct: 100 }
  ];
  var pkg4 = (window.STORY_DATA && window.STORY_DATA.packages && window.STORY_DATA.packages[3]) || {};
  var thankYou = (window.STORY_DATA && window.STORY_DATA.thankYou) || { title: 'Installation abgeschlossen', body: 'Vielen Dank. Lebenslauf wird gestartet...' };

  // Schritt 1
  setOverall(steps[0].pct, steps[0].label);
  openDetail(1); await wait(300);
  await animateRing(1, 0, 100);
  setOverall(steps[1].pct, steps[1].label);
  await wait(600); await closeDetail(1);

  // Schritt 2
  setOverall(steps[2].pct, steps[2].label);
  openDetail(2); await wait(300);
  await animateRing(2, 0, 100);
  setOverall(steps[3].pct, steps[3].label);
  await wait(600); await closeDetail(2);

  // Schritt 3
  setOverall(steps[4].pct, steps[4].label);
  openDetail(3); await wait(300);
  await animateRing(3, 0, 100);
  setOverall(steps[5].pct, steps[5].label);
  await wait(600); await closeDetail(3);

  // Schritt 4: Kaffee mit Gag
  setOverall(steps[6].pct, steps[6].label);
  openDetail(4); await wait(300);
  await animateRing(4, 0, 62);
  await rollbackRing(4, 62, 0);
  var d4 = document.querySelector('#detail-4 .apk-perm-detail-inner');
  if (d4) d4.innerHTML = (pkg4.detailRollback != null ? pkg4.detailRollback : '<span>Versuch 1</span> · Wassertank leer. ✗<br><span>Versuch 2</span> · Kaffee vergessen. ✗<br><span>Versuch 3</span> · ☕ läuft endlich...');
  await wait(400);
  await animateRing(4, 0, 100);
  if (d4) d4.innerHTML = (pkg4.detailDone != null ? pkg4.detailDone : '<span>Status</span> · Läuft. Endlich. ☕<br><span>Warnung</span> · Ohne Kaffee keine Commits.');
  setOverall(steps[7].pct, steps[7].label);
  await wait(1200);
  await closeDetail(4);

  await wait(800);

  // Danke-Screen (aus STORY_DATA.thankYou)
  var thankEl = document.createElement('div');
  thankEl.style.cssText = 'text-align:center;padding:16px 24px 20px;font-size:13px;color:#9e9e9e;line-height:1.6;';
  thankEl.innerHTML = '<div style="font-size:22px;margin-bottom:8px;">✅</div><div style="color:#fff;font-weight:600;font-size:15px;margin-bottom:4px;">' + (thankYou.title || 'Installation abgeschlossen') + '</div><div>' + (thankYou.body || 'Vielen Dank. Lebenslauf wird gestartet...') + '</div>';
  var card = document.querySelector('.apk-card');
  if (card) card.appendChild(thankEl);

  await wait(1800);

  // Android: Übergang zum Deckblatt – Overlays ausblenden, Homescreen weg, removeOverlay()
  var installer = document.getElementById('android-installer');
  var androidStory = document.getElementById('android-story');
  var androidStatusbar = document.getElementById('android-statusbar');
  var androidHome = document.getElementById('android-homescreen');
  if (installer) installer.style.display = 'none';
  if (androidStory) androidStory.style.display = 'none';
  if (androidStatusbar) androidStatusbar.style.display = 'none';
  if (androidHome) androidHome.classList.remove('visible', 'screen-out');
  document.body.style.paddingTop = '';
  removeOverlay();
 }

 // 2_mac: Uhr + Spotlight – nur für macOS
 (function init2Mac() {
  if (!document.body.classList.contains("os-mac")) return;
  var macClockEl = document.getElementById("mac-menu-clock");
  if (macClockEl) {
   function tick() {
    var now = new Date();
    macClockEl.textContent = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
   }
   tick();
   setInterval(tick, 60000);
  }
  var spot = document.getElementById("spotlight-screen");
  if (spot) spot.style.display = "block";
  document.body.classList.add("spotlight-active");
  setTimeout(function() {
   if (typeof runSpotlightSimulation === "function") runSpotlightSimulation();
  }, 400);
 })();

 })();
 function getFaviconUri(mode) {
 var label = "JM";
 var size = 28;
 if (mode === "deckblatt") { label = "JM"; size = 28; }
 else if (mode === "design") { label = "HO"; size = 28; }
 else if (mode === "onepage") { label = "S1"; size = 28; }
 else if (mode === "ats") { label = "ATS"; size = 22; }
 else if (mode === "profilplus") { label = "PR"; size = 28; }
 else if (mode === "anschreiben") { label = "AN"; size = 28; }
 else if (mode === "komplett") { label = "KO"; size = 28; }
 else if (mode === "drucken") {
 var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#141414"/><rect x="14" y="26" width="36" height="22" rx="2" fill="none" stroke="#39D353" stroke-width="2"/><rect x="10" y="14" width="44" height="16" rx="2" fill="none" stroke="#39D353" stroke-width="2"/><rect x="24" y="32" width="16" height="12" fill="none" stroke="#39D353" stroke-width="1.5"/></svg>';
 return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
 }
 var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#141414"/><text x="32" y="42" font-family="Arial,sans-serif" font-size="' + size + '" font-weight="bold" fill="#39D353" text-anchor="middle">' + label + '</text></svg>';
 return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
 }
 function updateFavicon(mode) {
 var uri = getFaviconUri(mode || "deckblatt");
 var el = document.getElementById("favicon");
 var elApple = document.getElementById("apple-touch-favicon");
 if (el) el.href = uri;
 if (elApple) elApple.href = uri;
 }
 function setMode(mode) {
 document.body.classList.remove("mode-deckblatt", "mode-design", "mode-onepage", "mode-ats", "mode-anschreiben", "mode-komplett", "mode-profilplus", "mode-drucken");
 if (mode !== "deckblatt") { document.body.classList.add("page-just-shown"); }
 document.body.classList.add("mode-" + mode);
 updateToggleActive(mode);
 updateFavicon(mode);
 if (mode !== "deckblatt") {
 setTimeout(function() { document.body.classList.remove("page-just-shown"); }, 360);
 }
 }
 function openPrintDialog() {
 var overlay = document.getElementById("printDialogOverlay");
 if (overlay) { overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false"); }
 updateFavicon("drucken");
 }
 function closePrintDialog() {
 var overlay = document.getElementById("printDialogOverlay");
 if (overlay) { overlay.classList.remove("open"); }
 var m = document.body.className.match(/mode-(\w+)/);
 updateFavicon(m ? m[1] : "deckblatt");
 var btn = document.getElementById("segDrucken");
 if (btn) { btn.focus(); }
 if (overlay) { overlay.setAttribute("aria-hidden", "true"); }
 }
 function printChoice(mode) {
 closePrintDialog();
 setMode(mode);
 updateToggleActive(mode);
 setTimeout(function() { window.print(); }, 500);
 }
 function updateToggleActive(mode) {
 document.querySelectorAll(".toggle-segment").forEach(function(btn) {
 btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
 });
 }
 function toggleHamburger() {
 var drawer = document.getElementById("hamburgerDrawer");
 if (!drawer) return;
 drawer.classList.toggle("open");
 drawer.setAttribute("aria-hidden", drawer.classList.contains("open") ? "false" : "true");
 }
 function closeHamburger() {
 var drawer = document.getElementById("hamburgerDrawer");
 if (drawer) { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); }
 }
 function typeChars(span, str, speedMs, onDone) {
 var j = 0;
 function step() {
 if (j < str.length) {
 span.textContent += str.charAt(j);
 j++;
 setTimeout(step, speedMs);
 } else { if (onDone) onDone(); }
 }
 step();
 }
 function backspaceChars(span, count, delayMs, onDone) {
 var n = 0;
 function step() {
 if (n < count) {
 span.textContent = span.textContent.slice(0, -1);
 n++;
 setTimeout(step, delayMs);
 } else { if (onDone) onDone(); }
 }
 step();
 }
 function typeWriter(el, text, speedMs, onDone, withCursor, pauseAfter, typo) {
 if (withCursor === undefined) { withCursor = true; }
 var span = document.createElement("span");
 span.className = "typed";
 el.appendChild(span);
 if (withCursor) {
 var cursor = document.createElement("span");
 cursor.className = "typewriter-cursor";
 cursor.setAttribute("aria-hidden", "true");
 el.appendChild(cursor);
 }
 var i = 0;
 var pauseDone = !pauseAfter;
 var typoDone = !typo || !typo.after || text.indexOf(typo.after) !== 0;
 function finish() {
 if (withCursor && el.querySelector(".typewriter-cursor")) {
 el.querySelector(".typewriter-cursor").classList.add("hidden");
 }
 if (onDone) { setTimeout(onDone, 400); }
 }
 function tick() {
 if (i < text.length) {
 if (typo && typo.after && typo.wrong && !typoDone && i === typo.after.length) {
 typoDone = true;
 typeChars(span, typo.wrong, speedMs, function() {
 backspaceChars(span, typo.wrong.length, 55, function() {
 typeChars(span, text.substring(typo.after.length), speedMs, finish);
 });
 });
 return;
 }
 span.textContent += text.charAt(i);
 i++;
 if (pauseAfter && pauseDone === false && text.indexOf(pauseAfter) === 0 && i === pauseAfter.length) {
 setTimeout(function() { pauseDone = true; tick(); }, 1400);
 return;
 }
 setTimeout(tick, speedMs);
 } else { finish(); }
 }
 tick();
 }
 function runDeckblattTypewriter() {
 var lines = document.querySelectorAll(".deckblatt-page .deckblatt-slogan-line");
 if (!lines.length) { return; }
 // Sauber resetten – verhindert Ghost-Effekt bei Doppelaufruf
 lines.forEach(function(line) {
  var prefixEl = line.querySelector(".deckblatt-print-prefix");
  var contentEl = line.querySelector(".deckblatt-slogan-content");
  if (prefixEl) prefixEl.innerHTML = "";
  if (contentEl) contentEl.innerHTML = "";
  line.classList.remove("done", "fade-out");
 });
 document.body.classList.remove("deckblatt-typing-done");
 var isAndroidDeckblatt = document.body.classList.contains("os-android");
 var prefixText = isAndroidDeckblatt ? 'Log.d("CV", "' : "print(\"";
 if (isAndroidDeckblatt) {
  lines.forEach(function(line) {
   var suf = line.querySelector(".deckblatt-print-suffix");
   if (suf) suf.textContent = '")';
  });
 }
 var charSpeed = 55;
 var prefixSpeed = 35;
 var pauseBetween = 380;
 function run(index) {
 if (index >= lines.length) {
 document.body.classList.add("deckblatt-typing-done");
 return;
 }
 var line = lines[index];
 var prefixEl = line.querySelector(".deckblatt-print-prefix");
 var contentEl = line.querySelector(".deckblatt-slogan-content");
 var text = contentEl ? contentEl.getAttribute("data-typewriter") || "" : "";
 var pauseAfter = contentEl ? contentEl.getAttribute("data-pause-after") || "" : "";
 var typoAfter = contentEl ? contentEl.getAttribute("data-typo-after") || "" : "";
 var typoWrong = contentEl ? contentEl.getAttribute("data-typo-wrong") || "" : "";
 var typo = (typoAfter && typoWrong) ? { after: typoAfter, wrong: typoWrong } : null;
 if (!contentEl) { run(index + 1); return; }
 function startContent() {
  typeWriter(contentEl, text, charSpeed, function() {
   line.classList.add("done");
   if (line.classList.contains("deckblatt-slogan-nl")) {
    setTimeout(function() {
     line.classList.add("fade-out");
    }, 500);
   }
   setTimeout(function() { run(index + 1); }, pauseBetween);
  }, true, pauseAfter || undefined, typo);
 }
 if (prefixEl) {
  typeWriter(prefixEl, prefixText, prefixSpeed, startContent, false);
 } else {
  startContent();
 }
 }
 run(0);
 }
 function toggleFlowMusic() {
  var audio = window._flowAudio;
  var btn = document.getElementById("musicToggleBtn");
  var popup = document.getElementById("track-popup");
  // Popup bereits offen – schließen
  if (popup) { popup.remove(); return; }
  if (!audio || audio.error) {
   // Kein Track oder Fehler – Auswahl zeigen
   showTrackSelection();
   return;
  }
  if (audio.paused) {
   audio.play().catch(function() { showTrackSelection(); });
   if (btn) { btn.classList.add("playing"); btn.title = "Musik pausieren"; }
  } else {
   // Läuft bereits – Auswahl für Track-Wechsel zeigen
   showTrackSelection();
  }
 }

 function showTrackSelection() {
  var zenSrc = "../musik/zen_wind.mp3";
  var birdsSrc = "../musik/birds_piano.mp3";
  // Kleines Popup über dem Button (sichtbaren Button nutzen – auf Mobile der in der Bottom-Nav)
  var existing = document.getElementById("track-popup");
  if (existing) { return; }
  var popup = document.createElement("div");
  popup.id = "track-popup";
  popup.style.cssText = "position:absolute;background:#161b22;border:1px solid rgba(57,211,83,0.35);border-radius:8px;padding:12px 16px;font-family:inherit;font-size:12px;color:#e6edf3;z-index:9000;box-shadow:0 8px 24px rgba(0,0,0,0.5);white-space:nowrap;animation:track-popup-fade 0.2s ease;";
  var btn = document.getElementById("musicToggleBtn");
  if (!btn || btn.offsetParent === null) btn = document.querySelector(".bottom-nav-music");
  if (!btn) return;
  btn.style.position = "relative";
  btn.appendChild(popup);
  var isBottomNav = btn.closest && btn.closest(".bottom-nav");
  if (isBottomNav) {
   popup.style.bottom = "calc(100% + 8px)";
   popup.style.top = "auto";
   popup.style.left = "50%";
   popup.style.transform = "translateX(-50%)";
  } else {
   popup.style.top = "calc(100% + 8px)";
   popup.style.left = "50%";
   popup.style.transform = "translateX(-50%)";
  }
  // Buttons per DOM erstellen – kein inline onclick mit Anführungszeichen
  var title = document.createElement("div");
  title.style.cssText = "color:#39D353;margin-bottom:8px;font-weight:700;";
  title.textContent = "♪ Flow Mode";
  popup.appendChild(title);
  var btnStyle = "display:block;width:100%;text-align:left;background:none;border:none;font-family:inherit;font-size:12px;padding:6px 0;cursor:pointer;border-radius:4px;transition:color 0.15s,background 0.15s;";
  var b1 = document.createElement("button");
  b1.className = "track-popup-btn";
  b1.style.cssText = btnStyle + "color:#e6edf3;";
  b1.textContent = "1 – Zen Wind";
  b1.addEventListener("click", function() { selectTrack("zen"); });
  popup.appendChild(b1);
  var b2 = document.createElement("button");
  b2.className = "track-popup-btn";
  b2.style.cssText = btnStyle + "color:#e6edf3;";
  b2.textContent = "2 – Birds & Piano";
  b2.addEventListener("click", function() { selectTrack("birds"); });
  popup.appendChild(b2);
  // Pause-Option nur wenn Musik läuft
  if (window._flowAudio && !window._flowAudio.paused) {
   var sep = document.createElement("div");
   sep.style.cssText = "border-top:1px solid rgba(57,211,83,0.2);margin:6px 0;";
   popup.appendChild(sep);
   var bPause = document.createElement("button");
   bPause.className = "track-popup-btn";
   bPause.style.cssText = btnStyle + "color:#7d8590;";
   bPause.textContent = "⏸ Pausieren";
   bPause.addEventListener("click", function() { selectTrack("pause"); });
   popup.appendChild(bPause);
  }
  // popup already appended to btn above
  // Klick außerhalb schließt
  setTimeout(function() {
   document.addEventListener("click", function closePop(e) {
    if (!popup.contains(e.target) && e.target.id !== "musicToggleBtn" && !e.target.classList.contains("bottom-nav-music")) {
     popup.remove();
     document.removeEventListener("click", closePop);
    }
   });
  }, 100);
 }

 function selectTrack(which) {
  var popup = document.getElementById("track-popup");
  if (popup) popup.remove();
  // Vorherigen Track sauber stoppen
  if (window._flowAudio) { window._flowAudio.pause(); window._flowAudio = null; }
  var btn = document.getElementById("musicToggleBtn");
  if (which === "pause") {
   if (btn) { btn.classList.remove("playing"); btn.title = "Musik abspielen"; }
   return;
  }
  var src = which === "zen" ? "../musik/zen_wind.mp3" : "../musik/birds_piano.mp3";
  var label = which === "zen" ? "Zen Wind" : "Birds & Piano";
  var audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.3;
  audio.play().catch(function() {});
  window._flowAudio = audio;
  if (btn) { btn.classList.add("playing"); btn.title = "♪ " + label; }
 }

 function showMusicBtn() {
  var btn = document.getElementById("musicToggleBtn");
  if (btn) {
   btn.classList.add("playing");
   btn.title = "Musik pausieren";
  }
 }

 (function initMusicBtnHover() {
  var btn = document.getElementById("musicToggleBtn");
  if (!btn) return;
  var hideTimer;
  btn.addEventListener("mouseenter", function() {
   if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
   showTrackSelection();
  });
  btn.addEventListener("mouseleave", function() {
   var popup = document.getElementById("track-popup");
   if (popup) {
    hideTimer = setTimeout(function() {
     if (popup.parentNode) popup.remove();
     hideTimer = null;
    }, 150);
   }
  });
 })();

 function tryFullscreen(userGesture) {
 if (userGesture) { markKioskUsed(); }
 if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
 document.documentElement.requestFullscreen().catch(function() {});
 }
 }
 function markKioskUsed() {
 try { sessionStorage.setItem("kioskUsed", "1"); } catch (e) {}
 document.body.classList.add("kiosk-used");
 }
 /* Tech Stack: einzige Quelle story/content/techskills_Kernkompetenz-data.js (window.TECHSKILLS_KERNKOMPETENZ) – auf allen Devices. */
var TK = window.TECHSKILLS_KERNKOMPETENZ;
var TECHSTACK_ICONS = (TK && TK.icons) ? TK.icons : {};
var TECHSTACK_ITEMS = (TK && TK.techStackItems && TK.techStackItems.length) ? TK.techStackItems : [];
var TECHSTACK_EXTRA_ITEMS = (TK && TK.techStackExtraItems && TK.techStackExtraItems.length) ? TK.techStackExtraItems : [];
 function initHandoffTechstack() {
 var section = document.querySelector(".design-page .techstack-section");
 if (!section) return;
 var header = section.querySelector(".techstack-header");
 var panel = section.querySelector(".techstack-panel");
 var itemsContainer = section.querySelector(".techstack-items");
 var extraItemsContainer = section.querySelector(".techstack-extra-items");
 var extraHeading = section.querySelector(".techstack-extra-heading");
 var detailEl = section.querySelector(".techstack-detail");
 var detailContent = section.querySelector(".techstack-detail-content");
 if (!header || !panel || !itemsContainer || !extraItemsContainer || !detailEl || !detailContent) return;
 if (extraHeading && TK && TK.techStackExtraHeading) extraHeading.textContent = TK.techStackExtraHeading;
 header.setAttribute("aria-controls", "techstack-panel-handoff");
 panel.id = "techstack-panel-handoff";
 // Cancel-Token: wird bei jedem Schließen hochgezählt → laufende Typewriter-Ticks prüfen und stoppen
 var token = { v: 0 }; // per Referenz übergeben – sichtbar für runTechstackItemsTypewriter

 function resetItems() {
  detailContent.innerHTML = "";
  detailEl.hidden = true;
  section.classList.remove("extra-visible");
  itemsContainer.querySelectorAll(".techstack-item-label").forEach(function(lbl) { lbl.innerHTML = ""; });
  extraItemsContainer.querySelectorAll(".techstack-item-label").forEach(function(lbl) { lbl.innerHTML = ""; });
  itemsContainer.querySelectorAll(".techstack-item-icon").forEach(function(icon) { icon.classList.remove("visible"); });
  extraItemsContainer.querySelectorAll(".techstack-item-icon").forEach(function(icon) { icon.classList.remove("visible"); });
 }

 function toggleOpen() {
  var open = section.classList.toggle("open");
  header.setAttribute("aria-expanded", open ? "true" : "false");
  token.v++; // invalidiert alle laufenden Typewriter-Ticks
  resetItems();
  if (!open) return;
  runTechstackItemsTypewriter(section, itemsContainer, extraItemsContainer, detailEl, detailContent, token);
 }
 header.addEventListener("click", toggleOpen);
 header.addEventListener("keydown", function(e) {
 if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleOpen(); }
 });
 TECHSTACK_ITEMS.forEach(function(item) {
 var btn = document.createElement("button");
 btn.type = "button";
 btn.className = "techstack-item";
 btn.setAttribute("data-key", item.key);
 btn.setAttribute("data-detail", item.detail);
 if (TECHSTACK_ICONS[item.key]) {
 var iconSpan = document.createElement("span");
 iconSpan.className = "techstack-item-icon";
 iconSpan.innerHTML = TECHSTACK_ICONS[item.key];
 btn.appendChild(iconSpan);
 }
 var label = document.createElement("span");
 label.className = "techstack-item-label";
 btn.appendChild(label);
 itemsContainer.appendChild(btn);
 });
TECHSTACK_EXTRA_ITEMS.forEach(function(item) {
 var btn = document.createElement("button");
 btn.type = "button";
 btn.className = "techstack-item";
 btn.setAttribute("data-key", item.key);
 btn.setAttribute("data-detail", item.detail);
 if (TECHSTACK_ICONS[item.key]) {
 var iconSpan = document.createElement("span");
 iconSpan.className = "techstack-item-icon";
 iconSpan.innerHTML = TECHSTACK_ICONS[item.key];
 btn.appendChild(iconSpan);
 }
 var label = document.createElement("span");
 label.className = "techstack-item-label";
 btn.appendChild(label);
 extraItemsContainer.appendChild(btn);
});
section.querySelectorAll(".techstack-item").forEach(function(btn) {
 btn.addEventListener("click", function() {
 var detail = btn.getAttribute("data-detail");
 if (!detail) return;
 detailContent.innerHTML = "";
 detailEl.hidden = false;
 typeWriter(detailContent, detail, 28, function() {
 if (detailContent.querySelector(".typewriter-cursor")) {
 detailContent.querySelector(".typewriter-cursor").classList.add("hidden");
 }
 }, true);
 });
 });
 }
 function runTechstackItemsTypewriter(section, itemsContainer, extraItemsContainer, detailEl, detailContent, tokenRef) {
 var items = itemsContainer.querySelectorAll(".techstack-item");
 var speed = 42;
 var pauseBetween = 220;
 var myVal = tokenRef.v; // snapshot beim Start
 function isStale() { return tokenRef.v !== myVal; }
 function typeNext(index) {
  if (isStale()) return;
  if (index >= items.length) {
   setTimeout(function() {
    if (isStale()) return;
    section.classList.add("extra-visible");
    var extraBtns = extraItemsContainer.querySelectorAll(".techstack-item");
    var extraSpeed = 38;
    var extraPause = 180;
    function typeExtra(i) {
     if (isStale()) return;
     if (i >= TECHSTACK_EXTRA_ITEMS.length) return;
     var cfg = TECHSTACK_EXTRA_ITEMS[i];
     var btn = extraBtns[i];
     if (!btn) { typeExtra(i + 1); return; }
     var icon = btn.querySelector(".techstack-item-icon");
     if (icon) icon.classList.add("visible");
     var lbl = btn.querySelector(".techstack-item-label");
     if (!lbl) { typeExtra(i + 1); return; }
     lbl.innerHTML = "";
     typeWriter(lbl, cfg.label, extraSpeed, function() {
      if (isStale()) return;
      setTimeout(function() { typeExtra(i + 1); }, extraPause);
     }, true);
    }
    typeExtra(0);
   }, 1000);
   return;
  }
  var btn = items[index];
  var icon = btn.querySelector(".techstack-item-icon");
  if (icon) icon.classList.add("visible");
  var labelSpan = btn.querySelector(".techstack-item-label");
  var text = TECHSTACK_ITEMS[index].label;
  if (!labelSpan || !text) { typeNext(index + 1); return; }
  labelSpan.innerHTML = "";
  typeWriter(labelSpan, text, speed, function() {
   if (isStale()) return;
   setTimeout(function() { typeNext(index + 1); }, pauseBetween);
  }, true);
 }
 typeNext(0);
 }
 document.addEventListener("DOMContentLoaded", function() {
 updateToggleActive("deckblatt");
 updateFavicon("deckblatt");
 if (sessionStorage.getItem("kioskUsed")) { document.body.classList.add("kiosk-used"); }
 initHandoffTechstack();
 });
 window.addEventListener("load", function() {
          // Typewriter wird direkt aus removeOverlay() gestartet – kein separater Listener nötig
        });
 document.addEventListener("click", function() { tryFullscreen(true); }, { once: true });
 document.addEventListener("keydown", function() { tryFullscreen(true); }, { once: true });
