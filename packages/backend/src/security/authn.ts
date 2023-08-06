import { Auth0PluginOptions } from "@envelop/auth0";
import { AuthMockPluginOptions } from "../lib/plugins/useAuthMock";
import { audience, logto_endpoint } from "src/env";
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken";
import { GraphQLErrorWithCode } from "src/error";

// エラー処理を行う関数
const onError = (error: Error) => {
  if (error instanceof TokenExpiredError) {
    throw new GraphQLErrorWithCode("jwt_expired");
  } else if (error instanceof NotBeforeError) {
    throw new GraphQLErrorWithCode("jwt_not_before");
  } else if (error instanceof JsonWebTokenError) {
    throw new GraphQLErrorWithCode("jwt_web_token_error");
  } else {
    throw new GraphQLErrorWithCode("unknown_error", error.message);
  }
};

const authMockOption: AuthMockPluginOptions = {
  // 認証されていないリクエストも許可
  preventUnauthenticatedAccess: false,
  // ペイロードを格納するフィールド名を指定
  extendContextField: "logto",
  // エラー処理
  onError: onError,
};

const authnOption: Auth0PluginOptions = {
  // ドメイン部分は上書きするためダミー
  domain: "",
  // audienceは環境変数から取得
  audience: audience,
  // オプションを上書き
  // logtoのjwksUriと指定
  jwksClientOptions: {
    jwksUri: `${logto_endpoint}/oidc/jwks}`,
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

export { authMockOption, authnOption };
