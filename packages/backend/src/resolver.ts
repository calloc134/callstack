import { GraphQLContext } from "./context";
import { Resolvers } from "./lib/generated/resolver-types";
import { resolvers as scalarResolvers } from "graphql-scalars";
import { UserTypeResolver } from "./resolvers/types/userType";
import { PostTypeResolver } from "./resolvers/types/postType";
import { PanelQueryResolver } from "./resolvers/queries/panelQuery";

// リゾルバーの定義
export const resolvers: Resolvers<GraphQLContext> = {
  // スカラー型に対応するリゾルバーをマージ
  ...scalarResolvers,

  // クエリのリゾルバー
  Query: {
    ...PanelQueryResolver,
  },
  // ユーザ型のリゾルバー
  User: {
    ...UserTypeResolver,
  },
  // 投稿型のリゾルバー
  Post: {
    ...PostTypeResolver,
  },
};
