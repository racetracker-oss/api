import { prisma } from "@/database";
import { UserNotFoundError } from "../errors";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new UserNotFoundError();

  return user;
};
