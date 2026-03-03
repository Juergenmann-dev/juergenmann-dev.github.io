/**
 * lebenslauf-data.js – Lebenslauf-Inhalt: Aktuell, Projekte, Berufserfahrung, Zusatzqualifikationen, Zertifikate (eine Quelle).
 * Nach dem Einbinden: window.LEBENSLAUF_DATA
 */
(function () {
  "use strict";

  window.LEBENSLAUF_DATA = {
    /** Sektionsüberschriften (eine Quelle für alle Views) */
    sectionTitles: {
      kurzprofil: "Kurzprofil",
      aktuell: "Aktuell",
      projekte: "Projekte – Auswahl",
      berufserfahrung: "Berufserfahrung",
      zusatzqualifikationen: "Zusatzqualifikationen",
      zertifikate: "Zertifikate / Nachweise"
    },

    /** Kurzprofil: langer Absatz (3. Absatz im Hauptinhalt) */
    shortProfileLongParagraph: "App-Entwickler (iOS/Android) in Qualifizierung zur IT-Fachkraft. Sucht den Einstieg in Teams und Agenturen – von Produkt-Apps über interne Tools bis zu kundengebundenen Projekten. Praxis in SwiftUI, Jetpack Compose, Firebase und modularer Architektur (SPM); überträgt Architekturkonzepte plattformübergreifend (SwiftUI → Jetpack Compose). Stärken: Codequalität, Denken in Systemzuständen und Fehlerketten, UX-nahe Systemanalyse und die Übersetzung von Anforderungen in wartbare Software. Bringt Erfahrung aus anderen Branchen (Koordination, Qualität, Prozesse) mit.",

    /** Aktuell – Qualifizierungs-Callout */
    aktuell: {
      title: "Qualifizierung IT-Fachkraft App-Entwicklung – Syntax Institut (AZAV, Vollzeit/Remote)",
      meta: "Teilnahmebeginn: 02.06.2025 · Abschluss geplant: 06/2026 · Bewerbungen ab sofort, Vollzeitstart ab 07/2026",
      modules: [
        { label: "Product Design & Prototyping: 350 UE (99% Anwesenheit)" },
        { label: "Software-Entwicklung (OOP, GitHub): 400 UE (95% Anwesenheit)" },
        { label: "iOS App Development: 780 UE (100% Anwesenheit)" },
        { label: "Android App Development: 770 UE (laufend)" }
      ]
    },

    /** Projekte – Auswahl (title, optional href, meta, sub, bullets, optional mini) */
    projects: [
      {
        title: "Lebenslauf als Web-App – HTML/CSS/JS",
        href: "https://juergenmann-dev.github.io",
        meta: "2026",
        sub: "6 adaptive Views (Handoff, ATS, Druck, 1-Seite, …), ATS-optimiert, Easter Egg",
        bullets: [
          "Sie lesen es gerade.",
          "Mit KI umgesetzt – bewusst transparent; mein Schwerpunkt liegt auf iOS/Android, nicht auf Web-Frontend."
        ],
        mini: "↗ Link: auf den Namen klicken – Sie halten es gerade in der Hand."
      },
      {
        title: "timemachine-nas-backup – macOS Automatisierung (zsh · SMB)",
        href: "https://github.com/Juergenmann-dev/timemachine-nas-backup",
        meta: "2026",
        sub: "Schwerpunkt: Automatisierung und Betriebssicherheit",
        bullets: [
          "Automatisierung von Time Machine Backups über SMB (Mounting, Sparsebundle Handling)",
          "Erhöhte Betriebssicherheit durch Retry-Mechanismen, Timeout-Watchdog und strukturierte Exit-Code-Analyse",
          "LaunchAgent-Integration (Login-Start & periodische Ausführung)",
          "Strukturierte Logs und Fehlerpfade zur Betriebssicherheit"
        ],
        mini: "↗ Repo: auf den Namen klicken · läuft bereits privat bei mir im Einsatz"
      },
      {
        title: "UX Case Study – Zustandskommunikation im Kassensystem",
        meta: "02/2026",
        sub: "Schwerpunkt: Systemzustände → UI-Kommunikation → Nutzerführung",
        bullets: [
          "Eigenständige UX-/Systemanalyse zu Zustandskommunikation und Nutzerführung",
          "Identifikation von Problemen entlang einer Fehler- und Zustandskette",
          "Personas, UI-Mockups und strukturierte Verbesserungsvorschläge"
        ],
        linkLabel: "→ Veröffentlichung auf LinkedIn",
        linkHref: "https://www.linkedin.com/feed/update/urn:li:activity:7432396925536006144/"
      },
      {
        title: "Kaily – iOS App (SwiftUI · Firebase · WatchKit)",
        meta: "2025 – lfd.",
        sub: "Schwerpunkt: Architektur für Echtzeit-Datenstabilität und Skalierbarkeit (u. a. für Nutzung im Familienumfeld), Zustandsmanagement, Datenflüsse · App Store Freischaltung ausstehend · Launch 2026 geplant",
        bullets: [
          "iOS-App mit SwiftUI und Firebase; reaktive UI (z. B. @StateObject/Observation), Zustandsmanagement und strukturierte Fehlerbehandlung",
          "Datenmodellierung, Cloud-Sync und Offline-Persistence",
          "WatchKit-Integration für Benachrichtigungen und Ereignis-Trigger",
          "Fokus auf Wartbarkeit und modulare Struktur"
        ],
        mini: "Repository derzeit privat aufgrund laufender Pre-Launch-Phase (App-Store-Veröffentlichung 2026 geplant); Zugriff auf Anfrage möglich."
      },
      {
        title: "SmartCity Gifhorn – Stadtentwicklung in einer App",
        meta: "2025 – lfd.",
        sub: "Schwerpunkt: Lokale Vernetzung, nutzerorientierte Struktur · Launch 2026 geplant",
        bullets: [
          "Alle Bausteine der Stadtentwicklung (solidarisch, lokal) in einer App",
          "Mitentwicklung im Rahmen der Qualifizierung; Übertragung von Architekturkonzepten (SwiftUI → Jetpack Compose)"
        ],
        mini: "Repo: privat (s.o.) – auf Anfrage"
      },
      {
        title: "Minimodularsystem – modulares iOS Framework (SPM)",
        meta: "2025",
        sub: "Schwerpunkt: Modularchitektur und lose Kopplung · in realen Projekten eingesetzt",
        bullets: [
          "Modulare Struktur mit Swift Package Manager (SPM)",
          "Lose Kopplung über Protokolle/Interfaces (Bridge/SharedCore-Ansatz)",
          "Feature-Module aktivier-/deaktivierbar (Feature Flags/Registry)",
          "CI/Automation über GitHub Actions (Build-/Quality-Checks)",
          "Als SPM-Paket im CO2 Tracker produktiv eingesetzt; klare Modultrennung für parallele Feature-Entwicklung"
        ],
        mini: "Repo: privat (s.o.) – auf Anfrage"
      },
      {
        title: "CO2 Tracker – iOS App (Mitentwicklung · Betaphase/TestFlight)",
        meta: "2025",
        sub: "Schwerpunkt: Kooperation, KMSA-Integration, Fehleranalyse",
        bullets: [
          "Mitentwicklung an einer veröffentlichten iOS-App im Rahmen einer Kooperation",
          "KMSA (Karlchen Modular System Architecture) beigesteuert – eigene modulare Architektur",
          "Fehleranalyse, Debugging und Qualitätssicherung"
        ]
      }
    ],

    /** Fußnote nach Projekten */
    projectsFooter: "Projekt-Repositories derzeit privat aufgrund laufender Entwicklung und geplantem App-Store-Launch (Freigabe auf Anfrage möglich). 17 Schulungsrepos aus der Qualifizierung sind öffentlich einsehbar.",

    /** Berufserfahrung */
    experience: [
      {
        title: "Firma Obst – Glasreinigung",
        meta: "09/2023 – 01/2025",
        bullets: [
          "Kundenkoordination, projektbezogene Durchführung mehrerer Objekte",
          "Qualitätskontrolle, strukturierte Abläufe, Teamabstimmung"
        ],
        mini: "Davor: Persönliche Auszeit · Familienzeit · Vorbereitung Neuorientierung (06/2022 – 09/2023)"
      },
      {
        title: "Frindt Beiersdorf – Logistik",
        meta: "03/2021 – 06/2022",
        bullets: [
          "Kommissionierung, Versandvorbereitung, Frachtpapiere",
          "Eigeninitiative außerhalb der Rolle: Identifikation struktureller Lagerprobleme (fehlende Bestandstransparenz) und Anstoß zur Einführung eines scan-basierten Lagerverwaltungssystems"
        ],
        mini: "Davor: Persönliche Auszeit · Familienzeit · Neuorientierung (04/2020 – 03/2021)"
      },
      {
        title: "Borbet Kodersdorf – Schmelzer / Vorarbeiter",
        meta: "03/2016 – 04/2020",
        bullets: [
          "Prozess- und Qualitätsüberwachung (Temperatur/Legierung nach Analyse)",
          "Vorarbeiter ab 01/2017: Schichtkoordination, Übergaben, Arbeitsmittelbeschaffung"
        ]
      }
    ],

    /** Zusatzqualifikationen (Bullet-Liste) */
    zusatzqualifikationen: [
      "Mehrere abgeschlossene Aus- und Weiterbildungen · Details auf Anfrage",
      "Workshops: Kommunikation & Teamwork; Resilienz & Stressmanagement",
      "Führerschein Klasse B · Staplerschein · Brandschutzhelfer · Ersthelfer · DSGVO"
    ],

    /** Zertifikate / Nachweise (Fließtext) */
    zertifikateText: "Modulbescheinigungen (Modul 1, Modul 2, Modul 3) sowie Workshop-Zertifikate (Kommunikation & Teamwork, Resilienz & Stressmanagement, Demokratie). Originale auf Anfrage bzw. bei Bewerbung mitbringbar."
  };
})();
