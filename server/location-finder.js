const path = require('path');

/* Datenquelle:  https://github.com/zauberware/postal-codes-json-xml-csv
path ist ein Modul, mit dem Pfade korrekt für das jeweilige Betriebssystem
erzeugt werden können, da Windows z.B. Backslash (\) statt Slash (/) für
Verzeichnisebenen nutzt.
__dirname ist eine Konstante, die den Pfad der aktuellen Datei enthält.
*/
const allLocations = require(path.join(__dirname, 'zipcodes.de.json'));

/* Die Funktion soll einen Array zurückgeben, der alle Einträge aus
allLocations enthält, die entweder den searchTerm als Teil des
Ortsnamens haben (place), oder bei denen die Postleitzahl mit
searchTerm beginnt. Für die Postleitzahl kann z.B. die String-Methode
startsWith genutzt werden. */

/*  Datensatz filtern, zipcode ist ein String und kein Integer, da
    PLZ mit 0 beginnen können. startsWith ist einen String-Methode, die
    prüft, ob ein String mit einem anderen String beginnt, und entsprechend
    true oder false zurückgibt.
    Bei der Ortssuche wird ein Regulärer Ausdruck verwendet, um nicht nur den
    Anfang des Strings zu suchen und dadurch auch Stadteile wie "Berlin Kreuzberg"
    oder Orte wie "Lutherstadt Wittenberg" zu finden. 
*/

module.exports.getLocations = function (searchTerm) {
  const regExp = new RegExp(searchTerm, 'i');

  return allLocations.filter(
    ({ place, zipcode }) =>
      (place.length > 1 && regExp.test(place)) || zipcode.startsWith(searchTerm)
  );
};

/* {
  country_code: 'DE',
  zipcode: '01945',
  place: 'Grünewald',
  state: 'Brandenburg',
  state_code: 'BB',
  province: '',
  province_code: '00',
  community: 'Landkreis Oberspreewald-Lausitz',
  community_code: '12066',
  latitude: '51.4',
  longitude: '14',
}; */
