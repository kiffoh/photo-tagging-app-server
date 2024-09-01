-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoordinateSet" (
    "id" SERIAL NOT NULL,
    "iconId" INTEGER NOT NULL,
    "minY" INTEGER NOT NULL,
    "maxY" INTEGER NOT NULL,
    "minX" INTEGER NOT NULL,
    "maxX" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoordinateSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Icon_name_key" ON "Icon"("name");

-- AddForeignKey
ALTER TABLE "CoordinateSet" ADD CONSTRAINT "CoordinateSet_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
