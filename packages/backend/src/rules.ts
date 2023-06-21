import { rule } from "graphql-shield";
import { Context } from "./context";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";

// 秘密鍵を取得
const public_key = fs.readFileSync(`${__dirname}/../secret/public.key`, "utf8");
const private_key = fs.readFileSync(
  `${__dirname}/../secret/private.key`,
  "utf8"
);

// JWTのペイロードの型定義
type Payload = {
  uuid: string;
};

export const isLoginUser = rule({ cache: "contextual" })(
  async (_parent, _args, context: Context) => {
    // Authorizationヘッダーからトークンを取得

    // authヘッダを格納する変数の初期化
    let auth = "";

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
  }
);
