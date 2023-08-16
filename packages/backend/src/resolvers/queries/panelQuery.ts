import { PrismaClient } from "@prisma/client";
import { GraphQLErrorWithCode } from "src/lib/error/error";
import { QueryResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";

const PanelQueryResolver: QueryResolvers<GraphQLContext> = {
  // userクエリのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  getUserByUUID: async (_parent, args, context) => {
    const safeUser = withErrorHandling(async (prisma: PrismaClient, user_uuid: string) => {
      // UUIDからユーザーを取得
      const result = await prisma.user.findUniqueOrThrow({
        where: {
          user_uuid: user_uuid,
        },
      });
      return result;
    });

    // 引数からユーザーのUUIDを取得
    const { uuid: user_uuid } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safeUser(prisma, user_uuid);
  },

  // usersクエリのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  getAllUsers: async (_parent, args, context) => {
    const safeUsers = withErrorHandling(async (prisma: PrismaClient, { offset, limit }: { offset: number; limit: number }) => {
      // ユーザーを全件取得
      const result = await prisma.user.findMany({
        skip: offset,
        take: limit,
        // ユーザを新しい順に並び替える
        orderBy: {
          created_at: "desc",
        },
      });
      return result;
    });

    // 引数からページネーションのoffsetとlimitを取得
    const { offset, limit } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safeUsers(prisma, { limit, offset });
  },

  // postクエリのリゾルバー
  // @ts-expect-error userフィールドが存在しないためエラーが出るが、実際には存在するので無視
  getPostByUUID: async (_parent, args, context) => {
    const safePost = withErrorHandling(async (post_uuid: string, prisma: PrismaClient) => {
      // UUIDから投稿を取得
      const result = await prisma.post.findUniqueOrThrow({
        where: {
          post_uuid: post_uuid,
        },
      });
      return result;
    });

    // 引数から投稿のUUIDを取得
    const { uuid: post_uuid } = args;
    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    const result = await safePost(post_uuid, prisma);

    // もし投稿者が自分でない かつ 投稿が非公開の場合はエラーを返す
    // TODO: 投稿が非公開の処理を追加
    if (result.userUuid !== currentUser.user_uuid) {
      throw new GraphQLErrorWithCode("item_not_owned");
    }

    return result;
  },

  // postsクエリのリゾルバー
  // @ts-expect-error userフィールドが存在しないためエラーが出るが、実際には存在するので無視
  getAllPosts: async (_parent, args, context) => {
    const safePosts = withErrorHandling(async (currentUser_uuid: string, prisma: PrismaClient, { offset, limit }: { offset: number; limit: number }) => {
      const result = await prisma.post.findMany({
        // 投稿が自分でない かつ 非公開のものは除外する
        // つまり、投稿が自分 または 公開のもののみ取得する
        where: {
          OR: [
            {
              userUuid: currentUser_uuid,
            },
            {
              is_public: true,
            },
          ],
        },
        skip: offset,
        take: limit,
        // 投稿を新しい順に並び替える
        orderBy: {
          created_at: "desc",
        },
      });
      return result;
    });

    // 引数からページネーションのoffsetとlimitを取得
    const { offset, limit } = args;

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safePosts(currentUser.user_uuid, prisma, { limit, offset });
  },
};

export { PanelQueryResolver };
