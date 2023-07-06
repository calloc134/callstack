import { EnvelopArmor } from "@escape.tech/graphql-armor";

// graphql-armorのセットアップ
export const armor = new EnvelopArmor({
  // 最大深度を設定
  maxDepth: {
    enabled: true,
    n: 6,
  },
  // 最大トークン数を設定
  maxTokens: {
    enabled: true,
    n: 1000,
  },
  // 最大ディレクティブ数を設定
  maxDirectives: {
    enabled: true,
    n: 50,
  },
  // 最大エイリアス数を設定
  maxAliases: {
    enabled: true,
    n: 10,
  },
  // 最大コスト数を設定
  costLimit: {
    maxCost: 5000,
    objectCost: 2,
    scalarCost: 1,
    depthCostFactor: 1.5,
    ignoreIntrospection: true,
  },
});
