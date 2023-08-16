// node:httpサーバ
import { createServer } from "node:http";
// graphql-yogaサーバ
import { createYoga } from "graphql-yoga";

// Prismaのクライアント
import { PrismaClient } from "@prisma/client";
// 開発環境でのJWT検証のモックプラグイン
import { useAuthMock } from "./lib/plugins/useAuthMock";
// 本番環境でJWTの検証等を行うプラグイン
import { useAuth0 } from "@envelop/auth0";
// 認可処理を行うプラグイン
import { useGenericAuth } from "@envelop/generic-auth";
// graphqlのインタロスペクションを無効化するプラグイン
import { useDisableIntrospection } from "@envelop/disable-introspection";

// graphqlスキーマ
import { schema } from "./schema";
// graphql-armorのプラグイン
import { Armor } from "./security/armor";
// 認証プラグインのオプション
import { AuthMockOption, AuthnOption } from "./security/authn";
// 認可プラグインのオプション
import { authzOption } from "./security/authz";
// 開発環境かどうかを判断する変数
import { is_dev } from "./env";
import { useWebHook } from "./webhook";
import { useGraphQlJit } from "@envelop/graphql-jit";

// graphql-armorのプラグインを取得
const enhancements = Armor.protect();

// Prismaクライアントを作成
const prisma = new PrismaClient();

// graphql-yogaのcreateYoga関数を利用してyogaサーバーを作成
const yoga = createYoga({
  // エンドポイントは/api/graphqlに指定
  graphqlEndpoint: "/api/graphql",
  // スキーマを設定
  schema,
  // 利用するコンテキストを設定
  context: {
    prisma,
  },
  // 開発環境の場合はplaygroundを有効化
  graphiql: is_dev,
  // 開発環境のときはCORSをすべて許可
  // そうでないときはすべて拒否
  cors: is_dev
    ? {
        origin: "*",
      }
    : false,
  plugins: [
    // もし開発環境でなければ、webhookの検証を行う
    ...(is_dev ? [] : [useWebHook(prisma)]),
    // もし開発環境でなければ、introspectionを無効化
    ...(is_dev ? [] : [useDisableIntrospection()]),
    // もし開発環境でなければ、graphql-armorを有効化
    ...(is_dev ? [] : [...enhancements.plugins]),
    // 開発環境であるならば、useAuthMockを利用
    // そうでなければ、useAuth0を利用
    is_dev ? useAuthMock(AuthMockOption) : useAuth0(AuthnOption),
    // 一般的な認可処理のプラグインを追加
    useGenericAuth(authzOption),
    // JITプラグインを利用
    useGraphQlJit(),
  ],
});

// yogaサーバーをnodeのhttpサーバーとして起動
const server = createServer(yoga);

server.listen(6173, () => {
  console.log("🚀 Server is running");
});

// SIGTERMを受け取ったら、プロセスを終了
process.on("SIGTERM", async () => {
  console.log("✅ SIGTERM signal received: closing HTTP server");
  await server.close();

  try {
    console.log("🔥 Closing database connection");
    await prisma.$disconnect();
  } catch (error) {
    console.log("❌ Error closing database connection: ", error);
  }
  console.log("👋 Process terminated");
});
