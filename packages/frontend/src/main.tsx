import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { App } from "./App";
import { PanelPage } from "src/features/panel/pages/index";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/panel",
    element: <PanelPage />,
  },
]);

const urql_client = new Client({
  url: "http://localhost:4000/graphql", // TODO: 環境変数から取得する
  exchanges: [cacheExchange, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={urql_client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
