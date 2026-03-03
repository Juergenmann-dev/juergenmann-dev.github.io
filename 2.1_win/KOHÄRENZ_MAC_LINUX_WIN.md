# Kohärenz Mac / Linux / Win (V2)

Windows-View gleicher Struktur und Ablauf wie Mac und Linux, nur plattformspezifisches Aussehen und inhaltliche Story (C: → jm lebenslauf.html → Prüfung).

---

## Struktur (wie Mac/Linux)

- **Ordner:** `index.html`, `win-view.css`, `win-view.js`, `content/`
- **Daten:** `content/win_terminal_data.js`, `content/win_story_script-data.js`
- **Boot:** `../story/content/boot-data.js` → `winBootSequence`
- **Ablauf:** Boot → MS-DOS-Eingabeaufforderung → Story → Installation → Flow → Deckblatt
- **Fenster:** 80×18 Zeilen, feste Größe

---

## Windows-spezifischer Inhalt

1. **Zuerst C: versuchen** – schlägt fehl („Zugriff verweigert – C: ist geschützt“).
2. **Neue Formatierung** – „jm_lebenslauf.html“ wird angelegt, Daten dorthin kopiert/installiert.
3. **Am Ende Prüfung** – „Prüfe Verzeichnis jm_lebenslauf.html…“, „Alle Daten korrekt installiert und im Verzeichnis.“

Ansonsten gleicher Ablauf: 4 Pakete, Kaffee mit 3× Rollback, Kiosk, Success, Warnung, Flow [y/N], Musik [1/2], Redirect zu `4_lebenslauf`.

---

## Gleicher Code / gleiche Animationen

- Boot: 3 Zeilen (Systemstatus, OS erkannt – Windows, Bereite Bootvorgang vor), dann `winBootSequence`, Fade, CMD ein.
- Story: `response`, `story`, `input` (inkl. `cls` = Bildschirm leeren), `run_retro_install`.
- Installer: ASCII-Fortschritt (#), Intervall 50 ms / 40 ms Rollback, gleiche Delays (500/300/400 ms).
- Easter Egg: `win95-choice`, `cursor: default`, Klick/Taste [y]/[n] und [1]/[2].

---

## Aussehen / Sprache

- **Boot:** Win95 (AMIBIOS, HIMEM, VXD, schwarzer Hintergrund, #C0C0C0, Scanlines).
- **CMD:** Fenster Win95 (grau, Titelleiste #000080), „MS-DOS-Eingabeaufforderung“, Toolbar, Prompt `C:\>`.
- **Hintergrund:** #008080 (Teal) um das Fenster.
