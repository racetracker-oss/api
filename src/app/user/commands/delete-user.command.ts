import { prisma } from "@/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserNotFoundError } from "../errors";

export const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2001") {
        throw new UserNotFoundError();
      }
    }
  }
};
