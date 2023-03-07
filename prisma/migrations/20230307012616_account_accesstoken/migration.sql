/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_accessToken_key" ON "Account"("accessToken");
