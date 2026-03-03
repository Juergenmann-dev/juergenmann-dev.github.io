# Jürgen Mann – Lebenslauf (Web-App)

Retro-Lebenslauf als Web-App mit OS-spezifischen Flows (Boot, Terminal/DFU, Story, Installation, Flow-Modus).

## Projektstruktur

```
.
├── index.html                 # Einstieg → Weiterleitung auf 1_bootvorgang/
├── index-os-weiterleitung.html # OS-Weiterleitung (Boot → plattformspezifische Seite)
├── 01_Die_Geschichte.html      # Doku: Hintergrund & Entstehung
├── 02_Technische_Analyse.html # Doku: Architektur & Mechaniken
├── 03_Easter_Egg_Hunt.html    # Doku: Easter Eggs (27 Details)
├── 1_bootvorgang/
│   └── index.html             # Boot-Screen, erkennt OS, leitet weiter
├── 2_mac/
│   └── index.html             # macOS-Flow (Spotlight, Terminal, Story, Installation)
├── 2.1_win/
│   └── index.html             # Windows-Flow (Taskleiste, CMD, Story, Installation)
├── 2.3_linux/
│   └── index.html             # Linux-Flow (Konsole, Strg+Alt+T, Story, Installation)
├── 2.4_android/
│   └── index.html             # Android-Flow (Chat-Story, Installer)
├── 2.5_iphone/
│   └── index.html             # iPhone-Flow (DFU, .ipsw-Install, Story, Flow-Modus)
├── story/
│   ├── README.md
│   └── content/               # zentrale data.js (boot, platform-copy, Aqua_mac, win95_cmd, …)
│       ├── story.js                        # Story-Daten (STORY_DATA)
│       ├── profile-data.js                 # Profil-/CV-Daten (CV_PROFILE)
│       ├── techskills_Kernkompetenz-data.js # Tech Stack + Kernkompetenzen (TECHSKILLS_KERNKOMPETENZ)
│       ├── anschreiben-data.js             # Anschreiben (ANSCHREIBEN_DATA)
│       ├── lebenslauf-data.js              # Lebenslauf-Inhalt (LEBENSLAUF_DATA)
│       ├── wasserzeichen-data.js           # Watermarks, CV-Signatur (WASSERZEICHEN_DATA)
│       ├── navigation-data.js              # Nav-Labels, Desktop vs. Mobile (NAVIGATION_DATA)
│       ├── link-labels-data.js              # Link-Anzeigetexte (LINK_LABELS_DATA)
│       ├── print-data.js                    # Druck-Dialog (PRINT_DATA)
│       ├── flow-data.js                     # Flow-Mode / Musik (FLOW_DATA)
│       ├── deckblatt-data.js                # Deckblatt-Slogan, Hinweis, Titel (DECKBLATT_DATA)
│       └── platform-copy-data.js             # Plattform-Sprache: Terminal, CMD, echo, … (PLATFORM_COPY)
├── 4_lebenslauf/
│   └── index.html             # Lebenslauf-Inhalt (Deckblatt etc.)
├── versuche/                  # Test-HTMLs (Multi-OS-Terminal, Aqua, Win95-CMD, Boot, iPhone)
├── musik/
│   ├── README.md
│   ├── zen_wind.mp3           # Flow-Modus Track 1
│   └── birds_piano.mp3        # Flow-Modus Track 2
├── Android.jpeg               # Wallpaper Android
├── Mac.jpg                    # Wallpaper macOS
└── Windows.jpg                # Wallpaper Windows
```

## Ablauf

1. **Root** `index.html` → Redirect auf `1_bootvorgang/`
2. **Boot** erkennt OS (Mac, Win, Linux, Android, iOS) und leitet auf `2_mac/`, `2.1_win/`, `2.3_linux/`, `2.4_android/` oder `2.5_iphone/`
3. **OS-Seiten** zeigen plattformspezifischen Flow (Terminal/Konsole/DFU), Story, Installation (inkl. Kaffee-Gag), Flow-Modus (Musik j/n)
4. **Abschluss** → Lebenslauf (Deckblatt, Typewriter, Inhalt)

## Technik

- Statisches HTML/CSS/JS, keine Build-Schritte
- GitHub Pages: Repo-Name `juergenmann-dev.github.io` → Seite unter `https://juergenmann-dev.github.io/`
- Assets (Wallpapers, Musik) liegen im Repo-Root bzw. in `musik/`
