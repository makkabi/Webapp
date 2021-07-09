const http = require('http');

const { getLocations } = require('./location-finder');

// Port und Domain, unter der der Server erreichbar ist
const host = 'localhost';
const port = 8000;

// Server erschaffen und Callback-Funktion für Anfragen übergeben
const server = http.createServer(requestListener);

// Server starten
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

/* Die Callback-Funktion erhält in request ein Objekt mit allen Details über
die Anfrage  und mit response ein Objekt mit vielen Methoden für
die Antwort. */
function requestListener(request, response) {
  // Header müssen am Anfang gesetzt werden, hier Inhaltstyp und Statuscode
  response.setHeader('Content-Type', 'application/json'); // Für HTML "text/html"
  response.setHeader('Access-Control-Allow-Origin', '*'); // CORS-Header
  response.writeHead(200); // 200 = ok

  // JS URL-Objekt erstellen und die gesuchte Postleitzahl auslesen
  const url = new URL(request.url, `http://${request.headers.host}`);
  const searchTerm = url.searchParams.get('search');

  const result = getLocations(searchTerm);

  response.write(JSON.stringify(result));

  // Ausgabe beenden, andernfalls läuft der Server ewig
  response.end();
}
