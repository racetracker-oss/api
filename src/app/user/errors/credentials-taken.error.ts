import { AppError } from "@/app/common";

export class CredentialsTakenError extends AppError {
  constructor(public readonly message = "Credentials are taken.") {
    super(message, 400);
    this.name = "CredentialsTakenError";
  }
}
