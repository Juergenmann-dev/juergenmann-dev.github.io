/**
 * navigation-data.js – Ansichts-Labels und Struktur: Desktop (alle Tabs) vs. Mobile (Tabs + Hamburger ohne Drucken).
 * Nach dem Einbinden: window.NAVIGATION_DATA
 */
(function () {
  "use strict";

  window.NAVIGATION_DATA = {
    /** Label pro Ansicht (data-mode / setMode) */
    labels: {
      deckblatt: "Deckblatt",
      design: "Handoff",
      onepage: "1-Seite",
      ats: "ATS",
      anschreiben: "Anschreiben",
      komplett: "Komplett",
      profilplus: "Profil+",
      drucken: "Drucken"
    },

    /** Auf dem Deckblatt: Mobile nur Handoff, 1-Seite, ATS – Desktop zusätzlich Profil+ */
    deckblatt: {
      mobile: ["design", "onepage", "ats"],
      desktop: ["design", "onepage", "ats", "profilplus"]
    },

    /** Desktop (Win, Mac, Linux): Standard-Anzeige, alle Tabs in dieser Reihenfolge */
    desktop: {
      tabs: ["deckblatt", "design", "onepage", "ats", "anschreiben", "komplett", "profilplus", "drucken"]
    },

    /** Mobile (iPhone, Android): Tabs nur Handoff, 1-Seite, ATS + Play-Button + Hamburger mit dem Rest, ohne Drucken */
    mobile: {
      tabs: ["design", "onepage", "ats"],
      menu: ["deckblatt", "anschreiben", "komplett"]
    },

    /** Favicon-/Modus-Kürzel pro Ansicht (label = Text im Favicon, size = Schriftgröße für SVG) */
    modeFavicon: {
      deckblatt: { label: "JM", size: 28 },
      design: { label: "HO", size: 28 },
      onepage: { label: "S1", size: 28 },
      ats: { label: "ATS", size: 22 },
      profilplus: { label: "PR", size: 28 },
      anschreiben: { label: "AN", size: 28 },
      komplett: { label: "KO", size: 28 }
    }
  };
})();
