-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RMouraCategoryProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RMouraCategoryProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "RMouraCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RMouraCategoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "RMouraProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RMouraCategoryProduct" ("categoryId", "createdAt", "id", "productId", "updatedAt") SELECT "categoryId", "createdAt", "id", "productId", "updatedAt" FROM "RMouraCategoryProduct";
DROP TABLE "RMouraCategoryProduct";
ALTER TABLE "new_RMouraCategoryProduct" RENAME TO "RMouraCategoryProduct";
CREATE UNIQUE INDEX "RMouraCategoryProduct_id_key" ON "RMouraCategoryProduct"("id");
CREATE TABLE "new_RMouraPackageProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RMouraPackageProduct_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "RMouraPackage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RMouraPackageProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "RMouraProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RMouraPackageProduct" ("createdAt", "id", "packageId", "productId", "updatedAt") SELECT "createdAt", "id", "packageId", "productId", "updatedAt" FROM "RMouraPackageProduct";
DROP TABLE "RMouraPackageProduct";
ALTER TABLE "new_RMouraPackageProduct" RENAME TO "RMouraPackageProduct";
CREATE UNIQUE INDEX "RMouraPackageProduct_id_key" ON "RMouraPackageProduct"("id");
CREATE TABLE "new_RMouraUnitProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RMouraUnitProduct_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "RMouraUnit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RMouraUnitProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "RMouraProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RMouraUnitProduct" ("createdAt", "id", "productId", "unitId", "updatedAt") SELECT "createdAt", "id", "productId", "unitId", "updatedAt" FROM "RMouraUnitProduct";
DROP TABLE "RMouraUnitProduct";
ALTER TABLE "new_RMouraUnitProduct" RENAME TO "RMouraUnitProduct";
CREATE UNIQUE INDEX "RMouraUnitProduct_id_key" ON "RMouraUnitProduct"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
