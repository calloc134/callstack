import { PrismaClient } from "@prisma/client";
// import { GraphQLErrorWithCode } from "src/lib/error/error";
import { MutationResolvers } from "src/lib/generated/resolver-types";
import { GraphQLContext } from "src/context";
import { withErrorHandling } from "src/lib/error/handling";
import { GraphQLErrorWithCode } from "src/lib/error/error";
import { Client } from "minio";
import { v4 as uuidv4 } from "uuid";
import { minio_bucket, minio_endpoint } from "src/env";
import Jimp = require("jimp");

// prismaのupdateは、undefinedな値を渡すと、そのフィールドを更新しないことに留意する
const PanelMutationResolver: MutationResolvers<GraphQLContext> = {
  // createPresignedURLForUploadImageフィールドのリゾルバー
  // @ts-expect-error postsフィールドが存在しないためエラーが出るが、実際には存在するので無視
  uploadProfileImage: async (_parent, args, context) => {
    const safe = withErrorHandling(async (currentUser_uuid: string, prisma: PrismaClient, minioClient: Client, file: File) => {
      // ファイルのアレイバッファを取得
      const fileArrayBuffer = await file.arrayBuffer();

      // 画像をjimpで開く
      const image = await Jimp.read(Buffer.from(fileArrayBuffer));

      // 画像のサイズを変更
      image.cover(200, 200);

      // uuid v4を生成
      const filename = `${uuidv4()}.png`;

      // ファイルをアップロード
      await minioClient.putObject(minio_bucket, filename, await image.getBufferAsync(Jimp.MIME_PNG));

      // ファイルのURLを生成
      const url = minio_endpoint + "/" + minio_bucket + "/" + filename;

      // ユーザーのプロフィール画像を更新
      const result = await prisma.user.update({
        where: {
          user_uuid: currentUser_uuid,
        },
        data: {
          image_url: url,
        },
      });

      return result;
    });

    // コンテキストからPrismaクライアントと現在ログインしているユーザーのデータを取得
    const { currentUser, prisma, minio: minioClient } = context;

    return await safe(currentUser.user_uuid, prisma, minioClient, args.file);
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
