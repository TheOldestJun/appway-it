/*
  Warnings:

  - You are about to drop the column `rejected` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `rejected`,
    MODIFY `status` ENUM('CREATED', 'APPROVED', 'REJECTED', 'ORDERED', 'RECEIVED', 'CLOSED') NOT NULL;
