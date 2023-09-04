import { ASTNode, GraphQLScalarType, Kind } from "graphql";
import { createGraphQLError } from "graphql-yoga";

const validate = (value: any, ast?: ASTNode) => {
  if (typeof value !== "string") {
    throw createGraphQLError(`Value is not a string: ${value}`, ast ? { nodes: ast } : undefined);
  }

  if (!value.trim().length) {
    throw createGraphQLError(`Value cannot be an empty string: ${value}`, ast ? { nodes: ast } : undefined);
  }

  if (value.length > 400) {
    throw createGraphQLError(`Value cannot be longer than 400 characters: ${value}`, ast ? { nodes: ast } : undefined);
  }

  return value;
};

export const GraphQLBioString = /*#__PURE__*/ new GraphQLScalarType({
  name: "BioString",

  description: "A string that is used for the bio of a user",

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
      title: "BioString",
      type: "string",
      minLength: 1,
    },
  },
});
