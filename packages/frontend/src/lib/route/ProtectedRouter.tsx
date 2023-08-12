import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { useAuthn } from "src/lib/provider/authn/useAuthn";
import { logto_endpoint } from "src/env";
import { Spinner } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

export const ProtectedRouter = () => {
  // Logtoフックより認証状態とログイン関数を取得
  const { isAuthenticated, signIn } = useAuthn();

  // 認証していない場合はsignIn関数でログインリダイレクト
  useEffect(() => {
    if (!isAuthenticated) {
      toast("認証を行います...", {
        icon: "🔑",
      });
      signIn(`${logto_endpoint}/callback`);
    }
  }, [isAuthenticated, signIn]);

  // 認証されている場合は子コンポーネントを表示
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner label="認証中..." color="warning" />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 5000,
          }}
        />
      </div>
    );
  }
  return <Outlet />;
};
