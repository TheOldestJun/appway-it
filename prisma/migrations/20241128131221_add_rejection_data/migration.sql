-- AlterTable
ALTER TABLE `Order` ADD COLUMN `rejectedById` VARCHAR(191) NULL,
    ADD COLUMN `rejectedDate` DATE NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_rejectedById_fkey` FOREIGN KEY (`rejectedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
