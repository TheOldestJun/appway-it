/*
  Warnings:

  - You are about to drop the column `quantityDelivered` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `quantityDelivered`,
    ADD COLUMN `quantityReceived` DOUBLE NULL;
