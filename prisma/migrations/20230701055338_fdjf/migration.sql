-- AlterTable
ALTER TABLE `drafts` ADD COLUMN `payId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `drafts` ADD CONSTRAINT `drafts_payId_fkey` FOREIGN KEY (`payId`) REFERENCES `payments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
