import { PrismaClient } from "@prisma/client";
import { Client } from "minio";
import { UserPayload } from "@envelop/auth0";
import { IncomingMessage } from "http";
import { User } from "@prisma/client";

// コンテキストの型定義
export type GraphQLContext = {
  // Prismaクライアントの型定義
  prisma: PrismaClient;
  // minioクライアントの型定義
  minio: Client;
  // JWTのペイロードの型定義
  logto?: UserPayload;
  // リクエストの型定義
  req: IncomingMessage;
  // 現在ログインしているユーザーのUUID
  currentUser: User;
};
