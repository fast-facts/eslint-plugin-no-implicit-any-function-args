import { RuleTester } from '@typescript-eslint/rule-tester';
import { TSESLint } from '@typescript-eslint/utils';
import { rules, Options, MessageIds } from '.';
import * as path from 'path';

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: path.resolve(__dirname, '..'),
    project: './tsconfig.spec.json'
  }
});

ruleTester.run('no-implicit-any-function-args', rules['no-implicit-any-function-args'], {
  valid: [
    getValidTestCase('const f = (a:number, b:number) => null'),
    getValidTestCase('const f = (a:number, b = 0) => null'),
    getValidTestCase('function f(a:number, b:number) {}'),
    getValidTestCase('function f(a:number, b = 0) {}'),
    getValidTestCase('(a:number, b:number) => null'),
    getValidTestCase('(a:number, b = 0) => null'),
    getValidTestCase('const f: (a:number, b = 0) => null = (a, b) => null'),
    getValidTestCase('function f(a: number, b: (b: number) => null) { }; f(1, b => null)'),
    // getValidTestCase('const f: (a:number, b: any) => null = (a, b) => null'), // Try and figure this out later
    getInvalidTestCase('_ => null', [{ ignorePattern: '^_' }]),
  ],

  invalid: [
    getInvalidTestCase('const f = (a:number, b) => null'),
    getInvalidTestCase('const f = (a:number, b) => null'),
    getInvalidTestCase('function f(a:number, b) {}'),
    getInvalidTestCase('function f(a:number, b) {}'),
    getInvalidTestCase('(a:number, b) => null'),
    getInvalidTestCase('(a:number, b) => null'),
    getInvalidTestCase('_ => null'),
  ]
});

function getValidTestCase(code: string, options?: Options): TSESLint.ValidTestCase<Options> {
  return {
    code,
    options: options || [{}],
    filename: 'src/fixtures/file.ts'
  };
}

function getInvalidTestCase(code: string, options?: Options): TSESLint.InvalidTestCase<MessageIds, Options> {
  return {
    code,
    options: options || [{}],
    errors: [{ messageId: 'noImplicitAnyArg' }],
    filename: 'src/fixtures/file.ts'
  };
}
