# Kohärenz Mac ↔ Linux (V2)

Struktur und Code sind angeglichen, nur **Aussehen** und **Sprache** sind plattformspezifisch. Damit ist die Linux-View kohärent zur Mac-View.

---

## 1. Struktur (gleich)

| Aspekt | Mac (`2_mac/`) | Linux (`2.3_linux/`) |
|--------|----------------|----------------------|
| **Ordner** | `index.html`, `mac-view.css`, `mac-view.js`, `content/` | `index.html`, `linux-view.css`, `linux-view.js`, `content/` |
| **Daten** | `content/Aqua_mac_data.js`, `content/mac_story_script-data.js` | `content/linux_terminal_data.js`, `content/linux_story_script-data.js` |
| **Boot-Daten** | `../story/content/boot-data.js` (macLines) | `../story/content/boot-data.js` (linuxBootSequence) |
| **Ablauf** | Boot → Terminal → Story → Installation → Flow → Deckblatt | Boot → Terminal → Story → Installation → Flow → Deckblatt |
| **Fenster** | 80×18 Zeilen, feste Größe | 80×18 Zeilen, feste Größe |

---

## 2. Gleicher Code / gleiches Verhalten

### Boot
- Beide: zuerst 3 Zeilen (Systemstatus, OS erkannt, Bereite Bootvorgang vor), dann OS-spezifische Sequenz, dann Fade-Out und Wechsel zum Terminal.
- Delays: 400, 500, 500, 350, 400, 200 ms für die ersten Zeilen; Fade 520 ms, dann Terminal einblenden.

### Terminal-Größe
- **Mac:** `terminalWindow.style.width = (cols || 80) + "ch"`, `output.style.height = "calc(1.4em * " + (rows || 18) + ")"`.
- **Linux:** `terminalWindow.style.width = termCols + "ch"`, `consoleOutput.parentElement.style.height = "calc(1.4em * " + termRows + ")"`; zusätzlich feste Fensterhöhe in CSS.

### Story-Script
- Beide: Schritte `response`, `story`, `input`, `pause`, `run_retro_install`.
- `clear` vor Installation: bei `input` mit `cmd === "clear"` wird der Ausgabebereich geleert.

### Installation (Retro-Installer)
- Gleiche Schritte: Leerzeile → 4 Pakete (0→15, 15→30, 30→45, 45→60) mit Leerzeilen 250 ms → „Installation abgeschlossen“ → Kaffee (60→80, Fehler bei 72 %, 3× Rollback) → Kaffee fertig → Kiosk (0→100) → Success → Warnung + Bullets → „Bereit …“.
- **Animation:** Fortschritt Intervall 50 ms, +1 %; Rollback 40 ms, −2 %; Fehler-Delay 500 ms, Success 300 ms, Rollback-Ende 400 ms.

### Flow / Easter Egg
- Beide: „Flow starten? [y/N]“, Optionen klickbar und per Tastatur, **kein** `cursor: pointer` (Easter Egg bleibt optisch unauffällig).
- Musik-Auswahl [1]/[2], dann Redirect zu `../4_lebenslauf/index.html` mit `sessionStorage` (kioskUsed, flowMusicContinue, deckblattTitleVariant).

---

## 3. Unterschiedliches Aussehen

| Element | Mac | Linux |
|---------|-----|--------|
| **Hintergrund** | Aqua-Wallpaper, Pinstripes | Sehr dunkles Marieneblau (#081018) |
| **Terminal** | Aqua (weiß, Glas-Buttons, Rot/Gelb/Grün), Balken-Fortschritt | xterm (grün #00ff41, Scanlines, Punkt in Titlebar), ASCII-Sternchen-Fortschritt |
| **Boot** | Darwin/EFI/APFS-Log, heller Boot-Container | LILO/Debian, Monitor-Rahmen, grüner Text |
| **Fenster** | Titelleiste „Terminal — tcsh — 80x18“ | Titelleiste „jm@debian:~ - xterm“, „[UTF-8] 80x18“ |
| **Cursor** | aqua-cursor (Block, blink) | linux-cursor (Block, blink) |

---

## 4. Unterschiedliche Sprache / Texte

| Kontext | Mac | Linux |
|---------|-----|--------|
| **Prompt** | `[localhost:~] user%` | `jm@debian:~$` |
| **Install-Befehl** | (über Story/Installer-UI) | `sudo apt-get install -y jürgen-mann.deb` |
| **Vor Paketen** | — | „Reading package lists... Done“, „Building dependency tree... Done“ (apt-typisch) |
| **Installer-Labels** | gleiche inhaltliche Texte (Pakete, Kaffee, Kiosk, Warnung) | dieselben inhaltlichen Texte, ggf. apt-Englisch für Systemzeilen |
| **Story** | Aus `mac_story_script-data.js` (de) | Aus `linux_story_script-data.js` (de, gleiche Story-Inhalte) |

---

## 5. Kurzfassung

- **Struktur:** Gleiche Datei-/Ordnerstruktur, gleicher Ablauf (Boot → Terminal → Story → Installation → Flow → Deckblatt).
- **Code:** Gleiche Logik, gleiche Delays und gleiche Installer-Schritte; nur Ausgabe (addLine vs addTermLine, Balken vs ASCII) und Datenquellen (AQUA_MAC_DATA vs LINUX_TERMINAL_DATA) sind plattformspezifisch.
- **Aussehen:** Mac = Aqua, Linux = xterm-Grün auf Marieneblau.
- **Sprache:** Mac = tcsh/Deutsch, Linux = bash/apt (jm@debian, sudo, apt-get), Story weiterhin deutsch.

Damit ist die Linux-View **kohärent** zur Mac-View: gleicher Aufbau und gleiches Verhalten, nur anderes Look & Feel und plattformtypische Sprache/Befehle.
