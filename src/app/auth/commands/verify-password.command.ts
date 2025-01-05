import argon2 from "argon2";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
export const verifyPassword = async (hash: string, plain: string) => {
  const result = await argon2.verify(hash, plain);

  if (!result) {
    throw new InvalidCredentialsError();
  }

  return result;
};
