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

  await addBubble('Moin. 👋', 'received', 900);
  await addBubble('Wenn du hier gelandet bist, hat der Link seinen Job gemacht.', 'received', 1200);
  await addBubble('Ich möchte dich auf eine kleine Reise mitnehmen.', 'received', 1400);
  await addBubble('In eine Welt, die auf den ersten Blick nicht das ist, was sie vorgibt zu sein.', 'received', 1800);
  await addBubble('aber eigentlich von einem Menschen erzählt, der ein wunderbares Projekt gebaut hat.', 'received', 1600);
  await wait(500);
  await addSystem('Heute, ' + new Date().toLocaleTimeString('de-DE', {hour:'2-digit',minute:'2-digit'}));
  await addBubble('Lass dich treiben. Nicht alles erklärt sich sofort.', 'received', 1500);
  await addBubble('Manches öffnet sich erst, wenn du genauer hinschaust. 🔍', 'received', 1400);
  await addBubble('Und wenn du denkst – wow. Oder holy shit –', 'received', 1600);
  await addBubble('schließ die Augen. Und lausch der Musik. 🎵', 'received', 1200);
  await wait(800);
  await addBubble('Willkommen. 🚀', 'received', 1400);
  await wait(600);

  statusEl.textContent = 'online';

  await addBubble('📦 Lebenslauf wird installiert...', 'received', 1000);
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

  // Schritt 1
  setOverall(0, 'Systemarchitektur laden...');
  openDetail(1); await wait(300);
  await animateRing(1, 0, 100);
  setOverall(25, 'Systemarchitektur ✓');
  await wait(600); await closeDetail(1);

  // Schritt 2
  setOverall(25, 'Deep Work Mode aktivieren...');
  openDetail(2); await wait(300);
  await animateRing(2, 0, 100);
  setOverall(50, 'Deep Work Mode ✓');
  await wait(600); await closeDetail(2);

  // Schritt 3
  setOverall(50, 'Firebase & SwiftUI verknüpfen...');
  openDetail(3); await wait(300);
  await animateRing(3, 0, 100);
  setOverall(75, 'Firebase & SwiftUI ✓');
  await wait(600); await closeDetail(3);

  // Schritt 4: Kaffee mit Gag
  setOverall(75, 'Kaffee-Integration...');
  openDetail(4); await wait(300);
  await animateRing(4, 0, 62);
  await rollbackRing(4, 62, 0);
  var d4 = document.querySelector('#detail-4 .apk-perm-detail-inner');
  if (d4) d4.innerHTML = '<span>Versuch 1</span> · Wassertank leer. ✗<br><span>Versuch 2</span> · Kaffee vergessen. ✗<br><span>Versuch 3</span> · ☕ läuft endlich...';
  await wait(400);
  await animateRing(4, 0, 100);
  if (d4) d4.innerHTML = '<span>Status</span> · Läuft. Endlich. ☕<br><span>Warnung</span> · Ohne Kaffee keine Commits.';
  setOverall(100, '✓ Installation abgeschlossen');
  await wait(1200); // +0.8s länger für Kaffee-Status sichtbar
  await closeDetail(4);

  await wait(800);

  // Danke-Screen
  var thankEl = document.createElement('div');
  thankEl.style.cssText = 'text-align:center;padding:16px 24px 20px;font-size:13px;color:#9e9e9e;line-height:1.6;';
  thankEl.innerHTML = '<div style="font-size:22px;margin-bottom:8px;">✅</div><div style="color:#fff;font-weight:600;font-size:15px;margin-bottom:4px;">Installation abgeschlossen</div><div>Vielen Dank. Lebenslauf wird gestartet...</div>';
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
 /* Tech Stack nur in Handoff-Ansicht: klappbar, Typewriter Level 1 + 2, Icons eingebettet */
