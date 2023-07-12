import { createHmac } from "crypto";
import { OnRequestEventPayload } from "graphql-yoga/typings/plugins/types";
import { webhook_secret } from "./env";
import { GraphQLContext } from "./context";
import { GraphQLErrorWithCode } from "./error";

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
    // username: string | null;
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
export const WebHookOnRequest = async ({ request, url, fetchAPI, endResponse, serverContext }: OnRequestEventPayload<GraphQLContext>) => {
  if (serverContext === undefined || serverContext.prisma === undefined) {
    // serverContextが存在しない場合
    // 何もせず終了
    endResponse(
      new fetchAPI.Response("Internal Server Error", {
        status: 500,
      })
    );
    console.error("unknown_error", "serverContext is undefined");

    // リクエストのパスが/api/loginWebHookEndPointの場合
  } else if (url.pathname === "/api/loginWebHookEndPoint") {
    // rawBodyを取得
    const rawBody = await request.text();

    // ヘッダより署名を取得
    const expectedSignature = request.headers.get("logto-signature-sha-256") || "";

    // 署名検証
    const isValid = verifyWebHook(webhook_secret, rawBody, expectedSignature);

    if (isValid) {
      // bodyのJSONをパース
      const body = JSON.parse(rawBody) as WebHookBodyType;

      // 適するユーザをデータベースに追加
      serverContext.prisma.user.create({
        data: {
          sub_auth: body.userId,
          email: body.user.primaryEmail || "dummy@dummy.dummy",
        },
      });

      // 署名が正しいため、200を返す
      endResponse(
        new fetchAPI.Response("OK", {
          status: 200,
        })
      );

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
};
