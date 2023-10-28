import { ReactNode, useState, useCallback } from "react";
import { Provider, Client, cacheExchange, fetchExchange, mapExchange, MapExchangeOpts } from "urql";
import { authExchange, AuthUtilities, AuthConfig } from "@urql/exchange-auth";
import toast from "react-hot-toast";
import { devtoolsExchange } from "@urql/devtools";

import { is_dev, hostname, logto_api_resource } from "src/env";
import { useAuthn } from "src/lib/provider/authn/useAuthn";

// TODO: エラーハンドリングをMapExchangeで行う
const UrqlProvider = ({ children }: { children: ReactNode }) => {
  // urqlクライアントの設定
  const { isAuthenticated, getAccessToken, signIn } = useAuthn();
  // jwtの状態
  const [jwt, setJwt] = useState("");
  // フェッチしているかを判定するフラグ
  const [isFetching, setIsFetching] = useState(false);

  // urqlのauth Exchange用の設定
  const authInit: (utilities: AuthUtilities) => Promise<AuthConfig> = useCallback(
    async (utils) => {
      return {
        willAuthError() {
          return jwt === "";
        },
        didAuthError(error) {
          // GraphQLのエラー
          // isAuthenticaedがtrueなのはAuthnProviderで認証済みと判定されているため
          // jwtが空文字かつauthz_not_logged_inのエラーがある場合は未認証とみなす
          // また、invalid_tokenのエラーがある場合も未認証とみなす
          // jwtが空文字でなく、authz_not_logged_inのエラーがある場合はまだjwtが反映されていないとしてスルー

          return (
            (isAuthenticated && jwt === "" && error.graphQLErrors.some((e) => e.extensions?.code === "authz_not_logged_in")) ||
            error.graphQLErrors.some((e) => e.extensions?.code === "jwt_expired") ||
            error.graphQLErrors.some((e) => e.extensions?.code === "jwt_invalid_signature") ||
            error.graphQLErrors.some((e) => e.extensions?.code === "jwt_not_before") ||
            error.graphQLErrors.some((e) => e.extensions?.code === "jwt_web_token_error")
          );
        },
        async refreshAuth() {
          if (!isAuthenticated) {
            // 未認証もしくは認証済みでもロード中の場合は何もしない
            return;
          }

          // もしフェッチ中であれば何もしない
          if (isFetching) {
            return;
          }

          // useStateをフラグとして利用
          setIsFetching(true);

          // トークンの取得
          const jwt = await getAccessToken(is_dev ? "" : logto_api_resource);

          if (jwt === undefined) {
            // トークンがundefinedの場合はサインインしなおす
            signIn(`https://${hostname}/auth/callback`);
            return;
          }

          setJwt(jwt);

          // フェッチが終わったのでフラグを下ろす
          setIsFetching(false);
        },
        addAuthToOperation(operation) {
          // 処理前に渡されていた分のfetchOptionsの適用
          const fetchOptions = typeof operation.context.fetchOptions === "function" ? operation.context.fetchOptions() : operation.context.fetchOptions || {};

          // ヘッダのオブジェクトの作成
          const headers = new Headers(fetchOptions.headers);
          // fetchOptionsによって既にヘッダがある場合は上書きしない
          if (headers.get("Authorization")) return operation;

          // 認証済みかつjwtがあり、jwtが空文字でない場合はヘッダに追加
          if (isAuthenticated && jwt !== "") {
            return utils.appendHeaders(operation, {
              // ヘッダの設定
              Authorization: `Bearer ${jwt}`,
            });
          }
          return operation;
        },
      };
    },
    [isAuthenticated, isFetching, jwt]
  );

  const mapInit: MapExchangeOpts = {
    onResult(result) {
      // エラーの場合はトーストを表示
      if (result.error) {
        toast.error(result.error.message, {
          icon: "❌",
        });
      }
    },
  };

  const urql_client = new Client({
    // 開発環境であればhttp、本番環境であればhttpsを使う
    // ホストネームよりフェッチ先のURLを生成
    url: `${is_dev ? "http" : "https"}://${hostname}/api/graphql`,
    exchanges: [
      // 開発環境であればdevtoolsを使う
      ...(is_dev ? [devtoolsExchange] : []),
      cacheExchange,
      authExchange(authInit),
      mapExchange(mapInit),
      fetchExchange,
    ],
  });

  return (
    // urql用のprovider
    <Provider value={urql_client}>{children}</Provider>
  );
};

export { UrqlProvider };
