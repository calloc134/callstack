import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";

import { router } from "./route";
import { AuthnProvider } from "./lib/provider/authn/AuthnProvider";
import { UrqlProvider } from "./lib/provider/urql/UrqlProvider";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { is_dev } from "./env";
import "src/index.css";

export const Main = () => {
  return (
    <>
      <RouterProvider router={router} />
      {
        // @ts-expect-error routerの型のエラーを無視
        is_dev && <TanStackRouterDevtools router={router} />
      }
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthnProvider>
      <UrqlProvider>
        <NextUIProvider>
          <Main />
        </NextUIProvider>
      </UrqlProvider>
    </AuthnProvider>
  </React.StrictMode>
);
