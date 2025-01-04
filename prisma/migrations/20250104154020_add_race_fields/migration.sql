-- AlterTable
ALTER TABLE "_RaceParticipants" ADD CONSTRAINT "_RaceParticipants_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RaceParticipants_AB_unique";
