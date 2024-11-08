-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_closerId_fkey`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `closed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `closerId` VARCHAR(191) NULL;
