import { PrismaClient } from "@prisma/client";
import { GraphQLContext } from "src/context";
import { QueryResolvers, UserResolvers, PostResolvers } from "src/lib/generated/resolver-types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { GraphQLErrorWithCode } from "src/error";

type AsyncFunction<T extends unknown[], R> = (...args: T) => Promise<R>;

// 例外ハンドリングを行うための関数
// 高階関数を引数に取る
const withErrorHandling =
  <T extends unknown[], R>(func: AsyncFunction<T, R>): AsyncFunction<T, R> =>
  async (...args: T): Promise<R> => {
    // ここで与えられた高階関数を実行する
    try {
      return await func(...args);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          // ユーザーが見つからない場合
          case "P2025":
            throw new GraphQLErrorWithCode("item_not_found");
          // ここにエラーの種類を追加していく
          // その他のエラー
          default:
            console.error(error);
            throw new GraphQLErrorWithCode("unknown_error", error.message);
        }
      } else if (error instanceof Error) {
        throw new GraphQLErrorWithCode("unknown_error", error.message);
      } else {
        throw new GraphQLErrorWithCode("unknown_error");
      }
    }
  };

// クエリのリゾルバーを定義
export const PanelQuery: QueryResolvers<GraphQLContext> = {
  // userクエリのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  user: async (_parent, args, context) => {
    const safeUser = withErrorHandling(async (user_uuid: string, prisma: PrismaClient) => {
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

    return await safeUser(user_uuid, prisma);
  },

  // usersクエリのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  users: async (_parent, _args, context) => {
    const safeUsers = withErrorHandling(async (prisma: PrismaClient) => {
      // ユーザーを全件取得
      const result = await prisma.user.findMany();
      return result;
    });

    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safeUsers(prisma);
  },

  // postクエリのリゾルバー
  // @ts-expect-error userフィールドが存在しないためエラーが出るが、実際には存在するので無視
  post: async (_parent, args, context) => {
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
  posts: async (_parent, _args, context) => {
    const safePosts = withErrorHandling(async (user_uuid: string, prisma: PrismaClient) => {
      const result = await prisma.post.findMany({
        // 投稿が自分でない かつ 非公開のものは除外する
        // つまり、投稿が自分 または 公開のもののみ取得する
        where: {
          OR: [
            {
              userUuid: context.currentUser.user_uuid,
            },
            {
              is_public: true,
            },
          ],
        },
      });
      return result;
    });

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safePosts(currentUser.user_uuid, prisma);
  },
};

const User: UserResolvers<GraphQLContext> = {
  // 投稿フィールドのリゾルバー
  // @ts-expect-error 返却されるuserにpostsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  posts: async (parent, _args, context) => {
    const safePosts = withErrorHandling(async (current_user_uuid: string, user_uuid: string, prisma: PrismaClient) => {
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
        });
      return result;
    });

    // ペアレントオブジェクトから現在ログインしているユーザーのデータを取得
    const { user_uuid } = parent;
    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safePosts(currentUser.user_uuid, user_uuid, prisma);
  },
};

const Post: PostResolvers<GraphQLContext> = {
  // ユーザーフィールドのリゾルバー
  // @ts-expect-error 返却されるpostにuserフィールドが存在しないためエラーが出るが、実際には存在するので無視
  user: async (parent, _args, context) => {
    const safeUser = withErrorHandling(async (post_uuid: string, prisma: PrismaClient) => {
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

    return await safeUser(post_uuid, prisma);
  },
};

export const PanelType = {
  User,
  Post,
};
