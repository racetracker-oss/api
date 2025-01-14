import { AppError } from "@/app/common";

export class InvalidCredentialsError extends AppError {
  constructor(public readonly message = "Invalid credentials.") {
    super(message, 401);
    this.name = "InvalidCredentialsError";
  }
}
