/*
  Warnings:

  - You are about to drop the column `horaire1` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `horaire1state` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `horaire2` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `horaire2state` on the `Content` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "openTime" TEXT,
    "closeTime" TEXT,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "contentId" INTEGER NOT NULL,
    CONSTRAINT "Schedule_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "banner" TEXT,
    "title" TEXT,
    "histoire" TEXT,
    "histoireImg" TEXT,
    "menuDesc" TEXT,
    "menuImg" TEXT,
    "menuPdf" TEXT,
    "cuisine" TEXT,
    "paiement" TEXT,
    "mail" TEXT,
    "tel" TEXT
);
INSERT INTO "new_Content" ("banner", "cuisine", "histoire", "histoireImg", "id", "mail", "menuDesc", "menuImg", "menuPdf", "paiement", "tel", "title") SELECT "banner", "cuisine", "histoire", "histoireImg", "id", "mail", "menuDesc", "menuImg", "menuPdf", "paiement", "tel", "title" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
