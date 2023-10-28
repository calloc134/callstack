import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { useAuthn } from "src/lib/provider/authn/useAuthn";
import { hostname } from "src/env";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";

export const ProtectedRouter = () => {
  // Logtoフックより認証状態とログイン関数を取得
  const { isAuthenticated, isLoading, signIn } = useAuthn();

  // 認証していない場合はsignIn関数でログインリダイレクト
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      toast("認証を行います...", {
        icon: "🔑",
      });
      signIn(`https://${hostname}/auth/callback`);
    }
  }, [isAuthenticated, isLoading]);

  // 認証されている場合は子コンポーネントを表示
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner label="認証中..." color="warning" />
      </div>
    );
  }
  return <Outlet />;
};
