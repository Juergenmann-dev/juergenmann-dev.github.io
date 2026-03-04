/**
 * wasserzeichen-data.js – Watermarks / Code-Snippets (flexibel: hinzufügen oder entfernen).
 * id = CSS-Klasse (wm-1, wm-2, …). cvSignature z. B. unter Zertifikate.
 * Nach dem Einbinden: window.WASSERZEICHEN_DATA
 */
(function () {
  "use strict";

  window.WASSERZEICHEN_DATA = {
    /** Watermarks – flexible Liste. Einträge können ergänzt oder entfernt werden. */
    snippets: [
      {
        id: "wm-1",
        content: 'NAS_IP="$NAS_SERVER"\nwhile [ $elapsed -lt $NETWORK_WAIT_MAX ]; do\n  if ping -c 1 -t 2 "$NAS_IP"; then\n    log_technical "NAS erreichbar … ${elapsed}s"\n    break\n  fi\n  sleep $NETWORK_WAIT_INTERVAL\n  elapsed=$((elapsed + NETWORK_WAIT_INTERVAL))\ndone',
        /** Kurzvariante für Anschreiben-Page (ohne while-Schleife) */
        contentShort: 'NAS_IP="$NAS_SERVER"\nif ping -c 1 -t 2 "$NAS_IP"; then\n  log_technical "NAS erreichbar – starte Verbindung"\nfi'
      },
      {
        id: "wm-2",
        content: "// MARK: - Location Delegate\nextension SOSService: CLLocationManagerDelegate {\n  func locationManager(_ manager: CLLocationManager,\n    didUpdateLocations locations: [CLLocation]) {\n    guard let location = locations.last else { return }\n    currentLocation = location\n    DispatchQueue.main.async {\n      self.gpsPosition = String(format: \"%.6f, %.6f\", lat, lon)\n    }\n  }\n}"
      },
      {
        id: "wm-3",
        content: "// MARK: - CSV Export\nfunc exportAlsCSV() -> String {\n  let anfaelle = SpeicherManager.shared.loadAnfaelle()\n  guard !anfaelle.isEmpty else {\n    return \"Keine Anfälle vorhanden.\"\n  }\n  var csv = \"Datum,Uhrzeit,Typ,Schweregrad,Dauer,Notizen\\n\"\n  for anfall in sortierteAnfaelle {\n    csv += \"\\(datum),\\(anfall.typ),\\(anfall.schweregrad)…\\n\"\n  }\n  return csv\n}"
      },
      {
        id: "wm-4",
        content: "document.addEventListener('touchstart', function() {\n  if (!fullscreenAttempted) {\n    fullscreenAttempted = true;\n    setTimeout(requestFullscreen, 100);\n  }\n}, { once: true });"
      },
      {
        id: "wm-5",
        content: "<div class=\"watermark-code\">\n  // state · context · ship\n</div>"
      }
    ],

    /** CV-Signatur (z. B. unter Zertifikate im Lebenslauf) */
    cvSignature: "// state · context · ship",

    /** Deckblatt-Wasserzeichen (wm-d1 … wm-d4, z. B. .deckblatt-watermark) */
    deckblattSnippets: [
      { id: "wm-d1", content: 'if ping -c 1 "$NAS_IP"; then\n  log "NAS erreichbar"\nfi' },
      { id: "wm-d2", content: "// MARK: - Delegate\nextension SOSService" },
      { id: "wm-d3", content: "DOMContentLoaded\n   updateToggleActive(\"design\");" },
      { id: "wm-d4", content: "// state · context · ship" }
    ]
  };
})();
