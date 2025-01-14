import { AppError } from "@/app/common";

export class UserNotFoundError extends AppError {
  constructor(public readonly message = "User not found.") {
    super(message, 404);
    this.name = "UserNotFoundError";
  }
}
