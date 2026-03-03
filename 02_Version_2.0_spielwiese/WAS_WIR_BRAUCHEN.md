# Was wir brauchen

Übersicht der fehlenden oder noch zu beschaffenden Ressourcen für das CV-Projekt.

---

## Sounds / Audio

| Was | Format | Verwendung | Priorität |
|-----|--------|------------|-----------|
| **Floppy-Boot** | MP3 oder WAV, ~1–3 s | Win95-Boot (test-win95-boot.html, 1_bootvorgang) | Optional |
| **Festplatten-Surren** | MP3 oder WAV, kurz | Win95-Boot (alternativ zu Floppy) | Optional |
| **Bereits vorhanden** | | | |
| zen_wind.mp3 | MP3 | Flow Mode Track 1 | ✓ |
| birds_piano.mp3 | MP3 | Flow Mode Track 2 | ✓ |

**Quellen:** Freesound.org, Mixkit, Zapsplat (Suche: „floppy drive“, „old computer boot“)

---

## Boot-Varianten (Data vorhanden, Views noch nicht angebunden)

| Plattform | Data-Datei | Inhalt | Status |
|-----------|------------|--------|--------|
| **Linux** | boot-data.js `linuxLines` / `linuxBootSequence` | Kernel-Log oder LILO/Debian (LILO, INIT, KDE, login) | Data ✓, View offen |
| **Mac** | boot-data.js `macLines` | EFI, Darwin, APFS, KEXTs | Data ✓, View offen |
| **Windows** | boot-data.js `winBootSequence` | Win95 AMIBIOS, HIMEM, VXD | Data ✓, Test-HTML ✓, 1_bootvorgang offen |
| **iPhone** | boot-data.js `iphoneShort` | Abgebrochener Boot (Easter Egg) | Data ✓, bleibt wie ist |
| **Android** | – | Keine Boot-Sequenz | – |

---

## Fonts (optional)

| Font | Verwendung |
|------|-------------|
| **Perfect DOS VGA 437** | Win95-Boot (Retro-Optik). Optional, Fallback: Monaco, Courier New |

---

## Technische Integration (offen)

| Aufgabe | Beschreibung |
|---------|--------------|
| **1_bootvorgang** | Plattform-Erkennung → Mac/Win/Linux: jeweilige Boot-Zeilen aus boot-data.js laden |
| **2_mac / 2.1_win / 2.3_linux** | bootScreen aus boot-data.js nutzen |
| **2.5_iphone** | iphoneShort, iphoneSystemfehler, iphoneDfu aus boot-data.js nutzen |
| **Alle Views** | Data-Dateien (profile, lebenslauf, navigation, etc.) anbinden statt Inline-Code |

---

## Kurz-Checkliste

- [ ] Floppy-/Festplatten-Sound für Win95-Boot (optional)
- [ ] Win95-Boot in 1_bootvorgang einbauen (bei Win-Erkennung)
- [ ] Mac-Boot in 1_bootvorgang einbauen (bei Mac-Erkennung)
- [ ] Data-Dateien in Views anbinden
- [ ] Perfect DOS VGA 437 font (optional, für Win95)
