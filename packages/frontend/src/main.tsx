import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";

import { router } from "./route";
import { AuthnProvider } from "./lib/provider/authn/AuthnProvider";

export const Main = () => {
  return (
    // NextUI用のprovider
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthnProvider>
      <Main />
    </AuthnProvider>
  </React.StrictMode>
);
