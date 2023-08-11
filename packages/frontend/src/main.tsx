import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";

import { router } from "./route";
import { AuthnProvider } from "./lib/provider/authn/AuthnProvider";
import { UrqlProvider } from "./lib/provider/urql/UrqlProvider";
import "src/index.css";

export const Main = () => {
  return (
    // NextUI用のprovider
    <RouterProvider router={router} />
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
