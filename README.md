# Jürgen Mann – Lebenslauf (Web-App)

Retro-Lebenslauf als Web-App mit OS-spezifischen Flows (Boot, Terminal/DFU, Story, Installation, Deckblatt).

## Regeln (einheitliche Struktur)

- **Root:** `index.html` erkennt OS (UA + Platform) und leitet weiter. `story/content/detection.js` + zentrale Daten in `story/content/`.
- **Jeder OS-Ordner** folgt dem gleichen Muster:
  - `index.html` – Einstieg
  - `*-view.css` – Layout/Styles
  - `*-view.js` – Logik (Boot, Story, Install)
  - `content/*.js` – plattformspezifische Daten (Story, Terminal)
  - Bilder nur im jeweiligen Ordner oder zentral referenziert
- **Ausnahmen:** `2.5_iphone` und `4_lebenslauf` sind bewusst ein einzelnes `index.html` (alles inline).
- Interne Doku-Dateien (z. B. KOHÄRENZ*.md) bleiben lokal und gehören nicht ins Repo.

## Projektstruktur (Live)

```
.
├── index.html              # Einstieg → Weiterleitung nach OS
├── README.md               # Diese Datei
│
├── story/
│   └── content/            # detection.js, *-data.js (Deckblatt, Boot, Navigation …)
│
├── 2_mac/
│   ├── index.html
│   ├── mac-view.css
│   ├── mac-view.js
│   ├── content/            # Aqua_mac_data.js, mac_story_script-data.js
│   ├── Mac.jpg
│   └── Mac_hintergrund.png
│
├── 2.1_win/
│   ├── index.html
│   ├── win-view.css
│   ├── win-view.js
│   └── content/            # win_terminal_data.js, win_story_script-data.js
│
├── 2.3_linux/
│   ├── index.html
│   ├── linux-view.css
│   ├── linux-view.js
│   └── content/            # linux_terminal_data.js, linux_story_script-data.js
│
├── 2.4_android/
│   ├── index.html
│   ├── android-view.css
│   ├── android-view.js
│   └── Android.jpeg
│
├── 2.5_iphone/
│   └── index.html          # Alles in einer Datei (DFU-Flow, Install-Log, Story)
│
├── 4_lebenslauf/
│   └── index.html          # Deckblatt/Lebenslauf in einer Datei
│
└── musik/
    ├── zen_wind.mp3
    └── birds_piano.mp3
```

## Ablauf

1. **Root** `index.html` → OS-Erkennung → Redirect auf `2_mac/`, `2.1_win/`, `2.3_linux/`, `2.4_android/` oder `2.5_iphone/`.
2. **OS-Seite** → Boot/Terminal/DFU, Story, Installation (ui-ux-modul, xcode-toolchain, firebase-sdk, android-sdk + Gags), optional Flow-Modus (Musik).
3. **Abschluss** → `4_lebenslauf/` (Deckblatt, Lebenslauf).

## Branches

- **main** – aktuelle Version (live auf GitHub Pages).
- **v1-archive**, **v2-archive**, **v3-archive**, … – ältere Versionen nur noch als Archiv.

### Neue Version veröffentlichen

1. **Aktuellen main als Archiv sichern** (z. B. bevor du die nächste Version machst):
   ```bash
   git fetch origin
   git push origin main:v3-archive    # aktueller main → v3-archive (nächstes Mal: v4-archive, …)
   ```
2. **Änderungen auf main** (wie gewohnt commiten und pushen):
   ```bash
   git add -A && git commit -m "v4: …" && git push origin main
   ```

Damit bleibt **main** immer die live-Version; was veraltet ist, liegt in **v3-archive**, **v4-archive** usw.

## Technik

- Statisches HTML/CSS/JS, keine Build-Schritte.
- GitHub Pages: Repo `juergenmann-dev.github.io` → `https://juergenmann-dev.github.io/`.
- **Hintergründe:** Mac und Android nutzen Bilder (Mac.jpg, Android.jpeg); Windows und Linux nutzen farbliche/Gradient-Hintergründe (CSS). Musik unter `musik/`.
