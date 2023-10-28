import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateRandomString(num_chars = 8) {
  return Math.random().toString(num_chars).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function main() {
  const auth_subs = ["1g2h3j4k5l6", "9h8g7f6d5s4"];

  await prisma.user.createMany({
    data: [
      {
        auth_sub: auth_subs[0],
        handle: generateRandomString(),
        screen_name: generateRandomString(),
        bio: generateRandomString(),
        image_url: "https://picsum.photos/200",
      },

      {
        auth_sub: auth_subs[1],
        handle: generateRandomString(),
        screen_name: generateRandomString(),
        bio: generateRandomString(),
        image_url: "https://picsum.photos/200",
      },
    ],
  });

  await Promise.all(
    auth_subs.map(async (auth_sub) => {
      await prisma.post.create({
        data: {
          title: generateRandomString(),
          body: generateRandomString(36),
          user: {
            connect: {
              auth_sub: auth_sub,
            },
          },
        },
      });
    })
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
