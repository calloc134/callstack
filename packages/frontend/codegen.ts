import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.SCHEMA_PATH,
  documents: ["./src/features/**/components/**/*.tsx", "./src/features/**/pages/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "src/lib/generated/": {
      preset: "client",
      config: {
        strictScalars: true,
        scalars: {
          UUID: "string",
          DateTime: "Date",
          NonNegativeInt: "number",
          NonEmptyString: "string",
          HandleString: "string",
          ScreenNameString: "string",
          BioString: "string",
          TitleString: "string",
          BodyString: "string",
          File: "File",
        },
        enumsAsTypes: true,
        skipTypename: true,
        useTypeImports: true,
        // schema: "zod",
        // scalarSchemas: {
        //   UUID: "z.string().uuid()",
        // },
      },
    },
  },
};

export default config;
