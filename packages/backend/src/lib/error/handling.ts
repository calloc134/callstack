import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { GraphQLErrorWithCode } from "src/lib/error/error";

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
          // アイテムが見つからない場合
          case "P2025":
            throw new GraphQLErrorWithCode("item_not_found");
          // アイテムが存在している場合
          case "P2002":
            throw new GraphQLErrorWithCode("item_already_exists");
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

export { withErrorHandling };
