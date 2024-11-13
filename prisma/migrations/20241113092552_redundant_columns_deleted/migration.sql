/*
  Warnings:

  - You are about to drop the column `approved` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `closed` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `closerId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `approved`,
    DROP COLUMN `closed`,
    DROP COLUMN `closerId`;
