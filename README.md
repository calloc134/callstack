# turboPNPMtest

このプロジェクトは、pnpm と turbo を使って、モノリポ構成で Web アプリケーションを開発するためのテストプロジェクトです。

## モノリポ構成とは

モノリポ構成とは、複数のプロジェクトを一つのリポジトリで管理する構成のことです。

## 全体構成

このリポジトリは、バックエンドを graphql で、フロントエンドを react で実装した Web アプリケーションをモノリポ構成で管理しています。

## 技術スタック

### バックエンド

- graphql-yoga  
  graphql サーバの立ち上げに使用しています。
- tsx  
  ビルドツールとして利用しています。
- prisma  
  データベースへのアクセスに使用しています。
- grpahql-scalars  
  日付型や JSON 型などのスカラー型を graphql-yoga へ追加するために使用しています。
- graphql-codegen  
  graphql スキーマから、resolver や型定義を生成するために使用しています。
- graphql-shield  
  認可処理や権限管理に使用しています。
- jsonwebtoken  
  JWT 認証処理に利用しています。

### フロントエンド

- react  
  フロントエンドのフレームワークとして使用しています。
- vite  
  ビルドツールとして使用しています。
- react-router  
  ルーティング処理に使用しています。  
  @tanstack/react-router への移行も少し考えています。
- radix-ui/primitives  
  プリミティブコンポーネントライブラリとして使用しています。
- radix-ui/colors  
  色の定義に使用しています。
- tailwindcss  
  CSS フレームワークとして使用しています。
- shadcn/ui  
  tailwindcss のコンポーネントライブラリとして使用しています。
- storybook  
  コンポーネントの管理に使用しています。
- urql  
  graphql クライアントとして使用しています。
- graphql-codegen  
  graphql スキーマから、型定義を生成するために使用しています。

## 開発環境整備

- eslint  
  コードの静的解析に使用しています。
- prettier  
  コードのフォーマットに使用しています。
- husky  
  git のフックに使用しています。
- lint-staged  
  ステージングされたファイルに対して、コードの静的解析やフォーマットを行うために使用しています。
- commitlint  
  コミットメッセージのフォーマットをチェックするために使用しています。
- changesets  
  バージョン管理とリリース管理に使用しています。

## 今後の予定

- [ ] バックエンドの実装
- [ ] フロントエンドの実装
- [ ] テストコードの実装
- [ ] ホットリロードの実装
- [ ] 開発環境のコンテナ化
- [ ] インフラ環境のコード化 (dockercompose, terraform)

(開発中)
