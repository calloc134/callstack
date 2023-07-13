/*
  Warnings:

  - A unique constraint covering the columns `[sub_auth]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sub_auth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sub_auth" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_auth_key" ON "User"("sub_auth");
