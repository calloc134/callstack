import { Context } from "./context";
import { Resolvers } from "./resolvers/generated/resolvers-types";
import { resolvers as scalarResolvers } from "graphql-scalars";
import { Query } from "./resolvers/queries";

// リゾルバーの定義
export const resolvers: Resolvers<Context> = {
  // スカラー型に対応するリゾルバーをマージ
  ...scalarResolvers,

  // クエリのリゾルバーを定義
  Query: Query,
};
