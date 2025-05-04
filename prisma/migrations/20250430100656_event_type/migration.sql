/*
  Warnings:

  - You are about to drop the column `eventTypeId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventURL` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "eventTypeId",
DROP COLUMN "eventURL",
ALTER COLUMN "isOnline" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "verified" DROP NOT NULL;
