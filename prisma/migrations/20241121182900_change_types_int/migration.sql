/*
  Warnings:

  - Changed the type of `distance` on the `ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `duration` on the `ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ride" DROP COLUMN "distance",
ADD COLUMN     "distance" INTEGER NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;
