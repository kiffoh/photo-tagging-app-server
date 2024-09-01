/*
  Warnings:

  - You are about to drop the column `mins` on the `HighScores` table. All the data in the column will be lost.
  - You are about to drop the column `secs` on the `HighScores` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `HighScores` table. All the data in the column will be lost.
  - Added the required column `time_mins` to the `HighScores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_secs` to the `HighScores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_total` to the `HighScores` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "HighScores_time_idx";

-- AlterTable
ALTER TABLE "HighScores" DROP COLUMN "mins",
DROP COLUMN "secs",
DROP COLUMN "time",
ADD COLUMN     "time_mins" TEXT NOT NULL,
ADD COLUMN     "time_secs" TEXT NOT NULL,
ADD COLUMN     "time_total" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "HighScores_time_total_idx" ON "HighScores"("time_total");
