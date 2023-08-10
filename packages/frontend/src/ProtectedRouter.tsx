import { useLogto } from "@logto/react";
import { Outlet } from "@tanstack/react-router";

export const ProtectedRouter = () => {
  const { isAuthenticated, signIn } = useLogto();

  if (!isAuthenticated) {
    signIn("htps://hoge/login");
  }

  return <Outlet />;
};
