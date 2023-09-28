module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'No implicit any for a function argument is allowed.',
    },
    messages: {
      noImplicitAnyArg: `Argument '{{ name }}' requires a type`
    },
  },
  create: context => {
    function functionTest(node) {
      for (const param of node.params) {
        if (!param.typeAnnotation && !param.right) {
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

    return {
      FunctionDeclaration: functionTest,
      FunctionExpression: functionTest,
      ArrowFunctionExpression: functionTest
    };
  }
};