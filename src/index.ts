import { ESLintUtils } from '@typescript-eslint/utils';
import { TypeFlags } from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  () => 'https://github.com/fast-facts/eslint-plugin-no-implicit-any-function-args'
);

export type Options = unknown[];
export type MessageIds = 'noImplicitAnyArg';

export const rule = createRule<Options, MessageIds>({
  name: 'no-implicit-any-function-args',
  meta: {
    type: 'problem',
    docs: {
      description: 'No implicit any for a function argument is allowed.',
      requiresTypeChecking: true
    },
    messages: {
      noImplicitAnyArg: 'Argument \'{{ name }}\' requires a type'
    },
    schema: []
  },
  defaultOptions: [],
  create: context => {
    if (
      !context.parserServices ||
      !context.parserServices.program ||
      !context.parserServices.esTreeNodeToTSNodeMap
    ) {
      throw new Error(
        'You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.'
      );
    }

    const service = context.parserServices;
    const typeChecker = service.program.getTypeChecker();

    function functionTest(node: any) {
      for (const param of node.params) {
        if (!param.typeAnnotation && !param.right) {
          const typescriptParam = context.parserServices!.esTreeNodeToTSNodeMap.get(param);
          const type = typeChecker.getTypeAtLocation(typescriptParam);

          if ((type.flags & TypeFlags.Any) !== 0) {
            context.report({
              node: param,
              messageId: 'noImplicitAnyArg',
              data: {
                name: param.name
              }
            });
          }
        }
      }
    }

    return {
      FunctionDeclaration: functionTest,
      FunctionExpression: functionTest,
      ArrowFunctionExpression: functionTest
    };
  }
});