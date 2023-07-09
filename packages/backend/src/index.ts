import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { schema } from "./schema";
import { PrismaClient } from "@prisma/client";
import { useDisableIntrospection } from "@envelop/disable-introspection";
import { armor } from "./armor";

// 環境変数を取得し、開発環境かどうかを判定
const isDev = process.env.NODE_ENV === "development";

// graphql-armorのプラグインを取得
const enhancements = armor.protect();

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
  graphiql: isDev,
  // 開発環境のときはCORSをすべて許可
  // そうでないときはすべて拒否
  cors: isDev
    ? {
        origin: "*",
      }
    : false,
  plugins: [
    // もし開発環境でなければ、introspectionを無効化
    ...(isDev ? [] : [useDisableIntrospection()]),
    // もし開発環境でなければ、graphql-armorを有効化
    ...(isDev ? [] : [...enhancements.plugins]),
  ],
});

// yogaサーバーをnodeのhttpサーバーとして起動
const server = createServer(yoga);

server.listen(4000, () => {
  console.log(`
  🚀 Server ready at: http://localhost:4000`);
});

// SIGTERMを受け取ったら、プロセスを終了
process.on("SIGTERM", async () => {
  console.log("✅ SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });

  try {
    console.log("🔥 Closing database connection");
    await prisma.$disconnect();
  } catch (error) {
    console.log("❌ Error closing database connection: ", error);
  }
  console.log("👋 Process terminated");
});
