import { AppError } from "@/app/common";

export class RaceNotFoundError extends AppError {
  constructor(public readonly message = "Race not found.") {
    super(message, 404);
    this.name = "RaceNotFoundError";
  }
}
