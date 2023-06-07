/*
  Warnings:

  - You are about to drop the column `endAt` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Budget` DROP COLUMN `endAt`,
    DROP COLUMN `startAt`;
