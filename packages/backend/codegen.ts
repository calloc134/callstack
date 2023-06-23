import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../graphql/schemas/*.graphql",
  generates: {
    "src/lib/generated/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../context#Context",
      },
    },
  },
};

export default config;
