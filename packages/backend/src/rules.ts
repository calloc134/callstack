import { rule } from "graphql-shield";
import { Context } from "./context";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";

// 環境変数から鍵のパスを取得
const public_key_path = process.env.PUBLIC_KEY_PATH;
const private_key_path = process.env.PRIVATE_KEY_PATH;

// 秘密鍵を取得
// 環境変数が存在していれば、そのパスから読み込み
// 環境変数が存在しなければ、../../private.keyから読み込み
const public_key = fs.readFileSync(public_key_path || "../../keys/public.key", "utf8");
const private_key = fs.readFileSync(private_key_path || "../../keys/private.key", "utf8");

// JWTのペイロードの型定義
type Payload = {
  uuid: string;
};

// ユーザーがログインしているかどうかを判定するルール
export const isLoginUser = rule({ cache: "contextual" })(async (_parent, _args, context: Context) => {
  // Authorizationヘッダーからトークンを取得

  // authヘッダを格納する変数の初期化
  let auth: string | undefined;

  // authヘッダーを取得
  // node:httpのヘッダーを取得
  auth = context.req.headers.authorization;

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