var TECHSTACK_ICONS = {
 uiux: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path fill="#39D353" fill-rule="evenodd" clip-rule="evenodd" d="M7.00005 2.04999H5.52505C4.71043 2.04999 4.05005 2.71037 4.05005 3.52499C4.05005 4.33961 4.71043 4.99999 5.52505 4.99999H7.00005V2.04999ZM7.00005 1.04999H8.00005H9.47505C10.842 1.04999 11.95 2.15808 11.95 3.52499C11.95 4.33163 11.5642 5.04815 10.9669 5.49999C11.5642 5.95184 11.95 6.66836 11.95 7.475C11.95 8.8419 10.842 9.95 9.47505 9.95C8.92236 9.95 8.41198 9.76884 8.00005 9.46266V9.95L8.00005 11.425C8.00005 12.7919 6.89195 13.9 5.52505 13.9C4.15814 13.9 3.05005 12.7919 3.05005 11.425C3.05005 10.6183 3.43593 9.90184 4.03317 9.44999C3.43593 8.99814 3.05005 8.28163 3.05005 7.475C3.05005 6.66836 3.43594 5.95184 4.03319 5.5C3.43594 5.04815 3.05005 4.33163 3.05005 3.52499C3.05005 2.15808 4.15814 1.04999 5.52505 1.04999H7.00005ZM8.00005 2.04999V4.99999H9.47505C10.2897 4.99999 10.95 4.33961 10.95 3.52499C10.95 2.71037 10.2897 2.04999 9.47505 2.04999H8.00005ZM5.52505 8.94998H7.00005L7.00005 7.4788L7.00005 7.475L7.00005 7.4712V6H5.52505C4.71043 6 4.05005 6.66038 4.05005 7.475C4.05005 8.28767 4.70727 8.94684 5.5192 8.94999L5.52505 8.94998ZM4.05005 11.425C4.05005 10.6123 4.70727 9.95315 5.5192 9.94999L5.52505 9.95H7.00005L7.00005 11.425C7.00005 12.2396 6.33967 12.9 5.52505 12.9C4.71043 12.9 4.05005 12.2396 4.05005 11.425ZM8.00005 7.47206C8.00164 6.65879 8.66141 6 9.47505 6C10.2897 6 10.95 6.66038 10.95 7.475C10.95 8.28962 10.2897 8.95 9.47505 8.95C8.66141 8.95 8.00164 8.29121 8.00005 7.47794V7.47206Z"/></svg>',
 swift: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#39D353" d="M19.422,4.007s6.217,3.554,7.844,9.2c1.466,5.1.292,7.534.292,7.534a8.915,8.915,0,0,1,1.742,2.8,4.825,4.825,0,0,1,.29,4.453s-.1-2.08-3.2-2.511c-2.841-.4-3.874,2.366-9.3,2.232A18.435,18.435,0,0,1,2,19.354C4.651,20.8,8.124,23.045,12.449,22.7s5.228-1.674,5.228-1.674A66.9,66.9,0,0,1,4.891,7.643c3.4,2.845,11.822,8.507,11.626,8.363A75.826,75.826,0,0,1,8.092,6.24S20.728,16.629,21.745,16.563c.418-.861,2.579-5.318-2.324-12.557Z"/></svg>',
 xcode: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#39D353" d="M19.06 5.3327c.4517-.1936.7744-.2581 1.097-.1936.5163.1291.7744.5163.968.7098.1936.3872.9034.7744 1.2261.8389.2581.0645.7098-.6453 1.0325-1.2906.3227-.5808.5163-1.3552.4517-1.5488-.0645-.1936-.968-.5808-1.1616-.5808-.1291 0-.3872.1291-.8389.0645-.4517-.0645-.9034-.5808-1.1616-.968-.4517-.6453-1.097-1.0325-1.6778-1.3552-.6453-.3227-1.3552-.5163-2.065-.6453-1.0325-.2581-2.065-.4517-3.0975-.3227-.5808.0645-1.2906.1291-1.8069.3227-.0645 0-.1936.1936-.0645.1936s.5808.0645.5808.0645-.5807.1292-.5807.2583c0 .1291.0645.1291.1291.1291.0645 0 1.4842-.0645 2.065 0 .6453.1291 1.3552.4517 1.8069 1.2261.7744 1.4197.4517 2.7749.2581 3.2266-.968 2.1295-8.6472 15.2294-9.0344 16.1328-.3873.9034-.5163 1.4842.5807 2.065s1.6778.3227 2.0005-.0645c.3872-.5163 7.0339-17.1654 9.2925-18.2624zm-3.6138 8.7117h1.5488c1.0325 0 1.2261.5163 1.2261.7098.0645.5163-.1936 1.1616-1.2261 1.1616h-.968l.7744 1.2906c.4517.7744.2581 1.1616 0 1.4197-.3872.3872-1.2261.3872-1.6778-.4517l-.9034-1.5488c-.6453 1.4197-1.2906 2.9684-2.065 4.7753h4.0009c1.9359 0 3.5492-1.6133 3.5492-3.5492V6.5588c-.0645-.1291-.1936-.0645-.2581 0-.3872.4517-1.4842 2.0004-4.001 7.4856zm-9.8087 8.0019h-.3227c-2.3231 0-4.1945-1.8714-4.1945-4.1945V7.0105c0-2.3231 1.8714-4.1945 4.1945-4.1945h9.3571c-.1936-.1936-.968-.5163-1.7423-.4517-.3227 0-.968.1291-1.3552-.1291-.3872-.3227-.3227-.5163-.9034-.5163H4.9277c-2.6458 0-4.7753 2.1295-4.7753 4.7753v11.7447c0 2.6458 2.1295 4.7753 4.4527 4.7108.6452 0 .8388-.5162 1.0324-.9034zM20.4152 6.9459v10.9058c0 2.3231-1.8714 4.1945-4.1945 4.1945H11.897s-.3872 1.0325.8389 1.0325h3.8719c2.6458 0 4.7753-2.1295 4.7753-4.7753V8.8173c.0646-.9034-.7098-1.4842-.9679-1.8714zm-18.5851.0646v10.8413c0 1.9359 1.6133 3.5492 3.5492 3.5492h.5808c0-.0645.7744-1.4197 2.4522-4.2591.1936-.3872.4517-.7744.7098-1.2261H4.4114c-.5808 0-.9034-.3872-.968-.7098-.1291-.5163.1936-1.1616.9034-1.1616h2.3877l3.033-5.2916s-.7098-1.2906-.9034-1.6133c-.2582-.4517-.1291-.9034.129-1.1615.3872-.3872 1.0325-.5808 1.6778.4517l.2581.3872.2581-.3872c.5808-.8389.968-.7744 1.2906-.7098.5163.1291.8389.7098.3872 1.6133L8.864 14.0444h1.3552c.4517-.7744.9034-1.5488 1.3552-2.3877-.0645-.3227-.1291-.7098-.0645-1.0325.0645-.5163.3227-.968.6453-1.3552l.3872.6453c1.2261-2.1295 2.1295-3.9364 2.3877-4.6463.1291-.3872.3227-1.1616.1291-1.8069H5.3794c-2.0005.0001-3.5493 1.6134-3.5493 3.5494zM4.605 17.7872c0-.0645.7744-1.4197.7744-1.4197 1.2261-.3227 1.8069.4517 1.8714.5163 0 0-.8389 1.4842-1.097 1.7423s-.5808.3227-.9034.2581c-.5164-.129-.839-.6453-.6454-1.097z"/></svg>',
 apis: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#39D353" d="M9 4C6 4 4 7 5 12c-1 5 1 8 4 8 1 0 2-.5 2-2 0-1-.5-1.5-1-2 .5-.5 1-1.5 1-2.5S9.5 10 9 9c.5-.5 1-1 1-2 0-1.5-1-3-3-3z"/><path fill="#39D353" d="M15 4c2 0 3 1.5 3 3 0 1-.5 1.5-1 2 .5.5 1 1.5 1 2.5s-.5 2-1 2.5c.5.5 1 1 1 2 0 1.5-1 3-3 3-3 0-5-3-4-8-1-5 1-8 4-8z"/></svg>',
 firebase: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#39D353" d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z"/></svg>',
 git: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#39D353" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
 jetpack: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#39D353" d="M24 24H0V0h24L12 12Z"/></svg>',
 js: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#39D353" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
 shell: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#39D353" d="M21.038 4.9l-7.577-4.498C13.009.134 12.505 0 12 0c-.505 0-1.009.134-1.462.403L2.961 4.9C2.057 5.437 1.5 6.429 1.5 7.503v8.995c0 1.073.557 2.066 1.462 2.603l7.577 4.497C10.991 23.866 11.495 24 12 24c.505 0 1.009-.134 1.461-.402l7.577-4.497c.904-.537 1.462-1.529 1.462-2.603V7.503c0-1.074-.558-2.066-1.462-2.603z"/></svg>'
};
var TECHSTACK_ITEMS = [
 { key: "uiux", label: "UI/UX · Prototyping", detail: "UI/UX-Modul: Nutzerflows, Wireframes & Prototypen, Layout-Prinzipien, Typografie und Zustandskommunikation. Fokus: Nutzerhandlungen verstehen, Systemzustände sichtbar machen und Fehler verständlich erklären." },
 { key: "swift", label: "Swift · SwiftUI", detail: "Swift: Grundlagen zuerst in der Xcode-Konsole – Variablen & Datentypen, Kontrollfluss, Structs & Enums, Optionals, Collections, OOP, Funktionen, Higher-Order Functions und Closures. Danach SwiftUI: Stacks & Layouts, State & Binding, Listen & Navigation, Alerts & Sheets, SwiftData, APIs/JSON, Concurrency und Error Handling – mit Fokus auf klare Zustände und wartbare Architektur." },
 { key: "xcode", label: "Xcode", detail: "Xcode von der Konsole bis zur App: Playground/Console für die Swift-Grundlagen, danach Projektstruktur, Debugging, Breakpoints, Instruments-Basics und Swift Package Manager für modulare Architektur." },
 { key: "apis", label: "REST APIs", detail: "APIs & JSON: Requests mit URLSession, Parsing, Fehlerbehandlung und Concurrency. Fokus: saubere Trennung von Netzwerk-Layer, Modellen und UI-Zustand." },
 { key: "firebase", label: "Firebase", detail: "Firebase aus iOS/Android-Sicht: Grundlagen, Authentication und Firestore (Grundlagen & Advanced). Schwerpunkt: Datenmodellierung, Realtime-Updates und Stabilität im Zusammenspiel mit SwiftUI/Compose." },
 { key: "git", label: "Git / GitHub", detail: "Git/GitHub als Standard-Werkzeug: Branches, Commits, Merges, Pull Requests, GitHub Actions und GitHub Pages (z. B. dieser Lebenslauf). Ziel: Codebasis teilbar machen und Änderungen nachvollziehbar halten." },
 { key: "jetpack", label: "Jetpack Compose", detail: "Kotlin-Grundlagen plus Jetpack Compose: Layouts, Lazy Lists, Themes, Komponenten & State, Navigation, Effects und Animation. Ziel: UI und State so koppeln, dass sich SwiftUI-Konzepte sauber auf Android übertragen lassen." }
];
var TECHSTACK_EXTRA_ITEMS = [
 { key: "js", label: "JavaScript (Grundlagen)", detail: "JavaScript als private Ergänzung neben der Maßnahme: Basis-Syntax, Funktionen, DOM-Bezug – genug, um Web-UIs wie dieses Projekt gezielt zu steuern." },
 { key: "shell", label: "Shell / zsh (Grundlagen)", detail: "Shell/zsh als private Ergänzung: einfache Skripte, Dateisystem, Prozesse – u. a. für macOS-Automatisierung (Time-Machine-NAS), unabhängig von der Maßnahme." }
];
 function initHandoffTechstack() {
 var section = document.querySelector(".design-page .techstack-section");
 if (!section) return;
 var header = section.querySelector(".techstack-header");
 var panel = section.querySelector(".techstack-panel");
 var itemsContainer = section.querySelector(".techstack-items");
var extraItemsContainer = section.querySelector(".techstack-extra-items");
 var detailEl = section.querySelector(".techstack-detail");
 var detailContent = section.querySelector(".techstack-detail-content");
if (!header || !panel || !itemsContainer || !extraItemsContainer || !detailEl || !detailContent) return;
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
