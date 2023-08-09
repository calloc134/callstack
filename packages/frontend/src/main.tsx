import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, RootRoute, Route, Router } from "@tanstack/react-router";
import { App } from "./App";

const rootRoute = new RootRoute({
  component: () => <App />,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>inex</div>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={new Router({routeTree})} />
  </React.StrictMode>
);
