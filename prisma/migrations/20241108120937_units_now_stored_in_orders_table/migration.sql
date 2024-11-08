/*
  Warnings:

  - Added the required column `description` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `unitId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
