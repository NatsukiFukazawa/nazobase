/*
  Warnings:

  - You are about to drop the column `userId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Mystery` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profileId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer` to the `Mystery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Mystery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_mysteryId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Mystery" DROP CONSTRAINT "Mystery_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tagging" DROP CONSTRAINT "Tagging_mysteryId_fkey";

-- DropForeignKey
ALTER TABLE "Tagging" DROP CONSTRAINT "Tagging_tagId_fkey";

-- DropIndex
DROP INDEX "Favorite_mysteryId_userId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Mystery" DROP COLUMN "userId",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tagging" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Favorite_mysteryId_idx" ON "Favorite"("mysteryId");

-- CreateIndex
CREATE INDEX "Favorite_profileId_idx" ON "Favorite"("profileId");

-- CreateIndex
CREATE INDEX "Mystery_profileId_idx" ON "Mystery"("profileId");

-- CreateIndex
CREATE INDEX "Tagging_mysteryId_idx" ON "Tagging"("mysteryId");

-- CreateIndex
CREATE INDEX "Tagging_tagId_idx" ON "Tagging"("tagId");

-- AddForeignKey
ALTER TABLE "Mystery" ADD CONSTRAINT "Mystery_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagging" ADD CONSTRAINT "Tagging_mysteryId_fkey" FOREIGN KEY ("mysteryId") REFERENCES "Mystery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagging" ADD CONSTRAINT "Tagging_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_mysteryId_fkey" FOREIGN KEY ("mysteryId") REFERENCES "Mystery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
