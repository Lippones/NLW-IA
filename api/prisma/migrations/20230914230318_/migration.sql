/*
  Warnings:

  - You are about to drop the column `description` on the `prompts` table. All the data in the column will be lost.
  - Added the required column `template` to the `prompts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_prompts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "template" TEXT NOT NULL
);
INSERT INTO "new_prompts" ("id", "title") SELECT "id", "title" FROM "prompts";
DROP TABLE "prompts";
ALTER TABLE "new_prompts" RENAME TO "prompts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
