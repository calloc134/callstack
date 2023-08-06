/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sub_auth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[auth_sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_sub` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_sub_auth_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "sub_auth",
DROP COLUMN "uuid",
ADD COLUMN     "auth_sub" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "handle" TEXT NOT NULL,
ADD COLUMN     "screen_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_uuid" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_uuid");

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Post" (
    "post_uuid" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_sub_key" ON "User"("auth_sub");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("user_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
