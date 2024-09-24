import { ESLintUtils } from '@typescript-eslint/utils';
import { TypeFlags } from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  () => 'https://github.com/fast-facts/eslint-plugin-no-implicit-any-function-args'
);

export type Options = [
  {
    ignorePattern?: string;
  }
];
export type MessageIds = 'noImplicitAnyArg';

export const rules = {
  'no-implicit-any-function-args': createRule<Options, MessageIds>({
    name: 'no-implicit-any-function-args',
    meta: {
      type: 'problem',
      docs: {
        description: 'No implicit any for a function argument is allowed.',
      },
      messages: {
        noImplicitAnyArg: 'Argument \'{{ name }}\' requires a type',
      },
      schema: [{
        type: 'object',
        properties: {
          ignorePattern: {
            type: 'string',
          },
        },
      }],
    },
    defaultOptions: [{}],
    create: (context, [options]) => {
      if (
        !context.sourceCode.parserServices ||
        !context.sourceCode.parserServices.program ||
        !context.sourceCode.parserServices.esTreeNodeToTSNodeMap
      ) {
        throw new Error(
          'You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.'
        );
      }

      const ignoreRegex = options.ignorePattern ? new RegExp(options.ignorePattern) : undefined;

      const service = context.sourceCode.parserServices;
      const typeChecker = service.program?.getTypeChecker();

      function functionTest(node: any) {
        for (const param of node.params) {
          if (!param.typeAnnotation && !param.right) {
            const typescriptParam = context.sourceCode.parserServices?.esTreeNodeToTSNodeMap?.get(param);
            if (!typescriptParam) continue;

            const type = typeChecker?.getTypeAtLocation(typescriptParam);
            if (!type) continue;

            if ((type.flags & TypeFlags.Any) === 0) continue;
            if (ignoreRegex?.test(param.name)) continue;

            context.report({
              node: param,
              messageId: 'noImplicitAnyArg',
              data: {
                name: param.name,
              },
            });
          }
        }
      }

      return {
        FunctionDeclaration: functionTest,
        FunctionExpression: functionTest,
        ArrowFunctionExpression: functionTest,
      };
    },
  }),
};
