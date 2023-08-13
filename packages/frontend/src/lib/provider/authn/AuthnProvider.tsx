import { useState, createContext, ReactNode } from "react";
import { useLogto, InteractionMode, LogtoProvider } from "@logto/react";
import { is_dev, dev_jwt_token } from "src/env";
import { logto_config } from "src/config";

// コンテキストの型をあらかじめ定義
// fetchUserInfoやgetIdTokenClaimsは利用しない方針
type AuthnContext = {
  isAuthenticated: boolean;
  signIn: (redirectUrl: string, interactionMode?: InteractionMode) => Promise<void>;
  signOut: (postLogoutRedirectUri?: string) => Promise<void>;
  getAccessToken: (redirectUrl?: string) => Promise<string | undefined>;
};

// Authnで利用するコンテキストの作成
// ダミーの値を設定
const AuthnContext = createContext<AuthnContext>({
  isAuthenticated: false,
  signIn: async () => void {},
  signOut: async () => void {},
  getAccessToken: async () => "",
});

// 開発環境においてのAuthnコンテキストのプロバイダー
const DevelopmentAuthnProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 開発環境においてのコンテキストの定義
  // isAuthenticatedは環境変数から取得したJWTトークンの文字列の種類を確認
  // signInはダミーの関数を定義
  // getAccessTokenは環境変数から取得したJWTトークンを返す
  const context: AuthnContext = {
    isAuthenticated: isAuthenticated,
    signIn: async () => {
      setIsAuthenticated(true);
    },
    signOut: async () => {
      setIsAuthenticated(false);
    },
    getAccessToken: async () => {
      return dev_jwt_token !== "" ? dev_jwt_token : undefined;
    },
  };

  return <AuthnContext.Provider value={context}>{children}</AuthnContext.Provider>;
};

// 本番環境においてのAuthnコンテキストのプロバイダー
const ProductionAuthnProvider = ({ children }: { children: ReactNode }) => {
  // 本番環境において、Logtoのフックより利用する要素を取得
  const { isAuthenticated, signIn, signOut, getAccessToken } = useLogto();

  // 本番環境においてのコンテキストの定義
  // Logtoのフックより取得した要素をそのまま利用
  const context: AuthnContext = {
    isAuthenticated,
    signIn,
    signOut,
    getAccessToken,
  };

  return <AuthnContext.Provider value={context}>{children}</AuthnContext.Provider>;
};

// Authnコンテキストのプロバイダー
const AuthnProvider = ({ children }: { children: ReactNode }) => {
  return (
    // 開発環境か本番環境かでコンテキストを切り替える
    <LogtoProvider config={logto_config}>
      {is_dev ? <DevelopmentAuthnProvider>{children}</DevelopmentAuthnProvider> : <ProductionAuthnProvider>{children}</ProductionAuthnProvider>}
    </LogtoProvider>
  );
};

export { AuthnProvider, AuthnContext };
