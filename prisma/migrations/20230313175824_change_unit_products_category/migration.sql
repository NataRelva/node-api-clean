/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `RMouraUnit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RMouraUnit_name_key" ON "RMouraUnit"("name");
