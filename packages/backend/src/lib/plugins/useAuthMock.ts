// ESLintの特定のルールを無効にする
/* eslint-disable no-console */
/* eslint-disable dot-notation */

// 必要なライブラリをインポートする
import { sign, decode, verify } from "jsonwebtoken"; // JWTの生成と検証を行うライブラリ
import { Plugin } from "@envelop/core"; // GraphQLサーバーのプラグインシステムを提供するライブラリ
import { generateKeyPairSync } from "crypto";

// JWTの鍵ペアを生成するユーティリティ
// これはテスト環境でのみ使用する
const generateJWTKeyPair = () => {
  // 鍵ペアを生成
  const { publicKey, privateKey } = generateKeyPairSync("ec", {
    namedCurve: "secp384r1", // P-384 curve
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
};

// プラグインの設定を定義する型
export type AuthMockPluginOptions = {
  preventUnauthenticatedAccess?: boolean; // 認証されていないアクセスを防ぐかどうか
  onError?: (error: Error) => void; // エラーハンドリングの方法
  extendContextField?: "_auth0" | string; // コンテキストに追加するフィールドの名前
  tokenType?: string; // トークンの種類
  headerName?: string; // JWTを含むヘッダーの名前
};

// 認証が失敗した場合にスローされるエラークラス
export class UnauthenticatedError extends Error {}

// デコードされたJWTのペイロードを表す型
export type UserPayload = {
  sub: string; // ユーザーの一意の識別子
  [key: string]: unknown; // 任意の追加フィールド
};

// GraphQLのコンテキストに追加するフィールドを定義する型
type BuildContext<TOptions extends AuthMockPluginOptions> = TOptions["extendContextField"] extends string
  ? { [TName in TOptions["extendContextField"] as TOptions["extendContextField"]]: UserPayload }
  : { _auth0: UserPayload };

// モックを使用した認証を行うGraphQLプラグインを作成するフック
export const useAuthMock = <TOptions extends AuthMockPluginOptions>(options: TOptions): Plugin<BuildContext<TOptions>> => {
  // JWTの鍵ペアを生成する
  const { publicKey, privateKey } = generateJWTKeyPair();

  // コンテキストフィールド、トークンタイプ、ヘッダー名を設定する
  const contextField = options.extendContextField || "_mock";
  const tokenType = options.tokenType || "Bearer";
  const headerName = options.headerName || "authorization";

  // 定数を設定する
  const issuer = "https://dummy/oidc";
  const audience = "mock";

  // ダミーのユーザIDを設定する
  const userid: string[] = ["9h8g7f6d5s4", "1g2h3j4k5l6"];

  // ダミーのJWTを返す
  const payload_list: UserPayload[] = [
    {
      sub: userid[0], // ユーザID
      name: null,
      picture: null,
      username: null,
      auth_time: 9999999999,
      at_hash: null,
    },
    {
      sub: userid[1], // ユーザID
      name: null,
      picture: null,
      username: null,
      auth_time: 9999999999,
      at_hash: null,
    },
  ];

  // サンプルのJWTを生成して表示
  const jwt_list = payload_list.map((payload) => {
    return sign(payload, privateKey, {
      algorithm: "ES384", // 使用するアルゴリズム
      audience: audience, // オーディエンスを指定する
      issuer: issuer, // 発行者を指定する
      expiresIn: "1h", // 有効期限を指定する,
      keyid: "dummy", // キーIDを指定する
    });
  });

  console.log("📝 This is a sample JWT. Please use it for testing.");
  jwt_list.forEach((jwt) => {
    console.log(jwt);
  });

  // JWTの取得関数を設定する
  const extractFn = (ctx: Record<string, any> = {}): string | null => {
    const req = ctx["req"] || ctx["request"] || {};
    const headers = req.headers || ctx["headers"] || null;

    if (!headers) {
      console.warn(
        `useAuthMock plugin unable to locate your request or headers on the execution context. Please make sure to pass that, or provide custom "extractTokenFn" function.`
      );
    } else {
      let authHeader: string | null = null;
      if (headers[headerName] && typeof headers[headerName] === "string") {
        authHeader = headers[headerName] || null;
      } else if (headers.get && headers.has && headers.has(headerName)) {
        authHeader = headers.get(headerName) || null;
      }
      if (authHeader === null) {
        return null;
      }

      const split = authHeader.split(" ");

      if (split.length !== 2) {
        throw new Error(`Invalid value provided for header "${headerName}"!`);
      } else {
        const [type, value] = split;

        if (type !== tokenType) {
          throw new Error(`Unsupported token type provided: "${type}"!`);
        } else {
          return value;
        }
      }
    }

    return null;
  };

  // JWTの検証関数を定義する
  const verifyToken = async (token: string): Promise<unknown> => {
    // JWTをデコードする
    // @ts-expect-error: 型エラーを無視
    const decodedToken = (decode(token, { complete: true }) as Record<string, { kid?: string }>) || {};

    // デコードされたJWTにkidが存在する場合
    if (decodedToken && decodedToken.header && decodedToken.header.kid) {
      // JWTを検証する
      const decoded = verify(token, publicKey, {
        algorithms: ["ES384"], // 使用するアルゴリズム
        audience: audience, // オーディエンスを指定する
        issuer: issuer, // 発行者を指定する,
      }) as { sub: string };

      // デコードされたペイロードを返す
      return decoded;
    }
    // JWTのデコードに失敗した場合、エラーをスローする
    throw new Error(`Failed to verify authentication token!`);
  };

  // プラグインの定義を返す
  return {
    // コンテキストを構築する際に呼び出されるメソッド
    async onContextBuilding({ context, extendContext }) {
      try {
        // JWTを取得する
        const token = await extractFn(context);

        // JWTが存在する場合
        if (token) {
          // JWTを検証する
          const decodedPayload = await verifyToken(token);

          // デコードされたペイロードをコンテキストに追加する
          extendContext({
            [contextField]: decodedPayload,
          } as BuildContext<TOptions>);
          // JWTが存在しない場合、preventUnauthenticatedAccessがtrueであればエラーをスローする
        } else if (options.preventUnauthenticatedAccess) {
          throw new UnauthenticatedError(`Unauthenticated!`);
        }
        // エラーが発生した場合
      } catch (e) {
        // onErrorが指定されていればそれを呼び出し、指定されていなければエラーをスローする
        if (options.onError) {
          options.onError(e as Error);
        } else {
          throw e;
        }
      }
    },
  };
};
