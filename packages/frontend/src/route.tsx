import { RootRoute, Route, Router } from "@tanstack/react-router";
import { Document } from "./_document";
import { Index } from "./features/index/pages/Index";
import { ProtectedRouter } from "./lib/route/ProtectedRouter";
import { PanelPage } from "./features/panel/pages/Index";

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

const protectedRoute = new Route({
  // 親ルートを指定
  getParentRoute: () => rootRoute,
  path: "auth",
  // 保護された外枠コンポーネントを指定
  component: () => <ProtectedRouter />,
});

const PanelRoute = new Route({
  // 親ルートを指定
  getParentRoute: () => protectedRoute,
  path: "panel",
  // 保護された外枠コンポーネントを指定
  component: () => <PanelPage />,
});

const router = new Router({
  routeTree: rootRoute.addChildren([indexRoute, protectedRoute.addChildren([PanelRoute])]),
});

export { router };
