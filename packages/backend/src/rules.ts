import { rule } from "graphql-shield";
import { GraphQLContext } from "./context";
// import * as fs from "fs";
import * as jwt from "jsonwebtoken";

// JWTのペイロードの型定義
type Payload = {
  uuid: string;
};

// ユーザーがログインしているかどうかを判定するルール
export const isLoginUser = rule({ cache: "contextual" })(async (_parent, _args, context: GraphQLContext) => {
  // Authorizationヘッダーからトークンを取得

  // authヘッダを格納する変数の初期化
  // authヘッダーが存在しない場合はundefined
  const auth: string | undefined = context.req.headers.authorization;

  // authヘッダーが存在しない場合はfalseを返す
  if (!auth) {
    return false;
  }

  // authヘッダーからスペースとBearer文字列を除去
  const token = auth.replace("Bearer ", "");

  // トークンを検証
  // RS256アルゴリズムのみを許可
  const { uuid } = jwt.verify(token, public_key, {
    algorithms: ["RS256"],
  }) as Payload;

  // uuidからユーザーを取得
  const user = await context.prisma.user.findUniqueOrThrow({
    where: {
      uuid: uuid,
    },
  });

  // ユーザーが存在しない場合はfalseを返す
  if (!user) {
    return false;
  }

  // ユーザーが存在する場合はtrueを返す
  return true;
});
