import { createContext, ReactNode } from "react";
import { useLogto, InteractionMode, LogtoProvider } from "@logto/react";
import { isDev, dev_jwt_token } from "src/env";
import { logto_config } from "src/config";

// Authnで利用するコンテキストの作成
const AuthnContext = createContext({});

// Authnコンテキストのプロバイダー
const AuthnProvider = ({ children }: { children: ReactNode }) => {
  // 本番環境において、Logtoのフックより利用する要素を取得
  const { isAuthenticated, signIn, getAccessToken } = useLogto();

  // コンテキストの型をあらかじめ定義
  type AuthnContext = {
    isAuthenticated: boolean;
    signIn: (redirectUrl: string, interactionMode?: InteractionMode) => Promise<void>;
    getAccessToken: (redirectUrl?: string) => Promise<string | undefined>;
  };

  // 開発環境においてのコンテキストの定義
  // isAuthenticatedは環境変数から取得したJWTトークンの文字列の種類を確認
  // signInはダミーの関数を定義
  // getAccessTokenは環境変数から取得したJWTトークンを返す
  const developmentAuthnContext: AuthnContext = {
    isAuthenticated: dev_jwt_token !== "" ? true : false,
    signIn: async () => void {},
    getAccessToken: async () => {
      return dev_jwt_token !== "" ? "" : dev_jwt_token;
    },
  };

  // 本番環境においてのコンテキストの定義
  // Logtoのフックより取得した要素をそのまま利用
  const productionAuthnContext: AuthnContext = {
    isAuthenticated,
    signIn,
    getAccessToken,
  };

  return (
    // 開発環境か本番環境かでコンテキストを切り替える
    <LogtoProvider config={logto_config}>
      <AuthnContext.Provider value={isDev ? developmentAuthnContext : productionAuthnContext}>{children}</AuthnContext.Provider>
    </LogtoProvider>
  );
};

export { AuthnProvider, AuthnContext };
