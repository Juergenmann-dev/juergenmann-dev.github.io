/**
 * anschreiben-data.js – Anschreiben / Initiativbewerbung (eine Quelle für alle Views).
 * Nach dem Einbinden: window.ANSCHREIBEN_DATA
 */
(function () {
  "use strict";

  window.ANSCHREIBEN_DATA = {
    /** Überschrift + Tagline (Anschreiben-Seite) */
    header: {
      title: "Anschreiben",
      tagline: "Initiativbewerbung – App-Entwicklung iOS / Android"
    },

    /** Datumszeile (z. B. „Gifhorn, Februar 2026“) */
    dateLine: "Gifhorn, Februar 2026",

    /** Betreffzeile */
    betreff: "Initiativbewerbung als App-Entwickler (iOS / Android)",

    /** Body: Absätze nacheinander (erster Absatz = Kurzprofil-Statement, Rest = Anschreiben-Text) */
    bodyParagraphs: [
      "Junior-Entwickler mit Fokus auf modulare Architektur, Zustandslogik und wartbare Systeme. Ich arbeite strukturiert, lösungsorientiert und mit klarem Fokus auf Umsetzung – saubere, modulare Ergebnisse.",
      "Ich bin App-Entwickler mit Schwerpunkt iOS und Android, kurz vor Abschluss der Qualifizierung zur IT-Fachkraft (über 2.300 UE in SwiftUI, Jetpack Compose, Firebase). Meine erste iOS-App Kaily ist fertiggestellt und wartet auf die Freischaltung des Apple Developer Accounts. Ich wende mich initiativ an Sie, weil ich ein Team suche, in dem Code und Produktdenken gleichwertig behandelt werden.",
      "Was mich unterscheidet, ist meine Art zu denken: Ich sehe Systeme, erkenne Fehlerketten und frage nicht nur „funktioniert es?", sondern „versteht der Nutzer, was das System tut?" Ein Beispiel: Eigenständige UX-Analyse für das PAYBACK-Kassenterminal (5 Probleme, Personas, Mockups) – auf LinkedIn veröffentlicht, auf Anfrage verfügbar.",
      "Eigeninitiative und Systemdenken bringe ich aus anderen Kontexten mit: Vorarbeiter bei Borbet (Schichtkoordination, Qualität), bei Frindt Beiersdorf Anstoß für ein scan-basiertes Lagerverwaltungssystem.",
      "Ich suche eine Stelle zum Mitdenken und Mitgestalten – Produkt-Apps, interne Tools, kundengebundene Projekte. Vollzeitstart ab Juli 2026, Bewerbungsgespräche ab sofort. Praktikum oder Probearbeiten im Rahmen der Qualifizierung nach Absprache möglich.",
      "Ich freue mich auf ein Gespräch."
    ],

    /** Signatur (Links können aus CV_PROFILE.profile.links ergänzt werden) */
    signatur: {
      greeting: "Mit freundlichen Grüßen",
      name: "Jürgen Mann",
      linkLine: "GitHub: github.com/Juergenmann-dev · LinkedIn: linkedin.com/in/juergen-mann"
    }
  };
})();
