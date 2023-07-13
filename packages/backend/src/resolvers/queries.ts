import { GraphQLContext } from "src/context";
import { QueryResolvers } from "src/lib/generated/resolver-types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GraphQLErrorWithCode } from "../error";

// クエリのリゾルバーを定義
export const Query: QueryResolvers<GraphQLContext> = {
  // userクエリのリゾルバー
  user: async (_parent, args, context) => {
    // 呼び出し引数よりuuidを取得
    const { uuid: user_uuid } = args;

    // Prismaからuuidに相当するユーザーを取得
    try {
      const result = await context.prisma.user.findUniqueOrThrow({
        where: {
          uuid: user_uuid,
        },
        // ユーザーのプロフィール情報も取得
        include: {
          profile: true,
        },
      });

      // 結果を返す
      return result;
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
  },
};
