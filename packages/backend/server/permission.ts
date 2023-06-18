import { shield } from "graphql-shield";
import * as rules from "./rules";
import { GraphQLError } from "graphql";

// パーミッションの定義
export const permissions = shield(
  {
    Query: {
      // userクエリにisLoginUserを適用
      user: rules.isLoginUser,
    },
  },
  {
    // 認可エラー時のエラーを定義
    fallbackError: new GraphQLError("Not Authorized!"),
    // 外部エラーを許可
    allowExternalErrors: true,
  }
);
