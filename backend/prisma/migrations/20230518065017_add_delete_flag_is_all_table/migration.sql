-- AlterTable
ALTER TABLE `Budget` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Expense` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false;
