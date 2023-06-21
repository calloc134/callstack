import { createSchema } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { resolvers } from "./resolver";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./permission";

// graphql-shieldを利用するため、schemaにmiddlewareを適用
export const schema = applyMiddleware(
  // graphql-yogaのcreateSchema関数を利用してスキーマを作成
  createSchema({
    // 型定義
    typeDefs: [
      // スカラー型の定義をマージ
      ...scalarTypeDefs,
      // ファイルからスキーマを読み込み
      loadFilesSync(`${__dirname}/../../schema.graphql`),
    ],
    // リゾルバー
    resolvers,
  }),
  // graphql-shieldのパーミッションオブジェクト
  permissions
);
