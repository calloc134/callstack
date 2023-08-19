import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ランダムな文字列を生成する関数
function generateRandomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function main() {
  // ダミーのユーザIDを設定する
  const userIds: string[] = ["1g2h3j4k5l6", "9h8g7f6d5s4"];

  await prisma.user.createMany({
    data: userIds.map((userId) => ({
      auth_sub: userId,
      handle: generateRandomString(),
      screen_name: generateRandomString(),
      bio: "",
    })),
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
