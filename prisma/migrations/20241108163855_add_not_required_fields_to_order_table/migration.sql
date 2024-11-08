-- AlterTable
ALTER TABLE `Order` MODIFY `approved` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `approvedDate` DATE NULL,
    MODIFY `closedDate` DATE NULL,
    MODIFY `deliveredDate` DATE NULL,
    MODIFY `givenOutDate` DATE NULL,
    MODIFY `orderedDate` DATE NULL,
    MODIFY `quantityDelivered` DOUBLE NULL,
    MODIFY `quantityGivenOut` DOUBLE NULL,
    MODIFY `quantityOrdered` DOUBLE NULL,
    MODIFY `receivedDate` DATE NULL,
    MODIFY `description` VARCHAR(191) NULL;
