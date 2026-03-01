# Story (plattformübergreifend)

**Eine Story – gleicher Inhalt auf allen Plattformen.**  
Nur die **Darstellung** ist plattformspezifisch.

## Ordnerstruktur

- **`3_story/content/data.js`** – gemeinsame Daten (eine Quelle für alle):
  - `STORY_DATA.messages` – Chat-Nachrichten (Android: Bubbles, Desktop: ggf. Terminal-Zeilen)
  - `STORY_DATA.packages` – die vier „Pakete“ (Titel, Untertitel, Detail-Text, Icons)
  - `STORY_DATA.installSteps` – Installer-Fortschritt (Labels, Prozent)
  - `STORY_DATA.thankYou` – Danke-Screen nach Installation
  - `STORY_DATA.installerMeta` – APK-Karte (App-Name, Version, Disclaimer)

- **Plattform-Zweige** (`2_mac/`, `2.1_win/`, `2.3_linux/`, `2.4_android/`, `2.5_iphone/`) binden die Daten ein und rendern:
  - **Android:** Chat-UI + Paketinstaller (echo, print, Karten)
  - **Mac/Win/Linux:** Terminal/Boot (echo, print, Konsole) – gleicher Inhalt, anderer Stil

**Einbinden:** Von der Projektwurzel `<script src="3_story/content/data.js"></script>`, aus einem Zweig z. B. `<script src="../3_story/content/data.js"></script>`. Anschließend steht `window.STORY_DATA` zur Verfügung.
