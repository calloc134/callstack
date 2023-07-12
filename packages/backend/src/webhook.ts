import { PrismaClient } from "@prisma/client";
import { createHmac } from "crypto";

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
export const verifyWebHook = (signingKey: string, rawBody: string, expectedSignature: string, prisma: PrismaClient) => {
  // HMAC-SHA256アルゴリズムで署名を生成
  const hmac = createHmac("sha256", signingKey);
  // リクエストボディを更新
  hmac.update(rawBody);
  // 正しい署名を16進数の文字列として取得
  const signature = hmac.digest("hex");
  // 期待する署名と一致するかどうかを判定
  if (signature === expectedSignature) {
    // bodyのJSONをパース
    const body = JSON.parse(rawBody) as WebHookBodyType;

    // 適するユーザをデータベースに追加
    prisma.user.create({
      data: {
        sub_auth: body.userId,
        email: body.user.primaryEmail || "dummy@dummy.dummy",
      },
    });

    return true;
  } else {
    return false;
  }
};
