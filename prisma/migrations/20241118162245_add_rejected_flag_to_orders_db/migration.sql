-- AlterTable
ALTER TABLE `Order` ADD COLUMN `rejected` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `rejectedReason` VARCHAR(191) NULL;
