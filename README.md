<p align="center">
  <img src="./callstack.png" alt="callstack" width="300" />
</p>

<h1 align="center">callstack - pnpm/turborepoで構成されたボイラープレート</h1>

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
  ビルドツールとして利用しています。
- prisma  
  データベースへのアクセスに使用しています。
- grpahql-scalars  
  日付型や JSON 型などのスカラー型を graphql-yoga へ追加するために使用しています。
- graphql-codegen  
  graphql スキーマから、resolver や型定義を生成するために使用しています。
- graphql-shield  
  認可処理や権限管理に使用しています。
- graphql-armor  
  様々なセキュリティ対策に使用しています。
- @envelop/disable-introspection  
  GraphQL のイントロスペクションを無効化するために使用しています。
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

### 開発環境整備

- pnpm  
  パッケージマネージャとして使用しています。
- turborepo  
  モノリポ構成の管理に使用しています。
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

### インフラ環境(開発環境)

- devcontainer  
  開発環境の立ち上げに使用しています。
  ベースとなるアプリケーションコンテナに加えて、PostgreSQL のデータベースコンテナを立ち上げています。

### インフラ環境(本番環境)

- docker compose  
  本番環境の立ち上げに使用しています。  
  利用するコンテナは PostgreSQL のデータベースコンテナに加え、フロントとバックのコンテナとリバースプロキシとなる nginx コンテナです。
- nginx  
  リバースプロキシと HTML ファイルの配信を行っています。  
  バックエンドの API に対してはそのままリバースプロキシを行い、フロントエンドの配信に関しては、nginx のコンテナ内でビルドを行い、そのビルド済みのファイルを配信しています。

### CI/CD 環境

- Github Actions  
  ここで、型チェックを行っています。  
  現時点では型チェックのみですが、今後はテストコードの実行も行う予定です。

## ディレクトリ構成

ディレクトリ構成は以下のようになっています。  
一部省略をしています。

```
.
├── .github
│   └── workflows # Github Actions の設定ファイル
│       └── ci.yml # CIの設定ファイル
├── .husky # husky の設定ファイルが格納
├── .devcontainer # 開発環境の設定ファイルが格納
│   └── devcontainer.json # 開発環境の設定ファイル
├── .changeset # changesetsの設定ファイルが格納
│
├── env_files # 主に本番環境の環境変数ファイルが格納
│   ├── .env # docker composeで参照する環境変数ファイル
│   ├── backend.ev # バックエンドの環境変数ファイル
│   └── postgres.ev # PostgreSQLの環境変数ファイル
│
├── keys # JWTの署名に使用する鍵ファイルが格納
│   ├── private.key # 秘密鍵
│   └── public.key # 公開鍵
│
├── packages # モノリポ構成のパッケージが格納
│   ├── backend # バックエンドのパッケージ
│   │   ├── prisma # prismaの設定ファイルが格納
│   │   │   ├── migrations # マイグレーションファイルが格納
│   │   │   └── schema.prisma # prismaのスキーマファイル
│   │   ├── src # ソースコードが格納
│   │   │   ├── lib # ライブラリが格納
│   │   │   │   └── generated # graphql-codegenで生成されたファイルが格納
│   │   │   └── resolvers # resolverが格納
│   │   └── ... # その他のファイルが格納
│   │
│   ├── frontend # フロントエンドのパッケージ
│   │   ├── src # ソースコードが格納
│   │   │   ├── components # コンポーネントが格納
│   │   │   │   ├── ui # radix-ui/primitivesで生成されたコンポーネントなどのUIコンポーネントが格納
│   │   │   │   └── ... # その他のコンポーネントが格納
│   │   │   ├── lib # ライブラリが格納
│   │   │   │   └── generated # graphql-codegenで生成されたファイルが格納
│   │   └── ... # その他のファイルが格納
│   │
│   ├── infra # インフラ環境のパッケージ
│   │   ├── docker-compose.yml # docker composeの設定ファイル
│   │   ├── config # nginxの設定ファイルが格納
│   │   │   └── nginx.conf # nginxの設定ファイル
│   │   └── Dockerfiles # 利用するDockerfileが格納
│   │       ├── Backend-Dockerfile # バックエンドのDockerfile
│   │       └── Frontend-Dockerfile # フロントエンドのDockerfile
│   │
│   └── graphql # graphqlのパッケージ
│       ├── schemas # graphqlのスキーマファイルが格納
│       ├── operations # graphqlの操作ファイルが格納
│       └── ... # その他のファイルが格納
│
├── .gitignore # gitのignoreファイル
├── .prettierrc # prettierの設定ファイル
├── .prettieriignore # prettierのignoreファイル
├── .huskyrc.json # huskyの設定ファイル
├── .commitlintrc.json # commitlintの設定ファイル
├── .lintstagedrc.json # lint-stagedの設定ファイル
├── .npmrc # npmの設定ファイル
├── package.json # ルートのpackage.json
├── pnpm-lock.yaml # pnpmのlockファイル
├── turbo.json # turboの設定ファイル
├── tsconfig.json # ルートのtsconfigファイル
└── ... # その他のファイルが格納
```

# 起動方法

## 開発環境の起動方法

devcontainer を利用することで、開発環境を立ち上げることができます。

1. VSCode を起動します。
2. VSCode の左下にある「><」をクリックします。
3. 「Remote-Containers: Reopen in Container」をクリックします。

また、Github 上でも開発環境を立ち上げることができます。

1. Github 上でこのリポジトリを開きます。
2. 「Code」ボタンをクリックします。
3. 「Open with Codespaces」をクリックします。

なお、devcontainer を立ち上げると、packages/backend 以下の.env.devcontainer ファイルが自動で.env にコピーされます。

## 本番環境の起動方法

docker compose を利用することで、本番環境を立ち上げることができます。

1. env_files ディレクトリに、末尾.env の環境変数ファイルを例を参考に配置します。
2. packages/infra/compose.yml のあるディレクトリに移動します。
3. docker のインストールされている環境で、以下のコマンドを実行します。

```
docker compose --env-file ../env_files/prod.env up
```

## 今後の予定

- [ ] バックエンドの実装
- [ ] フロントエンドの実装
- [ ] テストコードの実装
- [x] 開発環境のコンテナ化
- [x] インフラ環境のコード化 (dockercompose)
- [ ] インフラ環境のコード化 (terraform)

(開発中)

## ライセンス

MIT License

Copyright (c) 2023 calloc134
