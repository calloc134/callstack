import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "packages/grapqhl/schemas/*.graphql",
  documents: ["packages/frontend/src/**/*.tsx", "packages/frontend/src/**/**/*.tsx", "packages/frontend/src/**/**/**/*.tsx"],
};

export default config;
