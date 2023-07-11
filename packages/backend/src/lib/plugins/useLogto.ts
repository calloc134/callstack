// ESLintの特定のルールを無効にする
/* eslint-disable no-console */
/* eslint-disable dot-notation */

// 必要なライブラリをインポートする
import { decode, verify, DecodeOptions, VerifyOptions } from "jsonwebtoken"; // JWTの生成と検証を行うライブラリ
import * as JwksRsa from "jwks-rsa"; // 公開鍵を取得するライブラリ
import { Plugin } from "@envelop/core"; // GraphQLサーバーのプラグインシステムを提供するライブラリ

// プラグインの設定を定義する型
export type Logto0PluginOptions = {
  domain: string; // Logtoのドメイン
  audience: string; // JWTのオーディエンス

  preventUnauthenticatedAccess?: boolean; // 認証されていないアクセスを防ぐかどうか
  onError?: (error: Error) => void; // エラーハンドリングの方法

  extractTokenFn?: (context: unknown) => Promise<string> | string; // JWTの取得方法
  jwksClientOptions?: JwksRsa.Options; // JWKSクライアントの設定
  jwtVerifyOptions?: VerifyOptions; // JWTの検証オプション
  jwtDecodeOptions?: DecodeOptions; // JWTのデコードオプション
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
type BuildContext<TOptions extends Logto0PluginOptions> = TOptions["extendContextField"] extends string
  ? { [TName in TOptions["extendContextField"] as TOptions["extendContextField"]]: UserPayload }
  : { _auth0: UserPayload };

// Logtoを使用した認証を行うGraphQLプラグインを作成するフック
export const useLogto = <TOptions extends Logto0PluginOptions>(options: TOptions): Plugin<BuildContext<TOptions>> => {
  // JWKSクライアントを作成する
  const jkwsClient = new JwksRsa.JwksClient({
    cache: true, // キャッシュを有効にする
    rateLimit: true, // レートリミットを有効にする
    jwksRequestsPerMinute: 5, // JWKSリクエストは1分あたり5回に制限する
    jwksUri: `https://${options.domain}/oidc/jwks`, // JWKSのURIを設定する
    ...options.jwksClientOptions, // 追加のJWKSクライアントの設定を適用する
  });

  // コンテキストフィールド、トークンタイプ、ヘッダー名を設定する
  const contextField = options.extendContextField || "_logto";
  const tokenType = options.tokenType || "Bearer";
  const headerName = options.headerName || "authorization";

  // JWTの取得関数を設定する
  const extractFn =
    options.extractTokenFn ||
    ((ctx: Record<string, any> = {}): string | null => {
      const req = ctx["req"] || ctx["request"] || {};
      const headers = req.headers || ctx["headers"] || null;

      if (!headers) {
        console.warn(
          `useAuth0 plugin unable to locate your request or headers on the execution context. Please make sure to pass that, or provide custom "extractTokenFn" function.`
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
    });

  // JWTの検証関数を定義する
  const verifyToken = async (token: string): Promise<unknown> => {
    // JWTをデコードする
    const decodedToken = (decode(token, { complete: true, ...options.jwtDecodeOptions }) as Record<string, { kid?: string }>) || {};

    // デコードされたJWTにkidが存在する場合
    if (decodedToken && decodedToken.header && decodedToken.header.kid) {
      // JWKSクライアントを使用して公開鍵を取得する
      const secret = await jkwsClient.getSigningKey(decodedToken.header.kid);
      // 公開鍵を取得する
      const signingKey = secret.getPublicKey();
      // JWTを検証する
      const decoded = verify(token, signingKey, {
        algorithms: ["ES384"], // 使用するアルゴリズム
        audience: options.audience, // オーディエンスを指定する
        issuer: `https://${options.domain}/`, // 発行者を指定する
        ...options.jwtVerifyOptions, // 追加のJWT検証オプションを適用する
      }) as { sub: string };

      // デコードされたペイロードを返す
      return decoded;
    }
    // JWTのデコードに失敗した場合、エラーをスローする
    throw new Error(`Failed to decode authentication token!`);
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
