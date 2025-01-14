import { prisma } from "@/database";
export const logOut = async (userId: number) => {
  return await prisma.user.update({
    data: {
      refreshToken: null,
    },
    where: {
      id: userId,
    },
  });
};
