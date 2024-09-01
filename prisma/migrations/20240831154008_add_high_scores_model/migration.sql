-- CreateTable
CREATE TABLE "HighScores" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "mins" TEXT NOT NULL,
    "secs" TEXT NOT NULL,

    CONSTRAINT "HighScores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HighScores_time_idx" ON "HighScores"("time");
