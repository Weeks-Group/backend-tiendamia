/*
  Warnings:

  - You are about to drop the column `orderId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "OrdersOnItems" (
    "orderId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "OrdersOnItems_pkey" PRIMARY KEY ("itemId","orderId")
);

-- AddForeignKey
ALTER TABLE "OrdersOnItems" ADD CONSTRAINT "OrdersOnItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersOnItems" ADD CONSTRAINT "OrdersOnItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
