# eslint-plugin-deprecation

> An [ESLint](https://eslint.org/) rule that reports function arguments of type any.

## Install

```sh
npm install --save-dev eslint-plugin-no-implicit-any-function-args
```

## Setup

```js
const tseslint = require('typescript-eslint');

const noImplicitAnyFunctionArgs = require('eslint-plugin-no-implicit-any-function-args');

module.exports = tseslint.config(
  // Javascript
  {
    files: ['**/*.js'],

    plugins: {
      'no-implicit-any-function-args': noImplicitAnyFunctionArgs,
    },

    rules: {
      'no-implicit-any-function-args/no-implicit-any-function-args': ['error', {
        ignorePattern: '^_',
      }],
    },
  },
```
