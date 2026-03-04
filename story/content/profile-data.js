/**
 * profile-data.js – Rufe diese Datei auf, dann hast du alles zum Profil.
 * Zentrale Profil- und CV-Daten · state · context · ship
 * Eine Quelle – alle Views (Mac, Win, Linux, Android, iPhone, ATS, …) lesen daraus.
 * Nach dem Einbinden: window.CV_PROFILE (profile, tagline, deckblattSloganLines, …)
 */
(function () {
  "use strict";

  window.CV_PROFILE = {
    /** Profil: Name, Kontakt, Online, Wohnort – Sidebar / Kontaktbereich */
    profile: {
      name: "Jürgen Mann",
      email: "j.mann.software[at]gmail.com",
      tel: "+49 1515 918****",
      wohnort: "38518 Gifhorn",
      links: {
        linkedin: "https://www.linkedin.com/in/juergen-mann-j19830720/",
        github: "https://github.com/Juergenmann-dev"
      }
    },

    /** Tagline / Rolle (z. B. Sidebar, Deckblatt) */
    tagline: "App-Entwickler (iOS / Android)",

    /** Design-Page (Handoff): lange Tagline unter dem Namen */
    designTagline: "App-Entwickler (iOS / Android) – Architektur · Zustandslogik · Systemzustände · UX-nahe Produktentwicklung",

    /** Sidebar: Fokuszeile unter der Tagline (Design + Anschreiben) */
    sidebarFocus: "Architektur · Zustandslogik · UX-nahe Produktentwicklung",

    /** Kurzprofil-Statement Variante für Design-Page („und bringe“ statt „– saubere“) */
    statementDesign: "Junior-Entwickler mit Fokus auf modulare Architektur, Zustandslogik und wartbare Systeme. Ich arbeite strukturiert, lösungsorientiert und mit klarem Fokus auf Umsetzung und bringe saubere, modulare Ergebnisse.",

    /** Profil+-Page: Titel + Meta-Zeile (Kontaktzeile) */
    profilplus: {
      title: "Jürgen Mann – System-Architect & App-Developer",
      meta: "Gifhorn, Niedersachsen"
    },

    /** Deckblatt: 3 Zeilen – Zeile 1 grau, Zeilen 2–3 grün */
    deckblattSloganLines: [
      "App-Entwickler (iOS / Android)",
      "Architektur · Zustandslogik · UX-nahe",
      "Produktentwicklung"
    ],

    /** Kurzprofil: Statement + Team-Satz (Sidebar, Hauptinhalt, ATS/Onepage-Varianten) */
    shortProfile: {
      statement: "Junior-Entwickler mit Fokus auf modulare Architektur, Zustandslogik und wartbare Systeme. Ich arbeite strukturiert, lösungsorientiert und mit klarem Fokus auf Umsetzung – saubere, modulare Ergebnisse.",
      teamSentence: "Ich arbeite eigenverantwortlich und bringe Ergebnisse strukturiert ins Team zurück. Konstruktives Code-Review sehe ich als Teil kontinuierlicher Verbesserung."
    },

    /** Weiterbildung (Kurz) – Sidebar / Kurzfassung */
    weiterbildungKurz: {
      title: "Qualifizierung IT-Fachkraft App-Entwicklung (AZAV)",
      meta: "02.06.2025 – lfd. · Syntax Institut",
      pill: "2.300+ UE · iOS · Android · Product Design"
    },

    /** Sonstiges – Sprachen, Führerschein etc. (Sidebar) */
    sonstiges: [
      "Deutsch (Muttersprache)",
      "Englisch (Grundkenntnisse)",
      "Führerschein Kl. B"
    ],

    /** ATS-View: einzeiliges Profil + langer Absatz */
    atsProfileLine: "Junior-Entwickler mit Fokus auf modulare Architektur, Zustandslogik und wartbare Systeme; strukturierte, lösungsorientierte Arbeit, saubere modulare Ergebnisse; eigenverantwortlich, Ergebnisse ins Team zurück, Code-Review als Verbesserung.",
    atsLongParagraph: "App-Entwickler (iOS/Android), Qualifizierung zur IT-Fachkraft. Einstieg gesucht in Entwicklungsteams und Agenturen – Produkt-Apps, interne Tools, kundengebundene Projekte. Praxis in SwiftUI, Jetpack Compose, Firebase, modularer Architektur (SPM); überträgt Architekturkonzepte plattformübergreifend (SwiftUI → Jetpack Compose). Stärken: Codequalität, Denken in Systemzuständen und Fehlerketten, UX-nahe Systemanalyse, Umsetzung von Anforderungen in wartbare Software. Branchenerfahrung: Koordination, Qualität, Prozesse.",

    /** Onepage-View: kurzes Profil (1–2 Zeilen) */
    onepageProfileLine: "Junior-Entwickler mit Fokus auf modulare Architektur, Zustandslogik und wartbare Systeme; strukturierte Umsetzung, saubere modulare Ergebnisse.",
    onepageProfileLong: "App-Entwickler (iOS/Android), Qualifizierung IT-Fachkraft. Einstieg in Entwicklungsteams – Produkt-Apps, interne Tools. Praxis: SwiftUI, Jetpack Compose, Firebase, SPM. Stärken: Codequalität, Systemzustände, UX-nahe Analyse. Branchenerfahrung: Koordination, Qualität, Prozesse."
  };
})();
