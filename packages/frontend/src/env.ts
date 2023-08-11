// 環境変数を取得し、開発環境かどうかを判定
const isDev = import.meta.env.MODE === "development";

// 開発環境であれば、環境変数からJWTを取得
// 本番環境であれば、空文字を設定
const dev_jwt_token = isDev ? import.meta.env.VITE_JWT_TOKEN || "" : "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、LogtoエンドポイントのURLを設定
const logto_endpoint = isDev ? "" : import.meta.env.VITE_LOGTO_ENDPOINT || "";

// 開発環境であれば、空文字を設定
// 本番環境であれば、LogtoのアプリケーションIDを設定
const logto_app_id = isDev ? "" : import.meta.env.VITE_LOGTO_APPID || "";

// ホスト名を取得
// 開発環境であれば、localhostを設定
// 本番環境であれば、環境変数から取得
const hostname = isDev ? "localhost" : process.env.VITE_HOSTNAME || "";

export { isDev, dev_jwt_token, logto_endpoint, logto_app_id, hostname };
