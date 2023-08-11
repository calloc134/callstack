// 環境変数を取得し、開発環境かどうかを判定
const isDev = process.env.NODE_ENV === "development";

// 環境変数が存在していれば、そのパスから読み込み
// 環境変数が存在しなければ、../graphql/schema.graphqlから読み込み
const schema_path = process.env.SCHEMA_PATH || "../graphql/schemas/*.graphql";

// 開発環境であれば、空文字を設定
// 本番環境であれば、LogtoエンドポイントのURLを設定
const logto_endpoint = isDev ? "" : process.env.LOGTO_ENDPOINT || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、Logtoのオーディエンスを設定
const audience = isDev ? "" : process.env.LOGTO_AUDIENCE || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、Logtoのwebhookの検証用シークレットを設定
const webhook_secret = isDev ? "" : process.env.LOGTO_WEBHOOK_SECRET || "";

export { isDev, logto_endpoint, audience, schema_path, webhook_secret };
