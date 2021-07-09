console.log('Start');

/* 
Möchte man Operationen nacheinander ausführen, bei denen Zeit verstreicht,
weil sie aufwändig sind (z.B. Geolocation ermitteln, Netzwerkanfragen),
muss man Callback-Funktionen nutzen. Das Problem mit Callback-Funktionen
ist, dass diese schnell schwer zu lesen und zu schreiben sind, und immer
weiter verschachtelt werden müssen. ("Callback-Hell" oder "Pyramid of Doom").
*/
/* setTimeout(() => {
  const result = 1 + 1;
  console.log(`Berechnung fertig`);
  setTimeout(() => console.log(`Das Ergebnis lautet ${result}`), 1000);
}, 2000); */

console.log('Weiter');

function cook(ingredients) {
  /* 
    Das Promise muss eine Funktion als Argument erhalten. Diese Funktion
    erhält automatisch zwei Funktionen, üblicherweise resolve und reject
    genannt.
    In der Funktion führt man die (zeitaufwändige) Operation durch. Wenn
    das Ergebnis bereit ist, kann man das Versprechen einlösen, indem man
    die resolve-Funktion aufruft, und ihr das Ergebnis als Argument übergibt.
    */
  return new Promise((resolve, reject) => {
    const result = `Hier ist deine Bestellung mit ${ingredients.join(
      ',',
      ingredients
    )}.`;

    const notAvailable = ['🥔'];

    for (const ingredient of ingredients) {
      if (notAvailable.includes(ingredient)) {
        reject(`${ingredient} ist leider nicht vorrätig.`);
      }
    }

    setTimeout(() => resolve(result), 1000 * ingredients.length);
  });
}

/* cook(['🥔', '🍆'])
  .then((result) => {
    console.log(result);
    return cook(['🍪']);
  })
  .then((result) => console.log(result))
  .catch((errorMessage) => console.log(errorMessage)); */

console.log('Ich warte auf die Bestellung...');

/* 
Funktionen, die intern await benutzen, müssen als async gekennzeichnet werden
*/
async function orderFood() {
  /* Wenn man auf das eingelöste Versprechen einer Funktion, die
    ein Promise zurückgibt, warten möchte, kann man await davor schreiben.
    Das funktioniert nur in async-Funktionen.
    (Außer der Browser unterstützt top-level await:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top-level-await
    )
    */
  const pommes = await cook(['🍟', '🥤']);
  /* Die Zeile nach einer await-Zeile wird erst ausgeführt, wenn die
  await-Zeile fertig ist und z.B. in pommes der Wert des einglösten
  Versprechens ist. */
  console.log(pommes);
  const desert = await cook(['🍪']);
  console.log(desert);

  return 'Alle sind satt!';
}

/* Möchte man den Rückgabewert einer async-Funktion nutzen, muss man den
.then-Syntax nehmen, weil async-Funktionen immer ein Promise zurückgeben.
Wenn die async-Funktion möglicherweise ein Promise nicht erfüllt (reject aufruft),
muss man am Ende .catch() anhängen, oder alternativ in der async-Funktion
einen try-catch-Block machen.
*/
orderFood().then((result) => console.log(result));

console.log('Weiter nach Aufruf von orderFood');
