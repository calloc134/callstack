import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";

import { router } from "./route";
import { AuthnProvider } from "./lib/provider/authn/AuthnProvider";
import { UrqlProvider } from "./lib/provider/urql/UrqlProvider";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";
import { is_dev } from "./env";
import "src/index.css";

export const Main = () => {
  return (
    <>
      <RouterProvider router={router} />
      {
        // デバッグ環境のみdevtoolsを表示
        // @ts-expect-error routerの型のエラーを無視
        is_dev && <TanStackRouterDevtools router={router} />
      }
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
        }}
      />
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
