import { LogtoConfig } from "@logto/react";
import { logto_endpoint, logto_app_id, logto_api_resource } from "./env";

// Logtoクライアントの設定
// 環境変数より取得
const logto_config: LogtoConfig = {
  // Logtoのエンドポイント
  endpoint: logto_endpoint,
  // Logtoのサインインに使用するアプリケーションID
  appId: logto_app_id,
  // Logtoで認可してもらう対象のAPIリソース
  resources: [logto_api_resource],
};

export { logto_config };
