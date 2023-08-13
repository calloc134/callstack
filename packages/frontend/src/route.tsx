import { RootRoute, Route, Router } from "@tanstack/react-router";
import { Document } from "./_document";
import { Index } from "./features/index/pages/Index";
import { NotFoundPage } from "./404";
import { ProtectedRouter } from "./lib/route/ProtectedRouter";
import { IndexPanelPage } from "./features/panel/pages/Index";
import { CallBackPage } from "./callback";

// 以下、ルーティングの設定
const rootRoute = new RootRoute({
  // まずは外側のコンポーネント
  component: () => <Document />,
});

// 根本ルートの設定
const indexRoute = new Route({
  // 親ルートを指定
  getParentRoute: () => rootRoute,
  path: "/",
  // ここに内側のコンポーネントを指定
  component: () => <Index />,
});

// 404ルートの設定
const notFoundRoute = new Route({
  // 親ルートを指定
  getParentRoute: () => rootRoute,
  path: "*",
  // ここに内側のコンポーネントを指定
  component: () => <NotFoundPage />,
});

// コールバックページの設定
const callbackRoute = new Route({
  // 親ルートを指定
  getParentRoute: () => rootRoute,
  path: "auth/callback",
  // ここに内側のコンポーネントを指定
  component: () => <CallBackPage />,
});

// authルートの設定
const protectedRoute = new Route({
  // 親ルートを指定
  getParentRoute: () => rootRoute,
  path: "auth",
  // 保護された外枠コンポーネントを指定
  component: () => <ProtectedRouter />,
});

// auth/panelルートの設定
const panelRoute = new Route({
  // 親ルートを指定
  getParentRoute: () => protectedRoute,
  path: "panel",
  // 保護された外枠コンポーネントを指定
  component: () => <IndexPanelPage />,
});

const router = new Router({
  routeTree: rootRoute.addChildren([indexRoute, notFoundRoute, callbackRoute, protectedRoute.addChildren([panelRoute])]),
});

// tanstack routerを型安全に利用するための型定義
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };
