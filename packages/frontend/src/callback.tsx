import { useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "@nextui-org/react";

const CallBackPage = () => {
  const navigate = useNavigate({
    from: "/auth/callback",
  });

  const { isLoading } = useHandleSignInCallback(() => {
    navigate({
      to: "/auth/panel",
    });
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner label="リダイレクト中..." color="success" />
      </div>
    );
  }
};

export { CallBackPage };
