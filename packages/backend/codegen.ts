import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.SCHEMA_PATH,
  generates: {
    "src/lib/generated/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../context#GraphQLContext",
      },
    },
  },
};

export default config;
