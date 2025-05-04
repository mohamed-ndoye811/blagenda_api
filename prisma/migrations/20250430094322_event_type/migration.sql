/*
  Warnings:

  - You are about to drop the column `name` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `events` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `eventType` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTypeId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'MANAGER');

-- AlterTable
ALTER TABLE "events" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "eventType" INTEGER NOT NULL,
ADD COLUMN     "eventTypeId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatarURL" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" DEFAULT 'USER';

-- CreateTable
CREATE TABLE "event_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "event_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_eventType_fkey" FOREIGN KEY ("eventType") REFERENCES "event_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
