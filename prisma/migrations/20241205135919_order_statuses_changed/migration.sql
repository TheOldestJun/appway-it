-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('CREATED', 'APPROVED', 'REJECTED', 'ORDER_PENDING', 'ORDERED', 'RECEIVE_PENDING', 'RECEIVED', 'CLOSED') NOT NULL;