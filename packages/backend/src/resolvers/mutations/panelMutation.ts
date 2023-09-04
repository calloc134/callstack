import { PrismaClient } from "@prisma/client";
// import { GraphQLErrorWithCode } from "src/lib/error/error";
import { MutationResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";
import { GraphQLErrorWithCode } from "src/lib/error/error";
import { Client } from "minio";
import { v4 as uuidv4 } from "uuid";
import { minio_bucket } from "src/env";

// prismaのupdateは、undefinedな値を渡すと、そのフィールドを更新しないことに留意する
const PanelMutationResolver: MutationResolvers<GraphQLContext> = {
  // createPresignedURLForUploadImageフィールドのリゾルバー
  createPresignedURLForUploadImage: async (_parent, args, context) => {
    const safe = withErrorHandling(async (minio: Client, filename: string) => {
      // uuidを生成
      const uuid = uuidv4();

      // ファイル名の拡張子を取得
      const ext = filename.split(".").pop();

      // ファイル名を生成
      const filename_with_ext = `${uuid}.${ext}`;

      // プリサインドURLを作成
      const result = await minio.presignedPutObject(minio_bucket, filename_with_ext, 60 * 60 * 24);

      // プリサインドURLを返す
      return result;
    });

    // 引数からファイル名を取得
    const { filename } = args;

    // コンテキストからminioクライアントを取得
    const { minio } = context;

    return await safe(minio, filename);
  },

  // updateUserForAdminフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  updateUserForAdmin: async (_parent, args, context) => {
    const safe = withErrorHandling(
      async (user_uuid: string, prisma: PrismaClient, { bio, handle, screen_name }: { bio?: string; handle?: string; screen_name?: string }) => {
        // UUIDからユーザーを取得
        const result = await prisma.user.update({
          where: {
            user_uuid: user_uuid,
          },
          data: {
            bio: bio,
            handle: handle,
            screen_name: screen_name,
          },
        });
        return result;
      }
    );

    // 引数からユーザーのUUIDとミューテーションの引数を取得
    const { user_uuid, bio: maybeBio, handle: maybeHandle, screen_name: maybeScreenName } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    const bio = maybeBio ?? undefined;
    const handle = maybeHandle ?? undefined;
    const screen_name = maybeScreenName ?? undefined;

    return await safe(user_uuid, prisma, { bio, handle, screen_name });
  },

  // deleteUserForAdminフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  deleteUserForAdmin: async (_parent, args, context) => {
    const safe = withErrorHandling(async (user_uuid: string, prisma: PrismaClient) => {
      // UUIDからユーザーを取得
      const result = await prisma.user.delete({
        where: {
          user_uuid: user_uuid,
        },
      });
      return result;
    });

    // 引数からユーザーのUUIDを取得
    const { user_uuid } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma } = context;

    return await safe(user_uuid, prisma);
  },

  // updateMyUserフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  updateMyUser: async (_parent, args, context) => {
    const safe = withErrorHandling(
      async (currentUser_uuid: string, prisma: PrismaClient, { bio, handle, screen_name }: { bio?: string; handle?: string; screen_name?: string }) => {
        // UUIDからユーザーを取得
        const result = await prisma.user.update({
          where: {
            user_uuid: currentUser_uuid,
          },
          data: {
            bio: bio,
            handle: handle,
            screen_name: screen_name,
          },
        });
        return result;
      }
    );

    // 引数からミューテーションの引数を取得
    const { bio: maybeBio, handle: maybeHandle, screen_name: maybeScreenName } = args.input;

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    const bio = maybeBio ?? undefined;
    const handle = maybeHandle ?? undefined;
    const screen_name = maybeScreenName ?? undefined;

    return await safe(currentUser.user_uuid, prisma, { bio, handle, screen_name });
  },

  // deleteMyUserフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  deleteMyUser: async (_parent, _args, context) => {
    const safe = withErrorHandling(async (currentUser_uuid: string, prisma: PrismaClient) => {
      // UUIDからユーザーを取得
      const result = await prisma.user.delete({
        where: {
          user_uuid: currentUser_uuid,
        },
      });
      return result;
    });

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safe(currentUser.user_uuid, prisma);
  },

  // createPostフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  createPost: async (_parent, _, context) => {
    const safe = withErrorHandling(async (currentUser_uuid: string, prisma: PrismaClient) => {
      // UUIDからユーザーを取得
      const result = await prisma.post.create({
        data: {
          title: "下書き",
          body: "",
          userUuid: currentUser_uuid,
        },
      });
      return result;
    });

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    return await safe(currentUser.user_uuid, prisma);
  },

  // updatePostフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  updatePost: async (_parent, args, context) => {
    const safe = withErrorHandling(
      async (currentUser_uuid: string, prisma: PrismaClient, post_uuid: string, { title, body }: { title?: string; body?: string }) => {
        // UUIDからユーザーを取得
        const result = await prisma.post.update({
          where: {
            userUuid: currentUser_uuid,
            post_uuid: post_uuid,
          },
          data: {
            title: title,
            body: body,
          },
        });

        // もし削除した投稿が存在しなかった場合はエラーを投げる
        if (!result) {
          throw new GraphQLErrorWithCode("item_not_owned");
        }

        return result;
      }
    );

    // 引数からユーザーのUUIDとミューテーションの引数を取得
    const {
      post_uuid,
      input: { title: maybeTitle, body: maybeBody },
    } = args;

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { prisma, currentUser } = context;

    const title = maybeTitle ?? undefined;
    const body = maybeBody ?? undefined;

    return await safe(currentUser.user_uuid, prisma, post_uuid, { title, body });
  },

  // deletePostフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  deletePost: async (_parent, args, context) => {
    const safe = withErrorHandling(async (currentUser_uuid: string, prisma: PrismaClient, post_uuid: string) => {
      // UUIDからユーザーを取得
      const result = await prisma.post.delete({
        where: {
          userUuid: currentUser_uuid,
          post_uuid: post_uuid,
        },
      });

      // もし削除した投稿が存在しなかった場合はエラーを投げる
      if (!result) {
        throw new GraphQLErrorWithCode("item_not_owned");
      }

      return result;
    });

    // 引数からユーザーのUUIDを取得
    const { post_uuid } = args;
    // コンテキストからPrismaクライアントを取得
    const { prisma, currentUser } = context;

    return await safe(currentUser.user_uuid, prisma, post_uuid);
  },
};

export { PanelMutationResolver };
