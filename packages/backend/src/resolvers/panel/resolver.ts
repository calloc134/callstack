import { PrismaClient } from "@prisma/client";
import { GraphQLContext } from "src/context";
import { QueryResolvers, UserResolvers, PostResolvers } from "src/lib/generated/resolver-types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GraphQLErrorWithCode } from "../../error";

type AsyncFunction<T extends unknown[], R> = (...args: T) => Promise<R>;

// 例外ハンドリングを行うための関数
// 高階関数を引数に取る
const withErrorHandling =
  <T extends unknown[], R>(func: AsyncFunction<T, R>): AsyncFunction<T, R> =>
  async (...args: T): Promise<R> => {
    try {
      return await func(...args);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          // ユーザーが見つからない場合
          case "P2003":
            throw new GraphQLErrorWithCode("item_not_found");
          default:
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
      const result = await prisma.user.findUniqueOrThrow({
        where: {
          user_uuid: user_uuid,
        },
      });
      return result;
    });

    const { uuid: user_uuid } = args;
    const { prisma } = context;

    return await safeUser(user_uuid, prisma);
  },
};

const User: UserResolvers<GraphQLContext> = {
  // 投稿フィールドのリゾルバー
  // @ts-expect-error 返却されるuserにpostsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  posts: async (parent, _args, context) => {
    const safePosts = withErrorHandling(async (user_uuid: string, prisma: PrismaClient) => {
      const result = await prisma.user
        .findUniqueOrThrow({
          where: {
            user_uuid: user_uuid,
          },
        })
        .posts();
      return result;
    });

    const { user_uuid } = parent;
    const { prisma } = context;

    return await safePosts(user_uuid, prisma);
  },
};

const Post: PostResolvers<GraphQLContext> = {
  // ユーザーフィールドのリゾルバー
  // @ts-expect-error 返却されるpostにuserフィールドが存在しないためエラーが出るが、実際には存在するので無視
  user: async (parent, _args, context) => {
    const safeUser = withErrorHandling(async (post_uuid: string, prisma: PrismaClient) => {
      const result = await prisma.post
        .findUniqueOrThrow({
          where: {
            post_uuid: post_uuid,
          },
        })
        .user();
      return result;
    });

    const { post_uuid } = parent;
    const { prisma } = context;

    return await safeUser(post_uuid, prisma);
  },
};

export const PanelType = {
  User,
  Post,
};
