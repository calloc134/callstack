// 環境変数を取得し、開発環境かどうかを判定
const is_dev = process.env.NODE_ENV === "development";

// 環境変数が存在していれば、そのパスから読み込み
// 環境変数が存在しなければ、../graphql/schema.graphqlから読み込み
const schema_path = process.env.SCHEMA_PATH || "../graphql/schemas/*.graphql";

// 開発環境であれば、空文字を設定
// 本番環境であれば、minioエンドポイントのURLを設定
const minio_endpoint = is_dev ? "" : process.env.MINIO_ENDPOINT || "";

const minio_root_user = process.env.MINIO_ROOT_USER || "";
const minio_root_password = process.env.MINIO_ROOT_PASSWORD || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、LogtoエンドポイントのURLを設定
const logto_endpoint = is_dev ? "" : process.env.LOGTO_ENDPOINT || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、Logtoのオーディエンスを設定
const logto_audience = is_dev ? "" : process.env.LOGTO_AUDIENCE || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、Logtoのwebhookの検証用シークレットを設定
const logto_webhook_secret = is_dev ? "" : process.env.LOGTO_WEBHOOK_SECRET || "";

export { is_dev, minio_endpoint, minio_root_user, minio_root_password, logto_endpoint, logto_audience, schema_path, logto_webhook_secret };
