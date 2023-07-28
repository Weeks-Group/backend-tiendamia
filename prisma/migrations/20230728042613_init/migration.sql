/*
  Warnings:

  - Made the column `name` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "createDate" DROP NOT NULL,
ALTER COLUMN "createDate" SET DEFAULT CURRENT_TIMESTAMP;
