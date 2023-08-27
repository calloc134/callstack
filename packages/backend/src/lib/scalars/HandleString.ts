import { ASTNode, GraphQLScalarType, Kind } from "graphql";
import { createGraphQLError } from "graphql-yoga";

const validate = (value: any, ast?: ASTNode) => {
  if (typeof value !== "string") {
    throw createGraphQLError(`Value is not a string: ${value}`, ast ? { nodes: ast } : undefined);
  }

  if (!value.trim().length) {
    throw createGraphQLError(`Value cannot be an empty string: ${value}`, ast ? { nodes: ast } : undefined);
  }

  // ASCIIで表現可能な小文字、数字、簡単な記号のみを許容
  if (!/^[a-z0-9_]+$/.test(value)) {
    throw createGraphQLError(`Value must consist only of lowercase ASCII letters, numbers, or underscores: ${value}`, ast ? { nodes: ast } : undefined);
  }

  return value;
};

export const GraphQLHandleString = /*#__PURE__*/ new GraphQLScalarType({
  name: "HandleString",

  description: "A string that is used for the handle of a user",

  serialize: validate,

  parseValue: validate,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw createGraphQLError(`Can only validate strings but got a: ${ast.kind}`, { nodes: ast });
    }
    return validate(ast.value, ast);
  },
  extensions: {
    codegenScalarType: "string",
    jsonSchema: {
      title: "HandleString",
      type: "string",
      minLength: 1,
      pattern: "^[a-z0-9_]+$", // JSON Schemaでの正規表現パターン
    },
  },
});
