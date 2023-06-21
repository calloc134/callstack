# turboPNPMtest

このプロジェクトは、pnpmとturboを使って、モノリポ構成でWebアプリケーションを開発するためのテストプロジェクトです。  

## モノリポ構成とは
モノリポ構成とは、複数のプロジェクトを一つのリポジトリで管理する構成のことです。  

## 全体構成

このリポジトリは、バックエンドをgraphqlで、フロントエンドをreactで実装したWebアプリケーションをモノリポ構成で管理しています。  

## 技術スタック

### バックエンド

 - graphql-yoga  
graphqlサーバの立ち上げに使用しています。
 - tsx
ビルドツールとして利用しています
 - prisma  
データベースへのアクセスに使用しています。
 - grpahql-scalars  
日付型やJSON型などのスカラー型をgraphql-yogaへ追加するために使用しています。
 - graphql-codegen  
graphqlスキーマから、resolverや型定義を生成するために使用しています。
 - graphql-shield  
認可処理や権限管理に使用しています。
 - jsonwebtoken  
JWT認証処理に利用しています。

### フロントエンド
 - react  
フロントエンドのフレームワークとして使用しています。
 - vite  
ビルドツールとして使用しています。
 - react-router  
ルーティング処理に使用しています。  
@tanstack/react-routerへの移行も少し考えています。
 - radix-ui/primitives  
プリミティブコンポーネントライブラリとして使用しています。
 - radix-ui/colors  
色の定義に使用しています。
 - tailwindcss  
CSSフレームワークとして使用しています。
 - shadcn/ui  
tailwindcssのコンポーネントライブラリとして使用しています。
 - storybook  
コンポーネントの管理に使用しています。
 - urql  
graphqlクライアントとして使用しています。
 - graphql-codegen  
graphqlスキーマから、型定義を生成するために使用しています。


## 今後の予定

- [ ] 
- [ ] 開発環境のコンテナ化
- [ ] インフラ環境のコード化 (dockercompose, terraform)
- [ ] ホットリロードの実装


(開発中)
