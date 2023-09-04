import { useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "@nextui-org/react";

const CallBackPage = () => {
  // ログイン後にリダイレクトする関数をフックより取得
  const navigate = useNavigate({
    from: "/auth/callback",
  });

  // ログイン後にリダイレクト
  const { isLoading } = useHandleSignInCallback(() => {
    navigate({
      to: "/auth/posts",
    });
  });

  // ログインしている状態であれば
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner label="リダイレクト中..." color="success" />
      </div>
    );
  }
};

export { CallBackPage };
