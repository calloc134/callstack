import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../graphql/schemas/*.graphql",
  documents: "../graphql/operations/*.graphql",
  generates: {
    "src/lib/generated/dummy.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-urql",
        // "typescript-validation-schema"
      ],
      config: {
        withHooks: true,
        strictScalars: true,
        scalars: {
          UUID: "string",
        },
        // schema: "zod",
        // scalarSchemas: {
        //   UUID: "z.string().uuid()",
        // },
      },
    },
  },
};

export default config;
