# eslint-plugin-deprecation

> An [ESLint](https://eslint.org/) rule that reports function arguments of type any.

## Install

```sh
npm install --save-dev eslint-plugin-no-implicit-any-function-args
```

## Setup

```json
{
  "plugins": [
    "no-implicit-any-function-args",
  ],
  "rules": {
    "no-implicit-any-function-args/no-implicit-any-function-args": "error",
  },
}
```

or

```json
{
  "plugins": [
    "no-implicit-any-function-args",
  ],
  "rules": {
    "no-implicit-any-function-args/no-implicit-any-function-args": [
      "error",
      {
        ignorePattern: '^_'
      }
    ]
  },
}
```
