---
sidebar_position: 1
---

# callstack とは

callstack とは、**pnpm workspace** + **turborepo**で構成されたモノレポのボイラープレートです。

⚠️ このプロジェクトはまだ **開発中** です。

# 特徴

- [pnpm](https://pnpm.io/) と[turborepo](https://turbo.build/) を使ったモノレポのボイラープレート
- [husky](https://github.com/typicode/husky) 等のツールによるコード品質の維持
- devcontainer による開発環境の管理
- [react](https://reactjs.org/) によるフロントエンドの構築
- [graphql-yoga](https://the-guild.dev/graphql/yoga-server) によるバックエンドの構築
- [prisma](https://www.prisma.io/) によるデータベース管理
- docker compose による本番環境のコンテナ管理
- 組み込まれた認証とユーザ管理基盤
- graphql-yoga の認可モジュールによる認可管理

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
