import { createHmac } from "crypto";
import { logto_webhook_secret } from "../../env";
import { Plugin } from "graphql-yoga/typings/plugins/types";
import { PrismaClient } from "@prisma/client";

type WebHookBodyType = {
  // hookId: string;
  // event: string;
  // interactionEvent: string;
  // createdAt: string;
  // sessionId: string;
  // userAgent: string;
  userId: string;
  user: {
    // id: string;
    username: string | null;
    primaryEmail: string | null;
    // primaryPhone: string | null;
    // name: string | null;
    // avatar: string | null;
    // customData: Record<string, unknown>;
    // identities: Record<string, unknown>;
    // lastSignInAt: number;
    // createdAt: number;
    // applicationId: string | null;
    // isSuspended: boolean;
  };
};

// WebHookへのリクエストに対する署名検証を行う関数
const verifyWebHook = (signingKey: string, rawBody: string, expectedSignature: string) => {
  // HMAC-SHA256アルゴリズムで署名を生成
  const hmac = createHmac("sha256", signingKey);
  // リクエストボディを更新
  hmac.update(rawBody);
  // 正しい署名を16進数の文字列として取得
  const signature = hmac.digest("hex");
  // 期待する署名と一致するかどうかを判定
  return signature === expectedSignature;
};

// WebHookのリクエストを処理する関数
export const useWebHook = (prisma: PrismaClient): Plugin => ({
  async onRequest({ request, url, fetchAPI, endResponse }) {
    if (url.pathname === "/api/loginWebHookEndPoint") {
      // rawBodyを取得
      const rawBody = await request.text();

      // ヘッダより署名を取得
      const expected_signature = request.headers.get("logto-signature-sha-256") || "";

      // 署名検証
      const is_valid = verifyWebHook(logto_webhook_secret, rawBody, expected_signature);

      if (is_valid) {
        // bodyのJSONをパース
        const body = JSON.parse(rawBody) as WebHookBodyType;

        // ランダムな文字列を生成する関数
        // ランダムな数字を取得してハッシュ化
        const generateRandomString = () => {
          const random = Math.random().toString(36).slice(-8);
          const hash = createHmac("sha256", random).digest("hex");
          return hash;
        };

        // 適するユーザをデータベースに追加
        await prisma.user.create({
          data: {
            // 認証サービスのユーザIDを保持
            auth_sub: body.userId,
            // ユーザネームかランダムな文字列を保持
            handle: body.user.username || generateRandomString(),
            // スクリーンネームかランダムな文字列を保持
            screen_name: body.user.username || generateRandomString(),
            bio: "",
            image_url: "https://picsum.photos/200",
          },
        });

        // 署名が正しいため、200を返す
        endResponse(
          new fetchAPI.Response("OK", {
            status: 200,
          })
        );

        console.log("🔐 Webhook works correctly");

        return;
      } else {
        // 署名が正しくない場合は、403を返す
        endResponse(
          new fetchAPI.Response("Forbidden", {
            status: 403,
          })
        );

        console.error("🔐 Webhook signature is invalid");
      }
    }
  },
});
