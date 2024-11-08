/*
  Warnings:

  - You are about to drop the `CurrentOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CurrentOrder` DROP FOREIGN KEY `CurrentOrder_productId_fkey`;

-- DropForeignKey
ALTER TABLE `CurrentOrder` DROP FOREIGN KEY `CurrentOrder_unitId_fkey`;

-- DropTable
DROP TABLE `CurrentOrder`;
