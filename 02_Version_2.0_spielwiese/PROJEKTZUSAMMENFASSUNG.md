# Jürgen Mann – Lebenslauf als Web-App · Projektzusammenfassung

Ein interaktiver Lebenslauf, der sich dem Betriebssystem des Besuchers anpasst: Auf dem Mac sieht man Spotlight und Dock, unter Windows den Run-Dialog, unter Linux die Konsole, auf dem Smartphone Homescreen oder DFU-Flow. Eine HTML-Datei pro Plattform – kein Framework, kein Build, keine externen Abhängigkeiten.

---

## Über das Projekt

Statt einer PDF-Bewerbung ist der Lebenslauf eine **statische Web-App**, die per User-Agent das Gerät erkennt und den Nutzer in einen plattformspezifischen Flow führt. Jede Umgebung (Mac, Windows, Linux, Android, iPhone) hat eigenes UI, eigene Gags und eine konsistente inhaltliche Linie. Das Projekt dokumentiert zugleich technische Entscheidungen und 27 bewusst eingebaute Details (Easter Eggs).

**Live:** [juergenmann-dev.github.io](https://juergenmann-dev.github.io/)

---

## Features

| Plattform | Besonderheiten |
|-----------|----------------|
| **Mac** | Spotlight-Simulation (⌘+Space), Dock, Widgets (Kalender, Wetter, Akku), Terminal-Typewriter |
| **Windows** | Run-Dialog (Win+R), Taskleiste, CMD-Style, plattformspezifische Easter-Egg-Zahl (16) |
| **Linux** | Konsole (Strg+Alt+T), brauner Hintergrund, `echo`/`apt install`, kein Mac-Dock/Menü |
| **Android** | Boot-Skip, Homescreen mit Kacheln, Notification „Neue Nachricht“, Chat (Jürgen Mann), Statusleiste mit Battery-API, Installer mit 13 Easter-Egg-Hinweis |
| **iPhone** | DFU-Boot, SpringBoard, System-Frameworks (MobileInstallation, KeychainServices, UIKit), 23 Easter Eggs im Boot, Flow-Modus |

**Gemeinsam:** Deckblatt mit plattformspezifischem Typewriter-Prefix (`print` / `echo` / `Log.d`), Navigation erst nach Abschluss des Deckblatts, eine Scrollzone auf Mobile (Anschreiben, Komplett), Safe-Area-Unterstützung.

---

## Projektstruktur

```
.
├── index.html                    # Einstieg → Weiterleitung
├── 01_Die_Geschichte.html        # Doku: Hintergrund & Entstehung
├── 02_Technische_Analyse.html   # Doku: Architektur & Mechaniken
├── 03_Easter_Egg_Hunt.html      # Doku: 27 Easter Eggs
├── 04_Psychologische_Summary.html # Doku: Psychologische Summary (lokal)
├── 1_bootvorgang/
│   └── index.html                # Boot-Screen, OS-Erkennung, Weiterleitung
├── 2_mac/
│   └── index.html                # macOS-Flow
├── 2.1_win/
│   └── index.html                # Windows-Flow
├── 2.3_linux/
│   └── index.html                # Linux-Flow
├── 2.4_android/
│   └── index.html                # Android-Flow
├── 2.5_iphone/
│   └── index.html                # iPhone-Flow
├── 4_lebenslauf/
│   └── index.html                # Lebenslauf-Inhalt (Deckblatt, Design, Onepage, ATS, Anschreiben, Komplett, Profil+)
├── story/                      # Story-Daten (falls extern genutzt)
├── musik/                        # Flow-Modus (zen_wind.mp3, birds_piano.mp3)
├── Android.jpeg / Mac.jpg / Windows.jpg  # Wallpapers
└── README.md                     # Kurzüberblick (GitHub)
```

Pro OS-Ordner eine `index.html` (ca. 4.300–5.600 Zeilen), 7 View-Modi inkl. Drucken.

---

## Technik

- **Stack:** Statisches HTML, CSS, JavaScript – keine Dependencies, kein Build.
- **Hosting:** GitHub Pages (`juergenmann-dev.github.io`).
- **OS-Erkennung:** `navigator.userAgent` → Weiterleitung auf passende Plattform.
- **Zustand:** Body-Klassen, CSS, minimale JS-Logik (kein Framework).
- **Assets:** Wallpapers und Audio liegen im Repo; Favicon als Base64.

---

## Dokumentation

| Datei | Inhalt |
|-------|--------|
| **01_Die_Geschichte.html** | Wer dahintersteckt, was gebaut wurde, warum es zählt |
| **02_Technische_Analyse.html** | Kennzahlen, Architektur, UX-Entscheidungen, Einschätzung für Tech-Leads |
| **03_Easter_Egg_Hunt.html** | Alle 27 dokumentierten Details (Kern, Bonus, iPhone, weitere) |
| **04_Psychologische_Summary.html** | Psychologische Summary (nur lokal, nicht im Repo veröffentlicht) |

---

## Ablauf (User Journey)

1. **Root** `index.html` → Redirect auf `1_bootvorgang/`.
2. **Boot** erkennt OS und leitet auf die passende Plattform (`2_mac/`, `2.1_win/`, `2.3_linux/`, `2.4_android/`, `2.5_iphone/`).
3. **OS-Seite:** plattformspezifischer Einstieg (Spotlight/Run/Konsole/Homescreen/DFU), dann Story/Installer, optional Flow-Modus (Musik).
4. **Lebenslauf:** Deckblatt mit Typewriter, danach Navigation zu Design, Onepage, ATS, Anschreiben, Komplett, Profil+.

---

## Kontakt

- **LinkedIn:** [linkedin.com/in/juergen-mann-j19830720](https://www.linkedin.com/in/juergen-mann-j19830720/)
- **GitHub:** [github.com/Juergenmann-dev](https://github.com/Juergenmann-dev)

---

*Jürgen Mann · Gifhorn · März 2026 · // state · context · ship*
