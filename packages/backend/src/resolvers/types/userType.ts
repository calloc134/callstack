import { PrismaClient } from "@prisma/client";
import { UserResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";

const UserTypeResolver: UserResolvers<GraphQLContext> = {
  // 投稿フィールドのリゾルバー
  // @ts-expect-error 返却されるuserにpostsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  posts: async (parent, args, context) => {
    const safePosts = withErrorHandling(
      async (current_user_uuid: string, user_uuid: string, prisma: PrismaClient, { offset, limit }: { offset: number; limit: number }) => {
        // UUIDからユーザーを取得
        const result = await prisma.user
          .findUniqueOrThrow({
            where: {
              user_uuid: user_uuid,
            },
          })
          // そこから投稿を取得
          .posts({
            where: {
              // 投稿者が自分でない かつ 非公開のものは除外する
              // つまり、投稿が自分 または 公開のもののみ取得する
              OR: [
                {
                  userUuid: current_user_uuid,
                },
                {
                  is_public: true,
                },
              ],
            },
            skip: offset,
            take: limit,
          });
        return result;
      }
    );

    // ペアレントオブジェクトから現在ログインしているユーザーのデータを取得
    const { user_uuid } = parent;
    // 引数からページネーションのoffsetとlimitを取得
    const { offset, limit } = args;
    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safePosts(currentUser.user_uuid, user_uuid, prisma, { limit, offset });
  },
};

export { UserTypeResolver };
