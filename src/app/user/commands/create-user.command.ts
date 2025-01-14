import { prisma } from "@/database";
import { createUserSchema, type CreateUser } from "../schemas";
import argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CredentialsTakenError } from "../errors";

export const createUser = async (dto: CreateUser) => {
  const data = createUserSchema.parse(dto);

  const hashedPassword = await argon2.hash(data.password);

  try {
    const result = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
      },
    });
    return result;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new CredentialsTakenError();
      }
    }
  }
};
