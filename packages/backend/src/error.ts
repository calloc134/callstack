import { GraphQLError } from "graphql";

// エラーコード
const error_code = {
  // JWTのエラー
  // JWTの期限切れエラー
  jwt_expired: "JWT_EXPIRED",
  // JWTの署名エラー
  jwt_invalid_signature: "JWT_INVALID_SIGNATURE",
  // JWTの有効期限が開始前エラー
  jwt_not_before: "JWT_NOT_BEFORE",
  // JWTトークンのエラー
  jwt_web_token_error: "JWT_WEB_TOKEN_ERROR",

  // 認可において対応するユーザが存在しないエラー(ログインしていない またはログインが無効)
  authz_not_logged_in: "AUTHZ_NOT_LOGGED_IN",
  // 認可ディレクティブで指定した引数に対応するロールが存在しないエラー
  authz_role_not_found: "AUTHZ_ROLE_NOT_FOUND",
  // ログインユーザでの認可に失敗したエラー
  authz_failed: "AUTHZ_FAILED",

  // 存在しないアイテムのエラー
  item_not_found: "ITEM_NOT_FOUND",
  // 存在するアイテムのエラー
  item_already_exists: "ITEM_ALREADY_EXISTS",

  // アイテムのオーナが自分ではないエラー
  item_not_owned: "ITEM_NOT_OWNED",

  // WebHookの署名が正しくないエラー
  webhook_invalid_signature: "WEBHOOK_INVALID_SIGNATURE",

  // その他のエラー
  unknown_error: "UNKNOWN_ERROR",
};

// エラーコードの型
type ErrorCode = keyof typeof error_code;

// エラーコードのメッセージ
const error_message: { [key in ErrorCode]: string } = {
  jwt_expired: "⏰ JWT is expired",
  jwt_invalid_signature: "❌ JWT signature is invalid",
  jwt_not_before: "⏳ JWT is not before",
  jwt_web_token_error: "🚫 JWT is invalid",
  authz_not_logged_in: "👤 Not logged in",
  authz_role_not_found: "🔍 Role not found",
  authz_failed: "🔐 Authorization failed",
  item_not_found: "🔎 Item not found",
  item_already_exists: "🔄 Item already exists",
  item_not_owned: "🚷 Item is not owned",
  unknown_error: "❓ Unknown error",
  webhook_invalid_signature: "🔐 Webhook signature is invalid",
};

// カスタムのエラークラス
class GraphQLErrorWithCode extends GraphQLError {
  constructor(code: ErrorCode, message?: string) {
    // 拡張フィールドの定義
    const extensions = {
      code: code,
    };

    // エラーの内容を表示
    console.error(`[ERROR] ${code}: ${message ? message : error_message[code]}`);

    // 親クラスのコンストラクタを呼び出す
    super(message ? message : error_message[code], {
      extensions: extensions,
    });
  }
}

export { GraphQLErrorWithCode, error_code };
