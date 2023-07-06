import { PrismaClient } from "@prisma/client";
import { IncomingMessage } from "node:http";

// コンテキストの型定義
export type GraphQLContext = {
  // Prismaクライアントの型定義
  prisma: PrismaClient;
  // リクエストの型定義
  req: IncomingMessage;
};
