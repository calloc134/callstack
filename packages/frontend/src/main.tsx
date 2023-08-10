import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, Client, cacheExchange, fetchExchange } from "urql";
import { RouterProvider } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";

import { isDev, hostname } from "./env";
import { router } from "./route";

export const Main = () => {
  // urqlクライアントの設定
  const urql_client = new Client({
    // 開発環境であればhttp、本番環境であればhttpsを使う
    // ホストネームよりフェッチ先のURLを生成
    url: `${isDev ? "http" : "https"}://${hostname}/api/graphql`,
    exchanges: [cacheExchange, fetchExchange],
  });

  return (
    <Provider value={urql_client}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
