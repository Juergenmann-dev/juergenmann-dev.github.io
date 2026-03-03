# GitHub: V1 und V2 sauber trennen – beide behalten

## Ziel

- **Version 1** und **Version 2** klar getrennt, keine Vermischung.
- Auf **keine** der beiden Versionen verzichten: V1 bleibt dauerhaft verfügbar (live, danach Archiv), V2 wird parallel entwickelt und wird irgendwann die neue Live-Version.

---

## Empfohlen: Branch-Strategie

### Übersicht

| Branch        | Inhalt                    | Nutzung                          |
|---------------|---------------------------|----------------------------------|
| **`main`**    | Version 1 (aktuell live)  | GitHub Pages deployt daraus. Nicht für V2-Änderungen nutzen. |
| **`v2`**      | Version 2                 | Hier wird nur V2 entwickelt. Alle V2-Commits landen hier.    |
| **`archive-v1`** (später) | Snapshot von V1 | Wird angelegt, wenn V2 live geht. V1 bleibt so für immer im Repo. |

---

## Schritt für Schritt

### 1. Branch `v2` anlegen (einmalig)

```bash
# Im Projektordner, auf main sein und aktuell sein
git checkout main
git pull origin main

# Neuen Branch v2 erstellen und wechseln
git checkout -b v2
```

Ab jetzt: **Alle V2-Entwicklung nur auf Branch `v2`.** Regelmäßig committen und `git push origin v2` ausführen.

### 2. Täglich arbeiten

- **An V2 arbeiten:** Immer auf Branch `v2` sein (`git checkout v2`), nur in V2-Ordnern (z. B. `02_Version_2.0_spielwiese/`) ändern, committen, `git push origin v2`.
- **V1 ansehen/vergleichen:** `git checkout main` – dort liegt die aktuelle Live-Version. Keine Änderungen an V1-Dateien auf `main` nötig.

So bleiben V1 (main) und V2 (v2) sauber getrennt; du verzichtest auf keine der beiden.

### 3. Wenn V2 fertig ist: Umstellung, V1 archivieren

1. **V1 sichern (Archiv-Branch):**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b archive-v1
   git push origin archive-v1
   ```
   → V1 ist dauerhaft im Branch `archive-v1` gesichert.

2. **V2 zur neuen Live-Version machen:**  
   Entweder in den GitHub-Einstellungen (Settings → Pages) die **Source** auf den Branch **`v2`** (und ggf. den Ordner, in dem die V2-`index.html` im Root liegt) umstellen – **oder** den Inhalt von `v2` in `main` mergen/übernehmen, sodass `main` ab dann die V2-Struktur hat und Pages weiter aus `main` deployt.

3. **Danach:**  
   - **Live** = V2 (von `main` oder direkt von `v2`, je nach Einstellung).  
   - **V1** = bleibt im Repo im Branch `archive-v1`, jederzeit wieder auscheckbar und nutzbar. Du verzichtest auf nichts.

---

## Kurz-Checkliste

| Phase        | Aktion |
|-------------|--------|
| **Jetzt**   | Branch `v2` anlegen, nur dort V2 entwickeln. `main` für V1 in Ruhe lassen. |
| **Entwicklung** | Immer auf `v2` arbeiten, pushen mit `git push origin v2`. |
| **V2 fertig** | Branch `archive-v1` von `main` erstellen (V1 sichern). V2 als Live-Source setzen. |
| **Danach**  | V1 = Branch `archive-v1`. V2 = live. Beide Versionen bleiben im Repo. |

---

## Alternative: Nur Ordner trennen (ohne Branch)

Wenn du keine Branches nutzen willst: Weiter alles auf `main` committen, aber **nur** in V2-Ordnern (z. B. `02_Version_2.0_spielwiese/`) arbeiten. V1-Ordner (z. B. `01_Version_1.0_live/`) nicht anfassen. Dann liegen beide Versionen im gleichen Branch in verschiedenen Ordnern – weniger sauber getrennt als mit Branch `v2`, aber möglich. Die saubere Trennung und das „beide behalten“ erreichst du am klarsten mit der Branch-Strategie oben.
