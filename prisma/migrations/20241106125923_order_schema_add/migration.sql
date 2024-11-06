/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `approved` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvedDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approverId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closedDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveredById` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveredDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenOutDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderedById` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderedDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityCreated` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityDelivered` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityGivenOut` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityOrdered` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedById` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `createdAt`,
    DROP COLUMN `quantity`,
    DROP COLUMN `userId`,
    ADD COLUMN `approved` BOOLEAN NOT NULL,
    ADD COLUMN `approvedDate` DATE NOT NULL,
    ADD COLUMN `approverId` VARCHAR(191) NOT NULL,
    ADD COLUMN `closedDate` DATE NOT NULL,
    ADD COLUMN `closerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdDate` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creatorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `deliveredById` VARCHAR(191) NOT NULL,
    ADD COLUMN `deliveredDate` DATE NOT NULL,
    ADD COLUMN `givenOutDate` DATE NOT NULL,
    ADD COLUMN `orderedById` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderedDate` DATE NOT NULL,
    ADD COLUMN `quantityCreated` DOUBLE NOT NULL,
    ADD COLUMN `quantityDelivered` DOUBLE NOT NULL,
    ADD COLUMN `quantityGivenOut` DOUBLE NOT NULL,
    ADD COLUMN `quantityOrdered` DOUBLE NOT NULL,
    ADD COLUMN `receivedById` VARCHAR(191) NOT NULL,
    ADD COLUMN `receivedDate` DATE NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_closerId_fkey` FOREIGN KEY (`closerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_approverId_fkey` FOREIGN KEY (`approverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_deliveredById_fkey` FOREIGN KEY (`deliveredById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_receivedById_fkey` FOREIGN KEY (`receivedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
