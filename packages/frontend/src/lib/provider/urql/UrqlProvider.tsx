import { ReactNode, useState, useCallback } from "react";
import { Provider, Client, cacheExchange, fetchExchange } from "urql";
import { authExchange, AuthUtilities, AuthConfig } from "@urql/exchange-auth";

import { isDev, hostname } from "src/env";
import { useAuthn } from "src/lib/provider/authn/useAuthn";

// TODO: エラーハンドリングをMapExchangeで行う
const UrqlProvider = ({ children }: { children: ReactNode }) => {
  // urqlクライアントの設定
  const { isAuthenticated, getAccessToken } = useAuthn();
  const [jwt, setJwt] = useState<string | undefined>();

  // urqlのauth Exchange用の設定
  const authInit: (utilities: AuthUtilities) => Promise<AuthConfig> = useCallback(
    async (utils) => {
      return {
        willAuthError() {
          // 認証されていない場合は認証エラーとして処理する
          return !isAuthenticated;
        },
        didAuthError(error) {
          // GraphQLのエラー
          // TODO: 実際のエラーを確認してから修正
          return error.graphQLErrors.some((e) => e.extensions?.code === "authz_not_logged_in");
        },
        async refreshAuth() {
          if (!isAuthenticated) {
            // 未認証の場合は何もしない
            return;
          }

          // トークンの取得
          const jwt = await getAccessToken();
          setJwt(jwt);
        },
        addAuthToOperation(operation) {
          // fetchOptionsの適用
          const fetchOptions = typeof operation.context.fetchOptions === "function" ? operation.context.fetchOptions() : operation.context.fetchOptions || {};

          // ヘッダのオブジェクトの作成
          const headers = new Headers(fetchOptions.headers);
          // fetchOptionsによって既にヘッダがある場合は上書きしない
          if (headers.get("Authorization")) return operation;

          // 認証済みかつjwtがある場合はヘッダに追加
          if (isAuthenticated && jwt) {
            return utils.appendHeaders(operation, {
              // ヘッダの設定
              Authorization: `Bearer ${jwt}`,
            });
          }
          return operation;
        },
      };
    },
    [isAuthenticated, getAccessToken, jwt]
  );

  const urql_client = new Client({
    // 開発環境であればhttp、本番環境であればhttpsを使う
    // ホストネームよりフェッチ先のURLを生成
    url: `${isDev ? "http" : "https"}://${hostname}/api/graphql`,
    exchanges: [cacheExchange, authExchange(authInit), fetchExchange],
  });

  return (
    // urql用のprovider
    <Provider value={urql_client}>{children}</Provider>
  );
};

export { UrqlProvider };