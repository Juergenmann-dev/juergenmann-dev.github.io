# Story (plattformübergreifend)

**Eine Story – gleicher Inhalt auf allen Plattformen.**  
Nur die **Darstellung** ist plattformspezifisch.

## Ordnerstruktur

- **`story/content/story.js`** – Story-Daten (eine Quelle für alle):
  - `STORY_DATA.messages` – Chat-Nachrichten (Android: Bubbles, Desktop: ggf. Terminal-Zeilen)
  - `STORY_DATA.packages` – die vier „Pakete“ (Titel, Untertitel, Detail-Text, Icons)
  - `STORY_DATA.installSteps` – Installer-Fortschritt (Labels, Prozent)
  - `STORY_DATA.thankYou` – Danke-Screen nach Installation
  - `STORY_DATA.installerMeta` – APK-Karte (App-Name, Version, Disclaimer)

- **`story/content/profile-data.js`** – Profil- und CV-Daten (Name, Kontakt, Links, Wohnort, Kurzprofil, Weiterbildung kurz, Sonstiges): `window.CV_PROFILE`
- **`story/content/techskills_Kernkompetenz-data.js`** – Tech Stack + Kernkompetenzen: `window.TECHSKILLS_KERNKOMPETENZ`
- **`story/content/anschreiben-data.js`** – Anschreiben / Initiativbewerbung: `window.ANSCHREIBEN_DATA`
- **`story/content/lebenslauf-data.js`** – Lebenslauf-Inhalt (Aktuell, Projekte, Berufserfahrung, Zusatzqualifikationen, Zertifikate): `window.LEBENSLAUF_DATA`
- **`story/content/wasserzeichen-data.js`** – Watermarks / Code-Snippets (flexibel), CV-Signatur: `window.WASSERZEICHEN_DATA`
- **`story/content/navigation-data.js`** – Ansichts-Labels, Desktop- vs. Mobile-Nav (Tabs + Menü ohne Drucken): `window.NAVIGATION_DATA`
- **`story/content/link-labels-data.js`** – Link-Anzeigetexte (↗ LinkedIn, ↗ GitHub, …): `window.LINK_LABELS_DATA`
- **`story/content/print-data.js`** – Druck-Dialog (Titel, Optionen, Abbrechen): `window.PRINT_DATA`
- **`story/content/flow-data.js`** – Flow-Mode (Button, Menü, Track 1/2, Pause, Plus): `window.FLOW_DATA`
- **`story/content/deckblatt-data.js`** – Deckblatt-Slogan (Typewriter-Zeilen), Hinweis, Titel: `window.DECKBLATT_DATA`
- **`story/content/platform-copy-data.js`** – systemspezifische Sprache (Terminal, CMD, echo, Spotlight, Install, …) pro Gerät: `window.PLATFORM_COPY`
- **`story/content/boot-data.js`** – Bootvorgang zentral versioniert: `window.BOOT_DATA`
  - `linuxLines` – Linux-Kernel-Boot (vmlinuz, systemd)
  - `linuxBootSequence` – LILO/Debian-Boot mit Delays (Pause bei „Loading Linux…“, dann schnelles Rauschen, KDE, login; Einträge mit `error: true` = rote [FAILED]-Zeilen)
  - `linuxBootHints` – Layout (Hacker-Glow #00ff41, Scanlines, Monitor-Rahmen, Flimmer-Animation, errorColor)
  - `macLines` – Mac-spezifischer Boot (EFI, Darwin, APFS, KEXTs, launchd) – Mac-Nutzer erkennen sich wieder
  - `winBootSequence` – Windows 95 Boot (AMIBIOS, HIMEM, VXD, CONFIG.SYS) mit { text, delay } – Win-Nutzer erkennen sich wieder
  - `winBootHints` – Layout-Hinweise (Farbe #C0C0C0, Font, Scanlines, Delays)
  - `macWinLinux` – Ende für Mac/Win/Linux (systemAnalyzed, done)
  - `iphoneAborted` – abgebrochener Boot für iPhone (1_bootvorgang, iOS-Redirect)
  - `iphoneShort` – Kurzversion für 2.5_iphone (Easter Egg + Speicherfehler + DFU)
  - `iphoneSystemfehler` – Overlay-Zeilen (DFU konnte nicht … / Systemfehler / DFU erneut)
  - `iphoneDfu` – DFU-Screen (title, sub)
  - `terminalScripts` – Nach dem Boot: `win` (cls, Installation kaffeemaschine.exe), `linux` (clear, coffee-mod), `mac` (echo/clear, Extracting kaffeemaschine.ipa)
  - `terminalStyleDna` – Farb-DNA pro Plattform: `.term-win` (Fixedsys, #C0C0C0, kein Glow), `.term-linux` (#00FF41, Hacker-Glow), `.term-mac` (#F5F5F7, Anti-Aliasing); Prompts: C:\WINDOWS>, user@debian:~$, MacBook-Pro:~ user$
  - `bootScreen` – Progress-Bar für 2_mac/2.1_win/2.3_linux (initialStatus, steps, osLabels, readyTerminal/readyShell)

- **Plattform-Zweige** (`2_mac/`, `2.1_win/`, `2.3_linux/`, `2.4_android/`, `2.5_iphone/`) binden die Daten ein und rendern:
  - **Android:** Chat-UI + Paketinstaller (echo, print, Karten)
  - **Mac/Win/Linux:** Terminal/Boot (echo, print, Konsole) – gleicher Inhalt, anderer Stil

**Einbinden:** z. B. `story.js`, `profile-data.js`, `techskills_Kernkompetenz-data.js`, `anschreiben-data.js`, `lebenslauf-data.js`, `wasserzeichen-data.js`, `navigation-data.js`, `link-labels-data.js`, `print-data.js`, `flow-data.js`, `deckblatt-data.js`. Anschließend u. a. `window.STORY_DATA`, `window.CV_PROFILE`, `window.LEBENSLAUF_DATA`, `window.WASSERZEICHEN_DATA`, `window.NAVIGATION_DATA`, `window.PRINT_DATA`, `window.FLOW_DATA`, `window.DECKBLATT_DATA`.
