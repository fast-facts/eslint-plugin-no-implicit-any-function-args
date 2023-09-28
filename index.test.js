'use strict';

const rule = require('.'),
  RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-implicit-any-function-args', rule, {
  valid: [
    {
      code: 'const f = (a:number, b:number) => null'
    },
    {
      code: 'const f = (a:number, b = 0) => null'
    },
    {
      code: 'function f(a:number, b:number) {}'
    },
    {
      code: 'function f(a:number, b = 0) {}'
    },
    {
      code: '(a:number, b:number) => null'
    },
    {
      code: '(a:number, b = 0) => null'
    }
  ],

  invalid: [
    {
      code: 'const f = (a:number, b) => null',
      errors: [{ message: /requires a type$/ }]
    },
    {
      code: 'const f = (a:number, b) => null',
      errors: [{ message: /requires a type$/ }]
    },
    {
      code: 'function f(a:number, b) {}',
      errors: [{ message: /requires a type$/ }]
    },
    {
      code: 'function f(a:number, b) {}',
      errors: [{ message: /requires a type$/ }]
    },
    {
      code: '(a:number, b) => null',
      errors: [{ message: /requires a type$/ }]
    },
    {
      code: '(a:number, b) => null',
      errors: [{ message: /requires a type$/ }]
    }
  ]
});