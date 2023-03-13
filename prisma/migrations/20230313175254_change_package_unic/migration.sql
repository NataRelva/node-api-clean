/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `RMouraPackage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RMouraPackage_name_key" ON "RMouraPackage"("name");
