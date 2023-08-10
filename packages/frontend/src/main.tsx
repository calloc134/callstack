import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, Client, cacheExchange, fetchExchange } from "urql";
import { RouterProvider, RootRoute, Route, Router } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";
import { LogtoProvider, LogtoConfig } from "@logto/react";

import { Document } from "./_document";
import { Index } from "./features/index/pages/Index";
import { ProtectedRouter } from "./ProtectedRouter";

export const Main = () => {
  // const { isLoading, signIn } = useLogto()

  const config: LogtoConfig = {
    endpoint: "<your-logto-endpoint>", // E.g. http://localhost:3001
    appId: "<your-application-id>",
  };

  const urql_client = new Client({
    url: "http://localhost:4000/graphql", // TODO: 環境変数から取得する
    exchanges: [cacheExchange, fetchExchange],
  });

  const rootRoute = new RootRoute({
    component: () => <Document />,
  });

  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <Index />,
  });

  const protectedRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "auth",
    component: () => <ProtectedRouter />,
  });

  const routeTree = rootRoute.addChildren([indexRoute, protectedRoute]);

  return (
    <LogtoProvider config={config}>
      <Provider value={urql_client}>
        <NextUIProvider>
          <RouterProvider router={new Router({ routeTree })} />
        </NextUIProvider>
      </Provider>
    </LogtoProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
