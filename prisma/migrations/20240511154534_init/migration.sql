/*
  Warnings:

  - You are about to drop the `_productcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_productcategory` DROP FOREIGN KEY `_ProductCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_productcategory` DROP FOREIGN KEY `_ProductCategory_B_fkey`;

-- DropTable
DROP TABLE `_productcategory`;
