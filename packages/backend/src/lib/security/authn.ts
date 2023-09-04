import { Auth0PluginOptions } from "@envelop/auth0";
import { AuthMockPluginOptions } from "../plugins/useAuthMock";
import { logto_audience, logto_endpoint } from "src/env";
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken";
import { GraphQLErrorWithCode } from "src/lib/error/error";

// エラー処理を行う関数
const onError = (error: Error) => {
  if (error instanceof TokenExpiredError) {
    // JWTが期限切れの場合
    throw new GraphQLErrorWithCode("jwt_expired");
  } else if (error instanceof NotBeforeError) {
    // JWTが有効期限前の場合
    throw new GraphQLErrorWithCode("jwt_not_before");
  } else if (error instanceof JsonWebTokenError) {
    // JWTが不正な場合
    throw new GraphQLErrorWithCode("jwt_web_token_error");
  } else {
    // その他のエラー
    throw new GraphQLErrorWithCode("unknown_error", error.message);
  }
};

const AuthMockOption: AuthMockPluginOptions = {
  // 認証されていないリクエストも許可
  preventUnauthenticatedAccess: false,
  // ペイロードを格納するフィールド名を指定
  extendContextField: "logto",
  // エラー処理
  onError: onError,
};

const AuthnOption: Auth0PluginOptions = {
  // ドメイン部分は上書きするためダミー
  domain: "",
  // audienceは環境変数から取得
  audience: logto_audience,
  // オプションを上書き
  // logtoのjwksUriと指定
  jwksClientOptions: {
    jwksUri: `${logto_endpoint}/oidc/jwks`,
  },
  // JWTの検証オプションを上書き
  jwtVerifyOptions: {
    algorithms: ["ES384"],
    issuer: `${logto_endpoint}/oidc`,
  },
  // 認証されていないリクエストも許可
  preventUnauthenticatedAccess: false,
  // ペイロードを格納するフィールド名を指定
  extendContextField: "logto",
  // エラー処理
  onError: onError,
};

export { AuthMockOption, AuthnOption };
