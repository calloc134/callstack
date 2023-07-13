import { createSchema } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { resolvers } from "./resolver";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { schema_path } from "./env";

// graphql-yogaのcreateSchema関数を利用してスキーマを作成
export const schema = createSchema({
  // 型定義
  typeDefs: [
    // スカラー型の定義をマージ
    ...scalarTypeDefs,
    // ファイルからスキーマを読み込み
    loadFilesSync(schema_path),
  ],
  // リゾルバー
  resolvers,
});
