import { GraphQLContext } from "./context";
import { Resolvers } from "./lib/generated/resolver-types";
import { resolvers as scalarResolvers } from "graphql-scalars";
import { UserTypeResolver } from "./resolvers/types/userType";
import { PostTypeResolver } from "./resolvers/types/postType";
import { PanelQueryResolver } from "./resolvers/queries/panelQuery";
import { PanelMutationResolver } from "./resolvers/mutations/panelMutation";
import { GraphQLHandleString } from "./lib/scalars/HandleString";
import { GraphQLTitleString } from "./lib/scalars/TitleString";
import { GraphQLBodyString } from "./lib/scalars/BodyString";
import { GraphQLScreenNameString } from "./lib/scalars/ScreenNameString";
import { GraphQLBioString } from "./lib/scalars/BioString";

// リゾルバーの定義
export const resolvers: Resolvers<GraphQLContext> = {
  // スカラー型に対応するリゾルバーをマージ
  ...scalarResolvers,

  // ユーザのハンドル用のスカラー型のリゾルバー
  HandleString: GraphQLHandleString,
  // ユーザのスクリーンネーム用のスカラー型のリゾルバー
  ScreenNameString: GraphQLScreenNameString,
  // ユーザの自己紹介用のスカラー型のリゾルバー
  BioString: GraphQLBioString,
  // タイトル用のスカラー型のリゾルバー
  TitleString: GraphQLTitleString,
  // 本文用のスカラー型のリゾルバー
  BodyString: GraphQLBodyString,

  // クエリのリゾルバー
  Query: {
    ...PanelQueryResolver,
  },

  // ミューテーションのリゾルバー
  Mutation: {
    ...PanelMutationResolver,
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
