import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { schema } from "./schema";
import { PrismaClient } from "@prisma/client";

// graphql-yogaのcreateYoga関数を利用してyogaサーバーを作成
const yoga = createYoga({
  // エンドポイントは/api/graphqlに指定
  graphqlEndpoint: "/api/",
  // スキーマを設定
  schema,
  // 利用するコンテキストを設定
  context: {
    prisma: new PrismaClient(),
  },
});

// yogaサーバーをnodeのhttpサーバーとして起動
const server = createServer(yoga);

server.listen(4000, () => {
  console.log(`
  🚀 Server ready at: http://localhost:4000`);
});
