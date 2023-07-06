import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { schema } from "./schema";
import { PrismaClient } from "@prisma/client";
import { plugins } from "@swc/core";
import { useDisableIntrospection } from "@envelop/disable-introspection";

// 環境変数を取得し、開発環境かどうかを判定
const isDev = process.env.NODE_ENV === "development";

console.debug("process.env.NODE_ENV", process.env.NODE_ENV);

// graphql-yogaのcreateYoga関数を利用してyogaサーバーを作成
const yoga = createYoga({
  // エンドポイントは/api/graphqlに指定
  graphqlEndpoint: "/api/graphql",
  // スキーマを設定
  schema,
  // 利用するコンテキストを設定
  context: {
    prisma: new PrismaClient(),
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
    // もし開発環境の場合は、useDisableIntrospectionを利用してintrospectionを無効化
    ...(isDev ? [useDisableIntrospection()] : []),
  ],
});

// yogaサーバーをnodeのhttpサーバーとして起動
const server = createServer(yoga);

server.listen(4000, () => {
  console.log(`
  🚀 Server ready at: http://localhost:4000`);
});
