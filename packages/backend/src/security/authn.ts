import { Auth0PluginOptions } from "@envelop/auth0";
import { AuthMockPluginOptions } from "../lib/plugins/useAuthMock";
import { audience, logto_endpoint } from "../env";

const authMockOption: AuthMockPluginOptions = {
  // 認証されていないリクエストも許可
  preventUnauthenticatedAccess: false,
  // ペイロードを格納するフィールド名を指定
  extendContextField: "logto",
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
};

export { authMockOption, authnOption };
