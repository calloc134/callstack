import { useContext } from "react";
import { AuthnContext } from "./AuthnProvider";

const useAuthn = () => {
  // コンテキストを取得
  const jwt_context = useContext(AuthnContext);

  // コンテキストが取得できなかった場合はエラーを投げる
  if (!jwt_context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // コンテキストを返す
  return jwt_context;
};

export { useAuthn };
