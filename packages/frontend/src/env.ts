// 環境変数を取得し、開発環境かどうかを判定
const is_dev = import.meta.env.MODE === "development";

// 開発環境であれば、環境変数からJWTを取得
// 本番環境であれば、空文字を設定
const dev_jwt_token = is_dev ? import.meta.env.VITE_JWT_TOKEN || "" : "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、LogtoエンドポイントのURLを設定
const logto_endpoint = is_dev ? "" : import.meta.env.VITE_LOGTO_ENDPOINT || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、LogtoのアプリケーションIDを設定
const logto_app_id = is_dev ? "" : import.meta.env.VITE_LOGTO_APPID || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、Logtoのapiリソースを設定
const logto_api_resource = is_dev ? "" : import.meta.env.VITE_LOGTO_API_RESOURCE || "";

// ホスト名を取得
// 開発環境であれば、localhostを設定
// 本番環境であれば、環境変数から取得
const hostname = is_dev ? "localhost:6173" : import.meta.env.VITE_HOSTNAME || "";

export { is_dev, dev_jwt_token, logto_endpoint, logto_app_id, logto_api_resource, hostname };
