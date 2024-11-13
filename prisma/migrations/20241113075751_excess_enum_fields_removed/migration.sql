/*
  Warnings:

  - The values [DELIVERED,GIVENOUT] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('CREATED', 'APPROVED', 'ORDERED', 'RECEIVED', 'CLOSED') NOT NULL;
