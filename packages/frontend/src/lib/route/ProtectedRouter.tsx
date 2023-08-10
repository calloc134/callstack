import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { useAuthn } from "./useAuthn";
import { logto_endpoint } from "src/env";

export const ProtectedRouter = () => {
  // Logtoフックより認証状態とログイン関数を取得
  const { isAuthenticated, signIn, getAccessToken } = useAuthn();

  // 認証していない場合はsignIn関数でログインリダイレクト
  useEffect(() => {
    if (!isAuthenticated) {
      signIn(`${logto_endpoint}/callback`);
    }
  }, [isAuthenticated, signIn]);

  // 認証されている場合は子コンポーネントを表示
  return <Outlet />;
};
