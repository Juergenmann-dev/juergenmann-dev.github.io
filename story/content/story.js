/**
 * Gemeinsame Story-Daten für alle Plattformen.
 * Android: Chat + Paketinstaller | Mac/Win/Linux: Terminal/Boot (echo, print, etc.)
 * Eine Quelle – Darstellung plattformspezifisch.
 */
(function () {
  "use strict";

  window.STORY_DATA = {
    /** Chat-Nachrichten (Android: Bubbles, Desktop: ggf. als Terminal-Zeilen) */
    messages: [
      { type: "bubble", text: "Moin. 👋", delay: 900 },
      { type: "bubble", text: "Ich möchte dich auf eine kleine Reise mitnehmen.", delay: 1400 },
      { type: "bubble", text: "In eine Welt, die auf den ersten Blick wie ein Lebenslauf aussieht –", delay: 1800 },
      { type: "bubble", text: "aber eigentlich von einem Menschen erzählt, der ein wunderbares Projekt gebaut hat.", delay: 1600 },
      { type: "system", text: "Heute, " }, // Zeit wird zur Laufzeit ergänzt
      { type: "bubble", text: "Lass dich treiben. Nicht alles erklärt sich sofort.", delay: 1500 },
      { type: "bubble", text: "Manches öffnet sich erst, wenn du genauer hinschaust. 🔍", delay: 1400 },
      { type: "bubble", text: "Und wenn du denkst – wow. Oder holy shit –", delay: 1600 },
      { type: "bubble", text: "schließ die Augen. Und lausch der Musik. 🎵", delay: 1200 },
      { type: "bubble", text: "Willkommen. 🚀", delay: 1400 },
      { type: "bubble", text: "📦 Lebenslauf wird installiert...", delay: 1000 }
    ],

    /** Die vier „Pakete“ / Berechtigungen (Installer-UI, gleicher Inhalt für alle) */
    packages: [
      {
        id: 1,
        icon: "🧠",
        title: "Systemarchitektur",
        subtitle: "iOS & Android, modular",
        detail: "<span>KMSA</span> · Modulares System, dynamisches Laden, Rollback.<br><span>SPM</span> · Swift Package Manager, saubere Deps.<br><span>Clean Architecture</span> · Testbar, wartbar, skalierbar."
      },
      {
        id: 2,
        icon: "⚡",
        title: "Deep Work Mode",
        subtitle: "Async, output-basiert, selbstständig",
        detail: "<span>95–100%</span> Anwesenheit · Qualifizierung AZAV Vollzeit.<br><span>Flow-Arbeit</span> · Morgens & abends, Ergebnis zählt.<br><span>Remote-ready</span> · Async, eigenverantwortlich."
      },
      {
        id: 3,
        icon: "🔥",
        title: "Firebase & SwiftUI",
        subtitle: "Realtime, Cloud-Sync, WatchKit",
        detail: "<span>Kaily App</span> · Firebase Realtime, Auth, Firestore.<br><span>WatchKit</span> · Apple Watch Integration.<br><span>Jetpack Compose</span> · Android State & Navigation."
      },
      {
        id: 4,
        icon: "☕",
        title: "Kaffee-Integration",
        subtitle: "Kritische Abhängigkeit. Immer.",
        detail: "<span>3 Versuche</span> · Wassertank leer → Kaffee vergessen → nicht angeschaltet.<br><span>Status</span> · Läuft. Endlich. ☕",
        detailRollback: "<span>Versuch 1</span> · Wassertank leer. ✗<br><span>Versuch 2</span> · Kaffee vergessen. ✗<br><span>Versuch 3</span> · ☕ läuft endlich...",
        detailDone: "<span>Status</span> · Läuft. Endlich. ☕<br><span>Warnung</span> · Ohne Kaffee keine Commits."
      }
    ],

    /** Installer-Fortschritt: Label + Prozent (für Paket-Nummer n = 1..4) */
    installSteps: [
      { label: "Systemarchitektur laden...", pct: 0 },
      { label: "Systemarchitektur ✓", pct: 25 },
      { label: "Deep Work Mode aktivieren...", pct: 25 },
      { label: "Deep Work Mode ✓", pct: 50 },
      { label: "Firebase & SwiftUI verknüpfen...", pct: 50 },
      { label: "Firebase & SwiftUI ✓", pct: 75 },
      { label: "Kaffee-Integration...", pct: 75 },
      { label: "✓ Installation abgeschlossen", pct: 100 }
    ],

    /** Paket 4: Ring-Animation – Rollback von 62% auf 0, dann auf 100% */
    package4Ring: { rollbackAt: 62 },

    /** Danke-Screen nach Installation */
    thankYou: {
      title: "Installation abgeschlossen",
      body: "Vielen Dank. Lebenslauf wird gestartet..."
    },

    /** Installer-Metadaten (APK-Karte) */
    installerMeta: {
      appName: "Jürgen Mann",
      publisher: "juergenmann-dev.github.io",
      version: "v1.0 · 4.2 MB",
      disclaimer: "⚠️ Diese App enthält 11 Easter Eggs und nachgewiesene Kaffee-Abhängigkeiten."
    },

    /** Flow-Mode-Abfrage im Terminal (vor Track-Auswahl) */
    flowPrompt: "Enable flow mode?",

    /** Terminal-Zeilen nach Installation (vor Deckblatt) */
    kioskLine: "✓ Kiosk mode aktiv – Klick oder Taste = Vollbild.",
    successLine: "✓ SUCCESS: Installation complete"
  };
})();
