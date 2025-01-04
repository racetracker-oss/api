-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "joinCode" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "joinUntil" TIMESTAMP(3) NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RaceParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_id_key" ON "Race"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Race_joinCode_key" ON "Race"("joinCode");

-- CreateIndex
CREATE UNIQUE INDEX "CheckPoint_id_key" ON "CheckPoint"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_RaceParticipants_AB_unique" ON "_RaceParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceParticipants_B_index" ON "_RaceParticipants"("B");

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckPoint" ADD CONSTRAINT "CheckPoint_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceParticipants" ADD CONSTRAINT "_RaceParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceParticipants" ADD CONSTRAINT "_RaceParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
