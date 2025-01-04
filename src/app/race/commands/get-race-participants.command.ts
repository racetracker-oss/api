import { prisma } from "@/database";
import { RaceNotFoundError } from "../errors";

export const getRaceParticipants = async (code: string) => {
  const result = await prisma.race.findUnique({
    where: {
      joinCode: code,
    },
    select: {
      participants: true,
    },
  });

  if (!result) throw new RaceNotFoundError();

  const participantsWithoutSensitiveInfo = result.participants.map(
    (participant) => {
      const { password, refreshToken, ...rest } = participant;
      return rest;
    }
  );

  return participantsWithoutSensitiveInfo;
};
