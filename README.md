# Jürgen Mann – Lebenslauf (Web-App)

Retro-Lebenslauf als Web-App mit OS-spezifischen Flows (Boot, Terminal/DFU, Story, Installation, Flow-Modus).

## Projektstruktur

```
.
├── index.html                 # Einstieg → Weiterleitung auf 1_bootvorgang/
├── index-os-weiterleitung.html # OS-Weiterleitung (Boot → plattformspezifische Seite)
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
├── 3_story/
│   ├── README.md
│   └── content/
│       └── data.js            # Story-Daten (falls extern genutzt)
├── 4_lebenslauf/
│   └── index.html             # Lebenslauf-Inhalt (Deckblatt etc.)
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
