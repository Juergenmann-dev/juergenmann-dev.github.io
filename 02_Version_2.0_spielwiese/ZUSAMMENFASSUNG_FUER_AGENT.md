# Zusammenfassung für neuen Agent – Mac CV Version 2.0 (Spielwiese)

## Was wir machen

Wir bauen eine **retro-stilige CV-Webseite** (Version 2.0). Nutzer wählen ein „Betriebssystem“ (Mac, Windows, Linux, …) und erleben einen **simulierten Boot + Terminal + Installer**, der zum Lebenslauf (Deckblatt) führt. Der Mac-Zweig soll sich anfühlen wie „damals“: klassisches Mac-OS-Look, alte Befehle (kein Homebrew), echte Klick-/Menü-Abläufe.

**Version 1.0 ist die Vorlage:** Ablauf und Struktur (z. B. Musik ja/nein → bei Ja zweite Wahl → Deckblatt) kommen aus V1. **Version 2.0** baut auf derselben Struktur auf – mit verbesserter Retro-Optik (Aqua, Pinstripe, alter Installer-Look) und allen Texten/Labels in **Data-JS-Dateien** statt im HTML.

---

## Warum

- **Single Source of Truth:** Alle Texte, Labels und Installer-Texte liegen in **Data-JS-Dateien** (`story/content/*.js`). Keine Duplikate im HTML; Änderungen nur an einer Stelle.
- **Authentizität:** Boot-Logs, Menü-Texte (z. B. „Gehe zu“ → „Diensteprogramme“), Terminal-Prompt (z. B. `MacBook-Air:~ jm$`), Installer-Befehl (`sudo installer -pkg ...`) und Fehlermeldungen (Kaffee-Gag) sind bewusst „von früher“ und plattformspezifisch.
- **Kiosk-Mode:** Wird im **Installer** angekündigt („Kiosk-Modus aktiv – Klick oder Taste = Vollbild“). Der **Trigger** ist die Musik-Antwort (y/N) auf der Test-Seite; auf dem Deckblatt gibt es **keinen** doppelten Hinweis mehr (wurde entfernt).

---

## Wichtige Ordner/Dateien

| Ort | Zweck |
|-----|--------|
| `02_Version_2.0_spielwiese/` | Spielwiese für V2 – hier wird gebaut und getestet. |
| `story/content/` | **Data-JS:** `boot-data.js`, `Aqua_mac_data.js`, `mac_story_script-data.js`, `deckblatt-data.js`, `profile-data.js`, … |
| `versuche/` | Standalone-Test-HTMLs, **nicht** die finale Integration. |
| `versuche/test-mac-boot-und-aqua.html` | **Haupt-Testseite Mac:** Boot → Menü „Go“ → Diensteprogramme → Terminal → Story → Retro-Installer (graphischer Balken, Pinstripe, Fehler/Rollback) → Musik y/N → Titel 1/2 → Redirect zum Deckblatt. |
| `4_lebenslauf/index.html` | Ziel-Seite „Deckblatt“; Kiosk-Hinweis hier ausgeblendet (nur im Installer erklärt). |

---

## Data-Dateien (Mac)

- **`Aqua_mac_data.js`**  
  - `window.AQUA_MAC_DATA`: Meta (Sprache, cols/rows), initialLines, menuBar (de/en), **installer** (firstLine, packages, coffeeErrors, coffeeSuccess z. B. „(HTML aktivieren)“, kioskLabel/kioskMessage, warningBullets, readyLine, rollbackSuffix).  
  - Sprache umstellen: `meta.language: "en"` → Menü/Fenster aus `menuBar.en`.

- **`mac_story_script-data.js`**  
  - `window.MAC_TERMINAL_STORY`: Array von Steps (`type`: input, response, glitch, story, pause, **run_retro_install**). Steuert die „Geisterhand“ (Typewriter) und wann der Installer läuft.

- **`boot-data.js`**  
  - `window.BOOT_DATA`: z. B. `macLines` für die Verbose-Boot-Ausgabe.

---

## Ablauf auf der Test-Seite (test-mac-boot-und-aqua.html)

1. **Boot** – Mac-Verbose-Log (aus `BOOT_DATA.macLines`), dann Ausblendung.
2. **Desktop sichtbar** – Menüleiste, Dock, Desktop-Icons (Ordner, dann Volumes nacheinander).
3. **Menü-Animation** – „Go“ öffnet sich, „Diensteprogramme“ wird markiert, Utilities-Fenster erscheint, Terminal-Icon „angeklickt“, Fenster schließt.
4. **Terminal + Story** – Aqua-Terminal erscheint; Story-Script läuft (print story, Deep Work Mode, clear, Install-Befehl).
5. **Retro-Installer** – Beim Step `run_retro_install`:  
   - Erste Zeile als **.line** mit **.prompt** + **.command** (aus `installer.firstLine`).  
   - **Graphische Fortschrittsbalken** (.progress-row, .progress-bar, .fill) für Pakete und Kaffee-Integration, inkl. **Fehler** (.error-msg) und **Rollback** (Balken rückwärts).  
   - Pinstripe-Hintergrund nur im Terminal-Inhalt (`#output.terminal-installer`).  
   - Texte weiter aus `AQUA_MAC_DATA.installer` (keine Änderung an der Data-Struktur nötig, nur an der Darstellung).
6. **Musik & Titel** (wie in V1: zuerst Musik-Frage) – „Musik starten? [y/N]“. **Bei y:** „Titel wählen [1/2]“ → Wahl in `sessionStorage.deckblattTitleVariant`, Musik startet, dann Redirect zu `../4_lebenslauf/index.html`. **Bei n/Enter:** „Kein Problem, manchmal passt es halt nicht.“ → Redirect (ohne Musik).

---

## Technische Details (für Agent)

- **Installer-Logik** lebt in der Test-HTML: `addCommandLine`, `addLine`, `animateProgressBar`, `animateRollback`, `runRetroInstallation()`. Daten kommen aus `AQUA_MAC_DATA.installer`.
- **Kein „Finder“ in der alten Zeit** – war früher so kommuniziert; Menü/UI nutzt trotzdem Begriffe wie „Gehe zu“ / „Diensteprogramme“ aus den Data-Dateien.
- **Kein Homebrew** – Retro-Befehl: `sudo installer -pkg jürgen-mann.pkg -target /`.
- **Kiosk:** Erster Klick/Taste auf dem Deckblatt (4_lebenslauf) löst Fullscreen aus; Hinweistext auf dem Deckblatt ist per CSS ausgeblendet.

---

## Nächste Schritte (wenn User zufrieden)

- Data-Struktur in `Aqua_mac_data.js` ggf. erweitern (z. B. für Balken-Optionen), wenn gewünscht.
- Flow aus `versuche/test-mac-boot-und-aqua.html` in die „echte“ Mac-View (z. B. `2_mac/`) übernehmen, sobald der User das so möchte.
