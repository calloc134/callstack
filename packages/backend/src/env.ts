// 環境変数を取得し、開発環境かどうかを判定
const isDev = process.env.NODE_ENV === "development";
// 環境変数を取得し、Logtoコンテナのホスト名を取得
const logto_endpoint = process.env.ENDPOINT || "http://auth.localhost";

// 環境変数を取得し、audienceを取得
const audience = process.env.AUDIENCE || "dummy";

// 環境変数が存在していれば、そのパスから読み込み
// 環境変数が存在しなければ、../graphql/schema.graphqlから読み込み
const schema_path = process.env.SCHEMA_PATH || "../graphql/schemas/*.graphql";

export { isDev, logto_endpoint, audience, schema_path };
