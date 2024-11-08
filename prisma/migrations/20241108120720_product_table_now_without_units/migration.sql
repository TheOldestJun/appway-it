/*
  Warnings:

  - You are about to drop the column `unitId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_unitId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `unitId`;
