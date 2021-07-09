// Übersicht zu den JavaScript-Regeln: https://eslint.org/docs/rules/
module.exports = {
  env: {
    //Wo soll der Code später funktionieren?
    browser: true, // Läuft im Browser
    es2021: true, // Legt fest, das neue Features von JavaScript erlaubt sind
    node: true, // Läuft mit Node
  },
  parserOptions: {
    ecmaVersion: 2021, // Sprachversion von JS, d.h. welche Features sind erlaubt?
    sourceType: 'module',
  },
  // Nutze die Standard-Regeln
  // Deaktiviere alle Formatierungsregeln, die mit Prettier in Konflikt stehen
  // Wichtig: Prettier immer als letztes auflisten
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-var': 'error', // "off", "warn" oder "error", alternativ 0,1 oder 2
    'prefer-const': 'warn',
  },
  // Registriere global verfügbare Variablen: https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  globals: {
    _: 'readonly',
  },
};
