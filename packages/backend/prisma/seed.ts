import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function main() {
  const usersData = [
    { auth_sub: "1g2h3j4k5l6", handle: generateRandomString(), screen_name: generateRandomString(), bio: "" },
    { auth_sub: "9h8g7f6d5s4", handle: generateRandomString(), screen_name: generateRandomString(), bio: "" },
  ];

  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: userData,
    });

    await prisma.post.create({
      data: {
        userUuid: user.user_uuid, // 作成されたユーザーのUUIDを使用
        title: generateRandomString(),
        body: generateRandomString(),
        is_public: true,
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
