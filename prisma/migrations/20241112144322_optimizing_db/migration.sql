/*
  Warnings:

  - You are about to drop the column `deliveredById` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `givenOutDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantityGivenOut` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_deliveredById_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `deliveredById`,
    DROP COLUMN `deliveredDate`,
    DROP COLUMN `givenOutDate`,
    DROP COLUMN `quantityGivenOut`;
