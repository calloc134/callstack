import { PrismaClient } from "@prisma/client";
import { PostResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";

const PostTypeResolver: PostResolvers<GraphQLContext> = {
  // ユーザーフィールドのリゾルバー
  // @ts-expect-error 返却されるpostにuserフィールドが存在しないためエラーが出るが、実際には存在するので無視
  user: async (parent, _args, context) => {
    const safe = withErrorHandling(async (post_uuid: string, prisma: PrismaClient) => {
      // UUIDから投稿を取得
      const result = await prisma.post
        .findUniqueOrThrow({
          where: {
            post_uuid: post_uuid,
          },
        })
        // そこから投稿者を取得
        .user();
      return result;
    });

    // ペアレントオブジェクトから投稿のUUIDを取得
    const { post_uuid } = parent;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safe(post_uuid, prisma);
  },
};

export { PostTypeResolver };
