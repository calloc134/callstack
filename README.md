<h1 align="center">callstack</h1>
<p align="center">
  <img src="./callstack.png" alt="callstack" width="300" />
</p>

<h2 align="center"> pnpm + turborepoで構成されたモノリポ構成のボイラープレート </h2>

<p align="center">
   <img src="https://img.shields.io/github/stars/calloc134/callstack?style=flat-square" alt="GitHub stars" />
    <img src="https://img.shields.io/github/forks/calloc134/callstack?style=flat-square" alt="GitHub forks" />
    <img src="https://img.shields.io/github/issues/calloc134/callstack?style=flat-square" alt="GitHub issues" />
    <img src="https://img.shields.io/github/license/calloc134/callstack?style=flat-square" alt="GitHub license" />
    <img src="https://img.shields.io/github/last-commit/calloc134/callstack?style=flat-square" alt="GitHub commit" />
    <img src="https://img.shields.io/github/languages/code-size/calloc134/callstack?style=flat-square" alt="GitHub code size in bytes" />
    <img src="https://img.shields.io/github/repo-size/calloc134/callstack?style=flat-square" alt="GitHub repo size" />

## コンテンツ内容

- 📋 [概要](#概要)
- ℹ️ [モノリポ構成とは](#モノリポ構成とは)
- 🔧 [全体構成](#全体構成)
- 🔧 [技術スタック](#技術スタック)
  - 💻 [バックエンド](#バックエンド)
  - 🌐 [フロントエンド](#フロントエンド)
  - ⚙️ [開発環境整備](#開発環境整備)
  - 🐳 [インフラ環境(開発環境)](#インフラ環境開発環境)
  - 🐳 [インフラ環境(本番環境)](#インフラ環境本番環境)
  - 🚀 [CI/CD 環境](#cicd-環境)
- 📂 [ディレクトリ構成](#ディレクトリ構成)
- 💻 [起動方法](#起動方法)
  - 💻 [開発環境の起動方法](#開発環境の起動方法)
  - 💻 [本番環境の起動方法](#本番環境の起動方法)
- 📅 [今後の予定](#今後の予定)
- 📜 [ライセンス](#ライセンス)

# 概要

このプロジェクトは、pnpm と turbo を用いて構成されたボイラープレートです。  
現在開発途上です。

### モノリポ構成とは

モノリポ構成とは、複数のプロジェクトを一つのリポジトリで管理する構成のことです。

## 全体構成

このリポジトリは、バックエンドを graphql で、フロントエンドを react で実装した Web アプリケーションをモノリポ構成で管理しています。

## 技術スタック

### バックエンド

- graphql-yoga  
  graphql サーバの立ち上げに使用しています。
- tsx  
  開発環境のビルドツールとして利用しています。
- swc
  本番環境のビルドツールとして利用しています。
- prisma  
  データベースへのアクセスに使用しています。
- grpahql-scalars  
  日付型や JSON 型などのスカラー型を graphql-yoga へ追加するために使用しています。
- graphql-codegen  
  graphql スキーマから、resolver や型定義を生成するために使用しています。
- @envelop/useAuth0  
  後述する Logto との連携に使用しています。
- @envelop/useGenericAuth  
  認可処理や権限管理に使用しています。  
  これを用いて graphql の@auth ディレクティブを実装しています。
- graphql-armor  
  様々なセキュリティ対策に使用しています。
- @envelop/disable-introspection  
  GraphQL のイントロスペクションを無効化するために使用しています。
- jsonwebtoken  
  JWT 認証処理に利用しています。
- jimp
  画像のリサイズ処理に使用しています。
- minio-js  
  後述する minio にリサイズ画像をアップロードするために使用しています。

### フロントエンド

- react  
  フロントエンドのフレームワークとして使用しています。
- vite  
  ビルドツールとして使用しています。
- @tanstack/react-router
  ルーティングに使用しています。
- nextui  
  tailwind 対応のコンポーネントライブラリとして使用しています。
- tailwindcss  
  CSS フレームワークとして使用しています。
- storybook  
  コンポーネントの管理に使用しています。
- urql  
  graphql クライアントとして使用しています。
- @urql/exchange-auth
  後述する Logto との認証連携に使用しています。
- graphql-codegen  
  graphql スキーマから、型定義を生成するために使用しています。
- logto-js
  後述する Logto を用いた認証処理に使用しています。

### 開発環境整備

- pnpm  
  パッケージマネージャとして使用しています。
- turborepo  
  モノリポ構成の管理に使用しています。
- prettier  
  コードのフォーマットに使用しています。
- husky  
  git のフックに使用しています。
- commitlint  
  コミットメッセージのフォーマットをチェックするために使用しています。
- changesets  
  バージョン管理とリリース管理に使用しています。

### インフラ環境(開発環境)

- devcontainer  
  開発環境の立ち上げに使用しています。
  ベースとなるアプリケーションコンテナに加えて、PostgreSQL のデータベースコンテナを立ち上げています。

### インフラ環境(本番環境)

- docker compose  
  本番環境の立ち上げに使用しています。  
  利用するコンテナは PostgreSQL のデータベースコンテナに加え、フロントとバックのコンテナとリバースプロキシとなる nginx コンテナです。
- nginx  
  フロントエンドの HTML ファイルの配信を行っています。  
  nginx のコンテナ内でフロントエンドのビルドを行い、そのビルド済みのファイルを配信しています。
- traefik
  リバースプロキシとして使用しています。

### CI/CD 環境

- Github Actions  
  ここで、型チェックを行っています。  
  現時点では型チェックのみですが、今後はテストコードの実行も行う予定です。

## ライセンス

MIT License

Copyright (c) 2023 calloc134
