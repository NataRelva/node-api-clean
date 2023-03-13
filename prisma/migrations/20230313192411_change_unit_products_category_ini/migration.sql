/*
  Warnings:

  - You are about to drop the `RMouraCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RMouraCategoryProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RMouraPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RMouraProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RMouraUnit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RMouraUnitProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "RMouraCategory_name_key";

-- DropIndex
DROP INDEX "RMouraCategory_id_key";

-- DropIndex
DROP INDEX "RMouraCategoryProduct_id_key";

-- DropIndex
DROP INDEX "RMouraPackage_name_key";

-- DropIndex
DROP INDEX "RMouraPackage_id_key";

-- DropIndex
DROP INDEX "RMouraProduct_id_key";

-- DropIndex
DROP INDEX "RMouraUnit_name_key";

-- DropIndex
DROP INDEX "RMouraUnit_id_key";

-- DropIndex
DROP INDEX "RMouraUnitProduct_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RMouraCategory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RMouraCategoryProduct";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RMouraPackage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RMouraProduct";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RMouraUnit";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RMouraUnitProduct";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "rmoura_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "obs" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "rmoura_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "rmoura_package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "rmoura_unit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "rmoura_category_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "rmoura_category_product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "rmoura_category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "rmoura_category_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "rmoura_product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rmoura_unit_product" (
    "unitId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("unitId", "productId"),
    CONSTRAINT "rmoura_unit_product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "rmoura_unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "rmoura_unit_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "rmoura_product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RMouraPackageProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RMouraPackageProduct_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "rmoura_package" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RMouraPackageProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "rmoura_product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RMouraPackageProduct" ("createdAt", "id", "packageId", "productId", "updatedAt") SELECT "createdAt", "id", "packageId", "productId", "updatedAt" FROM "RMouraPackageProduct";
DROP TABLE "RMouraPackageProduct";
ALTER TABLE "new_RMouraPackageProduct" RENAME TO "RMouraPackageProduct";
CREATE UNIQUE INDEX "RMouraPackageProduct_id_key" ON "RMouraPackageProduct"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_product_id_key" ON "rmoura_product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_category_id_key" ON "rmoura_category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_category_name_key" ON "rmoura_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_package_id_key" ON "rmoura_package"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_package_name_key" ON "rmoura_package"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_unit_id_key" ON "rmoura_unit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_unit_name_key" ON "rmoura_unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rmoura_category_product_id_key" ON "rmoura_category_product"("id");
