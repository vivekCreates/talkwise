/*
  Warnings:

  - You are about to drop the column `coversationId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `answer` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conversationId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_coversationId_fkey";

-- AlterTable
ALTER TABLE "public"."messages" DROP COLUMN "coversationId",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "conversationId" TEXT NOT NULL,
ALTER COLUMN "sender" SET DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "public"."converstions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
