import { GraphQLContext } from "./context";
import { Resolvers } from "./lib/generated/resolver-types";
import { resolvers as scalarResolvers } from "graphql-scalars";
import { Query } from "./resolvers/queries";

// リゾルバーの定義
export const resolvers: Resolvers<GraphQLContext> = {
  // スカラー型に対応するリゾルバーをマージ
  ...scalarResolvers,

  // クエリのリゾルバーを定義
  Query: Query,
};
