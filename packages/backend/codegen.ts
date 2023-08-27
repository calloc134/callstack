import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.SCHEMA_PATH,
  generates: {
    "src/lib/generated/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../context#GraphQLContext",
        strictScalars: true,
        scalars: {
          UUID: "string",
          DateTime: "Date",
          PositiveInt: "number",
          NonEmptyString: "string",
          HandleString: "string",
          ScreenNameString: "string",
          BioString: "string",
          TitleString: "string",
          BodyString: "string",
        },
        enumsAsTypes: true,
        skipTypename: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
