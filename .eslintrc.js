module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'extends': [
    "eslint:recommended",
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    "indent": [
      "error",
      4, {
        "SwitchCase": 1
      }
    ],
    "semi": [
      "error",
      "always"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "no-trailing-spaces": [
      "error"
    ],
    "brace-style": [
      "error",
      "1tbs",
      { "allowSingleLine": true }
    ],
    "space-before-blocks": [
      "error"
    ],
    "keyword-spacing": [
      "error"
    ],
    "comma-spacing": [
      "error"
    ],
    "eol-last": [
      "error"
    ],
    "space-infix-ops": [
      "error"
    ],
    // Below overwrite "eslint:recommended".
    "no-console": [
      "warn"
    ],
    "no-constant-condition": [
      "error",
      { "checkLoops": false }
    ],
    "no-undef": [
      // Temporarily turns off.
      "off"
    ],
    "no-unused-vars": [
      "warn"
    ],
    // Below overwrite "plugin:promise/recommended".
    "promise/avoid-new": [
      "off"
    ],
  }
}
