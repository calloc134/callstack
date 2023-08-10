import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, Client, cacheExchange, fetchExchange } from "urql";
import { authExchange } from '@urql/exchange-auth';
import { RouterProvider } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";

import { isDev, hostname } from "./env";
import { router } from "./route";
import { AuthnProvider } from "./lib/route/AuthnProvider";
import { useAuthn } from "./lib/route/useAuthn";

export const Main = () => {

  // フックより認証情報の要素を取得
  const { isAuthenticated, signIn, getAccessToken } = useAuthn();

  const jwt = await getAccessToken();

  
  // urqlクライアントの設定
  const urql_client = new Client({
    // 開発環境であればhttp、本番環境であればhttpsを使う
    // ホストネームよりフェッチ先のURLを生成
    url: `${isDev ? "http" : "https"}://${hostname}/api/graphql`,
    exchanges: [
      cacheExchange, 
      authExchange(async utils => {
        return {
          addAuthToOperation(operation) {
            const token = await getAccessToken() || "";
            if (isAuthenticated && token) {
              return utils.appendHeaders(operation, {
                Authorization: `Bearer ${token}`,
              });
            }

            return operation;
          },
          willAuthError() {
            // e.g. check for expiration, existence of auth etc
            return !isAuthenticated;
          },
          didAuthError(error, _operation) {
            // GraphQLのエラー
            return error.graphQLErrors.some(
              e => e.extensions?.code === "UNAUTHENTICATED"
            );
          },
          async refreshAuth() {
            // e.g. refresh token
          },
        }
      }),
      fetchExchange,
    ],
  });

  return (
    // urql用のprovider
    <Provider value={urql_client}>
      // NextUI用のprovider
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthnProvider>
      <Main />
    </AuthnProvider>
  </React.StrictMode>
);
