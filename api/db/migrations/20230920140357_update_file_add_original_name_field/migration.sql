/*
  Warnings:

  - Added the required column `originalName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_File" ("createdAt", "id", "title", "version") SELECT "createdAt", "id", "title", "version" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_title_key" ON "File"("title");
CREATE UNIQUE INDEX "File_version_key" ON "File"("version");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
