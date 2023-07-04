import { generateKeyPairSync } from "crypto";
import * as fs from "fs";

// JWTの鍵ペアを生成するユーティリティ
// これはテスト環境でのみ使用する
// 本番ではIDaaS等を使用するべき

const generateJWTKeyPair = () => {
  // 鍵ペアを生成
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    // 鍵長を4096ビットに設定
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
};

// 鍵ペアを生成してファイルに書き出す
const { publicKey, privateKey } = generateJWTKeyPair();
fs.writeFileSync("./public.key", publicKey);
fs.writeFileSync("./private.key", privateKey);
