# Abgleich: Folien 04_Android_Programmieren ↔ Code (Tech-Stack)

**Folien-Pfad:** `/Volumes/Cloud_6Tb_USB/Cloud_6Tb_USB/02_Schule Syntax/Folien/04_Android_Programmieren`  
**Code-Referenz:** `story/content/techskills_Kernkompetenz-data.js` → Eintrag **Jetpack Compose** (`key: "jetpack"`) + ggf. **REST APIs**.

---

## Im Ordner 04 vorhandene PDFs (20 Stück)

| Nr. | Dateiname (ohne .pdf) |
|-----|------------------------|
| 01-0 | Einstieg in das Modul |
| 01-01 | Einführung in Kotlin |
| 01-02 | Kollektionen & Kontrollstrukturen |
| 01-03 | Funktionen & Lambdas |
| 01-04 | Objektorientierung |
| 02-1 | Jetpack Compose Intro |
| 02-2 | Layouts |
| 02-3 | Lazy Layouts |
| 02-4 | Previews & Themes |
| 03-1 | Components, Screens & States |
| 03-2 | State Management & Interaktion |
| 03-3 | LaunchedEffect & Animation |
| 03-4 | Modale Composables & Composable Parameter |
| 04-01 | ViewModel |
| 04-02 | Navigation Grundlagen |
| 04-03 | Navigation mit Argumenten |
| 04-04 | Bottom Navigation |
| **06-1** | **API Intro & Call** |
| **06-2** | **API Call II** |
| **06-3** | **API Async Images** |

*(06-1 bis 06-3 sind die zuletzt hinzugekommenen Folien, Stand März 2025.)*

---

## Aktueller Detail-Text im Code (Jetpack Compose)

```text
Kotlin-Grundlagen plus Jetpack Compose: Layouts, Lazy Lists, Themes, Komponenten & State, Navigation, Effects und Animation. Ziel: UI und State so koppeln, dass sich SwiftUI-Konzepte sauber auf Android übertragen lassen.
```

---

## Bereits im Code abgedeckt (Unterkategorien aus 04)

| Folien | Thema | Im Code |
|--------|--------|---------|
| 01-0 … 01-04 | Kotlin (Einstieg, Grundlagen, OOP) | pauschal als „Kotlin-Grundlagen“ |
| 02-1 | Jetpack Compose Intro | implizit („Jetpack Compose“) |
| 02-2 | Layouts | ✓ „Layouts“ |
| 02-3 | Lazy Layouts | ✓ „Lazy Lists“ |
| 02-4 | Previews & Themes | ✓ „Themes“ |
| 03-1 | Components, Screens & States | ✓ „Komponenten & State“ |
| 03-2 | State Management & Interaktion | ✓ „State“ |
| 03-3 | LaunchedEffect & Animation | ✓ „Effects und Animation“ |
| 03-4 | Modale Composables & Composable Parameter | teilweise (Effects/Composables) |
| 04-02 … 04-04 | Navigation (Grundlagen, Argumente, Bottom Nav) | ✓ „Navigation“ |

---

## Integriert (Stand nach Update)

| Folien | Thema | Im Code |
|--------|--------|---------|
| 04-01 | ViewModel | ✓ im Jetpack-Detail |
| 06-1, 06-2, 06-3 | API Intro & Call, API Call II, Async Images | ✓ „API-Integration in der App: API-Calls (Intro & Call, Call II), Async Images.“ |

---

## Kurzfassung

- **Bereits integriert:** Folien 01-* (Kotlin-Grundlagen), 02-* (Compose, Layouts, Lazy, Themes), 03-* (Components, State, Effects, Animation), 04-01 (ViewModel), 04-02 bis 04-04 (Navigation), 06-1 bis 06-3 (API-Calls, Async Images).
- **Quelle:** `story/content/techskills_Kernkompetenz-data.js` → Eintrag `jetpack`. Fallback in `2.4_android/android-view.js` ist angeglichen.
