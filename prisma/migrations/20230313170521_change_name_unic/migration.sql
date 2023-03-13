/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `RMouraCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RMouraCategory_name_key" ON "RMouraCategory"("name");
